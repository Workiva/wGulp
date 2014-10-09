var fs = require('fs'),
    path = require('path');

var autoPawPath = path.resolve(__dirname, '../../node_modules/autoPaw/dist/autoPaw.js');
var autoPawJs = fs.readFileSync(autoPawPath).toString();

module.exports = {
    "All Suffer Tests" : function (client) {
        client.url(client.launch_url)
            .waitForElementVisible('body', 1000)
            .execute(autoPawJs)
            .pause(100000)
            .end();
  }
};
