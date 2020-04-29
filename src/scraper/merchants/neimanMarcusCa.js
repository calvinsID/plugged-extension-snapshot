import Merchant from './merchant.js';
import $ from 'jquery';
import { parse } from 'qs';

export default class NeimanMarcusCa extends Merchant {
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
      merchant: "Neiman Marcus (CA)",
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-name');
      if (productName && productName.length > 0) {
        productName = productName.find('span:not([class])');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      let brandName = $('.product-name');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('a');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName[0].innerText.trim();
        }
      }

      // Colour

      // Image
      let imageUrl = $('.img-wrap.slick-slide');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-details-source');
      if (priceContainer && priceContainer.length > 0) {
        let comparePrice = priceContainer.find('.lbl_ItemPriceSingleItem');
        let salePrices = priceContainer.find('.price-adornments-elim-suites');

        if (comparePrice && comparePrice.length > 0 && comparePrice[0].innerText.indexOf('CAD') !== -1) {
          // Not on sale
          result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        } else if (salePrices && salePrices.length > 0) {
          // On sale
          salePrices = salePrices.find('span.item-price');
          if (salePrices && salePrices.length > 1 && salePrices[0].innerText.indexOf('CAD') !== -1) {
            result['retailPrice'] = parseFloat(salePrices[0].innerText.replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = parseFloat(salePrices[1].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Neiman Marcus (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.productname > h2');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.productdesigner');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.product-thumbnail-image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.product-price');
      let retailPrice = element.querySelector('.product-price > .price-adornment.strikethrough > .price');
      let currentPrice = element.querySelector('.product-price > .price-adornment:not(.strikethrough) > .price');

      if (currentPrice && currentPrice.textContent && currentPrice.textContent.indexOf('CAD') !== -1) {
        // On sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (retailPrice) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price && price.textContent && price.textContent.indexOf('CAD') !== -1) {
        // Not on sale
        result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.product-thumbnail-image');
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
