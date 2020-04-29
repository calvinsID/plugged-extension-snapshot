import Merchant from './merchant.js';
import $ from 'jquery';

export default class FootLockerCa extends Merchant {
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
      merchant: 'Foot Locker (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.ProductName-primary');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.slick-slide.slick-active');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.ProductDetails-form__info');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.ProductPrice-final');
        let retailPrice = priceContainer.find('.ProductPrice-original');
  
        if (currentPrice && currentPrice.length > 0) {
          // On sale
          if (retailPrice && retailPrice.length > 0) {
            result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        } else if (retailPrice && retailPrice.length > 0) {
          // Not on sale, but cant find current price because foot locker makes you add to cart before seeing the price
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        } else {
          // Not on sale
          retailPrice = priceContainer.find('.ProductPrice');
          if (retailPrice && retailPrice.length > 0) {
            result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Foot Locker (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.ProductName-primary');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.ProductCard-image--primary');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img');
        if (imageUrlContainer) {
          result.imageUrl = imageUrlContainer.src.trim();
        }
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.ProductPrice-final');
      let retailPrice = element.querySelector('.ProductPrice-original');
      let price = element.querySelector('.ProductPrice');

      if (currentPrice) {
        // On sale
        if (retailPrice) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
      } else if (price) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.ProductCard-link');
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
