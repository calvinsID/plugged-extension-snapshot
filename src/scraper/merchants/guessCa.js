import Merchant from './merchant.js';
import $ from 'jquery';

export default class GuessCa extends Merchant {
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
      merchant: 'Guess (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.header-big');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Guess';

      // Colour

      // Image
      let imageUrl = $('div[data-test=img-zoom-wrap]');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.productGradient');
      if (priceContainer && priceContainer.length > 0) {
        let retailPrice = priceContainer.find('.original');
        let currentPrice = priceContainer.find('.promo');
        let currentPrice2 = priceContainer.find('.regular');
  
        if (currentPrice && currentPrice.length > 0) {
          // On sale
          if (retailPrice && retailPrice.length > 0) {
            retailPrice = retailPrice.find('span.priceVal');
            if (retailPrice && retailPrice.length > 0) {
              result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            }
          }
          currentPrice = currentPrice.find('span.priceVal');
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.trim().split('CAD')[0].replace(/[^0-9\.]/g, ""));
          }
        } else if (currentPrice2 && currentPrice2.length > 0) {
          // On sale
          if (retailPrice && retailPrice.length > 0) {
            retailPrice = retailPrice.find('span.priceVal');
            if (retailPrice && retailPrice.length > 0) {
              result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            }
          }
          currentPrice2 = currentPrice2.find('span.priceVal');
          if (currentPrice2 && currentPrice2.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice2[0].innerText.trim().split('CAD')[0].replace(/[^0-9\.]/g, ""));
          }
        } else if (retailPrice && retailPrice.length > 0) {
          // Not on sale
          retailPrice = retailPrice.find('span.priceVal');
          if (retailPrice && retailPrice.length > 0) {
            result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = result['retailPrice'];
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
      merchant: 'Guess (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.name > a.pd-link');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Guess';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.prodImg > a > img.img-responsive');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.promo > .priceVal');
      let retailPrice = element.querySelector('.original > .priceVal');

      if (currentPrice) {
        // On sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.trim().split('CAD')[0].trim().replace(',', ''));
        if (retailPrice) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (retailPrice) {
        // Not on sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.pd-link');
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
