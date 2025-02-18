import { fromESClass } from '@progress/kendo-ui/src/kendo.core.js';

let Class = kendo.Class;

describe("fromESClass", () => {
    class ESClass {
        constructor(options) {
            this.foo = "foo";
            this.options = {
                bar: "bar"
            };
        }
        method() {
            return "method";
        }
    }

    const KendoClass = fromESClass(ESClass);
    const ExtendedKendoClass = KendoClass.extend({
        init(options) {
            this._newFoo = "new foo";
        },
        method() {
            return "extended method";
        },
        newMethod() {
            return this.foo;
        },
        newFoo() {
            return this._newFoo;
        }
    });

    it("copies the prototype", () => {
        assert.isOk(KendoClass.prototype.method);
    });

    it("copies the constructor", () => {
        assert.isOk(new KendoClass().foo);
    });

    it("extends the prototype", () => {
        assert.isOk(ExtendedKendoClass.prototype.newMethod);
    });

    it("overrides the method", () => {
        assert.equal((new ExtendedKendoClass()).method(), "extended method");
    });

    it("calls the super constructor", () => {
        assert.isOk((new ExtendedKendoClass()).foo);
    });

    it("calls the super method", () => {
        assert.equal((new ExtendedKendoClass()).method(), "extended method");
    });

    it("calls the super method with arguments", () => {
        assert.equal((new ExtendedKendoClass()).newMethod(), "foo");
    });

    it("calls the super init", () => {
        assert.isOk((new ExtendedKendoClass())._newFoo);
    });

    it("calls the super init with arguments", () => {
        assert.equal((new ExtendedKendoClass()).newFoo(), "new foo");
    });

    it("copies the static members", () => {
        assert.isOk(KendoClass.extend);
    });

    it("copies the static members", () => {
        assert.isOk(ExtendedKendoClass.extend);
    });

    it("copies the prototype to fn", () => {
        assert.isOk(KendoClass.fn);
    });

    it("copies the prototype to ExtendedKendoClass fn", () => {
        assert.isOk(ExtendedKendoClass.fn);
    });

    it("copies the prototype to KendoClass fn", () => {
        assert.isOk(KendoClass.fn.method);
    });

    it("copies the prototype to ExtendedKendoClass fn", () => {
        assert.isOk(ExtendedKendoClass.fn.newMethod);
    });

    it("static extend method is chainable", () => {
        const SubClass = ExtendedKendoClass.extend({
            newMethod() {
                return "sub method";
            }
        });

        assert.isOk(SubClass.fn.newMethod);
        assert.equal((new SubClass()).method(), "method");
        assert.equal((new SubClass()).newMethod(), "sub method");
        assert.isOk(SubClass.extend);

    });

    it("_instance getter returns the instance of a class", () => {
        assert.isOk((new ExtendedKendoClass())._instance);
    });
});

describe("class", function() {

    it("extend copies the supplied prototype", function() {
        let Subclass = Class.extend({
            method: function() {
            }
        });

        assert.isOk(Subclass.prototype.method);
    });

    it("extend merges object members", function() {
        let Parent = Class.extend({
            options: { a: 1 }
        });

        let Child = Parent.extend({
            options: { b: 2 }
        });

        assert.isOk(Child.prototype.options.a && Child.prototype.options.b);
    });

    it("extend copies object members", function() {
        let Parent = Class.extend({
            options: { a: 1 }
        });

        let Child = Parent.extend({
            options: { b: 2 }
        });

        assert.isOk(!Parent.prototype.options.b);
    });

    it("extend aliases the prototype as fn", function() {
        let Subclass = Class.extend();

        assert.isOk(Subclass.prototype === Subclass.fn);
    });

    it("the constructor of the subclass is the subclass itself", function() {
        let Subclass = Class.extend();
        assert.isOk((new Subclass).constructor === Subclass);
    });

    it("subclass is instance of the grand parent class", function() {
        let Person = Class.extend({}),
            Customer = Person.extend({});

        assert.isOk(new Customer instanceof Person);
        assert.isOk(new Customer instanceof Class);
    });

    it("subclass can be extended", function() {
        let Person = Class.extend({
            name: function() {
            }
        });

        let Customer = Person.extend({
            age: function() {
            }
        });

        assert.isOk(Customer.prototype.name);
        assert.isOk(Customer.prototype.age);
    });

    it("init is called during subclass instantiation", function() {
        let initWasCalled = false, Subclass = Class.extend({
            init: function() {
                initWasCalled = true;
            }
        });

        let subclass = new Subclass();
        assert.isOk(initWasCalled);
    });

    it("init is called with the constructor arguments during instantiation", function() {
        let initArguments, Subclass = Class.extend({
            init: function() {
                initArguments = arguments;
            }
        });

        let subclass = new Subclass("foo", "bar");
        assert.equal(initArguments[0], "foo");
        assert.equal(initArguments[1], "bar");
    });

    it("copies array from prototype", function() {
        let Ball = Class.extend({
            colors: ["red", "green"]
        });

        let AnotherBall = Ball.extend();

        assert.isOk(Array.isArray(AnotherBall.fn.colors));
    });

});
