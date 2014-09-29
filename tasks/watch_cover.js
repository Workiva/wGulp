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

    var glob = require('glob');
    var open = require('open');
    var connect = require('gulp-connect');

    var taskname = 'watch:cover';

    gulp.desc(taskname, 'Watch source and test files for changes and recalculate coverage');

    var fn = function(done) {

        var results = glob.sync('**/index.html', {cwd: options.path.coverage});
        open('http://localhost:' + options.port + '/' + options.path.coverage + results[0]);

        gulp.task('_reloadCover', ['test'], function(done) {
            return gulp.src(options.glob.all, {
                cwd: options.path.coverage
            })
                .pipe(connect.reload());
        });

        gulp.watch([
            options.path.src + options.glob.all,
            options.path.test + options.glob.all
        ], ['_reloadCover']);
    };
    gulp.task(taskname, ['test', 'connect'], fn);
};
