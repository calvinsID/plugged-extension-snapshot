import Merchant from './merchant.js';
import $ from 'jquery';

export default class MooseKnuckles extends Merchant {
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
      merchant: "Moose Knuckles",
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('[data-ui-id=page-title-wrapper]');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Moose Knuckles';

      // Colour

      // Image
      let imageUrl = $('.fotorama__active.fotorama__loaded--img');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.fotorama__img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-info-price');
      if (priceContainer && priceContainer.length > 0) {
        let comparePrice = priceContainer.find('.old-price');
        let currentPrice = priceContainer.find('.special-price');
        let noSale = priceContainer.find('.price-container.price-final_price');
        if (comparePrice && comparePrice.length > 0) {
          // On sale
          comparePrice = comparePrice.find('span.price');
          if (comparePrice && comparePrice.length > 0) {
            result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          if (currentPrice && currentPrice.length > 0) {
            currentPrice = currentPrice.find('span.price');
            if (currentPrice && currentPrice.length > 0) {
              result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            }
          }
        } else if (noSale && noSale.length > 0) {
          // Not on sale
          noSale = noSale.find('span.price');
          if (noSale && noSale.length > 0) {
            result['currentPrice'] = parseFloat(noSale[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Moose Knuckles',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('a.product-item-link');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Moose Knuckles';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.product-image-photo');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('[data-price-type=finalPrice]');
      let retailPrice = element.querySelector('[data-price-type=oldPrice]');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice) {
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.product-item-photo');
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
