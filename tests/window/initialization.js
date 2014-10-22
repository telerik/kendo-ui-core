(function() {
    module("initialization", {
        setup: function() {
            kendo.effects.disable();
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

            QUnit.fixture.html(__html__['tests/window/templates-fixture.html']);
        },
        teardown: function() {
            QUnit.fixture.closest("body").find(".k-window-content").each(function(idx, element){
                $(element).data("kendoWindow").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
            kendo.effects.enable();
            $.mockjaxClear();
        }
    });

    function createWindow(options, element) {
        element = element || $("<div class='wnd' />").appendTo(QUnit.fixture);
        return element.kendoWindow(options).data("kendoWindow");
    }

    function createHighWindow(options, element, innerHeight) {
        element = element || $("<div class='wnd'><div style='height:" + innerHeight + "px'></div></div>").appendTo(QUnit.fixture);
        return element.kendoWindow(options).data("kendoWindow");
    }

    test("creates default html structure", function() {
        var dialog = createWindow();

        ok(dialog.wrapper.is(".k-widget, .k-window"));
        ok(dialog.wrapper.children().eq(0).is(".k-window-titlebar, .k-header"));
    });

    test("construction triggers open and activate events", 2, function() {
        var dialog = createWindow({
            "open": function () { ok(true); },
            "activate": function () { ok(true); }
        });
    });

    test("construction does not trigger open and activate events on hidden windows", function() {
        var isActivated = false,
            isOpened = false;

        var dialog = createWindow({
            "open": function () { isOpened = true; },
            "activate": function () { isActivated = true; },
            visible: false
        }, $("<div />").appendTo(QUnit.fixture).hide());

        ok(!isActivated);
        ok(!isOpened);
    });

    test("construction of modal window shows overlay", function() {
        var dialog = createWindow({
            modal: true
        });

        ok($(".k-overlay").is(":visible"));
    });

    test("hiding second modal window does not hide first overlay", function() {
        var dialog1 = createWindow({
                modal: true,
                animation: {
                    open: false,
                    close: false
                }
            }),
            dialog2 = createWindow({
                modal: true,
                animation: {
                    open: false,
                    close: false
                }
            });

        dialog2.close();

        ok($(".k-overlay").is(":visible"));

        dialog1.close();

        ok(!$(".k-overlay").is(":visible"));

        dialog1.open();

        ok($(".k-overlay").is(":visible"));
    });

    test("destroy() does not delete overlay if there are other opened modal windows", function() {
        var dialog1 = createWindow({
                modal: true
            }),
            dialog2 = createWindow({
                modal: true
            });

        dialog2.destroy();

        equal($(".k-overlay").length, 1);
        ok($(".k-overlay").is(":visible"));

        dialog1.destroy();

        equal($(".k-overlay").length, 0);
    });

    test("creating a modal window after closing another shows overlay", function() {
        var dialog1 = createWindow({
            modal: true
        });

        dialog1.close();

        var dialog2 = createWindow({
            modal: true
        });

        ok($(".k-overlay").is(":visible"));
    });

    test("creating a window with a remote `content` creates iframe", function() {
        var dialog = createWindow({
                content: "http://www.telerik.com/",
                title: "title"
            }),
            iframe = dialog.element.find("iframe");

        equal(iframe.length, 1);
        equal(iframe.attr("title"), "title");
        equal(iframe.attr("src"), "http://www.telerik.com/");
    });

    test("creating a window with a `content` on the same server does not create iframe", function() {
        var dialog = createWindow({
            content: "foo"
        });

        equal(dialog.element.find("iframe").length, 0);
    });

    test("creating a window without a `content` does not create iframe", function() {
        var dialog = createWindow();

        equal(dialog.element.find("iframe").length, 0);
    });

    test("creating a modal adds overlay and places it before the window markup", function() {
        var dialog = createWindow({
            modal: true
        });

        ok(dialog.wrapper.prev("div").is(".k-overlay"));
    });

    test("creating a second modal moves overlay after the first one", function() {
        var dialog = createWindow({
                modal: true
            }),
            overlappingDialog = createWindow({
                modal: true
            });

        equal($(".k-overlay").length, 1);

        ok(!dialog.wrapper.prev("div").is(".k-overlay"));
        ok(overlappingDialog.wrapper.prev("div").is(".k-overlay"));
        deepEqual(dialog.wrapper.next("div")[0], overlappingDialog.wrapper.prev("div")[0]);
    });

    test("creating a second dialog with a content frame overlays the first one", function() {
        var firstWindow = createWindow({ content: "http://www.telerik.com" }),
            secondWindow = createWindow();

        ok(firstWindow.element.find("> .k-overlay").length);
    });

    test("specifying iframe=true creates iframe for local URL", function() {
        var dialog = createWindow({ iframe: true, content: "foo" }),
            iframe = dialog.element.find("iframe");

        ok(iframe.length, 1);
        equal(iframe.attr("src"), "foo");
    });

    test("specifying iframe=false does not create iframe for remote URL", function() {
        var dialog = createWindow({ iframe: false, content: "http://www.telerik.com/" }),
            iframe = dialog.element.find("iframe");

        equal(iframe.length, 0);
    });

    test("creating a window with an iframe adds a k-window-iframecontent class", function() {
        var dialog = createWindow({
                iframe: true,
                content: "about:blank",
                height: 100
            });

        ok(dialog.element.hasClass("k-window-iframecontent"));
    });

    test("creating window with minHeight constrains larger content with inner minHeight", function() {
        var dialog = createWindow({
                minHeight: 200
            });

        equal(parseInt(dialog.wrapper.css("minHeight")), 200);
    });

    test("content.template", function() {
        var dialog = createWindow({
                content: {
                    template: "foo #= 1 + 1 #"
                }
            });

        equal(dialog.element.text(), "foo 2");
    });

    test("content.template is used when fetching jsonp data", function() {
        stop(1);

        var dialog = createWindow({
            content: {
                url: "echo",
                dataType: "json",
                data: {
                    foo: "bar"
                },

                template: "templated #= foo #",

                complete: function() {
                    start();
                    equal(dialog.element.text(), "templated bar");
                }
            }
        });
    });

    test("title=false does not render title and adds css class", function() {
        var dialog = createWindow({
            title: false
        });

        equal(dialog.wrapper.find(".k-window-titlebar").length, 0);
        ok(dialog.wrapper.is(".k-window-titleless"));
    });

    test("window has margin and padding that match the titlebar height", 2, function () {
        var dialog = createWindow({
            title: "foo"
        });

        var titleBar = dialog.wrapper.children(".k-window-titlebar");
        var titleBarHeight = titleBar.outerHeight();
        var margin = parseInt(titleBar.css("margin-top"), 10);
        var padding = parseInt(dialog.wrapper.css("padding-top"), 10);

        equal(margin, -titleBarHeight);
        equal(padding, titleBarHeight);
    });

    test("k-rtl class is not rendered by default", function() {
        var dialog = createWindow({
            title: "foo"
        });

        ok(!dialog.wrapper.hasClass("k-rtl"));
    });

    test("k-rtl class is rendered when in k-rtl container", function() {
        var element = $("<div class='k-rtl'><div /></div>").appendTo(QUnit.fixture),
            dialog = createWindow({}, element.find("> div"));

        ok(dialog.wrapper.hasClass("k-rtl"));
    });

    test("invisible windows do not interfere with overlay", function() {
        var dialog1 = $("<div />").hide().appendTo(QUnit.fixture),
            dialog2 = dialog1.clone().appendTo(QUnit.fixture);

        dialog1.kendoWindow({ visible: false, animation: false, modal: true });

        dialog1.show().data("kendoWindow").open();

        dialog2.kendoWindow({ visible: false, animation: false, modal: true });

        ok($(".k-overlay").is(":visible"));
    });

    test("visible:false option is inferred from content element", function() {
        var div = $("<div style='display: none'>foo</div>").appendTo(QUnit.fixture),
            clientObject;

        div.kendoWindow();

        clientObject = div.data("kendoWindow");

        ok(clientObject.wrapper.is(":hidden"));
        equal(div.css("display"), "block");
        ok(!clientObject.options.visible);
    });

    test("visible:true option is inferred from content element", function() {
        var div = $("<div>foo</div>").appendTo(QUnit.fixture),
            clientObject;

        div.kendoWindow();

        clientObject = div.data("kendoWindow");

        ok(clientObject.wrapper.is(":visible"));
        ok(div.is(":visible"));
        ok(clientObject.options.visible);
    });

    test("visible: false creates hidden windows", function() {
        var div = $("<div>foo</div>").appendTo(QUnit.fixture),
            clientObject;

        div.kendoWindow({
            visible: false,
            refresh: function() {
                this.center();
                this.open();
            }
        });

        clientObject = div.data("kendoWindow");

        ok(!clientObject.wrapper.is(":visible"));
        ok(!div.is(":visible"));
        ok(!clientObject.options.visible);
    });

    test("scripts in window are executed only once", function() {
        window.triggers = 1;

        $("#div-with-script-child").kendoWindow();

        equal(window.triggers, 1);
    });

    test("scripts with type in window are executed only once", function() {
        window.triggers = 1;

        $("#div-with-script-with-type").kendoWindow();

        equal(window.triggers, 1);
    });

    test("template script tags are not removed from window", function() {
        $("#div-with-template").kendoWindow();

        equal($("#kendo-template").length, 1);
    });

    test("width is constrained by minWidth", function() {
        var dialog = createWindow({ minWidth: 100, width: 90 });
        equal(dialog.wrapper.width(), 100);
    });

    test("width is constrained by maxWidth", function() {
        var dialog = createWindow({ maxWidth: 100, width: 190 });
        equal(dialog.wrapper.width(), 100);
    });

    test("height is constrained by minHeight", function() {
        var dialog = createWindow({ minHeight: 100, height: 90 });
        equal(dialog.wrapper.height(), 100);
    });

    test("height is constrained by maxHeight", function() {
        var dialog = createWindow({ maxHeight: 100, height: 190 });
        equal(dialog.wrapper.height(), 100);
    });

    test("height is constrained by maxHeight when content is larger", function() {
        var dialog = createHighWindow({ maxHeight: 100 }, null, 200);
        ok(dialog.element.height() <= 100);
    });

    test("creating window with string width", function() {
        var dialog = createWindow({ width: "190px" });
        equal(dialog.wrapper.width(), 190);
    });

    test("creating window with string height", function() {
        var dialog = createWindow({ height: "190px" });
        equal(dialog.wrapper.height(), 190);
    });

    test("passing empty actions array does not show any buttons in title bar", function() {
        var dialog = createWindow({ actions: [] });

        equal(dialog.wrapper.find(".k-window.action").length, 0);
    });

    test("creating pinned window applies a position:fixed style", function() {
        var dialog = createWindow({ pinned: true });
        equal(dialog.wrapper.css("position"), "fixed");
    });

    test("creating pinned window with a Pin command adds an Unpin button", function() {
        var dialog = createWindow({ pinned: true, actions: ["Pin"] });
        equal(dialog.wrapper.find(".k-i-unpin").length, 1);
    });

    test("creating window with an int zero top position applies a top style", function() {
        var dialog = createWindow({
            position: {
                top: 0
            }
        });

        equal(dialog.wrapper.css("top"), "0px");
    });

    test("creating window with an int non-zero top position applies a top style", function() {
        var dialog = createWindow({
            position: {
                top: 1
            }
        });

        equal(dialog.wrapper.css("top"), "1px");
    });

    test("creating window with a string top position applies a top style", function() {
        var dialog = createWindow({
            position: {
                top: "1px"
            }
        });

        equal(dialog.wrapper.css("top"), "1px");
    });

    test("creating window with an int zero left position applies a left style", function() {
        var dialog = createWindow({
            position: {
                left: 0
            }
        });

        equal(dialog.wrapper.css("left"), "0px");
    });

    test("creating window with an int non-zero left position applies a left style", function() {
        var dialog = createWindow({
            position: {
                left: 1
            }
        });

        equal(dialog.wrapper.css("left"), "1px");
    });

    test("creating window with a string left position applies a left style", function() {
        var dialog = createWindow({
            position: {
                left: "1px"
            }
        });

        equal(dialog.wrapper.css("left"), "1px");
    });

    var form;

    module("appendTo option", {
        setup: function() {
            kendo.effects.disable();
            form = $("<form id='myForm'></form>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            QUnit.fixture.closest("body").find(".k-window-content").each(function(idx, element){
                $(element).data("kendoWindow").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
            kendo.effects.enable();
            form.remove();
        }
    });

    test("appends window to given container", function() {
        var dialog = createWindow({
            appendTo: "form#myForm"
        });

        equal(dialog.wrapper.parent()[0], form[0]);
    });

    test("passing element appends window to given container", function() {
        var dialog = createWindow({
            appendTo: form[0]
        });

        equal(dialog.wrapper.parent()[0], form[0]);
    });

    test("modal windows append single overlay to container", function() {
        createWindow({ appendTo: form, modal: true });
        createWindow({ appendTo: form, modal: true });

        equal(form.children(".k-overlay").length, 1);
    });

    test("window content element is visible after initialization if wrapper widget with visible:false is initialized inside a hidden container", function () {
        QUnit.fixture.css("visibility", "hidden");
        var dialog = createWindow({ visible: false }, $("<div class='wnd' />").appendTo(QUnit.fixture).hide());

        dialog.open();

        QUnit.fixture.css("visibility", "");

        equal(dialog.element.css("visibility"), "visible");
    });
})();