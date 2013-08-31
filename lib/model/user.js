(function () {
    'use strict';

    function User(apiUser) {
        this._id = apiUser.userId;
        this._login = apiUser.userLogin;
    }

    User.prototype = {
        get id() {
            return this._id;
        },
        get login() {
            return this._login;
        }
    };

    module.exports = User;
})();
