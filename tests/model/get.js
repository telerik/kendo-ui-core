(function(){

var Model;

module("model get", {
    setup: function() {
        Model = kendo.data.Model.define();
    }
});

test("get returns the value of the specified field", function() {
    var m = new Model({
        foo: "bar"
    });

    equal(m.get("foo"), "bar");
});

test("get evaluates nested expression", function() {
    var m = new Model({
        foo: {
            bar: "bar"
        }
    });

    equal(m.get("foo.bar"), "bar");
});

}());
