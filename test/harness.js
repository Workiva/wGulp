var fs = require('fs');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var join = path.join;

Harness = (function() {

    var harness = function(gulp) {
        this.gulp = gulp;
        this.gulp.desc = require('../src/desc');
        this.options = JSON.parse(fs.readFileSync('src/gulpconfig.json', 'utf8'));
        this.options.path.src = "./test/subtasks/src/";
        this.options.path.test = "./test/subtasks/test/";
        this.options.path.build = "./test/subtasks/build/";
        this.options.path.build_src = "./test/subtasks/build/js/";
        this.options.path.build_test  = "./test/subtasks/build/test/";
        this.options.path.test_ts_dir = "./test/subtasks/build/test/";
        this.options.path.dist = "./test/subtasks/dist/";
        this.options.path.coverage = "./test/subtasks/report/coverage/";
        this.options.path.complexity = "./test/subtasks/report/complexity/";
        this.options.path.docs = "./test/subtasks/docs/";
        this.options.ts.noLib = true;
        this.options.tslintrc = "./src/template/tslint.json";
        require('../src/bundling/build_bundle_tasks')(gulp, this.options);
    };

    harness.prototype.assertTaskGeneratesExpectedFileOutput = function(done, task, files, prefix) {
        var actualPath, expectedPath, actualFile, expectedFile;
        this.gulp.task('example', [task], function() {
            for (var i = 0; i < files.length; i++) {
                actualPath = './subtasks/build/' + prefix + '/' + files[i];
                expectedPath = './subtasks/fixtures/' + prefix + '/' + files[i];
                actualFile = fs.readFileSync(join(__dirname, actualPath), 'utf8');
                expectedFile = fs.readFileSync(join(__dirname, expectedPath), 'utf8');
                expect(actualFile).to.equal(expectedFile);
            }
            done();
        });
        this.gulp.start(['example']);
    };

    return harness;

})();
