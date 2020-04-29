import Merchant from './merchant.js';
import $ from 'jquery';

export default class Browns extends Merchant {
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
      merchant: 'Browns',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h2.product-name');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }
      if (!(result['productName'])) {
        productName = $('[itemprop=productID]');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.primary-image');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src;
      }

      // Sizes

      // Prices
      let priceContainer = $('#product-content');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('span.price-standard');
        let retailPrice = priceContainer.find('span.price-sales');
        if (retailPrice && retailPrice.length > 0) {
          // On sale
          result['currentPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0 ) {
            result['retailPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else {
          // Not on sale
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Browns',
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

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-image > a > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('.product-standard-price');
      let rangePrice = element.querySelector('.product-sales-price.sale-disc-price');
      let currentPrice = element.querySelector('.product-sales-price:not(.sale-disc-price)');

      if (retailPrice) {
        // On sale
        let priceString = retailPrice.textContent.replace(/[^0-9\.]/g, "").substring(0, retailPrice.textContent.replace(/[^0-9\.]/g, "").length - 2);
        priceString += '.';
        let cents = retailPrice.querySelectorAll('sup');
        if (cents && cents.length > 1) {
          priceString += cents[cents.length - 1].textContent.replace(/[^0-9\.]/g, "");
        }

        result['retailPrice'] = parseFloat(priceString);

        if (currentPrice) {
          priceString = currentPrice.textContent.replace(/[^0-9\.]/g, "").substring(0, currentPrice.textContent.replace(/[^0-9\.]/g, "").length - 2);
          priceString += '.';
          cents = currentPrice.querySelectorAll('sup');
          if (cents && cents.length > 1) {
            priceString += cents[cents.length - 1].textContent.replace(/[^0-9\.]/g, "");
          }

          result['currentPrice'] = parseFloat(priceString);
        }
      } else if (rangePrice) {
        // On sale - range
        let priceString = rangePrice.textContent.replace(/[^0-9\.]/g, "").substring(0, rangePrice.textContent.replace(/[^0-9\.]/g, "").length - 2);
        priceString += '.';
        let cents = rangePrice.querySelectorAll('sup');
        if (cents && cents.length > 1) {
          priceString += cents[cents.length - 1].textContent.replace(/[^0-9\.]/g, "");
        }

        result['currentPrice'] = parseFloat(priceString);

        if (currentPrice) {
          priceString = currentPrice.textContent.replace(/[^0-9\.]/g, "").substring(0, currentPrice.textContent.replace(/[^0-9\.]/g, "").length - 2);
          priceString += '.';
          cents = currentPrice.querySelectorAll('sup');
          if (cents && cents.length > 1) {
            priceString += cents[cents.length - 1].textContent.replace(/[^0-9\.]/g, "");
          }

          result['retailPrice'] = parseFloat(priceString);
        }
      } else if (currentPrice) {
        // Not on sale
        let priceString = currentPrice.textContent.replace(/[^0-9\.]/g, "").substring(0, currentPrice.textContent.replace(/[^0-9\.]/g, "").length - 2);
        priceString += '.';
        let cents = currentPrice.querySelectorAll('sup');
        if (cents && cents.length > 1) {
          priceString += cents[cents.length - 1].textContent.replace(/[^0-9\.]/g, "");
        }

        result['currentPrice'] = parseFloat(priceString);
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
