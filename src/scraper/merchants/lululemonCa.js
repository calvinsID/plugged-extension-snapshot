import Merchant from './merchant.js';
import $ from 'jquery';

export default class LululemonCa extends Merchant {
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
      merchant: 'Lululemon (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1.pdp-title');
      if (productName && productName.length > 0) {
        productName = productName.find('div');
        if (productName && productName.length > 0) {
          result['productName'] = productName[0].innerText.trim();
        }
      }

      // Brand Name
      result['brandName'] = 'Lululemon';

      // Colour

      // Image
      let imageUrl = $('.product-images__slide.swiper-slide-active');
      if (imageUrl && imageUrl.length > 0) {
        let image = imageUrl.find('img.product-image-carousel__image');
        if (image && image.length > 0) {
          // Desktop
          result['imageUrl'] = image[0].currentSrc.trim();
        } else {
          image = imageUrl.find('img.product-images__image');
          if (image && image.length > 0) {
            // Mobile
            result['imageUrl'] = image[0].currentSrc.trim();
          }
        }
      }

      // Sizes

      // Prices
      let price = $('.product-description');
      if (price && price.length > 0) {
        let comparePrice = price.find('.list-price');
        let comparePrice2 = price.find('.price');
        let productPrice = price.find('.sale-price');
        let productPrice2 = price.find('.price__inactive-list-price');
        let currency = price.find('.price__currency-code');
        if (currency && currency.length > 0) {
          if (currency[0].innerText.toLowerCase().indexOf('cad') !== -1) {
            // Is in CAD
            if (productPrice && productPrice.length > 0) {
              // On sale
              productPrice = productPrice[0].innerText.split('-');
              if (productPrice.length > 1) {
                // Range of prices
                let currentPriceOne = parseFloat(productPrice[0].replace(/[^0-9\.]/g, ""));
                let currentPriceTwo = parseFloat(productPrice[1].replace(/[^0-9\.]/g, ""));
                if (currentPriceTwo > currentPriceOne) {
                  result['currentPrice'] = parseFloat(currentPriceOne);
                } else {
                  result['currentPrice'] = parseFloat(currentPriceTwo);
                }
              } else if (productPrice.length > 0) {
                // No range of prices
                result['currentPrice'] = parseFloat(productPrice[0].replace(/[^0-9\.]/g, ""));
              }
              if (comparePrice && comparePrice.length > 0) {
                comparePrice = comparePrice[0].innerText.split('-');
                if (comparePrice.length > 1) {
                  // Range of prices
                  let comparePriceOne = parseFloat(comparePrice[0].replace(/[^0-9\.]/g, ""));
                  let comparePriceTwo = parseFloat(comparePrice[1].replace(/[^0-9\.]/g, ""));
                  if (comparePriceTwo > comparePriceOne) {
                    result['retailPrice'] = parseFloat(comparePriceTwo);
                  } else {
                    result['retailPrice'] = parseFloat(comparePriceOne);
                  }
                } else if (comparePrice.length > 0) {
                  // Not range of prices
                  result['retailPrice'] = parseFloat(comparePrice[0].replace(/[^0-9\.]/g, ""));
                }
              } else {
                result['retailPrice'] = parseFloat(productPrice[0].replace(/[^0-9\.]/g, ""));
              }
            } else if (comparePrice && comparePrice.length > 0) {
              // Not on sale
              result['currentPrice'] = parseFloat(comparePrice[0].innerText.replace(/[^0-9\.]/g, ""));
              result['retailPrice'] = result['currentPrice'];
            } else if (comparePrice2 && comparePrice2.length > 0) {
              // New ui change smh
              comparePrice2 = comparePrice2[0].innerText.split('$');
              if (comparePrice2 && comparePrice2.length > 2) {
                result['currentPrice'] = parseFloat(comparePrice2[1].replace(/[^0-9\.]/g, ""));
                result['retailPrice'] = parseFloat(comparePrice2[2].replace(/[^0-9\.]/g, ""));
              } else if (comparePrice2 && comparePrice2.length > 1) {
                result['currentPrice'] = parseFloat(comparePrice2[1].replace(/[^0-9\.]/g, ""));
                result['retailPrice'] = result['currentPrice'];
              }
              if (productPrice2 && productPrice2.length > 0) {
                productPrice2 = productPrice2[0].innerText.split('-');
                if (productPrice2.length > 0) {
                  result['retailPrice'] = parseFloat(productPrice2[productPrice2.length - 1].replace(/[^0-9\.]/g, ""));
                }
              }
            }
          } else {
            // Not in CAD, don't show that this site is supported
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
      merchant: 'Lululemon (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-name');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name
      result['brandName'] = 'Lululemon';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('img.image__default');
      if (imageUrlContainer) {
        result.imageUrl = imageUrlContainer.currentSrc.trim();
      }

      // Sizes

      // Prices
      let currency = element.querySelector('.price__currency-code');
      if (currency && currency.innerText.toLowerCase().indexOf('cad') !== -1) {
        let comparePrice = element.querySelector('.price__inactive-list-price');
        let productPrice = element.querySelector('.price');

        if (comparePrice) {
          // On sale
          comparePrice = comparePrice.textContent.split('-');
          if (comparePrice.length > 0) {
            result['retailPrice'] = parseFloat(comparePrice[0].replace(/[^0-9\.]/g, ""));
          }
          if (productPrice) {
            productPrice = productPrice.textContent.split('$');
            if (productPrice.length > 2) {
              // Range of prices
              let currentPriceOne = parseFloat(productPrice[1].replace(/[^0-9\.]/g, ""));
              let currentPriceTwo = parseFloat(productPrice[2].replace(/[^0-9\.]/g, ""));
              if (currentPriceTwo > currentPriceOne) {
                result['currentPrice'] = currentPriceOne;
              } else {
                result['currentPrice'] = currentPriceTwo;
              }
            } else if (productPrice.length > 1) {
              // No range of prices
              result['currentPrice'] = parseFloat(productPrice[1].replace(/[^0-9\.]/g, ""));
            }
          }
        } else if (productPrice) {
          // Not on sale
          result['retailPrice'] = parseFloat(productPrice.textContent.replace(/[^0-9\.]/g, ""));
          result['currentPrice'] = result['retailPrice'];
        }
      }

      // Url
      let url = element.querySelector('a.product-tile__image-link');
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
