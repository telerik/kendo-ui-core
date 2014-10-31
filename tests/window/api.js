(function() {
    module("api", {
        setup: function () {
            kendo.effects.disable();
            var Window = kendo.ui.Window;
            QUnit.fixture.html(__html__['tests/window/modals-fixture.html']);
        },
        teardown: function() {
            QUnit.fixture.closest("body").find(".k-window-content").each(function(idx, element){
                $(element).data("kendoWindow").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
            $.mockjaxClear();
            kendo.effects.enable();
        }
    });

    function createWindow(options) {
        return $("<div />").appendTo(QUnit.fixture).kendoWindow(options).data("kendoWindow");
    }

    test("title gets title", function() {
        equal(createWindow({ title: "Title" }).title(), "Title");
    });

    test("title sets title", function() {
        var window = createWindow({ title: "Title"}),
            oldTitle = window.title(),
            titleElement = $(".k-window-title", window.wrapper);

        window.title("Title is the new title!");

        equal(titleElement.text(), "Title is the new title!");

        window.title(oldTitle);

        equal(titleElement.text(), oldTitle);
    });

    test("title method and title property set once encoded string as once encoded", 2, function () {
        var encodedString = kendo.htmlEncode("<script>var foo1 = 1;<\/script>"),
            window = createWindow({ title: encodedString }),
            titleElement = $(".k-window-title", window.wrapper);

        equal(titleElement.html(), encodedString);

        window.title(encodedString);

        equal(titleElement.html(), encodedString);
    });

    test("open of modal window adds overlay if it does not exist", function () {
        createWindow({ modal: true }).open();

        equal($("body > .k-overlay").length, 1);
    });

    test("dblclick on resizable window title maximizes window", function() {
        var window = createWindow();

        window.wrapper.find(".k-window-titlebar").trigger("dblclick");

        ok(window.options.isMaximized);
    });

    test("dblclick on non resizable window title does not maximize window", function() {
        var window = createWindow({ resizable: false });

        window.element.find(".k-window-titlebar").trigger("dblclick");

        ok(!window.options.isMaximized);
    });

    test('document scroll position is preserved on maximize and restore', function () {
        var window = createWindow();

        var div = $("<div style='height:2000px' />").appendTo(QUnit.fixture.height(2010)),
            scrollPosition = 300;

        $(QUnit.fixture[0].ownerDocument).scrollTop(scrollPosition);

        window.maximize();

        window.restore();

        equal($(QUnit.fixture[0].ownerDocument).scrollTop(), scrollPosition);
    });

    test("destroying a modal window moves overlay before previous window", function() {
        var dialog = createWindow({
                modal: true
            }),
            overlappingDialog = createWindow({
                modal: true
            });

        overlappingDialog.destroy();
        ok(dialog.wrapper.prev("div").is(".k-overlay"));
    });

    test("destroy does not throw errors when called twice on the same object", function() {
        var dialog = createWindow();

        dialog.destroy();
        dialog.destroy();

        ok(true);
    });

    test("closing a modal window moves overlay before previous window", function() {
        var dialog = createWindow({
                modal: true
            }),
            overlappingDialog = createWindow({
                modal: true
            });

        overlappingDialog.close();
        ok(dialog.wrapper.prev("div").is(".k-overlay"));
    });

    test("closing window from close handler", 1, function() {
        var dialog = createWindow({
                modal: true,
                close: function(e) {
                    if (e.userTriggered) {
                        this.close();
                    }
                },
                deactivate: function() {
                    ok(true);
                }
            });

        dialog.wrapper.find(".k-i-close").click();
    });

    test("closing a modal window moves overlay below previous window", function() {
        function resumeTest() {
            window.setTimeout(function(){
                start();
                ok(+modalWindow1.wrapper.css("zIndex") > +modalWindow1.wrapper.siblings(".k-overlay").css("zIndex"));
            }, 10);
        }

        stop();

        var modalWindow2 = $("#modalWindow2").kendoWindow({
            modal: true,
            visible: false,
            animation: {
                open: {
                    duration: 0
                },
                close: {
                    duration: 0
                }
            },
            close: resumeTest
        }).data("kendoWindow");

        var modalWindow1 = $("#modalWindow1").kendoWindow({
            modal: true,
            animation: {
                open: {
                    duration: 0
                },
                close: {
                    duration: 0
                }
            },
            visible: false
        }).data("kendoWindow");

        modalWindow1.open();
        modalWindow2.open();

        modalWindow2.close();
    });

    test("refresh() of local URLs requests data via AJAX", function() {
        var dialog = createWindow(),
            hasRequestedData = false;

        $.mockjax(function () {
            hasRequestedData = true;
            return {};
        });

        dialog.refresh("httpfoo");

        ok(hasRequestedData);

        $.mockjaxClear();
    });


    test("refresh() with string uses it as a URL", function() {
        var url = "foo",
            dialog = createWindow({})

        expect(1);

        $.mockjax(function(settings) {
            equal(settings.url, url);
            return {};
        });

        dialog.refresh(url);
    });

    test("refresh() uses `content` if no url is provided", function() {
        $.mockjax(function(settings) {
            return {};
        });

        var url = "foo",
            dialog = createWindow({ content: url });

        expect(1);

        $.mockjaxClear();
        $.mockjax(function(settings) {
            equal(settings.url, url);
            return {};
        });

        dialog.refresh();
    });

    test("refresh() sends data to server", function() {
        var dialog = createWindow({}),
            data = { bar: "baz" };

        expect(1);

        $.mockjax(function(settings) {
            deepEqual(settings.data, data);
            return {};
        });

        dialog.refresh({
            url: "foo",
            data: data
        });
    });

    test("refresh() uses `content` object combined with URL", function() {
        $.mockjax(function(settings) {
            return {};
        });

        var url = "/bar",
            contentObject = { type: "POST" },
            dialog = createWindow({ content: contentObject });

        expect(2);

        $.mockjaxClear();
        $.mockjax(function(settings) {
            equal(settings.url, url);
            equal(settings.type, contentObject.type);
            return {};
        });

        dialog.refresh(url);
    });

    test("refresh() creates iframe, if loading a remote url", function() {
        var dialog = createWindow({}),
            url = "http://example.com/";

        dialog.refresh(url);

        var iframe = dialog.wrapper.find("iframe");

        equal(iframe.length, 1);
        equal(iframe.attr("src"), url);
    });

    test("refresh() of AJAX window with cross-domain URL", function() {
        $.mockjax({
            url: "foo",
            responseText: "server foo"
        });

        var dialog = createWindow({
                content: "foo"
            }),
            url = "http://example.com/";

        dialog.refresh(url);

        var iframe = dialog.wrapper.find("iframe");

        equal(iframe.length, 1);
        equal(iframe.attr("src"), url);
    });

    test("refresh() of local URL with iframe", function() {
        $.mockjax({
            url: "foo",
            responseText: "server foo"
        });

        var dialog = createWindow({
            iframe: true
        });

        dialog.refresh({
            url: "foo"
        });

        var iframe = dialog.wrapper.find("iframe");

        equal(iframe.length, 1);
        equal(iframe.attr("src"), "foo");
    });

    test("refresh() creates iframe if iframe:true", function() {
        $.mockjax({
            url: "foo",
            responseText: "server foo"
        });

        var dialog = createWindow();

        dialog.refresh({
            url: "foo",
            iframe: true
        });

        var iframe = dialog.wrapper.find("iframe");

        equal(iframe.length, 1);
        equal(iframe.attr("src"), "foo");
    });

    test("content() destroys nested widgets", function() {

        var dialog = createWindow();

        var ddl = $("<input />").appendTo(dialog.element);

        ddl.kendoDropDownList({ dataSource: [ "foo" ] });

        ddl.data("kendoDropDownList").open();

        dialog.content("bar");

        ok(!ddl.data("kendoDropDownList"));
    });

    test("toFront() raises window z-index above other windows", function() {
        var firstWindow = createWindow(),
            secondWindow = createWindow();

        firstWindow.toFront();

        equal(+wrapper(firstWindow).css("zIndex"), +wrapper(secondWindow).css("zIndex") + 2);
    });


    function wrapper(windowObject) {
        return windowObject.element.closest(".k-window");
    }

    test("toFront() raises window z-index above other windows with different z-index", function() {
        var firstWindow = createWindow(),
            secondWindow = createWindow();

        wrapper(secondWindow).css("zIndex", 10012);

        firstWindow.toFront();

        equal(+wrapper(firstWindow).css("zIndex"), +wrapper(secondWindow).css("zIndex") + 2);
    });


    test("toFront() overlays iframes of windows with lower z-index", function() {
        var firstWindow = createWindow(),
            secondWindow = createWindow({
                content: "http://google.com/"
            });

        firstWindow.toFront();

        ok(secondWindow.element.find("> .k-overlay").length);
    });

    test("toFront() removes overlay on foremost window", function() {
        var firstWindow = createWindow({
                content: "http://www.telerik.com/"
            }),
            secondWindow = createWindow({
                content: "http://google.com/"
            });

        firstWindow.toFront();

        ok(!firstWindow.element.find("> .k-overlay").length);
    });

    test("toFront() moves modal overlay above other windows", function() {
        var firstWindow1 = createWindow(),
            secondWindow1 = createWindow({
                modal: true
            });

            ok(parseInt(firstWindow1.wrapper.css("zIndex")) < parseInt($(".k-overlay").css("zIndex")));
    });

    test("toFront() does not increase the window z-index if not necessary", function() {
        var dialog = createWindow(),
            zIndex = dialog.wrapper.css("zIndex");

        dialog.toFront();

        equal(dialog.wrapper.css("zIndex"), zIndex);
    });

    test("open() calls toFront()", function() {
        expect(1);

        var firstWindow = createWindow();

        firstWindow.close();

        firstWindow.toFront = function() {
            ok(true);
        };

        firstWindow.open();
    });

    test("open() sets options.visible", function() {
        var dialog = createWindow({
            visible: false,
            animation: false
        });

        dialog.open();

        ok(dialog.options.visible);
    });

    test("close() sets options.visible", function() {
        var dialog = createWindow({
            visible: true,
            animation: false
        });

        dialog.close();

        ok(!dialog.options.visible);
    });

    test("pin() sets position:fixed style to wrapper", function() {
        var dialog = createWindow({
            visible: true,
            animation: false
        });

        dialog.pin();

        equal(dialog.wrapper.css("position"), "fixed");
    });

    test("pin() toggles button class to k-i-unpin", function() {
        var dialog = createWindow({
            visible: true,
            animation: false,
            actions: ["Pin"]
        });

        equal(dialog.wrapper.find(".k-i-pin").length, 1);
        equal(dialog.wrapper.find(".k-i-unpin").length, 0);

        dialog.pin();

        equal(dialog.wrapper.find(".k-i-unpin").length, 1);
        equal(dialog.wrapper.find(".k-i-pin").length, 0);
    });

    test("pin() substracts the browser scroll position from the wrapper's top and left styles", function() {
        var spacerDiv = $("<div style='width:6000px;height:3000px'>&nbsp;</div>").appendTo(QUnit.fixture);

        $(window).scrollLeft(2000);
        $(window).scrollTop(1000);

        var initialTop,
            initialLeft,
            dialog = createWindow({
                visible: true,
                animation: false
            });

        dialog.center();

        initialTop = parseInt(dialog.wrapper.css("top"), 10);
        initialLeft = parseInt(dialog.wrapper.css("left"), 10);

        dialog.pin();

        finalTop = parseInt(dialog.wrapper.css("top"), 10);
        finalLeft = parseInt(dialog.wrapper.css("left"), 10);

        equal(finalTop, initialTop - $(window).scrollTop());
        equal(finalLeft, initialLeft - $(window).scrollLeft());

        spacerDiv.remove();
    });

    test("unpin() removes position:fixed style from wrapper", function() {
        var dialog = createWindow({
            visible: true,
            animation: false,
            pinned: true
        });

        dialog.unpin();

        equal(dialog.wrapper.css("position"), "absolute");
    });

    test("unpin() toggles button class to k-i-pin", function() {
        var dialog = createWindow({
            visible: true,
            animation: false,
            actions: ["Pin"],
            pinned: true
        });

        equal(dialog.wrapper.find(".k-i-unpin").length, 1);
        equal(dialog.wrapper.find(".k-i-pin").length, 0);

        dialog.unpin();

        equal(dialog.wrapper.find(".k-i-pin").length, 1);
        equal(dialog.wrapper.find(".k-i-unpin").length, 0);
    });

    test("unpin() adds the browser scroll position to the wrapper's top and left styles", function() {
        var spacerDiv = $("<div style='width:6000px;height:3000px'>&nbsp;</div>").appendTo(QUnit.fixture);

        $(window).scrollLeft(2000);
        $(window).scrollTop(1000);

        var initialTop,
            initialLeft,
            dialog = createWindow({
                visible: true,
                animation: false,
                pinned: true
            });

        dialog.center();

        initialTop = parseInt(dialog.wrapper.css("top"), 10);
        initialLeft = parseInt(dialog.wrapper.css("left"), 10);

        dialog.unpin();

        finalTop = parseInt(dialog.wrapper.css("top"), 10);
        finalLeft = parseInt(dialog.wrapper.css("left"), 10);

        equal(finalTop, initialTop + $(window).scrollTop());
        equal(finalLeft, initialLeft + $(window).scrollLeft());

        spacerDiv.remove();
    });

    test("restoring a pinned Window preserves the pinned state", function() {
        var dialog = createWindow({
                visible: true,
                animation: false
            });

        dialog.center();
        dialog.minimize();
        dialog.pin();
        dialog.restore();

        equal(dialog.wrapper.css("position"), "fixed");
    });

    test("centering a Window sets correct top and left styles", 2, function () {
        var win = $(window),
            dialog = createWindow({
                animation: false,
                width: "50%",
                height: "50%"
            });

        dialog.center();

        QUnit.close(parseInt(dialog.wrapper.css("top"), 10), (win.height() - parseInt(dialog.wrapper.outerHeight(), 10)) / 2, 1);
        QUnit.close(parseInt(dialog.wrapper.css("left"), 10), (win.width() - parseInt(dialog.wrapper.outerWidth(), 10)) / 2, 1);
    });

    test("centering a pinned Window sets correct top and left styles", 2, function() {
        var pageWidth = 6000,
            pageHeight = pageWidth,
            scrollPosition = pageWidth / 3;

        var div = $("<div />").css({width: pageWidth, height: pageHeight}).appendTo(QUnit.fixture.height(pageHeight));

        $(QUnit.fixture[0].ownerDocument).scrollTop(scrollPosition).scrollLeft(scrollPosition);

        var dialog1 = createWindow({
                pinned: true,
                animation: false
            });
        var dialog2 = createWindow({
                pinned: false,
                animation: false
            });

        dialog1.center();
        dialog2.center();

        equal(parseInt(dialog1.wrapper.css("top"), 10), parseInt(dialog2.wrapper.css("top"), 10) - scrollPosition);
        equal(parseInt(dialog1.wrapper.css("left"), 10), parseInt(dialog2.wrapper.css("left"), 10) - scrollPosition);
    });

    test("minimize() removes min-height", function() {
        var dialog = createWindow({
                visible: true,
                animation: false
            });

        dialog.minimize();

        ok(!dialog.wrapper[0].style.minHeight);
    });

    test("restore() adds back min-height", function() {
        var dialog = createWindow({
                visible: true,
                animation: false
            });

        dialog.minimize();
        dialog.restore();

        ok(dialog.wrapper[0].style.minHeight);
    });

    test("maximize() hides the pin/unpin icon", function() {
        var dialog = createWindow({
                visible: true,
                actions: ["Pin"],
                animation: false
            });

        dialog.maximize();

        equal(dialog.wrapper.find(".k-i-pin:visible").length, 0);
    });

    test("maximize() adds a k-window-maximized class", function() {
        var dialog = createWindow({
                visible: true,
                actions: ["Pin"],
                animation: false
            });

        dialog.maximize();

        ok(dialog.wrapper.is(".k-window-maximized"));
    });

    test("restore() shows the pin/unpin icon", function() {
        var dialog = createWindow({
                visible: true,
                actions: ["Pin"],
                animation: false
            });

        dialog.maximize();
        dialog.restore();

        equal(dialog.wrapper.find(".k-i-pin:visible").length, 1);
    });

    test("restore() removes the k-window-maximized class", function() {
        var dialog = createWindow({
                visible: true,
                actions: ["Pin"],
                animation: false
            });

        dialog.maximize();
        dialog.wrapper.addClass("k-window-maximized");
        dialog.restore();

        ok(!dialog.wrapper.is(".k-window-maximized"));
    });

    test("title() on titleless window does not fail", function() {
        var dialog = createWindow({ title: false });

        dialog.title("foo");

        ok(true);
    });

    test("title(false) removes titlebar", function() {
        var dialog = createWindow({ title: "foo" });

        dialog.title(false);

        equal(dialog.wrapper.find(".k-window-titlebar").length, 0);
    });

    test("title('foo') on titleless window adds title", function() {
        var dialog = createWindow({ title: false });

        dialog.title("foo");

        equal(dialog.wrapper.find(".k-window-titlebar").length, 1);
    });

    test("extending the window does not break the close method", function() {
        var MyWindow = kendo.ui.Window.extend({
            options: {
                name: "MyWindow",
                animation: false
            },
            init: function(element, options) {
                kendo.ui.Window.prototype.init.apply(this, [element, options])
            }
        });

        kendo.ui.plugin(MyWindow);

        var myWindow = $("<div />").kendoMyWindow().data("kendoMyWindow");

        myWindow.open().close();

        myWindow.destroy();

        ok(true);
    });

    test("destroying a window destroys nested components", function() {

        var html = "<div id='dialog'><select><option>foo</option></select></div>";

        var dialog = $(html).appendTo(QUnit.fixture)
            .find("select").kendoDropDownList().end()
            .kendoWindow().data("kendoWindow");

        dialog.element.find("select").data("kendoDropDownList").open();

        dialog.destroy();

        equal($("body > .k-animation-container").length, 0);
    });

    test("async open/close of model windows leaves overlay", function() {
        var first = createWindow({ modal: true });
        var second = createWindow({ modal: true, visible: false });

        first.close();
        second.open();

        ok($(".k-overlay").is(":visible"));
    });

    asyncTest("opening a closing animated window leaves it in opened state", function() {
        var dialog = createWindow({
            animation: {
                open: { duration: 50 },
                close: { duration: 50 }
            }
        });

        dialog.close().open();

        setTimeout(function() {
            start();

            ok(dialog.wrapper.is(":visible"));
        }, 100);
    });

    test("setOptions can toggle draggable option", function() {
        var dialog = createWindow();

        dialog.setOptions({ draggable: true });

        ok(dialog.dragging);


        var draggingDestroy = spy(dialog.dragging, "destroy");

        dialog.setOptions({ draggable: false });

        ok(!dialog.dragging);
        ok(draggingDestroy.calls("destroy"), 1);
    });

    test("setOptions can toggle resizable option", function() {
        var dialog = createWindow();

        dialog.setOptions({ resizable: true });

        ok(dialog.resizing);


        var resizingDestroy = spy(dialog.resizing, "destroy");

        dialog.setOptions({ resizable: false });

        ok(!dialog.resizing);
        ok(resizingDestroy.calls("destroy"), 1);
    });

    test("setOptions can set zero integer position", 2, function() {
        var dialog = createWindow();

        dialog.setOptions({
            position: {
                top: 0,
                left: 0
            }
        });

        equal(dialog.wrapper.css("left"), "0px");
        equal(dialog.wrapper.css("top"), "0px");
    });

    test("setOptions can set integer position", 2, function() {
        var dialog = createWindow();

        dialog.setOptions({
            position: {
                top: 10,
                left: 10
            }
        });

        equal(dialog.wrapper.css("left"), "10px");
        equal(dialog.wrapper.css("top"), "10px");
    });

    test("setOptions can set string position", 2, function() {
        var dialog = createWindow();

        dialog.setOptions({
            position: {
                top: "10px",
                left: "10px"
            }
        });

        equal(dialog.wrapper.css("left"), "10px");
        equal(dialog.wrapper.css("top"), "10px");
    });

    test("setting new title updates widget options", function() {
        var newTitle = "foo",
            dialog = createWindow();

        dialog.title(newTitle);

        equal(dialog.options.title, newTitle);
    });

    asyncTest("overlay is not hidden when showing second modal window after closing first", function() {
        var dialog = createWindow({
            animation: { close: { duration: 500 } },
            modal: true
        });

        var secondDialog = createWindow({
            animation: { open: { duration: 1000 } },
            modal: true,
            visible: false,
            activate: function() {
                start();

                ok($(".k-overlay").is(":visible"));
            }
        });

        dialog.close();
        secondDialog.open();
    });

    test("setOptions allows changing of window actions", function() {
        var dialog = createWindow();

        dialog.setOptions({
            actions: [ "Minimize", "Close" ]
        });

        equal(dialog.wrapper.find(".k-i-minimize").length, 1);
    });
})();
