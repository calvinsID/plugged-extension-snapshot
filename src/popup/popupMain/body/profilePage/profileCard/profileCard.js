/* global chrome */
import React from 'react';
import './profileCard.css';
import PopupStore from '../../../../../stores/popupStore';
import popupPagesEnum from '../../../../../stores/popupPagesEnum';
import secondaryPagesEnum from '../../../../../stores/secondaryPagesEnum';
import { observer } from "mobx-react";
import defaultProfilePic from '../../../../../images/defaultProfilePic.jpg';

export default observer(class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.logout = this.logout.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.goToFollowersPage = this.goToFollowersPage.bind(this);
    this.goToFollowingPage = this.goToFollowingPage.bind(this);
  }

  componentDidMount() {}

  logout() {
    let height = 250;
    let width = 400;
    let top = (window.innerHeight / 2) - (height / 2);
    let left = (window.innerWidth / 2) - (width / 2);

    this.popupWindow = window.open(PopupStore.authUrl + '/loginScreen/',
      'popUpWindow',
      'height=' + height + ',width=' + width + ',left=' + left + ',top=' + top);
  }

  editProfile() {
    PopupStore.backPages.push({
      popupPage: PopupStore.currentPage,
      secondaryPagesEnum: PopupStore.profilePage
    });
    PopupStore.setCurrentPage(popupPagesEnum.EDIT_PROFILE);
  }

  goToFollowersPage() {
    PopupStore.backPages.push({
      popupPage: PopupStore.currentPage,
      secondaryPagesEnum: PopupStore.profilePage
    });
    PopupStore.setProfilePage(secondaryPagesEnum.PROFILE_FOLLOWERS);
    PopupStore.setCurrentPage(popupPagesEnum.FOLLOW);
  }

  goToFollowingPage() {
    PopupStore.backPages.push({
      popupPage: PopupStore.currentPage,
      secondaryPagesEnum: PopupStore.profilePage
    });
    PopupStore.setProfilePage(secondaryPagesEnum.PROFILE_FOLLOWING);
    PopupStore.setCurrentPage(popupPagesEnum.FOLLOW);
  }

  render() {
    return (
      <div className='plugged__popup__profile_card'>
        <div className='plugged__popup__profile_pic_container'>
          {
            PopupStore.currentUser ?
            (
              <div className='plugged__popup__profile_pic_wrapper'>
                <img className='plugged__popup__profile_pic' src={PopupStore.currentUser.picture_url ? PopupStore.currentUser.picture_url : defaultProfilePic}></img>
                <div className='plugged__popup__profile_info'>
                  <div className='plugged__popup__profile_info_block'>
                    <div className='plugged__popup__profile_info_number'>{PopupStore.numWatchedItems !== null ? PopupStore.numWatchedItems : '-'}</div>
                    <div className='plugged__popup__profile_info_description'>Saved</div>
                  </div>
                  <div className='plugged__popup__profile_info_block plugged__popup__profile_info_block_clickable' onClick={this.goToFollowersPage}>
                    <div className='plugged__popup__profile_info_number'>{PopupStore.numFollowers !== null ? PopupStore.numFollowers : '-'}</div>
                    <div className='plugged__popup__profile_info_description'>Followers</div>
                  </div>
                  <div className='plugged__popup__profile_info_block plugged__popup__profile_info_block_clickable' onClick={this.goToFollowingPage}>
                    <div className='plugged__popup__profile_info_number'>{PopupStore.numFollowing !== null ? PopupStore.numFollowing : '-'}</div>
                    <div className='plugged__popup__profile_info_description'>Following</div>
                  </div>
                </div>
              </div>
            )
            : <div className='plugged__popup__profile_pic'></div>
          }
        </div>
        <div className='plugged__popup__profile_info_container'>
          <div className='plugged__popup__profile_name plugged__ellipsis'>
            {PopupStore.currentUser ? PopupStore.currentUser.username : ''}
          </div>
          <div className='plugged__popup__profile_email plugged__ellipsis'>
            {PopupStore.currentUser ? PopupStore.currentUser.email : ''}
          </div>
          <div className='plugged__popup__profile_action_container'>
            <button className='plugged__popup__profile_action_button plugged__popup__profile_action_button_first' onClick={this.editProfile}>
              Edit Profile
            </button>
            <button className='plugged__popup__profile_action_button plugged__popup__profile_action_button_last' onClick={this.logout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }
});
