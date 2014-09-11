var gulp = require('gulp');
var path = require('path');
var join = path.join;
var harness = require('../harness');
var linebyline = require('../linebyline');

describe("copy task", function() {
    it("should copy globs from src to dest", function(done) {
        this.timeout(5000);
        var task = 'copy:html';
        var helper = new Harness(gulp);
        var lineHelper = new Linebyline(gulp);
        var actualPath = join(__dirname, './build/js/index.html');
        var expectedPath = join(__dirname, './fixtures/js/index.html');

        var copy = require('../../subtasks/copy')(gulp, helper.options);
        gulp.task(task, copy({
            glob: "**/*.html",
            cwd: "./test/subtasks/src/"
        }));

        lineHelper.assertExpectedOutputMatchesExceptLastLine(done, task, actualPath, expectedPath);
    });
});
