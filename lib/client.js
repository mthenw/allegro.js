(function () {
    'use strict';

    var util = require('util');
    var EventEmitter = require('events').EventEmitter;

    var hasher = require('./hasher');
    var User = require('./model/user');
    var Item = require('./model/item');
    var Category = require('./model/category');

    var JOURNAL_INTERVAL = 1000;
    var EVENT_BUYNOW = 'buynow';
    var API_CHANGE_BUYNOW = 'now';

    var Client = function (options) {
        EventEmitter.call(this);

        options = options || {};
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

        var oldestRowId = null;
        this.on('newListener', function (event) {
            if (event === EVENT_BUYNOW) {
                setInterval(function () {
                    self._loginUser(function (err, result) {
                        var callArgs = {};
                        if (oldestRowId) {
                            callArgs = {
                                sessionHandle: result.sessionHandlePart,
                                startingPoint: parseFloat(oldestRowId),
                                infoType: 1
                            };
                        } else {
                            callArgs = {
                                sessionHandle: result.sessionHandlePart,
                                infoType: 1
                            };
                        }

                        self._soapClient.doGetSiteJournal(callArgs, function (err, result) {
                            if (!err) {
                                Object.keys(result.siteJournalArray[0].item).forEach(function (key) {
                                    var row = result.siteJournalArray[0].item[key];
                                    if (row.changeType === API_CHANGE_BUYNOW) {
                                        self.emit(event, row.itemId);
                                    }
                                    oldestRowId = row.rowId;
                                });
                            }
                        });
                    });
                }, JOURNAL_INTERVAL);
            }
        });
    };

    util.inherits(Client, EventEmitter);

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
