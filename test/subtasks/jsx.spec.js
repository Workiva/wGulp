var gulp = require('gulp');
var harness = require('../harness');

describe("jsx subtask", function() {
    it("should transform jsx to vanilla javascript", function(done) {
        var files = ['react.js'];
        var helper = new Harness(gulp);
        var task = 'jsx';
        var jsx = require('../../src/subtasks/jsx')(gulp, helper.options);
        gulp.task(task, jsx());
        helper.assertTaskGeneratesExpectedFileOutput(done, task, files, 'js');
        done();
    });
});
