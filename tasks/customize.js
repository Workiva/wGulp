module.exports = function(gulp, options, subtasks) {

    var fs = require('fs');
    var gutil = require('gulp-util');
    var path = require('path');
    var cwd = process.cwd();

    var taskname = 'customize';

    gulp.desc(taskname, 'Copy the standard config files to your repo so you can change defaults');

    var fn = function() {
        gutil.log(gutil.colors.green("You can now modify your .jshintrc, tslint.json, " + 
                                     "and karma.conf.js to your liking."));
        return gulp.src([
                '.jshintrc',
                'tslint.json',
                'karma.conf.js'
            ], {cwd: path.resolve(cwd, 'node_modules/wGulp/template/')})
            .pipe(gulp.dest(path.resolve(cwd)));
    };
    gulp.task(taskname, fn);
};
