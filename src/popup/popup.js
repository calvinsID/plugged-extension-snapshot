/* global chrome */
/* src/popup/popup.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./popup.css";
import PopupMain from './popupMain/PopupMain';
import PopupStore from '../stores/popupStore';
import OtherProfileStore from '../stores/otherProfileStore';
import popupPagesEnum from '../stores/popupPagesEnum';
import loginEnum from '../stores/loginEnum';
import { observer } from "mobx-react";
import $ from 'jquery';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {}

    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.removeCurrentUser = this.removeCurrentUser.bind(this);
    this.getWatchedItems = this.getWatchedItems.bind(this);
  }

  componentDidMount() {
    this.isLoggedIn();
    PopupStore.updateWatchedItems();

    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.action === 'pluggedSignIn') {
        let frameContents = $("#plugged-popup-root");
        if (frameContents.length > 0 && frameContents[0].style && frameContents[0].style.display !== "none") {
          PopupStore.hasOpenedPopupBefore = true;
        }
        this.isLoggedIn();
      } else if (msg.action === 'pluggedSignOut') {
        this.removeCurrentUser();
        PopupStore.updateWatchedItems();
        PopupStore.reset();
      } else if (msg.action === 'refreshWatchedItems') {
        PopupStore.updateWatchedItems();
      }
    });
  }

  isLoggedIn() {
    chrome.storage.local.get(['pluggedSession', 'pluggedSessionExpiry', 'pluggedCurrentUser'], res => {
      let pluggedSession = res.pluggedSession;
      let pluggedSessionExpiry = res.pluggedSessionExpiry;
      let pluggedCurrentUser = res.pluggedCurrentUser;
      let currentTime = new Date().getTime();

      if (pluggedCurrentUser && !pluggedCurrentUser.email_verified) {
        PopupStore.setCurrentUser(pluggedCurrentUser);
        PopupStore.setIsLoggedIn(loginEnum.NOT_VERIFIED);
      } else if (pluggedSession && pluggedSessionExpiry !== "" && currentTime < pluggedSessionExpiry) {
        PopupStore.setCurrentUser(pluggedCurrentUser);
        PopupStore.setIsLoggedIn(loginEnum.LOGGED_IN);
        PopupStore.updateWatchedItems();
        if (PopupStore.hasOpenedPopupBefore) {
          PopupStore.hasLoadedFollowers = true;
          PopupStore.setFollowers();
          PopupStore.setFollowing();
        }
      } else {
        this.removeCurrentUser();
      }
    });
  }

  removeCurrentUser() {
    PopupStore.setIsLoggedIn(loginEnum.LOGGED_OUT);
    PopupStore.setCurrentUser(null);
    chrome.storage.local.clear();
  }

  getWatchedItems() {
    let data = { action: 'getWatchedItems' };

    chrome.runtime.sendMessage(data, (response) => {
      if (response.status === 200) {
        console.log('Response: ');
        console.log(response);
      } else {
        console.log('Error: ');
        console.log(response);
      }
    });
  }

  render() {
    return (
      <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/popup.css")}></link>,
                    <link type="text/css" href={"https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap"} rel="stylesheet"></link>]}> 
        <FrameContextConsumer>
        {
          // Callback is invoked with iframe's window and document instances
          ({document, window}) => {
            // Render Children
            return (
              <div className={'my-extension'}>
                <PopupMain/>
              </div>
            )
          }
        }
        </FrameContextConsumer>
      </Frame>
    )
  }
}

const app = document.createElement('div');
app.id = "plugged-popup-root";
app.style.display = "none";

document.body.appendChild(app);
ReactDOM.render(<Main/>, app);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clicked_browser_action") {
    onToggleSetThings();
    PopupStore.setSaveCard(true);
    PopupStore.getSimilarProducts();
    toggle();
  } else if (request.action === "clicked_browser_action_save_page") {
    goToSavePage();
    onToggleSetThings();
    PopupStore.setSaveCard(true);
    PopupStore.getSimilarProducts();
    toggle();
  } else if (request.action === "clicked_browser_action_save_page_multi") {
    goToSavePage();
    onToggleSetThings();
    PopupStore.setIsSaveCardMulti(true, request.scrapedData);
    PopupStore.getSimilarProducts();
    toggle();
  }
});

function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
}

function onToggleSetThings() {
  PopupStore.setCurrentUrl();
  PopupStore.setIsSaveCardMulti(false);
  PopupStore.setSaveCard(false, null);
  if (!PopupStore.hasOpenedPopupBefore) {
    PopupStore.hasOpenedPopupBefore = true;
  }
  if (!PopupStore.hasLoadedFollowers && PopupStore.isLoggedIn === loginEnum.LOGGED_IN) {
    PopupStore.hasLoadedFollowers = true;
    PopupStore.setFollowers();
    PopupStore.setFollowing();
  }
}

function goToSavePage() {
  PopupStore.clearBackPages();
  OtherProfileStore.clearOtherProfiles();
  PopupStore.setCurrentPage(popupPagesEnum.SAVE);
}