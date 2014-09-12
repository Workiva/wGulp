var gulp = require('gulp');
var path = require('path');
var join = path.join;
var harness = require('../harness');
var fsSync = require('fs-sync');

describe("applyLicense task", function() {
    it("should do an inplace prepend of a license to a file.", function(done) {
        this.timeout(5000);

        // Clean up prior test file if it exists
        var TEST_DIR = 'apply_license';
        try {
            fsSync.remove(join(__dirname, TEST_DIR, 'test.js'));
        } catch(e) {

        }

        fsSync.copy(join(__dirname, TEST_DIR, 'original', 'test.js'), join(__dirname, TEST_DIR, 'test.js'));

        var task = 'applyLicense';
        var helper = new Harness(gulp);
        var lineHelper = new Linebyline(gulp);
        var actualPath = join(__dirname, join(TEST_DIR, 'test.js'));
        var expectedPath = join(__dirname, join(TEST_DIR, 'fixture', 'expectedTest.js'));

        var applyLicense = require('../../subtasks/apply_license')(gulp, helper.options);

        gulp.task(task, applyLicense({
            globs: [join(__dirname, join(TEST_DIR, 'test.js'))],
            license: 'Sample License\n'
        }));

        lineHelper.assertExpectedOutputMatchesExceptLastLine(done, task, actualPath, expectedPath);

    });
});
