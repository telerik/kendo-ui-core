(function() {
    module("initialization", {
        setup: function() {
            kendo.effects.disable();
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
                responseText: "foo bar baz",
            });
        },
        teardown: function() {
            QUnit.fixture.closest("body").find(".k-window-content").each(function(idx, element){
                $(element).data("kendoWindow").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
            $.mockjax.clear();
            kendo.effects.enable();
        }
    });

    function createWindow(options, element) {
        element = element || $("<div class='wnd' />").appendTo(QUnit.fixture);
        return element.kendoWindow(options).data("kendoWindow");
    }

    test("Window adds role to the element", function() {
        var window = createWindow({ title: "Test" }, $("<div id='window' />"));

        equal(window.element.attr("role"), "dialog");
    });

    test("Window sets id to the title", function() {
        var window = createWindow({ title: "Test" }, $("<div id='window' />"));

        equal(window.wrapper.find("#window_wnd_title").html(), "Test");
    });

    test("Window adds aria-labelledby", function() {
        var window = createWindow({ title: "Test" }, $("<div id='window' />"));

        equal(window.element.attr("aria-labelledby"), "window_wnd_title");
    });

    test("Window adds role button to the titlebar buttons", function() {
        var window = createWindow({ title: "Test", visible:true  }, $("<div id='window'>Content</div>"));
        equal(window.wrapper.find(".k-window-action").attr("role"), "button");
    });
})();
