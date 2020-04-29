import Merchant from './merchant.js';
import $ from 'jquery';

export default class PatagoniaCa extends Merchant {
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
      merchant: 'Patagonia (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#product-title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Patagonia';

      // Colour

      // Image
      let imageUrl = $('.swiper-slide-active > .img-wrapper-lqip > img.img-fluid');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src.trim();
      }

      // Sizes

      // Prices
      let priceContainer = $('#hero-pdp__buy');
      if (priceContainer && priceContainer.length > 0) {
        priceContainer = priceContainer.find('.price');
        if (priceContainer && priceContainer.length > 0) {
          let comparePrice = priceContainer.find('.strike-through > [itemprop=price]');
          let currentPrice = priceContainer.find('.sales > [itemprop=price]');
          let minPrice = priceContainer.find('[itemprop=lowprice]');
          let maxPrice = priceContainer.find('[itemprop=highprice]');

          if (minPrice && minPrice.length > 0 && minPrice[0].innerText) {
            // Price range
            result['currentPrice'] = parseFloat(minPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            if (maxPrice && maxPrice.length > 0) {
              result['retailPrice'] = parseFloat(maxPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            }
          } else if (comparePrice && comparePrice.length > 0 && comparePrice[0].innerText) {
            // On sale
            result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
            if (currentPrice && currentPrice.length > 0) {
              result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            }
          } else if (currentPrice && currentPrice.length > 0 && currentPrice[0].innerText) {
            // Not on sale
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'Patagonia (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-tile__name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Patagonia';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-tile__cover > a > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.currentSrc.trim();
      }

      // Sizes

      // Prices
      let comparePrice = element.querySelectorAll('.strike-through > [itemprop=price]');
      let currentPrice = element.querySelectorAll('.sales > [itemprop=price]');
      let minPrice = element.querySelectorAll('[itemprop=lowprice]');
      let maxPrice = element.querySelectorAll('[itemprop=highprice]');

      if (minPrice && minPrice.length > 0 && minPrice[0].innerText) {
        // Price range
        result['currentPrice'] = parseFloat(minPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        if (maxPrice && maxPrice.length > 0) {
          result['retailPrice'] = parseFloat(maxPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        }
      } else if (comparePrice && comparePrice.length > 0 && comparePrice[0].innerText) {
        // On sale
        result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
        if (currentPrice && currentPrice.length > 0) {
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        }
      } else if (currentPrice && currentPrice.length > 0 && currentPrice[0].innerText) {
        // Not on sale
        result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a[itemprop=url]');
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
