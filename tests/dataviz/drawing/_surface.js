function baseSurfaceTests(name, TSurface) {
    var dataviz = kendo.dataviz,
        d = dataviz.drawing,
        Group = d.Group;

    var container;
    var surface;

    // ------------------------------------------------------------
    module("Surface Base Tests / " + name, {
        setup: function() {
            container = $("<div>").appendTo(QUnit.fixture);
            surface = new TSurface(container);
        },
        teardown: function() {
            container.remove();
        }
    });

    test("sets initial options", function() {
        surface = new TSurface(container, { foo: true });
        ok(surface.options.foo);
    });

    test("does not set initial width", function() {
        equal(surface.element[0].style.width, "");
    });

    test("sets initial width", function() {
        surface = new TSurface(container, { width: "500px" });
        equal(surface.element[0].style.width, "500px");
    });

    test("does not set initial height", function() {
        equal(surface.element[0].style.height, "");
    });

    test("sets initial height", function() {
        surface = new TSurface(container, { height: "500px" });
        equal(surface.element[0].style.height, "500px");
    });

    test("draw attaches element to root node", function() {
        var group = new Group();
        surface.draw(group);

        deepEqual(surface._root.childNodes[0].srcElement, group);
    });

    test("clear removes element from root node", function() {
        var group = new Group();
        surface.draw(group);
        surface.clear();

        equal(surface._root.childNodes.length, 0);
    });

    test("size returns element dimensions", function() {
        surface.size({ width: 1000, height: 1000 });

        deepEqual(surface.size(), {
            width: 1000,
            height: 1000
        });
    });

    test("size sets element dimensions", function() {
        surface.size({
            width: 100,
            height: 100
        });

        deepEqual(surface.size(), {
            width: 100,
            height: 100
        });
    });

    test("size caches size even if element is hidden", function() {
        $(container).css("display", "none");
        surface._resize = function() {
            deepEqual(surface._size, {
                width: 100,
                height: 100
            });
        };

        surface.size({
            width: 100,
            height: 100
        });
    });
}

function baseSurfaceEventTests(name, TSurface) {
    var dataviz = kendo.dataviz,
        d = dataviz.drawing,
        Group = d.Group;

    var container;
    var surface;

    // ------------------------------------------------------------
    module("Surface Base Tests / " + name + " /Events", {
        setup: function() {
            container = $("<div>").appendTo(QUnit.fixture);
            surface = new TSurface(container);
        },
        teardown: function() {
            container.remove();
        }
    });

    test("binds initial handlers", function() {
        surface = new TSurface(container, {
            click: function() { ok(true); }
        });

        surface.trigger("click");
    });

    test("clicking a node triggers click", function() {
        surface.draw(new Group());
        surface.bind("click", function() { ok(true); });

        $(surface._root.childNodes[0].element).trigger("click");
    });

    test("click has reference to element", function() {
        var group = new Group();
        surface.draw(group);
        surface.bind("click", function(e) { deepEqual(e.element, group); });

        $(surface._root.childNodes[0].element)
            .trigger("click", { toElement: surface._root.childNodes[0].element });
    });
}
