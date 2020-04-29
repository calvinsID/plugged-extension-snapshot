/* global chrome */
import React from 'react';
import './popupMain.css';
import $ from 'jquery';
import Banner from './banner/Banner';
import Navbar from './navbar/Navbar';
import Body from './body/Body';
import ItemModal from './body/itemModal/ItemModal';
import FeedbackButton from './feedback/FeedbackButton';
import FeedbackModal from './feedback/FeedbackModal';
import PopupStore from '../../stores/popupStore';
import loginEnum from '../../stores/loginEnum';
import { observer } from "mobx-react";

export default observer(class PopupMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        {PopupStore.modalItem !== null ? <ItemModal/> : null}
        <Banner/>
        <Body/>
        <Navbar/>
        {PopupStore.isLoggedIn !== loginEnum.LOGGED_OUT ? (
          <FeedbackButton/>
        ) : (
          <span></span>
        )}
        {PopupStore.feedbackModal ? <FeedbackModal/> : null}
      </div>
    )
  }
});
