import Merchant from './merchant.js';
import $ from 'jquery';

export default class LLBeanCa extends Merchant {
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
      merchant: 'L.L.Bean (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.product-name');

      if (productName && productName.length > 0) {
        result['productName'] = productName.text();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrl = $('img.productthumbnail');
      if (imageUrl && imageUrl.length > 0) {
        result['imageUrl'] = imageUrl[0].src;
      }

      // Sizes

      // Prices
      let price = $('.product-price');
      if (price && price.length > 0) {
        let currentPrice = price.find('.price-sales');
        let retailPrice = price.find('.price-standard');
        let regularPrice = price.find('.product-standard-price');
        let rangePriceLow = price.find('.salesprice-red');
        let rangePriceHigh = price.find('.salesprice-black');

        if (retailPrice && retailPrice.length > 0) {
          // On sale
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        } else if (currentPrice && currentPrice.length > 0) {
          // Not on sale
          result['retailPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        } else if (rangePriceLow && rangePriceLow.length > 0) {
          // Ranges
          result['currentPrice'] = parseFloat(rangePriceLow[0].innerText.replace(/[^0-9\.]/g, ""));
          if (regularPrice && regularPrice.length > 0) {
            regularPrice = regularPrice[0].innerText.trim().split('-');
            if (regularPrice && regularPrice.length > 0) {
              result['retailPrice'] = parseFloat(regularPrice[regularPrice.length - 1].replace(/[^0-9\.]/g, ""));
            }
          } else if (rangePriceHigh && rangePriceHigh.length > 0) {
            rangePriceHigh = rangePriceHigh[0].innerText.trim().split('-');
            if (rangePriceHigh && rangePriceHigh.length > 0) {
              result['retailPrice'] = parseFloat(rangePriceHigh[rangePriceHigh.length - 1].replace(/[^0-9\.]/g, ""));
            }
          } else {
            result['retailPrice'] = result['currentPrice'];
          }
        } else if (price[0].textContent) {
          // Ranges v2
          price = price[0].innerText.trim().split('-');
          if (price && price.length > 0) {
            result['currentPrice'] = parseFloat(price[0].replace(/[^0-9\.]/g, ""));
            result['retailPrice'] = parseFloat(price[price.length - 1].replace(/[^0-9\.]/g, ""));
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
      merchant: 'L.L.Bean (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('a.name-link');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-image > a > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

        // Prices
        let price = element.querySelector('.product-pricing');
        if (price) {
          let currentPrice = price.querySelectorAll('.price-sales');
          let retailPrice = price.querySelectorAll('.price-standard');
          let regularPrice = price.querySelectorAll('.product-standard-price');
          let rangePriceLow = price.querySelectorAll('.salesprice-red');
          let rangePriceHigh = price.querySelectorAll('.salesprice-black');
          let regularPrice2 = price.querySelectorAll('.product-standard-price > span');
          let salePrice2 = price.querySelectorAll('.product-sales-price > span');

          if (retailPrice && retailPrice.length > 0) {
            // On sale
            result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          } else if (currentPrice && currentPrice.length > 0) {
            // Not on sale
            result['retailPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = result['retailPrice'];
          } else if (rangePriceLow && rangePriceLow.length > 0) {
            // Ranges
            result['currentPrice'] = parseFloat(rangePriceLow[0].innerText.trim().replace(/[^0-9\.]/g, ""));
            if (regularPrice && regularPrice.length > 0) {
              regularPrice = regularPrice[0].innerText.trim().split('-');
              if (regularPrice && regularPrice.length > 0) {
                result['retailPrice'] = parseFloat(regularPrice[regularPrice.length - 1].replace(/[^0-9\.]/g, ""));
              }
            } else if (rangePriceHigh && rangePriceHigh.length > 0) {
              rangePriceHigh = rangePriceHigh[0].innerText.trim().split('-');
              if (rangePriceHigh && rangePriceHigh.length > 0) {
                result['retailPrice'] = parseFloat(rangePriceHigh[rangePriceHigh.length - 1].replace(/[^0-9\.]/g, ""));
              }
            } else {
              result['retailPrice'] = result['currentPrice'];
            }
          } else if (regularPrice2 && regularPrice2.length > 0 && salePrice2 && salePrice2.length > 0) {
            result['retailPrice'] = parseFloat(regularPrice2[0].textContent.replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = parseFloat(salePrice2[0].textContent.replace(/[^0-9\.]/g, ""));
          } else if (price.textContent) {
            // Ranges v2
            price = price.innerText.trim().split('-');
            if (price && price.length > 0) {
              result['currentPrice'] = parseFloat(price[0].replace(/[^0-9\.]/g, ""));
              result['retailPrice'] = parseFloat(price[price.length - 1].replace(/[^0-9\.]/g, ""));
            }
          }
        }

      // Url
      let url = element.querySelector('a.name-link');
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
