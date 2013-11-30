(function() {
    var isRaised;

     function getRootItem(index) {
         return $('#Menu3').find('> .k-item > .k-link')[index];
     }

     function getMenu() {
         return $("#Menu3").data("kendoMenu");
     }

    var open;
    var close;
    var menu;

    module("Menu / OpenOnClick", {
        setup: function() {
            QUnit.fixture.html(__html__['tests/menu/open-on-click-fixture.html']);
            $("#Menu3").kendoMenu({ animation: false, openOnClick: true, hoverDelay: 0 });
            menu = getMenu();
            open = menu.open;
            close = menu.close;
        },
        teardown: function() {
            $("#Menu3").data('kendoMenu').destroy();({ animation: false, openOnClick: true, hoverDelay: 0 });
            menu.clicked = false;
            menu.open = open;
            menu.close = close;
        }
    });

    test('open on click is serialized', function() {
        ok(menu.options.openOnClick);
    });

    test('click method should call preventDefault method', function() {
        var item = getRootItem(3);
        var isCalled = false;

        var e = { target: item, preventDefault: function () { isCalled = true; }, stopPropagation: function () {} };

        menu._click(e);

        ok(isCalled);
    });

    test('click method on item with URL shouldn\'t call preventDefault method', function() {
        var item = getRootItem(7);
        var isCalled = false;

        var e = { target: item, preventDefault: function () { isCalled = true; }, stopPropagation: function () {} };

        menu._click(e);

        ok(!isCalled);
    });

    test('hovering root item does not open it', function() {
        var opend = false;

        menu.open = function() { opend = true };
        menu._mouseenter({}, $("li:first", menu.element)[0]);

        ok(!opend);
    });

    test('clicking root item should open it', function() {
        var opend = false;
        menu.open = function() { opend = true };
        var element = $("li:first", menu.element)[0];
        menu._click({ target: element, preventDefault: function () { }, stopPropagation: function () { } }, element);
        ok(opend);
        ok(menu.clicked);
    });

    test('leaving opened item does not close it', function() {
        var opend = false;
        menu.clicked = true;
        menu.open = function() { opend = true };

        menu._mouseleave({}, $("li:first", menu.element)[0]);

        ok(!opend);
    });

    test('leaving opened and hovering a sibling closes it and opens the sibling', function() {
        var opend = false;
        menu.clicked = true;
        menu.open = function() { opend = true };

        var element = $("li:first", menu.element)[0];
        menu._mouseenter({ currentTarget: element, delegateTarget: menu.element[0], indexOf: function() { }, type:'mouseenter' }, element.nextSibling);

        ok(opend);
    });

    test('clicking the document closes the open item', function() {
        menu.clicked = true;
        menu._documentClick({ target: document.body }, document );
        ok(menu.clicked === false);
    });
})();
