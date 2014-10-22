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

module.exports = function(options, key){
    var _ = require('lodash');
    var depsEntry = options.taskTree[key];
    if(_.isArray(depsEntry)){
        return depsEntry;
    } else if(_.isObject(depsEntry)){
        var baseTasks = depsEntry.tasks;
        baseTasks = _.difference(baseTasks, depsEntry.exclude || []);
        baseTasks = _.union(baseTasks, depsEntry.include || []);
        return baseTasks;
    }
};
