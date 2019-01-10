(function() {

    var TestWidget = kendo.ui.Widget.extend({
        init: function(element, options) {
            kendo.ui.Widget.fn.init.call(this, element, options);

            this._value = "foo";
        },
        value: function(value) {
            if (value) {
                this._value = value;
            } else {
                return this._value;
            }
        },
        options: {
            name: "TestWidget",
            foo: "",
        }
    });

    var dom;

    describe("dispatch", function() {
        beforeEach(function() {
            kendo.ui.plugin(TestWidget);
        });
        afterEach(function() {
            kendo.destroy(dom);
        })

        it("invokes a widget method via the jQuery plugin", function() {
            dom = $("<div/>").kendoTestWidget();

            var testwidget = dom.data("kendoTestWidget");
            stub(testwidget, "value");

            dom.kendoTestWidget("value");

            assert.equal(testwidget.calls("value"), 1);
        });

        it("passes arguments to method", function() {
            dom = $("<div/>").kendoTestWidget();

            var testwidget = dom.data("kendoTestWidget");
            stub(testwidget, "value");

            dom.kendoTestWidget("value", "bar");

            assert.equal(testwidget.args("value")[0], "bar");
        });

        it("invokes the method for all widgets matching the selector", function() {
            dom = $("<div/><div/>").kendoTestWidget();

            var testwidget1 = dom.eq(0).data("kendoTestWidget");
            stub(testwidget1, "value");
            var testwidget2 = dom.eq(1).data("kendoTestWidget");
            stub(testwidget2, "value");

            dom.kendoTestWidget("value", "bar");

            assert.equal(testwidget1.calls("value"), 1);
            assert.equal(testwidget2.calls("value"), 1);
        });

        it("the jQuery object is returned after invocation", function() {
            dom = $("<div/>").kendoTestWidget();

            assert.strictEqual(dom.kendoTestWidget("value", "foo"), dom);
        });

        it("returns the result of the method if there is any", function() {
            dom = $("<div/>").kendoTestWidget();
            assert.equal(dom.kendoTestWidget("value"), "foo");
        });

        it("calls the method of the first widget only if it returns a result", function() {
            dom = $("<div/><div/>").kendoTestWidget();

            var testwidget = dom.eq(1).data("kendoTestWidget");
            stub(testwidget, "value");

            dom.kendoTestWidget("value");

            assert.equal(testwidget.calls("value"), 0);
        });

        it("throws error if method is invoked before the widget is initialized", function() {
            try {
                dom = $("<div/>");
                dom.kendoTestWidget("value");
            } catch (e) {
                assert.equal(e.message, "Cannot call method 'value' of kendoTestWidget before it is initialized");
            }
        });

        it("throws error if the method does not exist", function() {
            try {
                dom = $("<div/>").kendoTestWidget();
                dom.kendoTestWidget("foo");
            } catch (e) {
                assert.equal(e.message, "Cannot find method 'foo' of kendoTestWidget");
            }
        });

        it("throws error if trying to invoke a field", function() {
            try {
                dom = $("<div/>").kendoTestWidget();
                dom.kendoTestWidget("options");
            } catch (e) {
                assert.equal(e.message, "Cannot find method 'options' of kendoTestWidget");
            }
        });

    });
}());
