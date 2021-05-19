(function() {
var menu,
    openedItem,
    FOCUSEDSTATE = "k-state-focused",
    FOCUSEDCLASS = "." + FOCUSEDSTATE;

var keys = kendo.keys;

describe("menu keyboard navigation", function () {
    beforeEach(function () {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        };

        Mocha.fixture.append(
            '<ul id="menu" data-role="menu" class="k-widget k-reset k-header k-menu k-menu-horizontal" tabindex="0">' +
            '    <li class="k-item k-state-default k-first"><span class="k-link">' +
            '        First Item' +
            '        <span class="k-icon k-i-arrow-60-down"></span></span><ul class="k-group">' +
            '            <li class="k-item k-state-default k-first"><span class="k-link">Sub Item 1</span></li>' +
            '            <li class="k-item k-state-disabled k-last"><span class="k-link">Sub Item 2 <span class="k-icon k-i-arrow-60-right"></span></span>' +
            '                <ul class="k-group">' +
            '                    <li class="k-item k-state-default k-first"><span class="k-link">Sub sub Item 1</span></li>' +
            '                </ul>' +
            '            </li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-item k-state-default"><a class="k-link" href="http://foo" id="fooLink">' +
            '        Second Item' +
            '        <span class="k-icon k-i-arrow-60-down"></span></a><ul class="k-group">' +
            '            <li class="k-item k-state-default k-first"><span class="k-link">Sub Item 1</span></li>' +
            '            <li class="k-item k-state-default k-last"><span class="k-link">Sub Item 2</span></li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-item k-state-disabled k-last"><span class="k-link">' +
            '        Third Item' +
            '        <span class="k-icon k-i-arrow-60-down"></span></span><ul class="k-group">' +
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

    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        openedItem = null;
});

it('Menu focus makes first root item active', function() {
    menu.wrapper[0].focus();

    assert.isOk(menu.wrapper.children(".k-item").first().hasClass(FOCUSEDSTATE));
});

it("Template focus focuses the parent Menu item", function(done) {
    var template = menu.element.find("#template");
    menu.open("#menuItem4");

    setTimeout(function() {
        template[0].focus();
        assert.isOk(template.parents(".k-item").eq(1).hasClass(FOCUSEDSTATE));
        done();
    }, 100);
});

it('Left and right arrows move focus between first and second item', function() {
    menu.wrapper.focus().press(keys.RIGHT);
    var firstItem = menu.wrapper.children(".k-item").first();

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
    menu.wrapper.focus().press(keys.RIGHT);

    var firstItem = menu.wrapper.children(".k-item").first(),
        secondItem = firstItem.next();

    firstItem.children(".k-link").mouseenter();

    assert.isOk(!secondItem.hasClass(FOCUSEDSTATE));

    menu.wrapper.press(keys.RIGHT);

    assert.isOk(secondItem.hasClass(FOCUSEDSTATE));
});

it('Hitting Enter key navigates an item hyperlink', function() {
    var fired = false;
    menu.wrapper.find("#fooLink").click(function(e){
        e.preventDefault();
        fired = true;
    });
    menu.wrapper.focus().press(keys.RIGHT).press(keys.ENTER);

    assert.isOk(fired);
});
    });
}());
