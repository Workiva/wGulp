module.exports = function(karma) {
    var fs = require('fs');
    var cwd = process.cwd();
    var path = require('path');
    var lodash = require('lodash');

    var polyfill = path.resolve(cwd, "node_modules/wGulp/src/function-bind-polyfill.js");

    var defaultConfiguration = {
        basePath: path.resolve(cwd),
        browsers: ["PhantomJS"],
        files: [polyfill],
        frameworks: ['jspm', 'jasmine'],
        jspm: {
            loadFiles: ['build/test/**/*.js'],
            serveFiles: ['build/src/**/*.js']
        },
        preprocessors: {
            'build/src/**/*.js': ['coverage']
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

    // manually concatenate files array
    configuration.files = [].concat(defaultConfiguration.files, configuration.files || []);

    karma.set(configuration);
};
