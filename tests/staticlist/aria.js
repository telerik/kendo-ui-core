(function() {
    var StaticList = kendo.ui.StaticList,
        input;

    describe("kendo.ui.StaticList Aria", function() {
        beforeEach(function() {
            kendo.ns = "kendo-";
            element = $("<ul></ul>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            element.data("kendoStaticList").destroy();

            kendo.support.touch = false;
            kendo.support.mobileOS = false;
            kendo.ns = "";
        });

        it("StaticList renders aria-selected", function() {
            var staticlist = new StaticList(element, {
                dataSource: ["Item", "Item2"],
                template: "#:data#",
                value: ["Item"]
            });

            staticlist.dataSource.read();

            assert.equal(staticlist.focus().attr("aria-selected"), "true");
        });

        it("StaticList renders aria-selected false", function() {
            var staticlist = new StaticList(element, {
                dataSource: ["Item", "Item2"],
                template: "#:data#"
            });

            staticlist.dataSource.read();

            assert.equal(element.find("li[aria-selected=false]").length, 2);
        });
    });
}());
