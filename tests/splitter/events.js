(function() {
    var splitter;
    var existingUrl = "foo";
    var notExistingUrl = "bar";
    var create = SplitterHelpers.create;

    describe("splitter events", function() {
        beforeEach(function() {
            $.mockjaxSettings.responseTime = 0;
            $.mockjaxSettings.contentType = "text/html";
            $.mockjax({ url: existingUrl, responseText: "foobar" });
            $.mockjax({ url: notExistingUrl, status: 404 });
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("initialization triggers resize", function() {
            create({
                resize: function() {
                    assert.isOk(true);
                }
            });
        });

        it("window resizing triggers resize", function() {
            var triggered;
            splitter = create();

            splitter.object.bind("resize", function() {
                triggered = true;
            });

            splitter.dom.css({ width: 100, height: 100 });

            $(window).resize();

            assert.isOk(triggered);
        });

        it("window resizing triggers resize to outer splitter and nested splitter", function() {
            var triggered1,
                triggered2;
            splitter = create();

            splitter.object.bind("resize", function() {
                triggered1 = true;
            });

            splitter.dom.children(".k-pane").eq(0).append("<div id='splitter2'><div>pane foo</div></div>").find("#splitter2").kendoSplitter({
                panes: [{}],
                resize: function() {
                    triggered2 = true;
                }
            });

            splitter.dom.css({ width: 100, height: 100 });

            $(window).resize();

            assert.isOk(triggered1);
        });

        it("layoutChange is triggered after resize", function() {
            var triggered;
            splitter = create();

            splitter.object.bind("layoutChange", function() {
                triggered = true;
            });

            splitter.dom.css({ width: 100, height: 100 });

            splitter.object.resize();

            assert.isOk(triggered);
        });

        it("successful AJAX requests trigger contentLoad event", function(done) {
            splitter = create({
                contentLoad: function(e) {
                    assert.equal(e.pane, splitter.dom.find(".k-pane:first")[0]);
                    done();
                }
            });

            splitter.object.ajaxRequest(".k-pane:first", existingUrl);
        });

        it("unsuccessful AJAX requests trigger error event", function(done) {
            splitter = create({
                error: function(e) {
                    assert.equal(e.xhr.status, 404);
                    assert.equal(e.pane, splitter.dom.find(".k-pane:first")[0]);
                    done();
                }
            });

            splitter.object.ajaxRequest(".k-pane:first", notExistingUrl);
        });
    });
}());
