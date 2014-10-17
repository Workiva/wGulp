module.exports = function(config) {
    config.set({
        browsers: ["PhantomJS"],
        frameworks: ['jspm', 'jasmine'],
        jspm: {
            loadFiles: ['build/test/**/*.js'],
            serveFiles: ['build/src/**/*.js', 'build/src/**/*.map']
        },
        reporters: ['progress', 'junit', 'html'],
        junitReporter: {
            outputFile: './report/tests/test-results.xml'
        },
        coverageReporter: {
            dir: 'report/coverage/'
        },
        singleRun: false,
        autoWatch: true
    });
};
