import '@progress/kendo-ui/src/kendo.tooltip.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let container,
    Tooltip = kendo.ui.Tooltip;

describe("kendo.ui.tooltip.ajax", function() {
    beforeEach(function() {
        $.mockjaxSettings.responseTime = 0;

        $.fn.press = function(key, ctrl, shift, alt) {
            return this.trigger({ type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift, altKey: alt });
        };

        container = $("<div style='margin:50px'/>").appendTo(Mocha.fixture);
    });

    afterEach(function() {

        if (container.data("kendoTooltip")) {
            container.kendoTooltip("destroy");
        }

        container.remove();
        $.mockjax.clear();
    });

    asyncTest("ajax request is made when popup is shown", function(done) {
        $.mockjax({
            url: "foo/baz",
            response: function() {
                done(() => assert.isOk(true));
            }
        });

        let tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            }
        });

        tooltip.show(container);
    });

    asyncTest("popup element is opened before the ajax request content is appended to it", function(done) {
        $.mockjax({
            url: "foo/baz",
            response: function() {
                done(() => {
                    assert.isOk(tooltip.popup.visible());
                });
            }
        });

        let tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            }
        });

        tooltip.show(container);
    });

    asyncTest("response is added to the content", function(done) {
        $.mockjax({
            url: "foo/baz",
            response: function() {
                this.responseText = "foo";
            }
        });

        let tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            },
            contentLoad: function() {
                done(() => assert.equal(tooltip.content.text(), "foo"));
            }
        });

        tooltip.show(container);
    });

    asyncTest("error event is raised if request fails", function(done) {
        $.mockjax({
            url: "foo/baz",
            status: 500
        });

        let tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            },
            error: function() {
                done(() => assert.isOk(true));
            }
        });

        tooltip.show(container);
    });

    it("local url does not create iframe", function() {
        $.mockjax({
            url: "foo/baz",
            status: 500
        });

        let tooltip = new Tooltip(container, {
            content: { url: "foo/baz" }
        });

        tooltip.show(container);

        assert.isOk(!tooltip.content.find("iframe").length);
    });

    it("a remote `content` creates iframe", function() {
        let tooltip = new Tooltip(container, {
            content: { url: "http://www.telerik.com/" }
        });

        tooltip.show(container);

        let iframe = tooltip.content.find("iframe");

        assert.equal(iframe.length, 1);
        assert.equal(iframe.attr("src"), "http://www.telerik.com/");
    });

    it("iframe is created if showIframe is set", function() {
        let tooltip = new Tooltip(container, {
            content: { url: "/foo/" },
            iframe: true
        });

        tooltip.show(container);

        assert.isOk(tooltip.content.find("iframe").length);
    });

    asyncTest("requestStart is triggered", function(done) {
        $.mockjax({
            url: "foo/baz"
        });

        let tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            },
            requestStart: function() {
                done(() => assert.isOk(true));
            }
        });

        tooltip.show(container);
    });

    asyncTest("requestStart add request data if such does not exist", function(done) {
        $.mockjax({
            url: "foo/baz",
            response: function(settings) {
                done(() => assert.equal(settings.data.bar, "foo"));
            }
        });

        let tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            },
            requestStart: function(e) {
                e.options.data = {
                    bar: "foo"
                };
            }
        });

        tooltip.show(container);
    });

    asyncTest("requestStart updates request data", function(done) {
        $.mockjax({
            url: "foo/baz",
            response: function(settings) {
                done(() => assert.equal(settings.data.bar, "foo"));
            }
        });

        let tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz",
                data: {
                    bar: "boo"
                }
            },
            requestStart: function(e) {
                e.options.data.bar = "foo";
            }
        });

        tooltip.show(container);
    });

    asyncTest("target is passed to the requestStart", function(done) {
        $.mockjax({
            url: "foo/baz"
        });

        let tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            },
            requestStart: function(e) {
                done(() => assert.equal(e.target, container));
            }
        });

        tooltip.show(container);
    });

    asyncTest("refresh issue an ajax request", function(done) {
        $.mockjax({
            url: "foo/baz"
        });

        let tooltip = new Tooltip(container, {
            content: {
                url: "foo/baz"
            }
        });

        tooltip.show(container);

        tooltip.bind("requestStart", function() {
            done(() => assert.isOk(true));
        });

        tooltip.refresh();
    });

    it("refresh the content", function() {
        let tooltip = new Tooltip(container, {
            content: function() {
                assert.isOk(true);
            }
        });

        tooltip.show(container);

        tooltip.refresh();
    });

    it("refresh does not refresh the content if popup is not created", function() {
        let tooltip = new Tooltip(container, {
            content: function() {
                assert.isOk(true);
            }
        });

        tooltip.refresh();
    });
});
