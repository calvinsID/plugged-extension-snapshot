import Merchant from './merchant.js';
import $ from 'jquery';

export default class ClubMonacoCa extends Merchant {
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
      merchant: 'Club Monaco (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.product-name');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.popup-img');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src;
      }

      // Sizes

      // Prices
      let priceContainer = $('#product-content');
      if (priceContainer && priceContainer.length > 0) {
        priceContainer = priceContainer.find('.product-price');
        if (priceContainer && priceContainer.length > 0) {
          priceContainer = priceContainer.find('span');
          if (priceContainer && priceContainer.length > 1) {
            // On sale
            result['retailPrice'] = parseFloat(priceContainer[0].innerText.replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = parseFloat(priceContainer[1].innerText.replace(/[^0-9\.]/g, ""));
          } else if (priceContainer && priceContainer.length > 0) {
            // Not on sale
            result['retailPrice'] = parseFloat(priceContainer[0].innerText.replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = result['retailPrice'];
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
      merchant: 'Club Monaco (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-name');
      if (productName) {
        productName = productName.querySelector('a.name-link');
        if (productName) {
          result['productName'] = productName.textContent.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.rlc-picture');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img');
        if (imageUrlContainer) {
          result.imageUrl = imageUrlContainer.src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = element.querySelector('.product-sales-price');
      if (priceContainer) {
        let price = priceContainer.querySelector('.lowcblack');
        let currentPrice = priceContainer.querySelector('.lowred');
        if (currentPrice) {
          // On sale
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
          let priceArray = priceContainer.textContent.split('$');
          if (priceArray.length > 1) {
            result['retailPrice'] = parseFloat(priceArray[1].replace(/[^0-9\.]/g, ""));
          }
        } else if (price) {
          // Not on sale
          result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
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
