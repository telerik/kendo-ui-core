(function() {
    var DataSource = kendo.data.DataSource,
        dataSource;

    function setup(options) {
        options = $.extend({
            template: "<li></li>",
            navigatable: true,
            selectable: true,
            dataSource: dataSource = new DataSource({ data: [1, 2, 3, 4, 5] })
        }, options);
        return $("<ul id='test'/>").appendTo(Mocha.fixture).kendoListView(options);
    }

    describe("listview ARIA", function() {
        beforeEach(function() {
            kendo.ns = "kendo-";
            $("<div id=\"pager\"></div>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
            $("#pager").remove();
            kendo.ns = "";
        });

        it("ListView adds role list", function() {
            var ul = setup();

            assert.equal(ul.attr("role"), "listbox");
        });

        it("ListView adds aria-multiselectable if selectable=multiple", function() {
            var ul = setup({
                selectable: "multiple"
            });

            assert.equal(ul.attr("aria-multiselectable"), "true");
        });

        it("ListView adds role listitem to all child elements", function() {
            var ul = setup();

            assert.equal(ul.find("li").attr("role"), "option");
        });

        it("ListView adds aria-selected=false to all child elements", function() {
            var ul = setup();

            assert.equal(ul.find("li").attr("aria-selected"), "false");
        });

        it("ListView adds aria-selected=true on SPACEBAR", function() {
            var ul = setup();

            ul.data("kendoListView").current(ul.children().eq(0));
            ul.trigger({
                type: "keydown",
                keyCode: kendo.keys.SPACEBAR
            });

            assert.equal(ul.data("kendoListView").current().attr("aria-selected"), "true");
        });

        it("ListView adds id to the last selected item", function() {
            var ul = setup();

            ul.data("kendoListView").current(ul.children().eq(0));
            ul.trigger({
                type: "keydown",
                keyCode: kendo.keys.SPACEBAR
            });

            assert.equal(ul.data("kendoListView").current().attr("id"), "test_lv_active");
        });

        it("ListView adds aria-activedescendant to the listview", function() {
            var ul = setup();

            ul.data("kendoListView").current(ul.children().eq(0));
            ul.trigger({
                type: "keydown",
                keyCode: kendo.keys.SPACEBAR
            });

            assert.equal(ul.attr("aria-activedescendant"), "test_lv_active");
        });

        it("ListView preserves the id of the LI elements", function() {
            var listview = setup({
                template: "<li id='custom[#=data#]'>#=data#</li>",
                selectable: true,
                navigatable: true
            }).data("kendoListView");

            listview.current(listview.element.children().eq(0));
            var li = listview.element.find(".k-state-focused");

            assert.equal(li.attr("id"), "custom[1]");
        });

        it("ListView uses id of the LI element for the aria-activedescendant", function() {
            var listview = setup({
                template: "<li id='custom[#=data#]'>#=data#</li>",
                selectable: true,
                navigatable: true
            }).data("kendoListView");

            listview.current(listview.element.children().eq(0));

            assert.equal(listview.element.attr("aria-activedescendant"), "custom[1]");
        });
    });
}());
