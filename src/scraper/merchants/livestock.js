import Merchant from './merchant.js';
import $ from 'jquery';

export default class Livestock extends Merchant {
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
      merchant: 'Livestock',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.product-single__title');

      if (productName && productName.length > 0) {
        result['productName'] = productName.text();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('img.mainimage');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src;
      } else {
        imageUrl = $('div.product-single__photo-wrapper.slick-slide.slick-active');
        if (imageUrl) {
          imageUrl = imageUrl.find('img');
          if (imageUrl) {
            result['imageUrl'] = imageUrl[0].src;
          }
        }
      }

      // Sizes
      let options = $('fieldset.single-option-radio');
      if (options && options.length > 0) {
        options = options.find('input');
        if (options && options.length > 0) {
          for (let i = 0; i < options.length; i++) {
            result['sizes'].push(options[i].innerHTML.trim());
          }
        }
      }

      // Prices
      let price = $('div.currency-price');

      if (price && price.length > 0) {
        let comparePrice = price.find('span#ComparePrice');
        let productPrice = price.find('span#ProductPrice');
        if (comparePrice && comparePrice.length > 0) {
          // On sale
          comparePrice = comparePrice.find('span.money');
          if (comparePrice && comparePrice.length > 0) {
            result['retailPrice'] = parseFloat(comparePrice[0].innerHTML.replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = parseFloat(productPrice[0].getAttribute('content').replace(',', ''));
          }
        } else {
          // Not on sale
          result['retailPrice'] = parseFloat(productPrice[0].getAttribute('content').replace(',', ''));
          result['currentPrice'] = parseFloat(productPrice[0].getAttribute('content').replace(',', ''));
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
      merchant: 'Livestock',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.grid-product__title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product--image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('.grid-product__price-wrap');
      if (priceButton) {
        let comparePrice = priceButton.querySelector('#ComparePrice');
        let regularPrice = priceButton.querySelector('span:not(#ComparePrice) > span.money');

        if (comparePrice) {
          // On sale
          comparePrice = comparePrice.querySelector('span.money');
          if (comparePrice) {
            result['retailPrice'] = parseFloat(comparePrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
          }
          result['currentPrice'] = parseFloat(regularPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        } else {
          // Not on sale
          result['retailPrice'] = parseFloat(regularPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.querySelector('.grid-product__image-link');
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
