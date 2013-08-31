require('should');
var User = require('../../lib/model/user');

describe('User', function () {
    'use strict';

    it('should set user id and login', function () {
        var user = new User({
            userId: 123,
            userLogin: 'test'
        });

        user.id.should.equal(123);
        user.login.should.equal('test');
    });
});