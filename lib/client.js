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
    this._countryId = options.countryId;
    if (options.password) {
        this._passwordHash = hasher.generatePasswordHash(options.password);
    } else {
        this._passwordHash = options.passwordHash;
    }

    var sessionHandle = null;
    var self = this;
    this._loginUser = function (callback) {
        if (sessionHandle) {
            callback(null, {
                sessionHandlePart: sessionHandle
            });
        } else {
            self._soapClient.doQuerySysStatus({
                'sysvar': 3,
                'countryId': self._countryId,
                'webapiKey': self._key
            }, function (err, result) {
                if (!err) {
                    self._soapClient.doLoginEnc({
                        'userLogin': self._login,
                        'userHashPassword': self._passwordHash,
                        'countryCode': self._countryId,
                        'webapiKey': self._key,
                        'localVersion': result.verKey
                    }, function (err, result) {
                        sessionHandle = result.sessionHandlePart;
                        callback(err, result);
                    });
                }
            });
        }
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
                            for (var i = 0; i < result.siteJournalArray.length; i += 1) {
                                result.siteJournalArray[i].item.forEach(emitEvent);
                            }
                        }
                    });

                    function emitEvent(item) {
                        if (item.changeType === API_CHANGE_BUYNOW) {
                            self.emit(event, item.itemId);
                        }
                        oldestRowId = item.rowId;
                    }
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
            itemId: itemId,
            getImageUrl: 1
        }, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, new Item(result, self));
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
                callback(null, new Category(result.categoryPath[0].item[categories - 1], self));
            }
        });
    });
};

module.exports = Client;
