console.log('Background script running');

authUrl = 'http://localhost:3000/site';
apiUrl = 'http://localhost:8080';
oldAuthUrl = 'https://joinplugged.ca/site';
oldApiUrl = 'https://api.joinplugged.ca';

// On install show help
if (chrome.runtime.onInstalled) {
  chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === "install") {
      chrome.tabs.create({url: `${authUrl}/instructions`}, (tab) => {
        // Opened a new tab with help
      })
    }
  });
}

// Uninstall survey
if (chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL('https://forms.gle/U9mW4mBTTHGhkz577');
} else {
  // Not available
}

function togglePlugged() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {'action': 'clicked_browser_action'});
  });
}

function togglePluggedSavePage() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      'action': 'clicked_browser_action_save_page'
    });
  });
}

function togglePluggedSavePageMulti(scrapedData) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      'action': 'clicked_browser_action_save_page_multi',
      'scrapedData': scrapedData
    });
  });
}

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
  togglePlugged();
});

function saveWatchedItemsToLocalStorage(session, callback, callbackOptions) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', apiUrl + '/query/getWatchedItems', true);
  xhr.setRequestHeader('x-plugged', session);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status == 200) {
        let watchedItemsArray = JSON.parse(xhr.response);
        let storeWatchedItems = [];
        let storeWatchedItemsDict = {};
        for (let i = 0; i < watchedItemsArray.length; i++) {
          storeWatchedItemsDict[watchedItemsArray[i].product_url] = i;
          storeWatchedItems.push(watchedItemsArray[i]);
        }
        chrome.storage.local.set({
          pluggedWatchedItems: storeWatchedItems,
          pluggedWatchedItemsDict: storeWatchedItemsDict
        }, () => {
          // Send message to all tabs so popup can refresh
          chrome.tabs.query({}, tabs => {
            for (let i = 0; i < tabs.length; i++) {
              chrome.tabs.sendMessage(tabs[i].id, {
                action: "refreshWatchedItems"
              });
            }
          });
          if (callback) {
            callback(callbackOptions);
          }
          console.log('Set watched items successfully');
        });
      } else {
        console.log('ERROR: Could not set watched items');
      }
    }
  };
  xhr.send();
}

function saveItemsToLocalStorage(sendResponse, callbackOptions) {
  chrome.storage.local.get(['pluggedSession', 'pluggedSessionExpiry'], res => {
    let pluggedSession = res.pluggedSession;

    if (sendResponse) {
      saveWatchedItemsToLocalStorage(pluggedSession, sendResponse, callbackOptions);
    } else {
      saveWatchedItemsToLocalStorage(pluggedSession, null, null);
    }
  });
}

// Listen for sign in and sign out
chrome.runtime.onMessageExternal.addListener((msg, sender) => {
  console.log('Chrome extension listening for messages');
  if (msg.status === "pluggedSignIn") {
    let d = new Date();
    // Set session expiration to 13 days. Should be same as the expiration time that backend sets
    d.setTime(d.getTime() + (60 * 60 * 24 * 13 * 1000));
    let pluggedSessionExpiry = d.getTime();

    msg.pluggedCurrentUser.picture_url = msg.pluggedCurrentUser.photoUrl;
    chrome.storage.local.set({
      pluggedSession: msg.pluggedSession,
      pluggedSessionExpiry: pluggedSessionExpiry,
      pluggedCurrentUser: msg.pluggedCurrentUser
    }, () => {
      // Alert popup if open
      chrome.tabs.query({}, tabs => {
        for (let i = 0; i < tabs.length; i++) {
          chrome.tabs.sendMessage(tabs[i].id, {
            action: "pluggedSignIn"
          });
        }
      });
      saveItemsToLocalStorage(null, null);
    });
  } else if (msg.status === "pluggedSignOut") {
    chrome.storage.local.clear(() => {
      // Alert popup if open
      chrome.tabs.query({}, tabs => {
        for (let i = 0; i < tabs.length; i++) {
          chrome.tabs.sendMessage(tabs[i].id, {
            action: "pluggedSignOut"
          });
        }
      });
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == "saveUrl") {
    chrome.storage.local.get(['pluggedSession', 'pluggedSessionExpiry'], res => {
      let pluggedSession = res.pluggedSession

      let xhr = new XMLHttpRequest();
      xhr.open('POST', apiUrl + '/query/saveUrlFaster', true);
      xhr.setRequestHeader('x-plugged', pluggedSession);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          // Refresh local storage watched items
          if (xhr.status === 200) {
            let callbackOptions = {
              status: xhr.status,
              statusText: xhr.statusText,
              response: xhr.response,
              responseText: xhr.responseText
            };
            saveItemsToLocalStorage(sendResponse, callbackOptions);
          } else {
            sendResponse({
              status: 500,
              statusText: "XMLHttpRequest error"
            });
          }
        }
      };
      xhr.onerror = (err) => {
        sendResponse({
          status: 500,
          statusText: "XMLHttpRequest error"
        });
      };
      xhr.send(JSON.stringify(request));
    });
    // Important: Return true to indicate response is asynchronous
    return true;
  } else if (request.action == "removeSavedUrl") {
    chrome.storage.local.get(['pluggedSession', 'pluggedSessionExpiry'], res => {
      let pluggedSession = res.pluggedSession

      let xhr = new XMLHttpRequest();
      xhr.open('POST', apiUrl + '/query/removeSavedUrl', true);
      xhr.setRequestHeader('x-plugged', pluggedSession);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          // Refresh local storage watched items
          if (xhr.status === 200) {
            let callbackOptions = {
              status: xhr.status,
              statusText: xhr.statusText,
              response: xhr.response,
              responseText: xhr.responseText
            };
            saveItemsToLocalStorage(sendResponse, callbackOptions);
          } else {
            sendResponse({
              status: 500,
              statusText: "XMLHttpRequest error"
            });
          }
        }
      };
      xhr.onerror = (err) => {
        sendResponse({
          status: 500,
          statusText: "XMLHttpRequest error"
        });
      };
      xhr.send(JSON.stringify(request));
    });
    // Important: Return true to indicate response is asynchronous
    return true;
  } else if (request.action == "getWatchedItems") {
    chrome.storage.local.get(['pluggedSession'], res => {
      let pluggedSession = res.pluggedSession

      let xhr = new XMLHttpRequest();
      xhr.open('POST', apiUrl + '/query/getWatchedItems', true);
      xhr.setRequestHeader('x-plugged', pluggedSession);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          sendResponse({
            status: xhr.status,
            statusText: xhr.statusText,
            response: JSON.parse(xhr.response),
            responseText: xhr.responseText
          });
        }
      };
      xhr.onerror = (err) => {
        sendResponse({
          status: 500,
          statusText: "XMLHttpRequest error"
        });
      };
      xhr.send(JSON.stringify(request));
    });
    // Important: Return true to indicate response is asynchronous
    return true;
  } else if (request.action === "togglePlugged") {
    togglePlugged();
  } else if (request.action === "togglePluggedSavePage") {
    togglePluggedSavePage();
  } else if (request.action === "togglePluggedSavePageMulti") {
    togglePluggedSavePageMulti(request.scrapedData);
  } else if (request.action === "updateProfile") {
    chrome.storage.local.get(['pluggedSession'], res => {
      let pluggedSession = res.pluggedSession

      let xhr = new XMLHttpRequest();
      xhr.open('POST', apiUrl + '/query/updateProfile', true);
      xhr.setRequestHeader('x-plugged', pluggedSession);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            sendResponse({
              status: xhr.status,
              statusText: xhr.statusText,
              response: JSON.parse(xhr.response),
              responseText: xhr.responseText
            });
          } else if (xhr.status === 500) {
            // If 500 error, means backend sent a displayable user message
            sendResponse({
              status: 500,
              statusText: "XMLHttpRequest error",
              responseText: xhr.responseText
            });
          } else {
            sendResponse({
              status: 500,
              statusText: "XMLHttpRequest error",
              responseText: 'Oops! Something went wrong. Our team has been alerted of the problem.'
            });
          }
        }
      };
      xhr.onerror = (err) => {``
        sendResponse({
          status: 500,
          statusText: "XMLHttpRequest error",
          responseText: xhr.responseText
        });
      };
      xhr.send(JSON.stringify(request));
    });
    // Important: Return true to indicate response is asynchronous
    return true;
  } else if (request.action === "followUser") {
    chrome.storage.local.get(['pluggedSession'], res => {
      let session = res.pluggedSession;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', this.apiUrl + '/query/follow', true);
      xhr.setRequestHeader('x-plugged', session);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status == 200) {
            sendResponse({
              status: xhr.status,
              statusText: xhr.statusText,
              response: xhr.response,
              responseText: xhr.responseText
            });
          } else {
            sendResponse({
              status: 500,
              statusText: "XMLHttpRequest error",
              responseText: 'Oops! Could not follow user. Please try again later'
            });
          }
        }
      };
      xhr.send(JSON.stringify({username: request.username}));
    });
    // Important: Return true to indicate response is asynchronous
    return true;
  } else if (request.action === "unfollowUser") {
    chrome.storage.local.get(['pluggedSession'], res => {
      let session = res.pluggedSession;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', this.apiUrl + '/query/unfollow', true);
      xhr.setRequestHeader('x-plugged', session);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status == 200) {
            sendResponse({
              status: xhr.status,
              statusText: xhr.statusText,
              response: xhr.response,
              responseText: xhr.responseText
            });
          } else {
            sendResponse({
              status: 500,
              statusText: "XMLHttpRequest error",
              responseText: 'Oops! Could not unfollow user. Please try again later'
            });
          }
        }
      };
      xhr.send(JSON.stringify({username: request.username}));
    });
    // Important: Return true to indicate response is asynchronous
    return true;
  } else if (request.action === "refreshWatchedItems") {
    saveItemsToLocalStorage(null, null);
  }
});

// Hacky way to detect product pages.
//   Content scripts are only reloaded on domain changes, not subdomain changes
//   so we must run content script on the whole store, and send a notification when we are on a product page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == "complete" && tab.status == "complete") {
    // Load Plugged button
    if (window.plugged_isProductUrl("kith", tab.url)) {
      loadSite("loadKith");
    } else if (window.plugged_isProductUrl("nikeCa", tab.url)) {
      loadSite("loadNikeCa");
    } else if (window.plugged_isProductUrl("nikeUs", tab.url)) {
      loadSite("loadNikeUs");
    } else if (window.plugged_isProductUrl("haven", tab.url)) {
      loadSite("loadHaven");
    } else if (window.plugged_isProductUrl("livestock", tab.url)) {
      loadSite("loadLivestock");
    } else if (window.plugged_isProductUrl("undefeated", tab.url)) {
      loadSite("loadUndefeated");
    } else if (window.plugged_isProductUrl("ssenseCa", tab.url)) {
      loadSite("loadSsenseCa");
    } else if (window.plugged_isProductUrl("ssenseUs", tab.url)) {
      loadSite("loadSsenseUs");
    } else if (window.plugged_isProductUrl("nomad", tab.url)) {
      loadSite("loadNomad");
    } else if (window.plugged_isProductUrl("mrPorterCa", tab.url)) {
      loadSite("loadMrPorterCa");
    } else if (window.plugged_isProductUrl("mrPorterUs", tab.url)) {
      loadSite("loadMrPorterUs");
    } else if (window.plugged_isProductUrl("nrml", tab.url)) {
      loadSite("loadNrml");
    } else if (window.plugged_isProductUrl("sportchek", tab.url)) {
      loadSite("loadSportchek");
    } else if (window.plugged_isProductUrl("adidasCa", tab.url)) {
      loadSite("loadAdidasCa");
    } else if (window.plugged_isProductUrl("adidasUs", tab.url)) {
      loadSite("loadAdidasUs");
    } else if (window.plugged_isProductUrl("frankAndOak", tab.url)) {
      loadSite("loadFrankAndOak");
    } else if (window.plugged_isProductUrl("urbanOutfittersCa", tab.url)) {
      loadSite("loadUrbanOutfittersCa");
    } else if (window.plugged_isProductUrl("urbanOutfittersUs", tab.url)) {
      loadSite("loadUrbanOutfittersUs");
    } else if (window.plugged_isProductUrl("theBay", tab.url)) {
      loadSite("loadTheBay");
    } else if (window.plugged_isProductUrl("endCa", tab.url)) {
      loadSite("loadEndCa");
    } else if (window.plugged_isProductUrl("endUs", tab.url)) {
      loadSite("loadEndUs");
    } else if (window.plugged_isProductUrl("dutil", tab.url)) {
      loadSite("loadDutil");
    } else if (window.plugged_isProductUrl("allSaintsCa", tab.url)) {
      loadSite("loadAllSaintsCa");
    } else if (window.plugged_isProductUrl("allSaintsUs", tab.url)) {
      loadSite("loadAllSaintsUs");
    } else if (window.plugged_isProductUrl("altitudeSports", tab.url)) {
      loadSite("loadAltitudeSports");
    } else if (window.plugged_isProductUrl("mackageCa", tab.url)) {
      loadSite("loadMackageCa");
    } else if (window.plugged_isProductUrl("mackageUs", tab.url)) {
      loadSite("loadMackageUs");
    } else if (window.plugged_isProductUrl("zaraCa", tab.url)) {
      loadSite("loadZaraCa");
    } else if (window.plugged_isProductUrl("zaraUs", tab.url)) {
      loadSite("loadZaraUs");
    } else if (window.plugged_isProductUrl("wingsAndHorns", tab.url)) {
      loadSite("loadWingsAndHorns");
    } else if (window.plugged_isProductUrl("oakAndFortCa", tab.url)) {
      loadSite("loadOakAndFortCa");
    } else if (window.plugged_isProductUrl("oakAndFortUs", tab.url)) {
      loadSite("loadOakAndFortUs");
    } else if (window.plugged_isProductUrl("uniqloCa", tab.url)) {
      loadSite("loadUniqloCa");
    } else if (window.plugged_isProductUrl("uniqloUs", tab.url)) {
      loadSite("loadUniqloUs");
    } else if (window.plugged_isProductUrl("theLastHunt", tab.url)) {
      loadSite("loadTheLastHunt");
    } else if (window.plugged_isProductUrl("tateAndYoko", tab.url)) {
      loadSite("loadTateAndYoko");
    } else if (window.plugged_isProductUrl("hmCa", tab.url)) {
      loadSite("loadHmCa");
    } else if (window.plugged_isProductUrl("americanEagleCa", tab.url)) {
      loadSite("loadAmericanEagleCa");
    } else if (window.plugged_isProductUrl("adrift", tab.url)) {
      loadSite("loadAdrift");
    } else if (window.plugged_isProductUrl("abercrombieFitchCa", tab.url)) {
      loadSite("loadAbercrombieFitchCa");
    } else if (window.plugged_isProductUrl("aldoCa", tab.url)) {
      loadSite("loadAldoCa");
    } else if (window.plugged_isProductUrl("asicsCa", tab.url)) {
      loadSite("loadAsicsCa");
    } else if (window.plugged_isProductUrl("bananaRepublicCa", tab.url)) {
      loadSite("loadBananaRepublicCa");
    } else if (window.plugged_isProductUrl("oldNavyCa", tab.url)) {
      loadSite("loadOldNavyCa");
    } else if (window.plugged_isProductUrl("blueButtonShop", tab.url)) {
      loadSite("loadBlueButtonShop");
    } else if (window.plugged_isProductUrl("bonobos", tab.url)) {
      loadSite("loadBonobos");
    } else if (window.plugged_isProductUrl("brooklynClothing", tab.url)) {
      loadSite("loadBrooklynClothing");
    } else if (window.plugged_isProductUrl("browns", tab.url)) {
      loadSite("loadBrowns");
    } else if (window.plugged_isProductUrl("calvinKleinCa", tab.url)) {
      loadSite("loadCalvinKleinCa");
    } else if (window.plugged_isProductUrl("capsule", tab.url)) {
      loadSite("loadCapsule");
    } else if (window.plugged_isProductUrl("clubMonacoCa", tab.url)) {
      loadSite("loadClubMonacoCa");
    } else if (window.plugged_isProductUrl("cntrbnd", tab.url)) {
      loadSite("loadCntrbnd");
    } else if (window.plugged_isProductUrl("coachCa", tab.url)) {
      loadSite("loadCoachCa");
    } else if (window.plugged_isProductUrl("courtsideSneakers", tab.url)) {
      loadSite("loadCourtsideSneakers");
    } else if (window.plugged_isProductUrl("dueWest", tab.url)) {
      loadSite("loadDueWest");
    } else if (window.plugged_isProductUrl("dynamiteCa", tab.url)) {
      loadSite("loadDynamiteCa");
    } else if (window.plugged_isProductUrl("eddieBauerCa", tab.url)) {
      loadSite("loadEddieBauerCa");
    } else if (window.plugged_isProductUrl("garageCa", tab.url)) {
      loadSite("loadGarageCa");
    } else if (window.plugged_isProductUrl("famousFootwearCa", tab.url)) {
      loadSite("loadFamousFootwearCa");
    } else if (window.plugged_isProductUrl("footLockerCa", tab.url)) {
      loadSite("loadFootLockerCa");
    } else if (window.plugged_isProductUrl("fourHorsemen", tab.url)) {
      loadSite("loadFourHorsemen");
    } else if (window.plugged_isProductUrl("gapCa", tab.url)) {
      loadSite("loadGapCa");
    } else if (window.plugged_isProductUrl("aritziaCa", tab.url)) {
      loadSite("loadAritziaCa");
    } else if (window.plugged_isProductUrl("farfetchCa", tab.url)) {
      loadSite("loadFarfetchCa");
    } else if (window.plugged_isProductUrl("gerhard", tab.url)) {
      loadSite("loadGerhard");
    } else if (window.plugged_isProductUrl("gravitypope", tab.url)) {
      loadSite("loadGravitypope");
    } else if (window.plugged_isProductUrl("guessCa", tab.url)) {
      loadSite("loadGuessCa");
    } else if (window.plugged_isProductUrl("guessFactoryCa", tab.url)) {
      loadSite("loadGuessFactoryCa");
    } else if (window.plugged_isProductUrl("gstarCa", tab.url)) {
      loadSite("loadGstarCa");
    } else if (window.plugged_isProductUrl("acneStudiosCa", tab.url)) {
      loadSite("loadAcneStudiosCa");
    } else if (window.plugged_isProductUrl("harryRosen", tab.url)) {
      loadSite("loadHarryRosen");
    } else if (window.plugged_isProductUrl("hbx", tab.url)) {
      loadSite("loadHbx");
    } else if (window.plugged_isProductUrl("henrySinger", tab.url)) {
      loadSite("loadHenrySinger");
    } else if (window.plugged_isProductUrl("hunterCa", tab.url)) {
      loadSite("loadHunterCa");
    } else if (window.plugged_isProductUrl("hollisterCa", tab.url)) {
      loadSite("loadHollisterCa");
    } else if (window.plugged_isProductUrl("influenceuCa", tab.url)) {
      loadSite("loadInfluenceuCa");
    } else if (window.plugged_isProductUrl("jcrewFactoryCa", tab.url)) {
      loadSite("loadJcrewFactoryCa");
    } else if (window.plugged_isProductUrl("jcrewCa", tab.url)) {
      loadSite("loadJcrewCa");
    } else if (window.plugged_isProductUrl("bestseller", tab.url)) {
      loadSite("loadBestseller");
    } else if (window.plugged_isProductUrl("bricksAndBonds", tab.url)) {
      loadSite("loadBricksAndBonds");
    } else if (window.plugged_isProductUrl("joeFresh", tab.url)) {
      loadSite("loadJoeFresh");
    } else if (window.plugged_isProductUrl("kateSpade", tab.url)) {
      loadSite("loadKateSpade");
    } else if (window.plugged_isProductUrl("laSenzaCa", tab.url)) {
      loadSite("loadLaSenzaCa");
    } else if (window.plugged_isProductUrl("lacosteCa", tab.url)) {
      loadSite("loadLacosteCa");
    } else if (window.plugged_isProductUrl("levisCa", tab.url)) {
      loadSite("loadLevisCa");
    } else if (window.plugged_isProductUrl("lessons", tab.url)) {
      loadSite("loadLessons");
    } else if (window.plugged_isProductUrl("leoBoutique", tab.url)) {
      loadSite("loadLeoBoutique");
    } else if (window.plugged_isProductUrl("less17", tab.url)) {
      loadSite("loadLess17");
    } else if (window.plugged_isProductUrl("lLBeanCa", tab.url)) {
      loadSite("loadLLBeanCa");
    } else if (window.plugged_isProductUrl("lidsCa", tab.url)) {
      loadSite("loadLidsCa");
    } else if (window.plugged_isProductUrl("littleBurgundy", tab.url)) {
      loadSite("loadLittleBurgundy");
    } else if (window.plugged_isProductUrl("lostAndFound", tab.url)) {
      loadSite("loadLostAndFound");
    } else if (window.plugged_isProductUrl("lululemonCa", tab.url)) {
      loadSite("loadLululemonCa");
    } else if (window.plugged_isProductUrl("exclucity", tab.url)) {
      loadSite("loadExclucity");
    } else if (window.plugged_isProductUrl("mangoCa", tab.url)) {
      loadSite("loadMangoCa");
    } else if (window.plugged_isProductUrl("marks", tab.url)) {
      loadSite("loadMarks");
    } else if (window.plugged_isProductUrl("marsClothing", tab.url)) {
      loadSite("loadMarsClothing");
    } else if (window.plugged_isProductUrl("mavi", tab.url)) {
      loadSite("loadMavi");
    } else if (window.plugged_isProductUrl("milohShop", tab.url)) {
      loadSite("loadMilohShop");
    } else if (window.plugged_isProductUrl("michaelKorsCa", tab.url)) {
      loadSite("loadMichaelKorsCa");
    } else if (window.plugged_isProductUrl("michelBrisson", tab.url)) {
      loadSite("loadMichelBrisson");
    } else if (window.plugged_isProductUrl("mooseKnuckles", tab.url)) {
      loadSite("loadMooseKnuckles");
    } else if (window.plugged_isProductUrl("mec", tab.url)) {
      loadSite("loadMec");
    } else if (window.plugged_isProductUrl("muttonhead", tab.url)) {
      loadSite("loadMuttonhead");
    } else if (window.plugged_isProductUrl("muddyGeorge", tab.url)) {
      loadSite("loadMuddyGeorge");
    } else if (window.plugged_isProductUrl("neighbour", tab.url)) {
      loadSite("loadNeighbour");
    } else if (window.plugged_isProductUrl("neimanMarcusCa", tab.url)) {
      loadSite("loadNeimanMarcusCa");
    } else if (window.plugged_isProductUrl("newBalanceCa", tab.url)) {
      loadSite("loadNewBalanceCa");
    } else if (window.plugged_isProductUrl("theNorthFaceCa", tab.url)) {
      loadSite("loadTheNorthFaceCa");
    } else if (window.plugged_isProductUrl("offTheHook", tab.url)) {
      loadSite("loadOffTheHook");
    } else if (window.plugged_isProductUrl("overTheRainbow", tab.url)) {
      loadSite("loadOverTheRainbow");
    } else if (window.plugged_isProductUrl("palmAngelsCa", tab.url)) {
      loadSite("loadPalmAngelsCa");
    } else if (window.plugged_isProductUrl("pandoraCa", tab.url)) {
      loadSite("loadPandoraCa");
    } else if (window.plugged_isProductUrl("patagoniaCa", tab.url)) {
      loadSite("loadPatagoniaCa");
    } else if (window.plugged_isProductUrl("peaceCollective", tab.url)) {
      loadSite("loadPeaceCollective");
    } else if (window.plugged_isProductUrl("pumaCa", tab.url)) {
      loadSite("loadPumaCa");
    } else if (window.plugged_isProductUrl("realSports", tab.url)) {
      loadSite("loadRealSports");
    } else if (window.plugged_isProductUrl("reebokCa", tab.url)) {
      loadSite("loadReebokCa");
    } else if (window.plugged_isProductUrl("common", tab.url)) {
      loadSite("loadCommon");
    } else if (window.plugged_isProductUrl("rootsCa", tab.url)) {
      loadSite("loadRootsCa");
    } else if (window.plugged_isProductUrl("rodenGray", tab.url)) {
      loadSite("loadRodenGray");
    } else if (window.plugged_isProductUrl("rooney", tab.url)) {
      loadSite("loadRooney");
    } else if (window.plugged_isProductUrl("saksFifthAvenueCa", tab.url)) {
      loadSite("loadSaksFifthAvenueCa");
    } else if (window.plugged_isProductUrl("saksOffFifthCa", tab.url)) {
      loadSite("loadSaksOffFifthCa");
    } else if (window.plugged_isProductUrl("sauconyCa", tab.url)) {
      loadSite("loadSauconyCa");
    } else if (window.plugged_isProductUrl("sephoraCa", tab.url)) {
      loadSite("loadSephoraCa");
    } else if (window.plugged_isProductUrl("sportsExperts", tab.url)) {
      loadSite("loadSportsExperts");
    } else if (window.plugged_isProductUrl("atmosphere", tab.url)) {
      loadSite("loadAtmosphere");
    } else if (window.plugged_isProductUrl("springCa", tab.url)) {
      loadSite("loadSpringCa");
    } else if (window.plugged_isProductUrl("steveMaddenCa", tab.url)) {
      loadSite("loadSteveMaddenCa");
    } else if (window.plugged_isProductUrl("simonsCa", tab.url)) {
      loadSite("loadSimonsCa");
    } else if (window.plugged_isProductUrl("solestop", tab.url)) {
      loadSite("loadSolestop");
    } else if (window.plugged_isProductUrl("softMocCa", tab.url)) {
      loadSite("loadSoftMocCa");
    } else if (window.plugged_isProductUrl("spierAndMackay", tab.url)) {
      loadSite("loadSpierAndMackay");
    } else if (window.plugged_isProductUrl("sportingLifeCa", tab.url)) {
      loadSite("loadSportingLifeCa");
    } else if (window.plugged_isProductUrl("stillLife", tab.url)) {
      loadSite("loadStillLife");
    } else if (window.plugged_isProductUrl("uncleOtis", tab.url)) {
      loadSite("loadUncleOtis");
    } else if (window.plugged_isProductUrl("understudy", tab.url)) {
      loadSite("loadUnderstudy");
    } else if (window.plugged_isProductUrl("arcteryxCa", tab.url)) {
      loadSite("loadArcteryxCa");
    } else if (window.plugged_isProductUrl("bestBuyCa", tab.url)) {
      loadSite("loadBestBuyCa");
    } else if (window.plugged_isProductUrl("walmartCa", tab.url)) {
      loadSite("loadWalmartCa");
    } else if (window.plugged_isProductUrl("herschelCa", tab.url)) {
      loadSite("loadHerschelCa");
    } else if (window.plugged_isProductUrl("ikeaCa", tab.url)) {
      loadSite("loadIkeaCa");
    } else if (window.plugged_isProductUrl("indigoCa", tab.url)) {
      loadSite("loadIndigoCa");
    } else if (window.plugged_isProductUrl("theSource", tab.url)) {
      loadSite("loadTheSource");
    } else if (window.plugged_isProductUrl("staples", tab.url)) {
      loadSite("loadStaples");
    } else if (window.plugged_isProductUrl("canadianTire", tab.url)) {
      loadSite("loadCanadianTire");
    } else if (window.plugged_isProductUrl("theShoeCompanyCa", tab.url)) {
      loadSite("loadTheShoeCompanyCa");
    } else if (window.plugged_isProductUrl("designerShoeWarehouseCa", tab.url)) {
      loadSite("loadDesignerShoeWarehouseCa");
    } else if (window.plugged_isProductUrl("shoeWarehouseCa", tab.url)) {
      loadSite("loadShoeWarehouseCa");
    } else if (window.plugged_isProductUrl("costcoCa", tab.url)) {
      loadSite("loadCostcoCa");
    } else if (window.plugged_isProductUrl("boutique1861", tab.url)) {
      loadSite("loadBoutique1861");
    } else if (window.plugged_isProductUrl("cleo", tab.url)) {
      loadSite("loadCleo");
    } else if (window.plugged_isProductUrl("rickis", tab.url)) {
      loadSite("loadRickis");
    } else if (window.plugged_isProductUrl("holtRenfrew", tab.url)) {
      loadSite("loadHoltRenfrew");
    } else if (window.plugged_isProductUrl("kotn", tab.url)) {
      loadSite("loadKotn");
    } else if (window.plugged_isProductUrl("laCanadienne", tab.url)) {
      loadSite("loadLaCanadienne");
    } else if (window.plugged_isProductUrl("loleCa", tab.url)) {
      loadSite("loadLoleCa");
    } else if (window.plugged_isProductUrl("rwCo", tab.url)) {
      loadSite("loadRwCo");
    } else if (window.plugged_isProductUrl("mattAndNatCa", tab.url)) {
      loadSite("loadMattAndNatCa");
    } else if (window.plugged_isProductUrl("laura", tab.url)) {
      loadSite("loadLaura");
    } else if (window.plugged_isProductUrl("melanieLyne", tab.url)) {
      loadSite("loadMelanieLyne");
    } else if (window.plugged_isProductUrl("dress911", tab.url)) {
      loadSite("loadDress911");
    } else if (window.plugged_isProductUrl("tobiCa", tab.url)) {
      loadSite("loadTobiCa");
    } else if (window.plugged_isProductUrl("canadaComputers", tab.url)) {
      loadSite("loadCanadaComputers");
    } else if (window.plugged_isProductUrl("visions", tab.url)) {
      loadSite("loadVisions");
    } else if (window.plugged_isProductUrl("toysRUs", tab.url)) {
      loadSite("loadToysRUs");
    } else if (window.plugged_isProductUrl("memoryExpress", tab.url)) {
      loadSite("loadMemoryExpress");
    } else if (window.plugged_isProductUrl("mikesComputerShop", tab.url)) {
      loadSite("loadMikesComputerShop");
    } else if (window.plugged_isProductUrl("newegg", tab.url)) {
      loadSite("loadNewegg");
    } else if (window.plugged_isProductUrl("pcCanada", tab.url)) {
      loadSite("loadPcCanada");
    } else if (window.plugged_isProductUrl("vuugo", tab.url)) {
      loadSite("loadVuugo");
    }
    // TODO: Add more sites here

    // Load Plugged Multi button
    if (window.plugged_isMerchantUrl("kith", tab.url)) {
      loadSite("loadKithMulti");
    } else if (window.plugged_isMerchantUrl("nikeCa", tab.url)) {
      loadSite("loadNikeCaMulti");
    } else if (window.plugged_isMerchantUrl("nikeUs", tab.url)) {
      loadSite("loadNikeUsMulti");
    } else if (window.plugged_isMerchantUrl("haven", tab.url)) {
      loadSite("loadHavenMulti");
    } else if (window.plugged_isMerchantUrl("livestock", tab.url)) {
      loadSite("loadLivestockMulti");
    } else if (window.plugged_isMerchantUrl("undefeated", tab.url)) {
      loadSite("loadUndefeatedMulti");
    } else if (window.plugged_isMerchantUrl("ssenseCa", tab.url)) {
      loadSite("loadSsenseCaMulti");
    } else if (window.plugged_isMerchantUrl("ssenseUs", tab.url)) {
      loadSite("loadSsenseUsMulti");
    } else if (window.plugged_isMerchantUrl("nomad", tab.url)) {
      loadSite("loadNomadMulti");
    } else if (window.plugged_isMerchantUrl("mrPorterCa", tab.url)) {
      loadSite("loadMrPorterCaMulti");
    } else if (window.plugged_isMerchantUrl("mrPorterUs", tab.url)) {
      loadSite("loadMrPorterUsMulti");
    } else if (window.plugged_isMerchantUrl("nrml", tab.url)) {
      loadSite("loadNrmlMulti");
    } else if (window.plugged_isMerchantUrl("sportchek", tab.url)) {
      loadSite("loadSportchekMulti");
    } else if (window.plugged_isMerchantUrl("adidasCa", tab.url)) {
      loadSite("loadAdidasCaMulti");
    } else if (window.plugged_isMerchantUrl("adidasUs", tab.url)) {
      loadSite("loadAdidasUsMulti");
    } else if (window.plugged_isMerchantUrl("frankAndOak", tab.url)) {
      loadSite("loadFrankAndOakMulti");
    } else if (window.plugged_isMerchantUrl("urbanOutfittersCa", tab.url)) {
      loadSite("loadUrbanOutfittersCaMulti");
    } else if (window.plugged_isMerchantUrl("urbanOutfittersUs", tab.url)) {
      loadSite("loadUrbanOutfittersUsMulti");
    } else if (window.plugged_isMerchantUrl("theBay", tab.url)) {
      loadSite("loadTheBayMulti");
    } else if (window.plugged_isMerchantUrl("endCa", tab.url)) {
      loadSite("loadEndCaMulti");
    } else if (window.plugged_isMerchantUrl("endUs", tab.url)) {
      loadSite("loadEndUsMulti");
    } else if (window.plugged_isMerchantUrl("dutil", tab.url)) {
      loadSite("loadDutilMulti");
    } else if (window.plugged_isMerchantUrl("allSaintsCa", tab.url)) {
      loadSite("loadAllSaintsCaMulti");
    } else if (window.plugged_isMerchantUrl("allSaintsUs", tab.url)) {
      loadSite("loadAllSaintsUsMulti");
    } else if (window.plugged_isMerchantUrl("altitudeSports", tab.url)) {
      loadSite("loadAltitudeSportsMulti");
    } else if (window.plugged_isMerchantUrl("mackageCa", tab.url)) {
      loadSite("loadMackageCaMulti");
    } else if (window.plugged_isMerchantUrl("mackageUs", tab.url)) {
      loadSite("loadMackageUsMulti");
    } else if (window.plugged_isMerchantUrl("zaraCa", tab.url)) {
      loadSite("loadZaraCaMulti");
    } else if (window.plugged_isMerchantUrl("zaraUs", tab.url)) {
      loadSite("loadZaraUsMulti");
    } else if (window.plugged_isMerchantUrl("wingsAndHorns", tab.url)) {
      loadSite("loadWingsAndHornsMulti");
    } else if (window.plugged_isMerchantUrl("oakAndFortCa", tab.url)) {
      loadSite("loadOakAndFortCaMulti");
    } else if (window.plugged_isMerchantUrl("oakAndFortUs", tab.url)) {
      loadSite("loadOakAndFortUsMulti");
    } else if (window.plugged_isMerchantUrl("uniqloCa", tab.url)) {
      loadSite("loadUniqloCaMulti");
    } else if (window.plugged_isMerchantUrl("uniqloUs", tab.url)) {
      loadSite("loadUniqloUsMulti");
    } else if (window.plugged_isMerchantUrl("theLastHunt", tab.url)) {
      loadSite("loadTheLastHuntMulti");
    } else if (window.plugged_isMerchantUrl("tateAndYoko", tab.url)) {
      loadSite("loadTateAndYokoMulti");
    } else if (window.plugged_isMerchantUrl("hmCa", tab.url)) {
      loadSite("loadHmCaMulti");
    } else if (window.plugged_isMerchantUrl("americanEagleCa", tab.url)) {
      loadSite("loadAmericanEagleCaMulti");
    } else if (window.plugged_isMerchantUrl("adrift", tab.url)) {
      loadSite("loadAdriftMulti");
    } else if (window.plugged_isMerchantUrl("abercrombieFitchCa", tab.url)) {
      loadSite("loadAbercrombieFitchCaMulti");
    } else if (window.plugged_isMerchantUrl("aldoCa", tab.url)) {
      loadSite("loadAldoCaMulti");
    } else if (window.plugged_isMerchantUrl("asicsCa", tab.url)) {
      loadSite("loadAsicsCaMulti");
    } else if (window.plugged_isMerchantUrl("bananaRepublicCa", tab.url)) {
      loadSite("loadBananaRepublicCaMulti");
    } else if (window.plugged_isMerchantUrl("oldNavyCa", tab.url)) {
      loadSite("loadOldNavyCaMulti");
    } else if (window.plugged_isMerchantUrl("blueButtonShop", tab.url)) {
      loadSite("loadBlueButtonShopMulti");
    } else if (window.plugged_isMerchantUrl("bonobos", tab.url)) {
      loadSite("loadBonobosMulti");
    } else if (window.plugged_isMerchantUrl("brooklynClothing", tab.url)) {
      loadSite("loadBrooklynClothingMulti");
    } else if (window.plugged_isMerchantUrl("browns", tab.url)) {
      loadSite("loadBrownsMulti");
    } else if (window.plugged_isMerchantUrl("calvinKleinCa", tab.url)) {
      loadSite("loadCalvinKleinCaMulti");
    } else if (window.plugged_isMerchantUrl("capsule", tab.url)) {
      loadSite("loadCapsuleMulti");
    } else if (window.plugged_isMerchantUrl("clubMonacoCa", tab.url)) {
      loadSite("loadClubMonacoCaMulti");
    } else if (window.plugged_isMerchantUrl("cntrbnd", tab.url)) {
      loadSite("loadCntrbndMulti");
    } else if (window.plugged_isMerchantUrl("coachCa", tab.url)) {
      loadSite("loadCoachCaMulti");
    } else if (window.plugged_isMerchantUrl("courtsideSneakers", tab.url)) {
      loadSite("loadCourtsideSneakersMulti");
    } else if (window.plugged_isMerchantUrl("dueWest", tab.url)) {
      loadSite("loadDueWestMulti");
    } else if (window.plugged_isMerchantUrl("dynamiteCa", tab.url)) {
      loadSite("loadDynamiteCaMulti");
    } else if (window.plugged_isMerchantUrl("eddieBauerCa", tab.url)) {
      loadSite("loadEddieBauerCaMulti");
    } else if (window.plugged_isMerchantUrl("garageCa", tab.url)) {
      loadSite("loadGarageCaMulti");
    } else if (window.plugged_isMerchantUrl("famousFootwearCa", tab.url)) {
      loadSite("loadFamousFootwearCaMulti");
    } else if (window.plugged_isMerchantUrl("footLockerCa", tab.url)) {
      loadSite("loadFootLockerCaMulti");
    } else if (window.plugged_isMerchantUrl("fourHorsemen", tab.url)) {
      loadSite("loadFourHorsemenMulti");
    } else if (window.plugged_isMerchantUrl("gapCa", tab.url)) {
      loadSite("loadGapCaMulti");
    } else if (window.plugged_isMerchantUrl("aritziaCa", tab.url)) {
      loadSite("loadAritziaCaMulti");
    } else if (window.plugged_isMerchantUrl("farfetchCa", tab.url)) {
      loadSite("loadFarfetchCaMulti");
    } else if (window.plugged_isMerchantUrl("gerhard", tab.url)) {
      loadSite("loadGerhardMulti");
    } else if (window.plugged_isMerchantUrl("gravitypope", tab.url)) {
      loadSite("loadGravitypopeMulti");
    } else if (window.plugged_isMerchantUrl("guessCa", tab.url)) {
      loadSite("loadGuessCaMulti");
    } else if (window.plugged_isMerchantUrl("guessFactoryCa", tab.url)) {
      loadSite("loadGuessFactoryCaMulti");
    } else if (window.plugged_isMerchantUrl("gstarCa", tab.url)) {
      loadSite("loadGstarCaMulti");
    } else if (window.plugged_isMerchantUrl("acneStudiosCa", tab.url)) {
      loadSite("loadAcneStudiosCaMulti");
    } else if (window.plugged_isMerchantUrl("harryRosen", tab.url)) {
      loadSite("loadHarryRosenMulti");
    } else if (window.plugged_isMerchantUrl("hbx", tab.url)) {
      loadSite("loadHbxMulti");
    } else if (window.plugged_isMerchantUrl("henrySinger", tab.url)) {
      loadSite("loadHenrySingerMulti");
    } else if (window.plugged_isMerchantUrl("hunterCa", tab.url)) {
      loadSite("loadHunterCaMulti");
    } else if (window.plugged_isMerchantUrl("hollisterCa", tab.url)) {
      loadSite("loadHollisterCaMulti");
    } else if (window.plugged_isMerchantUrl("influenceuCa", tab.url)) {
      loadSite("loadInfluenceuCaMulti");
    } else if (window.plugged_isMerchantUrl("jcrewFactoryCa", tab.url)) {
      loadSite("loadJcrewFactoryCaMulti");
    } else if (window.plugged_isMerchantUrl("jcrewCa", tab.url)) {
      loadSite("loadJcrewCaMulti");
    } else if (window.plugged_isMerchantUrl("bestseller", tab.url)) {
      loadSite("loadBestsellerMulti");
    } else if (window.plugged_isMerchantUrl("bricksAndBonds", tab.url)) {
      loadSite("loadBricksAndBondsMulti");
    } else if (window.plugged_isMerchantUrl("joeFresh", tab.url)) {
      loadSite("loadJoeFreshMulti");
    } else if (window.plugged_isMerchantUrl("kateSpade", tab.url)) {
      loadSite("loadKateSpadeMulti");
    } else if (window.plugged_isMerchantUrl("laSenzaCa", tab.url)) {
      loadSite("loadLaSenzaCaMulti");
    } else if (window.plugged_isMerchantUrl("lacosteCa", tab.url)) {
      loadSite("loadLacosteCaMulti");
    } else if (window.plugged_isMerchantUrl("levisCa", tab.url)) {
      loadSite("loadLevisCaMulti");
    } else if (window.plugged_isMerchantUrl("lessons", tab.url)) {
      loadSite("loadLessonsMulti");
    } else if (window.plugged_isMerchantUrl("leoBoutique", tab.url)) {
      loadSite("loadLeoBoutiqueMulti");
    } else if (window.plugged_isMerchantUrl("less17", tab.url)) {
      loadSite("loadLess17Multi");
    } else if (window.plugged_isMerchantUrl("lLBeanCa", tab.url)) {
      loadSite("loadLLBeanCaMulti");
    } else if (window.plugged_isMerchantUrl("lidsCa", tab.url)) {
      loadSite("loadLidsCaMulti");
    } else if (window.plugged_isMerchantUrl("littleBurgundy", tab.url)) {
      loadSite("loadLittleBurgundyMulti");
    } else if (window.plugged_isMerchantUrl("lostAndFound", tab.url)) {
      loadSite("loadLostAndFoundMulti");
    } else if (window.plugged_isMerchantUrl("lululemonCa", tab.url)) {
      loadSite("loadLululemonCaMulti");
    } else if (window.plugged_isMerchantUrl("exclucity", tab.url)) {
      loadSite("loadExclucityMulti");
    } else if (window.plugged_isMerchantUrl("mangoCa", tab.url)) {
      loadSite("loadMangoCaMulti");
    } else if (window.plugged_isMerchantUrl("marks", tab.url)) {
      loadSite("loadMarksMulti");
    } else if (window.plugged_isMerchantUrl("marsClothing", tab.url)) {
      loadSite("loadMarsClothingMulti");
    } else if (window.plugged_isMerchantUrl("mavi", tab.url)) {
      loadSite("loadMaviMulti");
    } else if (window.plugged_isMerchantUrl("milohShop", tab.url)) {
      loadSite("loadMilohShopMulti");
    } else if (window.plugged_isMerchantUrl("michaelKorsCa", tab.url)) {
      loadSite("loadMichaelKorsCaMulti");
    } else if (window.plugged_isMerchantUrl("michelBrisson", tab.url)) {
      loadSite("loadMichelBrissonMulti");
    } else if (window.plugged_isMerchantUrl("mooseKnuckles", tab.url)) {
      loadSite("loadMooseKnucklesMulti");
    } else if (window.plugged_isMerchantUrl("mec", tab.url)) {
      loadSite("loadMecMulti");
    } else if (window.plugged_isMerchantUrl("muttonhead", tab.url)) {
      loadSite("loadMuttonheadMulti");
    } else if (window.plugged_isMerchantUrl("muddyGeorge", tab.url)) {
      loadSite("loadMuddyGeorgeMulti");
    } else if (window.plugged_isMerchantUrl("neighbour", tab.url)) {
      loadSite("loadNeighbourMulti");
    } else if (window.plugged_isMerchantUrl("neimanMarcusCa", tab.url)) {
      loadSite("loadNeimanMarcusCaMulti");
    } else if (window.plugged_isMerchantUrl("newBalanceCa", tab.url)) {
      loadSite("loadNewBalanceCaMulti");
    } else if (window.plugged_isMerchantUrl("theNorthFaceCa", tab.url)) {
      loadSite("loadTheNorthFaceCaMulti");
    } else if (window.plugged_isMerchantUrl("offTheHook", tab.url)) {
      loadSite("loadOffTheHookMulti");
    } else if (window.plugged_isMerchantUrl("overTheRainbow", tab.url)) {
      loadSite("loadOverTheRainbowMulti");
    } else if (window.plugged_isMerchantUrl("palmAngelsCa", tab.url)) {
      loadSite("loadPalmAngelsCaMulti");
    } else if (window.plugged_isMerchantUrl("pandoraCa", tab.url)) {
      loadSite("loadPandoraCaMulti");
    } else if (window.plugged_isMerchantUrl("patagoniaCa", tab.url)) {
      loadSite("loadPatagoniaCaMulti");
    } else if (window.plugged_isMerchantUrl("peaceCollective", tab.url)) {
      loadSite("loadPeaceCollectiveMulti");
    } else if (window.plugged_isMerchantUrl("pumaCa", tab.url)) {
      loadSite("loadPumaCaMulti");
    } else if (window.plugged_isMerchantUrl("realSports", tab.url)) {
      loadSite("loadRealSportsMulti");
    } else if (window.plugged_isMerchantUrl("reebokCa", tab.url)) {
      loadSite("loadReebokCaMulti");
    } else if (window.plugged_isMerchantUrl("common", tab.url)) {
      loadSite("loadCommonMulti");
    } else if (window.plugged_isMerchantUrl("rootsCa", tab.url)) {
      loadSite("loadRootsCaMulti");
    } else if (window.plugged_isMerchantUrl("rodenGray", tab.url)) {
      loadSite("loadRodenGrayMulti");
    } else if (window.plugged_isMerchantUrl("rooney", tab.url)) {
      loadSite("loadRooneyMulti");
    } else if (window.plugged_isMerchantUrl("saksFifthAvenueCa", tab.url)) {
      loadSite("loadSaksFifthAvenueCaMulti");
    } else if (window.plugged_isMerchantUrl("saksOffFifthCa", tab.url)) {
      loadSite("loadSaksOffFifthCaMulti");
    } else if (window.plugged_isMerchantUrl("sauconyCa", tab.url)) {
      loadSite("loadSauconyCaMulti");
    } else if (window.plugged_isMerchantUrl("sephoraCa", tab.url)) {
      loadSite("loadSephoraCaMulti");
    } else if (window.plugged_isMerchantUrl("sportsExperts", tab.url)) {
      loadSite("loadSportsExpertsMulti");
    } else if (window.plugged_isMerchantUrl("atmosphere", tab.url)) {
      loadSite("loadAtmosphereMulti");
    } else if (window.plugged_isMerchantUrl("springCa", tab.url)) {
      loadSite("loadSpringCaMulti");
    } else if (window.plugged_isMerchantUrl("steveMaddenCa", tab.url)) {
      loadSite("loadSteveMaddenCaMulti");
    } else if (window.plugged_isMerchantUrl("simonsCa", tab.url)) {
      loadSite("loadSimonsCaMulti");
    } else if (window.plugged_isMerchantUrl("solestop", tab.url)) {
      loadSite("loadSolestopMulti");
    } else if (window.plugged_isMerchantUrl("softMocCa", tab.url)) {
      loadSite("loadSoftMocCaMulti");
    } else if (window.plugged_isMerchantUrl("spierAndMackay", tab.url)) {
      loadSite("loadSpierAndMackayMulti");
    } else if (window.plugged_isMerchantUrl("sportingLifeCa", tab.url)) {
      loadSite("loadSportingLifeCaMulti");
    } else if (window.plugged_isMerchantUrl("stillLife", tab.url)) {
      loadSite("loadStillLifeMulti");
    } else if (window.plugged_isMerchantUrl("uncleOtis", tab.url)) {
      loadSite("loadUncleOtisMulti");
    } else if (window.plugged_isMerchantUrl("understudy", tab.url)) {
      loadSite("loadUnderstudyMulti");
    } else if (window.plugged_isMerchantUrl("arcteryxCa", tab.url)) {
      loadSite("loadArcteryxCaMulti");
    } else if (window.plugged_isMerchantUrl("bestBuyCa", tab.url)) {
      loadSite("loadBestBuyCaMulti");
    } else if (window.plugged_isMerchantUrl("walmartCa", tab.url)) {
      loadSite("loadWalmartCaMulti");
    } else if (window.plugged_isMerchantUrl("herschelCa", tab.url)) {
      loadSite("loadHerschelCaMulti");
    } else if (window.plugged_isMerchantUrl("ikeaCa", tab.url)) {
      loadSite("loadIkeaCaMulti");
    } else if (window.plugged_isMerchantUrl("indigoCa", tab.url)) {
      loadSite("loadIndigoCaMulti");
    } else if (window.plugged_isMerchantUrl("theSource", tab.url)) {
      loadSite("loadTheSourceMulti");
    } else if (window.plugged_isMerchantUrl("staples", tab.url)) {
      loadSite("loadStaplesMulti");
    } else if (window.plugged_isMerchantUrl("canadianTire", tab.url)) {
      loadSite("loadCanadianTireMulti");
    } else if (window.plugged_isMerchantUrl("theShoeCompanyCa", tab.url)) {
      loadSite("loadTheShoeCompanyCaMulti");
    } else if (window.plugged_isMerchantUrl("designerShoeWarehouseCa", tab.url)) {
      loadSite("loadDesignerShoeWarehouseCaMulti");
    } else if (window.plugged_isMerchantUrl("shoeWarehouseCa", tab.url)) {
      loadSite("loadShoeWarehouseCaMulti");
    } else if (window.plugged_isMerchantUrl("costcoCa", tab.url)) {
      loadSite("loadCostcoCaMulti");
    } else if (window.plugged_isMerchantUrl("boutique1861", tab.url)) {
      loadSite("loadBoutique1861Multi");
    } else if (window.plugged_isMerchantUrl("cleo", tab.url)) {
      loadSite("loadCleoMulti");
    } else if (window.plugged_isMerchantUrl("rickis", tab.url)) {
      loadSite("loadRickisMulti");
    } else if (window.plugged_isMerchantUrl("holtRenfrew", tab.url)) {
      loadSite("loadHoltRenfrewMulti");
    } else if (window.plugged_isMerchantUrl("kotn", tab.url)) {
      loadSite("loadKotnMulti");
    } else if (window.plugged_isMerchantUrl("laCanadienne", tab.url)) {
      loadSite("loadLaCanadienneMulti");
    } else if (window.plugged_isMerchantUrl("loleCa", tab.url)) {
      loadSite("loadLoleCaMulti");
    } else if (window.plugged_isMerchantUrl("rwCo", tab.url)) {
      loadSite("loadRwCoMulti");
    } else if (window.plugged_isMerchantUrl("mattAndNatCa", tab.url)) {
      loadSite("loadMattAndNatCaMulti");
    } else if (window.plugged_isMerchantUrl("laura", tab.url)) {
      loadSite("loadLauraMulti");
    } else if (window.plugged_isMerchantUrl("melanieLyne", tab.url)) {
      loadSite("loadMelanieLyneMulti");
    } else if (window.plugged_isMerchantUrl("dress911", tab.url)) {
      loadSite("loadDress911Multi");
    } else if (window.plugged_isMerchantUrl("tobiCa", tab.url)) {
      loadSite("loadTobiCaMulti");
    } else if (window.plugged_isMerchantUrl("canadaComputers", tab.url)) {
      loadSite("loadCanadaComputersMulti");
    } else if (window.plugged_isMerchantUrl("visions", tab.url)) {
      loadSite("loadVisionsMulti");
    } else if (window.plugged_isMerchantUrl("toysRUs", tab.url)) {
      loadSite("loadToysRUsMulti");
    } else if (window.plugged_isMerchantUrl("memoryExpress", tab.url)) {
      loadSite("loadMemoryExpressMulti");
    } else if (window.plugged_isMerchantUrl("mikesComputerShop", tab.url)) {
      loadSite("loadMikesComputerShopMulti");
    } else if (window.plugged_isMerchantUrl("newegg", tab.url)) {
      loadSite("loadNeweggMulti");
    } else if (window.plugged_isMerchantUrl("pcCanada", tab.url)) {
      loadSite("loadPcCanadaMulti");
    } else if (window.plugged_isMerchantUrl("vuugo", tab.url)) {
      loadSite("loadVuugoMulti");
    }
    // TODO: Add more sites here. Remember to add to Plugged Button as well
  }
});

function loadSite(action) {
  chrome.tabs.query({}, (tabs) => {
    // Send to all tabs, in case user navigates to different tab
    for (let i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, { action: action });
    }
  });
}
