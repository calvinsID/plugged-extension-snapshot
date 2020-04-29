/* global chrome */
import React from 'react';
import './discoverSubPage.css';
import PopupStore from '../../../../../stores/popupStore';
import { observer } from "mobx-react";
import secondaryPagesEnum from '../../../../../stores/secondaryPagesEnum';
import popupPagesEnum from '../../../../../stores/popupPagesEnum';
import loadingEnum from '../../../../../stores/loadingEnum';
import loginEnum from '../../../../../stores/loginEnum';
import LikedItem from '../../likedItem/LikedItem';
import WatchedItem from '../../watchedItem/WatchedItem';
import SearchedUserRow from './searchedUserRow/SearchedUserRow';
import $ from 'jquery';
import loadingEllipsis from '../../../../../images/loadingEllipsisBlack.gif';
import { toJS } from 'mobx';

export default observer(class DiscoverSubPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.loadHomeFeed = this.loadHomeFeed.bind(this);
    this.loadFriends = this.loadFriends.bind(this);
  }

  componentDidMount() {}

  loadHomeFeed() {
    PopupStore.loadHomefeedItems();
  }

  loadFriends() {
    PopupStore.loadFriends();
  }

  render() {
    if (PopupStore.discoverPage === secondaryPagesEnum.DISCOVER_ALL) {
      if (!PopupStore.hasLoadedHomefeedItems && PopupStore.isLoggedIn === loginEnum.LOGGED_IN) {
        PopupStore.hasLoadedHomefeedItems = true;
        PopupStore.loadHomefeedItems();
      }
    }
    if (!PopupStore.hasLoadedFriends && PopupStore.isLoggedIn === loginEnum.LOGGED_IN) {
      PopupStore.loadFriends();
    }

    let body = (
      <div></div>
    );

    if (PopupStore.discoverPage === secondaryPagesEnum.DISCOVER_ALL) {
      body = (
        <div className='plugged__popup__discover_sub_page_newsfeed'>
          {PopupStore.homefeedItems.map((item) => {
            return <LikedItem key={item.product_url} likedItem={item}/>;
          })}
          {
            (PopupStore.homefeedItems.length === 0 && PopupStore.loadingHomefeedItems !== loadingEnum.LOADING) ?
            <div className='plugged__popup__empty_state_container'>
              <div className='plugged__popup__empty_state'>
                Follow your friends to see what they are shopping for. Kind of like an Instagram newsfeed.
              </div>
              {
                (PopupStore.friends.length > 0) ?
                <div className='plugged__popup__discover_sub_page_friends'>
                  <div className='plugged__popup__discover_sub_page_friends_title'>People you may know:</div>
                  {PopupStore.friends.map((item) => {
                    return <SearchedUserRow key={item.username} user={item} page={popupPagesEnum.HOME}/>
                  })}
                </div> : null
              }
            </div> : (PopupStore.homefeedItems.length >= PopupStore.howManyHomefeedItems) ?
            <div className='plugged__popup__load_homefeed_button_div_all'>
              <button
                onClick={this.loadHomeFeed}
                className='plugged__popup__load_homefeed_button'>
                  {PopupStore.loadingHomefeedItems === loadingEnum.LOADING ?
                    'Loading' :
                    PopupStore.loadingHomefeedItems === loadingEnum.NOT_LOADING ?
                    'Load More' :
                    'No More Results'}</button>
            </div> : null
          }
        </div>
      );
    } else if (PopupStore.discoverPage === secondaryPagesEnum.DISCOVER_SEARCH) {
      if (PopupStore.isSearchingUsers) {
        body = (
          <div className='plugged__popup__discover_sub_page_search plugged__popup__discover_sub_page_search_center'>
            <img className='plugged__popup__discover_sub_page_loading' src={loadingEllipsis}/>
            {
              (PopupStore.friends.length > 0) ?
                  <div className='plugged__popup__discover_sub_page_friends'>
                    <div className='plugged__popup__discover_sub_page_friends_title'>People you may know:</div>
                    {PopupStore.friends.map((item) => {
                      return <SearchedUserRow key={item.username} user={item} page={popupPagesEnum.HOME}/>
                    })}
                  </div> : null
            }
            {
              PopupStore.friendsPagination ? <div className='plugged__popup__load_homefeed_button_div_all'>
                <button
                  onClick={this.loadFriends}
                  className='plugged__popup__load_homefeed_button'>
                    {PopupStore.loadingFriends === loadingEnum.LOADING ?
                      'Loading' :
                      (PopupStore.loadingFriends === loadingEnum.NOT_LOADING && PopupStore.friendsPagination) ?
                      'Load More' :
                      'No More Results'}</button>
              </div> : null
            }
          </div>
        )
      } else {
        body = (
          <div className='plugged__popup__discover_sub_page_search plugged__popup__discover_sub_page_search_center'>
            {PopupStore.searchedUsers.map(item => {
              return <SearchedUserRow key={item.username} user={item} page={popupPagesEnum.HOME}/>;
            })}
            {(PopupStore.searchedUsers.length <= 0 && PopupStore.currentSearchText) ? <div className='plugged__popup__discover_sub_page_no_results'>
              No results found.
            </div> : null}
            {(PopupStore.searchUsersError && false) ? <div className='plugged__popup__discover_sub_page_no_results'>
              Oops! Something went wrong. Please try again later
            </div> : null}
            {
              (PopupStore.friends.length > 0) ?
                  <div className='plugged__popup__discover_sub_page_friends'>
                    <div className='plugged__popup__discover_sub_page_friends_title'>People you may know:</div>
                    {PopupStore.friends.map((item) => {
                      return <SearchedUserRow key={item.username} user={item} page={popupPagesEnum.HOME}/>
                    })}
                  </div> : null
            }
            {
              PopupStore.friendsPagination ? <div className='plugged__popup__load_homefeed_button_div_all'>
                <button
                  onClick={this.loadFriends}
                  className='plugged__popup__load_homefeed_button'>
                    {PopupStore.loadingFriends === loadingEnum.LOADING ?
                      'Loading' :
                      (PopupStore.loadingFriends === loadingEnum.NOT_LOADING && PopupStore.friendsPagination) ?
                      'Load More' :
                      'No More Results'}</button>
              </div> : null
            }
          </div>
        );
      }
    }

    return body;
  }
});
