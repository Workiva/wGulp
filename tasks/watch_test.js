module.exports = function(gulp, options, subtasks) {

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

        return gulp.src(files)
            .pipe(karma({
                configFile: options.karma,
                action: 'start'
            }));
    };
    gulp.task(taskname, ['test:generate'], fn);
};
