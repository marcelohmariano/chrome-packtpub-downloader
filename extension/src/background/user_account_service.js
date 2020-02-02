// user_account_service.js

let UserAccountService = function() {

  let TOKEN_COOKIE_NAME = 'access_token_live';

  return {
    getUserToken: function(callback) {
      chrome.cookies.getAll({name: TOKEN_COOKIE_NAME}, function(cookies) {
        callback(cookies[0].value);
      });
    }
  };
};