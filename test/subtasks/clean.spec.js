var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var join = path.join;
var chai = require('chai');
var expect = chai.expect;
var harness = require('../harness');

describe("clean subtask", function() {
    var helper, distDirPath, buildDirPath, reportDirPath, coverageDirPath,
        complexityDirPath, docsDirPath, directories;

    beforeEach(function(){
        helper = new Harness(gulp);
        distDirPath = join(__dirname, './dist/');
        buildDirPath = join(__dirname, './build/');
        reportDirPath = join(__dirname, './report/');
        coverageDirPath = join(__dirname, './report/coverage/');
        complexityDirPath = join(__dirname, './report/complexity/');
        docsDirPath = join(__dirname, './docs/');
        directories = [
            distDirPath,
            buildDirPath,
            reportDirPath,
            coverageDirPath,
            complexityDirPath,
            docsDirPath
        ];
    });

    it("should remove build and dist directories by default", function(done) {

        for (var i = 0; i < directories.length; i++) {
            if (!fs.existsSync(directories[i])) {
                console.log("making dir: " + directories[i]);
                fs.mkdirSync(directories[i]);
            }
        }
        
        directories = [
            distDirPath,
            buildDirPath
        ];

        var clean = require('../../subtasks/clean')(gulp, helper.options);
        clean()(function(){
            for (var i = 0; i < directories.length; i++) {
                if (fs.existsSync(directories[i])) {
                    var message = "the " + directories[i] + " directory was not removed";
                    throw new Error(message);
                }
            }
            if (!fs.existsSync(reportDirPath)) {
                throw new Error("report directory was removed by mistake!");
            }
            done();
        });

    });

    it("should remove directories passed in at call-time", function(done){
        for (var i = 0; i < directories.length; i++) {
            if (!fs.existsSync(directories[i])) {
                console.log("making dir: " + directories[i]);
                fs.mkdirSync(directories[i]);
            }
        }
        
        directories = [
            reportDirPath,
            coverageDirPath
        ];

        var clean = require('../../subtasks/clean')(gulp, helper.options);
        clean(directories)(function(){
            for (var i = 0; i < directories.length; i++) {
                if (fs.existsSync(directories[i])) {
                    var message = "the " + directories[i] + " directory was not removed";
                    throw new Error(message);
                }
            }
            if (!fs.existsSync(buildDirPath)) {
                throw new Error("build directory was removed by mistake!");
            }
            if (!fs.existsSync(distDirPath)) {
                throw new Error("dist directory was removed by mistake!");
            }
            done();
        });
    });
});
