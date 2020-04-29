import Merchant from './merchant.js';
import $ from 'jquery';

export default class Solestop extends Merchant {
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
      merchant: 'Solestop',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('.product-shop');
      if (productName && productName.length > 0) {
        productName = productName.find('[itemprop=name]');
        if (productName && productName.length > 0) {
          productName = productName.find('span');
          if (productName && productName.length > 0) {
            result['productName'] = productName[0].innerText.trim();
          }
        }
      }

      // Brand Name
      let brandName = $('.product-shop');
      if (brandName && brandName.length > 0) {
        brandName = brandName.find('.sample-vendor');
        if (brandName && brandName.length > 0) {
          result['brandName'] = brandName[0].innerText.trim();
        }
      }

      // Colour

      // Image
      let imageUrl = $('.slick-slide.slick-current.slick-active');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let priceContainer = $('.product-shop');
      if (priceContainer && priceContainer.length > 0) {
        priceContainer = priceContainer.find('.prices');
        if (priceContainer && priceContainer.length > 0) {
          let currentPrice = priceContainer.find('.on-sale');
          let comparePrice = priceContainer.find('.compare-price');
          let noSale = priceContainer.find('.price');
  
          if (comparePrice && comparePrice.length > 0) {
            // On sale
            comparePrice = comparePrice.find('span.money');
            if (comparePrice && comparePrice.length > 0 && comparePrice[0].getAttribute('data-cad')) {
              result['retailPrice'] = parseFloat(comparePrice[0].getAttribute('data-cad').replace(/[^0-9\.]/g, ""));
            } else if (comparePrice && comparePrice.length > 0 && comparePrice[0].getAttribute('data-original-value')) {
              // Not CAD page
              let cadString = comparePrice[0].getAttribute('data-original-value').replace(/[^0-9\.]/g, "");
              cadString = cadString.slice(0, cadString.length - 2) + '.' + cadString.slice(cadString.length - 2);
              result['retailPrice'] = parseFloat(cadString);
            } else if (comparePrice && comparePrice.length > 0 && comparePrice[0].textContent.toLowerCase().includes('cad')) {
              result['retailPrice'] = parseFloat(comparePrice[0].textContent.replace(/[^0-9\.]/g, ""));
            }
            if (currentPrice && currentPrice.length > 0) {
              currentPrice = currentPrice.find('span.money');
              if (currentPrice && currentPrice.length > 0 && currentPrice[0].getAttribute('data-cad')) {
                result['currentPrice'] = parseFloat(currentPrice[0].getAttribute('data-cad').replace(/[^0-9\.]/g, ""));
              } else if (currentPrice && currentPrice.length > 0 && currentPrice[0].getAttribute('data-original-value')) {
                // Not CAD page
                let cadString = currentPrice[0].getAttribute('data-original-value').replace(/[^0-9\.]/g, "");
                cadString = cadString.slice(0, cadString.length - 2) + '.' + cadString.slice(cadString.length - 2);
                result['currentPrice'] = parseFloat(cadString);
              } else if (currentPrice && currentPrice.length > 0 && currentPrice[0].textContent.toLowerCase().includes('cad')) {
                result['currentPrice'] = parseFloat(currentPrice[0].textContent.replace(/[^0-9\.]/g, ""));
              }
            }
          } else if (noSale && noSale.length > 0) {
            // Not on sale
            noSale = noSale.find('span.money');
            if (noSale && noSale.length > 0 && noSale[0].getAttribute('data-cad')) {
              result['retailPrice'] = parseFloat(noSale[0].getAttribute('data-cad').replace(/[^0-9\.]/g, ""));
            } else if (noSale && noSale.length > 0 && noSale[0].getAttribute('data-original-value')) {
              // Not CAD page
              let cadString = noSale[0].getAttribute('data-original-value').replace(/[^0-9\.]/g, "");
              cadString = cadString.slice(0, cadString.length - 2) + '.' + cadString.slice(cadString.length - 2);
              result['retailPrice'] = parseFloat(cadString);
            } else if (noSale && noSale.length > 0 && noSale[0].textContent.toLowerCase().includes('cad')) {
              result['retailPrice'] = parseFloat(noSale[0].textContent.replace(/[^0-9\.]/g, ""));
            }
            result['currentPrice'] = result['retailPrice'];
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
      merchant: 'Solestop',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      let brandName = element.querySelector('.product-vendor');
      if (brandName) {
        result['brandName'] = brandName.textContent.trim();
      }

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.product-grid-image > img');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.src.trim();
      }

      // Sizes

      // Prices
      let retailPrice = element.querySelector('.old-price > .money');
      let currentPrice = element.querySelector('.special-price > .money');
      let price = element.querySelector('.regular-product > span > .money');

      if (retailPrice) {
        // On sale
        if (retailPrice.getAttribute('data-cad')) {
          // CAD page
          result['retailPrice'] = parseFloat(retailPrice.getAttribute('data-cad').replace(/[^0-9\.]/g, ""));
        } else if (retailPrice.getAttribute('data-original-value')) {
          // Not CAD page
          let cadString = retailPrice.getAttribute('data-original-value').replace(/[^0-9\.]/g, "");
          cadString = cadString.slice(0, cadString.length - 2) + '.' + cadString.slice(cadString.length - 2);
          result['retailPrice'] = parseFloat(cadString);
        } else if (retailPrice.textContent.toLowerCase().includes('cad')) {
          result['retailPrice'] = parseFloat(retailPrice.textContent.replace(/[^0-9\.]/g, ""));
        }

        if (currentPrice) {
          if (currentPrice.getAttribute('data-cad')) {
            // CAD page
            result['currentPrice'] = parseFloat(currentPrice.getAttribute('data-cad').replace(/[^0-9\.]/g, ""));
          } else if (currentPrice.getAttribute('data-original-value')) {
            // Not CAD page
            let cadString = currentPrice.getAttribute('data-original-value').replace(/[^0-9\.]/g, "");
            cadString = cadString.slice(0, cadString.length - 2) + '.' + cadString.slice(cadString.length - 2);
            result['currentPrice'] = parseFloat(cadString);
          } else if (currentPrice.textContent.toLowerCase().includes('cad')) {
            result['currentPrice'] = parseFloat(currentPrice.textContent.replace(/[^0-9\.]/g, ""));
          }
        }
      } else if (price) {
        // Not on sale
        if (price.getAttribute('data-cad')) {
          // CAD page
          result['retailPrice'] = parseFloat(price.getAttribute('data-cad').replace(/[^0-9\.]/g, ""));
        } else if (price.getAttribute('data-original-value')) {
          // Not CAD page
          let cadString = price.getAttribute('data-original-value').replace(/[^0-9\.]/g, "");
          cadString = cadString.slice(0, cadString.length - 2) + '.' + cadString.slice(cadString.length - 2);
          result['retailPrice'] = parseFloat(cadString);
        } else if (price.textContent.toLowerCase().includes('cad')) {
          result['retailPrice'] = parseFloat(price.textContent.replace(/[^0-9\.]/g, ""));
        }
        result['currentPrice'] = result['retailPrice'];
      }

      // Url
      let url = element.querySelector('a.product-grid-image');
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
