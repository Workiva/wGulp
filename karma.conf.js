
module.exports = function(karma) {
    var fs = require('fs');
    var cwd = process.cwd();
    var path = require('path');
    var lodash = require('lodash');
    var defaultConfiguration = {
        basePath: path.resolve(cwd),
        browsers: ["PhantomJS"],
        frameworks: ['jspm', 'jasmine'],
        jspm: {
            loadFiles: ['build/test/**/*.js'],
            serveFiles: ['build/src/**/*.js']
        },
        preprocessors: {
            'build/src/**/*.js': ['coverage']
        },
        proxies: {
            '/jspm_packages/': '/base/jspm_packages/'
        },
        reporters: ['progress', 'junit', 'html', 'coverage'],
        junitReporter: {
            outputFile: './report/tests/test-results.xml'
        },
        coverageReporter: {
            dir: 'report/coverage/'
        },
        singleRun: false,
        autoWatch: true
    };
    var karmaShim = {set: function(config) { this.config = config; }};
    var localKarmaConfig = path.resolve(cwd, "karma.conf.js");
    if (fs.existsSync(localKarmaConfig)) {
        var localKarmaFunction = require(localKarmaConfig);
        localKarmaFunction(karmaShim);
    }
    var configuration = lodash.merge(defaultConfiguration, karmaShim.config);
    karma.set(configuration);
};
