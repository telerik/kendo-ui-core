(function() {

function getRootItem(index) {
   return $('#menu').find('> .k-item > .k-link').eq(index)
}

var menu;

module("menu api", {
    setup: function () {
        QUnit.fixture.append(
            '<ul id="menu">' +
            '   <li>' +
            '       Item 1' +
            '       <ul>' +
            '           <li>Sub Item 1</li>' +
            '           <li>Sub Item 2</li>' +
            '           <li>Sub Item 3</li>' +
            '       </ul>' +
            '   </li>' +
            '   <li>' +
            '       Item 2' +
            '       <ul>' +
            '           <li>Sub Item 1</li>' +
            '           <li>Sub Item 2</li>' +
            '           <li>Sub Item 3</li>' +
            '       </ul>' +
            '   </li>' +
            '   <li>' +
            '       Item 3' +
            '       <ul>' +
            '           <li>Sub Item 1</li>' +
            '           <li>Sub Item 2</li>' +
            '           <li>Sub Item 3</li>' +
            '       </ul>' +
            '   </li>' +
            '</ul>'
        );
        menu = new kendo.ui.ContextMenu("#menu", { animation: false });
    },
    teardown: function() {
        kendo.destroy(menu.element);
    }
});

test('.k-context-menu is placed on root element', function() {
    ok(menu.element.is(".k-context-menu"));
});

test('Popup widget is initialized on the root element', function() {
    ok(menu.popup == menu.element.data("kendoPopup"))
});

/* API */

test('calling open raises open event', function() {
    menu.bind("open", function () {
        ok(true);
    });

    menu.open();
});

test('calling close raises close event if popup is visible', function() {
    menu.bind("close", function () {
        ok(true);
    });

    menu.open();
    menu.close();
});

test('calling open shows the popup', function() {
    menu.open();

    ok(menu.popup.visible());
});

test('calling open with position shows the popup at that position', function() {
    menu.open(100, 100);

    var offset = menu.popup.element.offset();
    ok(offset.left == 100);
    ok(offset.top == 100);
});

test('preventing open should not open the popup', function() {
    menu.bind("open", function (e) {
        e.preventDefault();
    });

    menu.open();

    ok(!menu.popup.visible());
});

test('preventing close should not close the popup', function() {
    menu.bind("close", function (e) {
        e.preventDefault();
    });

    menu.open();
    menu.close();

    ok(menu.popup.visible());
});

})();

