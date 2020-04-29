import Merchant from './merchant.js';
import $ from 'jquery';

export default class AldoCa extends Merchant {
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
      merchant: 'Aldo (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.c-buy-module__product-title');
      if (productName && productName.length > 0) {
        productName = productName.find('span');
        if (productName && productName.length > 1) {
          result['productName'] = '';
          for (let i = 0; i < productName.length; i++) {
            if (i !== 0) {
              result['productName'] += ' - ';
            }
            result['productName'] += productName[i].textContent.trim();
          }
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.c-carousel__scroller');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].currentSrc;
        }
      }

      // Sizes

      // Prices
      let price = $('.c-product-price__formatted-price--is-reduced');
      let comparePrice = $('.c-product-price__formatted-price--original');

      if (comparePrice && comparePrice.length > 0) {
        // On sale
        if (price && price.length > 0) {
          result['currentPrice'] = parseFloat(price[0].innerText.trim().substring(1).replace(',', ''));
        }
        result['retailPrice'] = parseFloat(comparePrice[0].innerText.trim().substring(1).replace(',', ''));
      } else {
        // Not on sale
        price = $('.c-product-price__formatted-price');
        if (price && price.length > 0) {
          result['currentPrice'] = parseFloat(price[0].innerText.trim().substring(1).replace(',', ''));
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
      merchant: 'Aldo (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.c-product-tile__product-name > span');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.c-product-tile__content-wrapper > picture > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.currentSrc.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.c-product-price__formatted-price');
      let retailPrice = element.querySelector('.c-product-price__formatted-price.c-product-price__formatted-price--original');
      let currentPrice = element.querySelector('.c-product-price__formatted-price.c-product-price__formatted-price--is-reduced');

      if (currentPrice) {
        // On sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (retailPrice) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.c-product-tile__link-product');
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
