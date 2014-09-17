var sufferLoader = require('../../node_modules/suffer/dist/suffer_loader');

module.exports = {
  "All Suffer Tests" : function (browser) {
    browser
      .url("http://localhost:9000")
      .waitForElementVisible('body', 1000)
      .execute(sufferLoader)
      .pause(100000)
      .end();
  }
};
