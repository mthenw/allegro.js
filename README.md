# allegro.js

Allegro.pl [WebAPI](http://allegro.pl/webapi/) client for Node.js.

[![Build Status](https://travis-ci.org/mthenw/allegro.js.svg?branch=master)](https://travis-ci.org/mthenw/allegro.js) [![NPM version](https://badge.fury.io/js/allegro.png)](http://badge.fury.io/js/allegro)

# Installation
```
npm install allegro
```

# Usage

```
var allegro = require('allegro');

allegro.createClient({key: 'your_webapi_key'}, function (err, client) {
    client.getUser(26729811, function (err, user) {
        console.log(user.login);
    });
});
```

# API

## allegro

### createClient(options, callback)

Creates API client. Available options:

* ```key``` - (required) WebAPI key, can be generated in [My Allegro](http://allegro.pl/myaccount/webapi.php),
* ```login```, ```passwords``` or ```passwordHash``` - (required) credentials are needed to call some of methods (I don't know why but even for those not related to My Allegro). ```password``` can be replaced with ```passwordHash``` which is encoded in base64 sha-256 hash from password: (base64(sha256(password))).
* ```countryId``` - country code, default: 1 (Poland)

Callback function gets two arguments:

* ```error``` - [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) instance if error occured,
* ```client``` - [Client](#client) instance.

Example:

```
var allegro = require('allegro');

var options = {
    key: 'your_webapi_key',
    login: 'foo',
    password: 'bar'
};

allegro.createClient(options, function (error, client) {
    ...
});
```

## Client

### getCategory(categoryId, callback)

Get [Category](#category) instance. Example:

```
allegro.createClient({ … }, function (error, client) {
    client.getCategory(149, function (error, category) {
        console.log(category.name); // 'Samochody' 
    });
});

```

### getItem(itemId, callback)

Get [Item](#item) instance. Example:

```
allegro.createClient({ … }, function (error, client) {
    client.getItem(3482560106, function (error, item) {
        console.log(item.name); // 'IGŁA BMW E90' 
    });
});

```

### getUser(userId, callback)

Get [User](#user) instance. Example:

```
allegro.createClient({ … }, function (error, client) {
    client.getUser(26729811, function (error, user) {
        console.log(user.login); // 'stendi_pl' 
    });
});

```

### Events

* **buynow** (itemId) - item is bought by 'Buy Now'. Example:

```
client.on('buynow', function (itemId) {
    console.log('Getting item:' + itemId
});
```

## Category

Returned by [```client.getCategory```](#getcategorycategoryid-callback).

### Properties

* ```id``` int,
* ```name``` string.

## Item

Returned by [```client.getItem```](#getitemitemid-callback).

### Properties

* ```id``` int,
* ```name``` string.

### Methods

* ```getSeller(callback)``` get [User](#user) instance of seller. Callback function gets [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) and [User](#user) instance. Example:

```
allegro.createClient({ … }, function (error, client) {
    client.getItem(3509260334, function (error, item) {
        item.getSeller(function(error, user) {
            console.log(user.login); // 'stendi_pl' 
        })
    });
});
```

## User

Returned by [```client.getUser```](#getuseruserid-callback).

### Properties

* ```id``` int,
* ```login``` string,
* ```rating``` int,
* ```createdAt``` Date,
* ```isAllegroStandard``` bool.
