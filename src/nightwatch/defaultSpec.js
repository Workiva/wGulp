var fs = require('fs'),
    path = require('path');

var sufferLoader = fs.readFileSync(path.resolve(__dirname, '../../node_modules/suffer/dist/suffer.js')).toString();

module.exports = {
    "All Suffer Tests" : function (browser) {
        browser
            .url("http://localhost:9000?runTests=4000&runnerPath=node_modules/suffer/dist/sufferRunner.js")
            .waitForElementVisible('body', 1000)
            .execute(sufferLoader)
            .pause(100000)
            .end();
  }
};
