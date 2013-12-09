(function() {
    var PanelBar = kendo.ui.PanelBar,
        panelbar,
        ul;

    function addItems(count, parent) {
        var panel = ul.data("kendoPanelBar");

        for (var i = 0; i < count; i++) {
            panel.append({
                text: "Item" + i
            }, parent);
        }
    }

    module("PanelBar aria", {
        setup: function() {
            ul = $('<ul id="test" />').appendTo(QUnit.fixture).appendTo(QUnit.fixture);
            panelbar = ul.kendoPanelBar().data("kendoPanelBar");
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("PanelBar sets role to the wrapper", function() {
        equal(ul.attr("role"), "menu");
    });

    test("PanelBar adds tab role to the panelbar items", function() {
        addItems(2);

        var items = ul.find(".k-item");
        equal(items.eq(0).attr("role"), "menuitem");
        equal(items.eq(1).attr("role"), "menuitem");
    });

    test("PanelBar adds tab role to items during init", function() {
        var panel = $("<ul id='test'><li>Test</li></ul>").appendTo(QUnit.fixture).kendoPanelBar();

        var items = panel.find(".k-item");
        equal(items.eq(0).attr("role"), "menuitem");
    });

    test("PanelBar adds tab role to the added items", function() {
        addItems(2);

        var items = ul.find(".k-item");
        equal(items.eq(0).attr("role"), "menuitem");
        equal(items.eq(1).attr("role"), "menuitem");
    });

    test("PanelBar adds role group to the k-group elements", function() {
        addItems(2);
        addItems(2, ul.find(".k-item:first"));

        var items = ul.find(".k-group");
        equal(items.eq(0).attr("role"), "group");
    });

    test("PanelBar adds role 'region' to the .k-content elements", function() {
        addItems(2);
        panelbar.append({
            text: "test",
            content: "text"
        });

        var items = ul.find(".k-content");
        equal(items.eq(0).attr("role"), "region");
    });

    test("PanelBar adds role region during init", function() {
        var panel = $("<ul id='test2'><li>Test</li><li>hi<div>content</div></li></ul>").appendTo(QUnit.fixture).kendoPanelBar();

        var items = panel.find(".k-content");
        equal(items.eq(0).attr("role"), "region");
    });

    test("PanelBar adds role group during init", function() {
        var panel = $("<ul id='test'><li>Test<ul><li>Inner item</li></ul></li></ul>").appendTo(QUnit.fixture).kendoPanelBar();

        var items = panel.find(".k-group");
        equal(items.eq(0).attr("role"), "group");
    });

    test("PanelBar sets id to the focused item", function() {
        addItems(2);

        ul.focus();

        ok(ul.find(".k-item:first > .k-link").hasClass("k-state-focused"))
        equal(ul.find(".k-item:first").attr("id"), "test_pb_active")
    });

    test("PanelBar adds aria-selected on selection", function() {
        addItems(2);

        ul.focus();
        ul.trigger({
            type: "keydown",
            keyCode: kendo.keys.DOWN,
            preventDefault: $.noop
        });

        ul.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER,
            preventDefault: $.noop
        });

        ok(ul.find(".k-item:last > .k-link").hasClass("k-state-focused"))
        equal(ul.find(".k-item:first").attr("aria-selected"), undefined)
        equal(ul.find(".k-item:last").attr("aria-selected"), "true")
    });

    test("PanelBar aria-activedescendant", function() {
        addItems(2);

        ul.focus();

        equal(ul.attr("aria-activedescendant"), "test_pb_active");
    });

    test("PanelBar deletes aria-activedescendant", function() {
        addItems(2);

        ul.focus();

        panelbar._current(null);

        equal(ul.attr("aria-activedescendant"), undefined);
    });

    test("PanelBar adds aria-expanded to the item during init", function() {
        var panel = $("<ul id='test2'><li>Test</li><li>hi<div>content</div></li><li>Last<ul><li>test</li></ul></li></ul>").appendTo(QUnit.fixture).kendoPanelBar();

        var items = panel.find(".k-item").filter("[aria-expanded=false]");

        equal(items.length, 2);
    });

    test("PanelBar adds aria-expanded=false to all items with content", function() {
        addItems(3);
        addItems(2, ul.find(".k-item:last"));

        panelbar.append({
            text: "test",
            content: "content"
        }, ul.children(".k-item").eq(1));

        var items = ul.find(".k-item").filter("[aria-expanded=false]");

        equal(items.length, 3);
    });

    test("PanelBar updates aria-expanded state", function() {
        addItems(3);
        var last = ul.find(".k-item:last");

        addItems(2, last);

        panelbar.expand(last);
        equal(last.attr("aria-expanded"), "true");
    });

    test("PanelBar updates aria-expanded state on collapse", function() {
        addItems(3);
        var last = ul.find(".k-item:last");

        addItems(2, last);

        panelbar.expand(last);
        panelbar.collapse(last);

        equal(last.attr("aria-expanded"), "false");
    });

    test("PanelBar updates aria-hidden state", function() {
        addItems(3);
        var last = ul.find(".k-item:last");

        addItems(2, last);

        panelbar.expand(last);
        equal(last.attr("aria-hidden"), "false");
    });

    test("PanelBar updates aria-hidden state on collapse", function() {
        addItems(3);
        var last = ul.find(".k-item:last");

        addItems(2, last);

        panelbar.expand(last);
        panelbar.collapse(last);

        equal(last.attr("aria-hidden"), "true");
    });

    test("PanelBar adds aria-hidden to the group when it is added with API", function() {
        addItems(3);
        var last = ul.find(".k-item:last");

        addItems(2, last);

        equal(last.find(".k-group").attr("aria-hidden"), "true");
    });

    test("PanelBar adds aria-hidden to k-group on init", function() {
        var panel = $("<ul id='test2'><li>Test<ul><li>Inner</li></ul></li></ul>").appendTo(QUnit.fixture).kendoPanelBar();

        equal(panel.find(".k-group").attr("aria-hidden"), "true");
    });

    test("PanelBar adds aria-hidden to content on init", function() {
        var panel = $("<ul id='test2'><li>Test<div>Inner</div></li></ul>").appendTo(QUnit.fixture).kendoPanelBar();

        equal(panel.find(".k-content").attr("aria-hidden"), "true");
    });

    test("PanelBar adds aria-disabled attr", function() {
        addItems(3);
        var first = ul.find(".k-item:first");

        panelbar.enable(first, false);

        equal(first.attr("aria-disabled"), "true");
    });

    test("PanelBar adds aria-disabled=false", function() {
        addItems(3);
        var first = ul.find(".k-item:first");

        panelbar.enable(first, false);
        panelbar.enable(first);

        equal(first.attr("aria-disabled"), "false");
    });

    test("PanelBar adds aria-disabled on init", function() {
        var panel = $("<ul id='test2'><li disabled='disabled'>Test</li></ul>").appendTo(QUnit.fixture).kendoPanelBar();

        equal(panel.find(".k-item:first").attr("aria-disabled"), "true");
    });

    test("PanelBar adds aria-disabled on append", function() {
        panelbar.append({
            text: "first",
            enabled: false
        });

        equal(ul.find(".k-item:first").attr("aria-disabled"), "true");
    });

    test("PanelBar adds aria-selected on init", function() {
        var panel = $("<ul id='test2'><li><span class='k-link k-state-selected'>Test</span></li><li><span class='k-link k-state-selected'>Test2</span></li></ul>").appendTo(QUnit.fixture).kendoPanelBar();

        var links = panel.find(".k-state-selected");

        equal(links.length, 1);
        equal(links.parent().attr("aria-selected"), "true");
        equal(links.parent().index(), 1);
    });

    test("PanelBar preserves the id of the LI elements", function() {
        var panelbar = $("<ul id='test2'><li id='custom'><span class='k-link k-state-selected'>Test</span></li><li><span class='k-link'>Test2</span></li></ul>").appendTo(QUnit.fixture).kendoPanelBar().data("kendoPanelBar");

        panelbar.select("li:last");
        panelbar.select("li:first");

        var li = panelbar.element.find(".k-state-selected").closest(".k-item");

        equal(li.attr("id"), "custom");
    });

    test("PanelBar uses id of the LI element", function() {
        var panelbar = $("<ul id='test2'><li id='custom'><span class='k-link k-state-selected'>Test</span></li><li><span class='k-link'>Test2</span></li></ul>").appendTo(QUnit.fixture).kendoPanelBar().data("kendoPanelBar");

        panelbar.select("li:last");
        panelbar.select("li:first");

        equal(panelbar.element.attr("aria-activedescendant"), "custom");
    });
})();
