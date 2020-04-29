import Merchant from './merchant.js';
import $ from 'jquery';

export default class Vuugo extends Merchant {
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
      merchant: 'Vuugo',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-info');
      if (productName && productName.length > 0) {
        productName = productName.find('.image');
        if (productName && productName.length > 0) {
          productName = productName.find('img#image');
          if (productName && productName.length > 0) {
            result['productName'] = productName[0].getAttribute('title').trim();
          }
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.product-info');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('.image');
        if (imageUrl && imageUrl.length > 0) {
          imageUrl = imageUrl.find('img#image');
          if (imageUrl && imageUrl.length > 0) {
            result['imageUrl'] = imageUrl[0].src;
          }
        }
      }

      // Sizes

      // Prices
      let container = $('.product-info');
      if (container && container.length > 0) {
        let retailPrice = container.find('.price-old');
        let currentPrice = container.find('.price-new');
        let price = container.find('.price');
  
        if (retailPrice && retailPrice.length > 0 && retailPrice[0].textContent && retailPrice[0].textContent.trim()) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice[0].textContent.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].textContent.replace(/[^0-9\.]/g, ""));
          }
        } else if (price && price.length > 0) {
          // Not on sale
          result['currentPrice'] = parseFloat(price[0].textContent.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Vuugo',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.image');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img');
        if (imageUrlContainer) {
          result.imageUrl = imageUrlContainer.src.trim();
        }
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.price-new');
      let retailPrice = element.querySelector('.price-old');
      let price = element.querySelector('.price');

      if (retailPrice && retailPrice.textContent) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice && currentPrice.textContent) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price && price.textContent) {
        // Not on sale
        result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('.name > a');
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
