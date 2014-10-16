module.exports = function(config) {
    config.set({
        browsers: ["PhantomJS"],
        frameworks: ['jspm', 'jasmine'],
        jspm: {
            loadFiles: ['build/test/**/*.js'],
            serveFiles: ['build/src/**/*.js']
        },
        preprocessors: {
            'build/src/**/*.js': ['coverage']
        },
        reporters: ['progress', 'junit', 'html', 'coverage'],
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
