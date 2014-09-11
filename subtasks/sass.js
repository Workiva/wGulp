var gutil = require('gulp-util');
var sass = require('gulp-sass');

module.exports = function(gulp, defaults){
    gulp.desc('sass', 'Compile SASS to CSS');

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || [defaults.glob.sass, defaults.glob.scss], {
                    cwd: config.cwd || defaults.path.styles
                });
            }

            return stream.pipe(
                sass({
                    includePaths: config.include_paths || defaults.path.style_include_paths
                }))
                .on('error', function(err){
                    cb(new gutil.PluginError('sass', err));
                })
                .pipe(gulp.dest(config.dest || defaults.path.build_styles));
        };
    };
};
