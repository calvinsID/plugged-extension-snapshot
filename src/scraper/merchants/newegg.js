import Merchant from './merchant.js';
import $ from 'jquery';

export default class Newegg extends Merchant {
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
      merchant: 'Newegg',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#bodyArea');
      if (productName && productName.length > 0) {
        productName = productName.find('#grpDescrip_h');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('a[name=gallery]');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes

      // Prices
      let container = $('.price-main-product');
      if (container && container.length > 0) {
        let retailPrice = container.find('.price-was');
        let currentPrice = container.find('.price-current');
  
        if (retailPrice && retailPrice.length > 0 && retailPrice[0].textContent && retailPrice[0].textContent.trim()) {
          // On sale
          retailPrice = retailPrice[0].textContent.split('–');
          if (retailPrice && retailPrice.length > 0) {
            result['retailPrice'] = parseFloat(retailPrice[0].replace(/[^0-9\.]/g, ""));
          }
          if (currentPrice && currentPrice.length > 0) {
            currentPrice = currentPrice[0].textContent.split('–');
            if (currentPrice && currentPrice.length > 0) {
              result['currentPrice'] = parseFloat(currentPrice[0].replace(/[^0-9\.]/g, ""));
            }
          }
        } else if (currentPrice && currentPrice.length > 0) {
          // Not on sale
          currentPrice = currentPrice[0].textContent.split('–');
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].replace(/[^0-9\.]/g, ""));
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
      merchant: 'Newegg',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.item-title');
      if (productName) {
        result['productName'] = productName.innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.item-img > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.price-current');
      let retailPrice = element.querySelector('.price-was');

      if (retailPrice && retailPrice.innerText && retailPrice.innerText.trim()) {
        // On sale
        retailPrice = retailPrice.innerText.split('–');
        if (retailPrice && retailPrice.length > 0) {
          result['retailPrice'] = parseFloat(parseFloat(retailPrice[0].replace(/[^0-9\.]/g, "")).toFixed(2));
        }
        if (currentPrice && currentPrice.innerText) {
          currentPrice = currentPrice.innerText.split('–');
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(parseFloat(currentPrice[0].replace(/[^0-9\.]/g, "")).toFixed(2));
          }
        }
      } else if (currentPrice && currentPrice.innerText && currentPrice.innerText.trim()) {
        // Not on sale
        currentPrice = currentPrice.innerText.split('–');
        if (currentPrice && currentPrice.length > 0) {
          result['currentPrice'] = parseFloat(parseFloat(currentPrice[0].replace(/[^0-9\.]/g, "")).toFixed(2));
          result['retailPrice'] = result['currentPrice'];
        }
      }

      // Url
      let url = element.querySelector('.prodlist-title > a');
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
