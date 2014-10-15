var gulp = require('gulp');
var path = require('path');
var join = path.join;
var harness = require('../harness');
var linebyline = require('../linebyline');

describe("livescript subtask", function() {
    it("should generate js files from livescript src files", function(done) {
        this.timeout(5000);
        var task = 'livescript';
        var helper = new Harness(gulp);
        var lineHelper = new Linebyline(gulp);
        var actualPath = join(__dirname, './build/js/livescript.js');
        var expectedPath = join(__dirname, './fixtures/js/livescript.js');

        var livescript = require('../../src/subtasks/livescript')(gulp, helper.options);
        gulp.task(task, livescript({cwd: "./test/subtasks/src/"}));

        lineHelper.assertExpectedOutputMatchesExceptLastLine(done, task, actualPath, expectedPath);
    });
});
