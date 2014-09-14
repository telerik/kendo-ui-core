(function() {
    var dataviz = kendo.dataviz,
        util = dataviz.util;

    // ------------------------------------------------------------
    module("Generic Helpers");

    test("sqr returns a * a", function() {
        equal(util.sqr(2), 4);
    });

    // ------------------------------------------------------------
    module("Hashing");

    test("objectKey serializes object key/values", function() {
        equal(util.objectKey({ foo: true }), "footrue");
    });

    test("objectKey sorts keys", function() {
        equal(util.objectKey({ foo: true, bar: false }), "barfalsefootrue");
    });

    test("hashKey matches pre-computed FNV-1 hashes", function() {
        equal(util.hashKey("footrue"), 0xBFE48FAB, "Case #1");
        equal(util.hashKey("barfalse"), 0xEC55C421, "Case #2");
    });

    test("hashObject matches pre-computed FNV-1 hashes", function() {
        equal(util.hashObject({ foo: true }), 0xBFE48FAB, "Case #1");
        equal(util.hashObject({ bar: false }), 0xEC55C421, "Case #2");
    });

    test("hashObject ignores key order", function() {
        equal(util.hashObject({ foo: true, bar: false }),
              util.hashObject({ bar: false, foo: true }));
    });

    // ------------------------------------------------------------
    module("Array Helpers");

    test("arrayLimits returns the minimum and maximum number in an array", function() {
        var result = util.arrayLimits([5, -1, 4, 7, 2]);
        equal(result.min, -1);
        equal(result.max, 7);
    });

    test("arrayMin returns the minimum number in an array", function() {
        equal(util.arrayMin([5, -1, 4, 7, 2]), -1);
    });

    test("arrayMax returns the maximum number in an array", function() {
        equal(util.arrayMax([5, -1, 4, 7, 2]), 7);
    });

    test("sparseArrayLimits ignores undefined values", function() {
        var l = util.sparseArrayLimits([1, undefined, 2]);
        equal(l.min, 1);
        equal(l.max, 2);
    });

    test("sparseArrayLimits returns undefined for empty array", function() {
        var l = util.sparseArrayLimits([]);
        equal(l.min, undefined);
        equal(l.max, undefined)
    });

    test("sparseArrayMin returns array min", function() {
        equal(util.sparseArrayMin([1, undefined, 2]), 1);
    });

    test("sparseArrayMax returns array max", function() {
        equal(util.sparseArrayMax([1, undefined, 2]), 2);
    });

    test("last returns last element in array", function() {
        equal(util.last([0, 1]), 1);
    });

    test("last returns undefined for empty array", function() {
        equal(util.last([]), undefined);
    });

    test("last returns undefined for undefined", function() {
        equal(util.last(), undefined);
    });

    test("append adds array elements", function() {
        var arr = [0];
        util.append(arr, [1, 2]);

        deepEqual(arr, [0, 1, 2]);
    });

    test("append returns target array", function() {
        deepEqual(util.append([0], [1, 2]), [0, 1, 2]);
    });

    // ------------------------------------------------------------
    (function() {
        var ElementsArray = util.ElementsArray,
            array, observer, element1, element2, element3;

        var ChangeElementsArray = ElementsArray.extend({
            _change: function() {
                this.trigger("change");
            }
        });

        function Element(id) {
            this.id = id;
        }

        kendo.deepExtend(Element.prototype, util.ObserversMixin);

        function Observer() {
            this.calls = 0;
        }

        Observer.prototype = {
            change: function() {
                this.calls++;
            }
        };

        function createElementsArray(elements) {
          observer = new Observer();
          array = new ChangeElementsArray(elements);
          array.addObserver(observer);
        }

        function initElements() {
            element1 = new Element("foo");
            element2 = new Element("bar");
            element3 = new Element("baz");
        }

        function setup() {
            createElementsArray();
            initElements();
        }

        function isArrayObserver(element) {
            equal(element.observers()[0], array);
        }

        function hasNoObservers(element) {
            equal(element.observers().length, 0);
        }

        module("Array Helpers / ElementsArray");

        test("sets initial length", function() {
            createElementsArray();
            equal(array.length, 0);
        });

        test("sets initial array", function() {
            initElements();
            createElementsArray([element1, element2, element3]);
            equal(array.length, 3);
            equal(array[0].id, "foo");
            equal(array[1].id, "bar");
            equal(array[2].id, "baz");
        });

        test("sets initial elements observer", function() {
            initElements();
            createElementsArray([element1, element2, element3]);
            isArrayObserver(element1);
            isArrayObserver(element2);
            isArrayObserver(element3);
        });

        // ------------------------------------------------------------
        module("Array Helpers / ElementsArray / elements", {
            setup: setup
        });

        test("sets current elements", function() {
            array.elements([element1]);
            equal(array.length, 1);
            equal(array[0].id, "foo");
        });

        test("sets elements observer", function() {
            array.elements([element1]);
            isArrayObserver(element1)
        });

        test("clears previous elements", function() {
            array.elements([element1, element2]);
            array.elements([element3]);
            equal(array.length, 1);
            equal(array[0].id, "baz");
            equal(array[1], undefined);
        });

        test("clears previous elements observer", function() {
            array.elements([element1, element2]);
            array.elements([element3]);
            hasNoObservers(element1);
            hasNoObservers(element2);
        });

        test("triggers change", function() {
            array.elements([element1]);
            equal(observer.calls, 1);
        });

        test("returns current elements", function() {
            array.elements([element1]);
            var elements = array.elements();
            equal(elements.length, 1);
            equal(elements[0].id, "foo");
        });

        // ------------------------------------------------------------
        module("Array Helpers / ElementsArray / push", {
            setup: setup
        });

        test("adds element", function() {
            array.push(element1);
            equal(array.length, 1);
            equal(array[0].id, "foo");
        });

        test("sets new element observer", function() {
            array.push(element1);
            equal(array.length, 1);
            isArrayObserver(element1);
        });

        test("adds multiple elements", function() {
            array.push(element1, element2);
            equal(array.length, 2);
            equal(array[0].id, "foo");
            equal(array[1].id, "bar");
        });

        test("sets elements observer", function() {
            array.push(element1, element2);
            isArrayObserver(element1);
            isArrayObserver(element2);
        });

        test("triggers change", function() {
            array.push(element1);
            equal(observer.calls, 1);
        });

        // ------------------------------------------------------------
        module("Array Helpers / ElementsArray / pop", {
            setup: function() {
                initElements();
                createElementsArray([element1, element2]);
            }
        });

        test("removes last element", function() {
            array.pop();
            equal(array.length, 1);
            equal(array[0].id, "foo");
            equal(array[1], undefined);
        });

        test("returns removed element", function() {
            var element = array.pop();
            equal(element.id, "bar");
        });

        test("clears element observer", function() {
            array.pop();
            hasNoObservers(element2);
        });

        test("triggers change", function() {
            array.pop();
            equal(observer.calls, 1);
        });

        test("does not trigger change if there are no elements", function() {
            createElementsArray();
            array.pop();
            equal(observer.calls, 0);
        });

        // ------------------------------------------------------------
        module("Array Helpers / ElementsArray / splice", {
            setup: function() {
                initElements();
                createElementsArray([element1, element2, element3]);
            }
        });

        test("removes elements", function() {
            array.splice(1, 2);
            equal(array.length, 1);
            equal(array[0].id, "foo");
            equal(array[1], undefined);
            equal(array[2], undefined);
        });

        test("clears removed elements observer", function() {
            array.splice(1, 2);
            hasNoObservers(element2);
            hasNoObservers(element3);
        });

        test("replaces elements", function() {
            var newElement = new Element("new");
            array.splice(1, 1, newElement);
            equal(array.length, 3);
            equal(array[1].id, "new");
        });

        test("clears replaced elements observer", function() {
            var newElement = new Element("new");
            array.splice(1, 1, newElement);
            hasNoObservers(element2);
        });

        test("sets replace elements observer", function() {
            var newElement = new Element("new");
            array.splice(1, 1, newElement);
            isArrayObserver(newElement);
        });

        test("inserts elements", function() {
            var newElement = new Element("new");
            array.splice(1, 0, newElement);
            equal(array.length, 4);
            equal(array[1].id, "new");
        });

        test("sets inserted elements observer", function() {
            var newElement = new Element("new");
            array.splice(1, 0, newElement);
            isArrayObserver(newElement);
        });

        test("triggers change", function() {
            array.splice(1, 2);
            equal(observer.calls, 1);
        });

        // ------------------------------------------------------------
        module("Array Helpers / ElementsArray / shift", {
            setup: function() {
                initElements();
                createElementsArray([element1]);
            }
        });

        test("removes first element", function() {
            array.shift();
            equal(array.length, 0);
        });

        test("returns removed element", function() {
            var result = array.shift();
            equal(result, element1);
        });

        test("clears removed element observer", function() {
            array.shift();
            hasNoObservers(element1);
        });

        test("triggers change", function() {
            array.shift();
            equal(observer.calls, 1);
        });

        // ------------------------------------------------------------
        module("Array Helpers / ElementsArray / unshift", {
            setup: function() {
                initElements();
                createElementsArray([element1]);
            }
        });

        test("adds element to the start", function() {
            array.unshift(element2);
            equal(array.length, 2);
            equal(array[0].id, "bar");
        });

        test("sets new element observer", function() {
            array.unshift(element2);
            isArrayObserver(element2);
        });

        test("adds multiple elements to the start", function() {
            array.unshift(element2, element3);
            equal(array.length, 3);
            equal(array[0].id, "bar");
            equal(array[1].id, "baz");
        });

        test("sets new elements observer", function() {
            array.unshift(element2, element3);
            isArrayObserver(element2);
            isArrayObserver(element3);
        });

        test("triggers change", function() {
            array.unshift(element2);
            equal(observer.calls, 1);
        });

        // ------------------------------------------------------------
        module("Array Helpers / ElementsArray / indexOf", {
            setup: function() {
                initElements();
                createElementsArray([element1, element2, element3]);
            }
        });

        test("returns element index", function() {
            equal(array.indexOf(element2), 1);
        });

        test("returns -1 for not existing element", function() {
            equal(array.indexOf({}), -1);
        });
    })();

    // ------------------------------------------------------------
    module("Template helpers");

    test("renderPos renders position class", function() {
        equal(util.renderPos("top"), "k-pos-top");
    });

    test("renderPos renders multiple position classes", function() {
        equal(util.renderPos("topLeft"), "k-pos-top k-pos-left");
    });

    test("renderPos returns empty string", function() {
        equal(util.renderPos(), "");
    });

    test("renderStyle renders style attributes", function() {
        equal(util.renderStyle([["foo", "a"], ["bar", "b"]]), "foo:a;bar:b;");
    });

    test("renderStyle ignores undefined values", function() {
        equal(util.renderStyle([["foo", undefined], ["bar", "b"]]), "bar:b;");
    });

    test("renderStyle returns undefined with no values", function() {
        equal(util.renderStyle([["foo", undefined]]), undefined);
    });


    (function() {
        var ObserversMixin = util.ObserversMixin;
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
