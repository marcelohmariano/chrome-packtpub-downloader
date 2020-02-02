// extension_service.js

let ExtensionService = function(pageContentRunner) {

  let showExtensionToolbarButtonAutomatically = function() {
    chrome.runtime.onInstalled.addListener(function() {
      chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
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

  let enableDownloadLinksAutomatically = function() {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      pageContentRunner.startPageContentServiceForTab(tab);
    });

    chrome.tabs.onRemoved.addListener(function(tabId) {
      pageContentRunner.stopPageContentServiceForTab(tabId);
    });
  };

  let downloadFileWhenLinkIsClicked = function() {
    chrome.runtime.onMessage.addListener(function(message) {
      if (message.id && message.id === kDownloadFileMessageId)
        chrome.downloads.download({url: message.data.url});
    });
  };

  return {
    start: function() {
      showExtensionToolbarButtonAutomatically();
      enableDownloadLinksAutomatically();
      downloadFileWhenLinkIsClicked();
    }
  };

};