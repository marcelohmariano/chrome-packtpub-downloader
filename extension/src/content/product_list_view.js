// product_list_view.js

let ProductListView = function(productListController) {

  let kDownloadButtonProductIdAttribute = 'data-product-id';
  let kDownloadButtonFileTypeAttribute = 'data-product-filetype';

  let addDownloadLink = function(parentNode, type, productId) {
    let button = document.createElement('button');
    let i = document.createElement('i');

    i.setAttribute('class', 'fa fa-download');

    button.setAttribute('class', 'download ng-star-inserted');
    button.setAttribute(kDownloadButtonProductIdAttribute, productId);
    button.setAttribute(kDownloadButtonFileTypeAttribute, type);

    button.appendChild(i);
    button.appendChild(document.createTextNode('\n' + type + '\n'));
    button.onclick = downloadButtonClickHandler.bind(button);

    parentNode.appendChild(button);
  };

  let downloadButtonClickHandler = function() {
    let productId = this.getAttribute(kDownloadButtonProductIdAttribute);
    let fileType = this.getAttribute(kDownloadButtonFileTypeAttribute);

    productListController.download(productId, fileType);
  };

  let hasDownloadLink = function(downloadsContainer, fileType) {
    let buttons = downloadsContainer.querySelectorAll('button.download.ng-star-inserted');

    if (buttons.length > 0) {
      for (let i = 0; i < buttons.length; i++) {
        let buttonText = buttons[i].innerText.toLowerCase().trim();
        if (buttonText === fileType)
          return true;
      }
    }

    return false;
  };

  let addDownloadLinks = function(downloadsContainer, productId) {
    if (!hasDownloadLink(downloadsContainer, 'epub'))
      addDownloadLink(downloadsContainer, 'epub', productId);

    if (!hasDownloadLink(downloadsContainer, 'mobi'))
      addDownloadLink(downloadsContainer, 'mobi', productId);

    if (!hasDownloadLink(downloadsContainer, 'pdf'))
      addDownloadLink(downloadsContainer, 'pdf', productId);
  };

  let findAllReaderLinks = function() {
    return document.querySelectorAll('.reader-link.ng-star-inserted');
  };

  let findDownloadsContainer = function(link) {
    return link.parentNode.querySelector('div.downloads-container');
  };

  let isVideo = function(link) {
    return link.href.indexOf('/video/') > -1;
  };

  let getProductId = function(link) {
    return link.href.substring(link.href.lastIndexOf('/') + 1);
  };

  return {
    addBookDownloadLinks: function() {
      let readerLinks = findAllReaderLinks();

      readerLinks.forEach(function(link) {
        if (!isVideo(link)) {
          let downloadsContainer = findDownloadsContainer(link);
          let productId = getProductId(link);

          addDownloadLinks(downloadsContainer, productId);
        }
      });
    }
  };
};