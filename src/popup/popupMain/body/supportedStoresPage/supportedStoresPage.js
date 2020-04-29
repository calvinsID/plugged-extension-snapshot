/* global chrome */
import React from 'react';
import './supportedStoresPage.css';
import PopupStore from '../../../../stores/popupStore';
import popupPagesEnum from '../../../../stores/popupPagesEnum';
import { observer } from "mobx-react";
import SupportedStoreRow from './supportedStoreRow/SupportedStoreRow';

export default observer(class SupportedStoresPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.homefeed = this.homefeed.bind(this);
    this.profile = this.profile.bind(this);
  }

  componentDidMount() {
    PopupStore.getAllSupportedStores();
  }

  homefeed() {
    PopupStore.setCurrentPage(popupPagesEnum.HOME);
  }

  profile() {
    PopupStore.setCurrentPage(popupPagesEnum.PROFILE);
  }

  render() {
    let supportedStoresPage = (
      <div className='plugged__popup__supported_stores_page'>
        <div className='plugged__popup__supported_stores_nav_bar'>
          <div className='plugged__popup__supported_stores_home'>
            <span className='plugged__popup__supported_stores_cursor' onClick={this.homefeed}>Feed</span>
          </div>
          <div className='plugged__popup__supported_stores_title'>
            Supported Stores
          </div>
          <div className='plugged__popup__supported_stores_profile'>
            <span className='plugged__popup__supported_stores_cursor' onClick={this.profile}>Profile</span>
          </div>
        </div>
        <div className='plugged__popup__supported_store_row_container'>
          {PopupStore.allSupportedStores.map(store => {
            return <SupportedStoreRow store={store}/>
          })}
        </div>
      </div>
    );

    return supportedStoresPage;
  }
});
