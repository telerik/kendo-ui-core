(function() {
    var splitter;
    var existingUrl = "foo";
    var notExistingUrl = "bar";
    var create = SplitterHelpers.create;

    module("splitter events", {
        setup: function() {
            $.mockjaxSettings.responseTime = 0;
            $.mockjaxSettings.contentType = "text/html";
            $.mockjax({ url: existingUrl, responseText: "foobar" });
            $.mockjax({ url: notExistingUrl, status: 404 });
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("initialization triggers resize", 1, function() {
        create({
            resize: function() {
                ok(true);
            }
        });
    });

    test("window resizing triggers resize", function() {
        var triggered;
        splitter = create();

        splitter.object.bind("resize", function() {
            triggered = true;
        });

        splitter.dom.css({ width: 100, height: 100 });

        $(window).resize();

        ok(triggered);
    });

    test("window resizing triggers resize to outer splitter and nested splitter", function () {
        var triggered1,
            triggered2;
            splitter = create();

        splitter.object.bind("resize", function () {
            triggered1 = true;
        });

        splitter.dom.children(".k-pane").eq(0).append("<div id='splitter2'><div>pane foo</div></div>").find("#splitter2").kendoSplitter({
            panes: [{}],
            resize: function () {
                triggered2 = true;
            }
        });

        splitter.dom.css({ width: 100, height: 100 });

        $(window).resize();

        ok(triggered1);
    });

    test("layoutChange is triggered after resize", function() {
        var triggered;
        splitter = create();

        splitter.object.bind("layoutChange", function() {
            triggered = true;
        });

        splitter.dom.css({ width: 100, height: 100 });

        splitter.object.resize();

        ok(triggered);
    });

    asyncTest("successful AJAX requests trigger contentLoad event", 1, function() {
        splitter = create({
                contentLoad: function(e) {
                    start();
                    equal(e.pane, splitter.dom.find(".k-pane:first")[0]);
                }
            });

        splitter.object.ajaxRequest(".k-pane:first", existingUrl);
    });

    asyncTest("unsuccessful AJAX requests trigger error event", 2, function() {
        splitter = create({
                error: function(e) {
                    start();
                    equal(e.xhr.status, 404);
                    equal(e.pane, splitter.dom.find(".k-pane:first")[0]);
                }
            });

        splitter.object.ajaxRequest(".k-pane:first", notExistingUrl);
    });
})();
