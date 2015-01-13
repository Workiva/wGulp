#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var mkdir = require('mkdirp');

function copy(src, target) {
    console.log('> Creating initial ' + target);
    var contents = fs.readFileSync(src);
    fs.writeFileSync(target,contents);
}

copy('node_modules/wGulp/src/template/gulpfile.js', path.resolve(process.cwd(), 'gulpfile.js'));
['src','test'].forEach(function(dir) {
    mkdir.sync(path.resolve(process.cwd(), dir));
});

