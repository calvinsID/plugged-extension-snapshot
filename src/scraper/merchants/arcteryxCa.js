import Merchant from './merchant.js';
import $ from 'jquery';

export default class ArcteryxCa extends Merchant {
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
      merchant: 'Arcteryx (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product__need-to-know__purchase-info');
      if (productName && productName.length > 0) {
        productName = productName.find('[itemprop=name]');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      result['brandName'] = 'Arcteryx';

      // Colour

      // Image
      let imageUrl = $('.product__need-to-know__hero-image');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('.product-image > figure > img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes

      // Prices
      let price = $('.product__need-to-know__purchase-info');
      if (price && price.length > 0) {
        price = price.find('.product-price');
        if (price && price.length > 0 && price[0].innerText) {
          if (price && price[0].innerText.toLowerCase().indexOf('cad') !== -1) {
            result['currentPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Arcteryx (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-tile__name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Arcteryx';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-tile__main-image > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.product-tile__price');
      if (price && price.textContent && price.textContent.toLowerCase().indexOf('cad') !== -1) {
        result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.product-tile__product-link');
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
