(function () {
    'use strict';

    var hasher = require('./hasher');

    var User = require('./model/user');
    var Item = require('./model/item');
    var Category = require('./model/category');

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
        this._login = options.login;
        this._passwordHash = hasher.generatePasswordHash(options.password);
        this._countryId = options.countryId;
        this._localVersion = '1377862002';

        var self = this;
        this._loginUser = function (callback) {
            self._soapClient.doLoginEnc({
                'userLogin': self._login,
                'userHashPassword': self._passwordHash,
                'countryCode': self._countryId,
                'webapiKey': self._key,
                'localVersion': self._localVersion
            }, function (err, result) {
                callback(err, result);
            });
        };
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
        this._loginUser(function (err, result) {
            self._soapClient.doShowItemInfoExt({
                sessionHandle: result.sessionHandlePart,
                itemId: itemId
            }, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, new Item(result.itemListInfoExt, self));
                }
            });
        });
    };

    Client.prototype.getCategory = function (itemId, callback) {
        var self = this;
        this._loginUser(function (err, result) {
            self._soapClient.doGetCategoryPath({
                sessionId: result.sessionHandlePart,
                categoryId: itemId
            }, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    var categories = result.categoryPath[0].item.length;
                    callback(null, new Category(result.categoryPath[0].item[categories - 1]));
                }
            });
        });
    };

    module.exports = Client;
})();
