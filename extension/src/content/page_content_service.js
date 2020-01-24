// page_content_service.js

let PageContentService = function() {

  return {
    start: function() {
      chrome.runtime.onMessage.addListener(function(message) {
        if (message.id && message.id === kAddDownloadLinksMessageId) {
          let view = new ProductListView(new ProductListController(message.data.token));
          view.enableBookDownloadLinks();
        }
      });
    }
  };

};