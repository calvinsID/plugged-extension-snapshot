/* global chrome */
import React from 'react';
import { observer } from "mobx-react";
import './otherProfilePage.css';
import PopupStore from '../../../../stores/popupStore';
import OtherProfileStore from '../../../../stores/otherProfileStore';
import OtherProfileSubPage from './otherProfileSubPage/OtherProfileSubPage';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';
import defaultProfilePic from '../../../../images/defaultProfilePic.jpg';
import secondaryPagesEnum from '../../../../stores/secondaryPagesEnum';
import popupPagesEnum from '../../../../stores/popupPagesEnum';
import $ from 'jquery';
import {toJS} from 'mobx';
import loadingEllipsisBlack from '../../../../images/loadingEllipsisBlack.gif';

export default observer(class OtherProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: PopupStore.isFollowing(OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].username),
      isLoading: false
    }

    this.goBack = this.goBack.bind(this);
    this.goToOtherFollowersPage = this.goToOtherFollowersPage.bind(this);
    this.goToOtherFollowingPage = this.goToOtherFollowingPage.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
  }

  componentDidMount() {

  }

  goBack() {
    OtherProfileStore.goBack();
    PopupStore.goBack();
  }

  goToOtherFollowersPage() {
    PopupStore.backPages.push({
      popupPage: PopupStore.currentPage,
      secondaryPagesEnum: PopupStore.otherProfilePage
    });
    PopupStore.setOtherProfilePage(secondaryPagesEnum.PROFILE_FOLLOWERS);
    PopupStore.setCurrentPage(popupPagesEnum.OTHER_FOLLOW);
  }

  goToOtherFollowingPage() {
    PopupStore.backPages.push({
      popupPage: PopupStore.currentPage,
      secondaryPagesEnum: PopupStore.otherProfilePage
    });
    PopupStore.setOtherProfilePage(secondaryPagesEnum.PROFILE_FOLLOWING);
    PopupStore.setCurrentPage(popupPagesEnum.OTHER_FOLLOW);
  }

  followUser() {
    let username = OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].username;
    let data = {
      action: 'followUser',
      username: username
    };
    this.setState({isLoading: true}, () => {
      chrome.runtime.sendMessage(data, (response) => {
        this.setState({isLoading: false});
        if (response.status === 200) {
          this.setState({isFollowing: true});
  
          PopupStore.setFollowing();
          OtherProfileStore.updateFollowing(PopupStore.currentUser.username, username);
        } else {
          this.showErrorMessage();
        }
      });
    });
  }

  unfollowUser() {
    let username = OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].username;
    let data = {
      action: 'unfollowUser',
      username: username
    };
    this.setState({isLoading: true}, () => {
      chrome.runtime.sendMessage(data, (response) => {
        this.setState({isLoading: false});
        if (response.status === 200) {
          this.setState({isFollowing: false});
  
          PopupStore.setFollowing();
          OtherProfileStore.updateFollowing(PopupStore.currentUser.username, username);
        } else {
          this.showErrorMessage();
        }
      });
    });
  }

  showErrorMessage() {
    let frameContents = $("#plugged-popup-root").find('iframe').contents();
    frameContents.find('.plugged__other_profile_page__error').addClass('plugged__item_modal__error_fade_in');
    setTimeout(() => {
      frameContents.find('.plugged__other_profile_page__error').removeClass('plugged__item_modal__error_fade_in');
    }, 5000);
  }

  render() {
    let otherProfilePage = (
      <div>
        <div className='plugged__popup__follow_page_nav_bar'>
          <div className='plugged__popup__follow_page_back'>
            <ArrowIcon className='plugged__popup__follow_page_back_icon' onClick={this.goBack}/>
          </div>
          <div className='plugged__popup__follow_page_title'>
            {OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].username}
          </div>
          <div className='plugged__popup__follow_page_placeholder'></div>
        </div>
        <div className='plugged__popup__profile_card'>
          <div className='plugged__popup__profile_pic_container'>
            <div className='plugged__popup__profile_pic_wrapper'>
              <img className='plugged__popup__profile_pic' src={
                OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].picture_url ?
                OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].picture_url : defaultProfilePic
              }/>
              <div className='plugged__popup__profile_info'>
                <div className='plugged__popup__profile_info_block'>
                  <div className='plugged__popup__profile_info_number'>{OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].numWatchedItems !== null ?
                    OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].numWatchedItems :
                    '-'
                  }</div>
                  <div className='plugged__popup__profile_info_description'>Saved</div>
                </div>
                <div className='plugged__popup__profile_info_block plugged__popup__profile_info_block_clickable' onClick={this.goToOtherFollowersPage}>
                  <div className='plugged__popup__profile_info_number'>{OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].numFollowers !== null ?
                    OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].numFollowers :
                    '-'
                  }</div>
                  <div className='plugged__popup__profile_info_description'>Followers</div>
                </div>
                <div className='plugged__popup__profile_info_block plugged__popup__profile_info_block_clickable' onClick={this.goToOtherFollowingPage}>
                  <div className='plugged__popup__profile_info_number'>{OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].numFollowing !== null ?
                    OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].numFollowing :
                    '-'
                  }</div>
                  <div className='plugged__popup__profile_info_description'>Following</div>
                </div>
              </div>
            </div>
          </div>
          <div className='plugged__popup__profile_info_container'>
            <div className='plugged__popup__profile_name plugged__ellipsis'>
              {OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].name}
            </div>
            <div className='plugged__other_profile_page__action_container'>
              {
                OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].username === PopupStore.currentUser.username ? 
                null :
                <button
                  className='plugged__popup__profile_action_button plugged__popup__profile_action_button_first plugged__other_profile_page__follow_button'
                  onClick={this.state.isFollowing ? this.unfollowUser : this.followUser}
                  disabled={this.state.isLoading ? true : false}>
                    {this.state.isLoading ? (this.state.isFollowing ? 'Unfollowing' : 'Following') : (this.state.isFollowing ? 'Unfollow' : 'Follow')}
                    {this.state.isLoading ? <img className='plugged__item_modal__loading_gif' src={loadingEllipsisBlack}/> : null}
                </button>
              }
              <span className='plugged__other_profile_page__error'>Oops! Something went wrong. Please try again later</span>
            </div>
          </div>
        </div>
        <OtherProfileSubPage/>
      </div>
    );

    return otherProfilePage;
  }
});
