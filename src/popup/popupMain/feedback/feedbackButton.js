/* global chrome */
import React from 'react';
import './feedback.css';
import PopupStore from '../../../stores/popupStore';

import Feedback from '@material-ui/icons/Announcement';

export default class FeedbackButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.openFeedbackModal = this.openFeedbackModal.bind(this);
  }

  componentDidMount() {

  }
  
  openFeedbackModal() {
    PopupStore.openFeedbackModal();
  }

  render() {
    return (
      <div className='plugged__feedback_button' onClick={this.openFeedbackModal}>
        <Feedback className={'plugged__feedback_button_logo'}/>
      </div>
    )
  }
}
