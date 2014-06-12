'use strict';
require('should');
var hasher = require('../lib/hasher');

describe('hasher', function () {
    it('should hash password string and return base64 representation', function () {
        var hash = hasher.generatePasswordHash('test');

        hash.should.be.equal('n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=');
    });
});
