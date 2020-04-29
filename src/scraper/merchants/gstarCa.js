import Merchant from './merchant.js';
import $ from 'jquery';

export default class GstarCa extends Merchant {
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
      merchant: 'G-Star (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.productDetail-productTitle');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'G-Star';

      // Colour

      // Image
      let imageUrl = $('img.gridCarousel-image');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].currentSrc.trim();
      }

      // Sizes

      // Prices
      let priceContainer = $('.productPrice');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.productPrice-value.js-productPrice-value');
        let retailPrice = priceContainer.find('.productPrice-discount.js-productPrice-discount');
  
        if (retailPrice && retailPrice.length > 0) {
          // On sale
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'G-Star (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.productTile-name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'G-Star';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.productTile-image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('.productPrice--fromPrice');
      let currentPrice = element.querySelector('.productPrice-value');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice) {
        // Not on sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('i.productTile-quickShop');
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
