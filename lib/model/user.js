'use strict';

function User(apiUser) {
    this._id = apiUser.userId;
    this._login = apiUser.userLogin;
    this._rating = apiUser.userRating;
    this._createdAt = new Date(apiUser.userCreateDate * 1000);
    this._isAllegroStandard = (apiUser.userIsAllegroStandard === 1) ? true : false;
}

User.prototype = {
    get id() {
        return this._id;
    },
    get login() {
        return this._login;
    },
    get rating() {
        return this._rating;
    },
    get createdAt() {
        return this._createdAt;
    },
    get isAllegroStandard() {
        return this._isAllegroStandard;
    }
};

module.exports = User;
