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

module.exports = function(gulp, defaults){
    gulp.desc('jasmine', 'Run unit tests with jasmine');

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {
            var jasmine = require('gulp-jasmine');
            var gutil = require('gulp-util');

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.spec, {
                    cwd: config.cwd || defaults.path.buildTest
                });
            }
            
            return stream.pipe(jasmine())
                .on('error', function(err){
                    cb(new gutil.PluginError('jasmine', err));
                });
        };
    };
};
