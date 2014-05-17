'use strict';
var crypto = require('crypto');

module.exports = {
    generatePasswordHash: function (password) {
        var sha256 = crypto.createHash('sha256');
        sha256.update(password, 'utf8');
        return sha256.digest('base64');
    }
};
