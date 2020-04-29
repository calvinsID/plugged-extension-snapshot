import Merchant from './merchant.js';
import $ from 'jquery';

export default class WalmartCa extends Merchant {
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
      merchant: 'Walmart (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1[data-automation=product-title]');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.react-swipe-container');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('div[role=presentation] > img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes

      // Prices
      let retailPrice = $('[data-automation=buybox-price-old]');
      let currentPrice = $('[data-automation=buybox-price]');
      if (retailPrice && retailPrice.length > 0 && retailPrice[0].innerText) {
        // On sale
        retailPrice = retailPrice[0].innerText.split('to');
        if (retailPrice && retailPrice.length > 0) {
          result['retailPrice'] = parseFloat(retailPrice[retailPrice.length - 1].replace(/[^0-9\.]/g, ""));
        }
        if (currentPrice && currentPrice.length > 0 && currentPrice[0].innerText) {
          currentPrice = currentPrice[0].innerText.split('to');
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (currentPrice && currentPrice.length > 0 && currentPrice[0].innerText) {
        // Not on sale
        currentPrice = currentPrice[0].innerText.split('to');
        if (currentPrice && currentPrice.length > 0) {
          result['currentPrice'] = parseFloat(currentPrice[0].replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = parseFloat(currentPrice[currentPrice.length - 1].replace(/[^0-9\.]/g, ""));
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
      merchant: 'Walmart (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.thumb-header');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.centered-img-wrap > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.price-current');
      let retailPrice = element.querySelector('.price-was');
      if (retailPrice && retailPrice.textContent) {
        // On sale
        retailPrice = retailPrice.textContent.toLowerCase().split('to');
        if (retailPrice && retailPrice.length > 0) {
          result['retailPrice'] = parseFloat(retailPrice[retailPrice.length - 1].replace(/[^0-9\.]/g, ""));
        }
        if (currentPrice && currentPrice.textContent) {
          currentPrice = currentPrice.textContent.toLowerCase().split('to');
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (currentPrice && currentPrice.textContent) {
        // Not on sale
        currentPrice = currentPrice.textContent.toLowerCase().split('to');
        if (currentPrice && currentPrice.length > 0) {
          result['currentPrice'] = parseFloat(currentPrice[0].replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = parseFloat(currentPrice[currentPrice.length - 1].replace(/[^0-9\.]/g, ""));
        }
      }

      // Url
      let url = element.querySelector('a.product-link');
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
