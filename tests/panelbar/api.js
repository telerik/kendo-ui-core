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

    describe("api", function() {
        beforeEach(function() {

            ul = $('<ul id="panelbar">' +
                '    <li class="k-item k-state-default"><span class="k-link k-header">Mail<span' +
                '            class="k-icon k-i-arrow-60-down k-panelbar-expand"></span></span>' +
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
                '            class="k-icon k-i-arrow-60-down k-panelbar-expand"></span></span>' +
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
                '            class="k-icon k-i-arrow-60-down k-panelbar-expand"></span></span>' +
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
                '            class="k-icon k-i-arrow-60-up k-panelbar-collapse"></span></span>' +
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
                '            class="k-icon k-i-arrow-60-down k-panelbar-expand"></span></span>' +
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
                '<ul id="empty_panelbar"></ul>');

            ul.appendTo(Mocha.fixture);

            empty_panelbar = $("#empty_panelbar");

            panelbar = new PanelBar(ul, {
                expand: Expand,
                collapse: Collapse,
                select: Select,
                activate: Activate
            });
        });
        afterEach(function() {
            kendo.destroy(empty_panelbar);
            kendo.destroy(Mocha.fixture);
        });

        it('trigger input select should not bubble', function() {
            var item = getRootItem(4);

            isSelectRaised = false;

            $(item).find('input').first().trigger('select');

            assert.isOk(!isSelectRaised);
        });

        it('clicking should raise onSelect event', function() {
            var item = getRootItem(0);

            isSelectRaised = false;

            item.find('> .k-link').trigger('click');

            assert.isOk(isSelectRaised);
        });

        it('collapse should raise onCollapse event', function() {
            isCollapseRaised = false;

            var item = getRootItem(3);

            item.find('> .k-link').click();

            assert.isOk(isCollapseRaised);
        });

        it('expand should raise onExpand event', function() {
            isExpandRaised = false;

            var item = getRootItem(2);

            item.find('> .k-link').trigger('click');

            assert.isOk(isExpandRaised);
        });

        it('expand should raise onActivate event after duration', function(done) {
            isActivateRaised = false;

            var item = getRootItem(4);

            item.find('> .k-link').trigger('click');

            setTimeout(function() {
                assert.isOk(isActivateRaised);
                done();
            }, 400);
        });

        it('disable method should disable disabled item', function() {
            var item = getRootItem(2);

            panelbar.disable(item);

            assert.isOk(item.hasClass('k-state-disabled'));
        });

        it('enable method should enable disabled item', function() {
            var item = getRootItem(2);

            panelbar.enable(item);

            assert.isOk(item.hasClass('k-state-default'));
        });

        it('collapse method should collapse last item', function() {
            var item = getRootItem(4);

            panelbar.collapse(item);

            assert.equal(item.find('> .k-group').css("display"), "none");
        });

        it('expand method should toggle only one icon', function() {
            new PanelBar(empty_panelbar, { dataSource: [{ text: "Item 1", items: [{ text: "Child 1", items: [{ text: "SubChild" }] }] }] });
            empty_panelbar.data("kendoPanelBar").expand(empty_panelbar.find("li:first"));

            assert.equal(empty_panelbar.find(".k-panelbar-collapse").length, 1);
        });

        it('dataSource should create items with the text specified', function() {
            new PanelBar(empty_panelbar, { dataSource: [{ text: "Item 1" }] });

            assert.equal(empty_panelbar.find(".k-item > .k-link:contains(Item 1)").length, 1);
        });

        it('dataSource should spawn arrows for items with group, content or contentUrl', function() {
            new PanelBar(empty_panelbar, { dataSource: [{ text: "Item 1", content: "Test" }, { text: "Item 2", items: [{ text: "SubChild" }] }, { text: "Item 3", contentUrl: "http://www.google.com" }] });

            var icons = empty_panelbar.find(".k-item > .k-link > .k-icon");

            assert.isOk(icons.eq(0).is(".k-panelbar-expand.k-i-arrow-60-down"));
            assert.isOk(icons.eq(1).is(".k-panelbar-expand.k-i-arrow-60-down"));
            assert.isOk(icons.eq(2).is(".k-panelbar-expand.k-i-arrow-60-down"));
        });

        it('dataSource should show collapse arrows for expanded items', function() {
            new PanelBar(empty_panelbar, { dataSource: [{ text: "Item 1", content: "Test", expanded: true }] });

            assert.isOk(empty_panelbar.find(".k-item > .k-link > .k-icon").is(".k-panelbar-collapse.k-i-arrow-60-up"));
        });

        it('setOptions resets the animation', function() {
            panelbar = new PanelBar(empty_panelbar);

            assert.equal(panelbar.options.animation.expand.effects, "expand:vertical");

            panelbar.setOptions({ animation: false });

            assert.isOk("effects" in panelbar.options.animation.expand);
            assert.isOk(kendo.size(panelbar.options.animation.expand.effects) == 0);
        });

        it('setOptions resets the dataSource object', function() {
            panelbar = new PanelBar(empty_panelbar, { dataSource: [{ text: "Item 1" }] });

            assert.equal(panelbar.element.find("li").text(), "Item 1");

            panelbar.setOptions({ dataSource: [{ text: "Changed" }] });

            assert.equal(panelbar.element.find("li").text(), "Changed");
        });

        it("Add dynamic item with cssClass", function() {
            panelbar = new PanelBar(empty_panelbar);

            panelbar.append({ text: "test", cssClass: "cssClass" });

            assert.isOk(panelbar.element.find(".cssClass")[0]);
        });

        it("clearSelection removes the PanelBar selection", function() {
            panelbar = new PanelBar(empty_panelbar, { dataSource: [{ text: "Item 1" }] });

            panelbar.select("li");
            assert.isOk(panelbar.select());

            panelbar.clearSelection();
            assert.isOk(!panelbar.select()[0]);
        });

        it("Adding dynamic content element renders properly on root and inner levels", function() {
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

            assert.isOk(empty_panelbar.children("li:first").children("div.k-content")[0]);
            assert.isOk(empty_panelbar.find("> li:last > ul > li:first").children("div.k-content")[0]);
        });

        it("Adding dynamic contentUrl element renders contents on root and inner levels", function() {
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

            assert.isOk(empty_panelbar.children("li:first").children("div.k-content")[0]);
            assert.isOk(empty_panelbar.find("> li:last > ul > li:first").children("div.k-content")[0]);
        });

        it('insertAfter method moves an item if called with existing item', function() {
            var panel = $("<ul><li>Item 1</li><li>Item 2</li></ul>").kendoPanelBar().data("kendoPanelBar");

            try {
                panel.insertAfter("li:first-child", "li:last-child");

                assert.isOk(panel.element.children("li:last-child").text() == "Item 1");
            } finally {
                panel.destroy();
            }
        });

    });
}());
