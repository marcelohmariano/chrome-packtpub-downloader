// product_download_service.js

let ProductDownloadService = function (token) {
  let API_BASE_URL = 'https://services.packtpub.com/products-v1/products';
  let PRODUCT_FILE_URL_ENDPOINT = 'files';

  let buildProductFileUrl = function (productId, fileType) {
    return API_BASE_URL + '/' + productId + '/' + PRODUCT_FILE_URL_ENDPOINT + '/' + fileType;
  };

  let createRequest = function () {
    let request = new XMLHttpRequest();

    request.onload = function () {
      let response = JSON.parse(this.responseText);
      let url = response.data;

      chrome.runtime.sendMessage({
        id: MSG_START_PRODUCT_DOWNLOAD,
        data: {url: url}
      });
    };

    return request;
  };

  return {
    download: function (productId, fileType) {
      let url = buildProductFileUrl(productId, fileType);
      let request = createRequest();

      request.open('GET', url);
      request.setRequestHeader('Authorization', 'Bearer ' + token);
      request.send();
    }
  }
};