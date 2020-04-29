import Merchant from './merchant.js';
import $ from 'jquery';

export default class JcrewCa extends Merchant {
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
      merchant: 'J.Crew (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product__name');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('img.product__image--hero');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src.trim();
      }

      // Sizes

      // Prices
      let priceContainer = $('.product__price');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.sale-price');
        let retailPrice = priceContainer.find('.is-price');

        if (currentPrice && currentPrice.length > 0 && currentPrice[0].innerText.trim()) {
          // On sale
          if (retailPrice && retailPrice.length > 0 && retailPrice[0].innerText.trim()) {
            result['retailPrice'] = parseFloat(retailPrice[0].innerText.split('-')[retailPrice[0].innerText.split('-').length - 1].replace(/[^0-9\.]/g, ""));
          }
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.split('-')[0].replace(/[^0-9\.]/g, ""));
        } else if (retailPrice && retailPrice.length > 0 && retailPrice[0].innerText.trim()) {
          // Not on sale
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.split('-')[retailPrice[0].innerText.split('-').length - 1].replace(/[^0-9\.]/g, ""));
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
      merchant: 'J.Crew (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.tile__detail--name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.js-product__image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.tile__detail--price > .tile__detail--price--list');
      let retailPrice = element.querySelector('.tile__detail--price--was > .strikethrough-price');
      let currentPrice = element.querySelector('.tile__detail--price--sale > .is-price');
      let currentPrice2 = element.querySelector('.tile__detail--price--sale--old > .is-price');

      if (retailPrice && retailPrice.textContent) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.split('–')[retailPrice.textContent.split('–').length - 1].replace(/[^0-9\.]/g, ""));
        if (currentPrice && currentPrice.textContent) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.split('–')[0].replace(/[^0-9\.]/g, ""));
        } else if (currentPrice2 && currentPrice2.textContent) {
          result['currentPrice'] = parseFloat(currentPrice2.textContent.split('–')[0].replace(/[^0-9\.]/g, ""));
        }
      } else if (price && price.textContent) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.textContent.split('–')[0].replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.product-tile__link');
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
