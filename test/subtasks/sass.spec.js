var gulp = require('gulp');
var path = require('path');
var join = path.join;
var harness = require('../harness');
var linebyline = require('../linebyline');

describe("sass subtask", function() {
    it("should compile sass into a single css file", function(done) {
        this.timeout(5000);
        var task = 'sass';
        var helper = new Harness(gulp);
        var lineHelper = new Linebyline(gulp);
        var actualPath = join(__dirname, './build/css/app.css');
        var expectedPath = join(__dirname, './fixtures/css/sass.css');

        var sass = require('../../src/subtasks/sass')(gulp, helper.options);
        gulp.task(task, sass({
            cwd: "./test/subtasks/src/styles/",
            dest: "./test/subtasks/build/css/",
            includePaths: []
        }));
        lineHelper.assertExpectedOutputMatchesExceptLastLine(done, task, actualPath, expectedPath);
    });
});
