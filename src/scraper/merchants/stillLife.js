import Merchant from './merchant.js';
import $ from 'jquery';

export default class StillLife extends Merchant {
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
      merchant: 'Still Life',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#product-description');
      if (productName && productName.length > 0) {
        productName = productName.find('h1[itemprop=name]');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('#product-photos');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.mainimage');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('#product-description');
      if (priceContainer && priceContainer.length > 0) {
        priceContainer = priceContainer.find('.product-prices');
        if (priceContainer && priceContainer.length > 0) {
          let currentPrice = priceContainer.find('.product-price');
          let comparePrice = priceContainer.find('.was');
  
          if (comparePrice && comparePrice.length > 0) {
            // On sale
            comparePrice = comparePrice.find('span.money');
            if (comparePrice && comparePrice.length > 0 && comparePrice[0].getAttribute('data-currency-cad')) {
              result['retailPrice'] = parseFloat(comparePrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
            }
            if (currentPrice && currentPrice.length > 0) {
              currentPrice = currentPrice.find('span.money');
              if (currentPrice && currentPrice.length > 0 && currentPrice[0].getAttribute('data-currency-cad')) {
                result['currentPrice'] = parseFloat(currentPrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
              }
            }
          } else if (currentPrice && currentPrice.length > 0) {
            // Not on sale
            currentPrice = currentPrice.find('span.money');
            if (currentPrice && currentPrice.length > 0 && currentPrice[0].getAttribute('data-currency-cad')) {
              result['currentPrice'] = parseFloat(currentPrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
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
      merchant: 'Still Life',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-info > a > h3');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.prod-image');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img');
        if (imageUrlContainer) {
          result.imageUrl = imageUrlContainer.src.trim();
        }
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.onsale > .money');
      let retailPrice = element.querySelector('.was > .money');
      let price = element.querySelector('.prod-price > .money');

      if (currentPrice) {
        // On sale
        result['currentPrice'] = parseFloat(currentPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        if (retailPrice) {
          result['retailPrice'] = parseFloat(retailPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['currentPrice'] = parseFloat(price.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('.prod-image > a');
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
