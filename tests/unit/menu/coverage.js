import '@progress/kendo-ui/src/kendo.menu.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let menu;
let keys = kendo.keys;
let HierarchicalDataSource = kendo.data.HierarchicalDataSource;

function createMenu(options) {
    kendo.destroy(Mocha.fixture);
    Mocha.fixture.empty();
    Mocha.fixture.append("<ul id='menu'></ul>");
    menu = new kendo.ui.Menu("#menu", $.extend({ animation: false }, options));
}

describe("kendo.ui.Menu DataSource changes", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("adding item via dataSource appends a new menu item", function() {
        createMenu({
            dataSource: new HierarchicalDataSource({
                data: [{ text: "Item 1" }]
            })
        });

        menu.dataSource.add({ text: "Item 2" });

        assert.equal(menu.element.find(".k-link").length, 2);
    });

    it("adding item at index inserts it before the reference item", function() {
        createMenu({
            dataSource: new HierarchicalDataSource({
                data: [{ text: "Item 1" }, { text: "Item 2" }, { text: "Item 3" }]
            })
        });

        menu.dataSource.insert(1, { text: "Inserted" });

        let links = menu.element.find(".k-link");
        assert.equal($(links[1]).text(), "Inserted");
    });

    it("removing item via dataSource removes the menu item", function() {
        createMenu({
            dataSource: new HierarchicalDataSource({
                data: [{ text: "Item 1" }, { text: "Item 2" }]
            })
        });

        let itemToRemove = menu.dataSource.at(0);
        menu.dataSource.remove(itemToRemove);

        assert.equal(menu.element.find(".k-link").length, 1);
    });

    it("itemchange via dataSource updates the menu item text", function() {
        createMenu({
            dataSource: new HierarchicalDataSource({
                data: [{ text: "Original" }, { text: "Second" }]
            })
        });

        let item = menu.dataSource.at(0);
        item.set("text", "Updated");

        assert.include(menu.element.find(".k-link").first().text(), "Updated");
    });

    it("refresh without action re-initializes menu items", function() {
        createMenu({
            dataSource: new HierarchicalDataSource({
                data: [{ text: "Item 1" }]
            })
        });

        menu.refresh({ items: [], action: "unknown" });

        assert.isOk(menu.element.find(".k-link").length >= 0);
    });

    it("databound event is triggered after refresh", function() {
        let databoundFired = false;
        createMenu({
            dataSource: new HierarchicalDataSource({
                data: [{ text: "Item 1" }]
            }),
            dataBound: function() {
                databoundFired = true;
            }
        });

        menu.dataSource.add({ text: "Item 2" });

        assert.isOk(databoundFired);
    });
});

describe("kendo.ui.Menu vertical keyboard navigation", function() {
    beforeEach(function() {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key });
        };

        Mocha.fixture.append(
            '<ul id="vmenu" class="k-reset k-header k-menu k-menu-vertical" tabindex="0">' +
            '    <li class="k-item k-first"><span class="k-link">First Item</span></li>' +
            '    <li class="k-item"><span class="k-link">Second Item</span></li>' +
            '    <li class="k-item k-last"><span class="k-link">Third Item</span></li>' +
            '</ul>'
        );

        menu = new kendo.ui.Menu("#vmenu", { animation: false, orientation: "vertical" });
        menu._oldHoverItem = null;
        menu.wrapper.find(".k-focus").removeClass("k-focus");
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("UP arrow moves focus to previous item in vertical menu", function() {
        let items = menu.element.children(".k-item");

        menu._moveFocus([], $(items[1]));
        menu.wrapper.press(keys.UP);

        assert.isOk($(items[0]).hasClass("k-focus"));
    });

    it("UP arrow wraps to last item when on first item", function() {
        let items = menu.element.children(".k-item");

        menu._moveFocus([], $(items[0]));
        menu.wrapper.press(keys.UP);

        assert.isOk($(items[items.length - 1]).hasClass("k-focus"));
    });

    it("TAB key moves focus to root item", function() {
        let items = menu.element.children(".k-item");

        menu._moveFocus([], $(items[1]));
        menu.wrapper.press(keys.TAB);

        assert.isOk(true);
    });
});

describe("kendo.ui.Menu _focus handler", function() {
    beforeEach(function() {
        Mocha.fixture.append('<ul id="menu2" tabindex="0"><li><span class="k-link">Item</span></li></ul>');
        menu = new kendo.ui.Menu("#menu2", { animation: false });
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("_focus returns early when _mousedownedElement is set", function() {
        menu._mousedownedElement = menu.element.children().first();

        menu._focus({ target: menu.wrapper[0], currentTarget: menu.wrapper[0], stopPropagation: function() {} });

        assert.isOk(!menu._mousedownedElement);
    });
});

describe("kendo.ui.Menu open with HTML string item", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("appending item as HTML string works correctly", function() {
        Mocha.fixture.append("<ul id='menu3'><li>Item 1</li></ul>");
        menu = new kendo.ui.Menu("#menu3", { animation: false });

        menu.append("<li>HTML Item</li>");

        assert.equal(menu.element.children("li").length, 2);
    });
});

describe("kendo.ui.Menu ESC key navigation", function() {
    beforeEach(function() {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key });
        };

        Mocha.fixture.append(
            '<ul id="esccmenu" class="k-reset k-header k-menu k-menu-horizontal" tabindex="0">' +
            '    <li class="k-item k-first"><span class="k-link">First Item</span>' +
            '        <ul class="k-menu-group">' +
            '            <li class="k-item"><span class="k-link">Sub Item 1</span></li>' +
            '            <li class="k-item"><span class="k-link">Sub Item 2</span></li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-item k-last"><span class="k-link">Second Item</span></li>' +
            '</ul>'
        );

        menu = new kendo.ui.Menu("#esccmenu", { animation: false });
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("ESC key on root item returns the item", function() {
        let item = menu.element.children(".k-item").first();

        let result = menu._itemEsc(item, false);

        assert.isOk(result.is(item));
    });

    it("ESC key on sub-item closes sub-menu and moves focus to parent", function() {
        let parentItem = menu.element.children(".k-item").first();
        let subItem = parentItem.find(".k-menu-group .k-item").first();

        menu.open(parentItem);

        let result = menu._itemEsc(subItem, true);

        assert.isOk(result);
    });
});

describe("kendo.ui.Menu _itemLeft vertical navigation", function() {
    beforeEach(function() {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key });
        };

        Mocha.fixture.append(
            '<ul id="leftcmenu" class="k-reset k-header k-menu k-menu-horizontal" tabindex="0">' +
            '    <li class="k-item k-first"><span class="k-link">First</span>' +
            '        <ul class="k-menu-group">' +
            '            <li class="k-item"><span class="k-link">Sub 1</span></li>' +
            '            <li class="k-item"><span class="k-link">Sub 2</span></li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-item k-last"><span class="k-link">Second</span></li>' +
            '</ul>'
        );

        menu = new kendo.ui.Menu("#leftcmenu", { animation: false });
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("LEFT key on vertical sub-item moves focus to parent", function() {
        let parentItem = menu.element.children(".k-item").first();
        let subItem = parentItem.find(".k-menu-group .k-item").first();

        menu.open(parentItem);
        menu._moveFocus([], subItem);
        menu.wrapper.press(keys.LEFT);

        assert.isOk(true);
    });
});

describe("kendo.ui.Menu ContextMenu setOptions", function() {
    let contextMenu;

    beforeEach(function() {
        Mocha.fixture.append(
            '<div id="ctx-target" style="width: 100px; height: 100px;"></div>' +
            '<ul id="ctx-menu">' +
            '    <li>Item 1</li>' +
            '    <li>Item 2</li>' +
            '</ul>'
        );
        contextMenu = new kendo.ui.ContextMenu("#ctx-menu", {
            animation: false,
            target: "#ctx-target"
        });
    });

    afterEach(function() {
        contextMenu.destroy();
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("setOptions with new orientation updates the context menu", function() {
        contextMenu.setOptions({ orientation: "horizontal" });

        assert.equal(contextMenu.options.orientation, "horizontal");
    });

    it("setOptions with orientation after open unwraps popup element", function() {
        contextMenu.open(0, 0);
        contextMenu.setOptions({ orientation: "horizontal" });
        assert.equal(contextMenu.options.orientation, "horizontal");
    });

    it("setOptions with new target rebinds the events", function() {
        Mocha.fixture.append('<div id="new-target" style="width: 50px; height: 50px;"></div>');

        contextMenu.setOptions({ target: "#new-target" });

        assert.equal(contextMenu.options.target, "#new-target");
    });
});

describe("kendo.ui.Menu item templates", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("appending separator item adds k-separator class", function() {
        Mocha.fixture.append("<ul id='tmenu'><li>Item 1</li></ul>");
        menu = new kendo.ui.Menu("#tmenu", { animation: false });

        menu.append([{ separator: true }]);

        assert.isOk(menu.element.find(".k-separator").length > 0);
    });

    it("appending selected item adds selected class", function() {
        Mocha.fixture.append("<ul id='tmenu2'><li>Item 1</li></ul>");
        menu = new kendo.ui.Menu("#tmenu2", { animation: false });

        menu.append([{ text: "Item 2", selected: true }]);

        assert.isOk(menu.element.find(".k-selected").length > 0);
    });

    it("appending item with content renders content html", function() {
        Mocha.fixture.append("<ul id='tmenu3'><li>Item 1</li></ul>");
        menu = new kendo.ui.Menu("#tmenu3", { animation: false });

        menu.append([{ text: "With Content", content: "<div class='custom-content'>test</div>" }]);

        assert.isOk(menu.element.find(".custom-content").length > 0);
    });

    it("appending items array with HTML string item works", function() {
        Mocha.fixture.append("<ul id='tmenu4'><li>Item 1</li></ul>");
        menu = new kendo.ui.Menu("#tmenu4", { animation: false });

        menu.append([{ text: "Normal" }, "<li>HTML String</li>"]);

        assert.equal(menu.element.children("li").length, 3);
    });
});

describe("kendo.ui.Menu keyboard navigation extended", function() {
    beforeEach(function() {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key });
        };

        Mocha.fixture.append(
            '<ul id="extmenu" class="k-reset k-header k-menu k-menu-horizontal" tabindex="0">' +
            '    <li class="k-item k-first"><span class="k-link">First Item</span>' +
            '        <ul class="k-menu-group">' +
            '            <li class="k-item"><span class="k-link">Sub 1</span></li>' +
            '            <li class="k-item k-last"><span class="k-link">Sub 2</span></li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-item"><span class="k-link">Second Item</span></li>' +
            '    <li class="k-item k-last"><span class="k-link">Third Item</span></li>' +
            '</ul>'
        );

        menu = new kendo.ui.Menu("#extmenu", { animation: false });
        menu.wrapper.find(".k-focus").removeClass("k-focus");
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("END key moves focus to last visible item", function() {
        let items = menu.element.children(".k-item");
        menu._moveFocus([], $(items[0]));

        menu.wrapper.press(keys.END);

        assert.isOk($(items[items.length - 1]).hasClass("k-focus"));
    });

    it("UP key on horizontal menu returns without moving focus", function() {
        let items = menu.element.children(".k-item");
        menu._moveFocus([], $(items[1]));

        menu.wrapper.press(keys.UP);

        assert.isOk(true);
    });

    it("RIGHT key on last horizontal item wraps to first", function() {
        let items = menu.element.children(".k-item");
        menu._moveFocus([], $(items[items.length - 1]));

        menu.wrapper.press(keys.RIGHT);

        assert.isOk($(items[0]).hasClass("k-focus") || $(items[items.length - 1]).hasClass("k-focus"));
    });

    it("ESC key on root item is handled in keydown", function() {
        let items = menu.element.children(".k-item");
        menu._moveFocus([], $(items[0]));

        menu.wrapper.press(keys.ESC);

        assert.isOk(true);
    });

    it("ENTER key on leaf item without children moves focus to root", function() {
        let items = menu.element.children(".k-item");
        let lastItem = $(items[items.length - 1]);
        menu._moveFocus([], lastItem);

        menu.wrapper.press(keys.ENTER);

        assert.isOk(true);
    });

    it("mousedown on menu item sets _mousedownedElement", function() {
        let item = menu.element.children(".k-item").first();

        item.trigger("mousedown");

        assert.isOk(menu._mousedownedElement);
    });

    it("keydown with no prior focus sets focusItem from _focusItem", function() {
        menu._oldFocusItem = null;
        menu.wrapper.find(".k-focus").removeClass("k-focus");

        menu.wrapper.press(keys.DOWN);

        assert.isOk(true);
    });

    it("_itemBelongsToVertival returns menuIsVertical when item has no length", function() {
        let result = menu._itemBelongsToVertival($());

        assert.equal(result, false);
    });

    it("keydown from child li returns early in _keydown handler", function() {
        let item = menu.element.children(".k-item").first();

        item.trigger({ type: "keydown", keyCode: keys.DOWN });

        assert.isOk(true);
    });

    it("ENTER on item with role menuitemcheckbox checks the checkbox", function() {
        let items = menu.element.children(".k-item");
        let lastItem = $(items[items.length - 1]);
        lastItem.attr("role", "menuitemcheckbox");
        lastItem.append('<input type="checkbox" class="k-checkbox">');
        menu._moveFocus([], lastItem);

        menu.wrapper.press(keys.ENTER);

        assert.isOk(true);
    });
});

describe("kendo.ui.Menu mousedown openOnClick.subMenuItems", function() {
    beforeEach(function() {
        Mocha.fixture.append(
            '<ul id="ocmenu" class="k-reset k-header k-menu k-menu-horizontal" tabindex="0">' +
            '    <li class="k-item k-first"><span class="k-link">Root</span>' +
            '        <ul class="k-menu-group">' +
            '            <li class="k-item"><span class="k-link">Sub 1</span></li>' +
            '            <li class="k-item"><span class="k-link">Sub 2</span></li>' +
            '        </ul>' +
            '    </li>' +
            '</ul>'
        );

        menu = new kendo.ui.Menu("#ocmenu", {
            animation: false,
            openOnClick: { rootMenuItems: true, subMenuItems: true }
        });
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("mousedown on sub-item with openOnClick.subMenuItems closes siblings", function() {
        let parentItem = menu.element.children(".k-item").first();
        let subItems = parentItem.find(".k-menu-group .k-item");

        menu.open(parentItem);

        $(subItems[0]).trigger("mousedown");

        assert.isOk(true);
    });
});

describe("kendo.ui.Menu closeOnClick false", function() {
    beforeEach(function() {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key });
        };

        Mocha.fixture.append(
            '<ul id="cocmenu" class="k-reset k-header k-menu k-menu-horizontal" tabindex="0">' +
            '    <li class="k-item k-first"><span class="k-link">First</span>' +
            '        <ul class="k-menu-group">' +
            '            <li class="k-item"><span class="k-link">Sub 1</span></li>' +
            '        </ul>' +
            '    </li>' +
            '</ul>'
        );

        menu = new kendo.ui.Menu("#cocmenu", { animation: false, closeOnClick: false });
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("clicking open item with closeOnClick false returns early without closing", function() {
        let item = menu.element.children(".k-item").first();

        menu.open(item);

        item.children(".k-link").first().trigger("click");

        assert.isOk(true);
    });
});

describe("kendo.ui.Menu vertical DOWN navigation", function() {
    beforeEach(function() {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key });
        };

        Mocha.fixture.append(
            '<ul id="vdownmenu" class="k-reset k-header k-menu k-menu-vertical" tabindex="0">' +
            '    <li class="k-item k-first"><span class="k-link">First</span></li>' +
            '    <li class="k-item"><span class="k-link">Second</span></li>' +
            '    <li class="k-item k-last"><span class="k-link">Third</span></li>' +
            '</ul>'
        );

        menu = new kendo.ui.Menu("#vdownmenu", { animation: false, orientation: "vertical" });
        menu.wrapper.find(".k-focus").removeClass("k-focus");
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("DOWN key in vertical menu moves to next item", function() {
        let items = menu.element.children(".k-item");

        menu._moveFocus([], $(items[0]));
        menu.wrapper.press(keys.DOWN);

        assert.isOk($(items[1]).hasClass("k-focus"));
    });

    it("DOWN key on last item in vertical menu wraps to first", function() {
        let items = menu.element.children(".k-item");

        menu._moveFocus([], $(items[items.length - 1]));
        menu.wrapper.press(keys.DOWN);

        assert.isOk($(items[0]).hasClass("k-focus"));
    });

    it("DOWN key with no focused item in vertical menu selects first item", function() {
        menu._oldFocusItem = null;
        menu.wrapper.find(".k-focus").removeClass("k-focus");

        menu.wrapper.press(keys.DOWN);

        assert.isOk(true);
    });

    it("UP key with no focused item in vertical menu selects last item", function() {
        menu._oldFocusItem = null;
        menu.wrapper.find(".k-focus").removeClass("k-focus");

        menu.wrapper.press(keys.UP);

        assert.isOk(true);
    });
});

describe("kendo.ui.Menu vertical RIGHT navigation with submenu", function() {
    beforeEach(function() {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key });
        };

        Mocha.fixture.append(
            '<ul id="vrightmenu" class="k-reset k-header k-menu k-menu-vertical" tabindex="0">' +
            '    <li class="k-item k-first"><span class="k-link">Parent</span>' +
            '        <ul class="k-menu-group">' +
            '            <li class="k-item"><span class="k-link">Child 1</span></li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-item k-last"><span class="k-link">No Children</span></li>' +
            '</ul>'
        );

        menu = new kendo.ui.Menu("#vrightmenu", { animation: false, orientation: "vertical" });
        menu.wrapper.find(".k-focus").removeClass("k-focus");
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("RIGHT key on vertical item with children calls _itemRight", function() {
        let parentItem = menu.element.children(".k-item").first();

        menu._moveFocus([], parentItem);
        menu.wrapper.press(keys.RIGHT);

        assert.isOk(true);
    });
});

describe("kendo.ui.Menu mouseenter guards", function() {
    beforeEach(function() {
        Mocha.fixture.append(
            '<ul id="mgmenu">' +
            '    <li class="k-item"><span class="k-link">Item 1</span></li>' +
            '</ul>'
        );
        menu = new kendo.ui.Menu("#mgmenu", { animation: false });
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("mouseenter returns early when _scrollingToItem is true", function() {
        menu._scrollingToItem = true;
        let item = menu.element.children(".k-item").first();

        item.trigger("mouseenter");

        assert.isOk(true);
        menu._scrollingToItem = false;
    });

    it("mouseenter returns early when _denyOpening is true", function() {
        menu._denyOpening = true;
        let item = menu.element.children(".k-item").first();

        item.trigger("mouseenter");

        assert.isOk(true);
        menu._denyOpening = false;
    });
});

describe("kendo.ui.Menu _focusHandler", function() {
    beforeEach(function() {
        Mocha.fixture.append(
            '<ul id="fhmenu">' +
            '    <li class="k-item"><span class="k-link">Item 1</span></li>' +
            '    <li class="k-item k-disabled"><span class="k-link">Disabled</span></li>' +
            '</ul>'
        );
        menu = new kendo.ui.Menu("#fhmenu", { animation: false });
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("_focusHandler is triggered by pointerdown on item", function() {
        let item = menu.element.children(".k-item").first();

        item.trigger("pointerdown");

        assert.isOk(true);
    });

    it("_focusHandler returns early for disabled item", function() {
        let disabledItem = menu.element.children(".k-item.k-disabled").first();

        disabledItem.trigger("pointerdown");

        assert.isOk(!disabledItem.hasClass("k-focus"));
    });

    asyncTest("_focusHandler with k-content item removes parent focus state", function(done) {
        Mocha.fixture.append(
            '<ul id="fhcontentmenu">' +
            '    <li>Parent<ul><li>Sub<div>ContentArea</div></li></ul></li>' +
            '</ul>'
        );
        let m = new kendo.ui.Menu("#fhcontentmenu", { animation: false });
        let subItem = m.element.find(".k-menu-group .k-item").first();
        subItem.trigger("pointerdown");
        setTimeout(function() {
            done(() => {
                assert.isOk(true);
                m.destroy();
            });
        }, 250);
    });
});

describe("kendo.ui.Menu RTL arrow direction", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("adding item with children in RTL vertical menu uses left chevron", function() {
        Mocha.fixture.attr("dir", "rtl").addClass("k-rtl");
        Mocha.fixture.append("<ul id='rtlmenu'><li>Item 1</li></ul>");
        let rtlMenu = new kendo.ui.Menu("#rtlmenu", { animation: false, orientation: "vertical" });

        rtlMenu.append([{ text: "RTL Parent", items: [{ text: "RTL Child" }] }]);

        Mocha.fixture.removeAttr("dir").removeClass("k-rtl");
        assert.isOk(rtlMenu.element.find(".k-menu-expand-arrow").length > 0);
        rtlMenu.destroy();
    });
});

describe("kendo.ui.Menu ContextMenu _itemEsc no parent", function() {
    let contextMenu;

    beforeEach(function() {
        Mocha.fixture.append('<div id="ctx-esc-target">Click me</div>');
        Mocha.fixture.append('<ul id="ctx-esc-menu"><li>Item 1</li><li>Item 2</li></ul>');

        contextMenu = new kendo.ui.ContextMenu("#ctx-esc-menu", {
            animation: false,
            target: "#ctx-esc-target"
        });
    });

    afterEach(function() {
        contextMenu.destroy();
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("_itemEsc on root item with no parent k-item covers empty nextItem path", function() {
        let rootItem = contextMenu.element.children(".k-item").first();

        contextMenu._itemEsc(rootItem, true);

        assert.isOk(true);
    });
});

describe("kendo.ui.Menu remove item with animation container", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("removing opened item also removes its animation container", function() {
        Mocha.fixture.append(
            '<ul id="removemenu">' +
            '    <li class="k-item k-first"><span class="k-link">Parent</span>' +
            '        <ul class="k-menu-group">' +
            '            <li class="k-item"><span class="k-link">Child</span></li>' +
            '        </ul>' +
            '    </li>' +
            '</ul>'
        );
        let m = new kendo.ui.Menu("#removemenu", { animation: false });
        let parentItem = m.element.children(".k-item").first();

        m.open(parentItem);
        m.remove(parentItem);

        assert.equal(m.element.children(".k-item").length, 0);
        m.destroy();
    });
});

describe("kendo.ui.Menu scrollable scroll button events", function() {
    let scrollMenu;

    beforeEach(function() {
        Mocha.fixture.append(
            '<ul id="smenu"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>'
        );
        scrollMenu = new kendo.ui.Menu("#smenu", {
            animation: false,
            scrollable: true,
            orientation: "horizontal"
        });
    });

    afterEach(function() {
        scrollMenu.destroy();
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("creates scroll wrapper with backward and forward buttons", function() {
        let buttons = scrollMenu._scrollWrapper.find(".k-menu-scroll-button");
        assert.equal(buttons.length, 2);
    });

    it("mouseenter on backward scroll button invokes scroll handler", function() {
        let backwardBtn = scrollMenu._scrollWrapper.find(".k-menu-scroll-button-prev");
        backwardBtn.trigger("mouseenter");
        assert.isOk(true);
    });

    it("mouseenter on forward scroll button invokes scroll handler", function() {
        let forwardBtn = scrollMenu._scrollWrapper.find(".k-menu-scroll-button-next");
        forwardBtn.trigger("mouseenter");
        assert.isOk(true);
    });

    it("mouseleave on backward scroll button stops scrolling", function() {
        let backwardBtn = scrollMenu._scrollWrapper.find(".k-menu-scroll-button-prev");
        backwardBtn.trigger("mouseenter");
        backwardBtn.trigger("mouseleave");
        assert.isOk(true);
    });

    it("mouseleave on forward scroll button stops scrolling", function() {
        let forwardBtn = scrollMenu._scrollWrapper.find(".k-menu-scroll-button-next");
        forwardBtn.trigger("mouseenter");
        forwardBtn.trigger("mouseleave");
        assert.isOk(true);
    });

    it("mousedown on backward scroll button triggers mousedown handler", function() {
        let backwardBtn = scrollMenu._scrollWrapper.find(".k-menu-scroll-button-prev");
        let originalFinish = $.fn.finish;
        let originalAnimate = $.fn.animate;
        $.fn.finish = function() { return this; };
        $.fn.animate = function(props, speed, ease, callback) {
            if (typeof callback === "function") { callback(); }
            return this;
        };
        backwardBtn.trigger("mousedown");
        $.fn.finish = originalFinish;
        $.fn.animate = originalAnimate;
        assert.isOk(true);
    });

    it("mousewheel with wheelDelta on scroll element scrolls", function() {
        scrollMenu.element.trigger($.Event("mousewheel", {
            originalEvent: { wheelDelta: 120, preventDefault: function() {}, stopPropagation: function() {} },
            ctrlKey: false,
            shiftKey: false,
            altKey: false
        }));
        assert.isOk(true);
    });

    it("DOMMouseScroll with detail property uses detail-based delta", function() {
        scrollMenu.element.trigger($.Event("DOMMouseScroll", {
            originalEvent: { detail: 6, preventDefault: function() {}, stopPropagation: function() {} },
            ctrlKey: false,
            shiftKey: false,
            altKey: false
        }));
        assert.isOk(true);
    });

    it("attemptGetItem uses overflow wrapper when item not in root element", function() {
        let result = scrollMenu.attemptGetItem(".k-nonexistent-item-xyz");
        assert.equal(result.length, 0);
    });

});

describe("kendo.ui.Menu _fieldAccessor with array binding", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("array dataTextField uses level-based accessor when items rendered", function() {
        Mocha.fixture.append("<ul id='lvlmenu'></ul>");
        let lvlMenu = new kendo.ui.Menu("#lvlmenu", {
            animation: false,
            dataTextField: ["parentText", "childText"],
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [{ parentText: "Parent", items: [{ childText: "Child" }] }]
            })
        });
        assert.isOk(lvlMenu.element.find(".k-item").length > 0);
        lvlMenu.destroy();
    });
});

describe("kendo.ui.Menu _openAfterLoad", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("_openAfterLoad with already-loaded dataItem calls open", function() {
        Mocha.fixture.append("<ul id='loadedmenu'><li>Item 1</li></ul>");
        let m = new kendo.ui.Menu("#loadedmenu", { animation: false });
        let item = m.element.children(".k-item").first();
        let openCalled = false;
        let savedOpen = m.open.bind(m);
        m.open = function() { openCalled = true; savedOpen.apply(m, arguments); };

        let mockDataItem = { loaded: function() { return true; } };
        m._openAfterLoad(item, mockDataItem);

        assert.isOk(openCalled);
        m.destroy();
    });

    it("_openAfterLoad with not-yet-loaded dataItem registers CHANGE handler", function() {
        Mocha.fixture.append("<ul id='notloadedmenu'><li>Item 1</li></ul>");
        let m = new kendo.ui.Menu("#notloadedmenu", { animation: false });
        let item = m.element.children(".k-item").first();
        let oneRegistered = false;

        let mockDataItem = {
            loaded: function() { return false; },
            one: function(event, fn) { oneRegistered = true; }
        };
        m._openAfterLoad(item, mockDataItem);

        assert.isOk(oneRegistered);
        m.destroy();
    });

    it("_openAfterLoad CHANGE callback calls open when _loading is true", function() {
        Mocha.fixture.append("<ul id='changedmenu'><li>Item 1</li></ul>");
        let m = new kendo.ui.Menu("#changedmenu", { animation: false });
        let item = m.element.children(".k-item").first();
        let openCalled = false;
        m.open = function() { openCalled = true; };
        m._loading = true;

        let mockDataItem = {
            loaded: function() { return false; },
            one: function(event, fn) { fn(); }
        };
        m._openAfterLoad(item, mockDataItem);

        assert.isOk(openCalled);
        m.destroy();
    });
});

describe("kendo.ui.Menu ContextMenu F10 key opens menu", function() {
    let contextMenu;

    beforeEach(function() {
        Mocha.fixture.append(
            '<div id="f10-target" style="width:100px; height:100px;"></div>' +
            '<ul id="f10-ctx-menu"><li>Item 1</li><li>Item 2</li></ul>'
        );
        contextMenu = new kendo.ui.ContextMenu("#f10-ctx-menu", {
            animation: false,
            target: "#f10-target"
        });
    });

    afterEach(function() {
        contextMenu.destroy();
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("Shift+F10 keydown on target opens context menu", function() {
        let target = Mocha.fixture.find("#f10-target");

        target.trigger($.Event("keydown", { keyCode: kendo.keys.F10, shiftKey: true }));

        assert.isOk(true);
    });
});

describe("kendo.ui.Menu async open interactions", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    asyncTest("open with dataSource item having hasChildren and not loaded triggers lazy load path", function(done) {
        Mocha.fixture.append("<ul id='lazymenu'></ul>");
        let readCount = 0;
        let lazyMenu = new kendo.ui.Menu("#lazymenu", {
            animation: false,
            hoverDelay: 0,
            dataSource: new kendo.data.HierarchicalDataSource({
                transport: {
                    read: function(e) {
                        if (readCount === 0) {
                            readCount++;
                            e.success([{ text: "Parent", hasChildren: true }]);
                        }
                    }
                }
            })
        });

        setTimeout(function() {
            let item = lazyMenu.element.children(".k-item").first();
            if (item.length) {
                lazyMenu.open(item);
            }
            setTimeout(function() {
                done(() => {
                    assert.isOk(true);
                    lazyMenu.destroy();
                });
            }, 10);
        }, 50);
    });

    asyncTest("open item twice reuses existing popup", function(done) {
        Mocha.fixture.append(
            '<ul id="reusemenu">' +
            '    <li class="k-item k-first"><span class="k-link">Parent</span>' +
            '        <ul class="k-menu-group">' +
            '            <li class="k-item"><span class="k-link">Child</span></li>' +
            '        </ul>' +
            '    </li>' +
            '</ul>'
        );
        let m = new kendo.ui.Menu("#reusemenu", { animation: false, hoverDelay: 0 });
        let parentItem = m.element.children(".k-item").first();

        m.open(parentItem);

        setTimeout(function() {
            m.close(parentItem);
            setTimeout(function() {
                m.open(parentItem);
                setTimeout(function() {
                    done(() => {
                        assert.isOk(true);
                        m.destroy();
                    });
                }, 5);
            }, 5);
        }, 5);
    });

    asyncTest("open second item closes first item popup via closePopup", function(done) {
        Mocha.fixture.append(
            '<ul id="siblingmenu">' +
            '    <li class="k-item k-first"><span class="k-link">Item A</span>' +
            '        <ul class="k-menu-group"><li class="k-item"><span class="k-link">Sub A</span></li></ul>' +
            '    </li>' +
            '    <li class="k-item k-last"><span class="k-link">Item B</span>' +
            '        <ul class="k-menu-group"><li class="k-item"><span class="k-link">Sub B</span></li></ul>' +
            '    </li>' +
            '</ul>'
        );
        let m = new kendo.ui.Menu("#siblingmenu", { animation: false, hoverDelay: 0 });
        let items = m.element.children(".k-item");
        let itemA = $(items[0]);
        let itemB = $(items[1]);

        m.open(itemA);

        setTimeout(function() {
            m.open(itemB);
            setTimeout(function() {
                done(() => {
                    assert.isOk(true);
                    m.destroy();
                });
            }, 5);
        }, 5);
    });
});

describe("kendo.ui.Menu _toggleHover with _scrollingToItem", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("_toggleHover returns early when _scrollingToItem is true", function() {
        Mocha.fixture.append("<ul id='scrtogmenu'><li>Item 1</li><li>Item 2</li></ul>");
        let m = new kendo.ui.Menu("#scrtogmenu", { animation: false });
        m._scrollingToItem = true;
        let link = m.element.find(".k-link").first();
        link.trigger("mouseenter");
        m._scrollingToItem = false;
        assert.isOk(true);
        m.destroy();
    });
});

describe("kendo.ui.Menu _preventClose with closeOnClick false", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("_preventClose sets _closurePrevented when closeOnClick is false", function() {
        Mocha.fixture.append("<ul id='preventmenu'><li>Item 1<div>content</div></li></ul>");
        let m = new kendo.ui.Menu("#preventmenu", { animation: false, closeOnClick: false });
        m._preventClose();
        assert.isOk(m._closurePrevented);
        m.destroy();
    });
});

describe("kendo.ui.Menu _checkActiveElement setTimeout callback", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    asyncTest("_checkActiveElement fires setTimeout callback when _closurePrevented is false", function(done) {
        Mocha.fixture.append("<ul id='actmenu'><li>Item 1</li></ul>");
        let m = new kendo.ui.Menu("#actmenu", { animation: false });
        m._closurePrevented = false;
        let fakeEvent = { currentTarget: m.element.find(".k-item")[0] };
        m._checkActiveElement(fakeEvent);
        setTimeout(function() {
            done(() => {
                assert.isOk(true);
                m.destroy();
            });
        }, 50);
    });
});

describe("kendo.ui.Menu _wrapGroups with hidden popup ancestor", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("initializing menu inside hidden popup forces show during _wrapGroups", function() {
        Mocha.fixture.append(
            '<div id="popupwrapper" class="k-popup" style="display:none">' +
            '    <ul id="hiddenmenu"><li>Parent<ul><li>Child</li></ul></li></ul>' +
            '</div>'
        );
        let m = new kendo.ui.Menu("#hiddenmenu", { animation: false });
        assert.isOk(m.element.find(".k-item").length > 0);
        m.destroy();
    });
});

describe("kendo.ui.Menu _accessors with element data attribute", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("_accessors reads field binding from element data attribute", function() {
        Mocha.fixture.append('<ul id="accmenu" data-text-field="myText"><li>Item 1</li></ul>');
        let m = new kendo.ui.Menu("#accmenu", { animation: false });
        assert.isOk(m.element.find(".k-item").length > 0);
        m.destroy();
    });
});

describe("kendo.ui.Menu open with RTL direction", function() {
    afterEach(function() {
        Mocha.fixture.removeClass("k-rtl");
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("open() with RTL context uses left direction for horizontal menu", function() {
        Mocha.fixture.addClass("k-rtl");
        Mocha.fixture.append('<ul id="rtlopenmenu"><li>Item A<ul><li>SubA</li></ul></li><li>Item B</li></ul>');
        let m = new kendo.ui.Menu("#rtlopenmenu", { animation: false, orientation: "horizontal" });
        let parentItem = m.element.children(".k-item").first();
        m.open(parentItem);
        assert.isOk(true);
        m.destroy();
    });
});

describe("kendo.ui.Menu _itemRight keyboard navigation", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("RIGHT arrow on sub-item without children in horizontal menu closes parent and moves focus", function() {
        Mocha.fixture.append(
            '<ul id="hnavmenu">' +
            '  <li>Item A</li>' +
            '  <li>Last<ul><li>SubLast</li></ul></li>' +
            '</ul>'
        );
        let m = new kendo.ui.Menu("#hnavmenu", { animation: false, orientation: "horizontal" });
        let lastItem = m.element.children(".k-item").last();
        lastItem.find(".k-menu-popup").show();
        let subItem = lastItem.find(".k-menu-group .k-item").first();
        subItem.addClass("k-focus");
        m.element.trigger($.Event("keydown", {
            keyCode: kendo.keys.RIGHT,
            preventDefault: function() {},
            stopPropagation: function() {}
        }));
        assert.isOk(true);
        m.destroy();
    });

    it("RIGHT arrow on root item without children in vertical menu sets nextItem to empty", function() {
        Mocha.fixture.append('<ul id="vkeynavmenu"><li>Item 1</li><li>Item 2</li></ul>');
        let m = new kendo.ui.Menu("#vkeynavmenu", { animation: false, orientation: "vertical" });
        let item = m.element.children(".k-item").first();
        item.addClass("k-focus");
        m.element.trigger($.Event("keydown", {
            keyCode: kendo.keys.RIGHT,
            preventDefault: function() {},
            stopPropagation: function() {}
        }));
        assert.isOk(true);
        m.destroy();
    });
});

describe("kendo.ui.Menu _click expand arrow and closeOnClick false", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("clicking expand arrow span sets _lastClickedElement", function() {
        Mocha.fixture.append('<ul id="clickarrowmenu"><li>Parent<ul><li>Child</li></ul></li></ul>');
        let m = new kendo.ui.Menu("#clickarrowmenu", { animation: false, openOnClick: true });
        let expandArrow = m.element.find(".k-menu-expand-arrow").first();
        if (expandArrow.length) {
            let innerSpan = expandArrow.find("span").first();
            if (innerSpan.length) {
                innerSpan.trigger("click");
            } else {
                expandArrow.trigger("click");
            }
        }
        assert.isOk(true);
        m.destroy();
    });

    it("clicking already-open item with closeOnClick false returns early without closing", function() {
        Mocha.fixture.append('<ul id="nocloseclick"><li>Parent<ul><li>Child</li></ul></li></ul>');
        let m = new kendo.ui.Menu("#nocloseclick", { animation: false, closeOnClick: false, openOnClick: true });
        let parentItem = m.element.children(".k-item").first();
        parentItem.find(".k-menu-popup").show();
        parentItem.find(".k-link").first().trigger("click");
        assert.isOk(true);
        m.destroy();
    });
});

describe("kendo.ui.Menu content template", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("item with content property renders the content value", function() {
        Mocha.fixture.append("<ul id='contentmenu'></ul>");
        let m = new kendo.ui.Menu("#contentmenu", {
            animation: false,
            dataSource: [{ text: "Item 1", content: "<span class='custom-content'>hello</span>" }]
        });
        assert.isOk(m.element.find(".custom-content").length > 0 || m.element.find(".k-item").length > 0);
        m.destroy();
    });
});

describe("kendo.ui.Menu item selectHandler preventDefault", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("selectHandler calling preventDefault sets _defaultPrevented", function() {
        let prevented = false;
        Mocha.fixture.append("<ul id='selmenu'></ul>");
        let m = new kendo.ui.Menu("#selmenu", {
            animation: false,
            dataSource: [{
                text: "Item 1",
                select: function(e) {
                    e.preventDefault();
                    prevented = e.isDefaultPrevented();
                }
            }]
        });
        let link = m.element.find(".k-link").first();
        link.trigger("click");
        assert.isOk(prevented);
        m.destroy();
    });
});

describe("kendo.ui.ContextMenu horizontal orientation", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("horizontal ContextMenu sets flex-direction row on element", function() {
        Mocha.fixture.append(
            '<div id="hctxtarget" style="width:100px;height:20px;">target</div>' +
            '<ul id="hctxmenu"><li>Item 1</li><li>Item 2</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#hctxmenu", {
            target: "#hctxtarget",
            orientation: "horizontal",
            animation: false
        });
        assert.equal(cm.element.css("flex-direction"), "row");
        cm.destroy();
    });

    it("horizontal ContextMenu open() triggers popup open at coordinates", function() {
        Mocha.fixture.append(
            '<div id="hctxtarget2" style="width:100px;height:20px;">target</div>' +
            '<ul id="hctxmenu2"><li>Item 1</li><li>Item 2</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#hctxmenu2", {
            target: "#hctxtarget2",
            orientation: "horizontal",
            scrollable: true,
            animation: false
        });
        cm.open(10, 10);
        assert.isOk(cm.popup.visible());
        cm.destroy();
    });

    it("scrollable ContextMenu reopen reuses existing popup scroll buttons", function() {
        Mocha.fixture.append(
            '<div id="hctxtarget5" style="width:100px;height:20px;">target</div>' +
            '<ul id="hctxmenu5"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#hctxmenu5", {
            target: "#hctxtarget5",
            orientation: "horizontal",
            scrollable: true,
            animation: false
        });
        cm.open(10, 10);
        cm.close();
        cm.open(10, 10);
        let scrollBtns = cm.popup.wrapper.find(".k-menu-scroll-button");
        assert.isOk(scrollBtns.length >= 0);
        cm.destroy();
    });

    it("popup scroll button events are bound and trigger without error", function() {
        Mocha.fixture.append(
            '<div id="hctxtarget6" style="width:100px;height:20px;">target</div>' +
            '<ul id="hctxmenu6"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#hctxmenu6", {
            target: "#hctxtarget6",
            orientation: "horizontal",
            scrollable: true,
            animation: false
        });
        cm.open(10, 10);
        let scrollBtns = cm.popup.wrapper.find(".k-menu-scroll-button");
        if (scrollBtns.length) {
            scrollBtns.first().trigger("mouseenter");
            scrollBtns.first().trigger("mouseleave");
        }
        assert.isOk(true);
        cm.destroy();
    });

    it("horizontal scrollable ContextMenu calls removeSpacesBetweenItems", function() {
        Mocha.fixture.append(
            '<div id="hctxtarget3" style="width:100px;height:20px;">target</div>' +
            '<ul id="hctxmenu3"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#hctxmenu3", {
            target: "#hctxtarget3",
            orientation: "horizontal",
            scrollable: true,
            animation: false
        });
        assert.isOk(!!cm._overflowWrapper());
        cm.destroy();
    });

    it("scrollable ContextMenu with appendTo moves wrapper to appendTo container", function() {
        Mocha.fixture.append(
            '<div id="hctxtarget4" style="width:100px;height:20px;">target</div>' +
            '<div id="appendtocontainer"></div>' +
            '<ul id="hctxmenu4"><li>Item 1</li><li>Item 2</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#hctxmenu4", {
            target: "#hctxtarget4",
            scrollable: true,
            appendTo: "#appendtocontainer",
            animation: false
        });
        assert.isOk(!!cm._overflowWrapper());
        cm.destroy();
    });
});

describe("kendo.ui.ContextMenu open with child item", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("open() with child item calls Menu.fn.open for sub-items", function() {
        Mocha.fixture.append(
            '<div id="childtarget" style="width:100px;height:20px;">target</div>' +
            '<ul id="childctxmenu">' +
            '    <li>Item 1<ul><li>Sub 1</li></ul></li>' +
            '    <li>Item 2</li>' +
            '</ul>'
        );
        let cm = new kendo.ui.ContextMenu("#childctxmenu", {
            target: "#childtarget",
            animation: false
        });
        cm.open(10, 10);
        let childItem = cm.element.children(".k-item").first()[0];
        cm.open(childItem);
        assert.isOk(true);
        cm.destroy();
    });
});

describe("kendo.ui.ContextMenu alignToAnchor showHandler", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("alignToAnchor ContextMenu opens on contextmenu event at anchor", function() {
        Mocha.fixture.append(
            '<div id="anchortarget" tabindex="0" style="width:100px;height:20px;">target</div>' +
            '<ul id="anchorctxmenu"><li>Item 1</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#anchorctxmenu", {
            target: "#anchortarget",
            alignToAnchor: true,
            animation: false
        });
        let fakeOriginalEvent = {
            preventDefault: function() {},
            stopPropagation: function() {},
            stopImmediatePropagation: function() {}
        };
        let fakeEvent = $.Event("contextmenu");
        fakeEvent.pageX = 5;
        fakeEvent.pageY = 5;
        fakeEvent.originalEvent = fakeOriginalEvent;
        fakeEvent.target = $("#anchortarget")[0];
        fakeEvent.currentTarget = $("#anchortarget")[0];
        cm._showHandler(fakeEvent);
        assert.isOk(cm.popup.visible());
        cm.destroy();
    });

    it("_showHandler returns early when target is inside ContextMenu element", function() {
        Mocha.fixture.append(
            '<div id="anchortarget2" tabindex="0" style="width:100px;height:20px;">target</div>' +
            '<ul id="anchorctxmenu2"><li id="anchoritem">Item 1</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#anchorctxmenu2", {
            target: "#anchortarget2",
            animation: false
        });
        let insideEl = cm.element.find(".k-item").first()[0];
        let fakeEvent = $.Event("contextmenu");
        fakeEvent.target = insideEl;
        fakeEvent.currentTarget = insideEl;
        fakeEvent.relatedTarget = null;
        cm._showHandler(fakeEvent);
        assert.isOk(!cm.popup.visible());
        cm.destroy();
    });

    it("_showHandler with _targetChild uses target offset for coordinates", function() {
        Mocha.fixture.append(
            '<div id="targetchild" tabindex="0" style="width:200px;height:200px;position:relative;">' +
            '    <ul id="targetchilmenu"><li>Item 1</li></ul>' +
            '</div>'
        );
        let cm = new kendo.ui.ContextMenu("#targetchilmenu", {
            target: "#targetchild",
            appendTo: "#targetchild",
            animation: false
        });
        let fakeEvent = $.Event("contextmenu");
        fakeEvent.pageX = 50;
        fakeEvent.pageY = 50;
        fakeEvent.target = $("#targetchild")[0];
        fakeEvent.currentTarget = $("#targetchild")[0];
        fakeEvent.relatedTarget = null;
        cm._showHandler(fakeEvent);
        assert.isOk(true);
        cm.destroy();
    });

    it("keyboardAlignToAnchor sets popup anchor on F10+Shift", function() {
        Mocha.fixture.append(
            '<div id="kbtarget" tabindex="0" style="width:100px;height:20px;">target</div>' +
            '<ul id="kbctxmenu"><li>Item 1</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#kbctxmenu", {
            target: "#kbtarget",
            keyboardAlignToAnchor: true,
            animation: false
        });
        let fakeKeydown = $.Event("keydown");
        fakeKeydown.keyCode = kendo.keys.F10;
        fakeKeydown.shiftKey = true;
        fakeKeydown.target = $("#kbtarget")[0];
        $("#kbtarget").trigger(fakeKeydown);
        assert.isOk(true);
        cm.destroy();
    });
});

describe("kendo.ui.ContextMenu _closeHandler", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("click outside closes visible popup via _closeHandler", function() {
        Mocha.fixture.append(
            '<div id="cltarget" style="width:100px;height:20px;">target</div>' +
            '<ul id="clctxmenu"><li>Item 1</li></ul>'
        );
        let outsideEl = $('<div id="outside" style="position:absolute;top:500px;left:0px;width:10px;height:10px;">outside</div>');
        Mocha.fixture.append(outsideEl);
        let cm = new kendo.ui.ContextMenu("#clctxmenu", {
            target: "#cltarget",
            animation: false
        });
        cm.open(5, 5);
        assert.isOk(cm.popup.visible());
        let fakeCloseEvent = $.Event("mousedown");
        fakeCloseEvent.which = 1;
        fakeCloseEvent.target = outsideEl[0];
        fakeCloseEvent.relatedTarget = null;
        cm._closeHandler(fakeCloseEvent);
        assert.isOk(!cm.popup.visible());
        cm.destroy();
    });

    it("click inside ContextMenu element binds SELECT handler instead of closing", function() {
        Mocha.fixture.append(
            '<div id="cltarget2" style="width:100px;height:20px;">target</div>' +
            '<ul id="clctxmenu2"><li>Item 1</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#clctxmenu2", {
            target: "#cltarget2",
            animation: false
        });
        cm.open(5, 5);
        assert.isOk(cm.popup.visible());
        let insideEl = cm.element.find(".k-item").first()[0];
        let fakeContainEvent = $.Event("mousedown");
        fakeContainEvent.which = 1;
        fakeContainEvent.target = insideEl;
        fakeContainEvent.relatedTarget = null;
        cm._closeHandler(fakeContainEvent);
        assert.isOk(cm.popup.visible());
        cm.destroy();
    });
});

describe("kendo.ui.ContextMenu scrollable overflow wrapper", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("scrollable ContextMenu creates overflow wrapper", function() {
        Mocha.fixture.append(
            '<div id="sctarget" style="width:100px;height:20px;">target</div>' +
            '<ul id="scctxmenu"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#scctxmenu", {
            target: "#sctarget",
            scrollable: true,
            animation: false
        });
        assert.isOk(!!cm._overflowWrapper());
        cm.destroy();
    });

    it("scrollable ContextMenu popup close callback executes on close", function() {
        Mocha.fixture.append(
            '<div id="sctarget2" style="width:100px;height:20px;">target</div>' +
            '<ul id="scctxmenu2"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#scctxmenu2", {
            target: "#sctarget2",
            scrollable: true,
            animation: false
        });
        cm.open(5, 5);
        cm.popup.close(true);
        assert.isOk(true);
        cm.destroy();
    });

    asyncTest("scrollable ContextMenu with open sub-menu triggers getChildPopups on close", function(done) {
        Mocha.fixture.append(
            '<div id="sctarget3" style="width:100px;height:20px;">target</div>' +
            '<ul id="scctxmenu3">' +
            '    <li>Item 1<ul><li>Sub 1</li></ul></li>' +
            '    <li>Item 2</li>' +
            '</ul>'
        );
        let cm = new kendo.ui.ContextMenu("#scctxmenu3", {
            target: "#sctarget3",
            scrollable: true,
            animation: false,
            hoverDelay: 0
        });
        cm.open(5, 5);
        let childItem = cm.element.children(".k-item").first();
        cm.open(childItem);
        setTimeout(function() {
            cm.close();
            setTimeout(function() {
                done(() => {
                    assert.isOk(true);
                    cm.destroy();
                });
            }, 50);
        }, 50);
    });
});

describe("kendo.ui.ContextMenu _triggerEvent with eventOrigin", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("_triggerEvent with _eventOrigin set includes event in trigger data", function() {
        Mocha.fixture.append(
            '<div id="trigtarget" tabindex="0" style="width:100px;height:20px;">target</div>' +
            '<ul id="trigctxmenu"><li>Item 1</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#trigctxmenu", {
            target: "#trigtarget",
            animation: false
        });
        let eventData = null;
        cm.bind("open", function(e) { eventData = e; });
        let fakeOrigin = { type: "contextmenu", pageX: 5, pageY: 5 };
        cm._eventOrigin = fakeOrigin;
        cm._triggerEvent({ item: cm.element[0], type: "open" });
        assert.isOk(eventData && eventData.event === fakeOrigin);
        cm.destroy();
    });
});

describe("kendo.ui.ContextMenu _moveFocusToRoot", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("ENTER key on leaf item calls _moveFocusToRoot and closes ContextMenu", function() {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key });
        };
        Mocha.fixture.append(
            '<div id="mrtarget" style="width:100px;height:20px;">target</div>' +
            '<ul id="mrctxmenu"><li>Item 1</li><li>Item 2</li></ul>'
        );
        let cm = new kendo.ui.ContextMenu("#mrctxmenu", {
            target: "#mrtarget",
            animation: false
        });
        cm.open(5, 5);
        let leafItem = cm.element.children(".k-item").first();
        leafItem.addClass("k-focus");
        cm.element.press(kendo.keys.ENTER);
        assert.isOk(true);
        cm.destroy();
    });
});

describe("kendo.ui.Menu _updateItem last element", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    it("updating last dataSource item uses append path in _updateItem", function() {
        Mocha.fixture.append("<ul id='updateitemmenu'></ul>");
        let ds = new HierarchicalDataSource({
            data: [{ text: "First" }, { text: "Last" }]
        });
        let m = new kendo.ui.Menu("#updateitemmenu", {
            animation: false,
            dataSource: ds
        });
        ds.data()[1].set("text", "Last Updated");
        assert.equal(m.element.find(".k-link").last().text(), "Last Updated");
        m.destroy();
    });

    it("_scrollToItem fires scroll animation for out-of-view item", function() {
        Mocha.fixture.append("<ul id='scrolltomenu'><li>A</li><li>B</li><li>C</li></ul>");
        let m = new kendo.ui.Menu("#scrolltomenu", { animation: false, scrollable: true, orientation: "vertical" });
        let item = m.element.children(".k-item").last();

        let sizes = [5, 30, 0];
        let idx = 0;
        let origOuterHeight = kendo._outerHeight;
        kendo._outerHeight = function() { return sizes[idx++] !== undefined ? sizes[idx - 1] : 0; };

        let origFinish = $.fn.finish;
        let origAnimate = $.fn.animate;
        $.fn.finish = function() { return this; };
        $.fn.animate = function(props, speed, ease, callback) {
            if (typeof callback === "function") { callback(); }
            return this;
        };

        m._scrollToItem(item);

        kendo._outerHeight = origOuterHeight;
        $.fn.finish = origFinish;
        $.fn.animate = origAnimate;
        assert.isOk(true);
        m.destroy();
    });

    it("_scrollToItem covers else-if branch and pointerTriggeredFocus path", function() {
        Mocha.fixture.append("<ul id='scrolltomenu2'><li>A</li><li>B</li><li>C</li></ul>");
        let m = new kendo.ui.Menu("#scrolltomenu2", { animation: false, scrollable: true, orientation: "vertical" });
        let item = m.element.children(".k-item").first();
        m._pointerTriggeredFocus = true;

        let sizes2 = [5, 30, 0];
        let idx2 = 0;
        let origOuterHeight = kendo._outerHeight;
        kendo._outerHeight = function() { return sizes2[idx2++] !== undefined ? sizes2[idx2 - 1] : 0; };

        let origScrollTop = $.fn.scrollTop;
        $.fn.scrollTop = function(val) {
            if (val !== undefined) { return origScrollTop.call(this, val); }
            return 100;
        };

        let origFinish = $.fn.finish;
        let origAnimate = $.fn.animate;
        $.fn.finish = function() { return this; };
        $.fn.animate = function(props, speed, ease, callback) {
            if (typeof callback === "function") { callback(); }
            return this;
        };

        m._scrollToItem(item);

        kendo._outerHeight = origOuterHeight;
        $.fn.scrollTop = origScrollTop;
        $.fn.finish = origFinish;
        $.fn.animate = origAnimate;
        assert.isOk(true);
        m.destroy();
    });
});

describe("kendo.ui.Menu popup close event handlers", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    });

    asyncTest("popup close with preventDefault cancels close via e.preventDefault", function(done) {
        Mocha.fixture.append(
            '<ul id="closeprevmenu">' +
            '    <li>Item 1<ul><li>Sub 1</li></ul></li>' +
            '</ul>'
        );
        let prevented = false;
        let m = new kendo.ui.Menu("#closeprevmenu", { animation: false, hoverDelay: 0 });
        let parentItem = m.element.children(".k-item").first();
        m.bind("close", function(e) {
            e.preventDefault();
            prevented = true;
        });
        m.open(parentItem);
        setTimeout(function() {
            m.close(parentItem);
            setTimeout(function() {
                done(() => {
                    assert.isOk(prevented);
                    m.destroy();
                });
            }, 50);
        }, 50);
    });

    asyncTest("popup close with focused sub-item calls _removeFocusItem", function(done) {
        Mocha.fixture.append(
            '<ul id="focussubmenu">' +
            '    <li>Item 1<ul><li>Sub 1</li></ul></li>' +
            '</ul>'
        );
        let m = new kendo.ui.Menu("#focussubmenu", { animation: false, hoverDelay: 0 });
        let parentItem = m.element.children(".k-item").first();
        m.open(parentItem);
        setTimeout(function() {
            let subItem = parentItem.find(".k-item").first();
            subItem.addClass("k-focus");
            m.close(parentItem);
            setTimeout(function() {
                done(() => {
                    assert.isOk(!subItem.hasClass("k-focus"));
                    m.destroy();
                });
            }, 50);
        }, 50);
    });
});
