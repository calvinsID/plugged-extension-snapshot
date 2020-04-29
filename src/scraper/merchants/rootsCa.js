import Merchant from './merchant.js';
import $ from 'jquery';

export default class RootsCa extends Merchant {
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
      merchant: 'Roots (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-wrapper');
      if (productName && productName.length > 0) {
        productName = productName.find('h1[itemprop=name]');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      result['brandName'] = 'Roots';

      // Colour

      // Image
      let imageUrl = $('.product-image.main-image.image-zoom');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-wrapper');
      if (priceContainer && priceContainer.length > 0) {
        priceContainer = priceContainer.find('.product-price');
        if (priceContainer && priceContainer.length > 0) {
          let currentPrice = priceContainer.find('.price-sales');
          let comparePrice = priceContainer.find('.price-standard');
          let noSale = priceContainer.find('.price-regular');
  
          if (comparePrice && comparePrice.length > 0 && comparePrice[0].innerText) {
            // On sale
            result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
            if (currentPrice && currentPrice.length > 0) {
              result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            }
          } else if (noSale && noSale.length > 0) {
            // Not on sale
            result['currentPrice'] = parseFloat(noSale[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Roots (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('a.name-link');
      if (productName) {
        result['productName'] = productName.getAttribute('title').trim();
      }

      // Brand Name
      result['brandName'] = 'Roots';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('a.thumb-link  > picture > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.product-pricing > .product-price > .total-price > .price-regular');
      let currentPrice = element.querySelector('.product-pricing > .product-discounted-price > .product-sales-price');
      let retailPrice = element.querySelector('.product-pricing > .product-discounted-price > .product-standard-price');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.thumb-link');
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
