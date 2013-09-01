require('should');
var sinon = require('sinon');
var Item = require('../../lib/model/item');
var User = require('../../lib/model/user');

describe('Item', function () {
    'use strict';

    it('should return basic info', function () {
        var item = new Item({
            itId: 1,
            itName: 'test item'
        });

        item.id.should.equal(1);
        item.name.should.equal('test item');
    });

    it('should return user object on getting seller', function (done) {
        var client = { getUser: function () {} };
        var clientStub = sinon.stub(client, 'getUser');
        clientStub.callsArgWith(1, null, new User({
            userId: 2
        }));

        var item = new Item({
            itId: 1,
            itSellerId: 2,
        }, client);

        item.getSeller(function (err, user) {
            clientStub.calledOnce.should.equal(true);
            clientStub.calledWith(2).should.equal(true);
            user.should.be.instanceOf(User);
            done();
        });
    });
});