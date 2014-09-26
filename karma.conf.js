/*
 * Copyright 2014 Workiva, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

    // manually concatenate files array
    configuration.files = [].concat(defaultConfiguration.files, configuration.files || []);

    karma.set(configuration);
};
