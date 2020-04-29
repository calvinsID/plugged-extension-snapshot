import Merchant from './merchant.js';
import $ from 'jquery';

export default class Staples extends Merchant {
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
      merchant: 'Staples',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product__page');
      if (productName && productName.length > 0) {
        productName = productName.find('.product-title');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.product__page');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('.slick-current.slick-active');
        if (imageUrl && imageUrl.length > 0) {
          imageUrl = imageUrl.find('img');
          if (imageUrl && imageUrl.length > 0) {
            result['imageUrl'] = imageUrl[0].currentSrc.trim();
          }
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product__page');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.product-form__price.money');
        let retailPrice = priceContainer.find('.money-details > .top-product > .medium');

        if (retailPrice && retailPrice.length > 0 && retailPrice[0].innerText && retailPrice[0].innerText.trim()) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0 && currentPrice[0].innerText && currentPrice[0].innerText.trim()) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (currentPrice && currentPrice.length > 0 && currentPrice[0].innerText && currentPrice[0].innerText.trim()) {
          // Not on sale
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Staples',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-thumbnail__title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-thumbnail__image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('.money-details > .top-product');
      let currentPrice = element.querySelector('.product-thumbnail__price > .money.pre-money');

      if (retailPrice && retailPrice.textContent && retailPrice.textContent.trim()) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice && currentPrice.textContent && currentPrice.textContent.trim()) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice && currentPrice.textContent && currentPrice.textContent.trim()) {
        // Not on sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
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
