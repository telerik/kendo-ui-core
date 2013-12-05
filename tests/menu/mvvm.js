(function() {

var dom;

module('menu MVVM', {
    teardown: function() {
        kendo.destroy(dom);
    }
});

test("initializes a menu when data role is menu", function() {
    dom = $('<ul data-role="menu"></ul>');

    kendo.bind(dom);

    ok(dom.data("kendoMenu") instanceof kendo.ui.Menu);
});

test("initializes a options from data attributes", function() {
    dom = $('<ul data-role="menu" data-animation="false"></ul>');

    kendo.bind(dom);

    var menu = dom.data("kendoMenu");

    ok($.isEmptyObject(menu.options.animation.effects));
});

test("binding menu initialized before binding", function() {
    dom = $('<ul data-animation="false"></ul>');

    var menu = dom.kendoMenu().data("kendoMenu");

    kendo.bind(dom);

    ok($.isEmptyObject(menu.options.animation.effects));
});

test("binding containing binding attributes", function() {
    dom = $('<ul data-role="menu"><span data-bind="text:text"></span></ul>');

    var observable = kendo.observable({ text:"foo" });

    kendo.bind(dom, observable);

    equal($.trim(dom.find("span:first").html()), "foo");
});

test("updating viewModel updates the content", function() {
    dom = $('<ul data-role="menu"><span data-bind="text:text"></span></ul>');

    var observable = kendo.observable({ text:"foo" });

    kendo.bind(dom, observable);

    observable.set("text", "bar");

    equal($.trim(dom.find("span:first").html()), "bar");
});

test("event is raised if attached as option", 1, function() {
    window.menuMVVMSelect = function() {
        ok(true);
    }
    dom = $('<ul data-role="menu" data-select="menuMVVMSelect"></ul>');

    kendo.bind(dom);

    dom.data("kendoMenu").trigger("select");
});


test("binding visible to true shows the menu", function() {
    dom = $('<div data-role="menu" data-bind="visible: visible"></div>');

    kendo.bind(dom, { visible: true });

    var menu = dom.data("kendoMenu");

    ok(menu.wrapper.css("display") != "none", "menu is visible");
});

test("binding visible to false hides the menu", function() {
    dom = $('<div data-role="menu" data-bind="visible: visible"></div>');

    kendo.bind(dom, { visible: false });

    var menu = dom.data("kendoMenu");

    ok(menu.wrapper.css("display") == "none", "menu is not visible");
});

test("binding invisible to true hides the menu", function() {
    dom = $('<div data-role="menu" data-bind="invisible: invisible"></div>');

    kendo.bind(dom, { invisible: true });

    var menu = dom.data("kendoMenu");

    ok(menu.wrapper.css("display") == "none", "menu is invisible");
});

test("binding invisible to false shows the menu", function() {
    dom = $('<div data-role="menu" data-bind="invisible: invisible"></div>');

    kendo.bind(dom, { invisible: false });

    var menu = dom.data("kendoMenu");

    ok(menu.wrapper.css("display") != "none", "menu is not invisible");
});
})();
