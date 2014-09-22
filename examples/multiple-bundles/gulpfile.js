var gulp = require('gulp');

// Override default options (such as path) here
var customizedOptions = {
    bundles: {
        app: {
            bundler: 'browserify',
            entry: './build/src/app.js',
            output: 'app_bundle.js'
         },
         buttonModule: {
             bundler: 'browserify',
             entry: './build/src/buttonModule.js',
             output: 'buttonBundle.js',
             sfx: true
         }
    }
};

var wGulp = require('wGulp')(gulp, customizedOptions);

// Add your own tasks here
