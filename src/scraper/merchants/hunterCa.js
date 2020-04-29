import Merchant from './merchant.js';
import $ from 'jquery';

export default class HunterCa extends Merchant {
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
      merchant: 'Hunter (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-page__product-name');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Hunter';

      // Colour

      // Image
      let imageUrl = $('img.picture-image');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].currentSrc.trim();
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-page__product-price');
      if (priceContainer && priceContainer.length > 0) {
        let noSale = priceContainer.find('.product-price__normal');
        let currentPrice = priceContainer.find('ins');
        let retailPrice = priceContainer.find('del');
  
        if (noSale && noSale.length > 0) {
          // Not on sale
          result['retailPrice'] = parseFloat(noSale[0].innerText.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        } else if (retailPrice && retailPrice.length > 0) {
          // On sale
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Hunter (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product__name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Hunter';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.product__image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.currentSrc.trim();
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('.product__price');
      if (priceButton) {
        let price = priceButton.querySelector('.product-price__normal');
        let comparePrice = priceButton.querySelector('ins');
        let regularPrice = priceButton.querySelector('del');

        if (comparePrice) {
          // On sale
          result['currentPrice'] = parseFloat(comparePrice.textContent.replace(/[^0-9\.]/g, ""));
          if (regularPrice) {
            result['retailPrice'] = parseFloat(regularPrice.textContent.replace(/[^0-9\.]/g, ""));
          }
        } else if (price) {
          result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.querySelector('a.product__link');
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
