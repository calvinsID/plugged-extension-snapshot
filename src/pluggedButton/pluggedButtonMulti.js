/* global chrome */
/* src/pluggedButton.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import $ from 'jquery';
import './pluggedButton.css';
import pluggedLogo from '../images/pluggedLogo.png';
import HelperFunctions from '../stores/helperFunctions';
import Scraper from '../scraper/Scraper';

class PluggedButtonMulti extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      merchant: this.props.merchant,
      domElement: this.props.domElement
    };

    this.toggleSave = this.toggleSave.bind(this);
  }

  componentDidMount() {}

  toggleSave(e) {
    e.preventDefault();

    let scraper = new Scraper();
    let scrapedData = scraper.scrapeMulti(this.state.domElement, this.state.merchant);
    console.log('Plugged multi scraped:');
    console.log(scrapedData);

    let data = { action: 'togglePluggedSavePageMulti', scrapedData: scrapedData };
    chrome.runtime.sendMessage(data);
  }

  render() {
    return (
      <div id="plugged__slideout_multi_container" onClick={this.toggleSave}>
        <div id="plugged__slideout">
          <div id="plugged__slideout-icon">
            <img src={pluggedLogo} id='plugged__logo'></img>
          </div>
          <div id="plugged__slideout-content_multi">
            <button id="plugged__slideout_button">+</button>
          </div>
        </div>
      </div>
    );
  }
}

const app = document.createElement('div');
app.className = "plugged__button-root";

chrome.extension.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "loadKithMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("kith", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.collection-product").length) {
          clearInterval(checkExist);
          let productCards = $('li.collection-product > .product-card');
          // Change selector positioning to relative for Kith
          $('li.collection-product > .product-card').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'Kith', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('ul.collection-products');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.collection-product > .product-card');
                // Change selector positioning to relative for Kith
                $('li.collection-product > .product-card').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'Kith', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadNikeCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("nikeCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-card__body").length) {
          clearInterval(checkExist);
          let productCards = $('.product-card__body');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'Nike (CA)', `z-index: 1;`);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-grid__items');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-card__body');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'Nike (CA)', `z-index: 1;`);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadNikeUsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("nikeUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-card__body").length) {
          clearInterval(checkExist);
          let productCards = $('.product-card__body');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'Nike (US)', `z-index: 1;`);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-grid__items');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-card__body');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'Nike (US)', `z-index: 1;`);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadHavenMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("haven", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-card").length) {
          clearInterval(checkExist);
          let productCards = $('.product-card');
          for (let i = 0; i < productCards.length; i++) {
            loadSite(productCards[i], productCards[i], 'Haven', `z-index: 1;`);
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.shop-products');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-card');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'Haven', `z-index: 1;`);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLivestockMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("livestock", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".grid-product__wrapper").length && $('.grid-product__image-wrapper.mobile_hideclass').css('display') !== 'none') {
          clearInterval(checkExist);
          let productCards = $('.grid-product__wrapper');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i].querySelector('.grid-product__image-wrapper.mobile_hideclass'), productCards[i], 'Livestock', 'top: auto !important; bottom: 10px !important;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.getElementById('AjaxinateLoop');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.grid-product__wrapper');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i].querySelector('.grid-product__image-wrapper.mobile_hideclass'), productCards[i], 'Livestock', 'top: auto !important; bottom: 10px !important;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        } else if ($(".grid-product__wrapper").length && $('.grid-product__image-wrapper.desktop_hideclass').css('display') !== 'none') {
          clearInterval(checkExist);
          let productCards = $('.grid-product__wrapper');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i].querySelector('.grid-product__image-wrapper.desktop_hideclass'), productCards[i], 'Livestock', 'top: auto !important; bottom: 10px !important;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.getElementById('AjaxinateLoop');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.grid-product__wrapper');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i].querySelector('.grid-product__image-wrapper.desktop_hideclass'), productCards[i], 'Livestock', 'top: auto !important; bottom: 10px !important;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadUndefeatedMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("undefeated", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product_wrap").length) {
          clearInterval(checkExist);
          let productCards = $('.product_wrap');
          // Change selector positioning to relative for undefeated
          $('.product_wrap').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'Undefeated', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.getElementById('AjaxinateLoop');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product_wrap');
                // Change selector positioning to relative for undefeated
                $('.product_wrap').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'Undefeated', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSsenseCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("ssenseCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".browsing-product-item").length) {
          clearInterval(checkExist);
          let productCards = $('.browsing-product-item');
          // Change selector positioning to relative for SsenseCa
          $('.browsing-product-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            loadSite(productCards[i], productCards[i], 'Ssense (CA)', null);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSsenseUsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("ssenseUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".browsing-product-item").length) {
          clearInterval(checkExist);
          let productCards = $('.browsing-product-item');
          // Change selector positioning to relative for SsenseUs
          $('.browsing-product-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            loadSite(productCards[i], productCards[i], 'Ssense (US)', null);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadNomadMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("nomad", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-item").length) {
          clearInterval(checkExist);
          let productCards = $('.product-item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'Nomad', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.getElementById('CollectionLoop');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-item');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'Nomad', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMrPorterCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("mrPorterCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('[itemtype="http://schema.org/Product"][itemprop=item]:not([itemprop=mainEntity])').length) {
          clearInterval(checkExist);
          let productCards = $('[itemtype="http://schema.org/Product"][itemprop=item]:not([itemprop=mainEntity])');
          // Change selector positioning to relative for MrPorter
          $('[itemtype="http://schema.org/Product"][itemprop=item]:not([itemprop=mainEntity])').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'mrPorterCa', null);
            }
          }
          // Stop item from loading
          $('a #plugged__button-root-multi').on('click', function (e) { e.preventDefault(); });

          // For infinite scrolling
          let multiContainer = document.querySelector('[itemtype="http://schema.org/ItemList"]');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('[itemtype="http://schema.org/Product"][itemprop=item]:not([itemprop=mainEntity])');
                // Change selector positioning to relative for MrPorter
                $('[itemtype="http://schema.org/Product"][itemprop=item]:not([itemprop=mainEntity])').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'mrPorterCa', null);
                  }
                }
              }
            }
            // Stop item from loading
            $('a #plugged__button-root-multi').on('click', function (e) { e.preventDefault(); });
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMrPorterUsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("mrPorterUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('[itemtype="http://schema.org/Product"]:not([itemprop=mainEntity])').length) {
          clearInterval(checkExist);
          let productCards = $('[itemtype="http://schema.org/Product"]:not([itemprop=mainEntity])');
          // Change selector positioning to relative for MrPorter
          $('[itemtype="http://schema.org/Product"]:not([itemprop=mainEntity])').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'mrPorterUs', null);
            }
          }
          // Stop item from loading
          $('a #plugged__button-root-multi').on('click', function (e) { e.preventDefault(); });

          // For infinite scrolling
          let multiContainer = document.querySelector('[itemtype="http://schema.org/ItemList"]');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('[itemtype="http://schema.org/Product"]:not([itemprop=mainEntity])');
                // Change selector positioning to relative for MrPorter
                $('[itemtype="http://schema.org/Product"]:not([itemprop=mainEntity])').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'mrPorterUs', null);
                  }
                }
              }
            }
            // Stop item from loading
            $('a #plugged__button-root-multi').on('click', function (e) { e.preventDefault(); });
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadNrmlMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("nrml", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".collection__item").length) {
          clearInterval(checkExist);
          let productCards = $('.collection__item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'Nrml', `z-index: 100;`);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.grid-uniform');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.collection__item');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'Nrml', `z-index: 100;`);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSportchekMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("sportchek", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-grid__list-item").length) {
          clearInterval(checkExist);
          let productCards = $('.product-grid__list-item');
          // Change selector positioning to relative for Sportchek
          $('.product-grid__list-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'Sportchek', `z-index: 10;`);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadAdidasCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("adidasCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".gl-product-card").length) {
          clearInterval(checkExist);
          let productCards = $('.gl-product-card');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'Adidas (CA)', 'z-index: 15; top: 30px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('[data-auto-id=plp-results-page]');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.gl-product-card');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'Adidas (CA)', 'z-index: 15; top: 30px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadAdidasUsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("adidasUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".gl-product-card").length) {
          clearInterval(checkExist);
          let productCards = $('.gl-product-card');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'Adidas (CA)', 'z-index: 15; top: 30px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('[data-auto-id=plp-results-page]');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.gl-product-card');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'Adidas (US)', 'z-index: 15; top: 30px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadFrankAndOakMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("frankAndOak", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-list__item").length) {
          clearInterval(checkExist);
          let productCards = $('.product-list__item');
          // Change selector positioning to relative for Frank And Oak
          $('.product-list__item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'frankAndOak', 'top: 25px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.getElementById('productList');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-list__item');
                // Change selector positioning to relative for Frank And Oak
                $('.product-list__item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'frankAndOak', 'top: 25px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadUrbanOutfittersCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("urbanOutfittersCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".c-pwa-tile-grid-inner").length) {
          clearInterval(checkExist);
          let productCards = $('.c-pwa-tile-grid-inner');
          // Change selector positioning to relative for Urban Outfitters
          $('.c-pwa-tile-grid-inner').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'urbanOutfittersCa', 'top: 25px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadUrbanOutfittersUsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("urbanOutfittersUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".c-product-tile").length) {
          clearInterval(checkExist);
          let productCards = $('.c-product-tile');
          // Change selector positioning to relative for Urban Outfitters
          $('.c-product-tile').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'urbanOutfittersUs', 'top: 25px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadTheBayMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("theBay", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("div.pa-product-large").length) {
          clearInterval(checkExist);
          let productCards = $('div.pa-product-large');
          // Change selector positioning to relative for The Bay
          $('div.pa-product-large').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'theBay', 'top: 30px;');
            }
          }
          if ($('div.pa-product-large-third').length) {
            let endProductCards = $('div.pa-product-large-third');
            // Change selector positioning to relative for The Bay
            $('div.pa-product-large-third').css('position', 'relative');
            for (let i = 0; i < endProductCards.length; i++) {
              let exists = endProductCards[i].querySelector('#plugged__button-root-multi');
              if (!exists) {
                loadSite(endProductCards[i], endProductCards[i], 'theBay', 'top: 30px;');
              }
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadEndCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("endCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("a[data-test=ProductCard__ProductCardSC]").length) {
          clearInterval(checkExist);
          let productCards = $('a[data-test=ProductCard__ProductCardSC]');
          // Change selector positioning to relative for End
          $('a[data-test=ProductCard__ProductCardSC]').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'End (CA)', null);
            }
          }
          // Stop item from loading
          $('a[data-test=ProductCard__ProductCardSC] #plugged__button-root-multi').on('click', function (e) { e.preventDefault(); });

          // For infinite scrolling
          let multiContainer = document.querySelector('.cCVdPd');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('a[data-test=ProductCard__ProductCardSC]');
                // Change selector positioning to relative for End
                $('a[data-test=ProductCard__ProductCardSC]').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'End (CA)', null);
                  }
                }
                // Stop item from loading
                $('a[data-test=ProductCard__ProductCardSC] #plugged__button-root-multi').on('click', function (e) { e.preventDefault(); });
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadEndUsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("endUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("a[data-test=ProductCard__ProductCardSC]").length) {
          clearInterval(checkExist);
          let productCards = $('a[data-test=ProductCard__ProductCardSC]');
          // Change selector positioning to relative for End
          $('a[data-test=ProductCard__ProductCardSC]').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'End (US)', null);
            }
          }
          // Stop item from loading
          $('a[data-test=ProductCard__ProductCardSC] #plugged__button-root-multi').on('click', function (e) { e.preventDefault(); });

          // For infinite scrolling
          let multiContainer = document.querySelector('.cCVdPd');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('a[data-test=ProductCard__ProductCardSC]');
                // Change selector positioning to relative for End
                $('a[data-test=ProductCard__ProductCardSC]').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'End (US)', null);
                  }
                }
                // Stop item from loading
                $('a[data-test=ProductCard__ProductCardSC] #plugged__button-root-multi').on('click', function (e) { e.preventDefault(); });
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadDutilMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("dutil", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("ul.product-list > li.product").length) {
          clearInterval(checkExist);
          let productCards = $('ul.product-list > li.product');
          // Change selector positioning to relative for Dutil
          $('ul.product-list > li.product').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'dutil', 'z-index: 2001;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadAllSaintsCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("allSaintsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".category-grid > .product-item").length) {
          clearInterval(checkExist);
          let productCards = $('.category-grid > .product-item');
          // Change selector positioning to relative for AllSaints
          $('.category-grid > .product-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'allSaintsCa', 'z-index: 5;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.category-grid');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.category-grid > .product-item');
                // Change selector positioning to relative for AllSaints
                $('.category-grid > .product-item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'allSaintsCa', 'z-index: 5;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadAllSaintsUsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("allSaintsUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".category-grid > .product-item").length) {
          clearInterval(checkExist);
          let productCards = $('.category-grid > .product-item');
          // Change selector positioning to relative for AllSaints
          $('.category-grid > .product-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'allSaintsUs', 'z-index: 5;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.category-grid');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.category-grid > .product-item');
                // Change selector positioning to relative for AllSaints
                $('.category-grid > .product-item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'allSaintsUs', 'z-index: 5;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadAltitudeSportsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("altitudeSports", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".ss-product").length) {
          clearInterval(checkExist);
          let productCards = $('.ss-product');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'altitudeSports', 'top: 25px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.ss-products__grid');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.ss-product');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'altitudeSports', 'top: 25px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMackageCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("mackageCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".grid-tile:not(.grid-title-content)").length) {
          clearInterval(checkExist);
          let productCards = $('.grid-tile:not(.grid-title-content)');
          // Change selector positioning to relative for Mackage
          $('.grid-tile:not(.grid-title-content)').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'mackageCa', 'top: 25px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#search-result-items');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.grid-tile:not(.grid-title-content)');
                // Change selector positioning to relative for Mackage
                $('.grid-tile:not(.grid-title-content)').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'mackageCa', 'top: 25px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMackageUsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("mackageUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".grid-tile:not(.grid-title-content)").length) {
          clearInterval(checkExist);
          let productCards = $('.grid-tile:not(.grid-title-content)');
          // Change selector positioning to relative for Mackage
          $('.grid-tile:not(.grid-title-content)').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'mackageUs', 'top: 25px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#search-result-items');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.grid-tile:not(.grid-title-content)');
                // Change selector positioning to relative for Mackage
                $('.grid-tile:not(.grid-title-content)').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'mackageUs', 'top: 25px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadZaraCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("zaraCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("ul.product-list._productList > li.product._product:not(.marketing-banner)").length) {
          clearInterval(checkExist);
          let productCards = $('ul.product-list._productList > li.product._product:not(.marketing-banner)');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'zaraCa', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadZaraUsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("zaraUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("ul.product-list._productList > li.product._product:not(.marketing-banner)").length) {
          clearInterval(checkExist);
          let productCards = $('ul.product-list._productList > li.product._product:not(.marketing-banner)');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'zaraUs', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadWingsAndHornsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("wingsAndHorns", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#product--app > div > ul > li").length) {
          clearInterval(checkExist);
          let productCards = $('#product--app > div > ul > li');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'wingsAndHorns', 'width: unset;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadOakAndFortCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("oakAndFortCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".infinite-scroll-facet-items").length) {
          clearInterval(checkExist);
          let tileClass = $(".infinite-scroll-facet-items > div > div").attr('class').split(/\s+/);
          let productCards = $(`.${tileClass}`);
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'oakAndFortCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.infinite-scroll-facet-items');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $(`.${tileClass}`);
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'oakAndFortCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadOakAndFortUsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("oakAndFortUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".infinite-scroll-facet-items").length) {
          clearInterval(checkExist);
          let tileClass = $(".infinite-scroll-facet-items > div > div").attr('class').split(/\s+/);
          let productCards = $(`.${tileClass}`);
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'oakAndFortUs', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.infinite-scroll-facet-items');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $(`.${tileClass}`);
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'oakAndFortUs', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadUniqloCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("uniqloCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".fr-product-grid > .fr-grid-item").length) {
          clearInterval(checkExist);
          let productCards = $('.fr-product-grid > .fr-grid-item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'uniqloCa', 'top: 30px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.fr-product-grid');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.fr-product-grid > .fr-grid-item');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'uniqloCa', 'top: 30px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadUniqloUsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("uniqloUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        }
      }, 100);
    }
  } else if (msg.action === "loadTheLastHuntMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("theLastHunt", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".ss-products__grid > .ss-product").length) {
          clearInterval(checkExist);
          let productCards = $('.ss-products__grid > .ss-product');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'theLastHunt', 'top: 50px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.ss-products__grid');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.ss-products__grid > .ss-product');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'theLastHunt', 'top: 50px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadTateAndYokoMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("tateAndYoko", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".collection__item.product-item.grid__cell").length) {
          clearInterval(checkExist);
          let productCards = $('.collection__item.product-item.grid__cell');
          // Change selector positioning to relative for Tate
          $('.collection__item.product-item.grid__cell').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'tateAndYoko', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.collection--grid.grid--gallery');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.collection__item.product-item.grid__cell');
                // Change selector positioning to relative for Tate
                $('.collection__item.product-item.grid__cell').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'tateAndYoko', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadHmCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("hmCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.product-item").length) {
          clearInterval(checkExist);
          let productCards = $('li.product-item');
          // Change selector positioning to relative for H&M
          $('li.product-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'hmCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.collection--grid.grid--gallery');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.product-item');
                // Change selector positioning to relative for H&M
                $('li.product-item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'hmCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadAmericanEagleCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("americanEagleCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-tile').length) {
          clearInterval(checkExist);
          let productCards = $('.product-tile');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'americanEagleCa', 'z-index: 51; top: 30px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.results-list');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-tile');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'americanEagleCa', 'z-index: 51; top: 30px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadAdriftMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("adrift", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".collection-grid > .grid-item").length) {
          clearInterval(checkExist);
          let productCards = $('.collection-grid > .grid-item');
          // Change selector positioning to relative for Adrift
          $('.collection-grid > .grid-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'adrift', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadAbercrombieFitchCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("abercrombieFitchCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-card--anf.grid-item").length) {
          clearInterval(checkExist);
          let productCards = $('.product-card--anf.grid-item');
          // Change selector positioning to relative for A&F
          $('.product-card--anf.grid-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'abercrombieFitchCa', 'z-index: 10;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-grid__products');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-card--anf.grid-item');
                // Change selector positioning to relative for A&F
                $('.product-card--anf.grid-item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'abercrombieFitchCa', 'z-index: 10;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadAldoCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("aldoCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".c-product-tile:not(c-promo-tile)").length) {
          clearInterval(checkExist);
          let productCards = $('.c-product-tile:not(c-promo-tile)');
          // Change selector positioning to relative for Aldo
          $('.c-product-tile:not(c-promo-tile)').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i].querySelector('.c-product-tile__inner'), productCards[i], 'aldoCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.c-product-grid');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.c-product-tile:not(c-promo-tile)');
                // Change selector positioning to relative for Aldo
                $('.c-product-tile:not(c-promo-tile)').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i].querySelector('.c-product-tile__inner'), productCards[i], 'aldoCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadAsicsCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("asicsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.item.product.product-item").length) {
          clearInterval(checkExist);
          let productCards = $('li.item.product.product-item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'asicsCa', 'z-index: 3000;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadBananaRepublicCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("bananaRepublicCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-card-grid__inner").length) {
          clearInterval(checkExist);
          let productCards = $('.product-card-grid__inner');
          // Change selector positioning to relative for Banana Republic
          $('.product-card-grid__inner').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'bananaRepublicCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-card-grid__all-groups');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-card-grid__inner');
                // Change selector positioning to relative for Banana Republic
                $('.product-card-grid__inner').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'bananaRepublicCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadOldNavyCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("oldNavyCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-card-grid__inner").length) {
          clearInterval(checkExist);
          let productCards = $('.product-card-grid__inner');
          // Change selector positioning to relative for Old Navy
          $('.product-card-grid__inner').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'oldNavyCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-card-grid__all-groups');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-card-grid__inner');
                // Change selector positioning to relative for Old Navy
                $('.product-card-grid__inner').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'oldNavyCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadBlueButtonShopMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("blueButtonShop", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".css-container-wrapper > .css-prod-frame").length) {
          clearInterval(checkExist);
          let productCards = $('.css-container-wrapper > .css-prod-frame');
          // Change selector positioning to relative for Blue Button
          $('.css-container-wrapper > .css-prod-frame').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'blueButtonShop', 'z-index: 1; top: 10px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadBonobosMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("bonobos", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-tile-component").length) {
          clearInterval(checkExist);
          let productCards = $('.product-tile-component');
          // Change selector positioning to relative for Bonobos
          $('.product-tile-component').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'bonobos', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.category-hybrid-layout-component');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-tile-component');
                // Change selector positioning to relative for Bonobos
                $('.product-tile-component').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'bonobos', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadBrooklynClothingMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("brooklynClothing", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".productgrid--item").length) {
          clearInterval(checkExist);
          let productCards = $('.productgrid--item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'brooklynClothing', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.productgrid--items');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.productgrid--item');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'brooklynClothing', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadBrownsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("browns", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.grid-tile").length) {
          clearInterval(checkExist);
          let productCards = $('li.grid-tile');
          // Change selector positioning to relative for Browns
          $('li.grid-tile').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'browns', 'z-index: 80;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('ul.search-result-items');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.grid-tile');
                // Change selector positioning to relative for Browns
                $('li.grid-tile').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'browns', 'z-index: 80;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadCalvinKleinCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("calvinKleinCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".productCell").length) {
          clearInterval(checkExist);
          let productCards = $('.productCell');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'calvinKleinCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#products > div');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.productCell');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'calvinKleinCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadCapsuleMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("capsule", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".collection-products > li").length) {
          clearInterval(checkExist);
          let productCards = $('.collection-products > li');
          // Change selector positioning to relative for Capsule
          $('.collection-products > li').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'capsule', 'z-index: 1;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadClubMonacoCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("clubMonacoCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#search-result-items > .grid-tile").length) {
          clearInterval(checkExist);
          let productCards = $('#search-result-items > .grid-tile');
          // Change selector positioning to relative for ClubMonacoCa
          $('#search-result-items > .grid-tile').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'clubMonacoCa', 'top: 30px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.primary-content ');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('#search-result-items > .grid-tile');
                // Change selector positioning to relative for ClubMonacoCa
                $('#search-result-items > .grid-tile').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'clubMonacoCa', 'top: 30px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadCntrbndMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("cntrbnd", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-block.grid__item").length) {
          clearInterval(checkExist);
          let productCards = $('.product-block.grid__item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'cntrbnd', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadCoachCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("coachCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".prod-grid").length) {
          clearInterval(checkExist);
          let productCards = $('.prod-grid');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'coachCa', 'z-index: 5; top: 35px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.search-result-content');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.prod-grid');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'coachCa', 'z-index: 5; top: 35px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadCourtsideSneakersMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("courtsideSneakers", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-list-item").length) {
          clearInterval(checkExist);
          let productCards = $('.product-list-item');
          // Change selector positioning to relative for Courtside Sneakers
          $('.product-list-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'courtsideSneakers', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadDueWestMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("dueWest", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".products > div[itemprop=itemListElement]").length) {
          clearInterval(checkExist);
          let productCards = $('.products > div[itemprop=itemListElement]');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'dueWest', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadDynamiteCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("dynamiteCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#tile_0").length) {
          clearInterval(checkExist);
          let tileClass = $('#tile_0').attr('class').split(/\s+/)[0];
          let productCards = $(`.${tileClass}`);
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'dynamiteCa', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadEddieBauerCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("eddieBauerCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".tile_wrapper_outer").length) {
          clearInterval(checkExist);
          let productCards = $('.tile_wrapper_outer');
          // Change selector positioning to relative for EddieBauer
          $('.tile_wrapper_outer').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'eddieBauerCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.tile_wrapper_outer').parentElement;
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.tile_wrapper_outer');
                // Change selector positioning to relative for EddieBauer
                $('.tile_wrapper_outer').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'eddieBauerCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadGarageCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("garageCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#tile_0").length) {
          clearInterval(checkExist);
          let tileClass = $('#tile_0').attr('class').split(/\s+/)[0];
          let productCards = $(`.${tileClass}`);
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'garageCa', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadFamousFootwearCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("famousFootwearCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".searchResultsThumbnails > .productCell").length) {
          clearInterval(checkExist);
          let productCards = $('.searchResultsThumbnails > .productCell');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'famousFootwearCa', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadFootLockerCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("footLockerCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.product-container").length) {
          clearInterval(checkExist);
          let productCards = $('li.product-container');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'footLockerCa', 'top: 30px; z-index: 1;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadFourHorsemenMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("fourHorsemen", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-list-item").length) {
          clearInterval(checkExist);
          let productCards = $('.product-list-item');
          // Change selector positioning to relative for Four Horsemen
          $('.product-list-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'fourHorsemen', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadGapCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("gapCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-card-grid__inner").length) {
          clearInterval(checkExist);
          let productCards = $('.product-card-grid__inner');
          // Change selector positioning to relative for Gap
          $('.product-card-grid__inner').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'gapCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-card-grid__all-groups');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-card-grid__inner');
                // Change selector positioning to relative for Gap
                $('.product-card-grid__inner').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'gapCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadAritziaCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("aritziaCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#search-result-items > .grid-tile:not(.ga-promotions)").length) {
          clearInterval(checkExist);
          let productCards = $('#search-result-items > .grid-tile:not(.ga-promotions)');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'aritziaCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#main');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('#search-result-items > .grid-tile:not(.ga-promotions)');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'aritziaCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadFarfetchCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("farfetchCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li[data-test=productCard]").length) {
          clearInterval(checkExist);
          let productCards = $('li[data-test=productCard]');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'farfetchCa', 'top: 30px; z-index: 1;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadGerhardMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("gerhard", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".ProductList-item").length) {
          clearInterval(checkExist);
          let productCards = $('.ProductList-item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'gerhard', 'z-index: 5; top: 50px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadGravitypopeMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("gravitypope", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".grid__item.product__grid-item").length) {
          clearInterval(checkExist);
          let productCards = $('.grid__item.product__grid-item');
          // Change selector positioning to relative for Gravitypope
          $('.grid__item.product__grid-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'gravitypope', 'z-index: 100000;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.grid-uniform.collection-wrapper');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.grid__item.product__grid-item');
                // Change selector positioning to relative for Gravitypope
                $('.grid__item.product__grid-item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'gravitypope', 'z-index: 100000;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadGuessCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("guessCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.product-bucket").length) {
          clearInterval(checkExist);
          let productCards = $('li.product-bucket');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'guessCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#productList');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.product-bucket');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'guessCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadGuessFactoryCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("guessFactoryCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.product-bucket").length) {
          clearInterval(checkExist);
          let productCards = $('li.product-bucket');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'guessFactoryCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#productList');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.product-bucket');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'guessFactoryCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadGstarCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("gstarCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".productTile-images").length) {
          clearInterval(checkExist);
          let productCards = $('.productTile-images');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'gstarCa', null);
            }
          }
          // Stop item from loading
          $('a #plugged__button-root-multi').on('click', function (e) { e.preventDefault(); });

          // For infinite scrolling
          let multiContainer = document.querySelector('.productLister-productTileInner');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.productTile-images');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'gstarCa', null);
                  }
                }
              }
            }
            // Stop item from loading
            $('a #plugged__button-root-multi').on('click', function (e) { e.preventDefault(); });
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadAcneStudiosCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("acneStudiosCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        }
      }, 100);
    }
  } else if (msg.action === "loadHarryRosenMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("harryRosen", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        }
      }, 100);
    }
  } else if (msg.action === "loadHbxMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("hbx", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#products-container > .product-wrapper").length) {
          clearInterval(checkExist);
          let productCards = $('#products-container > .product-wrapper');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'hbx', 'z-index: 3;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#products-container');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('#products-container > .product-wrapper');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'hbx', 'z-index: 3;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadHenrySingerMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("henrySinger", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#product-loop > .product-index").length) {
          clearInterval(checkExist);
          let productCards = $('#product-loop > .product-index');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'henrySinger', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadHunterCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("hunterCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.listing__item").length) {
          clearInterval(checkExist);
          let productCards = $('li.listing__item');
          // Change selector positioning to relative for Hunter
          $('li.listing__item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'hunterCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('ul.listing__items');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.listing__item');
                // Change selector positioning to relative for Hunter
                $('li.listing__item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'hunterCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadHollisterCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("hollisterCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-card--hol.grid-item").length) {
          clearInterval(checkExist);
          let productCards = $('.product-card--hol.grid-item');
          // Change selector positioning to relative for Hollister
          $('.product-card--hol.grid-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'hollisterCa', 'z-index: 10;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-grid__products');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-card--hol.grid-item');
                // Change selector positioning to relative for Hollister
                $('.product-card--hol.grid-item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'hollisterCa', 'z-index: 10;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadInfluenceuCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("influenceuCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".productItemBlck").length) {
          clearInterval(checkExist);
          let productCards = $('.productItemBlck');
          // Change selector positioning to relative for Influenceu
          $('.productItemBlck').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'influenceuCa', 'z-index: 1;');
            }
          }

          // Stop item from loading
          $('a #plugged__button-root-multi').on('click', function (e) { e.preventDefault(); });

          // For infinite scrolling
          let multiContainer = document.querySelector('#productsContainer');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.productItemBlck');
                // Change selector positioning to relative for Influenceu
                $('.productItemBlck').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'influenceuCa', 'z-index: 1;');
                  }
                }
              }
            }
            // Stop item from loading
            $('a #plugged__button-root-multi').on('click', function (e) { e.preventDefault(); });
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadJcrewFactoryCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("jcrewFactoryCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.c-product-tile").length) {
          clearInterval(checkExist);
          let productCards = $('li.c-product-tile');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'jcrewFactoryCa', 'z-index: 1;');
            }
          }

          // For infinite scrolling
          let multiContainer = document.querySelector('#productsContainer');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.c-product-tile');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'jcrewFactoryCa', 'z-index: 1;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadJcrewCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("jcrewCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.c-product-tile").length) {
          clearInterval(checkExist);
          let productCards = $('li.c-product-tile');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'jcrewCa', 'z-index: 1;');
            }
          }

          // For infinite scrolling
          let multiContainer = document.querySelector('#productsContainer');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.c-product-tile');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'jcrewCa', 'z-index: 1;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadBestsellerMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("bestseller", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.collection__product").length) {
          clearInterval(checkExist);
          let productCards = $('li.collection__product');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'bestseller', null);
            }
          }

          // For infinite scrolling
          let multiContainer = document.querySelector('ul.collection__product-grid');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.collection__product');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'bestseller', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadBricksAndBondsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("bricksAndBonds", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.product.type-product").length) {
          clearInterval(checkExist);
          let productCards = $('li.product.type-product');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'bricksAndBonds', 'z-index: 1;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadJoeFreshMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("joeFresh", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".saffron___ProductListItem__product-list-item-container___3FiFn").length) {
          clearInterval(checkExist);
          let productCards = $('.saffron___ProductListItem__product-list-item-container___3FiFn');
          // Change selector positioning to relative for Joefresh
          $('.saffron___ProductListItem__product-list-item-container___3FiFn').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'joeFresh', null);
            }
          }

          // For infinite scrolling
          let multiContainer = document.querySelector('.saffron___ProductPage__product-page-container___Y67Br');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.saffron___ProductListItem__product-list-item-container___3FiFn');
                // Change selector positioning to relative for Joefresh
                $('.saffron___ProductListItem__product-list-item-container___3FiFn').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'joeFresh', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadKateSpadeMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("kateSpade", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".search-result-items > .grid-tile").length) {
          clearInterval(checkExist);
          let productCards = $('.search-result-items > .grid-tile');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'kateSpade', 'z-index: 1; top: 40px;');
            }
          }

          // For infinite scrolling
          let multiContainer = document.querySelector('.search-result-items.tiles-container');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.search-result-items > .grid-tile');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'kateSpade', 'z-index: 1; top: 40px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLaSenzaCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("laSenzaCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.grid-tile").length) {
          clearInterval(checkExist);
          let productCards = $('li.grid-tile');
          // Change selector positioning to relative for LaSenza
          $('li.grid-tile').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'laSenzaCa', 'top: 25px;');
            }
          }

          // For infinite scrolling
          let multiContainer = document.querySelector('#search-result-items');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.grid-tile');
                // Change selector positioning to relative for LaSenza
                $('li.grid-tile').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'laSenzaCa', 'top: 25px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLacosteCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("lacosteCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".js-plp-tiles.grid > div").length) {
          clearInterval(checkExist);
          let productCards = $('.js-plp-tiles.grid > div');
          // Change selector positioning to relative for lacoste
          $('.js-plp-tiles.grid > div').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'lacosteCa', null);
            }
          }

          // For infinite scrolling
          let multiContainer = document.querySelector('.js-plp-tiles.grid');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.js-plp-tiles.grid > div');
                // Change selector positioning to relative for lacoste
                $('.js-plp-tiles.grid > div').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'lacosteCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLevisCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("levisCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-item").length) {
          clearInterval(checkExist);
          let productCards = $('.product-item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'levisCa', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLessonsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("lessons", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".grid--view-items > .grid__item").length) {
          clearInterval(checkExist);
          let productCards = $('.grid--view-items > .grid__item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'lessons', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLeoBoutiqueMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("leoBoutique", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".collection-main-body-inner > .grid__item").length) {
          clearInterval(checkExist);
          let productCards = $('.collection-main-body-inner > .grid__item');
          // Change selector positioning to relative for Leo
          $('.collection-main-body-inner > .grid__item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'leoBoutique', 'z-index: 10;');
            }
          }

          // For infinite scrolling
          let multiContainer = document.querySelector('.collection-main-body-inner');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.collection-main-body-inner > .grid__item');
                // Change selector positioning to relative for Leo
                $('.collection-main-body-inner > .grid__item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'leoBoutique', 'z-index: 10;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLess17Multi") {
    if (HelperFunctions.plugged_isMerchantUrl("less17", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".collection-container > .grid__item").length) {
          clearInterval(checkExist);
          let productCards = $('.collection-container > .grid__item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'less17', 'top: 30px; margin-right: 10px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLLBeanCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("lLBeanCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.grid-tile").length) {
          clearInterval(checkExist);
          let productCards = $('li.grid-tile');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'lLBeanCa', 'z-index: 2;');
            }
          }

          // For infinite scrolling
          let multiContainer = document.querySelector('#search-result-items');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.grid-tile');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'lLBeanCa', 'z-index: 2;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLidsCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("lidsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-card").length) {
          clearInterval(checkExist);
          let productCards = $('.product-card');
          // Change selector positioning to relative for Lids
          $('.product-card').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'lidsCa', null);
            }
          }

          // For infinite scrolling
          let multiContainer = document.querySelector('.product-grid-container');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-card');
                // Change selector positioning to relative for Lids
                $('.product-card').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'lidsCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLittleBurgundyMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("littleBurgundy", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-section-column").length) {
          clearInterval(checkExist);
          let productCards = $('.product-section-column');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'littleBurgundy', 'z-index: 1; margin-right: 35px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLostAndFoundMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("lostAndFound", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-thumbnail.column").length) {
          clearInterval(checkExist);
          let productCards = $('.product-thumbnail.column');
          // Change selector positioning to relative for LostAndFound
          $('.product-thumbnail.column').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'lostAndFound', 'z-index: 2;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLululemonCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("lululemonCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-list-item:not(.promo-tile)").length) {
          clearInterval(checkExist);
          let productCards = $('.product-list-item:not(.promo-tile)');
          // Change selector positioning to relative for Lulu
          $('.product-list-item:not(.promo-tile)').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'lululemonCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-list > .row');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-list-item:not(.promo-tile)');
                // Change selector positioning to relative for Lulu
                $('.product-list-item:not(.promo-tile)').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'lululemonCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadExclucityMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("exclucity", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".list-products > .grid__cell").length) {
          clearInterval(checkExist);
          let productCards = $('.list-products > .grid__cell');
          // Change selector positioning to relative for Exclucity
          $('.list-products > .grid__cell').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'exclucity', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMangoCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("mangoCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#page1").length) {
          clearInterval(checkExist);
          let cardClass = $('#page1 > div > li').attr('class').split(/\s+/)[0];
          let productCards = $(`.${cardClass}`);
          // Change selector positioning to relative for Mango
          $(`.${cardClass}`).css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'mangoCa', 'z-index: 1;');
            }
          }
          // For infinite scrolling
          let cardListClass = $('#page1 > div').attr('class').split(/\s+/)[0];
          let multiContainer = document.querySelector(`.${cardListClass}`);
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $(`.${cardClass}`);
                // Change selector positioning to relative for Mango
                $(`.${cardClass}`).css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'mangoCa', 'z-index: 1;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMarksMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("marks", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.product-grid__item").length) {
          clearInterval(checkExist);
          let productCards = $('li.product-grid__item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'marks', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-grid__list');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.product-grid__item');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'marks', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMarsClothingMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("marsClothing", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#section-collection > .site-box").length) {
          clearInterval(checkExist);
          let productCards = $('#section-collection > .site-box');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'marsClothing', 'z-index: 9;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#section-collection');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('#section-collection > .site-box');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'marsClothing', 'z-index: 9;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMaviMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("mavi", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        }
      }, 100);
    }
  } else if (msg.action === "loadMilohShopMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("milohShop", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-grid-item").length) {
          clearInterval(checkExist);
          let productCards = $('.product-grid-item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'milohShop', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMichaelKorsCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("michaelKorsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('li.product-tile').length) {
          clearInterval(checkExist);
          let productCards = $('li.product-tile');
          // Change selector positioning to relative for MichaelKors
          $('li.product-tile').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'michaelKorsCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('ul.product-wrapper');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.product-tile');
                // Change selector positioning to relative for MichaelKors
                $('li.product-tile').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'michaelKorsCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMichelBrissonMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("michelBrisson", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".products-list > .col-xs-6").length) {
          clearInterval(checkExist);
          let productCards = $('.products-list > .col-xs-6');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'michelBrisson', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMooseKnucklesMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("mooseKnuckles", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.product-item:not(.promo-block)").length) {
          clearInterval(checkExist);
          let productCards = $('li.product-item:not(.promo-block)');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'mooseKnuckles', 'z-index: 3; margin-top: 70px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMecMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("mec", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-grid > .flexigrid__tile").length) {
          clearInterval(checkExist);
          let productCards = $('.product-grid > .flexigrid__tile');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'mec', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMuttonheadMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("muttonhead", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".grid--collection > .grid-product").length) {
          clearInterval(checkExist);
          let productCards = $('.grid--collection > .grid-product');
          // Change selector positioning to relative for Muttonhead
          $('.grid--collection > .grid-product').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'muttonhead', 'margin-top: 35px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMuddyGeorgeMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("muddyGeorge", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("article.product-list-item").length) {
          clearInterval(checkExist);
          let productCards = $('article.product-list-item');
          // Change selector positioning to relative for Muddy George
          $('article.product-list-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'muddyGeorge', 'margin-top: 60px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadNeighbourMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("neighbour", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#products > .product").length) {
          clearInterval(checkExist);
          let productCards = $('#products > .product');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'neighbour', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadNeimanMarcusCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("neimanMarcusCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('li.category-item').length) {
          clearInterval(checkExist);
          let productCards = $('li.category-item');
          // Change selector positioning to relative for NeimanMarcus
          $('li.category-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'neimanMarcusCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('ul.category-items');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.category-item');
                // Change selector positioning to relative for NeimanMarcus
                $('li.category-item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'neimanMarcusCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadNewBalanceCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("newBalanceCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-list > li.tile').length) {
          clearInterval(checkExist);
          let productCards = $('.product-list > li.tile');
          // Change selector positioning to relative for NewBalance
          $('.product-list > li.tile').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'newBalanceCa', 'margin-top: 30px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('ul.product-list');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-list > li.tile');
                // Change selector positioning to relative for NewBalance
                $('.product-list > li.tile').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'newBalanceCa', 'margin-top: 30px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadTheNorthFaceCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("theNorthFaceCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#catalog-results > .product-block').length) {
          clearInterval(checkExist);
          let productCards = $('#catalog-results > .product-block');
          // Change selector positioning to relative for TNF
          $('#catalog-results > .product-block').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'theNorthFaceCa', 'margin-top: 110px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#catalog-results');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('#catalog-results > .product-block');
                // Change selector positioning to relative for TNF
                $('#catalog-results > .product-block').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'theNorthFaceCa', 'margin-top: 110px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadOffTheHookMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("offTheHook", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-list > .product-block").length) {
          clearInterval(checkExist);
          let productCards = $('.product-list > .product-block');
          // Change selector positioning to relative for OffTheHook
          $('.product-list > .product-block').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'offTheHook', 'margin-top: 60px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadOverTheRainbowMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("overTheRainbow", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".collection-products > article").length) {
          clearInterval(checkExist);
          let productCards = $('.collection-products > article');
          // Change selector positioning to relative for OverTheRainbow
          $('.collection-products > article').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'overTheRainbow', 'margin-top: 60px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadPalmAngelsCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("palmAngelsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        }
      }, 100);
    }
  } else if (msg.action === "loadPandoraCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("pandoraCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('li.SearchGrid__tile').length) {
          clearInterval(checkExist);
          let productCards = $('li.SearchGrid__tile:not(.SearchGrid__tile--double)');
          // Change selector positioning to relative for Pandora
          $('li.SearchGrid__tile:not(.SearchGrid__tile--double)').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'pandoraCa', 'margin-top: 40px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#search-result-items');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.SearchGrid__tile:not(.SearchGrid__tile--double)');
                // Change selector positioning to relative for Pandora
                $('li.SearchGrid__tile:not(.SearchGrid__tile--double)').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'pandoraCa', 'margin-top: 40px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadPatagoniaCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("patagoniaCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-tile:not(.product-tile--config)').length) {
          clearInterval(checkExist);
          let productCards = $('.product-tile:not(.product-tile--config)');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'patagoniaCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-grid');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-tile:not(.product-tile--config)');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'patagoniaCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadPeaceCollectiveMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("peaceCollective", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('article.product--root').length) {
          clearInterval(checkExist);
          let productCards = $('article.product--root');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'peaceCollective', 'margin-top: 110px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-grid');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('article.product--root');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'peaceCollective', 'margin-top: 110px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadPumaCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("pumaCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-grid > .col-6:not(.grid-tile)').length) {
          clearInterval(checkExist);
          let productCards = $('.product-grid > .col-6:not(.grid-tile)');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'pumaCa', 'margin-top: 40px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-grid');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-grid > .col-6:not(.grid-tile)');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'pumaCa', 'margin-top: 40px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadRealSportsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("realSports", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#product-loop > .product-index").length) {
          clearInterval(checkExist);
          let productCards = $('#product-loop > .product-index');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'realSports', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadReebokCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("reebokCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".gl-product-card").length) {
          clearInterval(checkExist);
          let productCards = $('.gl-product-card');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'reebokCa', 'z-index: 15; top: 30px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('[data-auto-id=plp-results-page]');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.gl-product-card');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'reebokCa', 'z-index: 15; top: 30px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadCommonMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("common", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#product-loop > .product").length) {
          clearInterval(checkExist);
          let productCards = $('#product-loop > .product');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'common', 'z-index: 100000; margin-top: 50px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadRootsCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("rootsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-tile").length) {
          clearInterval(checkExist);
          let productCards = $('.product-tile');
          // Change selector positioning to relative for Roots
          $('.product-tile').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'rootsCa', null);
            }
          }

          // For infinite scrolling
          let multiContainer = document.querySelector('#search-result-items');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-tile');
                // Change selector positioning to relative for Roots
                $('.product-tile').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'rootsCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadRodenGrayMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("rodenGray", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".collection-list__card").length) {
          clearInterval(checkExist);
          let productCards = $('.collection-list__card');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'rodenGray', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadRooneyMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("rooney", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-list-item").length) {
          clearInterval(checkExist);
          let productCards = $('.product-list-item');
          // Change selector positioning to relative for Rooney
          $(".product-list-item").css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'rooney', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSaksFifthAvenueCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("saksFifthAvenueCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.product").length) {
          clearInterval(checkExist);
          let productCards = $('li.product');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'saksFifthAvenueCa', 'margin-top: 40px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSaksOffFifthCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("saksOffFifthCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.product").length) {
          clearInterval(checkExist);
          let productCards = $('li.product');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'saksOffFifthCa', 'margin-top: 40px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSauconyCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("sauconyCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.grid-tile").length) {
          clearInterval(checkExist);
          let productCards = $('li.grid-tile');
          // Change selector positioning to relative for Saucony
          $('li.grid-tile').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'sauconyCa', null);
            }
          }

          // For infinite scrolling
          let multiContainer = document.querySelector('.search-result-items');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.grid-tile');
                // Change selector positioning to relative for Saucony
                $('li.grid-tile').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'sauconyCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSephoraCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("sephoraCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('[data-comp="ProductItem "]').length && $('[data-comp="ProductItem "]').parent()) {
          clearInterval(checkExist);
          let tileClass = $('[data-comp="ProductItem "]').parent().attr('class').split(/\s+/);
          let productCards = $(`.${tileClass[0]}`);
          // Change selector positioning to relative for Sephora
          $(`.${tileClass[0]}`).css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'sephoraCa', 'top: 10px; z-index: 1;');
            }
          }
          // For infinite scrolling
          let multiContainer = $(`.${tileClass[0]}`).parent().parent();
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $(`.${tileClass[0]}`);
                // Change selector positioning to relative for Sephora
                $(`.${tileClass[0]}`).css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'sephoraCa', 'top: 10px; z-index: 1;');
                  }
                }
              }
            }
          });
          if (multiContainer && multiContainer.length > 0) {
            observer.observe(multiContainer[0], options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSportsExpertsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("sportsExperts", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("div[data-qa=search-results]").length || $("div[data-qa=search-result]")) {
          clearInterval(checkExist);
          let productCards = $('div[data-qa=search-results]');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'sportsExperts', 'z-index: 1;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('div[data-qa=search-results]').parentElement;
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('div[data-qa=search-results]');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'sportsExperts', 'z-index: 1;');
                  }
                }
              }
            }
          });
          if (multiContainer && multiContainer.length > 0) {
            observer.observe(multiContainer[0], options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadAtmosphereMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("atmosphere", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('li.product-grid__list-item').length) {
          clearInterval(checkExist);
          let productCards = $('li.product-grid__list-item');
          // Change selector positioning to relative for Atmosphere
          $('li.product-grid__list-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'atmosphere', 'z-index: 5;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('ul.product-grid__list');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('article.product--root');
                // Change selector positioning to relative for Atmosphere
                $('li.product-grid__list-item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'atmosphere', 'z-index: 5;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSpringCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("springCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('li.c-product-tile').length) {
          clearInterval(checkExist);
          let productCards = $('li.c-product-tile');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'springCa', 'margin-top: 45px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('ul.c-product-grid--cis');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.c-product-tile');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'springCa', 'margin-top: 45px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSteveMaddenCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("steveMaddenCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".flexBox > .product").length) {
          clearInterval(checkExist);
          let productCards = $('.flexBox > .product');
          // Change selector positioning to relative for SteveMadden
          $(".flexBox > .product").css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'steveMaddenCa', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSimonsCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("simonsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product_card").length) {
          clearInterval(checkExist);
          let productCards = $('.product_card');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'simonsCa', 'z-index: 13; margin-top: 25px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product_category');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product_card');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'simonsCa', 'z-index: 13; margin-top: 25px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSolestopMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("solestop", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".products-grid > .grid-item").length) {
          clearInterval(checkExist);
          let productCards = $('.products-grid > .grid-item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'solestop', 'top: 65px; z-index: 10;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#shopify-section-collection-template');
          let options = {
            childList: true,
            subtree: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.products-grid > .grid-item');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'solestop', 'top: 65px; z-index: 10;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSoftMocCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("softMocCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#product-grid-container > .grid-item").length) {
          clearInterval(checkExist);
          let productCards = $('#product-grid-container > .grid-item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'softMocCa', 'margin-top: 35px; z-index: 1;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#product-grid-container');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('#product-grid-container > .grid-item');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'softMocCa', 'margin-top: 35px; z-index: 1;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSpierAndMackayMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("spierAndMackay", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("ul.products-grid > li.item").length) {
          clearInterval(checkExist);
          let productCards = $('ul.products-grid > li.item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'spierAndMackay', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadSportingLifeCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("sportingLifeCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.grid-tile").length) {
          clearInterval(checkExist);
          let productCards = $('li.grid-tile');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'sportingLifeCa', 'z-index: 13;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('ul#search-result-items');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.grid-tile');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'sportingLifeCa', 'z-index: 13;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadStillLifeMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("stillLife", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#product-loop > .product-index").length) {
          clearInterval(checkExist);
          let productCards = $('#product-loop > .product-index');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'stillLife', 'z-index: 1;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadUncleOtisMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("uncleOtis", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("ul#products > li").length) {
          clearInterval(checkExist);
          let productCards = $('ul#products > li');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'uncleOtis', 'z-index: 10; margin-top: 45px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('ul#products');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('ul#products > li');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'uncleOtis', 'z-index: 10; margin-top: 45px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadUnderstudyMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("understudy", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".collection-grid-item").length) {
          clearInterval(checkExist);
          let productCards = $('.collection-grid-item');
          // Change selector positioning to relative for Understudy
          $('.collection-grid-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'understudy', 'z-index: 2400;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadArcteryxCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("arcteryxCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-tile").length) {
          clearInterval(checkExist);
          let productCards = $('.product-tile');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'arcteryxCa', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadBestBuyCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("bestBuyCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".x-productListItem").length) {
          clearInterval(checkExist);
          let productCards = $('.x-productListItem');
          // Change selector positioning to relative for BestBuy
          $('.x-productListItem').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'bestBuyCa', 'z-index: 10; top: 75px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.x-productListItem').parentElement;
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.x-productListItem');
                // Change selector positioning to relative for BestBuy
                $('.x-productListItem').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'bestBuyCa', 'z-index: 10; top: 75px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadWalmartCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("walmartCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("article.product").length) {
          clearInterval(checkExist);
          let productCards = $('article.product');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'walmartCa', 'width: unset;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.shelf-thumbs');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('article.product');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'walmartCa', 'width: unset;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadHerschelCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("herschelCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".card-product").length || $('.featured-product-2020').length) {
          clearInterval(checkExist);
          let productCards = $('.card-product');
          let productCards2 = $('.featured-product-2020');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'herschelCa', null);
            }
          }
          for (let i = 0; i < productCards2.length; i++) {
            let exists = productCards2[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards2[i], productCards2[i], 'herschelCa', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadIkeaCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("ikeaCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".catalog-product-list__fragment").length) {
          clearInterval(checkExist);
          let productCards = $('.catalog-product-list__fragment');
          // Change selector positioning to relative for Ikea
          $('.catalog-product-list__fragment').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'ikeaCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.range-product-list__products');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.catalog-product-list__fragment');
                // Change selector positioning to relative for Ikea
                $('.catalog-product-list__fragment').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'ikeaCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadIndigoCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("indigoCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-list__product--grid").length) {
          clearInterval(checkExist);
          let productCards = $('.product-list__product--grid');
          // Change selector positioning to relative for Indigo
          $('.product-list__product--grid').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'indigoCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-list__results-container--grid');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-list__product--grid');
                // Change selector positioning to relative for Indigo
                $('.product-list__product--grid').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'indigoCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadTheSourceMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("theSource", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".productListItem").length) {
          clearInterval(checkExist);
          let productCards = $('.productListItem');
          // // Change selector positioning to relative for The Source
          // $('.productListItem').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'theSource', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.productList');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.productListItem');
                // // Change selector positioning to relative for The Source
                // $('.productListItem').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'theSource', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadStaplesMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("staples", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".ais-hits--item").length) {
          clearInterval(checkExist);
          let productCards = $('.ais-hits--item');
          // Change selector positioning to relative for Staples
          $('.ais-hits--item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'staples', 'margin-top: 40px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.ais-hits--item');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.ais-hits--item');
                // Change selector positioning to relative for Staples
                $('.ais-hits--item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'staples', 'margin-top: 40px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadCanadianTireMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("canadianTire", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".temporary-grid-item").length) {
          clearInterval(checkExist);
          let productCards = $('.temporary-grid-item');
          // Change selector positioning to relative for Canadian Tire
          $('.temporary-grid-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'canadianTire', 'margin-top: 45px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.search-results-grid__content');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.temporary-grid-item');
                // Change selector positioning to relative for Canadian Tire
                $('.temporary-grid-item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'canadianTire', 'margin-top: 45px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadTheShoeCompanyCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("theShoeCompanyCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".result-list__tiles").length) {
          clearInterval(checkExist);
          let productCards = $('.result-list__tiles');
          // Change selector positioning to relative for The Shoe Company
          $('.result-list__tiles').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'theShoeCompanyCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.result-list__tiles-container');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.result-list__tiles');
                // Change selector positioning to relative for The Shoe Company
                $('.result-list__tiles').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'theShoeCompanyCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadDesignerShoeWarehouseCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("designerShoeWarehouseCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".result-list__tiles").length) {
          clearInterval(checkExist);
          let productCards = $('.result-list__tiles');
          // Change selector positioning to relative for designerShoeWarehouseCa
          $('.result-list__tiles').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'designerShoeWarehouseCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.result-list__tiles-container');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.result-list__tiles');
                // Change selector positioning to relative for designerShoeWarehouseCa
                $('.result-list__tiles').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'designerShoeWarehouseCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadShoeWarehouseCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("shoeWarehouseCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".result-list__tiles").length) {
          clearInterval(checkExist);
          let productCards = $('.result-list__tiles');
          // Change selector positioning to relative for shoeWarehouseCa
          $('.result-list__tiles').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'shoeWarehouseCa', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.result-list__tiles-container');
          let options = {
            childList: true
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.result-list__tiles');
                // Change selector positioning to relative for shoeWarehouseCa
                $('.result-list__tiles').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'shoeWarehouseCa', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadCostcoCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("costcoCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-tile-set").length) {
          clearInterval(checkExist);
          let productCards = $('.product-tile-set');
          // Change selector positioning to relative for Costco
          $('.product-tile-set').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'costcoCa', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadBoutique1861Multi") {
    if (HelperFunctions.plugged_isMerchantUrl("boutique1861", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-list").length) {
          clearInterval(checkExist);
          let productCards = $('.product-list > .thumbnail');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'boutique1861', 'margin-top: 50px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadCleoMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("cleo", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#search-result-items").length) {
          clearInterval(checkExist);
          let productCards = $('#search-result-items > .grid-tile > .product-tile');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'cleo', 'z-index: 1; margin-top: 50px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#search-result-items');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('#search-result-items > .grid-tile > .product-tile');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'cleo', 'z-index: 1; margin-top: 50px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadRickisMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("rickis", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#search-result-items").length) {
          clearInterval(checkExist);
          let productCards = $('#search-result-items > .grid-tile > .product-tile');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'rickis', 'z-index: 1; margin-top: 50px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#search-result-items');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('#search-result-items > .grid-tile > .product-tile');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'rickis', 'z-index: 1; margin-top: 50px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadHoltRenfrewMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("holtRenfrew", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.product-item").length) {
          clearInterval(checkExist);
          let productCards = $('li.product-item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'holtRenfrew', 'z-index: 1;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadKotnMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("kotn", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".productGrid-item").length || $('.productGrid-item--large').length) {
          clearInterval(checkExist);
          let productCards = $('.productGrid-item');
          let productCardsLarge = $('.productGrid-item--large');
          // Change selector positioning to relative for Kotn
          $('.productGrid-item').css('position', 'relative');
          $('.productGrid-item--large').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'kotn', 'z-index: 10;');
            }
          }
          for (let i = 0; i < productCardsLarge.length; i++) {
            let exists = productCardsLarge[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCardsLarge[i], productCardsLarge[i], 'kotn', 'z-index: 10;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLaCanadienneMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("laCanadienne", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.product-item").length) {
          clearInterval(checkExist);
          let productCards = $('li.product-item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'laCanadienne', 'z-index: 100; padding-top: 15px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLoleCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("loleCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#product_list_container").length) {
          clearInterval(checkExist);
          let productCards = $('#product_list_container > .columns');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'loleCa', 'z-index: 3;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#product_list_container');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('#product_list_container > .columns');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'loleCa', 'z-index: 3;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadRwCoMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("rwCo", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.grid-tile").length) {
          clearInterval(checkExist);
          let productCards = $('li.grid-tile');
          // Change selector positioning to relative for rwCo
          $('li.grid-tile').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'rwCo', 'padding-top: 25px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#search-result-items');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.grid-tile');
                // Change selector positioning to relative for rwCo
                $('li.grid-tile').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'rwCo', 'padding-top: 25px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMattAndNatCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("mattAndNatCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.product-item").length) {
          clearInterval(checkExist);
          let productCards = $('li.product-item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'mattAndNatCa', 'z-index: 1;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadLauraMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("laura", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.grid-tile").length) {
          clearInterval(checkExist);
          let productCards = $('li.grid-tile');
          // Change selector positioning to relative for Laura
          $('li.grid-tile').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'laura', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#search-result-items');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.grid-tile');
                // Change selector positioning to relative for Laura
                $('li.grid-tile').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'laura', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMelanieLyneMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("melanieLyne", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("li.grid-tile").length) {
          clearInterval(checkExist);
          let productCards = $('li.grid-tile');
          // Change selector positioning to relative for Melanie Lyne
          $('li.grid-tile').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'melanieLyne', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#search-result-items');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('li.grid-tile');
                // Change selector positioning to relative for Melanie Lyne
                $('li.grid-tile').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'melanieLyne', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadDress911Multi") {
    if (HelperFunctions.plugged_isMerchantUrl("dress911", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".centerBoxContentsProducts").length) {
          clearInterval(checkExist);
          let productCards = $('.centerBoxContentsProducts');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'dress911', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadTobiCaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("tobiCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-list-item").length) {
          clearInterval(checkExist);
          let productCards = $('.product-list-item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'tobiCa', 'z-index: 10; padding-top: 15px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.product-list-item');
          if (multiContainer) {
            multiContainer = multiContainer.parent();
          }
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.product-list-item');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'tobiCa', 'z-index: 10; padding-top: 15px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadCanadaComputersMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("canadaComputers", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".productTemplate").length) {
          clearInterval(checkExist);
          let productCards = $('.productTemplate');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'canadaComputers', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('#product-list');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.productTemplate');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'canadaComputers', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadVisionsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("visions", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".prodlist-itembox").length) {
          clearInterval(checkExist);
          let productCards = $('.prodlist-itembox');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'visions', 'margin-top: 40px;');
            }
          }
        } else if ($(".featurehome-large-item").length || $(".featurehome-small-item").length) {
          clearInterval(checkExist);
          let productCards = $('.featurehome-large-item');
          let productCards2 = $('.featurehome-small-item');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'visions', 'margin-top: 5px;');
            }
          }
          for (let i = 0; i < productCards2.length; i++) {
            let exists = productCards2[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards2[i], productCards2[i], 'visions', 'margin-top: 5px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadToysRUsMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("toysRUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".b-product_tile").length) {
          clearInterval(checkExist);
          let productCards = $('.b-product_tile');
          // Change selector positioning to relative for Toys R Us
          $('.b-product_tile').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'toysRUs', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.js-product-grid');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.b-product_tile');
                // Change selector positioning to relative for Toys R Us
                $('.b-product_tile').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'toysRUs', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMemoryExpressMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("memoryExpress", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".c-shca-icon-item").length) {
          clearInterval(checkExist);
          let productCards = $('.c-shca-icon-item');
          // Change selector positioning to relative for Memory Express
          $('.c-shca-icon-item').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'memoryExpress', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.c-shca-container');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.c-shca-icon-item');
                // Change selector positioning to relative for Memory Express
                $('.c-shca-icon-item').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'memoryExpress', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadMikesComputerShopMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("mikesComputerShop", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".Products.List > .Product").length) {
          clearInterval(checkExist);
          let productCards = $('.Products.List > .Product');
          // Change selector positioning to relative for Mikes Computer Shop
          $('.Products.List > .Product').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'mikesComputerShop', 'margin-right: 120px;');
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.Products.List');
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.Products.List > .Product');
                // Change selector positioning to relative for Memory Express
                $('.Products.List > .Product').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'mikesComputerShop', 'margin-right: 120px;');
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        } else if ($(".card.deal").length) {
          clearInterval(checkExist);
          let productCards = $('.card.deal');
          // Change selector positioning to relative for Mikes Computer Shop
          $('.card.deal').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'mikesComputerShop', null);
            }
          }
          // For infinite scrolling
          let multiContainer = document.querySelector('.card.deal');
          if (multiContainer) {
            multiContainer = multiContainer.parentElement;
            if (multiContainer) {
              multiContainer = multiContainer.parentElement;
            }
          }
          let options = {
            childList: true,
          };
          let observer = new MutationObserver(mutations => {
            for (let mutation of mutations) {
              if (mutation.type === 'childList') {
                let productCards = $('.card.deal');
                // Change selector positioning to relative for Mikes Computer Shop
                $('.card.deal').css('position', 'relative');
                for (let i = 0; i < productCards.length; i++) {
                  let exists = productCards[i].querySelector('#plugged__button-root-multi');
                  if (!exists) {
                    loadSite(productCards[i], productCards[i], 'mikesComputerShop', null);
                  }
                }
              }
            }
          });
          if (multiContainer) {
            observer.observe(multiContainer, options);
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadNeweggMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("newegg", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".is-grid > .item-container").length) {
          clearInterval(checkExist);
          let productCards = $('.is-grid > .item-container');
          // Change selector positioning to relative
          $('.is-grid > .item-container').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'newegg', null);
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadPcCanadaMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("pcCanada", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".itemBlock.itemBlockBot").length) {
          clearInterval(checkExist);
          let productCards = $('.itemBlock.itemBlockBot');
          // Change selector positioning to relative
          $('.itemBlock.itemBlockBot').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'pcCanada', 'margin-top: 30px;');
            }
          }
        } else if ($(".itemBlockHP").length) {
          clearInterval(checkExist);
          let productCards = $('.itemBlockHP');
          // Change selector positioning to relative
          $('.itemBlockHP').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'pcCanada', 'margin-top: 30px;');
            }
          }
        }
      }, 100);
    }
  } else if (msg.action === "loadVuugoMulti") {
    if (HelperFunctions.plugged_isMerchantUrl("vuugo", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-grid > div").length) {
          clearInterval(checkExist);
          let productCards = $('.product-grid > div');
          // Change selector positioning to relative
          $('.product-grid > div').css('position', 'relative');
          for (let i = 0; i < productCards.length; i++) {
            let exists = productCards[i].querySelector('#plugged__button-root-multi');
            if (!exists) {
              loadSite(productCards[i], productCards[i], 'vuugo', 'margin-top: 90px;');
            }
          }
        }
      }, 100);
    }
  }
  // TODO: Add more sites here
});

function loadSite(selector, domElement, merchant, style) {
  let btn = document.createElement('div');
  btn.id = "plugged__button-root-multi";
  if (style) {
    btn.setAttribute('style', style);
  }

  selector.append(btn);
  ReactDOM.render(<PluggedButtonMulti merchant={merchant} domElement={domElement}/>, btn);
}
