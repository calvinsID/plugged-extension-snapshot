import Merchant from './merchant.js';
import $ from 'jquery';

export default class MichaelKorsCa extends Merchant {
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
      merchant: "Michael Kors (CA)",
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.brand-desc-container');
      if (productName && productName.length > 0) {
        productName = productName.find('h1[itemprop=name]');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      result['brandName'] = 'Michael Kors';

      // Colour

      // Image
      let imageUrl = $('.gallery-images');
      if (imageUrl && imageUrl.length > 0) {
        // Desktop
        imageUrl = imageUrl.find('img[itemprop=image]');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      } else {
        // Mobile
        imageUrl = $('.pdp-gallery');
        if (imageUrl && imageUrl.length > 0) {
          imageUrl = imageUrl.find('img.loaded-image');
          if (imageUrl && imageUrl.length > 0) {
            result['imageUrl'] = imageUrl[0].src.trim();
          }
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-price-container');
      if (priceContainer && priceContainer.length > 0) {
        let comparePrice = priceContainer.find('.listPrice');
        let currentPrice = priceContainer.find('.salePrice');
        let noSale = priceContainer.find('.Price');
        if (comparePrice && comparePrice.length > 0) {
          // On sale
          comparePrice = comparePrice.find('.ada-link.visually-hidden');
          if (comparePrice && comparePrice.length > 0) {
            result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          if (currentPrice && currentPrice.length > 0) {
            currentPrice = currentPrice.find('.ada-link.visually-hidden');
            if (currentPrice && currentPrice.length > 0) {
              result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            }
          }
        } else if (noSale && noSale.length > 0) {
          // Not on sale
          noSale = noSale.find('.ada-link.visually-hidden');
          if (noSale && noSale.length > 0) {
            result['currentPrice'] = parseFloat(noSale[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Michael Kors (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-name-container > a');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Michael Kors';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.product-image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.Price > .ada-link > .ada-link:not(.visually-hidden)');
      let currentPrice = element.querySelector('.salePrice > .ada-link > .ada-link:not(.visually-hidden)');
      let retailPrice = element.querySelector('.listPrice > .ada-link > .ada-link:not(.visually-hidden)');

      if (currentPrice) {
        // On sale
        currentPrice = currentPrice.textContent.split('-');
        if (currentPrice && currentPrice.length > 0) {
          result['currentPrice'] = parseFloat(currentPrice[0].replace(/[^0-9\.]/g, ""));
        }
        if (retailPrice) {
          retailPrice = retailPrice.textContent.split('-');
          if (retailPrice && retailPrice.length > 0) {
            result['retailPrice'] = parseFloat(retailPrice[retailPrice.length - 1].replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (price) {
        // Not on sale
        price = price.textContent.split('-');
        if (price && price.length > 0) {
          result['retailPrice'] = parseFloat(price[price.length - 1].replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.querySelector('.image-panel > a');
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
