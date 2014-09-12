
/// <reference path="../api/node/node.d.ts" />
/// <reference path="../api/jasmine/jasmine.d.ts" />

import Hat = require('../src/hat');

describe('another', function():any {
    it('test', function():any {
        var hat:any = new Hat('Another');
        var str:any = hat.go();
        expect(str).toEqual('Another');
    });
});

