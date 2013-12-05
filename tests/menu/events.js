(function() {

function onSelect() {
    isRaised = true;
}

function getRootItem(index) {
    return $('> .k-item', menu.element).eq(index);
}

var menu, isRaised,
    CLICK = "click";

module("menu events", {
    setup: function () {
        QUnit.fixture.append(
'            <ul id="menu" style="position: absolute; visibility: hidden;">' +
'                <li>ASP.NET MVC' +
'                    <ul>' +
'                        <li>Grid' +
'                        </li>' +
'                        <li>Menu' +
'                            <ul>' +
'                                <li>Grid' +
'                                </li>' +
'                                <li>Menu' +
'                                </li>' +
'                                <li>PanelBar</li>' +
'                                <li>TabStrip</li>' +
'                            </ul>' +
'                        </li>' +
'                        <li>PanelBar</li>' +
'                        <li>TabStrip</li>' +
'                    </ul>' +
'                </li><li>Silverlight' +
'                    <ul>' +
'                        <li>GridView' +
'                        </li>' +
'                        <li>Scheduler' +
'                        </li>' +
'                        <li>Docking' +
'                        </li>' +
'                        <li class="k-item k-state-disabled">Chart' +
'                        </li>' +
'                        <li><a href="http://www.telerik.com/products/silverlight.aspx">... and 28 more!</a></li>' +
'                    </ul>' +
'                </li><li>ASP.NET AJAX' +
'                    <ul>' +
'                        <li>Grid</li>' +
'                        <li>Editor' +
'                        </li>' +
'                        <li>Scheduler' +
'                        </li>' +
'                        <li><a href="http://www.telerik.com/products/aspnet-ajax.aspx">... and 28 more!</a></li>' +
'                    </ul>' +
'                </li><li><a href="#Menu-4">OpenAccess ORM</a>' +
'                    <ul>' +
'                        <li>' +
'                            <div id="Menu-4">' +
'                                <a href="http://www.telerik.com/purchase/individual/orm.aspx" id="buy">' +
'                                    Telerik OpenAccess ORM' +
'                                </a>' +
'                                <a href="http://www.telerik.com/community/license-agreement.aspx?pId=639" id="express">' +
'                                    Telerik OpenAccess ORM Express' +
'                                </a>' +
'                            </div>' +
'                        </li>' +
'                    </ul>' +
'                </li>' +
'                    <li>Reporting' +
'                    </li>' +
'                    <li>' +
'                        Sitefinity ASP.NET CMS' +
'                    </li>' +
'                    <li>Other products' +
'                    <ul>' +
'                        <li>Web Testing Tools' +
'                        </li>' +
'                        <li>WinForms UI Controls' +
'                        </li>' +
'                        <li>WPF UI Controls' +
'                        </li>' +
'                    </ul>' +
'                </li>' +
'            </ul>'
        );
        menu = new kendo.ui.Menu("#menu", { animation: false, select: onSelect, hoverDelay: 0 });
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

asyncTest("close event can be canceled", 1, function() {
    menu.bind("close", function (e) { e.preventDefault() });

    menu.bind("activate", function() {
        menu.close(menu.element.children("li:eq(2)"));
        equal(menu.element.find(">li:eq(2) ul").is(":visible"), true);
        start();
    });

    menu.open(menu.element.children("li:eq(2)"));
});


asyncTest("activate event is fired after open", 1, function() {
    menu.unbind("open");
    var activated = false;

    menu.bind("activate", function() {
        activated = true;
    });

    menu.open(menu.element.children("li:eq(1)"));

    setTimeout(function () {
        equal(activated, true);
        start();
    }, 10);
});


test("element select is triggered when menu element is clicked", function() {
    var item = getRootItem(0),
        triggerCount = 0;

    menu.bind("select", function() {
        triggerCount++;
    });

    item.trigger(CLICK);

    equal(triggerCount, 1);
});


test('clicking disabled item should not raise onSelect event on parent item', function() {
    var item = getRootItem(1);

    isRaised = false;

    item.find('.k-item > .k-link').eq(3).trigger('click');

    ok(!isRaised);
});

asyncTest("open event can be canceled", 1, function() {
    menu.bind("open", function (e) { e.preventDefault() });
    menu.open(menu.element.children("li:first"));

    setTimeout(function () {
        equal(menu.element.find(">li:first ul").is(":visible"), false);
        start();
    }, 10);
});


})();
