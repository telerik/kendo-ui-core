(function() {
var TabStrip = kendo.ui.TabStrip,
    keys = kendo.keys,
    div;

function addItems(count) {
    var tabstrip = div.data("kendoTabStrip");

    for (var i = 0; i < count; i++) {
        tabstrip.append({
            text: "Item" + i
        });
    }
}

module("tabstrip aria", {
    setup: function() {
        kendo.effects.disable();
        div = $('<div id="test">');
    },
    teardown: function() {
        kendo.effects.enable();
        kendo.destroy(div);
    }
});

test("tablist role is added to the wrapper", function() {
    div.kendoTabStrip();

    ok(div.filter("[role=tablist]").length);
});

test("tab role is set to items", function() {
    div.kendoTabStrip({
        dataTextField: "text",
        dataSource: [ { text: "foo", content: "bar" } ]
    });

    equal(div.find("li[role=tab]").text(), "foo");
});

test("tab role is set to items when created from html", function() {
    div = $('<div id="test"><ul><li>foo</li><li>bar</li></ul></div>').kendoTabStrip();

    equal(div.find("li[role=tab]").length, 2);
});

test("tabpanel role is set to the content items", function() {
    div.kendoTabStrip({
        dataTextField: "text",
        dataContentField: "content",
        dataSource: [ { text: "foo", content: "bar"} ]
    });

    equal(div.find("div[role=tabpanel]").text(), "bar");
});

test("tabpanel role is set to content items when created from html", function() {
    div = $('<div id="test"><ul><li>foo</li><li>bar</li></ul><div>foo content</div><div>bar content</div></div>')
            .kendoTabStrip();

    equal(div.find("div[role=tabpanel]").length, 2);
});

test("TabStrip adds aria-controls to the tab items", function() {
    div = $('<div id="test"><ul><li>foo</li><li>bar</li></ul><div>foo content</div><div>bar content</div></div>')
            .kendoTabStrip();

    equal(div.find("li[role=tab]").eq(0).attr("aria-controls"), "test-1");
});

test("TabStrip render aria-controls with guid if no id", function() {
    div = $('<div><ul><li>foo</li><li>bar</li></ul><div>foo content</div><div>bar content</div></div>')
            .kendoTabStrip();

    ok(div.find("li[role=tab]").eq(0).attr("aria-controls"));
});

test("hidden attribute is set to the content if tab is not visible", function() {
    div.kendoTabStrip({
        dataTextField: "text",
        dataContentField: "content",
        dataSource: [ { text: "foo", content: "foo content" },{ text: "bar", content: "bar content"}  ]
    });

    equal(div.find("div[aria-hidden=true]").length, 2);
});

test("hidden attribute is set to the content if tab is not visible when created from html", function() {
    div = $('<div id="test"><ul><li>foo</li><li>bar</li></ul><div>foo content</div><div>bar content</div></div>')
            .kendoTabStrip();

    equal(div.find("div[aria-hidden=true]").length, 2);
});

test("aria-hidden is removed from the content if tab is activated", function() {
    div.kendoTabStrip({
        dataTextField: "text",
        dataContentField: "content",
        dataSource: [ { text: "foo", content: "foo content" },{ text: "bar", content: "bar content"}  ]
    });

    div.data("kendoTabStrip").select(1);

    equal(div.find("div[aria-hidden=true]").length, 1);
    equal(div.find("div[aria-hidden=true]").text(), "foo content");
});

test("aria-hidden false is set to the prev active content if another tab is activated", function() {
    div.kendoTabStrip({
        dataTextField: "text",
        dataContentField: "content",
        dataSource: [ { text: "foo", content: "foo content" },{ text: "bar", content: "bar content"}  ]
    });

    div.data("kendoTabStrip").select(1);
    div.data("kendoTabStrip").select(0);

    equal(div.find("div[aria-hidden=true]").length, 1);
    equal(div.find("div[aria-hidden=true]").text(), "bar content");
});

test("aria-hidden is set to the content if tab is deactivated", function() {
    div.kendoTabStrip({
        dataTextField: "text",
        dataContentField: "content",
        dataSource: [ { text: "foo", content: "foo content" },{ text: "bar", content: "bar content"}  ]
    });

    div.data("kendoTabStrip").select(0);
    div.data("kendoTabStrip").deactivateTab(div.find("li:first"));

    equal(div.find("div[aria-hidden=true]").length, 2);
});


test("aria-hidden false is set to the prev active content if another unexisting tab is activated", function() {
    div.kendoTabStrip({
        dataTextField: "text",
        dataContentField: "content",
        dataSource: [ { text: "foo", content: "foo content" }, { text: "bar", content: "bar content"}, { text: "bar"}  ]
    });

    div.data("kendoTabStrip").select(1);
    div.data("kendoTabStrip").select(2);

    equal(div.find("div[aria-hidden=true]").length, 2);
    equal(div.find("div[aria-hidden=true]:first").text(), "foo content");
    equal(div.find("div[aria-hidden=true]:last").text(), "bar content");
});

test("aria-selected is added to the active tab", function() {
    div.kendoTabStrip({
        dataTextField: "text",
        dataContentField: "content",
        dataSource: [ { text: "foo", content: "foo content" }, { text: "bar", content: "bar content"}  ]
    });

    div.data("kendoTabStrip").select(0);

    equal(div.find("li[aria-selected=true]").text(), "foo");
});

test("aria-selected is remove from the prev active tab", function() {
    div.kendoTabStrip({
        dataTextField: "text",
        dataContentField: "content",
        dataSource: [ { text: "foo", content: "foo content" }, { text: "bar", content: "bar content"}  ]
    });

    div.data("kendoTabStrip").select(0);
    div.data("kendoTabStrip").select(1);

    equal(div.find("li[aria-selected=true]").length, 1);
    equal(div.find("li[aria-selected=true]").text(), "bar");
});

test("aria-selected is added to the active tab when created from html", function() {
    div = $('<div id="test"><ul><li class="k-state-active">foo</li><li>bar</li></ul><div>foo content</div><div>bar content</div></div>')
            .kendoTabStrip();

    equal(div.find("li[aria-selected=true]").text(), "foo");
});

test("aria-expanded false is added to the content ", function() {
    div.kendoTabStrip({
        dataTextField: "text",
        dataContentField: "content",
        dataSource: [ { text: "foo", content: "foo content" }, { text: "bar", content: "bar content"}  ]
    });

    equal(div.find("div[aria-expanded=false]").length, 2);
});

test("aria-expanded is added to the active tab", function() {
    div.kendoTabStrip({
        dataTextField: "text",
        dataContentField: "content",
        dataSource: [ { text: "foo", content: "foo content" }, { text: "bar", content: "bar content"}  ]
    });

    div.data("kendoTabStrip").select(0);

    equal(div.find("div[aria-expanded=true]").text(), "foo content");
});

test("aria-expanded false is added to the non active content when created from html", function() {
    div = $('<div id="test"><ul><li>foo</li><li>bar</li></ul><div>foo content</div><div>bar content</div></div>')
            .kendoTabStrip();

    equal(div.find("div[aria-expanded=false]").length, 2);
});

test("aria-expanded is added to the active content when created from html", function() {
    div = $('<div id="test"><ul><li class="k-state-active">foo</li><li>bar</li></ul><div>foo content</div><div>bar content</div></div>')
            .kendoTabStrip();

    equal(div.find("div[aria-expanded=true]").text(), "foo content");
});

test("preserves the id of the LI elements", function() {
    div = $("<div><ul id='test'><li id='custom' class='k-state-active'>Test</li><li>Test2</li></ul></div>");

    var tabstrip = div.kendoTabStrip().data("kendoTabStrip");

    tabstrip.select("li:last");
    tabstrip.select("li:first");

    var li = tabstrip.element.find(".k-state-active");

    equal(li.attr("id"), "custom");
});

test("uses id of the LI element for the aria-activedescendant", function() {
    div = $("<div><ul id='test'><li id='custom' class='k-state-active'>Test</li><li>Test2</li></ul></div>")
    var tabstrip = div.kendoTabStrip().data("kendoTabStrip");

    tabstrip.select("li:last");
    tabstrip.select("li:first");

    equal(tabstrip.element.attr("aria-activedescendant"), "custom");
});
})();
