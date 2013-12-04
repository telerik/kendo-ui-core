(function() {
    module("MVVM", {
        setup: function() {
            kendo.effects.disable();
            $.mockjax({ url: "echo", responseText: "echo!" });

            window.openHandler = function() {
                ok(true);
            }
        },
        teardown: function() {
            QUnit.fixture.closest("body").find(".k-window-content").each(function(idx, element){
                $(element).data("kendoWindow").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
            kendo.effects.enable();

            delete window.openHandler;
        }
    });

    test("initializes a window when data role is window", function() {
        var dom = $('<div data-role="window"></div>');

        kendo.bind(dom);

        ok(dom.data("kendoWindow") instanceof kendo.ui.Window);
    });

    test("initializes a options from data attributes", function() {
        var dom = $('<div data-role="window" data-modal="true"></div>');

        kendo.bind(dom);

        var win = dom.data("kendoWindow");

        equal(win.options.modal, true);
    });

    test("binding window initialized before binding", function() {
        var dom = $('<div data-modal="true"></div>');

        var win = dom.kendoWindow().data("kendoWindow");

        kendo.bind(dom);

        equal(win.options.modal, true);
    });

    test("binding containing binding attributes", function() {
        var dom = $('<div data-role="window"><span data-bind="text:text"></span></div>');

        var observable = kendo.observable({ text:"foo" });

        kendo.bind(dom, observable);

        equal($.trim(dom.find("span:first").html()), "foo");
    });

    test("updating viewModel updates the content", function() {
        var dom = $('<div data-role="window"><span data-bind="text:text"></span></div>');

        var observable = kendo.observable({ text:"foo" });

        kendo.bind(dom, observable);

        observable.set("text", "bar");

        equal($.trim(dom.find("span:first").html()), "bar");
    });

    test("event is raised if attached as option", 1, function() {
        var dom = $('<div data-role="window" data-open="openHandler"></div>');

        kendo.bind(dom);

        dom.data("kendoWindow").trigger("open");
    });

    test("binding visible to true shows the window", function() {
        var dom = $('<div data-role="window" data-bind="visible: visible"></div>');

        kendo.bind(dom, { visible: true });

        var window = dom.data("kendoWindow");

        ok(window.wrapper.css("display") != "none", "window is visible");
    });

    test("binding visible to false hides the window", function() {
        var dom = $('<div data-role="window" data-bind="visible: visible"></div>');

        kendo.bind(dom, { visible: false });

        var window = dom.data("kendoWindow");

        ok(window.wrapper.css("display") == "none", "window is not visible");
    });

    test("binding invisible to true hides the window", function() {
        var dom = $('<div data-role="window" data-bind="invisible: invisible"></div>');

        kendo.bind(dom, { invisible: true });

        var window = dom.data("kendoWindow");

        ok(window.wrapper.css("display") == "none", "window is invisible");
    });

    test("binding invisible to false shows the window", function() {
        var dom = $('<div data-role="window" data-bind="invisible: invisible"></div>');

        kendo.bind(dom, { invisible: false });

        var window = dom.data("kendoWindow");

        ok(window.wrapper.css("display") != "none", "window is not invisible");
    });

    test("bind visible through data attribute", function() {
        var dom = $('<div data-role="window" data-visible="false"></div>').appendTo(QUnit.fixture);

        kendo.bind(dom, {});

        var window = dom.data("kendoWindow");

        ok(window.wrapper.css("display") == "none");
    });

    test("set width and height through data attribute", function() {
        var dom = $('<div data-role="window" data-width="144" data-height="233"></div>').appendTo(QUnit.fixture);

        kendo.bind(dom, {});

        var window = dom.data("kendoWindow");

        equal(window.wrapper.width(), 144);
        equal(window.wrapper.height(), 233);
    });

    test("set content through data attribute", function() {
        var dom = $('<div data-role="window" data-content="echo"></div>').appendTo(QUnit.fixture);

        kendo.bind(dom, {});

        var window = dom.data("kendoWindow");

        ok(window.options.content);
        equal(window.options.content.url, "echo");
    });

    test("set appendTo through data attribute", function() {
        var dom = $('<div data-role="window" data-append-to="#bar" /><div id="bar" />').appendTo(QUnit.fixture);

        kendo.bind(dom, {});

        var window = dom.data("kendoWindow");

        ok($.contains($("#bar")[0], window.element[0]));
    });
})();
