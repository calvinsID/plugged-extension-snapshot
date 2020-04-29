/* global chrome */
import React from 'react';
import './discoverPage.css';
import PopupStore from '../../../../stores/popupStore';
import DiscoverNavBar from './discoverNavBar/DiscoverNavBar';
import DiscoverSubPage from './discoverSubPage/DiscoverSubPage';
import { observer } from "mobx-react";

export default observer(class DiscoverPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  render() {
    let discoverPage = (
      <div className='plugged__popup__discover_page'>
        <DiscoverNavBar/>
        <DiscoverSubPage/>
      </div>
    );

    return discoverPage;
  }
});
