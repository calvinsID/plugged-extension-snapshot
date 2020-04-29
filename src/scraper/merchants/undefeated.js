import Merchant from './merchant.js';
import $ from 'jquery';

export default class Undefeated extends Merchant {
  constructor(url) {
    super(url);
  }

  scrape() {
    let result = {
      productName: null,
      brandName: null,
      colour: null,
      retailPrice: null,
      currentPrice: null,
      imageUrl: null,
      sizes: [],
      merchant: 'Undefeated',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.product-single__title');
      if (productName && productName.length > 0) {
        result['productName'] = productName.text();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('img.product-single__photo');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].currentSrc;
      }

      // Sizes

      // Prices
      let price = $('div.price-container');
      if (price && price.length > 0) {
        let comparePrice = price.find('span#ComparePrice');
        let productPrice = price.find('span#ProductPrice');
        if (comparePrice && comparePrice.length > 0 && comparePrice[0].innerText) {
          // On sale
          comparePrice = comparePrice.find('span.money');
          if (comparePrice && comparePrice.length > 0) {
            result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = parseFloat(productPrice[0].getAttribute('content').replace(',', ''));
          }
        } else if (productPrice) {
          // Not on sale
          result['retailPrice'] = parseFloat(productPrice[0].getAttribute('content').replace(',', ''));
          result['currentPrice'] = parseFloat(productPrice[0].getAttribute('content').replace(',', ''));
        }
      }
    } catch (error) {
      result.scrapedWithoutErrors = false;
    }

    // Set scrapedWithoutErrors
    //   We are not checking for empty retailPrice or currentPrice because we want to see if backend scraper finds the prices
    //   (in case frontend user is scraping from a diff country site, but backend scraper scrapes from the USA site)
    if (!result.productName || !result.imageUrl || !result.merchant) {
      result.scrapedWithoutErrors = false;
    }

    console.log('Plugged scraped:');
    console.log(result);
    return result;
  }

  scrapeMulti(element) {
    let result = {
      productName: null,
      brandName: null,
      colour: null,
      retailPrice: null,
      currentPrice: null,
      imageUrl: null,
      sizes: [],
      merchant: 'Undefeated',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.grid-product__title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.product--image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.currentSrc.trim();
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('.grid-product__price-wrap');
      if (priceButton) {
        let comparePrice = priceButton.querySelector('#ComparePrice');
        let regularPrice = priceButton.querySelector('span:not(#ComparePrice) > span.money');

        if (comparePrice) {
          // On sale
          comparePrice = comparePrice.querySelector('span.money');
          if (comparePrice) {
            result['retailPrice'] = parseFloat(comparePrice.textContent.replace(/[^0-9\.]/g, ""));
          }
          result['currentPrice'] = parseFloat(regularPrice.textContent.replace(/[^0-9\.]/g, ""));
        } else if (regularPrice) {
          // Not on sale
          result['retailPrice'] = parseFloat(regularPrice.textContent.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.querySelector('a.grid-product__meta');
      if (url) {
        result['url'] = url.href;
      }

    } catch (error) {
      result.scrapedWithoutErrors = false;
    }

    // Set scrapedWithoutErrors
    //   We are not checking for empty retailPrice or currentPrice because we want to see if backend scraper finds the prices
    //   (in case frontend user is scraping from a diff country site, but backend scraper scrapes from the USA site)
    if (!result.productName || !result.imageUrl || !result.merchant) {
      result.scrapedWithoutErrors = false;
    }
    return result;
  }
}
