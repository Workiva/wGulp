var assert = require('assert');
var gulp = require('gulp');
var gutil = require('gulp-util');
var join = require('path').join;
var integration = require('../integration');
var linebyline = require('../linebyline');
var sinon = require('sinon');
var spawn = require('child_process').spawn;


describe('TypeScript definition task', function() {
    it('should discover and centralize external tsd files', function(done) {
        this.timeout(10000);
        var task = 'build';
        var helper = new Integration(gulp, 'tsd', ['tsd']);
        var lineHelper = new Linebyline(gulp);
        var actualPath = join(__dirname, './modes/tsd/api/external.d.ts');
        var expectedPath = join(__dirname, './modes/tsd/fixtures/external.d.ts');
        lineHelper.assertExpectedOutputMatchesExceptLastLine(done, task, actualPath, expectedPath);
    });

    it('should enable typescript source files to reference external and internal tsd files', function(done) {
        this.timeout(10000);
        var task = 'build';
        var helper = new Integration(gulp, 'tsd', ['tsd', 'tsc']);
        var lineHelper = new Linebyline(gulp);
        var actualPath = join(__dirname, './modes/tsd/build/src/app.js');
        var expectedPath = join(__dirname, './modes/tsd/fixtures/app.js');
        lineHelper.assertExpectedOutputMatchesExceptLastLine(done, task, actualPath, expectedPath);
    });

    it('should generate a .gitignore to ignore external tsd files', function(done) {
        this.timeout(10000);
        var task = 'build';
        var helper = new Integration(gulp, 'tsd', ['tsd']);
        var lineHelper = new Linebyline(gulp);
        var actualPath = join(__dirname, './modes/tsd/api/.gitignore');
        var expectedPath = join(__dirname, './modes/tsd/fixtures/apigitignore');
        lineHelper.assertExpectedOutputMatchesExceptLastLine(done, task, actualPath, expectedPath);
    });

    it('should log a warning if the api gitignore file is not gitignored', function(done) {
        this.timeout(10000);
        sinon.spy(gutil, 'log');
        var task = 'build';
        var helper = new Integration(gulp, 'tsd', ['tsd']);
        gulp.task('spec', [task], function() {
            assert.equal(gutil.log.calledOnce, true);
            assert.ok(gutil.log.firstCall.args[0].indexOf('Warning: we recommend adding') > -1);
            gutil.log.restore();
            done();
        });
        gulp.start(['spec']);
    });

    it('should log a warning if a tsd name collision is detected', function(done) {
        this.timeout(10000);
        sinon.spy(gutil, 'log');
        var task = 'build';
        var helper = new Integration(gulp, 'tsd-collision', ['tsd']);
        gulp.task('spec', [task], function() {
            assert.ok(gutil.log.callCount >= 3, 'Two-file collision should result in 3 warning messages');
            assert.ok(
                gutil.log.firstCall.args[0].indexOf('Warning: a collision occurred') > -1,
                'First warning should be the header explaining a collision occurred'
            );
            assert.ok(
                gutil.log.secondCall.args[0].indexOf('lib.d.ts') > -1,
                'Second warning should be the first file in collision'
            );
            assert.ok(
                gutil.log.thirdCall.args[0].indexOf('lib.d.ts') > -1,
                'Third warning should be the second file in collision'
            );
            gutil.log.restore();
            done();
        });
        gulp.start(['spec']);
    });

    it('should not overwrite internal tsd files', function(done) {
        this.timeout(10000);
        var proc = spawn('node', ['test/integration/tsd/internalCollision.proc.js']);
        proc.on('close', function(code) {
            assert.equal(code, 1);
            var lineHelper = new Linebyline(gulp);
            var actualPath = join(__dirname, './modes/tsd-internal-collision/api/internal.d.ts');
            var expectedPath = join(__dirname, './modes/tsd-internal-collision/fixtures/internal.d.ts');
            lineHelper.assertExpectedOutputMatchesExceptLastLineNoTask(done, actualPath, expectedPath);
        });
    });

    it('should log an error if an external tsd collides with an internal tsd', function(done) {
        this.timeout(10000);
        sinon.spy(gutil, 'log');
        var proc = spawn('node', ['test/integration/tsd/internalCollision.proc.js']);

        var errorHeaderLogged = false;
        var errorFileLogged = false;

        proc.stdout.setEncoding('utf8');
        proc.stdout.on('data', function(data) {
            if(!errorHeaderLogged && /Error: The above collision would overwrite/.test(data)) {
                errorHeaderLogged = true;
            } else if (!errorFileLogged && /api\/internal\.d\.ts/.test(data)) {
                errorFileLogged = true;
            }
        });
        proc.on('close', function(code) {
            assert.ok(errorHeaderLogged, 'No error message was output');
            assert.ok(errorFileLogged, 'Internal tsd file was not included in error message');
            done();
        });
    });

});
