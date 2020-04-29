import Merchant from './merchant.js';
import $ from 'jquery';

export default class DynamiteCa extends Merchant {
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
      merchant: 'Dynamite (CA)',
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      let productName = $('#pdp_title');
      if (productName && productName.length > 0) {
        result['productName'] = productName[0].innerText.trim();
      }

      // Brand Name
      result['brandName'] = 'Dynamite';

      // Colour

      // Image
      let imageUrl = $('.carouselColumn');
      if (imageUrl && imageUrl.length > 0) {
        imageUrl = imageUrl.find('img.pdpVerticalImage');
        if (imageUrl && imageUrl.length > 0) {
          result['imageUrl'] = imageUrl[0].src.trim();
        }
      }

      // Sizes

      // Prices
      let productSection = $('#pdpProductBody');
      if (productSection && productSection.length > 0) {
        let currentPrice = productSection.find('span.final');
        let retailPrice = productSection.find('span.deleted');
  
        if (retailPrice && retailPrice.length > 0 && retailPrice[0].innerText) {
          // On sale
          if (currentPrice && currentPrice.length > 0) {
            result['currentPrice'] = parseFloat(currentPrice[0].innerText.replace(/[^0-9\.]/g, ""));
          }
          result['retailPrice'] = parseFloat(retailPrice[0].innerText.replace(/[^0-9\.]/g, ""));
        } else {
          // Not on sale
          let parentDiv = $('#pdpProductDetails');;
          if (parentDiv && parentDiv.length > 0) {
            parentDiv = parentDiv.find('div:not([class])');
            if (parentDiv) {
              let productSection = parentDiv.find('.pdpstyle__PdpPrice-c9dzoe-26');
              if (productSection && productSection.length > 0) {
                productSection = productSection.find('span');
                if (productSection) {
                  result['retailPrice'] = parseFloat(productSection[0].innerText.replace(/[^0-9\.]/g, ""));
                }
              } else {
                for (const element of parentDiv.find('div > span')) {
                  if (element.textContent.includes('$')) {
                    result['retailPrice'] = parseFloat(element.textContent.replace(/[^0-9\.]/g, ""));
                    break;
                  }
                }
              }
              result['currentPrice'] = result['retailPrice'];
            }
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
      merchant: 'Dynamite (CA)',
      url: null,
      scrapedWithoutErrors: true
    }

    try {
      // Product Name
      for (const el of element.querySelectorAll('a[tabindex="-1"]')) {
        let classList = el.className.split(/\s+/);
        for (const c of classList) {
          if (c.includes('contentfulTile__TileTitleLink')) {
            result['productName'] = el.textContent.trim();
            break;
          }
        }
      }

      // Brand Name
      result['brandName'] = 'Dynamite';

      // Colour

      // Image
      let imageUrlContainer = element.querySelector('.gatsby-image-wrapper');
      if (imageUrlContainer) {
        imageUrlContainer = imageUrlContainer.querySelector('picture');
        if (imageUrlContainer) {
          imageUrlContainer = imageUrlContainer.querySelector('img');
          if (imageUrlContainer) {
            result.imageUrl = imageUrlContainer.src.trim();
          }
        }
      }

      // Sizes

      // Prices
      for (const el of element.querySelectorAll("div > div > div > s")) {
        if (el.textContent.includes("$")) {
          result['retailPrice'] = parseFloat(el.textContent.replace(/[^0-9\.]/g, ""));
          break;
        }
      }
      for (const el of element.querySelectorAll("div > div > div > span")) {
        if (el.textContent.includes("$")) {
          result['currentPrice'] = parseFloat(el.textContent.replace(/[^0-9\.]/g, ""));
          break;
        }
      }
      if (!result['retailPrice']) {
        for (const el of element.querySelectorAll("div > div > div")) {
          if (el.textContent.includes("$")) {
            result['retailPrice'] = parseFloat(el.textContent.replace(/[^0-9\.]/g, ""));
            result['currentPrice'] = result['retailPrice'];
            break;
          }
        }
      }

      // Url
      let url = element.querySelector('div > div > a');
      for (const el of element.querySelectorAll('div > div > a')) {
        if (el.href) {
          result['url'] = url.href;
          break;
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
