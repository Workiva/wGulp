var connect = require('gulp-connect');
var path = require('path');

module.exports = function(gulp, defaults){
    gulp.desc('connect', 'Start a local server');

    return function(config) {
        if(!config)
            config = {};

        return function(done) {
            var rootPath = path.resolve('./');
            connect.server({
                root: [rootPath],
                port: config.port || defaults.port || 9000,
                livereload: config.livereload != false
            });
            done();
        };
    };
};
