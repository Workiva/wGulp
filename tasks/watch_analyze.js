module.exports = function(gulp, options, subtasks) {

    var open = require('open');
    var connect = require('gulp-connect');

    var taskname = 'watch:analyze';

    gulp.desc(taskname, 'Watch source files for changes and recalculate complexity');

    var fn = function(done) {

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
