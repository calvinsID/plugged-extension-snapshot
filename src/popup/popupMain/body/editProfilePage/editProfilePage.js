/* global chrome */
import React from 'react';
import './editProfilePage.css';
import PopupStore from '../../../../stores/popupStore';
import popupPagesEnum from '../../../../stores/popupPagesEnum';
import { observer } from "mobx-react";
import defaultProfilePic from '../../../../images/defaultProfilePic.jpg';
import $ from 'jquery';

export default observer(class EditProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      username: null,
      gender: null,
      picture_url: null,

      errorMessage: null,
      isSaving: false,
    }

    this.cancel = this.cancel.bind(this);
    this.done = this.done.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.invalidName = this.invalidName.bind(this);
    this.invalidUsername = this.invalidUsername.bind(this);
  }

  componentDidMount() {
    this.setState(PopupStore.currentUser);
  }

  cancel() {
    PopupStore.goBack();
  }

  done() {
    this.setState({
      isSaving: true,
      fullName: this.state.fullName.trim(),
      username: this.state.username.trim()
    });

    let hasError = false;

    if (!this.state.fullName) {
      this.setState({errorMessage: 'Enter a name.'});
      hasError = true;
    } else if (this.state.fullName.length > 30) {
      this.setState({errorMessage: 'Enter a name under 30 characters.'});
      hasError = true;
    } else if (this.invalidName(this.state.fullName)) {
      this.setState({errorMessage: 'Invalid name. Valid characters are A-Z a-z 0-9 . _ -.'});
      hasError = true;
    } else if (!this.state.username) {
      this.setState({errorMessage: 'Enter a username.'});
      hasError = true;
    } else if (this.state.username.length > 30) {
      this.setState({errorMessage: 'Enter a username under 30 characters.'});
      hasError = true;
    } else if ((PopupStore.currentUser.username !== this.state.username) && this.invalidUsername(this.state.username)) {
      this.setState({errorMessage: 'Invalid username. Valid characters are A-Z a-z 0-9 . _ -.'});
      hasError = true;
    } else if (this.state.gender && this.state.gender !== 'Male' && this.state.gender !== 'Female' && this.state.gender !== 'Other') {
      this.setState({errorMessage: 'Invalid gender.'});
      hasError = true;
    }

    if (hasError) {
      this.showErrorMessage();
      this.setState({isSaving: false});
    } else if ((PopupStore.currentUser.fullName !== this.state.fullName) ||
               (PopupStore.currentUser.username !== this.state.username) ||
               (PopupStore.currentUser.gender !== this.state.gender)) {

      let data = {
        action: 'updateProfile',
        fullName: this.state.fullName,
        gender: this.state.gender
      };

      // Only add username if its different from default, since '#' is not allowed
      if (PopupStore.currentUser.username !== this.state.username) {
        data.username = this.state.username;
      }

      chrome.runtime.sendMessage(data, (response) => {
        this.setState({isSaving: false});

        if (response.status === 200) {
          let updatedCurrentUser = {
            email: response.response.email,
            email_verified: PopupStore.currentUser.email_verified,
            fullName: response.response.name,
            gender: response.response.gender,
            picture_url: PopupStore.currentUser.picture_url,
            username: response.response.username
          };
          chrome.storage.local.set({
            pluggedCurrentUser: updatedCurrentUser
          }, () => {
            PopupStore.setCurrentUser(updatedCurrentUser);
            PopupStore.setCurrentPage(popupPagesEnum.PROFILE);
          });
        } else {
          this.setState({errorMessage: response.responseText});
          this.showErrorMessage();
        }
      });
    } else {
      this.setState({isSaving: false});
      PopupStore.setCurrentPage(popupPagesEnum.PROFILE);
    }
  }

  invalidName(name) {
    return name.match(/[^A-Za-z0-9\-_. ]/);
  }

  invalidUsername(name) {
    return name.match(/[^A-Za-z0-9\-_.]/);
  }

  updateValue(type, event) {
    if (type === 'fullName') {
      this.setState({fullName: event.target.value});
    } else if (type === 'username') {
      this.setState({username: event.target.value});
    }
  }

  updateSelect(event) {
    this.setState({gender: event.target.value});
  }

  showErrorMessage() {
    let frameContents = $("#plugged-popup-root").find('iframe').contents();
    frameContents.find('.plugged__popup__edit_error').addClass('plugged__popup__edit_error_fade_in');
    setTimeout(() => {
      frameContents.find('.plugged__popup__edit_error').removeClass('plugged__popup__edit_error_fade_in');
    }, 5000);
  }

  render() {
    let editProfilePage = (
      <div className='plugged__popup__edit_profile_page'>
        <div className='plugged__popup__edit_profile_nav_bar'>
          <div className='plugged__popup__edit_profile_cancel'>
            <span className='plugged__popup__edit_profile_cursor' onClick={this.cancel}>Cancel</span>
          </div>
          <div className='plugged__popup__edit_profile_title'>
            Edit Profile
          </div>
          <div className='plugged__popup__edit_profile_done'>
            <button className='plugged__popup__edit_profile_save'
                    onClick={this.done}
                    disabled={this.state.isSaving ? true : false}>
              {this.state.isSaving ? 'Saving' : 'Done'}
            </button>
          </div>
        </div>
        <div>
        <p className='plugged__popup__edit_error'>{this.state.errorMessage}</p>
        </div>
        <div className='plugged__popup__edit_profile_pic_container'>
          <img className={PopupStore.currentUser.picture_url ? 'plugged__popup__edit_profile_pic' : 'plugged__popup__edit_profile_pic plugged__popup__edit_profile_pic_shadow'}
               src={PopupStore.currentUser.picture_url ? PopupStore.currentUser.picture_url : defaultProfilePic}/>
          <div className='plugged__popup__edit_profile_email'>{PopupStore.currentUser.email}</div>
        </div>
        <div className='plugged__popup__edit_profile_info_container'>
          <div className='plugged__popup__edit_profile_row'>
            <div className='plugged__popup__edit_profile_label'>Name</div>
            <input type='text'
                   className='plugged__popup__edit_profile_input'
                   value={this.state.fullName}
                   onChange={event => this.updateValue('fullName', event)}/>
          </div>
          <div className='plugged__popup__edit_profile_row'>
            <div className='plugged__popup__edit_profile_label'>Username</div>
            <input type='text'
                   className='plugged__popup__edit_profile_input'
                   value={this.state.username}
                   onChange={event => this.updateValue('username', event)}></input>
          </div>
          <div className='plugged__popup__edit_profile_row'>
            <div className='plugged__popup__edit_profile_label'>Gender</div>
            <select className='plugged__popup__edit_profile_select'
                    value={this.state.gender}
                    onChange={event => this.updateSelect(event)}>
              <option value="Other">Other</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </div>
    );

    return editProfilePage;
  }
});
