import Merchant from './merchant.js';
import $ from 'jquery';

export default class AmericanEagleCa extends Merchant {
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
      merchant: 'Aritzia (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#pdp-panel-stuck');
      if (productName && productName.length > 0) {
        productName = productName.find('.pdp-product-name__name');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.products-item');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.ar-product-images__image-media');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].currentSrc;
        }
      }

      // Sizes

      // Prices
      let priceSection = $('#pdp-panel-stuck');
      if (priceSection && priceSection.length > 0) {
        priceSection = priceSection.find('.product-price');
        if (priceSection && priceSection.length > 0) {
          let price = priceSection.find('.price-standard');
          let comparePrice = priceSection.find('.price-sales');
          let noSale = priceSection.find('.price-default');
    
          if (comparePrice && comparePrice.length > 0) {
            // On sale
            if (price && price.length > 0) {
              price = price.find('span');
              if (price && price.length > 0) {
                result['retailPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
              }
            }
            comparePrice = comparePrice.find('span');
            if (comparePrice && comparePrice.length > 0) {
              result['currentPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
            }
          } else if (noSale && noSale.length > 0) {
            // Not on sale
            noSale = noSale.find('span');
            if (noSale && noSale.length > 0) {
              result['currentPrice'] = parseFloat(noSale[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Aritzia (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-name');
      if (productName) {
        productName = productName.querySelector('a');
        if (productName) {
          result['productName'] = productName.textContent.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-image');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img');
        if (imageUrlContainer) {
          result.imageUrl = imageUrlContainer.src.trim();
        }
      }

      // Sizes

      // Prices
      let price = element.querySelector('.js-product__sales-price:not(.red)');
      let currentPrice = element.querySelector('.js-product__sales-price.red');
      let retailPrice = element.querySelector('.ar-product_price-range > .strike > span');
      let retailPrice2 = element.querySelector('.ar-product__price-single > .strike > span');

      if (retailPrice) {
        // On sale range
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          currentPrice = currentPrice.querySelectorAll('span');
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].textContent.replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (retailPrice2) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice2.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          currentPrice = currentPrice.querySelectorAll('span');
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].textContent.replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (price) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('.product-image');
      if (url) {
        url = url.querySelector('a');
        if (url) {
          result['url'] = url.href;
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
    return result;
  }
}
