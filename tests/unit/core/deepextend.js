import '@progress/kendo-ui/src/kendo.core.js';
import '@progress/kendo-ui/src/kendo.data.js';

let deepExtend = kendo.deepExtend;
let src;
let dst;

describe("deepExtend", function() {
    beforeEach(function() {
        src = {
            margin: {
                top: 10
            },
            colors: ["red"],
            border: 5,
            date: new Date(),
            foo: {
                clone: function() {
                    return true;
                }
            }
        };

        dst = {
            margin: 5,
            colors: ["green", "blue"],
            border: undefined
        };

        deepExtend(dst, src);
    });

    it("Overwrites arrays", function() {
        assert.equal(dst.colors[0], "red");
        assert.equal(dst.colors.length, 1);
    });

    it("Does not copy undefined values", function() {
        assert.equal(dst.border, 5);
    });

    it("Overwrites fields containing primitive types", function() {
        assert.equal(dst.margin.top, 10);
    });

    it("Clones dates", function() {
        assert.equal(dst.date.getTime(), src.date.getTime());
        assert.isOk(dst.date != src.date);
    });

    it("Clones objects with clone method", function() {
        assert.isOk(dst.foo);
    });

    it("Does not mangle DataSource instances", function() {
        let ds = new kendo.data.DataSource();
        deepExtend(dst, { ds: ds });

        assert.equal(dst.ds, ds);
    });

    it("Does not mangle custom DataSource instances", function() {
        let MyDataSource = kendo.data.DataSource.extend({});
        let ds = new MyDataSource();
        deepExtend(dst, { ds: ds });

        assert.equal(dst.ds, ds);
    });

    it("Does not mangle RegExp", function() {
        let exp = /foo/;
        deepExtend(dst, { exp: exp });

        assert.isOk(dst.exp instanceof RegExp);
    });

});
