/* global chrome */
/* src/pluggedButton.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import $ from 'jquery';
import './pluggedButton.css';
import Hover from './hover/Hover';
import pluggedLogo from '../images/pluggedLogo.png';
import hoverEnum from './hover/hoverEnum.js';
import HelperFunctions from '../stores/helperFunctions';
import PopupStore from '../stores/popupStore';
import Scraper from '../scraper/Scraper';

let globalHoverState = hoverEnum.NONE;

class PluggedButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      merchant: this.props.merchant,
      showHover: hoverEnum.NONE
    };

    this.toggleSave = this.toggleSave.bind(this);
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.action === 'pluggedSignIn') {
        this.setState({showHover: hoverEnum.NONE});
        globalHoverState = hoverEnum.NONE;
      } else if (msg.action === 'pluggedSignOut') {
        this.setState({showHover: hoverEnum.NONE});
        globalHoverState = hoverEnum.NONE;
      }
    });
  }

  toggleSave(e) {
    e.preventDefault();

    let data = { action: 'togglePluggedSavePage' };
    chrome.runtime.sendMessage(data);
  }

  render() {
    return (
      <div>
        <div id="plugged__slideout">
          <div id="plugged__slideout-icon">
            <img src={pluggedLogo} id='plugged__logo'></img>
          </div>
          <div id="plugged__slideout-content">
            <button onClick={this.toggleSave} id="plugged__slideout_button">Save and watch price</button>
          </div>
        </div>
      </div>
    );
  }
}

const app = document.createElement('div');
app.id = "plugged__button-root";

chrome.extension.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "loadKith") {
    if (HelperFunctions.plugged_isProductUrl("kith", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-form__add-to-cart").length && $(".product-form__add-to-cart").text()) {
          clearInterval(checkExist);
          loadSite($('.product-single__images'), "Kith");
        }
      }, 100);
    }
  } else if (msg.action === "loadNikeCa") {
    if (HelperFunctions.plugged_isProductUrl("nikeCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".react-carousel").length && $('.css-1omsbca') && $('.css-1omsbca').parent().length > 0) {
          clearInterval(checkExist);
          loadSite($('.css-1omsbca').parent(), "Nike (CA)");
        } else if ($(".react-carousel").length && $('div:not(.banner-carousel-wrapper) > .react-carousel.carousel-container > .carousel-slider.carousel.react-carousel-wrapper').last().parent().length > 0) {
          loadSite($('div:not(.banner-carousel-wrapper) > .react-carousel.carousel-container > .carousel-slider.carousel.react-carousel-wrapper').last().parent(), "Nike (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadNikeUs") {
    if (HelperFunctions.plugged_isProductUrl("nikeUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".react-carousel").length && $('.css-1omsbca') && $('.css-1omsbca').parent().length > 0) {
          clearInterval(checkExist);
          loadSite($('.css-1omsbca').parent(), "Nike (US)");
        } else if ($(".react-carousel").length && $('.carousel-slider.carousel.react-carousel-wrapper').last().parent().length > 0) {
          loadSite($('.carousel-slider.carousel.react-carousel-wrapper').last().parent(), "Nike (US)");
        }
      }, 100);
    }
  } else if (msg.action === "loadHaven") {
    if (HelperFunctions.plugged_isProductUrl("haven", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("#product-gallery").length) {
          clearInterval(checkExist);
          loadSiteHaven($('#product-gallery'), "Haven");
        }
      }, 100);
    }
  } else if (msg.action === "loadLivestock") {
    if (HelperFunctions.plugged_isProductUrl("livestock", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('div#gallery').length && $('div#gallery').css('display') !== 'none') {
          clearInterval(checkExist);
          loadSite($('div#gallery'), "Livestock");
        } else if ($('div#mobile-gallery').length && $('div#mobile-gallery').css('display') !== 'none') {
          clearInterval(checkExist);
          loadSite($('div#mobile-gallery'), "Livestock");
        }
      }, 100);
    }
  } else if (msg.action === "loadUndefeated") {
    if (HelperFunctions.plugged_isProductUrl("undefeated", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-singles").length) {
          clearInterval(checkExist);
          loadSite($('.product-singles'), "Undefeated");
          // Need to set z-index for Undefeated
          $('#plugged__button-root').css('z-index', '1000');
        }
      }, 100);
    }
  } else if (msg.action === "loadSsenseCa") {
    if (HelperFunctions.plugged_isProductUrl("ssenseCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-images-container").length) {
          clearInterval(checkExist);
          loadSite($('.product-images-container'), "Ssense (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadSsenseUs") {
    if (HelperFunctions.plugged_isProductUrl("ssenseUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-images-container").length) {
          clearInterval(checkExist);
          loadSite($('.product-images-container'), "Ssense (US)");
        }
      }, 100);
    }
  } else if (msg.action === "loadNomad") {
    if (HelperFunctions.plugged_isProductUrl("nomad", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product__page").length) {
          clearInterval(checkExist);
          loadSite($('.product__page'), "Nomad");
        }
      }, 100);
    }
  } else if (msg.action === "loadMrPorterCa") {
    if (HelperFunctions.plugged_isProductUrl("mrPorterCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("div[itemprop=offers]").parent().length) {
          clearInterval(checkExist);
          loadSite($("div[itemprop=offers]").parent(), "Mr Porter (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadMrPorterUs") {
    if (HelperFunctions.plugged_isProductUrl("mrPorterUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($("div[itemprop=offers]").parent().length) {
          clearInterval(checkExist);
          loadSite($("div[itemprop=offers]").parent(), "Mr Porter (US)");
        }
      }, 100);
    }
  } else if (msg.action === "loadNrml") {
    if (HelperFunctions.plugged_isProductUrl("nrml", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-single__photos").length) {
          clearInterval(checkExist);
          loadSite($('.product-single__photos'), "Nrml");
          // Need to set z-index for Nrml, and move lower
          $('#plugged__button-root').css('z-index', '101');
          $('#plugged__button-root').css('margin-top', '35px');
        }
      }, 100);
    }
  } else if (msg.action === "loadSportchek") {
    if (HelperFunctions.plugged_isProductUrl("sportchek", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($(".product-detail__preview-gallery-content").length && $(".product-detail__preview-gallery-content").css('display') !== 'none') {
          clearInterval(checkExist);
          loadSite($('.product-detail__preview-gallery-content'), "Sportchek");
        }
      }, 100);
    }
  } else if (msg.action === "loadAdidasCa") {
    if (HelperFunctions.plugged_isProductUrl("adidasCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('div[data-auto-id=glass-image-viewer]').length) {
          clearInterval(checkExist);
          loadSite($('div[data-auto-id=glass-image-viewer]'), "Adidas (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadAdidasUs") {
    if (HelperFunctions.plugged_isProductUrl("adidasUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('div[data-auto-id=glass-image-viewer]').length) {
          clearInterval(checkExist);
          loadSite($('div[data-auto-id=glass-image-viewer]'), "Adidas (US)");
        }
      }, 100);
    }
  } else if (msg.action === "loadFrankAndOak") {
    if (HelperFunctions.plugged_isProductUrl("frankAndOak", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#productImg').length) {
          clearInterval(checkExist);
          loadSite($('#productImg'), "Frank And Oak");
          // Need to set z-index for Urban Outfitters
          $('#plugged__button-root').css('z-index', '7');
        }
      }, 100);
    }
  } else if (msg.action === "loadUrbanOutfittersCa") {
    if (HelperFunctions.plugged_isProductUrl("urbanOutfittersCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.c-pwa-image-viewer').length) {
          clearInterval(checkExist);
          loadSite($('.c-pwa-image-viewer'), "Urban Outfitters (CA)");
          // Need to set z-index for Urban Outfitters
          $('#plugged__button-root').css('z-index', '1002');
        }
      }, 100);
    }
  } else if (msg.action === "loadUrbanOutfittersUs") {
    if (HelperFunctions.plugged_isProductUrl("urbanOutfittersUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.c-pwa-image-viewer').length) {
          clearInterval(checkExist);
          loadSite($('.c-pwa-image-viewer'), "Urban Outfitters (US)");
          // Need to set z-index for Urban Outfitters
          $('#plugged__button-root').css('z-index', '1002');
        }
      }, 100);
    }
  } else if (msg.action === "loadTheBay") {
    if (HelperFunctions.plugged_isProductUrl("theBay", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#s7ZoomView').length) {
          clearInterval(checkExist);
          loadSite($('#s7ZoomView'), "The Bay");
          // Need to move lower for The Bay
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadEndCa") {
    if (HelperFunctions.plugged_isProductUrl("endCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('div[data-testid=Gallery__Static]').length) {
          clearInterval(checkExist);
          loadSite($('div[data-testid=Gallery__Static]'), "End (CA)");
          // Need to remove padding for End
          $('#plugged__logo').css('padding-bottom', '0px');
        }
      }, 100);
    }
  } else if (msg.action === "loadEndUs") {
    if (HelperFunctions.plugged_isProductUrl("endUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('div[data-testid=Gallery__Static]').length) {
          clearInterval(checkExist);
          loadSite($('div[data-testid=Gallery__Static]'), "End (US)");
          // Need to remove padding for End
          $('#plugged__logo').css('padding-bottom', '0px');
        }
      }, 100);
    }
  } else if (msg.action === "loadDutil") {
    if (HelperFunctions.plugged_isProductUrl("dutil", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-main-image').length) {
          clearInterval(checkExist);
          loadSite($('.product-main-image'), "Dutil");
        }
      }, 100);
    }
  } else if (msg.action === "loadAllSaintsCa") {
    if (HelperFunctions.plugged_isProductUrl("allSaintsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#image').length && !$('#image').is(":hidden")) { // Mobile view
          clearInterval(checkExist);
          loadSite($('#image'), "AllSaints (CA)");
          // Need to set font size for AllSaints
          $('#plugged__slideout_button').css('font-size', '11px');
        } else if ($('#product-and-olapic-images').length) { // Desktop view
          clearInterval(checkExist);
          loadSite($('#product-and-olapic-images'), "AllSaints (CA)");
          // Need to set font size for AllSaints
          $('#plugged__slideout_button').css('font-size', '11px');
        }
      }, 100);
    }
  } else if (msg.action === "loadAllSaintsUs") {
    if (HelperFunctions.plugged_isProductUrl("allSaintsUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#image').length && !$('#image').is(":hidden")) { // Mobile view
          clearInterval(checkExist);
          loadSite($('#image'), "AllSaints (US)");
          // Need to set font size for AllSaints
          $('#plugged__slideout_button').css('font-size', '11px');
        } else if ($('#product-and-olapic-images').length) { // Desktop view
          clearInterval(checkExist);
          loadSite($('#product-and-olapic-images'), "AllSaints (US)");
          // Need to set font size for AllSaints
          $('#plugged__slideout_button').css('font-size', '11px');
        }
      }, 100);
    }
  } else if (msg.action === "loadAltitudeSports") {
    if (HelperFunctions.plugged_isProductUrl("altitudeSports", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-gallery__main-image-container').length) {
          clearInterval(checkExist);
          loadSite($('.product-gallery__main-image-container'), "Altitude Sports");
          // Need to move lower for Altitude Sports
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadMackageCa") {
    if (HelperFunctions.plugged_isProductUrl("mackageCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-image-container').length) {
          clearInterval(checkExist);
          loadSite($('.product-image-container'), "Mackage (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadMackageUs") {
    if (HelperFunctions.plugged_isProductUrl("mackageUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.primary-image-list').length) {
          clearInterval(checkExist);
          loadSite($('.primary-image-list'), "Mackage (US)");
        }
      }, 100);
    }
  } else if (msg.action === "loadZaraCa") {
    if (HelperFunctions.plugged_isProductUrl("zaraCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.big-image-container').length) {
          clearInterval(checkExist);
          loadSite($('.big-image-container'), "Zara (CA)");
          // Need to move lower for Zara
          $('#plugged__button-root').css('margin-top', '100px');
        }
      }, 100);
    }
  } else if (msg.action === "loadZaraUs") {
    if (HelperFunctions.plugged_isProductUrl("zaraUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.big-image-container').length) {
          clearInterval(checkExist);
          loadSite($('.big-image-container'), "Zara (US)");
          // Need to move lower for Zara
          $('#plugged__button-root').css('margin-top', '100px');
        }
      }, 100);
    }
  } else if (msg.action === "loadWingsAndHorns") {
    if (HelperFunctions.plugged_isProductUrl("wingsAndHorns", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#product-gallery').length) {
          clearInterval(checkExist);
          loadSite($('#product-gallery'), "Wings + Horns");
          // Need to move lower for Wings + Horns
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadOakAndFortCa") {
    if (HelperFunctions.plugged_isProductUrl("oakAndFortCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-details-full-image-gallery-container').length) {
          clearInterval(checkExist);
          loadSite($('.product-details-full-image-gallery-container'), "Oak + Fort (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadOakAndFortUs") {
    if (HelperFunctions.plugged_isProductUrl("oakAndFortUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-details-full-image-gallery-container').length) {
          clearInterval(checkExist);
          loadSite($('.product-details-full-image-gallery-container'), "Oak + Fort (US)");
        }
      }, 100);
    }
  } else if (msg.action === "loadUniqloCa") {
    if (HelperFunctions.plugged_isProductUrl("uniqloCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-main-image-section').length) {
          clearInterval(checkExist);
          loadSite($('.product-main-image-section'), "Uniqlo (CA)");
          // Need to move lower for Uniqlo (CA)
          $('#plugged__button-root').css('margin-top', '40px');
        }
      }, 100);
    }
  } else if (msg.action === "loadUniqloUs") {
    if (HelperFunctions.plugged_isProductUrl("uniqloUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-primary-image').length) {
          clearInterval(checkExist);
          loadSite($('.product-primary-image'), "Uniqlo (US)");
          // Need to set z-index and move lower for Uniqlo (US)
          $('#plugged__button-root').css('z-index', '10');
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadTheLastHunt") {
    if (HelperFunctions.plugged_isProductUrl("theLastHunt", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-gallery__main-image-container').length) {
          clearInterval(checkExist);
          loadSite($('.product-gallery__main-image-container'), "The Last Hunt");
          // Need to move lower for The Last Hunt
          $('#plugged__button-root').css('margin-top', '70px');
        }
      }, 100);
    }
  } else if (msg.action === "loadTateAndYoko") {
    if (HelperFunctions.plugged_isProductUrl("tateAndYoko", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product__showcase').length) {
          clearInterval(checkExist);
          loadSiteTateAndYoko($('.product__showcase'), "Tate + Yoko");
        }
      }, 100);
    }
  } else if (msg.action === "loadHmCa") {
    if (HelperFunctions.plugged_isProductUrl("hmCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-detail-main-image').length) {
          clearInterval(checkExist);
          loadSite($('.product-detail-main-image'), "H&M");
        }
      }, 100);
    }
  } else if (msg.action === "loadAmericanEagleCa") {
    if (HelperFunctions.plugged_isProductUrl("americanEagleCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.pdp-main-carousel').length) {
          clearInterval(checkExist);
          loadSite($('.pdp-main-carousel'), "American Eagle (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadAdrift") {
    if (HelperFunctions.plugged_isProductUrl("adrift", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-photo-container').length) {
          clearInterval(checkExist);
          loadSite($('.product-photo-container'), "Adrift");
        }
      }, 100);
    }
  } else if (msg.action === "loadAbercrombieFitchCa") {
    if (HelperFunctions.plugged_isProductUrl("abercrombieFitchCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-main-images').length) {
          clearInterval(checkExist);
          loadSite($('.product-main-images'), "Abercrombie & Fitch (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadAldoCa") {
    if (HelperFunctions.plugged_isProductUrl("aldoCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.c-carousel-product-overview').length) {
          clearInterval(checkExist);
          loadSite($('.c-carousel-product-overview'), "Aldo (CA)");
          // Move lower for Aldo
          $('#plugged__button-root').css('margin-top', '45px');
        }
      }, 100);
    }
  } else if (msg.action === "loadAsicsCa") {
    if (HelperFunctions.plugged_isProductUrl("asicsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.fotorama-item').length) {
          clearInterval(checkExist);
          loadSite($('.fotorama-item'), "Asics (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadBananaRepublicCa") {
    if (HelperFunctions.plugged_isProductUrl("bananaRepublicCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-photo').length) {
          clearInterval(checkExist);
          loadSite($('.product-photo'), "Banana Republic (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadOldNavyCa") {
    if (HelperFunctions.plugged_isProductUrl("oldNavyCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-photo').length) {
          clearInterval(checkExist);
          loadSite($('.product-photo'), "Old Navy (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadBlueButtonShop") {
    if (HelperFunctions.plugged_isProductUrl("blueButtonShop", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#myCarousel').length) {
          clearInterval(checkExist);
          loadSite($('#myCarousel'), "Blue Button Shop");
          // Move lower for Blue Button Shop
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadBonobos") {
    if (HelperFunctions.plugged_isProductUrl("bonobos", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product_detail---imagesContainer---yZwBb').length) {
          clearInterval(checkExist);
          loadSite($('.product_detail---imagesContainer---yZwBb'), "Bonobos");
        }
      }, 100);
    }
  } else if (msg.action === "loadBrooklynClothing") {
    if (HelperFunctions.plugged_isProductUrl("brooklynClothing", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-gallery').length) {
          clearInterval(checkExist);
          loadSite($('.product-gallery'), "Brooklyn Clothing");
        }
      }, 100);
    }
  } else if (msg.action === "loadBrowns") {
    if (HelperFunctions.plugged_isProductUrl("browns", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-image-container').length) {
          clearInterval(checkExist);
          loadSite($('.product-image-container'), "Browns");
          // Need to set z-index for Browns
          $('#plugged__button-root').css('z-index', '100');
        }
      }, 100);
    }
  } else if (msg.action === "loadCalvinKleinCa") {
    if (HelperFunctions.plugged_isProductUrl("calvinKleinCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product_image.loaded').length) {
          clearInterval(checkExist);
          loadSite($('.product_image.loaded'), "Calvin Klein (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadCapsule") {
    if (HelperFunctions.plugged_isProductUrl("capsule", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-template').length) {
          clearInterval(checkExist);
          loadSite($('.product-template'), "Capsule");
          // Need to set z-index and move lower for Capsule
          $('#plugged__button-root').css('z-index', '1');
          $('#plugged__button-root').css('margin-top', '30px');
        }
      }, 100);
    }
  } else if (msg.action === "loadClubMonacoCa") {
    if (HelperFunctions.plugged_isProductUrl("clubMonacoCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-primary-image').length) {
          clearInterval(checkExist);
          loadSite($('.product-primary-image'), "Club Monaco (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadCntrbnd") {
    if (HelperFunctions.plugged_isProductUrl("cntrbnd", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-detail__images').length) {
          clearInterval(checkExist);
          loadSite($('.product-detail__images'), "Cntrbnd");
        }
      }, 100);
    }
  } else if (msg.action === "loadCoachCa") {
    if (HelperFunctions.plugged_isProductUrl("coachCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-image-carousel').length) {
          clearInterval(checkExist);
          loadSite($('.product-image-carousel'), "Coach (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadCourtsideSneakers") {
    if (HelperFunctions.plugged_isProductUrl("courtsideSneakers", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-images').length) {
          clearInterval(checkExist);
          loadSite($('.product-images'), "Courtside Sneakers");
        }
      }, 100);
    }
  } else if (msg.action === "loadDueWest") {
    if (HelperFunctions.plugged_isProductUrl("dueWest", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-image--align-left').length) {
          clearInterval(checkExist);
          loadSite($('.product-image--align-left'), "Due West");
        }
      }, 100);
    }
  } else if (msg.action === "loadDynamiteCa") {
    if (HelperFunctions.plugged_isProductUrl("dynamiteCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.carouselColumn').length) {
          clearInterval(checkExist);
          loadSite($('.carouselColumn'), "Dynamite (CA)");
          // Move lower for Dynamite
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadEddieBauerCa") {
    if (HelperFunctions.plugged_isProductUrl("eddieBauerCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.image_magnifier').length) {
          clearInterval(checkExist);
          loadSite($('.image_magnifier'), "Eddie Bauer (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadGarageCa") {
    if (HelperFunctions.plugged_isProductUrl("garageCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.carouselColumn').length) {
          clearInterval(checkExist);
          loadSite($('.carouselColumn'), "Garage (CA)");
          // Move lower for Garage
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadFamousFootwearCa") {
    if (HelperFunctions.plugged_isProductUrl("famousFootwearCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#shoesItem').length) {
          clearInterval(checkExist);
          loadSite($('#shoesItem'), "Famous Footwear (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadFootLockerCa") {
    if (HelperFunctions.plugged_isProductUrl("footLockerCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.slick-slide.slick-active').length) {
          clearInterval(checkExist);
          loadSite($('.slick-slide.slick-active'), "Foot Locker (CA)");
          // Move lower for Foot Locker (CA)
          $('#plugged__button-root').css('margin-top', '60px');
        }
      }, 100);
    }
  } else if (msg.action === "loadFourHorsemen") {
    if (HelperFunctions.plugged_isProductUrl("fourHorsemen", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-images').length) {
          clearInterval(checkExist);
          loadSite($('.product-images'), "Four Horsemen");
        }
      }, 100);
    }
  } else if (msg.action === "loadGapCa") {
    if (HelperFunctions.plugged_isProductUrl("gapCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.l--carousel').length) {
          clearInterval(checkExist);
          loadSite($('.l--carousel'), "GAP (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadAritziaCa") {
    if (HelperFunctions.plugged_isProductUrl("aritziaCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#pdp-panel-image').length) {
          clearInterval(checkExist);
          loadSite($('#pdp-panel-image'), "Aritzia (CA)");
          // Need to set z-index for Aritzia
          $('#plugged__button-root').css('z-index', '10');
        }
      }, 100);
    }
  } else if (msg.action === "loadFarfetchCa") {
    if (HelperFunctions.plugged_isProductUrl("farfetchCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('._5650e4').length) {
          clearInterval(checkExist);
          loadSite($('._5650e4'), "Farfetch (CA)");
        } else if ($('._d7afdb._566fb3').length) {
          clearInterval(checkExist);
          loadSite($('._d7afdb._566fb3'), "Farfetch (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadGerhard") {
    if (HelperFunctions.plugged_isProductUrl("gerhard", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.ProductItem-gallery-slides').length) {
          clearInterval(checkExist);
          loadSite($('.ProductItem-gallery-slides'), "Gerhard");
          // Need to set z-index for Gerhard
          $('#plugged__button-root').css('z-index', '10');
        }
      }, 100);
    }
  } else if (msg.action === "loadGravitypope") {
    if (HelperFunctions.plugged_isProductUrl("gravitypope", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-single__photos').length) {
          clearInterval(checkExist);
          loadSite($('.product-single__photos'), "Gravitypope");
        }
      }, 100);
    }
  } else if (msg.action === "loadGuessCa") {
    if (HelperFunctions.plugged_isProductUrl("guessCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#cloudinaryGalleryContainer').length) {
          clearInterval(checkExist);
          loadSite($('#cloudinaryGalleryContainer'), "Guess (CA)");
          // Need to set z-index for Guess
          $('#plugged__button-root').css('z-index', '100');
        }
      }, 100);
    }
  } else if (msg.action === "loadGuessFactoryCa") {
    if (HelperFunctions.plugged_isProductUrl("guessFactoryCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#cloudinaryGalleryContainer').length) {
          clearInterval(checkExist);
          loadSite($('#cloudinaryGalleryContainer'), "Guess Factory (CA)");
          // Need to set z-index for Guess Factory
          $('#plugged__button-root').css('z-index', '100');
        }
      }, 100);
    }
  } else if (msg.action === "loadGstarCa") {
    if (HelperFunctions.plugged_isProductUrl("gstarCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.productDetail-controls-wrapper').length) {
          clearInterval(checkExist);
          loadSite($('.productDetail-controls-wrapper'), "G-Star (CA)");
          // Need to set z-index and move higher for G-Star
          $('#plugged__button-root').css('z-index', '10');
          $('#plugged__button-root').css('margin-top', '7.5px');
        }
      }, 100);
    }
  } else if (msg.action === "loadAcneStudiosCa") {
    if (HelperFunctions.plugged_isProductUrl("acneStudiosCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.pdp-item-wrapper').length) {
          clearInterval(checkExist);
          loadSite($('.pdp-item-wrapper'), "Acne Studios (CA)");
          // Need to set z-index for Acne
          $('#plugged__button-root').css('z-index', '10');
        }
      }, 100);
    }
  } else if (msg.action === "loadHarryRosen") {
    if (HelperFunctions.plugged_isProductUrl("harryRosen", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.image-gallery.js-gallery').length) {
          clearInterval(checkExist);
          loadSite($('.image-gallery.js-gallery'), "Harry Rosen");
        }
      }, 100);
    }
  } else if (msg.action === "loadHbx") {
    if (HelperFunctions.plugged_isProductUrl("hbx", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.flexslider').length) {
          clearInterval(checkExist);
          loadSite($('.flexslider'), "HBX");
        }
      }, 100);
    }
  } else if (msg.action === "loadHenrySinger") {
    if (HelperFunctions.plugged_isProductUrl("henrySinger", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#mobile-product').length && $('#mobile-product').css('display') !== 'none') {
          clearInterval(checkExist);
          loadSite($('#mobile-product'), "Henry Singer");
          // Need to set z-index for Henry Singer
          $('#plugged__button-root').css('z-index', '10');
        } else if ($('#product-photos').length && $('#product-photos').css('display') !== 'none') {
          clearInterval(checkExist);
          loadSite($('#product-photos'), "Henry Singer");
          // Need to set z-index for Henry Singer
          $('#plugged__button-root').css('z-index', '10');
        }
      }, 100);
    }
  } else if (msg.action === "loadHunterCa") {
    if (HelperFunctions.plugged_isProductUrl("hunterCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.carousel.product-images-carousel').length) {
          clearInterval(checkExist);
          loadSite($('.carousel.product-images-carousel'), "Hunter (CA)");
          // Need to set z-index for Hunter
          $('#plugged__button-root').css('z-index', '10');
        }
      }, 100);
    }
  } else if (msg.action === "loadHollisterCa") {
    if (HelperFunctions.plugged_isProductUrl("hollisterCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-main-images__wrapper').length) {
          clearInterval(checkExist);
          loadSite($('.product-main-images__wrapper'), "Hollister (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadInfluenceuCa") {
    if (HelperFunctions.plugged_isProductUrl("influenceuCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.detailsLeftBlock').length) {
          clearInterval(checkExist);
          loadSite($('.detailsLeftBlock'), "Influenceu (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadJcrewFactoryCa") {
    if (HelperFunctions.plugged_isProductUrl("jcrewFactoryCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product__image--wrapper').length) {
          clearInterval(checkExist);
          loadSite($('.product__image--wrapper'), "J.Crew Factory (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadJcrewCa") {
    if (HelperFunctions.plugged_isProductUrl("jcrewCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product__image--wrapper').length) {
          clearInterval(checkExist);
          loadSite($('.product__image--wrapper'), "J.Crew (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadBestseller") {
    if (HelperFunctions.plugged_isProductUrl("bestseller", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product__gallery').length) {
          clearInterval(checkExist);
          loadSite($('.product__gallery'), "Bestseller");
        }
      }, 100);
    }
  } else if (msg.action === "loadBricksAndBonds") {
    if (HelperFunctions.plugged_isProductUrl("bricksAndBonds", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.detail-photos').length) {
          clearInterval(checkExist);
          loadSite($('.detail-photos'), "Bricks And Bonds");
          // Need to set z-index for Bricks And Bonds
          $('#plugged__button-root').css('z-index', '100');
        }
      }, 100);
    }
  } else if (msg.action === "loadJoeFresh") {
    if (HelperFunctions.plugged_isProductUrl("joeFresh", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#product-image-gallery').length) {
          clearInterval(checkExist);
          loadSite($('#product-image-gallery'), "Joe Fresh");
        }
      }, 100);
    }
  } else if (msg.action === "loadKateSpade") {
    if (HelperFunctions.plugged_isProductUrl("kateSpade", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-imagery-container ').length) {
          clearInterval(checkExist);
          loadSite($('.product-imagery-container '), "Kate Spade");
          // Need to set z-index and move higher for Kate Spade
          $('#plugged__button-root').css('z-index', '10');
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadLaSenzaCa") {
    if (HelperFunctions.plugged_isProductUrl("laSenzaCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-image-container').length) {
          clearInterval(checkExist);
          loadSite($('.product-image-container'), "La Senza (CA)");
          // Need to set z-index for LaSenza
          $('#plugged__button-root').css('z-index', '1');
        }
      }, 100);
    }
  } else if (msg.action === "loadLacosteCa") {
    if (HelperFunctions.plugged_isProductUrl("lacosteCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.js-pdp-gallery').length) {
          clearInterval(checkExist);
          loadSite($('.js-pdp-gallery'), "Lacoste (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadLevisCa") {
    if (HelperFunctions.plugged_isProductUrl("levisCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.images-list-mobile').length && $('.images-list-mobile').css('display') !== 'none') {
          clearInterval(checkExist);
          loadSite($('.images-list-mobile'), "Levi's (CA)");
        } else if ($('#product-hero-image_container').length && $('#product-hero-image_container').css('display') !== 'none') {
          clearInterval(checkExist);
          loadSite($('#product-hero-image_container'), "Levi's (CA)");
        } else if ($('.product-images-mobile').length && $('.product-images-mobile').css('display') !== 'none') {
          clearInterval(checkExist);
          loadSite($('.product-images-mobile'), "Levi's (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadLessons") {
    if (HelperFunctions.plugged_isProductUrl("lessons", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-item-images').length) {
          clearInterval(checkExist);
          loadSite($('.product-item-images'), "Lessons");
          // Need to reinforce height of the Plugged logo
          $('#plugged__logo').attr('style', 'height: 30px !important');
        }
      }, 100);
    }
  } else if (msg.action === "loadLeoBoutique") {
    if (HelperFunctions.plugged_isProductUrl("leoBoutique", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.grid.product-sticky-wrapper').length) {
          clearInterval(checkExist);
          loadSite($('.grid.product-sticky-wrapper'), "Leo Boutique");
          // Need to set z-index and move higher for Leo Boutique
          $('#plugged__button-root').css('z-index', '10');
        }
      }, 100);
    }
  } else if (msg.action === "loadLess17") {
    if (HelperFunctions.plugged_isProductUrl("less17", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#PhotoContent').length) {
          clearInterval(checkExist);
          loadSite($('#PhotoContent'), "LESS 17");
        }
      }, 100);
    }
  } else if (msg.action === "loadLLBeanCa") {
    if (HelperFunctions.plugged_isProductUrl("lLBeanCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#ppMainImage').length) {
          clearInterval(checkExist);
          loadSite($('#ppMainImage'), "L.L.Bean (CA)");
          // Need to set z-index and move higher for L.L.Bean
          $('#plugged__button-root').css('z-index', '10');
        }
      }, 100);
    }
  } else if (msg.action === "loadLidsCa") {
    if (HelperFunctions.plugged_isProductUrl("lidsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.image-container').length) {
          clearInterval(checkExist);
          loadSite($('.image-container'), "Lids (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadLittleBurgundy") {
    if (HelperFunctions.plugged_isProductUrl("littleBurgundy", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#detailProductImages').length) {
          clearInterval(checkExist);
          loadSite($('#detailProductImages'), "Little Burgundy");
          // Need to set z-index and move higher for Little Burgundy
          $('#plugged__button-root').css('z-index', '10');
        }
      }, 100);
    }
  } else if (msg.action === "loadLostAndFound") {
    if (HelperFunctions.plugged_isProductUrl("lostAndFound", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-gallery').length) {
          clearInterval(checkExist);
          loadSite($('.product-gallery'), "Lost & Found");
        }
      }, 100);
    }
  } else if (msg.action === "loadLululemonCa") {
    if (HelperFunctions.plugged_isProductUrl("lululemonCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.pdp-carousel-images-offset').length) {
          clearInterval(checkExist);
          loadSite($('.pdp-carousel-images-offset'), "Lululemon (CA)");
          // Need to set z-index and move lower for Lulu
          $('#plugged__button-root').css('z-index', '12');
          $('#plugged__button-root').css('margin-top', '50px');
        } else if ($('#main-content').length) {
          clearInterval(checkExist);
          loadSite($('#main-content'), "Lululemon (CA)");
          // Need to set z-index and move lower for Lulu
          $('#plugged__button-root').css('z-index', '12');
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadExclucity") {
    if (HelperFunctions.plugged_isProductUrl("exclucity", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product__slide.slick-slide.slick-current.slick-active').length) {
          clearInterval(checkExist);
          loadSite($('.product__slide.slick-slide.slick-current.slick-active'), "Exclucity");
        }
      }, 100);
    }
  } else if (msg.action === "loadMangoCa") {
    if (HelperFunctions.plugged_isProductUrl("mangoCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-images.product-images-js').length) {
          clearInterval(checkExist);
          loadSite($('.product-images.product-images-js'), "Mango (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadMarks") {
    if (HelperFunctions.plugged_isProductUrl("marks", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.prd-images-container').length) {
          clearInterval(checkExist);
          loadSite($('.prd-images-container'), "Mark's");
          // Need to set z-index and move higher for Marks
          $('#plugged__button-root').css('z-index', '12');
        }
      }, 100);
    }
  } else if (msg.action === "loadMarsClothing") {
    if (HelperFunctions.plugged_isProductUrl("marsClothing", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.box__product-gallery').length) {
          clearInterval(checkExist);
          loadSite($('.box__product-gallery'), "Mars Clothing");
          // Need to set z-index and move higher for Mars Clothing
          $('#plugged__button-root').css('z-index', '10');
        }
      }, 100);
    }
  } else if (msg.action === "loadMavi") {
    if (HelperFunctions.plugged_isProductUrl("mavi", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-gallery__wrapper').length) {
          clearInterval(checkExist);
          loadSite($('.product-gallery__wrapper'), "Mavi");
        }
      }, 100);
    }
  } else if (msg.action === "loadMilohShop") {
    if (HelperFunctions.plugged_isProductUrl("milohShop", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#ProductPhoto-product').length) {
          clearInterval(checkExist);
          loadSite($('#ProductPhoto-product'), "Miloh Shop");
          // Move down for Miloh shop
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadMichaelKorsCa") {
    if (HelperFunctions.plugged_isProductUrl("michaelKorsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.gallery-images').length) {
          clearInterval(checkExist);
          loadSite($('.gallery-images'), "Michael Kors (CA)");
        } else if ($('.product-img-carousel').length) {
          clearInterval(checkExist);
          loadSite($('.product-img-carousel'), "Michael Kors (CA)");
          // Need to set z-index and move lower for Michael Kors
          $('#plugged__button-root').css('z-index', '1');
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadMichelBrisson") {
    if (HelperFunctions.plugged_isProductUrl("michelBrisson", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-media').length) {
          clearInterval(checkExist);
          loadSite($('.product-media'), "Michel Brisson");
          // Need to move down for Michel Brisson
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadMooseKnuckles") {
    if (HelperFunctions.plugged_isProductUrl("mooseKnuckles", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product.media').length) {
          clearInterval(checkExist);
          loadSite($('.product.media'), "Moose Knuckles");
        }
      }, 100);
    }
  } else if (msg.action === "loadMec") {
    if (HelperFunctions.plugged_isProductUrl("mec", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#primary_image').length) {
          clearInterval(checkExist);
          loadSite($('#primary_image'), "MEC");
          // Need to set z-index and move lower for MEC
          $('#plugged__button-root').css('z-index', '102');
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadMuttonhead") {
    if (HelperFunctions.plugged_isProductUrl("muttonhead", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product__photos.product__photos--below').length) {
          clearInterval(checkExist);
          loadSite($('.product__photos.product__photos--below'), "Muttonhead");
        }
      }, 100);
    }
  } else if (msg.action === "loadMuddyGeorge") {
    if (HelperFunctions.plugged_isProductUrl("muddyGeorge", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.main-product-wrap.product-wrap').length) {
          clearInterval(checkExist);
          loadSite($('.main-product-wrap.product-wrap'), "Muddy George");
        }
      }, 100);
    }
  } else if (msg.action === "loadNeighbour") {
    if (HelperFunctions.plugged_isProductUrl("neighbour", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#left-hand' && $('#left-hand').css('display') !== 'none').length) {
          clearInterval(checkExist);
          loadSite($('#left-hand'), "Neighbour");
        } else if ($('.mobile-images' && $('.mobile-images').css('display') !== 'none').length) {
          clearInterval(checkExist);
          loadSite($('.mobile-images'), "Neighbour");
        }
      }, 100);
    }
  } else if (msg.action === "loadNeimanMarcusCa") {
    if (HelperFunctions.plugged_isProductUrl("neimanMarcusCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.main-img').length) {
          clearInterval(checkExist);
          loadSite($('.main-img'), "Neiman Marcus (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadNewBalanceCa") {
    if (HelperFunctions.plugged_isProductUrl("newBalanceCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.variant-selector-container-exp93').length) {
          clearInterval(checkExist);
          loadSite($('.variant-selector-container-exp93'), "New Balance (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadTheNorthFaceCa") {
    if (HelperFunctions.plugged_isProductUrl("theNorthFaceCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#product-views-container').length) {
          clearInterval(checkExist);
          loadSite($('#product-views-container'), "The North Face (CA)");
          // Need to move down for TNF
          $('#plugged__button-root').css('margin-top', '80px');
        }
      }, 100);
    }
  } else if (msg.action === "loadOffTheHook") {
    if (HelperFunctions.plugged_isProductUrl("offTheHook", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-gallery').length) {
          clearInterval(checkExist);
          loadSite($('.product-gallery'), "Off The Hook");
        }
      }, 100);
    }
  } else if (msg.action === "loadOverTheRainbow") {
    if (HelperFunctions.plugged_isProductUrl("overTheRainbow", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-images').length) {
          clearInterval(checkExist);
          loadSite($('.product-images'), "Over The Rainbow");
        }
      }, 100);
    }
  } else if (msg.action === "loadPalmAngelsCa") {
    if (HelperFunctions.plugged_isProductUrl("palmAngelsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('figure.images.js-scroll-gallery').length) {
          clearInterval(checkExist);
          loadSite($('figure.images.js-scroll-gallery'), "Palm Angels (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadPandoraCa") {
    if (HelperFunctions.plugged_isProductUrl("pandoraCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.image-container').length) {
          clearInterval(checkExist);
          loadSite($('.image-container'), "Pandora (CA)");
          // Need to move lower for Pandora
          $('#plugged__button-root').css('margin-top', '75px');
        }
      }, 100);
    }
  } else if (msg.action === "loadPatagoniaCa") {
    if (HelperFunctions.plugged_isProductUrl("patagoniaCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.hero-pdp__slider').length) {
          clearInterval(checkExist);
          loadSite($('.hero-pdp__slider'), "Patagonia (CA)");
          // Need to move lower for Patagonia
          $('#plugged__button-root').css('margin-top', '50px');
          $('#plugged__button-root').css('z-index', '10');
        }
      }, 100);
    }
  } else if (msg.action === "loadPeaceCollective") {
    if (HelperFunctions.plugged_isProductUrl("peaceCollective", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-page--images').length) {
          clearInterval(checkExist);
          loadSite($('.product-page--images'), "Peace Collective");
        }
      }, 100);
    }
  } else if (msg.action === "loadPumaCa") {
    if (HelperFunctions.plugged_isProductUrl("pumaCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.puma-image-container').length) {
          clearInterval(checkExist);
          loadSite($('.puma-image-container'), "Puma (CA)");
        } else if ($('.product-detail-info').length) {
          clearInterval(checkExist);
          loadSite($('.product-detail-info'), "Puma (CA)");
          // Need to move lower for Puma
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadRealSports") {
    if (HelperFunctions.plugged_isProductUrl("realSports", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#product-photos').length && $('#product-photos').css('display') !== 'none') {
          clearInterval(checkExist);
          loadSite($('#product-photos'), "Real Sports");
        } else if ($('#mob-product-images').length && $('#mob-product-images').css('display') !== 'none') {
          clearInterval(checkExist);
          loadSite($('#mob-product-images'), "Real Sports");
        }
      }, 100);
    }
  } else if (msg.action === "loadReebokCa") {
    if (HelperFunctions.plugged_isProductUrl("reebokCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('div[data-auto-id=glass-image-viewer]').length) {
          clearInterval(checkExist);
          loadSite($('div[data-auto-id=glass-image-viewer]'), "Reebok (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadCommon") {
    if (HelperFunctions.plugged_isProductUrl("common", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#product-photos').length) {
          clearInterval(checkExist);
          loadSite($('#product-photos'), "Common");
        }
      }, 100);
    }
  } else if (msg.action === "loadRootsCa") {
    if (HelperFunctions.plugged_isProductUrl("rootsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#product-content').length) {
          clearInterval(checkExist);
          loadSite($('#product-content'), "Roots (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadRodenGray") {
    if (HelperFunctions.plugged_isProductUrl("rodenGray", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product__mobile-image-wrap').length) {
          clearInterval(checkExist);
          loadSite($('.product__mobile-image-wrap'), "Roden Gray");
        } else if ($('.product__image-wrap').length) {
          clearInterval(checkExist);
          loadSite($('.product__image-wrap'), "Roden Gray");
        }
      }, 100);
    }
  } else if (msg.action === "loadRooney") {
    if (HelperFunctions.plugged_isProductUrl("rooney", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-images').length) {
          clearInterval(checkExist);
          loadSite($('.product-images'), "Rooney");
        }
      }, 100);
    }
  } else if (msg.action === "loadSaksFifthAvenueCa") {
    if (HelperFunctions.plugged_isProductUrl("saksFifthAvenueCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.mixed-media-player').length) {
          clearInterval(checkExist);
          loadSiteTateAndYoko($('.mixed-media-player'), "Saks Fifth Avenue (CA)");
          // Need to set z-index and move lower for Saks
          $('#plugged__button-root').css('z-index', '12');
          $('#plugged__button-root').css('margin-top', '50px');
          $('#plugged__button-root').css('margin-right', '15px');
        }
      }, 100);
    }
  } else if (msg.action === "loadSaksOffFifthCa") {
    if (HelperFunctions.plugged_isProductUrl("saksOffFifthCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.mixed-media-player').length) {
          clearInterval(checkExist);
          loadSiteTateAndYoko($('.mixed-media-player'), "Saks Off 5th (CA)");
          // Need to set z-index and move lower for Saks
          $('#plugged__button-root').css('z-index', '12');
          $('#plugged__button-root').css('margin-top', '50px');
          $('#plugged__button-root').css('margin-right', '15px');
        }
      }, 100);
    }
  } else if (msg.action === "loadSauconyCa") {
    if (HelperFunctions.plugged_isProductUrl("sauconyCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-hero-image').length) {
          clearInterval(checkExist);
          loadSite($('.product-hero-image'), "Saucony (CA)");
          // Need to set z-index and move lower for Saucony
          $('#plugged__button-root').css('z-index', '10');
        }
      }, 100);
    }
  } else if (msg.action === "loadSephoraCa") {
    if (HelperFunctions.plugged_isProductUrl("sephoraCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('div[data-comp="HeroMediaList "]').length) {
          clearInterval(checkExist);
          loadSite($('div[data-comp="HeroMediaList "]'), "Sephora (CA)");
          // Need to set z-index and move lower for Sephora
          $('#plugged__button-root').css('z-index', '10');
        }
      }, 100);
    }
  } else if (msg.action === "loadSportsExperts") {
    if (HelperFunctions.plugged_isProductUrl("sportsExperts", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-details-media').length) {
          clearInterval(checkExist);
          loadSite($('.product-details-media'), "Sports Experts");
        }
      }, 100);
    }
  } else if (msg.action === "loadAtmosphere") {
    if (HelperFunctions.plugged_isProductUrl("atmosphere", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-detail__mobile-gallery-content').length && $('.product-detail__mobile-gallery-content').css('display') !== 'none') {
          clearInterval(checkExist);
          loadSite($('.product-detail__mobile-gallery-content'), "Atmosphere");
        } else if ($('.product-detail__preview-gallery-content-wrapper').length) {
          clearInterval(checkExist);
          loadSite($('.product-detail__preview-gallery-content-wrapper'), "Atmosphere");
        }
      }, 100);
    }
  } else if (msg.action === "loadSpringCa") {
    if (HelperFunctions.plugged_isProductUrl("springCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.c-product-detail-grid__item.ecom-0' && $('.c-product-detail-grid__item.ecom-0').css('display') !== 'none').length) {
          clearInterval(checkExist);
          loadSite($('.c-product-detail-grid__item.ecom-0'), "Spring (CA)");
          // Need to set z-index and move lower for Spring
          $('#plugged__button-root').css('z-index', '100');
          $('#plugged__button-root').css('margin-top', '50px');
        } else if ($('main[data-qa-id=main]').length) {
          clearInterval(checkExist);
          loadSite($('main[data-qa-id=main]'), "Spring (CA)");
          // Need to move lower for Spring
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadSteveMaddenCa") {
    if (HelperFunctions.plugged_isProductUrl("steveMaddenCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.productImageArea').length) {
          clearInterval(checkExist);
          loadSite($('.productImageArea'), "Steve Madden (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadSimonsCa") {
    if (HelperFunctions.plugged_isProductUrl("simonsCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#product_right').length) {
          clearInterval(checkExist);
          loadSite($('#product_right'), "Simons (CA)");
        } else if ($('.single-product-images-slider.js-product-images-slider.active').length) {
          clearInterval(checkExist);
          loadSite($('.single-product-images-slider.js-product-images-slider.active'), "Simons (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadSolestop") {
    if (HelperFunctions.plugged_isProductUrl("solestop", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-img-box').length) {
          clearInterval(checkExist);
          loadSite($('.product-img-box'), "Solestop");
          // Need to move lower for Solestop
          $('#plugged__button-root').css('margin-top', '80px');
          $('#plugged__button-root').css('z-index', '10');
        }
      }, 100);
    }
  } else if (msg.action === "loadSoftMocCa") {
    if (HelperFunctions.plugged_isProductUrl("softMocCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#product-image').length) {
          clearInterval(checkExist);
          loadSite($('#product-image'), "SoftMoc (CA)");
          // Need to move lower for SoftMoc
          $('#plugged__button-root').css('margin-top', '60px');
        }
      }, 100);
    }
  } else if (msg.action === "loadSpierAndMackay") {
    if (HelperFunctions.plugged_isProductUrl("spierAndMackay", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-img-box').length) {
          clearInterval(checkExist);
          loadSite($('.product-img-box'), "Spier & Mackay");
          // Need to set font size for Spier & Mackay
          $('#plugged__slideout_button').css('font-size', '11px');
        }
      }, 100);
    }
  } else if (msg.action === "loadSportingLifeCa") {
    if (HelperFunctions.plugged_isProductUrl("sportingLifeCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-col-1.product-image-container').length) {
          clearInterval(checkExist);
          loadSite($('.product-col-1.product-image-container'), "Sporting Life (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadStillLife") {
    if (HelperFunctions.plugged_isProductUrl("stillLife", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#mob-product-images').length && $('#mob-product-images').css('display') !== 'none') {
          clearInterval(checkExist);
          loadSite($('#mob-product-images'), "Still Life");
          // Need to set z-index and move lower for Still life
          $('#plugged__button-root').css('z-index', '10');
          $('#plugged__button-root').css('margin-top', '50px');
        } else if ($('#product-photos').length && $('#product-photos').css('display') !== 'none') {
          clearInterval(checkExist);
          loadSite($('#product-photos'), "Still Life");
          // Need to set z-index and move lower for Still life
          $('#plugged__button-root').css('z-index', '10');
          $('#plugged__button-root').css('margin-top', '50px');
        }
      }, 100);
    }
  } else if (msg.action === "loadUncleOtis") {
    if (HelperFunctions.plugged_isProductUrl("uncleOtis", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.flex-viewport').length) {
          clearInterval(checkExist);
          loadSite($('.flex-viewport'), "Uncle Otis");
          // Need to move down for Uncle Otis
          $('#plugged__button-root').css('margin-top', '70px');
        }
      }, 100);
    }
  } else if (msg.action === "loadUnderstudy") {
    if (HelperFunctions.plugged_isProductUrl("understudy", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-images-scrollable').length) {
          clearInterval(checkExist);
          loadSite($('.product-images-scrollable'), "Understudy");
        }
      }, 100);
    }
  } else if (msg.action === "loadArcteryxCa") {
    if (HelperFunctions.plugged_isProductUrl("arcteryxCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product__need-to-know__hero-image').length) {
          clearInterval(checkExist);
          loadSite($('.product__need-to-know__hero-image'), "Arcteryx (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadBestBuyCa") {
    if (HelperFunctions.plugged_isProductUrl("bestBuyCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('[data-automation=media-gallery-product-image-slider]').length) {
          clearInterval(checkExist);
          loadSite($('[data-automation=media-gallery-product-image-slider]'), "Best Buy (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadWalmartCa") {
    if (HelperFunctions.plugged_isProductUrl("walmartCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.css-18f77yw')) {
          clearInterval(checkExist);
          loadSite($('.css-18f77yw'), "Walmart (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadHerschelCa") {
    if (HelperFunctions.plugged_isProductUrl("herschelCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-images')) {
          clearInterval(checkExist);
          loadSite($('.product-images'), "Herschel (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadIkeaCa") {
    if (HelperFunctions.plugged_isProductUrl("ikeaCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-pip__left-container')) {
          clearInterval(checkExist);
          loadSite($('.product-pip__left-container'), "Ikea (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadIndigoCa") {
    if (HelperFunctions.plugged_isProductUrl("indigoCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-details__image-container')) {
          clearInterval(checkExist);
          loadSite($('.product-details__image-container'), "Indigo (CA)");
          // Need to move lower for Indigo
          $('#plugged__button-root').css('margin-top', '65px');
        }
      }, 100);
    }
  } else if (msg.action === "loadTheSource") {
    if (HelperFunctions.plugged_isProductUrl("theSource", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.productImagePrimary')) {
          clearInterval(checkExist);
          loadSite($('.productImagePrimary'), "The Source");
          // Need to move lower for Source
          $('#plugged__button-root').css('margin-top', '65px');
        }
      }, 100);
    }
  } else if (msg.action === "loadStaples") {
    if (HelperFunctions.plugged_isProductUrl("staples", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-gallery')) {
          clearInterval(checkExist);
          loadSite($('.product-gallery'), "Staples");
          // Need to move lower for Staples
          $('#plugged__button-root').css('margin-top', '65px');
        }
      }, 100);
    }
  } else if (msg.action === "loadCanadianTire") {
    if (HelperFunctions.plugged_isProductUrl("canadianTire", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.pdp-product-image-content-wrapper')) {
          clearInterval(checkExist);
          loadSite($('.pdp-product-image-content-wrapper'), "Canadian Tire");
          // Need to move lower for Canadian Tire
          $('#plugged__button-root').css('margin-top', '65px');
          $('#plugged__button-root').css('z-index', '1');
        }
      }, 100);
    }
  } else if (msg.action === "loadTheShoeCompanyCa") {
    if (HelperFunctions.plugged_isProductUrl("theShoeCompanyCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-detail__carousel') && $('.product-detail__name') && $('.product-detail__name').length && $('.product-detail__name')[0].innerText) {
          clearInterval(checkExist);
          loadSite($('.product-detail__carousel'), "The Shoe Company (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadDesignerShoeWarehouseCa") {
    if (HelperFunctions.plugged_isProductUrl("designerShoeWarehouseCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-detail__carousel') && $('.product-detail__name') && $('.product-detail__name').length && $('.product-detail__name')[0].innerText) {
          clearInterval(checkExist);
          loadSite($('.product-detail__carousel'), "Designer Shoe Warehouse (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadShoeWarehouseCa") {
    if (HelperFunctions.plugged_isProductUrl("shoeWarehouseCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-detail__carousel') && $('.product-detail__name') && $('.product-detail__name').length && $('.product-detail__name')[0].innerText) {
          clearInterval(checkExist);
          loadSite($('.product-detail__carousel'), "Shoe Warehouse (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadCostcoCa") {
    if (HelperFunctions.plugged_isProductUrl("costcoCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#productImageContainer')) {
          clearInterval(checkExist);
          loadSite($('#productImageContainer'), "Costco (CA)");
          // Need to move lower for Costco
          $('#plugged__button-root').css('z-index', '100000');
        }
      }, 100);
    }
  } else if (msg.action === "loadBoutique1861") {
    if (HelperFunctions.plugged_isProductUrl("boutique1861", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.js-product-page-gallery')) {
          clearInterval(checkExist);
          loadSite($('.js-product-page-gallery'), "Boutique 1861");
        }
      }, 100);
    }
  } else if (msg.action === "loadCleo") {
    if (HelperFunctions.plugged_isProductUrl("cleo", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#pdpMain')) {
          clearInterval(checkExist);
          loadSite($('#pdpMain'), "Cleo");
        }
      }, 100);
    }
  } else if (msg.action === "loadRickis") {
    if (HelperFunctions.plugged_isProductUrl("rickis", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#pdpMain')) {
          clearInterval(checkExist);
          loadSite($('#pdpMain'), "Rickis");
        }
      }, 100);
    }
  } else if (msg.action === "loadHoltRenfrew") {
    if (HelperFunctions.plugged_isProductUrl("holtRenfrew", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.pdp-carousel')) {
          clearInterval(checkExist);
          loadSite($('.pdp-carousel'), "Holt Renfrew");
        }
      }, 100);
    }
  } else if (msg.action === "loadKotn") {
    if (HelperFunctions.plugged_isProductUrl("kotn", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('img.product-image') && $('img.product-image').parent()) {
          clearInterval(checkExist);
          loadSite($('img.product-image').parent(), "Kotn");
          // Need to move lower for Kotn
          $('#plugged__button-root').css('margin-top', '50px');
          $('#plugged__button-root').css('z-index', '1');
        }
      }, 100);
    }
  } else if (msg.action === "loadLaCanadienne") {
    if (HelperFunctions.plugged_isProductUrl("laCanadienne", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product.media')) {
          clearInterval(checkExist);
          loadSite($('.product.media'), "La Canadienne");
        }
      }, 100);
    }
  } else if (msg.action === "loadLoleCa") {
    if (HelperFunctions.plugged_isProductUrl("loleCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.swipper')) {
          clearInterval(checkExist);
          loadSite($('.swipper'), "Lole (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadRwCo") {
    if (HelperFunctions.plugged_isProductUrl("rwCo", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-primary-image')) {
          clearInterval(checkExist);
          loadSite($('.product-primary-image'), "RW & CO");
          // Need to set z-index
          $('#plugged__button-root').css('z-index', '1');
        }
      }, 100);
    }
  } else if (msg.action === "loadMattAndNatCa") {
    if (HelperFunctions.plugged_isProductUrl("mattAndNatCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product.media')) {
          clearInterval(checkExist);
          loadSite($('.product.media'), "Matt & Nat (CA)");
        }
      }, 100);
    }
  } else if (msg.action === "loadLaura") {
    if (HelperFunctions.plugged_isProductUrl("laura", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-image-container')) {
          clearInterval(checkExist);
          loadSite($('.product-image-container'), "Laura");
        }
      }, 100);
    }
  } else if (msg.action === "loadMelanieLyne") {
    if (HelperFunctions.plugged_isProductUrl("melanieLyne", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.product-image-container')) {
          clearInterval(checkExist);
          loadSite($('.product-image-container'), "Melanie Lyne");
        }
      }, 100);
    }
  } else if (msg.action === "loadDress911") {
    if (HelperFunctions.plugged_isProductUrl("dress911", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#images_holder')) {
          clearInterval(checkExist);
          loadSite($('#images_holder'), "Dress 911");
        }
      }, 100);
    }
  } else if (msg.action === "loadTobiCa") {
    if (HelperFunctions.plugged_isProductUrl("tobiCa", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.grid-detail-images')) {
          clearInterval(checkExist);
          loadSite($('.grid-detail-images'), "Tobi (CA)");
          // Need to set z-index
          $('#plugged__button-root').css('z-index', '1020');
        }
      }, 100);
    }
  } else if (msg.action === "loadCanadaComputers") {
    if (HelperFunctions.plugged_isProductUrl("canadaComputers", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.page-product_info')) {
          clearInterval(checkExist);
          loadSite($('.page-product_info'), "Canada Computers");
        }
      }, 100);
    }
  } else if (msg.action === "loadVisions") {
    if (HelperFunctions.plugged_isProductUrl("visions", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#detailview-content-col1')) {
          clearInterval(checkExist);
          loadSite($('#detailview-content-col1'), "Visions");
        }
      }, 100);
    }
  } else if (msg.action === "loadToysRUs") {
    if (HelperFunctions.plugged_isProductUrl("toysRUs", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.js-images-section')) {
          clearInterval(checkExist);
          loadSite($('.js-images-section'), "Toys R Us");
        }
      }, 100);
    }
  } else if (msg.action === "loadMemoryExpress") {
    if (HelperFunctions.plugged_isProductUrl("memoryExpress", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.l-capr-page__info')) {
          clearInterval(checkExist);
          loadSite($('.l-capr-page__info'), "Memory Express");
        }
      }, 100);
    }
  } else if (msg.action === "loadMikesComputerShop") {
    if (HelperFunctions.plugged_isProductUrl("mikesComputerShop", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('#active-image-container')) {
          clearInterval(checkExist);
          loadSite($('#active-image-container'), "Mike's Computer Shop");
        }
      }, 100);
    }
  } else if (msg.action === "loadNewegg") {
    if (HelperFunctions.plugged_isProductUrl("newegg", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.objImages')) {
          clearInterval(checkExist);
          loadSite($('.objImages'), "Newegg");
        }
      }, 100);
    }
  } else if (msg.action === "loadPcCanada") {
    if (HelperFunctions.plugged_isProductUrl("pcCanada", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.itemSlider')) {
          clearInterval(checkExist);
          loadSite($('.itemSlider'), "pcCanada");
        }
      }, 100);
    }
  } else if (msg.action === "loadVuugo") {
    if (HelperFunctions.plugged_isProductUrl("vuugo", window.location.href)) {
      // Check every 100ms and load, up to 5 seconds
      let times = 0;
      var checkExist = setInterval(function() {
        times += 1;
        if (times >= 50) {
          clearInterval(checkExist);
        } else if ($('.fleft.left')) {
          clearInterval(checkExist);
          loadSite($('.fleft.left'), "vuugo");
          // Need to set z-index for Vuugo, and move lower
          $('#plugged__button-root').css('z-index', '11');
          $('#plugged__button-root').css('margin-top', '40px');
        }
      }, 100);
    }
  }
  // TODO: Add more sites here
});

function loadSite(selector, merchant) {
  ReactDOM.render(<PluggedButton merchant={merchant}/>, app);
  selector
    .css('position', 'relative')
    .css('overflow', 'hidden')
    .append(app);

  let cb = () => {
    selector.css('overflow', 'visible');
  }

  // Fade in and out
  selector.hover(() => {
    slideIn(cb);
  }, () => {
    if (globalHoverState === hoverEnum.NONE) {
      selector.css('overflow', 'hidden');
      slideOut();
    }
  });

  window.setTimeout(() => {
    slideIn(cb);
  }, 1000);
}

function loadSiteHaven(selector, merchant) {
  selector.append(app);
  ReactDOM.render(<PluggedButton merchant={merchant}/>, app);

  // Fade in and out
  selector.hover(() => {
    slideIn();
  }, () => {
    if (globalHoverState === hoverEnum.NONE) {
      slideOut();
    }
  });

  window.setTimeout(() => {
    slideIn();
  }, 1000);
}

function loadSiteTateAndYoko(selector, merchant) {
  ReactDOM.render(<PluggedButton merchant={merchant}/>, app);
  selector
    .css('position', 'relative')
    .css('overflow', 'hidden')
    .append(app);

  // Fade in and out
  selector.hover(() => {
    slideIn();
  }, () => {
    if (globalHoverState === hoverEnum.NONE) {
      selector.css('overflow', 'hidden');
      slideOut();
    }
  });

  window.setTimeout(() => {
    slideIn();
  }, 1000);
}

function slideIn(cb) {
  $('#plugged__button-root')
  .css('transition', '1s')
  .css('right', '10px')
  .on('transitionend webkitTransitionEnd oTransitionEnd', () => {
    if (cb) { cb(); };
  });
}

function slideOut() {
  $('#plugged__button-root')
  .css('transition', '1s')
  .css('right', '-155px')
  .off('transitionend webkitTransitionEnd oTransitionEnd');
}
