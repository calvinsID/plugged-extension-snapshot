/* global chrome */
import React from 'react';
import './savePage.css';
import PopupStore from '../../../../stores/popupStore';
import popupPagesEnum from '../../../../stores/popupPagesEnum';
import secondaryPagesEnum from '../../../../stores/secondaryPagesEnum';
import { observer } from "mobx-react";
import shoppingBagGif from '../../../../images/shoppingBag.gif';
import storeGif from '../../../../images/storeGif.gif';
import SaveCard from './saveCard/saveCard';
import SaveCardMulti from './saveCardMulti/saveCardMulti';
import loginEnum from '../../../../stores/loginEnum';

export default observer(class SavePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWebsite: window.location.href.split('/')[2],
      supportStoreButtonText: 'Support this store!'
    }

    this.goToSupportedStores = this.goToSupportedStores.bind(this);
    this.supportStore = this.supportStore.bind(this);
  }

  componentDidMount() {
    // Need to refresh current URL, in case sites like Adidas.ca doesn't refresh when you navigate.
    PopupStore.setCurrentUrl();
  }

  goToSupportedStores() {
    if (PopupStore.isLoggedIn === loginEnum.LOGGED_IN) {
      PopupStore.setProfilePage(secondaryPagesEnum.PROFILE_STORES);
      PopupStore.setCurrentPage(popupPagesEnum.PROFILE);
    } else {
      PopupStore.setCurrentPage(popupPagesEnum.SUPPORTED_STORES);
    }
  }

  supportStore() {
    PopupStore.supportStoreRequest(this.state.currentWebsite);
    this.setState({
      supportStoreButtonText: 'Request submitted'
    });
  }

  render() {
    let savePage = (
      <div></div>
    );

    if (PopupStore.isSaveCardMulti) {
      savePage = (
        <SaveCardMulti/>
      );
    } else if (PopupStore.isSaveCard) {
      savePage = (
        <SaveCard/>
      );
    } else if (PopupStore.matchesSupportedMerchant(PopupStore.currentUrl)) {
      savePage = (
        <div className='plugged__popup__save_page_container'>
          <img src={shoppingBagGif} className='plugged__popup__save_page_gif'/>
          <div className='plugged__popup__save_description'>
          In order to save items, you need to be on a single-product page, or click a Plugged Button on a multi-product page.
          </div>
        </div>
      );
    } else {
      savePage = (
        <div className='plugged__popup__save_page_container'>
          <img src={storeGif} className='plugged__popup__save_page_gif'/>
          <div className='plugged__popup__save_description'>
            {`In order to save items, you need to be shopping at one of our `}
            <strong className='plugged__popup__save_supported_stores' onClick={this.goToSupportedStores}>
              {`supported stores.`}
            </strong>
          </div>
          <div className='plugged__popup__save_submit_store_description'>
            {`Love shopping at `}
            <strong>{`${this.state.currentWebsite}`}</strong>
            {`? Submit a request to get this store supported.`}
          </div>
          <div className='plugged__popup__save_action'>
            <button className='plugged__popup__profile_page_button'
              onClick={this.supportStore}
              disabled={this.state.supportStoreButtonText === 'Support this store!' ? false : true}>
              {this.state.supportStoreButtonText}
            </button>
          </div>
        </div>
      );
    }

    return savePage;
  }
});
