var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var join = path.join;
var chai = require('chai');
var expect = chai.expect;
var harness = require('../harness');

describe("minify subtask", function() {
    it("should generate minified output", function(done) {
        var task = 'minify:js';
        var helper = new Harness(gulp);

        var minify = require('../../src/subtasks/minify_js')(gulp, helper.options);
        minify({
            src: "./test/subtasks/minify/app.js",
            dest: "./test/subtasks/minify/"
        })();

        var actualPath = './minify/app.min.js';
        var expectedPath = './fixtures/minify/app.min.js';
        var actualFile = fs.readFileSync(join(__dirname, actualPath), 'utf8');
        var expectedFile = fs.readFileSync(join(__dirname, expectedPath), 'utf8');
        expect(actualFile).to.equal(expectedFile);
        done();
    });
});
