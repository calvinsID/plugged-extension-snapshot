/* global chrome */
import React from 'react';
import PopupStore from '../../../../stores/popupStore';
import loginEnum from '../../../../stores/loginEnum';
import loadingEnum from '../../../../stores/loadingEnum';
import { observer } from "mobx-react";
import './notificationsPage.css';
import NotificationRow from './notificationRow/NotificationRow';

export default observer(class NotificationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.loadNotifications = this.loadNotifications.bind(this);
  }

  componentDidMount() {}

  loadNotifications() {
    PopupStore.loadNotifications();
  }

  render() {
    if (!PopupStore.hasLoadedNotificationItems && PopupStore.isLoggedIn === loginEnum.LOGGED_IN) {
      PopupStore.hasLoadedNotificationItems = true;
      PopupStore.loadNotifications();
    }

    let notificationsPage = null;

    notificationsPage = (
      <div className='plugged__notifications_page'>
        {(!PopupStore.notifications || PopupStore.notifications.length === 0) ?
          <div className='plugged__popup__empty_state'>
            When products you save go on sale, you'll receive a notification here. You will also be notified via email. 
          </div> : null
        }
        {PopupStore.notifications.map((notif) => {
          return <NotificationRow key={notif.id} notification={notif}/>
        })}
        {
          PopupStore.notifications.length >= PopupStore.howManyNotificationItems ?
          <div className='plugged__popup__load_homefeed_button_div_all'>
            <button
              onClick={this.loadNotifications}
              className='plugged__popup__load_homefeed_button'>
                {PopupStore.loadingNotifications === loadingEnum.LOADING ?
                  'Loading' :
                  (PopupStore.loadingNotifications === loadingEnum.NOT_LOADING) ?
                  'Load More' :
                  'No More Results'}</button>
          </div> : null
        }
      </div>
    );

    return notificationsPage;
  }
});
