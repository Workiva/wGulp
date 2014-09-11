module.exports = function(gulp, defaults) {
    var join = require('path').join;
    var gulpHeader = require('gulp-header');
    var fs = require('fs');
    var DEFAULT_LICENSE = join(__dirname, '../src/licenses/APACHE_HEADER.txt');
    gulp.desc('applyLicense', 'Applies a license file to the top of source files. Apache 2.0 header by default.');

    var defaultGlobs = [];
    [defaults.path.src, defaults.path.styles]
        .forEach(function(srcDir) {
            defaults.glob.sources.forEach(function(sourceGlob) {
                defaultGlobs.push(srcDir + sourceGlob);
            });
        });

    return function(config) {
        config = config || {};

        var globs = config.globs || defaultGlobs;
        var license = config.license || (fs.existsSync(DEFAULT_LICENSE) ? fs.readFileSync(DEFAULT_LICENSE) : 'NO LICENSE');

        return function() {
            return(gulp.src(globs,  {base: './'}) // Use base to preserve entire relative path so that they can be overriden
                    .pipe(gulpHeader(license))
                    .pipe(gulp.dest('./')));
        }
    }
};