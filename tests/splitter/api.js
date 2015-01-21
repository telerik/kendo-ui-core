(function() {
    var splitter;
    var create = SplitterHelpers.create;

    module("splitter api", SplitterHelpers.basicModule);

    test("toggle(false) toggles pane state", function() {
        splitter = create({
            panes: [ { collapsible: true }, {} ]
        });

        var pane = splitter.dom.find(".k-pane:first");

        splitter.object.toggle(pane, false);

        ok(pane.data("pane").collapsed);

        splitter = create({
            panes: [ {}, { collapsible: true } ]
        });

        pane = splitter.dom.find(".k-pane:last")

        splitter.object.toggle(pane, false);

        ok(pane.data("pane").collapsed);
    });

    test("toggle(false) triggers resize", function() {
        var triggered = false;

        splitter = create({
            panes: [ { collapsible: true }, {} ],
            resize: function() {
                triggered = true;
            }
        });

        splitter.object.toggle(".k-pane:last", false);

        ok(triggered);
    });

    test("toggle(false) converts associated arrow to expand arrow", function() {
        splitter = create({
            panes: [ { collapsible: true }, {} ]
        });

        splitter.object.toggle(".k-pane:first", false);

        var previousArrow = splitter.dom.find(".k-expand-prev");

        ok(previousArrow.is(".k-expand-prev"));
        ok(previousArrow.is(":not(.k-collapse-prev)"));
    });

    test("toggle(false) disables splitbar resize", function() {
        splitter = create({
            panes: [ { collapsible: true }, {} ]
        });

        splitter.object.toggle(".k-pane:first", false);

        ok(!splitter.dom.find(".k-splitbar").hasClass("k-splitbar-draggable-horizontal"));
    });

    test("toggle(true) removes splibar hover style", function() {
        splitter = create({
            panes: [ { collapsible: true, collapsed: true }, {} ]
        });

        splitter.dom.find(".k-splitbar").addClass("k-splitbar-horizontal-hover");

        splitter.object.toggle(".k-pane:first", false);

        ok(!splitter.dom.find(".k-splitbar").hasClass("k-splitbar-horizontal-hover"));
    });

    test("toggle(true) toggles pane state", function() {
        splitter = create({
            panes: [ { collapsible: true, collapsed: true }, {} ]
        });

        var pane = splitter.dom.find(".k-pane:first");

        splitter.object.toggle(pane, true);

        ok(!pane.data("pane").collapsed);

        splitter = create({
            panes: [ {}, { collapsible: true, collapsed: true } ]
        });

        pane = splitter.dom.find(".k-pane:last")

        splitter.object.toggle(pane, true);

        ok(!pane.data("pane").collapsed);
    });

    test("toggle(true) triggers resize", function() {
        var triggered = false;

        splitter = create({
            panes: [ { collapsible: true, collapsed: true }, {} ],
            resize: function() {
                triggered = true;
            }
        });

        splitter.object.toggle(".k-pane:first", true);

        ok(triggered);
    });

    test("toggle(true) converts associated arrow to collapse arrow", function() {
        splitter = create({
            panes: [ { collapsible: true, collapsed: true }, {} ]
        });

        splitter.object.toggle(".k-pane:first", true);

        var previousArrow = splitter.dom.find(".k-collapse-prev");

        ok(previousArrow.is(".k-collapse-prev"));
        ok(previousArrow.is(":not(.k-expand-prev)"));
    });

    test("toggle(true) enables splitbar resize", function() {
        splitter = create({
            panes: [ { collapsible: true, collapsed: true }, {} ]
        });

        splitter.object.toggle(".k-pane:first", true);

        ok(splitter.dom.find(".k-splitbar").hasClass("k-splitbar-draggable-horizontal"));
    });

    test("toggle(true) does not add splibar hover style", function() {
        splitter = create({
            panes: [ { collapsible: true, collapsed: true }, {} ]
        });

        splitter.object.toggle(".k-pane:first", true);

        ok(!splitter.dom.find(".k-splitbar").hasClass("k-splitbar-horizontal-hover"));
    });

    test("toggle() applies selector context", function() {
        splitter = create({
            panes: [{ collapsible: true }, {}]
        });

        splitter = create({
            panes: [{ collapsible: true }, {}]
        });

        splitter.object.toggle(".k-pane:first", false);

        ok(splitter.dom.find(".k-pane:first").data("pane").collapsed);
    });

    test("collapse() calls toggle(false)", function() {
        var args;

        splitter = create({
            panes: [ { collapsible: true }, {} ]
        });

        splitter.object.toggle = function() {
            args = arguments;
        };

        splitter.object.collapse(".k-pane:last");

        ok(args);
        equal(args.length, 2);
        equal(args[0], ".k-pane:last");
        equal(args[1], false);
    });

    test("expand() calls toggle(true)", function() {
        var args;

        splitter = create({
            panes: [ { collapsible: true }, {} ]
        });

        splitter.object.toggle = function() {
            args = arguments;
        };

        splitter.object.expand(".k-pane:last");

        ok(args);
        equal(args.length, 2);
        equal(args[0], ".k-pane:last");
        equal(args[1], true);
    });

    test("size() gets/sets pane size", function() {
        splitter = create({
            panes: [ { size: "110px" }, {} ]
        });

        var firstPane = splitter.dom.find(".k-pane:first");

        equal(splitter.object.size(firstPane), "110px");

        splitter.object.size(firstPane, "120px");

        equal(splitter.object.size(firstPane), "120px");
    });

    test("size() applies selector context", function() {
        splitter = create({
            panes: [ { size: "125px" }, {} ]
        });

        splitter = create({
            panes: [ { size: "110px" }, {} ]
        });

        equal(splitter.object.size(".k-pane:first"), "110px");
    });

    test("min() gets/sets pane min", function() {
        splitter = create({
            panes: [ { min: "110px", size: "200px" }, {} ]
        });

        var firstPane = splitter.dom.find(".k-pane:first");

        equal(splitter.object.min(firstPane), "110px");

        splitter.object.min(firstPane, "120px");

        equal(splitter.object.min(firstPane), "120px");
    });

    test("max() gets/sets pane max", function() {
        splitter = create({
            panes: [ { max: "200px", size: "110px" }, {} ]
        });

        var firstPane = splitter.dom.find(".k-pane:first");

        equal(splitter.object.max(firstPane), "200px");

        splitter.object.max(firstPane, "120px");

        equal(splitter.object.max(firstPane), "120px");
    });

    test("size(value) triggers resize", function() {
        var triggered = false;

        splitter = create({
            panes: [ { size: "110px" }, {} ]
        });

        splitter.object.bind("resize", function() {
            triggered = true;
        });

        splitter.object.size(".k-pane:first", "120px");

        ok(triggered);
    });

    test("ajaxRequest() with remote URL", function() {
        splitter = create({
            panes: [ {}, {} ]
        });

        var url = "http://google.com";

        splitter.object.ajaxRequest(".k-pane:first", url);

        var pane = splitter.dom.find(".k-pane:first"),
            iframe = pane.find("> iframe");

        equal(iframe.length, 1);
        equal(iframe.attr("src"), url);
        ok(!pane.hasClass("k-scrollable"));
    });

    test("collapsing uncollapsible panes is not permitted", function() {
        splitter = create({
            panes: [ { collapsible: false }, { collapsible: false }]
        });

        splitter.object.toggle(splitter.dom.find(".k-scrollable:first"), false);

        equal(splitter.dom.find(".k-pane:first").data("pane").collapsed, undefined);
    });

    test("ajaxRequest() applies selector context", function() {
        splitter = create({
            panes: [ {}, {} ]
        });

        splitter.object.ajaxRequest(".k-pane:first", "http://google.com");

        equal(splitter.dom.find("iframe").length, 1);
    });

    test("append() appends a pane element", function() {
        splitter = create({
            panes: [{}, {}]
        });

        splitter.object.append();

        equal(splitter.dom.children(".k-pane").length, 3);
    });

    test("append() returns the pane element", function() {
        splitter = create({
            panes: [{}, {}]
        });

        var result = splitter.object.append() || $();

        ok(result.is(splitter.dom.children(".k-pane").last()));
    });

    test("append() appends a pane configuration", function() {
        splitter = create({
            panes: [{}, {}]
        });

        var config = { foo: "bar" };

        splitter.object.append(config);

        var panes = splitter.object.options.panes;

        equal(panes[panes.length - 1], config);
    });

    test("append() calls Splitter resize(true)", function() {
        var args;

        splitter = create({
            panes: [{}, {}]
        });

        splitter.object.resize = function() {
            args = arguments;
        }

        splitter.object.append({});

        ok(args.length == 1 && args[0] === true);
    });

    test("insertBefore() inserts a pane element", function() {
        splitter = create({
            panes: [{}, {}]
        });

        var referencePane = splitter.dom.children(".k-pane").addClass("existing-pane").first();

        splitter.object.insertBefore({}, referencePane);

        equal(splitter.dom.children(".k-pane").length, 3);
        ok(!splitter.dom.children(".k-pane").first().hasClass("existing-pane"));
    });

    test("insertBefore() returns the pane element", function() {
        splitter = create({
            panes: [{}, {}]
        });

        var referencePane = splitter.dom.children(".k-pane").addClass("existing-pane").first();

        var result = splitter.object.insertBefore({}, referencePane) || $();

        ok(result.is(splitter.dom.children(".k-pane").first()));
    });

    test("insertBefore() inserts a pane configuration", function() {
        splitter = create({
            panes: [{}, {}]
        });

        var referencePane = splitter.dom.children(".k-pane").addClass("existing-pane").first(),
            config = { foo: "bar" };

        splitter.object.insertBefore(config, referencePane);

        equal(splitter.object.options.panes[0], config);
    });

    test("insertBefore() calls Splitter resize(true)", function() {
        var args;

        splitter = create({
            panes: [{}, {}]
        });

        var referencePane = splitter.dom.children(".k-pane").first();

        splitter.object.resize = function() {
            args = arguments;
        }

        splitter.object.insertBefore({}, referencePane);

        ok(args.length == 1 && args[0] === true);
    });

    test("insertAfter() inserts a pane element", function() {
        splitter = create({
            panes: [{}, {}]
        });

        var referencePane = splitter.dom.children(".k-pane").addClass("existing-pane").first();

        splitter.object.insertAfter({}, referencePane);

        equal(splitter.dom.children(".k-pane").length, 3);
        ok(!splitter.dom.children(".k-pane").eq(1).hasClass("existing-pane"));
    });

    test("insertAfter() returns the pane element", function() {
        splitter = create({
            panes: [{}, {}]
        });

        var referencePane = splitter.dom.children(".k-pane").addClass("existing-pane").first();

        var result = splitter.object.insertAfter({}, referencePane) || $();

        ok(result.is(splitter.dom.children(".k-pane").eq(1)));
    });

    test("insertAfter() inserts a pane configuration", function() {
        splitter = create({
            panes: [{}, {}]
        });

        var referencePane = splitter.dom.children(".k-pane").addClass("existing-pane").first(),
            config = { foo: "bar" };

        splitter.object.insertAfter(config, referencePane);

        equal(splitter.object.options.panes[1], config);
    });

    test("insertAfter() calls Splitter resize(true)", function() {
        var args;

        splitter = create({
            panes: [{}, {}]
        });

        var referencePane = splitter.dom.children(".k-pane").first();

        splitter.object.resize = function() {
            args = arguments;
        }

        splitter.object.insertAfter({}, referencePane);

        ok(args.length == 1 && args[0] === true);
    });

    test("remove() removes a pane element", function() {
        splitter = create({
            panes: [{}, {}, {}]
        }, 3);

        splitter.dom.children(".k-pane").eq(1).addClass("remaining-pane");

        splitter.object.remove(splitter.dom.children(".k-pane").not(".remaining-pane"));

        equal(splitter.dom.children(".k-pane").length, 1);
        ok(splitter.dom.children(".k-pane").first().hasClass("remaining-pane"));
    });

    test("remove() removes a pane configuration", function() {
        var config = { foo: "bar" };

        splitter = create({
            panes: [{}, config, {}]
        }, 3);

        splitter.dom.children(".k-pane").eq(1).addClass("remaining-pane");

        splitter.object.remove(splitter.dom.children(".k-pane").not(".remaining-pane"));

        var panes = splitter.object.options.panes;

        ok(panes[0] && typeof panes[0].foo != "undefined");
    });

    test("remove() returns the splitter object", function() {
        splitter = create({
            panes: [{}, {}]
        });

        var result = splitter.object.remove(splitter.dom.children(".k-pane").first());

        ok(result && result.options && result.options.name && result.options.name == "Splitter");
    });

    test("remove() calls Splitter resize(true)", function() {
        var args;

        splitter = create({
            panes: [{}, {}]
        });

        var referencePane = splitter.dom.children(".k-pane").first();

        splitter.object.resize = function() {
            args = arguments;
        }

        splitter.object.remove(referencePane);

        ok(args.length == 1 && args[0] === true);
    });

})();
