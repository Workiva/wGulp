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

module.exports = function(gulp, defaults){
    gulp.desc('tsc', 'Transpile TypeScript to javascript');

    return function(config) {
        if(!config)
            config = {};

        return function (cb) {
            var changed = require('gulp-changed');
            var merge = require('merge-stream');
            var gutil = require('gulp-util');
            var path = require('path');
            var tsc = require('gulp-tsc');
            var fs = require('fs');

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.ts, {
                    cwd: config.cwd || defaults.path.src
                });
            }

            // create a temporary TS file in the default src directory and add
            // it to the TS file stream to ensure that all compiled TS file paths
            // maintain proper position relative to the original src directory
            // (without this, compiling only test TS files will have inconsistent
            // output paths)
            var baseDirFile = path.resolve(path.join(defaults.path.src, './.baseDir.ts'));
            fs.writeFileSync(baseDirFile, '// Ignore this file. For a complete explanation, see https://github.com/Workiva/wGulp/issues/7');
            var mergedStream = merge(stream,
                gulp.src('.baseDir.ts', {cwd: defaults.path.src})
            );

            var outDir = config.dest || defaults.path.build_src;
            var tscOptions = config.options || defaults.ts;
            tscOptions.outDir = outDir;

            if(defaults.isDist){
                tscOptions.sourcemap = false;
            }

            return mergedStream.pipe(changed(outDir))
                .pipe(tsc(tscOptions))
                .on('error', function(err){
                    cb(new gutil.PluginError('tsc', err));
                })
                .on('end', function(){
                    // delete the temporary src TS file
                    fs.unlink(baseDirFile);
                })
                .pipe(gulp.dest(outDir));
        };
    };
};
