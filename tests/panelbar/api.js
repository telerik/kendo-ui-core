(function() {
    var isExpandRaised, isCollapseRaised, isSelectRaised, isActivateRaised;
    var PanelBar = kendo.ui.PanelBar;

    var empty_panelbar;
    var panelbar;
    var ul;

    function getRootItem(index) {
        return ul.children().eq(index);
    }

    //handlers
    function Expand(sender, args) {
        isExpandRaised = true;
    }

   function Activate(sender, args) {
       isActivateRaised = true;
   }

    function Collapse(sender, args) {
        isCollapseRaised = true;
    }

    function Select(sender, args) {
        isSelectRaised = true;
    }

    module("api", {
        setup: function() {
            kendo.effects.disable();

            QUnit.fixture.append(
                '<ul id="panelbar">' +
                '    <li class="k-item k-state-default"><span class="k-link k-header">Mail<span' +
                '            class="k-icon k-i-arrow-s k-panelbar-expand"></span></span>' +
                '        <ul style="display: none;" class="k-group">' +
                '            <li class="k-item k-state-default"><span class="k-link">Personal Folders</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Deleted Items</span>' +
                '            </li>' +
                '            <li class="k-item k-state-disabled"><span class="k-link">Inbox</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">My Mail</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Sent Items</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Outbox</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Search Folders</span>' +
                '            </li>' +
                '        </ul>' +
                '    </li>' +
                '    <li class="k-item k-state-disabled"><span class="k-link k-header">Contacts<span' +
                '            class="k-icon k-i-arrow-s k-panelbar-expand"></span></span>' +
                '        <ul class="k-group" style="display: none;">' +
                '            <li class="k-item k-state-default"><span class="k-link">My Contacts</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Address Cards</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Phone List</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Shared Contacts</span>' +
                '            </li>' +
                '        </ul>' +
                '    </li>' +
                '    <li class="k-item k-state-default"><span class="k-link k-header">Tasks<span' +
                '            class="k-icon k-i-arrow-s k-panelbar-expand"></span></span>' +
                '        <ul class="k-group" style="display: none;">' +
                '            <li class="k-item k-state-default"><span class="k-link">My Tasks</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Shared Tasks</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Active Tasks</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Completed Tasks</span>' +
                '            </li>' +
                '        </ul>' +
                '    </li>' +
                '    <li class="k-item k-state-active"><span class="k-link k-header k-state-selected">Notes<span' +
                '            class="k-icon k-i-arrow-n k-panelbar-collapse"></span></span>' +
                '        <ul class="k-group" style="display: block;">' +
                '            <li class="k-item k-state-default"><span class="k-link">My Notes</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Notes List</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Shared Notes</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Archive</span>' +
                '            </li>' +
                '        </ul>' +
                '    </li>' +
                '    <li class="k-item k-state-default"><span class="k-link k-header">Folders List<span' +
                '            class="k-icon k-i-arrow-s k-panelbar-expand"></span></span>' +
                '        <ul class="k-group" style="display: none;">' +
                '            <li class="k-item k-state-default"><span class="k-link">My Client.Net</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">My Profile</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">My Support Tickets</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">My Licenses</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">My Licenses</span>' +
                '               <input />' +
                '            </li>' +
                '        </ul>' +
                '    </li>' +
                '</ul>' +
                '<ul id="empty_panelbar"></ul>'
            );

            ul = $("#panelbar");
            empty_panelbar = $("#empty_panelbar");

            panelbar = new PanelBar(ul, {
                expand: Expand,
                collapse: Collapse,
                select: Select,
                activate: Activate
            });
        },
        teardown: function() {
            kendo.effects.enable();

            kendo.destroy(QUnit.fixture);
        }
    });

    test('trigger input select should not bubble', function() {
        var item = getRootItem(4);

        isSelectRaised = false;

        $(item).find('input').first().trigger('select');

        ok(!isSelectRaised);
    });

    test('clicking should raise onSelect event', function() {
        var item = getRootItem(0);

        isSelectRaised = false;

        item.find('> .k-link').trigger('click');

        ok(isSelectRaised);
    });

    test('collapse should raise onCollapse event', function() {
        isCollapseRaised = false;

        var item = getRootItem(3);

        item.find('> .k-link').click();

        ok(isCollapseRaised);
    });

    test('expand should raise onExpand event', function() {
        isExpandRaised = false;

        var item = getRootItem(2);

        item.find('> .k-link').trigger('click');

        ok(isExpandRaised);
    });

    asyncTest('expand should raise onActivate event after duration', 1, function() {
        isActivateRaised = false;

        var item = getRootItem(4);

        item.find('> .k-link').trigger('click');

        setTimeout(function () {
            start();
            ok(isActivateRaised);
        }, 400);
    });

    test('disable method should disable disabled item', function() {
        var item = getRootItem(2);

        panelbar.disable(item);

        ok(item.hasClass('k-state-disabled'));
    });

    test('enable method should enable disabled item', function() {
        var item = getRootItem(2);

        panelbar.enable(item);

        ok(item.hasClass('k-state-default'));
    });

    test('collapse method should collapse last item', function() {
        var item = getRootItem(4);

        panelbar.collapse(item);

        equal(item.find('> .k-group').css("display"), "none");
    });

    test('dataSource should create items with the text specified', function () {
        new PanelBar(empty_panelbar, { dataSource: [ { text: "Item 1" } ] });

        equal(empty_panelbar.find(".k-item > .k-link:contains(Item 1)").length, 1);
    });

    test('dataSource should spawn arrows for items with group, content or contentUrl', function () {
        new PanelBar(empty_panelbar, { dataSource: [ { text: "Item 1", content: "Test" }, { text: "Item 2", items: [] }, { text: "Item 3", contentUrl: "http://www.google.com" } ] });

        var icons = empty_panelbar.find(".k-item > .k-link > .k-icon");

        ok(icons.eq(0).is(".k-panelbar-expand.k-i-arrow-s"));
        ok(icons.eq(1).is(".k-panelbar-expand.k-i-arrow-s"));
        ok(icons.eq(2).is(".k-panelbar-expand.k-i-arrow-s"));
    });

    test('dataSource should show collapse arrows for expanded items', function () {
        new PanelBar(empty_panelbar, { dataSource: [ { text: "Item 1", content: "Test", expanded: true } ] });

        ok(empty_panelbar.find(".k-item > .k-link > .k-icon").is(".k-panelbar-collapse.k-i-arrow-n"));
    });

    test('setOptions resets the animation', function() {
        panelbar = new PanelBar(empty_panelbar);

        equal(panelbar.options.animation.expand.effects, "expand:vertical");

        panelbar.setOptions({ animation: false });

        ok("effects" in panelbar.options.animation.expand);
        ok(kendo.size(panelbar.options.animation.expand.effects) == 0);
    });

    test('setOptions resets the dataSource object', function() {
        panelbar = new PanelBar(empty_panelbar, { dataSource: [ { text: "Item 1" } ] });

        equal(panelbar.element.find("li").text(), "Item 1");

        panelbar.setOptions({ dataSource: [ { text: "Changed" } ] });

        equal(panelbar.element.find("li").text(), "Changed");
    });

    test("Add dynamic item with cssClass", function () {
        panelbar = new PanelBar(empty_panelbar);

        panelbar.append({ text: "test", cssClass: "cssClass" });

        ok(panelbar.element.find(".cssClass")[0]);
    });

    test("clearSelection removes the PanelBar selection", 2, function () {
        panelbar = new PanelBar(empty_panelbar, { dataSource: [ { text: "Item 1" } ] });

        panelbar.select("li");
        ok(panelbar.select());

        panelbar.clearSelection();
        ok(!panelbar.select()[0]);
    });

    test("Adding dynamic content element renders properly on root and inner levels", function () {
        panelbar = new PanelBar(empty_panelbar);

        panelbar.append([
            {
                text: "Item 1",
                content: "Item 1 Content"
            },
            {
                text: "Item 2",
                items: [
                    {
                        text: "Sub Item 1",
                        content: "Sub Item 1 Content"
                    }
                ]
            }
        ]);

        ok(empty_panelbar.children("li:first").children("div.k-content")[0]);
        ok(empty_panelbar.find("> li:last > ul > li:first").children("div.k-content")[0]);
    });

    test("Adding dynamic contentUrl element renders contents on root and inner levels", function () {
        panelbar = new PanelBar(empty_panelbar);

        panelbar.append([
            {
                text: "Item 1",
                contentUrl: "AjaxView1.html"
            },
            {
                text: "Item 2",
                items: [
                    {
                        text: "Sub Item 1",
                        contentUrl: "AjaxView2.html"
                    }
                ]
            }
        ]);

        ok(empty_panelbar.children("li:first").children("div.k-content")[0]);
        ok(empty_panelbar.find("> li:last > ul > li:first").children("div.k-content")[0]);
    });

    test('insertAfter method moves an item if called with existing item', 1, function() {
        var panel = $("<ul><li>Item 1</li><li>Item 2</li></ul>").kendoPanelBar().data("kendoPanelBar");

        try {
            panel.insertAfter("li:first-child", "li:last-child");

            ok(panel.element.children("li:last-child").text() == "Item 1");
        } finally {
            panel.destroy();
        }
    });

})();
