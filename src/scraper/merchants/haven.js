import Merchant from './merchant.js';
import $ from 'jquery';

export default class Haven extends Merchant {
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
      merchant: 'Haven',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1[itemprop=name]');

      if (productName) {
        result['productName'] = productName.text();
      }

      // Brand Name
      let brandName = $('p.product-heading-vendor');
      if (brandName) {
        brandName = brandName.find('a');
        if (brandName) {
          result['brandName'] = brandName[0].text.trim();

          let updatedProductName = result['brandName'] + ' ' + result['productName'];
          result['productName'] = updatedProductName;
        }
      }

      // Colour

      // Image
      let imageUrl = $('div#slide-1');
      imageUrl = imageUrl.find('img');

      if (imageUrl[0] && imageUrl[0].src) {
        result['imageUrl'] = imageUrl[0].src
      }

      // Sizes
      function removeTextDecoration(size) {
        if (size.includes("- LAST ONE")) {
          return size.substring(0, size.length - 10);
        }
        if (size.includes("- SOLD OUT")) {
          return size.substring(0, size.length - 11);
        }
        return size;
      }

      let options = $('select#product-select');
      options = options.find('option');
      if (options) {
        for (let i = 1; i < options.length; i++) {
          result['sizes'].push(removeTextDecoration(options[i].innerHTML.trim()).trim());
        }
      }

      // Prices
      let price = $('span.price-main');
      
      if (price.length > 0) {
        // Not on sale
        result['retailPrice'] = parseFloat(price[0].innerHTML.substring(1, price[0].innerHTML.length - 4).replace(',', ''));
        result['currentPrice'] = parseFloat(price[0].innerHTML.substring(1, price[0].innerHTML.length - 4).replace(',', ''));
      } else {
        // On sale
        price = $('div.price-main');
        if (price) {
          let retailPrice = price.find('del');
          if (retailPrice) {
            result['retailPrice'] = parseFloat(retailPrice[0].innerHTML.substring(1).replace(',', ''));
          }
          let salePrice = price.find('span.highlight');
          if (salePrice) {
            result['currentPrice'] = parseFloat(salePrice[0].innerHTML.substring(1).replace(',', ''));
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
      merchant: 'Haven',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-card-name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.product-card-brand');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-image-wrapper');
      if (imageUrlContainer) {
        let imageUrlList = imageUrlContainer.querySelector('img.loaded');
        if (imageUrlList) {
          result.imageUrl = imageUrlList.src.trim();
        }
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('.product-price');
      if (priceButton) {
        let salePrice = priceButton.querySelector('.highlight');
        if (salePrice) {
          // On sale
          result['currentPrice'] = parseFloat(salePrice.innerText.replace(/[^0-9\.]/g, ""));
          let regularPrice = priceButton.querySelector('del');
          if (regularPrice) {
            result['retailPrice'] = parseFloat(regularPrice.innerText.replace(/[^0-9\.]/g, ""));
          }
        } else {
          // Not on sale
          result['currentPrice'] = parseFloat(priceButton.innerText.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
        }
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
