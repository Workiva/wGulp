var concat = require('gulp-concat');
var gutil = require('gulp-util');

module.exports = function(gulp, defaults){
    gulp.desc('concat', 'Concatenate JS files');

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

            return stream.pipe(concat(config.outfile || 'concat.js'))
                .on('error', function(err){
                    cb(new gutil.PluginError('concat', err));
                })
                .pipe(gulp.dest(config.dest || defaults.path.dist));
        };
    };
};
