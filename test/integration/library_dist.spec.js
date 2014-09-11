var gulp = require('gulp');
var join = require('path').join;
var integration = require('../integration');
var linebyline = require('../linebyline');

describe('Library Distribution definition task', function() {
    it('should move internal d.ts file to dist', function(done) {
        this.timeout(10000);
        var task = 'dist';
        var helper = new Integration(gulp, 'library_dist',
            ["tsd", ["jsx", "tsc", "copy:js"]],
            ['build', 'library_dist']);
        var lineHelper = new Linebyline(gulp);
        var actualPath = join(__dirname, './modes/library_dist/dist/internal.d.ts');
        var expectedPath = join(__dirname, './modes/library_dist/fixtures/_dist/internal.d.ts');

        lineHelper.assertExpectedOutputMatchesExceptLastLine(done, task, actualPath, expectedPath);
    });

    it('should move the transpiled file over and ensure there is no sourceMapURL', function(done) {
        this.timeout(10000);
        var task = 'dist';
        var helper = new Integration(gulp, 'library_dist',
            ["tsd", ["jsx", "tsc", "copy:js"]],
            ['build', 'library_dist']);
        var lineHelper = new Linebyline(gulp);
        var actualPath = join(__dirname, './modes/library_dist/dist/app.js');
        var expectedPath = join(__dirname, './modes/library_dist/fixtures/_dist/app.js');

        lineHelper.assertExpectedOutputMatchesExceptLastLine(done, task, actualPath, expectedPath);
    });
});
