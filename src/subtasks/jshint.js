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
    gulp.desc('jshint', 'Validate JS files with jshint');

    return function(config) {
        if(!config)
            config = {};

        return function () {
            var cwd = process.cwd();
            var path = require('path');
            var jshint = require('gulp-jshint');
            
            var jshintrc = path.resolve(cwd, config.configFile || defaults.jshintrc);

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.js, {
                    cwd: config.cwd || defaults.path.src
                });
            }

            stream = stream.pipe(jshint(jshintrc))
                .pipe(jshint.reporter('jshint-stylish'));

            if(config.emitError || config.emitError === undefined)
                return stream.pipe(jshint.reporter('fail'));
            else
                return stream;
        };
    };
};
