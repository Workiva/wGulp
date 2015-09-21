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

    var _ = require('lodash'),
        changed = require('gulp-changed'),
        connect = require('gulp-connect'),
        glob = require('glob'),
        open = require('open'),
        path = require('path'),
        getDeps = require('../depTreeParser');

    // Tasks that call runSequence
    gulp.desc('build', 'Run build tasks');
    gulp.task('build', getDeps(options, 'build'));

    gulp.desc('preDist', 'Run before dist');
    gulp.task('preDist', getDeps(options, 'preDist'), function(done){
        // Redefine tsc task with sourcemaps disabled
        var tscOptions = options.ts;
        tscOptions.sourcemap = false;
        gulp.task(
            'tsc', getDeps(options, 'tsc'),
            subtasks.tsc({options: tscOptions})
        );
    });

    gulp.desc('dist', 'Run dist tasks');
    gulp.task('dist', getDeps(options, 'dist'));

    gulp.desc('preTest', 'Run test tasks')
    gulp.task('preTest', getDeps(options, 'preTest'));

    gulp.desc('test:jasmine', 'Run test tasks and execute with jasmine');
    gulp.task('test:jasmine', getDeps(options, 'test:jasmine'));

    gulp.desc('test', 'Run test tasks and execute with Karma');
    gulp.task('test', getDeps(options, 'test'));

    gulp.desc('default', 'Run default tasks');
    gulp.task('default', getDeps(options, 'default'));

    // Bundle tasks
    var bundleTasks = _.map(Object.keys(options.bundles), function(bundleName){
        var taskName = 'bundle:' + bundleName
        gulp.desc(taskName, 'Bundle using the "' + bundleName + '" configuration');
        return taskName;
    });
    gulp.desc('bundle', 'Run all bundle tasks');
    gulp.task('bundle', getDeps(options, 'bundle'), (bundleTasks && bundleTasks.length > 0) ? subtasks.runSequence(bundleTasks) : null);

    // Clean tasks
    gulp.desc('clean:buildSrc', 'Clean buildSrc');
    gulp.task('clean:buildSrc', getDeps(options, 'clean:buildSrc'),
        subtasks.clean(options.path.buildSrc));

    gulp.desc('clean:buildStyles', 'Clean buildStyles');
    gulp.task('clean:buildStyles', getDeps(options, 'clean:buildStyles'),
        subtasks.clean(options.path.buildStyles));

    gulp.desc('clean:buildTest', 'Clean buildTest');
    gulp.task('clean:buildTest', getDeps(options, 'clean:buildTest'),
        subtasks.clean(options.path.buildTest));

    gulp.desc('clean:dist', 'Clean dist');
    gulp.task('clean:dist', getDeps(options, 'clean:dist'),
        subtasks.clean(options.path.dist));

    gulp.desc('clean:report', 'Clean report');
    gulp.task('clean:report', getDeps(options, 'clean:report'),
        subtasks.clean(options.path.report));

    gulp.desc('clean', 'Clean out directories');
    gulp.task('clean', getDeps(options, 'clean'));

    // Copy tasks
    gulp.desc('copy:html', "Copy HTML from src to buildSrc");
    gulp.task('copy:html', getDeps(options, 'copy:html'), subtasks.copy({
        glob: options.glob.html,
        cwd: options.path.src,
        changed: true,
        dest: options.path.buildSrc
    }));

    gulp.desc('copy:js', 'Copy JS from src to buildSrc');
    gulp.task('copy:js', getDeps(options, 'copy:js'), subtasks.copy({
        glob: options.glob.js,
        cwd: options.path.src,
        dest: options.path.buildSrc,
        changed: true
    }));

    gulp.desc('copy:ts', 'Copy TS from src to buildSrc');
    gulp.task('copy:ts', getDeps(options, 'copy:ts'), subtasks.copy({
        glob: options.glob.ts,
        cwd: options.path.src,
        dest: options.path.buildSrc,
        changed: true
    }));

    gulp.desc('copy:htmltest', 'Copy HTML from test to buildTest');
    gulp.task('copy:htmltest', getDeps(options, 'copy:htmltest'), subtasks.copy({
        glob: options.glob.html,
        cwd: options.path.test,
        changed: true,
        dest: options.path.buildTest
    }));

    gulp.desc('copy:jstest', 'Copy JS from test to buildTest');
    gulp.task('copy:jstest', getDeps(options, 'copy:jstest'), subtasks.copy({
        glob: options.glob.js,
        cwd: options.path.test,
        dest: options.path.buildTest,
        changed: true
    }));

    gulp.task('jsx:test', getDeps(options, 'jsx:test'), subtasks.jsx({
        cwd: options.path.test,
        dest: options.path.buildTest
    }));

    gulp.desc('tsc:test', 'Transpile TypeScript from test to buildTest');
    gulp.task('tsc:test', getDeps(options, 'tsc:test'), subtasks.tsc({
        cwd: options.path.test,
        dest: options.path.build
    }));

    // Tasks that are just a collection of other tasks
    
    gulp.desc('connect:noReload', 'Start a server without livereload');
    gulp.task('connect:noReload', getDeps(options, 'connect:noReload'), subtasks.connect({livereload: false}));
    
    gulp.desc('connect:stop', 'Stop a running connect server allowing gulp to exit');
    gulp.task('connect:stop', getDeps(options, 'connect:stop'), function (done) {
        connect.serverClose();
        done();
            });
    
    gulp.desc('cover', 'View code coverage statistics');
    gulp.task('cover', getDeps(options, 'cover'), function(done){
        var results = glob.sync('**/index.html', {cwd: options.path.coverage});
        open(path.resolve(options.path.coverage + results[0]));
        done();
    });

    gulp.desc('lint', 'Validate code');
    gulp.task('lint', getDeps(options, 'lint'));

    gulp.desc('minify', 'Minify JS and CSS code');
    gulp.task('minify', getDeps(options, 'minify'));

    gulp.task('_tslint', subtasks.tslint({emitError: false}));
    gulp.task('_jshint', subtasks.jshint({emitError: false}));

    gulp.desc('qa', 'QA - Run the default tasks and start serve afterwards.');
    gulp.task('qa', getDeps(options, 'qa'), function() {
        return gulp.start('serve');
    });

    gulp.desc('serve', 'Start a server and open the index.html page in browser');
    gulp.task('serve', ['connect'], function(done){
        open('http://localhost:' + options.port + '/');
        done();
    });

    gulp.desc('watch', 'Runs watch:build');
    gulp.task('watch', ['watch:build']);

};
