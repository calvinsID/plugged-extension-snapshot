import Merchant from './merchant.js';
import $ from 'jquery';

export default class GapCa extends Merchant {
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
      merchant: 'GAP (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'GAP'

      // Colour

      // Image
      let imageUrl = $('.slick-slide.slick-current');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes

      // Prices
      let currentPrice = $('.product-price--pdp__highlight');
      let retailPrice = $('.product-price--pdp__markdown > span');
      let price = $('.product-price--pdp__regular');
      if (currentPrice && currentPrice.length > 0) {
        // On sale
        if (retailPrice && retailPrice.length > 0 ) {
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.trim().replace(/[a-zA-Z\$]/g, "").split(' - ')[0].replace(',', ''));
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.trim().replace(/[a-zA-Z\$]/g, "").split(' - ')[0].replace(',', ''));
        } else if (price && price.length > 0) {
          result['retailPrice'] = parseFloat(price[0].innerText.trim().replace(/[a-zA-Z\$]/g, "").split(' - ')[0].replace(',', ''));
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.trim().replace(/[a-zA-Z\$]/g, "").split(' - ')[0].replace(',', ''));
        } else {
          result['retailPrice'] = parseFloat(currentPrice[0].innerText.trim().replace(/[a-zA-Z\$]/g, "").split(' - ')[0].replace(',', ''));
          result['currentPrice'] = result['retailPrice'];
        }
      } else {
        // Not on sale
        currentPrice = $('.product-price');
        if (currentPrice && currentPrice.length > 0) {
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.trim().replace(/[a-zA-Z\$]/g, "").split(' - ')[0].replace(',', ''));
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

  scrapeMulti(element) {
    let result = {
      productName: null,
      brandName: null,
      colour: null,
      retailPrice: null,
      currentPrice: null,
      imageUrl: null,
      sizes: [],
      merchant: 'GAP (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-card__name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'GAP'

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.product-card__image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.product-price__markdown > span');
      let retailPrice = element.querySelector('.product-price__highlight');
      let price = element.querySelector('.product-card-price > div > span > span');

      if (currentPrice) {
        // On sale
        result['retailPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (retailPrice) {
          result['currentPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.product-card__link');
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
