import Merchant from './merchant.js';
import $ from 'jquery';

export default class BricksAndBonds extends Merchant {
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
      merchant: 'Bricks And Bonds',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.summary-top.clearfix');
      if (productName && productName.length > 0) {
        productName = productName.parent();
        if (productName && productName.length > 0) {
          productName = productName.parent().find('.summary > h2');
          if (productName && productName.length > 0) {
            result['productName'] = productName[0].innerText.trim();
          }
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('#product-img-slider');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = $('ul.slides');
        if (imageUrl && imageUrl.length > 0) {
          imageUrl = imageUrl.find('a#Zoomer');
          if (imageUrl && imageUrl.length > 0) {
            result['imageUrl'] = imageUrl[0].href.trim();
          }
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.summary-top.clearfix');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('#Product_FormattedPrice');
        let retailPrice = priceContainer.find('#Product_FormattedRegularPrice');
        if (retailPrice && retailPrice.length > 0 && retailPrice[0].innerText.trim()) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (currentPrice && currentPrice.length > 0) {
          // Not on sale
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Bricks And Bonds',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-details');
      if (productName) {
        productName = productName.querySelectorAll('h3');
        if (productName && productName.length > 2) {
          result['productName'] = productName[2].textContent.trim();
        }
      }

      // Brand Name
      let brandName = element.querySelector('.product-details');
      if (brandName) {
        brandName = brandName.querySelectorAll('h3');
        if (brandName && brandName.length > 2) {
          result['brandName'] = brandName[1].textContent.trim();
        }
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-image > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.price > .amount');
      if (price) {
        let oldPrice = price.querySelector('del > span');
        if (oldPrice && oldPrice.textContent) {
          // On sale
          result['retailPrice'] = parseFloat(oldPrice.textContent.replace(/[^0-9\.]/g, ""));
          price = price.textContent.split('CAD');
          if (price && price.length > 0) {
            result['currentPrice'] = parseFloat(price[0].replace(/[^0-9\.]/g, ""));
          }
        } else {
          result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
        }
      }

      // Url
      let url = element.querySelector('.product-transition-fade > a');
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
