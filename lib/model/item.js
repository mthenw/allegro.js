'use strict';

var WEBAPI_NEW_STATUS = 1;
var WEBAPI_USED_STATUS = 2;

function Item(apiItem, client) {
    if (!client) {
        throw new Error('Client instance required');
    }

    this._client = client;

    this._id = apiItem.itemListInfoExt.itId;
    this._name = apiItem.itemListInfoExt.itName;
    this._sellerId = apiItem.itemListInfoExt.itSellerId;
    this._location = apiItem.itemListInfoExt.itLocation;
    this._status = apiItem.itemListInfoExt.itIsNewUsed;
    this._mainImage = null;
    if (apiItem.itemImgList && apiItem.itemImgList[0] && apiItem.itemImgList[0].item && apiItem.itemImgList[0].item[2]) {
        this._mainImage = apiItem.itemImgList[0].item[2].imageUrl;
    }
}

Item.prototype = {
    get id() {
        return this._id;
    },
    get name() {
        return this._name;
    },
    get location() {
        return this._location;
    },
    get isNew() {
        return this._status === WEBAPI_NEW_STATUS;
    },
    get isUsed() {
        return this._status === WEBAPI_USED_STATUS;
    },
    get mainImage() {
        return this._mainImage;
    },
    getSeller: function (callback) {
        this._client.getUser(this._sellerId, function (err, user) {
            callback(err, user);
        });
    }
};

module.exports = Item;
