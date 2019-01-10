(function() {

var dom;

describe('menu MVVM', function () {
    afterEach(function() {
        kendo.destroy(dom);
    });

it("initializes a menu when data role is menu", function() {
    dom = $('<ul data-role="menu"></ul>');

    kendo.bind(dom);

    assert.isOk(dom.data("kendoMenu") instanceof kendo.ui.Menu);
});

it("initializes a options from data attributes", function() {
    dom = $('<ul data-role="menu" data-animation="false"></ul>');

    kendo.bind(dom);

    var menu = dom.data("kendoMenu");

    assert.isOk($.isEmptyObject(menu.options.animation.effects));
});

it("binding menu initialized before binding", function() {
    dom = $('<ul data-animation="false"></ul>');

    var menu = dom.kendoMenu().data("kendoMenu");

    kendo.bind(dom);

    assert.isOk($.isEmptyObject(menu.options.animation.effects));
});

it("binding containing binding attributes", function() {
    dom = $('<ul data-role="menu"><span data-bind="text:text"></span></ul>');

    var observable = kendo.observable({ text:"foo" });

    kendo.bind(dom, observable);

    assert.equal($.trim(dom.find("span:first").html()), "foo");
});

it("updating viewModel updates the content", function() {
    dom = $('<ul data-role="menu"><span data-bind="text:text"></span></ul>');

    var observable = kendo.observable({ text:"foo" });

    kendo.bind(dom, observable);

    observable.set("text", "bar");

    assert.equal($.trim(dom.find("span:first").html()), "bar");
});

it("event is raised if attached as option", function() {
    window.menuMVVMSelect = function() {
        assert.isOk(true);
    }
    dom = $('<ul data-role="menu" data-select="menuMVVMSelect"></ul>');

    kendo.bind(dom);

    dom.data("kendoMenu").trigger("select");
});


it("binding visible to true shows the menu", function() {
    dom = $('<div data-role="menu" data-bind="visible: visible"></div>');

    kendo.bind(dom, { visible: true });

    var menu = dom.data("kendoMenu");

    assert.isOk(menu.wrapper.css("display") != "none", "menu is visible");
});

it("binding visible to false hides the menu", function() {
    dom = $('<div data-role="menu" data-bind="visible: visible"></div>');

    kendo.bind(dom, { visible: false });

    var menu = dom.data("kendoMenu");

    assert.isOk(menu.wrapper.css("display") == "none", "menu is not visible");
});

it("binding invisible to true hides the menu", function() {
    dom = $('<div data-role="menu" data-bind="invisible: invisible"></div>');

    kendo.bind(dom, { invisible: true });

    var menu = dom.data("kendoMenu");

    assert.isOk(menu.wrapper.css("display") == "none", "menu is invisible");
});

it("binding invisible to false shows the menu", function() {
    dom = $('<div data-role="menu" data-bind="invisible: invisible"></div>');

    kendo.bind(dom, { invisible: false });

    var menu = dom.data("kendoMenu");

    assert.isOk(menu.wrapper.css("display") != "none", "menu is not invisible");
});
    });
}());
