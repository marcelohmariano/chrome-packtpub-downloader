// page_content_runner_rules.js

let PAGE_CONTENT_RUNNER_RULES = [
  {
    url: 'https://account.packtpub.com/account/products',
    action: function (data) {
      chrome.tabs.sendMessage(data.tabId, {
        id: MSG_ENABLE_MY_OWNED_PRODUCTS_DOWNLOAD_LINKS,
        data: {token: data.token}
      });
    }
  }
];