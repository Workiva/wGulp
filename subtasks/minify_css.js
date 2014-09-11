var rename = require('gulp-rename');
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');

module.exports = function(gulp, defaults){
    gulp.desc('minify:css', 'Minify CSS code and change extension to .min.css');

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.css, {
                    cwd: config.cwd || defaults.path.dist
                });
            }

            return stream.pipe(minifyCss())
                .on('error', function(err){
                    cb(new gutil.PluginError('minify:css', err));
                })
                .pipe(rename({extname: ".min.css"}))
                .pipe(gulp.dest(config.dest || defaults.path.dist));
        };
    };
};
