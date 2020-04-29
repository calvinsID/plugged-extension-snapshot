import Merchant from './merchant.js';
import $ from 'jquery';

export default class SephoraCa extends Merchant {
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
      merchant: 'Sephora (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('div[data-comp="RegularProduct "]');
      if (productName && productName.length > 0) {
        productName = productName.find('span.css-0');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      let brandName = $('div[data-comp="RegularProduct "]');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('span.css-euydo4');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName[0].innerText.trim();
        }
      }

      // Colour

      // Image
      let imageUrl = $('div[data-comp="Carousel "]');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('div[data-comp="Price Box "]');
      if (priceContainer && priceContainer.length > 0) {
        let prices = priceContainer.find('span');
        if (prices && prices.length > 1) {
          // On sale
          result['retailPrice'] = parseFloat(prices[0].innerText.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = parseFloat(prices[1].innerText.replace(/[^0-9\.]/g, ""));
        } else if (priceContainer && priceContainer.length > 0 && priceContainer[0].innerText) {
          // Not on sale
          priceContainer = priceContainer[0].innerText.split('$');
          if (priceContainer && priceContainer.length > 1) {
            result['retailPrice'] = parseFloat(priceContainer[1].replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = result['retailPrice'];
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
      merchant: 'Sephora (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('[data-at=sku_item_name]');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('[data-at=sku_item_brand]');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrl = element.querySelector('img[data-comp="Box "]');
      if (!imageUrl || imageUrl.length === 0) {
        imageUrl = element.querySelector('img[data-comp="Image Box "]');
      }
      if (imageUrl) {
        result['imageUrl'] = imageUrl.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('[data-at=sku_item_price_list]');
      let currentPrice = element.querySelector('[data-at=sku_item_price_sale]');

      if (currentPrice) {
        // On sale
        currentPrice = currentPrice.textContent.split('$');
        if (currentPrice && currentPrice.length > 2) {
          let currentPriceOne = parseFloat(currentPrice[1].replace(/[^0-9\.]/g, ""));
          let currentPriceTwo = parseFloat(currentPrice[2].replace(/[^0-9\.]/g, ""));
          if (currentPriceOne > currentPriceTwo) {
            result['currentPrice'] = currentPriceTwo;
          } else {
            result['currentPrice'] = currentPriceOne;
          }
        } else if (currentPrice && currentPrice.length > 1) {
          result['currentPrice'] = parseFloat(currentPrice[1].replace(/[^0-9\.]/g, ""));
        }
        if (retailPrice) {
          retailPrice = retailPrice.textContent.split('$');
          if (retailPrice && retailPrice.length > 2) {
            let retailPriceOne = parseFloat(retailPrice[1].replace(/[^0-9\.]/g, ""));
            let retailPriceTwo = parseFloat(retailPrice[2].replace(/[^0-9\.]/g, ""));
            if (retailPriceOne > retailPriceTwo) {
              result['retailPrice'] = retailPriceTwo;
            } else {
              result['retailPrice'] = retailPriceOne;
            }
          } else if (retailPrice && retailPrice.length > 1) {
            result['retailPrice'] = parseFloat(retailPrice[1].replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (retailPrice) {
        // Not on sale
        retailPrice = retailPrice.textContent.split('$');
        if (retailPrice && retailPrice.length > 2) {
          let retailPriceOne = parseFloat(retailPrice[1].replace(/[^0-9\.]/g, ""));
          let retailPriceTwo = parseFloat(retailPrice[2].replace(/[^0-9\.]/g, ""));
          if (retailPriceOne > retailPriceTwo) {
            result['retailPrice'] = retailPriceOne;
            result['currentPrice'] = retailPriceTwo;
          } else {
            result['retailPrice'] = retailPriceTwo;
            result['currentPrice'] = retailPriceOne;
          }
        } else if (retailPrice && retailPrice.length > 1) {
          result['retailPrice'] = parseFloat(retailPrice[1].replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.querySelector('a');
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
