// page_content_service.js

let PageContentService = function () {

  return {
    start: function () {
      chrome.runtime.onMessage.addListener(function (message) {
        if (message.id === MSG_ENABLE_MY_OWNED_PRODUCTS_DOWNLOAD_LINKS) {
          let productDownloadService = new ProductDownloadService(message.data.token);
          let myOwnedProductsController = new MyOwnedProductsController(productDownloadService);

          myOwnedProductsController.enableDownloadLinks();
          return;
        }

        if (message.id === MSG_ENABLE_BOOK_READER_DOWNLOAD_LINKS) {
          let productDownloadService = new ProductDownloadService(message.data.token);
          let bookReaderController = new BookReaderController(productDownloadService);

          bookReaderController.enableDownloadLinks();
        }
      });
    }
  };

};