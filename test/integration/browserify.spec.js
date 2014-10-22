var gulp = require('gulp');
var path = require('path');
var join = path.join;
var integration = require('../integration');
var linebyline = require('../linebyline');
var bundle_browserify = require('../../src/bundling/bundle_browserify');


describe("browserify bundler", function() {
    it("should bundle source into expected output", function(done) {
        this.timeout(10000);
        var task = 'build';
        var helper = new Integration(gulp, "browserify", ['jsx', 'tsc', 'bundle']);
        var lineHelper = new Linebyline(gulp);
        var actualPath = join(__dirname, './modes/browserify/dist/app.js');
        var expectedPath = join(__dirname, './modes/browserify/fixtures/app.js');
        lineHelper.assertExpectedOutputMatchesExceptLastLine(done, task, actualPath, expectedPath);
    });
});
