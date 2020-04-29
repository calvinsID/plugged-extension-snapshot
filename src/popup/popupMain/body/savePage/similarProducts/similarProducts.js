/* global chrome */
import React from 'react';
import './similarProducts.css';
import { observer } from "mobx-react";
import PopupStore from '../../../../../stores/popupStore';
import WatchedItem from '../../watchedItem/watchedItem';

export default observer(class SimilarProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  render() {
    let similarProducts = <span></span>;

    if (PopupStore.similarProducts.length !== 0) {
      similarProducts = (
        <div>
          <div className='plugged__similar_products_heading'>Similar products from other merchants:</div>
          {PopupStore.similarProducts.map(product => {
            product.product_name = product.product_variation_name;
            product.colour = '';
            product.watch_until = '2030-04-11T18:36:44.041Z';
            product.isExpired = false;
            product.lowestCurrentPrice = product.current_price;
            product.highestRetailPrice = product.retail_price;
            product.currency = 'CAD';
            return (
              <WatchedItem watchedItem={product}/>
            );
          })}
        </div>
      );
    }

    return similarProducts;
  }
});
