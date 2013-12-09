(function() {
var menu,
    openedItem,
    FOCUSEDSTATE = "k-state-focused",
    FOCUSEDCLASS = "." + FOCUSEDSTATE;

var keys = kendo.keys;

module("menu keyboard navigation", {
    setup: function () {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        };

        QUnit.fixture.append(
            '<ul id="menu" data-role="menu" class="k-widget k-reset k-header k-menu k-menu-horizontal" tabindex="0">' +
            '    <li class="k-item k-state-default k-first"><span class="k-link">' +
            '        First Item' +
            '        <span class="k-icon k-i-arrow-s"></span></span><ul class="k-group">' +
            '            <li class="k-item k-state-default k-first"><span class="k-link">Sub Item 1</span></li>' +
            '            <li class="k-item k-state-disabled k-last"><span class="k-link">Sub Item 2 <span class="k-icon k-i-arrow-e"></span></span>' +
            '                <ul class="k-group">' +
            '                    <li class="k-item k-state-default k-first"><span class="k-link">Sub sub Item 1</span></li>' +
            '                </ul>' +
            '            </li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-item k-state-default"><a class="k-link" href="http://foo" id="fooLink">' +
            '        Second Item' +
            '        <span class="k-icon k-i-arrow-s"></span></a><ul class="k-group">' +
            '            <li class="k-item k-state-default k-first"><span class="k-link">Sub Item 1</span></li>' +
            '            <li class="k-item k-state-default k-last"><span class="k-link">Sub Item 2</span></li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-item k-state-disabled k-last"><span class="k-link">' +
            '        Third Item' +
            '        <span class="k-icon k-i-arrow-s"></span></span><ul class="k-group">' +
            '            <li class="k-item k-state-default k-first"><span class="k-link">Sub Item 1</span></li>' +
            '            <li class="k-item k-state-default k-last"><span class="k-link">Sub Item 2</span></li>' +
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

        menu = new kendo.ui.Menu("#menu", { animation: false})
        menu._oldHoverItem = null;
        menu.wrapper.find(FOCUSEDCLASS).removeClass(FOCUSEDSTATE);

    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
        openedItem = null;
    }
});

test('Menu focus makes first root item active', function() {
    menu.wrapper[0].focus();

    ok(menu.wrapper.children(".k-item").first().hasClass(FOCUSEDSTATE));
});

asyncTest("Template focus focuses the parent Menu item", function () {
    var template = menu.element.find("#template");
    menu.open("#menuItem4");

    setTimeout(function() {
        start();
        template[0].focus();
        ok(template.parents(".k-item").eq(1).hasClass(FOCUSEDSTATE));
    }, 100);
});

test('Left and right arrows move focus between first and second item', function() {
    menu.wrapper.focus().press(keys.RIGHT);
    var firstItem = menu.wrapper.children(".k-item").first();

    ok(firstItem.next().hasClass(FOCUSEDSTATE));

    menu.wrapper.press(keys.LEFT);
    ok(firstItem.hasClass(FOCUSEDSTATE));
});

test('Down arrow opens subitems group', function() {
    menu.open = function(item) { openedItem = item; };
    menu.wrapper.focus().press(keys.DOWN);

    equal(openedItem[0], menu.wrapper.children(".k-item").first()[0]);
});

test('Left arrow moves focus from first to last item', function() {
    menu.wrapper.focus().press(keys.LEFT);

    ok(menu.wrapper.children(".k-item").last().hasClass(FOCUSEDSTATE));
});

test('Mouse events reset the keyboard navigation active item', function() {
    menu.wrapper.focus().press(keys.RIGHT);

    var firstItem = menu.wrapper.children(".k-item").first(),
        secondItem = firstItem.next();

    firstItem.children(".k-link").mouseenter();

    ok(!secondItem.hasClass(FOCUSEDSTATE));

    menu.wrapper.press(keys.RIGHT);

    ok(secondItem.hasClass(FOCUSEDSTATE));
});

test('Disabled root item does not open subgroup', function() {
    menu.wrapper.focus().press(keys.RIGHT).press(keys.RIGHT).press(keys.DOWN);

    var thirdItem = menu.wrapper.children(".k-item").eq(2);

    ok(thirdItem.hasClass(FOCUSEDSTATE));
});

test('Disabled subitem does not open sub-subgroup', function() {
    menu.wrapper.focus().press(keys.DOWN).press(keys.DOWN).press(keys.RIGHT);

    var secondSubItem = menu.wrapper.children(".k-item").first().find(".k-item").eq(1);

    ok(secondSubItem.hasClass(FOCUSEDSTATE));
});

test('Hitting Enter key navigates an item hyperlink', function() {
    var fired = false;
    menu.wrapper.find("#fooLink").click(function(e){
        e.preventDefault();
        fired = true;
    });
    menu.wrapper.focus().press(keys.RIGHT).press(keys.ENTER);

    ok(fired);
});
})();
