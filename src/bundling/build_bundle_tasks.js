var run_bundle = require('./run_bundle');

module.exports = function(gulp, options){
    // Dynamically create gulp tasks for each bundle config
    for(var key in options.bundles) {
        (function (bundleKey) {
            gulp.task("bundle:" + bundleKey, function (cb) {
                return run_bundle(gulp, options, cb, bundleKey);
            });
        }(key));
    }
};