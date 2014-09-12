var _ = require('lodash');
var browserify = require('browserify');
var fs = require('fs');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');

module.exports = function(gulp, options, bundleOptions, cb){
    var i;
    var b = browserify({
        entries: bundleOptions.entry,
        debug: bundleOptions.debug ? true : false
    });

    if(_.isArray(bundleOptions.transforms)){
        for(i=0; i < bundleOptions.transforms.length; i++){
            var transform_func = require(bundleOptions.transforms[i]);
            b = b.transform(transform_func);
        }
    }

    if(_.isArray(bundleOptions.exclude)){
        for(i=0; i < bundleOptions.exclude.length; i++){
            b.exclude(bundleOptions.exclude);
        }
    }

    if(bundleOptions.include){
        b.require(bundleOptions.include);
    }

    if(bundleOptions.external){
        b.external(bundleOptions.external);
    }

    return b.bundle()
        .pipe(source(bundleOptions.output))
        .pipe(gulp.dest(options.path.dist));
};
