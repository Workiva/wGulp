#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

function copy(src, target) {
    console.log('> Creating initial ' + target);
    var contents = fs.readFileSync(src);
    fs.writeFileSync(target,contents);
}

copy('node_modules/wGulp/src/template/gulpfile.js', path.resolve(process.cwd(), 'gulpfile.js'));
