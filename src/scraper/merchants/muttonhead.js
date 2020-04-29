import Merchant from './merchant.js';
import $ from 'jquery';

export default class Muttonhead extends Merchant {
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
      merchant: "Muttonhead",
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-single__title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.product-image-main');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.zoomImg');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('div[itemprop=offers]');
      if (priceContainer && priceContainer.length > 0) {
        let comparePrice = priceContainer.find('.product__price--compare');
        let currentPrice = priceContainer.find('.product__price.on-sale');
        let noSale = priceContainer.find('.product__price');

        if (comparePrice && comparePrice.length > 0) {
          // On sale
          comparePrice = comparePrice.find('span.money');
          if (comparePrice && comparePrice.length > 0) {
            result['retailPrice'] = parseFloat(comparePrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
          }
          if (currentPrice && currentPrice.length > 0) {
            currentPrice = currentPrice.find('span.money');
            if (currentPrice && currentPrice.length > 0) {
              result['currentPrice'] = parseFloat(currentPrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
            }
          }
        } else if (noSale && noSale.length > 0) {
          // Not on sale
          noSale = noSale.find('span.money');
          if (noSale && noSale.length > 0) {
            result['currentPrice'] = parseFloat(noSale[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
            result['retailPrice'] = result['currentPrice'];
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
      merchant: 'Muttonhead',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.grid-product__title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.grid__image-ratio > picture > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.currentSrc.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.grid-product__price > span.money');
      let retailPrice = element.querySelector('.grid-product__price > .grid-product__price--original > span.money');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        if (price) {
          result['currentPrice'] = parseFloat(price.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.grid-product__link');
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
