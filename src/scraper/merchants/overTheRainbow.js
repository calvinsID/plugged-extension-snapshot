import Merchant from './merchant.js';
import $ from 'jquery';

export default class OverTheRainbow extends Merchant {
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
      merchant: 'Over The Rainbow',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-details-wrapper');
      if (productName && productName.length > 0) {
        productName = productName.find('.product-title');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      let brandName = $('.product-details-wrapper');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('.product-vendor');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName[0].innerText.trim();
        }
      }

      // Colour

      // Image
      let imageUrl = $('.product-main-image');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-price');
      if (priceContainer && priceContainer.length > 0) {
        let comparePrice = priceContainer.find('.product-price-compare');
        let currentPrice = priceContainer.find('.product-price-minimum');

        if (comparePrice && comparePrice.length > 0) {
          result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
        }
        if (currentPrice && currentPrice.length > 0) {
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Over The Rainbow',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-list-item-title > a');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.product-list-item-vendor > a');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-list-item-thumbnail > a > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.product-list-item-price > .money:not(.original)');
      let retailPrice = element.querySelector('.product-list-item-price > .money.original');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice) {
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('.product-list-item-title > a');
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
