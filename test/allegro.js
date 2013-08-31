require('should');
var allegro = require('../lib/allegro');
var Client = require('../lib/client');

describe('Allegro', function () {
    'use strict';

    it('should throw error if no api key provided for creating client', function () {
        (function () {
            allegro.createClient();
        }).should.throwError('No WebAPI key provided');
    });

    it('should create client instance', function (done) {
        allegro.createClient({key: 'key', wsdl: __dirname + '/webapi.wsdl'}, function (err, client) {
            client.should.be.an.instanceOf(Client);
            done();
        });
    });

    it('should return error when creating soap client failed', function () {
        allegro.createClient({key: 'key', wsdl: 'dontexists'}, function (err) {
            err.should.be.an.instanceOf(Error);
        });
    });
});