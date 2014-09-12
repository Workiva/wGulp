module.exports = function(gulp, options, subtasks) {

    var open = require('open');
    var connect = require('gulp-connect');

    var taskname = 'watch:jsdoc';

    gulp.desc(taskname, 'Watch source files for changes and refresh JSDoc');

    var fn = function(done) {

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
