module.exports = function(gulp, defaults, subtasks) {

    var shell = require('gulp-shell');
    var wait = require('gulp-wait');
    
    var taskName = 'test:intern';

    gulp.task('start_test', function () {
        return gulp.src('')
            .pipe(wait(500))
            .pipe(shell([
                './node_modules/.bin/intern-runner config=tests/functional/intern'
            ]))
    })

    gulp.task('start_selenium', function () {
        return gulp.src('')
            .pipe(shell([
                'cd ./node_modules/wGulp/src/intern && java -jar selenium-server-standalone-2.44.0.jar &'
            ]))
    })

    gulp.task('stop_selenium_server', function () {
        return gulp.src('')
            .pipe(wait(500))
            .pipe(shell([
                'lsof -t -i tcp:4444 | xargs kill'
            ]))
    })
    
    gulp.task('_stop_selenium_server',['start_test'], function(){
        gulp.start('stop_selenium_server')
    })
    
    gulp.task('begin_Testing',
        
        
        ['start_selenium', 'connect:noreload','_stop_selenium_server'],
        function(done){
            var command = '';
        return gulp.src('').pipe(shell([command]));
    });

    gulp.task(taskName, ['begin_Testing'], function(done){
        gulp.start(['connect:stop']);
        done();
    });

};