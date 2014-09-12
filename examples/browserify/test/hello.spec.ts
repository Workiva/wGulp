/// <reference path="../api/node/node.d.ts" />
/// <reference path="../api/jasmine/jasmine.d.ts" />

import Hat = require('../src/hat');

describe('hello', function():any {
    it('world', function():any {
        var hat:any = new Hat('World');
        var str:any = hat.go();
        expect(str).toEqual('World');
    });
});

