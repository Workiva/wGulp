var spawn = require('child_process').spawn;
var proc = spawn('node', ['test/integration/tsd/internalCollision.proc.js']);
proc.on('close', function(code) {
    console.log('proc done');
    console.log(code);
});
