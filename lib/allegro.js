var _ = require('lodash');
var soap = require('soap');
var Country = require('./country');
var Client = require('./client');

var Allegro = function () {
    'use strict';

    var defaults = {
        key: null,
        wsdl: 'https://webapi.allegro.pl/service.php?wsdl',
        countryId: Country.POLAND
    };

    var validateOptions = function (options) {
        if (_.isUndefined(options)) {
            options = {};
        }

        options = _.defaults(options, defaults);

        if (!options.key) {
            throw new Error('No WebAPI key provided');
        }

        return options;
    };

    return {
        createClient: function (options, callback) {
            options = validateOptions(options);

            soap.createClient(options.wsdl, function (err, client) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, new Client(client, options.key, options.countryId));
                }
            });
        }
    };
};

module.exports = new Allegro();
