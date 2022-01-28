(function() {

    var Model;

    describe("model get", function() {
        beforeEach(function() {
            Model = kendo.data.Model.define();
        });

        it("get returns the value of the specified field", function() {
            var m = new Model({
                foo: "bar"
            });

            assert.equal(m.get("foo"), "bar");
        });

        it("get evaluates nested expression", function() {
            var m = new Model({
                foo: {
                    bar: "bar"
                }
            });

            assert.equal(m.get("foo.bar"), "bar");
        });

    });
}());
