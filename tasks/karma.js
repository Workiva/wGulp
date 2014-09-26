module.exports = function(gulp, options, subtasks) {

    var argv = require('yargs').argv;
    var _ = require('lodash');
    var cwd = process.cwd();
    var glob = require('glob');
    var gutil = require('gulp-util');
    var karma = require('gulp-karma');
    var path = require('path');

    var taskname = 'karma';

    gulp.desc(taskname, 'Start the karma test runner for any test run');

    var fn = function (done) {

        // Check for test specs. If none, skip Karma
        if(_.isArray(options.glob.spec)){
            if(_.every(_.map(options.glob.spec, function(specStr){
                return _.isEmpty(glob.sync(specStr, {cwd: options.path.test}));
            }))){
                gutil.log(gutil.colors.yellow("No tests found. Skipping Karma."));
                done();
                return;
            }
        } else {
            if(_.isEmpty(glob.sync(options.glob.spec, {cwd: options.path.test}))){
                gutil.log(gutil.colors.yellow("No tests found. Skipping Karma."));
                done();
                return;
            }
        }

        // get files from karma config
        var karmaShim = {set: function(config) { this.config = config; }};
        var karmaConf = require(path.resolve(cwd, 'node_modules/wGulp/karma.conf.js'));
        karmaConf(karmaShim);
        var files = karmaShim.config.files;

        // Build karma options
        var karmaOptions = {
            action: 'run',
            configFile: options.karma
        };

        // Determine which browsers to run in based on CLI options
        if(argv.browsers){
            karmaOptions.browsers = argv.browsers.split(',');
        }
        else if(argv.c || argv.f || argv.p || argv.chrome || argv.firefox || argv.phantom) {
            karmaOptions.browsers = [];
            if(argv.chrome || argv.c){
                karmaOptions.browsers.push('Chrome');
            }
            if(argv.firefox || argv.f){
                karmaOptions.browsers.push('Firefox');
            }
            if(argv.phantom || argv.p){
                karmaOptions.browsers.push('PhantomJS');
            }
        }

        // Add SauceLabs configuration if user specified --sauce option
        if(argv.sauce && options.sauceLabs && options.sauceLabs.browsers){
            karmaOptions.customLaunchers = options.sauceLabs.browsers;
            karmaOptions.browsers = Object.keys(options.sauceLabs.browsers);
            karmaOptions.reporters = ['dots', 'saucelabs'];
            karmaOptions.sauceLabs = {
                username: options.sauceLabs.username,
                accessKey: options.sauceLabs.accessKey,
                testName: options.sauceLabs.testName
            }
        }

        // Run karma
        return gulp.src(files)
            .pipe(karma(karmaOptions));
    };

    gulp.task(taskname, fn);
};
