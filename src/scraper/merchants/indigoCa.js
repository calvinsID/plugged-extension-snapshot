import Merchant from './merchant.js';
import $ from 'jquery';

export default class IndigoCa extends Merchant {
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
      merchant: 'Indigo (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#product-section-details');
      if (productName && productName.length > 0) {
        productName = productName.find('.product-title');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('#product-section-details');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('.product-image > img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].currentSrc.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('#product-section-details');
      if (priceContainer && priceContainer.length > 0) {
        let price = priceContainer.find('.item-price__normal');
        let currentPrice = priceContainer.find('.item-price__price-amount');
        let retailPrice = priceContainer.find('.item-price__list-price');

        if (retailPrice && retailPrice.length > 0) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (price && price.length > 0) {
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
      merchant: 'Indigo (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-list__product-title-link--grid');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-list__product-image--grid');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.product-list__price--black.product-list__price--grid');
      let currentPrice = element.querySelector('.product-list__price--orange.product-list__price--grid');
      let retailPrice = element.querySelector('.product-list__price--strikeout.product-list__price--grid');

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
      let url = element.querySelector('a.product-list__product-link--grid');
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
