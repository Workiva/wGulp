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

    var argv = require('yargs').argv;
    var _ = require('lodash');
    var cwd = process.cwd();
    var glob = require('glob');
    var gutil = require('gulp-util');
    var karma = require('gulp-karma');
    var path = require('path');

    var taskname = 'karma';

    gulp.desc(taskname, 'Start the karma test runner for any test run');

    var fn = function (done) {

        // Check for test specs. If none, skip Karma
        if(_.isArray(options.glob.spec)){
            if(_.every(_.map(options.glob.spec, function(specStr){
                return _.isEmpty(glob.sync(specStr, {cwd: options.path.test}));
            }))){
                gutil.log(gutil.colors.yellow("No tests found. Skipping Karma."));
                done();
                return;
            }
        } else {
            if(_.isEmpty(glob.sync(options.glob.spec, {cwd: options.path.test}))){
                gutil.log(gutil.colors.yellow("No tests found. Skipping Karma."));
                done();
                return;
            }
        }

        // get files from karma config
        var karmaShim = {set: function(config) { this.config = config; }};
        var karmaConf = require(path.resolve(cwd, 'node_modules/wGulp/karma.conf.js'));
        karmaConf(karmaShim);
        var files = karmaShim.config.files;

        // Build karma options
        var karmaOptions = {
            action: 'run',
            configFile: options.karma
        };
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

    gulp.task(taskname, fn);
};
