import Merchant from './merchant.js';
import $ from 'jquery';

export default class HarryRosen extends Merchant {
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
      merchant: 'Harry Rosen',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.hr-product-short-description');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      let brandName = $('.hr-product-name');
      if (brandName && brandName.length > 0) {
        result['brandName'] = brandName[0].innerText.trim();
      }

      // Colour

      // Image
      let imageUrl = $('img#productMainImage-1');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src.trim();
      }

      // Sizes

      // Prices
      let priceContainer = $('.hr-product-price');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.accent');
        let retailPrice = priceContainer.find('.line-through');
  
        if (retailPrice && retailPrice.length > 0) {
          // On sale
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        } else {
          // Not on sale
          result['retailPrice'] = parseFloat(priceContainer[0].innerText.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
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
