/* global chrome */
import React from 'react';
import PopupStore from '../../../../stores/popupStore';
import OtherProfileStore from '../../../../stores/otherProfileStore';
import popupPagesEnum from '../../../../stores/popupPagesEnum';
import secondaryPagesEnum from '../../../../stores/secondaryPagesEnum';
import { observer } from "mobx-react";
import OtherProfileNavBar from '../otherProfilePage/otherProfileNavBar/OtherProfileNavBar';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';
import SearchedUserRow from '../discoverPage/discoverSubPage/searchedUserRow/SearchedUserRow';

export default observer(class OtherFollowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username
    }

    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {

  }

  goBack() {
    PopupStore.goBack();
  }

  render() {
    let otherFollowPage = null;

    otherFollowPage = (
      <div className='plugged__popup__follow_page'>
        <div className='plugged__popup__follow_page_nav_bar'>
          <div className='plugged__popup__follow_page_back'>
            <ArrowIcon className='plugged__popup__follow_page_back_icon' onClick={this.goBack}/>
          </div>
          <div className='plugged__popup__follow_page_title'>
            {OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].username}
          </div>
          <div className='plugged__popup__follow_page_placeholder'></div>
        </div>
        <OtherProfileNavBar leftTitle='Followers' rightTitle='Following' leftPageEnum={secondaryPagesEnum.PROFILE_FOLLOWERS} rightPageEnum={secondaryPagesEnum.PROFILE_FOLLOWING}/>
        {PopupStore.otherProfilePage === secondaryPagesEnum.PROFILE_FOLLOWERS ? <div className='plugged__popup__follow_page_results_container'>
          {OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].followers.map(item => {
            return <SearchedUserRow key={item.username} user={item} page={popupPagesEnum.OTHER_FOLLOW}/> 
          })}</div> : <div className='plugged__popup__follow_page_results_container'>
          {OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].following.map(item => {
            return <SearchedUserRow key={item.username} user={item} page={popupPagesEnum.OTHER_FOLLOW}/>
          })}
        </div>}
      </div>
    );

    return otherFollowPage;
  }
});
