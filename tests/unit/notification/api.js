import { createNotification } from '../../helpers/unit/notification-utils.js';
import '@progress/kendo-ui/src/kendo.fx.js';

let notification;

describe("api", function() {
    beforeEach(function() {

    });
    afterEach(function() {
        if (notification) {
            notification.destroy();
        }

        $(".k-notification").each(function(idx, element) {
            let popup = $(element).data("kendoPopup");
            if (popup) {
                popup.destroy();
            }
            $(element).remove();
        });
    });

    it("show method adds internal stacking GUID to popup notification", function() {
        notification = createNotification();

        let guid = notification._guid;

        notification.show("foo");

        assert.isOk($(".k-notification").closest(".k-animation-container").hasClass(guid));
    });

    it("show method adds internal stacking GUID to static notification", function() {
        notification = createNotification({
            appendTo: Mocha.fixture
        });

        let guid = notification._guid;

        notification.show("foo");

        assert.isOk($(".k-notification").hasClass(guid));
    });

    it("show method creates div.k-notification element", function() {
        notification = createNotification();

        notification.show("foo");

        assert.equal($(document.body).find("div.k-notification").length, 1);
    });

    it("show method creates a Kendo UI Popup when appendTo is not set", function() {
        notification = createNotification();

        notification.show("foo");

        assert.isOk($(document.body).find(".k-notification").data("kendoPopup"));
    });

    it("show method creates a Kendo UI Popup with zero margin", function() {
        notification = createNotification();

        notification.show("foo");

        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container")[0].style.margin, "0px"); // using .css("margin") will fail in Firefox
    });

    it("show method creates a Kendo UI Popup with three zero paddings, except top by default", function() {
        notification = createNotification();

        notification.show("foo");

        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingBottom"), "0px");
        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingLeft"), "0px");
        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingRight"), "0px");
    });

    it("show method creates a Kendo UI Popup with three zero paddings, except top", function() {
        notification = createNotification({
            stacking: "up"
        });

        notification.show("foo");

        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingBottom"), "0px");
        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingLeft"), "0px");
        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingRight"), "0px");
    });

    it("show method creates a Kendo UI Popup with three zero paddings, except bottom", function() {
        notification = createNotification({
            stacking: "down"
        });

        notification.show("foo");

        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingTop"), "0px");
        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingLeft"), "0px");
        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingRight"), "0px");
    });

    it("show method creates a Kendo UI Popup with three zero paddings, except left", function() {
        notification = createNotification({
            stacking: "left"
        });

        notification.show("foo");

        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingTop"), "0px");
        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingBottom"), "0px");
        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingRight"), "0px");
    });

    it("show method creates a Kendo UI Popup with three zero paddings, except right", function() {
        notification = createNotification({
            stacking: "right"
        });

        notification.show("foo");

        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingTop"), "0px");
        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingBottom"), "0px");
        assert.equal($(document.body).find(".k-notification").closest(".k-animation-container").css("paddingLeft"), "0px");
    });

    it("show method does not create a Kendo UI Popup when appendTo is set", function() {
        notification = createNotification({
            appendTo: Mocha.fixture
        });

        notification.show("foo");

        let notificationElement = Mocha.fixture.children(".k-notification");

        assert.equal(notificationElement.length, 1);
        assert.isOk(!notificationElement.data("kendoPopup"));
    });

    it("show method ignores empty content", function() {
        notification = createNotification();

        notification.show("");
        notification.show();
        notification.show(null);

        assert.equal($(document.body).find("div.k-notification").length, 0);
    });

    it("show method supports empty object as content", function() {
        notification = createNotification();

        notification.show({});

        assert.equal($(document.body).find("div.k-notification").length, 1);
    });

    it("show method renders passed string content", function() {
        notification = createNotification();

        notification.show("<span id='foo'></span>");

        assert.equal($(document.body).find("div.k-notification").find("#foo").length, 1);
    });

    it("showText method escapes passed markup content", function() {
        notification = createNotification();

        notification.showText("<span>Foo</span>");

        assert.include(
            $(document.body).find("div.k-notification").html(),
            "&lt;span&gt;Foo&lt;/span&gt;"
        );
    });

    it("show method renders passed object content", function() {
        notification = createNotification({
            templates: [{
                type: "info",
                template: ({ foo }) => `<div id='${foo}'></div>`
            }]
        });

        notification.show({ foo: "bar" });

        assert.equal($(document.body).find("div.k-notification").find("#bar").length, 1);
    });

    it("show method renders passed function content", function() {
        notification = createNotification();

        let html = '<div id="foo"></div>';

        notification.show(function() {
            return html;
        });

        assert.isOk($(document.body).find("div.k-notification").html().indexOf(html) > -1);
    });

    it("showText method escapes passed function content", function() {
        notification = createNotification();

        let html = '<div id="foo"></div>';

        notification.showText(function() {
            return html;
        });

        assert.include(
            $(document.body).find("div.k-notification").html(),
            "&lt;div id=\"foo\"&gt;&lt;/div&gt;"
        );
    });

    it("show method renders passed function object content", function() {
        notification = createNotification({
            templates: [{
                type: "info",
                template: ({ foo }) => `<div id='${foo}'></div>`
            }]
        });

        notification.show(function() {
            return { foo: "bar" };
        });

        assert.equal($(document.body).find("div.k-notification").find("#bar").length, 1);
    });

    it("show method adds notification type CSS class to popup and text to note icon", function() {
        notification = createNotification();

        notification.show("foo", "bar");

        let notificationPopup = $(".k-notification.k-notification-bar");

        assert.equal(notificationPopup.length, 1);
        assert.equal(notificationPopup.find(".k-i-bar").text(), "");
    });

    it("show method adds notification type CSS class to static element and text to note icon", function() {
        notification = createNotification({
            appendTo: Mocha.fixture
        });

        notification.show("foo", "bar");

        let notificationElement = $(".k-notification.k-notification-bar");

        assert.equal(notificationElement.length, 1);
        assert.equal(notificationElement.find(".k-i-bar").text(), "");
    });

    it("show method adds data-role='alert' to popup notification", function() {
        notification = createNotification();

        notification.show("foo");

        assert.equal($(".k-notification").attr("data-role"), "alert");
    });

    it("show method adds data-role='alert' to static notification", function() {
        notification = createNotification({
            appendTo: Mocha.fixture
        });

        notification.show("foo");

        assert.equal($(".k-notification").attr("data-role"), "alert");
    });

    it("show and hide methods work for static notifications when animations are disabled", function() {
        notification = createNotification({
            appendTo: Mocha.fixture,
            animation: false
        });

        notification.show("foo");

        assert.isOk($(".k-notification").is(":visible"));

        notification.hide();

        assert.equal($(".k-notification").length, 0);
    });

    it("new popup ignores old ones that are currently being hidden", function() {
        notification = createNotification();

        notification.show("foo");
        let popup1 = $(".k-notification").last();
        let offset1 = popup1.offset();
        let text1 = popup1.text();

        notification.hide();

        notification.show("bar");
        let popup2 = $(".k-notification").last();
        let offset2 = popup2.offset();
        let text2 = popup2.text();

        assert.isOk(text1.indexOf("foo") >= 0);
        assert.isOk(text2.indexOf("bar") >= 0);
        assert.equal(offset2.top, offset1.top);
    });

    it("shortcut show methods call show method with appropriate arguments", function() {
        let defaultArgs = [null, null],
            methods = ["info", "success", "warning", "error"],
            args, j;

        notification = createNotification();

        notification.show = function() {
            args = arguments;
        };

        for (j = 0; j < methods.length; j++) {
            args = defaultArgs;
            notification[methods[j]]("foo");

            assert.equal(args[0], "foo");
            assert.equal(args[1], methods[j]);
        }
    });

    it("popup notifications receive a k-hiding CSS class while being hidden", function() {
        kendo.effects.enable();

        notification = createNotification({
            autoHideAfter: 0
        });

        notification.show("foo");
        notification.hide();

        assert.isOk($(".k-notification").closest(".k-animation-container").hasClass("k-hiding"));

        kendo.effects.disable();
    });

    it("hide method hides all popup notifications", function() {
        notification = createNotification({
            autoHideAfter: 0
        });

        notification.show("foo");
        notification.show("bar");
        notification.show("baz");

        notification.hide();

        assert.equal($(".k-notification").length, 0);
    });

    it("hide method hides all static notifications", function() {
        notification = createNotification({
            autoHideAfter: 0,
            appendTo: Mocha.fixture
        });

        notification.show("foo");
        notification.show("bar");
        notification.show("baz");

        notification.hide();

        assert.equal($(".k-notification").length, 0);
    });

    it("setOptions updates popup stacking settings", function() {
        notification = createNotification({
            stacking: "left"
        });

        notification.setOptions({
            stacking: "right"
        });

        assert.equal(notification._popupOrigin, "top right");
        assert.equal(notification._popupPosition, "top left");
        assert.equal(typeof notification._popupPaddings.paddingRight, "undefined");
    });

    it("setOptions recompiles templates", function() {
        notification = createNotification({
            templates: [{
                type: "info",
                template: () => "foo"
            }]
        });

        notification.setOptions({
            templates: [{
                type: "info",
                template: () => "bar"
            }]
        });

        assert.equal(notification._compiled.info({}), "bar");
    });

    it("getNotifications returns open popup notifications", function() {
        notification = createNotification({
            autoHideAfter: 0
        });

        notification.show("foo");
        notification.show("bar");

        assert.equal(notification.getNotifications().length, 2);
    });

    it("getNotifications returns open static notifications", function() {
        notification = createNotification({
            autoHideAfter: 0,
            appendTo: Mocha.fixture
        });

        notification.show("foo");
        notification.show("bar");

        assert.equal(notification.getNotifications().length, 2);
    });

    it("destroy removes content click handler from popup", function() {
        notification = createNotification({
            autoHideAfter: 0
        });

        notification.show("foo");

        notification.destroy();

        $(".k-notification").click();

        assert.equal($(".k-notification").length, 1);
    });

    it("destroy removes button click handler from popup", function() {
        notification = createNotification({
            autoHideAfter: 0,
            hideOnClick: false,
            button: true
        });

        notification.show("foo");

        notification.destroy();

        $(".k-notification .k-i-x").click();

        assert.equal($(".k-notification").length, 1);
    });

    it("destroy removes content click handler from static", function() {
        notification = createNotification({
            appendTo: Mocha.fixture,
            autoHideAfter: 0
        });

        notification.show("foo");

        notification.destroy();

        $(".k-notification").click();

        assert.equal($(".k-notification").length, 1);
    });

    it("destroy removes button click handler from static", function() {
        notification = createNotification({
            appendTo: Mocha.fixture,
            autoHideAfter: 0,
            hideOnClick: false,
            button: true
        });

        notification.show("foo");

        notification.destroy();

        $(".k-notification .k-i-x").click();

        assert.equal($(".k-notification").length, 1);
    });
});
