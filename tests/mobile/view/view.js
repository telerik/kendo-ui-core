(function() {
    var View = kendo.mobile.ui.View,
        root,
        view;

    function setup(html) {
        root = $(html);
        view = kendo.initWidget(root, {}, kendo.mobile.ui.roles);
    }

    module("mobile view", {
        setup: function() {
            QUnit.fixture.append('<script id="items-template" type="text/x-kendo-template">\
                <span></span>\
                <a data-role="button">Button</a>\
            </script>');
        },

        teardown: function() {
            if (view) {
                view.destroy();
            }
        }
    });

    function eventOk() {
        ok(true);
    }

    test("initializes nested widgets", 1, function() {
        setup('<div data-role="view"><a href="#" data-role="button" id="foo">Button</a></div>');
        ok(root.find("#foo").data("kendoMobileButton"));
    });

    test("initializes web widgets", 1, function() {
        setup('<div data-role="view"><select data-role="dropdownlist" id="foo"><option></option></select></div>');
        ok(root.find("#foo").data("kendoDropDownList"));
    });

    window.viewModel = {foo: "bar", items: [ 1, 2, 3] };

    test("binds to model", 1, function() {
        setup('<div data-model="viewModel" data-role="view"><i data-bind="text: foo"></i></div>');
        equal(root.find("i").text(), "bar");
    });

    test("initializes web widgets when binding", 1, function() {
        setup('<div data-model="viewModel" data-role="view"><select data-role="dropdownlist" id="foo"><option></option></select></div>');
        ok(root.find("#foo").data("kendoDropDownList"));
    });

    test("initializes mobile widgets in given templates when binding", 1, function() {
        setup('<div data-model="viewModel" data-role="view"><div data-bind="source: items" data-template="items-template"></div></div>');
        ok(root.find("a").eq(0).data("kendoMobileButton"));
    });

    test("View parses json data model", function() {
        setup('<div data-role="view" data-model=\'{"foo": "bar"}\'><i data-bind="text: foo"></i></div>');
        equal(root.find("i").text(), "bar");
    });

    test("Uses content container if present", function() {
        setup('<div data-role="view" id="page1"><div data-role="content">Content</div></div>');
        equal(root.find("[data-role=content]").length, 1);
    });

    test("contentElement() returns content if View is stretched", function() {
        setup('<div data-role="view" data-stretch="true"></div>');
        ok(view.content[0] == view.contentElement()[0]);
    });

    test("contentElement() returns scrollerContent if View is not stretched", function() {
        setup('<div data-role="view"></div>');
        ok(view.scrollerContent[0] == view.contentElement()[0]);
    });

    test("uses transition if set as a data option", 1, function() {
        view = kendo.initWidget($('<div data-role="view" data-transition="slide" />'), {}, kendo.mobile.ui.roles);
        equal(view.transition, 'slide');
    });

    test("transition attribute is with higher priority than default transition", 1, function() {
        view = kendo.initWidget($('<div data-role="view" data-transition="slide" />'), { defaultTransition: "overlay:up" }, kendo.mobile.ui.roles);
        equal(view.transition, 'slide');
    });

    test("if no transition, default transition is used", 1, function() {
        view = kendo.initWidget($('<div data-role="view" />'), { defaultTransition: "overlay:up" }, kendo.mobile.ui.roles);
        equal(view.transition, 'overlay:up');
    });
})();
