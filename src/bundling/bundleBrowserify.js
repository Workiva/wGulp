/*
 * Copyright 2014 Workiva, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = function(gulp, options, bundleOptions, cb){
    var _ = require('lodash');
    var browserify = require('browserify');
    var fs = require('fs');
    var gutil = require('gulp-util');
    var source = require('vinyl-source-stream');
    
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
