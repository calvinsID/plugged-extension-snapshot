import Merchant from './merchant.js';
import $ from 'jquery';

export default class EndCa extends Merchant {
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
      merchant: 'End (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('span[data-test=ProductDetails__Title]');
      if (productName && productName.length > 0) {
        result['productName'] = productName.text();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('div[data-test=Gallery__Images]');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('.sc-1i8wfdy-0');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes
      let options = $('div[data-testid=Size__List]');
      if (options && options.length > 0) {
        options = options.find('div[data-testid=Size__Button]');
        if (options && options.length > 0) {
          for (let i = 0; i < options.length; i++) {
            result['sizes'].push(options[i].innerHTML.trim());
          }
        }
      }

      // Prices
      let price = $('div[data-test=ProductDetails__Price]');
      if (price && price.length > 0) {
        let comparePrice = price.find('span');
        let currentPrice = price.find('span[data-test=PDP__Details__FinalPrice]');
        if (comparePrice.length > 0 && currentPrice.length > 0) {
          if (parseFloat(comparePrice[0].innerHTML.replace(/[^0-9\.]/g, "")) !== parseFloat(currentPrice[0].innerHTML.replace(/[^0-9\.]/g, ""))) {
            // On sale
            result['retailPrice'] = parseFloat(comparePrice[0].innerHTML.replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = parseFloat(currentPrice[0].innerHTML.replace(/[^0-9\.]/g, ""));
          } else {
            // Not on sale
            result['retailPrice'] = parseFloat(currentPrice[0].innerHTML.replace(/[^0-9\.]/g, ""));
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
      merchant: 'End (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('[data-test=ProductCard__PlpName]');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('[data-test=ProductCard__PlpImage]');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let regularPrice = element.querySelector('[data-test=ProductCard__ProductFullPrice]');
      let currentPrice = element.querySelector('[data-test=ProductCard__ProductFinalPrice]');

      if (regularPrice) {
        // On sale
        result['retailPrice'] = parseFloat(regularPrice.innerText.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.innerText.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice) {
        // Not on sale
        result['currentPrice'] = parseFloat(currentPrice.innerText.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      result['url'] = element.href;

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
