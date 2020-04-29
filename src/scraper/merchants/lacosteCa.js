import Merchant from './merchant.js';
import $ from 'jquery';

export default class LacosteCa extends Merchant {
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
      merchant: 'Lacoste (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.js-pdp-desc');
      if (productName && productName.length > 0) {
        productName = productName.find('.title--medium');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      result['brandName'] = 'Lacoste';

      // Colour

      // Image
      let imageUrl = $('.js-pdp-gallery');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.js-pdp-price');
      if (priceContainer && priceContainer.length > 0) {
        let prices = priceContainer.find('p.nowrap');

        if (prices && prices.length > 1) {
          // On sale
          result['retailPrice'] = parseFloat(prices[1].innerText.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = parseFloat(prices[0].innerText.replace(/[^0-9\.]/g, ""));
        } else if (prices && prices.length > 0) {
          // Not on sale
          result['currentPrice'] = parseFloat(prices[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Lacoste (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('a.simple-link.js-product-tile-link');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Lacoste';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.js-product-tile-link');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img');
        if (imageUrlContainer) {
          result.imageUrl = imageUrlContainer.src.trim();
        }
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.js-product-tile > .ff-bold > .text-grey');
      let retailPrice = element.querySelector('.js-product-tile > .ff-bold > .text-grey-lighter.strikethrough');

      if (!currentPrice && !retailPrice) {
        currentPrice = element.querySelector('.js-product-tile > .ff-semibold > .text-grey');
        retailPrice = element.querySelector('.js-product-tile > .ff-semibold > .text-grey-lighter.strikethrough');
      }

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice) {
        // Not on sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.js-product-tile-link');
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
