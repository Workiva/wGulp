var fs = require('fs');
var gulp = require('gulp');
var harness = require('../harness');

describe("jsdoc subtask", function() {

    it("should generate JSDoc files", function(done) {

        var helper = new Harness(gulp);
        var docOutput = helper.options.path.docs;

        var jsdoc = require('../../subtasks/jsdoc')(gulp, helper.options);
        jsdoc({cwd: "./test/subtasks/fixtures/coverage/js/"})();
        if (!fs.existsSync(docOutput)) {
            throw new Error("JSDoc output not found");
        }
        done();
    });
});
