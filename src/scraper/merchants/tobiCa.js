import Merchant from './merchant.js';
import $ from 'jquery';

export default class TobiCa extends Merchant {
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
      merchant: 'Tobi (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#product-detail-title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.product-detail-image-link-main');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].href;
      }

      // Sizes

      // Prices
      let priceContainer = $('.grid-detail-info');
      if (priceContainer && priceContainer.length > 0) {
        let retailPrice = priceContainer.find('.original-price');
        let currentPrice = priceContainer.find('.sale-price');
        let price = priceContainer.find('.retail-price');

        if (currentPrice && currentPrice.length > 0) {
          // On sale
          result['currentPrice'] = parseFloat(currentPrice[0].textContent.replace(/[^0-9\.]/g, ""));
          if (retailPrice && retailPrice.length > 0) {
            result['retailPrice'] = parseFloat(retailPrice[0].textContent.replace(/[^0-9\.]/g, ""));
          }
        } else if (price && price.length > 0) {
          result['retailPrice'] = parseFloat(price[0].textContent.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Tobi (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.color-name-switcher.active');
      if (productName) {
        productName = productName.querySelector('.item-color-name');
        if (productName) {
          result['productName'] = productName.textContent.trim();
        }
      } else {
        productName = element.querySelector('.item-color-name');
        if (productName) {
          result['productName'] = productName.textContent.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-image-container.main-color');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img.product-list-item-image');
        if (imageUrlContainer) {
          result['imageUrl'] = imageUrlContainer.src.trim();
        }
      } else {
        imageUrlContainer = element.querySelector('img.product-list-item-image');
        if (imageUrlContainer) {
          result['imageUrl'] = imageUrlContainer.src.trim();
        }
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('.original-price');
      let currentPrice = element.querySelector('.sale-price');
      let price = element.querySelector('.retail-price');

      if (retailPrice && retailPrice.textContent) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price && price.textContent) {
        result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.product-list-item-link');
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
