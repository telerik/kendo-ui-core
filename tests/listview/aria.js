(function() {
    var DataSource = kendo.data.DataSource,
        data,
        dataSource;

    function setup(options) {
        data = [];

        for (var idx = 1; idx < 50; idx++) {
            data.push({ id: idx, foo: "foo " + idx });
        }

        options = $.extend({
            template: (data) => `<li>$(kendo.htmlEncode(data}</li>`,
            ariaLabel: "listview label",
            navigatable: true,
            selectable: true,
            dataSource: dataSource = new DataSource({ data: [1, 2, 3, 4, 5] })
        }, options);
        return $("<div/>").appendTo(Mocha.fixture).kendoListView(options);
    }

    describe("kendo.ui.ListView WAI-ARIA roles and attributes", function() {
        beforeEach(function() {
            kendo.ns = "kendo-";
            $("<div id=\"pager\"></div>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
            $("#pager").remove();
            kendo.ns = "";
        });

        it("ListView adds role listbox", function() {
            var container = setup();

            assert.equal(container.find(".k-listview-content").attr("role"), "listbox");
        });

        it("ListView does not add role when empty", function() {
            var container = setup({
                dataSource: []
            });

            assert.equal(container.attr("role"), undefined);
        });

        it("ListView adds role list when not selectable", function() {
            var container = setup({ selectable: false });

            assert.equal(container.find(".k-listview-content").attr("role"), "list");
        });

        it("ListView adds aria-multiselectable if selectable=multiple", function() {
            var container = setup({
                selectable: "multiple"
            });

            assert.equal(container.find(".k-listview-content").attr("aria-multiselectable"), "true");
        });

        it("ListView does not add aria-multiselectable when empty", function() {
            var container = setup({
                selectable: "multiple",
                dataSource: []
            });

            assert.equal(container.attr("aria-multiselectable"), undefined);
        });

        it("aria-selected attribute is not rendered if selection is not enabled", function() {
            var container = setup({
                selectable: false
            });

            assert.isOk(!container.data("kendoListView").wrapper.find("[aria-selected='false']").length);
        });

        it("ListView adds role listitem to all child elements", function() {
            var container = setup();

            assert.equal(container.find("li").attr("role"), "option");
        });

        it("ListView adds role listitem to all child elements when not navigatable and selectable", function() {
            var container = setup({ navigatable: false, selectable: false });

            assert.equal(container.find("li").attr("role"), "listitem");
        });

        it("ListView adds aria-selected=false to all child elements", function() {
            var container = setup();

            assert.equal(container.find("li").attr("aria-selected"), "false");
        });

        it("ListView adds aria-selected=true on SPACEBAR", function() {
            var container = setup();

            container.data("kendoListView").current(container.children().eq(0));
            container.trigger({
                type: "keydown",
                keyCode: kendo.keys.SPACEBAR
            });

            assert.equal(container.data("kendoListView").current().attr("aria-selected"), "true");
        });

        it("ListView adds id to the last selected item", function() {
            var container = setup();

            container.data("kendoListView").current(container.children().eq(0));
            container.trigger({
                type: "keydown",
                keyCode: kendo.keys.SPACEBAR
            });

            assert.isOk(!!container.data("kendoListView").current().attr("id"));
        });

        it("ListView adds aria-activedescendant to the listview", function() {
            var container = setup();

            container.data("kendoListView").current(container.children().eq(0));
            container.trigger({
                type: "keydown",
                keyCode: kendo.keys.SPACEBAR
            });

            assert.isOk(!!container.attr("aria-activedescendant"));
            assert.equal(container.attr("aria-activedescendant"), container.data("kendoListView").current().attr("id"));
        });

        it("ListView preserves the id of the LI elements", function() {
            var listview = setup({
                template: (data) => `<li id='custom[${data}]'>${data}</li>`,
                selectable: true,
                navigatable: true
            }).data("kendoListView");

            listview.current(listview.content.children().eq(0));
            var li = listview.content.find(".k-focus");

            assert.equal(li.attr("id"), "custom[1]");
        });

        it("ListView uses id of the LI element for the aria-activedescendant", function() {
            var listview = setup({
                template: (data) => `<li id='custom[${data}]'>${data}</li>`,
                selectable: true,
                navigatable: true
            }).data("kendoListView");

            listview.current(listview.content.children().eq(0));

            assert.equal(listview.element.attr("aria-activedescendant"), "custom[1]");
        });
    });

    describe("kendo.ui.ListView WAI-ARIA with AXE", function() {
        beforeEach(function() {
            kendo.effects.disable();
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("is accessible when navigable", function(done) {
            setup({ navigatable: true });

            axeRunFixture(done);
        });

        it("is accessible when selectable", function(done) {
            var listView = setup({ selectable: true }).getKendoListView();

            listView.select(listView.content.children().first());

            axeRunFixture(done);
        });

        it("is accessible when not selectable", function(done) {
            setup({
                navigatable: false,
                selectable: false
            });

            axeRunFixture(done);
        });

        it("is accessible when dataSource is empty", function(done) {
            setup({ dataSource: [] });

            axeRunFixture(done);
        });
    });
}());
