/* global chrome */
import React from 'react';
import './supportedStoreRow.css';
import { observer } from "mobx-react";

export default observer(class SupportedStoreRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {}

  onClick() {
    let win = window.open(this.props.store.url, '_blank');
    win.focus();
  }

  render() {
    return (
      <div className='plugged__store_row' onClick={this.onClick}>
        <div className='plugged__store_row__logo_container'>
          <img className='plugged__store_row__logo' src={this.props.store.logo_url}></img>
        </div>
        <div className='plugged__store_row__name'>
          {this.props.store.name}
        </div>
      </div>
    );
  }
});
