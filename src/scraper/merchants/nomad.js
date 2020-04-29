import Merchant from './merchant.js';
import $ from 'jquery';

export default class Nomad extends Merchant {
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
      merchant: 'Nomad',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.product__title');
      if (productName && productName.length > 0) {
        result['productName'] = productName.text();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('img[data-product-featured-image]');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].currentSrc;
      }

      // Sizes
      let options = $('div.product__form');
      if (options && options.length > 0) {
        options = $('div.product__selectors');
        if (options && options.length > 0) {
          options = options.find('select[data-index=option1]');
          if (options && options.length > 0) {
            options = options.find('option');
            if (options && options.length > 0) {
              for (let i = 0; i < options.length; i++) {
                result['sizes'].push(options[i].value.trim());
              }
            }
          }
        }
      }

      // Prices
      let price = $('div.product__price');
      if (price && price.length > 0) {
        let salePrice = price.find('span.product__price--sale');
        if (salePrice && salePrice.length > 0) {
          // On sale
          result['currentPrice'] = parseFloat(salePrice[0].innerHTML.replace(/[^0-9\.]/g, ""));
          salePrice = price.find('.product__price--strike');
          if (salePrice && salePrice.length > 0) {
            result['retailPrice'] = parseFloat(salePrice[0].innerHTML.replace(/[^0-9\.]/g, ""));
          }
        } else {
          // Not on sale
          price = price.find('span[data-product-price]');
          if (price && price.length > 0) {
            result['retailPrice'] = parseFloat(price[0].innerHTML.replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = parseFloat(price[0].innerHTML.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Nomad',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-information');
      if (productName) {
        productName = productName.querySelector('.title');
        if (productName) {
          result['productName'] = productName.textContent.trim();
        }
      }

      // Brand Name
      let brandName = element.querySelector('.product-information');
      if (brandName) {
        brandName = brandName.querySelector('.vendor');
        if (brandName) {
          result['brandName'] = brandName.textContent.trim();
        }
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-item__image ');
      if (imageUrlContainer) {
        let imageUrlList = imageUrlContainer.querySelector('img');
        if (imageUrlList) {
          result.imageUrl = imageUrlList.currentSrc.trim();
        }
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('.product-information');
      if (priceButton) {
        let price = priceButton.querySelector('span.price');
        if (price) {
          let retailPrice = price.querySelector('.old-price');
          if (retailPrice) {
            // On sale
            result['retailPrice'] = parseFloat(retailPrice.innerText.replace(/[^0-9\.]/g, ""));
            let currentPrice = price.innerText.split('$');
            if (currentPrice.length > 2) {
              result['currentPrice'] = parseFloat(currentPrice[2].replace(/[^0-9\.]/g, ""));
            }
          } else {
            result['currentPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
            result['retailPrice'] = result['currentPrice'];
          }
        }
      }

      // Url
      let url = element.querySelector('a.product-link');
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
