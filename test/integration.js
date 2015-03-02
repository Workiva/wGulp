var fs = require('fs');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var join = path.join;

Integration = (function() {

    var integration = function(gulp, mode, buildTasks, distTasks) {
        gulp.desc = require('../src/desc');
        this.options = JSON.parse(fs.readFileSync('src/gulpconfig.json', 'utf8'));
        if(buildTasks){
            this.options.taskTree.build = buildTasks;
        }
        if(distTasks){
            this.options.taskTree.dist = distTasks;
        }
        this.options.taskTree.bundle = ['jsx', 'tsc'];
        this.options.taskTree.jsx = ['clean'];
        this.options.taskTree.tsc = ['clean', 'tsd'];
        this.options.path.root = "./test/integration/modes/" + mode + "/";
        this.options.path.src = "./test/integration/modes/" + mode + "/src/";
        this.options.path.test = "./test/integration/modes/" + mode + "/test/";
        this.options.path.build = "./test/integration/modes/" + mode + "/build/";
        this.options.path.buildSrc = "./test/integration/modes/" + mode + "/build/src/";
        this.options.path.buildStyles = "./test/integration/modes/" + mode + "/build/css/";
        this.options.path.buildTest = "./test/integration/modes/" + mode + "/build/test/";
        this.options.path.dist = "./test/integration/modes/" + mode + "/dist/";
        this.options.path.api = "./test/integration/modes/" + mode + "/api/";
        this.options.path.report = "./test/integration/modes/" + mode + "/build/coverage/";
        this.options.path.styles = "./test/integration/modes/" + mode + "/sass/";
        this.options.path.docs = "./test/integration/modes/" + mode + "/build/docs/";
        this.options.path.dependencies = [
            "./test/integration/modes/" + mode + "/jspm_packages/"
        ];
        this.options.jshintrc = "./src/template/.jshintrc";
        this.options.tslintrc = "./src/template/tslint.json";
        this.options.taskTree.preTest = ["react", "ts", "tstest"];
        this.options.bundles = {
            browserify: {
                bundler: "browserify",
                entry: "./test/integration/modes/browserify/build/src/app.js",
                output: "app.js"
            }
        };
        require('../index')(gulp, this.options);
    };

    return integration;

})();
