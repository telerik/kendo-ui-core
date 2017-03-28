(function() {

function getRootItem(index) {
   return $('#menu').find('> .k-item > .k-link').eq(index)
}

var menu;

module("menu init", {
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
            '           <li>' +
            '               <div>' +
            '                   <ul>' +
            '                       <li>Item 1</li>' +
            '                       <li>Item 2</li>' +
            '                   </ul>' +
            '               </div>' +
            '           </li>' +
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

test('.k-menu is placed on root element', function() {
    ok(menu.element.is(".k-menu"));
});

test('groups are both k-group and k-menu-group', function() {
    ok(menu.element.find("ul").is(".k-menu-group.k-group"));
});

test('div inside menu is assigned .k-content class', function() {
    ok(menu.element.find("div").is(".k-content"));
});

test('UL elements inside content don\'t get k-menu-group class', function() {
    ok(!menu.element.find("div ul").is(".k-group"));
    ok(!menu.element.find("div ul").is(".k-menu-group"));
});

test('menu is inside scroll wrapper', function() {
    menu.setOptions({ scrollable: true, orientation: "horizontal" });
    ok(menu.element.parent().is("div.k-popups-wrapper.horizontal"));
});

})();

