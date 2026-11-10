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

describe("menu markup initialization icon classes", function() {
    let menuElement;
    let menu;

    afterEach(function() {
        menu.destroy();
        menuElement.remove();
    });

    it("adds k-menu-link-icon to a statically authored icon inside a regular item's link", function() {
        Mocha.fixture.append(
            '<ul id="menu">' +
            '   <li><a href="#"><span class="k-icon k-i-gear"></span>Item 1</a></li>' +
            '</ul>'
        );
        menuElement = $("#menu");
        menu = menuElement.kendoMenu().data("kendoMenu");

        assert.isTrue(menuElement.find(".k-icon.k-i-gear").hasClass("k-menu-link-icon"));
    });

    it("adds k-menu-link-icon to a statically authored icon inside a group header", function() {
        Mocha.fixture.append(
            '<ul id="menu">' +
            '   <li class="k-menu-group-header"><span class="k-icon k-i-gear"></span>Group 1</li>' +
            '   <li><a href="#">Item 1</a></li>' +
            '</ul>'
        );
        menuElement = $("#menu");
        menu = menuElement.kendoMenu().data("kendoMenu");

        assert.isTrue(menuElement.find(".k-menu-group-header .k-icon.k-i-gear").hasClass("k-menu-link-icon"));
    });
});

describe("menu description, actions, groupHeader and size", function() {
    let menuElement;
    let menu;

    function initMenu(options) {
        menu = menuElement.kendoMenu(options).data("kendoMenu");
    }

    beforeEach(function() {
        Mocha.fixture.append('<ul id="menu"></ul>');
        menuElement = $("#menu");
    });

    afterEach(function() {
        menu.destroy();
        menuElement.remove();
    });

    it("renders description span with description text when item has description only", function() {
        initMenu({
            dataSource: [
                { text: "Item 1", description: "Item description" }
            ]
        });

        let descriptionSpan = menuElement.find(".k-menu-link-description");
        assert.equal(descriptionSpan.length, 1);
        assert.equal(descriptionSpan.text(), "Item description");
        assert.equal(menuElement.find(".k-menu-link-actions").length, 0);
    });

    it("renders actions span with actions html when item has actions only", function() {
        initMenu({
            dataSource: [
                { text: "Item 1", actions: "<button>Action</button>", encoded: false }
            ]
        });

        let actionsSpan = menuElement.find(".k-menu-link-actions");
        assert.equal(actionsSpan.length, 1);
        assert.equal(actionsSpan.find("button").length, 1);
        assert.equal(menuElement.find(".k-menu-link-description").length, 0);
    });

    it("positions actions span before the expand arrow", function() {
        initMenu({
            dataSource: [
                { text: "Item 1", actions: "<button>Action</button>", encoded: false, items: [{ text: "Sub item" }] }
            ]
        });

        let link = menuElement.find(".k-menu-link").first();
        let actionsIndex = link.children(".k-menu-link-actions").index();
        let arrowIndex = link.children(".k-menu-expand-arrow").index();

        assert.isTrue(actionsIndex < arrowIndex);
    });

    it("renders both description and actions with label, actions, chevron, description order", function() {
        initMenu({
            dataSource: [
                {
                    text: "Item 1",
                    description: "Item description",
                    actions: "<button>Action</button>", encoded: false,
                    items: [{ text: "Sub item" }]
                }
            ]
        });

        let link = menuElement.find(".k-menu-link").first();
        let textIndex = link.children(".k-menu-link-text").index();
        let actionsIndex = link.children(".k-menu-link-actions").index();
        let arrowIndex = link.children(".k-menu-expand-arrow").index();
        let descriptionIndex = link.children(".k-menu-link-description").index();

        assert.isTrue(textIndex < actionsIndex);
        assert.isTrue(actionsIndex < arrowIndex);
        assert.isTrue(arrowIndex < descriptionIndex);
    });

    it("renders description last even without a submenu arrow", function() {
        initMenu({
            dataSource: [
                { text: "Item 1", description: "Item description", actions: "<button>Action</button>", encoded: false }
            ]
        });

        let link = menuElement.find(".k-menu-link").first();
        let actionsIndex = link.children(".k-menu-link-actions").index();
        let descriptionIndex = link.children(".k-menu-link-description").index();

        assert.equal(descriptionIndex, link.children().length - 1);
        assert.isTrue(actionsIndex < descriptionIndex);
    });

    it("renders chevron immediately after the label when item has no description or actions", function() {
        initMenu({
            dataSource: [
                { text: "Item 1", items: [{ text: "Sub item" }] }
            ]
        });

        let link = menuElement.find(".k-menu-link").first();
        let textIndex = link.children(".k-menu-link-text").index();
        let arrowIndex = link.children(".k-menu-expand-arrow").index();

        assert.equal(arrowIndex, textIndex + 1);
    });

    it("does not render empty description span for falsy description", function() {
        initMenu({
            dataSource: [
                { text: "Item 1", description: "" }
            ]
        });

        assert.equal(menuElement.find(".k-menu-link-description").length, 0);
    });

    it("does not render empty actions span for falsy actions", function() {
        initMenu({
            dataSource: [
                { text: "Item 1", actions: "" }
            ]
        });

        assert.equal(menuElement.find(".k-menu-link-actions").length, 0);
    });

    it("renders groupHeader item with role presentation and k-menu-group-header class", function() {
        initMenu({
            dataSource: [
                { groupHeader: true, text: "Group 1" },
                { text: "Item 1" }
            ]
        });

        let groupHeader = menuElement.children("li").first();

        assert.isTrue(groupHeader.hasClass("k-menu-group-header"));
        assert.equal(groupHeader.attr("role"), "presentation");
    });

    it("groupHeader item does not have k-item or k-menu-item classes", function() {
        initMenu({
            dataSource: [
                { groupHeader: true, text: "Group 1" },
                { text: "Item 1" }
            ]
        });

        let groupHeader = menuElement.children("li").first();

        assert.isFalse(groupHeader.hasClass("k-item"));
        assert.isFalse(groupHeader.hasClass("k-menu-item"));
    });

    it("groupHeader item does not get role menuitem, tabindex, aria-haspopup or aria-expanded", function() {
        initMenu({
            dataSource: [
                { groupHeader: true, text: "Group 1" },
                { text: "Item 1" }
            ]
        });

        let groupHeader = menuElement.children("li").first();

        assert.notEqual(groupHeader.attr("role"), "menuitem");
        assert.isUndefined(groupHeader.attr("tabindex"));
        assert.isUndefined(groupHeader.attr("aria-haspopup"));
        assert.isUndefined(groupHeader.attr("aria-expanded"));
    });

    it("groupHeader item reuses text and icon bindings for its own label and icon", function() {
        initMenu({
            dataSource: [
                { groupHeader: true, text: "Group 1", icon: "gear" }
            ]
        });

        let groupHeader = menuElement.children("li").first();

        assert.equal(groupHeader.find(".k-menu-link-text").text(), "Group 1");
        assert.equal(groupHeader.find(".k-svg-i-gear").length, 1);
    });

    it("groupHeader item icon has k-menu-link-icon wrapper class", function() {
        initMenu({
            dataSource: [
                { groupHeader: true, text: "Group 1", icon: "gear" }
            ]
        });

        let groupHeader = menuElement.children("li").first();

        assert.isTrue(groupHeader.find(".k-svg-i-gear").hasClass("k-menu-link-icon"));
    });

    it("regular item icon has k-menu-link-icon wrapper class alongside k-svg-icon", function() {
        initMenu({
            dataSource: [
                { text: "Item 1", icon: "gear" }
            ]
        });

        let icon = menuElement.find(".k-svg-i-gear");

        assert.isTrue(icon.hasClass("k-menu-link-icon"));
        assert.isTrue(icon.hasClass("k-svg-icon"));
    });

    it("groupHeader item preserves custom attr and cssClass", function() {
        initMenu({
            dataSource: [
                { groupHeader: true, text: "Group 1", cssClass: "my-header", attr: { id: "file-heading", "data-section": "file" } }
            ]
        });

        let groupHeader = menuElement.children("li").first();

        assert.isTrue(groupHeader.hasClass("my-header"));
        assert.equal(groupHeader.attr("id"), "file-heading");
        assert.equal(groupHeader.attr("data-section"), "file");
        assert.isTrue(groupHeader.hasClass("k-menu-group-header"));
        assert.equal(groupHeader.attr("role"), "presentation");
    });

    it("plain separator items remain unaffected by the groupHeader feature", function() {
        initMenu({
            dataSource: [
                { text: "Item 1" },
                { separator: true },
                { text: "Item 2" }
            ]
        });

        let separator = menuElement.children("li").eq(1);

        assert.isTrue(separator.hasClass("k-separator"));
        assert.isTrue(separator.hasClass("k-item"));
        assert.isFalse(separator.hasClass("k-menu-group-header"));
    });

    it("applies k-menu-sm class for size small in horizontal orientation", function() {
        initMenu({ orientation: "horizontal", size: "small", dataSource: [{ text: "Item 1" }] });
        assert.isTrue(menu.wrapper.hasClass("k-menu-sm"));
    });

    it("applies k-menu-md class for size medium in horizontal orientation", function() {
        initMenu({ orientation: "horizontal", size: "medium", dataSource: [{ text: "Item 1" }] });
        assert.isTrue(menu.wrapper.hasClass("k-menu-md"));
    });

    it("applies k-menu-lg class for size large in horizontal orientation", function() {
        initMenu({ orientation: "horizontal", size: "large", dataSource: [{ text: "Item 1" }] });
        assert.isTrue(menu.wrapper.hasClass("k-menu-lg"));
    });

    it("applies k-menu-sm class for size small in vertical orientation", function() {
        initMenu({ orientation: "vertical", size: "small", dataSource: [{ text: "Item 1" }] });
        assert.isTrue(menu.wrapper.hasClass("k-menu-sm"));
    });

    it("applies k-menu-md class for size medium in vertical orientation", function() {
        initMenu({ orientation: "vertical", size: "medium", dataSource: [{ text: "Item 1" }] });
        assert.isTrue(menu.wrapper.hasClass("k-menu-md"));
    });

    it("applies k-menu-lg class for size large in vertical orientation", function() {
        initMenu({ orientation: "vertical", size: "large", dataSource: [{ text: "Item 1" }] });
        assert.isTrue(menu.wrapper.hasClass("k-menu-lg"));
    });

    it("does not apply a size class when size is not set", function() {
        initMenu({ dataSource: [{ text: "Item 1" }] });
        assert.isFalse(menu.wrapper.hasClass("k-menu-sm"));
        assert.isFalse(menu.wrapper.hasClass("k-menu-md"));
        assert.isFalse(menu.wrapper.hasClass("k-menu-lg"));
    });

    it("resolves description via dataDescriptionField", function() {
        initMenu({
            dataDescriptionField: "desc",
            dataSource: [
                { text: "Item 1", desc: "Custom description" }
            ]
        });

        assert.equal(menuElement.find(".k-menu-link-description").text(), "Custom description");
    });

    it("html-encodes description by default", function() {
        initMenu({
            dataSource: [
                { text: "Item 1", description: "<b>bold</b>" }
            ]
        });

        let descriptionSpan = menuElement.find(".k-menu-link-description");
        assert.equal(descriptionSpan.find("b").length, 0);
        assert.equal(descriptionSpan.text(), "<b>bold</b>");
    });

    it("does not encode description when item.encoded is false", function() {
        initMenu({
            dataSource: [
                { text: "Item 1", description: "<b>bold</b>", encoded: false }
            ]
        });

        let descriptionSpan = menuElement.find(".k-menu-link-description");
        assert.equal(descriptionSpan.find("b").length, 1);
    });

    it("resolves actions via dataActionsField", function() {
        initMenu({
            dataActionsField: "acts",
            dataSource: [
                { text: "Item 1", acts: "<button>Go</button>", encoded: false }
            ]
        });

        assert.equal(menuElement.find(".k-menu-link-actions button").length, 1);
    });

    it("encodes actions by default", function() {
        initMenu({
            dataActionsField: "acts",
            dataSource: [
                { text: "Item 1", acts: "<button>Go</button>" }
            ]
        });

        assert.equal(menuElement.find(".k-menu-link-actions button").length, 0);
        assert.equal(menuElement.find(".k-menu-link-actions").text(), "<button>Go</button>");
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

    it("does not add unnecessary inline height to the element", function() {
        menuElement.remove();
        Mocha.fixture.append('<ul id="menu"></ul>');
        menuElement = $("#menu");

        let menuItems = [
            { title: "Item 1" },
            { title: "Item 2" },
            { title: "Item 3" }
        ];

        menu = menuElement.kendoMenu({
            dataSource: menuItems.concat(menuItems).concat(menuItems),
            dataTextField: "title",
            scrollable: {
                distance: 40
            }
        }).data("kendoMenu");

        assert.equal(menu.element[0].style.height, "");
    });
});
