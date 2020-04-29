import Merchant from './merchant.js';
import $ from 'jquery';

export default class Dutil extends Merchant {
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
      merchant: 'Dutil',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-details');
      if (productName && productName.length > 0) {
        productName = productName.find('h1.title');
        if (productName && productName.length > 0) {
          result['productName'] = productName.text().trim();
        }
      }

      // Brand Name
      let brandName = $('.product-details');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('.brand');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName.text().trim();
        }
      }

      // Colour

      // Image
      let imageUrl = $('.product-main-image');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes
      let options = $('.product-details');
      if (options && options.length > 0) {
        options = options.find('.option-values');
        if (options && options.length > 0) {
          options = options.find('.option-value');
          if (options && options.length > 0) {
            for (let i = 0; i < options.length; i++) {
              result['sizes'].push(options[i].innerText.trim());
            }
          }
        }
      }

      // Prices
      let price = $('.product-details');
      if (price && price.length > 0) {
        price = price.find('.price');
        if (price && price.length > 0) {
          let comparePrice = price.find('.original.money').not('.hidden');
          let currentPrice = price.find('.money');
          if (currentPrice && currentPrice.length > 1) {
            result['currentPrice'] = parseFloat(currentPrice[1].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
            if (comparePrice && comparePrice.length > 0) {
              // On sale
              result['retailPrice'] = parseFloat(comparePrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
            } else {
              // Not on sale
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
      merchant: 'Dutil',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.title');
      if (productName) {
        productName = productName.querySelector('a');
        if (productName) {
          result['productName'] = productName.textContent.trim();
        }
      }

      // Brand Name
      let brandName = element.querySelector('.brand');
      if (brandName) {
        brandName = brandName.querySelector('a');
        if (brandName) {
          result['brandName'] = brandName.textContent.trim();
        }
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-card-figure');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img');
        if (imageUrlContainer) {
          result.imageUrl = imageUrlContainer.src.trim();
        }
      }

      // Sizes

      // Prices
      let originalPrice = element.querySelector('.original.money');
      let price = element.querySelector('.money:not(.original)');

      if (originalPrice && originalPrice.getAttribute('data-currency-cad')) {
        // On sale
        result['retailPrice'] = originalPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, "");
        if (price && price.getAttribute('data-currency-cad')) {
          result['currentPrice'] = price.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, "");
        }
      } else if (price && price.getAttribute('data-currency-cad')) {
        result['currentPrice'] = price.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, "");
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.product-card-overlay');
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
