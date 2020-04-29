import Merchant from './merchant.js';
import $ from 'jquery';

export default class BlueButtonShop extends Merchant {
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
      merchant: 'Brooklyn Clothing',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-title');
      if (productName && productName.length > 0 && productName[0].innerText) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      let brandName = $('.product-vendor');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('a');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName[0].innerText.trim();
        }
      }

      // Colour

      // Image
      let imageUrl = $('.product-gallery--image.image--selected');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-main');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.price--compare-at.visible');
        let retailPrice = priceContainer.find('.price--main');
        if (currentPrice && currentPrice.length > 0) {
          // On sale
          currentPrice = currentPrice.find('span.money');
          if (currentPrice && currentPrice.length > 0 && currentPrice[0].getAttribute('data-currency-cad')) {
            result['retailPrice'] = parseFloat(currentPrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
          }
          if (retailPrice && retailPrice.length > 0 ) {
            retailPrice = retailPrice.find('span.money');
            if (retailPrice && retailPrice.length > 0 && retailPrice[0].getAttribute('data-currency-cad')) {
              result['currentPrice'] = parseFloat(retailPrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
            }
          }
        } else {
          // Not on sale
          if (retailPrice && retailPrice.length > 0) {
            retailPrice = retailPrice.find('span.money');
            if (retailPrice && retailPrice.length > 0 && retailPrice[0].getAttribute('data-currency-cad')) {
              result['currentPrice'] = parseFloat(retailPrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
              result['retailPrice'] = result['currentPrice'];
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

  scrapeMulti(element) {
    let result = {
      productName: null,
      brandName: null,
      colour: null,
      retailPrice: null,
      currentPrice: null,
      imageUrl: null,
      sizes: [],
      merchant: 'Brooklyn Clothing',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.productitem--title > a');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.productitem--vendor');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.productitem--image-primary');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.price--main > .money');
      let retailPrice = element.querySelector('.price--compare-at > .money');

      if (retailPrice && (retailPrice.getAttribute('data-currency-cad') || retailPrice.textContent)) {
        // On sale
        if (retailPrice.getAttribute('data-currency-cad')) {
          result['retailPrice'] = parseFloat(retailPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        } else {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
        if (price && (price.getAttribute('data-currency-cad') || price.textContent)) {
          if (price.getAttribute('data-currency-cad')) {
            result['currentPrice'] = parseFloat(price.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
          } else {
            result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (price && (price.getAttribute('data-currency-cad') || price.textContent)) {
        // Not on sale
        if (price.getAttribute('data-currency-cad')) {
          result['retailPrice'] = parseFloat(price.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        } else {
          result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        }
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.productitem--image-link');
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
