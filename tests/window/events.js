(function() {
    var keys;
    function createWindow(options) {
        var dialog = $("<div />")
            .appendTo(Mocha.fixture)
            .kendoWindow(options);
        var dialogObject = dialog.data("kendoWindow");

        return dialogObject;
    }

    describe("events", function() {
        beforeEach(function() {});
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

        it("clicking on window brings it in front of other windows and adds k-state-focused", function() {
            jasmine.clock().install();
            var firstWindow = createWindow(),
                secondWindow = createWindow();

            firstWindow.element.trigger("mousedown");
            jasmine.clock().tick();
            assert.equal(
                +firstWindow.wrapper.css("zIndex"),
                +secondWindow.wrapper.css("zIndex") + 2
            );
            assert.isOk(firstWindow.wrapper.is(".k-state-focused"));
            jasmine.clock().uninstall();
        });

        it("clicking on minimized window brings it in front of other windows and adds k-state-focused", function() {
            jasmine.clock().install();
            var firstWindow = createWindow(),
                secondWindow = createWindow();

            firstWindow.minimize();
            firstWindow.wrapper.trigger("mousedown");
            jasmine.clock().tick();
            assert.equal(
                +firstWindow.wrapper.css("zIndex"),
                +secondWindow.wrapper.css("zIndex") + 2
            );
            assert.isOk(firstWindow.wrapper.is(".k-state-focused"));
            jasmine.clock().uninstall();
        });

        it("clicking on inactive iframe window adds k-state-focused", function() {
            jasmine.clock().install();
            var firstWindow = createWindow({
                    content: "/base/tests/window/blank.html",
                    iframe: true
                }),
                secondWindow = createWindow({
                    content: "/base/tests/window/blank.html",
                    iframe: true
                });

            firstWindow.element.find(".k-overlay").trigger("mousedown");
            jasmine.clock().tick();
            assert.isOk(firstWindow.wrapper.is(".k-state-focused"));
            jasmine.clock().uninstall();
        });

        it("loading of iframe triggers load event", function(done) {
            var timeout = setTimeout(done, 2000);

            createWindow({
                content: "/base/tests/window/blank.html",
                iframe: true,
                refresh: function() {
                    clearTimeout(timeout);
                    assert.isOk(true);
                    done();
                }
            });
        });

        it("multiple loading of iframe triggers one refresh per load", function(done) {
            var triggers = 0;
            var first = true;
            var timeout = setTimeout(done, 4000);

            var dialog = createWindow({
                content: "/base/tests/window/blank.html",
                iframe: true,
                refresh: function() {
                    triggers++;

                    if (first) {
                        dialog.refresh("blank.html?v2");
                        first = false;
                    } else {
                        clearTimeout(timeout);
                        assert.equal(triggers, 2);
                        done();
                    }
                }
            });
        });

        it("clicking the refresh button on a static window triggers refresh event", function() {
            var triggers = 0,
                dialog = createWindow({
                    actions: ["Refresh"],
                    refresh: function() {
                        triggers++;
                    }
                });

            dialog.wrapper.find(".k-i-refresh").trigger("click");

            assert.equal(triggers, 1);
        });

        it("clicking the close button triggers close event", function() {
            var triggers = 0,
                dialog = createWindow({
                    close: function() {
                        assert.isOk(true);
                    }
                });

            dialog.wrapper.find(".k-i-close").trigger("click");
        });

        it("clicking the close button triggers close event when default is prevented", function() {
            var triggers = 0,
                dialog = createWindow({
                    animation: false,
                    close: function(ev) {
                        assert.isOk(true);
                        ev.preventDefault();
                    }
                });

            dialog.wrapper.find(".k-i-close").trigger("click");
            dialog.wrapper.find(".k-i-close").trigger("click");
        });

        it("minimize triggers minimize event", function() {
            var triggers = 0,
                dialog = createWindow({
                    actions: ["Minimize", "Restore"],
                    minimize: function() {
                        triggers++;
                    }
                });

            dialog.wrapper.find(".k-i-window-minimize").trigger("click");

            assert.equal(triggers, 1);
        });

        it("maximize triggers maximize event", function() {
            var triggers = 0,
                dialog = createWindow({
                    actions: ["Maximize", "Restore"],
                    maximize: function() {
                        triggers++;
                    }
                });

            dialog.wrapper.find(".k-i-window-maximize").trigger("click");

            assert.equal(triggers, 1);
        });

        it("error event gets triggered with proper information", function(done) {
            var dialog = createWindow({
                error: function(e) {
                    assert.isOk(e);
                    assert.equal(e.status, "error");
                    assert.equal(e.xhr.status, 404);
                    done();
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
            var dialog = createWindow();

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
            var dialog = createWindow();

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
            var dialog = createWindow({
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
            var triggers = 0;

            var dialog = createWindow({
                close: function(e) {
                    assert.isOk(true);
                    assert.isOk(e.userTriggered);
                }
            });

            dialog.element.press(keys.ESC);
        });

        it("escape key on minimized Window triggers close event", function() {
            var triggers = 0;

            var dialog = createWindow({
                close: function(e) {
                    assert.isOk(true);
                    assert.isOk(e.userTriggered);
                }
            });

            dialog.minimize();

            dialog.wrapper.press(keys.ESC);
        });

        it("hitting escape in closing window does not trigger new close", function() {
            var calls = 0;

            var dialog = createWindow({
                close: function() {
                    calls++;
                },
                animation: { close: { duration: 50 } }
            });

            dialog.element.press(keys.ESC).press(keys.ESC);

            assert.equal(calls, 1);
        });

        it("up arrow moves window up", function() {
            var dialogObject = createWindow({});
            var dialog = dialogObject.element;

            var offset = dialogObject.wrapper.offset();

            dialog.press(keys.UP);

            assert.closeTo(
                dialogObject.wrapper.offset().top,
                offset.top - 10,
                1
            );
        });

        it("down arrow moves window down", function() {
            var dialogObject = createWindow({});
            var dialog = dialogObject.element;

            var offset = dialogObject.wrapper.offset();

            dialog.press(keys.DOWN);

            assert.closeTo(
                dialogObject.wrapper.offset().top,
                offset.top + 10,
                1
            );
        });

        it("left arrow moves window left", function() {
            var dialogObject = createWindow({});
            var dialog = dialogObject.element;

            var offset = dialogObject.wrapper.offset();

            dialog.press(keys.LEFT);

            assert.equal(dialogObject.wrapper.offset().left, offset.left - 10);
        });

        it("right arrow moves window right", function() {
            var dialogObject = createWindow({});
            var dialog = dialogObject.element;

            var offset = dialogObject.wrapper.offset();

            dialog.press(keys.RIGHT);

            assert.equal(dialogObject.wrapper.offset().left, offset.left + 10);
        });

        it("up arrow moves minimized window up", function() {
            var dialogObject = createWindow({});
            dialogObject.minimize();
            var dialog = dialogObject.wrapper;

            var offset = dialogObject.wrapper.offset();

            dialog.press(keys.UP);

            assert.closeTo(
                dialogObject.wrapper.offset().top,
                offset.top - 10,
                1
            );
        });

        it("down arrow moves minimized window down", function() {
            var dialogObject = createWindow({});
            dialogObject.minimize();
            var dialog = dialogObject.wrapper;

            var offset = dialogObject.wrapper.offset();

            dialog.press(keys.DOWN);

            assert.closeTo(
                dialogObject.wrapper.offset().top,
                offset.top + 10,
                1
            );
        });

        it("left arrow moves minimized window left", function() {
            var dialogObject = createWindow({});
            dialogObject.minimize();
            var dialog = dialogObject.wrapper;

            var offset = dialogObject.wrapper.offset();

            dialog.press(keys.LEFT);

            assert.equal(dialogObject.wrapper.offset().left, offset.left - 10);
        });

        it("right arrow moves minimized window right", function() {
            var dialogObject = createWindow({});
            dialogObject.minimize();
            var dialog = dialogObject.wrapper;

            var offset = dialogObject.wrapper.offset();

            dialog.press(keys.RIGHT);

            assert.equal(dialogObject.wrapper.offset().left, offset.left + 10);
        });

        it("ctrl+down arrow expands window", function() {
            var dialogObject = createWindow({ height: 200 });
            var dialog = dialogObject.element;

            dialog.press(keys.DOWN, { ctrlKey: true });

            assert.equal(dialogObject.wrapper.height(), 210);
        });

        it("ctrl+up arrow shrinks window", function() {
            var dialogObject = createWindow({ height: 200 });
            var dialog = dialogObject.element;

            dialog.press(keys.UP, { ctrlKey: true });

            assert.equal(dialogObject.wrapper.height(), 190);
        });

        it("ctrl+left arrow shrinks window", function() {
            var dialogObject = createWindow({ width: 200 });
            var dialog = dialogObject.element;

            dialog.press(keys.LEFT, { ctrlKey: true });

            assert.equal(dialogObject.wrapper.width(), 190);
        });

        it("ctrl+right arrow expands window", function() {
            var dialogObject = createWindow({ width: 200 });
            var dialog = dialogObject.element;

            dialog.press(keys.RIGHT, { ctrlKey: true });

            assert.equal(dialogObject.wrapper.width(), 210);
        });

        it("ctrl+left takes minWidth into account", function() {
            var dialogObject = createWindow({
                width: 100,
                minWidth: 95
            });
            var dialog = dialogObject.element;

            dialog.press(keys.LEFT, { ctrlKey: true });

            assert.closeTo(dialogObject.wrapper.width(), 95, 1);
        });

        it("ctrl+right takes maxWidth into account", function() {
            var dialogObject = createWindow({
                width: 100,
                maxWidth: 105
            });
            var dialog = dialogObject.element;

            dialog.press(keys.RIGHT, { ctrlKey: true });

            assert.equal(dialogObject.wrapper.width(), 105);
        });

        it("ctrl+up takes minHeight into account", function() {
            var dialogObject = createWindow({
                height: 100,
                minHeight: 95
            });
            var dialog = dialogObject.element;

            dialog.press(keys.UP, { ctrlKey: true });

            assert.equal(dialogObject.wrapper.height(), 95);
        });

        it("ctrl+down takes maxHeight into account", function() {
            var dialogObject = createWindow({
                height: 100,
                maxHeight: 105
            });
            var dialog = dialogObject.element;

            dialog.press(keys.DOWN, { ctrlKey: true });

            assert.closeTo(dialogObject.wrapper.height(), 105, 1);
        });

        it("alt+p toggles pin", function() {
            var dialogObject = createWindow({
                height: 100,
                maxHeight: 105
            });
            var dialog = dialogObject.element;

            dialog.press(80, { altKey: true });

            assert.isOk(dialogObject.options.pinned);

            dialog.press(80, { altKey: true });

            assert.isOk(!dialogObject.options.pinned);
        });

        it("alt+up maximizes the window", function() {
            var dialogObject = createWindow({
                height: 100,
                maxHeight: 105
            });
            var dialog = dialogObject.element;

            dialog.press(keys.UP, { altKey: true });

            assert.isOk(dialogObject.isMaximized());
        });

        it("alt+down restores a maximized window", function() {
            var dialogObject = createWindow({
                height: 100,
                maxHeight: 105
            });
            var dialog = dialogObject.element;
            dialogObject.maximize();
            dialog.press(keys.DOWN, { altKey: true });

            assert.isOk(!dialogObject.isMaximized());
        });

        it("alt+down minimizes window", function() {
            var dialogObject = createWindow({
                height: 100,
                maxHeight: 105
            });
            var dialog = dialogObject.element;

            dialog.press(keys.DOWN, { altKey: true });

            assert.isOk(dialogObject.isMinimized());
        });

        it("alt+up restores a minimized window", function() {
            var dialogObject = createWindow({
                height: 100,
                maxHeight: 105
            });
            var dialog = dialogObject.element;
            dialogObject.minimize();
            dialog.press(keys.UP, { altKey: true });

            assert.isOk(!dialogObject.isMinimized());
        });

        it("alt+r triggers refresh event", function(done) {
            var timeout = setTimeout(done, 2000);

            var dialogObject = createWindow({
                content: "/base/tests/window/blank.html",
                iframe: true
            });

            dialogObject.one("refresh", function() {
                clearTimeout(timeout);
                assert.isOk(true);
                done();
            });

            dialogObject.element.press(82, { altKey: true });
        });

        it("resizing window with the keyboard updates widget options", function() {
            var initialSize = 200,
                dialog = createWindow({
                    width: initialSize,
                    height: initialSize
                });

            dialog.element.press(keys.RIGHT, { ctrlKey: true });
            dialog.element.press(keys.DOWN, { ctrlKey: true });

            assert.equal(dialog.options.width, initialSize + 10 + "px");
            assert.equal(dialog.options.height, initialSize + 10 + "px");
        });

        it("hitting arrow keys in nested input does not trigger keyboard support", function() {
            var dialogObject = createWindow({
                content: {
                    template: "<input class='foo' />"
                }
            });
            var dialog = dialogObject.element;

            var offset = dialogObject.wrapper.offset();

            dialog.find("input").press(keys.UP);

            assert.equal(dialogObject.wrapper.offset().top, offset.top);
        });

        it("hitting escape in a non-closable window does not close it", function() {
            var handler = spy();

            var dialogObject = createWindow({
                actions: ["custom"],
                close: handler
            });

            dialogObject.element.press(keys.ESC);

            assert.isOk(!handler.calls);
        });

        it("opening and closing modal Windows positions the modal overlay correctly over all other instances but one", function() {
            var win1 = createWindow({ modal: true, animate: false }),
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
            var dialogObject = createWindow({
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
            var handler = spy();
            var dialog = createWindow({
                resizeEnd: handler
            });

            dialog.resizing.dragend({
                currentTarget: dialog.wrapper
            });

            assert.isOk(handler.calls);
        });

        it("preventing resizeStart stops resizing", function() {
            var handler = spy();
            var dialog = createWindow({
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
            var handler = spy();
            var dialog = createWindow({
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
    });
})();
