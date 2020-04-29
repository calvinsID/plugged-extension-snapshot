import Merchant from './merchant.js';
import $ from 'jquery';

export default class LaCanadienne extends Merchant {
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
      merchant: 'La Canadienne',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-name-desc');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('img.inner-thumb');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src.trim();
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-info-wrapper');
      if (priceContainer && priceContainer.length > 0) {
        let retailPrice = priceContainer.find('[data-price-type=oldPrice] > .price');
        let currentPrice = priceContainer.find('[data-price-type=finalPrice] > .price');

        if (retailPrice && retailPrice.length > 0 && retailPrice[0].textContent) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice[0].textContent.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].textContent.replace(/[^0-9\.]/g, ""));
          }
        } else if (currentPrice && currentPrice.length > 0 && currentPrice[0].textContent) {
          result['retailPrice'] = parseFloat(currentPrice[0].textContent.replace(/[^0-9\.]/g, ""));
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
      merchant: 'La Canadienne',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-name-desc');
      if (productName) {
        result['productName'] = productName.textContent;
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.product-image-photo');
      if (imageUrlContainer) {
        result['imageUrl'] = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('[data-price-type=oldPrice] > .price');
      let currentPrice = element.querySelector('[data-price-type=finalPrice] > .price');

      if (retailPrice && retailPrice.textContent) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice && currentPrice.textContent) {
        result['retailPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.product-item-link');
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
