/* global chrome */
import React from 'react';
import './profileNavBar.css';
import PopupStore from '../../../../../stores/popupStore';
import { observer } from "mobx-react";

export default observer(class ProfileNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftTitle: this.props.leftTitle,
      rightTitle: this.props.rightTitle,
      leftPageEnum: this.props.leftPageEnum,
      rightPageEnum: this.props.rightPageEnum
    }

    this.setProfilePage = this.setProfilePage.bind(this);
  }

  componentDidMount() {}

  setProfilePage(page) {
    PopupStore.setProfilePage(page);
  }

  render() {
    return (
      <div className='plugged__popup__profile_nav_bar'>
        <button className={'plugged__popup__profile_nav_bar_option plugged__popup__profile_nav_bar_saved ' +
                (PopupStore.profilePage === this.state.leftPageEnum ? 'plugged__popup__profile_btn_selected' : '')}
                onClick={() => {this.setProfilePage(this.state.leftPageEnum)}}>
          <div className={'plugged__popup__profile_navbar_btn_wrapper ' + (PopupStore.profilePage === this.state.leftPageEnum ? 'plugged__popup__profile_selected' : '')}>
            {this.state.leftTitle}
          </div>
        </button>
        <button className={'plugged__popup__profile_nav_bar_option plugged__popup__profile_nav_bar_stores ' + 
                (PopupStore.profilePage === this.state.rightPageEnum ? 'plugged__popup__profile_btn_selected' : '')}
                onClick={() => {this.setProfilePage(this.state.rightPageEnum)}}>
          <div className={'plugged__popup__profile_navbar_btn_wrapper ' + (PopupStore.profilePage === this.state.rightPageEnum ? 'plugged__popup__profile_selected' : '')}>
            {this.state.rightTitle}
          </div>
        </button>
      </div>
    );
  }
});
