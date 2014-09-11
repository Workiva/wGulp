var argv = require('yargs').argv;
var bundle_browserify = require('./bundle_browserify');
var bundle_jspm = require('./bundle_jspm');
var gutil = require('gulp-util');


var get_bundle_options = function(options, cb, bundleName){
    var buildOptions = options.bundles[bundleName];

    if(!buildOptions){
        return cb(new gutil.PluginError(
            "bundle", gutil.colors.red("Invalid bundle specified: '" + bundleName + "'.")
        ));
    }
    return buildOptions;
};

module.exports = function(gulp, options, cb, bundleName){
    var bundleOptions = get_bundle_options(options, cb, bundleName);

    // This means the cb was already called with an error, so exit the task.
    if(!bundleOptions){
        return;
    }

    // Default to JSPM if not specified.
    if(!bundleOptions.bundler){
        bundleOptions.bundler = "jspm";
    }

    // Choose which bundler to use based on the option specified.
    if(bundleOptions.bundler == "jspm"){
        return bundle_jspm(gulp, options, bundleOptions, cb);
    }
    else if(bundleOptions.bundler == "browserify"){
        return bundle_browserify(gulp, options, bundleOptions, cb);
    }
    else {
        // An unknown bundler was specified. Error gracefully.
        return cb(new gutil.PluginError(
            "bundle:" + bundleName,
            gutil.colors.red("Unsupported bundler: '" + bundleOptions.bundler + "'.")
        ));
    }
};
