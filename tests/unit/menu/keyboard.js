import '@progress/kendo-ui/src/kendo.menu.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let menu,
    openedItem,
    FOCUSEDSTATE = "k-focus",
    FOCUSEDCLASS = "." + FOCUSEDSTATE;

let keys = kendo.keys;

describe("menu keyboard navigation", function() {
    beforeEach(function() {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key });
        };

        Mocha.fixture.append(
            '<ul id="menu" data-role="menu" class="k-reset k-header k-menu k-menu-horizontal" tabindex="0">' +
            '    <li class="k-item k-first"><span class="k-link">' +
            '        First Item' +
            '        <span class="k-icon k-i-chevron-down"></span></span><ul class="k-menu-group">' +
            '            <li class="k-item k-first"><span class="k-link">Sub Item 1</span></li>' +
            '            <li class="k-item k-disabled k-last"><span class="k-link">Sub Item 2 <span class="k-icon k-i-chevron-right"></span></span>' +
            '                <ul class="k-menu-group">' +
            '                    <li class="k-item k-first"><span class="k-link">Sub sub Item 1</span></li>' +
            '                </ul>' +
            '            </li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-item"><a class="k-link" href="http://foo" id="fooLink">' +
            '        Second Item' +
            '        <span class="k-icon k-i-chevron-down"></span></a><ul class="k-menu-group">' +
            '            <li class="k-item k-first"><span class="k-link">Sub Item 1</span></li>' +
            '            <li class="k-item k-last"><span class="k-link">Sub Item 2</span></li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-item k-disabled k-last"><span class="k-link">' +
            '        Third Item' +
            '        <span class="k-icon k-i-chevron-down"></span></span><ul class="k-menu-group">' +
            '            <li class="k-item k-first"><span class="k-link">Sub Item 1</span></li>' +
            '            <li class="k-item k-last"><span class="k-link">Sub Item 2</span></li>' +
            '        </ul>' +
            '    </li>' +
            '    <li id="menuItem4">Fourth item' +
            '        <ul>' +
            '            <li>' +
            '                <div id="template">' +
            '                    <h2>Around the Globe</h2>' +
            '                    <ol>' +
            '                        <li>United States</li>' +
            '                        <li>Europe</li>' +
            '                        <li>Canada</li>' +
            '                        <li>Australia</li>' +
            '                    </ol>' +
            '                    <button class="k-button">See full list</button>' +
            '                </div>' +
            '            </li>' +
            '        </ul>' +
            '    </li>' +
            '</ul>');

        menu = new kendo.ui.Menu("#menu", { animation: false });
        menu._oldHoverItem = null;
        menu.wrapper.find(FOCUSEDCLASS).removeClass(FOCUSEDSTATE);

    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        openedItem = null;
    });

    it('Menu focus makes first root item active', function() {
        menu.wrapper.trigger("focus").focus();

        assert.isOk(menu.wrapper.children(".k-item").first().hasClass(FOCUSEDSTATE));
    });

    asyncTest("Template focus focuses the parent Menu item", function(done) {
        let template = menu.element.find("#template");
        menu.open("#menuItem4");

        setTimeout(function() {
            template.trigger("focus");
            done(() => assert.isOk(template.parents(".k-item").eq(1).hasClass(FOCUSEDSTATE)));
        }, 100);
    });

    it('Left and right arrows move focus between first and second item', function() {
        menu.wrapper.focus().press(keys.RIGHT);
        let firstItem = menu.wrapper.children(".k-item").first();

        assert.isOk(firstItem.next().hasClass(FOCUSEDSTATE));

        menu.wrapper.press(keys.LEFT);
        assert.isOk(firstItem.hasClass(FOCUSEDSTATE));
    });

    it('Down arrow opens subitems group', function() {
        menu.open = function(item) { openedItem = item; };
        menu.wrapper.focus().press(keys.DOWN);

        assert.equal(openedItem[0], menu.wrapper.children(".k-item").first()[0]);
    });

    it('Left arrow moves focus from first to last item', function() {
        menu.wrapper.focus().press(keys.LEFT);

        assert.isOk(menu.wrapper.children(".k-item").last().hasClass(FOCUSEDSTATE));
    });


    it('Home moves focus to first item', function() {
        menu.wrapper.focus().press(keys.RIGHT);
        menu.wrapper.focus().press(keys.HOME);

        assert.isOk(menu.wrapper.children(".k-item").first().hasClass(FOCUSEDSTATE));
    });

    it('End moves focus from to last item', function() {
        menu.wrapper.focus().press(keys.LEFT);

        assert.isOk(menu.wrapper.children(".k-item").last().hasClass(FOCUSEDSTATE));
    });

    it('Mouse events reset the keyboard navigation active item', function() {
        let firstItem = menu.wrapper.children(".k-item").first(),
            secondItem = firstItem.next();

        firstItem.children(".k-link").click();

        assert.isOk(!secondItem.hasClass(FOCUSEDSTATE));

        menu.wrapper.focus().press(keys.RIGHT);

        assert.isOk(secondItem.hasClass(FOCUSEDSTATE));
    });

    it('Hitting Enter key navigates an item hyperlink', function() {
        let fired = false;
        menu.wrapper.find("#fooLink").click(function(e) {
            e.preventDefault();
            fired = true;
        });
        menu.wrapper.focus().press(keys.RIGHT).press(keys.ENTER);

        assert.isOk(fired);
    });
});

describe("menu keyboard navigation with groupHeader items", function() {
    let groupMenuElement, groupMenu;

    function initGroupMenu(orientation) {
        groupMenuElement = $("<ul></ul>").appendTo(Mocha.fixture);
        groupMenu = groupMenuElement.kendoMenu({
            animation: false,
            orientation: orientation,
            dataSource: [
                { groupHeader: true, text: "Group 1" },
                { text: "Item 1" },
                { text: "Item 2" },
                { text: "Item 3" }
            ]
        }).data("kendoMenu");
    }

    beforeEach(function() {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key });
        };
    });

    afterEach(function() {
        groupMenu.destroy();
        groupMenuElement.remove();
    });

    it('Home key skips the groupHeader and moves focus to the first real item', function() {
        initGroupMenu("horizontal");
        groupMenu.wrapper.focus().press(keys.HOME);

        let realItems = groupMenu.wrapper.children(".k-item:not(.k-menu-group-header)");
        assert.isOk(realItems.first().hasClass(FOCUSEDSTATE));
    });

    it('End key skips the groupHeader and moves focus to the last real item', function() {
        initGroupMenu("horizontal");
        groupMenu.wrapper.focus().press(keys.END);

        let realItems = groupMenu.wrapper.children(".k-item:not(.k-menu-group-header)");
        assert.isOk(realItems.last().hasClass(FOCUSEDSTATE));
    });

    it('Left arrow traversal from the first real item skips the groupHeader item in horizontal orientation', function() {
        initGroupMenu("horizontal");
        let firstRealItem = groupMenu.wrapper.children(".k-item:not(.k-menu-group-header)").first();
        groupMenu._moveFocus($(), firstRealItem);

        groupMenu.wrapper.focus().press(keys.LEFT);

        assert.isFalse(groupMenu.wrapper.children(".k-menu-group-header").hasClass(FOCUSEDSTATE));
    });

    it('Up arrow traversal from the first real item skips the groupHeader item in vertical orientation', function() {
        initGroupMenu("vertical");
        let firstRealItem = groupMenu.wrapper.children(".k-item:not(.k-menu-group-header)").first();
        groupMenu._moveFocus($(), firstRealItem);

        groupMenu.wrapper.focus().press(keys.UP);

        assert.isFalse(groupMenu.wrapper.children(".k-menu-group-header").hasClass(FOCUSEDSTATE));
    });
});
