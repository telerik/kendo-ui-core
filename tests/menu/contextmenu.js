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
        kendo.destroy(QUnit.fixture);
    }
});

test('.k-context-menu is placed on root element', function() {
    ok(menu.element.is(".k-context-menu"));
});

test('Popup widget is initialized on the root element', function() {
    ok(menu.popup == menu.element.data("kendoPopup"))
});

})();

