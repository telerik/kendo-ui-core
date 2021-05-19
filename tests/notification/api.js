(function() {
    describe("api", function() {
        beforeEach(function() {

        });
        afterEach(function() {
            if (notification) {
                notification.destroy();
            }

            $(".k-notification").each(function(idx, element) {
                var popup = $(element).data("kendoPopup");
                if (popup) {
                    popup.destroy();
                }
                $(element).remove();
            });
        });

        it("show method adds internal stacking GUID to popup notification", function() {
            createNotification();

            var guid = notification._guid;

            notification.show("foo");

            assert.isOk($(".k-notification").parent().hasClass(guid));
        });

        it("show method adds internal stacking GUID to static notification", function() {
            createNotification({
                appendTo: Mocha.fixture
            });

            var guid = notification._guid;

            notification.show("foo");

            assert.isOk($(".k-notification").hasClass(guid));
        });

        it("show method creates div.k-widget.k-notification element", function() {
            createNotification();

            notification.show("foo");

            assert.equal($(document.body).find("div.k-widget.k-notification").length, 1);
        });

        it("show method creates a Kendo UI Popup when appendTo is not set", function() {
            createNotification();

            notification.show("foo");

            assert.isOk($(document.body).find(".k-notification").data("kendoPopup"));
        });

        it("show method creates a Kendo UI Popup with zero margin", function() {
            createNotification();

            notification.show("foo");

            assert.equal($(document.body).find(".k-notification").parent()[0].style.margin, "0px"); // using .css("margin") will fail in Firefox
        });

        it("show method creates a Kendo UI Popup with three zero paddings, except top by default", function() {
            createNotification();

            notification.show("foo");

            assert.equal($(document.body).find(".k-notification").parent().css("paddingBottom"), "0px");
            assert.equal($(document.body).find(".k-notification").parent().css("paddingLeft"), "0px");
            assert.equal($(document.body).find(".k-notification").parent().css("paddingRight"), "0px");
        });

        it("show method creates a Kendo UI Popup with three zero paddings, except top", function() {
            createNotification({
                stacking: "up"
            });

            notification.show("foo");

            assert.equal($(document.body).find(".k-notification").parent().css("paddingBottom"), "0px");
            assert.equal($(document.body).find(".k-notification").parent().css("paddingLeft"), "0px");
            assert.equal($(document.body).find(".k-notification").parent().css("paddingRight"), "0px");
        });

        it("show method creates a Kendo UI Popup with three zero paddings, except bottom", function() {
            createNotification({
                stacking: "down"
            });

            notification.show("foo");

            assert.equal($(document.body).find(".k-notification").parent().css("paddingTop"), "0px");
            assert.equal($(document.body).find(".k-notification").parent().css("paddingLeft"), "0px");
            assert.equal($(document.body).find(".k-notification").parent().css("paddingRight"), "0px");
        });

        it("show method creates a Kendo UI Popup with three zero paddings, except left", function() {
            createNotification({
                stacking: "left"
            });

            notification.show("foo");

            assert.equal($(document.body).find(".k-notification").parent().css("paddingTop"), "0px");
            assert.equal($(document.body).find(".k-notification").parent().css("paddingBottom"), "0px");
            assert.equal($(document.body).find(".k-notification").parent().css("paddingRight"), "0px");
        });

        it("show method creates a Kendo UI Popup with three zero paddings, except right", function() {
            createNotification({
                stacking: "right"
            });

            notification.show("foo");

            assert.equal($(document.body).find(".k-notification").parent().css("paddingTop"), "0px");
            assert.equal($(document.body).find(".k-notification").parent().css("paddingBottom"), "0px");
            assert.equal($(document.body).find(".k-notification").parent().css("paddingLeft"), "0px");
        });

        it("show method does not create a Kendo UI Popup when appendTo is set", function() {
            createNotification({
                appendTo: Mocha.fixture
            });

            notification.show("foo");

            var notificationElement = Mocha.fixture.children(".k-notification");

            assert.equal(notificationElement.length, 1);
            assert.isOk(!notificationElement.data("kendoPopup"));
        });

        it("show method ignores empty content", function() {
            createNotification();

            notification.show("");
            notification.show();
            notification.show(null);

            assert.equal($(document.body).find("div.k-widget.k-notification").length, 0);
        });

        it("show method supports empty object as content", function() {
            createNotification();

            notification.show({});

            assert.equal($(document.body).find("div.k-widget.k-notification").length, 1);
        });

        it("show method renders passed string content", function() {
            createNotification();

            notification.show("<span id='foo'></span>");

            assert.equal($(document.body).find("div.k-widget.k-notification").find("#foo").length, 1);
        });

        it("showText method escapes passed markup content", function() {
            createNotification();

            notification.showText("<span>Foo</span>");

            assert.include(
                $(document.body).find("div.k-widget.k-notification").html(),
                "&lt;span&gt;Foo&lt;/span&gt;"
            );
        });

        it("show method renders passed object content", function() {
            createNotification({
                templates: [{
                    type: "info",
                    template: "<div id='#= foo #'></div>"
                }]
            });

            notification.show({ foo: "bar" });

            assert.equal($(document.body).find("div.k-widget.k-notification").find("#bar").length, 1);
        });

        it("show method renders passed function content", function() {
            createNotification();

            var html = '<div id="foo"></div>';

            notification.show(function() {
                return html;
            });

            assert.isOk($(document.body).find("div.k-widget.k-notification").html().indexOf(html) > -1);
        });

        it("showText method escapes passed function content", function() {
            createNotification();

            var html = '<div id="foo"></div>';

            notification.showText(function() {
                return html;
            });

            assert.include(
                $(document.body).find("div.k-widget.k-notification").html(),
                "&lt;div id=\"foo\"&gt;&lt;/div&gt;"
            );
        });

        it("show method renders passed function object content", function() {
            createNotification({
                templates: [{
                    type: "info",
                    template: "<div id='#= foo #'></div>"
                }]
            });

            notification.show(function() {
                return { foo: "bar" };
            });

            assert.equal($(document.body).find("div.k-widget.k-notification").find("#bar").length, 1);
        });

        it("show method adds notification type CSS class to popup and text to note icon", function() {
            createNotification();

            notification.show("foo", "bar");

            var notificationPopup = $(".k-notification.k-notification-bar");

            assert.equal(notificationPopup.length, 1);
            assert.equal(notificationPopup.find(".k-i-bar").text(), "");
        });

        it("show method adds notification type CSS class to static element and text to note icon", function() {
            createNotification({
                appendTo: Mocha.fixture
            });

            notification.show("foo", "bar");

            var notificationElement = $(".k-notification.k-notification-bar");

            assert.equal(notificationElement.length, 1);
            assert.equal(notificationElement.find(".k-i-bar").text(), "");
        });

        it("show method adds data-role='alert' to popup notification", function() {
            createNotification();

            notification.show("foo");

            assert.equal($(".k-notification").attr("data-role"), "alert");
        });

        it("show method adds data-role='alert' to static notification", function() {
            createNotification({
                appendTo: Mocha.fixture
            });

            notification.show("foo");

            assert.equal($(".k-notification").attr("data-role"), "alert");
        });

        it("show and hide methods work for static notifications when animations are disabled", function() {
            createNotification({
                appendTo: Mocha.fixture,
                animation: false
            });

            notification.show("foo");

            assert.isOk($(".k-notification").is(":visible"));

            notification.hide();

            assert.equal($(".k-notification").length, 0);
        });

        it("new popup ignores old ones that are currently being hidden", function() {
            createNotification();



            notification.show("foo");
            var popup1 = $(".k-notification").last();
            var offset1 = popup1.offset();
            var text1 = popup1.text();

            notification.hide();

            notification.show("bar");
            var popup2 = $(".k-notification").last();
            var offset2 = popup2.offset();
            var text2 = popup2.text();

            assert.isOk(text1.indexOf("foo") >= 0);
            assert.isOk(text2.indexOf("bar") >= 0);
            assert.equal(offset2.top, offset1.top);
        });

        it("shortcut show methods call show method with appropriate arguments", function() {
            var defaultArgs = [null, null],
                methods = ["info", "success", "warning", "error"],
                args, j;

            createNotification();

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

            createNotification({
                autoHideAfter: 0
            });

            notification.show("foo");
            notification.hide();

            assert.isOk($(".k-notification").parent().hasClass("k-hiding"));

            kendo.effects.disable();
        });

        it("hide method hides all popup notifications", function() {
            createNotification({
                autoHideAfter: 0
            });

            notification.show("foo");
            notification.show("bar");
            notification.show("baz");

            notification.hide();

            assert.equal($(".k-notification").length, 0);
        });

        it("hide method hides all static notifications", function() {
            createNotification({
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
            createNotification({
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
            createNotification({
                templates: [{
                    type: "info",
                    template: "foo"
                }]
            });

            notification.setOptions({
                templates: [{
                    type: "info",
                    template: "bar"
                }]
            });

            assert.equal(notification._compiled.info({}), "bar");
        });

        it("getNotifications returns open popup notifications", function() {
            createNotification({
                autoHideAfter: 0
            });

            notification.show("foo");
            notification.show("bar");

            assert.equal(notification.getNotifications().length, 2);
        });

        it("getNotifications returns open static notifications", function() {
            createNotification({
                autoHideAfter: 0,
                appendTo: Mocha.fixture
            });

            notification.show("foo");
            notification.show("bar");

            assert.equal(notification.getNotifications().length, 2);
        });

        it("destroy removes content click handler from popup", function() {
            createNotification({
                autoHideAfter: 0
            });

            notification.show("foo");

            notification.destroy();

            $(".k-notification").click();

            assert.equal($(".k-notification").length, 1);
        });

        it("destroy removes button click handler from popup", function() {
            createNotification({
                autoHideAfter: 0,
                hideOnClick: false,
                button: true
            });

            notification.show("foo");

            notification.destroy();

            $(".k-notification .k-i-close").click();

            assert.equal($(".k-notification").length, 1);
        });

        it("destroy removes content click handler from static", function() {
            createNotification({
                appendTo: Mocha.fixture,
                autoHideAfter: 0
            });

            notification.show("foo");

            notification.destroy();

            $(".k-notification").click();

            assert.equal($(".k-notification").length, 1);
        });

        it("destroy removes button click handler from static", function() {
            createNotification({
                appendTo: Mocha.fixture,
                autoHideAfter: 0,
                hideOnClick: false,
                button: true
            });

            notification.show("foo");

            notification.destroy();

            $(".k-notification .k-i-close").click();

            assert.equal($(".k-notification").length, 1);
        });
    });
}());
