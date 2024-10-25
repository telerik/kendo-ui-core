(function() {
    var PanelBar = kendo.ui.PanelBar,
        createPanelBar = PanelBarHelpers.fromOptions,
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

    describe("PanelBar accessibility with AXE", function() {
        beforeEach(function() {
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("PanelBar with content is accessible", function(done) {
            var panel = $("<ul id='test2'><li>Test</li><li>hi<div>content</div></li><li>Last<ul><li>test</li></ul></li></ul>").appendTo(Mocha.fixture).kendoPanelBar();

            axeRunFixture(done);
        });

        it("PanelBar with DataSource is accessible", function(done) {
            createPanelBar([
                { text: "foo" },
                {
                    text: "bar", expanded: true, items: [
                        { text: "ber" }
                    ]
                }
            ]);

            axeRunFixture(done);
        });
    });

    describe("PanelBar aria", function() {
        beforeEach(function() {
            ul = $('<ul id="test" />').appendTo(Mocha.fixture);
            panelbar = ul.kendoPanelBar().data("kendoPanelBar");
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("PanelBar sets role to the wrapper", function() {
            assert.equal(ul.attr("role"), "tree");
        });

        it("PanelBar adds tab role to the panelbar items", function() {
            addItems(2);

            var items = ul.find(".k-panelbar-item");
            assert.equal(items.eq(0).attr("role"), "treeitem");
            assert.equal(items.eq(1).attr("role"), "treeitem");
        });

        it("PanelBar adds tab role to items during init", function() {
            var panel = $("<ul id='test'><li>Test</li></ul>").appendTo(Mocha.fixture).kendoPanelBar();

            var items = panel.find(".k-panelbar-item");
            assert.equal(items.eq(0).attr("role"), "treeitem");
        });

        it("PanelBar adds tab role to the added items", function() {
            addItems(2);

            var items = ul.find(".k-panelbar-item");
            assert.equal(items.eq(0).attr("role"), "treeitem");
            assert.equal(items.eq(1).attr("role"), "treeitem");
        });

        it("PanelBar adds role group to the k-panelbar-group elements", function() {
            addItems(2);
            addItems(2, ul.find(".k-panelbar-item:first"));

            var items = ul.find(".k-panelbar-group");
            assert.equal(items.eq(0).attr("role"), "group");
        });

        it("PanelBar adds role group during init", function() {
            var panel = $("<ul id='test'><li>Test<ul><li>Inner item</li></ul></li></ul>").appendTo(Mocha.fixture).kendoPanelBar();

            var items = panel.find(".k-panelbar-group");
            assert.equal(items.eq(0).attr("role"), "group");
        });

        it("PanelBar sets id to the focused item", function() {
            addItems(2);

            ul.focus();

            assert.isOk(ul.find(".k-panelbar-item:first > .k-link").hasClass("k-focus"));
            assert.equal(ul.find(".k-panelbar-item:first").attr("id"), "test_pb_active");
        });

        it("PanelBar adds aria-selected=true on selection", function() {
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

            assert.isOk(ul.find(".k-panelbar-item:last > .k-link").hasClass("k-focus"));
            assert.equal(ul.find(".k-panelbar-item:first").attr("aria-selected"), "false");
            assert.equal(ul.find(".k-panelbar-item:last").attr("aria-selected"), "true");
        });

        it("PanelBar aria-activedescendant", function() {
            addItems(2);

            ul.focus();

            assert.equal(ul.attr("aria-activedescendant"), "test_pb_active");
        });

        it("PanelBar deletes aria-activedescendant", function() {
            addItems(2);

            ul.focus();

            panelbar._current(null);

            assert.equal(ul.attr("aria-activedescendant"), undefined);
        });

        it("PanelBar adds aria-expanded to the item during init", function() {
            var panel = $("<ul id='test2'><li>Test</li><li>hi<div>content</div></li><li>Last<ul><li>test</li></ul></li></ul>").appendTo(Mocha.fixture).kendoPanelBar();

            var items = panel.find(".k-panelbar-item").filter("[aria-expanded=false]");

            assert.equal(items.length, 2);
        });

        it("PanelBar adds aria-expanded=false to all items with content", function() {
            addItems(3);
            addItems(2, ul.find(".k-panelbar-item:last"));

            panelbar.append({
                text: "test",
                content: "content"
            }, ul.children(".k-panelbar-item").eq(1));

            var items = ul.find(".k-panelbar-item").filter("[aria-expanded=false]");

            assert.equal(items.length, 3);
        });

        it("PanelBar updates aria-expanded state", function() {
            addItems(3);
            var last = ul.find(".k-panelbar-item:last");

            addItems(2, last);

            panelbar.expand(last);
            assert.equal(last.attr("aria-expanded"), "true");
        });

        it("PanelBar updates aria-expanded state on collapse", function() {
            addItems(3);
            var last = ul.find(".k-panelbar-item:last");

            addItems(2, last);

            panelbar.expand(last);
            panelbar.collapse(last);

            assert.equal(last.attr("aria-expanded"), "false");
        });

        it("PanelBar updates aria-hidden state", function() {
            addItems(3);
            var last = ul.find(".k-panelbar-item:last");

            addItems(2, last);

            panelbar.expand(last);
            assert.equal(last.children("ul").attr("aria-hidden"), "false");
        });

        it("PanelBar updates aria-hidden state on collapse", function() {
            addItems(3);
            var last = ul.find(".k-panelbar-item:last");

            addItems(2, last);

            panelbar.expand(last);
            panelbar.collapse(last);

            assert.equal(last.children("ul").attr("aria-hidden"), "true");
        });

        it("PanelBar adds aria-hidden to the group when it is added with API", function() {
            addItems(3);
            var last = ul.find(".k-panelbar-item:last");

            addItems(2, last);

            assert.equal(last.find(".k-panelbar-group").attr("aria-hidden"), "true");
        });

        it("PanelBar adds aria-hidden to k-panelbar-group on init", function() {
            var panel = $("<ul id='test2'><li>Test<ul><li>Inner</li></ul></li></ul>").appendTo(Mocha.fixture).kendoPanelBar();

            assert.equal(panel.find(".k-panelbar-group").attr("aria-hidden"), "true");
        });

        it("PanelBar adds aria-hidden to content on init", function() {
            var panel = $("<ul id='test2'><li>Test<div>Inner</div></li></ul>").appendTo(Mocha.fixture).kendoPanelBar();

            assert.equal(panel.find(".k-panelbar-content").attr("aria-hidden"), "true");
        });

        it("PanelBar adds aria-disabled attr", function() {
            addItems(3);
            var first = ul.find(".k-panelbar-item:first");

            panelbar.enable(first, false);

            assert.equal(first.attr("aria-disabled"), "true");
        });

        it("PanelBar adds aria-disabled=false", function() {
            addItems(3);
            var first = ul.find(".k-panelbar-item:first");

            panelbar.enable(first, false);
            panelbar.enable(first);

            assert.equal(first.attr("aria-disabled"), "false");
        });

        it("PanelBar adds aria-disabled on init", function() {
            var panel = $("<ul id='test2'><li disabled='disabled'>Test</li></ul>").appendTo(Mocha.fixture).kendoPanelBar();

            assert.equal(panel.find(".k-panelbar-item:first").attr("aria-disabled"), "true");
        });

        it("PanelBar adds aria-disabled on append", function() {
            panelbar.append({
                text: "first",
                enabled: false
            });

            assert.equal(ul.find(".k-panelbar-item:first").attr("aria-disabled"), "true");
        });

        it("PanelBar adds aria-selected on init", function() {
            var panel = $("<ul id='test2'><li><span class='k-link k-selected'>Test</span></li><li><span class='k-link k-selected'>Test2</span></li></ul>").appendTo(Mocha.fixture).kendoPanelBar();

            var links = panel.find(".k-selected");

            assert.equal(links.length, 1);
            assert.equal(links.parent().attr("aria-selected"), "true");
            assert.equal(links.parent().index(), 1);
        });

        it("PanelBar preserves the id of the LI elements", function() {
            var panelbar = $("<ul id='test2'><li id='custom'><span class='k-link k-selected'>Test</span></li><li><span class='k-link'>Test2</span></li></ul>").appendTo(Mocha.fixture).kendoPanelBar().data("kendoPanelBar");

            panelbar.select("li:last");
            panelbar.select("li:first");

            var li = panelbar.element.find(".k-selected").closest(".k-panelbar-item");

            assert.equal(li.attr("id"), "custom");
        });

        it("PanelBar uses id of the LI element", function() {
            var panelbar = $("<ul id='test2'><li id='custom'><span class='k-link k-selected'>Test</span></li><li><span class='k-link'>Test2</span></li></ul>").appendTo(Mocha.fixture).kendoPanelBar().data("kendoPanelBar");

            panelbar.select("li:last");
            panelbar.select("li:first");

            assert.equal(panelbar.element.attr("aria-activedescendant"), "custom");
        });
    });
}());
