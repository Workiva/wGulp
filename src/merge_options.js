module.exports = function(localOptions, options) {
    var _ = require('lodash');

    _.merge(options, localOptions, function(a, b) {
        if (_.isArray(a)) {
            return _.clone(b)
        }
    });

    return options;
};