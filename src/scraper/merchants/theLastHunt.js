import Merchant from './merchant.js';
import $ from 'jquery';

export default class TheLastHunt extends Merchant {
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
      merchant: 'The Last Hunt',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.h1.name');
      if (productName && productName.length > 0) {
        result['productName'] = productName.text().trim();
      }

      // Brand Name
      let brandName = $('.vendor');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('a');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName.text().trim();
        }
      }

      // Colour

      // Image
      let imageUrl = $('.product-main-image');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src;
      }

      // Sizes
      let options = $('.select_list');
      if (options && options.length > 0) {
        options = options.find('.sel_options');
        if (options && options.length > 0) {
          for (let i = 0; i < options.length; i++) {
            result['sizes'].push(options[i].getAttribute('data-size').trim());
          }
        }
      }

      // Prices
      let price = $('.current_price');
      let comparePrice = $('.was_price');

      if (comparePrice && comparePrice.length > 0) {
        // On sale
        if (price && price.length > 0) {
          result['currentPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
        }
        result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
      } else {
        // Not on sale
        if (price && price.length > 0) {
          result['currentPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'The Last Hunt',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.ss-product__info__anchor.ss-product__info__name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.ss-product__info__anchor.ss-product__info__manufacturer');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.ss-product__img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let oldPrice = element.querySelector('.ss-product__price.ss-product__price--old');
      let currentPrice = element.querySelector('.ss-product__price--special');
      let price = element.querySelector('.ss-product__price--original');

      if (oldPrice) {
        // On sale
        result['retailPrice'] = parseFloat(oldPrice.innerText.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.innerText.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.ss-product__img__anchor');
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
