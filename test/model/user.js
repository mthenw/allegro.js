require('should');
var User = require('../../lib/model/user');

describe('User', function () {
    'use strict';

    it('should return basic info', function () {
        var user = new User({
            userId: 1,
            userLogin: 'Test user',
            userRating: 10,
        });

        user.login.should.equal('Test user');
        user.rating.should.equal(10);
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

    it('should return date of user creation', function () {
        var user = new User({
            'userCreateDate': 1
        });

        user.createdAt.should.be.instanceOf(Date);
        user.createdAt.toUTCString().should.equal('Thu, 01 Jan 1970 00:00:01 GMT');
    });
});