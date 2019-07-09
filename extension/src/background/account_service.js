// account_service.js

let AccountService = function() {

  let kTokenCookieName = 'access_token_live';

  return {
    getUserToken: function(callback) {
      chrome.cookies.getAll({name: kTokenCookieName}, function(cookies) {
        callback(cookies[0].value);
      });
    }
  };
};