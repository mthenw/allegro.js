'use strict';

function Category(apiCategory) {
    this._id = apiCategory.catId;
    this._name = apiCategory.catName;
}

Category.prototype = {
    get id() {
        return this._id;
    },
    get name() {
        return this._name;
    }
};

module.exports = Category;
