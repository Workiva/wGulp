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

module.exports = function(gulp, defaults) {
    gulp.desc('applyLicense', 'Applies a license file to the top of source files. Apache 2.0 header by default.');

    var defaultGlobs = [];
    [defaults.path.src, defaults.path.styles]
        .forEach(function(srcDir) {
            defaults.glob.sources.forEach(function(sourceGlob) {
                defaultGlobs.push(srcDir + sourceGlob);
            });
        });

    return function(config) {
        config = config || {};

        var join = require('path').join;
        var fs = require('fs');
        var DEFAULT_LICENSE = join(__dirname, '../src/licenses/APACHE_HEADER.txt');

        var globs = config.globs || defaultGlobs;
        var license = config.license || (fs.existsSync(DEFAULT_LICENSE) ? fs.readFileSync(DEFAULT_LICENSE) : 'NO LICENSE');

        return function() {
            var gulpHeader = require('gulp-header');
            return(gulp.src(globs,  {base: './'}) // Use base to preserve entire relative path so that they can be overriden
                    .pipe(gulpHeader(license))
                    .pipe(gulp.dest('./')));
        }
    }
};
