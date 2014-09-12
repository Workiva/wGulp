module.exports = function(gulp, options, subtasks) {

    var glob = require('glob');
    var open = require('open');
    var connect = require('gulp-connect');

    var taskname = 'watch:cover';

    gulp.desc(taskname, 'Watch source and test files for changes and recalculate coverage');

    var fn = function(done) {

        var results = glob.sync('**/index.html', {cwd: options.path.coverage});
        open('http://localhost:' + options.port + '/' + options.path.coverage + results[0]);

        gulp.task('_reloadCover', ['test'], function(done) {
            return gulp.src(options.glob.all, {
                cwd: options.path.coverage
            })
                .pipe(connect.reload());
        });

        gulp.watch([
            options.path.src + options.glob.all,
            options.path.test + options.glob.all
        ], ['_reloadCover']);
    };
    gulp.task(taskname, ['test', 'connect'], fn);
};
