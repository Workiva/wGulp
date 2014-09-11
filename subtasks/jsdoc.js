var gutil = require('gulp-util');
var jsdoc = require('gulp-jsdoc');

module.exports = function(gulp, defaults) {
    gulp.desc('jsdoc', 'Generate documentation with JSDoc');

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.js, {
                    cwd: config.cwd || defaults.path.build_src
                });
            }

            return stream.pipe(jsdoc.parser())
                .on('error', function(err){
                    cb(new gutil.PluginError('jsdoc', err));
                })
                .pipe(jsdoc.generator(config.dest || defaults.path.docs));
        };
    };
};
