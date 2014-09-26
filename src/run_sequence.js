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

/*
Slightly modified version of the run-sequence node module
(original node code doesn't work correctly with the style
of task modules being used in wGulp)

https://www.npmjs.org/package/run-sequence

This will no longer be necessary once gulp 4.0.0 is
released with support for async and sync test sequences
*/
var gutil = require('gulp-util');

function verifyTaskSets(gulp, taskSets, skipArrays) {
    if(taskSets.length === 0) {
        throw new Error('No tasks were provided to run-sequence');
    }
    taskSets.forEach(function(t) {
        var isTask = typeof t === "string",
            isArray = !skipArrays && Array.isArray(t);
        if(!isTask && !isArray) {
            throw new Error("Task "+t+" is not a valid task string.");
        }
        if(isTask && !gulp.hasTask(t)) {
            throw new Error("Task "+t+" is not configured as a task on gulp.");
        }
        if(isArray) {
            if(t.length === 0) {
                throw new Error("An empty array was provided as a task set");
            }
            verifyTaskSets(gulp, t, true);
        }
    });
}

function runSequence() {
    var taskSets = Array.prototype.slice.call(arguments);
    var gulp = taskSets.shift();
    var callBack = typeof taskSets[taskSets.length-1] === 'function' ? taskSets.pop() : false,
        currentTaskSet,

        finish = function(err) {
            gulp.removeListener('task_stop', onTaskEnd);
            gulp.removeListener('task_err', onError);
            if(callBack) {
                if(err){
                    callBack(new gutil.PluginError('runSequence', err));
                } else {
                    callBack(err);
                }
            } else if(err) {
                console.log('Error running task sequence:', err);
            }
        },

        onError = function(err) {
            finish(err);
        },
        onTaskEnd = function(event) {
            var idx = currentTaskSet.indexOf(event.task);
            if(idx > -1) {
                currentTaskSet.splice(idx,1);
            }
            if(currentTaskSet.length === 0) {
                runNextSet();
            }
        },

        runNextSet = function() {
            if(taskSets.length) {
                var command = taskSets.shift();
                if(!Array.isArray(command)) {
                    command = [command];
                }
                currentTaskSet = command;
                gulp.start.apply(gulp, command);
            } else {
                finish();
            }
        };

    verifyTaskSets(gulp, taskSets);

    gulp.on('task_stop', onTaskEnd);
    gulp.on('task_err', onError);

    runNextSet();
}

module.exports = runSequence;
