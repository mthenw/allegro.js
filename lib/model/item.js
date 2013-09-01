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
    }

    Item.prototype =  {
        get id() {
            return this._id;
        },
        get name() {
            return this._name;
        },
        getSeller: function (callback) {
            this._client.getUser(this._sellerId, function (err, user) {
                callback(err, user);
            });
        }
    };

    module.exports = Item;
})();
