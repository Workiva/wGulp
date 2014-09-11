var fs = require('fs');
var gulp = require('gulp');
var harness = require('../harness');

describe("analyze subtask", function() {

    it("should generate code complexity report files", function(done) {

        var helper = new Harness(gulp);
        var complexityOutput = helper.options.path.complexity;

        var analyze = require('../../subtasks/analyze')(gulp, helper.options);
        gulp.task('analyze', analyze({cwd: "./test/subtasks/fixtures/js/"}));
        
        gulp.task('run:analyze', ['analyze'], function(){
            if (!fs.existsSync(complexityOutput)) {
                throw new Error("complexity output not found");
            }
            done();
        });

        gulp.start(['run:analyze']);
    });
});
