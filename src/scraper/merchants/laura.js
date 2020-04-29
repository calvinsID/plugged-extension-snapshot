import Merchant from './merchant.js';
import $ from 'jquery';

export default class Laura extends Merchant {
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
      merchant: 'Laura',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.product-name');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      let brandName = $('.product-brand');
      if (brandName && brandName.length > 0) {
        result['brandName'] = brandName[0].innerText.trim();
      }

      // Colour

      // Image
      let imageUrl = $('img[data-img=prod-img-0].primary-image');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[imageUrl.length - 1].currentSrc.trim();
      }

      // Sizes

      // Prices
      let priceContainer = $('#product-content');
      if (priceContainer && priceContainer.length > 0) {
        let retailPrice = priceContainer.find('.price-standard');
        let currentPrice = priceContainer.find('.price-sales');
        let price = priceContainer.find('.price-regular');

        if (currentPrice && currentPrice.length > 0) {
          // On sale
          result['currentPrice'] = parseFloat(currentPrice[0].textContent.replace(/[^0-9\.]/g, ""));
          if (retailPrice && retailPrice.length > 0) {
            result['retailPrice'] = parseFloat(retailPrice[0].textContent.replace(/[^0-9\.]/g, ""));
          }
        } else if (price && price.length > 0) {
          result['retailPrice'] = parseFloat(price[0].textContent.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Laura',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('a.name-link');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.primary-thumb');
      if (imageUrlContainer) {
        result['imageUrl'] = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('.product-standard-price');
      let currentPrice = element.querySelector('.product-sales-price');
      let price = element.querySelector('.product-regular');

      if (retailPrice && retailPrice.textContent) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price && price.textContent) {
        result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.name-link');
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
