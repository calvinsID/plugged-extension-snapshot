import Merchant from './merchant.js';
import $ from 'jquery';

export default class SaksFifthAvenueCa extends Merchant {
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
      merchant: 'Saks Fifth Avenue (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('section.product__summary');
      if (productName && productName.length > 0) {
        productName = productName.find('.product-overview__short-description');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      let brandName = $('section.product__summary');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('.product-overview__brand-link');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName[0].innerText.trim();
        }
      }

      // Colour

      // Image
      let imageUrl = $('#zoom-view');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.s7container');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('section.product__summary');
      if (priceContainer && priceContainer.length > 0) {
        priceContainer = priceContainer.find('.product-pricing');
        if (priceContainer && priceContainer.length > 0) {
          let currentPrice = priceContainer.find('#salePrice');
          let comparePrice = priceContainer.find('#regularPrice');
  
          if (comparePrice && comparePrice.length > 0) {
            // On sale
            comparePrice = comparePrice.find('span');
            if (comparePrice && comparePrice.length > 2) {
              if (comparePrice[0].innerText.trim() === 'CAD') {
                // Is CAD pricing
                result['retailPrice'] = parseFloat(comparePrice[2].innerText.replace(/[^0-9\.]/g, ""));
              }
            }
            if (currentPrice && currentPrice.length > 0) {
              currentPrice = currentPrice.find('span');
              if (currentPrice && currentPrice.length > 2) {
                if (currentPrice[0].innerText.trim() === 'CAD') {
                  // Is CAD pricing
                  result['currentPrice'] = parseFloat(currentPrice[2].innerText.replace(/[^0-9\.]/g, ""));
                }
              }
            }
          } else if (currentPrice && currentPrice.length > 0) {
            // Not on sale
            currentPrice = currentPrice.find('span');
            if (currentPrice && currentPrice.length > 2) {
              if (currentPrice[0].innerText.trim() === 'CAD') {
                // Is CAD pricing
                result['currentPrice'] = parseFloat(currentPrice[2].innerText.replace(/[^0-9\.]/g, ""));
                result['retailPrice'] = result['currentPrice'];
              }
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
      merchant: 'Saks Fifth Avenue (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-detail > hgroup > h2');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.product-detail > hgroup > [itemprop=brand]');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-media > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.product-offer > [itemprop=listPrice]');
      let retailPrice = element.querySelector('.product-price > [itemprop=listPrice]');
      let currentPrice = element.querySelector('.product-sale-price > [itemprop=salePrice]');

      if (currentPrice && currentPrice.textContent) {
        // On sale
        currentPrice = currentPrice.textContent.split('-');
        if (currentPrice && currentPrice.length > 0 && currentPrice[0].indexOf('CAD') !== -1) {
          result['currentPrice'] = parseFloat(currentPrice[0].replace(/[^0-9\.]/g, ""));
        }
        if (retailPrice && retailPrice.textContent) {
          retailPrice = retailPrice.textContent.split('-');
          if (retailPrice && retailPrice.length > 0 && retailPrice[0].indexOf('CAD') !== -1) {
            result['retailPrice'] = parseFloat(retailPrice[retailPrice.length - 1].replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (price && price.textContent) {
        // Not on sale
        price = price.textContent.split('-');
        if (price && price.length > 0 && price[0].indexOf('CAD') !== -1) {
          result['retailPrice'] = parseFloat(price[price.length - 1].replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = parseFloat(price[0].replace(/[^0-9\.]/g, ""));
        }
      }

      // Url
      let url = element.querySelector('a.sfa-pa-product-with-swatches');
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
