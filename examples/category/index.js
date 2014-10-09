'use strict';
var credentials = require('../credentials.json');
var allegro = require('../../lib/allegro');

allegro.createClient(credentials, function (err, client) {
    client.getCategory(122234, function (err, category) {
        console.log(category.name);
        category.getParent(function (err, category) {
            console.log(category.name);
        });
    });
});
