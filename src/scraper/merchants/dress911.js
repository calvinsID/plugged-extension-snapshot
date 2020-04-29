import Merchant from './merchant.js';
import $ from 'jquery';

export default class Dress911 extends Merchant {
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
      merchant: 'Dress 911',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#productName');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('#productMainImage > img');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].currentSrc.trim();
      }

      // Sizes

      // Prices
      let priceContainer = $('#productPrices');
      if (priceContainer && priceContainer.length > 0) {
        let retailPrice = priceContainer.find('.normalprice');
        let currentPrice = priceContainer.find('.productSpecialPrice');

        if (currentPrice && currentPrice.length > 0 && currentPrice[0].textContent && currentPrice[0].textContent.toLowerCase().indexOf('us$') === -1) {
          // On sale
          result['currentPrice'] = parseFloat(currentPrice[0].textContent.replace(/[^0-9\.]/g, ""));
          if (retailPrice && retailPrice.length > 0) {
            result['retailPrice'] = parseFloat(retailPrice[0].textContent.replace(/[^0-9\.]/g, ""));
          }
        } else if (priceContainer && priceContainer.length > 0 && priceContainer[0].textContent && priceContainer[0].textContent.toLowerCase().indexOf('us$') === -1) {
          result['retailPrice'] = parseFloat(parseFloat(Math.floor(priceContainer[0].textContent.replace(/[^0-9\.]/g, "") * 100) / 100).toFixed(2));
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
      merchant: 'Dress 911',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.itemTitle');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.listingProductImage');
      if (imageUrlContainer) {
        result['imageUrl'] = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('.normalprice');
      let currentPrice = element.querySelector('.productSpecialPrice');
      let price = element.querySelector('.innerProduct');

      if (retailPrice && retailPrice.textContent && retailPrice.textContent.toLowerCase().indexOf('us$') === -1) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price && price.textContent && price.textContent.toLowerCase().indexOf('us$') === -1) {
        result['retailPrice'] = parseFloat(parseFloat(Math.floor(price.textContent.replace(/[^0-9\.]/g, "") * 100) / 100).toFixed(2));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('.innerProduct > a');
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
