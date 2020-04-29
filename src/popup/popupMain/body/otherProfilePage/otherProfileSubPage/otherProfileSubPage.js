/* global chrome */
import React from 'react';
import {toJS} from 'mobx';
import PopupStore from '../../../../../stores/popupStore';
import OtherProfileStore from '../../../../../stores/otherProfileStore';
import { observer } from "mobx-react";
import WatchedItem from '../../watchedItem/WatchedItem';

export default observer(class OtherProfileSubPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    let body = (
      <div className='plugged__popup__profile_sub_page'>
        {OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].watchedItems.length ? (
          OtherProfileStore.otherProfiles[OtherProfileStore.otherProfiles.length - 1].watchedItems.map((item) => {
            return <WatchedItem watchedItem={item}/>;
          })
        ) : (
          <div className='plugged__popup__profile_sub_page plugged__popup__profile_sub_page_no_items'>
            No items saved
          </div>
        )}
      </div>
    );

    return body;
  }
});
