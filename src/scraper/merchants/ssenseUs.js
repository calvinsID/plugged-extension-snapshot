import Merchant from './merchant.js';
import $ from 'jquery';

export default class SsenseUs extends Merchant {
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
      merchant: 'SSENSE (US)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-name');
      if (productName && productName.length > 0) {
        result['productName'] = productName.text();
      }

      // Brand Name
      let brandName = $('.product-brand');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('a');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName.text();
        }
      }

      // Colour

      // Image
      let imageUrl = $('img.product-detail.lazyloaded');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].currentSrc;
        if (!imageUrl[0].currentSrc) {
          result['imageUrl'] = imageUrl[0].srcset;
        }
      }

      // Sizes
      function removeDecoration(size) {
        size = size.split('_')
        return size[0];
      }

      let options = $('select.vspace2');
      if (options && options.length > 0) {
        options = options.find('option');
        for (let i = 1; i < options.length; i++) {
          result['sizes'].push(removeDecoration(options[i].value.trim()));
        }
      }

      // Prices
      let price = $('h3.price');
      if (price && price.length > 0) {
        price = price.find('span.price');
        if (price && price.length > 1) {
          // On sale
          result['retailPrice'] = parseFloat(price[0].innerHTML.trim().substring(1, price[0].innerHTML.length - 4).replace(',', ''));
          result['currentPrice'] = parseFloat(price[1].innerHTML.trim().substring(1, price[1].innerHTML.length - 4).replace(',', ''));
        } else if (price && price.length > 0) {
          // Not on sale
          result['retailPrice'] = parseFloat(price[0].innerHTML.trim().substring(1, price[0].innerHTML.length - 4).replace(',', ''));
          result['currentPrice'] = parseFloat(price[0].innerHTML.trim().substring(1, price[0].innerHTML.length - 4).replace(',', ''));
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
      merchant: 'SSENSE (US)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-name-plp');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.browsing-product-description');
      if (brandName) {
        brandName = brandName.querySelector('.bold');
        if (brandName) {
          result['brandName'] = brandName.textContent.trim();
        }
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.image-container');
      if (imageUrlContainer) {
        let imageUrlList = imageUrlContainer.querySelector('source');
        if (imageUrlList) {
          result.imageUrl = imageUrlList.srcset.trim();
        }
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('p.price');
      if (priceButton) {
        let price = priceButton.querySelectorAll('span.price');
        let salePrice = priceButton.querySelector('.highlight');
        if (price && price.length > 1) {
          // On sale
          result['retailPrice'] = parseFloat(price[0].innerHTML.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = parseFloat(price[1].innerHTML.replace(/[^0-9\.]/g, ""));
        } else if (price && price.length > 0) {
          // Not on sale
          result['retailPrice'] = parseFloat(price[0].innerHTML.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = parseFloat(price[0].innerHTML.replace(/[^0-9\.]/g, ""));
        }
      }

      // Url
      let url = element.querySelector('a');
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
