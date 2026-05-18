import '@progress/kendo-ui/src/kendo.window.js';

function createWindow(options, element) {
    element = element || $("<div class='wnd' />").appendTo(Mocha.fixture);
    return element.kendoWindow(options).data("kendoWindow");
}

describe("window xs button size", function() {
    afterEach(function() {
        Mocha.fixture.closest("body").find(".wnd").each(function(idx, element) {
            let wnd = $(element).data("kendoWindow");
            if (wnd) {
                wnd.destroy();
            }
        });
    });

    it("close button has k-button-xs class", function() {
        let wnd = createWindow({ actions: ["Close"] });
        let closeButton = wnd.wrapper.find(".k-window-titlebar-action");

        assert.isTrue(closeButton.hasClass("k-button-xs"));
    });

    it("minimize button has k-button-xs class", function() {
        let wnd = createWindow({ actions: ["Minimize"] });
        let button = wnd.wrapper.find(".k-window-titlebar-action");

        assert.isTrue(button.hasClass("k-button-xs"));
    });

    it("maximize button has k-button-xs class", function() {
        let wnd = createWindow({ actions: ["Maximize"] });
        let button = wnd.wrapper.find(".k-window-titlebar-action");

        assert.isTrue(button.hasClass("k-button-xs"));
    });

    it("all titlebar action buttons have k-button-xs class", function() {
        let wnd = createWindow({ actions: ["Minimize", "Maximize", "Close"] });
        let buttons = wnd.wrapper.find(".k-window-titlebar-action");

        assert.equal(buttons.length, 3);
        buttons.each(function() {
            assert.isTrue($(this).hasClass("k-button-xs"));
        });
    });
});
