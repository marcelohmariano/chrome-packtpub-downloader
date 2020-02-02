// page_content_service.js

let PageContentService = function () {

  return {
    start: function () {
      chrome.runtime.onMessage.addListener(function (message) {
        if (message.id && message.id === MSG_ENABLE_MY_OWNED_PRODUCTS_DOWNLOAD_LINKS) {
          let productDownloadService = new ProductDownloadService(message.data.token);
          let myOwnedProductsController = new MyOwnedProductsController(productDownloadService);

          myOwnedProductsController.enableDownloadLinks();
        }
      });
    }
  };

};