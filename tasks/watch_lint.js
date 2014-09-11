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
