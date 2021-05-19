(function() {
    var container,
        Tooltip = kendo.ui.Tooltip;

    describe("kendo.ui.tooltip.ajax", function() {
        beforeEach(function() {
            $.mockjaxSettings.responseTime = 0;

            $.fn.press = function(key, ctrl, shift, alt) {
                return this.trigger({ type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift, altKey: alt });
            }

            container = $("<div style='margin:50px'/>").appendTo(Mocha.fixture);
        });

        afterEach(function() {

            if (container.data("kendoTooltip")) {
                container.kendoTooltip("destroy");
            }

            container.remove();
            $.mockjax.clear();
        });

        function triggerEvent(element, type, info) {
            element.trigger($.Event(type, info));

            return element;
        };

        it("ajax request is made when popup is shown", function(done) {
            $.mockjax({
                url: "foo/baz",
                response: function(request) {
                    assert.isOk(true);
                    done();
                }
            });

            var tooltip = new Tooltip(container, {
                content: {
                    url: "foo/baz"
                }
            });

            tooltip.show(container);
        });

        it("ajax request content is appended to popup element before it is opened", function(done) {
            $.mockjax({
                url: "foo/baz",
                response: function(request) {
                    assert.isOk(!tooltip.popup.visible());
                    done();
                }
            });

            var tooltip = new Tooltip(container, {
                content: {
                    url: "foo/baz"
                }
            });

            tooltip.show(container);
        });

        it("response is added to the content", function(done) {
            $.mockjax({
                url: "foo/baz",
                response: function() {
                    this.responseText = "foo";
                }
            });

            var tooltip = new Tooltip(container, {
                content: {
                    url: "foo/baz"
                },
                contentLoad: function() {
                    assert.equal(tooltip.content.text(), "foo");
                    done();
                }
            });

            tooltip.show(container);
        });

        it("error event is raised if request fails", function(done) {
            $.mockjax({
                url: "foo/baz",
                status: 500
            });

            var tooltip = new Tooltip(container, {
                content: {
                    url: "foo/baz"
                },
                error: function() {
                    assert.isOk(true);
                    done();
                }
            });

            tooltip.show(container);
        });

        it("local url does not create iframe", function() {
            $.mockjax({
                url: "foo/baz",
                status: 500
            });

            var tooltip = new Tooltip(container, {
                content: { url: "foo/baz" }
            });

            tooltip.show(container);

            assert.isOk(!tooltip.content.find("iframe").length);
        });

        it("a remote `content` creates iframe", function() {
            var tooltip = new Tooltip(container, {
                content: { url: "http://www.telerik.com/" }
            });

            tooltip.show(container);

            var iframe = tooltip.content.find("iframe");

            assert.equal(iframe.length, 1);
            assert.equal(iframe.attr("src"), "http://www.telerik.com/");
        });

        it("iframe is created if showIframe is set", function() {
            var tooltip = new Tooltip(container, {
                content: { url: "/foo/" },
                iframe: true
            });

            tooltip.show(container);

            assert.isOk(tooltip.content.find("iframe").length);
        });

        it("requestStart is triggered", function(done) {
            $.mockjax({
                url: "foo/baz"
            });

            var tooltip = new Tooltip(container, {
                content: {
                    url: "foo/baz"
                },
                requestStart: function() {
                    assert.isOk(true);
                    done();
                }
            });

            tooltip.show(container);
        });

        it("requestStart add request data if such does not exist", function(done) {
            $.mockjax({
                url: "foo/baz",
                response: function(settings) {
                    assert.equal(settings.data.bar, "foo");
                    done();
                }
            });

            var tooltip = new Tooltip(container, {
                content: {
                    url: "foo/baz"
                },
                requestStart: function(e) {
                    e.options.data = {
                        bar: "foo"
                    }
                }
            });

            tooltip.show(container);
        });

        it("requestStart updates request data", function(done) {
            $.mockjax({
                url: "foo/baz",
                response: function(settings) {
                    assert.equal(settings.data.bar, "foo");
                    done();
                }
            });

            var tooltip = new Tooltip(container, {
                content: {
                    url: "foo/baz",
                    data: {
                        bar: "boo"
                    }
                },
                requestStart: function(e) {
                    e.options.data.bar = "foo"
                }
            });

            tooltip.show(container);
        });

        it("target is passed to the requestStart", function(done) {
            $.mockjax({
                url: "foo/baz"
            });

            var tooltip = new Tooltip(container, {
                content: {
                    url: "foo/baz"
                },
                requestStart: function(e) {
                    assert.equal(e.target, container);
                    done();
                }
            });

            tooltip.show(container);
        });

        it("refresh issue an ajax request", function(done) {
            $.mockjax({
                url: "foo/baz"
            });

            var tooltip = new Tooltip(container, {
                content: {
                    url: "foo/baz"
                }
            });

            tooltip.show(container);

            tooltip.bind("requestStart", function() {
                assert.isOk(true);
                done();
            });

            tooltip.refresh();
        });

        it("refresh the content", function() {
            var tooltip = new Tooltip(container, {
                content: function() {
                    assert.isOk(true);
                }
            });

            tooltip.show(container);

            tooltip.refresh();
        });

        it("refresh does not refresh the content if popup is not created", function() {
            var tooltip = new Tooltip(container, {
                content: function() {
                    assert.isOk(true);
                }
            });

            tooltip.refresh();
        });
    });
}());
