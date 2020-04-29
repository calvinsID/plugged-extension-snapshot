import Merchant from './merchant.js';
import $ from 'jquery';

export default class Neighbour extends Merchant {
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
      merchant: "Neighbour",
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-info');
      if (productName && productName.length > 0) {
        productName = productName.find('.title');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      let brandName = $('.product-info');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('.vendor');
        if (brandName && brandName.length > 0) {
          brandName = brandName.find('a');
          if (brandName && brandName.length > 0) {
            result['brandName'] = brandName[0].innerText.trim();
          }
        }
      }

      // Colour

      // Image
      let imageUrl = $('#featured');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-info');
      if (priceContainer && priceContainer.length > 0) {
        let comparePrice = priceContainer.find('.special-price');
        let currentPrice = priceContainer.find('.price');

        if (comparePrice && comparePrice.length > 0) {
          // On sale
          let prices = comparePrice.find('span.money');
          if (prices && prices.length > 1) {
            result['currentPrice'] = parseFloat(prices[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
            result['retailPrice'] = parseFloat(prices[1].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
          }
        } else if (currentPrice && currentPrice.length > 0) {
          // Not on sale
          currentPrice = currentPrice.find('span.money');
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
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
      merchant: 'Neighbour',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('a.title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.vendor > a');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.images > img.passive');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.price > span.money');
      let retailPrice = element.querySelector('.compare-at-price > span.money');
      let currentPrice = element.querySelector('.special-price > span.money');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['currentPrice'] = parseFloat(price.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.title');
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
