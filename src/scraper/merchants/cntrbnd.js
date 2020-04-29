import Merchant from './merchant.js';
import $ from 'jquery';

export default class Cntrbnd extends Merchant {
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
      merchant: 'Cntrbnd',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-detail__title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      let brandName = $('.product-detail__vendor');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('a');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName[0].innerText.trim();
        }
      }

      // Colour

      // Image
      let imageUrl = $('.product-detail__images');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].currentSrc;
        }
      }

      // Sizes

      // Prices
      let container = $('.product-detail__detail');
      if (container && container.length > 0) {
        let currentPrice = container.find('.product-price__reduced');
        let retailPrice = container.find('.product-price__compare');
        let priceContainer = container.find('.product-detail__price');
  
        if (currentPrice && currentPrice.length > 0) {
          // On sale
          if (retailPrice && retailPrice.length > 0) {
            retailPrice = retailPrice.find('span');
            if (retailPrice && retailPrice.length > 0) {
              result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            }
          }
          currentPrice = currentPrice.find('span');
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else {
          // Not on sale
          priceContainer = priceContainer.find('span.theme-money');
          if (priceContainer && priceContainer.length > 0) {
            result['retailPrice'] = parseFloat(priceContainer[0].innerText.replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = result['retailPrice'];
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
      merchant: 'Cntrbnd',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-block__title > a');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      } else {
        productName = element.querySelector('.product-title');
        if (productName) {
          result['productName'] = productName.textContent.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.image-one');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img');
        if (imageUrlContainer) {
          result.imageUrl = imageUrlContainer.currentSrc.trim();
        }
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.product-price__reduced');
      let retailPrice = element.querySelector('.product-price__compare');
      let price = element.querySelector('.theme-money');

      if (currentPrice) {
        // On sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (retailPrice) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('.product-block__title-link');
      if (url) {
        result['url'] = url.href;
      } else {
        url = element.querySelector('.recently-viewed-product.plain-link');
        if (url) {
          result['url'] = url.href;
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
    return result;
  }
}
