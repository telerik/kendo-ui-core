(function() {
var isRaised, isOpenRaised, isCloseRaised, isSelectRaised, selected;

function getRootItem(index) {
   return $('#menu').find('> .k-item > .k-link').eq(index)
}

 //handlers
function Open() {
    isOpenRaised = true;
}

function Close() {
    isCloseRaised = true;
}

function Select() {
     selected++;
     isSelectRaised = true;
}


var onLoadMenu;

function Load() {
    isRaised = true;
    onLoadMenu = getMenu();
}


var menu,
    CLICK = kendo.support.touch ? "touchend" : "click";

describe("menu api", function () {
    beforeEach(function () {
        $("#qunit-fixture").append(
            '    <ul id="menu" class="k-widget k-reset k-header k-menu" style="visibility: hidden; top: -10000px">' +
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
        menu = new kendo.ui.Menu("#menu", { animation: false, select: Select, open: Open, close: Close, hoverDelay: 0, popupCollision: "flip" });
    });
    afterEach(function() {
        kendo.destroy($("#qunit-fixture"));
});

it('click method should set handled flag and select event is only fired once', function() {
    var link = getRootItem(7);
    var isCalled = false;

    var e = { target: link[0], stopPropagation: function () {}, preventDefault: function () {} };

    selected = 0;
    menu._click(e);

    assert.isOk(e.handled);
    assert.isOk(selected == 1);
});

it('hovering root item opens it and raises open event', function() {
    jasmine.clock().install();
    var item = getRootItem(1).parent();

    menu._mouseenter({ currentTarget: item[0], delegateTarget: menu.element[0] });

    jasmine.clock().tick();
    assert.isOk(isOpenRaised);
    jasmine.clock().uninstall();
});

it('leaving root item closes it and raises close event', function() {
    jasmine.clock().install();
    var item = getRootItem(1).parent();

    menu._mouseenter({ currentTarget: item[0], delegateTarget: menu.element[0] });

    menu.bind("close", function() {
        assert.isOk(true);
    })

    jasmine.clock().tick();
    menu._mouseleave({ currentTarget: item[0] });

    jasmine.clock().tick();
    jasmine.clock().uninstall();
});

it('leaving item root outside viewport left direction viewport closes it and raises close event', function() {
    jasmine.clock().install();
    var item = getRootItem(1).parent();

    menu._mouseenter({ currentTarget: item[0], delegateTarget: menu.element[0] });

    menu.bind("close", function() {
        assert.isOk(true);
    })

    jasmine.clock().tick();
    menu._mouseleave({ currentTarget: item[0], target: item.find("span.k-link")[0], clientX: -1});

    jasmine.clock().tick();
    jasmine.clock().uninstall();

});

it('leaving item root outside viewport top direction closes it and raises close event', function() {
    jasmine.clock().install();
    var item = getRootItem(1).parent();

    menu._mouseenter({ currentTarget: item[0], delegateTarget: menu.element[0] });

    menu.bind("close", function() {
        assert.isOk(true);
    })

    jasmine.clock().tick();
    menu._mouseleave({ currentTarget: item[0], target: item.find("span.k-link")[0], clientY: -1});

    jasmine.clock().tick();
    jasmine.clock().uninstall();
});

it('leaving item root outside viewport bottom direction closes it and raises close event', function() {
    jasmine.clock().install();
    var item = getRootItem(1).parent();

    menu._mouseenter({ currentTarget: item[0], delegateTarget: menu.element[0] });

    menu.bind("close", function() {
        assert.isOk(true);
    })

    jasmine.clock().tick();
    menu._mouseleave({ currentTarget: item[0], target: item.find("span.k-link")[0], clientY: $(window).height() + 2});

    jasmine.clock().tick();
    jasmine.clock().uninstall();
});

it('leaving item root outside viewport right direction closes it and raises close event', function() {
    jasmine.clock().install();
    var item = getRootItem(1).parent();

    menu._mouseenter({ currentTarget: item[0], delegateTarget: menu.element[0] });

    menu.bind("close", function() {
        assert.isOk(true);
    })

    jasmine.clock().tick();
    menu._mouseleave({ currentTarget: item[0], target: item.find("span.k-link")[0], clientX: $(window).width() + 2});

    jasmine.clock().tick();
    jasmine.clock().uninstall();
});

it('clicking should raise select event', function() {
    var link = getRootItem(2);

    isSelectRaised = false;

    link.trigger(CLICK);

    assert.isOk(isSelectRaised);
});

it('clicking on sub item should close the menu', function() {
    var link = getRootItem(1);

    menu._mouseenter({currentTarget: link[0]});

    var e = { stopPropagation: function () {}, preventDefault: function () {} };

    link.trigger(CLICK);

    assert.isOk(link.parent().is(":visible"));
});

it('clicking on item content should do nothing', function() {
    var element = $("#Menu-4");
    var isCalled = false;
    var failHandler = function() {
        assert.isOk(false);
    };

    var e = { target: element, preventDefault: function () { isCalled = true; }, stopPropagation: function () {} };

    menu.bind("select", failHandler);
    menu.bind("open", failHandler);
    menu.bind("close", failHandler);
    menu._click(e);

    assert.isOk(!isCalled);
});

it('open should open item even if disabled', function(done) {
    var item = getRootItem(6).parent();

    menu.disable(item);
    menu.open(item);

    setTimeout(function () {
        assert.isOk(item.find('.k-group').is(":visible"));
        done();
    }, 1);
});

it('open should apply max-height and overflow styles to group UL', function(done) {
    var item = getRootItem(1).parent(),
        ul = item.find(".k-group");

    menu.open(item);

    setTimeout(function () {
        var maxHeightStyle = parseInt(ul.css("max-height"), 10),
            overflowStyle = ul.css("overflow"),
            windowHeight = $(window).height() - kendo.getShadows(ul).bottom - (ul.outerHeight() - ul.height());

        assert.isOk(!isNaN(maxHeightStyle));
        assert.equal(overflowStyle, "auto");
        assert.equal(maxHeightStyle, windowHeight);
        done();
    }, 30);
});

it('open should not apply max-height and overflow styles to group UL if it has children groups', function(done) {
    var item = getRootItem(0).parent(),
        ul = item.find(".k-group").css({maxHeight: 1, overflow: "auto"});

    menu.open(item);

    setTimeout(function () {
        var maxHeightStyle = parseInt(ul.css("max-height"), 10),
            overflowStyle = ul.css("overflow");

        assert.isOk(isNaN(maxHeightStyle));
        assert.notEqual(overflowStyle, "auto");
        done();
    }, 1);
});

it('clicking should not open item if disabled', function() {
    var item = getRootItem(4).parent();

    menu.disable(item);

    item.children(".k-link").trigger(CLICK);

    assert.isOk(!item.find('.k-group').is(":visible"));
});

it('disable method should disable enabled item', function() {
    var item = getRootItem(2).parent();

    menu.disable(item);

    assert.isOk(item.hasClass('k-state-disabled'));
});

it('enable method should enable disabled item', function() {
    var item = getRootItem(3).parent();

    menu.enable(item);

    assert.isOk(item.hasClass('k-state-default'));
});

it('configure with popupCollision overrides the default', function(done) {
    var item = getRootItem(3).parent();

    menu.open(item);

    setTimeout(function () {
        assert.isOk(item.find(".k-group").eq(0).data("kendoPopup").options.collision == "flip");
        done();
    }, 1);
});

it('setOptions resets the animation', function() {
    var m = new kendo.ui.Menu("<div />");

    assert.isOk(!("effects" in m.options.animation.open));

    m.setOptions({ animation: false });

    assert.isOk("effects" in m.options.animation.open);
    assert.isOk(kendo.size(m.options.animation.open.effects) == 0);
    m.destroy();
});

it('setOptions resets the dataSource object', function() {
    var m = new kendo.ui.Menu("<div />", { dataSource: [ { text: "Item 1" } ] });

    assert.isOk(m.element.find("li").text() == "Item 1");

    m.setOptions({ dataSource: [ { text: "Changed" } ] });

    assert.isOk(m.element.find("li").text() == "Changed");
    m.destroy();
});

it("Element with class k-icon doesn't get removed in an item", function () {
    var m = new kendo.ui.Menu("<ul><li><span class='k-icon'></span></li></ul>");

    assert.isOk(m.element.find(".k-icon")[0]);
    m.destroy();
});

it("Add dynamic item with cssClass", function () {
    var m = new kendo.ui.Menu("<ul></ul>");

    m.append({ text: "test", cssClass: "cssClass" });

    assert.isOk(m.element.find(".cssClass")[0]);
    m.destroy();
});

it("Adding dynamic content element renders properly on root and inner levels", function () {
    var m = new kendo.ui.Menu("<ul></ul>");

    m.append([
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

    assert.isOk(m.element.children("li:first").children("div.k-content.k-menu-group.k-group")[0]);
    assert.isOk(m.element.find("> li:last > ul > li:first").children("div.k-content.k-menu-group.k-group")[0]);
    m.destroy();
});

it("_itemHasChildren returns true when there is content item", function () {
    var m = new kendo.ui.Menu("<ul></ul>");

    m.append([
        {
            text: "Item 1",
            content: "Item 1 Content"
        }
    ]);

    assert.isOk(m._itemHasChildren(m.element.children("li:first")));
    m.destroy();
});

it("Adding dynamic contentUrl element renders contents on root and inner levels", function () {
    var m = new kendo.ui.Menu("<ul></ul>");

    m.append([
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

    assert.isOk(m.element.children("li:first").children("div.k-content")[0]);
    assert.isOk(m.element.find("> li:last > ul > li:first").children("div.k-content")[0]);
    m.destroy();
});

    it('insertAfter method moves an item if called with existing item', function() {
        var menu = $("<ul><li>Item 1</li><li>Item 2</li></ul>").kendoMenu().data("kendoMenu");

        try {
            menu.insertAfter("li:first-child", "li:last-child");

            assert.isOk(menu.element.children("li:last-child").text() == "Item 1");
        } finally {
            menu.destroy();
        }
    });

    it('overflow menu - setOptions reinitialize overflow wrapper', function() {
        var m = new kendo.ui.Menu("<div />");

        m.setOptions({ scrollable: true, orientation: "horizontal" });
        assert.isOk(m._overflowWrapper().is(".horizontal"));

        m.setOptions({ scrollable: true, orientation: "vertical" });
        assert.isOk(m._overflowWrapper().is(".vertical"));

        m.destroy();
    });

    it('overflow menu - setOptions reattach events', function() {
        var m = new kendo.ui.Menu("<div />");

        mockFunc(kendo.ui.Menu.fn, "_detachMenuEventsHandlers", function() { assert.isOk(true); });
        mockFunc(kendo.ui.Menu.fn, "_attachMenuEventsHandlers", function() { assert.isOk(true); });

        m.setOptions({ scrollable: true, orientation: "horizontal" });

        removeMocksIn(kendo.ui.Menu.fn);

        m.destroy();
    });

    it('overflow menu - opened popups should be inserted after the menu', function(done) {
        menu.setOptions({ scrollable: true, orientation: "horizontal" });
        var item = getRootItem(6).parent();

        menu.open(item);

        setTimeout(function () {
            assert.equal(menu.element.siblings(".k-animation-container").length, 1);
            done();
        }, 1);
    });

    it('overflow menu - opened popups should contains scroll buttons', function(done) {
        menu.setOptions({ scrollable: true, orientation: "horizontal" });
        var item = getRootItem(6).parent();

        menu.open(item);

        setTimeout(function () {
            assert.equal(menu.element.siblings(".k-menu-scroll-button").length, 2);
            done();
        }, 1);
    });

    it('overflow menu - turning off scrollable should return back the opened UL groups to their parent LI', function(done) {
        menu.setOptions({ scrollable: true, orientation: "horizontal" });
        var item = getRootItem(6).parent();

        menu.open(item);

        setTimeout(function () {
            menu.close(item);
            setTimeout(function () {
                menu.setOptions({ scrollable: false });
                assert.isNotOk(menu._overflowWrapper());
                assert.equal(menu.element.siblings(".k-animation-container,.k-menu-scroll-button").length, 0);
                done();
            }, 1);
        }, 1);
    });

    it('remove with non-existing item should not throw js error', function() {
        try {
            menu.remove("#no-such-item")
        } catch (error) {
            assert.isOk(false);
        }

        assert.isOk(true);
    });

    });
}());

