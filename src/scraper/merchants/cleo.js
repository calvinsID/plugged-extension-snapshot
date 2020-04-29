import Merchant from './merchant.js';
import $ from 'jquery';

export default class Cleo extends Merchant {
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
      merchant: 'Cleo',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-detail > .product-name');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.product-primary-image');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.primary-image');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('#product-content');
      if (priceContainer && priceContainer.length > 0) {
        let retailPrice = priceContainer.find('.price-standard');
        let currentPrice = priceContainer.find('.price-sales');
        let price = priceContainer.find('.price-regular');
        if (retailPrice && retailPrice.length > 0 && retailPrice[0].textContent) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (currentPrice && currentPrice.length > 0 && currentPrice[0].textContent) {
          // Not on sale
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
        } else if (price && price.length > 0 && price[0].textContent) {
          // Not on sale
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
      merchant: 'Cleo',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('a.name-link');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.primary-thumb');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      } else {
        imageUrlContainer = element.querySelector('.thumb-link');
        if (imageUrlContainer) {
          imageUrlContainer = imageUrlContainer.querySelector('img');
          if (imageUrlContainer) {
            result.imageUrl = imageUrlContainer.src.trim();
          }
        }
      }

      // Sizes

      // Prices
      let price = element.querySelector('.price-standard');
      let salePrice = element.querySelector('.price-sales');

      if (salePrice) {
        // On sale
        result['currentPrice'] = parseFloat(salePrice.innerText.replace(/[^0-9\.]/g, ""));
        if (price) {
          result['retailPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['currentPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
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
