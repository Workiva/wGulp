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

module.exports = function(options, languages){
    var _ = require('lodash');

    // Language specific tasks
    var langMap = {
        coffeescript: ['coffee'],
        javascript: ['copy:js', 'jshint', 'minify:js', 'copy:jstest'],
        livescript: ['livescript'],
        typescript: ['tsd', 'tsc', 'tslint', 'tsc:test']
    };

    // All languages we support
    var allLanguages = Object.keys(langMap);
    var missingLanguages = _.difference(allLanguages, languages);

    _.forEach(missingLanguages, function(language){
        options.taskTree.build = _.difference(options.taskTree.build, langMap[language]);
        options.taskTree.lint = _.difference(options.taskTree.lint, langMap[language]);
        options.taskTree.minify = _.difference(options.taskTree.minify, langMap[language]);
        options.taskTree.preTest = _.difference(options.taskTree.preTest, langMap[language]);
    });

    return options;
};
