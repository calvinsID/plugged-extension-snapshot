import Merchant from './merchant.js';
import $ from 'jquery';

export default class AdidasCa extends Merchant {
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
      merchant: 'Adidas (US)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1[data-auto-id=product-title]');
      if (productName && productName.length > 0) {
        result['productName'] = productName.text();
      }

      // Brand Name
      result['brandName'] = 'Adidas';

      // Colour

      // Image
      let imageUrl = $('div[data-auto-id=glass-image-viewer]');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes
      let options = $('select[data-auto-id=product-size-dropdown]');
      if (options && options.length > 0) {
        options = options.find('option');
        if (options && options.length > 0) {
          for (let i = 1; i < options.length; i++) {
            result['sizes'].push(options[i].innerHTML.trim());
          }
        }
      }

      // Prices
      let priceContainer = $('div[data-auto-id=product-information]');
      if (priceContainer && priceContainer.length > 0) {
        let price = priceContainer.find('.gl-price__value--sale');
        let comparePrice = priceContainer.find('.gl-price__value--crossed');
        let noSalePrice = priceContainer.find('.gl-price__value');

        if ((!price && !comparePrice && !noSalePrice) || (price.length === 0 && comparePrice.length === 0 && noSalePrice.length === 0)) {
          // Maybe mobile site
          priceContainer = $('div[data-auto-id=hero-stack]');

          price = priceContainer.find('.gl-price__value--sale');
          comparePrice = priceContainer.find('.gl-price__value--crossed');
          noSalePrice = priceContainer.find('.gl-price__value');
        }

        if (comparePrice && comparePrice.length > 0) {
          // On sale
          if (price && price.length > 0) {
            result['currentPrice'] = parseFloat(price[0].innerText.trim().substring(1).replace(',', ''));
          }
          result['retailPrice'] = parseFloat(comparePrice[0].innerText.trim().substring(1).replace(',', ''));
        } else {
          // Not on sale
          if (noSalePrice && noSalePrice.length > 0) {
            result['currentPrice'] = parseFloat(noSalePrice[0].innerText.trim().substring(1).replace(',', ''));
            result['retailPrice'] = result['currentPrice'];
          }
        }
      }
    } catch (err) {
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
      merchant: 'Adidas (US)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.gl-product-card__name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Adidas';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.gl-product-card__image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let comparePrice = element.querySelector('.gl-price__value.gl-price__value--crossed');
      let price = element.querySelector('.gl-price__value.gl-price__value--sale');

      if (comparePrice) {
        // On sale
        result['retailPrice'] = parseFloat(comparePrice.innerText.replace(/[^0-9\.]/g, ""));
        if (price) {
          result['currentPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
        }
      } else {
        // Not on sale
        price = element.querySelector('.gl-price__value');
        if (price) {
          result['retailPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.querySelector('.gl-product-card__media-link');
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
