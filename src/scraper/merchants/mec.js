import Merchant from './merchant.js';
import $ from 'jquery';

export default class Mec extends Merchant {
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
      merchant: "MEC",
      scrapedWithoutErrors: true
    }

    try {
      let productData = $('.js-react-component.product__promo');
      if (productData && productData.length > 0) {
        productData = JSON.parse(productData[0].getAttribute('data-mec-react-data'));

        // Product Name
        result['productName'] = productData.name;

        // Brand Name
        result['brandName'] = productData.manufacturer;

        // Colour

        // Image
        if (productData.mediaGallery && productData.mediaGallery.length > 0) {
          if (productData.mediaGallery[0].media) {
            if (productData.mediaGallery[0].media.highRes) {
              result['imageUrl'] = productData.mediaGallery[0].media.highRes;
            } else if (productData.mediaGallery[0].media.fallback) {
              result['imageUrl'] = productData.mediaGallery[0].media.fallback;
            }
          }
        }

        // Sizes

        // Prices
        let prices = productData.mecPrice;
        if (prices) {
          let lowRange = prices.lowPrice;
          let highRange = prices.highPrice;
          let regPrice = prices.price;

          if (lowRange && lowRange.value) {
            // Price ranges depending on style
            result['currentPrice'] = parseFloat(lowRange.value);
            if (highRange && highRange.value) {
              result['retailPrice'] = parseFloat(highRange.value);
            }
          } else if (regPrice && regPrice.value) {
            result['currentPrice'] = parseFloat(regPrice.value);
            if (regPrice.originalPrice && regPrice.originalPrice.value) {
              result['retailPrice'] = parseFloat(regPrice.originalPrice.value);
            } else {
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
      merchant: 'MEC',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('a.product__name__link');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.fluid-image__content');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let prices = element.querySelector('li.price:not(.price--original)');
      let retailPrice = element.querySelector('li.price.price--original');

      if (prices && prices.childNodes && prices.childNodes.length > 0) {
        prices = prices.childNodes[prices.childNodes.length - 1].textContent;
        if (prices) {
          prices = prices.split('–');
          if (prices && prices.length > 0) {
            result['currentPrice'] = parseFloat(prices[0].replace(/[^0-9\.]/g, ""));
            result['retailPrice'] = parseFloat(prices[prices.length - 1].replace(/[^0-9\.]/g, ""));
          }
        }
        if (retailPrice) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      }

      // Url
      let url = element.querySelector('a.product__image-wrapper');
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
