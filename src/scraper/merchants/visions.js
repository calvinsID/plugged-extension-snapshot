import Merchant from './merchant.js';
import $ from 'jquery';

export default class Visions extends Merchant {
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
      merchant: 'Visions',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#detailview-right-container');
      if (productName && productName.length > 0) {
        productName = productName[0].firstChild;
        if (productName) {
          productName = productName.nextElementSibling;
          if (productName) {
            result['productName'] = productName.innerText.trim();
          }
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('img.prodimg-lg');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src;
      }

      // Sizes

      // Prices
      let retailPrice = $('#ContentPlaceHolder1_ctrlProductDetailUC_lblStrikeRegPrice');
      let currentPrice = $('#ContentPlaceHolder1_ctrlProductDetailUC_lblSalePrice');

      if (retailPrice && retailPrice.length > 0 && retailPrice[0].textContent && retailPrice[0].textContent.trim()) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice[0].textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice && currentPrice.length > 0) {
          result['currentPrice'] = parseFloat(currentPrice[0].textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice && currentPrice.length > 0) {
        // Not on sale
        result['currentPrice'] = parseFloat(currentPrice[0].textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
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
      merchant: 'Visions',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.prodlist-title > a');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }
      if (!result['productName']) {
        productName = element.querySelector('.description-lg');
        if (productName) {
          result['productName'] = productName.innerText.trim();
        } else {
          productName = element.querySelector('.description');
          if (productName) {
            result['productName'] = productName.innerText.trim();
          }
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.prodlist-img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }
      if (!result['imageUrl']) {
        imageUrlContainer = element.querySelector('img.thumb-large');
        if (imageUrlContainer) {
          result['imageUrl'] = imageUrlContainer.src;
        } else {
          imageUrlContainer = element.querySelector('img.thumb-small');
          if (imageUrlContainer) {
            result['imageUrl'] = imageUrlContainer.src;
          }
        }
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.pricingtag-leftcell');
      let retailPrice = element.querySelector('.prodlist-strikeprice');
      let price = element.querySelector('.prodlist-saletag2-box');
      let price2 = element.querySelector('.prodlist-regprice');
      let price3 = element.querySelector('.inner-topbox');

      if (retailPrice && retailPrice.textContent && retailPrice.textContent.trim()) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice && currentPrice.textContent) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price && price.textContent && price.textContent.trim()) {
        // Not on sale
        result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      } else if (price2 && price2.textContent && price2.textContent.trim()) {
        // Not on sale
        result['currentPrice'] = parseFloat(price2.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      } else if (price3 && price3.textContent && price3.textContent.trim()) {
        // Not on sale
        result['currentPrice'] = parseFloat(price3.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('.prodlist-title > a');
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
