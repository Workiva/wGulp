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

    var _ = require('lodash'),
        Catcher = require('wf-catcher/catcher'),
        changed = require('gulp-changed'),
        connect = require('gulp-connect'),
        glob = require('glob'),
        open = require('open'),
        path = require('path');

    // Tasks that call runSequence
    gulp.desc('build', 'Run build tasks');
    gulp.task('build', subtasks.runSequence(options.build_tasks));

    gulp.desc('default', 'Run default tasks');
    gulp.task('default', subtasks.runSequence(options.default_tasks));

    gulp.desc('dist', 'Run dist tasks');
    gulp.task('dist', function(cb){
        // Redefine tsc task with sourcemaps disabled
        var tscOptions = options.ts;
        tscOptions.sourcemap = false;
        gulp.task('tsc', subtasks.tsc({options: tscOptions}));

        // Run dist tasks
        return subtasks.runSequence(options.dist_tasks)(cb);
    });

    // Test tasks
    gulp.desc('test:generate', 'Run test tasks')
    gulp.task('test:generate', subtasks.runSequence(options.test_tasks));

    gulp.desc('test:jasmine', 'Run test tasks and execute with jasmine');
    gulp.task('test:jasmine', subtasks.runSequence(['test:generate', 'jasmine']));

    gulp.task('requireAll:functionalTest', subtasks.requireAll({
        glob: '**/*Spec.js', // options.glob.spec, // TODO - why doesn't it like this glob
        cwd: options.path.functional_test,
        dest: path.join(options.path.functional_test, 'index.js')
    }));
    gulp.desc('test:functional', 'Run functional tests in a browser');
    gulp.task('test:functional', ['requireAll:functionalTest', 'catcher', 'connect'], function(done){
        open('http://localhost:' + options.port + '/');
        done();
    });

    gulp.desc('test', 'Run test tasks and execute with Karma');
    gulp.task('test', subtasks.runSequence(['test:generate', 'karma']));

    var server = null;
    gulp.desc('catcher', 'Start a test result catcher server');
    gulp.task('catcher', function(done) {
        server = new Catcher();
        server.start();
        done();
    });

    gulp.desc('catcher:stop', 'Stop a test result catcher server');
    gulp.task('catcher:stop', function(done){
        if(server){
            server.stop();
        }
        done();
    })

    // Bundle tasks
    var bundleTasks = _.map(Object.keys(options.bundles), function(bundleName){
        var taskName = 'bundle:' + bundleName
        gulp.desc(taskName, 'Bundle using the "' + bundleName + '" configuration');
        return taskName;
    });
    gulp.desc('bundle', 'Run all bundle tasks');
    gulp.task('bundle', (bundleTasks && bundleTasks.length > 0) ? subtasks.runSequence(bundleTasks) : null);

    // Copy tasks
    gulp.desc('copy:html', "Copy HTML from src to build_src");
    gulp.task('copy:html', subtasks.copy({
        glob: options.glob.html,
        cwd: options.path.src,
        changed: true,
        dest: options.path.build_src
    }));

    gulp.desc('copy:js', 'Copy JS from src to build_src');
    gulp.task('copy:js', subtasks.copy({
        glob: options.glob.js,
        cwd: options.path.src,
        dest: options.path.build_src,
        changed: true
    }));

    gulp.desc('copy:jstest', 'Copy JS from test to build_test');
    gulp.task('copy:jstest', subtasks.copy({
        glob: options.glob.js,
        cwd: options.path.test,
        dest: options.path.build_test,
        changed: true
    }));

    gulp.desc('tsc:test', 'Transpile TypeScript from test to build_test');
    gulp.task('tsc:test', subtasks.tsc({
        cwd: options.path.test,
        dest: options.path.build
    }));

    // Tasks that are just a collection of other tasks
    gulp.desc('connect:noreload', 'Start a server without livereload');
    gulp.task('connect:noreload', subtasks.connect({livereload: false}));

    gulp.desc('connect:stop', 'Stop a running connect server allowing gulp to exit');
    gulp.task('connect:stop', function(done){
        connect.serverClose();
        done();
    });

    gulp.desc('cover', 'View code coverage statistics');
    gulp.task('cover', ['test'], function(done){
        var results = glob.sync('**/index.html', {cwd: options.path.coverage});
        open(path.resolve(options.path.coverage + results[0]));
        done();
    });

    gulp.desc('lint', 'Validate code');
    gulp.task('lint', ['jshint', 'tslint']);

    gulp.desc('minify', 'Minify JS and CSS code');
    gulp.task('minify', ['minify:js', 'minify:css']);

    gulp.task('_tslint', subtasks.tslint({emitError: false}));
    gulp.task('_jshint', subtasks.jshint({emitError: false}));

    gulp.desc('qa', 'QA - Run the default tasks and start serve afterwards.');
    gulp.task('qa', ['default'], function() {
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
