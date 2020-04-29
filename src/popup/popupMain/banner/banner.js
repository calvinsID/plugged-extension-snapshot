/* global chrome */
import React from 'react';
import './banner.css';
import $ from 'jquery';
import namelogo from '../../../images/namelogo.png';
import CloseIcon from '@material-ui/icons/Close';

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.close = this.close.bind(this);
  }

  componentDidMount() {

  }

  close() {
    let data = { action: 'togglePlugged' };
    chrome.runtime.sendMessage(data);
  }

  render() {

    return (
      <div className='plugged__popup__banner'>
        <img src={namelogo} className='plugged__popup__banner_logo'></img>
        <div class="plugged__popup__banner_close">
          <CloseIcon className='plugged__popup__banner_close_icon' onClick={this.close}/>
        </div>
      </div>
    )
  }
}
