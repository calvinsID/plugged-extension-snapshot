/* global chrome */
import React from 'react';
import './saveCard.css';
import PopupStore from '../../../../../stores/popupStore';
import loginEnum from '../../../../../stores/loginEnum';
import { observer } from "mobx-react";
import Scraper from '../../../../../scraper/Scraper';
import $ from 'jquery';
import popupPagesEnum from '../../../../../stores/popupPagesEnum';
import loadingEllipsis from '../../../../../images/loadingEllipsis.gif';
import shoppingBagGif from '../../../../../images/shoppingBag.gif';
import SimilarProducts from '../similarProducts/similarProducts';

export default observer(class SaveCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: PopupStore.saveCardScrapedData ? PopupStore.saveCardScrapedData.productName : null,
      brandName: PopupStore.saveCardScrapedData ? PopupStore.saveCardScrapedData.brandName : null,
      colour: PopupStore.saveCardScrapedData ? PopupStore.saveCardScrapedData.colour : null,
      retailPrice: PopupStore.saveCardScrapedData ? PopupStore.saveCardScrapedData.retailPrice : null,
      currentPrice: PopupStore.saveCardScrapedData ? PopupStore.saveCardScrapedData.currentPrice : null,
      imageUrl: PopupStore.saveCardScrapedData ? PopupStore.saveCardScrapedData.imageUrl : null,
      merchant: PopupStore.saveCardScrapedData ? PopupStore.saveCardScrapedData.merchant : null,
      scrapedWithoutErrors: PopupStore.saveCardScrapedData ? PopupStore.saveCardScrapedData.scrapedWithoutErrors : null,

      hasWatched: false,
      selectedDays: 60,
      isSaving: false,
      isRemoving: false,
      scraperError: false,
    }

    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);

    // For saving
    this.setHasBeenWatched = this.setHasBeenWatched.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.selectionChange = this.selectionChange.bind(this);

    this.watchingUntil = null;
    this.popupWindow = null;
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.action === 'pluggedSignIn') {
        if (this.popupWindow) {
          this.popupWindow.close();
          this.popupWindow = null;
        }
      }
    });
    this.setHasBeenWatched();
  }

  showErrorMessage() {
    let frameContents = $("#plugged-popup-root").find('iframe').contents();
    frameContents.find('.plugged__save_card__error').addClass('plugged__save_card__error_fade_in');
    setTimeout(() => {
      frameContents.find('.plugged__save_card__error').removeClass('plugged__save_card__error_fade_in');
    }, 5000);
  }

  goToSignUp() {
    let height = 250;
    let width = 400;
    let top = (window.innerHeight / 2) - (height / 2);
    let left = (window.innerWidth / 2) - (width / 2);

    this.popupWindow = window.open(PopupStore.authUrl + '/loginScreen/',
      'popUpWindow',
      'height=' + height + ',width=' + width + ',left=' + left + ',top=' + top);
  }

  setHasBeenWatched() {
    let hasWatched = false;

    chrome.storage.local.get(['pluggedWatchedItems', 'pluggedWatchedItemsDict'], res => {
      if (res && res.pluggedWatchedItems && res.pluggedWatchedItemsDict) {
        if (PopupStore.currentUrl in res.pluggedWatchedItemsDict) {
          this.watchingUntil = res.pluggedWatchedItems[res.pluggedWatchedItemsDict[PopupStore.currentUrl]].watch_until;
          if (new Date(this.watchingUntil) >= Date.now()) {
            hasWatched = true;
          }
        } else if (PopupStore.currentUrl.split('#')[0] in res.pluggedWatchedItemsDict) {
          this.watchingUntil = res.pluggedWatchedItems[res.pluggedWatchedItemsDict[PopupStore.currentUrl.split('#')[0]]].watch_until;
          if (new Date(this.watchingUntil) >= Date.now()) {
            hasWatched = true;
          }
        }
      }
      this.setState({hasWatched: hasWatched});
    });
  }

  handleSave() {
    this.setState({isSaving: true});

    let data = {
      action: 'saveUrl',
      selectedDays: this.state.selectedDays,
      url: PopupStore.currentUrl,
      scrapedInfo: {
        productName: this.state.productName,
        brandName: this.state.brandName,
        colour: this.state.colour,
        retailPrice: this.state.retailPrice,
        currentPrice: this.state.currentPrice,
        imageUrl: this.state.imageUrl,
        merchant: this.state.merchant,
      }
    };

    if (!this.state.scrapedWithoutErrors) {
      this.setState({isSaving: false});
      this.showErrorMessage();
    } else {
      chrome.runtime.sendMessage(data, (response) => {
        this.setState({isSaving: false});

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
  }

  handleRemove() {
    this.setState({isRemoving: true});

    let data = {
      action: 'removeSavedUrl',
      url: PopupStore.currentUrl
    };

    chrome.runtime.sendMessage(data, (response) => {
      this.setState({isRemoving: false});

      if (response.status === 200) {
        this.watchingUntil = null;
        this.setState({hasWatched: false});
      } else {
        this.showErrorMessage();
      }
    });
  }

  selectionChange() {
    let frameContents = $("#plugged-popup-root").find('iframe').contents();
    let days = frameContents.find('#plugged__save_card__watch_duration option:selected').val();
    this.setState({selectedDays: days});
    this.setHasBeenWatched();
  }

  render() {
    if (!PopupStore.hasLoadedWatchedItems && PopupStore.isLoggedIn === loginEnum.LOGGED_IN) {
      PopupStore.hasLoadedWatchedItems = true;
      chrome.runtime.sendMessage({action: 'refreshWatchedItems'});
    }

    let saveCard = (
      <div>Product page</div>
    );

    if (PopupStore.isLoggedIn === loginEnum.LOGGED_OUT) {
      saveCard = (
        <div className="plugged__save_card">
          <div>
            <img className="plugged__save_card__image" src={this.state.imageUrl}></img>
          </div>
          <h4 className="plugged__save_card__title">
            Get notified when the price drops.
          </h4>
          <div className="plugged__save_card__description">
            Sign in with Plugged to save items. If the price drops over the next 60 days, we'll notify you by email.
          </div>
          <div>
            <button onClick={this.goToSignUp} className="plugged__save_card__submit_button">Sign up for free!</button>
          </div>
        </div>
      );
    } else if (PopupStore.isLoggedIn === loginEnum.NOT_VERIFIED) {
      saveCard = (
        <div className="plugged__save_card">
          <div>
            <img className="plugged__save_card__image" src={this.state.imageUrl}></img>
          </div>
          <h4 className="plugged__save_card__title">
            Verify your email to save items.
          </h4>
          <div className="plugged__save_card__description">
            We have sent a verification email to &nbsp; <b>{PopupStore.currentUser.email}</b> . Please click on the link in the email, and sign in below once your email is verified.
          </div>
          <div>
            <button onClick={this.goToSignUp} className="plugged__save_card__submit_button">Sign In</button>
          </div>
        </div>
      );
    } else if (this.state.scraperError || !this.state.scrapedWithoutErrors) {
      saveCard = (
        <div className='plugged__popup__save_page_container'>
          <img src={shoppingBagGif} className='plugged__popup__save_page_gif'/>
          <div className='plugged__popup__save_description'>
            In order to save items, you need to be on a single-product page, or click a Plugged Button on a multi-product page.
          </div>
        </div>
      )
    } else if (this.state.hasWatched) {
      saveCard = (
        <div className="plugged__save_card">
          <div>
            <img className="plugged__save_card__image" src={this.state.imageUrl}></img>
          </div>
          <h4 className="plugged__save_card__title">
            This item has been saved until {new Date(this.watchingUntil).toDateString()}.
          </h4>
          <p className='plugged__save_card__error'>Oops! Something went wrong. We may have messed up, or this site may not be the Canadian site. Our team has been alerted of the problem</p>
          <div>
            <button onClick={this.handleRemove}
                    className={this.state.isRemoving ? 'plugged__save_card__submit_button plugged__save_card__remove_button plugged__save_card__loading' : 'plugged__save_card__submit_button plugged__save_card__remove_button'}
                    disabled={this.state.isRemoving ? true : false}>
                      {this.state.isRemoving ? 'Removing' : 'Remove'}
                      {this.state.isRemoving ? <img className='plugged__save_card__loading_gif' src={loadingEllipsis}/> : null}
            </button>
          </div>
        </div>
      );
    } else {
      saveCard = (
        <div className="plugged__save_card">
          <div>
            <img className="plugged__save_card__image" src={this.state.imageUrl}></img>
          </div>
          <h4 className="plugged__save_card__title">
            Get notified when the price drops.
          </h4>
          <p className='plugged__save_card__error'>Oops! Something went wrong. We may have messed up, or this site may not be the Canadian site. Our team has been alerted of the problem</p>
          <div className='plugged__save_card__selection_container'>
            <label className='plugged__save_card__label'>Watch for:</label>
            <select id='plugged__save_card__watch_duration' className='plugged__save_card__select' onChange={this.selectionChange}>
              <option selected={this.state.selectedDays == 30} value='30'>30 days</option>
              <option selected={this.state.selectedDays == 60} value='60'>60 days</option>
              <option selected={this.state.selectedDays == 90} value='90'>90 days</option>
              <option selected={this.state.selectedDays == 180} value='180'>180 days</option>
            </select>
          </div>
          <div>
            <button onClick={this.handleSave}
                    className={this.state.isSaving ? 'plugged__save_card__submit_button plugged__save_card__save_button plugged__save_card__loading' : 'plugged__save_card__submit_button plugged__save_card__save_button'}
                    disabled={this.state.isSaving ? true : false}>
                      {this.state.isSaving ? 'Saving' : 'Save'}
                      {this.state.isSaving ? <img className='plugged__save_card__loading_gif' src={loadingEllipsis}/> : null}
            </button>
          </div>
          <div>
            <SimilarProducts/>
          </div>
        </div>
      );
    }

    return saveCard;
  }
});
