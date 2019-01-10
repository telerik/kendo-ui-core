(function() {

function getRootItem(index) {
   return $('#menu').find('> .k-item > .k-link').eq(index)
}

var menu;

describe("menu init", function () {
    beforeEach(function () {
        Mocha.fixture.append(
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
    });
    afterEach(function() {
        kendo.destroy(menu.element);
    });

it('.k-menu is placed on root element', function() {
    assert.isOk(menu.element.is(".k-menu"));
});

it('groups are both k-group and k-menu-group', function() {
    assert.isOk(menu.element.find("ul").is(".k-menu-group.k-group"));
});

it('div inside menu is assigned .k-content class', function() {
    assert.isOk(menu.element.find("div").is(".k-content"));
});

it('UL elements inside content don\'t get k-menu-group class', function() {
    assert.isOk(!menu.element.find("div ul").is(".k-group"));
    assert.isOk(!menu.element.find("div ul").is(".k-menu-group"));
});

it('menu is inside scroll wrapper', function() {
    menu.setOptions({ scrollable: true, orientation: "horizontal" });
    assert.isOk(menu.element.parent().is("div.k-popups-wrapper.horizontal"));
});


it('menu does not strip "k-i-arrow-chevron-right" icons', function() {
    var m = new kendo.ui.Menu("<ul><li><span class='k-icon k-i-arrow-chevron-right'></span>Next</li><li>Refresh</li></ul>");

    assert.isOk(m.element.find(".k-i-arrow-chevron-right")[0]);
    m.destroy();
});

it('menu renders aria-haspopup on items with submenu', function() {
    var dom = '<ul id="menu">' +
    '   <li>' +
    '       Item 1' +
    '       <ul>' +
    '           <li>Sub Item 1</li>' +
    '       </ul>' +
    '   </li>' +
    '   <li>' +
    '       Item 2' +
    '       <ul>' +
    '           <li>Sub Item 1'+
    '               <ul>' +
    '                   <li>Sub Item 1</li>' +
    '               </ul>' +
    '           </li>' +
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
    '</ul>';


    var m = new kendo.ui.Menu(dom);

    assert.equal(m.element.find("[aria-haspopup]").length, 4)
    m.destroy();
});

    });
}());

