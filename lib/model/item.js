(function () {
    'use strict';

    function Item(apiItem, client) {
        if (!client) {
            throw new Error('Client instance required');
        }

        this._client = client;

        this._id = apiItem.itId;
        this._name = apiItem.itName;
        this._sellerId = apiItem.itSellerId;
        this._location = apiItem.itLocation;
    }

    Item.prototype =  {
        get id() {
            return this._id;
        },
        get name() {
            return this._name;
        },
        get location() {
            return this._location;
        },
        getSeller: function (callback) {
            this._client.getUser(this._sellerId, function (err, user) {
                callback(err, user);
            });
        }
    };

    module.exports = Item;
})();
