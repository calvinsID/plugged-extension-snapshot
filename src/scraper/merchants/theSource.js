import Merchant from './merchant.js';
import $ from 'jquery';

export default class TheSource extends Merchant {
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
      merchant: 'The Source',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.productDescription');
      if (productName && productName.length > 0) {
        productName = productName.find('[data-itemprop=name]');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.productDescription');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.primary-image');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].currentSrc.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.productDescription');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.pdp-sale-price');
        let retailPrice = priceContainer.find('.pdp-original-price');

        if (retailPrice && retailPrice.length > 0 && retailPrice[0].innerText && retailPrice[0].innerText.trim()) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0 && currentPrice[0].innerText && currentPrice[0].innerText.trim()) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (currentPrice && currentPrice.length > 0 && currentPrice[0].innerText && currentPrice[0].innerText.trim()) {
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
      merchant: 'The Source',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.productMainLink');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.primary-image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.sale-price');
      let retailPrice = element.querySelector('.pdp-original-price');

      if (retailPrice && retailPrice.textContent && retailPrice.textContent.trim()) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice && currentPrice.textContent && currentPrice.textContent.trim()) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice && currentPrice.textContent && currentPrice.textContent.trim()) {
        // Not on sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('.product-content > a');
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
