import Merchant from './merchant.js';
import $ from 'jquery';

export default class PandoraCa extends Merchant {
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
      merchant: 'Pandora (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-top-wrap');
      if (!productName || !(productName.length > 0)) {
        productName = $('.product-title-price');
      }
      if (productName && productName.length > 0) {
        productName = productName.find('.product-name');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      result['brandName'] = 'Pandora';

      // Colour

      // Image
      let imageUrl = $('.primary-image');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('.simple-slide-wrapper:visible');
        if (imageUrl && imageUrl.length > 0) {
          imageUrl = imageUrl.find('img');
          if (imageUrl && imageUrl.length > 0) {
            result['imageUrl'] = imageUrl[0].src.trim();
          }
        }
      }

      // Sizes

      // Prices
      let container = $('.product-top-wrap');
      if (!container || !(container.length > 0)) {
        container = $('.product-title-price');
      }
      if (container && container.length > 0) {
        let rangePriceCurrent = container.find('.product-price > .range-price > .price-sales');
        let rangePriceRetail = container.find('.product-price > .range-price > .price-standard');
        let currentPrice = container.find('.product-price > .price-sales');
        let retailPrice = container.find('.product-price > .price-standard');
        let price = container.find('.product-price > .standardprice');

        if (retailPrice && retailPrice.length > 0) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          } else if (rangePriceCurrent && rangePriceCurrent.length > 0) {
            rangePriceCurrent = rangePriceCurrent[0].innerText.split('-');
            if (rangePriceCurrent && rangePriceCurrent.length > 0) {
              result['currentPrice'] = parseFloat(rangePriceCurrent[0].replace(/[^0-9\.]/g, ""));
            }
          }
        } else if (rangePriceRetail && rangePriceRetail.length > 0) {
          // On sale range
          rangePriceRetail = rangePriceRetail[0].innerText.split('-');
          if (rangePriceRetail && rangePriceRetail.length > 0) {
            result['retailPrice'] = parseFloat(rangePriceRetail[rangePriceRetail.length - 1].innerText.replace(/[^0-9\.]/g, ""));
          }
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          } else if (rangePriceCurrent && rangePriceCurrent.length > 0) {
            rangePriceCurrent = rangePriceCurrent[0].innerText.split('-');
            if (rangePriceCurrent && rangePriceCurrent.length > 0) {
              result['currentPrice'] = parseFloat(rangePriceCurrent[0].replace(/[^0-9\.]/g, ""));
            }
          }
        } else if (currentPrice && currentPrice.length > 0) {
          // Not on sale
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
        } else if (rangePriceCurrent && rangePriceCurrent.length > 0) {
          rangePriceCurrent = rangePriceCurrent[0].innerText.split('-');
          if (rangePriceCurrent && rangePriceCurrent.length > 0) {
            result['currentPrice'] = parseFloat(rangePriceCurrent[0].replace(/[^0-9\.]/g, ""));
            result['retailPrice'] = parseFloat(rangePriceCurrent[rangePriceCurrent.length - 1].replace(/[^0-9\.]/g, ""));
          }
        } else if (price && price.length > 0) {
          // Not on sale v2
          result['currentPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Pandora (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('a.product-name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Pandora';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.main-img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let rangePriceCurrent = element.querySelectorAll('.product-price > .range-price > .price-sales');
      let rangePriceRetail = element.querySelectorAll('.product-price > .range-price > .price-standard');
      let currentPrice = element.querySelectorAll('.product-price > .price-sales');
      let retailPrice = element.querySelectorAll('.product-price > .price-standard');
      let price = element.querySelectorAll('.product-price > .standardprice');

      if (retailPrice && retailPrice.length > 0) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        if (currentPrice && currentPrice.length > 0) {
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        } else if (rangePriceCurrent && rangePriceCurrent.length > 0) {
          rangePriceCurrent = rangePriceCurrent[0].innerText.split('-');
          if (rangePriceCurrent && rangePriceCurrent.length > 0) {
            result['currentPrice'] = parseFloat(rangePriceCurrent[0].replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (rangePriceRetail && rangePriceRetail.length > 0) {
        // On sale range
        rangePriceRetail = rangePriceRetail[0].innerText.split('-');
        if (rangePriceRetail && rangePriceRetail.length > 0) {
          result['retailPrice'] = parseFloat(rangePriceRetail[rangePriceRetail.length - 1].innerText.replace(/[^0-9\.]/g, ""));
        }
        if (currentPrice && currentPrice.length > 0) {
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        } else if (rangePriceCurrent && rangePriceCurrent.length > 0) {
          rangePriceCurrent = rangePriceCurrent[0].innerText.split('-');
          if (rangePriceCurrent && rangePriceCurrent.length > 0) {
            result['currentPrice'] = parseFloat(rangePriceCurrent[0].replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (currentPrice && currentPrice.length > 0) {
        // Not on sale
        result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      } else if (rangePriceCurrent && rangePriceCurrent.length > 0) {
        rangePriceCurrent = rangePriceCurrent[0].innerText.split('-');
        if (rangePriceCurrent && rangePriceCurrent.length > 0) {
          result['currentPrice'] = parseFloat(rangePriceCurrent[0].replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = parseFloat(rangePriceCurrent[rangePriceCurrent.length - 1].replace(/[^0-9\.]/g, ""));
        }
      } else if (price && price.length > 0) {
        // Not on sale v2
        result['currentPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.product-name');
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
