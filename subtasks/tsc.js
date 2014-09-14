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

            var outDir = config.dest || defaults.path.build_src;
            var tscOptions = config.options || defaults.ts;
            tscOptions.outDir = outDir;

            return stream.pipe(changed(outDir))
                .pipe(tsc(tscOptions))
                .on('error', function(err){
                    cb(new gutil.PluginError('tsc', err));
                })
                .pipe(gulp.dest(outDir));
        };
    };
};
