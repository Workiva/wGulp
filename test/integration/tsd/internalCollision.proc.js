// This file is intended to run in a child process spawned by the
// actual test suite. It should run a task that should terminate early
// due to a tsd name collision with an internal tsd file.
// The parent process will confirm the exit code of this process and
// carry out the necessary assertions

var gulp = require('gulp');
var integration = require('../../integration');

var task = 'build';
var helper = new Integration(gulp, 'tsd-internal-collision', ['tsd']);
gulp.start([task]);
