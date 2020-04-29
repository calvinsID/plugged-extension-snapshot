import Merchant from './merchant.js';
import $ from 'jquery';

export default class InfluenceuCa extends Merchant {
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
      merchant: 'Joe Fresh',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.saffron___ProductName__product-name___ymrXE');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Joe Fresh';

      // Colour

      // Image
      let imageUrl = $('.saffron___Image__image___2JQBt');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src.trim();
      }

      // Sizes

      // Prices
      let priceContainer = $('.saffron___PDP__price-wrapper___ZGp-m');
      if (priceContainer && priceContainer.length > 0) {
        let noSale = priceContainer.find('.saffron___PriceTag__price-tag-group--normal___1IFXj')
        let currentPrice = priceContainer.find('.saffron___PriceTag__price-tag-group--sale___3BxzC');
        let retailPrice = priceContainer.find('.saffron___PriceTag__price-tag-group--base___2HGWv');
        let each = priceContainer.find('.saffron___PriceTag__price-tag-group--each___MYyD7');
  
        if (noSale && noSale.length > 0) {
          // Not on sale
          noSale = noSale.find('span.price-value');
          if (noSale && noSale.length > 0) {
            if (noSale[0].innerText.trim().charAt(0) === '$') {
              // English site
              result['retailPrice'] = parseFloat(noSale[0].innerText.replace(/[^0-9\.]/g, ""));
              result['currentPrice'] = result['retailPrice'];
            } else {
              // French site
              result['retailPrice'] = parseFloat(noSale[0].innerText.replace(',', '.').replace(/[^0-9\.]/g, ""));
              result['currentPrice'] = result['retailPrice'];
            }
          }
        } else if (currentPrice && currentPrice.length > 0) {
          // On sale
          if (currentPrice[0].innerText.trim().charAt(0) === '$') {
            // English site
            if (retailPrice && retailPrice.length > 0) {
              result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            }
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          } else {
            // French site
            if (retailPrice && retailPrice.length > 0) {
              result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(',', '.').replace(/[^0-9\.]/g, ""));
            }
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(',', '.').replace(/[^0-9\.]/g, ""));
          }
        } else if (each && each.length > 0) {
          // Bundle pricing
          each = each.find('span.price-value');
          if (each && each.length > 0) {
            if (each[0].innerText.trim().charAt(0) === '$') {
              // English site
              result['currentPrice'] = parseFloat(each[0].innerText.replace(/[^0-9\.]/g, ""));
            } else {
              // French site
              result['currentPrice'] = parseFloat(each[0].innerText.replace(',', '.').replace(/[^0-9\.]/g, ""));
            }
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
      merchant: 'Joe Fresh',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.saffron___ProductName__product-name___ymrXE');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Joe Fresh';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.saffron___ProductListItem__product-list-item-image___20TEj > a > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelectorAll('.saffron___Price__price--base___2oW-N');
      let currentPrice = element.querySelectorAll('.saffron___Price__price--sale___FjP1d');
      let price = element.querySelectorAll('.saffron___Price__price--normal___33iJR');
      let each = element.querySelectorAll('.saffron___Price__price--each___5lwgV');

      if (retailPrice && retailPrice.length > 0) {
        // On sale
        if (retailPrice[0].innerText.trim().charAt(0) === '$') {
          // English site
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        } else {
          // French site
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(',', '.').replace(/[^0-9\.]/g, ""));
          }
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(',', '.').replace(/[^0-9\.]/g, ""));
        }
      } else if (price && price.length > 0) {
        // Not on sale
        if (price[0].innerText.trim().charAt(0) === '$') {
          // English site
          result['currentPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
        } else {
          // French site
          result['currentPrice'] = parseFloat(price[0].innerText.replace(',', '.').replace(/[^0-9\.]/g, ""));
        }
        result['retailPrice'] = result['currentPrice'];
      } else if (each && each.length > 0) {
        // Bulk pricing
        if (each[0].innerText.trim().charAt(0) === '$') {
          // English site
          result['currentPrice'] = parseFloat(each[0].innerText.replace(/[^0-9\.]/g, ""));
        } else {
          // French site
          result['currentPrice'] = parseFloat(each[0].innerText.replace(',', '.').replace(/[^0-9\.]/g, ""));
        }
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.saffron___SimpleLink__link___3akLr');
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
