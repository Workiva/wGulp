var mkdirp = require('mkdirp');
var path = require('path');
var shell = require('gulp-shell');


function ensureOutputDir(filePath){
    var dirPath = path.dirname(filePath);
    if(dirPath != '.'){
        mkdirp.sync(dirPath);
    }
};

module.exports = function(gulp, options, bundleOptions, cb){
    var bundleCommand = bundleOptions.sfx ? " bundle-sfx " : " bundle ";
    var entry = bundleOptions.entry || "";
    var output = bundleOptions.output || "";
    var inject = bundleOptions.add_to_config === false ? "" : " --inject";
    var includes = "";
    var excludes = "";
    if(bundleOptions.include && bundleOptions.include.length > 0){
        includes = " + " + bundleOptions.include.join(" + ");
    }
    if(bundleOptions.exclude && bundleOptions.exclude.length > 0){
        excludes = " - " + bundleOptions.exclude.join(" - ");
    }

    // Ensure output directory exists
    ensureOutputDir(output);

    var command = "./node_modules/.bin/jspm" + bundleCommand + entry + includes + excludes + " " + output + inject;

    return gulp.src('').pipe(shell([command]));
};
