import Merchant from './merchant.js';
import $ from 'jquery';

export default class Kith extends Merchant {
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
      merchant: 'Kith',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.product-single__title');

      if (productName) {
        result['productName'] = productName.text();
      }

      // Brand Name

      // Colour
      let colour = $('.product-single__color');

      if (colour) {
        result['colour'] = colour.text();
      }

      // Image
      let imageUrl = $('div.product-single__image-slide');
      imageUrl = imageUrl.find('img');

      if (imageUrl[0] && imageUrl[0].src) {
        result['imageUrl'] = imageUrl[0].src
      }

      // Sizes
      let options = $('select#SingleOptionSelector-0');
      options = options.find('option');

      if (options) {
        for (let i = 0; i < options.length; i++) {
          result['sizes'].push(options[i].label);
        }
      }

      // Prices
      let priceButton = $('button.product-form__add-to-cart');
      let retailPrice = priceButton.find('s.product-single__compare-at-price');
      let currentPrice = priceButton.find('span[data-product-price]');

      if (currentPrice.html().substring(0, 1) === '$') {
        if (!retailPrice.html()) {
          // Not on sale
          result['retailPrice'] = parseFloat(currentPrice.html().replace(/[^0-9\.]/g, ""));
        } else {
          result['retailPrice'] = parseFloat(retailPrice.html().replace(/[^0-9\.]/g, ""));
        }
        result['currentPrice'] = parseFloat(currentPrice.html().replace(/[^0-9\.]/g, ""));
      } else {
        // Not a USD page, so need to select USD price using special selector
        currentPrice =  $('meta[itemprop="price"]').attr('content');
        if (currentPrice) {
          if (!retailPrice.html()) {
            // Not on sale
            result['retailPrice'] = parseFloat(currentPrice.replace(',', ''));
          } else {
            // Inaccurate, but nothing we can do. Server scraper should fix this mismatch
            result['retailPrice'] = parseFloat(currentPrice.replace(',', ''));
          }
          result['currentPrice'] = parseFloat(currentPrice.replace(',', ''));
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
      merchant: 'Kith',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-card__title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-card__image-slide-container.slick-current');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('picture');
        if (imageUrlContainer) {
          imageUrlContainer = imageUrlContainer.querySelector('img');
          if (imageUrlContainer) {
            result.imageUrl = imageUrlContainer.currentSrc.trim();
          }
        }
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('.product-card__price');
      if (priceButton) {
        let comparePrice = priceButton.querySelector('.original');
        if (comparePrice && comparePrice.textContent.trim().substring(0, 1) === '$') {
          // On sale and is USD
          let prices = priceButton.textContent.trim().split('$');
          if (prices && prices.length > 2) {
            result['retailPrice'] = parseFloat(prices[1].replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = parseFloat(prices[2].replace(/[^0-9\.]/g, ""));
          }
        } else {
          // Not on sale
          if (priceButton.textContent.trim().substring(0, 1) === '$') {
            // Is USD
            result['currentPrice'] = parseFloat(priceButton.textContent.replace(/[^0-9\.]/g, ""));
            result['retailPrice'] = result['currentPrice'];
          }
        }
      }

      // Url
      let url = element.querySelector('a.product-card__image-slide');
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
