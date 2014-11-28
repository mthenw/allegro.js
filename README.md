# allegro.js

Allegro.pl [WebAPI](http://allegro.pl/webapi/) client for Node.js.

[![Build Status](https://img.shields.io/travis/mthenw/allegro.js.svg?style=flat)](https://travis-ci.org/mthenw/allegro.js)
[![Version](http://img.shields.io/npm/v/allegro.svg?style=flat)](https://www.npmjs.org/package/allegro)

# Installation
```
npm install allegro
```

# Usage

See [examples/](https://github.com/mthenw/allegro.js/tree/master/examples).

# API

## allegro

### createClient(options, callback)

Creates API client. Available options:

* ```key``` - **required** WebAPI key, can be generated in [My Allegro](http://allegro.pl/myaccount/webapi.php),
* ```login```, ```passwords``` or ```passwordHash``` - **required** credentials are needed to call some of methods (I don't know why but even for those not related to My Allegro), so in general you should provide them. ```password``` can be replaced with ```passwordHash``` which is encoded in base64 sha-256 hash from password ```(base64(sha256(password)))```,
* ```countryId``` - optional, country identifier, default: 1 (Poland).

Callback function gets two arguments:

* ```error``` - [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) instance if error occured,
* ```client``` - [Client](#client) instance.

Example:

```
var allegro = require('allegro');

var options = {
    key: 'your_webapi_key',
    login: 'foo',
    passwordHash: 'bar'
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
    console.log('Somebody just bought:' + itemId);
});
```

## Category

Returned by [```client.getCategory```](#getcategorycategoryid-callback).

### Properties

* ```id``` int,
* ```name``` string,
* ```parentId``` int.

### Methods

* ```getParent(callback)``` get [Category](#category) instance of parent. Callback function gets [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) and [Category](#category) instance. Example:

```
allegro.createClient({ … }, function (err, client) {
    client.getCategory(122234, function (err, category) {
        category.getParent(function (err, category) {
            console.log(category.name);
        })
    });
});
```

## Item

Returned by [```client.getItem```](#getitemitemid-callback).

### Properties

* ```id``` int,
* ```name``` string,
* ```location``` string,
* ```mainImage``` string,
* ```isNew``` boolean,
* ```isUsed``` boolean.

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
