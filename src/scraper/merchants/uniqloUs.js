import Merchant from './merchant.js';
import $ from 'jquery';

export default class UniqloUs extends Merchant {
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
      merchant: 'Uniqlo (US)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-name');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Uniqlo'

      // Colour

      // Image
      let imageUrl = $('.product-image.main-image');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].getAttribute('href');
      }

      // Sizes
      let sizes = $('ul.size');
      if (sizes && sizes.length > 0) {
        sizes = sizes.find('a.size');
        for (let i = 0; i < sizes.length; i++) {
          result['sizes'].push(sizes[i].getAttribute('title').trim());
        }
      }

      // Prices
      let retailPrice = $('.price-standard.pdp-space-price');
      let currentPrice = $('.price-sales.pdp-space-price')
      if (currentPrice && currentPrice.length > 0) {
        if (retailPrice && retailPrice.length > 0 && parseFloat(retailPrice[0].innerText.trim().replace(',', ''))) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.trim().replace(',', ''));
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.trim().replace(',', ''));
        } else {
          // Not on sale
          result['retailPrice'] = parseFloat(currentPrice[0].innerText.trim().replace(',', ''));
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
}
