var changed = require('gulp-changed');
var gutil = require('gulp-util');
var react = require('gulp-react');

module.exports = function(gulp, defaults){
    gulp.desc('jsx', 'Transpile JSX code with React to JS');

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.jsx, {
                    cwd: config.cwd || defaults.path.src
                });
            }

            return stream.pipe(changed(config.dest || defaults.path.build_src))
                .pipe(react())
                .on('error', function(err){
                    cb(new gutil.PluginError('jsx', err));
                })
                .pipe(gulp.dest(config.dest || defaults.path.build_src));
        };
    };
};
