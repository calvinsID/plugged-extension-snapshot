import Merchant from './merchant.js';
import $ from 'jquery';

export default class Capsule extends Merchant {
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
      merchant: 'Capsule',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      let brandName = $('.product-vendor');
      if (brandName && brandName.length > 0) {
        result['brandName'] = brandName[0].innerText.trim();
      }

      // Colour

      // Image
      let imageUrl = $('.image-container');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes

      // Prices
      let currentPrice = $('s#ComparePrice-product-template');
      let retailPrice = $('span#ProductPrice-product-template');
      if (retailPrice && retailPrice.length > 0) {
        result['currentPrice'] = parseFloat(retailPrice[0].getAttribute('content').replace(/[^0-9\.]/g, ""));
        if (currentPrice && currentPrice.length > 0 ) {
          // On sale
          currentPrice = currentPrice.find('span.money');
          if (currentPrice && currentPrice.length > 0) {
            result['retailPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else {
          // Not on sale
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
      merchant: 'Capsule',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-information');
      if (productName) {
        productName = productName.querySelector('.title');
        if (productName) {
          result['productName'] = productName.textContent.trim();
        }
      }

      // Brand Name
      let brandName = element.querySelector('.product-information');
      if (brandName) {
        brandName = brandName.querySelector('.vendor');
        if (brandName) {
          result['brandName'] = brandName.textContent.trim();
        }
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.image-container');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img');
        if (imageUrlContainer) {
          result.imageUrl = imageUrlContainer.src.trim();
        }
      }

      // Sizes

      // Prices
      let price = element.querySelector('.product-price__price:not(.product-price__sale');
      let salePrice = element.querySelector('.product-price__sale');

      if (salePrice) {
        // On sale
        salePrice = salePrice.querySelector('.money');
        if (salePrice) {
          result['currentPrice'] = parseFloat(salePrice.innerText.replace(/[^0-9\.]/g, ""));
        }
        if (price) {
          price = price.querySelector('.money');
          if (price) {
            result['retailPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (price) {
        price = price.querySelector('.money');
        if (price) {
          result['currentPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
        }
      }

      // Url
      let url = element.querySelector('a.product-card');
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
