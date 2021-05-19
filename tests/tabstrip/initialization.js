(function() {
    var dom;
    var elementsDom;
    var tabstrip;

    describe("tabstrip initialization", function () {
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

            assert.equal(tabstrip.wrapper[0], dom.parent()[0]);
        });

        it("the wrapper has k-widget and k-tabstrip css classes", function() {
            tabstrip = new kendo.ui.TabStrip(dom);

            assert.isOk(tabstrip.wrapper.is(".k-widget,.k-tabstrip"), "CSS classes are applied");
        });

        it("navigatable should attach the keydown handler only if true", function() {
            tabstrip = new kendo.ui.TabStrip(dom, { navigatable: false });

            assert.isOk(!$._data( tabstrip.wrapper[0], "events" ).keydown, "No keydown event attached");

            tabstrip.setOptions({ navigatable: true });

            assert.isOk($._data( tabstrip.wrapper[0], "events" ).keydown, "Keydown event attached");
        });

        it("adds a scroll stopping wrapper around itself", function() {
            tabstrip = new kendo.ui.TabStrip(dom);

            assert.isOk(tabstrip.scrollWrap.is(".k-tabstrip-wrapper"), "Adds wrapper class");
            assert.isOk(tabstrip.wrapper.parent(".k-tabstrip-wrapper").length, "Wraps around the TabStrip");
        });

        it("doesn't add a scroll stopping wrapper if there is one already", function() {
            tabstrip = new kendo.ui.TabStrip(dom.wrap('<div class="k-tabstrip-wrapper"></div>'));

            assert.isOk(dom.parents(".k-tabstrip-wrapper").length == 1, "Only one wrapper around the TabStrip");
        });

        it("removes its scrolling wrapper on destroy", function() {
            tabstrip = new kendo.ui.TabStrip(dom);

            tabstrip.destroy();

            assert.isOk(!tabstrip.wrapper.parent().is(".km-tabstrip-wrapper"), "Unwraps the wrapper");
        });

        it("applies a default top tab position CSS class", function () {
            tabstrip = new kendo.ui.TabStrip(dom);

            assert.isOk(tabstrip.wrapper.hasClass("k-tabstrip-top"), "CSS class is applied");
        });

        it("applies a top tab position CSS class", function () {
            tabstrip = new kendo.ui.TabStrip(dom, {tabPosition: "left"});

            assert.isOk(tabstrip.wrapper.hasClass("k-tabstrip-left"), "CSS class is applied");
        });

        it("moves tabs at the bottom when bottom tab position is defined", function () {
            tabstrip = new kendo.ui.TabStrip(dom, { tabPosition: "bottom" });

            assert.isOk(tabstrip.wrapper.children().last().is(".k-tabstrip-items"), "Tabs are at the bottom");
        });

        it("adds tabindex=0 to all tab contents", function () {
            tabstrip = new kendo.ui.TabStrip(dom, {
                dataContentField: "content",
                dataTextField: "text",
                dataSource: [ {
                    text: "one", content: "Content one"
                }, {
                    text: "two", content: "Content two"
                } ]
            });

            assert.equal(tabstrip.wrapper.find("div[tabindex=0]").length, 2);
        });

        it("each tab has an id", function () {
            tabstrip = new kendo.ui.TabStrip(dom, {
                dataContentField: "content",
                dataTextField: "text",
                dataSource: [ {
                    text: "one", content: "Content one"
                }, {
                    text: "two", content: "Content two"
                } ]
            });

            assert.equal(tabstrip.wrapper.find("li.k-item")[0].id.length, 42);
            assert.equal(tabstrip.wrapper.find("li.k-item")[1].id.length, 42);
        });

        it("each content element has an id", function () {
            tabstrip = new kendo.ui.TabStrip(dom, {
                dataContentField: "content",
                dataTextField: "text",
                dataSource: [ {
                    text: "one", content: "Content one"
                }, {
                    text: "two", content: "Content two"
                } ]
            });

            assert.equal(tabstrip.wrapper.children("div")[0].id.length, 38);
            assert.equal(tabstrip.wrapper.children("div")[1].id.length, 38);
        });

        it("adds tabindex=0 to all tab contents when initialized from element", function() {
            tabstrip = new kendo.ui.TabStrip(elementsDom);

            assert.equal(tabstrip.wrapper.find("div[tabindex=0]").length, 2);
        });

    });
}());
