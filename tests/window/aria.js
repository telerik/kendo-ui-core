(function() {
    function createWindow(options, element) {
        element = element || $("<div class='wnd' />").appendTo(Mocha.fixture);
        return element.kendoWindow(options).data("kendoWindow");
    }

    describe("Window WAI-ARIA with AXE", function () {
        afterEach(function() {
            Mocha.fixture
                .closest("body")
                .find(".k-window-content")
                .each(function(idx, element) {
                    $(element)
                        .data("kendoWindow")
                        .destroy();
                });
            Mocha.fixture
                .closest("body")
                .find(".k-overlay")
                .remove();
        });

        it("Window is accessible", function(done) {
            var wnd = createWindow(
                { title: "Test" },
                $("<div id='window' />")
            );

            axeRun(wnd.element.parent(), done);
        });

        it("Window with all tools is accessible", function(done) {
            var wnd = createWindow(
                {
                    title: "Test",
                    actions: [ "Close", "Refresh", "Minimize", "Maximize", "Pin" ]
                },
                $("<div id='window' />")
            );

            axeRun(wnd.element.parent(), done);
        });

        it("modal Window is accessible", function(done) {
            var wnd = createWindow(
                {
                    title: "Test",
                    modal: true
                },
                $("<div id='window' />")
            );

            axeRun(wnd.element.parent(), done);
        });
    });

    describe("initialization", function() {
        beforeEach(function() {
            var Window = kendo.ui.Window;
            $.mockjax({
                url: "echo",
                responseTime: 0,
                response: function(request) {
                    this.contentType = "text/json";
                    this.responseText = request.data;
                }
            });
            $.mockjax({
                url: /foo|telerik\.com/i,
                responseText: "foo bar baz"
            });
        });
        afterEach(function() {
            Mocha.fixture
                .closest("body")
                .find(".k-window-content")
                .each(function(idx, element) {
                    $(element)
                        .data("kendoWindow")
                        .destroy();
                });
            Mocha.fixture
                .closest("body")
                .find(".k-overlay")
                .remove();
            $.mockjax.clear();
        });

        it("Window adds role to the element", function() {
            var wnd = createWindow(
                { title: "Test" },
                $("<div id='window' />")
            );

            assert.equal(wnd.element.attr("role"), "dialog");
        });

        it("Window sets id to the title", function() {
            var wnd = createWindow(
                { title: "Test" },
                $("<div id='window' />")
            );

            assert.equal(
                wnd.wrapper.find("#window_wnd_title").html(),
                "Test"
            );
        });

        it("Window adds aria-labelledby", function() {
            var wnd = createWindow(
                { title: "Test" },
                $("<div id='window' />")
            );

            assert.equal(
                wnd.element.attr("aria-labelledby"),
                "window_wnd_title"
            );
        });

        it("Window adds role button to the titlebar buttons", function() {
            var wnd = createWindow(
                { title: "Test", visible: true },
                $("<div id='window'>Content</div>")
            );
            assert.equal(
                wnd.wrapper.find(".k-window-action").attr("role"),
                "button"
            );
        });
    });
})();
