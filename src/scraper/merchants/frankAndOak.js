import Merchant from './merchant.js';
import $ from 'jquery';

export default class FrankAndOak extends Merchant {
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
      merchant: 'Frank And Oak',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#productMain');
      if (productName && productName.length > 0) {
        productName = productName.find('h1[itemprop="name"]');
        if (productName && productName.length > 0) {
          result['productName'] = productName.text();
        }
      }

      // Brand Name
      result['brandName'] = 'Frank And Oak';

      // Colour

      // Image
      let imageUrl = $('#productMain');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img[alt="product_image"].lazyloaded');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes
      let options = $('#productMain');
      if (options && options.length > 0) {
        options = options.find('.sizes--block');
        if (options && options.length > 0) {
          options = options.find('.sizes--block__item');
          if (options && options.length > 0) {
            for (let i = 0; i < options.length; i++) {
              result['sizes'].push(options[i].innerHTML.trim());
            }
          }
        }
      }

      // Prices
      let priceContainer = $('#productMain');
      if (priceContainer && priceContainer.length > 0) {
        let price = priceContainer.find('.price--sale');
        let comparePrice = priceContainer.find('.price--discounted');
        let noSalePrice = priceContainer.find('.price');
  
        if (comparePrice && comparePrice.length > 0) {
          // On sale
          if (price && price.length > 0) {
            result['currentPrice'] = parseFloat(price[0].innerText.trim().substring(2).replace(',', ''));
          }
          result['retailPrice'] = parseFloat(comparePrice[0].innerText.trim().substring(2).replace(',', ''));
        } else {
          // Not on sale
          if (noSalePrice && noSalePrice.length > 0) {
            result['currentPrice'] = parseFloat(noSalePrice[0].innerText.trim().substring(2).replace(',', ''));
            result['retailPrice'] = result['currentPrice'];
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
      merchant: 'Frank And Oak',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-list__item__name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Frank And Oak';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-list__item__img__element.lazyloaded');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let minPrice = element.querySelector('meta[itemprop=minPrice]');
      let maxPrice = element.querySelector('meta[itemprop=maxPrice]');
      let price = element.querySelector('meta[itemprop=price]');

      if (minPrice) {
        // On sale
        result['currentPrice'] = parseFloat(minPrice.getAttribute('content').replace(/[^0-9\.]/g, ""));
        if (maxPrice) {
          result['retailPrice'] = parseFloat(maxPrice.getAttribute('content').replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        result['currentPrice'] = parseFloat(price.getAttribute('content').replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.a__no-under');
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
