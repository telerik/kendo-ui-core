(function() {
var menu;

function setup(options) {
    menu = $("<ul />").appendTo(Mocha.fixture).kendoMenu(options);
    return menu;
}

describe("ARIA support", function () {
    beforeEach(function() {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        };
    });
    afterEach(function () {
        kendo.destroy(Mocha.fixture);
    });

it("menubar role is added to the wrapper", function() {
    setup();
    assert.isOk(menu.filter("[role=menubar]").length);
});

it("menuitem role is added to the items of bound menu", function() {
    setup({ dataSource: [ {text: "foo" } ] });
    assert.isOk(menu.find("[role=menuitem]").length);
});

it("menuitem role is added to the items of html created menu", function() {
    menu = $("<ul><li>foo</li></ul>")
        .appendTo(Mocha.fixture)
        .kendoMenu();

    assert.isOk(menu.find("[role=menuitem]").length);
});

it("has-popup attribute is added if node has childs", function() {
    setup({ dataSource: [ {text: "foo", items: [{ text: "bar" }] } ] });

    assert.equal(menu.find("[aria-haspopup=true] span:first").text(), "foo");
});

it("has-popup attribute is added when using append method", function() {
    menu = $("<ul><li id='firstItem'>item 1</li></ul>")
        .appendTo(Mocha.fixture)
        .kendoMenu();

    menu.data("kendoMenu").append({text: 'item'}, $("#firstItem"));
    assert.isOk($("#firstItem").is("[aria-haspopup]"));
})

it("has-popup attribute is not removed when using remove method and there is still group", function() {
    menu = $("<ul><li id='firstItem'>item<ul><li>item 1</li><li id='item2'>item 2</li></ul></li></ul>")
        .appendTo(Mocha.fixture)
        .kendoMenu();

    menu.data("kendoMenu").remove($("#item2"));
    assert.isOk($("#firstItem").is("[aria-haspopup]"));
})

it("has-popup attribute is removed when using remove method and there no group", function() {
    menu = $("<ul><li id='firstItem'>item<ul><li id='item1'>item 1</li></ul></li></ul>")
        .appendTo(Mocha.fixture)
        .kendoMenu();

    menu.data("kendoMenu").remove($("#item1"));
    assert.isOk($("#firstItem").not("[aria-haspopup]"));
})

it("has-popup attribute is only for the item with no groups when using remove method", function() {
    menu = $("<ul>" +
                "<li id='firstItem'>item" +
                    "<ul>" +
                        "<li id='item1'>item 1" +
                            "<ul>" +
                                "<li id='subitem1'>item 1</li>" +
                            "</ul>" +
                        "</li>" +
                    "</ul>" +
                "</li>" +
            "</ul>")
        .appendTo(Mocha.fixture)
        .kendoMenu();

    menu.data("kendoMenu").remove($("#subitem1"));

    assert.isOk($("#item1").not("[aria-haspopup]"));
    assert.isOk($("#firstItem").is("[aria-haspopup]"));
})

it("menu role is added to the group container", function() {
    setup({ dataSource: [ {text: "foo", items: [{ text: "bar" }] } ] });

    menu.getKendoMenu().dataSource.view()[0].load();

    assert.equal(menu.find("[role=menu] span:first").text(), "bar");
});

it("menu role is added to the group container when created from html", function() {
    menu = $("<ul><li>foo<ul><li>bar</li></ul></li></ul>")
        .appendTo(Mocha.fixture)
        .kendoMenu();

    assert.equal(menu.find("[role=menu] span:first").text(), "bar");
});

it("disabled attribute is added if node is disabled", function() {
    setup({ dataSource: [ { text: "foo", enabled: false } ] });

    assert.equal(menu.find("[aria-disabled=true] span:first").text(), "foo");
});

it("disabled attribute is added if node is disabled via the API", function() {
    setup({ dataSource: [ { text: "foo" } ] });

    menu.data("kendoMenu").disable(menu.find("li:first"));

    assert.equal(menu.find("[aria-disabled=true] span:first").text(), "foo");
});

it("disabled attribute is added if child node is disabled via the API", function() {
    setup({ dataSource: [ { text: "foo", items: [{ text: "bar" }] } ] });

    menu.getKendoMenu().dataSource.view()[0].load();

    menu.data("kendoMenu").disable(menu.find(".k-group li:first"));

    assert.equal(menu.find("[aria-disabled=true] span:first").text(), "bar");
});

it("disabled attribute is added if node is disabled when created from html", function() {
    menu = $("<ul><li disabled='disabled'>foo</li></ul>")
        .appendTo(Mocha.fixture)
        .kendoMenu();

    assert.equal(menu.find("[aria-disabled=true] span:first").text(), "foo");
});

it("hidden attribute is added to the group when created from html", function() {
    menu = $("<ul><li>foo<ul><li>bar</li></ul></li></ul>")
        .appendTo(Mocha.fixture)
        .kendoMenu();

    assert.isOk(menu.find(".k-group[aria-hidden=true]").length);
});

it("aria-activedescendant is added to the wrapper when item is focused", function() {
    menu = $("<ul id=\"foo\"/>")
        .appendTo(Mocha.fixture)
        .kendoMenu({ dataSource: [ {text: "foo", items: [{ text: "bar" }] } ] });

    menu[0].focus();

    assert.isOk(menu.filter("[aria-activedescendant]").length);
    assert.isOk(menu.find("li#" + menu.data("kendoMenu")._ariaId).length);
});

it("aria-activedescendant is added to the wrapper when item is focused", function() {
    menu = $("<ul id=\"foo\"><li id=\"bar\">foo</li></ul>")
        .appendTo(Mocha.fixture)
        .kendoMenu();

    menu[0].focus();

    assert.isOk(menu.filter("[aria-activedescendant=bar]").length);
    assert.isOk(menu.find("li#bar").length);
});
    });
}());
