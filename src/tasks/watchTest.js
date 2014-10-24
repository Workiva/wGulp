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

    var taskname = 'watch:test';

    gulp.desc(taskname, 'Watch test files for changes and regenerate JS');

    var fn = function(done) {
        var argv = require('yargs').argv;
        var cwd = process.cwd();
        var _ = require('lodash');
        var path = require('path');
        var karma = require('gulp-karma');
        var livereload = require('gulp-livereload');

        var server = livereload();
        server.changed();

        var testJs = options.path.test + options.glob.js;
        var testTs = options.path.test + options.glob.ts;
        var srcJs = options.path.src + options.glob.js;
        var srcTs = options.path.src + options.glob.ts;
        var srcJsx = options.path.src + options.glob.jsx;
        var buildJs = options.path.build + options.glob.js;

        gulp.watch([testJs, testTs, srcJs, srcTs, srcJsx], ['preTest']);
        gulp.watch(buildJs).on('change', server.changed);

        // get files from karma config
        var karmaShim = {set: function(config) { this.config = config; }};
        var karmaConf = require(path.resolve(cwd, 'node_modules/wGulp/karma.conf.js'));
        karmaConf(karmaShim);
        var files = karmaShim.config.files;

        // Build karma options
        var karmaOptions = {
            action: 'start',
            configFile: options.karma
        };

        // Determine which browsers to run in based on CLI options
        if(argv.browsers){
            karmaOptions.browsers = argv.browsers.split(',');
        }
        else if(argv.c || argv.f || argv.p || argv.chrome || argv.firefox || argv.phantom) {
            karmaOptions.browsers = [];
            if(argv.chrome || argv.c){
                karmaOptions.browsers.push('Chrome');
            }
            if(argv.firefox || argv.f){
                karmaOptions.browsers.push('Firefox');
            }
            if(argv.phantom || argv.p){
                karmaOptions.browsers.push('PhantomJS');
            }
        }

        // Run karma
        return gulp.src(files)
            .pipe(karma(karmaOptions));
    };
    gulp.task(taskname, ['preTest'], fn);
};
