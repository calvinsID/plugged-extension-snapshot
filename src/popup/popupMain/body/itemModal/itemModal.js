/* global chrome */
import React from 'react';
import './itemModal.css';
import PopupStore from '../../../../stores/popupStore';
import popupPagesEnum from '../../../../stores/popupPagesEnum';
import loginEnum from '../../../../stores/loginEnum';
import HelperFunctions from '../../../../stores/helperFunctions';
import { observer } from "mobx-react";
import { toJS } from 'mobx';
import CloseIcon from '@material-ui/icons/Close';
import loadingEllipsis from '../../../../images/loadingEllipsis.gif';
import defaultImage from '../../../../images/defaultImage.png';
import $ from 'jquery';

export default observer(class ItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaving: false,
      isRemoving: false,
      isWatching: PopupStore.isWatching(PopupStore.modalItem.product_url),
      imageSource: PopupStore.modalItem.image_url
    }

    this.close = this.close.bind(this);
    this.remainOpen = this.remainOpen.bind(this);
    this.shop = this.shop.bind(this);
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
    this.addToWatchList = this.addToWatchList.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.onImageError = this.onImageError.bind(this);

    this.menuIsExpanded = false;
  }

  componentDidMount() {}

  close() {
    PopupStore.closeItemModal();
  }

  remainOpen(e) {
    e.stopPropagation();
    if (this.menuIsExpanded) {
      this.expandMenu();
    }
  }

  shop() {
    let win = window.open(PopupStore.modalItem.product_url, '_blank');
    win.focus();
  }

  removeFromWatchlist() {
    this.setState({isRemoving: true});

    let data = {
      action: 'removeSavedUrl',
      url: PopupStore.modalItem.product_url
    };

    chrome.runtime.sendMessage(data, (response) => {
      this.setState({isRemoving: false});

      if (response.status === 200) {
        this.setState({isWatching: false});
      } else {
        this.setState({isWatching: true});
        this.showErrorMessage();
      }
    });
  }

  addToWatchList() {
    this.setState({isSaving: true});

    let data = {
      action: 'saveUrl',
      selectedDays: 60,
      url: PopupStore.modalItem.product_url,
      scrapedInfo: {
        productName: PopupStore.modalItem.product_name,
        brandName: PopupStore.modalItem.brand_name,
        colour: PopupStore.modalItem.colour,
        retailPrice: PopupStore.modalItem.retail_price,
        currentPrice: PopupStore.modalItem.current_price,
        imageUrl: PopupStore.modalItem.image_url,
        merchant: PopupStore.modalItem.merchant,
      }
    };

    chrome.runtime.sendMessage(data, (response) => {
      this.setState({isSaving: false});

      if (response.status === 200) {
        this.setState({isWatching: true});
      } else {
        this.setState({isWatching: false});
        this.showErrorMessage();
      }
    });
  }

  goToSignUp() {
    this.close();
    PopupStore.setCurrentPage(popupPagesEnum.PROFILE);
  }

  showErrorMessage() {
    let frameContents = $("#plugged-popup-root").find('iframe').contents();
    frameContents.find('.plugged__item_modal__error').addClass('plugged__item_modal__error_fade_in');
    setTimeout(() => {
      frameContents.find('.plugged__item_modal__error').removeClass('plugged__item_modal__error_fade_in');
    }, 5000);
  }

  onImageError() {
    this.setState({imageSource: defaultImage});
  }

  render() {
    return (
      <div className="plugged__item_modal__backdrop plugged__fadeIn" onClick={this.close}>
        <div className="plugged__item_modal plugged__fadeIn" onClick={this.remainOpen}>
          <div className="plugged__item_modal__corner_icon">
            <CloseIcon className='plugged__item_modal__close_icon' onClick={this.close}/>
          </div>
          <img src={this.state.imageSource}
            className='plugged__item_modal__image'
            onClick={this.shop}
            onError={this.onImageError}/>
          <div className='plugged__item_modal__content'>
            {PopupStore.modalItem.is_broken_link ?
              <div className='plugged__item_modal__expired'>
                Item not found. {PopupStore.modalItem.merchant} may have removed this product
              </div> : ''
            }
            {PopupStore.modalItem.isExpired ?
              <div className='plugged__item_modal__expired'>
                Finished watching. <a className='plugged__item_modal__expired_link' onClick={this.shop}>Watch again?</a>
              </div> : ''
            }
            <div className='plugged__item_modal__product_name'>
              {PopupStore.modalItem.product_name}
            </div>
            <div className='plugged__item_modal__prices'>
              <div className={
                HelperFunctions.stringCurrencyToFloat(PopupStore.modalItem.current_price) < HelperFunctions.stringCurrencyToFloat(PopupStore.modalItem.retail_price) ?
                  'plugged__item_modal__current_price plugged__ellipsis' : ''}>
                {PopupStore.modalItem.current_price &&
                  HelperFunctions.stringCurrencyToFloat(PopupStore.modalItem.current_price) < HelperFunctions.stringCurrencyToFloat(PopupStore.modalItem.retail_price) ?
                  ('$' + `${PopupStore.modalItem.current_price} ${PopupStore.modalItem.currency}`) : ''}
              </div>
              <div className={
                PopupStore.modalItem.current_price &&
                HelperFunctions.stringCurrencyToFloat(PopupStore.modalItem.current_price) < HelperFunctions.stringCurrencyToFloat(PopupStore.modalItem.retail_price) ?
                'plugged__strikethrough plugged__item_modal__retail_price plugged__ellipsis' :
                'plugged__item_modal__retail_price plugged__ellipsis'
              }>
                ${`${PopupStore.modalItem.retail_price} ${PopupStore.modalItem.currency}`}
              </div>
            </div>
            <div className='plugged__item_modal__merchant plugged__ellipsis'>
              From <b>{PopupStore.modalItem.merchant}</b>
            </div>
            <p className='plugged__item_modal__error'>Oops! Something went wrong. Please try again later</p>
            <button className='plugged__item_modal__button plugged__item_modal__no_margin' onClick={this.shop}>
              View on {PopupStore.modalItem.merchant}
            </button>
            {(PopupStore.isLoggedIn === loginEnum.NOT_VERIFIED) ? (
              <button className='plugged__item_modal__button plugged__item_modal__watch_button' onClick={this.goToSignUp}>
                Verify email to start saving!
              </button>
            ) : (PopupStore.isLoggedIn === loginEnum.LOGGED_OUT) ? (
              <button className='plugged__item_modal__button plugged__item_modal__watch_button' onClick={this.goToSignUp}>
                Sign up to start saving!
              </button>
            ) : this.state.isWatching ? (
              <button className='plugged__item_modal__button plugged__item_modal__remove_button'
                      onClick={this.removeFromWatchlist}
                      disabled={this.state.isRemoving ? true : false}>
                {this.state.isRemoving ? 'Removing' : 'Remove'}
                {this.state.isRemoving ? <img className='plugged__item_modal__loading_gif' src={loadingEllipsis}/> : null}
              </button>
            ) : (PopupStore.modalItem.isExpired) ? (
              <button className='plugged__item_modal__button plugged__item_modal__remove_button'
                      onClick={this.removeFromWatchlist}
                      disabled={this.state.isRemoving ? true : false}>
                {this.state.isRemoving ? 'Removing' : 'Remove'}
                {this.state.isRemoving ? <img className='plugged__item_modal__loading_gif' src={loadingEllipsis}/> : null}
              </button>
            ) : (!PopupStore.modalItem.is_broken_link) ? (
              <button className='plugged__item_modal__button plugged__item_modal__watch_button'
                      onClick={this.addToWatchList}
                      disabled={this.state.isSaving ? true : false}>
                {this.state.isSaving ? 'Saving' : 'Save for 60 days'}
                {this.state.isSaving ? <img className='plugged__item_modal__loading_gif' src={loadingEllipsis}/> : null}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
});
