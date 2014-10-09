'use strict';
require('should');
var sinon = require('sinon');
var Category = require('../../lib/model/category');

describe('Category model', function () {
    it('should return basic info (id, name, parentId)', function () {
        var category = new Category({
            catId: 2,
            catName: 'test category',
            catParent: 1
        }, {});

        category.id.should.equal(2);
        category.name.should.equal('test category');
        category.parentId.should.equal(1);
    });

    it('should return parent category', function (done) {
        var client = { getCategory: function () {} };
        var clientStub = sinon.stub(client, 'getCategory');
        clientStub.callsArgWith(1, null, new Category({
            catId: 2
        }, {}));

        var category = new Category({
            catId: 2,
            catName: 'test category',
            catParent: 1
        }, client);

        category.getParent(function (err, category) {
            clientStub.calledOnce.should.equal(true);
            clientStub.calledWith(1).should.equal(true);
            category.should.be.instanceOf(Category);
            done();
        });
    });
});
