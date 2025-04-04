import '@progress/kendo-ui/src/kendo.window.js';
import { TimerUtils } from '../../helpers/unit/timer-utils.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let form;

function createWindow(options, element) {
    element = element || $("<div class='wnd' />").appendTo(Mocha.fixture);
    return element.kendoWindow(options).data("kendoWindow");
}

function createHighWindow(options, element, innerHeight) {
    element =
        element ||
        $(
            "<div class='wnd'><div style='height:" +
            innerHeight +
            "px'></div></div>"
        ).appendTo(Mocha.fixture);
    return element.kendoWindow(options).data("kendoWindow");
}

describe("initialization", function() {
    beforeEach(function() {
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

        $(`<div id="div-with-template">
                    <div id="kendo-template">
                        kendo-template
                    </div>
                </div>`).appendTo(Mocha.fixture);
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

    it("creates default html structure", function() {
        let dialog = createWindow();

        assert.isOk(dialog.wrapper.is(".k-widget, .k-window"));
        assert.isOk(
            dialog.wrapper
                .children()
                .eq(0)
                .is(".k-window-titlebar, .k-header")
        );
    });

    it("construction triggers open and activate events", function() {
        let dialog = createWindow({
            open: function() {
                assert.isOk(true);
            },
            activate: function() {
                assert.isOk(true);
            }
        });
    });

    it("construction does not trigger open and activate events on hidden windows", function() {
        let isActivated = false,
            isOpened = false;

        let dialog = createWindow(
            {
                open: function() {
                    isOpened = true;
                },
                activate: function() {
                    isActivated = true;
                },
                visible: false
            },
            $("<div />")
                .appendTo(Mocha.fixture)
                .hide()
        );

        assert.isOk(!isActivated);
        assert.isOk(!isOpened);
    });

    it("construction of modal window shows overlay", function() {
        let dialog = createWindow({
            modal: true
        });

        assert.isOk($(".k-overlay").is(":visible"));
    });

    it("hiding second modal window does not hide first overlay", function() {
        let dialog1 = createWindow({
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

        assert.isOk($(".k-overlay").is(":visible"));

        dialog1.close();

        assert.isOk(!$(".k-overlay").is(":visible"));

        dialog1.open();

        assert.isOk($(".k-overlay").is(":visible"));
    });

    it("destroy() does not delete overlay if there are other opened modal windows", function() {
        let dialog1 = createWindow({
            modal: true
        }),
            dialog2 = createWindow({
                modal: true
            });

        dialog2.destroy();

        assert.equal($(".k-overlay").length, 1);
        assert.isOk($(".k-overlay").is(":visible"));

        dialog1.destroy();

        assert.equal($(".k-overlay").length, 0);
    });

    it("creating a modal window after closing another shows overlay", function() {
        let dialog1 = createWindow({
            modal: true
        });

        dialog1.close();

        let dialog2 = createWindow({
            modal: true
        });

        assert.isOk($(".k-overlay").is(":visible"));
    });

    it("creating a window with a remote `content` creates iframe", function() {
        let dialog = createWindow({
            content: "http://www.telerik.com/",
            title: "title"
        }),
            iframe = dialog.element.find("iframe");

        assert.equal(iframe.length, 1);
        assert.equal(iframe.attr("title"), "title");
        assert.equal(iframe.attr("src"), "http://www.telerik.com/");
    });

    it("creating a window with a `content` on the same server does not create iframe", function() {
        let dialog = createWindow({
            content: "foo"
        });

        assert.equal(dialog.element.find("iframe").length, 0);
    });

    it("creating a window without a `content` does not create iframe", function() {
        let dialog = createWindow();

        assert.equal(dialog.element.find("iframe").length, 0);
    });

    it("creating a modal adds overlay and places it before the window markup", function() {
        let dialog = createWindow({
            modal: true
        });

        assert.isOk(dialog.wrapper.prev("div").is(".k-overlay"));
    });

    it("creating a second modal moves overlay after the first one", function() {
        let dialog = createWindow({
            modal: true
        }),
            overlappingDialog = createWindow({
                modal: true
            });

        assert.equal($(".k-overlay").length, 1);

        assert.isOk(!dialog.wrapper.prev("div").is(".k-overlay"));
        assert.isOk(overlappingDialog.wrapper.prev("div").is(".k-overlay"));
        assert.deepEqual(
            dialog.wrapper.next("div")[0],
            overlappingDialog.wrapper.prev("div")[0]
        );
    });

    it("creating a second dialog with a content frame overlays the first one", function() {
        let firstWindow = createWindow({
            content: "http://www.telerik.com"
        }),
            secondWindow = createWindow();

        assert.isOk(firstWindow.element.find("> .k-overlay").length);
    });

    it("specifying iframe=true creates iframe for local URL", function() {
        let dialog = createWindow({ iframe: true, content: "foo" }),
            iframe = dialog.element.find("iframe");

        assert.isOk(iframe.length, 1);
        assert.equal(iframe.attr("src"), "foo");
    });

    it("specifying iframe=false does not create iframe for remote URL", function() {
        let dialog = createWindow({
            iframe: false,
            content: "http://www.telerik.com/"
        }),
            iframe = dialog.element.find("iframe");

        assert.equal(iframe.length, 0);
    });

    it("creating a window with an iframe adds a k-window-iframecontent class", function() {
        let dialog = createWindow({
            iframe: true,
            content: "about:blank",
            height: 100
        });

        assert.isOk(dialog.element.hasClass("k-window-iframecontent"));
    });

    it("creating window with minHeight constrains larger content with inner minHeight", function() {
        let dialog = createWindow({
            minHeight: 200
        });

        assert.equal(parseInt(dialog.wrapper.css("minHeight"), 10), 200);
    });

    it("creating window with size sets the class", function() {
        let dialog = createWindow({
            minHeight: 200,
            size: "small"
        });

        assert.isOk(dialog.wrapper.hasClass("k-window-sm"));
    });

    it("creating window with themeColor sets the correct class", function() {
        let dialog = createWindow({
            minHeight: 200,
            themeColor: "dark"
        });

        assert.isOk(dialog.wrapper.hasClass("k-window-dark"));
    });


    it("creating window with preventScroll stop the document scrolling", function() {
        let dialog = createWindow({
            minHeight: 200,
            visible: true,
            modal: {
                preventScroll: true
            }
        });

        assert.equal("hidden", $("body").css("overflow"));
    });

    it("closing window with preventScroll stop the document scrolling", function() {
        let dialog = createWindow({
            minHeight: 200,
            visible: true,
            modal: {
                preventScroll: true
            }
        });

        dialog.close();

        assert.equal("visible", $("body").css("overflow"));
    });

    it("content.template", function() {
        let dialog = createWindow({
            content: {
                template: () => `foo ${1 + 1}`
            }
        });

        assert.equal(dialog.element.text(), "foo 2");
    });

    asyncTest("content.template is used when fetching jsonp data", function(done) {
        let dialog = createWindow({
            content: {
                url: "echo",
                dataType: "json",
                data: {
                    foo: "bar"
                },

                template: ({ foo }) => `templated ${foo}`,

                complete: function() {
                    done(() => assert.equal(dialog.element.text(), "templated bar"));
                }
            }
        });
    });

    it("title=false does not render title and adds css class", function() {
        let dialog = createWindow({
            title: false
        });

        assert.equal(dialog.wrapper.find(".k-window-titlebar").length, 0);
        assert.isOk(dialog.wrapper.is(".k-window-titleless"));
    });

    it("k-rtl class is not rendered by default", function() {
        let dialog = createWindow({
            title: "foo"
        });

        assert.isOk(!dialog.wrapper.hasClass("k-rtl"));
    });

    it("k-rtl class is rendered when in k-rtl container", function() {
        let element = $("<div class='k-rtl'><div></div></div>").appendTo(
            Mocha.fixture
        ),
            dialog = createWindow({}, element.find("> div"));

        assert.isOk(dialog.wrapper.hasClass("k-rtl"));
    });

    it("invisible windows do not interfere with overlay", function() {
        let dialog1 = $("<div />")
            .hide()
            .appendTo(Mocha.fixture),
            dialog2 = dialog1.clone().appendTo(Mocha.fixture);

        dialog1.kendoWindow({
            visible: false,
            animation: false,
            modal: true
        });

        dialog1
            .show()
            .data("kendoWindow")
            .open();

        dialog2.kendoWindow({
            visible: false,
            animation: false,
            modal: true
        });

        assert.isOk($(".k-overlay").is(":visible"));
    });

    it("visible:false option is inferred from content element", function() {
        let div = $("<div style='display: none'>foo</div>").appendTo(
            Mocha.fixture
        ),
            clientObject;

        div.kendoWindow();

        clientObject = div.data("kendoWindow");

        assert.isOk(clientObject.wrapper.is(":hidden"));
        assert.isOk(!clientObject.wrapper.hasClass("k-display-inline-flex"));
        assert.equal(div.css("display"), "block");
        assert.isOk(!clientObject.options.visible);
    });

    it("visible:false option is inferred from content element with a k-hidden class", function() {
        let div = $("<div class='k-hidden'>foo</div>").appendTo(
            Mocha.fixture
        ),
            clientObject;

        div.kendoWindow();

        clientObject = div.data("kendoWindow");

        assert.isOk(clientObject.wrapper.is(":hidden"));
        assert.equal(div.css("display"), "block");
        assert.isOk(!clientObject.options.visible);
    });

    it("visible:true option is inferred from content element", function() {
        let div = $("<div>foo</div>").appendTo(Mocha.fixture),
            clientObject;

        div.kendoWindow();

        clientObject = div.data("kendoWindow");

        assert.isOk(clientObject.wrapper.is(":visible"));
        assert.isOk(div.is(":visible"));
        assert.isOk(clientObject.options.visible);
    });

    it("visible: false creates hidden windows", function() {
        let div = $("<div>foo</div>").appendTo(Mocha.fixture),
            clientObject;

        div.kendoWindow({
            visible: false,
            refresh: function() {
                this.center();
                this.open();
            }
        });

        clientObject = div.data("kendoWindow");

        assert.isOk(!clientObject.wrapper.is(":visible"));
        assert.isOk(!clientObject.wrapper.hasClass("k-display-inline-flex"));
        assert.isOk(!div.is(":visible"));
        assert.isOk(!clientObject.options.visible);
    });

    it("scripts in window are executed only once", function() {
        window.triggers = 1;

        $("#div-with-script-child").kendoWindow();

        assert.equal(window.triggers, 1);
    });

    it("scripts with type in window are executed only once", function() {
        window.triggers = 1;

        $("#div-with-script-with-type").kendoWindow();

        assert.equal(window.triggers, 1);
    });

    it("template script tags are not removed from window", function() {
        $("#div-with-template").kendoWindow();

        assert.equal($("#kendo-template").length, 1);
    });

    it("width is constrained by minWidth", function() {
        let dialog = createWindow({ minWidth: 100, width: 90 });
        assert.equal(dialog.wrapper.outerWidth(), 100);
    });

    it("width is constrained by maxWidth", function() {
        let dialog = createWindow({ maxWidth: 100, width: 190 });
        assert.equal(dialog.wrapper.outerWidth(), 100);
    });

    it("height is constrained by minHeight", function() {
        let dialog = createWindow({ minHeight: 100, height: 90 });
        assert.equal(dialog.wrapper.outerHeight(), 100);
    });

    it("height is constrained by maxHeight", function() {
        let dialog = createWindow({ maxHeight: 100, height: 190 });
        assert.equal(dialog.wrapper.outerHeight(), 100);
    });

    it("creating window with string width", function() {
        let dialog = createWindow({ width: "190px" });
        assert.equal(dialog.wrapper.outerWidth(), 190);
    });

    it("creating window with percent width", function() {
        let dialog = createWindow({ width: "190%" });
        assert.equal(dialog.wrapper[0].style.width, "190%");
    });

    it("creating window with em width", function() {
        let dialog = createWindow({ width: "10em" });
        assert.equal(dialog.wrapper[0].style.width, "10em");
    });

    it("creating window with em width", function() {
        let dialog = createWindow({ width: "auto" });
        assert.equal(dialog.wrapper[0].style.width, "auto");
    });

    it("creating window with literal string height", function() {
        let dialog = createWindow({ height: "190px" });
        assert.equal(dialog.wrapper.outerHeight(), 190);
    });

    it("creating window with percent height", function() {
        let dialog = createWindow({ height: "190%" });
        assert.equal(dialog.wrapper[0].style.height, "190%");
    });

    it("creating window with em height", function() {
        let dialog = createWindow({ height: "10em" });
        assert.equal(dialog.wrapper[0].style.height, "10em");
    });

    it("creating window with em height", function() {
        let dialog = createWindow({ height: "auto" });
        assert.equal(dialog.wrapper[0].style.height, "auto");
    });

    it("passing empty actions array does not show any buttons in title bar", function() {
        let dialog = createWindow({ actions: [] });

        assert.equal(dialog.wrapper.find(".k-window.action").length, 0);
    });

    it("creating pinned window applies a position:fixed style", function() {
        let dialog = createWindow({ pinned: true });
        assert.equal(dialog.wrapper.css("position"), "fixed");
    });

    it("creating pinned window with a Pin command adds an Unpin button", function() {
        let dialog = createWindow({ pinned: true, actions: ["Pin"] });
        assert.equal(dialog.wrapper.find(".k-i-unpin,.k-svg-i-unpin").length, 1);
    });

    it("creating pinned window pins the window if initially visible", function() {
        let dialog = createWindow({
            pinned: true,
            position: {
                top: 0,
                left: 0
            }
        });
        assert.equal(dialog.wrapper.css("position"), "fixed");
    });

    it("creating pinned and visible:false window pins the window when shown", function() {
        let dialog = createWindow({
            pinned: true,
            visible: false,
            position: {
                top: 0,
                left: 0
            }
        });

        assert.notEqual(dialog.wrapper.css("position"), "fixed");

        dialog.open();
        assert.equal(dialog.wrapper.css("position"), "fixed");
    });

    it("center method should pin if pinned is enabled and element is hidden", function() {
        let dialog = createWindow(
            {
                pinned: true,
                visible: false
            },
            $("<div class='wnd' style='display: none;'></div>").appendTo(
                Mocha.fixture
            )
        );

        assert.notEqual(dialog.wrapper.css("position"), "fixed");
        dialog.center();
        assert.equal(dialog.wrapper.css("position"), "fixed");
    });

    it("creating window with an int zero top position applies a top style", function() {
        let dialog = createWindow({
            position: {
                top: 0
            }
        });

        assert.equal(dialog.wrapper.css("top"), "0px");
    });

    it("creating window with an int non-zero top position applies a top style", function() {
        let dialog = createWindow({
            position: {
                top: 1
            }
        });

        assert.equal(dialog.wrapper.css("top"), "1px");
    });

    it("creating window with a string top position applies a top style", function() {
        let dialog = createWindow({
            position: {
                top: "1px"
            }
        });

        assert.equal(dialog.wrapper.css("top"), "1px");
    });

    it("creating window with an int zero left position applies a left style", function() {
        let dialog = createWindow({
            position: {
                left: 0
            }
        });

        assert.equal(dialog.wrapper.css("left"), "0px");
    });

    it("creating window with an int non-zero left position applies a left style", function() {
        let dialog = createWindow({
            position: {
                left: 1
            }
        });

        assert.equal(dialog.wrapper.css("left"), "1px");
    });

    it("creating window with a string left position applies a left style", function() {
        let dialog = createWindow({
            position: {
                left: "1px"
            }
        });

        assert.equal(dialog.wrapper.css("left"), "1px");
    });

    it("k-window-content has its tabindex set to 0", function() {
        let dialog = createWindow({
            position: {
                left: "1px"
            }
        });

        assert.equal(dialog.element.attr("tabindex"), "0");
    });
});

describe("appendTo option", function() {
    beforeEach(function() {
        form = $("<form id='myForm'></form>").appendTo(Mocha.fixture);
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

        form.remove();
    });

    it("appends window to given container", function() {
        let dialog = createWindow({
            appendTo: "form#myForm"
        });

        assert.equal(dialog.wrapper.parent()[0], form[0]);
    });

    it("passing element appends window to given container", function() {
        let dialog = createWindow({
            appendTo: form[0]
        });

        assert.equal(dialog.wrapper.parent()[0], form[0]);
    });

    it("modal windows append single overlay to container", function() {
        createWindow({ appendTo: form, modal: true });
        createWindow({ appendTo: form, modal: true });

        assert.equal(form.children(".k-overlay").length, 1);
    });

    it("window content element is visible after initialization if wrapper widget with visible:false is initialized inside a hidden container", function() {
        Mocha.fixture.css("visibility", "hidden");
        let dialog = createWindow(
            { visible: false },
            $("<div class='wnd' />")
                .appendTo(Mocha.fixture)
                .hide()
        );

        dialog.open();

        Mocha.fixture.css("visibility", "");

        assert.equal(dialog.element.css("visibility"), "visible");
    });

    it("initializing with scrollable: false adds overflow: hidden", function() {
        let dialog = createWindow({ scrollable: false });

        assert.equal(dialog.element.css("overflow"), "hidden");
    });

    it("scrollable: false is persisted upon activate", function() {
        let dialog = createWindow({ visible: false, scrollable: false });

        dialog.open();

        assert.equal(dialog.element.css("overflow"), "hidden");
    });

    it("scrollable: false through setOptions adds overflow:hidden", function() {
        let dialog = createWindow({});

        dialog.setOptions({ scrollable: false });

        assert.equal(dialog.element.css("overflow"), "hidden");
    });

    it("should not scroll down to Window if not modal and initially visible", function() {
        TimerUtils.initTimer();

        createWindow({
            title: "Window Web: title 1t",
            content: "test",
            position: { top: 8240, left: 50 },
            height: "470px",
            width: "1450px",
            animation: false
        });

        TimerUtils.advanceTimer(1);
        assert.equal(document.documentElement.scrollTop, 0);
        TimerUtils.destroyTimer();
    });
});
