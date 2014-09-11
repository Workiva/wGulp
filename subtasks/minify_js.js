var rename = require('gulp-rename');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');

module.exports = function(gulp, defaults){
    gulp.desc('minify:js', 'Minify JS code and change extension to .min.js');

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.js, {
                    cwd: config.cwd || defaults.path.dist
                });
            }

            return stream.pipe(uglify())
                .on('error', function(err){
                    cb(new gutil.PluginError('minify:js', err));
                })
                .pipe(rename({extname: ".min.js"}))
                .pipe(gulp.dest(config.dest || defaults.path.dist));
        };
    };
};
