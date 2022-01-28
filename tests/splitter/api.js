(function() {
    var splitter;
    var create = SplitterHelpers.create;

    describe("splitter api", function() {
        beforeEach(SplitterHelpers.basicModule.setup);
        afterEach(SplitterHelpers.basicModule.teardown);

        it("toggle(false) toggles pane state", function() {
            splitter = create({
                panes: [{ collapsible: true }, {}]
            });

            var pane = splitter.dom.find(".k-pane:first");

            splitter.object.toggle(pane, false);

            assert.isOk(pane.data("pane").collapsed);

            splitter = create({
                panes: [{}, { collapsible: true }]
            });

            pane = splitter.dom.find(".k-pane:last")

            splitter.object.toggle(pane, false);

            assert.isOk(pane.data("pane").collapsed);
        });

        it("toggle(false) triggers resize", function() {
            var triggered = false;

            splitter = create({
                panes: [{ collapsible: true }, {}],
                resize: function() {
                    triggered = true;
                }
            });

            splitter.object.toggle(".k-pane:last", false);

            assert.isOk(triggered);
        });

        it("toggle(false) converts associated arrow to expand arrow", function() {
            splitter = create({
                panes: [{ collapsible: true }, {}]
            });

            splitter.object.toggle(".k-pane:first", false);

            var previousArrow = splitter.dom.find(".k-expand-prev");

            assert.isOk(previousArrow.is(".k-expand-prev"));
            assert.isOk(previousArrow.is(":not(.k-collapse-prev)"));
        });

        it("toggle(false) disables splitbar resize", function() {
            splitter = create({
                panes: [{ collapsible: true }, {}]
            });

            splitter.object.toggle(".k-pane:first", false);

            assert.isOk(!splitter.dom.find(".k-splitbar").hasClass("k-splitbar-draggable-horizontal"));
        });

        it("toggle(true) removes splibar hover style", function() {
            splitter = create({
                panes: [{ collapsible: true, collapsed: true }, {}]
            });

            splitter.dom.find(".k-splitbar").addClass("k-splitbar-horizontal-hover");

            splitter.object.toggle(".k-pane:first", false);

            assert.isOk(!splitter.dom.find(".k-splitbar").hasClass("k-splitbar-horizontal-hover"));
        });

        it("toggle(true) toggles pane state", function() {
            splitter = create({
                panes: [{ collapsible: true, collapsed: true }, {}]
            });

            var pane = splitter.dom.find(".k-pane:first");

            splitter.object.toggle(pane, true);

            assert.isOk(!pane.data("pane").collapsed);

            splitter = create({
                panes: [{}, { collapsible: true, collapsed: true }]
            });

            pane = splitter.dom.find(".k-pane:last")

            splitter.object.toggle(pane, true);

            assert.isOk(!pane.data("pane").collapsed);
        });

        it("toggle(true) triggers resize", function() {
            var triggered = false;

            splitter = create({
                panes: [{ collapsible: true, collapsed: true }, {}],
                resize: function() {
                    triggered = true;
                }
            });

            splitter.object.toggle(".k-pane:first", true);

            assert.isOk(triggered);
        });

        it("toggle(true) converts associated arrow to collapse arrow", function() {
            splitter = create({
                panes: [{ collapsible: true, collapsed: true }, {}]
            });

            splitter.object.toggle(".k-pane:first", true);

            var previousArrow = splitter.dom.find(".k-collapse-prev");

            assert.isOk(previousArrow.is(".k-collapse-prev"));
            assert.isOk(previousArrow.is(":not(.k-expand-prev)"));
        });

        it("toggle(true) enables splitbar resize", function() {
            splitter = create({
                panes: [{ collapsible: true, collapsed: true }, {}]
            });

            splitter.object.toggle(".k-pane:first", true);

            assert.isOk(splitter.dom.find(".k-splitbar").hasClass("k-splitbar-draggable-horizontal"));
        });

        it("toggle(true) does not add splibar hover style", function() {
            splitter = create({
                panes: [{ collapsible: true, collapsed: true }, {}]
            });

            splitter.object.toggle(".k-pane:first", true);

            assert.isOk(!splitter.dom.find(".k-splitbar").hasClass("k-splitbar-horizontal-hover"));
        });

        it("toggle() applies selector context", function() {
            splitter = create({
                panes: [{ collapsible: true }, {}]
            });

            splitter = create({
                panes: [{ collapsible: true }, {}]
            });

            splitter.object.toggle(".k-pane:first", false);

            assert.isOk(splitter.dom.find(".k-pane:first").data("pane").collapsed);
        });

        it("collapse() calls toggle(false)", function() {
            var args;

            splitter = create({
                panes: [{ collapsible: true }, {}]
            });

            splitter.object.toggle = function() {
                args = arguments;
            };

            splitter.object.collapse(".k-pane:last");

            assert.isOk(args);
            assert.equal(args.length, 2);
            assert.equal(args[0], ".k-pane:last");
            assert.equal(args[1], false);
        });

        it("expand() calls toggle(true)", function() {
            var args;

            splitter = create({
                panes: [{ collapsible: true }, {}]
            });

            splitter.object.toggle = function() {
                args = arguments;
            };

            splitter.object.expand(".k-pane:last");

            assert.isOk(args);
            assert.equal(args.length, 2);
            assert.equal(args[0], ".k-pane:last");
            assert.equal(args[1], true);
        });

        it("size() gets/sets pane size", function() {
            splitter = create({
                panes: [{ size: "110px" }, {}]
            });

            var firstPane = splitter.dom.find(".k-pane:first");

            assert.equal(splitter.object.size(firstPane), "110px");

            splitter.object.size(firstPane, "120px");

            assert.equal(splitter.object.size(firstPane), "120px");
        });

        it("size() applies selector context", function() {
            splitter = create({
                panes: [{ size: "125px" }, {}]
            });

            splitter = create({
                panes: [{ size: "110px" }, {}]
            });

            assert.equal(splitter.object.size(".k-pane:first"), "110px");
        });

        it("min() gets/sets pane min", function() {
            splitter = create({
                panes: [{ min: "110px", size: "200px" }, {}]
            });

            var firstPane = splitter.dom.find(".k-pane:first");

            assert.equal(splitter.object.min(firstPane), "110px");

            splitter.object.min(firstPane, "120px");

            assert.equal(splitter.object.min(firstPane), "120px");
        });

        it("max() gets/sets pane max", function() {
            splitter = create({
                panes: [{ max: "200px", size: "110px" }, {}]
            });

            var firstPane = splitter.dom.find(".k-pane:first");

            assert.equal(splitter.object.max(firstPane), "200px");

            splitter.object.max(firstPane, "120px");

            assert.equal(splitter.object.max(firstPane), "120px");
        });

        it("size(value) triggers resize", function() {
            var triggered = false;

            splitter = create({
                panes: [{ size: "110px" }, {}]
            });

            splitter.object.bind("resize", function() {
                triggered = true;
            });

            splitter.object.size(".k-pane:first", "120px");

            assert.isOk(triggered);
        });

        it("ajaxRequest() with remote URL", function() {
            splitter = create({
                panes: [{}, {}]
            });

            var url = "http://google.com";

            splitter.object.ajaxRequest(".k-pane:first", url);

            var pane = splitter.dom.find(".k-pane:first"),
                iframe = pane.find("> iframe");

            assert.equal(iframe.length, 1);
            assert.equal(iframe.attr("src"), url);
            assert.isOk(!pane.hasClass("k-scrollable"));
        });

        it("collapsing uncollapsible panes is not permitted", function() {
            splitter = create({
                panes: [{ collapsible: false }, { collapsible: false }]
            });

            splitter.object.toggle(splitter.dom.find(".k-scrollable:first"), false);

            assert.equal(splitter.dom.find(".k-pane:first").data("pane").collapsed, undefined);
        });

        it("ajaxRequest() applies selector context", function() {
            splitter = create({
                panes: [{}, {}]
            });

            splitter.object.ajaxRequest(".k-pane:first", "http://google.com");

            assert.equal(splitter.dom.find("iframe").length, 1);
        });

        it("append() appends a pane element", function() {
            splitter = create({
                panes: [{}, {}]
            });

            splitter.object.append();

            assert.equal(splitter.dom.children(".k-pane").length, 3);
        });

        it("append() returns the pane element", function() {
            splitter = create({
                panes: [{}, {}]
            });

            var result = splitter.object.append() || $();

            assert.isOk(result.is(splitter.dom.children(".k-pane").last()));
        });

        it("append() appends a pane configuration", function() {
            splitter = create({
                panes: [{}, {}]
            });

            var config = { foo: "bar" };

            splitter.object.append(config);

            var panes = splitter.object.options.panes;

            assert.equal(panes[panes.length - 1], config);
        });

        it("append() calls Splitter resize(true)", function() {
            var args;

            splitter = create({
                panes: [{}, {}]
            });

            splitter.object.resize = function() {
                args = arguments;
            }

            splitter.object.append({});

            assert.isOk(args.length == 1 && args[0] === true);
        });

        it("insertBefore() inserts a pane element", function() {
            splitter = create({
                panes: [{}, {}]
            });

            var referencePane = splitter.dom.children(".k-pane").addClass("existing-pane").first();

            splitter.object.insertBefore({}, referencePane);

            assert.equal(splitter.dom.children(".k-pane").length, 3);
            assert.isOk(!splitter.dom.children(".k-pane").first().hasClass("existing-pane"));
        });

        it("insertBefore() returns the pane element", function() {
            splitter = create({
                panes: [{}, {}]
            });

            var referencePane = splitter.dom.children(".k-pane").addClass("existing-pane").first();

            var result = splitter.object.insertBefore({}, referencePane) || $();

            assert.isOk(result.is(splitter.dom.children(".k-pane").first()));
        });

        it("insertBefore() inserts a pane configuration", function() {
            splitter = create({
                panes: [{}, {}]
            });

            var referencePane = splitter.dom.children(".k-pane").addClass("existing-pane").first(),
                config = { foo: "bar" };

            splitter.object.insertBefore(config, referencePane);

            assert.equal(splitter.object.options.panes[0], config);
        });

        it("insertBefore() calls Splitter resize(true)", function() {
            var args;

            splitter = create({
                panes: [{}, {}]
            });

            var referencePane = splitter.dom.children(".k-pane").first();

            splitter.object.resize = function() {
                args = arguments;
            }

            splitter.object.insertBefore({}, referencePane);

            assert.isOk(args.length == 1 && args[0] === true);
        });

        it("insertAfter() inserts a pane element", function() {
            splitter = create({
                panes: [{}, {}]
            });

            var referencePane = splitter.dom.children(".k-pane").addClass("existing-pane").first();

            splitter.object.insertAfter({}, referencePane);

            assert.equal(splitter.dom.children(".k-pane").length, 3);
            assert.isOk(!splitter.dom.children(".k-pane").eq(1).hasClass("existing-pane"));
        });

        it("insertAfter() returns the pane element", function() {
            splitter = create({
                panes: [{}, {}]
            });

            var referencePane = splitter.dom.children(".k-pane").addClass("existing-pane").first();

            var result = splitter.object.insertAfter({}, referencePane) || $();

            assert.isOk(result.is(splitter.dom.children(".k-pane").eq(1)));
        });

        it("insertAfter() inserts a pane configuration", function() {
            splitter = create({
                panes: [{}, {}]
            });

            var referencePane = splitter.dom.children(".k-pane").addClass("existing-pane").first(),
                config = { foo: "bar" };

            splitter.object.insertAfter(config, referencePane);

            assert.equal(splitter.object.options.panes[1], config);
        });

        it("insertAfter() calls Splitter resize(true)", function() {
            var args;

            splitter = create({
                panes: [{}, {}]
            });

            var referencePane = splitter.dom.children(".k-pane").first();

            splitter.object.resize = function() {
                args = arguments;
            }

            splitter.object.insertAfter({}, referencePane);

            assert.isOk(args.length == 1 && args[0] === true);
        });

        it("remove() removes a pane element", function() {
            splitter = create({
                panes: [{}, {}, {}]
            }, 3);

            splitter.dom.children(".k-pane").eq(1).addClass("remaining-pane");

            splitter.object.remove(splitter.dom.children(".k-pane").not(".remaining-pane"));

            assert.equal(splitter.dom.children(".k-pane").length, 1);
            assert.isOk(splitter.dom.children(".k-pane").first().hasClass("remaining-pane"));
        });

        it("remove() removes a pane configuration", function() {
            var config = { foo: "bar" };

            splitter = create({
                panes: [{}, config, {}]
            }, 3);

            splitter.dom.children(".k-pane").eq(1).addClass("remaining-pane");

            splitter.object.remove(splitter.dom.children(".k-pane").not(".remaining-pane"));

            var panes = splitter.object.options.panes;

            assert.isOk(panes[0] && typeof panes[0].foo != "undefined");
        });

        it("remove() returns the splitter object", function() {
            splitter = create({
                panes: [{}, {}]
            });

            var result = splitter.object.remove(splitter.dom.children(".k-pane").first());

            assert.isOk(result && result.options && result.options.name && result.options.name == "Splitter");
        });

        it("remove() calls Splitter resize(true)", function() {
            var args;

            splitter = create({
                panes: [{}, {}]
            });

            var referencePane = splitter.dom.children(".k-pane").first();

            splitter.object.resize = function() {
                args = arguments;
            }

            splitter.object.remove(referencePane);

            assert.isOk(args.length == 1 && args[0] === true);
        });

        it("remove() removes a pane element only from the current instance", function() {
            var splitter = create({
                panes: [{}, {}, {}]
            }, 3);

            var splitter2 = create({
                panes: [{}, {}]
            }, 2);

            splitter.object.remove(splitter.dom.children(".k-pane:first"));

            assert.equal(splitter.dom.children(".k-pane").length, 2);
            assert.equal(splitter2.dom.children(".k-pane").length, 2);
        });

    });
}());
