import Merchant from './merchant.js';
import $ from 'jquery';

export default class MikesComputerShop extends Merchant {
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
      merchant: "Mike's Computer Shop",
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.Product.Details');
      if (productName && productName.length > 0) {
        productName = productName.find('.Title');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('#active-image');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src;
      }

      // Sizes

      // Prices
      let container = $('.Product.Details');
      if (container && container.length > 0) {
        let currentPrice = container.find('.Price.Special');
        let retailPrice = container.find('.Retail');
        let price = container.find('.Price');
  
        if (retailPrice && retailPrice.length > 0) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (price && price.length > 0) {
          // Not on sale
          result['currentPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: "Mike's Computer Shop",
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('span[itemprop=name]');
      if (productName) {
        result['productName'] = productName.innerText.trim();
      } else {
        productName = element.querySelector('.card-title');
        if (productName) {
          result['productName'] = productName.innerText.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img[itemprop=image]');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      } else {
        imageUrlContainer = element.querySelector('.deal-image');
        if (imageUrlContainer) {
          imageUrlContainer = imageUrlContainer.querySelector('img');
          if (imageUrlContainer) {
            result.imageUrl = imageUrlContainer.src.trim();
          }
        }
      }

      // Sizes

      // Prices
      let price = element.querySelector('.Price');

      if (price) {
        result['currentPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      } else {
        let retailPrice = element.querySelector('.retail-price');
        let currentPrice = element.querySelector('.special-price');
        price = element.querySelector('.regular-price');

        if (retailPrice) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice.innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice) {
            result['currentPrice'] = parseFloat(currentPrice.innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (price) {
          result['currentPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
        }
      }

      // Url
      let url = element.querySelector('.Data > a');
      if (url) {
        result['url'] = url.href;
      } else {
        url = element.querySelector('.card-title');
        if (url) {
          url = url.querySelector('a');
          if (url) {
            result['url'] = url.href;
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
    return result;
  }
}
