(function() {
    var menu;

    function createMenu(options) {
        removeHTML();

        Mocha.fixture.append("<ul id='menu'></ul>");

        menu = new kendo.ui.Menu("#menu", options);
    }

    function removeHTML() {
        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty();
    }

    describe("Client side rendering", function () {
        afterEach(function () {
            removeHTML();
        });

    it('Custom attribute is rendered in item', function(){
        createMenu({
            dataSource: [{
              text: "Item 1",
              cssClass: "myClass",
              attr: {
                "data-myCustomAttribute": "myCustomAttribute",
              }
            }]
        });

        assert.equal(menu.element.find("li:first").attr("data-myCustomAttribute"), "myCustomAttribute");
    });

    it('Class added via attr is added to other classes', function(){
        createMenu({
            dataSource: [{
              text: "Item 1",
              cssClass: "myClass",
              attr: {
                "class": "myCustomClass",
              }
            }]
        });

        menu.element.find("li:first").empty();

        var listItemContents = menu.element.html();
        var classAttributesCount = (listItemContents.match(/class/g) || []).length;

        assert.equal(classAttributesCount, 1);
    });

    it('Multiple attributes are rendered in item', function(){
        createMenu({
            dataSource: [{
              text: "Item 1",
              cssClass: "myClass",
              attr: {
                "data-myCustomAttribute": "myCustomAttribute",
                "id": "myId"
              }
            }]
        });

        var firstItem = menu.element.find("li:first");

        assert.equal(firstItem.attr("data-myCustomAttribute"), "myCustomAttribute");
        assert.equal(firstItem.attr("id"), "myId");
    });

    it('Attributes are rendered in sub item', function(){
        createMenu({
            dataSource: [{
              text: "Item 1",
              items: [{
                    text: "Item 2",
                    attr: {
                        "class": "myClass"
                    }
                }]
            }]
        });

        menu.dataSource.view()[0].load();

        var subItem = menu.element.find(".myClass");

        assert.equal(subItem.length, 1);
    });

    it('Image attributes are rendered in a item', function(){
        createMenu({
            dataSource: [{
              text: "Item 1",
              items: [{
                    text: "Item 2",
                    imageUrl: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/swimming.png",
                    imageAttr: {
                       test: "myAttribute",
                       class: "customClass"
                    }
                }]
            }]
        });

        menu.dataSource.view()[0].load();

        var img = menu.element.find("img");

        assert.equal(img.attr("test"), "myAttribute");
        assert.isOk(img.hasClass("customClass"));
    });

    it('Content attributes are rendered in a item', function(){
        createMenu({
            dataSource: [{
              text: "Item 1",
              items: [{
                    text: "Item 2",
                    content: "Item content",
                    contentAttr: {
                       test: "myAttribute",
                       class: "customClass"
                    }
                }]
            }]
        });

        menu.dataSource.view()[0].load();

        var content = menu.element.find(".customClass");

        assert.equal(content.length, 1);
        assert.equal(content.attr("test"), "myAttribute");
    });

    it('Default classes are rendered in a item', function(){
        createMenu({
            dataSource: [{
              text: "Item 1",
              items: [{
                    text: "Item 2",
                    content: "Item content",
                    contentAttr: {
                       class: "customClass"
                    }
                }]
            }]
        });

        menu.dataSource.view()[0].load();

        var content = menu.element.find(".customClass");

        assert.isOk(content.hasClass("k-content"));
        assert.isOk(content.hasClass("k-group"));
        assert.isOk(content.hasClass("k-menu-group"));
    });

    it('Expand arrow classes are rendered in subitems', function(){
        createMenu({
            dataSource: [
                {
                    text: "RootItem",
                    items: [
                        {
                            text: "Sub-item 1.1",
                            items: [
                                { text: "Sub-item 1.2" }
                            ]
                        }
                    ]
                }
            ]
        });

        menu.dataSource.view()[0].load();

        var expandArrow = menu.element.find(".k-menu-group .k-icon");

        assert.isOk(expandArrow.hasClass("k-menu-expand-arrow"));
    });


    it('HierarchicalDataSource creates menu item', function(){
        createMenu({
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                {
                    text: "RootItem"
                }
            ]})
        });

        menu.dataSource.view()[0].load();
        assert.equal(menu.element.find(".k-link").text(), "RootItem");
    });

    it('dataTextField configures the item text', function(){
        createMenu({
            dataTextField: "Name",
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                {
                    Name: "RootItem"
                }
            ]})
        });

        menu.dataSource.view()[0].load();
        assert.equal(menu.element.find(".k-link").text(), "RootItem");
    });

    it('dataUrlField configures the item URL', function(){
        createMenu({
            dataUrlField: "URLTEST",
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                {
                    text: "RootItem",
                    URLTEST: "URLTEST"
                }
            ]})
        });

        menu.dataSource.view()[0].load();
        assert.equal(menu.element.find(".k-link").attr('href'), "URLTEST");
    });

    it('dataSpriteCssClassField configures the item icon class', function(){
        createMenu({
            dataSpriteCssClassField: "spriteClass",
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                {
                    text: "RootItem",
                    spriteClass: "TESTCLASS"
                }
            ]})
        });

        menu.dataSource.view()[0].load();
        assert.isOk(menu.element.find(".k-sprite").is(".TESTCLASS"));
    });

    it('dataImageUrlField configures the item image', function(){
        createMenu({
            dataImageUrlField: "imgUrl",
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                {
                    text: "RootItem",
                    imgUrl: "TESTURL"
                }
            ]})
        });

        menu.dataSource.view()[0].load();
        assert.equal(menu.element.find(".k-image").attr("src"), "TESTURL");
    });

    it('dataImageUrlField configures the item image', function(){
        createMenu({
            dataImageUrlField: "imgUrl",
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                {
                    text: "RootItem",
                    imgUrl: "TESTURL"
                }
            ]})
        });

        menu.dataSource.view()[0].load();
        assert.equal(menu.element.find(".k-image").attr("src"), "TESTURL");
    });

    it('dataContentField configures the item content', function(){
        createMenu({
            dataContentField: "desc",
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                {
                    text: "RootItem",
                    desc: "CONTENT"
                }
            ]})
        });

        menu.dataSource.view()[0].load();
        assert.equal(menu.element.find(".k-content").text(), "CONTENT");
    });
    });
}());