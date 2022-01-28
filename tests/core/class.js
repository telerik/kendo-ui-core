(function() {
    var Class = kendo.Class;

    describe("class", function() {

        it("extend copies the supplied prototype", function() {
            var Subclass = Class.extend({
                method: function() {
                }
            });

            assert.isOk(Subclass.prototype.method);
        });

        it("extend merges object members", function() {
            var Parent = Class.extend({
                options: { a: 1 }
            });

            var Child = Parent.extend({
                options: { b: 2 }
            });

            assert.isOk(Child.prototype.options.a && Child.prototype.options.b);
        });

        it("extend copies object members", function() {
            var Parent = Class.extend({
                options: { a: 1 }
            });

            var Child = Parent.extend({
                options: { b: 2 }
            });

            assert.isOk(!Parent.prototype.options.b);
        });

        it("extend aliases the prototype as fn", function() {
            var Subclass = Class.extend();

            assert.isOk(Subclass.prototype === Subclass.fn);
        });

        it("the constructor of the subclass is the subclass itself", function() {
            var Subclass = Class.extend();
            assert.isOk((new Subclass).constructor === Subclass);
        });

        it("subclass is instance of the grand parent class", function() {
            var Person = Class.extend({}),
                Customer = Person.extend({});

            assert.isOk(new Customer instanceof Person);
            assert.isOk(new Customer instanceof Class);
        });

        it("subclass can be extended", function() {
            var Person = Class.extend({
                name: function() {
                }
            });

            var Customer = Person.extend({
                age: function() {
                }
            });

            assert.isOk(Customer.prototype.name);
            assert.isOk(Customer.prototype.age);
        });

        it("init is called during subclass instantiation", function() {
            var initWasCalled = false, Subclass = Class.extend({
                init: function() {
                    initWasCalled = true;
                }
            });

            new Subclass();
            assert.isOk(initWasCalled);
        });

        it("init is called with the constructor arguments during instantiation", function() {
            var initArguments, Subclass = Class.extend({
                init: function() {
                    initArguments = arguments;
                }
            });

            new Subclass("foo", "bar");
            assert.equal(initArguments[0], "foo");
            assert.equal(initArguments[1], "bar");
        });

        it("copies array from prototype", function() {
            var Ball = Class.extend({
                colors: ["red", "green"]
            });

            var AnotherBall = Ball.extend();

            assert.isOk($.isArray(AnotherBall.fn.colors));
        });

    });
}());
