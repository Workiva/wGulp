wGulp - Convention Over Configuration
======================================

> Opinionated Suite of Gulp Tasks for JavaScript and TypeScript

wGulp aims to lessen the start-up time of a new JavaScript project by providing everything you need out of the box, while making it easy to customize defaults when needed.

#### Why follow conventions?

It's easy, it's sensible, it gets you cool features for free, it frees up your mind to actually think about interesting problems like your business logic.

Quick-start
===============

#### Installation
```bash
# Install gulp globally
$ npm install -g gulp

# Create a package.json if you don't have one
$ npm init

  # Add wGulp as a dependency
$ npm install webfilings/wGulp --save-dev

# Create your initial gulpfile.js
$ ./node_modules/.bin/gulp-init
```
> Pro-tip: Add ./node_modules/.bin to your path to be able to run `gulp-init` without specifying the path

```
gulp help
```

Using wGulp
===========

### Expected/Default project structure

The best and quickest way to get value out of wGulp is to adhere to a standard directory structure (which can be overridden for legacy projects).

* `./src` - TypeScript or JavaScript source code
* `./test` - TypeScript or JavaScript test specs, written with Jasmine
* `./sass` - Default location for OOCSS styles
* `./build` - Assets generated via build
    - `./build/src` - Destination for transpiled/copied source code (from `./src`)
    - `./build/test` - Destination for transpiled/copied test spec code (from `./test`)
    - `./build/css` - Destination for compiled/copied css/sass/scss/less code (from `./sass`)
* `./dist` - Destination for generated distribution assets
* `./docs` - Destination for generated documentation
* `./report` - Destination for generated reports (coverage, complexity, test)

### See what's included out of the box
```
gulp help
```

Out of the box wGulp provides a *lot* of functionality. It is a collection of best-of-breed tools, patterns, and practices that should answer any need you have for developing a JavaScript/TypeScript/CoffeeScript/FutureScript library or application.

### Main Tasks
    analyze - Generate code complexity report
    applyLicense - Prepends an Apache 2.0 license header to source files in src and sass. Does *not* do CoffeeScript yet 
    build - Build. Execute the tasks specified in build_tasks
    bundle - Generate all bundles specified in "bundles"
    bundle:<bundleName> - Create a bundle using the <bundleName> options specified in "bundles"
    clean - Clean up the build and dist directories
    coffee - Transpile CoffeeScript to JavaScript
    compass - compile sass css (using compass)
    copy:html - Copy html templates in ./src/ to ./build/src/
    copy:js - Copy JavaScript files in ./src/ to ./build/src/
    copy:jstest - Copy JavaScript files in ./test/ to ./build/test/
    cover - Generate and view code coverage report
    customize - Copy the standard config files to your project for customization
    default - Execute the tasks specified in default_tasks
    dist - Create a distribution, execute the tasks specified in dist_tasks
    help - List the available tasks
    jsdoc - Generate JSdoc
    jshint - Validate JS files with jshint
    jsx - Compile React JSX
    lint - Validate source with jshint and tslint
    minify - Minifiy CSS and JS files in ./dist/
    minify:css - Minify CSS files in ./dist/
    minify:js  - Minify JS files in ./dist/
    qa - Run default tasks and start serve
    sass - compile sass css
    serve - Open the project website
    test - Execute tasks specified in test_tasks and use Karma to run the tests
    test:jasmine - Execute tasks specified in test_tasks and use node-jasmine to run the tests
    tsc - Compile TypeScript
    tslint - Validate TS files with tslint
    tsc:test - Compile TS test files from ./test/ to ./build/test/
    watch - Alias for watch:build
    watch:analyze - Run analyze task and rerun when source changes
    watch:build - Run build task and rerun when source changes
    watch:cover - Run cover task and recalculate coverage when source or test files change
    watch:jsdoc - Run jsdoc task and rerun when source changes
    watch:lint - Run lint task and rerun when source or test files change
    watch:test - Run test task and rerun when source or test files change

### Build, test, dist, and default tasks
Tasks `build`, `dist`, `test`, and `default` can be modified by overriding the task lists in the config (i.e. `build_tasks`).
Here are the defaults:

```js
    build_tasks: ['clean', ['lint'], ['jsx', 'tsc', 'copy:js'], 'bundle'],
    test_tasks: ['build', ['tsc:test', 'copy:jstest']],
    dist_tasks: ['clean', 'build', 'minify'],
    default_tasks: ['test', ['analyze', 'jsdoc']],
```

This uses runSequence to execute the tasks. Read more about this in the [runSequence subtask](#runsequence).

### Bundling

wGulp provides a bundling framework to create JavaScript bundles with either
[jspm](https://github.com/jspm/jspm-cli) *(recommended)* or [browserify](https://github.com/substack/node-browserify) *(for legacy support only)*.

Adding bundle configurations is easy! Here is a simple example using jspm:

```js
    bundles: {
        app: {
            bundler: "jspm",
            entry: "./build/src/app",
            output: "app_bundle.js"
        }
    }
```

#### Bundle options

    bundler - [required] "browserify" or "jspm"
    entry - [required] The single entry point of the application/module to bundle
    output - [required] Name of the output file
    debug - [optional - applies to browserify only] true or false
    include - [optional] Array of module names to additionally include
    exclude - [optional] Array of module names to exclude from the bundle
    external - [optional - applies to browserify only] Array of module names to externalize
    add_to_config - [optional - applies to jspm only] true or false. Writes bundle information to config.js, defaults to true


## Subtasks

wGulp provides a set of functions to perform common tasks each with some happy defaults.
These functions are exported on the wGulp module so that you can use them to create customized gulp tasks.

Here is an example of using one of these subtasks:

```js
gulp.task('copy:release', wGulp.copy({cwd: "dist", dest: "release"}));
```

Each subtasks has some common arguments that allow you to override the defaults.

    src - if this is specified, it will be passed into gulp.src()
    glob - used if src is not specified, specifies a glob to match
    cwd - used if src is not specified, specifies the directory to match the glob in
    dest - directory the resulting files should be put in

wGulp currently has these subtasks:

##### analyze
Analyze code complexity with plato.

##### apply_license
Given a list of glob patterns, and a license string this will prepend all matching files with said license. Does nothing
else intelligent at this point. Default behavior is to apply Apache 2.0 header to sources specified in defaults.glob.sources
```
gulp.task(task, wfgulp.applyLicense({
    globs: ['**/*.js', '**/*.css'],
    license: 'Sample License\n'
}));
```

##### clean
Remove directories and/or files. This subtask does not take the standard/common arguments. Simply pass an array of paths to remove. Removes build and dist by default.
```
gulp.task('clean', wGulp.clean(['./build', './dist']));
```

##### coffee
Transpile code from CoffeeScript to JavaScript.
Takes additional argument `bare` which defaults to `true` and is passed into gulp-coffee.

##### compass
Compile SASS using compass. Takes a few custom args:

    config_file - Path to compass config file. Defaults to config's "compass_config"
    include_paths - Array of paths to include. Defaults to config's "path.style_include_paths"

##### concat
Concatenate JS files. Takes one custom arg:

    outfile - Name of the resulting file. Defaults to 'concat.js'

##### connect
Start a server from the root of the project. Takes a few custom args:

    livereload - Whether or not to enable livereload. Defaults to true
    port - The port number to serve from. Defaults to config's "port"

##### copy
Copy file from one place to another. Takes one custom arg:

    changed - Whether or not to operate only on changed files. Defaults to false

##### jasmine
Run tests with the node jasmine runner (not karma).

##### jsdoc
Generate docs using jsdoc

##### jshint
Run js code through the jshint linter. Takes one custom arg:

    config_file - Path to jshint config file. Defaults to config's "jshintrc"
    emitError - Whether or not to fail/exit on error. Defaults to true

##### jsx
Compile React jsx code into JavaScript.

##### minify_css
Minifies CSS code.

##### minify_js
Minifies JS code.

##### runSequence
Run a set of tasks in sequence. Does not take standard args. Instead, pass an array of tasks to execute: `[["react", "ts", "js"], "bundle:app"]`

Tasks in the base-level list will run sequentially. Tasks within inner lists will run in parallel. In this example, `react`, `ts`, and `js` will all run in parallel, and when they are all done, `bundle:app` will run.

##### sass
Compile SASS into CSS using gulp-sass. Takes one custom arg:

    include_paths - Array of paths to include. Defaults to config's "path.style_include_paths"

##### tsc
Compile Typescript code into JavaScript. Takes one custom arg:

    options - Set of Typescript config options. Defaults to config's "ts"

##### tslint
Lint TypeScript files. Takes one custom arg:

    config_file - Path to tslint config file. Defaults to config's "tslintrc"
    emitError - Whether or not to fail/exit on error. Defaults to true


## Testing with wGulp
The default testing configuration relies on the jspm module loader to dynamically load test and source files. In order to utilize this functionality, you will need to install jspm:

`npm install jspm@0.7.0-beta.9 -g`

>**Note:** You'll want to use the beta.9 version for now until a stable 0.7.0 is released.

After installing jspm, run `jspm init` and accept the defaults. Now you should be able to run tests successfully.

If you do not want to use jspm to load your tests and instead would like to rely on browserify to bundle before testing, take a look at the `browserify-with-karma` example. Use a karma.conf.js that looks like the one in that example project.

## Customization
You can now customize the configuration of wGulp by editing `gulpfile.js`:

```js
// Override default options (such as path) here
var customizedOptions = {};

var wGulp = require('wGulp')(gulp, customizedOptions);
```

These configuration options will simply override wGulp's default values.
A full set of configuration options (and their defaults) can be found in [`wGulp/src/gulpconfig.json`](src/gulpconfig.json)

### Overriding Default Project Structure

Any of these paths can be overridden with your custom configuration and the default tasks will still work. This is what the default path config looks like:

```js
    path: {
        src: "./src/",
        test: "./test/",
        build: "./build/",
        build_src: "./build/src/",
        build_styles: "./build/css/",
        build_test: "./build/test/",
        dist: "./dist/",
        coverage: "./report/coverage/",
        complexity: "./report/complexity/",
        docs: "./docs/",
        styles: "./sass/",
        style_include_paths: []
    }
```

Perhaps you want to change the location of your OOCSS to be within your `src` directory. Here is what that would look like in `gulpfile.js`:

```js
// Override default options (such as path) here
var customizedOptions = {
    path: {
        styles: "./src/sass/"
    }
};
```
