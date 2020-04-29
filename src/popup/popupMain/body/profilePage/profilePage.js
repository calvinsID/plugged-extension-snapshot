/* global chrome */
import React from 'react';
import './profilePage.css';
import PopupStore from '../../../../stores/popupStore';
import loginEnum from '../../../../stores/loginEnum';
import ProfileCard from './profileCard/ProfileCard';
import ProfileNavBar from './profileNavBar/ProfileNavBar';
import ProfileSubPage from './profileSubPage/ProfileSubPage';
import { observer } from "mobx-react";
import background from '../../../../images/loginGif.gif';
import popupPagesEnum from '../../../../stores/popupPagesEnum';
import secondaryPagesEnum from '../../../../stores/secondaryPagesEnum';

export default observer(class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.popupWindow = null;

    this.getStarted = this.getStarted.bind(this);
    this.goToSupportedStores = this.goToSupportedStores.bind(this);
  }

  componentDidMount() {
    if (PopupStore.profilePage !== secondaryPagesEnum.PROFILE_SAVED && PopupStore.profilePage !== secondaryPagesEnum.PROFILE_STORES) {
      PopupStore.setProfilePage(secondaryPagesEnum.PROFILE_SAVED);
    }
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.action === 'pluggedSignIn') {
        if (this.popupWindow) {
          this.popupWindow.close();
          this.popupWindow = null;
        }
      }
    });
  }

  getStarted() {
    let height = 300;
    let width = 400;
    let top = (window.innerHeight / 2) - (height / 2);
    let left = (window.innerWidth / 2) - (width / 2);

    this.popupWindow = window.open(PopupStore.authUrl + '/loginScreen/',
      'popUpWindow',
      'height=' + height + ',width=' + width + ',left=' + left + ',top=' + top);
  }

  goToSupportedStores() {
    PopupStore.setCurrentPage(popupPagesEnum.SUPPORTED_STORES);
  }

  render() {
    let profilePage = (
      <div></div>
    );

    if (PopupStore.isLoggedIn === loginEnum.NOT_VERIFIED) {
      profilePage = (
        <div className='plugged__popup__profile_page'>
          <div className='plugged__popup__profile_page_section'>
            <img src={background} className='plugged__popup__profile_page_background'></img>
            <h3 className='plugged__popup__profile_page_title'>
              Verify your Email Address
            </h3>
            <div className='plugged__popup__profile_page_description'>
              We have sent a verification email to &nbsp; <b>{PopupStore.currentUser.email}</b>. Please click on the link in the email, and sign in below once your email is verified.
            </div>
            <button className='plugged__popup__profile_page_button' onClick={this.getStarted}>
              Sign in
            </button>
          </div>
        </div>
      );
    } else if (PopupStore.isLoggedIn === loginEnum.LOGGED_IN) {
      profilePage = (
        <div>
          <ProfileCard/>
          <ProfileNavBar leftTitle='Saved' rightTitle='Stores' leftPageEnum={secondaryPagesEnum.PROFILE_SAVED} rightPageEnum={secondaryPagesEnum.PROFILE_STORES}/>
          <ProfileSubPage/>
        </div>
      );
    } else {
      profilePage = (
        <div className='plugged__popup__profile_page'>
          <div className='plugged__popup__profile_page_section'>
            <img src={background} className='plugged__popup__profile_page_background'></img>
            <h3 className='plugged__popup__profile_page_title'>
              Welcome to Plugged!
            </h3>
            <div className='plugged__popup__profile_page_description'>
              Log in to start saving products while shopping at our &nbsp;
              <span className='plugged__popup__save_supported_stores' onClick={this.goToSupportedStores}>
                supported stores
              </span>. If the price drops, we'll notify you by email.
            </div>
            <button className='plugged__popup__profile_page_button' onClick={this.getStarted}>
              Get started!
            </button>
          </div>
        </div>
      );
    }

    return profilePage;
  }
});
