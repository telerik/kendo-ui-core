(function(){
var Class = kendo.Class;

test("extend copies the supplied prototype", function() {
    var Subclass = Class.extend({
        method: function() {
        }
    });

    ok(Subclass.prototype.method);
});

test("extend merges object members", function() {
    var Parent = Class.extend({
        options: { a: 1 }
    });

    var Child = Parent.extend({
        options: { b: 2 }
    });

    ok(Child.prototype.options.a && Child.prototype.options.b);
});

test("extend copies object members", function() {
    var Parent = Class.extend({
        options: { a: 1 }
    });

    var Child = Parent.extend({
        options: { b: 2 }
    });

    ok(!Parent.prototype.options.b);
});

test("extend aliases the prototype as fn", function() {
    var Subclass = Class.extend();

    ok(Subclass.prototype === Subclass.fn);
});

test("the constructor of the subclass is the subclass itself", function() {
    var Subclass = Class.extend();
    ok((new Subclass).constructor === Subclass);
});

test("subclass is instance of the grand parent class", function() {
    var Person = Class.extend({}),
        Customer = Person.extend({});

    ok (new Customer instanceof Person);
    ok (new Customer instanceof Class);
});

test("subclass can be extended", function() {
    var Person = Class.extend({
        name: function() {
        }
    });

    var Customer = Person.extend({
        age: function() {
        }
    });

    ok(Customer.prototype.name);
    ok(Customer.prototype.age);
});

test("init is called during subclass instantiation", function() {
    var initWasCalled = false, Subclass = Class.extend({
        init: function() {
            initWasCalled = true;
        }
    });

    new Subclass();
    ok(initWasCalled);
});

test("init is called with the constructor arguments during instantiation", function() {
    var initArguments, Subclass = Class.extend({
        init: function() {
            initArguments = arguments;
        }
    });

    new Subclass("foo", "bar");
    equal(initArguments[0], "foo");
    equal(initArguments[1], "bar");
});

test("copies array from prototype", function() {
    var Ball = Class.extend( {
        colors: ["red", "green"]
    });

    var AnotherBall = Ball.extend();

    ok($.isArray(AnotherBall.fn.colors));
});

}());
