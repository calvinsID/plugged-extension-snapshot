/* global chrome */
import React from 'react';
import './discoverNavBar.css';
import PopupStore from '../../../../../stores/popupStore';
import secondaryPagesEnum from '../../../../../stores/secondaryPagesEnum';
import loginEnum from '../../../../../stores/loginEnum';
import { observer } from "mobx-react";
import SearchIcon from '@material-ui/icons/Search';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';
import { throttle, debounce } from 'throttle-debounce';
import {toJS} from 'mobx';

export default observer(class DiscoverNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }

    this.autocompleteSearchDebounced = debounce(750, this.autocompleteSearch);
    this.autocompleteSearchThrottled = throttle(500, this.autocompleteSearch);

    this.set = this.setDiscoverPage.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onGoBack = this.onGoBack.bind(this);
    this.resetSearch = this.resetSearch.bind(this);

    this.autocompleteCache = {};

    this.apiUrl = PopupStore.apiUrl;
  }

  componentDidMount() {
    this.resetSearch();
    if (PopupStore.discoverPage === secondaryPagesEnum.DISCOVER_SEARCH) {
      PopupStore.setDiscoverPage(secondaryPagesEnum.DISCOVER_ALL);
    }
  }

  setDiscoverPage(page) {
    PopupStore.setDiscoverPage(page);
  }

  updateValue(event) {
    let text = event.target.value.trim();
    PopupStore.setCurrentSearchText(text);

    this.setState({searchText: event.target.value}, () => {
      if (text && text !== '' && text.length < 5) {
        PopupStore.setIsSearchingUsers(true);
        this.autocompleteSearchThrottled(this.state.searchText.trim());
      } else if (text && text !== '' && text.length >= 5) {
        PopupStore.setIsSearchingUsers(true);
        this.autocompleteSearchDebounced(this.state.searchText.trim());
      } else {
        PopupStore.setSearchedUsers([]);
      }
    });
  }

  autocompleteSearch(searchText) {
    if (this.autocompleteCache[searchText]) {
      PopupStore.setIsSearchingUsers(false);
      PopupStore.setSearchedUsers(this.autocompleteCache[searchText]);
    } else {
      chrome.storage.local.get(['pluggedSession'], res => {
        let session = res.pluggedSession;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.apiUrl + '/query/searchUsers' + '?searchText=' + searchText, true);
        xhr.setRequestHeader('x-plugged', session);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
          if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 && searchText === PopupStore.currentSearchText) {
              PopupStore.setIsSearchingUsers(false);
              PopupStore.setSearchedUsers(JSON.parse(xhr.response));
              this.autocompleteCache[searchText] = JSON.parse(xhr.response);
            } else if (xhr.status !== 200 && searchText === PopupStore.currentSearchText) {
              PopupStore.setIsSearchingUsers(false);
              PopupStore.setSearchUsersError(true);
            }
          }
        };
        xhr.send();
      });
    }
  }

  onFocus() {
    PopupStore.setDiscoverPage(secondaryPagesEnum.DISCOVER_SEARCH);
  }

  onBlur() {
    if (!this.state.searchText || this.state.searchText.trim() === '') {
      PopupStore.setDiscoverPage(secondaryPagesEnum.DISCOVER_ALL);
    }
  }

  onGoBack() {
    this.resetSearch();
    PopupStore.setDiscoverPage(secondaryPagesEnum.DISCOVER_ALL);
  }

  resetSearch() {
    this.setState({searchText: ''});
    PopupStore.setSearchedUsers([]);
    PopupStore.setCurrentSearchText('');
    PopupStore.setIsSearchingUsers(false);
    PopupStore.setSearchUsersError(false);
  }

  render() {
    return (
      <div className='plugged__popup__discover_nav_bar'>
        <div className={PopupStore.discoverPage === secondaryPagesEnum.DISCOVER_SEARCH ? 'plugged__popup__discover_nav_bar_search_container plugged__popup__discover_nav_bar_search_container_focused' : 'plugged__popup__discover_nav_bar_search_container'}>
          {PopupStore.discoverPage === secondaryPagesEnum.DISCOVER_SEARCH ?
            <ArrowIcon className='plugged__popup__discover_nav_bar_search_icon plugged__popup__discover_nav_bar_search_icon_back'
                       onClick={this.onGoBack}/> :
            <SearchIcon className='plugged__popup__discover_nav_bar_search_icon'/>}
          <input type='text'
                className='plugged__popup__discover_nav_bar_search'
                placeholder={PopupStore.isLoggedIn === loginEnum.LOGGED_IN ? 'Search for users to follow' : 'Log in to follow users'}
                value={this.state.searchText}
                onChange={event => this.updateValue(event)}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                disabled={PopupStore.isLoggedIn === loginEnum.LOGGED_IN ? false : true}/>
        </div>
      </div>
    );
  }
});
