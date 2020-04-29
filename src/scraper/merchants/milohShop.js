import Merchant from './merchant.js';
import $ from 'jquery';

export default class MilohShop extends Merchant {
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
      merchant: "Miloh Shop",
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#productInfo-product');
      if (productName && productName.length > 0) {
        productName = productName.find('h1[itemprop=name]')
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      let brandName = result['productName'].split(' - ');
      if (brandName.length > 0) {
        result['brandName'] = brandName[0].trim();
      }

      // Colour

      // Image
      let imageUrl = $('#ProductPhoto-product');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('.slick-active');
        if (imageUrl && imageUrl.length > 0) {
          imageUrl = imageUrl.find('img.ProductImg-product');
          if (imageUrl && imageUrl.length > 0) {
            result['imageUrl'] = imageUrl[0].src.trim();
          }
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('#productInfo-product');
      if (priceContainer && priceContainer.length > 0) {
        let comparePrice = priceContainer.find('#ComparePriceWrapper-product');
        let currentPrice = priceContainer.find('#ProductPrice-product');
        if (comparePrice && comparePrice.length > 0 && comparePrice[0].style.display !== 'none') {
          // On sale
          comparePrice = comparePrice.find('#ComparePrice-product');
          if (comparePrice && comparePrice.length > 0) {
            result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          if (currentPrice && currentPrice.length > 0) {
            currentPrice = currentPrice.find('span.money');
            if (currentPrice && currentPrice.length > 0) {
              result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            }
          }
        } else if (currentPrice && currentPrice.length > 0) {
          // Not on sale
          currentPrice = currentPrice.find('span.money');
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Miloh Shop',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.name_wrapper');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('a.grid__image > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.price > span.money');
      let retailPrice = element.querySelector('.compare-at > span.money');
      let currentPrice = element.querySelector('.on-sale > span.money');

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
      let url = element.querySelector('a.grid__image');
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
