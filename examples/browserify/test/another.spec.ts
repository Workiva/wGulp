
/// <reference path="../api/node/node.d.ts" />
/// <reference path="../api/jasmine/jasmine.d.ts" />

var Hat:any = require('../src/hat');

describe('another', function():any {
    it('test', function():any {
        var hat:any = new Hat('Another');
        var str:any = hat.go();
        expect(str).toEqual('Another');
    });
});

