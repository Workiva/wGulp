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

var _ = require('lodash');
var cwd = process.cwd();
var glob = require('glob');
var path = require('path');

module.exports = function(gulp, config){
    var options = require('./src/gulpconfig.json');
    options = require('./src/merge_options')(config, options);

    // Put our custom describe method onto gulp
    gulp.desc = require('./src/desc');

    // Register task functions for exporting
    var subtasks = {
        analyze: require('./subtasks/analyze')(gulp, options),
        applyLicense: require('./subtasks/apply_license')(gulp, options),
        clean: require('./subtasks/clean')(gulp, options),
        coffee: require('./subtasks/coffee')(gulp, options),
        compass: require('./subtasks/compass')(gulp, options),
        concat: require('./subtasks/concat')(gulp, options),
        connect: require('./subtasks/connect')(gulp, options),
        copy: require('./subtasks/copy')(gulp, options),
        jasmine: require('./subtasks/jasmine')(gulp, options),
        jsdoc: require('./subtasks/jsdoc')(gulp, options),
        jshint: require('./subtasks/jshint')(gulp, options),
        jsx: require('./subtasks/jsx')(gulp, options),
        minify_css: require('./subtasks/minify_css')(gulp, options),
        minify_js: require('./subtasks/minify_js')(gulp, options),
        requireAll: require('./subtasks/requireAll')(gulp, options),
        sass: require('./subtasks/sass')(gulp, options),
        tsc: require('./subtasks/tsc')(gulp, options),
        tslint: require('./subtasks/tslint')(gulp, options)
    };

    // Create tasks for each task function with default options
    _.forOwn(subtasks, function(val, key){
        key = key.replace('_', ':');
        gulp.task(key, val());
    });

    // Add runSequence function (not really a task/subtask)
    subtasks.runSequence = require('./subtasks/run_sequence')(gulp, options);

    // Generate bundle tasks
    require('./src/bundling/build_bundle_tasks')(gulp, options);

    // Create tasks in task folders
    var globalTaskFolder = path.resolve(__dirname, 'tasks');
    var projectTaskFolder = path.resolve(cwd, 'tasks');
    var taskFolders = [
        globalTaskFolder,
        projectTaskFolder
    ];
    function loadFiles(err, files) {
        if (err) {
            throw err;
        }
        _.forEach(files, function(file){
            var taskName = file.replace(/\.js$/i, '');
            var taskPath = path.resolve(taskFolders[i], taskName);
            require(taskPath)(gulp, options, subtasks);
        });
    };

    for (var i = 0; i < taskFolders.length; i++) {
        glob("*.js", {
            cwd: taskFolders[i],
            sync: true
        }, loadFiles);
    }

    // Add config to exports
    subtasks.config = options;

    return subtasks;
};
