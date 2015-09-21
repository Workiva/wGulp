/*
 * Copyright 2014-2015 Workiva Inc.
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

module.exports = function(gulp, options, subtasks) {

    var taskname = 'TASKNAME';

    gulp.desc(taskname, 'Describe your task here');

    // TODO if your task can be run completely asynchronously, just remove the done param and invocation
    var fn = function(done) {

        // TODO do your work here

        // If you want to error out, call done('error message'); and return
        // if you kick off an asynchronous task, you can
        // return a promise or stream to sequence this task correctly

        // Generally, you'll probably just return your gulp stream and not use the done function.
        // or you can do whatever you can do in nodeJS here
        done();
    };

    // register the function as an available gulp task
    gulp.task(taskname, fn);
};
