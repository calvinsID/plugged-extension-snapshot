import Merchant from './merchant.js';
import $ from 'jquery';

export default class MangoCa extends Merchant {
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
      merchant: 'Mango (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.product-name');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Mango';

      // Colour

      // Image
      let imageUrl = $('#renderedImages');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.image-js');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-prices');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.product-sale--discount');
        let retailPrice = priceContainer.find('.product-sale--cross');
        let noSale = priceContainer.find('.product-sale');

        if (currentPrice && currentPrice.length > 0) {
          // On sale
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (retailPrice && retailPrice.length > 0) {
            result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          } else {
            result['retailPrice'] = result['currentPrice'];
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
      merchant: 'Mango (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.sg-text-body-small');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Mango';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.swiper-slide-active > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.sg-body-small.B16Le');
      let retailPrice = element.querySelector('.sg-body-small.tAcLx');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice) {
        // Not on sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
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
