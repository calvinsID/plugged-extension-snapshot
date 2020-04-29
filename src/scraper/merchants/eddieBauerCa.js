import Merchant from './merchant.js';
import $ from 'jquery';

export default class EddieBauerCa extends Merchant {
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
      merchant: 'Eddie Bauer (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.image_magnifier');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let productSection = $('.price_and_reviews');
      if (productSection && productSection.length > 0) {
        let currentPrice = productSection.find('span.offer');
        let retailPrice = productSection.find('span.old_price');
  
        if (retailPrice && retailPrice.length > 0) {
          // On sale
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        } else {
          // Not on sale
          productSection = productSection.find('span');
          if (productSection && productSection.length > 0) {
            result['retailPrice'] = parseFloat(productSection[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Eddie Bauer (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img[role=presentation]');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let regularPrices = element.querySelector('.strike_price');
      let currentPrices = element.querySelector('.display_price');
      let prices = element.querySelector('.visually_hidden');

      if (regularPrices) {
        // On sale
        regularPrices = regularPrices.textContent.split('-');
        if (regularPrices && regularPrices.length > 0) {
          result['retailPrice'] = parseFloat(regularPrices[regularPrices.length - 1].replace(/[^0-9\.]/g, ""));
        }
        if (currentPrices) {
          currentPrices = currentPrices.textContent.split('-');
          if (currentPrices && currentPrices.length > 0) {
            result['currentPrice'] = parseFloat(currentPrices[0].replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (prices && prices.textContent.trim() === 'Regular Price' && prices.parentElement) {
        // Not on sale
        prices = prices.parentElement.textContent.split('-');
        if (prices && prices.length > 0) {
          result['retailPrice'] = parseFloat(prices[prices.length - 1].replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.querySelector('a.wrapper');
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
