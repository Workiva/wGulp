var gulp = require('gulp');

// Override default options (such as path) here
var customizedOptions = {
    bundles: {
        app: {
            bundler: 'jspm',
            sfx: true,
            entry: 'build/src/main',
            output: 'dist/app_bundle.js'
        }
    }
};

var wGulp = require('wGulp')(gulp, customizedOptions);

// Add your own tasks here
