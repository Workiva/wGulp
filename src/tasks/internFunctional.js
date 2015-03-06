

module.exports = function(gulp, defaults, subtasks) {

    var argv = require('yargs').argv;
    var gutil = require('gulp-util');
    var shell = require('gulp-shell');
    var wait = require('gulp-wait');

    var taskName = 'test:intern',
        beginTesting = taskName + ':beginTesting',
        startTest = taskName + ':startTest',
        startSelenium = taskName + ':startSelenium',
        stopSelenium = taskName + ':stopSelenium',
        _stopSelenium = taskName + ':_stopSelenium',
        connectNoReload = 'connect:noReload',
        connectStop = 'connect:stop',
        command = '';

    if (argv.local) 
    {
        command = './node_modules/.bin/intern-runner config=tests/functional/internLocal';
        gulp.task(taskName, [beginTesting], function (done) {
            gulp.start([connectStop]);
            done();
        })
    }
    else if (argv.sauce) 
    {
        command = './node_modules/.bin/intern-runner config=tests/functional/internSauce';
        gulp.task(taskName, [connectNoReload, startTest], function (done) {
            gulp.start([connectStop]);
            done();
        })
    }
    else 
    {
        gulp.task(taskName, function (done) {
            gutil.log(gutil.colors.red("Need to pick a configuration. (--sauce or --local)"));
            done();
        })
    }

    gulp.task(startTest, function () {
        return gulp.src('')
            .pipe(wait(500))
            .pipe(shell([command]))
    })

    gulp.task(startSelenium, function () {
        return gulp.src('')
            .pipe(shell(['cd ./node_modules/wGulp/src/intern && java -jar selenium-server-standalone-2.44.0.jar &' ]))
    })

    gulp.task(stopSelenium, function () {
        return gulp.src('')
            .pipe(wait(500))
            .pipe(shell(['lsof -t -i tcp:4444 | xargs kill']))
    })

    gulp.task(_stopSelenium, [startTest], function(){
        gulp.start(stopSelenium)
    })

    gulp.task(beginTesting, [startSelenium, connectNoReload, _stopSelenium]);
};
