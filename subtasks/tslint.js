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

var cwd = process.cwd();
var path = require('path');
var tslint = require('gulp-tslint');

module.exports = function(gulp, defaults){
    gulp.desc('tslint', 'Validate TS files with tslint');

    return function(config) {
        if(!config)
            config = {};

        return function () {
            var tslintrc = path.resolve(cwd, config.config_file || defaults.tslintrc);
            var tsConfig = require(tslintrc);

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.ts, {
                    cwd: config.cwd || defaults.path.src
                });
            }

            stream = stream.pipe(tslint({configuration: tsConfig}));

            if(config.emitError || config.emitError === undefined)
                return stream.pipe(tslint.report('verbose'));
            else {
                return stream.pipe(tslint.report('verbose', {
                    emitError: false
                }));
            }
        };
    };
};
