import Merchant from './merchant.js';
import $ from 'jquery';

export default class UniqloCa extends Merchant {
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
      merchant: 'Uniqlo (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('div[data-test=product-name]');
      if (productName && productName.length > 0) {
        productName = productName.find('.title');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      result['brandName'] = 'Uniqlo'

      // Colour

      // Image
      let imageUrl = $('.fr-product-image');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes
      let sizes = $('.size-picker-wrapper');
      if (sizes && sizes.length > 0) {
        sizes = sizes.find('.fr-chip');
        for (let i = 0; i < sizes.length; i++) {
          result['sizes'].push(sizes[i].getAttribute('data-test').trim());
        }
      }

      // Prices
      let priceContainer = $('.fr-product-price');
      if (priceContainer && priceContainer.length > 0) {
        priceContainer = priceContainer.find('.fr-price-currency');
        if (priceContainer && priceContainer.length > 0) {
          priceContainer = priceContainer.find('span');
          if (priceContainer && priceContainer.length > 0) {
            result['currentPrice'] = parseFloat(priceContainer[0].innerText.replace(/[^0-9\.]/g, ""));
            result['retailPrice'] = result['currentPrice'];
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
      merchant: 'Uniqlo (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('[data-test=product-card-description]');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Uniqlo';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.fr-product-image');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img');
        if (imageUrlContainer) {
          result.imageUrl = imageUrlContainer.src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = element.querySelector('.fr-price-currency');
      if (priceContainer) {
        priceContainer = priceContainer.querySelector('span');
        if (priceContainer) {
          result['currentPrice'] = parseFloat(priceContainer.innerText.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
        }
      }

      // Url
      let url = element.querySelector('a[data-category=ProductCollection-grid]');
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
