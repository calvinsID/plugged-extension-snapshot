import Merchant from './merchant.js';
import $ from 'jquery';

export default class PalmAngels extends Merchant {
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
      merchant: 'Palm Angels (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('aside.details');
      if (productName && productName.length > 0) {
        productName = productName.find('header');
        if (productName && productName.length > 0) {
          productName = productName.find('h1');
          if (productName && productName.length > 0) {
            result['productName'] = productName[0].innerText.trim();
          }
        }
      }

      // Brand Name
      result['brandName'] = 'Palm Angels';

      // Colour

      // Image
      let imageUrl = $('.total-images');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('aside.details');
      if (priceContainer && priceContainer.length > 0) {
        let priceString = priceContainer.find('span[itemprop=price]');
        if (priceString && priceString.length > 0) {
          priceString = priceString[0].innerText.trim();
          if (priceString) {
            if (priceString.indexOf('=') !== -1) {
              // On sale
              let beforePrice = priceString.split(' - ');
              let afterString = priceString.split(' = ');
              if (beforePrice && beforePrice.length > 0) {
                result['retailPrice'] = parseFloat(beforePrice[0].replace(/[^0-9]/g, ""));
              }
              if (afterString && afterString.length > 1) {
                result['currentPrice'] = parseFloat(afterString[1].replace(/[^0-9]/g, ""));
              }
            } else {
              result['retailPrice'] = parseFloat(priceString.replace(/[^0-9]/g, ""));
              result['currentPrice'] = result['retailPrice'];
            }
          }
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
}
