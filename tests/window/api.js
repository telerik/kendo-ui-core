(function() {
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
            var Window = kendo.ui.Window;
            Mocha.fixture.html(__html__["tests/window/modals-fixture.html"]);
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
            var window = createWindow({ title: "Title" }),
                oldTitle = window.title(),
                titleElement = $(".k-window-title", window.wrapper);

            window.title("Title is the new title!");

            assert.equal(titleElement.text(), "Title is the new title!");

            window.title(oldTitle);

            assert.equal(titleElement.text(), oldTitle);
        });

        it("title method gets and sets the title consistently", function() {
            var title = "foo",
                window = createWindow({ title: title }),
                oldTitle = window.title(),
                newTitle,
                titleElement = $(".k-window-title", window.wrapper);

            assert.equal(window.title(), title);

            window.title(window.title());

            assert.equal(window.title(), title);
        });

        it("title method and title property encode the title", function() {
            var stringValue = "<script>var foo1 = 1;</script>",
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
            var window = createWindow();

            window.wrapper.find(".k-window-titlebar").trigger("dblclick");

            assert.isOk(window.options.isMaximized);
        });

        it("dblclick on non resizable window title does not maximize window", function() {
            var window = createWindow({ resizable: false });

            window.element.find(".k-window-titlebar").trigger("dblclick");

            assert.isOk(!window.options.isMaximized);
        });

        it("close updates scroll position when window is maximized", function() {
            var container = $("<div style='height:2000px' />").appendTo(Mocha.fixture.height(2010)),
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
        });

        it("document vertical scroll position is preserved on maximize and restore", function() {
            var window = createWindow();

            var div = $("<div style='height:2000px' />").appendTo(
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
        });

        it("document horizontal scroll position is preserved on maximize and restore", function() {
            var window = createWindow();

            var div = $("<div style='width:5000px' />").appendTo(
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
        });

        it("destroying a modal window moves overlay before previous window", function() {
            var dialog = createWindow({
                    modal: true
                }),
                overlappingDialog = createWindow({
                    modal: true
                });

            overlappingDialog.destroy();
            assert.isOk(dialog.wrapper.prev("div").is(".k-overlay"));
        });

        it("destroy does not throw errors when called twice on the same object", function() {
            var dialog = createWindow();

            dialog.destroy();
            dialog.destroy();

            assert.isOk(true);
        });

        it("closing a modal window moves overlay before previous window", function() {
            var dialog = createWindow({
                    modal: true
                }),
                overlappingDialog = createWindow({
                    modal: true
                });

            overlappingDialog.close();
            assert.isOk(dialog.wrapper.prev("div").is(".k-overlay"));
        });

        it("closing a modal window moves overlay before previous Kendo Dialog too", function() {
            var dialog = createDialog({
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
            var dialog = createWindow({
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
            var dialog = createWindow({
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
            var dialog = createWindow({
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

            dialog.wrapper.find(".k-i-close").click();
        });

        it("closing a modal window moves overlay below previous window", function(done) {
            function resumeTest() {
                window.setTimeout(function() {
                    assert.isOk(
                        modalWindow1.wrapper.css("zIndex") >
                        modalWindow1.wrapper
                            .siblings(".k-overlay")
                            .css("zIndex")
                    );
                    done();
                }, 10);
            }

            var modalWindow2 = $("#modalWindow2")
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

            var modalWindow1 = $("#modalWindow1")
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

        it("refresh() of local URLs requests data via AJAX", function(done) {
            var dialog = createWindow(),
                hasRequestedData = false;

            $.mockjax(function() {
                hasRequestedData = true;
                done();
                return {};
            });

            dialog.refresh("httpfoo");

            assert.isOk(hasRequestedData);

            $.mockjax.clear();
        });

        it("refresh() with string uses it as a URL", function(done) {
            var url = "foo",
                dialog = createWindow({});

            $.mockjax({
                url: "foo",
                onAfterComplete: function() {
                    assert.equal(this.url, url);
                    done();
                }
            });

            dialog.refresh(url);
        });

        it("refresh() uses `content` if no url is provided", function(done) {
            $.mockjax(function(settings) {
                return {};
            });

            var url = "foo",
                dialog = createWindow({ content: url });

            $.mockjax.clear();
            $.mockjax(function(settings) {
                assert.equal(settings.url, url);
                done();
                return {};
            });

            dialog.refresh();
        });

        it("refresh() sends data to server", function(done) {
            var dialog = createWindow({}),
                data = { bar: "baz" };

            $.mockjax(function(settings) {
                assert.deepEqual(settings.data, data);
                done();
                return {};
            });

            dialog.refresh({
                url: "foo",
                data: data
            });
        });

        it("refresh() sets `content` option", function() {
            var dialog = createWindow({
                content: "http://example.com/"
            });

            dialog.refresh({ url: "test" });
            dialog.refresh();

            assert.equal(dialog.options.content.url, "test");
        });

        it("refresh() uses `content` object combined with URL", function(done) {
            $.mockjax(function(settings) {
                return {};
            });

            var url = "/bar",
                contentObject = { type: "POST" },
                dialog = createWindow({ content: contentObject });

            $.mockjax.clear();
            $.mockjax(function(settings) {
                assert.equal(settings.url, url);
                assert.equal(settings.type, contentObject.type);
                done();
                return {};
            });

            dialog.refresh(url);
        });

        it("refresh() creates iframe, if loading a remote url", function() {
            var dialog = createWindow({}),
                url = "http://example.com/";

            dialog.refresh(url);

            var iframe = dialog.wrapper.find("iframe");

            assert.equal(iframe.length, 1);
            assert.equal(iframe.attr("src"), url);
        });

        it("refresh() of AJAX window with cross-domain URL", function() {
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

            assert.equal(iframe.length, 1);
            assert.equal(iframe.attr("src"), url);
        });

        it("refresh() of local URL with iframe", function() {
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

            assert.equal(iframe.length, 1);
            assert.equal(iframe.attr("src"), "foo");
        });

        it("refresh() creates iframe if iframe:true", function() {
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

            assert.equal(iframe.length, 1);
            assert.equal(iframe.attr("src"), "foo");
        });

        it("content() destroys nested widgets", function() {
            var dialog = createWindow();

            var ddl = $("<input />").appendTo(dialog.element);

            ddl.kendoDropDownList({ dataSource: ["foo"] });

            ddl.data("kendoDropDownList").open();

            dialog.content("bar");

            assert.isOk(!ddl.data("kendoDropDownList"));
        });

        it("content() with jQuery object", function() {
            var dialog = createWindow();

            var dom = $("<span class='a'>foo</span>");

            dialog.content(dom);

            assert.equal(dialog.element.find(".a").length, 1);
        });

        it("toFront() raises window z-index above other windows", function() {
            var firstWindow = createWindow(),
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
            var firstWindow = createWindow(),
                secondWindow = createWindow();

            wrapper(secondWindow).css("zIndex", 10012);

            firstWindow.toFront();

            assert.equal(
                +wrapper(firstWindow).css("zIndex"),
                +wrapper(secondWindow).css("zIndex") + 2
            );
        });

        it("toFront() overlays iframes of windows with lower z-index", function() {
            var firstWindow = createWindow(),
                secondWindow = createWindow({
                    content: "http://google.com/"
                });

            firstWindow.toFront();

            assert.isOk(secondWindow.element.find("> .k-overlay").length);
        });

        it("toFront() appends only one overlay element to dom", function() {
            var firstWindow = createWindow(),
                secondWindow = createWindow({
                    content: "http://google.com/"
                });

            firstWindow.toFront();
            firstWindow.toFront();

            assert.equal(secondWindow.element.find("> .k-overlay").length, 1);
        });

        it("toFront() removes overlay on foremost window", function() {
            var firstWindow = createWindow({
                    content: "http://www.telerik.com/"
                }),
                secondWindow = createWindow({
                    content: "http://google.com/"
                });

            firstWindow.toFront();

            assert.isOk(!firstWindow.element.find("> .k-overlay").length);
        });

        it("toFront() moves modal overlay above other windows", function() {
            var firstWindow1 = createWindow(),
                secondWindow1 = createWindow({
                    modal: true
                });

            assert.isOk(
                parseInt(firstWindow1.wrapper.css("zIndex")) <
                    parseInt($(".k-overlay").css("zIndex"))
            );
        });

        it("toFront() does not increase the window z-index if not necessary", function() {
            var dialog = createWindow(),
                zIndex = dialog.wrapper.css("zIndex");

            dialog.toFront();

            assert.equal(dialog.wrapper.css("zIndex"), zIndex);
        });

        it("open() calls toFront()", function(done) {
            var firstWindow = createWindow();

            firstWindow.close();

            firstWindow.toFront = function() {
                assert.isOk(true);
                done();
            };

            firstWindow.open();
        });

        it("open() sets options.visible", function() {
            var dialog = createWindow({
                visible: false,
                animation: false
            });

            dialog.open();

            assert.isOk(dialog.options.visible);
        });

        it("open() adds k-display-inline-flex class to wrapper", function() {
            var dialog = createWindow({
                visible: false,
                animation: false
            });

            dialog.open();

            assert.isOk(dialog.wrapper.hasClass("k-display-inline-flex"));
        });

        it("close() sets options.visible", function() {
            var dialog = createWindow({
                visible: true,
                animation: false
            });

            dialog.close();

            assert.isOk(!dialog.options.visible);
        });

        it("pin() does not affect draggable", function() {
            var dialog = createWindow({
                visible: true,
                animation: false,
                draggable: true
            });

            dialog.pin();

            assert.equal(dialog.options.draggable, true);
        });

        it("pin() sets position:fixed style to wrapper", function() {
            var dialog = createWindow({
                visible: true,
                animation: false
            });

            dialog.pin();

            assert.equal(dialog.wrapper.css("position"), "fixed");
        });

        it("pin() toggles button class to k-i-unpin", function() {
            var dialog = createWindow({
                visible: true,
                animation: false,
                actions: ["Pin"]
            });

            assert.equal(dialog.wrapper.find(".k-i-pin").length, 1);
            assert.equal(dialog.wrapper.find(".k-i-unpin").length, 0);

            dialog.pin();

            assert.equal(dialog.wrapper.find(".k-i-unpin").length, 1);
            assert.equal(dialog.wrapper.find(".k-i-pin").length, 0);
        });

        it("pin() substracts the browser scroll position from the wrapper's top and left styles", function() {
            var spacerDiv = $(
                "<div style='width:6000px;height:3000px'>&nbsp;</div>"
            ).appendTo(Mocha.fixture);

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

            assert.equal(finalTop, initialTop - $(window).scrollTop());
            assert.equal(finalLeft, initialLeft - $(window).scrollLeft());

            spacerDiv.remove();
        });

        it("pin() itself should not subtract scroll without center or unpin where called", function(){
            var spacerDiv = $(
                "<div style='width:6000px;height:3000px'>&nbsp;</div>"
            ).appendTo(Mocha.fixture);

            $(window).scrollLeft(2000);
            $(window).scrollTop(1000);

            var initialTop,
                initialLeft,
                dialog = createWindow({
                    visible: true,
                    animation: false
                });

            initialTop = parseInt(dialog.wrapper.css("top"), 10);
            initialLeft = parseInt(dialog.wrapper.css("left"), 10);

            dialog.pin();

            finalTop = parseInt(dialog.wrapper.css("top"), 10);
            finalLeft = parseInt(dialog.wrapper.css("left"), 10);

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
            var dialog = createWindow({
                visible: true,
                animation: false,
                draggable: true,
                pinned: true
            });

            dialog.unpin();

            assert.equal(dialog.options.draggable, true);
        });

        it("unpin() removes position:fixed style from wrapper", function() {
            var dialog = createWindow({
                visible: true,
                animation: false,
                pinned: true
            });

            dialog.unpin();

            assert.equal(dialog.wrapper.css("position"), "absolute");
        });

        it("unpin() toggles button class to k-i-pin", function() {
            var dialog = createWindow({
                visible: true,
                animation: false,
                actions: ["Pin"],
                pinned: true
            });

            assert.equal(dialog.wrapper.find(".k-i-unpin").length, 1);
            assert.equal(dialog.wrapper.find(".k-i-pin").length, 0);

            dialog.unpin();

            assert.equal(dialog.wrapper.find(".k-i-pin").length, 1);
            assert.equal(dialog.wrapper.find(".k-i-unpin").length, 0);
        });

        it("unpin() adds the browser scroll position to the wrapper's top and left styles", function() {
            var spacerDiv = $(
                "<div style='width:6000px;height:3000px'>&nbsp;</div>"
            ).appendTo(Mocha.fixture);

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

            assert.equal(finalTop, initialTop + $(window).scrollTop());
            assert.equal(finalLeft, initialLeft + $(window).scrollLeft());

            spacerDiv.remove();
        });

        it("restoring a pinned Window preserves the pinned state", function() {
            var dialog = createWindow({
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
            var win = $(window),
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
            var pageWidth = 6000,
                pageHeight = pageWidth,
                scrollPosition = pageWidth / 3;

            var div = $("<div />")
                .css({ width: pageWidth, height: pageHeight })
                .appendTo(Mocha.fixture.height(pageHeight));

            $(Mocha.fixture[0].ownerDocument)
                .scrollTop(scrollPosition)
                .scrollLeft(scrollPosition);

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

            assert.equal(
                parseInt(dialog1.wrapper.css("top"), 10),
                parseInt(dialog2.wrapper.css("top"), 10) - scrollPosition
            );
            assert.equal(
                parseInt(dialog1.wrapper.css("left"), 10),
                parseInt(dialog2.wrapper.css("left"), 10) - scrollPosition
            );
        });

        it("minimize() removes min-height", function() {
            var dialog = createWindow({
                visible: true,
                animation: false
            });

            dialog.minimize();

            assert.isOk(!dialog.wrapper[0].style.minHeight);
        });

        it("restore() adds back min-height", function() {
            var dialog = createWindow({
                visible: true,
                animation: false
            });

            dialog.minimize();
            dialog.restore();

            assert.isOk(dialog.wrapper[0].style.minHeight);
        });

        it("maximize() hides the pin/unpin icon", function() {
            var dialog = createWindow({
                visible: true,
                actions: ["Pin"],
                animation: false
            });

            dialog.maximize();

            assert.equal(dialog.wrapper.find(".k-i-pin:visible").length, 0);
        });

        it("maximize() hides the maximize icon", function() {
            var dialog = createWindow({
                visible: true,
                actions: ["Maximize"],
                animation: false
            });

            dialog.maximize();

            assert.equal(
                dialog.wrapper.find(".k-i-window-maximize:visible").length,
                0
            );
        });

        it("maximize() shows the restore icon", function() {
            var dialog = createWindow({
                visible: true,
                actions: ["Maximize"],
                animation: false
            });

            dialog.maximize();

            assert.equal(
                dialog.wrapper.find(".k-i-window-restore:visible").length,
                1
            );
        });

        it("maximize() adds a k-window-maximized class", function() {
            var dialog = createWindow({
                visible: true,
                actions: ["Pin"],
                animation: false
            });

            dialog.maximize();

            assert.isOk(dialog.wrapper.is(".k-window-maximized"));
        });

        it("restore() shows the pin/unpin icon", function() {
            var dialog = createWindow({
                visible: true,
                actions: ["Pin"],
                animation: false
            });

            dialog.maximize();
            dialog.restore();

            assert.equal(dialog.wrapper.find(".k-i-pin:visible").length, 1);
        });

        it("restore() removes the k-window-maximized class", function() {
            var dialog = createWindow({
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
            var dialog = createWindow({ title: false });

            dialog.title("foo");

            assert.isOk(true);
        });

        it("title(false) removes titlebar", function() {
            var dialog = createWindow({ title: "foo" });

            dialog.title(false);

            assert.equal(dialog.wrapper.find(".k-window-titlebar").length, 0);
            assert.equal(parseInt(dialog.wrapper.css("padding-top"), 10), 0);
        });

        it("title('foo') on titleless window adds title", function() {
            var dialog = createWindow({ title: false });

            dialog.title("foo");

            assert.equal(dialog.wrapper.find(".k-window-titlebar").length, 1);
        });

        it("extending the window does not break the close method", function() {
            var MyWindow = kendo.ui.Window.extend({
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

            var myWindow = $("<div />")
                .kendoMyWindow()
                .data("kendoMyWindow");

            myWindow.open().close();

            myWindow.destroy();

            assert.isOk(true);
        });

        it("destroying a window destroys nested components", function() {
            var html =
                "<div id='dialog'><select><option>foo</option></select></div>";

            var dialog = $(html)
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
            var first = createWindow({ modal: true });
            var second = createWindow({ modal: true, visible: false });

            first.close();
            second.open();

            assert.isOk($(".k-overlay").is(":visible"));
        });

        it("opening a closing animated window leaves it in opened state", function(done) {
            var dialog = createWindow({
                animation: {
                    open: { duration: 50 },
                    close: { duration: 50 }
                }
            });

            dialog.close().open();

            setTimeout(function() {

                assert.isOk(dialog.wrapper.is(":visible"));
                done();
            }, 100);
        });

        it("setOptions can toggle draggable option", function() {
            var dialog = createWindow();

            dialog.setOptions({ draggable: true });

            assert.isOk(dialog.dragging);

            var draggingDestroy = spy(dialog.dragging, "destroy");

            dialog.setOptions({ draggable: false });

            assert.isOk(!dialog.dragging);
            assert.isOk(draggingDestroy.calls("destroy"), 1);
        });

        it("setOptions can toggle resizable option", function() {
            var dialog = createWindow();

            dialog.setOptions({ resizable: true });

            assert.isOk(dialog.resizing);

            var resizingDestroy = spy(dialog.resizing, "destroy");

            dialog.setOptions({ resizable: false });

            assert.isOk(!dialog.resizing);
            assert.isOk(resizingDestroy.calls("destroy"), 1);
        });

        it("setOptions can set zero integer position", function() {
            var dialog = createWindow();

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
            var dialog = createWindow();

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
            var dialog = createWindow();

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
            var dialog = createWindow();

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
            var newTitle = "foo",
                dialog = createWindow();

            dialog.title(newTitle);

            assert.equal(dialog.options.title, newTitle);
        });

        it("setOptions can toggle modality 1", function() {
            var dialog = createWindow({ modal: false });

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
            var dialog = createWindow({ modal: true });

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
            var dialog = createWindow({ visible: false });

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
            var dialog = createWindow({ visible: false });

            dialog.setOptions({
                animation: {
                    close: false
                }
            });

            dialog.open();

            assert.isOk(true);
        });

        it("setOptions should make deep extend of options.position", function() {
            var dialog = createWindow({
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

        it("overlay is not hidden when showing second modal window after closing first", function(done) {
            var dialog = createWindow({
                animation: { close: { duration: 500 } },
                modal: true
            });

            var secondDialog = createWindow({
                animation: { open: { duration: 1000 } },
                modal: true,
                visible: false,
                activate: function() {

                    assert.isOk($(".k-overlay").is(":visible"));
                    done();
                }
            });

            dialog.close();
            secondDialog.open();
        });

        it("setOptions allows changing of window actions", function() {
            var dialog = createWindow();

            dialog.setOptions({
                actions: ["Minimize", "Close"]
            });

            assert.equal(dialog.wrapper.find(".k-i-window-minimize").length, 1);
        });

        it("toFront does not scroll page when windows are pinned", function() {
            var spacerDiv = $(
                "<div style='height:3000px'>&nbsp;</div>"
            ).appendTo(Mocha.fixture);
            var dialog = createWindow({
                pinned: true
            });
            $(window).scrollTop(200);
            $(dialog.wrapper).css({ top: 180 });

            dialog.toFront();

            assert.equal($(window).scrollTop(), 200);
            spacerDiv.remove();
        });

        function setDimensionTest(dim) {
            var options = {};
            options[dim] = 400;
            var wnd = createWindow(options);

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
            var dialog = createWindow({
                visible: true,
                animation: false
            });

            dialog.minimize();

            assert.isOk(dialog.isMinimized());
        });

        it("isMinimized is updated when restoring window", function() {
            var dialog = createWindow({
                visible: true,
                animation: false
            });

            dialog.minimize();
            dialog.restore();

            assert.isOk(!dialog.isMinimized());
        });

        it("isMaximized is updated when maximizing window", function() {
            var dialog = createWindow({
                visible: true,
                animation: false
            });

            dialog.maximize();

            assert.isOk(dialog.isMaximized());
        });

        it("isMaximized is updated when restoring window", function() {
            var dialog = createWindow({
                visible: true,
                animation: false
            });

            dialog.maximize();
            dialog.restore();

            assert.isOk(!dialog.isMaximized());
        });

        it("maximize() takes borders into account", function() {
            var borderWidth = 10;

            var dialog = createWindow({
                visible: true,
                animation: false
            });

            dialog.wrapper.css("border-width", borderWidth + "px");

            dialog.maximize();

            assert.equal(
                dialog.wrapper.width() + borderWidth * 2,
                $(window).width()
            );
        });

        it("maximize() sets body's and html's overflow to hidden", function() {
            var dialog = createWindow({
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
            var dialog = createWindow({
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
            var dialog = createWindow({
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
            var dialog = createWindow({
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
            var dialog = createWindow({
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
    });
})();
