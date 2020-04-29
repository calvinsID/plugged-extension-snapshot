import Merchant from './merchant.js';
import $ from 'jquery';

export default class TateAndYoko extends Merchant {
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
      merchant: 'Tate + Yoko',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-meta__title');
      if (productName && productName.length > 0) {
        result['productName'] = productName.innerText.trim();
      }

      // Brand Name
      let brandName = $('.product-meta__vendor');
      if (brandName && brandName.length > 0) {
        result['brandName'] = brandName.innerText.trim();
      }

      // Colour

      // Image
      let imageUrl = $('.product__slideshow-slide.slick-slide.slick-current.slick-active');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.zoomImg');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes

      // Prices
      let price = $('.product-meta__price');
      let currentPrice = $('.product-meta__price.product-meta__price--new');
      let retailPrice = $('.product-meta__price.product-meta__price--old');

      if (currentPrice && currentPrice.length > 0) {
        // On sale
        if (retailPrice && retailPrice.length > 0) {
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        }
        result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
      } else if (price && price.length > 0) {
        // Not on sale
        result['retailPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Tate + Yoko',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-item__title > a');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.product-item__vendor > a');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-item__image-wrapper > div > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.currentSrc.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.product-item__price');
      let currentPrice = element.querySelector('.product-item__price.product-item__price--new');
      let retailPrice = element.querySelector('.product-item__price.product-item__price--old');

      if (currentPrice) {
        // On sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (retailPrice) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.product-item__image');
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
