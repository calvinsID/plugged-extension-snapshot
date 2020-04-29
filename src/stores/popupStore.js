/* global chrome */
import { observable, action, computed, decorate } from 'mobx';
import popupPagesEnum from './popupPagesEnum';
import secondaryPagesEnum from './secondaryPagesEnum';
import loadingEnum from './loadingEnum';
import loginEnum from './loginEnum';
import {toJS} from 'mobx';
import $ from 'jquery';
import HelperFunctions from '../stores/helperFunctions';
import Scraper from '../scraper/Scraper';

class PopupStore {
  constructor() {
    this.reset();
  }

  currentUrl = window.location.href;
  currentPage = this.setDefaultPage();
  profilePage = secondaryPagesEnum.PROFILE_SAVED;
  otherProfilePage = secondaryPagesEnum.PROFILE_FOLLOWERS;
  discoverPage = secondaryPagesEnum.DISCOVER_ALL;

  authUrl = 'http://localhost:3000/site';
  apiUrl = 'http://localhost:8080';
  oldAuthUrl = 'https://joinplugged.ca/site';
  oldApiUrl = 'https://api.joinplugged.ca';

  reset() {
    this.isLoggedIn = loginEnum.LOGGED_OUT;
    this.currentUser = {
      fullName: null,
      email: null,
      username: null,
      gender: null,
      picture_url: null
    };
    this.hasOpenedPopupBefore = false;
    this.followers = [];
    this.numFollowers = null;
    this.following = [];
    this.numFollowing = null;
    this.hasLoadedFollowers = false;
    this.watchedItems = [];
    this.numWatchedItems = null;
    this.hasLoadedWatchedItems = false;
    this.allSupportedStores = [];
    this.stores = [];
    this.favoriteStores = [];
    this.hasLoadedStores = false;
    this.modalItem = null;
    this.feedbackModal = false;
    this.homefeedItems = [];
    this.searchedUsers = [];
    this.isSearchingUsers = false;
    this.currentSearchText = '';
    this.searchUsersError = false;
    this.friends = [];
    this.friendsPagination = null;
    this.hasLoadedFriends = false;
    this.loadingFriends = loadingEnum.NOT_LOADING;
    this.backPages = [];
    this.currentUrl = window.location.href;
    this.isSaveCardMulti = false;
    this.saveCardMultiScrapedData = null;
    this.isSaveCard = false;
    this.saveCardScrapedData = null;

    this.hasLoadedSimilarProducts = false;
    this.similarProducts = [];
    this.currentSavePageItem = {
      merchant: null,
      productName: null,
      brandName: null
    };
    // merchant: {brandName: {productName: []}}
    this.similarProductsCache = {};

    this.hasLoadedHomefeedItems = false;
    this.howManyHomefeedItems = 15;
    this.loadingHomefeedItems = loadingEnum.NOT_LOADING;

    this.hasLoadedNotificationItems = false;
    this.notifications = [];
    this.howManyNotificationItems = 15;
    this.loadingNotifications = loadingEnum.NOT_LOADING;
  }

  setIsLoggedIn(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;
  }

  setCurrentUser(currentUser) {
    this.currentUser = currentUser;
  }

  setFollowers() {
    chrome.storage.local.get(['pluggedSession'], res => {
      let session = res.pluggedSession;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + '/query/followers', true);
      xhr.setRequestHeader('x-plugged', session);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status == 200) {
            this.followers.replace(JSON.parse(xhr.response));
            this.numFollowers = this.followers.length;
          } else {
            console.log('ERROR: Could not set followers');
            this.followers = [];
            this.numFollowers = 0;
          }
        }
      };
      xhr.send();
    });
  }

  setFollowing() {
    chrome.storage.local.get(['pluggedSession'], res => {
      let session = res.pluggedSession;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + '/query/following', true);
      xhr.setRequestHeader('x-plugged', session);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status == 200) {
            this.following.replace(JSON.parse(xhr.response));
            this.numFollowing = this.following.length;
          } else {
            console.log('ERROR: Could not set following');
            this.following = [];
            this.numFollowing = 0;
          }
        }
      };
      xhr.send();
    });
  }

  addFollowing(userObject) {
    this.following.push(userObject);
    this.numFollowing += 1;
  }

  removeFollowing(username) {
    for (let idx in this.following) {
      if (this.following[idx].username === username) {
        this.following.splice(idx, 1);
        this.numFollowing -= 1;
        return;
      }
    }
  }

  isFollowing(username) {
    for (let user of this.following) {
      if (user.username === username) {
        return true;
      }
    }
    return false;
  }

  setCurrentPage(page) {
    this.currentPage = page;

    let frameContents = $("#plugged-popup-root").find('iframe').contents();

    frameContents.find('.plugged__popup__navbar_button').removeClass('plugged__popup__navbar_button_clicked');
    frameContents.find('.plugged__popup__navbar_icon').removeClass('plugged__popup__navbar_icon_clicked');

    if (page === popupPagesEnum.HOME) {
      frameContents.find('.plugged__navbar__home_button').addClass('plugged__popup__navbar_button_clicked');
      frameContents.find('.plugged__navbar__home_icon').addClass('plugged__popup__navbar_icon_clicked');
    } else if (page === popupPagesEnum.NOTIFICATIONS) {
      frameContents.find('.plugged__navbar__notifications_button').addClass('plugged__popup__navbar_button_clicked');
      frameContents.find('.plugged__navbar__notifications_icon').addClass('plugged__popup__navbar_icon_clicked');
    } else if (page === popupPagesEnum.PROFILE) {
      frameContents.find('.plugged__navbar__profile_button').addClass('plugged__popup__navbar_button_clicked');
      frameContents.find('.plugged__navbar__profile_icon').addClass('plugged__popup__navbar_icon_clicked');
    } else if (page === popupPagesEnum.SAVE) {
      frameContents.find('.plugged__navbar__save_button').addClass('plugged__popup__navbar_button_clicked');
      frameContents.find('.plugged__navbar__save_icon').addClass('plugged__popup__navbar_icon_clicked');
    }
  }

  setProfilePage(page) {
    this.profilePage = page;
  }

  setOtherProfilePage(page) {
    this.otherProfilePage = page;
  }

  setDiscoverPage(page) {
    this.discoverPage = page;
  }

  setDefaultPage() {
    if (this.matchesSupportedMerchant(this.currentUrl)) {
      return popupPagesEnum.SAVE;
    }
    return popupPagesEnum.PROFILE;
  }

  matchesProductPage(url) {
    return HelperFunctions.plugged_isProductUrl("all", url);
  }

  matchesSupportedMerchant(url) {
    return HelperFunctions.plugged_isMerchantUrl("all", url);
  }

  processWatchedItems(watchedItems) {
    for (let watchedItem of watchedItems) {
      if (new Date(watchedItem.watch_until) < Date.now()) {
        watchedItem.isExpired = true;
      } else {
        watchedItem.isExpired = false;
      }
      if (watchedItem.current_price) {
        watchedItem.lowestCurrentPrice = watchedItem.current_price;
      }
      if (watchedItem.retail_price) {
        watchedItem.highestRetailPrice = watchedItem.retail_price;
      } else {
        watchedItem.highestRetailPrice = watchedItem.current_price;
      }
    }
    watchedItems.sort((a, b) => {
      if (new Date(a.watch_until) < Date.now() && new Date(b.watch_until) < Date.now()) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else if (new Date(a.watch_until) < Date.now()) {
        return 1;
      } else if (new Date(b.watch_until) < Date.now()) {
        return -1;
      }
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    return watchedItems;
  }

  setWatchedItems(watchedItems) {
    this.processWatchedItems(watchedItems);
    this.watchedItems.replace(watchedItems);
    this.numWatchedItems = watchedItems.length;
  }

  updateWatchedItems() {
    chrome.storage.local.get(['pluggedWatchedItems', 'pluggedWatchedItemsDict'], res => {
      if (res && res.pluggedWatchedItems && res.pluggedWatchedItemsDict) {
        this.setWatchedItems(res.pluggedWatchedItems);
      }
    });
  }

  getAllSupportedStores() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this.apiUrl + '/query/getAllSupportedStores', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status == 200) {
          let allStores = JSON.parse(xhr.response);
          allStores = allStores.filter(store => {
            return store.name.substr(store.name.length - 4) !== '(US)';
          });
          this.allSupportedStores.replace(allStores);
        } else {
          console.log('ERROR: Could not get all supported stores');
        }
      }
    };
    xhr.send();
  }

  saveStores() {
    chrome.storage.local.get(['pluggedSession'], res => {
      let session = res.pluggedSession;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + '/query/getStores', true);
      xhr.setRequestHeader('x-plugged', session);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status == 200) {
            let stores = JSON.parse(xhr.response);
            stores = stores.filter(store => {
              return store.name.substr(store.name.length - 4) !== '(US)';
            });
            this.stores.replace(stores);
          } else {
            console.log('ERROR: Could not set stores');
          }
        }
      };
      xhr.send();
    });
  }

  saveFavoriteStores() {
    chrome.storage.local.get(['pluggedSession'], res => {
      let session = res.pluggedSession;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + '/query/getFavoriteStores', true);
      xhr.setRequestHeader('x-plugged', session);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status == 200) {
            let favoriteStores = JSON.parse(xhr.response);
            this.favoriteStores.replace(favoriteStores);
          } else {
            console.log('ERROR: Could not set favoriteStores');
          }
        }
      };
      xhr.send();
    });
  }

  addFavoriteStore(store, cb) {
    chrome.storage.local.get(['pluggedSession'], res => {
      let session = res.pluggedSession;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', this.apiUrl + '/query/addFavorite', true);
      xhr.setRequestHeader('x-plugged', session);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status == 200) {
            for (let i = 0; i < this.stores.length; i++) {
              if (this.stores[i].name === store.name) {
                this.stores.splice(i, 1);
                this.favoriteStores.push(store);
              }
            }
            if (cb) {cb();}
          } else {
            console.log('ERROR: Could not add favoriteStore');
          }
        }
      };
      xhr.send(JSON.stringify({storeName: store.name}));
    });
  }

  removeFavoriteStore(store, cb) {
    chrome.storage.local.get(['pluggedSession'], res => {
      let session = res.pluggedSession;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', this.apiUrl + '/query/removeFavorite', true);
      xhr.setRequestHeader('x-plugged', session);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status == 200) {
            for (let i = 0; i < this.favoriteStores.length; i++) {
              if (this.favoriteStores[i].name === store.name) {
                this.favoriteStores.splice(i, 1);
                this.stores.push(store);
              }
            }
            if (cb) {cb();}
          } else {
            console.log('ERROR: Could not remove favoriteStore');
          }
        }
      };
      xhr.send(JSON.stringify({storeName: store.name}));
    });
  }

  supportStoreRequest(storeUrl) {
    chrome.storage.local.get(['pluggedSession'], res => {
      let session = res.pluggedSession;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', this.apiUrl + '/query/supportStoreRequest', true);
      xhr.setRequestHeader('x-plugged', session);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status == 200) {

          } else {
            console.log('ERROR: Could not submit support request');
          }
        }
      };
      xhr.send(JSON.stringify({currentWebsite: storeUrl}));
    });
  }

  closeItemModal() {
    this.modalItem = null;
  }

  openItemModal(likedItem) {
    this.modalItem = likedItem;
  }

  closeFeedbackModal() {
    this.feedbackModal = false;
  }

  openFeedbackModal() {
    this.feedbackModal = true;
  }

  submitFeedback(feedbackText) {
    chrome.storage.local.get(['pluggedSession'], res => {
      let session = res.pluggedSession;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', this.apiUrl + '/query/submitFeedback', true);
      xhr.setRequestHeader('x-plugged', session);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status == 200) {
            console.log('Submitted feedback');
          } else {
            console.log('ERROR: Could not submit feedback');
          }
        }
      };
      xhr.send(JSON.stringify({feedbackText: feedbackText}));
    });
  }

  loadHomefeedItems() {
    if (this.loadingHomefeedItems === loadingEnum.NOT_LOADING) {
      this.loadingHomefeedItems = loadingEnum.LOADING;

      chrome.storage.local.get(['pluggedSession'], res => {
        let session = res.pluggedSession;
        let xhr = new XMLHttpRequest();
        let timestamp = this.homefeedItems.length > 0 ?
          this.homefeedItems[this.homefeedItems.length - 1].timestamp :
          '2030-01-01T00:00:00.000Z'
        let url = this.apiUrl + '/query/getHomefeedItemsV2/' + this.howManyHomefeedItems.toString() + '/' + timestamp;
  
        xhr.open('GET', url, true);
        xhr.setRequestHeader('x-plugged', session);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
          if (xhr.readyState === xhr.DONE) {
            if (xhr.status == 200) {
              let ans = JSON.parse(xhr.response);
              this.homefeedItems.replace(toJS(this.homefeedItems).concat(ans));
  
              // Don't spam api if done loading
              if (ans.length > 0) {
                this.loadingHomefeedItems = loadingEnum.NOT_LOADING;
              } else {
                this.loadingHomefeedItems = loadingEnum.NO_RESULTS
              }
            } else {
              console.log('ERROR: Could not load homefeed items');
              this.loadingHomefeedItems = loadingEnum.NOT_LOADING;
            }
          }
        };
        xhr.send();
      });
    }
  }

  loadNotifications() {
    if (this.loadingNotifications === loadingEnum.NOT_LOADING) {
      this.loadingNotifications = loadingEnum.LOADING;

      chrome.storage.local.get(['pluggedSession'], res => {
        let session = res.pluggedSession;
        let xhr = new XMLHttpRequest();
        let timestamp = this.notifications.length > 0 ?
          this.notifications[this.notifications.length - 1].timestamp :
          '2030-01-01T00:00:00.000Z';
        let url = this.apiUrl + '/query/notifications/' + this.howManyNotificationItems.toString() + '/' + timestamp;

        xhr.open('GET', url, true);
        xhr.setRequestHeader('x-plugged', session);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
          if (xhr.readyState === xhr.DONE) {
            if (xhr.status == 200) {
              let ans = JSON.parse(xhr.response);
              this.notifications.replace(toJS(this.notifications).concat(ans));
  
              // Don't spam api if done loading
              if (ans.length > 0) {
                this.loadingNotifications = loadingEnum.NOT_LOADING;
              } else {
                this.loadingNotifications = loadingEnum.NO_RESULTS
              }
            } else {
              console.log('ERROR: Could not load homefeed items');
              this.loadingNotifications = loadingEnum.NOT_LOADING;
            }
          }
        };
        xhr.send();
      });
    }
  }

  isWatching(url) {
    for (let watchedItem of this.watchedItems) {
      if (watchedItem.product_url === url && !watchedItem.isExpired) {
        return true;
      }
    }
    return false;
  }

  setSearchedUsers(searchedUsers) {
    if (searchedUsers.length <= 0) {
      this.searchedUsers = [];
    } else {
      this.searchedUsers.replace(searchedUsers);
    }
  }

  setIsSearchingUsers(isSearching) {
    this.isSearchingUsers = isSearching;
  }

  setCurrentSearchText(text) {
    this.currentSearchText = text;
  }

  setSearchUsersError(error) {
    this.searchUsersError = error;
  }

  loadFriends() {
    if (this.loadingFriends === loadingEnum.NOT_LOADING) {
      this.loadingFriends = loadingEnum.LOADING;

      chrome.storage.local.get(['pluggedSession', 'pluggedCurrentUser'], res => {
        let currentUser = res.pluggedCurrentUser;
        let session = res.pluggedSession;
        let fbApiUrl = null;

        if (this.friendsPagination) {
          fbApiUrl = this.friendsPagination;
        } else if (!this.hasLoadedFriends && currentUser && currentUser.fb_access_token && currentUser.fb_uid) {
          fbApiUrl = `https://graph.facebook.com/v2.8/${currentUser.fb_uid}/friends?access_token=${currentUser.fb_access_token}`
        }

        if (fbApiUrl) {
          let xhr = new XMLHttpRequest();
          xhr.open('GET', fbApiUrl, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onload = () => {
            if (xhr.readyState === xhr.DONE) {
              this.hasLoadedFriends = true;
              this.loadingFriends = loadingEnum.NOT_LOADING;

              if (xhr.status === 200) {
                let response = JSON.parse(xhr.response);
                let newFriends = response.data;
                let newFriendIds = newFriends.map(friend => friend.id);

                if (newFriendIds && newFriendIds.length > 0) {
                  // Get the user objects of the list of friends
                  let xhr2 = new XMLHttpRequest();
                  xhr2.open('POST', this.apiUrl + '/query/fbFriends', true);
                  xhr2.setRequestHeader('x-plugged', session);
                  xhr2.setRequestHeader('Content-Type', 'application/json');
                  xhr2.onload = () => {
                    if (xhr2.readyState === xhr.DONE) {
                      if (xhr2.status == 200) {
                        let friendUserObjects = JSON.parse(xhr2.response);

                        this.friends.push.apply(this.friends, friendUserObjects);

                        // If there are more results (pagination)
                        if (response.paging && response.paging.next) {
                          this.friendsPagination = response.paging.next;
                        } else {
                          this.friendsPagination = null;
                        }
                      } else {
                        console.log('ERROR: Could not get friends');
                      }
                    }
                  };
                  xhr2.send(JSON.stringify({fbUidList: newFriendIds}));
                }
              } else {
                console.log('Error: Could not get friends');
                this.hasLoadedFriends = true;
                this.loadingFriends = loadingEnum.NOT_LOADING;
                this.friendsPagination = null;
              }
            }
          }
          xhr.onerror = (err) => {
            console.log('Error: Could not get friends');
            this.hasLoadedFriends = true;
            this.loadingFriends = loadingEnum.NOT_LOADING;
            this.friendsPagination = null;
          }
          xhr.send();
        }
      });
    }
  }

  goBack() {
    let page = this.backPages.pop();

    if (page.popupPage === popupPagesEnum.PROFILE) {
      this.setProfilePage(page.secondaryPagesEnum);
    } else if (page.popupPage === popupPagesEnum.FOLLOW) {
      this.setProfilePage(page.secondaryPagesEnum);
    } else if (page.popupPage === popupPagesEnum.HOME) {
      this.setDiscoverPage(page.secondaryPagesEnum);
    } else if (page.popupPage === popupPagesEnum.OTHER_PROFILE) {
      this.setOtherProfilePage(page.secondaryPagesEnum);
    } else if (page.popupPage === popupPagesEnum.OTHER_FOLLOW) {
      this.setOtherProfilePage(page.secondaryPagesEnum);
    }
    this.setCurrentPage(page.popupPage);
  }

  clearBackPages() {
    this.backPages = [];
  }

  setCurrentUrl() {
    this.currentUrl = window.location.href;
  }

  setIsSaveCardMulti(set, scrapedData) {
    this.isSaveCardMulti = set;
    if (set) {
      this.saveCardMultiScrapedData = scrapedData;

      // Set current save page item to the multi item
      if (scrapedData) {
        this.setCurrentSavePageItem(scrapedData.merchant, scrapedData.brandName, scrapedData.productName);
      } else {
        this.setCurrentSavePageItem(null, null, null);
      }
    }
  }

  setSaveCard(set) {
    this.isSaveCard = set;
    if (set && this.matchesProductPage(this.currentUrl)) {
      let scraper = new Scraper();
      let scrapedData = scraper.scrapeUrl(this.currentUrl);
      console.log('Plugged scraped:');
      console.log(scrapedData);
      this.saveCardScrapedData = scrapedData;

      // Set current save page item to the multi item
      if (scrapedData) {
        this.setCurrentSavePageItem(scrapedData.merchant, scrapedData.brandName, scrapedData.productName);
      } else {
        this.setCurrentSavePageItem(null, null, null);
      }
    }
  }

  getSimilarProducts() {
    this.similarProducts.replace([]);

    // Only load similar items if merchant supports it
    let merchantsWhoSupportSimilarProducts = [
      'Brooklyn Clothing',
      'Cntrbnd',
      'LESS 17',
      'Nomad',
      'Roden Gray'
    ];
    if ((!this.currentSavePageItem.merchant) ||
      (merchantsWhoSupportSimilarProducts.indexOf(this.currentSavePageItem.merchant) === -1)) {
      return;
    }

    if (this.currentSavePageItem.merchant && this.currentSavePageItem.brandName && this.currentSavePageItem.productName) {
      // Check similarProductsCache first
      let usedCache = false;
      if (this.currentSavePageItem.merchant in this.similarProductsCache) {
        if (this.currentSavePageItem.brandName in this.similarProductsCache[this.currentSavePageItem.merchant]) {
          if (this.currentSavePageItem.productName in this.similarProductsCache[this.currentSavePageItem.merchant][this.currentSavePageItem.brandName]) {
            this.similarProducts.replace(this.similarProductsCache[this.currentSavePageItem.merchant][this.currentSavePageItem.brandName][this.currentSavePageItem.productName]);
            usedCache = true;
          }
        }
      }
      if (!usedCache) {
        chrome.storage.local.get(['pluggedSession'], res => {
          let session = res.pluggedSession;
          let xhr = new XMLHttpRequest();
          xhr.open('POST', this.apiUrl + '/query/getSimilarProducts', true);
          xhr.setRequestHeader('x-plugged', session);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onload = () => {
            if (xhr.readyState === xhr.DONE) {
              if (xhr.status == 200) {
                let products = JSON.parse(xhr.response);
                products = products.filter(product => {
                  return product.merchant.toLowerCase() !== this.currentSavePageItem.merchant.toLowerCase();
                });
                this.similarProducts.replace(products);

                // Save in similarProductsCache
                if (this.currentSavePageItem.merchant in this.similarProductsCache) {
                  if (this.currentSavePageItem.brandName in this.similarProductsCache[this.currentSavePageItem.merchant]) {
                    if (!(this.currentSavePageItem.productName in this.similarProductsCache[this.currentSavePageItem.merchant][this.currentSavePageItem.brandName])) {
                      this.similarProductsCache[this.currentSavePageItem.merchant][this.currentSavePageItem.brandName][this.currentSavePageItem.productName] = products;
                    }
                  } else {
                    this.similarProductsCache[this.currentSavePageItem.merchant][this.currentSavePageItem.brandName] = {};
                    this.similarProductsCache[this.currentSavePageItem.merchant][this.currentSavePageItem.brandName][this.currentSavePageItem.productName] = products;
                  }
                } else {
                  this.similarProductsCache[this.currentSavePageItem.merchant] = {};
                  this.similarProductsCache[this.currentSavePageItem.merchant][this.currentSavePageItem.brandName] = {};
                  this.similarProductsCache[this.currentSavePageItem.merchant][this.currentSavePageItem.brandName][this.currentSavePageItem.productName] = products;
                }
              } else {
                console.log('ERROR: Could not get similar products');
              }
            }
          };
          xhr.send(JSON.stringify({
            productVariationName: this.currentSavePageItem.productName,
            brandName: this.currentSavePageItem.brandName
          }));
        });
      }
    }
  }

  setCurrentSavePageItem(merchant, brandName, productName) {
    this.currentSavePageItem.merchant = merchant;
    this.currentSavePageItem.brandName = brandName;
    this.currentSavePageItem.productName = productName;
  }

};

decorate(PopupStore, {
  isLoggedIn: observable,
  setIsLoggedIn: action,

  currentUser: observable,
  setCurrentUser: action,

  followers: observable,
  numFollowers: observable,
  following: observable,
  numFollowing: observable,
  setFollowers: action,
  setFollowing: action,
  addFollowing: action,
  removeFollowing: action,

  currentPage: observable,
  setCurrentPage: action,

  profilePage: observable,
  setProfilePage: action,

  otherProfilePage: observable,
  setOtherProfilePage: action,

  discoverPage: observable,
  setDiscoverPage: action,

  watchedItems: observable,
  numWatchedItems: observable,
  setWatchedItems: action,
  updateWatchedItems: action,
  processWatchedItems: action,

  allSupportedStores: observable,
  getAllSupportedStores: action,

  stores: observable,
  saveStores: action,

  favoriteStores: observable,
  saveFavoriteStores: action,
  addFavoriteStore: action,
  removeFavoriteStore: action,

  modalItem: observable,
  closeItemModal: action,
  openItemModal: action,

  feedbackModal: observable,
  closeFeedbackModal: action,
  openFeedbackModal: action,

  homefeedItems: observable,
  loadHomefeedItems: action,
  loadingHomefeedItems: observable,

  searchedUsers: observable,
  isSearchingUsers: observable,
  currentSearchText: observable,
  searchUsersError: observable,
  setSearchedUsers: action,
  setIsSearchingUsers: action,
  setCurrentSearchText: action,
  setSearchUsersError: action,

  friends: observable,
  friendsPagination: observable,
  loadingFriends: observable,
  loadFriends: action,

  currentUrl: observable,
  setCurrentUrl: action,

  isSaveCardMulti: observable,
  saveCardMultiScrapedData: observable,
  setIsSaveCardMulti: action,
  isSaveCard: observable,
  saveCardScrapedData: observable,
  setSaveCard: action,

  similarProducts: observable,
  getSimilarProducts: action,

  notifications: observable,
  loadNotifications: action,
  loadingNotifications: observable,
});

const popupStore = new PopupStore();
export default popupStore;