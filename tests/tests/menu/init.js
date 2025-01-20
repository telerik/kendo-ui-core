import '@progress/kendo-ui/src/kendo.menu.js';

let menu;

describe("menu init", function() {
    beforeEach(function() {
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

    it('.k-header is placed on root element', function() {
        assert.isOk(menu.element.is(".k-header"));
    });

    it('groups has class k-menu-group', function() {
        assert.isOk(menu.element.find("ul").is(".k-menu-group"));
    });

    it('div inside menu is assigned .k-content class', function() {
        assert.isOk(menu.element.find("div").is(".k-content"));
    });

    it('UL elements inside content don\'t get k-menu-group class', function() {
        assert.isOk(!menu.element.find("div.k-content ul").is(".k-menu-group"));
    });

    it('menu is inside scroll wrapper', function() {
        menu.setOptions({ scrollable: true, orientation: "horizontal" });
        assert.isOk(menu.element.parent().is("div.k-menu-scroll-wrapper"));
    });


    it('menu does not strip "k-i-chevron-right" icons', function() {
        let m = new kendo.ui.Menu("<ul><li><span class='k-icon k-i-chevron-right'></span>Next</li><li>Refresh</li></ul>");

        assert.isOk(m.element.find(".k-i-chevron-right")[0]);
        m.destroy();
    });

    it('menu renders aria-haspopup on items with submenu', function() {
        let dom = '<ul id="menu">' +
            '   <li>' +
            '       Item 1' +
            '       <ul>' +
            '           <li>Sub Item 1</li>' +
            '       </ul>' +
            '   </li>' +
            '   <li>' +
            '       Item 2' +
            '       <ul>' +
            '           <li>Sub Item 1' +
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


        let m = new kendo.ui.Menu(dom);

        assert.equal(m.element.find("[aria-haspopup]").length, 4);
        m.destroy();
    });

    it('menu does not wrap content of items with omit-wrap', function() {
        let dom = '<ul id="menu">' +
            '   <li ' + kendo.attr("omit-wrap") + '="true">' +
            '       Item 1' +
            '       <ul>' +
            '           <li>Sub Item 1</li>' +
            '       </ul>' +
            '   </li>' +
            '   <li>' +
            '       Item 2' +
            '       <ul>' +
            '           <li>Sub Item 1' +
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


        let m = new kendo.ui.Menu(dom);

        assert.isNotOk(m.element.find("[" + kendo.attr("omit-wrap") + "]").hasClass('k-menu-item'));
        assert.isNotOk(m.element.find("[" + kendo.attr("omit-wrap") + "] > span").length);

        m.destroy();
    });

});
