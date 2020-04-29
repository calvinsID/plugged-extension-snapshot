import Merchant from './merchant.js';
import $ from 'jquery';

export default class HmCa extends Merchant {
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
      merchant: 'H&M (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.primary.product-item-headline');
      if (productName && productName.length > 0) {
        result['productName'] = productName.text().trim();
      }

      // Brand Name
      result['brandName'] = 'H&M';

      // Colour

      // Image
      let imageUrl = $('.product-detail-main-image-container');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes

      // Prices
      let retailPrice = $('.price-value-original');
      let currentPrice = $('.price-value');

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
      merchant: 'H&M (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.item-heading > a');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'H&M';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.image-container > a > img.item-image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('.price.regular');
      let currentPrice = element.querySelector('.price.sale');

      if (currentPrice) {
        // On sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (retailPrice) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (retailPrice) {
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('.image-container > a');
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
