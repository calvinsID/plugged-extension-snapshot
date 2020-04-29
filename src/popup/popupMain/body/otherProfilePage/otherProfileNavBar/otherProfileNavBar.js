/* global chrome */
import React from 'react';
import PopupStore from '../../../../../stores/popupStore';
import { observer } from "mobx-react";

export default observer(class OtherProfileNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftTitle: this.props.leftTitle,
      rightTitle: this.props.rightTitle,
      leftPageEnum: this.props.leftPageEnum,
      rightPageEnum: this.props.rightPageEnum
    }

    this.setOtherProfilePage = this.setOtherProfilePage.bind(this);
  }

  componentDidMount() {}

  setOtherProfilePage(page) {
    PopupStore.setOtherProfilePage(page);
  }

  render() {
    return (
      <div className='plugged__popup__profile_nav_bar'>
        <button className={'plugged__popup__profile_nav_bar_option plugged__popup__profile_nav_bar_saved ' +
                (PopupStore.otherProfilePage === this.state.leftPageEnum ? 'plugged__popup__profile_btn_selected' : '')}
                onClick={() => {this.setOtherProfilePage(this.state.leftPageEnum)}}>
          <div className={'plugged__popup__profile_navbar_btn_wrapper ' + (PopupStore.otherProfilePage === this.state.leftPageEnum ? 'plugged__popup__profile_selected' : '')}>
            {this.state.leftTitle}
          </div>
        </button>
        <button className={'plugged__popup__profile_nav_bar_option plugged__popup__profile_nav_bar_stores ' + 
                (PopupStore.otherProfilePage === this.state.rightPageEnum ? 'plugged__popup__profile_btn_selected' : '')}
                onClick={() => {this.setOtherProfilePage(this.state.rightPageEnum)}}>
          <div className={'plugged__popup__profile_navbar_btn_wrapper ' + (PopupStore.otherProfilePage === this.state.rightPageEnum ? 'plugged__popup__profile_selected' : '')}>
            {this.state.rightTitle}
          </div>
        </button>
      </div>
    );
  }
});
