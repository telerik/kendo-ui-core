(function() {
    module("MVVM", {
        setup: function() {
            kendo.effects.disable();

            window.openHandler = function() {
                ok(true);
            };
        },
        teardown: function() {
          QUnit.fixture.closest("body").find(".k-dialog .k-content").each(function(idx, element) {
                $(element).data("kendoDialog").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
            kendo.effects.enable();

            delete window.openHandler;
        }
    });

    test("initializes a dialog when data role is dialog", function() {
        var dom = $('<div data-role="dialog"></div>');

        kendo.bind(dom);

        ok(dom.data("kendoDialog") instanceof kendo.ui.Dialog);
    });

    test("initializes a options from data attributes", function() {
        var dom = $('<div data-role="dialog" data-modal="true"></div>');

        kendo.bind(dom);

        var dialog = dom.data("kendoDialog");

        equal(dialog.options.modal, true);
    });

    test("initializes modal false from data attributes", function() {
        var dom = $('<div data-role="dialog" data-modal="false"></div>');

        kendo.bind(dom);

        var dialog = dom.data("kendoDialog");

        equal(dialog.options.modal, false);
    });

    test("binding dialog initialized before binding", function() {
        var dom = $('<div data-modal="false"></div>');

        var dialog = dom.kendoDialog().data("kendoDialog");

        kendo.bind(dom);

        equal(dialog.options.modal, false);
    });

    test("binding containing binding attributes", function() {
        var dom = $('<div data-role="dialog"><span data-bind="text:text"></span></div>');

        var observable = kendo.observable({ text:"foo" });

        kendo.bind(dom, observable);

        equal($.trim(dom.find("span:first").html()), "foo");
    });

    test("updating viewModel updates the content", function() {
        var dom = $('<div data-role="dialog"><span data-bind="text:text"></span></div>');

        var observable = kendo.observable({ text:"foo" });

        kendo.bind(dom, observable);

        observable.set("text", "bar");

        equal($.trim(dom.find("span:first").html()), "bar");
    });

    test("event is raised if attached as option", 1, function() {
        var dom = $('<div data-role="dialog" data-open="openHandler"></div>');

        kendo.bind(dom);

        dom.data("kendoDialog").trigger("open");
    });

    test("binding visible to true shows the dialog", function() {
        var dom = $('<div data-role="dialog" data-bind="visible: visible"></div>');

        kendo.bind(dom, { visible: true });

        var dialog = dom.data("kendoDialog");

        ok(dialog.wrapper.css("display") != "none", "dialog is visible");
    });

    test("binding visible to false hides the dialog", function() {
        var dom = $('<div data-role="dialog" data-bind="visible: visible"></div>');

        kendo.bind(dom, { visible: false });

        var dialog = dom.data("kendoDialog");

        ok(dialog.wrapper.css("display") == "none", "dialog is not visible");
    });

    test("binding invisible to true hides the dialog", function() {
        var dom = $('<div data-role="dialog" data-bind="invisible: invisible"></div>');

        kendo.bind(dom, { invisible: true });

        var dialog = dom.data("kendoDialog");

        ok(dialog.wrapper.css("display") == "none", "dialog is invisible");
    });

    test("binding invisible to false shows the dialog", function() {
        var dom = $('<div data-role="dialog" data-bind="invisible: invisible"></div>');

        kendo.bind(dom, { invisible: false });

        var dialog = dom.data("kendoDialog");

        ok(dialog.wrapper.css("display") != "none", "dialog is not invisible");
    });

    test("bind visible through data attribute", function() {
        var dom = $('<div data-role="dialog" data-visible="false"></div>').appendTo(QUnit.fixture);

        kendo.bind(dom, {});

        var dialog = dom.data("kendoDialog");

        ok(dialog.wrapper.css("display") == "none");
    });

    test("set width and height through data attribute", function() {
        var dom = $('<div data-role="dialog" data-width="212" data-height="233"></div>').appendTo(QUnit.fixture);

        kendo.bind(dom, {});

        var dialog = dom.data("kendoDialog");

        equal(dialog.wrapper.width(), 212);
        equal(dialog.wrapper.height(), 233);
    });

    test("set content through data attribute", function() {
        var dom = $('<div data-role="dialog" data-content="echo"></div>').appendTo(QUnit.fixture);

        kendo.bind(dom, {});

        var dialog = dom.data("kendoDialog");

        ok(dialog.options.content);
        equal(dialog.options.content, "echo");
    });
})();
