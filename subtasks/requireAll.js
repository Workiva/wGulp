var fs = require('fs'),
    glob = require('glob'),
    gutil = require('gulp-util');

module.exports = function(gulp, defaults){
    gulp.desc('requireAll', 'Generate JS file requiring all files matching a glob');

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {

            var files;
            if(config.src)
                files = glob.sync(config.src);
            else {
                files = glob.sync(config.glob || defaults.glob.coffee, {
                    cwd: config.cwd || defaults.path.src
                });
            }

            files = files.map(function(file) {
                return("require('./" + file.split('.js')[0] + "');\n");
            });

            fs.writeFileSync(config.dest || 'index.js', files.join(''));
            cb();
        };
    };
};
