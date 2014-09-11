var _ = require('lodash');
var fs = require('fs-extra');

module.exports = function(gulp, defaults){
    gulp.desc('clean', 'Clean out directories');

    return function(config) {
        if(!config)
            config = [defaults.path.build, defaults.path.dist];

        return function (done) {
            if(_.isArray(config)){
                _.forEach(config, function(val){
                    fs.removeSync(val);
                });
            }
            else
                fs.removeSync(config);
            done();
        };
    };
};
