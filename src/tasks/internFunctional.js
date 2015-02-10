var gutil = require('gulp-util');

module.exports = function(gulp, defaults, subtasks) {

    var argv = require('yargs').argv;
    var shell = require('gulp-shell');
    var wait = require('gulp-wait');

    var taskName = 'test:intern';
    var command = '';

    if (argv.local) 
    {
        command = './node_modules/.bin/intern-runner config=tests/functional/internLocal';
        gulp.task(taskName, ['begin_Testing'], function (done) {
            gulp.start(['connect:stop']);
            done();
        })
    }
    else if (argv.sauce) 
    {
        command = './node_modules/.bin/intern-runner config=tests/functional/internSauce';
        gulp.task(taskName, ['connect:noReload','start_Test'], function (done) {
            gulp.start(['connect:stop']);
            done();
        })
    }
    else 
    {
        gutil.log(gutil.colors.red("Need to pick a configuration. (--sauce or --local)"));
        gulp.task(taskName, function (done) {
            done();
        })
    }

    gulp.task('start_Test', function () {
        return gulp.src('')
            .pipe(wait(500))
            .pipe(shell([command]))
    })

    gulp.task('start_Selenium', function () {
        return gulp.src('')
            .pipe(shell(['cd ./node_modules/wGulp/src/intern && java -jar selenium-server-standalone-2.44.0.jar &' ]))
    })

    gulp.task('stop_Selenium_Server', function () {
        return gulp.src('')
            .pipe(wait(500))
            .pipe(shell(['lsof -t -i tcp:4444 | xargs kill']))
    })

    gulp.task('_stop_Selenium_Server',['start_Test'], function(){
        gulp.start('stop_Selenium_Server')
    })

    gulp.task('begin_Testing',
        ['start_Selenium', 'connect:noReload','_stop_Selenium_Server'],
        function(done){
            done();
    });
};
