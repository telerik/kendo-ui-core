(function() {
    describe("kendo.ui.StaticList MVVM binding", function() {
        beforeEach(function() {
            Mocha.fixture
                .append("<script type='text/x-kendo-template' id='item-template'>#:data#</script>");
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("source binding", function() {
            var dom = $("<ul data-role='staticlist' " +
                "data-template='item-template' " +
                "data-bind='source: items' />").appendTo(Mocha.fixture);

            kendo.bind(Mocha.fixture, {
                items: ["foo", "bar", "baz"]
            });

            assert.equal(dom.find(".k-list-item").length, 3);
        });

        it("source binding string template", function() {
            var dom = $("<ul data-role='staticlist' " +
                "data-template='stringTemplate' " +
                "data-bind='source: items' />").appendTo(Mocha.fixture);

            kendo.bind(Mocha.fixture, {
                items: ["foo", "bar", "baz"],
                stringTemplate: "#:data#"
            });

            assert.equal(dom.find(".k-list-item").length, 3);
        });

        it("source binding function template", function() {
            var dom = $("<ul data-role='staticlist' " +
                "data-template='stringTemplate' " +
                "data-bind='source: items' />").appendTo(Mocha.fixture);

            kendo.bind(Mocha.fixture, {
                items: ["foo", "bar", "baz"],
                stringTemplate: kendo.template($("#item-template").html())
            });

            assert.equal(dom.find(".k-list-item").length, 3);
        });

        it("two-way value binding", function() {
            var dom = $("<ul data-role='staticlist' " +
                "data-template='item-template' " +
                "data-value-field='value' " +
                "data-bind='source: items, value: selected' />").appendTo(Mocha.fixture);

            var viewModel = kendo.observable({
                items: [
                    { text: "foo", value: "foo" },
                    { text: "bar", value: "bar" },
                    { text: "baz", value: "baz" }
                ],
                selected: "bar"
            });

            kendo.bind(Mocha.fixture, viewModel);

            assert.isOk(dom.find(".k-list-item").eq(1).hasClass("k-selected"));

            viewModel.set("selected", "foo");

            assert.isOk(dom.find(".k-list-item").eq(0).hasClass("k-selected"));
            assert.isOk(!dom.find(".k-list-item").eq(1).hasClass("k-selected"));
        });
    });
}());
