(function() {

var dom;

describe("tabstrip data binding", function () {
    beforeEach(function() {
        dom = $("<ul>");
    });
    afterEach(function() {
        kendo.destroy(dom);
    });

it("binding to data source", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataSource: [{}, {}]
    });

    assert.equal(dom.find("li").length, 2);
});

it("the dataSource field is instance of kendo.data.DataSource", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataSource: [{}, {}]
    });

    assert.isOk(tabstrip.dataSource instanceof kendo.data.DataSource, "dataSource is instanceof kendo.data.DataSource");
});

it("binding to array of primitive types", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataSource: ["foo"]
    });

    assert.equal(dom.find("li").text(), "foo");
});

it("binding to array of complex objects displays [object Object] by default", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataSource: [{}]
    });

    assert.equal(dom.find("li").text(), "[object Object]");
});

it("binding to array of complex objects displays the dataTextField", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataTextField: "foo",
        dataSource: [{ foo: "foo" }]
    });

    assert.equal(dom.find("li").text(), "foo");
});

it("dataTextField as array access expression", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataTextField: "['foo']",
        dataSource: [{ foo: "foo" }]
    });

    assert.equal(dom.find("li").text(), "foo");
});

it("binding raises the dataBinding event", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataBinding: function() {
            assert.isOk(true, "Event is raised");
        },
        dataSource: [{}]
    });
});

it("items are updated on change event of the dataSource", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataTextField: "foo",
        dataUrlField: "bar",
        dataSource: [{ foo: "foo", bar: "index.html" }]
    });

    assert.equal(dom.find("li").text(), "foo");

    tabstrip.dataSource.view()[0].set("bar", "newvalue");

    assert.equal(tabstrip._contentUrls[0], "newvalue");
});

it("binding raises the dataBound event", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataBound: function() {
            assert.isOk(true, "Event is raised");
        },
        dataSource: [{}]
    });
});

it("dataContentField", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataContentField: "foo",
        dataSource: [{foo:"foo"}]
    });

    assert.equal(tabstrip.contentElements.first().text(), "foo")
});

it("dataImageUrlField", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataImageUrlField: "foo",
        dataSource: [{foo:"http://example.com"}]
    });

    assert.equal(tabstrip.tabGroup.find("img").attr("src"), "http://example.com")
});

it("dataUrlField", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataUrlField: "foo",
        dataSource: [{foo:"http://example.com"}]
    });

    assert.equal(tabstrip.tabGroup.find("a").attr("href"), "http://example.com")
});

it("dataSpriteCssClass", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataSpriteCssClass: "foo",
        dataSource: [{foo:"foo"}]
    });

    assert.isOk(tabstrip.tabGroup.find("span.k-sprite").hasClass("foo"));
});

it("resetting dataSource detaches the previous events", function() {
    var tabstrip = new kendo.ui.TabStrip(dom);

    var dataSource = tabstrip.dataSource;

    var called = false;

    tabstrip._dataSource();

    tabstrip.bind("dataBound", function() {
        called = true;
    });

    dataSource.read();

    assert.isOk(!called, "Change event is not detached");
});

it("resetting DataSource rebinds the widget and refreshes content elements", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataContentField: "content"
    });

    tabstrip.setDataSource(new kendo.data.DataSource({
        data:[{text: 1, value: 1, content: "1"}, {text:2, value:2, content: "2"}]
    }));

    assert.equal(tabstrip.wrapper.find("li").length, 2);
    assert.equal(tabstrip.wrapper.children("div").length, 2);
});
    });
}());
