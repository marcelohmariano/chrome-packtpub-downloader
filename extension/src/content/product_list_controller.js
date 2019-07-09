// product_list_controller.js

let ProductListController = function(token) {

  let kProductFileUrlBase = 'https://services.packtpub.com/products-v1/products';
  let kProductFileUrlEndpoint = 'files';

  let buildProductFileUrl = function(productId, fileType) {
    return kProductFileUrlBase + '/' + productId + '/' + kProductFileUrlEndpoint + '/' + fileType;
  };

  return {
    download: function(productId, fileType) {
      let request = new XMLHttpRequest();

      request.onload = function() {
        let response = JSON.parse(this.responseText);
        let url = response.data;

        chrome.runtime.sendMessage({
          id: kDownloadFileMessageId,
          data: {url: url}
        });
      };

      request.open('GET', buildProductFileUrl(productId, fileType));
      request.setRequestHeader('Authorization', 'Bearer ' + token);
      request.send();
    }
  }

};