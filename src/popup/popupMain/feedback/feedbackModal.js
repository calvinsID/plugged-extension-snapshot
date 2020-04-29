/* global chrome */
import React from 'react';
import './feedback.css';
import '../body/itemModal/itemModal.css';
import { observer } from "mobx-react";
import CloseIcon from '@material-ui/icons/Close';
import PopupStore from '../../../stores/popupStore';

export default observer(class FeedbackModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackText: '',
      submitedFeedback: false
    }

    this.close = this.close.bind(this);
    this.remainOpen = this.remainOpen.bind(this);
    this.onFeedbackChange = this.onFeedbackChange.bind(this);
    this.submitFeedback = this.submitFeedback.bind(this);

    this.menuIsExpanded = false;
  }

  componentDidMount() {}

  close() {
    PopupStore.closeFeedbackModal();
  }

  remainOpen(e) {
    e.stopPropagation();
    if (this.menuIsExpanded) {
      this.expandMenu();
    }
  }

  onFeedbackChange(event) {
    this.setState({
      feedbackText: event.target.value
    });
  }

  submitFeedback() {
    PopupStore.submitFeedback(this.state.feedbackText);
    this.setState({
      submittedFeedback: true
    });
  }

  render() {
    return (
      <div className="plugged__item_modal__backdrop plugged__fadeIn" onClick={this.close}>
        <div className="plugged__item_modal plugged__fadeIn" onClick={this.remainOpen}>
          <div class="plugged__item_modal__corner_icon">
            <CloseIcon className='plugged__item_modal__close_icon' onClick={this.close}/>
          </div>
          <div className='plugged__feedback_modal__content'>
            <div className='plugged__feedback_modal__title'>Help us improve the app!</div>
            <div className='plugged__feedback_modal__input_container'>
              <textarea type='text'
                className='plugged__feedback_modal__input'
                placeholder="Suggest a store, feature, let us know if you something doesn't work, or anything at all"
                value={this.state.feedbackText}
                onChange={this.onFeedbackChange}/>
            </div>
            {
              this.state.submittedFeedback ? (
                <button className='plugged__item_modal__button_disabled plugged__item_modal__no_margin' disabled={true}>
                  Thank you!
                </button>
              ) : (
                <button className='plugged__item_modal__button plugged__item_modal__no_margin' onClick={this.submitFeedback}>
                  Submit feedback
                </button>
              )
            }
          </div>
        </div>
      </div>
    );
  }
});
