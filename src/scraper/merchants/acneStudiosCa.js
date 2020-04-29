import Merchant from './merchant.js';
import $ from 'jquery';

export default class AcneStudiosCa extends Merchant {
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
      merchant: 'Acne Studios (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.products-title');
      if (productName && productName.length > 0) {
        result['productName'] = productName.text().trim();
      }

      // Brand Name
      result['brandName'] = 'Acne Studios';

      // Colour

      // Image
      let imageUrl = $('.product-item__gallery-container');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.product-item__gallery-image.lazyloaded');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].currentSrc;
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-info-wrapper');
      if (priceContainer && priceContainer.length > 0) {
        let price = priceContainer.find('.price-sales');
        let comparePrice = priceContainer.find('.price-standard');
  
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
      merchant: 'Acne Studios (CA)',
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
      result['brandName'] = 'Acne Studios';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-image > a > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('.grid-product__price-wrap');
      if (priceButton) {
        let comparePrice = priceButton.querySelector('#ComparePrice');
        let regularPrice = priceButton.querySelector('span:not(#ComparePrice) > span.money');

        if (comparePrice) {
          // On sale
          comparePrice = comparePrice.querySelector('span.money');
          if (comparePrice) {
            result['retailPrice'] = parseFloat(comparePrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
          }
          result['currentPrice'] = parseFloat(regularPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        } else {
          // Not on sale
          result['retailPrice'] = parseFloat(regularPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
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
