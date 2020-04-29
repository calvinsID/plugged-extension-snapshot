/* global chrome */
import React from 'react';
import './profileSubPage.css';
import PopupStore from '../../../../../stores/popupStore';
import { observer } from "mobx-react";
import secondaryPagesEnum from '../../../../../stores/secondaryPagesEnum';
import WatchedItem from '../../watchedItem/WatchedItem';
import StoreRow from '../../storeRow/StoreRow';
import background from '../../../../../images/shoppingBag.gif';
import loginEnum from '../../../../../stores/loginEnum';
import { toJS } from 'mobx';

export default observer(class ProfileSubPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.goToSupportedStores = this.goToSupportedStores.bind(this);
  }

  componentDidMount() {}

  goToSupportedStores() {
    PopupStore.setProfilePage(secondaryPagesEnum.PROFILE_STORES);
  }

  render() {
    if (PopupStore.profilePage === secondaryPagesEnum.PROFILE_STORES) {
      if (!PopupStore.hasLoadedStores) {
        PopupStore.hasLoadedStores = true;
        PopupStore.saveStores();
        PopupStore.saveFavoriteStores();
      }
    } else if (PopupStore.profilePage === secondaryPagesEnum.PROFILE_SAVED) {
      if (!PopupStore.hasLoadedWatchedItems && PopupStore.isLoggedIn === loginEnum.LOGGED_IN) {
        PopupStore.hasLoadedWatchedItems = true;
        chrome.runtime.sendMessage({action: 'refreshWatchedItems'});
      }
    }

    let body = (
      <div></div>
    );

    if (PopupStore.profilePage === secondaryPagesEnum.PROFILE_SAVED) {
      body = (
        <div className='plugged__popup__profile_sub_page'>
          {PopupStore.watchedItems.length ? (
            PopupStore.watchedItems.map((item) => {
              return <WatchedItem key={item.product_url} watchedItem={item}/>;
            })
          ) : (
            <div className='plugged__popup__profile_sub_page_empty'>
              <img src={background} className='plugged__popup__profile_sub_page_empty_background'></img>
              <div className='plugged__popup__profile_sub_page_empty_description'>
                Save products while shopping at any of our &nbsp;
                <span className='plugged__popup__save_supported_stores' onClick={this.goToSupportedStores}>
                  supported stores
                </span>, and we'll email you if it goes on sale!
              </div>
            </div>
          )}
        </div>
      );
    } else if (PopupStore.profilePage === secondaryPagesEnum.PROFILE_STORES) {
      body = (
        <div className='plugged__popup__profile_sub_page'>
          {PopupStore.favoriteStores.length ? (
            <div className='plugged__popup__favorite_stores plugged__popup__section'>
              <div className='plugged__popup__stores_name'>
                Favorite Stores
              </div>
              {PopupStore.favoriteStores.map((fave) => {
                return <StoreRow key={fave.name} store={fave} isFave={true}/>
              })}
            </div>
          ) : <div></div>}
          {PopupStore.stores.length ? (
            <div className='plugged__popup__stores plugged__popup__section'>
              <div className='plugged__popup__stores_name'>
                Supported Stores
              </div>
              {PopupStore.stores.map((store) => {
                return <StoreRow key={store.name} store={store} isFave={false}/>;
              })}
            </div>
          ) : <div></div>}
        </div>
      );
    }

    return body;
  }
});
