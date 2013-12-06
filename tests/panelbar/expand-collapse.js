(function() {
    var panelbar;
    var ul;

    module('panelbar expand collapse', {
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
                '            <li class="k-item k-state-default"><span class="k-link">My Profile<span' +
                '                    class="k-icon k-i-arrow-n k-panelbar-collapse"></span></span>' +
                '                <ul style="display: none;" class="k-group">' +
                '                    <li class="k-item k-state-default"><a href="#"' +
                '                                                          class="k-link">Server Binding</a></li>' +
                '                    <li class="k-item k-state-default"><a href="#"' +
                '                                                          class="k-link">Ajax Binding</a></li>' +
                '                    <li class="k-item k-state-default"><a href="#"' +
                '                                                          class="k-link">Web Service Binding</a></li>' +
                '                    <li class="k-item k-state-default"><a href="#"' +
                '                                                          class="k-link">Custom Binding</a></li>' +
                '                    <li class="k-item k-state-default"><a href="#"' +
                '                                                          class="k-link">Twitter Binding</a></li>' +
                '                    <li class="k-item k-state-default"><a href="#"' +
                '                                                          class="k-link">Facebook Binding</a></li>' +
                '                </ul>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">My Support Tickets</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">My Licenses</span>' +
                '            </li>' +
                '        </ul>' +
                '    </li>' +
                '</ul>'
            );

            ul = $("#panelbar");

            panelbar = new kendo.ui.PanelBar(ul);
        },
        teardown: function() {
            kendo.effects.enable();

            panelbar.destroy();
        }
    });

    function getRootItem(index) {
        return ul.children().eq(index)
    }

    test("clicking collapsed item not expand if it is disabled", function() {
        var item = getRootItem(1);

        item
                .toggleClass("k-state-default", false)
                .toggleClass("k-state-disabled", true);

        item.find("> .k-link").trigger("click");

        equal(item.find(".k-group").css("display"), "none");
    });

    test("clicking expanded items should toggle arrow", function() {
        var item = getRootItem(3);

        item.find("> .k-link").trigger("click");

        ok(item.find(".k-icon").hasClass("k-i-arrow-s"));
    });

    test("clicking collapsed items should expand them", function() {
        var item = getRootItem(2);

        item.find("> .k-link").trigger("click");

        equal(item.find(".k-group").css("display"), "block");
    });

    test("clicking collapsed items should toggle arrow", function() {
        var item = getRootItem(0);

        item.find("> .k-link").trigger("click");

        ok(item.find(".k-icon").hasClass("k-i-arrow-n"));
    });

    test("clicking collapsed items should not expand child groups", function() {
        var item = getRootItem(4);

        item.find("> .k-link").trigger("click");

        equal(item.find(".k-group .k-group").css("display"), "none");
    });

    test("clicking child group items should not collapse root group", function() {
        var item = getRootItem(4);

        panelbar.expand(item);

        item.find(".k-item > .k-link").trigger("click");

        equal(item.find(".k-group").css("display"), "block");
    });

    test("clicking arrows toggles child groups", function() {
        var item = getRootItem(3);

        item.find("> .k-link > .k-icon").trigger("click");

        equal(item.find(".k-group").css("display"), "none");
    });
})();
