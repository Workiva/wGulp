var gulp = require('gulp');
var harness = require('../harness');

describe("tsc subtask", function() {
    it("should transform TypeScript to vanilla javascript", function(done) {
        this.timeout(5000);
        var src = ['app.js'];
        var task = 'ts';
        var helper = new Harness(gulp);

        var tsc = require('../../subtasks/tsc')(gulp, helper.options);
        gulp.task(task, tsc());
        helper.assertTaskGeneratesExpectedFileOutput(done, task, src, 'js');
    });
});
