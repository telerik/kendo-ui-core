import '@progress/kendo-ui/src/kendo.list.js';
import '@progress/kendo-ui/src/kendo.binder.js';

describe("kendo.ui.StaticList MVVM binding", function() {
    beforeEach(function() {
        Mocha.fixture
            .append("<script type='text/x-kendo-template' id='item-template'>#:data#</script>");
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("source binding", function() {
        let dom = $("<ul data-role='staticlist' " +
            "data-template='item-template' " +
            "data-bind='source: items' />").appendTo(Mocha.fixture);

        kendo.bind(Mocha.fixture, {
            items: ["foo", "bar", "baz"]
        });

        assert.equal(dom.find(".k-list-item").length, 3);
    });

    it("source binding string template", function() {
        let dom = $("<ul data-role='staticlist' " +
            "data-template='stringTemplate' " +
            "data-bind='source: items' />").appendTo(Mocha.fixture);

        kendo.bind(Mocha.fixture, {
            items: ["foo", "bar", "baz"],
            stringTemplate: "#:data#"
        });

        assert.equal(dom.find(".k-list-item").length, 3);
        assert.equal(dom.find(".k-list-item").first().text(), "foo");
    });

    it("source binding function template", function() {
        let dom = $("<ul data-role='staticlist' " +
            "data-template='stringTemplate' " +
            "data-bind='source: items' />").appendTo(Mocha.fixture);

        kendo.bind(Mocha.fixture, {
            items: ["foo", "bar", "baz"],
            stringTemplate: kendo.template($("#item-template").html())
        });

        assert.equal(dom.find(".k-list-item").length, 3);
        assert.equal(dom.find(".k-list-item").first().text(), "foo");
    });

    it("two-way value binding", function() {
        let dom = $("<ul data-role='staticlist' " +
            "data-template='item-template' " +
            "data-value-field='value' " +
            "data-bind='source: items, value: selected' />").appendTo(Mocha.fixture);

        let viewModel = kendo.observable({
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
