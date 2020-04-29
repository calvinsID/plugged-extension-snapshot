import Merchant from './merchant.js';
import $ from 'jquery';

export default class LevisCa extends Merchant {
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
      merchant: "Levi's (CA)",
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-details.page-title');
      if (productName && productName.length > 0) {
        productName = productName.find('h1.name');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      result['brandName'] = "Levi's";

      // Colour

      // Image
      let imageUrl = $('#product-hero-image_flyout');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }
      if (!result['imageUrl']) {
        // Mobile view
        imageUrl = $('#product-root-gallery-mobile');
        if (imageUrl && imageUrl.length > 0) {
          imageUrl = imageUrl.find('img');
          if (imageUrl && imageUrl.length > 0) {
            result['imageUrl'] = imageUrl[0].src.trim();
          }
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.price-wrapper');
      if (priceContainer && priceContainer.length > 0) {
        let hardSale = priceContainer.find('.hard-sale')
        let softSale = priceContainer.find('.soft-sale');
        let regularPrice = priceContainer.find('.regular');
  
        if (hardSale && hardSale.length > 0 && hardSale[0].innerText.trim()) {
          // On sale
          result['currentPrice'] = parseFloat(hardSale[0].innerText.replace(/[^0-9\.]/g, ""));
          if (regularPrice && regularPrice.length > 0) {
            result['retailPrice'] = parseFloat(regularPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (softSale && softSale.length > 0 && softSale[0].innerText.trim()) {
          // On sale
          result['currentPrice'] = parseFloat(softSale[0].innerText.replace(/[^0-9\.]/g, ""));
          if (regularPrice && regularPrice.length > 0) {
            result['retailPrice'] = parseFloat(regularPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
        } else if (regularPrice && regularPrice.length > 0) {
          // Not on sale
          result['currentPrice'] = parseFloat(regularPrice[0].innerText.replace(/[^0-9\.]/g, ""));
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
      merchant: "Levi's (CA)",
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.name.products-name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = "Levi's";

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('a.thumb-link > picture > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let price = element.querySelector('.price.group-pricerange > .sale-price:not(.price-end)');
      let price2 = element.querySelector('.price.group-pricerange > .sale-price.price-end')
      let currentPrice = element.querySelector('.price.group-pricerange > .hard-sale:not(.price-end)');
      let currentPrice2 = element.querySelector('.price.group-pricerange > .hard-sale.price-end');
      let retailPrice = element.querySelector('.price.group-pricerange > .price-from');

      if (retailPrice) {
        // On sale
        retailPrice = retailPrice.textContent.split('-');
        if (retailPrice && retailPrice.length > 0) {
          result['retailPrice'] = parseFloat(retailPrice[retailPrice.length - 1].replace(/[^0-9\.]/g, ""));
        }
        if (currentPrice2) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        } else if (currentPrice) {
          result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
        }
      } else if (price2) {
        // Not on sale
        result['currentPrice'] = parseFloat(price2.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      } else if (price) {
        // Not on sale
        result['currentPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        result['retailPrice'] = result['currentPrice'];
      }

      // Url
      let url = element.querySelector('a.thumb-link');
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
