import '@progress/kendo-ui/src/kendo.data.js';

let Model;

describe("model get", function() {
    beforeEach(function() {
        Model = kendo.data.Model.define();
    });

    it("get returns the value of the specified field", function() {
        let m = new Model({
            foo: "bar"
        });

        assert.equal(m.get("foo"), "bar");
    });

    it("get evaluates nested expression", function() {
        let m = new Model({
            foo: {
                bar: "bar"
            }
        });

        assert.equal(m.get("foo.bar"), "bar");
    });

});
