module.exports = function(gulp, options, subtasks) {

    var argv = require('yargs').argv;
    var cwd = process.cwd();
    var _ = require('lodash');
    var path = require('path');
    var karma = require('gulp-karma');
    var livereload = require('gulp-livereload');

    var taskname = 'watch:test';

    gulp.desc(taskname, 'Watch test files for changes and regenerate JS');

    var fn = function(done) {

        var server = livereload();
        server.changed();

        var testJs = options.path.test + options.glob.js;
        var testTs = options.path.test + options.glob.ts;
        var srcJs = options.path.src + options.glob.js;
        var srcTs = options.path.src + options.glob.ts;
        var srcJsx = options.path.src + options.glob.jsx;
        var buildJs = options.path.build + options.glob.js;

        gulp.watch([testJs, testTs, srcJs, srcTs, srcJsx], ['test:generate']);
        gulp.watch(buildJs).on('change', server.changed);

        // get files from karma config
        var karmaShim = {set: function(config) { this.config = config; }};
        var karmaConf = require(path.resolve(cwd, 'node_modules/wGulp/karma.conf.js'));
        karmaConf(karmaShim);
        var files = karmaShim.config.files;

        // Build karma options
        var karmaOptions = {
            action: 'start',
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

        // Run karma
        return gulp.src(files)
            .pipe(karma(karmaOptions));
    };
    gulp.task(taskname, ['test:generate'], fn);
};
