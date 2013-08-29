var Client = function (soapClient, key, countryId) {
    'use strict';

    if (!soapClient) {
        throw new Error('No soap client provided');
    }

    if (!key) {
        throw new Error ('No api key provided');
    }

    if (!countryId) {
        throw new Error ('No country id provided');
    }

    this.soapClient = soapClient;
    this.key = key,
    this.countryId = countryId;
};

Client.prototype.getUser = function (userId, callback) {
    var args = {
        'webapiKey': this.key,
        'countryId': this.countryId,
        'userId': userId
    };

    this.soapClient.doShowUser(args);
}

module.exports = Client;