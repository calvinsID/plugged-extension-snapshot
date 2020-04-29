import Merchant from './merchant.js';
import $ from 'jquery';

export default class LittleBurgundy extends Merchant {
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
      merchant: 'Little Burgundy',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#detailProductName');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      let brandName = $('#detailBrand');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('a');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName[0].innerText.trim(); 
        }
      }

      // Colour

      // Image
      let imageUrl = $('#detailFullImageWrap');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('#productPrice');
      if (priceContainer && priceContainer.length > 0) {
        let retailPrice = priceContainer.find('.original-price');
        let currentPrice = priceContainer.find('.sale-price');
        let noSale = priceContainer.find('span.price');

        if (noSale && noSale.length > 0) {
          // Not on sale
          result['retailPrice'] = parseFloat(noSale[0].innerText.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        } else if (retailPrice && retailPrice.length > 0) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Little Burgundy',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-info > [itemprop=name]');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.product-info > [itemprop=brand]');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.feature-image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.price-wrap > .sale-price');
      let retailPrice = element.querySelector('.price-wrap > .original-price');
      let price = element.querySelector('.price-wrap > .regular-price');

      if (currentPrice) {
        // On sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (retailPrice) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.item-link');
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
