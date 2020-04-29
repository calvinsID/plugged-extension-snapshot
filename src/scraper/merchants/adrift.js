import Merchant from './merchant.js';
import $ from 'jquery';

export default class Adrift extends Merchant {
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
      merchant: 'Adrift',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-info-section');
      if (productName && productName.length > 0) {
        productName = productName.find('h2[itemprop=name]');
        if (productName && productName.length > 0) {
          result['productName'] = productName.text();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('#productPhoto');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('#productPhotoImg');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes
      let options = $('#addToCartForm');
      if (options && options.length > 0) {
        options = options.find('.variant-option');
        if (options && options.length > 0) {
          for (let i = 0; i < options.length; i++) {
            result['sizes'].push(options[i].innerText.trim());
          }
        }
      }

      // Prices
      let price = $('#productPrice');
      let comparePrice = $('#comparePrice');

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
      merchant: 'Adrift',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-grid-title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.product-grid-vendor');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-grid-image');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img');
        if (imageUrlContainer) {
          result.imageUrl = imageUrlContainer.src.trim();
        }
      }

      // Sizes

      // Prices
      let price = element.querySelector('.product-grid-price');
      let salePrice = element.querySelector('.product-grid-price.on-sale');
      let comparePrice = element.querySelector('.compare-price');

      if (salePrice) {
        // On sale
        let priceArray = salePrice.textContent.split('$');
        if (priceArray && priceArray.length > 1) {
          result['currentPrice'] = parseFloat(priceArray[1].replace(/[^0-9\.]/g, ""));
        }
        if (comparePrice) {
          result['retailPrice'] = parseFloat(comparePrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.product-grid-image');
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
