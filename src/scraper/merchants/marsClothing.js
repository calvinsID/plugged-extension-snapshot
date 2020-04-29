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
      merchant: "Mars Clothing",
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.product-title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      let brandName = $('.product-vendor');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('a');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName[0].innerText.trim();
        }
      }

      // Colour

      // Image
      let imageUrl = $('.box--product-image.gallery-item.current');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('#section-product');
      if (priceContainer && priceContainer.length > 0) {
        let comparePrice = priceContainer.find('.compare-price');
        let currentPrice = priceContainer.find('.product-price');
        if (comparePrice && comparePrice.length > 0) {
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

  scrapeMulti(element) {
    let result = {
      productName: null,
      brandName: null,
      colour: null,
      retailPrice: null,
      currentPrice: null,
      imageUrl: null,
      sizes: [],
      merchant: 'Mars Clothing',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.caption > div > h3 > span');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.box--product-image > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.price > .overflowed');

      if (price) {
        price = price.textContent.split('$');
        if (price && price.length > 2) {
          // On sale
          result['retailPrice'] = parseFloat(price[2].replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = parseFloat(price[1].replace(/[^0-9\.]/g, ""));
        } else if (price && price.length > 1) {
          // Not on sale
          result['currentPrice'] = parseFloat(price[1].replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
        }
      }

      // Url
      let url = element.querySelector('a.product-item');
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
