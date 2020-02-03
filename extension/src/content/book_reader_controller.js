// book_reader_controller.js

let BookReaderController = function (productDownloadService) {

  let DATA_PRODUCT_ID_ATTRIBUTE = 'data-product-id';
  let DATA_PRODUCT_FILETYPE_ATTRIBUTE = 'data-product-filetype';

  let findNightModeButton = function () {
    return document.querySelector(
      'div.btn-group.ng-scope > button.btn.nightmode-toggle.btn-default'
    );
  };

  let findDownloadsContainer = function () {
    let nightModeButton = findNightModeButton();
    return nightModeButton ? nightModeButton.parentNode.parentNode : null;
  };

  let findDownloadEbookDropDown = function () {
    let downloadEbookSpan = document.querySelector(
      'div.btn-group.ng-scope > ' +
      'button.btn.btn-default.btn-square.dropdown-toggle > ' +
      'span.hidden-xs.ml5'
    );

    if (!downloadEbookSpan)
      return false;

    let downloadEbookText = downloadEbookSpan.innerText.toLowerCase();
    return downloadEbookText.indexOf('download ebook') > -1;
  };

  let createDownloadEbookDiv = function () {
    let downloadEbookDiv = document.createElement('div');
    downloadEbookDiv.setAttribute('class', 'btn-group ng-scope');

    return downloadEbookDiv;
  };

  let createDownloadEbookDropDown = function (downloadEbookDiv) {
    let downloadEbookDropDown = document.createElement('button');
    downloadEbookDropDown.setAttribute('class', 'btn btn-default btn-square dropdown-toggle');
    downloadEbookDropDown.setAttribute('data-toggle', 'dropdown');
    downloadEbookDropDown.setAttribute('aria-haspopup', true);
    downloadEbookDropDown.setAttribute('aria-expanded', false);
    //downloadEbookDropDown.onclick =

    let downloadIcon = document.createElement('i');
    downloadIcon.setAttribute('class', 'fa fa-download fa-lg');

    let downloadEbookSpan = document.createElement('span');
    downloadEbookSpan.setAttribute('class', 'hidden-xs ml5');
    downloadEbookSpan.setAttribute('style', 'margin-right: 3px');
    downloadEbookSpan.innerText = 'Download eBook';

    let emptySpan = document.createElement('span');
    emptySpan.setAttribute('class', 'hidden-xs caret');

    downloadEbookDropDown.appendChild(downloadIcon);
    downloadEbookDropDown.appendChild(downloadEbookSpan);
    downloadEbookDropDown.appendChild(emptySpan);

    downloadEbookDiv.appendChild(downloadEbookDropDown);
  };

  let downloadLinkClickHandler = function () {
    let productId = this.getAttribute(DATA_PRODUCT_ID_ATTRIBUTE);
    let fileType = this.getAttribute(DATA_PRODUCT_FILETYPE_ATTRIBUTE);

    productDownloadService.download(productId, fileType);
  };

  let createDownloadLink = function (list, productId, fileType, text) {
    let listItem = document.createElement('li');
    let downloadEbookLink = document.createElement('a');

    downloadEbookLink.setAttribute(DATA_PRODUCT_ID_ATTRIBUTE, productId);
    downloadEbookLink.setAttribute(DATA_PRODUCT_FILETYPE_ATTRIBUTE, fileType);
    downloadEbookLink.href = '#';
    downloadEbookLink.innerText = text;
    downloadEbookLink.onclick = downloadLinkClickHandler.bind(downloadEbookLink);

    listItem.appendChild(downloadEbookLink);
    list.appendChild(listItem);
  };

  let createDownloadEbookList = function (downloadEbookDiv, productId) {
    let downloadEbookList = document.createElement('ul');
    downloadEbookList.setAttribute('class', 'dropdown-menu');

    let downloadEbookListHeader = document.createElement('li');
    downloadEbookListHeader.setAttribute('class', 'dropdown-header');
    downloadEbookListHeader.innerText = 'Download eBook';

    let downloadEbookSeperator = document.createElement('li');
    downloadEbookSeperator.setAttribute('role', 'separator');
    downloadEbookSeperator.setAttribute('class', 'divider');

    downloadEbookList.appendChild(downloadEbookListHeader);
    downloadEbookList.appendChild(downloadEbookSeperator);

    createDownloadLink(downloadEbookList, productId, 'pdf', 'Download PDF');
    createDownloadLink(downloadEbookList, productId, 'epub', 'Download ePub');
    createDownloadLink(downloadEbookList, productId, 'mobi', 'Download Mobi');

    downloadEbookDiv.appendChild(downloadEbookList);
  };

  let getProductId = function () {
    return document.getElementsByName('book:isbn')[0].content;
  };

  return {
    enableDownloadLinks: function () {
      let downloadsContainer = findDownloadsContainer();
      let productId = getProductId();

      if (downloadsContainer && productId) {
        if (findDownloadEbookDropDown())
          return;

        let parentNode = findNightModeButton().parentNode;
        let downloadEbookDiv = createDownloadEbookDiv();

        createDownloadEbookDropDown(downloadEbookDiv);
        createDownloadEbookList(downloadEbookDiv, productId);

        downloadsContainer.insertBefore(downloadEbookDiv, parentNode);
      }
    }
  };
};