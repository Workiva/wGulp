var jasmine = require('gulp-jasmine');
var gutil = require('gulp-util');

module.exports = function(gulp, defaults){
    gulp.desc('jasmine', 'Run unit tests with jasmine');

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.spec, {
                    cwd: config.cwd || defaults.path.build_test
                });
            }
            
            return stream.pipe(jasmine())
                .on('error', function(err){
                    cb(new gutil.PluginError('jasmine', err));
                });
        };
    };
};
