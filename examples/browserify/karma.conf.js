module.exports = function(karma) {
    karma.set({
        browsers: ["Chrome"],
        frameworks: ['jasmine', 'browserify'],
        browserify: {
            debug: true,
            files: ['./build/test/**/*.spec.js', './build/test/**/*.Spec.js']
        },
        preprocessors: {
            '/**/*.browserify': ['browserify']
        },
        reporters: ['progress', 'html']
    });
};
