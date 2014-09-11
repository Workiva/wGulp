var cwd = process.cwd();
var path = require('path');
var tslint = require('gulp-tslint');

module.exports = function(gulp, defaults){
    gulp.desc('tslint', 'Validate TS files with tslint');

    return function(config) {
        if(!config)
            config = {};

        return function () {
            var tslintrc = path.resolve(cwd, config.config_file || defaults.tslintrc);
            var tsConfig = require(tslintrc);

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.ts, {
                    cwd: config.cwd || defaults.path.src
                });
            }

            stream = stream.pipe(tslint({configuration: tsConfig}));

            if(config.emitError || config.emitError === undefined)
                return stream.pipe(tslint.report('verbose'));
            else {
                return stream.pipe(tslint.report('verbose', {
                    emitError: false
                }));
            }
        };
    };
};
