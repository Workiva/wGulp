var fs = require('fs');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var join = path.join;
var byline = require('byline');

Linebyline = (function() {

    var linebyline = function(gulp) {
        this.gulp = gulp;
    };

    var assertExpectedOutputMatchesExceptLastLine = function(done, actualPath, expectedPath) {
        var input = fs.createReadStream(actualPath);
        var lineStream = byline(input);
        lineStream.setEncoding('utf8');

        var expectedFile = fs.readFileSync(expectedPath, 'utf8').split(/\r\n|\r|\n/g);
        expectedFile = expectedFile.filter(function(line) {
            return line.length > 0;
        });

        var i = 0;
        var actualFile = [];
        var lineNumber = expectedFile.length - 1;
        lineStream.on('data', function(line) {
            actualFile.push(line);
            if (i < lineNumber) {
                expect(line).to.equal(expectedFile[i]);
            }
            i++;
        });
        lineStream.on('end', function() {
          expect(expectedFile.length).to.equal(actualFile.length);
          done();
        });
    };

    linebyline.prototype.assertExpectedOutputMatchesExceptLastLineNoTask = function(done, actualPath, expectedPath) {
        assertExpectedOutputMatchesExceptLastLine(done, actualPath, expectedPath);
    };

    linebyline.prototype.assertExpectedOutputMatchesExceptLastLine = function(done, task, actualPath, expectedPath) {
        this.gulp.task('example', [task], function() {
            assertExpectedOutputMatchesExceptLastLine(done, actualPath, expectedPath);
        });
        this.gulp.start(['example']);
    };

    return linebyline;

})();
