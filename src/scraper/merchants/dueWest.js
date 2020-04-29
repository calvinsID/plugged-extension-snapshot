import Merchant from './merchant.js';
import $ from 'jquery';

export default class DueWest extends Merchant {
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
      merchant: 'Due West',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product_name');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.image__container');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let productSection = $('.product_section');
      if (productSection && productSection.length > 0) {
        let currentPrice = productSection.find('.current_price');
        let retailPrice = productSection.find('.was_price');
  
        if (retailPrice && retailPrice.length > 0 && retailPrice[0].innerText) {
          // On sale
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        } else if (currentPrice && currentPrice.length > 0) {
          // Not on sale
          result['retailPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
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
      merchant: 'Due West',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('[itemprop=name]');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.image__container');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img');
        if (imageUrlContainer) {
          result.imageUrl = imageUrlContainer.src.trim();
        }
      }

      // Sizes

      // Prices
      let sale = element.querySelector('.price.sale');
      let price = element.querySelector('span.money');
      if (sale) {
        // On sale
        let currentPrice = sale.querySelector('meta[itemprop=price]');
        let regularPrice = sale.querySelector('.was_price');
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.getAttribute('content').replace(/[^0-9\.]/g, ""));
        }
        if (regularPrice) {
          regularPrice = regularPrice.querySelector('.money');
          if (regularPrice) {
            result['retailPrice'] = parseFloat(regularPrice.textContent.replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (price) {
        result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a[itemprop=url]');
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
