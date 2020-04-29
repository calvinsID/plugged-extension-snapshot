import Merchant from './merchant.js';
import $ from 'jquery';

export default class SteveMaddenCa extends Merchant {
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
      merchant: 'Steve Madden (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.h1.title.product-title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Steve Madden';

      // Colour

      // Image
      let imageUrl = $('.featuredSlide');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.mainImg');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-options');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('#price-preview');
        let comparePrice = currentPrice.find('del');

        if (comparePrice && comparePrice.length > 0) {
          // On sale
          result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0 && currentPrice[0].innerText) {
            currentPrice = currentPrice[0].innerText.split(' ');
            if (currentPrice && currentPrice.length > 0) {
              result['currentPrice'] = parseFloat(currentPrice[0].replace(/[^0-9\.]/g, ""));
            }
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
      merchant: 'Steve Madden (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Steve Madden';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.image > a > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.price');
      if (price) {
        price = price.textContent.split('$');
        if (price && price.length > 2) {
          // On sale
          result['retailPrice'] = parseFloat(price[1].replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = parseFloat(price[2].replace(/[^0-9\.]/g, ""));
        } else if (price && price.length > 1) {
          // Not on sale
          result['retailPrice'] = parseFloat(price[1].replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.querySelector('.image > a');
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
