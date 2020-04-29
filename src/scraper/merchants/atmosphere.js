import Merchant from './merchant.js';
import $ from 'jquery';

export default class Atmosphere extends Merchant {
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
      merchant: 'Atmosphere',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.global-page-header__title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.product-detail__mobile-gallery-content');
      if (imageUrl && imageUrl.length > 0 && imageUrl[0].style.display !== 'none') {
        imageUrl = imageUrl.find('.product-detail__mobile-gallery-item');
        if (imageUrl && imageUrl.length > 0) {
          imageUrl = imageUrl.find('img');
          if (imageUrl && imageUrl.length > 0) {
            result['imageUrl'] = imageUrl[0].src.trim();
          }
        }
      } else {
        imageUrl = $('.product-detail__preview-gallery-content-wrapper');
        if (imageUrl && imageUrl.length > 0 && imageUrl[0].style.display !== 'none') {
          imageUrl = imageUrl.find('img.product-detail__product-img');
          if (imageUrl && imageUrl.length > 0) {
            result['imageUrl'] = imageUrl[0].src.trim();
          }
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-detail__options');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.product-detail__now-price-text');
        let comparePrice = priceContainer.find('.product-detail__was-price-text');
        let comparePrice2 = priceContainer.find('.product-detail__price-original');
        let noSale = priceContainer.find('.product-detail__price-text');

        if (comparePrice && comparePrice.length > 0) {
          // On sale
          result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          } else if (noSale && noSale.length > 0) {
            result['currentPrice'] = parseFloat(noSale[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (comparePrice2 && comparePrice2.length > 0) {
          // On sale
          result['retailPrice'] = parseFloat(comparePrice2[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          } else if (noSale && noSale.length > 0) {
            result['currentPrice'] = parseFloat(noSale[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (noSale && noSale.length > 0) {
          // Not on sale
          result['currentPrice'] = parseFloat(noSale[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Atmosphere',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-title-text');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.product-grid-image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.product-price__wrap > .product-price__now-price-text');
      let currentPrice2 = element.querySelector('.product-price__wrap > .product-sale-price');
      let retailPrice = element.querySelector('.product-price__wrap > .product-price__was-price-text');
      let price = element.querySelector('.product-price__wrap > .product-price-text');

      if (currentPrice) {
        // On sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (retailPrice) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        } else if (price) {
          result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice2) {
        // On sale v2
        result['currentPrice'] = parseFloat(currentPrice2.textContent.replace(/[^0-9\.]/g, ""));
        if (retailPrice) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        } else if (price) {
          result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.product-grid__link');
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
