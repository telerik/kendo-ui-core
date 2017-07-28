(function(){
var menu,
    DELAY = 500;

function getRootItem(index) {
   return $('#menu').find('> .k-item > .k-link').eq(index)
}

module("hover delay", {
    setup: function () {
        $("#qunit-fixture").append(
            '    <ul id="menu" class="k-widget k-reset k-header k-menu" _style="visibility: hidden; top: -10000px">' +
            '        <li class="k-item k-state-default" style=""><span class="k-link">ASP.NET MVC<span' +
            '                class="k-icon k-i-arrow-60-down"></span></span>' +
            '            <ul class="k-group">' +
            '                <li class="k-item k-state-default"><span class="k-link">Grid</span>' +
            '                </li>' +
            '                <li class="k-item k-state-default"><span class="k-link">Menu<span' +
            '                class="k-icon k-i-arrow-60-right"></span></span>' +
            '                    <ul class="k-group">' +
            '                        <li class="k-item k-state-default"><span class="k-link">Grid</span>' +
            '                        </li>' +
            '                        <li class="k-item k-state-default"><span class="k-link">Menu</span>' +
            '                        </li>' +
            '                        <li class="k-item k-state-default"><span class="k-link">PanelBar</span></li>' +
            '                        <li class="k-item k-state-default"><span class="k-link">TabStrip</span></li>' +
            '                    </ul>' +
            '                </li>' +
            '                <li class="k-item k-state-default"><span class="k-link">PanelBar</span></li>' +
            '                <li class="k-item k-state-default"><span class="k-link">TabStrip</span></li>' +
            '            </ul>' +
            '        </li><li class="k-item k-state-default"><span class="k-link">Silverlight<span' +
            '                class="k-icon k-i-arrow-60-down"></span></span>' +
            '            <ul class="k-group">' +
            '                <li class="k-item k-state-default"><span class="k-link">GridView</span>' +
            '                </li>' +
            '                <li class="k-item k-state-default"><span class="k-link">Scheduler</span></li>' +
            '                <li class="k-item k-state-default"><span class="k-link">Docking</span>' +
            '                </li>' +
            '                <li class="k-item k-state-default"><span class="k-link">Chart</span></li>' +
            '                <li class="k-item k-state-default"><a href="http://www.telerik.com/products/silverlight.aspx"' +
            '                                                      class="k-link">... and 28 more!</a></li>' +
            '            </ul>' +
            '        </li><li class="k-item k-state-default"><span class="k-link">ASP.NET AJAX<span' +
            '                class="k-icon k-i-arrow-60-down"></span></span>' +
            '            <ul class="k-group">' +
            '                <li class="k-item k-state-default"><span class="k-link">Grid</span></li>' +
            '                <li class="k-item k-state-default"><span class="k-link">Editor</span>' +
            '                </li>' +
            '                <li class="k-item k-state-default"><span class="k-link">Scheduler</span></li>' +
            '                <li class="k-item k-state-default"><a href="http://www.telerik.com/products/aspnet-ajax.aspx"' +
            '                                                      class="k-link">... and 28 more!</a></li>' +
            '            </ul>' +
            '        </li><li class="k-item k-state-default"><a href="#Menu-4" class="k-link">OpenAccess ORM<span' +
            '                class="k-icon k-i-arrow-60-down"></span></a>' +
            '            <ul class="k-group">' +
            '                <li class="k-item">' +
            '                    <div id="Menu-4" class="k-content">' +
            '                        <a href="http://www.telerik.com/purchase/individual/orm.aspx" id="buy">' +
            '                            Telerik OpenAccess ORM' +
            '                        </a>' +
            '                        <a href="http://www.telerik.com/community/license-agreement.aspx?pId=639" id="express">' +
            '                            Telerik OpenAccess ORM Express' +
            '                        </a>' +
            '                    </div>' +
            '                </li>' +
            '            </ul>' +
            '        </li><li class="k-item k-state-default"><span class="k-link">Reporting</span></li><li class="k-item k-state-default"><span class="k-link">Sitefinity ASP.NET CMS</span>' +
            '        </li><li style="border-right: 0;" class="k-item k-state-default"><span class="k-link">Other products<span' +
            '                class="k-icon k-i-arrow-60-down"></span></span>' +
            '            <ul class="k-group">' +
            '                <li class="k-item k-state-default"><span class="k-link">Web Testing Tools</span>' +
            '                </li>' +
            '                <li class="k-item k-state-default"><span class="k-link">WinForms UI Controls</span>' +
            '                </li>' +
            '                <li class="k-item k-state-default"><span class="k-link">WPF UI Controls</span></li>' +
            '            </ul>' +
            '        </li>' +
            '    </ul>'
        );
        menu = new kendo.ui.Menu("#menu", { animation: false, hoverDelay: DELAY, popupCollision: "flip" });
    },
    teardown: function() {
        kendo.destroy($("#qunit-fixture"));
    }
});

test('should open menu popup after delay', 2, function() {
    jasmine.clock().install();
    var item = getRootItem(0).parent();

    menu._mouseenter({ currentTarget: item[0], delegateTarget: menu.element[0] });

    equal(menu.element.find(".k-popup:visible").length, 0);

    jasmine.clock().tick(DELAY);

    equal(menu.element.find(".k-popup:visible").length, 1);

    jasmine.clock().uninstall();

});

test('should close popups after delay', function() {
    jasmine.clock().install();
    var item = getRootItem(0).parent();

    menu._mouseenter({ currentTarget: item[0], delegateTarget: menu.element[0] });
    jasmine.clock().tick(DELAY);

    menu._mouseleave({ currentTarget: item[0], delegateTarget: menu.element[0] });

    equal(menu.element.find(".k-popup:visible").length, 1);

    jasmine.clock().tick(DELAY);

    equal(menu.element.find(".k-popup:visible").length, 0);

    jasmine.clock().uninstall();
});

test('opening another popup should respect delay', function() {
    jasmine.clock().install();
    var item = getRootItem(0).parent();

    menu._mouseenter({ currentTarget: item[0], delegateTarget: menu.element[0] });
    jasmine.clock().tick(DELAY);

    menu.element.find(".k-popup:visible").addClass("cached");
    menu._mouseleave({ currentTarget: item[0], delegateTarget: menu.element[0] });
    item = getRootItem(1).parent();
    menu._mouseenter({ currentTarget: item[0], delegateTarget: menu.element[0] });

    ok(menu.element.find(".k-popup:visible").is(".cached"), "hereeee");

    jasmine.clock().tick(DELAY);

    ok(!menu.element.find(".k-popup:visible").is(".cached"));

    jasmine.clock().uninstall();
});

})();