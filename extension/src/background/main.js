// main.js

let extensionService = new ExtensionService(
  new PageContentRunner(
    new AccountService()
  )
);

extensionService.start();