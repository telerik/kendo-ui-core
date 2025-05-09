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

describe("menu icons", function() {

    let menuElement;
    let menu;

    beforeEach(function() {
        Mocha.fixture.append('<ul id="menu"></ul>');
        menuElement = $("#menu");
        menu = menuElement.kendoMenu({
            iconPosition: "after",
            dataSource: [
                { text: "Item 1", icon: "gear", iconClass: "custom-gear-icon-class" },
                { text: "Item 2", icon: "pencil" },
                { text: "Item 3", iconClass: "fa-solid fa-house" }
            ]
        }).data("kendoMenu");
    });

    afterEach(function() {
        menu.destroy();
        menuElement.remove();
    });

    it("applies icon classes if specified", function() {
        assert.equal(menuElement.find('.k-icon.custom-gear-icon-class').length, 1);
    });

    it("applies only icon class", function() {
        assert.equal(menuElement.find('.fa-solid.fa-house').length, 1);
    });

    it("places icons after text if iconPosition is 'after'", function() {
        assert.equal(menuElement.find(".k-menu-link > .k-menu-link-text + .k-svg-i-gear").length, 1);
    });
});

describe("menu scrollable", function() {
    let menuElement;
    let menu;

    function initMenu(options) {
        menu = menuElement.kendoMenu(options).data("kendoMenu");
    }

    beforeEach(function() {
        Mocha.fixture.append(`<ul id="menu" style="width: 50px"> <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li></ul>`);
        menuElement = $("#menu");
    });

    afterEach(function() {
        menu.destroy();
        menuElement.remove();
    });

    it("places scroll buttons at the start when scrollButtonsPosition is 'start'", function() {
        initMenu({ scrollable: { scrollButtonsPosition: "start" } });
        assert.isOk(menu.element.prev().prev().is(".k-menu-scroll-button-prev"));
        assert.isOk(menu.element.prev().is(".k-menu-scroll-button-next"));
    });

    it("places scroll buttons at the end when scrollButtonsPosition is 'end'", function() {
        initMenu({ scrollable: { scrollButtonsPosition: "end" } });
        assert.isOk(menu.element.next().is(".k-menu-scroll-button-prev"));
        assert.isOk(menu.element.next().next().is(".k-menu-scroll-button-next"));
    });

    it("places scroll buttons at the end when scrollButtonsPosition is 'split'", function() {
        initMenu({ scrollable: { scrollButtonsPosition: "split" } });
        assert.isOk(menu.element.prev().is(".k-menu-scroll-button-prev"));
        assert.isOk(menu.element.next().is(".k-menu-scroll-button-next"));
    });
});
