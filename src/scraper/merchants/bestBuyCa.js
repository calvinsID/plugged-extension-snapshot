import Merchant from './merchant.js';
import $ from 'jquery';

export default class BestBuyCa extends Merchant {
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
      merchant: 'Best Buy (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.x-product-detail-page');
      if (productName && productName.length > 0) {
        productName = productName.find('[itemprop=name]');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('.x-product-detail-page');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img[itemprop=image]');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src;
        }
      }

      // Sizes

      // Prices
      let detailPage = $('.x-product-detail-page');
      if (detailPage && detailPage.length > 0) {
        let currentPrice = detailPage.find('[itemprop=price]');
        let saveAmount = detailPage.find('.productSaving_3YmNX');
        if (currentPrice && currentPrice.length > 0) {
          result['currentPrice'] = parseFloat(currentPrice[0].getAttribute('content').replace(/[^0-9\.]/g, ""));
        }
        if (saveAmount && saveAmount.length > 0 && saveAmount[0].textContent.toLowerCase().indexOf('save') !== -1) {
          saveAmount = parseFloat(saveAmount[0].textContent.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = parseFloat(parseFloat(result['currentPrice'] + saveAmount).toFixed(2));
        } else {
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
      merchant: 'Best Buy (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('[data-automation=productItemName]');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('[data-automation=image-slider-test]');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('img');
        if (imageUrlContainer) {
          result.imageUrl = imageUrlContainer.src.trim();
        }
      }

      // Sizes

      // Prices
      let price = element.querySelector('[itemprop=offers] > [itemprop=price]');
      let saved = element.querySelector('.productSaving_3YmNX')
      if (price) {
        result['currentPrice'] = parseFloat(price.getAttribute('content').replace(/[^0-9\.]/g, ""));
        if (saved && saved.textContent.toLowerCase().indexOf('save') !== -1) {
          saved = parseFloat(saved.textContent.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = parseFloat(parseFloat(result['currentPrice'] + saved).toFixed(2));
        } else {
          result['retailPrice'] = result['currentPrice'];
        }
      }

      // Url
      let url = element.querySelector('a[itemprop=url]');
      if (url) {
        result['url'] = url.href;
      } else {
        url = element.querySelector('a');
        if (url) {
          result['url'] = url.href;
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
    return result;
  }
}
