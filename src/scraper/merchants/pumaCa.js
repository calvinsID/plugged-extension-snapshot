import Merchant from './merchant.js';
import $ from 'jquery';

export default class PumaCa extends Merchant {
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
      merchant: 'Puma (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-detail-info');
      if (productName && productName.length > 0) {
        productName = productName.find('.product-name');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      result['brandName'] = 'Puma';

      // Colour

      // Image
      let imageUrl = $('#puma-swatches-color');
      if (imageUrl && imageUrl.length > 0) {
        if (imageUrl[0].shadowRoot) {
          imageUrl = imageUrl[0].shadowRoot.querySelector('.swatch.selected');
          if (imageUrl) {
            imageUrl = imageUrl.querySelectorAll('img');
            if (imageUrl && imageUrl.length > 0) {
              result['imageUrl'] = imageUrl[0].src.trim();
            }
          }
        }
      }
      if (!(result['imageUrl'])) {
        imageUrl = $('puma-images');
        if (imageUrl && imageUrl.length > 0) {
          if (imageUrl[0].shadowRoot) {
            imageUrl = imageUrl[0].shadowRoot.querySelector('img.image');
            if (imageUrl) {
              result['imageUrl'] = imageUrl.src.trim();
            }
          }
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-detail-info');
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.sales.is-sale-price');
        let comparePrice = priceContainer.find('.strike-through');
        let noSale = priceContainer.find('.sales')

        if (comparePrice && comparePrice.length > 0) {
          // On sale
          comparePrice = comparePrice.find('span.value');
          if (comparePrice && comparePrice.length > 0) {
            result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].getAttribute('data-price-value').replace(/[^0-9\.]/g, ""));
          }
        } else if (noSale && noSale.length > 0) {
          // Not on sale
          result['currentPrice'] = parseFloat(noSale[0].getAttribute('data-price-value').replace(/[^0-9\.]/g, ""));
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
      merchant: 'Puma (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.tile-body > .pdp-link > a');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Puma';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.tile-image');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.price > .sales > .value');
      let retailPrice = element.querySelector('.price > .strike-through > .value');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice) {
        // Not on sale
        result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.link');
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
