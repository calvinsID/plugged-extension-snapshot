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
      merchant: 'Influenceu (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.detailsRightBlock');
      if (productName && productName.length > 0) {
        productName = productName.find('.prodTitle');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      let brandName = $('.detailsRightBlock');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('.prodBrand');
        if (brandName && brandName.length > 0) {
          brandName = brandName.find('a');
          if (brandName && brandName.length > 0) {
            result['brandName'] = brandName[0].innerText.trim();
          }
        }
      }

      // Colour

      // Image
      let imageUrl = $('img#productImage');
      if (imageUrl && imageUrl.length > 0) {
        if (imageUrl[0].src.trim()) {
          result['imageUrl'] = imageUrl[0].src.trim();
        } else {
          result['imageUrl'] = imageUrl[0].getAttribute('data-src').trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.detailsRightBlock');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('meta[itemprop=price]');
        let retailPrice = priceContainer.find('.prodActualPrice');
  
        if (retailPrice && retailPrice.length > 0) {
          retailPrice = retailPrice.find('s');
          if (retailPrice && retailPrice.length > 0) {
            // On sale
            result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            if (currentPrice && currentPrice.length > 0) {
              result['currentPrice'] = parseFloat(currentPrice[0].getAttribute('content').replace(/[^0-9\.]/g, ""));
            }
          } else if (currentPrice && currentPrice.length > 0) {
            // Not on sale
            result['retailPrice'] = parseFloat(currentPrice[0].getAttribute('content').replace(/[^0-9\.]/g, ""));
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
      merchant: 'Influenceu (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.productTitle');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.productBrand');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.productImg > picture > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.prodItemPrice');
      let retailPrice = element.querySelector('.prodItemPrice > s');
      let currentPrice = element.querySelector('.prodItemPrice > .sale_price');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.productLink');
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
