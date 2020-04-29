import Merchant from './merchant.js';
import $ from 'jquery';

export default class Gerhard extends Merchant {
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
      merchant: 'Gerhard',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.ProductItem-details-title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('img.ProductItem-gallery-slides-item-image.loaded');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = $('.sqs-money-native');
      let retailPrice = $('.original-price');

      if (retailPrice && retailPrice.length > 0) {
        // On sale
        if (currentPrice && currentPrice.length > 0) {
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        }
        result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
      } else if (currentPrice && currentPrice.length > 0) {
        // Not on sale
        result['retailPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
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
      merchant: 'Gerhard',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.ProductList-title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.ProductList-image--primary');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.product-price > .sqs-money-native');
      let retailPrice = element.querySelector('.product-price > .original-price > .sqs-money-native');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (retailPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice) {
        // Not on sale
        result['retailPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.ProductList-item-link');
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
