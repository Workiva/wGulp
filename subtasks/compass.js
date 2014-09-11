var compass = require('gulp-compass');
var gutil = require('gulp-util');

module.exports = function(gulp, defaults){
    gulp.desc('compass', 'Compile CSS with compass')

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.scss, {
                    cwd: config.cwd || defaults.path.styles
                });
            }
            
            return stream.pipe(
                compass({
                    config_file: config.config_file || defaults.compass_config,
                    import_path: config.include_paths || defaults.path.style_include_paths,
                    sass: config.cwd || defaults.path.styles,
                    css: config.dest || defaults.path.build_styles
                }))
                .on('error', function(err){
                    cb(new gutil.PluginError('compass', err));
                })
                .pipe(gulp.dest(config.dest || defaults.path.build_src));
        };
    };
};
