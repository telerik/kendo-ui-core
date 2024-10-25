(function() {
    var dom;
    var elementsDom;
    var tabstrip;

    describe("tabstrip initialization", function() {
        beforeEach(function() {
            dom = $("<ul>");
            elementsDom = '<div id="test"><ul><li>foo</li><li>bar</li></ul><div>foo content</div><div>bar content</div></div>';
        });
        afterEach(function() {
            tabstrip.destroy();
        });

        it("the element field is set to the target from which the tabstrip is initialized", function() {
            tabstrip = new kendo.ui.TabStrip(dom);

            assert.equal(tabstrip.element[0], dom[0]);
        });

        it("the wrapper field is set to the wrapper of created by the tabstrip", function() {
            tabstrip = new kendo.ui.TabStrip(dom);

            assert.equal(tabstrip.wrapper[0], dom.parent().parent()[0]);
        });

        it("the wrapper has k-widget and k-tabstrip css classes", function() {
            tabstrip = new kendo.ui.TabStrip(dom);

            assert.isOk(tabstrip.wrapper.is(".k-widget,.k-tabstrip"), "CSS classes are applied");
        });

        it("navigatable should attach the keydown handler only if true", function() {
            tabstrip = new kendo.ui.TabStrip(dom, { navigatable: false });

            assert.isOk(!$._data(tabstrip.tabGroup[0], "events").keydown, "No keydown event attached");

            tabstrip.setOptions({ navigatable: true });

            assert.isOk($._data(tabstrip.tabGroup[0], "events").keydown, "Keydown event attached");
        });

        it("applies a default top tab position CSS class", function() {
            tabstrip = new kendo.ui.TabStrip(dom);

            assert.isOk(tabstrip.wrapper.hasClass("k-tabstrip-top"), "CSS class is applied");
        });

        it("applies a top tab position CSS class", function() {
            tabstrip = new kendo.ui.TabStrip(dom, { tabPosition: "left" });

            assert.isOk(tabstrip.wrapper.hasClass("k-tabstrip-left"), "CSS class is applied");
        });

        it("moves tabs at the bottom when bottom tab position is defined", function() {
            tabstrip = new kendo.ui.TabStrip(dom, { tabPosition: "bottom" });

            assert.isOk(tabstrip.wrapper.children().last().is(".k-tabstrip-items-wrapper"), "Tabs are at the bottom");
        });

        it("adds tabindex=0 to all tab contents", function() {
            tabstrip = new kendo.ui.TabStrip(dom, {
                dataContentField: "content",
                dataTextField: "text",
                dataSource: [{
                    text: "one", content: "Content one"
                }, {
                    text: "two", content: "Content two"
                }]
            });

            assert.equal(tabstrip.wrapper.find("div[tabindex=0]").length, 2);
        });

        it("each tab has an id", function() {
            tabstrip = new kendo.ui.TabStrip(dom, {
                dataContentField: "content",
                dataTextField: "text",
                dataSource: [{
                    text: "one", content: "Content one"
                }, {
                    text: "two", content: "Content two"
                }]
            });

            assert.equal(tabstrip.wrapper.find("li.k-item")[0].id.length, 42);
            assert.equal(tabstrip.wrapper.find("li.k-item")[1].id.length, 42);
        });

        it("each content element has an id", function() {
            tabstrip = new kendo.ui.TabStrip(dom, {
                dataContentField: "content",
                dataTextField: "text",
                dataSource: [{
                    text: "one", content: "Content one"
                }, {
                    text: "two", content: "Content two"
                }]
            });

            assert.equal(tabstrip.wrapper.children("div:not(.k-tabstrip-items-wrapper)")[0].id.length, 38);
            assert.equal(tabstrip.wrapper.children("div:not(.k-tabstrip-items-wrapper)")[1].id.length, 38);
        });

        it("adds tabindex=0 to all tab contents when initialized from element", function() {
            tabstrip = new kendo.ui.TabStrip(elementsDom);

            assert.equal(tabstrip.wrapper.find("div[tabindex=0]").length, 2);
        });

        it("function tab template is applied correctly", function() {
            tabstrip = new kendo.ui.TabStrip(dom, {
                dataContentField: "content",
                tabTemplate: data => `<span class='customClass'>${data.text}</span>`,
                dataSource: [{
                    text: "one", content: "Content one"
                }]
            });

            assert.equal(tabstrip.wrapper.find("span.customClass").text(), "one");
        });
    });
}());
