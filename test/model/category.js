require('should');
var Category = require('../../lib/model/Category');

describe('Category', function () {
    'use strict';

    it('should return basic info', function () {
        var item = new Category({
            catId: 1,
            catName: 'test category'
        }, {});

        item.id.should.equal(1);
        item.name.should.equal('test category');
    });
});