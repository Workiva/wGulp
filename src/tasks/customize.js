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

module.exports = function(gulp, options, subtasks) {

    var taskname = 'customize';

    gulp.desc(taskname, 'Copy the standard config files to your repo so you can change defaults');

    var fn = function() {
        var fs = require('fs');
        var gutil = require('gulp-util');
        var path = require('path');
        var cwd = process.cwd();
        
        gutil.log(gutil.colors.green("You can now modify your .jshintrc, tslint.json, " + 
                                     "and karma.conf.js to your liking."));
        return gulp.src([
                '.jshintrc',
                'tslint.json',
                'karma.conf.js'
            ], {cwd: path.resolve(cwd, 'node_modules/wGulp/src/template/')})
            .pipe(gulp.dest(path.resolve(cwd)));
    };
    gulp.task(taskname, fn);
};
