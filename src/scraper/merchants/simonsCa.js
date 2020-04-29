import Merchant from './merchant.js';
import $ from 'jquery';

export default class SimonsCa extends Merchant {
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
      merchant: 'Simons (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#product_right');
      if (productName && productName.length > 0) {
        productName = productName.find('.productTitle');
        if (productName && productName.length > 0) {
          productName = productName.find('span');
          if (productName && productName.length > 0) {
            result['productName'] = productName[0].innerText.trim();
          }
        }
      } else {
        productName = $('.single-product-details');
        if (productName && productName.length > 0) {
          productName = productName.find('.single-product-title');
          if (productName && productName.length > 0) {
            result['productName'] = productName[0].innerText.trim();
          }
        }
      }

      // Brand Name
      let brandName = $('#product_right');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('span[itemprop=brand]');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName[0].innerText.trim();
        }
      } else {
        brandName = $('.single-product-details');
        if (brandName && brandName.length > 0) {
          brandName = brandName.find('[itemprop=brand]');
          if (brandName && brandName.length > 0) {
            result['brandName'] = brandName[0].innerText.trim();
          }
        }
      }

      // Colour

      // Image
      let imageUrl = $('#img_1');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src.trim();
      } else {
        imageUrl = $('.slick-slide.slick-current.slick-active');
        if (imageUrl && imageUrl.length > 0) {
          imageUrl = imageUrl.find('img');
          if (imageUrl && imageUrl.length > 0) {
            result['imageUrl'] = imageUrl[0].src.trim();
          }
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('#product_right');
      if (!(priceContainer && priceContainer.length > 0)) {
        priceContainer = $('.single-product-details');
      }
      if (priceContainer && priceContainer.length > 0) {
        let currentPrice = priceContainer.find('.price.salePrice');
        let comparePrice = priceContainer.find('.price.listPrice');

        if (comparePrice && comparePrice.length > 0) {
          // On sale
          result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (currentPrice && currentPrice.length > 0) {
          // Not on sale
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Simons (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('[itemprop=name]');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('[itemprop=brand]');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.pic > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('[itemprop=price]');
      let currentPrice = element.querySelector('.salePrice');
      let retailPrice = element.querySelector('.listPrice');

      if (retailPrice) {
        // On sale
        result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price) {
        // Not on sale
        result['retailPrice'] = parseFloat(price.getAttribute('content').replace(/[^0-9\.]/g, ""));
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('.pic > a');
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
