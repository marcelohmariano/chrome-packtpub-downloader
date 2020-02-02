// main.js

let userAccountService = new UserAccountService();
let pageContentRunnerService = new PageContentRunnerService(userAccountService);
let extensionService = new ExtensionService(pageContentRunnerService);

pageContentRunnerService.addRules(PAGE_CONTENT_RUNNER_RULES);
extensionService.start();