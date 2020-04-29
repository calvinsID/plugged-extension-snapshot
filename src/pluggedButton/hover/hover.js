/* global chrome */
import React from 'react';
import './hover.css';
import Scraper from '../../scraper/Scraper';
import $ from 'jquery';
import hoverEnum from './hoverEnum.js';
import CloseIcon from '@material-ui/icons/Close';

export default class Hover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: null,
      brandName: null,
      colour: null,
      retailPrice: null,
      currentPrice: null,
      imageUrl: null,
      hasScraped: false,
      isLoggedIn: false,
      hasWatched: false
    }
    this.setIsLoggedIn = this.setIsLoggedIn.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
    this.close = this.close.bind(this);

    // For saving
    this.setHasBeenWatched = this.setHasBeenWatched.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.selectionChange = this.selectionChange.bind(this);

    this.selectedDays = 60;
    this.watchingUntil = null;
  }

  componentDidMount() {
    this.setIsLoggedIn();

    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.action === 'pluggedSignIn') {
        this.setState({isLoggedIn: true});
      } else if (msg.action === 'pluggedSignOut') {
        this.setState({isLoggedIn: false});
      }
    });

    if (this.state.hasScraped == false) {
      const scraper = new Scraper();
      let data = scraper.scrapeUrl(window.location.href);
      data.hasScraped = true;

      this.setState(data, () => {
        this.setHasBeenWatched();
      });
    }
  }

  close() {
    this.props.pluggedButton.toggleSave();
  }

  setIsLoggedIn() {
    chrome.storage.local.get(['pluggedSession', 'pluggedSessionExpiry', 'pluggedCurrentUser'], res => {
      if (res && res.pluggedSession && res.pluggedSessionExpiry) {
        let pluggedSession = res.pluggedSession;
        let pluggedSessionExpiry = res.pluggedSessionExpiry;
        let pluggedCurrentUser = res.pluggedCurrentUser;
        let currentTime = new Date().getTime();

        if (pluggedCurrentUser && !pluggedCurrentUser.email_verified) {
          this.setState({isLoggedIn: true});
        } else if (pluggedSession && pluggedSessionExpiry !== "" && currentTime < pluggedSessionExpiry) {
          this.setState({isLoggedIn: true});
        } else {
          this.setState({isLoggedIn: false});
        }
      } else {
        this.setState({isLoggedIn: false});
      }
    });
  }

  showErrorMessage() {
    $('.plugged__error').addClass('plugged__error_fade_in');
    setTimeout(() => {
      $('.plugged__error').removeClass('plugged__error_fade_in');
    }, 3000);
  }

  goToSignUp() {
    console.log('Sign up');
  }

  setHasBeenWatched() {
    let hasWatched = false;

    chrome.storage.local.get(['pluggedWatchedItems', 'pluggedWatchedItemsDict'], res => {
      if (res && res.pluggedWatchedItems && res.pluggedWatchedItemsDict) {
        if (window.location.href in res.pluggedWatchedItemsDict) {
          this.watchingUntil = res.pluggedWatchedItems[res.pluggedWatchedItemsDict[window.location.href]].watch_until;
          if (new Date(this.watchingUntil) >= Date.now()) {
            hasWatched = true;
          }
        }
      }
      this.setState({hasWatched: hasWatched});
    });
  }

  handleSave() {
    $('button.plugged__submit_button').attr('disabled', true).addClass('plugged__loading');

    let data = {
      action: 'saveUrl',
      selectedDays: this.selectedDays,
      url: window.location.href
    };

    chrome.runtime.sendMessage(data, (response) => {
      $('button.plugged__submit_button').removeAttr('disabled').removeClass('plugged__loading');
      if (response.status === 200) {
        let date = new Date();
        date.setDate(date.getDate() + parseInt(data.selectedDays));

        this.watchingUntil = date.toISOString();
        this.setState({hasWatched: true});
      } else {
        this.showErrorMessage();
      }
    });
  }

  handleRemove() {
    $('button.plugged__submit_button').attr('disabled', true).addClass('plugged__loading');

    let data = {
      action: 'removeSavedUrl',
      url: window.location.href,
    };

    chrome.runtime.sendMessage(data, (response) => {
      $('button.plugged__submit_button').removeAttr('disabled').removeClass('plugged__loading');

      if (response.status === 200) {
        this.watchingUntil = null;
        this.setState({hasWatched: false});
      } else {
        this.showErrorMessage();
      }
    });
  }

  selectionChange() {
    this.selectedDays = $('#plugged__watch_duration option:selected').val();
    this.setHasBeenWatched();
  }

  render() {
    let hoverModal = (
      <div></div>
    );

    if (this.props.showHover === hoverEnum.SAVE) {
      if (this.state.isLoggedIn) {
        if (this.state.hasWatched) {
          hoverModal = (
            <div className="plugged__hover plugged__hover-save">
              <div class="plugged__hover__corner_icon">
                <CloseIcon className='plugged__hover__close_icon' onClick={this.close}/>
              </div>
              <div>
                <img className="plugged__hover_image" src={this.state.imageUrl}></img>
              </div>
              <h4 className="plugged__hover_title spacing_20">
                This item has been saved until {new Date(this.watchingUntil).toDateString()}.
              </h4>
              <p className='plugged__error'>Oops! Something went wrong. Please try again later</p>
              <div className='plugged__selection_container'>
                <label className='plugged__label spacing_20'>Watch for:</label>
                <select id='plugged__watch_duration' className='plugged__select spacing_20' onChange={this.selectionChange}>
                  <option selected={this.selectedDays == 30} value='30'>30 days</option>
                  <option selected={this.selectedDays == 60} value='60'>60 days</option>
                  <option selected={this.selectedDays == 90} value='90'>90 days</option>
                  <option selected={this.selectedDays == 180} value='180'>180 days</option>
                </select>
              </div>
              <div className="spacing_20">
                <button onClick={this.handleRemove} className="plugged__submit_button">Remove</button>
              </div>
            </div>
          );
        } else {
          hoverModal = (
            <div className="plugged__hover plugged__hover-save">
              <div class="plugged__item_modal__corner_icon">
                <CloseIcon className='plugged__item_modal__close_icon' onClick={this.close}/>
              </div>
              <div>
                <img className="plugged__hover_image" src={this.state.imageUrl}></img>
              </div>
              <h4 className="plugged__hover_title spacing_20">
                Get notified when the price drops.
              </h4>
              <p className='plugged__error'>Oops! Something went wrong. Please try again later</p>
              <div className='plugged__selection_container'>
                <label className='plugged__label spacing_20'>Watch for:</label>
                <select id='plugged__watch_duration' className='plugged__select spacing_20' onChange={this.selectionChange}>
                  <option selected={this.selectedDays == 30} value='30'>30 days</option>
                  <option selected={this.selectedDays == 60} value='60'>60 days</option>
                  <option selected={this.selectedDays == 90} value='90'>90 days</option>
                  <option selected={this.selectedDays == 180} value='180'>180 days</option>
                </select>
              </div>
              <div className="spacing_20">
                <button onClick={this.handleSave} className="plugged__submit_button">Save</button>
              </div>
            </div>
          );
        }
      } else {
        hoverModal = (
          <div className="plugged__hover plugged__hover-save">
            <div class="plugged__item_modal__corner_icon">
              <CloseIcon className='plugged__item_modal__close_icon' onClick={this.close}/>
            </div>
            <div>
              <img className="plugged__hover_image" src={this.state.imageUrl}></img>
            </div>
            <h4 className="plugged__hover_title spacing_20">
              Watch this item for price drops.
            </h4>
            <div className="plugged__hover_description spacing_20">
              Sign in with Plugged to save this item. If the price drops over the next 60 days, we'll notify you by email.
            </div>
            <div className="spacing_20">
              <button onClick={this.goToSignUp} className="plugged__submit_button">Sign up for free!</button>
            </div>
          </div>
        );
      }
    }

    return (
      <div>
        {hoverModal}
      </div>
    )
  }
}
