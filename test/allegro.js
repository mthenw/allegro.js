require('should');
var allegro = require('../lib/allegro');
var Client = require('../lib/client');

describe('Allegro', function () {
    'use strict';

    it('should create client instance', function (done) {
        allegro.createClient({
            key: 'key',
            login: 'login',
            password: 'password',
            wsdl: __dirname + '/webapi.wsdl'
        }, function (err, client) {
            client.should.be.an.instanceOf(Client);
            done();
        });
    });

    it('should create client instance if password hash provided', function (done) {
        allegro.createClient({
            key: 'key',
            login: 'login',
            passwordHash: 'passwordHash',
            wsdl: __dirname + '/webapi.wsdl'
        }, function (err, client) {
            client.should.be.an.instanceOf(Client);
            done();
        });
    });

    it('should return an error if no api key provided for creating client', function (done) {
        allegro.createClient(null, function (err) {
            err.should.be.an.instanceOf(Error);
            done();
        });
    });

    it('should return an error if no login provided for creating client', function (done) {
        allegro.createClient({key: 'key'}, function (err) {
            err.should.be.an.instanceOf(Error);
            done();
        });
    });

    it('should return an error if no password provided for creating client', function (done) {
        allegro.createClient({key: 'key', login: 'login'}, function (err) {
            err.should.be.an.instanceOf(Error);
            done();
        });
    });

    it('should return an error when creating soap client failed', function (done) {
        allegro.createClient({key: 'key', wsdl: 'dontexists'}, function (err) {
            err.should.be.an.instanceOf(Error);
            done();
        });
    });
});