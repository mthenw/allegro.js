require('should');
var sinon = require('sinon');
var soap = require('soap');
var Client = require('../lib/client');
var User = require('../lib/model/user');
var Item = require('../lib/model/item');

describe('Client', function () {
    'use strict';

    it('should require soap instance in constructor', function () {
        (function () {
            new Client();
        }).should.throwError('No soap client provided');
    });

    it('should require key in constructor', function () {
        (function () {
            new Client({
                soapClient: {}
            });
        }).should.throwError('No api key provided');
    });

    it('should require country in constructor', function () {
        (function () {
            new Client({
                soapClient: {},
                key: 'key'
            });
        }).should.throwError('No country id provided');
    });

    it('should return user model by user id', function (done) {
        soap.createClient(__dirname + '/webapi.wsdl', function (err, soapClient) {
            var doShowUserStub = sinon.stub(soapClient, 'doShowUser');
            doShowUserStub.callsArgWith(1, null, {
                'userId': 123,
                'userLogin': 'Test user'
            });

            var client = new Client({soapClient: soapClient, key: 'key', countryId: 1});
            client.getUser(123, function (err, user) {
                doShowUserStub.calledOnce.should.equal(true);
                user.should.be.an.instanceOf(User);
                user.id.should.equal(123);
                user.login.should.equal('Test user');
                done();
            });
        });
    });

    it('should return an error if no credential passed when getting item data', function (done) {
        soap.createClient(__dirname + '/webapi.wsdl', function (err, soapClient) {
            var client = new Client({soapClient: soapClient, key: 'key', countryId: 1});
            client.getItem(123, function (err) {
                err.should.be.instanceOf(Error);
                err.message.should.be.equal('Method requires session but no credential passed');
                done();
            });
        });
    });

    it('should login user before getting item data', function (done) {
        soap.createClient(__dirname + '/webapi.wsdl', function (err, soapClient) {
            var doLoginEncStub = sinon.stub(soapClient, 'doLoginEnc');
            doLoginEncStub.callsArgWith(1, null, {
                'sessionHandlePart': 'qwe',
                'userId': 1
            });

            var doShowItemInfoExtStub = sinon.stub(soapClient, 'doShowItemInfoExt');
            doShowItemInfoExtStub.callsArgWith(1, null, {
                itemListInfoExt: {
                    itId: 1,
                    itName: 'Item'
                }
            });

            var client = new Client({
                soapClient: soapClient,
                key: 'key',
                countryId: 1,
                login: 'testuser',
                password: 'password'
            });

            client.getItem(2, function () {
                doLoginEncStub.calledOnce.should.equal(true);
                doLoginEncStub.calledWith({
                    userLogin: 'testuser',
                    userHashPassword: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=',
                    countryCode: 1,
                    webapiKey: 'key',
                    localVersion: '1377862002'
                }).should.equal(true);
                done();
            });
        });
    });

    it('should return item model by item id', function (done) {
        soap.createClient(__dirname + '/webapi.wsdl', function (err, soapClient) {
            var doLoginEncStub = sinon.stub(soapClient, 'doLoginEnc');
            doLoginEncStub.callsArgWith(1, null, {
                sessionHandlePart: 'session1',
                userId: 1
            });

            var doShowItemInfoExtStub = sinon.stub(soapClient, 'doShowItemInfoExt');
            doShowItemInfoExtStub.callsArgWith(1, null, {
                itemListInfoExt: {
                    itId: 2,
                    itName: 'Test item'
                }
            });

            var client = new Client({
                soapClient: soapClient,
                key: 'key',
                countryId: 1,
                login: 'testuser',
                password: 'password'
            });

            client.getItem(2, function (err, item) {
                doShowItemInfoExtStub.calledOnce.should.equal(true);
                doShowItemInfoExtStub.calledWith({
                    sessionHandle: 'session1',
                    itemId: 2
                }).should.equal(true);

                item.should.be.instanceOf(Item);
                item.id.should.be.equal(2);
                item.name.should.be.equal('Test item');
                done();
            });
        });
    });
});