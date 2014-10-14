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
