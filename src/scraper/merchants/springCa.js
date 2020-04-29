import Merchant from './merchant.js';
import $ from 'jquery';

export default class SpringCa extends Merchant {
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
      merchant: 'Spring (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.c-buy-module__product-title');
      if (productName && productName.length > 0) {
        productName = productName.find('span');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      result['brandName'] = 'Spring';

      // Colour

      // Image
      let imageUrl = $('div[aria-label="Product Gallery"]');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('.c-picture.c-picture--is-loaded');
        if (imageUrl && imageUrl.length > 0) {
          imageUrl = imageUrl.find('img');
          if (imageUrl && imageUrl.length > 0) {
            result['imageUrl'] = imageUrl[0].currentSrc.trim();
          }
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.c-buy-module__price-review-wrap');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.c-product-price__formatted-price.c-product-price__formatted-price--is-reduced');
        let comparePrice = priceContainer.find('.c-product-price__formatted-price.c-product-price__formatted-price--original');
        let noSale = priceContainer.find('.c-product-price__formatted-price');

        if (comparePrice && comparePrice.length > 0) {
          // On sale
          result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (noSale && noSale.length > 0) {
          // Not on sale
          result['currentPrice'] = parseFloat(noSale[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Spring (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.c-product-tile__product-name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Spring';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.c-product-tile__content > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.currentSrc.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.c-product-price > .c-product-price__formatted-price');
      let currentPrice = element.querySelector('.c-product-price > .c-product-price__formatted-price--is-reduced');
      let retailPrice = element.querySelector('.c-product-price > .c-product-price__formatted-price--original');

      if (currentPrice) {
        // On sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (retailPrice) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
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
