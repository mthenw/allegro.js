var _ = require('lodash');
var soap = require('soap');
var Country = require('./country');
var Client = require('./client');

var Allegro = function () {
    'use strict';

    var _defaults = {
        key: null,
        login: null,
        password: null,
        passwordHash: null,
        wsdl: 'https://webapi.allegro.pl/service.php?wsdl',
        countryId: Country.POLAND
    };

    var _validateOptions = function (options) {
        if (!options) {
            options = {};
        }

        options = _.defaults(options, _defaults);

        if (!options) {
            throw new Error('No options provided');
        }

        if (!options.key) {
            throw new Error('No WebAPI key provided');
        }

        if (!options.login) {
            throw new Error('No login provided');
        }

        if (!options.password && !options.passwordHash) {
            throw new Error('No password or password hash provided');
        }

        return options;
    };

    return {
        createClient: function (options, callback) {
            try {
                options = _validateOptions(options);
            } catch (e) {
                return callback(e);
            }

            soap.createClient(options.wsdl, function (err, client) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, new Client({
                        'soapClient': client,
                        'key': options.key,
                        'countryId': options.countryId,
                        'login': options.login,
                        'password': options.password,
                        'passwordHash': options.passwordHash
                    }));
                }
            });
        }
    };
};

module.exports = new Allegro();
