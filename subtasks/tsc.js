var changed = require('gulp-changed');
var gutil = require('gulp-util');
var tsc = require('gulp-tsc');

module.exports = function(gulp, defaults){
    gulp.desc('tsc', 'Transpile TypeScript to javascript');

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.ts, {
                    cwd: config.cwd || defaults.path.src
                });
            }

            return stream.pipe(changed(config.dest || defaults.path.build_src))
                .pipe(tsc(config.options || defaults.ts))
                .on('error', function(err){
                    cb(new gutil.PluginError('tsc', err));
                })
                .pipe(gulp.dest(config.dest || defaults.path.build_src));
        };
    };
};
