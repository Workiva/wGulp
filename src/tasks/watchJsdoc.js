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

    var taskname = 'watch:jsdoc';

    gulp.desc(taskname, 'Watch source files for changes and refresh JSDoc');

    var fn = function(done) {
        var open = require('open');
        var connect = require('gulp-connect');

        open('http://localhost:' + options.port + '/' + options.path.docs);

        gulp.task('_reloadJSDoc', function(done) {
            return gulp.src(options.glob.all, {
                cwd: options.path.docs
            })
                .pipe(connect.reload());
        });

        gulp.task('_refreshJSDoc', subtasks.runSequence(['build', 'jsdoc', '_reloadJSDoc']));

        gulp.watch(options.glob.all, {
            cwd: options.path.src
        }, ['_refreshJSDoc']);
    };
    gulp.task(taskname, ['connect', 'jsdoc'], fn);
};
