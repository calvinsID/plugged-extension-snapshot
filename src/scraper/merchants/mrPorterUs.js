import Merchant from './merchant.js';
import $ from 'jquery';
import { parse } from 'qs';

export default class MrPorterUs extends Merchant {
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
      merchant: 'Mr Porter (US)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('meta[itemprop=productID]');
      if (productName && productName.parent()) {
        let tileClass = productName.parent().attr('class').split(/\s+/);
        productName = $(`.${tileClass[0]} > meta[itemprop=name]`);
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].getAttribute('content').trim();
        }
      }

      // Brand Name
      let brandName = $('h1[itemprop=brand] > meta[itemprop=name]');
      if (brandName && brandName.length > 0) {
        result['brandName'] = brandName[0].getAttribute('content').trim();
      }

      // Colour

      // Image
      let imageUrl = $('img[itemprop=image]');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src;
      }

      // Sizes

      // Prices
      let price = $('[itemprop=offers]');
      if (price && price.length > 0) {
        let currentPrice = price.find('.PriceWithSchema9__discountContainer--sale');
        let retailPrice = price.find('.PriceWithSchema9__value--sale');
        let noSale = price.find('.PriceWithSchema9__value--details');

        if (currentPrice && currentPrice.length > 0) {
          // On sale
          currentPrice = currentPrice.find('s');
          if (currentPrice && currentPrice.length > 0) {
            result['retailPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          if (retailPrice && retailPrice.length > 0) {
            retailPrice = retailPrice.find('span[itemprop=price]');
            if (retailPrice && retailPrice.length > 0) {
              result['currentPrice'] = parseFloat(retailPrice[0].getAttribute('content').trim().replace(',', ''));
            }
          }
        } else if (noSale && noSale.length > 0) {
          // Not on sale
          noSale = noSale.find('span[itemprop=price]');
          if (noSale && noSale.length > 0) {
            result['currentPrice'] = parseFloat(noSale[0].getAttribute('content').trim().replace(',', ''));
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
      merchant: 'Mr Porter (US)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('[data-testid=pid-summary-description]');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('[data-testid=pid-summary-designer]');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img[itemprop=image]');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('[itemprop=offers]');
      if (priceButton) {
        let price = priceButton.querySelector('[itemprop=price]');
        if (price) {
          result['retailPrice'] = parseFloat(price.getAttribute('content').replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.parentElement.parentElement;
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
