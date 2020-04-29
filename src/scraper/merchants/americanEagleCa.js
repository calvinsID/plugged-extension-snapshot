import Merchant from './merchant.js';
import $ from 'jquery';

export default class AmericanEagleCa extends Merchant {
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
      merchant: 'American Eagle (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-name');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.zooming-image.qa-zooming-image.image.lazyload');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src;
      }

      // Sizes

      // Prices
      let priceSection = $('.qa-product-prices');
      if (priceSection && priceSection.length > 0) {
        let price = priceSection.find('.product-sale-price');
        let comparePrice = priceSection.find('.product-list-price-on-sale');
        let noSale = priceSection.find('.product-list-price-without-sale');
  
        if (comparePrice && comparePrice.length > 0) {
          // On sale
          if (price && price.length > 0) {
            result['currentPrice'] = parseFloat(price[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'American Eagle (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-tile-image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('.qa-product-prices');
      if (priceButton) {
        let regularPrice = priceButton.querySelector('.product-list-price');
        let comparePrice = priceButton.querySelector('.product-sale-price');

        if (comparePrice) {
          // On sale
          result['currentPrice'] = parseFloat(comparePrice.textContent.replace(/[^0-9\.]/g, ""));
          if (regularPrice) {
            result['retailPrice'] = parseFloat(regularPrice.textContent.replace(/[^0-9\.]/g, ""));
          }
        } else if (regularPrice) {
          // Not on sale
          result['retailPrice'] = parseFloat(regularPrice.textContent.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.querySelector('a.xm-link-to');
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
