import Merchant from './merchant.js';
import $ from 'jquery';

export default class NewBalanceCa extends Merchant {
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
      merchant: "New Balance (CA)",
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-name');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'New Balance';

      // Colour

      // Image
      let imageUrl = $('.swiper-slide.swiper-slide-active');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-pricing');
      if (priceContainer && priceContainer.length > 0) {
        let comparePrice = priceContainer.find('.pricenote');
        let currentPrice = priceContainer.find('.price.discounted');
        let noSale = priceContainer.find('.price');

        if (comparePrice && comparePrice.length > 0 && comparePrice[0].style.display !== 'none') {
          // On sale
          comparePrice = comparePrice.find('.pricenotebucket');
          if (comparePrice && comparePrice.length > 0) {
            result['retailPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (noSale && noSale.length > 0) {
          // Not on sale
          result['currentPrice'] = parseFloat(noSale[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: 'New Balance (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-name > a');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'New Balance';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-image > picture > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let currentPrice = element.querySelector('.product-pricing > .sales');
      let retailPrice = element.querySelector('.product-pricing > .sales > .reg');
      let price = element.querySelector('.product-pricing');

      if (currentPrice && currentPrice.textContent) {
        currentPrice = currentPrice.textContent.trim().split('$');
        if (currentPrice && currentPrice.length > 1) {
          result['currentPrice'] = parseFloat(currentPrice[1].replace(/[^0-9\.]/g, ""));
        }
        if (retailPrice && retailPrice.textContent) {
          retailPrice = retailPrice.textContent.split('-');
          if (retailPrice && retailPrice.length > 0) {
            result['retailPrice'] = parseFloat(retailPrice[retailPrice.length - 1].replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (price && price.textContent) {
        price = price.textContent.split('-');
        if (price && price.length > 0) {
          result['currentPrice'] = parseFloat(price[0].replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = parseFloat(price[price.length - 1].replace(/[^0-9\.]/g, ""));
        }
      }

      // Url
      let url = element.querySelector('a.product-image');
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
