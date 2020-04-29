/* global chrome */
import { observable, action, computed, decorate } from 'mobx';
import PopupStore from './popupStore';

class OtherProfileStore {
  constructor() {

  }

  authUrl = 'http://localhost:3000/site';
  apiUrl = 'http://localhost:8080';
  oldAuthUrl = 'https://joinplugged.ca/site';
  oldApiUrl = 'https://api.joinplugged.ca';

  otherProfiles = [];
  otherProfileCache = {};

  addOtherProfile(name, username, picture_url) {
    if (this.otherProfileCache[username]) {
      this.otherProfiles.push(this.otherProfileCache[username]);
    } else {
      let index = this.otherProfiles.length;
      let baseProfile = {
        name: name,
        username: username,
        picture_url: picture_url,
        followers: [],
        numFollowers: null,
        following: [],
        numFollowing: null,
        watchedItems: [],
        numWatchedItems: null
      }
      this.otherProfiles.push(baseProfile);
      this.otherProfileCache[username] = baseProfile;
  
      this.setFollowers(username, index);
      this.setFollowing(username, index);
      this.setWatchedItems(username, index);
    }
  }

  clearOtherProfiles() {
    this.otherProfiles.replace([]);
  }

  setFollowers(username, index) {
    chrome.storage.local.get(['pluggedSession'], res => {
      let session = res.pluggedSession;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', this.apiUrl + '/user/followers', true);
      xhr.setRequestHeader('x-plugged', session);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status == 200) {
            let followers = JSON.parse(xhr.response);

            // Update cache
            this.otherProfileCache[username].followers = followers;
            this.otherProfileCache[username].numFollowers = followers.length;

            if (this.otherProfiles.length > index && this.otherProfiles[index].username === username) {
              this.otherProfiles[index].followers.replace(followers);
              this.otherProfiles[index].numFollowers = followers.length;
            }
          } else {
            console.log('ERROR: Could not set followers');
          }
        }
      };
      xhr.send(JSON.stringify({username: username}));
    });
  }

  setFollowing(username, index) {
    chrome.storage.local.get(['pluggedSession'], res => {
      let session = res.pluggedSession;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', this.apiUrl + '/user/following', true);
      xhr.setRequestHeader('x-plugged', session);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status == 200) {
            let following = JSON.parse(xhr.response);

            // Update cache
            this.otherProfileCache[username].following = following;
            this.otherProfileCache[username].numFollowing = following.length;

            if (this.otherProfiles.length > index && this.otherProfiles[index].username === username) {
              this.otherProfiles[index].following.replace(following);
              this.otherProfiles[index].numFollowing = following.length;
            }
          } else {
            console.log('ERROR: Could not set following');
          }
        }
      };
      xhr.send(JSON.stringify({username: username}));
    });
  }

  updateFollowing(followerUsername, followingUsername) {
    for (let i = 0; i < this.otherProfiles.length; i++) {
      if (this.otherProfiles[i].username === followerUsername) {
        this.setFollowing(followerUsername, i);
      } else if (this.otherProfiles[i].username === followingUsername) {
        this.setFollowers(followingUsername, i);
      }
    }
  }

  setWatchedItems(username, index) {
    chrome.storage.local.get(['pluggedSession'], res => {
      let session = res.pluggedSession;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', this.apiUrl + '/user/getWatchedItems', true);
      xhr.setRequestHeader('x-plugged', session);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status == 200) {
            let watchedItems = PopupStore.processWatchedItems(JSON.parse(xhr.response));

            // Update cache
            this.otherProfileCache[username].watchedItems = watchedItems;
            this.otherProfileCache[username].numWatchedItems = watchedItems.length;

            if (this.otherProfiles.length > index && this.otherProfiles[index].username === username) {
              this.otherProfiles[index].watchedItems.replace(watchedItems);
              this.otherProfiles[index].numWatchedItems = watchedItems.length;
            }
          } else {
            console.log('ERROR: Could not set following');
          }
        }
      };
      xhr.send(JSON.stringify({username: username}));
    });
  }

  goBack() {
    this.otherProfiles.pop();
  }

};

decorate(OtherProfileStore, {
  otherProfiles: observable,
  addOtherProfile: action,
  clearOtherProfiles: action,

  setFollowers: action,
  setFollowing: action,
  updateFollowing: action,

  setWatchedItems: action,

  goBack: action
});

const otherProfileStore = new OtherProfileStore();
export default otherProfileStore;