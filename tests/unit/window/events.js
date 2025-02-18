import '@progress/kendo-ui/src/kendo.window.js';
import { TimerUtils } from '../../helpers/unit/timer-utils.js';
import { spy } from '../../helpers/unit/stub.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let keys, htmlContent;
function createWindow(options) {
    let dialog = $("<div />")
        .appendTo(Mocha.fixture)
        .kendoWindow(options);
    let dialogObject = dialog.data("kendoWindow");

    return dialogObject;
}

describe("events", function() {
    beforeEach(async function() {
        if (!htmlContent) {
            htmlContent = await (await fetch('../../helpers/resources/blank.html')).text();
        }
        $.mockjax({
            url: "blank.html",
            contentType: "text/html",
            responseText: htmlContent
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

    it("clicking on window brings it in front of other windows and adds k-focus", function() {
        TimerUtils.initTimer();
        let firstWindow = createWindow({ animation: { open: { duration: 50 } } }),
            secondWindow = createWindow();

        firstWindow.element.trigger("mousedown");
        TimerUtils.advanceTimer(50);
        assert.equal(
            +firstWindow.wrapper.css("zIndex"),
            +secondWindow.wrapper.css("zIndex") + 2
        );
        assert.isOk(firstWindow.wrapper.is(".k-focus"));
        TimerUtils.destroyTimer();
    });

    it("clicking on minimized window brings it in front of other windows and adds k-focus", function() {
        TimerUtils.initTimer();
        let firstWindow = createWindow({ animation: { open: { duration: 50 } } }),
            secondWindow = createWindow();

        firstWindow.minimize();
        firstWindow.wrapper.trigger("mousedown");
        TimerUtils.advanceTimer(50);
        assert.equal(
            +firstWindow.wrapper.css("zIndex"),
            +secondWindow.wrapper.css("zIndex") + 2
        );
        assert.isOk(firstWindow.wrapper.is(".k-focus"));
        TimerUtils.destroyTimer();
    });

    it("clicking on inactive iframe window adds k-focus", function() {

        TimerUtils.initTimer();
        let firstWindow = createWindow({
            content: "blank.html",
            iframe: true,
            animation: { open: { duration: 50 } }
        }),
            secondWindow = createWindow({
                content: "blank.html",
                iframe: true,
                animation: { open: { duration: 50 } }
            });

        firstWindow.element.find(".k-overlay").trigger("mousedown");
        TimerUtils.advanceTimer(50);
        assert.isOk(firstWindow.wrapper.is(".k-focus"));

        TimerUtils.destroyTimer();
    });

    asyncTest("loading of iframe triggers load event", function(done) {
        let timeout = setTimeout(done, 2000);

        createWindow({
            content: "blank.html",
            iframe: true,
            refresh: function() {
                clearTimeout(timeout);
                done(() => {
                    assert.isOk(true);
                });
            }
        });
    });

    asyncTest("multiple loading of iframe triggers one refresh per load", function(done) {
        let triggers = 0;
        let first = true;
        let timeout = setTimeout(done, 4000);

        let dialog = createWindow({
            content: "blank.html",
            iframe: true,
            refresh: function() {
                triggers++;

                if (first) {
                    dialog.refresh("blank.html?v2");
                    first = false;
                } else {
                    clearTimeout(timeout);
                    done(() => {
                        assert.equal(triggers, 2);
                    });
                }
            }
        });
    });

    it("clicking the refresh button on a static window triggers refresh event", function() {
        let triggers = 0,
            dialog = createWindow({
                actions: ["Refresh"],
                refresh: function() {
                    triggers++;
                }
            });

        dialog.wrapper.find(".k-i-arrow-rotate-cw,.k-svg-i-arrow-rotate-cw").trigger("click");

        assert.equal(triggers, 1);
    });

    it("clicking the close button triggers close event", function() {
        let triggers = 0,
            dialog = createWindow({
                close: function() {
                    assert.isOk(true);
                }
            });

        dialog.wrapper.find(".k-i-x,.k-svg-i-x").trigger("click");
    });

    it("clicking the close button triggers close event when default is prevented", function() {
        let triggers = 0,
            dialog = createWindow({
                animation: false,
                close: function(ev) {
                    assert.isOk(true);
                    ev.preventDefault();
                }
            });

        dialog.wrapper.find(".k-i-x,.k-svg-i-x").trigger("click");
        dialog.wrapper.find(".k-i-x,.k-svg-i-x").trigger("click");
    });

    it("minimize triggers minimize event", function() {
        let triggers = 0,
            dialog = createWindow({
                actions: ["Minimize", "Restore"],
                minimize: function() {
                    triggers++;
                }
            });

        dialog.wrapper.find(".k-i-window-minimize,.k-svg-i-window-minimize").trigger("click");

        assert.equal(triggers, 1);
    });

    it("maximize triggers maximize event", function() {
        let triggers = 0,
            dialog = createWindow({
                actions: ["Maximize", "Restore"],
                maximize: function() {
                    triggers++;
                }
            });

        dialog.wrapper.find(".k-i-window,.k-svg-i-window").trigger("click");

        assert.equal(triggers, 1);
    });

    asyncTest("error event gets triggered with proper information", function(done) {
        let dialog = createWindow({
            error: function(e) {
                done(() => {
                    assert.isOk(e);
                    assert.equal(e.status, "error");
                    assert.equal(e.xhr.status, 404);
                });
            }
        });

        $.mockjaxSettings.responseTime = 0;
        $.mockjax({
            url: "/foo",
            status: 404,
            responseText: "Foo not found"
        });

        dialog.refresh("/foo");
    });

    it("moving minimized window does not show drag handles", function() {
        let dialog = createWindow();

        dialog.minimize();

        dialog.dragging.dragend({
            currentTarget: dialog.wrapper
        });

        assert.equal(
            dialog.wrapper.find(".k-resize-handle").css("display"),
            "none"
        );
    });

    it("moving minimized window does not show drag handles", function() {
        let dialog = createWindow();

        dialog.minimize();

        dialog.initialWindowPosition = { top: 0, left: 0 };

        dialog.dragging.dragcancel({
            currentTarget: dialog.wrapper
        });

        assert.equal(
            dialog.wrapper.find(".k-resize-handle").css("display"),
            "none"
        );
    });

    it("destroy can be called in close event", function() {
        let dialog = createWindow({
            close: function() {
                this.destroy();
            }
        });

        dialog.close();

        assert.isOk(true);
    });
});

describe("keyboard support", function() {
    beforeEach(function() {
        keys = kendo.keys;

        $.fn.press = function(key, options) {
            return this.trigger(
                $.extend({ type: "keydown", keyCode: key }, options)
            );
        };
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

    it("escape key triggers close event", function() {
        let triggers = 0;

        let dialog = createWindow({
            close: function(e) {
                assert.isOk(true);
                assert.isOk(e.userTriggered);
            }
        });

        dialog.element.press(keys.ESC);
    });

    it("escape key on minimized Window triggers close event", function() {
        let triggers = 0;

        let dialog = createWindow({
            close: function(e) {
                assert.isOk(true);
                assert.isOk(e.userTriggered);
            }
        });

        dialog.minimize();

        dialog.wrapper.press(keys.ESC);
    });

    it("hitting escape in closing window does not trigger new close", function() {
        let calls = 0;

        let dialog = createWindow({
            close: function() {
                calls++;
            },
            animation: { close: { duration: 50 } }
        });

        dialog.element.press(keys.ESC).press(keys.ESC);

        assert.equal(calls, 1);
    });

    it("up arrow moves window up", function() {
        let dialogObject = createWindow({});
        let dialog = dialogObject.wrapper;

        let offset = dialogObject.wrapper.offset();

        dialog.press(keys.UP);

        assert.closeTo(
            dialogObject.wrapper.offset().top,
            offset.top - 10,
            1
        );
    });

    it("down arrow moves window down", function() {
        let dialogObject = createWindow({});
        let dialog = dialogObject.wrapper;

        let offset = dialogObject.wrapper.offset();

        dialog.press(keys.DOWN);

        assert.closeTo(
            dialogObject.wrapper.offset().top,
            offset.top + 10,
            1
        );
    });

    it("left arrow moves window left", function() {
        let dialogObject = createWindow({});
        let dialog = dialogObject.wrapper;

        let offset = dialogObject.wrapper.offset();

        dialog.press(keys.LEFT);

        assert.equal(dialogObject.wrapper.offset().left, offset.left - 10);
    });

    it("right arrow moves window right", function() {
        let dialogObject = createWindow({});
        let dialog = dialogObject.wrapper;

        let offset = dialogObject.wrapper.offset();

        dialog.press(keys.RIGHT);

        assert.equal(dialogObject.wrapper.offset().left, offset.left + 10);
    });

    it("up arrow moves minimized window up", function() {
        let dialogObject = createWindow({});
        dialogObject.minimize();
        let dialog = dialogObject.wrapper;

        let offset = dialogObject.wrapper.offset();

        dialog.press(keys.UP);

        assert.closeTo(
            dialogObject.wrapper.offset().top,
            offset.top - 10,
            1
        );
    });

    it("down arrow moves minimized window down", function() {
        let dialogObject = createWindow({});
        dialogObject.minimize();
        let dialog = dialogObject.wrapper;

        let offset = dialogObject.wrapper.offset();

        dialog.press(keys.DOWN);

        assert.closeTo(
            dialogObject.wrapper.offset().top,
            offset.top + 10,
            1
        );
    });

    it("left arrow moves minimized window left", function() {
        let dialogObject = createWindow({});
        dialogObject.minimize();
        let dialog = dialogObject.wrapper;

        let offset = dialogObject.wrapper.offset();

        dialog.press(keys.LEFT);

        assert.equal(dialogObject.wrapper.offset().left, offset.left - 10);
    });

    it("right arrow moves minimized window right", function() {
        let dialogObject = createWindow({});
        dialogObject.minimize();
        let dialog = dialogObject.wrapper;

        let offset = dialogObject.wrapper.offset();

        dialog.press(keys.RIGHT);

        assert.equal(dialogObject.wrapper.offset().left, offset.left + 10);
    });

    it("ctrl+down arrow expands window", function() {
        let dialogObject = createWindow({ height: 200 });
        let dialog = dialogObject.wrapper;

        dialog.press(keys.DOWN, { ctrlKey: true });

        assert.equal(dialogObject.wrapper.outerHeight(), 210);
    });

    it("ctrl+up arrow shrinks window", function() {
        let dialogObject = createWindow({ height: 200 });
        let dialog = dialogObject.wrapper;

        dialog.press(keys.UP, { ctrlKey: true });

        assert.equal(dialogObject.wrapper.outerHeight(), 190);
    });

    it("ctrl+left arrow shrinks window", function() {
        let dialogObject = createWindow({ width: 200 });
        let dialog = dialogObject.wrapper;

        dialog.press(keys.LEFT, { ctrlKey: true });

        assert.equal(dialogObject.wrapper.outerWidth(), 190);
    });

    it("ctrl+right arrow expands window", function() {
        let dialogObject = createWindow({ width: 200 });
        let dialog = dialogObject.wrapper;

        dialog.press(keys.RIGHT, { ctrlKey: true });

        assert.equal(dialogObject.wrapper.outerWidth(), 210);
    });

    it("ctrl+left takes minWidth into account", function() {
        let dialogObject = createWindow({
            width: 100,
            minWidth: 95
        });
        let dialog = dialogObject.wrapper;

        dialog.press(keys.LEFT, { ctrlKey: true });

        assert.closeTo(dialogObject.wrapper.outerWidth(), 95, 1);
    });

    it("ctrl+right takes maxWidth into account", function() {
        let dialogObject = createWindow({
            width: 100,
            maxWidth: 105
        });
        let dialog = dialogObject.wrapper;

        dialog.press(keys.RIGHT, { ctrlKey: true });

        assert.equal(dialogObject.wrapper.outerWidth(), 105);
    });

    it("ctrl+up takes minHeight into account", function() {
        let dialogObject = createWindow({
            height: 100,
            minHeight: 95
        });
        let dialog = dialogObject.wrapper;

        dialog.press(keys.UP, { ctrlKey: true });

        assert.equal(dialogObject.wrapper.outerHeight(), 95);
    });

    it("ctrl+down takes maxHeight into account", function() {
        let dialogObject = createWindow({
            height: 100,
            maxHeight: 105
        });
        let dialog = dialogObject.wrapper;

        dialog.press(keys.DOWN, { ctrlKey: true });

        assert.closeTo(dialogObject.wrapper.outerHeight(), 105, 1);
    });

    it("alt+p toggles pin", function() {
        let dialogObject = createWindow({
            height: 100,
            maxHeight: 105
        });
        let dialog = dialogObject.wrapper;

        dialog.press(80, { altKey: true });

        assert.isOk(dialogObject.options.pinned);

        dialog.press(80, { altKey: true });

        assert.isOk(!dialogObject.options.pinned);
    });

    it("alt+up maximizes the window", function() {
        let dialogObject = createWindow({
            height: 100,
            maxHeight: 105
        });
        let dialog = dialogObject.wrapper;

        dialog.press(keys.UP, { altKey: true });

        assert.isOk(dialogObject.isMaximized());
    });

    it("alt+down restores a maximized window", function() {
        let dialogObject = createWindow({
            height: 100,
            maxHeight: 105
        });
        let dialog = dialogObject.wrapper;
        dialogObject.maximize();
        dialog.press(keys.DOWN, { altKey: true });

        assert.isOk(!dialogObject.isMaximized());
    });

    it("alt+down minimizes window", function() {
        let dialogObject = createWindow({
            height: 100,
            maxHeight: 105
        });
        let dialog = dialogObject.wrapper;

        dialog.press(keys.DOWN, { altKey: true });

        assert.isOk(dialogObject.isMinimized());
    });

    it("alt+up restores a minimized window", function() {
        let dialogObject = createWindow({
            height: 100,
            maxHeight: 105
        });
        let dialog = dialogObject.wrapper;
        dialogObject.minimize();
        dialog.press(keys.UP, { altKey: true });

        assert.isOk(!dialogObject.isMinimized());
    });

    asyncTest("alt+r triggers refresh event", function(done) {
        let timeout = setTimeout(done, 2000);

        let dialogObject = createWindow({
            content: "blank.html",
            iframe: true
        });

        dialogObject.one("refresh", function() {
            clearTimeout(timeout);
            done(() => {
                assert.isOk(true);
            });
        });

        dialogObject.element.press(82, { altKey: true });
    });

    it("resizing window with the keyboard updates widget options", function() {
        let initialSize = 200,
            dialog = createWindow({
                width: initialSize,
                height: initialSize
            });

        dialog.wrapper.press(keys.RIGHT, { ctrlKey: true });
        dialog.wrapper.press(keys.DOWN, { ctrlKey: true });

        assert.equal(dialog.options.width, initialSize + 10 + "px");
        assert.equal(dialog.options.height, initialSize + 10 + "px");
    });

    it("hitting arrow keys in nested input does not trigger keyboard support", function() {
        let dialogObject = createWindow({
            content: {
                template: () => "<input class='foo' />"
            }
        });
        let dialog = dialogObject.element;

        let offset = dialogObject.wrapper.offset();

        dialog.find("input").press(keys.UP);

        assert.equal(dialogObject.wrapper.offset().top, offset.top);
    });

    it("hitting escape in a non-closable window does not close it", function() {
        let handler = spy();

        let dialogObject = createWindow({
            actions: ["gear"],
            close: handler
        });

        dialogObject.element.press(keys.ESC);

        assert.isOk(!handler.calls);
    });

    it("opening and closing modal Windows positions the modal overlay correctly over all other instances but one", function() {
        let win1 = createWindow({ modal: true, animate: false }),
            win2 = createWindow({ modal: true, animate: false }),
            win3 = createWindow({ modal: true, animate: false }),
            modalOverlay = Mocha.fixture
                .closest("body")
                .children(".k-overlay");

        assert.isOk(
            modalOverlay.css("z-index") < win3.wrapper.css("z-index")
        );
        assert.isOk(
            modalOverlay.css("z-index") > win2.wrapper.css("z-index")
        );

        win3.close();

        assert.isOk(
            modalOverlay.css("z-index") < win2.wrapper.css("z-index")
        );
        assert.isOk(
            modalOverlay.css("z-index") > win1.wrapper.css("z-index")
        );
    });

    it("Resizing with keyboard raises resize event", function() {
        let dialogObject = createWindow({
            resize: function() {
                assert.isOk(true);
            }
        });

        dialogObject.wrapper.children(".k-window-content").trigger({
            type: "keydown",
            keyCode: 40,
            ctrlKey: true
        });
    });

    it("resizeEnd event is triggered after resizing", function() {
        let handler = spy();
        let dialog = createWindow({
            resizeEnd: handler
        });

        dialog.resizing.dragend({
            currentTarget: dialog.wrapper
        });

        assert.isOk(handler.calls);
    });

    it("preventing resizeStart stops resizing", function() {
        let handler = spy();
        let dialog = createWindow({
            resizeStart: function(e) {
                e.preventDefault();
            },
            resizeEnd: handler,
            resize: handler
        });

        dialog.resizing.dragstart();
        dialog.resizing.drag();
        dialog.resizing.dragend();

        assert.isOk(!dialog.resizing.initialPosition);
        assert.isOk(!handler.calls);
    });

    it("preventing dragstart stops dragging", function() {
        let handler = spy();
        let dialog = createWindow({
            dragstart: function(e) {
                e.preventDefault();
            },
            dragend: handler
        });

        dialog.dragging.dragstart();
        dialog.dragging.dragend();

        assert.isOk(!dialog.initialWindowPosition);
        assert.isOk(!handler.calls);
    });

    it("restore() triggers restore event", function() {
        let triggers = 0,
            dialog = createWindow({
                actions: ["Maximize", "Restore"],
                restore: function() {
                    triggers++;
                }
            });

        dialog.maximize();
        dialog.restore();

        assert.equal(triggers, 1);
    });

    it("restore() triggers restore event", function() {
        let triggers = 0,
            dialog = createWindow({
                restore: function() {
                    triggers++;
                }
            });

        dialog.maximize();
        dialog.restore();

        assert.equal(triggers, 1);
    });

    it("alt+up triggers restore event", function() {
        let triggers = 0,
            dialog = createWindow({
                restore: function(ev) {
                    triggers++;
                }
            });

        dialog.minimize();
        dialog.wrapper.press(keys.UP, { altKey: true });

        assert.isOk(triggers, 1);
    });

    it("alt+down triggers restore event", function() {
        let triggers = 0,
            dialog = createWindow({
                restore: function(ev) {
                    triggers++;
                }
            });


        dialog.maximize();
        dialog.wrapper.press(keys.DOWN, { altKey: true });

        assert.isOk(triggers, 1);
    });
});
