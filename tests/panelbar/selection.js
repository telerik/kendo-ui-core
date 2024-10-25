(function() {
    var panelbar;
    var ul;

    describe("panelbar selection", function() {
        beforeEach(function() {

            Mocha.fixture.append(
                '<ul id="panelbar">' +
                '    <li class="k-panelbar-item"><span class="k-link k-header">Mail<span' +
                '            class="k-icon k-i-chevron-down k-panelbar-expand"></span></span>' +
                '        <ul style="display: none;" class="k-panelbar-group">' +
                '            <li class="k-panelbar-item"><span class="k-link">Personal Folders</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">Deleted Items</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item k-disabled"><span class="k-link">Inbox</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">My Mail</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">Sent Items</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">Outbox</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">Search Folders</span>' +
                '            </li>' +
                '        </ul>' +
                '    </li>' +
                '    <li class="k-panelbar-item k-disabled"><span class="k-link k-header">Contacts<span' +
                '            class="k-icon k-i-chevron-down k-panelbar-expand"></span></span>' +
                '        <ul class="k-panelbar-group" style="display: none;">' +
                '            <li class="k-panelbar-item"><span class="k-link">My Contacts</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">Address Cards</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">Phone List</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">Shared Contacts</span>' +
                '            </li>' +
                '        </ul>' +
                '    </li>' +
                '    <li class="k-panelbar-item"><span class="k-link k-header">Tasks<span' +
                '            class="k-icon k-i-chevron-down k-panelbar-expand"></span></span>' +
                '        <ul class="k-panelbar-group" style="display: none;">' +
                '            <li class="k-panelbar-item"><span class="k-link">My Tasks</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">Shared Tasks</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">Active Tasks</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">Completed Tasks</span>' +
                '            </li>' +
                '        </ul>' +
                '    </li>' +
                '    <li class="k-panelbar-item k-active"><span class="k-link k-header k-selected">Notes<span' +
                '            class="k-icon k-i-arrow-chevron-up k-panelbar-collapse"></span></span>' +
                '        <ul class="k-panelbar-group" style="display: block;">' +
                '            <li class="k-panelbar-item"><span class="k-link">My Notes</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">Notes List</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">Shared Notes</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">Archive</span>' +
                '            </li>' +
                '        </ul>' +
                '    </li>' +
                '    <li class="k-panelbar-item"><span class="k-link k-header">Folders List<span' +
                '            class="k-icon k-i-chevron-down k-panelbar-expand"></span></span>' +
                '        <ul class="k-panelbar-group" style="display: none;">' +
                '            <li class="k-panelbar-item"><span class="k-link">My Client.Net</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">My Profile<span' +
                '                    class="k-icon k-i-arrow-chevron-up k-panelbar-collapse"></span></span>' +
                '                <ul style="display: none;" class="k-panelbar-group">' +
                '                    <li class="k-panelbar-item"><a href="#"' +
                '                                                          class="k-link">Server Binding</a></li>' +
                '                    <li class="k-panelbar-item"><a href="#"' +
                '                                                          class="k-link">Ajax Binding</a></li>' +
                '                    <li class="k-panelbar-item"><a href="#"' +
                '                                                          class="k-link">Web Service Binding</a></li>' +
                '                    <li class="k-panelbar-item"><a href="#"' +
                '                                                          class="k-link">Custom Binding</a></li>' +
                '                    <li class="k-panelbar-item"><a href="#"' +
                '                                                          class="k-link">Twitter Binding</a></li>' +
                '                    <li class="k-panelbar-item"><a href="#"' +
                '                                                          class="k-link">Facebook Binding</a></li>' +
                '                </ul>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">My Support Tickets</span>' +
                '            </li>' +
                '            <li class="k-panelbar-item"><span class="k-link">My Licenses</span>' +
                '            </li>' +
                '        </ul>' +
                '    </li>' +
                '</ul>'
            );

            ul = $("#panelbar");

            panelbar = new kendo.ui.PanelBar(ul);
        });
        afterEach(function() {


            panelbar.destroy();
        });

        function getRootItem(index) {
            return ul.find('.k-header').parent().eq(index);
        }

        it('clicking root items selects them', function() {
            var firstLink = getRootItem(0).find('> .k-link');

            firstLink.trigger({ type: 'click' });

            assert.isOk(firstLink.hasClass('k-selected'));
        });

        it('selecting root items deselects their siblings', function() {
            var firstLink = getRootItem(0).find('> .k-link');
            var secondLink = getRootItem(1).find('> .k-link');

            firstLink.trigger({ type: 'click' });
            secondLink.trigger({ type: 'click' });

            assert.equal(ul.find('.k-selected').length, 1);
        });
    });
}());
