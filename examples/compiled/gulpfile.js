var gulp = require('gulp');

// Override default options (such as path) here
var customizedOptions = {
    build_tasks: ['copy:js', 'tsc'],
    default_tasks: ['build', ['analyze', 'jsdoc']]    
};

var wGulp = require('wGulp')(gulp, customizedOptions);

// Add your own tasks here
