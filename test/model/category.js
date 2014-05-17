'use strict';
require('should');
var Category = require('../../lib/model/category');

describe('Category', function () {
    it('should return basic info (id, name)', function () {
        var item = new Category({
            catId: 1,
            catName: 'test category'
        }, {});

        item.id.should.equal(1);
        item.name.should.equal('test category');
    });
});
