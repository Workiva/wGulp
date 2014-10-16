var gulp = require('gulp');
var path = require('path');
var join = path.join;
var harness = require('../harness');
var linebyline = require('../linebyline');

describe("coffee subtask", function() {
    it("should generate js files from coffeescript src files", function(done) {
        this.timeout(5000);
        var task = 'coffee';
        var helper = new Harness(gulp);
        var lineHelper = new Linebyline(gulp);
        var actualPath = join(__dirname, './build/js/coffee.js');
        var expectedPath = join(__dirname, './fixtures/js/coffee.js');

        var coffee = require('../../src/subtasks/coffee')(gulp, helper.options);
        gulp.task(task, coffee({cwd: "./test/subtasks/src/"}));

        lineHelper.assertExpectedOutputMatchesExceptLastLine(done, task, actualPath, expectedPath);
    });
});
