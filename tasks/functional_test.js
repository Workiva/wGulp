module.exports = function(gulp, defaults, subtasks) {

    var shell = require('gulp-shell');

    var taskName = 'test:functional';

    gulp.task(taskName, function(done){
        var command = './node_modules/.bin/nightwatch -c ' + defaults.nightwatch_config;
        return gulp.src('').pipe(shell([command]));
    });

};
