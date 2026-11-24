import '@progress/kendo-ui/src/kendo.binder.js';

let Binder = kendo.data.Binder;

//specific widget binding
kendo.data.binders.widget.testwidget = {
    test: Binder.extend({
        init: function(widget, bindings, options) {
            Binder.fn.init.call(this, widget.element[0], bindings, options);

            this.widget = widget;
        },

        refresh: function() {
            this.widget.trigger("change");
        }
    })
};

let TestWidget = kendo.ui.Widget.extend({
    init: function(element, options) {
        kendo.ui.Widget.fn.init.call(this, element, options);
    },

    options: {
        name: "TestWidget",
    },

    events: [
        "change"
    ]
});


let MobileTestWidget = kendo.mobile.ui.Widget.extend({
    init: function(element, options) {
        kendo.mobile.ui.Widget.fn.init.call(this, element, options);
    },

    options: {
        name: "TestWidget2",
    }
});

let dom;

describe("mvvm widgets", function() {
    beforeEach(function() {
        kendo.ui.plugin(TestWidget);
        kendo.mobile.ui.plugin(MobileTestWidget);
    });
    afterEach(function() {
        kendo.destroy(dom);
    });

    it("widgets are initialized", function() {
        dom = $('<div><span id="foo" data-role="testwidget"></span></div>');
        kendo.bind(dom, {}, kendo.ui);
        assert.isOk(dom.find("#foo").data("kendoTestWidget"));
    });

    it("full path widgets are initialized", function() {
        dom = $('<div><span id="foo" data-role="kendo.ui.TestWidget"></span></div>');
        kendo.bind(dom, {}, kendo.ui);
        assert.isOk(dom.find("#foo").data("kendoTestWidget"));
    });

    it("widgets are initialized from multiple namespaces", function() {
        dom = $('<div><span id="foo" data-role="testwidget"></span><span id="bar" data-role="testwidget2"></span></div>');
        kendo.bind(dom, {}, kendo.ui, kendo.mobile.ui);
        assert.isOk(dom.find("#bar").data("kendoMobileTestWidget2"));
    });

    it("widget specific binding is allowed", function() {
        dom = $('<div><span id="foo" data-role="kendo.ui.TestWidget" data-bind="test: test"></span></div>');
        kendo.bind(dom, {}, kendo.ui);

        assert.isOk(dom.find("#foo").data("kendoTestWidget"));
    });

    it("widget event bindings replace the previous handler", function() {
        dom = $('<div><span id="foo" data-role="testwidget" data-bind="events: { change: onChange }"></span></div>');

        let oldCount = 0;
        let newCount = 0;
        let viewModel = kendo.observable({
            onChange: function() {
                oldCount++;
            }
        });

        kendo.bind(dom, viewModel, kendo.ui);

        viewModel.set("onChange", function() {
            newCount++;
        });

        dom.find("#foo").data("kendoTestWidget").trigger("change");

        assert.equal(oldCount, 0);
        assert.equal(newCount, 1);
    });

    it("legacy extended widget change binders subscribe to widget changes", function() {
        kendo.data.binders.widget.testwidget.checked = kendo.data.binders.widget.checked.extend({
            refresh: function() {}
        });
        dom = $('<div><input type="checkbox" id="foo" data-role="testwidget" data-bind="checked: isChecked" /></div>');

        let viewModel = kendo.observable({ isChecked: false });

        try {
            kendo.bind(dom, viewModel, kendo.ui);

            dom.find("#foo")[0].checked = true;
            dom.find("#foo").data("kendoTestWidget").trigger("change");

            assert.isTrue(viewModel.get("isChecked"));
        } finally {
            delete kendo.data.binders.widget.testwidget.checked;
        }
    });

    it("source widget binder exposes its own init through fn for legacy delegation", function() {
        let SourceBinder = kendo.data.binders.widget.source;
        let CustomSourceBinder = SourceBinder.extend({
            init: function(widget, bindings, options) {
                SourceBinder.fn.init.call(this, widget, bindings, options);
            }
        });
        let widget = { element: $("<div>"), bind: function() { } };
        let binder = new CustomSourceBinder(widget, {}, {});

        assert.equal(SourceBinder.fn, SourceBinder.prototype);
        assert.equal(binder.widget, widget);
        assert.isFunction(binder._dataBinding);
    });

    it("visible and invisible widget binders fall back to element when widget has no wrapper", function() {
        dom = $('<div><div id="foo" data-role="testwidget" data-bind="visible: show"></div><div id="bar" data-role="testwidget" data-bind="invisible: show"></div></div>').appendTo(Mocha.fixture);
        let viewModel = kendo.observable({ show: false });

        kendo.bind(dom, viewModel, kendo.ui);

        assert.equal(dom.find("#foo")[0].style.display, "none");
        assert.equal(dom.find("#bar")[0].style.display, "");

        viewModel.set("show", true);

        assert.equal(dom.find("#foo")[0].style.display, "");
        assert.equal(dom.find("#bar")[0].style.display, "none");

        kendo.unbind(dom);
    });
});
