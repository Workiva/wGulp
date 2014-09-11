var gutil = require('gulp-util');
var path = require('path');
var plato = require('gulp-plato');

module.exports = function(gulp, defaults){
    gulp.desc('analyze', 'View code complexity report');

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {
            var reportPath = path.resolve(config.dest || defaults.path.complexity);

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.js, {
                    cwd: config.cwd || defaults.path.build_src
                });
            }

            return stream.pipe(plato(reportPath))
                .on('error', function(err){
                    cb(new gutil.PluginError('analyze', err));
                });
        };
    };
};
