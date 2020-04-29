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
      merchant: 'Blue Button Shop',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h2.css-margin');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      let brandName = $('h1.css-margin');
      if (brandName && brandName.length > 0) {
        result['brandName'] = brandName[0].innerText.trim();
      }

      // Colour

      // Image
      let imageUrl = $('#myCarousel');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('.item.active');
        if (imageUrl && imageUrl.length > 0) {
          imageUrl = imageUrl.find('img');
          if (imageUrl && imageUrl.length > 0) {
            result['imageUrl'] = imageUrl[0].src;
          }
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.css-price-line');
      if (priceContainer && priceContainer.length > 0) {
        priceContainer = priceContainer.find('span');
        if (priceContainer && priceContainer.length > 2) {
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
      merchant: 'Blue Button Shop',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.css-desc');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.css-desc > span');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.pic1');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.css-price');
      let retailPrice = element.querySelector('.css-strike-through');
      let currentPrice = element.querySelector('.css-price > [style="color:red"]');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('.css-image > a');
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
