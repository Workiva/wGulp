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
  
var gutil = require('gulp-util');

module.exports = function(gulp, options, subtasks) {
    
    var taskname = 'functional';
    var argv = require('yargs').argv;
    var fn = function(){
        var shell = require('gulp-shell');
                
        var command = ''
                
        if(argv.local)
        {
            command = "grunt local";
        } 
        else if (argv.sauce)
        {
            command = "grunt sauce";
        }
                
        if (command == '')
        {
            gutil.log(gutil.colors.red("Need to pick a configuration. (--sauce or --local)"))
        }
        return gulp.src('').pipe(shell([command]));
    }
    
    gulp.task(taskname,fn)
};