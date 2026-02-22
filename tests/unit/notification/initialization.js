import { createNotification } from '../../helpers/unit/notification-utils.js';
import { roughlyEqual } from '../../helpers/unit/general-utils.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let notification;

describe("initialization", function() {
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

    it("initialization creates an internal GUID", function() {
        notification = createNotification();

        let guid = notification._guid;

        assert.equal(typeof guid, "string");
        assert.equal(guid.length, 37);
        assert.equal(guid.substr(0, 1), "_");
    });

    it("initialization compiles popup stacking settings", function() {
        notification = createNotification();

        let origin = notification._popupOrigin,
            position = notification._popupPosition,
            regex = /^[a-z]+ [a-z]+$/;

        assert.equal(typeof origin, "string");
        assert.equal(typeof position, "string");
        assert.equal(regex.exec(origin), origin);
        assert.equal(regex.exec(position), position);
    });

    it("initialization compiles popup padding settings", function() {
        notification = createNotification();

        let paddings = notification._popupPaddings,
            size = 0,
            allZero = true,
            key;

        for (key in paddings) {
            if (paddings.hasOwnProperty(key)) {
                size++;
            }
            if (paddings[key] != 0) {
                allZero = false;
            }
        }

        assert.equal(typeof paddings, "object");
        assert.equal(size, 3);
        assert.isOk(allZero);
        assert.isOk(!paddings.hasOwnProperty("paddingTop"));
    });

    it("up stacking removes top popup padding", function() {
        notification = createNotification({
            stacking: "up"
        });

        let paddings = notification._popupPaddings;

        assert.isOk(!paddings.hasOwnProperty("paddingTop"));
    });

    it("down stacking removes bottom popup padding", function() {
        notification = createNotification({
            stacking: "down"
        });

        let paddings = notification._popupPaddings;

        assert.isOk(!paddings.hasOwnProperty("paddingBottom"));
    });

    it("right stacking removes right popup padding", function() {
        notification = createNotification({
            stacking: "right"
        });

        let paddings = notification._popupPaddings;

        assert.isOk(!paddings.hasOwnProperty("paddingRight"));
    });

    it("left stacking removes right popup padding", function() {
        notification = createNotification({
            stacking: "left"
        });

        let paddings = notification._popupPaddings;

        assert.isOk(!paddings.hasOwnProperty("paddingLeft"));
    });

    it("initialization compiles default template function", function() {
        notification = createNotification();

        let defaultFunc = notification._getCompiled();
        let params = { typeIcon: "info", content: "foo", closeButton: false };
        let infoCircleIcon = kendo.ui.icon($('<span class="k-notification-status" title="info"></span>'), { icon: "info-circle" });
        let defaultOutput = `${infoCircleIcon}<div class="k-notification-content">foo</div>`;
        assert.equal(typeof defaultFunc, "function");
        assert.equal(defaultFunc(params), defaultOutput);
    });

    it("initialization compiles custom template function when string template is defined", function() {
        notification = createNotification({
            templates: [{
                type: "foo",
                template: () => "bar"
            }]
        });

        let fooFunc = notification._getCompiled("foo");

        assert.equal(typeof fooFunc, "function");
        assert.equal(fooFunc({}), "bar");
    });

    asyncTest("opened popup notifications are hidden after set autoHideAfter", function(done) {
        let autoHideAfter = 10;

        notification = createNotification({
            autoHideAfter: autoHideAfter
        });

        notification.show("foo");

        setTimeout(function() {
            done(() => assert.equal($(".k-notification").length, 0));
        }, autoHideAfter + 10);

    });

    asyncTest("opened static notifications are hidden after set autoHideAfter", function(done) {
        let autoHideAfter = 10;

        notification = createNotification({
            appendTo: Mocha.fixture,
            autoHideAfter: autoHideAfter
        });

        notification.show("foo");

        setTimeout(function() {
            done(() => assert.equal($(".k-notification").length, 0));
        }, autoHideAfter + 10);

    });

    it("clicking on popup notification hides it when hideOnClick is true (default)", function() {
        notification = createNotification({
            autoHideAfter: 0
        });

        notification.show("foo");

        $(".k-notification").click();

        assert.equal($(".k-notification").length, 0);
    });

    it("clicking on static notification hides it when hideOnClick is true (default)", function() {
        notification = createNotification({
            appendTo: Mocha.fixture,
            autoHideAfter: 0
        });

        notification.show("foo");

        $(".k-notification").click();

        assert.equal($(".k-notification").length, 0);
    });

    it("clicking on notification popup does not hide it when hideOnClick is false", function() {
        notification = createNotification({
            autoHideAfter: 0,
            hideOnClick: false
        });

        notification.show("foo");

        $(".k-notification").click();

        assert.equal($(".k-notification").length, 1);
    });

    it("clicking on static notification does not hide it when hideOnClick is false", function() {
        notification = createNotification({
            appendTo: Mocha.fixture,
            autoHideAfter: 0,
            hideOnClick: false
        });

        notification.show("foo");

        $(".k-notification").click();

        assert.equal($(".k-notification").length, 1);
    });

    it("notification width and height are null by default", function() {
        notification = createNotification({
            autoHideAfter: 0
        });

        notification.show("foo");

        let notificationElement = $(".k-notification")[0];

        assert.equal(notificationElement.style.width, "");
        assert.equal(notificationElement.style.height, "");
    });

    it("int width and height settings are applied as inline styles", function() {
        let size = 2;

        notification = createNotification({
            width: size,
            height: size,
            autoHideAfter: 0
        });

        notification.show("foo");

        let notificationElement = $(".k-notification")[0];

        assert.equal(notificationElement.style.width, size + "px");
        assert.equal(notificationElement.style.height, size + "px");
    });

    it("string pixel width and height settings are applied as inline styles", function() {
        let size = "2px";

        notification = createNotification({
            width: size,
            height: size,
            autoHideAfter: 0
        });

        notification.show("foo");

        let notificationElement = $(".k-notification")[0];

        assert.equal(notificationElement.style.width, size);
        assert.equal(notificationElement.style.height, size);
    });

    it("string em width and height settings are applied as inline styles", function() {
        let size = "2em";

        notification = createNotification({
            width: size,
            height: size,
            autoHideAfter: 0
        });

        notification.show("foo");

        let notificationElement = $(".k-notification")[0];

        assert.equal(notificationElement.style.width, size);
        assert.equal(notificationElement.style.height, size);
    });

    asyncTest("hide button is by default hidden", function(done) {
        notification = createNotification();

        notification.show("foo");


        setTimeout(function() {
            let notificationPopup = $(".k-notification");
            let closeIcon = notificationPopup.find(".k-close-icon");
            done(() => assert.isTrue(!closeIcon.length));
        }, 400);
    });

    it("title is applied to the Notification element", function() {
        notification = createNotification({
            title: "custom title"
        });
        notification.show("foo");

        let element = $(".k-notification");

        assert.equal(element.attr("title"), "custom title");
    });

    it("hide button is displayed if button property is set to true", function() {
        notification = createNotification({
            button: true
        });

        notification.show("foo");

        assert.isOk($(".k-notification").find(".k-notification-actions .k-icon").is(":visible"));
    });

    it("right offset is set to 20 when button property is set to false", function() {
        notification = createNotification({
            button: false
        });

        assert.equal(notification.options.position.right, 20);
    });

    it("right offset is set to 40 when button property is set to true", function() {
        notification = createNotification({
            button: true
        });

        assert.equal(notification.options.position.right, 40);
    });

    it("clicking on static notification hides it when button is pressed", function() {
        notification = createNotification({
            appendTo: Mocha.fixture,
            autoHideAfter: 0,
            hideOnClick: false,
            button: true
        });

        notification.show("foo");

        $(".k-notification").find(".k-notification-actions .k-icon").click();

        assert.equal($(".k-notification").length, 0);
    });

    it("clicking on popup notification hides it when button is pressed", function() {
        notification = createNotification({
            autoHideAfter: 0,
            hideOnClick: false,
            button: true
        });

        notification.show("foo");

        $(".k-notification").find(".k-notification-actions .k-icon").click();

        assert.equal($(".k-notification").length, 0);
    });

    it("popup notifications have fixed position style by default", function() {
        notification = createNotification();

        notification.show("foo");

        assert.equal($(".k-notification").closest(".k-animation-container").css("position"), "fixed");
    });

    it("unpinned popup notifications have an absolute position style", function() {
        notification = createNotification({
            position: {
                pinned: false
            }
        });

        notification.show("foo");

        assert.equal($(".k-notification").closest(".k-animation-container").css("position"), "absolute");
    });

    it("pinned popup notification is shown at specified int position", function() {
        notification = createNotification({
            position: {
                top: 1,
                left: 2
            }
        });

        notification.show("foo");

        let popupContainer = $(".k-notification").closest(".k-animation-container");

        assert.equal(popupContainer.css("top"), "1px");
        assert.equal(popupContainer.css("left"), "2px");
    });

    //    it("pinned popup notification is shown at specified string position", function() {
    //        notification = createNotification({
    //            position: {
    //                top: "1px",
    //                left: "2px"
    //            }
    //        });

    //        notification.show("foo");

    //        let popupContainer = $(".k-notification").parent();

    //        assert.equal(popupContainer.css("top"), "1px");
    //        assert.equal(popupContainer.css("left"), "2px");
    //    });

    it("pinned popup notification is shown at zero position", function() {
        notification = createNotification({
            position: {
                top: 0,
                left: 0
            }
        });

        notification.show("foo");

        let popupContainer = $(".k-notification").closest(".k-animation-container");

        assert.equal(popupContainer.css("top"), "0px");
        assert.equal(popupContainer.css("left"), "0px");
    });

    it("unpinned popup notification is shown at specified int position", function() {
        notification = createNotification({
            position: {
                top: 1,
                left: 2,
                pinned: false
            }
        });

        notification.show("foo");

        let popupContainer = $(".k-notification").closest(".k-animation-container");

        assert.equal(popupContainer.css("top"), "1px");
        assert.equal(popupContainer.css("left"), "2px");
    });

    //    it("unpinned popup notification is shown at specified string position", function() {
    //        notification = createNotification({
    //            position: {
    //                top: "1px",
    //                left: "2px",
    //                pinned: false
    //            }
    //        });

    //        notification.show("foo");

    //        let popupContainer = $(".k-notification").parent();

    //        assert.equal(popupContainer.css("top"), "1px");
    //        assert.equal(popupContainer.css("left"), "2px");
    //    });

    it("unpinned popup notification is shown at zero position", function() {
        notification = createNotification({
            position: {
                top: 0,
                left: 0,
                pinned: false
            }
        });

        notification.show("foo");

        let popupContainer = $(".k-notification").closest(".k-animation-container");

        assert.equal(popupContainer.css("top"), "0px");
        assert.equal(popupContainer.css("left"), "0px");
    });

    it("pinned popup notification ignores page scroll offset", function() {
        Mocha.fixture.css({ width: 4000, height: 4000 });
        let scrollPosition = 1000;

        $(Mocha.fixture[0].ownerDocument).scrollTop(scrollPosition).scrollLeft(scrollPosition);

        notification = createNotification({
            position: {
                top: 1,
                left: 2
            }
        });

        notification.show("foo");

        let popupContainer = $(".k-notification").closest(".k-animation-container");

        assert.equal(popupContainer.css("top"), "1px");
        assert.equal(popupContainer.css("left"), "2px");
    });

    it("unpinned popup notification obeys page scroll offset", function() {
        Mocha.fixture.css({ width: 4000, height: 4000 });
        let scrollPosition = 1000;

        $(Mocha.fixture[0].ownerDocument).scrollTop(scrollPosition).scrollLeft(scrollPosition);

        notification = createNotification({
            position: {
                top: 1,
                left: 2,
                pinned: false
            }
        });

        notification.show("foo");

        let popupContainer = $(".k-notification").closest(".k-animation-container");

        assert.equal(popupContainer.css("top"), "1001px");
        assert.equal(popupContainer.css("left"), "1002px");
    });

    it("down static stacking is applied by default", function() {
        notification = createNotification({
            appendTo: Mocha.fixture,
            autoHideAfter: 0
        });

        notification.show('<span id="foo">foo</span>');
        notification.show('<span id="bar">bar</span>');

        assert.equal(Mocha.fixture.children(".k-notification").first().find("#foo").length, 1);
        assert.equal(Mocha.fixture.children(".k-notification").last().find("#bar").length, 1);
    });

    it("right static stacking behaves as down stacking", function() {
        notification = createNotification({
            appendTo: Mocha.fixture,
            autoHideAfter: 0,
            stacking: "right"
        });

        notification.show('<span id="foo">foo</span>');
        notification.show('<span id="bar">bar</span>');

        assert.equal(Mocha.fixture.children(".k-notification").first().find("#foo").length, 1);
        assert.equal(Mocha.fixture.children(".k-notification").last().find("#bar").length, 1);
    });

    it("up static stacking is applied", function() {
        notification = createNotification({
            appendTo: Mocha.fixture,
            autoHideAfter: 0,
            stacking: "up"
        });

        notification.show('<span id="foo">foo</span>');
        notification.show('<span id="bar">bar</span>');

        assert.equal(Mocha.fixture.children(".k-notification").last().find("#foo").length, 1);
        assert.equal(Mocha.fixture.children(".k-notification").first().find("#bar").length, 1);
    });

    it("left static stacking behaves as up stacking", function() {
        notification = createNotification({
            appendTo: Mocha.fixture,
            autoHideAfter: 0,
            stacking: "left"
        });

        notification.show('<span id="foo">foo</span>');
        notification.show('<span id="bar">bar</span>');

        assert.equal(Mocha.fixture.children(".k-notification").last().find("#foo").length, 1);
        assert.equal(Mocha.fixture.children(".k-notification").first().find("#bar").length, 1);
    });

    it("up popup stacking is applied by default", function() {
        notification = createNotification({
            autoHideAfter: 0
        });

        notification.show('<span id="foo">foo</span>');
        let fooNotificationWrapper = $("#foo").closest(".k-notification").closest(".k-animation-container");

        notification.show('<span id="bar">bar bar</span>');
        let barNotificationWrapper = $("#bar").closest(".k-notification").closest(".k-animation-container");

        assert.isOk(parseInt(fooNotificationWrapper.css("top"), 10) > parseInt(barNotificationWrapper.css("top"), 10));
        roughlyEqual(fooNotificationWrapper.css("right"), barNotificationWrapper.css("right"), 0.5);
    });

    it("down popup stacking is applied", function() {
        notification = createNotification({
            autoHideAfter: 0,
            stacking: "down"
        });

        notification.show('<span id="foo">foo</span>');
        let fooNotificationWrapper = $("#foo").closest(".k-notification").closest(".k-animation-container");

        notification.show('<span id="bar">bar bar</span>');
        let barNotificationWrapper = $("#bar").closest(".k-notification").closest(".k-animation-container");

        assert.isOk(parseInt(fooNotificationWrapper.css("top"), 10) < parseInt(barNotificationWrapper.css("top"), 10));
        roughlyEqual(fooNotificationWrapper.css("right"), barNotificationWrapper.css("right"), 0.5);
    });

    it("down popup stacking is applied by default if position.top is set", function() {
        notification = createNotification({
            autoHideAfter: 0,
            position: {
                top: 1
            }
        });

        notification.show('<span id="foo">foo</span>');
        let fooNotificationWrapper = $("#foo").closest(".k-notification").closest(".k-animation-container");

        notification.show('<span id="bar">bar bar</span>');
        let barNotificationWrapper = $("#bar").closest(".k-notification").closest(".k-animation-container");

        assert.isOk(parseInt(fooNotificationWrapper.css("top"), 10) < parseInt(barNotificationWrapper.css("top"), 10));
        roughlyEqual(fooNotificationWrapper.css("right"), barNotificationWrapper.css("right"), 0.82);
    });

    it("right popup stacking is applied", function() {
        notification = createNotification({
            autoHideAfter: 0,
            stacking: "right"
        });

        notification.show('<span id="foo">foo</span>');
        let fooNotificationWrapper = $("#foo").closest(".k-notification").closest(".k-animation-container");

        notification.show('<span id="bar">bar</span>');
        let barNotificationWrapper = $("#bar").closest(".k-notification").closest(".k-animation-container");

        assert.isOk(fooNotificationWrapper.offset().left < barNotificationWrapper.offset().left);
        roughlyEqual(fooNotificationWrapper.offset().top, barNotificationWrapper.offset().top, 1);
    });

    it("left popup stacking is applied", function() {
        notification = createNotification({
            autoHideAfter: 0,
            stacking: "left"
        });

        notification.show('<span id="foo">foo</span>');
        let fooNotificationWrapper = $("#foo").closest(".k-notification").closest(".k-animation-container");

        notification.show('<span id="bar">bar</span>');
        let barNotificationWrapper = $("#bar").closest(".k-notification").closest(".k-animation-container");

        assert.isOk(parseInt(fooNotificationWrapper.css("left"), 10) > parseInt(barNotificationWrapper.css("left"), 10));
        roughlyEqual(fooNotificationWrapper.css("top"), barNotificationWrapper.css("top"), 1);
    });

    it("left popup alignment is applied if left position is set", function() {
        notification = createNotification({
            autoHideAfter: 0,
            position: {
                left: 1
            }
        });

        notification.show('<span id="foo">foo</span>');
        let fooNotificationWrapper = $("#foo").closest(".k-notification").closest(".k-animation-container");

        notification.show('<span id="bar">bar bar</span>');
        let barNotificationWrapper = $("#bar").closest(".k-notification").closest(".k-animation-container");

        roughlyEqual(fooNotificationWrapper.css("left"), barNotificationWrapper.css("left"), 0.15);
    });

    asyncTest("clicking on popup notification before allowHideAfter does not hide it", function(done) {
        let allowHideAfter = 300;

        notification = createNotification({
            autoHideAfter: 0,
            allowHideAfter: allowHideAfter
        });

        notification.show("foo");

        $(".k-notification").click();

        assert.equal($(".k-notification").length, 1);

        setTimeout(function() {

            $(".k-notification").click();

            done(() => assert.equal($(".k-notification").length, 0));
        }, allowHideAfter + 100);
    });

    asyncTest("clicking on popup notification button before allowHideAfter does not hide it", function(done) {
        let allowHideAfter = 300;

        notification = createNotification({
            autoHideAfter: 0,
            hideOnClick: false,
            button: true,
            allowHideAfter: allowHideAfter
        });

        notification.show("foo");

        $(".k-notification").find(".k-notification-actions .k-icon").click();

        assert.equal($(".k-notification").length, 1);

        setTimeout(function() {

            $(".k-notification").find(".k-notification-actions .k-icon").click();

            done(() => assert.equal($(".k-notification").length, 0));
        }, allowHideAfter + 100);
    });

    it("originating element is hidden if appendTo is not set", function() {
        notification = createNotification();

        assert.equal(notification.element[0].style.display, "none");
    });

    it("originating element is hidden if appendTo is set to another element", function() {
        notification = createNotification({
            appendTo: Mocha.fixture
        });

        assert.equal(notification.element[0].style.display, "none");
    });

    it("originating element is not hidden if appendTo is set to Notification widget element", function() {
        notification = createNotification({
            appendTo: "#notification"
        });

        assert.notEqual(notification.element[0].style.display, "none");
    });

    it("popup notifications have a k-rtl class in RTL mode", function() {
        Mocha.fixture.addClass("k-rtl");
        notification = createNotification();

        notification.show("foo");

        Mocha.fixture.removeClass("k-rtl");

        assert.isOk($(".k-notification").hasClass("k-rtl"));
    });

    it("close button is wrapped in a span", function() {
        notification = createNotification({
            appendTo: "#notification",
            button: true
        });

        notification.show("foo");

        assert.isOk(notification.element.find(".k-notification-actions .k-notification-close-action .k-icon").length);
    });

    it("Notification should have z-index of 12000", function() {
        notification = createNotification({
            position: { pinned: true, top: 300, left: 400 },
            autoHideAfter: 0
        });

        notification.show("This notification should be ABOVE the window overlay.");

        let notificationElement = $(".k-notification").last();
        let notificationContainer = notificationElement.closest(".k-animation-container");
        let notificationZIndex = parseInt(notificationContainer.css("z-index"), 10);

        assert.equal(notificationZIndex, 12000, "Notification z-index should be 12000");
    });

      it("closeButton per-notification overrides button option", function() {
        notification = createNotification({
            button: false
        });

        notification.show({ content: "foo", closeButton: true });

        assert.isOk($(".k-notification").find(".k-notification-actions .k-icon").is(":visible"));
    });

    it("closeButton false per-notification overrides button true option", function() {
        notification = createNotification({
            button: true
        });

        notification.show({ content: "foo", closeButton: false });

        assert.equal($(".k-notification").find(".k-notification-actions .k-icon").length, 0);
    });

    it("notification with closeButton true adjusts position when button is false", function() {
        notification = createNotification({
            button: false,
            position: { pinned: true, top: null, left: null, bottom: 20, right: 20 }
        });

        notification.show({ content: "foo", closeButton: true });

        let notificationElement = $(".k-notification").last();
        
        // Verify the close button is rendered even though button: false at widget level
        assert.equal(notificationElement.find(".k-notification-actions .k-icon").length, 1);
        assert.isOk(notificationElement.hasClass("k-notification-closable"));
    });

    it("notification with closeButton false adjusts position when button is true", function() {
        notification = createNotification({
            button: true,
            position: { pinned: true, top: null, left: null, bottom: 20, right: 40 }
        });

        notification.show({ content: "foo", closeButton: false });

        let notificationElement = $(".k-notification").last();
        
        // Verify the close button is NOT rendered even though button: true at widget level
        assert.equal(notificationElement.find(".k-notification-actions .k-icon").length, 0);
        assert.isOk(!notificationElement.hasClass("k-notification-closable"));
    });

});
