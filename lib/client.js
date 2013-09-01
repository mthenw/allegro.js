(function () {
    'use strict';

    var crypto = require('crypto');
    var User = require('./model/user');
    var Item = require('./model/item');

    var generatePasswordHash = function (password) {
        var sha256 = crypto.createHash('sha256');
        sha256.update(password, 'utf8');
        return sha256.digest('base64');
    };

    var Client = function (options) {
        options = options || {};

        if (!options.soapClient) {
            throw new Error('No soap client provided');
        }

        if (!options.key) {
            throw new Error('No api key provided');
        }

        if (!options.countryId) {
            throw new Error('No country id provided');
        }

        this._soapClient = options.soapClient;
        this._key = options.key;
        this._countryId = options.countryId;
        this._localVersion = '1377862002';

        if (options.login && options.password) {
            this._login = options.login;
            this._passwordHash = generatePasswordHash(options.password);
        }
    };

    Client.prototype.getUser = function (userId, callback) {
        this._soapClient.doShowUser({
            'webapiKey': this._key,
            'countryId': this._countryId,
            'userId': userId
        }, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, new User(result));
            }
        });
    };

    Client.prototype.getItem = function (itemId, callback) {
        var self = this;
        if (this._login && this._passwordHash) {
            this._soapClient.doLoginEnc({
                'userLogin': this._login,
                'userHashPassword': this._passwordHash,
                'countryCode': this._countryId,
                'webapiKey': this._key,
                'localVersion': this._localVersion
            }, function (err, result) {
                self._soapClient.doShowItemInfoExt({
                    sessionHandle: result.sessionHandlePart,
                    itemId: itemId
                }, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, new Item(result));
                    }
                });
            });
        } else {
            callback(new Error('Method requires session but no credential passed'));
        }
    };

    module.exports = Client;
})();
