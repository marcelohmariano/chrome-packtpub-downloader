// my_owned_products_controller.js

let MyOwnedProductsController = function (productDownloadService) {

  let DATA_PRODUCT_ID_ATTRIBUTE = 'data-product-id';
  let DATA_PRODUCT_FILETYPE_ATTRIBUTE = 'data-product-filetype';

  let findDisabledDownloadButton = function (downloadsContainer, fileType) {
    let selector = 'button.download-btn.download-disabled.tooltip-disabled-downloads.ng-star-inserted';
    let buttons = downloadsContainer.querySelectorAll(selector);

    for (let button of buttons) {
      let buttonText = button.innerText.toLowerCase().trim();
      if (buttonText === fileType)
        return button;
    }

    return null;
  };

  let enableDownloadLink = function (downloadsContainer, fileType, productId) {
    let button = findDisabledDownloadButton(downloadsContainer, fileType);

    if (!button)
      return;

    let bottonDownloadTip = button.querySelector('div.bottom.downloadTooltip');

    button.removeChild(bottonDownloadTip);
    button.setAttribute('class', 'download-btn ng-star-inserted');
    button.setAttribute(DATA_PRODUCT_ID_ATTRIBUTE, productId);
    button.setAttribute(DATA_PRODUCT_FILETYPE_ATTRIBUTE, fileType);

    button.onclick = downloadButtonClickHandler.bind(button);
  };

  let downloadButtonClickHandler = function () {
    let productId = this.getAttribute(DATA_PRODUCT_ID_ATTRIBUTE);
    let fileType = this.getAttribute(DATA_PRODUCT_FILETYPE_ATTRIBUTE);

    productDownloadService.download(productId, fileType);
  };

  let findAllReaderLinks = function () {
    return document.querySelectorAll('.reader-link.ng-star-inserted');
  };

  let findDownloadsContainer = function (link) {
    return link.parentNode.querySelector('div.downloads-container');
  };

  let getProductId = function (link) {
    return link.href.substring(link.href.lastIndexOf('/') + 1);
  };

  return {
    enableDownloadLinks: function () {
      let readerLinks = findAllReaderLinks();

      readerLinks.forEach(function (link) {
        let downloadsContainer = findDownloadsContainer(link);
        let productId = getProductId(link);

        enableDownloadLink(downloadsContainer, 'epub', productId);
        enableDownloadLink(downloadsContainer, 'mobi', productId);
        enableDownloadLink(downloadsContainer, 'pdf', productId);
        enableDownloadLink(downloadsContainer, 'video', productId);
      });
    }
  };
};