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

    var taskname = 'watch:lint';

    gulp.desc(taskname, 'Watch source files for changes and re-lint');

    var fn = function(done) {
        gulp.watch([options.path.src + options.glob.ts,
                    options.path.test + options.glob.ts],
                   ['_tslint']);
        gulp.watch([options.path.src + options.glob.js,
                    options.path.test + options.glob.js],
                   ['_jshint']);
    };
    gulp.task(taskname, ['_jshint', '_tslint'], fn);
};
