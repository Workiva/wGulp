module.exports = function(gulp, options, subtasks) {

    var _ = require('lodash'),
        changed = require('gulp-changed'),
        glob = require('glob'),
        open = require('open'),
        path = require('path');

    // Tasks that call runSequence
    gulp.desc('build', 'Run build tasks');
    gulp.task('build', subtasks.runSequence(options.build_tasks));

    gulp.desc('dist', 'Run dist tasks');
    gulp.task('dist', function(cb){
        // Redefine tsc task with sourcemaps disabled
        var tscOptions = options.ts;
        tscOptions.sourcemap = false;
        gulp.task('tsc', subtasks.tsc({options: tscOptions}));

        // Run dist tasks
        return subtasks.runSequence(options.dist_tasks)(cb);
    });

    gulp.desc('test:generate', 'Run test tasks')
    gulp.task('test:generate', subtasks.runSequence(options.test_tasks));

    gulp.desc('test:jasmine', 'Run test tasks and execute with jasmine');
    gulp.task('test:jasmine', subtasks.runSequence(['test:generate', 'jasmine']));

    gulp.desc('test', 'Run test tasks and execute with Karma');
    gulp.task('test', subtasks.runSequence(['test:generate', 'karma']));

    gulp.desc('default', 'Run default tasks');
    gulp.task('default', subtasks.runSequence(options.default_tasks));

    // Bundle tasks
    var bundleTasks = _.map(Object.keys(options.bundles), function(bundleName){
        var taskName = 'bundle:' + bundleName
        gulp.desc(taskName, 'Bundle using the "' + bundleName + '" configuration');
        return taskName;
    });
    gulp.desc('bundle', 'Run all bundle tasks');
    gulp.task('bundle', bundleTasks);

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
