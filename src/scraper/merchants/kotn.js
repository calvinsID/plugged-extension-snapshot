import Merchant from './merchant.js';
import $ from 'jquery';

export default class Kotn extends Merchant {
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
      merchant: 'Kotn',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('[itemprop=offers]');
      if (productName && productName.length > 0) {
        productName = productName.find('header > h1');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      result['brandName'] = 'Kotn';

      // Colour

      // Image
      let imageUrl = $('img.product-image.active');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src.trim();
      }

      // Sizes

      // Prices
      let priceContainer = $('[itemprop=offers]');
      if (priceContainer && priceContainer.length > 0) {
        let comparePrice = priceContainer.find('#compareAtPrice');
        let price = priceContainer.find('.currentPrice');

        if (comparePrice && comparePrice.length > 0 && comparePrice[0].textContent) {
          // On sale
          result['retailPrice'] = parseFloat(comparePrice[0].textContent.replace(/[^0-9\.]/g, ""));
          if (price && price.length > 0) {
            result['currentPrice'] = parseFloat(price[0].textContent.replace(/[^0-9\.]/g, ""));
          }
        } else if (price && price.length > 0 && price[0].textContent) {
          result['retailPrice'] = parseFloat(price[0].textContent.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }

        if (result['retailPrice'] === parseFloat(0)) {
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
      merchant: 'Kotn',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.productCard-info');
      if (productName) {
        productName = productName.querySelectorAll('.lh-copy');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].textContent;
        }
      }

      // Brand Name
      result['brandName'] = 'Kotn';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.cover');
      if (imageUrlContainer) {
        let styles = imageUrlContainer.currentStyle;
        if (styles && styles.backgroundImage) {
          result.imageUrl = styles.backgroundImage.slice(4, -1).replace(/^"(.*)"$/, '$1');;
        } else if (window && window.getComputedStyle) {
          styles = window.getComputedStyle(imageUrlContainer, false);
          if (styles && styles.backgroundImage) {
            result.imageUrl = styles.backgroundImage.slice(4, -1).replace(/^"(.*)"$/, '$1');;
          }
        }
      }

      // Sizes

      // Prices
      let price = element.querySelector('.productCard-info');
      if (price && price.textContent) {
        price = price.textContent.split('$');
        if (price && price.length > 0) {
          result['currentPrice'] = parseFloat(price[price.length - 1].replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
        }
      }

      // Url
      let url = element.querySelector('.productCard > a');
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
