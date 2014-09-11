var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var chai = require('chai');
var expect = chai.expect;
var join = path.join;
var integration = require('../integration');

describe("compiled mode integration tests", function() {
    it("should execute all compiled tasks and generate correct output", function(done) {
        var helper = new Integration(gulp, "compiled", [['copy:js', 'tsc']]);

        gulp.task('example', ['build'], function() {
            var build = "./modes/compiled/build/src/";
            var fixtures = "./modes/compiled/fixtures/";
            var files = ["pie.js", "Person.js"];
            var message, actualPath, expectedPath, actualFile, expectedFile;
            for (var i = 0; i < files.length; i++) {
                actualPath = build + files[i];
                expectedPath = fixtures + files[i];
                actualFile = fs.readFileSync(join(__dirname, actualPath), 'utf8');
                expectedFile = fs.readFileSync(join(__dirname, expectedPath), 'utf8');
                expect(actualFile).to.equal(expectedFile);
            }
            done();
        });
        gulp.start(['example']);
    });
});

