var changed = require('gulp-changed');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');

module.exports = function(gulp, defaults){
    gulp.desc('coffee', 'Compile CoffeeScript');

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.coffee, {
                    cwd: config.cwd || defaults.path.src
                });
            }

            return stream.pipe(changed(config.dest || defaults.path.build_src))
                .pipe(coffee({bare: config.bare || true}))
                .on('error', function(err){
                    cb(new gutil.PluginError('coffee', err));
                })
                .pipe(gulp.dest(config.dest || defaults.path.build_src));
        };
    };
};
