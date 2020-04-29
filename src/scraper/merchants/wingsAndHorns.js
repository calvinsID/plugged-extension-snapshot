import Merchant from './merchant.js';
import $ from 'jquery';

export default class WingsAndHorns extends Merchant {
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
      merchant: 'Wings + Horns',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#product-title');
      if (productName && productName.length > 0 && productName[0].childNodes && productName[0].childNodes.length > 0) {
        result['productName'] = productName[0].childNodes[0].textContent;
      }

      // Brand Name
      result['brandName'] = 'Wings + Horns'

      // Colour

      // Image
      let imageUrl = $('#product-gallery');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 1) {
          result['imageUrl'] = imageUrl[1].src;
        } else if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes
      let options = $('.options');
      if (options && options.length > 0) {
        options = options.find('.product-size');
        for (let i = 0; i < options.length; i++) {
          result['sizes'].push(options[i].textContent.trim());
        }
      }

      // Prices
      let comparePrice = $('h3.price');

      if (comparePrice && comparePrice.length > 0) {
        if (comparePrice[0].childNodes && comparePrice[0].childNodes.length >= 2) {
          if (comparePrice[0].childNodes[0].nodeValue && comparePrice[0].childNodes[0].nodeValue.trim()) {
            if (comparePrice[0].childNodes[1].innerText && comparePrice[0].childNodes[1].innerText.trim()) {
              // On sale
              result['retailPrice'] = parseFloat(comparePrice[0].childNodes[1].innerText.trim().substring(1, comparePrice[0].childNodes[1].innerText.trim().length - 4));
              result['currentPrice'] = parseFloat(comparePrice[0].childNodes[0].nodeValue.trim().substring(1, comparePrice[0].childNodes[0].nodeValue.trim().length - 4));
            } else {
              // Not on sale
              result['currentPrice'] = parseFloat(comparePrice[0].childNodes[0].nodeValue.trim().substring(1, comparePrice[0].childNodes[0].nodeValue.trim().length - 4));
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
      merchant: 'Wings + Horns',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.quick--add__wrapper > div > .title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Wings + Horns';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.thumbnail > a > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.price > .compare');
      let retailPrice = element.querySelector('.price');

      if (currentPrice) {
        // On sale
        result['retailPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (retailPrice) {
          retailPrice = retailPrice.textContent.split('$');
          if (retailPrice && retailPrice.length > 2) {
            result['currentPrice'] = parseFloat(retailPrice[2].replace(/[^0-9\.]/g, ""));
          } else if (retailPrice && retailPrice.length > 1) {
            result['currentPrice'] = parseFloat(retailPrice[1].replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (retailPrice) {
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('.thumbnail > a');
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
