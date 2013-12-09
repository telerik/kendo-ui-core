(function() {

var dom;

module("tabstrip data binding", {
    setup: function() {
        dom = $("<ul>");
    },
    teardown: function() {
        kendo.destroy(dom);
    }
});

test("binding to data source", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataSource: [{}, {}]
    });

    equal(dom.find("li").length, 2);
});

test("the dataSource field is instance of kendo.data.DataSource", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataSource: [{}, {}]
    });

    ok(tabstrip.dataSource instanceof kendo.data.DataSource, "dataSource is instanceof kendo.data.DataSource");
});

test("binding to array of primitive types", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataSource: ["foo"]
    });

    equal(dom.find("li").text(), "foo");
});

test("binding to array of complex objects displays [object Object] by default", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataSource: [{}]
    });

    equal(dom.find("li").text(), "[object Object]");
});

test("binding to array of complex objects displays the dataTextField", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataTextField: "foo",
        dataSource: [{ foo: "foo" }]
    });

    equal(dom.find("li").text(), "foo");
});

test("dataTextField as array access expression", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataTextField: "['foo']",
        dataSource: [{ foo: "foo" }]
    });

    equal(dom.find("li").text(), "foo");
});

test("binding raises the dataBinding event", 1, function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataBinding: function() {
            ok(true, "Event is raised");
        },
        dataSource: [{}]
    });
});

test("binding raises the dataBound event", 1, function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataBound: function() {
            ok(true, "Event is raised");
        },
        dataSource: [{}]
    });
});

test("dataContentField", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataContentField: "foo",
        dataSource: [{foo:"foo"}]
    });

    equal(tabstrip.contentElements.first().text(), "foo")
});

test("dataImageUrlField", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataImageUrlField: "foo",
        dataSource: [{foo:"http://example.com"}]
    });

    equal(tabstrip.tabGroup.find("img").attr("src"), "http://example.com")
});

test("dataUrlField", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataUrlField: "foo",
        dataSource: [{foo:"http://example.com"}]
    });

    equal(tabstrip.tabGroup.find("a").attr("href"), "http://example.com")
});

test("dataSpriteCssClass", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataSpriteCssClass: "foo",
        dataSource: [{foo:"foo"}]
    });

    ok(tabstrip.tabGroup.find("span.k-sprite").hasClass("foo"));
});

test("resetting dataSource detaches the previous events", function() {
    var tabstrip = new kendo.ui.TabStrip(dom);

    var dataSource = tabstrip.dataSource;

    var called = false;

    tabstrip._dataSource();

    tabstrip.bind("dataBound", function() {
        called = true;
    });

    dataSource.read();

    ok(!called, "Change event is not detached");
});

test("resetting DataSource rebinds the widget and refreshes content elements", 2, function() {
    var tabstrip = new kendo.ui.TabStrip(dom, {
        dataContentField: "content"
    });

    tabstrip.setDataSource(new kendo.data.DataSource({
        data:[{text: 1, value: 1, content: "1"}, {text:2, value:2, content: "2"}]
    }));

    equal(tabstrip.wrapper.find("li").length, 2);
    equal(tabstrip.wrapper.children("div").length, 2);
});
})();
