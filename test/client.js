require('should');
var sinon = require('sinon');
var soap = require('soap');
var Client = require('../lib/client');

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

    it('should return user data by user id', function (done) {
        soap.createClient(__dirname + '/webapi.wsdl', function (err, soapClient) {
            sinon.spy(soapClient, 'doShowUser');

            var client = new Client(soapClient, 'key', 1);
            client.getUser(123, function (err, user) {
                
            });

            soapClient.doShowUser.calledOnce.should.be.true;
            soapClient.doShowUser.calledWith({
                'webapiKey': 'key',
                'countryId': 1,
                'userId': 123
            }).should.be.true;

            soapClient.doShowUser.restore();
            done();
        });
    })
});