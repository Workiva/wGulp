var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var chai = require('chai');
var expect = chai.expect;
var join = path.join;
var integration = require('../integration');

describe("vanilla mode integration tests", function() {
    it("should execute all vanilla tasks and generate correct output", function(done) {
        var helper = new Integration(gulp, "vanilla", ['copy:js']);

        gulp.task('example', ['build'], function() {
            if (fs.existsSync(join(__dirname, './modes/vanilla/build/src/Person.d.ts'))) {
                throw new Error("Person.d.ts was incorrectly found");
            }
            if (fs.existsSync(join(__dirname, './modes/vanilla/build/src/Person.js'))) {
                throw new Error("Person.js was incorrectly found");
            }
            var build = "./modes/vanilla/build/src/";
            var fixtures = "./modes/vanilla/fixtures/";
            var actualFile = fs.readFileSync(join(__dirname, build + "pie.js"), 'utf8');
            var expectedFile = fs.readFileSync(join(__dirname, fixtures + "pie.js"), 'utf8');
            expect(actualFile).to.equal(expectedFile);
            done();
        });
        gulp.start(['example']);
    });
});
