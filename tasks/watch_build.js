module.exports = function(gulp, options, subtasks) {

    var taskname = 'watch:build';

    gulp.desc(taskname, 'Watch source files for changes and rebuild');

    var fn = function(done) {
        gulp.watch(options.glob.all, {
            cwd: options.path.src
        }, ['build']);
    };
    gulp.task(taskname, ['build'], fn);
};
