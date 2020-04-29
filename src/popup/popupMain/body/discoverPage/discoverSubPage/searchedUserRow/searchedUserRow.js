/* global chrome */
import React from 'react';
import './SearchedUserRow.css';
import { observer } from "mobx-react";
import defaultProfilePic from '../../../../../../images/defaultProfilePic.jpg';
import secondaryPagesEnum from '../../../../../../stores/secondaryPagesEnum';
import PopupStore from '../../../../../../stores/popupStore';
import OtherProfileStore from '../../../../../../stores/otherProfileStore';
import popupPagesEnum from '../../../../../../stores/popupPagesEnum';

export default observer(class SearchedUserRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      username: this.props.user.username,
      picture_url: this.props.user.picture_url
    }

    this.goToUser = this.goToUser.bind(this);
  }

  componentDidMount() {}

  goToUser() {
    let secondaryPage = null;

    if (this.props.page === popupPagesEnum.PROFILE) {
      secondaryPage = PopupStore.profilePage;
    } else if (this.props.page === popupPagesEnum.FOLLOW) {
      secondaryPage = PopupStore.profilePage;
    } else if (this.props.page === popupPagesEnum.HOME) {
      secondaryPage = PopupStore.discoverPage;
    } else if (this.props.page === popupPagesEnum.OTHER_PROFILE) {
      secondaryPage = PopupStore.otherProfilePage;
    } else if (this.props.page === popupPagesEnum.OTHER_FOLLOW) {
      secondaryPage = PopupStore.otherProfilePage;
    }
    
    PopupStore.backPages.push({
      popupPage: PopupStore.currentPage,
      secondaryPagesEnum: secondaryPage
    });
    OtherProfileStore.addOtherProfile(this.state.name, this.state.username, this.state.picture_url);
    PopupStore.setCurrentPage(popupPagesEnum.OTHER_PROFILE);
  }

  render() {
    return (
      <div className='plugged__popup__searched_user_row' onMouseDown={this.goToUser}>
        <img src={this.state.picture_url ? this.state.picture_url : defaultProfilePic} className='plugged__popup__searched_user_row_picture'/>
        <div className='plugged__popup__searched_user_row_info'>
          <div>
            {this.state.name}
          </div>
          <div>
            {this.state.username}
          </div>
        </div>
      </div>
    );
  }
});
