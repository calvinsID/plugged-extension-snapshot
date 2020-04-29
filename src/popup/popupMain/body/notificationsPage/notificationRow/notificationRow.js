/* global chrome */
import React from 'react';
import { observer } from "mobx-react";
import defaultProfilePic from '../../../../../images/defaultProfilePic.jpg';
import PopupStore from '../../../../../stores/popupStore';
import OtherProfileStore from '../../../../../stores/otherProfileStore';
import popupPagesEnum from '../../../../../stores/popupPagesEnum';
import HelperFunctions from '../../../../../stores/helperFunctions';
import './notificationRow.css';
import {toJS} from 'mobx';

export default observer(class NotificationRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.notification.type,
      description: this.props.notification.description,
      timestamp: this.props.notification.timestamp,
      followingUserName: this.props.notification.name,
      followingUserUsername: this.props.notification.username,
      followingUserPictureUrl: this.props.notification.picture_url,
      productUrl: this.props.notification.product_url,
      imageUrl: this.props.notification.image_url,
      productName: this.props.notification.product_variation_name,
      beforePrice: this.props.notification.before_price ? parseFloat(this.props.notification.before_price) : null,
      afterPrice: this.props.notification.after_price ? parseFloat(this.props.notification.after_price) : null
    }

    this.clickedProduct = this.clickedProduct.bind(this);
    this.clickedFollower = this.clickedFollower.bind(this);

    this.watchedItemIndex = -1;
  }

  componentDidMount() {
    this.watchedItemIndex = PopupStore.watchedItems.findIndex(i => i.product_url === this.state.productUrl);
  }

  clickedProduct() {
    if (this.watchedItemIndex !== -1) {
      PopupStore.openItemModal(PopupStore.watchedItems[this.watchedItemIndex]);
    }
  }

  clickedFollower() {
    PopupStore.backPages.push({
      popupPage: popupPagesEnum.NOTIFICATIONS,
      secondaryPagesEnum: null
    });
    OtherProfileStore.addOtherProfile(this.state.followingUserName, this.state.followingUserUsername, this.state.followingUserPictureUrl);
    PopupStore.setCurrentPage(popupPagesEnum.OTHER_PROFILE);
  }

  render() {
    let notificationRow = null;

    if (this.state.type === 'follower') {
      notificationRow = (
        <div className='plugged__notifications_page__row plugged__grid_row__long' onClick={this.clickedFollower}>
          <img src={this.state.followingUserPictureUrl ? this.state.followingUserPictureUrl : defaultProfilePic}
            className='plugged__notifications_page__row_profile_picture'/>
          <div className='plugged__notifications_page__row_info'>
            <div className='plugged__notifications_page__row_name'>
              <b>{`${this.state.followingUserUsername} `}</b>
              started following you.
              <span className='plugged__timestamp'>{` ${HelperFunctions.timeSince(this.state.timestamp)}`}</span>
            </div>
          </div>
          <div className='plugged__notifications_page__action'>
          </div>
        </div>
      );
    } else if (this.state.type === 'follow_request') {
      notificationRow = (
        <div className='plugged__notifications_page__row plugged__grid_row__short'>
          <img src={this.state.followingUserPictureUrl ? this.state.followingUserPictureUrl : defaultProfilePic}
            className='plugged__notifications_page__row_profile_picture'/>
          <div className='plugged__notifications_page__row_info'>
            <div className='plugged__notifications_page__row_name'>
              <b>{`${this.state.followingUserUsername} `}</b>
              requested to follow you.
              <span className='plugged__timestamp'>{` ${HelperFunctions.timeSince(this.state.timestamp)}`}</span>
            </div>
          </div>
          <div className='plugged__notifications_page__action'>
            Confirm
          </div>
        </div>
      );
    } else if (this.state.type === 'follow_request_approved') {
      notificationRow = (
        <div className='plugged__notifications_page__row plugged__grid_row__long'>
          <img src={this.state.followingUserPictureUrl ? this.state.followingUserPictureUrl : defaultProfilePic}
            className='plugged__notifications_page__row_profile_picture'/>
          <div className='plugged__notifications_page__row_info'>
            <div className='plugged__notifications_page__row_name'>
              <b>{`${this.state.followingUserUsername} `}</b>
              approved your follow request.
              <span className='plugged__timestamp'>{` ${HelperFunctions.timeSince(this.state.timestamp)}`}</span>
            </div>
          </div>
          <div className='plugged__notifications_page__action'>
          </div>
        </div>
      );
    } else if (this.state.type === 'price_change') {
      notificationRow = (
        <div className='plugged__notifications_page__row plugged__grid_row__long' onClick={this.clickedProduct}>
          <img src={this.state.imageUrl}
            className='plugged__notifications_page__row_product_picture'/>
          <div className='plugged__notifications_page__row_info'>
            <div className='plugged__notifications_page__row_name'>
              <b>{`${this.state.productName} `}</b>
              changed from
              <b>{` $${this.state.beforePrice} `}</b>
              to
              <b>{` $${this.state.afterPrice}.`}</b>
              <span className='plugged__timestamp'>{` ${HelperFunctions.timeSince(this.state.timestamp)}`}</span>
            </div>
          </div>
          <div className='plugged__notifications_page__action'>
          </div>
        </div>
      );
    } else if (this.state.type === 'product_removed') {
      notificationRow = (
        <div className='plugged__notifications_page__row plugged__grid_row__long' onClick={this.clickedProduct}>
          <img src={this.state.imageUrl}
            className='plugged__notifications_page__row_product_picture'/>
          <div className='plugged__notifications_page__row_info'>
            <div className='plugged__notifications_page__row_name'>
              <b>{`${this.state.productName} `}</b>
              is unavailable.
              <span className='plugged__timestamp'>{` ${HelperFunctions.timeSince(this.state.timestamp)}`}</span>
            </div>
          </div>
          <div className='plugged__notifications_page__action'>
          </div>
        </div>
      );
    } else if (this.state.type === 'comment') {

    } else if (this.state.type === 'new_store') {

    } else if (this.state.type === 'custom') {

    }

    return notificationRow;
  }
});
