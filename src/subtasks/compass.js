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
    gulp.desc('compass', 'Compile CSS with compass')

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {
            var compass = require('gulp-compass');
            var gutil = require('gulp-util');

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.scss, {
                    cwd: config.cwd || defaults.path.styles
                });
            }

            var configFile = 'configFile' in config ? config.configFile : defaults.compassConfig;
            var includePaths = 'includePaths' in config ? config.includePaths : defaults.path.styleIncludePaths;
            
            return stream.pipe(
                compass({
                    config_file: configFile,
                    import_path: includePaths,
                    sass: config.cwd || defaults.path.styles,
                    css: config.dest || defaults.path.buildStyles
                }))
                .on('error', function(err){
                    cb(new gutil.PluginError('compass', err));
                })
                .pipe(gulp.dest(config.dest || defaults.path.buildSrc));
        };
    };
};
