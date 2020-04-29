/* global chrome */
import React from 'react';
import './body.css';
import PopupStore from '../../../stores/popupStore';
import { observer } from "mobx-react";
import popupPagesEnum from '../../../stores/popupPagesEnum';
import ProfilePage from './profilePage/ProfilePage';
import DiscoverPage from './discoverPage/DiscoverPage';
import NotificationsPage from './notificationsPage/NotificationsPage';
import SavePage from './savePage/SavePage';
import EditProfilePage from './editProfilePage/EditProfilePage';
import SupportedStoresPage from './supportedStoresPage/SupportedStoresPage';
import FollowPage from './followPage/FollowPage';
import OtherProfilePage from './otherProfilePage/OtherProfilePage';
import OtherFollowPage from './otherFollowPage/OtherFollowPage';

export default observer(class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    let body = (
      <div></div>
    );

    if (PopupStore.currentPage === popupPagesEnum.HOME) {
      body = (
        <div className='plugged__popup__body'>
          <DiscoverPage/>
        </div>
      );
    } else if (PopupStore.currentPage === popupPagesEnum.NOTIFICATIONS) {
      body = (
        <div className='plugged__popup__body'>
          <NotificationsPage/>
        </div>
      );
    } else if (PopupStore.currentPage === popupPagesEnum.PROFILE) {
      body = (
        <div className='plugged__popup__body'>
          <ProfilePage/>
        </div>
      );
    } else if (PopupStore.currentPage === popupPagesEnum.SAVE) {
      body = (
        <div className='plugged__popup__body'>
          <SavePage/>
        </div>
      );
    } else if (PopupStore.currentPage === popupPagesEnum.EDIT_PROFILE) {
      body = (
        <div className='plugged__popup__body'>
          <EditProfilePage/>
        </div>
      );
    } else if (PopupStore.currentPage === popupPagesEnum.SUPPORTED_STORES) {
      body = (
        <div className='plugged__popup__body'>
          <SupportedStoresPage/>
        </div>
      )
    } else if (PopupStore.currentPage === popupPagesEnum.FOLLOW) {
      body = (
        <div className='plugged__popup__body'>
          <FollowPage username={PopupStore.currentUser.username} />
        </div>
      );
    } else if (PopupStore.currentPage === popupPagesEnum.OTHER_PROFILE) {
      body = (
        <div className='plugged__popup__body'>
          <OtherProfilePage />
        </div>
      );
    } else if (PopupStore.currentPage === popupPagesEnum.OTHER_FOLLOW) {
      body = (
        <div className='plugged__popup__body'>
          <OtherFollowPage />
        </div>
      );
    }

    return body;
  }
});
