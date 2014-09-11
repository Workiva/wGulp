var gulp = require('gulp');

// Override default options (such as path) here
var customizedOptions = {
    bundles: {
        app: {
            bundler: 'browserify',
            entry: './build/src/app.js',
            output: 'app_bundle.js'
         }
    }
};

var wGulp = require('wGulp')(gulp, customizedOptions);

// Add your own tasks here
