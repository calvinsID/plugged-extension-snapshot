import Merchant from './merchant.js';
import $ from 'jquery';

export default class NikeCa extends Merchant {
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
      merchant: 'Nike (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('h1#pdp_product_title');

      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name

      // Colour
      let colour = $('.description-preview__color-description');

      if (colour) {
        result['colour'] = colour.text().substring(14);
      }

      // Image
      let imageUrl = $('.css-1omsbca').parent();
      if (!imageUrl || imageUrl.length < 1) {
        imageUrl = $('.carousel-slider.carousel.react-carousel-wrapper').last().parent();
      }
      if (imageUrl) {
        imageUrl = imageUrl.find('picture');
        if (imageUrl) {
          imageUrl = imageUrl.next();
          if (imageUrl) {
            imageUrl = imageUrl.find('img');
            if (imageUrl && imageUrl[0] && imageUrl[0].src) {
              result['imageUrl'] = imageUrl[0].src;
            }
          }
        }
      }

      // Sizes
      let options = $('.availableSizeContainer');
      options = options.find('label');

      if (options) {
        for (let i = 0; i < options.length; i++) {
          result['sizes'].push(options[i].firstChild.nodeValue);
        }
      }

      // Prices
      let price = $('[data-test=product-price]');
      if (price.length > 0) {
        result['retailPrice'] = parseFloat(price[1].innerHTML.replace(/[^0-9\.]/g, ""));
      }
      price = $('[data-test=product-price-reduced]');
      if (price.length > 0) {
        result['currentPrice'] = parseFloat(price[0].innerHTML.replace(/[^0-9\.]/g, ""));
      } else {
        result['currentPrice'] = result['retailPrice'];
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
      merchant: 'Nike (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = element.querySelector('.product-card__title');
      if (productName) {
        result['productName'] = productName.textContent.trim();
      }

      // Brand Name

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.image-loader.product-card__hero-image.is--loaded');
      if (imageUrlContainer) {
        let imageUrlList = imageUrlContainer.querySelector('img');
        if (imageUrlList) {
          result.imageUrl = imageUrlList.src.trim();
        }
      }

      // Sizes

      // Prices
      let priceButton = element.querySelector('.product-card__price');
      if (priceButton) {
        let salePrice = priceButton.querySelector('[data-test=product-price-reduced]');
        let regularPrice = priceButton.querySelector('[data-test=product-price]');
        if (salePrice) {
          // On sale
          result['currentPrice'] = parseFloat(salePrice.innerText.replace(/[^0-9\.]/g, ""));
          if (regularPrice) {
            result['retailPrice'] = parseFloat(regularPrice.innerText.replace(/[^0-9\.]/g, ""));
          }
        } else {
          // Not on sale
          result['currentPrice'] = parseFloat(regularPrice.innerText.replace(/[^0-9\.]/g, ""));
          result['retailPrice'] = result['currentPrice'];
        }
      }

      // Url
      let url = element.querySelector('.product-card__link-overlay');
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
