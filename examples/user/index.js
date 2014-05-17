'use strict';
var allegro = require('../../lib/allegro');

var options = {key: '', login: '', password: ''};

allegro.createClient(options, function (err, client) {
    client.getUser(26729811, function (err, user) {
        console.log(user.login);
    });
});
