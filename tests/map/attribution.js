(function() {
    var element,
        attr,
        Location = kendo.dataviz.map.Location,
        Extent = kendo.dataviz.map.Extent;


    function createAttribution(options) {
        destroyAttribution();

        options = options || {};
        attr = $("<div></div>").appendTo(QUnit.fixture)
               .kendoAttribution(options).data("kendoAttribution");

        attr._zoom = 2;
    }

    function destroyAttribution() {
        if (attr) {
            attr.destroy();
            attr.element.remove();
            attr = null;
        }
    }

    // ------------------------------------------------------------
    module("Attribution", {
        setup: function() {
            createAttribution();
        },
        teardown: destroyAttribution
    });

    test("adds css classes to wrapper", function() {
        ok(attr.element.is(".k-widget.k-attribution"));
    });

    test("should update extent and the zoom level", function() {
        attr.filter(new Location(0,0), 3);

        ok(attr._extent);
        equal(attr._zoom, 3);
    });

    test("adds item to the items collection", function() {
        attr.add("foo");

        equal(attr.items[0].text, "foo");
        equal(attr.element.html(), "foo");
    });

    test("removes item from the items collection", function() {
        attr.add("foo");
        attr.add("foo1");
        attr.remove("foo");

        equal(attr.items.length, 1);
        equal(attr.items[0].text, "foo1");
    });

    test("clears items collection", function() {
        attr.add("foo");
        attr.clear();

        equal(attr.items.length, 0);
    });

    test("clears the element", function() {
        attr.add("foo");
        attr.clear();

        equal(attr.element.html(), "");
    });

    test("_itemText return item", function() {
        equal(attr._itemText({ text: "foo" }), "foo");
    });

    test("_inArea returns item in the area", function() {
        attr.filter(new Location(0, 0), 3);
        equal(attr._itemText({
            text: "foo",
            extent: new Extent(new Location(1, -1), new Location(-1,1))
        }), "foo");
    });

    test("_inArea should not return item outside of area", function() {
        attr.filter(new Location(0, 0), 3);
        equal(attr._itemText({
            text: "foo",
            extent: new Extent(new Location(10, 10), new Location(20,20))
        }), "");
    });

    test("_inZoomLevel returns item in the zoom level", function() {
        attr.filter(null, 4);
        equal(attr._itemText({
            text: "foo",
            minZoom: 1,
            maxZoom: 20
        }), "foo");
    });

    test("_inZoomLevel should not return item outside zoom level", function() {
        attr.filter(null, 4);
        equal(attr._itemText({
            text: "foo",
            minZoom: 7,
            maxZoom: 20
        }), "");
    });

    test("item template", function() {
        createAttribution({
            itemTemplate: "#= text #bar"
        });
        attr.add("foo");

        equal(attr.element.html(), "foobar");
    });

    test("separator", function() {
        createAttribution({
            separator: "bar"
        });
        attr.add("foo");
        attr.add("baz");

        equal(attr.element.html(), "foobarbaz");
    });

    test("should not add empty text", function() {
        attr.add();
        attr.add("");

        equal(attr.element.html(), "");
    });
})();
