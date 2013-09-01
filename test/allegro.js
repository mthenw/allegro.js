require('should');
var allegro = require('../lib/allegro');
var Client = require('../lib/client');

describe('Allegro', function () {
    'use strict';

    it('should return an error if no api key provided for creating client', function () {
        allegro.createClient(null, function (err) {
            err.should.be.an.instanceOf(Error);
        });
    });

    it('should create client instance', function (done) {
        allegro.createClient({key: 'key', wsdl: __dirname + '/webapi.wsdl'}, function (err, client) {
            client.should.be.an.instanceOf(Client);
            done();
        });
    });

    it('should return an error when creating soap client failed', function () {
        allegro.createClient({key: 'key', wsdl: 'dontexists'}, function (err) {
            err.should.be.an.instanceOf(Error);
        });
    });
});