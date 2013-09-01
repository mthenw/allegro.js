# allegro.js


[![Build Status](https://travis-ci.org/mthenw/allegro.js.png)](https://travis-ci.org/mthenw/allegro.js)

# Installation
```
npm install allegro
```

# Usage

```
var allegro = require('allegro');

allegro.createClient({ key: 'your_webapi_key'}, function (err, client) {
    client.getUser(26729811, function (err, user) {
        console.log(user.login);
    });
});
```

# Documentation

## allegro

### createClient(options, callback)

Creates API client. Available options:

* ```key``` - WebAPI key, can be generated in [My Allegro](http://allegro.pl/myaccount/webapi.php) (required),
* ```countryId``` - country code, default: 1 (Poland)
* ```login``` - user login, credentials are needed to call some of methods (I don't know why but even for those not related to My Allegro) so, in most cases you should provide them,
* ```password``` - user password.

```callback``` gets two arguments:

* ```error``` - Error instance if error occured,
* ```client``` - [Client](#client) instance

#### Example

```
var allegro = require('allegro');
var key = 'your_webapi_key';

allegro.createClient({ key: 'your_webapi_key'}, function (error, client) {
    ...
});
```

## Client

### getCategory(categoryId, callback)

Get [Category](#category) instance by id and pass to callback.

#### Example

```
allegro.createClient({ … }, function (error, client) {
    client.getCategory(149, function (error, category) {
        console.log(category.name); // 'Samochody' 
    });
});

```

### getItem(itemId, callback)

Get [Item](#Item) instance by id and pass to callback.

#### Example

```
allegro.createClient({ … }, function (error, client) {
    client.getItem(3482560106, function (error, item) {
        console.log(item.name); // 'IGŁA BMW E90' 
    });
});

```

### getUser(userId, callback)

Get [User](#User) instance by id and pass to callback.

#### Example

```
allegro.createClient({ … }, function (error, client) {
    client.getUser(26729811, function (error, user) {
        console.log(user.login); // 'stendi_pl' 
    });
});

```


## Category

### Proporties:

* ```id``` int,
* ```name``` string.

## Item

### Proporties:

* ```id``` int,
* ```name``` string.

### Methods:

* ```getSeller(callback)``` get [User](#user) instance of seller. ```callback``` gets error and [User](#user) instance. Example:

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

### Proporties:

* ```id``` int,
* ```login``` string,
* ```rating``` int,
* ```createdAt``` Date,
* ```isAllegroStandrd``` bool.
