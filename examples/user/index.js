'use strict';
var credentials = require('../credentials.json');
var allegro = require('../../lib/allegro');

allegro.createClient(credentials, function (err, client) {
    client.getUser(26729811, function (err, user) {
        console.log(user.login);
    });
});
