import Merchant from './merchant.js';
import $ from 'jquery';

export default class ZaraUs extends Merchant {
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
      merchant: 'Zara (US)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-name');
      if (productName && productName.length > 0 && productName[0].childNodes && productName[0].childNodes.length > 0) {
        result['productName'] = productName[0].childNodes[0].textContent;
      }

      // Brand Name
      result['brandName'] = 'Zara'

      // Colour

      // Image
      let imageUrl = $('.main-image');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          if ((imageUrl[0].src || "").substring(0, 5) === 'https') {
            result['imageUrl'] = imageUrl[0].src;
          }
        }
      }

      // Sizes
      let options = $('.info-section');
      if (options && options.length > 0) {
        options = options.find('.size-list');
        if (options && options.length > 0) {
          options = options.find('.product-size');
          if (options && options.length > 0) {
            for (let i = 0; i < options.length; i++) {
              result['sizes'].push(options[i].getAttribute('data-name').trim());
            }
          }
        }
      }

      // Prices
      let priceWrapper = $('.product-info-section');
      if (priceWrapper && priceWrapper.length > 0) {
        let price = priceWrapper.find('.sale');
        let comparePrice = priceWrapper.find('.line-through');
        let mainPrice = priceWrapper.find('.main-price');

        if (price && price.length > 0) {
          // On sale
          if (comparePrice && comparePrice.length > 0) {
            result['retailPrice'] = parseFloat(comparePrice[0].innerText.trim().substring(0, comparePrice[0].innerText.trim().length - 4).replace(',', ''));
          }
          result['currentPrice'] = parseFloat(price[0].innerText.trim().substring(0, price[0].innerText.trim().length - 4).replace(',', ''));
        } else if (mainPrice && mainPrice.length > 0) {
          // Not on sale
          result['retailPrice'] = parseFloat(mainPrice[0].innerText.trim().substring(0, mainPrice[0].innerText.trim().length - 4).replace(',', ''));
          result['currentPrice'] = result['retailPrice'];
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
      merchant: 'Zara (US)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-info-item.product-info-item-name');
      if (productName) {
        productName = productName.querySelector('a.name');
        if (productName) {
          result['productName'] = productName.textContent.trim();
        }
      }

      // Brand Name
      result['brandName'] = 'Zara';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.product-media');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('.price._product-price');
      if (priceButton) {
        let mainPrice = priceButton.querySelector('.main-price');
        let currentPrice = priceButton.querySelector('.sale');
        let price = priceButton.querySelector('.line-through');

        if (currentPrice) {
          // On sale
          result['currentPrice'] = parseFloat(currentPrice.innerText.replace(/[^0-9\.]/g, ""));
          if (price) {
            result['retailPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (mainPrice) {
          // Not on sale
          result['retailPrice'] = parseFloat(mainPrice.innerText.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.querySelector('.product-info-item.product-info-item-name > a.name._item');
      if (url) {
        result['url'] = url.href;
        if (url.getAttribute('data-extraquery') && result['url'].indexOf('?') === -1) {
          result['url'] += `?${url.getAttribute('data-extraquery')}`;
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
    return result;
  }
}
