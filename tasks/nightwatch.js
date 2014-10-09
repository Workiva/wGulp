module.exports = function(gulp, defaults, subtasks) {

    var shell = require('gulp-shell');

    var taskName = 'test:nightwatch';

    gulp.task(taskName + ':run',
        ['requireAll:functionalTest', 'catcher', 'connect:noreload'],
        function(done){
        var command = './node_modules/.bin/nightwatch -c ' + defaults.nightwatch_config;
        return gulp.src('').pipe(shell([command]));
    });

    gulp.task(taskName, [taskName + ':run'], function(done){
        gulp.start(['connect:stop', 'catcher:stop']);
        done();
    });

};
