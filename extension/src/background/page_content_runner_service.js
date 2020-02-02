// page_content_runner_service.js

let PageContentRunnerService = function (userAccountService) {

  let TIMER_INTERVAL = 1000;
  let actionRunnerTimers = new Map();
  let pageContentRunnerRules = [];

  let runAction = function (tabId, rule) {
    userAccountService.getUserToken(function (token) {
      let data = {tabId: tabId, token: token};
      rule.action(data);
    });
  };

  let startActionTimer = function (tabId, rule) {
    if (actionRunnerTimers.has(tabId))
      return;

    let timer = setInterval(function () {
      runAction(tabId, rule);
    }.bind(tabId), TIMER_INTERVAL);

    actionRunnerTimers.set(tabId, timer);
  };

  let stopActionTimer = function (tabId) {
    if (!actionRunnerTimers.has(tabId))
      return;

    let timer = actionRunnerTimers.get(tabId);
    clearInterval(timer);
    actionRunnerTimers.delete(tabId);
  };

  let findRule = function (tab) {
    for (let rule of pageContentRunnerRules) {
      if (tab.url.indexOf(rule.url) > -1)
        return rule;
    }

    return null;
  };

  let tryStartActionTimer = function (tab) {
    let rule = findRule(tab);

    if (!rule) {
      stopActionTimer(tab.id);
      return;
    }

    startActionTimer(tab.id, rule);
  };

  return {
    startPageContentServiceForTab: function (tab) {
      tryStartActionTimer(tab);
    },

    stopPageContentServiceForTab: function (tabId) {
      stopActionTimer(tabId);
    },

    addRules: function (rules) {
      for (let rule of rules) {
        if (pageContentRunnerRules.indexOf(rule) === -1)
          pageContentRunnerRules.push(rule);
      }
    }
  };

};