// page_content_runner.js

let PageContentRunner = function(accountService) {

  let kAccountProductsUrl = 'https://account.packtpub.com/account/products';
  let kIntervalMs = 1000;

  let tabTimers = new Map();

  let enableBookDownloadLinks = function(tabId) {
    accountService.getUserToken(function(token) {
      chrome.tabs.sendMessage(tabId, {
        id: kAddDownloadLinksMessageId,
        data: {token: token}
      });
    });
  };

  let isOnAccountProductsPage = function(url) {
    return url.indexOf(kAccountProductsUrl) > -1;
  };

  let addTabTimer = function(tabId) {
    if (tabTimers.has(tabId))
      return;

    let timer = setInterval(function() {
      enableBookDownloadLinks(tabId);
    }.bind(tabId), kIntervalMs);

    tabTimers.set(tabId, timer);
  };

  let removeTabTimer = function(tabId) {
    if (!tabTimers.has(tabId))
      return;

    let timer = tabTimers.get(tabId);
    clearInterval(timer);
    tabTimers.delete(tabId);
  };

  let addOrRemoveTabTimer = function(tab) {
    if (!isOnAccountProductsPage(tab.url)) {
      removeTabTimer(tab.id);
      return;
    }

    addTabTimer(tab.id);
  };

  return {
    startPageContentServiceForTab: function(tab) {
      addOrRemoveTabTimer(tab);
    },

    stopPageContentServiceForTab: function(tabId) {
      removeTabTimer(tabId);
    }
  };

};