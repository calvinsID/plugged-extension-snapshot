import Merchant from './merchant.js';
import $ from 'jquery';

export default class KateSpade extends Merchant {
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
      merchant: 'Kate Spade',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.product-name');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Kate Spade';

      // Colour

      // Image
      let imageUrl = $('.product-primary-image');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('#product-content');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.price-sales');
        let retailPrice = priceContainer.find('.price-standard');
  
        if (retailPrice && retailPrice.length > 0) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (currentPrice && currentPrice.length > 0) {
          // Not on sale
          result['retailPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Kate Spade',
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
      result['brandName'] = 'Kate Spade';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.first-img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.price-sales');
      let retailPrice = element.querySelector('.price-standard');

      if (retailPrice && retailPrice.textContent) {
        // On sale
        retailPrice = retailPrice.textContent.split('-');
        if (retailPrice && retailPrice.length > 0) {
          result['retailPrice'] = parseFloat(retailPrice[retailPrice.length - 1].replace(/[^0-9\.]/g, ""));
        }
        if (currentPrice && currentPrice.textContent) {
          currentPrice = currentPrice.textContent.split('-');
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (currentPrice && currentPrice.textContent) {
        // Not on sale
        currentPrice = currentPrice.textContent.split('-');
        if (currentPrice && currentPrice.length > 0) {
          result['currentPrice'] = parseFloat(currentPrice[currentPrice.length - 1].replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
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
