import Merchant from './merchant.js';
import $ from 'jquery';

export default class CanadianTire extends Merchant {
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
      merchant: 'Canadian Tire',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-pdp-header');
      if (productName && productName.length > 0) {
        productName = productName.find('.pdp-header__product-name');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.s7staticimage');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.pdp-buy-box__primary-section');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.price__total-value.price__total--on-sale');
        let retailPrice = priceContainer.find('.price__reg-value');

        if (currentPrice && currentPrice.length > 0 && currentPrice[0].innerText && currentPrice[0].innerText.trim()) {
          // On sale
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (retailPrice && retailPrice.length > 0 && retailPrice[0].innerText && retailPrice[0].innerText.trim()) {
            result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (retailPrice && retailPrice.length > 0 && retailPrice[0].innerText && retailPrice[0].innerText.trim()) {
          // Not on sale
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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

  scrapeMulti(element) {
    let result = {
      productName: null,
      brandName: null,
      colour: null,
      retailPrice: null,
      currentPrice: null,
      imageUrl: null,
      sizes: [],
      merchant: 'Canadian Tire',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-tile-srp__title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-tile-srp__image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.product-tile__price');
      let currentPrice = element.querySelector('.price__total-value.price__total--on-sale');
      let retailPrice = element.querySelector('.product-tile__price-total-value-from.product-tile__regular-price--on-sale');

      if (!price && !retailPrice && !currentPrice) {
        retailPrice = element.querySelector('.price__list--last-price');
        currentPrice = element.querySelector('.price__now--value-srp');
      }

      if (retailPrice && retailPrice.textContent && retailPrice.textContent.trim()) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice && currentPrice.textContent && currentPrice.textContent.trim()) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price && price.textContent && price.textContent.trim()) {
        // Not on sale
        result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.product-tile-srp__main-link');
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
