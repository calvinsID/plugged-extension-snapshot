import Merchant from './merchant.js';
import $ from 'jquery';

export default class PeaceCollective extends Merchant {
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
      merchant: 'Peace Collective',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-page--title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Peace Collective';

      // Colour

      // Image
      let imageUrl = $('.product-page--images-container');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.lazyloaded');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].currentSrc.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-page--main-content');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.actual-price');
        let comparePrice = priceContainer.find('.compare-price');

        if (comparePrice && comparePrice.length > 0 && comparePrice[0].innerText) {
          // On sale
          comparePrice = comparePrice.find('span.money');
          if (comparePrice && comparePrice.length > 0) {
            result['retailPrice'] = parseFloat(comparePrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
          }
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
          }
        } else if (currentPrice && currentPrice.length > 0) {
          // Not on sale
          result['currentPrice'] = parseFloat(currentPrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
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
      merchant: 'Peace Collective',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product--title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Peace Collective';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.image--container > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.currentSrc.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.product--price > span.money');
      let retailPrice = element.querySelector('.product--compare-price > span.money');

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
      let url = element.querySelector('.product--details > a');
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
