(function() {
    var StaticList = kendo.ui.StaticList,
        element;

    describe("kendo.ui.StaticList API", function() {
        beforeEach(function() {
            kendo.ns = "kendo-";
            element = $("<ul></ul>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            element.data("kendoStaticList").destroy();

            kendo.support.touch = false;
            kendo.support.mobileOS = false;
            kendo.support.kineticScrollNeeded = false;
            kendo.ns = "";
        });

        it("each column template shows text field if there is not field defined", function() {
            var list = new StaticList(element, {
                columns: [
                    {},
                ],
                dataTextField: "text",
                dataSource: [{ id: 1, text: "item1" },
                { id: 2, text: "item2" },
                { id: 3, text: "item3" }]
            });

            assert.equal(list.templates.column0({ id: 1, text: "item1" }), "item1");
        });

        it("each column sets a new template", function() {
            var list = new StaticList(element, {
                columns: [
                    { field: "name" },
                    { field: "id" }
                ],
                dataTextField: "name",
                dataSource: [{ id: 1, name: "item1" },
                { id: 2, name: "item2" },
                { id: 3, name: "item3" }]
            });

            assert.equal(list.templates.column0({ id: 1, name: "item1" }), "item1");
            assert.equal(list.templates.column1({ id: 2, name: "item2" }), "2");
        });

        it("each custom template is applied", function() {
            var list = new StaticList(element, {
                columns: [
                    { field: "name", template: "new #: name #" },
                    { field: "id" }
                ],
                dataTextField: "name",
                dataSource: [{ id: 1, name: "item1" },
                { id: 2, name: "item2" },
                { id: 3, name: "item3" }]
            });

            assert.equal(list.templates.column0({ id: 1, name: "item1" }), "new item1");
        });

        it("setOptions re-create columns", function() {
            var list = new StaticList(element, {
                columns: [
                    { field: "name" }
                ],
                dataTextField: "name",
                dataSource: [{ id: 1, name: "item1" },
                { id: 2, name: "item2" },
                { id: 3, name: "item3" }]
            });

            list.dataSource.read();
            assert.equal(element.children(":first").find("span").length, 1);
            list.setOptions({
                columns: [
                    { field: "name" },
                    { field: "id" }
                ],
            });

            assert.equal(element.children(":first").find("span").length, 2);
        });

    });
}());
