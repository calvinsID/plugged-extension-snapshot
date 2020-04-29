import Merchant from './merchant.js';
import $ from 'jquery';

export default class CoachCa extends Merchant {
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
      merchant: 'Courtside Sneakers',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      let brandName = $('.product-vendor');
      if (brandName && brandName.length > 0) {
        result['brandName'] = brandName[0].innerText.trim();
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
      let currentPrice = $('.product-price-minimum.money');
      let retailPrice = $('.product-price-compare.money');

      if (retailPrice && retailPrice.length > 0) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        if (currentPrice && currentPrice.length > 0 && currentPrice[0].innerText.replace(/[^0-9\.]/g, "")) {
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        } else {
          result['currentPrice'] = result['retailPrice'];
        }
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
      merchant: 'Courtside Sneakers',
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
      let imageUrlContainer = element.querySelector('.product-list-item-thumbnail  > a > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.money:not(.original) > .money');
      let retailPrice = element.querySelector('.money.original > .money');
      let hidden = element.querySelector('.sale-price-hidden');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (price) {
          result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        } else if (hidden) {
          result['currentPrice'] = result['retailPrice'];
        }
      } else if (price) {
        result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
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
