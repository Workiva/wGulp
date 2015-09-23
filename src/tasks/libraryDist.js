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

module.exports = function(gulp, defaults, subtasks) {
    var getDeps = require('../depTreeParser');

    var taskName = 'libraryDist';

    // copy transpiled js from build/ to dist/
    gulp.task(taskName + ':copy:src', getDeps(defaults, 'libraryDist'), subtasks.copy({
        src: [defaults.path.buildSrc + '/**'],
        dest: defaults.path.dist
    }));

    gulp.task(taskName + ':copy:api', getDeps(defaults, 'libraryDist'), function(){
        // copy definition files for this repo to dist/ by copying everything
        // from api/ that isn't git ignored
        var fs = require('fs');

        var excludeIgnoredGlob = [];
        try {
            var data = fs.readFileSync(defaults.path.api + '/.gitignore', {encoding: 'utf8'});
            var ignored = data.split('\n');
            ignored.forEach(function(filename) {
                if (filename) {
                    excludeIgnoredGlob.push('!' + defaults.path.api + '/' + filename);
                }
            });
        } catch (e) {
            // silence error
        }
        return gulp.src([].concat(defaults.path.api + defaults.glob.tsd, excludeIgnoredGlob))
            .pipe(gulp.dest(defaults.path.dist));
    });

    gulp.desc(taskName, 'Distribute build results for library');
    gulp.task(taskName, [taskName + ':copy:src', taskName + ':copy:api']);
};
