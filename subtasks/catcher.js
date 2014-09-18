var Catcher = require('wf-catcher/catcher');

module.exports = function(gulp, defaults){
    gulp.desc('catcher', 'Start a test result catcher server');

    return function(config) {
        if(!config)
            config = {};

        return function(done) {
            var server = new Catcher();
            server.start();
            done();
        };
    };
};
