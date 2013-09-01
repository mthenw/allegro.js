(function () {
    'use strict';

    function Item(apiItem) {
        this._id = apiItem.itId;
        this._name = apiItem.itName;
    }

    Item.prototype =  {
        get id() {
            return this._id;
        },
        get name() {
            return this._name;
        }
    };

    module.exports = Item;
})();
