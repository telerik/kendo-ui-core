(function() {
    var dataviz = kendo.dataviz,
        util = dataviz.util;

    // ------------------------------------------------------------
    (function() {
        var ElementsArray = kendo.drawing.ElementsArray,
            array, observer, element1, element2, element3;

        var ChangeElementsArray = ElementsArray.extend({
            _change: function() {
                this.trigger("change");
            }
        });

        function Element(id) {
            this.id = id;
        }

        kendo.deepExtend(Element.prototype, kendo.mixins.ObserversMixin);

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
})();
