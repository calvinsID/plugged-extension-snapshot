import Merchant from './merchant.js';
import $ from 'jquery';

export default class OffTheHook extends Merchant {
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
      merchant: 'Off The Hook',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.product-title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      let brandName = $('.brand-and-type');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('.brand');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName[0].innerText.trim();
        }
      }

      // Colour

      // Image
      let imageUrl = $('.product-gallery');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.main-img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let price = $('#price');
      if (price && price.length > 0) {
        let oldPrice = price.find('del');
        if (oldPrice && oldPrice.length > 0) {
          // On sale
          result['retailPrice'] = parseFloat(oldPrice[0].innerText.replace(/[^0-9\.]/g, ""));

          let priceInfo = price[0].innerText.split(' ');
          if (priceInfo.length > 0) {
            result['currentPrice'] = parseFloat(priceInfo[priceInfo.length - 1].replace(/[^0-9\.]/g, ""));
          }
        } else {
          // Not on sale
          let internationalPrice = price.find('span.money');
          if (internationalPrice && internationalPrice.length > 0) {
            result['retailPrice'] = parseFloat(internationalPrice[0].getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = result['retailPrice'];
          } else {
            result['retailPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Off The Hook',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('a.title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('a.brand');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.image > .inner > a > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.price > .amount > .money');
      let retailPrice = element.querySelector('.price > del > .money');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice) {
        // Not on sale
        result['currentPrice'] = parseFloat(currentPrice.getAttribute('data-currency-cad').replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.title');
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
