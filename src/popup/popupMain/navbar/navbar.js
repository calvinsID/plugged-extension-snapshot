/* global chrome */
import React from 'react';
import './navbar.css';
import $ from 'jquery';
import Home from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import SearchIcon from '@material-ui/icons/Search';
import { observer } from "mobx-react";
import popupPagesEnum from '../../../stores/popupPagesEnum';
import PopupStore from '../../../stores/popupStore';
import OtherProfileStore from '../../../stores/otherProfileStore';
import defaultProfilePic from '../../../images/defaultProfilePic.jpg';

export default observer(class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.setDefaultPage = this.setDefaultPage.bind(this);
    this.goToFeed = this.goToFeed.bind(this);
    this.goToSave = this.goToSave.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
  }

  componentDidMount() {
    this.setDefaultPage();
  }

  setDefaultPage() {
    let frameContents = $("#plugged-popup-root").find('iframe').contents();

    if (PopupStore.currentPage === popupPagesEnum.HOME) {
      frameContents.find('.plugged__navbar__home_button').addClass('plugged__popup__navbar_button_clicked');
      frameContents.find('.plugged__navbar__home_icon').addClass('plugged__popup__navbar_icon_clicked');
    } else if (PopupStore.currentPage === popupPagesEnum.NOTIFICATIONS) {
      frameContents.find('.plugged__navbar__notifications_button').addClass('plugged__popup__navbar_button_clicked');
      frameContents.find('.plugged__navbar__notifications_icon').addClass('plugged__popup__navbar_icon_clicked');
    } else if (PopupStore.currentPage === popupPagesEnum.PROFILE) {
      frameContents.find('.plugged__navbar__profile_button').addClass('plugged__popup__navbar_button_clicked');
      frameContents.find('.plugged__navbar__profile_icon').addClass('plugged__popup__navbar_icon_clicked');
    } else if (PopupStore.currentPage === popupPagesEnum.SAVE) {
      frameContents.find('.plugged__navbar__save_button').addClass('plugged__popup__navbar_button_clicked');
      frameContents.find('.plugged__navbar__save_icon').addClass('plugged__popup__navbar_icon_clicked');
    }
  }

  goToFeed() {
    PopupStore.clearBackPages();
    OtherProfileStore.clearOtherProfiles();
    PopupStore.setCurrentPage(popupPagesEnum.HOME)
  }

  goToSave() {
    PopupStore.clearBackPages();
    OtherProfileStore.clearOtherProfiles();
    PopupStore.setCurrentPage(popupPagesEnum.SAVE)
  }

  goToProfile() {
    PopupStore.clearBackPages();
    OtherProfileStore.clearOtherProfiles();
    PopupStore.setCurrentPage(popupPagesEnum.PROFILE)
  }

  goToNotifications() {
    PopupStore.clearBackPages();
    OtherProfileStore.clearOtherProfiles();
    PopupStore.setCurrentPage(popupPagesEnum.NOTIFICATIONS);
  }

  render() {
    return (
      <div className='plugged__popup__navbar'>
        <button className={'plugged__popup__navbar_button plugged__navbar__home_button'} onClick={this.goToFeed}>
          <Home className={'plugged__popup__navbar_icon plugged__navbar__home_icon'}/>
          <span className='plugged__popup__navbar_title'>Homefeed</span>
        </button>
        <button className={'plugged__popup__navbar_button plugged__navbar__save_button'} onClick={this.goToSave}>
          <BookmarkIcon className={'plugged__popup__navbar_icon plugged__navbar__save_icon'}/>
          <span className='plugged__popup__navbar_title'>Save</span>
        </button>
        <button className={'plugged__popup__navbar_button plugged__navbar__notifications_button'} onClick={this.goToNotifications}>
          <Notifications className={'plugged__popup__navbar_icon plugged__navbar__notifications_icon'}/>
          <span className='plugged__popup__navbar_title'>Notifs</span>
        </button>
        <button className={'plugged__popup__navbar_button plugged__navbar__profile_button'} onClick={this.goToProfile}>
          <img className='plugged__popup__navbar_display_pic'
               src={PopupStore.currentUser && PopupStore.currentUser.picture_url ? PopupStore.currentUser.picture_url : defaultProfilePic}/>
          <span className='plugged__popup__navbar_title'>Profile</span>
        </button>
      </div>
    )
  }
});
