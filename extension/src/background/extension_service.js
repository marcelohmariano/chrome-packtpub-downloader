// extension_service.js

let ExtensionService = function (pageContentRunnerService) {

  let showExtensionToolbarButtonAutomatically = function () {
    chrome.runtime.onInstalled.addListener(function () {
      chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
          {
            conditions: [
              new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostContains: '.packtpub.com'}
              })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
          }
        ]);
      });
    });
  };

  let enableDownloadLinksAutomatically = function () {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      pageContentRunnerService.startPageContentServiceForTab(tab);
    });

    chrome.tabs.onRemoved.addListener(function (tabId) {
      pageContentRunnerService.stopPageContentServiceForTab(tabId);
    });
  };

  let downloadFileWhenLinkIsClicked = function () {
    chrome.runtime.onMessage.addListener(function (message) {
      if (message.id && message.id === MSG_START_PRODUCT_DOWNLOAD)
        chrome.downloads.download({url: message.data.url});
    });
  };

  return {
    start: function () {
      showExtensionToolbarButtonAutomatically();
      enableDownloadLinksAutomatically();
      downloadFileWhenLinkIsClicked();
    }
  };

};