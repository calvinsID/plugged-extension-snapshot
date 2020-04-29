import Merchant from './merchant.js';
import $ from 'jquery';

export default class Sportchek extends Merchant {
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
      merchant: 'Sportchek',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.global-page-header__title');
      if (productName && productName.length > 0) {
        result['productName'] = productName.text();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.product-detail__mobile-gallery-item');
      if (imageUrl && imageUrl.length > 0) {
        // Mobile view
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }
      if (!result['imageUrl'] || result['imageUrl'].trim() === "") {
        // Desktop view
        imageUrl = $('img.product-detail__product-img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes
      let options = $('.option-tiles__items');
      if (options && options.length > 0) {
        options = options.find('a');
        if (options && options.length > 0) {
          for (let i = 0; i < options.length; i++) {
            result['sizes'].push(options[i].title.trim());
          }
        }
      }

      // Prices
      let price = $('.product-detail__price-text');
      let comparePrice = $('.product-detail__price-original');

      if (comparePrice && comparePrice.length > 0) {
        // On sale
        if (price && price.length > 0) {
          result['currentPrice'] = parseFloat(price[0].innerText.trim().substring(1).replace(',', ''));
        }
        result['retailPrice'] = parseFloat(comparePrice[0].innerText.trim().substring(5).replace(',', ''));
      } else {
        // Not on sale
        if (price && price.length > 0) {
          result['currentPrice'] = parseFloat(price[0].innerText.trim().substring(1).replace(',', ''));
          result['retailPrice'] = result['currentPrice'];
        }
      }
      if (!result['currentPrice'] || !result['retailPrice']) {
        price = $('.product-detail__now-price-text');
        comparePrice = $('.product-detail__was-price-text');
        if (comparePrice && comparePrice.length > 0) {
          result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (price && price.length > 0) {
            result['currentPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Sportchek',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-title-text');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-grid-image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let salePrice = element.querySelector('.product-sale-price');
      let price = element.querySelector('.product-price-text');

      if (salePrice) {
        // On sale
        result['currentPrice'] = parseFloat(salePrice.innerText.replace(/[^0-9\.]/g, ""));
        if (price) {
          result['retailPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      if (!result['currentPrice'] || !result['retailPrice']) {
        salePrice = element.querySelector('.product-price__now-price-text');
        price = element.querySelector('.product-price__was-price-text');
        if (price) {
          result['retailPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
          if (salePrice) {
            result['currentPrice'] = parseFloat(salePrice.innerText.replace(/[^0-9\.]/g, ""));
          }
        }
      }

      // Url
      let url = element.querySelector('.product-grid__link');
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
