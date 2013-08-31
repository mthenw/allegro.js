require('should');
var sinon = require('sinon');
var soap = require('soap');
var Client = require('../lib/client');
var User = require('../lib/model/user');

describe('Client', function () {
    'use strict';

    it('should require soap instance in constructor', function () {
        (function () {
            new Client();
        }).should.throwError('No soap client provided');
    });

    it('should require key in constructor', function () {
        (function () {
            new Client({});
        }).should.throwError('No api key provided');
    });

    it('should require country in constructor', function () {
        (function () {
            new Client({}, 'key');
        }).should.throwError('No country id provided');
    });

    it('should return user model by user id', function (done) {
        soap.createClient(__dirname + '/webapi.wsdl', function (err, soapClient) {
            var stub = sinon.stub(soapClient, 'doShowUser');
            stub.callsArgWith(1, null, {});

            var client = new Client(soapClient, 'key', 1);
            client.getUser(123, function (err, user) {
                user.should.be.an.instanceOf(User);
                done();
            });
        });
    });
});