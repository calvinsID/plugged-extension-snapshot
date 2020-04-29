import Merchant from './merchant.js';
import $ from 'jquery';

export default class TheBay extends Merchant {
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
      merchant: 'The Bay',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-overview');
      if (productName && productName.length > 0) {
        productName = productName.find('h1');
        if (productName && productName.length > 0) {
          result['productName'] = productName.text().trim();
        }
      }

      // Brand Name
      let brandName = $('article.product');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('.product-overview__brand-link');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName.text().trim();
        }
      }

      // Colour

      // Image
      let imageUrl = $('#zoom-view');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-pricing__container');
      if (priceContainer && priceContainer.length > 0) {
        let price = priceContainer.find('#regularPrice');
        let currentPrice = priceContainer.find('#salePrice');

        if (price && price.length > 0) {
          // On sale
          price = price.find('span');
          if (price && price.length > 2) {
            result['retailPrice'] = parseFloat(price[2].innerText.replace(/[^0-9\.]/g, ""));
          }
          if (currentPrice && currentPrice.length > 0) {
            if (currentPrice[0].textContent.indexOf('-') !== -1) {
              result['currentPrice'] = parseFloat(currentPrice[0].textContent.split('-')[0].replace(/[^0-9\.]/g, ""));
            } else {
              result['currentPrice'] = parseFloat(currentPrice[0].textContent.substring(4).replace(/[^0-9\.]/g, ""));
            }
          }
        } else {
          // Not on sale
          if (currentPrice && currentPrice.length > 0) {
            if (currentPrice[0].textContent.indexOf('-') !== -1 && currentPrice[0].textContent.split('-').length > 1) {
              result['currentPrice'] = parseFloat(currentPrice[0].textContent.split('-')[0].replace(/[^0-9\.]/g, ""));
              result['retailPrice'] = parseFloat(currentPrice[0].textContent.split('-')[1].replace(/[^0-9\.]/g, ""));
            } else {
              result['currentPrice'] = parseFloat(currentPrice[0].textContent.substring(4).replace(',', ''));
              result['retailPrice'] = result['currentPrice'];
            }
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
      merchant: 'The Bay',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('p.product-description');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.product-designer-name');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.pa-product-large');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.product-price');
      let currentPrice = element.querySelector('.product-sale-price');

      if (currentPrice) {
        // On sale
        if (currentPrice.innerText.indexOf('-') !== -1) {
          result['currentPrice'] = parseFloat(currentPrice.innerText.split('-')[0].replace(/[^0-9\.]/g, ""));
        } else {
          result['currentPrice'] = parseFloat(currentPrice.innerText.replace(/[^0-9\.]/g, ""));
        }
        if (price) {
          result['retailPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
        } else if (currentPrice.innerText.split('-').length > 1) {
          result['retailPrice'] = parseFloat(currentPrice.innerText.split('-')[1].replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        if (price.innerText.indexOf('-') !== -1) {
          if (price.innerText.split('-').length > 1) {
            result['currentPrice'] = parseFloat(price.innerText.split('-')[0].replace(/[^0-9\.]/g, ""));
            result['retailPrice'] = parseFloat(price.innerText.split('-')[1].replace(/[^0-9\.]/g, ""));
          }
        } else {
          result['currentPrice'] = parseFloat(price.innerText.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
        }
      }

      // Url
      let url = element.querySelector('a.mainBlackText');
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
