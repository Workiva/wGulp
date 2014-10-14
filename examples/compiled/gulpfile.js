var gulp = require('gulp');

// Override default options (such as path) here
var customizedOptions = {
    taskTree: {
        build: ['copy:js', 'tsc'],
        default: ['build', 'analyze', 'jsdoc']
    }
};

var wGulp = require('wGulp')(gulp, customizedOptions);

// Add your own tasks here
