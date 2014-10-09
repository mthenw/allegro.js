'use strict';

function Category(apiCategory, client) {
    if (!client) {
        throw new Error('Client instance required');
    }

    this._client = client;

    this._id = apiCategory.catId;
    this._name = apiCategory.catName;
    this._parentId = apiCategory.catParent;
}

Category.prototype = {
    get id() {
        return this._id;
    },
    get name() {
        return this._name;
    },
    get parentId() {
        return this._parentId;
    },
    getParent: function (callback) {
        this._client.getCategory(this._parentId, function (err, category) {
            callback(err, category);
        });
    }
};

module.exports = Category;
