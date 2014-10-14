(function() {
    var dataviz = kendo.dataviz,
        util = dataviz.util;

    (function() {
        var ObserversMixin = kendo.mixins.ObserversMixin;
        var Element = function() {};
        var Observer = function() {
            this._optionsChange = [];
            this._geometryChange = [];
            this._change = [];
        };
        var element, observer, observers;

        Observer.prototype = {
            optionsChange: function(e) {
                this._optionsChange.push(e);
            },

            geometryChange: function(e) {
                this._geometryChange.push(e);
            },

            change: function(e) {
                this._change.push(e);
            }
        };

        kendo.deepExtend(Element.prototype, ObserversMixin);

        function setup() {
            observer = new Observer();
            element = new Element();
            observers = element.observers();
        }

        // ------------------------------------------------------------
        module("Observers", {
            setup: setup
        });

        test("observers returns array", function() {
            ok($.isArray(element.observers()));
        });

        test("addObserver adds element to observers", function() {
            element.addObserver(observer);
            equal(observers.length, 1);
            equal(observers[0], observer);
        });

        test("removeObserver adds element to observers", function() {
            element.addObserver(observer);
            element.removeObserver(observer);
            equal(observers.length, 0);
        });

        // ------------------------------------------------------------
        module("Observers / trigger", {
            setup: function() {
                setup();
                element.addObserver(observer);
            }
        });

        test("calls observers method", function() {
            observer.change = function() {
                equal(this, observer);
            };
            element.trigger("change");
        });

        test("calls observers method with argument", function() {
            element.trigger("change", "foo");
            equal(observer._change[0], "foo");
        });

        test("does not call observers method if suspended", function() {
            element.suspend();
            element.trigger("change");
            equal(observer._change.length, 0);
        });

        test("calls observers method if resumed", function() {
            element.suspend();
            element.resume();
            element.trigger("change");
            equal(observer._change.length, 1);
        });

        test("does not call observers method if resumed less times than suspended", function() {
            element.suspend();
            element.suspend();
            element.resume();
            element.trigger("change");
            equal(observer._change.length, 0);
        });

        test("calls observers method if resumed without being suspended", function() {
            element.resume();
            element.trigger("change");
            equal(observer._change.length, 1);
        });

        // ------------------------------------------------------------
        module("Observers / geometryChange", {
            setup: function() {
                setup();
                element.addObserver(observer);
            }
        });

        test("calls observers geometryChange method", function() {
            observer.geometryChange = function() {
                equal(this, observer);
            };
            element.geometryChange();
        });

        test("calls observers geometryChange method with argument", function() {
            element.geometryChange("foo");
            equal(observer._geometryChange[0], "foo");
        });

        test("does not call observers method if suspended", function() {
            element.suspend();
            element.geometryChange();
            equal(observer._geometryChange.length, 0);
        });

        test("calls observers method geometryChange if resumed", function() {
            element.suspend();
            element.resume();
            element.geometryChange();
            equal(observer._geometryChange.length, 1);
        });

        // ------------------------------------------------------------
        module("Observers / optionsChange", {
            setup: function() {
                setup();
                element.addObserver(observer);
            }
        });

        test("calls observers optionsChange method", function() {
            observer.optionsChange = function() {
                equal(this, observer);
            };
            element.optionsChange();
        });

        test("calls observers optionsChange method with argument", function() {
            element.optionsChange("foo");
            equal(observer._optionsChange[0], "foo");
        });

        test("does not call observers method if suspended", function() {
            element.suspend();
            element.optionsChange();
            equal(observer._optionsChange.length, 0);
        });

        test("calls observers optionsChange method if resumed", function() {
            element.suspend();
            element.resume();
            element.optionsChange();
            equal(observer._optionsChange.length, 1);
        });

        // ------------------------------------------------------------
        module("Observers / observer field", {
            setup: function() {
                setup();
                element.foo = new Element();
                element.foo.addObserver(element);
            }
        });

        test("sets field observer", function() {
            var newElement = new Element();
            element._observerField("foo", newElement);
            equal(newElement.observers()[0], element);
        });

        test("clears existing field observer", function() {
            var existingElement = element.foo;
            var newElement = new Element();
            element._observerField("foo", newElement);
            equal(existingElement.observers().length, 0);
        });
    })();

})();
