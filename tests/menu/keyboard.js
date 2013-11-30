(function() {
    var menu,
        openedItem,
        FOCUSEDSTATE = "k-state-focused",
        FOCUSEDCLASS = "." + FOCUSEDSTATE;

         function getMenu() {
             return $("#Menu1").data("kendoMenu");
         }

         var keys = kendo.keys;

        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        };


    module("Menu / Keyboard navigation", {
        setup: function () {
            QUnit.fixture.html(__html__['tests/menu/keyboard-fixture.html']);
            $("#Menu1").kendoMenu({ animation: false });
            menu = getMenu();
            menu._oldHoverItem = null;
            menu.wrapper.find(FOCUSEDCLASS).removeClass(FOCUSEDSTATE);

        },
        teardown: function() {
            openedItem = null;
            menu.close(menu.wrapper.find(".k-item"));
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
