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
