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

module.exports = function(gulp, options, subtasks) {

    var taskname = 'watch:analyze';

    gulp.desc(taskname, 'Watch source files for changes and recalculate complexity');

    var fn = function(done) {
        var open = require('open');
        var connect = require('gulp-connect');

        open('http://localhost:' + options.port + '/' + options.path.complexity);

        gulp.task('_reloadAnalyze', function(done) {
            return gulp.src(options.glob.all, {
                cwd: options.path.complexity
            })
                .pipe(connect.reload());
        });

        gulp.task('_refreshAnalyze', subtasks.runSequence(['build', 'analyze', '_reloadAnalyze']));

        gulp.watch(options.glob.all, {
            cwd: options.path.src
        }, ['_refreshAnalyze']);
    };
    gulp.task(taskname, ['analyze', 'connect'], fn);
};
