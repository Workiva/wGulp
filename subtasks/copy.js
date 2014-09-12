module.exports = function(gulp, defaults){
    gulp.desc('copy', 'Copy files');

    var changed = require('gulp-changed');

    return function(config) {
        if(!config)
            config = {};

        return function () {

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.all, {
                    cwd: config.cwd || defaults.path.src
                });
            }

            if(config.changed)
                stream = stream.pipe(changed(config.dest || defaults.path.build_src))
            
            return stream.pipe(gulp.dest(config.dest || defaults.path.build_src));
        };
    };
};
