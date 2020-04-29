import Merchant from './merchant.js';
import $ from 'jquery';

export default class RodenGray extends Merchant {
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
      merchant: 'Roden Gray',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product__details-wrap');
      if (productName && productName.length > 0) {
        productName = productName.find('.product__title-area');
        if (productName && productName.length > 0) {
          productName = productName.find('h2');
          if (productName && productName.length > 0) {
            result['productName'] = productName[0].innerText.trim();
          }
        }
      }

      // Brand Name
      let brandName = $('.product__details-wrap');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('.product__title-area');
        if (brandName && brandName.length > 0) {
          brandName = brandName.find('p');
          if (brandName && brandName.length > 0) {
            result['brandName'] = brandName[0].innerText.trim();
          }
        }
      }

      // Colour

      // Image
      let imageUrl = $('.product__image-wrap');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('#MainContent');
      if (priceContainer && priceContainer.length > 0) {
        priceContainer = priceContainer.find('.product__price-area');
        if (priceContainer && priceContainer.length > 0) {
          let currentPrice = priceContainer.find('.product__final-price');
          let comparePrice = priceContainer.find('.product__initial-price');
  
          if (comparePrice && comparePrice.length > 0) {
            // On sale
            comparePrice = comparePrice.find('span.money');
            if (comparePrice && comparePrice.length > 0) {
              result['retailPrice'] = parseFloat(comparePrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
            }
            if (currentPrice && currentPrice.length > 0) {
              currentPrice = currentPrice.find('span.money');
              if (currentPrice && currentPrice.length > 0) {
                result['currentPrice'] = parseFloat(currentPrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
              }
            }
          } else if (currentPrice && currentPrice.length > 0) {
            // Not on sale
            currentPrice = currentPrice.find('span.money');
            if (currentPrice && currentPrice.length > 0) {
              result['currentPrice'] = parseFloat(currentPrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
              result['retailPrice'] = result['currentPrice'];
            }
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
      merchant: 'Roden Gray',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.collection-list__item-name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.collection-list__designer');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.collection-list__image > div > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.collection-list__price-info > .money');
      let retailPrice = element.querySelector('.collection-list__price-info > .collection-list__compare-at > .money');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice) {
        // Not on sale
        result['retailPrice'] = parseFloat(currentPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('.collection-list__image-wrap > a');
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
