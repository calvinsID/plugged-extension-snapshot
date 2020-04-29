/* global chrome */
import React from 'react';
import './followPage.css';
import PopupStore from '../../../../stores/popupStore';
import popupPagesEnum from '../../../../stores/popupPagesEnum';
import secondaryPagesEnum from '../../../../stores/secondaryPagesEnum';
import { observer } from "mobx-react";
import ProfileNavBar from '../profilePage/profileNavBar/ProfileNavBar';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';
import SearchedUserRow from '../discoverPage/discoverSubPage/searchedUserRow/SearchedUserRow';

export default observer(class FollowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username
    }

    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    if (PopupStore.profilePage !== secondaryPagesEnum.PROFILE_FOLLOWERS && PopupStore.profilePage !== secondaryPagesEnum.PROFILE_FOLLOWING) {
      PopupStore.setProfilePage(secondaryPagesEnum.PROFILE_FOLLOWERS);
    }
  }

  goBack() {
    PopupStore.goBack();
  }

  render() {
    let followPage = null;

    followPage = (
      <div className='plugged__popup__follow_page'>
        <div className='plugged__popup__follow_page_nav_bar'>
          <div className='plugged__popup__follow_page_back'>
            <ArrowIcon className='plugged__popup__follow_page_back_icon' onClick={this.goBack}/>
          </div>
          <div className='plugged__popup__follow_page_title'>
            {this.state.username}
          </div>
          <div className='plugged__popup__follow_page_placeholder'></div>
        </div>
        <ProfileNavBar leftTitle='Followers' rightTitle='Following' leftPageEnum={secondaryPagesEnum.PROFILE_FOLLOWERS} rightPageEnum={secondaryPagesEnum.PROFILE_FOLLOWING}/>
        {PopupStore.profilePage === secondaryPagesEnum.PROFILE_FOLLOWERS ? <div className='plugged__popup__follow_page_results_container'>
          {PopupStore.followers.map(item => {
            return <SearchedUserRow key={item.username} user={item} page={popupPagesEnum.FOLLOW}/> 
          })}</div> : <div className='plugged__popup__follow_page_results_container'>
          {PopupStore.following.map(item => {
            return <SearchedUserRow key={item.username} user={item} page={popupPagesEnum.FOLLOW}/>
          })}
        </div>}
      </div>
    );

    return followPage;
  }
});
