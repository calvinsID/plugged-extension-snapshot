import Merchant from './merchant.js';
import $ from 'jquery';

export default class Nrml extends Merchant {
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
      merchant: 'Nrml',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-single__header');
      if (productName && productName.length > 0) {
        productName = productName.find('h1');
        if (productName && productName.length > 0) {
          result['productName'] = productName.text();
        }
      }

      // Brand Name
      let brandName = $('.product-single__vendor');
      if (brandName && brandName.length > 0) {
        result['brandName'] = brandName.text();
      }

      // Colour

      // Image
      let imageUrl = $('div.product-single__photo');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes
      let options = $('.product-single__content');
      if (options && options.length > 0) {
        options = options.find('.option__variant');
        if (options && options.length > 0) {
          for (let i = 0; i < options.length; i++) {
            result['sizes'].push(options[i].getAttribute('data-variant-title').trim());
          }
        }
      }

      // Prices
      let price = $('#ProductPrice');
      let comparePrice = $('#ComparePrice');

      if (comparePrice && comparePrice.length > 0) {
        // On sale
        comparePrice = comparePrice.find('span.money');
        if (comparePrice && comparePrice.length > 0) {
          let comparePriceString = comparePrice[0].getAttribute('doubly-currency-cad').slice(0, comparePrice[0].getAttribute('doubly-currency-cad').length - 2) + '.' + comparePrice[0].getAttribute('doubly-currency-cad').slice(comparePrice[0].getAttribute('doubly-currency-cad').length - 2);
          result['retailPrice'] = parseFloat(comparePriceString.replace(/[^0-9\.]/g, ""));
        }
        if (price && price.length > 0) {
          result['currentPrice'] = parseFloat(price[0].getAttribute('content').replace(/[^0-9\.]/g, ""));
        }
      } else {
        // Not on sale
        if (price && price.length > 0) {
          result['currentPrice'] = parseFloat(price[0].getAttribute('content').replace(/[^0-9\.]/g, ""));
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
      merchant: 'Nrml',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.rollover__content-details');
      if (productName) {
        productName = productName.querySelector('h3');
        if (productName) {
          result['productName'] = productName.textContent.trim();
        }
      }

      // Brand Name
      let brandName = element.querySelector('.rollover__content-details');
      if (brandName) {
        brandName = brandName.querySelector('.item__vendor');
        if (brandName) {
          result['brandName'] = brandName.textContent.trim();
        }
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.grid__image.is-selected');
      if (imageUrlContainer) {
        let imageUrlList = imageUrlContainer.querySelector('img');
        if (imageUrlList) {
          result.imageUrl = imageUrlList.src.trim();
        }
      } else {
        imageUrlContainer = element.querySelector('.rollover__image.is-selected');
        if (imageUrlContainer) {
          let imageUrlList = imageUrlContainer.querySelector('img');
          if (imageUrlList) {
            result.imageUrl = imageUrlList.src.trim();
          }
        }
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('.item__price');
      if (priceButton) {
        let salePrice = priceButton.querySelector('.price--sale');
        let retailPrice = priceButton.querySelector('s');
        if (salePrice) {
          // On sale
          salePrice = salePrice.querySelector('span.money');
          if (salePrice) {
            if (salePrice.getAttribute('doubly-currency-cad')) {
              let salePriceString = salePrice.getAttribute('doubly-currency-cad').slice(0, salePrice.getAttribute('doubly-currency-cad').length - 2) + '.' + salePrice.getAttribute('doubly-currency-cad').slice(salePrice.getAttribute('doubly-currency-cad').length - 2);
              result['currentPrice'] = parseFloat(salePriceString.replace(/[^0-9\.]/g, ""));
            } else {
              result['currentPrice'] = parseFloat(salePrice.textContent.replace(/[^0-9\.]/g, ""));
            }
          }
          if (retailPrice) {
            retailPrice = retailPrice.querySelector('span.money');
            if (retailPrice) {
              if (retailPrice.getAttribute('doubly-currency-cad')) {
                let retailPriceString = retailPrice.getAttribute('doubly-currency-cad').slice(0, retailPrice.getAttribute('doubly-currency-cad').length - 2) + '.' + retailPrice.getAttribute('doubly-currency-cad').slice(retailPrice.getAttribute('doubly-currency-cad').length - 2);
                result['retailPrice'] = parseFloat(retailPriceString.replace(/[^0-9\.]/g, ""));
              } else {
                result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
              }
            }
          }
        } else {
          // Not on sale
          retailPrice = priceButton.querySelector('span.money');
          if (retailPrice) {
            if (retailPrice.getAttribute('doubly-currency-cad')) {
              let retailPriceString = retailPrice.getAttribute('doubly-currency-cad').slice(0, retailPrice.getAttribute('doubly-currency-cad').length - 2) + '.' + retailPrice.getAttribute('doubly-currency-cad').slice(retailPrice.getAttribute('doubly-currency-cad').length - 2);
              result['retailPrice'] = parseFloat(retailPriceString.replace(/[^0-9\.]/g, ""));
            } else {
              result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
            }
            result['currentPrice'] = result['retailPrice'];
          }
        }
      }

      // Url
      let url = element.querySelector('a.item__details');
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
