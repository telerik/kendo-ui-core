import '@progress/kendo-ui/src/kendo.menu.js';

let menu;

function createMenu(options) {
    removeHTML();

    Mocha.fixture.append("<ul id='menu'></ul>");

    menu = new kendo.ui.Menu("#menu", options);
}

function removeHTML() {
    kendo.destroy(Mocha.fixture);
    Mocha.fixture.empty();
}

describe("Client side rendering", function() {
    afterEach(function() {
        removeHTML();
    });

    it('Custom attribute is rendered in item', function() {
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

    it('Class added via attr is added to other classes', function() {
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

        let listItemContents = menu.element.html();
        let classAttributesCount = (listItemContents.match(/class/g) || []).length;

        assert.equal(classAttributesCount, 1);
    });

    it('Class options do not create item attributes', function() {
        const className = "custom' onmouseover='alert(1)";

        createMenu({
            dataSource: [{
                text: "Item 1",
                cssClass: className
            }, {
                text: "Item 2",
                attr: {
                    class: className
                }
            }]
        });

        const items = menu.element.children("li");

        assert.include(items.eq(0).attr("class"), className);
        assert.isUndefined(items.eq(0).attr("onmouseover"));
        assert.include(items.eq(1).attr("class"), className);
        assert.isUndefined(items.eq(1).attr("onmouseover"));
    });

    it('Attribute options do not create additional attributes', function() {
        const attributeValue = 'custom" onmouseover="alert(1)';

        createMenu({
            dataSource: [{
                text: "Item 1",
                attr: {
                    title: attributeValue
                }
            }, {
                text: "Item 2",
                imageUrl: "https://example.com/image.png",
                imageAttr: {
                    class: attributeValue
                }
            }, {
                text: "Item 3",
                content: "Item content",
                contentAttr: {
                    class: attributeValue
                }
            }]
        });

        const item = menu.element.children("li").eq(0);
        const image = menu.element.find("img");
        const content = menu.element.find(".k-content");

        assert.equal(item.attr("title"), attributeValue);
        assert.isUndefined(item.attr("onmouseover"));
        assert.include(image.attr("class"), attributeValue);
        assert.isUndefined(image.attr("onmouseover"));
        assert.include(content.attr("class"), attributeValue);
        assert.isUndefined(content.attr("onmouseover"));
    });

    it('Event handler attribute names are not rendered', function() {
        createMenu({
            dataSource: [{
                text: "Item 1",
                imageUrl: "https://example.com/image.png",
                content: "Item content",
                attr: {
                    onclick: "window.itemHandlerExecuted = true;"
                },
                imageAttr: {
                    onerror: "window.imageHandlerExecuted = true;"
                },
                contentAttr: {
                    ONMOUSEOVER: "window.contentHandlerExecuted = true;"
                }
            }]
        });

        const item = menu.element.children("li").eq(0);

        assert.isUndefined(item.attr("onclick"));
        assert.isUndefined(menu.element.find("img").attr("onerror"));
        assert.isUndefined(menu.element.find(".k-content").attr("onmouseover"));
    });

    it('Attribute names that cannot be rendered are discarded', function() {
        createMenu({
            dataSource: [{
                text: "Item 1",
                attr: {
                    'title onmouseover=alert(1) data-x': "value",
                    "-data-custom": "value",
                    "data-valid": "value"
                }
            }]
        });

        const item = menu.element.children("li").eq(0);

        assert.isUndefined(item.attr("title"));
        assert.isUndefined(item.attr("onmouseover"));
        assert.isUndefined(item.attr("-data-custom"));
        assert.equal(item.attr("data-valid"), "value");
    });

    it('URL bearing attributes are sanitized', function() {
        createMenu({
            dataSource: [{
                text: "Item 1",
                content: "Item content",
                attr: {
                    href: "javascript:alert(1)"
                },
                contentAttr: {
                    action: "javascript:alert(1)"
                }
            }]
        });

        const item = menu.element.children("li").eq(0);

        assert.equal(item.attr("href"), "#INVALIDLINK");
        assert.equal(menu.element.find(".k-content").attr("action"), "#INVALIDLINK");
    });

    it('Every URL bearing attribute name is sanitized', function() {
        const urlAttributes = ["href", "xlink:href", "action", "formaction", "cite", "data", "ping", "poster", "background", "longdesc", "manifest"];
        const attr = {};

        urlAttributes.forEach(function(name) {
            attr[name] = "javascript:alert(1)";
        });

        createMenu({
            dataSource: [{ text: "Item 1", attr: attr }]
        });

        const item = menu.element.children("li").eq(0);

        urlAttributes.forEach(function(name) {
            assert.equal(item.attr(name), "#INVALIDLINK", name + " was not sanitized");
        });
    });

    it('Relative URL bearing attributes are preserved', function() {
        createMenu({
            dataSource: [{
                text: "Item 1",
                attr: {
                    href: "/products/1",
                    cite: "#anchor"
                }
            }]
        });

        const item = menu.element.children("li").eq(0);

        assert.equal(item.attr("href"), "/products/1");
        assert.equal(item.attr("cite"), "#anchor");
    });

    it('Markup bearing attributes are discarded', function() {
        createMenu({
            dataSource: [{
                text: "Item 1",
                attr: {
                    srcdoc: "<script>alert(1)<\/script>",
                    SRCDOC: "<script>alert(1)<\/script>"
                }
            }]
        });

        const item = menu.element.children("li").eq(0);

        assert.isFalse(item[0].hasAttribute("srcdoc"));
    });

    it('Every event handler casing is discarded', function() {
        createMenu({
            dataSource: [{
                text: "Item 1",
                attr: {
                    onclick: "alert(1)",
                    ONERROR: "alert(1)",
                    OnMouseOver: "alert(1)",
                    "onfocusin": "alert(1)"
                }
            }]
        });

        const item = menu.element.children("li").eq(0);

        ["onclick", "onerror", "onmouseover", "onfocusin"].forEach(function(name) {
            assert.isFalse(item[0].hasAttribute(name), name + " was rendered");
        });
    });

    it('Valid attribute names covering the allowed character set are preserved', function() {
        createMenu({
            dataSource: [{
                text: "Item 1",
                attr: {
                    "data-x1": "a",
                    "data.dotted": "b",
                    "ns:scoped": "c",
                    "data_underscored": "d"
                }
            }]
        });

        const item = menu.element.children("li").eq(0);

        assert.equal(item.attr("data-x1"), "a");
        assert.equal(item.attr("data.dotted"), "b");
        assert.equal(item.attr("ns:scoped"), "c");
        assert.equal(item.attr("data_underscored"), "d");
    });

    ["", "X-"].forEach(function(namespace) {
        it('The generated uid attribute is not overridden by custom attributes with namespace "' + namespace + '"', function() {
            const originalNamespace = kendo.ns;

            try {
                kendo.ns = namespace;
                createMenu({
                    dataSource: [{
                        text: "Item 1",
                        attr: {
                            [kendo.attr("uid")]: "forged"
                        }
                    }]
                });

                const item = menu.element.children("li").eq(0);
                const dataItem = menu.dataSource.at(0);

                assert.equal(item.attr(kendo.attr("uid")), dataItem.uid);
                assert.equal(menu.findByUid(dataItem.uid)[0], item[0]);

                dataItem.set("text", "Updated item");

                assert.equal(menu.element.children("li").length, 1);
                assert.equal(menu.findByUid(dataItem.uid).children(".k-link").text(), "Updated item");

                menu.dataSource.remove(dataItem);

                assert.equal(menu.element.children("li").length, 0);
            } finally {
                try {
                    removeHTML();
                } finally {
                    kendo.ns = originalNamespace;
                }
            }
        });
    });

    it('The generated content tabindex is not overridden by custom attributes', function() {
        createMenu({
            dataSource: [{
                text: "Item 1",
                content: "Item content",
                contentAttr: {
                    tabindex: "5"
                }
            }]
        });

        assert.equal(menu.element.find(".k-content").attr("tabindex"), "-1");
    });

    it('Safe data image URLs are preserved in imageAttr src', function() {
        const dataImage = "data:image/png;base64,iVBORw0KGgo=";

        createMenu({
            dataSource: [{
                text: "Item 1",
                imageUrl: "https://example.com/image.png",
                imageAttr: {
                    src: dataImage
                }
            }, {
                text: "Item 2",
                imageUrl: "https://example.com/image.png",
                imageAttr: {
                    src: "javascript:alert(1)"
                }
            }]
        });

        const images = menu.element.find("img");

        assert.equal(images.eq(0).attr("src"), dataImage);
        assert.equal(images.eq(1).attr("src"), "#INVALIDLINK");
    });

    it('Generated item attributes are not overridden by custom attributes', function() {
        createMenu({
            dataSource: [{
                text: "Item 1",
                attr: {
                    role: "button",
                    "aria-haspopup": "false",
                    "aria-expanded": "true",
                    "aria-label": "Custom label"
                },
                items: [{ text: "Item 1.1" }]
            }]
        });

        const item = menu.element.children("li").eq(0);

        assert.equal(item.attr("role"), "menuitem");
        assert.equal(item.attr("aria-haspopup"), "true");
        assert.equal(item.attr("aria-expanded"), "false");
        assert.equal(item.attr("aria-label"), "Custom label");
    });

    it('Checkbox role is preserved for data-bound items', function() {
        createMenu({
            dataSource: [{
                text: "Item 1",
                attr: {
                    role: "menuitemcheckbox"
                }
            }, {
                text: "Item 2",
                attr: {
                    ROLE: "menuitemcheckbox"
                }
            }]
        });

        const items = menu.element.children("li");

        assert.equal(items.eq(0).attr("role"), "menuitemcheckbox");
        assert.equal(items.eq(1).attr("role"), "menuitemcheckbox");
    });

    it('Image attributes supplied as a plain object are rendered', function() {
        createMenu({});

        menu.append({
            text: "Item 1",
            imageUrl: "https://example.com/image.png",
            imageAttr: { title: "Image title" }
        });

        const image = menu.element.find("img");

        assert.equal(image.attr("title"), "Image title");
        assert.isTrue(image.hasClass("k-image"));
    });

    it('Class attributes are merged regardless of their casing', function() {
        createMenu({
            dataSource: [{
                text: "Item 1",
                imageUrl: "https://example.com/image.png",
                content: "Item content",
                attr: { CLASS: "customItemClass" },
                imageAttr: { CLASS: "customImageClass" },
                contentAttr: { Class: "customContentClass" }
            }]
        });

        const item = menu.element.children("li").eq(0);
        const image = menu.element.find("img");
        const content = menu.element.find(".k-content");

        assert.isTrue(item.hasClass("k-menu-item"));
        assert.isTrue(item.hasClass("customItemClass"));
        assert.isTrue(image.hasClass("k-image"));
        assert.isTrue(image.hasClass("customImageClass"));
        assert.isTrue(content.hasClass("k-menu-group"));
        assert.isTrue(content.hasClass("customContentClass"));
    });

    it('Multiple attributes are rendered in item', function() {
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

        let firstItem = menu.element.find("li:first");

        assert.equal(firstItem.attr("data-myCustomAttribute"), "myCustomAttribute");
        assert.equal(firstItem.attr("id"), "myId");
    });

    it('Attributes are rendered in sub item', function() {
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

        let subItem = menu.element.find(".myClass");

        assert.equal(subItem.length, 1);
    });

    it('Image attributes are rendered in a item', function() {
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

        let img = menu.element.find("img");

        assert.equal(img.attr("test"), "myAttribute");
        assert.isOk(img.hasClass("customClass"));
    });


    it("ImageUrl prevents malicious injection", function() {
        const IMAGE_URL = "https://example.com/a' on" + "error='alert(2)'";

        createMenu({
            dataSource: [{
                text: "Item 1",
                items: [{
                    text: "Item 2",
                    imageUrl: IMAGE_URL
                }]
            }]
        });

        menu.dataSource.view()[0].load();

        let imageElement = menu.element.find("img");
        assert.isUndefined(imageElement.attr("onerror"));
    });

    it("ImageUrl is rendered in an item with data protocol", function() {
        const DATA_IMAGE_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=";

        createMenu({
            dataSource: [{
                text: "Item 1",
                items: [{
                    text: "Item 2",
                    imageUrl: DATA_IMAGE_URL
                }]
            }]
        });

        menu.dataSource.view()[0].load();

        let imageElement = menu.element.find("img");
        assert.equal(imageElement.attr("src"), DATA_IMAGE_URL);
    });


    it('Content attributes are rendered in a item', function() {
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

        let content = menu.element.find(".customClass");

        assert.equal(content.length, 1);
        assert.equal(content.attr("test"), "myAttribute");
    });

    it('Default classes are rendered in a item', function() {
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

        let content = menu.element.find(".customClass");

        assert.isOk(content.hasClass("k-content"));
        assert.isOk(content.hasClass("k-menu-group"));
    });

    it('Expand arrow classes are rendered in subitems', function() {
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

        let expandArrow = menu.element.find(".k-menu-group .k-icon, .k-menu-group .k-svg-icon");

        assert.isOk(!expandArrow.hasClass("k-menu-expand-arrow"));
        assert.isOk(expandArrow.parent().hasClass("k-menu-expand-arrow"));
    });


    it('HierarchicalDataSource creates menu item', function() {
        createMenu({
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                    {
                        text: "RootItem"
                    }
                ]
            })
        });

        menu.dataSource.view()[0].load();
        assert.equal(menu.element.find(".k-link").text(), "RootItem");
    });

    it('dataTextField configures the item text', function() {
        createMenu({
            dataTextField: "Name",
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                    {
                        Name: "RootItem"
                    }
                ]
            })
        });

        menu.dataSource.view()[0].load();
        assert.equal(menu.element.find(".k-link").text(), "RootItem");
    });

    it('dataUrlField configures the item URL', function() {
        createMenu({
            dataUrlField: "URLTEST",
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                    {
                        text: "RootItem",
                        URLTEST: "https://telerik.com/"
                    }
                ]
            })
        });

        menu.dataSource.view()[0].load();
        assert.equal(menu.element.find(".k-link").attr('href'), "https://telerik.com/");
    });

    it('dataSpriteCssClassField configures the item icon class', function() {
        createMenu({
            dataSpriteCssClassField: "spriteClass",
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                    {
                        text: "RootItem",
                        spriteClass: "TESTCLASS"
                    }
                ]
            })
        });

        menu.dataSource.view()[0].load();
        assert.isOk(menu.element.find(".k-sprite").is(".TESTCLASS"));
    });

    it('dataImageUrlField configures the item image', function() {
        createMenu({
            dataImageUrlField: "imgUrl",
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                    {
                        text: "RootItem",
                        imgUrl: "TESTURL"
                    }
                ]
            })
        });

        menu.dataSource.view()[0].load();
        assert.equal(menu.element.find(".k-image").attr("src"), "TESTURL");
    });

    it('dataImageUrlField configures the item image', function() {
        createMenu({
            dataImageUrlField: "imgUrl",
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                    {
                        text: "RootItem",
                        imgUrl: "TESTURL"
                    }
                ]
            })
        });

        menu.dataSource.view()[0].load();
        assert.equal(menu.element.find(".k-image").attr("src"), "TESTURL");
    });

    it('dataContentField configures the item content', function() {
        createMenu({
            dataContentField: "desc",
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [
                    {
                        text: "RootItem",
                        desc: "CONTENT"
                    }
                ]
            })
        });

        menu.dataSource.view()[0].load();
        assert.equal(menu.element.find(".k-content").text(), "CONTENT");
    });
});