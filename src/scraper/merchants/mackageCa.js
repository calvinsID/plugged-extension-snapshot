import Merchant from './merchant.js';
import $ from 'jquery';

export default class MackageCa extends Merchant {
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
      merchant: 'Mackage (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.product-name');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Mackage'

      // Colour

      // Image
      let imageUrl = $('.primary-image1');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src;
      }

      // Sizes
      let options = $('.attribute-wrapper');
      if (options && options.length > 0) {
        options = options.find('.selectable');
        if (options && options.length > 0) {
          for (let i = 0; i < options.length; i++) {
            result['sizes'].push(options[i].innerText.trim());
          }
        }
      }

      // Prices
      let price = $('.price-standard');
      let comparePrice = $('.price-sales');

      if (price && price.length > 0) {
        // On sale
        if (comparePrice && comparePrice.length > 0) {
          result['currentPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
        }
        result['retailPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
      } else {
        // Not on sale
        if (comparePrice && comparePrice.length > 0) {
          result['currentPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
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
      merchant: 'Mackage (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-name-title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Mackage';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-image > a > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('.product-standard-price');
      let currentPrice = element.querySelector('.product-sales-price');

      if (retailPrice && retailPrice.textContent) {
        // On sale
        retailPrice = retailPrice.textContent.split('-');
        if (retailPrice.length > 1) {
          result['retailPrice'] = parseFloat(retailPrice[1].replace(/[^0-9\.]/g, ""));
        } else if (retailPrice.length > 0) {
          result['retailPrice'] = parseFloat(retailPrice[0].replace(/[^0-9\.]/g, ""));
        }
        if (currentPrice && currentPrice.textContent) {
          currentPrice = currentPrice.textContent.split('-');
          if (currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (currentPrice && currentPrice.textContent) {
        // Not on sale
        currentPrice = currentPrice.textContent.split('-');
        if (currentPrice.length > 1) {
          result['currentPrice'] = parseFloat(currentPrice[0].replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = parseFloat(currentPrice[1].replace(/[^0-9\.]/g, ""));
        } else if (currentPrice.length > 0) {
          result['retailPrice'] = parseFloat(currentPrice[0].replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.querySelector('.product-image > a');
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
