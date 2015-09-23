/*
 * Copyright 2014-2015 Workiva Inc.
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

function ensureOutputDir(filePath) {
    var mkdirp = require('mkdirp');
    var path = require('path');

    var dirPath = path.dirname(filePath);
    if(dirPath != '.'){
        mkdirp.sync(dirPath);
    }
};

module.exports = function(gulp, options, bundleOptions, cb) {
    var shell = require('gulp-shell');

    var bundleCommand = bundleOptions.sfx ? " bundle-sfx " : " bundle ";
    var entry = bundleOptions.entry || "";
    var output = bundleOptions.output || "";
    var inject = bundleOptions.addToConfig === false ? "" : " --inject";
    var minify = bundleOptions.minify ? " --minify" : "";
    var sourceMaps = bundleOptions.sourceMaps === false ? " --skip-source-maps" : "";

    var includes = "";
    var excludes = "";
    if(bundleOptions.include && bundleOptions.include.length > 0){
        includes = " + " + bundleOptions.include.join(" + ");
    }
    if(bundleOptions.exclude && bundleOptions.exclude.length > 0){
        excludes = " - " + bundleOptions.exclude.join(" - ");
    }

    // Ensure output directory exists
    ensureOutputDir(output);

    var command = "jspm" + bundleCommand + entry + includes + excludes + " " + output + inject + minify + sourceMaps;

    return gulp.src('').pipe(shell([command]));
};
