(function() {
    var panelbar;
    var ul;

    module('panelbar single expand collapse', {
        setup: function() {
            kendo.effects.disable();

            QUnit.fixture.append(
                '<ul id="panelbar">' +
                '    <li class="k-item k-state-default"><span class="k-link k-header">Mail<span' +
                '            class="k-icon k-i-arrow-s k-panelbar-expand"></span></span>' +
                '        <ul>' +
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
                '        <ul>' +
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

            panelbar = new kendo.ui.PanelBar(ul, { expandMode: "single" });
        },
        teardown: function() {
            kendo.effects.enable();

            panelbar.destroy();
        }
    });

    function getRootItem(index) {
        return ul.find('.k-header').parent().eq(index)
    }

    test('clicking not expandable item should not collapse expanded item', function() {
        var item = getRootItem(3);
        var item2 = getRootItem(1);

        item2.find('> .k-link').click();

        equal(item.find('.k-group').css("display"), "block");
    });

    test('clicking item should collapse other and fire collapse on it', function() {

        var item = getRootItem(3),
            item2 = getRootItem(2),
            collapseItem = false;

        panelbar.bind( "collapse", function(e) {
            collapseItem = e.item;
        });

        item2.find('> .k-link').trigger('click');

        equal(item.find('.k-group').css("display"), "none");
        equal(collapseItem, item[0]);
    });

    test('clicking item twice should not collapse it', function() {
        var item = getRootItem(0);

        item.find('> .k-link').trigger('click');
        item.find('> .k-link').trigger('click');

        equal(item.find('.k-group').css("display"), "block");
    });

    test('clicking subItem should not collapse headerItem', function() {
        var item = getRootItem(0);
        item.find('> .k-link').trigger('click');
        var subItem = item.find('> .k-group').children()[0];

        $(subItem).find('> .k-link').trigger('click');

        equal(item.find('.k-group').css("display"), "block");
    });

    test('clicking sub item should collapse siblings', function() {
        var item = getRootItem(4);
        panelbar.expand(item, false);

        var subItem1 = item.find('> .k-panel').children().eq(0);
        var subItem2 = subItem1.next();

        subItem1.find('> .k-link').trigger('click');
        subItem2.find('> .k-link').trigger('click');

        equal(subItem1.find('> .k-panel').css("display"), "none");
        equal(subItem2.find('> .k-panel').css("display"), "block");
    });
})();
