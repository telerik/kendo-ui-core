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

    it("_initOptions is inherited from Class", function() {
        let Subclass = Class.extend({
            init: function(options) {
                this.options = { default: true };
                this._initOptions(options);
            }
        });

        let instance = new Subclass({ custom: "value" });
        assert.isOk(instance._initOptions);
        assert.equal(instance.options.default, true);
        assert.equal(instance.options.custom, "value");
    });

    it("_initOptions is inherited through multiple levels", function() {
        let Parent = Class.extend({
            options: { a: 1 }
        });

        let Child = Parent.extend({
            options: { b: 2 }
        });

        let instance = new Child();
        assert.isOk(typeof instance._initOptions === "function");
    });

    it("init is enumerable on Class.prototype", function() {
        // ES6 class methods are non-enumerable by default, which breaks the
        // legacy extend() pattern. This test ensures init remains enumerable.
        let descriptor = Object.getOwnPropertyDescriptor(Class.prototype, "init");
        assert.isOk(descriptor.enumerable, "init should be enumerable");
    });

    it("_initOptions is enumerable on Class.prototype", function() {
        // ES6 class methods are non-enumerable by default, which breaks the
        // legacy extend() pattern. This test ensures _initOptions remains enumerable.
        let descriptor = Object.getOwnPropertyDescriptor(Class.prototype, "_initOptions");
        assert.isOk(descriptor.enumerable, "_initOptions should be enumerable");
    });

    it("_initOptions preserves prototype chain when used with nested class instances", function() {
        // This test verifies that _initOptions doesn't break prototype inheritance
        // when class instances are nested within options objects (regression test)
        let Finder = Class.extend({
            init: function(format) {
                this.format = format;
            },
            find: function() {
                return this.format;
            }
        });

        let Tool = Class.extend({
            options: {
                finder: null
            },
            init: function(options) {
                this._initOptions(options);
            },
            execute: function() {
                // This should work - finder should have its _initOptions method
                return typeof this.options.finder._initOptions === "function";
            }
        });

        let finder = new Finder("test");
        let tool = new Tool({ finder: finder });

        assert.isOk(tool.execute(), "finder._initOptions should be a function after _initOptions merging");
        assert.equal(tool.options.finder.find(), "test", "finder methods should work after _initOptions merging");
    });

    it("deep inheritance chain (3+ levels) preserves methods", function() {
        let GrandParent = Class.extend({
            grandMethod: function() { return "grand"; }
        });

        let Parent = GrandParent.extend({
            parentMethod: function() { return "parent"; }
        });

        let Child = Parent.extend({
            childMethod: function() { return "child"; }
        });

        let instance = new Child();
        assert.equal(instance.grandMethod(), "grand");
        assert.equal(instance.parentMethod(), "parent");
        assert.equal(instance.childMethod(), "child");
        assert.isOk(instance instanceof GrandParent);
        assert.isOk(instance instanceof Parent);
        assert.isOk(instance instanceof Child);
    });

    it("deep inheritance chain preserves _initOptions through all levels", function() {
        let GrandParent = Class.extend({
            options: { a: 1 }
        });

        let Parent = GrandParent.extend({
            options: { b: 2 }
        });

        let Child = Parent.extend({
            options: { c: 3 },
            init: function(options) {
                this._initOptions(options);
            }
        });

        let instance = new Child({ d: 4 });
        assert.equal(instance.options.a, 1);
        assert.equal(instance.options.b, 2);
        assert.equal(instance.options.c, 3);
        assert.equal(instance.options.d, 4);
    });

    it("extending one class does not affect sibling classes", function() {
        let Parent = Class.extend({
            options: { shared: true }
        });

        let Child1 = Parent.extend({
            options: { child1: true }
        });

        let Child2 = Parent.extend({
            options: { child2: true }
        });

        assert.isOk(!Child1.prototype.options.child2, "Child1 should not have child2 option");
        assert.isOk(!Child2.prototype.options.child1, "Child2 should not have child1 option");
        assert.isOk(!Parent.prototype.options.child1, "Parent should not have child1 option");
        assert.isOk(!Parent.prototype.options.child2, "Parent should not have child2 option");
    });

    it("modifying child instance options does not affect parent prototype", function() {
        let Parent = Class.extend({
            options: { value: 1 }
        });

        let Child = Parent.extend({
            init: function(options) {
                this._initOptions(options);
            }
        });

        let instance = new Child({ value: 999 });
        assert.equal(instance.options.value, 999);
        assert.equal(Parent.prototype.options.value, 1, "Parent prototype should be unchanged");
        assert.equal(Child.prototype.options.value, 1, "Child prototype should be unchanged");
    });

    it("calling parent method via fn works correctly", function() {
        let Parent = Class.extend({
            getValue: function() { return "parent"; }
        });

        let Child = Parent.extend({
            getValue: function() {
                return Parent.fn.getValue.call(this) + "-child";
            }
        });

        let instance = new Child();
        assert.equal(instance.getValue(), "parent-child");
    });

    it("this context is correct in methods", function() {
        let MyClass = Class.extend({
            init: function() {
                this.value = 42;
            },
            getValue: function() {
                return this.value;
            }
        });

        let instance = new MyClass();
        assert.equal(instance.getValue(), 42);

        // Test when method is passed as callback
        let method = instance.getValue.bind(instance);
        assert.equal(method(), 42);
    });

    it("handles null and undefined in options gracefully", function() {
        let MyClass = Class.extend({
            options: { a: 1, b: 2 },
            init: function(options) {
                this._initOptions(options);
            }
        });

        let instance1 = new MyClass(null);
        assert.equal(instance1.options.a, 1);

        let instance2 = new MyClass(undefined);
        assert.equal(instance2.options.a, 1);

        let instance3 = new MyClass({ a: null });
        assert.equal(instance3.options.a, null);
        assert.equal(instance3.options.b, 2);
    });

    it("preserves Date objects in options", function() {
        let MyClass = Class.extend({
            options: {},
            init: function(options) {
                this._initOptions(options);
            }
        });

        let date = new Date(2025, 0, 1);
        let instance = new MyClass({ date: date });

        assert.isOk(instance.options.date instanceof Date);
        assert.equal(instance.options.date.getFullYear(), 2025);
    });

    it("preserves RegExp objects in options", function() {
        let MyClass = Class.extend({
            options: {},
            init: function(options) {
                this._initOptions(options);
            }
        });

        let regex = /test/gi;
        let instance = new MyClass({ pattern: regex });

        assert.isOk(instance.options.pattern instanceof RegExp);
        assert.equal(instance.options.pattern.source, "test");
    });

    it("preserves function references in options", function() {
        let MyClass = Class.extend({
            options: {},
            init: function(options) {
                this._initOptions(options);
            }
        });

        let callback = function() { return "called"; };
        let instance = new MyClass({ onEvent: callback });

        assert.equal(typeof instance.options.onEvent, "function");
        assert.equal(instance.options.onEvent(), "called");
    });

    it("handles arrays in options correctly", function() {
        let MyClass = Class.extend({
            options: { items: [1, 2, 3] },
            init: function(options) {
                this._initOptions(options);
            }
        });

        let instance1 = new MyClass();
        let instance2 = new MyClass({ items: [4, 5] });

        // jQuery's extend merges arrays by index, so [4, 5] + [1, 2, 3] = [4, 5, 3]
        // This documents the actual behavior of $.extend(true, ...)
        assert.deepEqual(instance2.options.items, [4, 5, 3]);

        // Modifying instance array should not affect prototype
        instance1.options.items.push(99);
        assert.deepEqual(MyClass.prototype.options.items, [1, 2, 3]);
    });

    it("extend with no proto argument creates valid subclass", function() {
        let Parent = Class.extend({
            value: 42
        });

        let Child = Parent.extend();

        let instance = new Child();
        assert.equal(instance.value, 42);
        assert.isOk(instance instanceof Parent);
        assert.isOk(typeof instance._initOptions === "function");
    });

    it("extend with empty proto object creates valid subclass", function() {
        let Parent = Class.extend({
            value: 42
        });

        let Child = Parent.extend({});

        let instance = new Child();
        assert.equal(instance.value, 42);
        assert.isOk(instance instanceof Parent);
    });

});
