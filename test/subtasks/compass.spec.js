var gulp = require('gulp');
var path = require('path');
var join = path.join;
var harness = require('../harness');
var linebyline = require('../linebyline');

describe("compass task", function() {
    it("should compile sass into a single css file", function(done) {
        this.timeout(5000);
        var task = 'compass';
        var helper = new Harness(gulp);
        var lineHelper = new Linebyline(gulp);
        var actualPath = join(__dirname, './build/css/app.css');
        var expectedPath = join(__dirname, './fixtures/css/compass.css');

        helper.options.compass_config = "";

        var compass = require('../../subtasks/compass')(gulp, helper.options);
        gulp.task(task, compass({
            config_file: "",
            import_path: [],
            cwd: "./test/subtasks/src/styles/",
            dest: "./test/subtasks/build/css/"
        }));

        lineHelper.assertExpectedOutputMatchesExceptLastLine(done, task, actualPath, expectedPath);
    });
});
