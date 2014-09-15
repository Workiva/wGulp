module.exports = function(gulp, defaults, subtasks) {
    var fs = require('fs');

    var taskName = 'library_dist';

    // copy transpiled js from build/ to dist/
    gulp.task(taskName + ':copy:src', subtasks.copy({
        src: [defaults.path.build_src + '/**'],
        dest: defaults.path.dist
    }));

    gulp.task(taskName + ':copy:api', function(){
        // copy definition files for this repo to dist/ by copying everything
        // from api/ that isn't git ignored
        var excludeIgnoredGlob = [];
        try {
            var data = fs.readFileSync(defaults.path.api + '/.gitignore', {encoding: 'utf8'});
            var ignored = data.split('\n');
            ignored.forEach(function(filename) {
                if (filename) {
                    excludeIgnoredGlob.push('!' + defaults.path.api + '/' + filename);
                }
            });
        } catch (e) {
            // silence error
        }
        return gulp.src([].concat(defaults.path.api + defaults.glob.tsd, excludeIgnoredGlob))
            .pipe(gulp.dest(defaults.path.dist));
    });

    gulp.desc(taskName, 'Distribute build results for library');
    gulp.task(taskName, [taskName + ':copy:src', taskName + ':copy:api']);
};
