wGulp - Convention Over Configuration
======================================

> Opinionated Suite of Gulp Tasks for JavaScript and TypeScript

wGulp aims to lessen the start-up time of a new JavaScript project by providing everything you need out of the box, while making it easy to customize defaults when needed.

#### Why follow conventions?

It's easy, it's sensible, it gets you cool features for free, it frees up your mind to actually think about interesting problems like your business logic.

#### Upgrading wGulp?

Take a look at the [release notes](https://github.com/Workiva/karma-jspm/releases/tag/1.0.0). We will publish any breaking changes there.

### Table of Contents

- [Quick-start](#quick-start)
- [Using wGulp](#using-wgulp)
  - [Expected/Default project structure](#expecteddefault-project-structure)
  - [See what's included out of the box](#see-whats-included-out-of-the-box)
    - [Main Tasks](#main-tasks)
    - [Task Dependency Tree](#task-dependency-tree)
    - [Bundling](#bundling)
    - [Centralized APIs with TypeScript Definition Files](#centralized-apis-with-typescript-definition-files)
  - [Testing with wGulp](#testing-with-wgulp)
- [Extending wGulp](#extending-wgulp)
  - [Subtasks](#subtasks)
  - [Customization](#customization)

Quick-start
===============

#### Installation
```bash
# Install gulp globally
$ npm install -g gulp

# Create a package.json if you don't have one
$ npm init

# Add wGulp as a dependency
$ npm install workiva/wGulp --save-dev

# Create your initial gulpfile.js
$ ./node_modules/.bin/gulp-init

# Initialize jspm
$ jspm init
$ jspm install
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
* `./api` - TypeScript definition files (see [Centralized APIs with TypeScript Definition Files](#centralized-apis-with-typescript-definition-files))
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
    livescript - Transpile LiveScript to JavaScript
    minify - Minifiy CSS and JS files in ./dist/
    minify:css - Minify CSS files in ./dist/
    minify:js  - Minify JS files in ./dist/
    qa - Run default tasks and start serve
    sass - compile sass css
    serve - Open the project website
    test - Execute tasks specified in test_tasks and use Karma to run the tests
    test:jasmine - Execute tasks specified in test_tasks and use node-jasmine to run the tests
    tsc - Compile TypeScript
    tsd - Discover and centralize TypeScript definition files
    tslint - Validate TS files with tslint
    tsc:test - Compile TS test files from ./test/ to ./build/test/
    watch - Alias for watch:build
    watch:analyze - Run analyze task and rerun when source changes
    watch:build - Run build task and rerun when source changes
    watch:cover - Run cover task and recalculate coverage when source or test files change
    watch:jsdoc - Run jsdoc task and rerun when source changes
    watch:lint - Run lint task and rerun when source or test files change
    watch:test - Run test task and rerun when source or test files change

### Task Dependency Tree
Tasks in gulp can wait until other tasks finish by designating those tasks as dependencies. We've extracted that functionality into a single configuration option called `taskTree`.
Here are some defaults for your reference:

```js
taskTree: {
    build: ['clean', 'lint', 'tsd', 'jsx', 'tsc', 'copy:html', 'copy:js', 'sass'],
    bundle: ['clean', 'build'],
    default: ['clean', 'build', 'test', 'analyze', 'jsdoc', 'dist'],
    dist: ['clean', 'build', 'minify', 'bundle', 'library_dist'],
    preTest: ['build', 'tsc:test', 'copy:jstest'],
    test: ['preTest', 'karma'],
    ...
}
```

The rest of the tree can be found in [`wGulp/src/gulpconfig.json`](src/gulpconfig.json).

You can override any portion of the tree to alter which tasks cause other tasks to run. Say you want to add a task called `myCustomTask` to build. You can simply copy the array from above and add it:

```js
taskTree: {
    build: ['clean', 'lint', 'tsd', 'jsx', 'tsc', 'copy:html', 'copy:js', 'sass', 'myCustomTask'],
    ...
}
```

But that gets pretty verbose. Because of that annoyance we offer alternative syntax for including and excluding tasks from the default dependency arrays.

```js
taskTree: {
    build: {
        include: ['myCustomTask']
    }
    ...
}
```

The object form of this configuration accepts the `include` and `exclude` keys as arrays.

Here are some more examples of this kind of configuration:

##### Not a TypeScript project?
Then you may want to exclude the TypeScript specific tasks:

```js
taskTree: {
    build: {
        exclude: ['tsd', 'tsc']
    },
    preTest: {
        exclude: ['tsc:test']
    }
    ...
}
```

##### Not a library?
Then you may want to exclude the `library_dist` task from dist:

```js
taskTree: {
    dist: {
        exclude: ['library_dist']
    }
    ...
}
```

#### Using the Dependency Tree in a Custom Task
Perhaps you want to utilize the dependency tree when defining your own task. wGulp exposes the `getDeps` function for this purpose.

```js
var customizedOptions = {
    taskTree: {
        'copy:dist': ['clean', 'build']
    }
}
var wGulp = require('wGulp')(gulp, customizedOptions);

// Add your own tasks here
gulp.task('copy:dist', wGulp.getDeps('copy:dist'), wGulp.copy({
    src: ['path/to/custom/file'],
    dest: wGulp.config.paths.dist    
}));

```

The `getDeps` function on the wGulp object simply takes the key of the task to lookup as an argument.


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
    sfx - [optional - applies to jspm only] If true, create a [self-executing bundle](https://github.com/jspm/jspm-cli#4-creating-a-self-executing-bundle)


### Centralized APIs with TypeScript Definition Files

Maintaining statically typed APIs speeds up development, enables static code analysis, and builds an inherent contract between modules.
TypeScript definition files are the recommended way to establish these APIs, but using them becomes tricky when consuming from multiple sources.

There are two different sources for TS definitions:

* Internal - project specific TS definitions that should be source controlled
* External - TS definitions installed with third-party packages (found in `node_modules/` or `jspm_packages/` for example), or from [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) via the `tsd` package manager

To make usage consistent, all TS definitions should be centralized in an API directory (`./api/`), but only the internal definitions should be source controlled.

This can be accomplished like so:

#### Internal Definitions

Internal TS definitions simply live in `./api/` and should be committed.

#### External Definitions

DefinitelyTyped definitions should be installed to `./api/` by configuring the `path` option in `tsd.json`.

> This is the default setting if you build your project with the [yeoman wGulp generator](https://github.com/Workiva/generator-wGulp).

```json
{
  "version": "v4",
  "repo": "borisyankov/DefinitelyTyped",
  "ref": "master",
  "path": "api",
  "bundle": "typings/tsd.d.ts",
  "installed": {}
}
```

TS definitions distributed with your project's dependencies will be automatically discovered and moved to `./api/` during the `tsd` task.

This should rarely be needed (convention over configuration), but the dependency directories that are searched during the `tsd` task can be configured by changing the `dependencies` path option (see [Overriding Default Project Structure](#overriding-default-project-structure)).

#### The `tsd` Task

The `tsd` task will take care of the following:

* Discovering all third-party TS definitions and moving them to `./api/`
* Generating an `./api/.gitignore` file to ignore all external definitions (including those from DefinitelyTyped)

**Notes:**
> If two or more external definitions collide (have the same filename), the task will warn you.
>
> If any external definition collides with an internal definition, the task will warn you and terminate early to prevent overwriting the internal definition.

#### Example

To illustrate why this centralized API pattern is effective, consider the following example.

**File Structure**
```
|- api
|  \- application.d.ts
|- jspm_packages
|  |- dependency (provides its own tsd)
|  |  |- lib.d.ts
|  |  \- lib.js
|  \- lodash (does not provide a tsd)
|     \- lodash.js
|- src
|  \- application.ts
\- tsd.json (sets `path` to ./api/)
```

Assume the application wants to get type info for its own code, the dependency that provides its own tsd, and lodash.
The application's tsd and the DefinitelyTyped definitions (once installed) are in `./api/`, but the dependency's tsd is buried in `./jspm_packages/`.
Additionally, the DefinitelyTyped definitions are not gitignored by default because they're installed to `./api/`.

The `tsd` task will centralize all tsds to `./api/` and gitignore all external definitions, giving you an api directory structure like so:

```
\- api
   |- lodash
   |  \- lodash.d.ts (external, ignored)
   |- .gitignore
   |- application.d.ts (internal)
   \- lib.d.ts (external, ignored)
```

This means that without any additional configuration, you can easily reference external definitions in your source code and in your internal definitions, like so:

**application.d.ts**
```
/// <reference path="lib.d.ts" />
/// <reference path="lodash/lodash.d.ts" />

declare module application {
    ...
}
```

**application.ts**
```
/// <reference path="../api/application.d.ts" />
/// <reference path="../api/lib.d.ts" />
/// <reference path="../api/lodash/lodash.d.ts" />

export = {
    ...
}
```


## Testing with wGulp
The default testing configuration relies on the jspm module loader to dynamically load test and source files. In order to utilize this functionality, you will need to install any 3rd-party library dependencies via jspm.

If you don't already have jspm installed globally, go ahead and do so:

```
npm install jspm -g
```

If you do not want to use jspm to load your tests and instead would like to rely on browserify to bundle before testing, take a look at the `browserify-with-karma` example. Use a karma.conf.js that looks like the one in that example project.

### Override Karma browser option via CLI
wGulp supports supplying the karma browser via a command line argument. Supported arguments are as follows. Note that these work for both `gulp test` and `gulp watch:test`. This is a simple alternative to specifying your own `karma.conf.js` when you only want to change the browser that the tests are running in.

**Run in Chrome**
```bash
gulp test -c
gulp test --chrome
gulp test --browsers Chrome
```

**Run in Firefox**
```bash
gulp test -f
gulp test --firefox
gulp test --browsers Firefox
```

**Run in PhantomJS**
```bash
gulp test -p
gulp test --phantom
gulp test --browsers PhantomJS
```

**Run in multiple browsers**
```bash
gulp test -cf
gulp test --chrome --firefox
gulp test --browsers Chrome,Firefox
```

*Note:* The `--browsers` option hands the string directly to karma's `browsers: []` configuration, so it is not limited to the three browsers listed above.

### Testing with SauceLabs
wGulp comes with SauceLabs support so that you can easily run your unit tests in a large number of browsers.
In order to utilize this feature you will need a SauceLabs account. Configure wGulp with your username and accessKey via customizedOptions:

```js
var customizedOptions = {
    sauceLabs: {
        testName: "Some identifier of your project/test run",
        username: "your-sauce-username",
        accessKey: "your-sauce-accessKey"
    }
};
```

After that is configured, it is easy to use it.

```
gulp test --sauce
```

If you would like to customize the browsers that your tests get run in, add a `browsers` key to the sauceLabs config. Its value should be an object containing karma-sauce-launcher configs. See the karma-sauce-launcher [documentation](https://github.com/karma-runner/karma-sauce-launcher#adding-karma-sauce-launcher-to-an-existing-karma-config) for more information.


# Extending wGulp

wGulp provides a simple interface to extend its functionality via subtasks and customized configuration options.

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

##### livescript
Transpile code from LiveScript to JavaScript.
Takes additional argument `bare` which defaults to `true` and is passed into gulp-livescript.

##### minify_css
Minifies CSS code.

##### minify_js
Minifies JS code.

##### runSequence
*Note: we highly recommend using the [task dependency system](#task-dependency-tree) instead of runSequence to ensure the fastest possible build and to prevent duplicate task runs.*

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
        api: "./api/",
        coverage: "./report/coverage/",
        complexity: "./report/complexity/",
        docs: "./docs/",
        styles: "./sass/",
        style_include_paths: [],
        dependencies: ["./jspm_packages"]
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

### Accessing resolved configuration options

If you are writing custom tasks in your `gulpfile.js` you may find it useful to be able to access the configuration that wGulp is using (including any overrides you have specified). These configuration options are exported in wGulp. Here is an example of using them:

```js
wGulp = require('wGulp')(gulp, customizedOptions);
// Add a config variable
var config = wfgulp.config;
var paths = config.path;

// Now use the the resolved configuration
gulp.task('copy:something', wfgulp.copy({
    glob: config.glob.jsx,
    dest: paths.dist
}));
```

