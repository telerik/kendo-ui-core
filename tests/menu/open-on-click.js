(function() {

    function getRootItem(index) {
        return $('#menu').find('> .k-item > .k-link')[index];
    }

    var open;
    var close;
    var menu;

    describe("menu open on click", function() {
        beforeEach(function() {
            Mocha.fixture.append(
                '<ul id="menu" class="k-widget k-reset k-header k-menu" style="visibility: hidden;">' +
                '    <li class="k-item k-state-default" style=""><span class="k-link">ASP.NET MVC<span' +
                '            class="k-icon k-i-arrow-60-down"></span></span>' +
                '        <ul class="k-group">' +
                '            <li class="k-item k-state-default"><span class="k-link">Grid</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Menu<span' +
                '            class="k-icon k-i-arrow-60-right"></span></span>' +
                '                <ul class="k-group">' +
                '                    <li class="k-item k-state-default"><span class="k-link">Grid</span>' +
                '                    </li>' +
                '                    <li class="k-item k-state-default"><span class="k-link">Menu</span>' +
                '                    </li>' +
                '                    <li class="k-item k-state-default"><span class="k-link">PanelBar</span></li>' +
                '                    <li class="k-item k-state-default"><span class="k-link">TabStrip</span></li>' +
                '                </ul>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">PanelBar</span></li>' +
                '            <li class="k-item k-state-default"><span class="k-link">TabStrip</span></li>' +
                '        </ul>' +
                '    </li><li class="k-item k-state-default"><span class="k-link">Silverlight<span' +
                '            class="k-icon k-i-arrow-60-down"></span></span>' +
                '        <ul class="k-group">' +
                '            <li class="k-item k-state-default"><span class="k-link">GridView</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Scheduler</span></li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Docking</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Chart</span></li>' +
                '            <li class="k-item k-state-default"><a href="http://www.telerik.com/products/silverlight.aspx"' +
                '                                                  class="k-link">... and 28 more!</a></li>' +
                '        </ul>' +
                '    </li><li class="k-item k-state-default"><span class="k-link">ASP.NET AJAX<span' +
                '            class="k-icon k-i-arrow-60-down"></span></span>' +
                '        <ul class="k-group">' +
                '            <li class="k-item k-state-default"><span class="k-link">Grid</span></li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Editor</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">Scheduler</span></li>' +
                '            <li class="k-item k-state-default"><a href="http://www.telerik.com/products/aspnet-ajax.aspx"' +
                '                                                  class="k-link">... and 28 more!</a></li>' +
                '        </ul>' +
                '    </li><li class="k-item k-state-default">OpenAccess ORM<span' +
                '            class="k-icon k-i-arrow-60-down"></span>' +
                '        <ul class="k-group">' +
                '            <li class="k-item">' +
                '                <div id="Menu-4" class="k-content">' +
                '                    <a href="http://www.telerik.com/purchase/individual/orm.aspx" id="buy">' +
                '                        Telerik OpenAccess ORM' +
                '                    </a>' +
                '                    <a href="http://www.telerik.com/community/license-agreement.aspx?pId=639" id="express">' +
                '                        Telerik OpenAccess ORM Express' +
                '                    </a>' +
                '                </div>' +
                '            </li>' +
                '        </ul>' +
                '    </li><li class="k-item k-state-default"><span class="k-link">Reporting</span></li><li class="k-item k-state-default"><span class="k-link">Sitefinity ASP.NET CMS</span>' +
                '    </li><li style="border-right: 0;" class="k-item k-state-default"><span class="k-link">Other products<span' +
                '            class="k-icon k-i-arrow-60-down"></span></span>' +
                '        <ul class="k-group">' +
                '            <li class="k-item k-state-default"><span class="k-link">Web Testing Tools</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">WinForms UI Controls</span>' +
                '            </li>' +
                '            <li class="k-item k-state-default"><span class="k-link">PF UI Controls</span></li>' +
                '        </ul>' +
                '    </li>' +
                '    <li><a href="javascript:">ASP.NET MVC</a></li>' +
                '</ul>'
            );

        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        function initializeMenu() {
            menu = new kendo.ui.Menu("#menu", { animation: false, openOnClick: true, hoverDelay: 0 });
            open = menu.open;
            close = menu.close;
        }

        it('open on click is serialized', function() {
            initializeMenu();
            assert.isOk(menu.options.openOnClick);
        });

        it('click method should call preventDefault method', function() {
            initializeMenu();
            var item = getRootItem(3);
            var isCalled = false;

            var e = { target: item, preventDefault: function() { isCalled = true; }, stopPropagation: function() { } };

            menu._click(e);

            assert.isOk(isCalled);
        });

        it('click method on item with URL shouldn\'t call preventDefault method', function() {
            initializeMenu();
            var item = getRootItem(7);
            var isCalled = false;

            var e = { target: item, preventDefault: function() { isCalled = true; }, stopPropagation: function() { } };

            menu._click(e);

            assert.isOk(!isCalled);
        });

        it('clicking on item content should do nothing', function() {
            initializeMenu();
            var element = $("#Menu-4");
            var isCalled = false;
            var failHandler = function() {
                assert.isOk(false);
            };

            var e = { target: element, preventDefault: function() { isCalled = true; }, stopPropagation: function() { } };

            menu.bind("select", failHandler);
            menu.bind("open", failHandler);
            menu.bind("close", failHandler);
            menu._click(e);

            assert.isOk(!isCalled);
        });

        it('hovering root item does not open it', function() {
            initializeMenu();
            var opened = false,
                item = $("li:first", menu.element)[0],
                menuElement = menu.wrapper[0],
                e = { target: item, currentTarget: item, delegateTarget: menuElement, relatedTarget: menuElement, preventDefault: $.noop, stopPropagation: $.noop };

            menu.open = function() { opened = true; };

            menu._mouseenter(e, item);

            assert.isOk(!opened);
        });

        it('hovering root item does not open it after using close method', function() {
            initializeMenu();
            var opened,
                item = $("li:first", menu.element)[0],
                menuElement = menu.wrapper[0],
                e = { target: item, currentTarget: item, delegateTarget: menuElement, relatedTarget: menuElement, preventDefault: $.noop, stopPropagation: $.noop };

            menu.open = function() { opened = true; };

            menu._click(e, item);
            opened = false;
            menu.close(item);
            menu._mouseenter(e, item);

            assert.isOk(!opened);
            assert.equal(menu.clicked, false);
        });

        it('clicking root item should open it', function() {
            initializeMenu();
            var opened = false;
            menu.open = function() { opened = true; };
            var element = $("li:first", menu.element)[0];
            menu._click({ target: element, preventDefault: function() { }, stopPropagation: function() { } }, element);
            assert.isOk(opened);
            assert.isOk(menu.clicked);
        });

        it('leaving opened item does not close it', function() {
            initializeMenu();
            var opened = false;
            menu.clicked = true;
            menu.open = function() { opened = true; };

            menu._mouseleave({}, $("li:first", menu.element)[0]);

            assert.isOk(!opened);
        });

        it('leaving opened and hovering a sibling closes it and does not open the sibling', function() {
            initializeMenu();
            var opened = false;
            menu.clicked = true;
            menu.open = function() { opened = true; };

            var element = $("li:first", menu.element)[0];
            menu._mouseenter({ currentTarget: element, delegateTarget: menu.element[0], indexOf: function() { }, type: 'mouseenter' }, element.nextSibling);

            assert.isOk(opened);
        });

        it('clicking the document closes the open item', function() {
            initializeMenu();
            menu.clicked = true;
            
            menu._documentClick({ target: document.body }, document);
            assert.isOk(menu.clicked === false);
        });

        it('rootMenuItems: sibling root item is not opened on mouseenter', function() {
            menu = new kendo.ui.Menu("#menu", { animation: false, openOnClick: { rootMenuItems: true }, hoverDelay: 0 });
            var opened = false;

            var element = $("li:first", menu.element)[0];
            menu._click({ target: element, preventDefault: function() { }, stopPropagation: function() { } }, element);
            menu.open = function() { opened = true; };
            menu._mouseenter({ currentTarget: element, delegateTarget: menu.element[0], indexOf: function() { }, type: 'mouseenter' }, element.nextSibling);
            assert.isOk(!opened);
        });

        it('rootMenuItems: sibling root item is opened on click', function() {
            menu = new kendo.ui.Menu("#menu", { animation: false, openOnClick: { rootMenuItems: true }, hoverDelay: 0 });
            var opened = false;

            var element = $("li:first", menu.element)[0];
            menu._click({ target: element, preventDefault: function() { }, stopPropagation: function() { } }, element);
            menu.open = function() { opened = true; };
            menu._click({ target: element.nextSibling, preventDefault: function() { }, stopPropagation: function() { } }, element.nextSibling);
            assert.isOk(opened);
        });
    });
}());
