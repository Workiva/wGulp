module.exports = function(gulp, defaults, subtasks) {

    var taskname = 'tsd';

    gulp.desc(taskname, 'Discover and centralize TypeScript definition files');

    var _ = require('lodash');
    var flatten = require('gulp-flatten');
    var fs = require('fs');
    var gutil = require('gulp-util');
    var mkdirp = require('mkdirp');
    var path = require('path');
    var join = path.join;
    var tap = require('gulp-tap');

    var discoverInternalTaskname = taskname + ':discover:internal';
    var discoverExternalTaskname = taskname + ':discover:external';
    var detectCollisionsTaskname = taskname + ':detectCollisions';
    var copyTaskname = taskname + ':copy';
    var gitignoreTaskname = taskname + ':gitignore';

    var deps = [].concat(defaults.path.dependencies);
    var externalTsdSrc = deps.map(function(dir) {
        return join(dir, defaults.glob.tsd);
    });
    var internalTsdSrc = defaults.path.api + defaults.glob.tsd;

    var internalDefs = [];
    var externalDefs = [];

    function getIgnoredFiles(cwd) {
        try {
            var gitignoreData = fs.readFileSync(path.join(cwd, '.gitignore'), {encoding: 'utf8'});
            return gitignoreData.split('\n');
        } catch (e) {
            return [];
        }
    }

    function getTSDInstalledFiles(root) {
        try {
            var tsdData = fs.readFileSync(path.join(root, 'tsd.json'), {encoding: 'utf8'});
            return Object.keys(JSON.parse(tsdData).installed);
        } catch (e) {
            return [];
        }
    }

    // survey the api directory and discover internal tsd files
    gulp.task(discoverInternalTaskname, function() {
        internalDefs = [];

        // get list of ignored files (ignored means external)
        var ignored = getIgnoredFiles(defaults.path.api);

        // discover internal tsd files in api directory
        return gulp.src(internalTsdSrc)
            .pipe(tap(function(file) {
                // it's internal if it's not ignored
                if (!_.contains(ignored, file.relative)) {
                    internalDefs.push({
                        name: path.basename(file.path),
                        path: file.path,
                        internal: true
                    });
                }
            }));
    });

    // survey the dependency directories and tsd.json to discover external tsd files
    gulp.task(discoverExternalTaskname, [discoverInternalTaskname], function() {
        externalDefs = [];

        // include all external definition files installed via the tsd package manager
        var tsdInstalled = getTSDInstalledFiles(defaults.path.root);
        tsdInstalled.forEach(function(file) {
            externalDefs.push({
                name: file,
                path: path.join(defaults.path.api, file),
                internal: false
            });
        });

        // discover external tsd files in dependency directories
        return gulp.src(externalTsdSrc)
            .pipe(tap(function(file) {
                externalDefs.push({
                    name: path.basename(file.path),
                    path: file.path,
                    internal: false
                });
            }));
    });

    // using the list of internal and external definitions, detect name collisions
    gulp.task(detectCollisionsTaskname, [discoverInternalTaskname, discoverExternalTaskname], function() {
        var dupeMap = {};
        [].concat(internalDefs, externalDefs).forEach(function(def) {
            if (!dupeMap[def.name]) {
                dupeMap[def.name] = [];
            }
            dupeMap[def.name].push(def);
        });

        var collisionsPathMapFn = function(def) {
            // map definition object to its path as a string
            return '\t' + def.path;
        };
        var warnFn = function(warning) {
            // log a gulp warning
            gutil.log(gutil.colors.yellow(warning));
        };
        var internalDefCheck = function(def) {
            // check if a definition is internal and throw if it is to prevent overwriting it
            if (def.internal) {
                gutil.log(gutil.colors.red('Error: The above collision would overwrite this TS definition:'));
                gutil.log(gutil.colors.red('\t' + def.path));
                process.exit(1);
            }
        };

        for (var name in dupeMap) {
            if (dupeMap.hasOwnProperty(name)) {
                if (dupeMap[name].length > 1) {
                    // collision!
                    var collisionWarnings = ['Warning: a collision occurred between the following TS definitions:'];
                    collisionWarnings = [].concat(collisionWarnings, dupeMap[name].map(collisionsPathMapFn));
                    collisionWarnings.forEach(warnFn);

                    // if an internal definition is involved in the collision,
                    // then we should fail to prevent it from being overwritten
                    dupeMap[name].forEach(internalDefCheck);
                }
            }
        }
    });

    // discover all tsd files in dependencies directories and move them to api directory
    gulp.task(copyTaskname, [discoverInternalTaskname, discoverExternalTaskname, detectCollisionsTaskname], function() {
        // ensure the api directory exists
        mkdirp.sync(defaults.path.api);

        // flatten and copy to api directory
        return gulp.src(externalTsdSrc)
            .pipe(flatten())
            .pipe(gulp.dest(defaults.path.api));
    });

    // generate a gitignore for the api directory
    gulp.task(gitignoreTaskname, [discoverInternalTaskname, discoverExternalTaskname, copyTaskname], function() {
        // use the list of external definitions to generate the .gitignore
        var apiGitignore = externalDefs.map(function(def) { return def.name; }).join('\n');
        fs.writeFile(path.join(defaults.path.api, '.gitignore'), apiGitignore);

        // check the project .gitignore to ensure it ignores this generated .gitignore
        var isIgnored = false;
        var target = path.join(defaults.path.api, '.gitignore').replace('./', '');
        var ignored = getIgnoredFiles(defaults.path.root);
        ignored.forEach(function(file) {
            if (file === target) {
                isIgnored = true;
                return false;
            }
        });

        if (!isIgnored) {
            var gitignoreWarning = 'Warning: we recommend adding `' + target + '` to this project\'s gitignore';
            gutil.log(gutil.colors.yellow(gitignoreWarning));
        }
    });

    gulp.task(taskname, [
        discoverInternalTaskname,
        discoverExternalTaskname,
        detectCollisionsTaskname,
        copyTaskname,
        gitignoreTaskname
    ]);
};
