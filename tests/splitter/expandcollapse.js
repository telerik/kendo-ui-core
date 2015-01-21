(function() {
    var splitter;
    var create = SplitterHelpers.create;

    module("splitter collapse", SplitterHelpers.basicModule);

    test("clicking collapse arrow triggers collapse event", function() {
        var triggered = false;

        splitter = create({
            panes: [ { collapsible: true }, {} ],
            collapse: function(e) {
                triggered = e;
            }
        });

        splitter.dom.find(".k-collapse-prev").trigger("click");

        ok(triggered);
        equal(triggered.pane, splitter.dom.find(".k-pane:first")[0]);
    });

    test("collapse event can be prevented", function() {
        splitter = create({
            panes: [ { collapsible: true }, {} ],
            collapse: function(e) {
                e.preventDefault();
            }
        });

        splitter.dom.find(".k-collapse-prev").trigger("click");

        ok(!splitter.dom.find(".k-pane:first").data("pane").collapsed);
    });

    test("clicking collapse arrow calls splitter.collapse", function() {
        var called;

        splitter = create({
            panes: [ { collapsible: true }, {} ]
        });

        splitter.object.collapse = function(pane) {
            called = pane;
        };

        splitter.dom.find(".k-collapse-prev").trigger("click");

        equal(called, splitter.dom.find(".k-pane:first")[0]);
    });

    test("double-clicking splitbar next to an expanded collapsible pane should call splitter.collapse", function() {
        var called;

        splitter = create({
            panes: [ { collapsible: true }, {} ]
        });

        splitter.object.collapse = function(pane) {
            called = pane;
        };

        splitter.dom.find(".k-splitbar").trigger("dblclick");

        equal(called, splitter.dom.find(".k-pane:first")[0]);
    });

    test("double-clicking splitbar prev to an expanded collapsible pane should call splitter.collapse", function() {
        var called;

        splitter = create({
            panes: [ {}, { collapsible: true } ]
        });

        splitter.object.collapse = function(pane) {
            called = pane;
        };

        splitter.dom.find(".k-splitbar").trigger("dblclick");

        equal(called, splitter.dom.find(".k-pane:last")[0]);
    });


    module("splitter expand", SplitterHelpers.basicModule);

    test("clicking expand arrow triggers expand event", function() {
        var triggered = false;

        splitter = create({
            panes: [ { collapsible: true, collapsed: true }, {} ],
            expand: function(e) {
                triggered = e;
            }
        });

        splitter.dom.find(".k-expand-prev").trigger("click");

        ok(triggered);
        equal(triggered.pane, splitter.dom.find(".k-pane:first")[0]);
    });

    test("expand event can be prevented", function() {
        splitter = create({
            panes: [ { collapsible: true, collapsed: true }, {} ],
            expand: function(e) {
                e.preventDefault();
            }
        });

        splitter.dom.find(".k-expand-prev").trigger("click");

        ok(splitter.dom.find(".k-pane:first").data("pane").collapsed);
    });

    test("clicking expand arrow calls splitter.expand", function() {
        var called;
        splitter = create({
            panes: [ { collapsible: true, collapsed: true }, {} ]
        });

        splitter.object.expand = function(pane) {
            called = pane;
        };

        splitter.dom.find(".k-expand-prev").trigger("click");

        equal(called, splitter.dom.find(".k-pane:first")[0]);
    });

    test("double-clicking splitbar next to an collapsed collapsible pane should call splitter.collapse", function() {
        var called;
        splitter = create({
            panes: [ { collapsible: true, collapsed: true }, {} ]
        });

        splitter.object.expand = function(pane) {
            called = pane;
        };

        splitter.dom.find(".k-splitbar").trigger("dblclick");

        equal(called, splitter.dom.find(".k-pane:first")[0]);
    });

    test("double-clicking splitbar prev to an collapsed collapsible pane should call splitter.collapse", function() {
        var called;

        splitter = create({
            panes: [ { }, { collapsible: true, collapsed: true } ]
        });

        splitter.object.expand = function(pane) {
            called = pane;
        };

        splitter.dom.find(".k-splitbar").trigger("dblclick");

        equal(called, splitter.dom.find(".k-pane:last")[0]);
    });

    test("double-clicking splitbar between two collapsible panes does not trigger collapse", function() {
        var called;
        splitter = create({
            panes: [ { collapsible: true }, { collapsible: true } ]
        });

        splitter.object.collapse = function(pane) {
            called = pane;
        }

        splitter.dom.find(".k-splitbar").trigger("dblclick");

        ok(!called);
    });

    test("expanding a non-resizable pane does not make it resizable", function() {
        splitter = create({
            panes: [
                { resizable: false, collapsible: true, collapsed: true },
                { collapsible: false }
            ]
        });

        splitter.object.expand(".k-pane:first");

        ok(splitter.dom.find(".k-splitbar").is(":not(.k-splitbar-draggable-horizontal)"))
    });

    test("expanding a non-resizable pane does not modify more splitbars than necessary", function() {
        splitter = create({
            panes: [
                { resizable: false, collapsible: true, collapsed: true },
                { collapsible: false },
                { collapsible: false }
            ]
        }, 3);

        splitter.object.expand(".k-pane:first");

        ok(splitter.dom.find(".k-splitbar:first").is(":not(.k-splitbar-draggable-horizontal)"));
        ok(splitter.dom.find(".k-splitbar:last").is(".k-splitbar-draggable-horizontal"));
    });

    test("initially collapsed pane has an overflow:hidden style", function() {
        splitter = create({
            panes: [
                { collapsed: true },
                { collapsed: false },
                { collapsed: false }
            ]
        }, 3);

        equal(splitter.dom.find(".k-pane:first").css("overflow"), "hidden");
    });

    test("expanding a previously collapsed pane removes its overflow:hidden style", function() {
        splitter = create({
            panes: [
                { collapsed: false },
                { collapsed: false },
                { collapsed: false }
            ]
        }, 3);

        splitter.object.collapse(".k-pane:first");
        splitter.object.expand(".k-pane:first");

        equal(splitter.dom.find(".k-pane:first").css("overflow"), "auto");
    });

    test("collapsing pane disables collapsing of next pane", function() {
        splitter = create({
            panes: [ { collapsible: true }, { collapsible: true } ]
        });

        splitter.object.collapse(".k-pane:first");

        ok(splitter.dom.find(".k-splitbar").is(":not(.k-splitbar-draggable-horizontal)"));
        ok(!splitter.dom.find(".k-splitbar .k-collapse-next").length);
    });

    test("collapsing pane disables collapsing of previous pane", function() {
        splitter = create({
            panes: [ { collapsible: true }, { collapsible: true } ]
        });

        splitter.object.collapse(".k-pane:last");

        ok(splitter.dom.find(".k-splitbar").is(":not(.k-splitbar-draggable-horizontal)"));
        ok(!splitter.dom.find(".k-splitbar .k-collapse-prev").length);
    });

    test("collapsing the last fluid pane distributes remaining size to neighbour pane", function() {
        splitter = create({
            panes: [
                { collapsible: true, size: "50px" },
                { collapsible: true }
            ]
        });

        splitter.object.collapse(".k-pane:last");

        equal(splitter.dom.find(".k-pane:first").width(), splitter.dom.width() - 7);
        equal(splitter.dom.find(".k-splitbar:first")[0].offsetLeft, splitter.dom.width() - 7);
    });

    test("collapsing the last fluid pane in vertical splitter distributes remaining size to neighbour pane", function() {
        splitter = create({
            orientation: "vertical",
            panes: [
                { collapsible: true, size: "50px" },
                { collapsible: true }
            ]
        });

        splitter.object.collapse(".k-pane:last");

        equal(splitter.dom.find(".k-pane:first").height(), splitter.dom.height() - 7);
        equal(splitter.dom.find(".k-splitbar:first")[0].offsetTop, splitter.dom.height() - 7);
    });

    test("collapsing a pane adds an overflow:hidden style to it", function() {
        splitter = create({
            panes: [
                { collapsible: true },
                { collapsible: true }
            ]
        });

        splitter.object.collapse(".k-pane:first");

        equal(splitter.dom.find(".k-pane:first").css("overflow"), "hidden");
    });

    test("collapsing pane does not add overlay to frames", function() {
        $.mockjax({
            url: "http://foo",
            responseText: "foo"
        });

        splitter = create({
            panes: [
                { collapsible: true },
                { contentUrl: "http://foo" }
            ]
        });

        splitter.dom.find(".k-collapse-prev")
            .trigger("mousedown")
            .trigger("mouseup")
            .trigger("click");

        equal(splitter.dom.find(".k-overlay").length, 0);
    });

    test("test name", function() {
        splitter = create({
            panes: [ { collapsible: true }, {} ]
        });

        splitter.dom.find(".k-collapse-prev")
            .trigger("mousedown")

        splitter.dom.find(".k-overlay:first")
            .trigger("mouseup")
            .trigger("click");

        equal(splitter.dom.find(".k-overlay").length, 0);
    });

    test("collapsed panes can be expanded again", function() {
        splitter = create({
            panes: [
                { collapsible: true },
                {}
            ]
        });

        splitter.dom.find(".k-collapse-prev").click();

        splitter.dom.find(".k-expand-prev").click();

        equal(splitter.dom.find(".k-pane:first").width(), 100);
    });

    test("panes can be collapsed after resizing", function() {
        splitter = create({
            panes: [ { collapsible: true }, {} ]
        });

        var keys = kendo.keys,
            splitbar = splitter.dom.find(".k-splitbar"),
            initialLeft = splitbar.position().left;

        splitbar.focus().press({
            keyCode: keys.LEFT
        });

        splitbar.focus().press({
            keyCode: keys.ENTER
        });

        splitbar.find(".k-collapse-prev").click();

        equal(splitter.dom.find(".k-pane:first").width(), 0);
    });

    test("collapsible pane with collapsedSize collapses to this size", function() {
        splitter = create({
            panes: [
                { collapsible: true, collapsedSize: "20px" },
                {}
            ]
        });

        splitter.dom.find(".k-collapse-prev").click();

        equal(splitter.dom.find(".k-pane:first").width(), 20);
    });

    test("collapsed pane with collapsedSize is rendered with this size", function() {
        splitter = create({
            panes: [
                { collapsible: true, collapsed: true, collapsedSize: "20px" },
                {}
            ]
        });

        equal(splitter.dom.find(".k-pane:first").width(), 20);
    });

    test("collapsible pane adds k-state-collapsed class when collapsed", function() {
        splitter = create({
            panes: [
                { collapsible: true },
                {}
            ]
        });

        splitter.dom.find(".k-collapse-prev").click();

        ok(splitter.dom.find(".k-pane:first").hasClass("k-state-collapsed"));
    });

})();
