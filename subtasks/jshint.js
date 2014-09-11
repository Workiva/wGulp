var cwd = process.cwd();
var path = require('path');
var jshint = require('gulp-jshint');

module.exports = function(gulp, defaults) {
    gulp.desc('jshint', 'Validate JS files with jshint');

    return function(config) {
        if(!config)
            config = {};

        return function () {
            var jshintrc = path.resolve(cwd, config.config_file || defaults.jshintrc);

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.js, {
                    cwd: config.cwd || defaults.path.src
                });
            }

            stream = stream.pipe(jshint(jshintrc))
                .pipe(jshint.reporter('jshint-stylish'));

            if(config.emitError || config.emitError === undefined)
                return stream.pipe(jshint.reporter('fail'));
            else
                return stream;
        };
    };
};
