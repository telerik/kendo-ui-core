import '@progress/kendo-ui/src/kendo.window.js';
import '@progress/kendo-ui/src/kendo.dropdownlist.js';
import '@progress/kendo-ui/src/kendo.dialog.js';
import { spy } from '../../helpers/unit/stub.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';
import { roughlyEqual } from '../../helpers/unit/general-utils.js';

function createWindow(options) {
    return $("<div />")
        .appendTo(Mocha.fixture)
        .kendoWindow(options)
        .data("kendoWindow");
}

function createDialog(options) {
    return $("<div />")
        .appendTo(Mocha.fixture)
        .kendoDialog(options)
        .data("kendoDialog");
}

describe("api", function() {
    beforeEach(function() {
        Mocha.fixture.html(`<div id="modalWindow1">
                                modalWindow1
                            </div>

                            <div id="modalWindow2">
                                modalWindow2
                            </div>`);
    });
    afterEach(function() {
        Mocha.fixture
            .closest("body")
            .find(".k-window-content")
            .each(function(idx, element) {
                kendo.widgetInstance($(element)).destroy();
            });
        Mocha.fixture
            .closest("body")
            .find(".k-overlay")
            .remove();
        $.mockjax.clear();

        // Destroy all possible .k-animation-container elements left by previous test suites.
        kendo.destroy($("body"));
    });

    it("title gets title", function() {
        assert.equal(createWindow({ title: "Title" }).title(), "Title");
    });

    it("title sets title", function() {
        let window = createWindow({ title: "Title" }),
            oldTitle = window.title(),
            titleElement = $(".k-window-title", window.wrapper);

        window.title("Title is the new title!");

        assert.equal(titleElement.text(), "Title is the new title!");

        window.title(oldTitle);

        assert.equal(titleElement.text(), oldTitle);
    });

    it("title method gets and sets the title consistently", function() {
        let title = "foo",
            window = createWindow({ title: title }),
            oldTitle = window.title(),
            newTitle,
            titleElement = $(".k-window-title", window.wrapper);

        assert.equal(window.title(), title);

        window.title(window.title());

        assert.equal(window.title(), title);
    });

    it("title method and title property encode the title", function() {
        let stringValue = "<script>let foo1 = 1;</script>",
            window = createWindow({ title: stringValue }),
            titleElement = $(".k-window-title", window.wrapper);

        assert.equal(titleElement.html(), kendo.htmlEncode(stringValue));

        window.title(stringValue);

        assert.equal(titleElement.html(), kendo.htmlEncode(stringValue));
    });

    it("open of modal window adds overlay if it does not exist", function() {
        createWindow({ modal: true }).open();

        assert.equal($("body > .k-overlay").length, 1);
    });

    it("dblclick on resizable window title maximizes window", function() {
        let window = createWindow();

        window.wrapper.find(".k-window-titlebar").trigger("dblclick");

        assert.isOk(window.options.isMaximized);
    });

    it("dblclick on non resizable window title does not maximize window", function() {
        let window = createWindow({ resizable: false });

        window.element.find(".k-window-titlebar").trigger("dblclick");

        assert.isOk(!window.options.isMaximized);
    });

    it("close updates scroll position when window is maximized", function() {
        let originalHeight = Mocha.fixture.height();
        let container = $("<div style='height:2000px' />").appendTo(Mocha.fixture.height(2010)),
            document = $(Mocha.fixture[0].ownerDocument),
            window = createWindow({ visible: false }),
            scrollPosition = 200;

        document.scrollTop(0);
        window.setOptions({});
        window.open().maximize();
        window.close();

        document.scrollTop(scrollPosition);
        window.setOptions({});
        window.open().maximize();
        window.close();

        assert.equal(
            document.scrollTop(),
            scrollPosition
        );

        Mocha.fixture.height(originalHeight);
    });

    it("document vertical scroll position is preserved on maximize and restore", function() {
        let window = createWindow();
        let originalHeight = Mocha.fixture.height();

        let div = $("<div style='height:2000px' />").appendTo(
            Mocha.fixture.height(2010)
        ),
            scrollPosition = 300;

        $(Mocha.fixture[0].ownerDocument).scrollTop(scrollPosition);

        window.maximize();

        window.restore();

        assert.equal(
            $(Mocha.fixture[0].ownerDocument).scrollTop(),
            scrollPosition
        );

        Mocha.fixture.height(originalHeight);
    });

    it("document horizontal scroll position is preserved on maximize and restore", function() {
        let window = createWindow();
        let originalWidth = Mocha.fixture.width();

        let div = $("<div style='width:5000px' />").appendTo(
            Mocha.fixture.width(5020)
        ),
            scrollPosition = 1300;

        // Mocha.fixture's document is initially with overflow:hidden
        $(Mocha.fixture[0].ownerDocument)
            .find("html, body")
            .css("overflow", "");
        $(Mocha.fixture[0].ownerDocument).scrollLeft(scrollPosition);

        assert.equal(
            $(Mocha.fixture[0].ownerDocument).scrollLeft(),
            scrollPosition
        );

        window.center();

        window.maximize();

        window.restore();

        assert.equal(
            $(Mocha.fixture[0].ownerDocument).scrollLeft(),
            scrollPosition
        );

        Mocha.fixture.width(originalWidth);
    });

    it("destroying a modal window moves overlay before previous window", function() {
        let dialog = createWindow({
            modal: true
        }),
            overlappingDialog = createWindow({
                modal: true
            });

        overlappingDialog.destroy();
        assert.isOk(dialog.wrapper.prev("div").is(".k-overlay"));
    });

    it("destroy does not throw errors when called twice on the same object", function() {
        let dialog = createWindow();

        dialog.destroy();
        dialog.destroy();

        assert.isOk(true);
    });

    it("closing a modal window moves overlay before previous window", function() {
        let dialog = createWindow({
            modal: true
        }),
            overlappingDialog = createWindow({
                modal: true
            });

        overlappingDialog.close();
        assert.isOk(dialog.wrapper.prev("div").is(".k-overlay"));
    });

    it("closing a modal window removes overlay if previous modal has containment enabled", function() {
        $("<div id='container' style='height: 400px; width: 400px; position: absolute;' />").appendTo(Mocha.fixture);
        let dialog = createWindow({
            modal: true,
            draggable: {
                containment: "#container"
            },
            animation: false
        }),
            overlappingDialog = createWindow({
                modal: true,
                animation: false
            });

        overlappingDialog.close();
        dialog.close();

        assert.equal($(".k-overlay").length, 0);
    });

    it("destroying a modal window removes overlay if other open window has different appendTo", function() {
        let dialog = createWindow({
            modal: true,
            appendTo: Mocha.fixture
        }),
            overlappingDialog = createWindow({
                modal: true,
                appendTo: document.body
            });

        overlappingDialog.destroy();

        assert.equal($(".k-overlay").length, 1);
        assert.equal(Mocha.fixture.children(".k-overlay").length, 1);
    });

    it("closing window from close handler", function() {
        let dialog = createWindow({
            modal: true,
            close: function(e) {
                if (e.userTriggered) {
                    this.close();
                }
            },
            deactivate: function() {
                assert.isOk(true);
            }
        });

        dialog.wrapper.find(".k-i-x,.k-svg-i-x").click();
    });

    asyncTest("closing a modal window moves overlay below previous window", function(done) {
        function resumeTest() {
            window.setTimeout(function() {
                done(() => {
                    assert.isOk(
                        modalWindow1.wrapper.css("zIndex") >
                        modalWindow1.wrapper
                            .siblings(".k-overlay")
                            .css("zIndex")
                    );
                });
            }, 10);
        }

        let modalWindow2 = $("#modalWindow2")
            .kendoWindow({
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
            })
            .data("kendoWindow");

        let modalWindow1 = $("#modalWindow1")
            .kendoWindow({
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
            })
            .data("kendoWindow");

        modalWindow1.open();
        modalWindow2.open();

        modalWindow2.close();
    });

    asyncTest("refresh() of local URLs requests data via AJAX", function(done) {
        let dialog = createWindow(),
            hasRequestedData = false;

        $.mockjax(function() {
            hasRequestedData = true;
            done(() => {
                assert.isOk(hasRequestedData);
                $.mockjax.clear();
            });
            return {};
        });

        dialog.refresh("httpfoo");


    });

    asyncTest("refresh() with string uses it as a URL", function(done) {
        let url = "foo",
            dialog = createWindow({});

        $.mockjax({
            url: "foo",
            onAfterComplete: function() {
                let that = this;
                done(() => {
                    assert.equal(that.url, url);
                });
            }
        });

        dialog.refresh(url);
    });

    asyncTest("refresh() uses `content` if no url is provided", function(done) {
        $.mockjax(function(settings) {
            return {};
        });

        let url = "foo",
            dialog = createWindow({ content: url });

        $.mockjax.clear();
        $.mockjax(function(settings) {
            done(() => {
                assert.equal(settings.url, url);
            });
            return {};
        });

        dialog.refresh();
    });

    asyncTest("refresh() sends data to server", function(done) {
        let dialog = createWindow({}),
            data = { bar: "baz" };

        $.mockjax(function(settings) {
            done(() => {
                assert.deepEqual(settings.data, data);
            });
            return {};
        });

        dialog.refresh({
            url: "foo",
            data: data
        });
    });

    it("refresh() sets `content` option", function() {
        let dialog = createWindow({
            content: "http://example.com/"
        });

        dialog.refresh({ url: "test" });
        dialog.refresh();

        assert.equal(dialog.options.content.url, "test");
    });

    asyncTest("refresh() uses `content` object combined with URL", function(done) {
        $.mockjax(function(settings) {
            return {};
        });

        let url = "/bar",
            contentObject = { type: "POST" },
            dialog = createWindow({ content: contentObject });

        $.mockjax.clear();
        $.mockjax(function(settings) {
            done(() => {
                assert.equal(settings.url, url);
                assert.equal(settings.type, contentObject.type);
            });
            return {};
        });

        dialog.refresh(url);
    });

    it("refresh() creates iframe, if loading a remote url", function() {
        let dialog = createWindow({}),
            url = "http://example.com/";

        dialog.refresh(url);

        let iframe = dialog.wrapper.find("iframe");

        assert.equal(iframe.length, 1);
        assert.equal(iframe.attr("src"), url);
    });

    it("refresh() of AJAX window with cross-domain URL", function() {
        $.mockjax({
            url: "foo",
            responseText: "server foo"
        });

        let dialog = createWindow({
            content: "foo"
        }),
            url = "http://example.com/";

        dialog.refresh(url);

        let iframe = dialog.wrapper.find("iframe");

        assert.equal(iframe.length, 1);
        assert.equal(iframe.attr("src"), url);
    });

    it("refresh() of local URL with iframe", function() {
        $.mockjax({
            url: "foo",
            responseText: "server foo"
        });

        let dialog = createWindow({
            iframe: true
        });

        dialog.refresh({
            url: "foo"
        });

        let iframe = dialog.wrapper.find("iframe");

        assert.equal(iframe.length, 1);
        assert.equal(iframe.attr("src"), "foo");
    });

    it("refresh() creates iframe if iframe:true", function() {
        $.mockjax({
            url: "foo",
            responseText: "server foo"
        });

        let dialog = createWindow();

        dialog.refresh({
            url: "foo",
            iframe: true
        });

        let iframe = dialog.wrapper.find("iframe");

        assert.equal(iframe.length, 1);
        assert.equal(iframe.attr("src"), "foo");
    });

    it("content() destroys nested widgets", function() {
        let dialog = createWindow();

        let ddl = $("<input />").appendTo(dialog.element);

        ddl.kendoDropDownList({ dataSource: ["foo"] });

        ddl.data("kendoDropDownList").open();

        dialog.content("bar");

        assert.isOk(!ddl.data("kendoDropDownList"));
    });

    it("content() with jQuery object", function() {
        let dialog = createWindow();

        let dom = $("<span class='a'>foo</span>");

        dialog.content(dom);

        assert.equal(dialog.element.find(".a").length, 1);
    });

    it("toFront() raises window z-index above other windows", function() {
        let firstWindow = createWindow(),
            secondWindow = createWindow();

        firstWindow.toFront();

        assert.equal(
            +wrapper(firstWindow).css("zIndex"),
            +wrapper(secondWindow).css("zIndex") + 2
        );
    });

    function wrapper(windowObject) {
        return windowObject.element.closest(".k-window");
    }

    it("toFront() raises window z-index above other windows with different z-index", function() {
        let firstWindow = createWindow(),
            secondWindow = createWindow();

        wrapper(secondWindow).css("zIndex", 10012);

        firstWindow.toFront();

        assert.equal(
            +wrapper(firstWindow).css("zIndex"),
            +wrapper(secondWindow).css("zIndex") + 2
        );
    });

    it("toFront() overlays iframes of windows with lower z-index", function() {
        let firstWindow = createWindow(),
            secondWindow = createWindow({
                content: "http://google.com/"
            });

        firstWindow.toFront();

        assert.isOk(secondWindow.element.find("> .k-overlay").length);
    });

    it("toFront() appends only one overlay element to dom", function() {
        let firstWindow = createWindow(),
            secondWindow = createWindow({
                content: "http://google.com/"
            });

        firstWindow.toFront();
        firstWindow.toFront();

        assert.equal(secondWindow.element.find("> .k-overlay").length, 1);
    });

    it("toFront() removes overlay on foremost window", function() {
        let firstWindow = createWindow({
            content: "http://www.telerik.com/"
        }),
            secondWindow = createWindow({
                content: "http://google.com/"
            });

        firstWindow.toFront();

        assert.isOk(!firstWindow.element.find("> .k-overlay").length);
    });

    it("toFront() moves modal overlay above other windows", function() {
        let firstWindow1 = createWindow(),
            secondWindow1 = createWindow({
                modal: true
            });

        assert.isOk(
            parseInt(firstWindow1.wrapper.css("zIndex")) <
            parseInt($(".k-overlay").css("zIndex"))
        );
    });

    it("toFront() does not increase the window z-index if not necessary", function() {
        let dialog = createWindow(),
            zIndex = dialog.wrapper.css("zIndex");

        dialog.toFront();

        assert.equal(dialog.wrapper.css("zIndex"), zIndex);
    });

    asyncTest("open() calls toFront()", function(done) {
        let firstWindow = createWindow();

        firstWindow.close();

        firstWindow.toFront = function() {
            done(() => {
                assert.isOk(true);
            });
        };

        firstWindow.open();
    });

    it("open() sets options.visible", function() {
        let dialog = createWindow({
            visible: false,
            animation: false
        });

        dialog.open();

        assert.isOk(dialog.options.visible);
    });

    it("open() adds inline-flex display to wrapper", function() {
        let dialog = createWindow({
            visible: false,
            animation: false
        });

        dialog.open();

        assert.equal(dialog.wrapper[0].style['display'], "inline-flex");
    });

    it("close() does not throw error when dialog is present", function() {
        let dialog = createDialog({
            animation: false
        });
        let windowWidget = createWindow({
            animation: false
        });

        dialog.open();
        windowWidget.open();

        assert.doesNotThrow(function() {
            windowWidget.close();
        });
    });

    it("close() sets options.visible", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        dialog.close();

        assert.isOk(!dialog.options.visible);
    });

    it("pin() does not affect draggable", function() {
        let dialog = createWindow({
            visible: true,
            animation: false,
            draggable: true
        });

        dialog.pin();

        assert.equal(dialog.options.draggable, true);
    });

    it("pin() sets position:fixed style to wrapper", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        dialog.pin();

        assert.equal(dialog.wrapper.css("position"), "fixed");
    });

    it("pin() toggles button class to k-i-unpin", function() {
        let dialog = createWindow({
            visible: true,
            animation: false,
            actions: ["Pin"]
        });

        assert.equal(dialog.wrapper.find(".k-i-pin,.k-svg-i-pin").length, 1);
        assert.equal(dialog.wrapper.find(".k-i-unpin,.k-svg-i-unpin").length, 0);

        dialog.pin();

        assert.equal(dialog.wrapper.find(".k-i-unpin,.k-svg-i-unpin").length, 1);
        assert.equal(dialog.wrapper.find(".k-i-pin,.k-svg-i-pin").length, 0);
    });

    it("pin() substracts the browser scroll position from the wrapper's top and left styles", function() {
        let spacerDiv = $(
            "<div style='width:6000px;height:3000px'>&nbsp;</div>"
        ).appendTo(Mocha.fixture);

        $(window).scrollLeft(2000);
        $(window).scrollTop(1000);

        let initialTop,
            initialLeft,
            dialog = createWindow({
                visible: true,
                animation: false
            });

        dialog.center();

        initialTop = parseInt(dialog.wrapper.css("top"), 10);
        initialLeft = parseInt(dialog.wrapper.css("left"), 10);

        dialog.pin();

        let finalTop = parseInt(dialog.wrapper.css("top"), 10);
        let finalLeft = parseInt(dialog.wrapper.css("left"), 10);

        assert.equal(finalTop, initialTop - $(window).scrollTop());
        assert.equal(finalLeft, initialLeft - $(window).scrollLeft());

        spacerDiv.remove();
    });

    it("pin() itself should not subtract scroll without center or unpin where called", function() {
        let spacerDiv = $(
            "<div style='width:6000px;height:3000px'>&nbsp;</div>"
        ).appendTo(Mocha.fixture);

        $(window).scrollLeft(2000);
        $(window).scrollTop(1000);

        let initialTop,
            initialLeft,
            dialog = createWindow({
                visible: true,
                animation: false
            });

        initialTop = parseInt(dialog.wrapper.css("top"), 10);
        initialLeft = parseInt(dialog.wrapper.css("left"), 10);

        dialog.pin();

        let finalTop = parseInt(dialog.wrapper.css("top"), 10);
        let finalLeft = parseInt(dialog.wrapper.css("left"), 10);

        assert.equal(finalTop, initialTop);
        assert.equal(finalLeft, initialLeft);

        dialog.unpin();
        dialog.center();

        initialTop = parseInt(dialog.wrapper.css("top"), 10);
        initialLeft = parseInt(dialog.wrapper.css("left"), 10);

        dialog.pin();

        finalTop = parseInt(dialog.wrapper.css("top"), 10);
        finalLeft = parseInt(dialog.wrapper.css("left"), 10);

        assert.equal(finalTop, initialTop - $(window).scrollTop());
        assert.equal(finalLeft, initialLeft - $(window).scrollLeft());
    });

    it("unpin() does not affect draggable", function() {
        let dialog = createWindow({
            visible: true,
            animation: false,
            draggable: true,
            pinned: true
        });

        dialog.unpin();

        assert.equal(dialog.options.draggable, true);
    });

    it("unpin() removes position:fixed style from wrapper", function() {
        let dialog = createWindow({
            visible: true,
            animation: false,
            pinned: true
        });

        dialog.unpin();

        assert.equal(dialog.wrapper.css("position"), "absolute");
    });

    it("unpin() toggles button class to k-i-pin", function() {
        let dialog = createWindow({
            visible: true,
            animation: false,
            actions: ["Pin"],
            pinned: true
        });

        assert.equal(dialog.wrapper.find(".k-i-unpin,.k-svg-i-unpin").length, 1);
        assert.equal(dialog.wrapper.find(".k-i-pin,.k-svg-i-pin").length, 0);

        dialog.unpin();

        assert.equal(dialog.wrapper.find(".k-i-pin,.k-svg-i-pin").length, 1);
        assert.equal(dialog.wrapper.find(".k-i-unpin,.k-svg-i-unpin").length, 0);
    });

    it("unpin() adds the browser scroll position to the wrapper's top and left styles", function() {
        let spacerDiv = $(
            "<div style='width:6000px;height:3000px'>&nbsp;</div>"
        ).appendTo(Mocha.fixture);

        $(window).scrollLeft(2000);
        $(window).scrollTop(1000);

        let initialTop,
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

        let finalTop = parseInt(dialog.wrapper.css("top"), 10);
        let finalLeft = parseInt(dialog.wrapper.css("left"), 10);

        assert.equal(finalTop, initialTop + $(window).scrollTop());
        assert.equal(finalLeft, initialLeft + $(window).scrollLeft());

        spacerDiv.remove();
    });

    it("restoring a pinned Window preserves the pinned state", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        dialog.center();
        dialog.minimize();
        dialog.pin();
        dialog.restore();

        assert.equal(dialog.wrapper.css("position"), "fixed");
    });

    it("centering a Window sets correct top and left styles", function() {
        let win = $(window),
            dialog = createWindow({
                animation: false,
                width: "50%",
                height: "50%"
            });

        dialog.center();

        assert.closeTo(
            parseInt(dialog.wrapper.css("top"), 10),
            (win.height() - parseInt(dialog.wrapper.outerHeight(), 10)) / 2,
            1
        );
        assert.closeTo(
            parseInt(dialog.wrapper.css("left"), 10),
            (win.width() - parseInt(dialog.wrapper.outerWidth(), 10)) / 2,
            1
        );
    });

    it("centering a pinned Window sets correct top and left styles", function() {
        let pageWidth = 6000,
            pageHeight = pageWidth,
            scrollPosition = pageWidth / 3;

        let originalHeight = Mocha.fixture.height();

        let div = $("<div />")
            .css({ width: pageWidth, height: pageHeight })
            .appendTo(Mocha.fixture.height(pageHeight));

        $(Mocha.fixture[0].ownerDocument)
            .scrollTop(scrollPosition)
            .scrollLeft(scrollPosition);

        let dialog1 = createWindow({
            pinned: true,
            animation: false
        });
        let dialog2 = createWindow({
            pinned: false,
            animation: false
        });

        dialog1.center();
        dialog2.center();

        assert.equal(
            parseInt(dialog1.wrapper.css("top"), 10),
            parseInt(dialog2.wrapper.css("top"), 10) - scrollPosition
        );
        assert.equal(
            parseInt(dialog1.wrapper.css("left"), 10),
            parseInt(dialog2.wrapper.css("left"), 10) - scrollPosition
        );

        Mocha.fixture.height(originalHeight);
    });

    it("minimize() removes min-height", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        dialog.minimize();

        assert.isOk(!dialog.wrapper[0].style.minHeight);
    });

    it("restore() adds back min-height", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        dialog.minimize();
        dialog.restore();

        assert.isOk(dialog.wrapper[0].style.minHeight);
    });

    it("maximize() hides the pin/unpin icon", function() {
        let dialog = createWindow({
            visible: true,
            actions: ["Pin"],
            animation: false
        });

        dialog.maximize();

        assert.equal(dialog.wrapper.find(".k-i-pin:visible,.k-svg-i-pin:visible").length, 0);
    });

    it("maximize() hides the maximize icon", function() {
        let dialog = createWindow({
            visible: true,
            actions: ["Maximize"],
            animation: false
        });

        dialog.maximize();

        assert.equal(
            dialog.wrapper.find(".k-i-window:visible,.k-svg-i-window:visible").length,
            0
        );
    });

    it("maximize() shows the restore icon", function() {
        let dialog = createWindow({
            visible: true,
            actions: ["Maximize"],
            animation: false
        });

        dialog.maximize();

        assert.equal(
            dialog.wrapper.find(".k-i-window-restore:visible,.k-svg-i-window-restore:visible").length,
            1
        );
    });

    it("maximize() adds a k-window-maximized class", function() {
        let dialog = createWindow({
            visible: true,
            actions: ["Pin"],
            animation: false
        });

        dialog.maximize();

        assert.isOk(dialog.wrapper.is(".k-window-maximized"));
    });

    it("restore() shows the pin/unpin icon", function() {
        let dialog = createWindow({
            visible: true,
            actions: ["Pin"],
            animation: false
        });

        dialog.maximize();
        dialog.restore();

        assert.equal(dialog.wrapper.find(".k-i-pin:visible,.k-svg-i-pin:visible").length, 1);
    });

    it("restore() removes the k-window-maximized class", function() {
        let dialog = createWindow({
            visible: true,
            actions: ["Pin"],
            animation: false
        });

        dialog.maximize();
        dialog.wrapper.addClass("k-window-maximized");
        dialog.restore();

        assert.isOk(!dialog.wrapper.is(".k-window-maximized"));
    });

    it("title() on titleless window does not fail", function() {
        let dialog = createWindow({ title: false });

        dialog.title("foo");

        assert.isOk(true);
    });

    it("title(false) removes titlebar", function() {
        let dialog = createWindow({ title: "foo" });

        dialog.title(false);

        assert.equal(dialog.wrapper.find(".k-window-titlebar").length, 0);
        assert.equal(parseInt(dialog.wrapper.css("padding-top"), 10), 0);
    });

    it("title('foo') on titleless window adds title", function() {
        let dialog = createWindow({ title: false });

        dialog.title("foo");

        assert.equal(dialog.wrapper.find(".k-window-titlebar").length, 1);
    });

    it("extending the window does not break the close method", function() {
        let MyWindow = kendo.ui.Window.extend({
            options: {
                name: "MyWindow",
                animation: false
            },
            init: function(element, options) {
                kendo.ui.Window.prototype.init.apply(this, [
                    element,
                    options
                ]);
            }
        });

        kendo.ui.plugin(MyWindow);

        let myWindow = $("<div />")
            .kendoMyWindow()
            .data("kendoMyWindow");

        myWindow.open().close();

        myWindow.destroy();

        assert.isOk(true);
    });

    it("destroying a window destroys nested components", function() {
        let html =
            "<div id='dialog'><select><option>foo</option></select></div>";

        let dialog = $(html)
            .appendTo(Mocha.fixture)
            .find("select")
            .kendoDropDownList()
            .end()
            .kendoWindow()
            .data("kendoWindow");

        dialog.element
            .find("select")
            .data("kendoDropDownList")
            .open();

        dialog.destroy();

        assert.equal($("body > .k-animation-container").length, 0);
    });

    it("async open/close of model windows leaves overlay", function() {
        let first = createWindow({ modal: true });
        let second = createWindow({ modal: true, visible: false });

        first.close();
        second.open();

        assert.isOk($(".k-overlay").is(":visible"));
    });

    asyncTest("opening a closing animated window leaves it in opened state", function(done) {
        let dialog = createWindow({
            animation: {
                open: { duration: 50 },
                close: { duration: 50 }
            }
        });

        dialog.close().open();

        setTimeout(function() {

            done(() => {
                assert.isOk(dialog.wrapper.is(":visible"));
            });
        }, 100);
    });

    it("setOptions can toggle draggable option", function() {
        let dialog = createWindow();

        dialog.setOptions({ draggable: true });

        assert.isOk(dialog.dragging);

        let draggingDestroy = spy(dialog.dragging, "destroy");

        dialog.setOptions({ draggable: false });

        assert.isOk(!dialog.dragging);
        assert.isOk(draggingDestroy.calls("destroy"), 1);
    });

    it("setOptions can toggle resizable option", function() {
        let dialog = createWindow();

        dialog.setOptions({ resizable: true });

        assert.isOk(dialog.resizing);

        let resizingDestroy = spy(dialog.resizing, "destroy");

        dialog.setOptions({ resizable: false });

        assert.isOk(!dialog.resizing);
        assert.isOk(resizingDestroy.calls("destroy"), 1);
    });

    it("setOptions can set zero integer position", function() {
        let dialog = createWindow();

        dialog.setOptions({
            position: {
                top: 0,
                left: 0
            }
        });

        assert.equal(dialog.wrapper.css("left"), "0px");
        assert.equal(dialog.wrapper.css("top"), "0px");
    });

    it("setOptions can set integer position", function() {
        let dialog = createWindow();

        dialog.setOptions({
            position: {
                top: 10,
                left: 10
            }
        });

        assert.equal(dialog.wrapper.css("left"), "10px");
        assert.equal(dialog.wrapper.css("top"), "10px");
    });

    it("setOptions can set string position", function() {
        let dialog = createWindow();

        dialog.setOptions({
            position: {
                top: "10px",
                left: "10px"
            }
        });

        assert.equal(dialog.wrapper.css("left"), "10px");
        assert.equal(dialog.wrapper.css("top"), "10px");
    });

    it("setOptions resets maximized state", function() {
        let dialog = createWindow();

        dialog.maximize();

        dialog.setOptions({
            position: {
                width: 100,
                height: 200
            }
        });

        assert.isOk(!dialog.options.isMaximized);
    });

    it("setting new title updates widget options", function() {
        let newTitle = "foo",
            dialog = createWindow();

        dialog.title(newTitle);

        assert.equal(dialog.options.title, newTitle);
    });

    it("setOptions can toggle modality 1", function() {
        let dialog = createWindow({ modal: false });

        dialog.setOptions({ modal: true });

        assert.equal(
            dialog.wrapper.siblings(".k-overlay").filter(":visible").length,
            1
        );

        dialog.setOptions({ modal: false });

        assert.equal(
            dialog.wrapper.siblings(".k-overlay").filter(":visible").length,
            0
        );
    });

    it("setOptions can toggle modality 2", function() {
        let dialog = createWindow({ modal: true });

        dialog.setOptions({ modal: false });

        assert.equal(
            dialog.wrapper.siblings(".k-overlay").filter(":visible").length,
            0
        );

        dialog.setOptions({ modal: true });

        assert.equal(
            dialog.wrapper.siblings(".k-overlay").filter(":visible").length,
            1
        );
    });

    it("setOptions does not show modal overlay if window is hidden", function() {
        let dialog = createWindow({ visible: false });

        dialog.setOptions({ modal: true });

        assert.equal(
            dialog.wrapper.siblings(".k-overlay").filter(":visible").length,
            0
        );

        dialog.setOptions({ modal: true, visible: false });

        assert.equal(
            dialog.wrapper.siblings(".k-overlay").filter(":visible").length,
            0
        );
    });

    it("setOptions to suppress close animation", function() {
        let dialog = createWindow({ visible: false });

        dialog.setOptions({
            animation: {
                close: false
            }
        });

        dialog.open();

        assert.isOk(true);
    });

    it("setOptions should make deep extend of options.position", function() {
        let dialog = createWindow({
            visible: false,
            position: {
                top: 100,
                left: 200
            }
        });

        dialog.setOptions({
            position: {
                top: 200
            }
        });

        assert.deepEqual(
            dialog.options.position,
            { top: 200, left: 200 },
            "position.top should be changed, but position.left stays the same"
        );

        dialog.setOptions({
            position: {
                left: 300
            }
        });

        assert.deepEqual(
            dialog.options.position,
            { top: 200, left: 300 },
            "position.top stays the same, but position.left is changed"
        );

        dialog.setOptions({
            position: {
                left: "50%"
            }
        });

        assert.deepEqual(
            dialog.options.position,
            { top: 200, left: "50%" },
            "string values should work too"
        );
    });

    asyncTest("overlay is not hidden when showing second modal window after closing first", async function(done) {
        let dialog = createWindow({
            animation: { close: { duration: 500 } },
            modal: true
        });

        let secondDialog = createWindow({
            animation: { open: { duration: 1000 } },
            modal: true,
            visible: false,
            activate: function() {
                done(() => {
                    assert.isOk($(".k-overlay").is(":visible"));
                });
            }
        });

        dialog.close();
        await vi.waitUntil(() => !$(".k-overlay:visible").length);
        secondDialog.open();
    });

    it("setOptions allows changing of window actions", function() {
        let dialog = createWindow();

        dialog.setOptions({
            actions: ["Minimize", "Close"]
        });

        assert.equal(dialog.wrapper.find(".k-i-window-minimize,.k-svg-i-window-minimize").length, 1);
    });

    it("toFront does not scroll page when windows are pinned", function() {
        let spacerDiv = $(
            "<div style='height:3000px'>&nbsp;</div>"
        ).appendTo(Mocha.fixture);
        let dialog = createWindow({
            pinned: true
        });
        $(window).scrollTop(200);
        $(dialog.wrapper).css({ top: 180 });

        dialog.toFront();

        assert.equal($(window).scrollTop(), 200);
        spacerDiv.remove();
    });

    function setDimensionTest(dim) {
        let options = {};
        options[dim] = 400;
        let wnd = createWindow(options);

        options[dim] = null;
        wnd.setOptions(options);

        assert.isOk(!wnd.wrapper[0].style[dim]);
    }

    it("setOptions resets width", $.proxy(setDimensionTest, this, "width"));
    it(
        "setOptions resets height",
        $.proxy(setDimensionTest, this, "height")
    );
    it(
        "setOptions resets minWidth",
        $.proxy(setDimensionTest, this, "minWidth")
    );
    it(
        "setOptions resets maxWidth",
        $.proxy(setDimensionTest, this, "maxWidth")
    );
    it(
        "setOptions resets minHeight",
        $.proxy(setDimensionTest, this, "minHeight")
    );
    it(
        "setOptions resets maxHeight",
        $.proxy(setDimensionTest, this, "maxHeight")
    );

    it("isMinimized is updated when minimizing window", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        dialog.minimize();

        assert.isOk(dialog.isMinimized());
    });

    it("isMinimized is updated when restoring window", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        dialog.minimize();
        dialog.restore();

        assert.isOk(!dialog.isMinimized());
    });

    it("isMaximized is updated when maximizing window", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        dialog.maximize();

        assert.isOk(dialog.isMaximized());
    });

    it("isMaximized is updated when restoring window", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        dialog.maximize();
        dialog.restore();

        assert.isOk(!dialog.isMaximized());
    });

    it("maximize() takes borders into account", function() {
        let borderWidth = 10;

        let dialog = createWindow({
            visible: true,
            animation: false
        });

        dialog.wrapper.css("border-width", borderWidth + "px");

        dialog.maximize();

        roughlyEqual(
            dialog.wrapper.width() + borderWidth * 2,
            $(window).width(),
            1
        );
    });

    it("maximize() sets body's and html's overflow to hidden", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        // Mocha.fixture's document is initially with overflow:hidden
        $(Mocha.fixture[0].ownerDocument)
            .find("html, body")
            .css("overflow", "");

        dialog.maximize();

        assert.equal($("body").css("overflow"), "hidden");
        assert.equal($("html").css("overflow"), "hidden");
        dialog.close();
    });

    it("restore() restores body's and html's original overflow after maximize()", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        // Mocha.fixture's document is initially with overflow:hidden
        $(Mocha.fixture[0].ownerDocument)
            .find("html, body")
            .css("overflow", "scroll");

        dialog.maximize();
        dialog.restore();

        assert.equal($("body").css("overflow"), "scroll");
        assert.equal($("html").css("overflow"), "scroll");
    });

    it("closing maximized window restores body's and html's original overflow", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        // Mocha.fixture's document is initially with overflow:hidden
        $(Mocha.fixture[0].ownerDocument)
            .find("html, body")
            .css("overflow", "scroll");

        dialog.maximize();
        dialog.close();

        assert.equal($("body").css("overflow"), "scroll");
        assert.equal($("html").css("overflow"), "scroll");
    });

    it("opening maximized window sets body's and html's overflow to hidden", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        // Mocha.fixture's document is initially with overflow:hidden
        $(Mocha.fixture[0].ownerDocument)
            .find("html, body")
            .css("overflow", "scroll");

        dialog.maximize();
        dialog.close();
        dialog.open();

        assert.equal($("body").css("overflow"), "hidden");
        assert.equal($("html").css("overflow"), "hidden");
    });

    it("closing maximized window retrieved original body's and html's overflow", function() {
        let dialog = createWindow({
            visible: true,
            animation: false
        });

        // Mocha.fixture's document is initially with overflow:hidden
        $(Mocha.fixture[0].ownerDocument)
            .find("html, body")
            .css("overflow", "scroll");

        dialog.maximize();
        dialog.open();
        dialog.close();

        assert.equal($("body").css("overflow"), "scroll");
        assert.equal($("html").css("overflow"), "scroll");
    });

    it("get properly modals", function() {
        let dialog1 = createWindow({
            modal: true,
            title: 'First Window'
        });

        let dialog2 = createWindow({
            modal: true,
            title: 'Second Window'
        });

        assert.equal(dialog1._modals().length, 2);
        assert.equal(dialog2._modals().length, 2);
    });

    it("get properly modals in containment scenario", function() {
        let div = $('<div id="containement" style="height:500px;width:500px">');
        div.appendTo(Mocha.fixture);

        let dialog1 = createWindow({
            modal: true,
            title: 'First Window',
            draggable: {
                containment: '#containement'
            }
        });

        let dialog2 = createWindow({
            modal: true,
            title: 'Second Window',
            draggable: {
                containment: '#containement'
            }
        });

        assert.equal(dialog1._modals().length, 2);
        assert.equal(dialog2._modals().length, 2);
    });
});
