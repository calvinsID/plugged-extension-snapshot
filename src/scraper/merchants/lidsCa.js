import Merchant from './merchant.js';
import $ from 'jquery';

export default class LidsCa extends Merchant {
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
      merchant: "Lids (CA)",
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1[data-talos=labelPdpProductTitle]');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('img.carousel-image.current-image');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src.trim();
      }

      // Sizes

      // Prices
      let priceContainer = $('span[data-talos=pdpProductPrice]');
      if (priceContainer && priceContainer.length > 0) {
        let salePrice = priceContainer.find('.sale-price');
        let potentialPrice = priceContainer.find('.potential-discount-price');
        let regularPrice = priceContainer.find('.regular-price');

        if (salePrice && salePrice.length > 0) {
          // On sale
          result['currentPrice'] = parseFloat(salePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (regularPrice && regularPrice.length > 0) {
            result['retailPrice'] = parseFloat(regularPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (potentialPrice && potentialPrice.length > 0 && potentialPrice[0].innerText.indexOf('with code') !== -1) {
          // Code sale
          potentialPrice = potentialPrice[0].innerText.split('with code');
          if (potentialPrice && potentialPrice.length > 0) {
            result['currentPrice'] = parseFloat(potentialPrice[0].replace(/[^0-9\.]/g, ""));
          }
          if (regularPrice && regularPrice.length > 0) {
            result['retailPrice'] = parseFloat(regularPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (regularPrice && regularPrice.length > 0) {
          // Not on sale
          result['retailPrice'] = parseFloat(regularPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Lids (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-card-title > a');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.product-image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('[data-talos=srpProductPrice]');
      if (priceButton) {
        let retailPrice = priceButton.querySelector('.regular-price');
        let currentPrice = priceButton.querySelector('.sale-price');
        let potentialPrice = priceButton.querySelector('.potential-discount-price');

        if (currentPrice) {
          // On sale
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
          if (retailPrice) {
            result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
          }
        } else if (potentialPrice && potentialPrice.textContent.indexOf('with code') !== -1) {
          // Code sale
          potentialPrice = potentialPrice.textContent.split('with code');
          if (potentialPrice && potentialPrice.length > 0) {
            result['currentPrice'] = parseFloat(potentialPrice[0].replace(/[^0-9\.]/g, ""));
          }
          if (retailPrice) {
            result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
          }
        } else if (retailPrice) {
          // Not on sale
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.querySelector('.product-card-title > a');
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
