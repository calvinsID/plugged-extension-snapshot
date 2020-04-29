/* global chrome */
import React from 'react';
import './likedItem.css';
import PopupStore from '../../../../stores/popupStore';
import OtherProfileStore from '../../../../stores/otherProfileStore';
import HelperFunctions from '../../../../stores/helperFunctions';
import popupPagesEnum from '../../../../stores/popupPagesEnum';
import { observer } from "mobx-react";
import defaultProfilePic from '../../../../images/defaultProfilePic.jpg';
import defaultImage from '../../../../images/defaultImage.png';
import {toJS} from 'mobx';

export default observer(class LikedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemClass: '',
      imageSource: this.props.likedItem.image_url
    }

    this.onClick = this.onClick.bind(this);
    this.onClickProfile = this.onClickProfile.bind(this);
    this.onImageError = this.onImageError.bind(this);
  }

  componentDidMount() {}

  onClick() {
    PopupStore.openItemModal(this.props.likedItem);
  }

  onClickProfile() {
    PopupStore.backPages.push({
      popupPage: PopupStore.currentPage,
      secondaryPagesEnum: PopupStore.discoverPage
    });
    OtherProfileStore.addOtherProfile(this.props.likedItem.name, this.props.likedItem.username, this.props.likedItem.picture_url);
    PopupStore.setCurrentPage(popupPagesEnum.OTHER_PROFILE);
  }

  onImageError() {
    this.setState({imageSource: defaultImage});
  }

  render() {
    return (
      <div className={'plugged__liked_item plugged__liked_item__shadow ' + this.state.itemClass}>
        <div className='plugged__liked_item__header plugged__ellipsis'>
          <div className='plugged__liked_item__profile_pic_container'>
            <img className='plugged__liked_item__profile_pic'
              src={this.props.likedItem.picture_url ? this.props.likedItem.picture_url : defaultProfilePic}
              onClick={this.onClickProfile}/>
          </div>
          <div>
            <div className='plugged__liked_item__username' onClick={this.onClickProfile}>
              {this.props.likedItem.username}
            </div>
            <div className='plugged__liked_item__merchant'>
              {this.props.likedItem.merchant}
            </div>
          </div>
        </div>
        <img src={this.state.imageSource}
          className='plugged__liked_item__picture'
          onClick={this.onClick}
          onError={this.onImageError}/>
        <div className='plugged__liked_item__description_container'>
          <div className='plugged__liked_item__description'>
            <span
              className='plugged__liked_item__bold_username'
              onClick={this.onClickProfile}>{`${this.props.likedItem.username}`}</span>{` saved ${this.props.likedItem.product_name} from ${this.props.likedItem.merchant}`}
          </div>
          <div className='plugged__item_modal__prices plugged__liked_item__prices'>
            <div className={
              HelperFunctions.stringCurrencyToFloat(this.props.likedItem.current_price) < HelperFunctions.stringCurrencyToFloat(this.props.likedItem.retail_price) ?
                'plugged__item_modal__current_price plugged__ellipsis' : ''}>
              {this.props.likedItem.current_price &&
                HelperFunctions.stringCurrencyToFloat(this.props.likedItem.current_price) < HelperFunctions.stringCurrencyToFloat(this.props.likedItem.retail_price) ? '$' + this.props.likedItem.current_price : ''}
            </div>
            <div className={
              this.props.likedItem.current_price &&
              HelperFunctions.stringCurrencyToFloat(this.props.likedItem.current_price) < HelperFunctions.stringCurrencyToFloat(this.props.likedItem.retail_price) ?
              'plugged__strikethrough plugged__item_modal__retail_price plugged__ellipsis' :
              'plugged__item_modal__retail_price plugged__ellipsis'
            }>
              ${this.props.likedItem.retail_price}
            </div>
          </div>
          <div className='plugged__expanded_timestamp'>
            {HelperFunctions.expandedTimeSince(this.props.likedItem.timestamp)}
          </div>
        </div>
      </div>
    );
  }
});
