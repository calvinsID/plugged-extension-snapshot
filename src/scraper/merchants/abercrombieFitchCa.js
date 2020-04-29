import Merchant from './merchant.js';
import $ from 'jquery';

export default class AbercrombieFitchCa extends Merchant {
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
      merchant: 'Abercrombie & Fitch (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-title-main-header');
      if (productName && productName.length > 0) {
        result['productName'] = productName.text().trim();
      }

      // Brand Name
      result['brandName'] = 'Abercrombie & Fitch';

      // Colour

      // Image
      let imageUrl = $('.product-main-image');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src;
      }

      // Sizes
      let options = $('.product-sizes-primary');
      if (options && options.length > 0) {
        options = options.find('.tile-text');
        if (options && options.length > 0) {
          for (let i = 0; i < options.length; i++) {
            result['sizes'].push(options[i].innerText.trim());
          }
        }
      }

      // Prices
      let priceContainer = $('.product-price-v2__inner');
      if (priceContainer) {
        let price = priceContainer.find('.product-price-text[data-state=original]');
        let comparePrice = priceContainer.find('.product-price-text[data-state=discount]');
  
        if (comparePrice && comparePrice.length > 0) {
          // On sale
          if (price && price.length > 0) {
            result['retailPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          result['currentPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
        } else {
          // Not on sale
          price = priceContainer.find('.product-price-text')
          if (price && price.length > 0) {
            result['currentPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Abercrombie & Fitch (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-card__name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-card__image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.product-price-text');
      let retailPrice = element.querySelector('.product-price-text[data-state=original]');
      let currentPrice = element.querySelector('.product-price-text[data-state=discount]');

      if (retailPrice) {
        // On sale
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
      } else if (price) {
        result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.product-card__name');
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
