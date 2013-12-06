(function() {
    var dom;

    module('panelbar MVVM', {
        setup: function() {
            QUnit.fixture.html('<script type="text/x-kendo-template" id="template"><li>${text}</li></script>');
        },
        teardown: function() {
            kendo.destroy(dom);
        }
    });

    test("initializes a panelbar when data role is panelbar", function() {
        dom = $('<div data-role="panelbar"></div>');

        kendo.bind(dom);

        ok(dom.data("kendoPanelBar") instanceof kendo.ui.PanelBar);
    });

    test("initializes a options from data attributes", function() {
        dom = $('<div data-role="panelbar" data-expand-mode="single"></div>');

        kendo.bind(dom);

        var panelbar = dom.data("kendoPanelBar");

        equal(panelbar.options.expandMode, "single");
    });

    test("binding panelbar initialized before binding", function() {
        dom = $('<div data-expand-mode="single"></div>');

        dom.kendoPanelBar();

        kendo.bind(dom);

        equal(dom.data("kendoPanelBar").options.expandMode, "single");
    });

    test("binding containing binding attributes", function() {
        dom = $('<div data-role="panelbar"><span data-bind="text:text"></span></div>');

        var observable = kendo.observable({ text:"foo" });

        kendo.bind(dom, observable);

        equal($.trim(dom.find("span:first").html()), "foo");
    });

    test("updating viewModel updates the content", function() {
        dom = $('<div data-role="panelbar"><span data-bind="text:text"></span></div>');

        var observable = kendo.observable({ text:"foo" });

        kendo.bind(dom, observable);

        observable.set("text", "bar");

        equal($.trim(dom.find("span:first").html()), "bar");
    });

    test("source binding is skipped if set to target element", function() {
        dom = $('<ul id="container" data-template="template" data-bind="source:items"></ul>');

        var observable = kendo.observable({ items: [{text: "foo"}, {text:"bar" }] });

        kendo.bind(dom, observable);
        dom.kendoPanelBar();
        equal(dom.children().length, 2)
    });

    test("event is raised if attached as option", 1, function() {
        window.panelBarExpand = function() {
            ok(true);
        }

        dom = $('<div data-role="panelbar" data-expand="panelBarExpand"></div>');

        kendo.bind(dom);

        dom.data("kendoPanelBar").trigger("expand");
    });


    test("binding visible to true shows the panelbar", function() {
        dom = $('<div data-role="panelbar" data-bind="visible: visible"></div>');

        kendo.bind(dom, { visible: true });

        var panelbar = dom.data("kendoPanelBar");

        ok(panelbar.wrapper.css("display") != "none", "panelbar is visible");
    });

    test("binding visible to false hides the panelbar", function() {
        dom = $('<div data-role="panelbar" data-bind="visible: visible"></div>');

        kendo.bind(dom, { visible: false });

        var panelbar = dom.data("kendoPanelBar");

        ok(panelbar.wrapper.css("display") == "none", "panelbar is not visible");
    });

    test("binding invisible to true hides the panelbar", function() {
        dom = $('<div data-role="panelbar" data-bind="invisible: invisible"></div>');

        kendo.bind(dom, { invisible: true });

        var panelbar = dom.data("kendoPanelBar");

        ok(panelbar.wrapper.css("display") == "none", "panelbar is invisible");
    });

    test("binding invisible to false shows the panelbar", function() {
        dom = $('<div data-role="panelbar" data-bind="invisible: invisible"></div>');

        kendo.bind(dom, { invisible: false });

        var panelbar = dom.data("kendoPanelBar");

        ok(panelbar.wrapper.css("display") != "none", "panelbar is not invisible");
    });
})();
