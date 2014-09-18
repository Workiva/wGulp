module.exports = function(gulp, defaults, subtasks) {

    var shell = require('gulp-shell');

    var taskName = 'test:functional';

    gulp.task(taskName + ':run', ['connect:noreload'], function(done){
        var command = './node_modules/.bin/nightwatch -c ' + defaults.nightwatch_config;
        return gulp.src('').pipe(shell([command]));
    });

    gulp.task(taskName, [taskName + ':run'], function(){
        return gulp.start(['connect:stop']);
    });

};
