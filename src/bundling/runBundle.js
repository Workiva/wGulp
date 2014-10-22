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
var gutil = require('gulp-util');


var get_bundle_options = function(options, cb, bundleName){
    var buildOptions = options.bundles[bundleName];

    if(!buildOptions){
        return cb(new gutil.PluginError(
            "bundle", gutil.colors.red("Invalid bundle specified: '" + bundleName + "'.")
        ));
    }
    return buildOptions;
};

module.exports = function(gulp, options, cb, bundleName){
    var argv = require('yargs').argv;
    var bundleBrowserify = require('./bundleBrowserify');
    var bundleJspm = require('./bundleJspm');

    var bundleOptions = get_bundle_options(options, cb, bundleName);

    // This means the cb was already called with an error, so exit the task.
    if(!bundleOptions){
        return;
    }

    // Default to JSPM if not specified.
    if(!bundleOptions.bundler){
        bundleOptions.bundler = "jspm";
    }

    // Choose which bundler to use based on the option specified.
    if(bundleOptions.bundler == "jspm"){
        return bundleJspm(gulp, options, bundleOptions, cb);
    }
    else if(bundleOptions.bundler == "browserify"){
        return bundleBrowserify(gulp, options, bundleOptions, cb);
    }
    else {
        // An unknown bundler was specified. Error gracefully.
        return cb(new gutil.PluginError(
            "bundle:" + bundleName,
            gutil.colors.red("Unsupported bundler: '" + bundleOptions.bundler + "'.")
        ));
    }
};
