(function() {
    module("initialization", {
        setup: function() {
            //
        },
        teardown: function() {
            QUnit.fixture.closest("body").find(".dialog").each(function(idx, element) {
                $(element).data("kendoDialog").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
        }
    });

    var KICONCLOSE = ".k-i-close";

    function createDialog(options, element) {
        element = element || $("<div class='dialog'>dialog content</div>").appendTo(QUnit.fixture);
        return element.kendoDialog(options).data("kendoDialog");
    }

    test("title click on close icon calls close event", function() {
        var dialog = createDialog({
            close: function() { ok(true); }
        });

        dialog.wrapper.find(KICONCLOSE).click();
    });

    var keys;
    module("keyboard support", {
        setup: function() {
            keys = kendo.keys;

            $.fn.press = function(key, options) {
                return this.trigger($.extend({ type: "keydown", keyCode: key }, options));
            };
        },
        teardown: function() {
            QUnit.fixture.closest("body").find(".dialog").each(function(idx, element) {
                $(element).data("kendoDialog").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
        }
    });

    test("escape key triggers close event", function() {
        var dialog = createDialog({
            close: function() { ok(true); }
        });

        dialog.element.press(keys.ESC);
    });

})();
