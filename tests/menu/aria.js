(function() {
var menu;

function setup(options) {
    menu = $("<ul />").appendTo(QUnit.fixture).kendoMenu(options);
    return menu;
}

module("ARIA support", {
    setup: function() {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        };
    },
    teardown: function () {
        kendo.destroy(QUnit.fixture);
    }
});

test("menubar role is added to the wrapper", function() {
    setup();
    ok(menu.filter("[role=menubar]").length);
});

test("menuitem role is added to the items of bound menu", function() {
    setup({ dataSource: [ {text: "foo" } ] });
    ok(menu.find("[role=menuitem]").length);
});

test("menuitem role is added to the items of html created menu", function() {
    menu = $("<ul><li>foo</li></ul>")
        .appendTo(QUnit.fixture)
        .kendoMenu();

    ok(menu.find("[role=menuitem]").length);
});

test("has-popup attribute is added if node has childs", function() {
    setup({ dataSource: [ {text: "foo", items: [{ text: "bar" }] } ] });

    equal(menu.find("[aria-haspopup=true] span:first").text(), "foo");
});

test("menu role is added to the group container", function() {
    setup({ dataSource: [ {text: "foo", items: [{ text: "bar" }] } ] });

    equal(menu.find("[role=menu] span:first").text(), "bar");
});

test("menu role is added to the group container when created from html", function() {
    menu = $("<ul><li>foo<ul><li>bar</li></ul></li></ul>")
        .appendTo(QUnit.fixture)
        .kendoMenu();

    equal(menu.find("[role=menu] span:first").text(), "bar");
});

test("disabled attribute is added if node is disabled", function() {
    setup({ dataSource: [ { text: "foo", enabled: false } ] });

    equal(menu.find("[aria-disabled=true] span:first").text(), "foo");
});

test("disabled attribute is added if node is disabled via the API", function() {
    setup({ dataSource: [ { text: "foo" } ] });

    menu.data("kendoMenu").disable(menu.find("li:first"));

    equal(menu.find("[aria-disabled=true] span:first").text(), "foo");
});

test("disabled attribute is added if child node is disabled via the API", function() {
    setup({ dataSource: [ { text: "foo", items: [{ text: "bar" }] } ] });

    menu.data("kendoMenu").disable(menu.find(".k-group li:first"));

    equal(menu.find("[aria-disabled=true] span:first").text(), "bar");
});

test("disabled attribute is added if node is disabled when created from html", function() {
    menu = $("<ul><li disabled='disabled'>foo</li></ul>")
        .appendTo(QUnit.fixture)
        .kendoMenu();

    equal(menu.find("[aria-disabled=true] span:first").text(), "foo");
});

test("hidden attribute is added to the group when created from html", function() {
    menu = $("<ul><li>foo<ul><li>bar</li></ul></li></ul>")
        .appendTo(QUnit.fixture)
        .kendoMenu();

    ok(menu.find(".k-group[aria-hidden=true]").length);
});

test("aria-activedescendant is added to the wrapper when item is focused", function() {
    menu = $("<ul id=\"foo\"/>")
        .appendTo(QUnit.fixture)
        .kendoMenu({ dataSource: [ {text: "foo", items: [{ text: "bar" }] } ] });

    menu[0].focus();

    ok(menu.filter("[aria-activedescendant]").length);
    ok(menu.find("li#" + menu.data("kendoMenu")._ariaId).length);
});

test("aria-activedescendant is added to the wrapper when item is focused", function() {
    menu = $("<ul id=\"foo\"><li id=\"bar\">foo</li></ul>")
        .appendTo(QUnit.fixture)
        .kendoMenu();

    menu[0].focus();

    ok(menu.filter("[aria-activedescendant=bar]").length);
    ok(menu.find("li#bar").length);
});
})();
