/* global chrome */
import React from 'react';
import './storeRow.css';
import PopupStore from '../../../../stores/popupStore';
import { observer } from "mobx-react";
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import $ from 'jquery';

export default observer(class StoreRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemClass: '',
      starClicked: this.props.isFave,
      isDisabled: false
    }

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickFavorite = this.onClickFavorite.bind(this);
    this.onClickUnfavorite = this.onClickUnfavorite.bind(this);
  }

  componentDidMount() {}

  onMouseEnter() {
    this.setState({
      itemClass: 'plugged__store_row__hover'
    });
  }

  onMouseLeave() {
    this.setState({
      itemClass: ''
    });
  }

  onClick() {
    let win = window.open(this.props.store.url, '_blank');
    win.focus();
  }

  onClickFavorite(e) {
    e.stopPropagation();

    if (this.state.isDisabled) {
      return;
    }
    this.setState({isDisabled: true, starClicked: true}, () => {
      let cb = () => {
        this.state.isDisabled = false;
      };
      PopupStore.addFavoriteStore(this.props.store, cb);
    });
  }

  onClickUnfavorite(e) {
    e.stopPropagation();

    if (this.state.isDisabled) {
      return;
    }
    this.setState({isDisabled: true, starClicked: false}, () => {
      let cb = () => {
        this.state.isDisabled = false;
      };
      PopupStore.removeFavoriteStore(this.props.store, cb);
    });
  }

  render() {
    return (
      <div className={'plugged__store_row ' + this.state.itemClass}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
      >
        <div className='plugged__store_row__logo_container'>
          <img className='plugged__store_row__logo' src={this.props.store.logo_url}></img>
        </div>
        <div className='plugged__store_row__name'>
          {this.props.store.name}
        </div>
        <div className='plugged__filler'>
        </div>
        {
          this.state.starClicked ?
          <Star className='plugged__store_row__icon' onClick={this.onClickUnfavorite}/> :
          <StarBorder className='plugged__store_row__icon' onClick={this.onClickFavorite}/>
        }
      </div>
    );
  }
});
