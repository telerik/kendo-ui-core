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

    var roleSelector = kendo.roleSelector;

    var ViewClone = kendo.mobile.ui.Widget.extend({
        init: function(view) {
            this.element = view.element.clone(true);
            this.header = this.element.children(roleSelector("header"));
            this.content = this.element.children(roleSelector("content"));
            this.footer = this.element.children(roleSelector("footer"));
            this.params = JSON.stringify(view.params);
        }
    });
    module("view cloning");

    test("the clone contains the same element as the original", 4, function() {
        setup('<div data-role="view"><header data-role="header">Header</header>Content<footer data-role="footer"></footer></div>');
        var clone = new ViewClone(view);
        equal(clone.element.html(), view.element.html());
        equal(clone.header.html(), view.header.html());
        equal(clone.content.html(), view.content.html());
        equal(clone.footer.html(), view.footer.html());
    });
})();
