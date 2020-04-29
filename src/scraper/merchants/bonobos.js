import Merchant from './merchant.js';
import $ from 'jquery';

export default class BlueButtonShop extends Merchant {
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
      merchant: 'Bonobos',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.summary---name---YP8GS');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Bonobos';

      // Colour

      // Image
      let imageUrl = $('.product_detail---imagesContainer---yZwBb');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('.component.imgix-component');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[imageUrl.length - 1].src;
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.summary---price---2-nec');
      if (priceContainer && priceContainer.length > 0) {
        priceContainer = priceContainer.find('span');
        if (priceContainer && priceContainer.length > 1) {
          // On sale
          result['currentPrice'] = parseFloat(priceContainer[1].innerText.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = parseFloat(priceContainer[0].innerText.replace(/[^0-9\.]/g, ""));
        } else if (priceContainer && priceContainer.length > 0) {
          // Not on sale
          result['retailPrice'] = parseFloat(priceContainer[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Bonobos',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product_tile---productName---11Yhx');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Bonobos';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product_tile_image---image---RC51l > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('.product_tile---fullPrice---33a41');
      let currentPrice = element.querySelector('.product_tile---salePrice---3drKg');
      let price = element.querySelector('.product_tile---productPriceDesktop---sjgzY > span');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a');
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
