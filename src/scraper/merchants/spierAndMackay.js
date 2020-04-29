import Merchant from './merchant.js';
import $ from 'jquery';

export default class SpierAndMackay extends Merchant {
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
      merchant: 'Spier & Mackay',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.prosection-ctr');
      if (productName && productName.length > 0) {
        productName = productName.find('.h1');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      result['brandName'] = 'Spier & Mackay';

      // Colour

      // Image
      let imageUrl = $('.owl-wrapper');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.prosection-ctr');
      if (priceContainer && priceContainer.length > 0) {
        priceContainer = priceContainer.find('.price-info');
        if (priceContainer && priceContainer.length > 0) {
          let currentPrice = priceContainer.find('.special-price');
          let comparePrice = priceContainer.find('.old-price');
          let noSale = priceContainer.find('.regular-price');
  
          if (comparePrice && comparePrice.length > 0) {
            // On sale
            comparePrice = comparePrice.find('span.price');
            if (comparePrice && comparePrice.length > 0) {
              result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
            }
            if (currentPrice && currentPrice.length > 0) {
              currentPrice = currentPrice.find('span.price');
              if (currentPrice && currentPrice.length > 0) {
                result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
              }
            }
          } else if (noSale && noSale.length > 0) {
            // Not on sale
            noSale = noSale.find('span.price');
            if (noSale && noSale.length > 0) {
              result['currentPrice'] = parseFloat(noSale[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Spier & Mackay',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-name > a');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-image > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('.old-price > .price');
      let currentPrice = element.querySelector('.special-price > .price');
      let price = element.querySelector('.regular-price > .price');

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
      let url = element.querySelector('a.product-image');
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
