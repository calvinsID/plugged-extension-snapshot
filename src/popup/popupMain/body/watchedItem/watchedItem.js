/* global chrome */
import React from 'react';
import './watchedItem.css';
import PopupStore from '../../../../stores/popupStore';
import defaultImage from '../../../../images/defaultImage.png';
import { observer } from "mobx-react";
import $ from 'jquery';
import { watch } from 'fs';
import {toJS} from 'mobx';
import HelperFunctions from '../../../../stores/helperFunctions';

export default observer(class WatchedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemClass: '',
      imageSource: this.props.watchedItem.image_url
    }

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onImageError = this.onImageError.bind(this);
  }

  componentDidMount() {}

  onMouseEnter() {
    this.setState({
      itemClass: 'plugged__watched_item__hover'
    });
  }

  onMouseLeave() {
    this.setState({
      itemClass: ''
    });
  }

  onClick() {
    let watchedItem = this.props.watchedItem;

    if (watchedItem.lowestCurrentPrice) {
      watchedItem.current_price = watchedItem.lowestCurrentPrice;
    } else {
      watchedItem.current_price = undefined;
    }
    if (watchedItem.highestRetailPrice) {
      watchedItem.retail_price = watchedItem.highestRetailPrice;
    } else {
      watchedItem.retail_price = undefined;
    }

    PopupStore.openItemModal(watchedItem);
  }

  onImageError() {
    this.setState({imageSource: defaultImage});
  }

  render() {
    return (
      <div className={'plugged__watched_item plugged__watched_item__shadow ' + this.state.itemClass
      + ((this.props.watchedItem.isExpired || this.props.watchedItem.is_broken_link) ? ' plugged__watched_item__expired' : '')}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
      >
      <div className='plugged__watched_item__merchant plugged__ellipsis'>
        {this.props.watchedItem.merchant}
      </div>
        <div className='plugged__watched_item__image_container'>
          <img src={this.state.imageSource} onError={this.onImageError} className={'plugged__watched_item__picture' +
          ((this.props.watchedItem.isExpired || this.props.watchedItem.is_broken_link)  ? ' plugged__watched_item__expired_img' : '')}/>
        </div>
        <div className='plugged__watched_item__name plugged__ellipsis'>
          {this.props.watchedItem.product_name}
        </div>
        <div className='plugged__watched_item__prices'>
          <div className={this.props.watchedItem.lowestCurrentPrice &&
            HelperFunctions.stringCurrencyToFloat(this.props.watchedItem.lowestCurrentPrice) < HelperFunctions.stringCurrencyToFloat(this.props.watchedItem.highestRetailPrice) ? 'plugged__watched_item__current_price plugged__ellipsis' : ''}>
            {this.props.watchedItem.lowestCurrentPrice &&
              HelperFunctions.stringCurrencyToFloat(this.props.watchedItem.lowestCurrentPrice) < HelperFunctions.stringCurrencyToFloat(this.props.watchedItem.highestRetailPrice) ? '$' + this.props.watchedItem.lowestCurrentPrice : ''}
          </div>
          <div className={
            this.props.watchedItem.lowestCurrentPrice &&
            HelperFunctions.stringCurrencyToFloat(this.props.watchedItem.lowestCurrentPrice) < HelperFunctions.stringCurrencyToFloat(this.props.watchedItem.highestRetailPrice) ?
            'plugged__strikethrough plugged__watched_item__retail_price plugged__ellipsis' :
            'plugged__watched_item__retail_price plugged__ellipsis'
          }>
            {'$' + this.props.watchedItem.highestRetailPrice}
          </div>
        </div>
      </div>
    );
  }
});
