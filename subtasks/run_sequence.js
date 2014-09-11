var run_sequence = require('../src/run_sequence');
var _ = require('lodash');

module.exports = function(gulp, defaults){
    return function(tasks) {
        return function (cb) {
            var argArray = _.cloneDeep(tasks).concat(cb);
            argArray.unshift(gulp);
            run_sequence.apply(this, argArray);
        };
    };
};
