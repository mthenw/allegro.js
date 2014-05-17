'use strict';
require('should');
var User = require('../../lib/model/user');

describe('User', function () {
    it('should return basic info (id, login, rating, createdAt)', function () {
        var user = new User({
            userId: 1,
            userLogin: 'Test user',
            userRating: 10,
            userCreateDate: 1
        });

        user.id.should.equal(1);
        user.login.should.equal('Test user');
        user.rating.should.equal(10);

        user.createdAt.should.be.instanceOf(Date);
        user.createdAt.toUTCString().should.equal('Thu, 01 Jan 1970 00:00:01 GMT');
    });

    it('should return info about allegro standard', function () {
        var user1 = new User({
            userIsAllegroStandard: 1
        });

        var user2 = new User({
            userIsAllegroStandard: 0
        });

        user1.isAllegroStandard.should.equal(true);
        user2.isAllegroStandard.should.equal(false);
    });
});
