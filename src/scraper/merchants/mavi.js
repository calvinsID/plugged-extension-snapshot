import Merchant from './merchant.js';
import $ from 'jquery';

export default class MarsClothing extends Merchant {
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
      merchant: "Mavi",
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.template-product__title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Mavi';

      // Colour

      // Image
      let imageUrl = $('.product-gallery');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.product-gallery__image.flickity-lazyloaded');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-table__value.product-form__price');
      if (priceContainer && priceContainer.length > 0) {
        let comparePrice = priceContainer.find('#ComparePrice-product-template');
        let currentPrice = priceContainer.find('#ProductPrice-product-template');
        if (comparePrice && comparePrice.length > 0 && comparePrice[0].innerText) {
          // On sale
          result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          } else {
            result['currentPrice'] = result['retailPrice'];
          }
        } else if (currentPrice && currentPrice.length > 0) {
          // Not on sale
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
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
}
