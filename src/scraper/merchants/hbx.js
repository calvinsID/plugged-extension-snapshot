import Merchant from './merchant.js';
import $ from 'jquery';

export default class Hbx extends Merchant {
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
      merchant: 'HBX',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#product-summary-content');
      if (productName && productName.length > 0) {
        productName = productName.find('.name');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      let brandName = $('#product-summary-content');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('.brand');
        if (brandName && brandName.length > 0) {
          brandName = brandName.find('span');
          if (brandName && brandName.length > 0) {
            result['brandName'] = brandName[0].innerText.trim();
          }
        }
      }

      // Colour

      // Image
      let imageUrl = $('.flex-viewport');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.img-responsive.loading');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let usdPrice = $('small.text-muted');
      if (usdPrice && usdPrice.length > 0) {
        // Not on USD site
        result['currentPrice'] = parseFloat(usdPrice[0].innerText.split('USD')[1].trim().replace(',', ''));
        result['retailPrice'] = result['currentPrice'];
      } else {
        // On USD site
        let priceContainer = $('#product-summary-content');
        if (priceContainer && priceContainer.length > 0) {
          priceContainer = priceContainer.find('.price');
          if (priceContainer && priceContainer.length > 0) {
            let currentPrice = priceContainer.find('.sale-price');
            let retailPrice = priceContainer.find('.regular-price');
            if (currentPrice && currentPrice.length > 0) {
              // On sale
              result['currentPrice'] = parseFloat(currentPrice[0].innerText.trim().replace(/[^0-9\.]/g, ""));
              if (retailPrice && retailPrice.length > 0) {
                result['retailPrice'] = parseFloat(retailPrice[0].innerText.trim().replace(/[^0-9\.]/g, ""));
              }
            } else if (retailPrice && retailPrice.length > 0) {
              // Not on sale
              result['currentPrice'] = parseFloat(retailPrice[0].innerText.trim().replace(/[^0-9\.]/g, ""));
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
      merchant: 'HBX',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.brand');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.img-responsive.front');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('.regular-price');
      let currentPrice = element.querySelector('.sale-price');

      if (currentPrice) {
        // On sale
        if (currentPrice.textContent.indexOf('USD') !== -1) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        } else {
          result['currentPrice'] = 0;
        }
        if (retailPrice && retailPrice.textContent.indexOf('USD') !== -1) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        } else {
          result['retailPrice'] = 0;
        }
      } else if (retailPrice) {
        // Not on sale
        if (retailPrice.textContent.indexOf('USD') !== -1) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        } else {
          result['retailPrice'] = 0;
          result['currentPrice'] = 0;
        }
      }

      // Url
      let url = element.querySelector('a.picture');
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
