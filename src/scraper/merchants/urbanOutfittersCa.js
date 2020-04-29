import Merchant from './merchant.js';
import $ from 'jquery';

export default class UrbanOutfittersCa extends Merchant {
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
      merchant: 'Urban Outfitters (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.c-pwa-product-meta-heading');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('img.c-pwa-image-viewer__img');
      if (imageUrl && imageUrl.length > 1) {
        result['imageUrl'] = imageUrl[1].src;
      } else if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src;
      }

      // Sizes

      // Prices
      let priceContainer = $('.c-pwa-product-price');
      if (priceContainer && priceContainer.length > 0) {
        let price = priceContainer.find('.c-pwa-product-price__original');
        let currentPrice = priceContainer.find('.c-pwa-product-price__current');
  
        if (price && price.length > 0) {
          // On sale
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          if (price[0].innerText.indexOf('–') !== -1 && price[0].innerText.split('–').length > 1) {
            price = price[0].innerText.split('–')[1];
            result['retailPrice'] = parseFloat(price.replace(/[^0-9\.]/g, ""));
          } else {
            result['retailPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (currentPrice && currentPrice.length > 0) {
          // Not on sale
          if (currentPrice[0].innerText.indexOf('–') !== -1 && currentPrice[0].innerText.split('–').length > 1) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.split('–')[0].replace(/[^0-9\.]/g, ""));
            result['retailPrice'] = parseFloat(currentPrice[0].innerText.split('–')[1].replace(/[^0-9\.]/g, ""));
          } else {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Urban Outfitters (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.c-pwa-product-tile__heading');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.c-pwa-product-tile__image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.c-pwa-product-price__original');
      let currentPrice = element.querySelector('.c-pwa-product-price__current');

      if (price) {
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.innerText.replace(/[^0-9\.]/g, ""));
        }
        if (price.innerText.indexOf('–') !== -1 && price.innerText.split('–').length > 1) {
          price = price.innerText.split('–')[1];
          result['retailPrice'] = parseFloat(price.replace(/[^0-9\.]/g, ""));
        } else {
          result['retailPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice) {
        if (currentPrice.innerText.indexOf('–') !== -1 && currentPrice.innerText.split('–').length > 1) {
          result['currentPrice'] = parseFloat(currentPrice.innerText.split('–')[0].replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = parseFloat(currentPrice.innerText.split('–')[1].replace(/[^0-9\.]/g, ""));
        } else {
          result['currentPrice'] = parseFloat(currentPrice.innerText.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
        }
      }

      // Url
      let url = element.querySelector('a.c-pwa-product-tile__link');
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
