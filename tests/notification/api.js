(function() {
    module("api", {
        setup: function() {
            kendo.effects.disable();
        },
        teardown: function() {
            if (notification) {
                notification.destroy();
            }

            $(".k-notification").each(function(idx, element){
                var popup = $(element).data("kendoPopup");
                if (popup) {
                    popup.destroy();
                }
                $(element).remove();
            });

            kendo.effects.enable();
        }
    });

    test("show method adds internal stacking GUID to popup notification", function() {
        createNotification();

        var guid = notification._guid;

        notification.show("foo");

        ok($(".k-notification").parent().hasClass(guid));
    });

    test("show method adds internal stacking GUID to static notification", function() {
        createNotification({
            appendTo: QUnit.fixture
        });

        var guid = notification._guid;

        notification.show("foo");

        ok($(".k-notification").hasClass(guid));
    });

    test("show method creates div.k-widget.k-notification element", function() {
        createNotification();

        notification.show("foo");

        equal($(document.body).find("div.k-widget.k-notification").length, 1);
    });

    test("show method creates a Kendo UI Popup when appendTo is not set", function() {
        createNotification();

        notification.show("foo");

        ok($(document.body).find(".k-notification").data("kendoPopup"));
    });

    test("show method creates a Kendo UI Popup with zero margin", function() {
        createNotification();

        notification.show("foo");

        equal($(document.body).find(".k-notification").parent()[0].style.margin, "0px"); // using .css("margin") will fail in Firefox
    });

    test("show method creates a Kendo UI Popup with three zero paddings, except top by default", 3, function() {
        createNotification();

        notification.show("foo");

        equal($(document.body).find(".k-notification").parent().css("paddingBottom"), "0px");
        equal($(document.body).find(".k-notification").parent().css("paddingLeft"), "0px");
        equal($(document.body).find(".k-notification").parent().css("paddingRight"), "0px");
    });

    test("show method creates a Kendo UI Popup with three zero paddings, except top", 3, function() {
        createNotification({
            stacking: "up"
        });

        notification.show("foo");

        equal($(document.body).find(".k-notification").parent().css("paddingBottom"), "0px");
        equal($(document.body).find(".k-notification").parent().css("paddingLeft"), "0px");
        equal($(document.body).find(".k-notification").parent().css("paddingRight"), "0px");
    });

    test("show method creates a Kendo UI Popup with three zero paddings, except bottom", 3, function() {
        createNotification({
            stacking: "down"
        });

        notification.show("foo");

        equal($(document.body).find(".k-notification").parent().css("paddingTop"), "0px");
        equal($(document.body).find(".k-notification").parent().css("paddingLeft"), "0px");
        equal($(document.body).find(".k-notification").parent().css("paddingRight"), "0px");
    });

    test("show method creates a Kendo UI Popup with three zero paddings, except left", 3, function() {
        createNotification({
            stacking: "left"
        });

        notification.show("foo");

        equal($(document.body).find(".k-notification").parent().css("paddingTop"), "0px");
        equal($(document.body).find(".k-notification").parent().css("paddingBottom"), "0px");
        equal($(document.body).find(".k-notification").parent().css("paddingRight"), "0px");
    });

    test("show method creates a Kendo UI Popup with three zero paddings, except right", 3, function() {
        createNotification({
            stacking: "right"
        });

        notification.show("foo");

        equal($(document.body).find(".k-notification").parent().css("paddingTop"), "0px");
        equal($(document.body).find(".k-notification").parent().css("paddingBottom"), "0px");
        equal($(document.body).find(".k-notification").parent().css("paddingLeft"), "0px");
    });

    test("show method does not create a Kendo UI Popup when appendTo is set", function() {
        createNotification({
            appendTo: QUnit.fixture
        });

        notification.show("foo");

        var notificationElement = QUnit.fixture.children(".k-notification");
        
        equal(notificationElement.length, 1);
        ok(!notificationElement.data("kendoPopup"));
    });

    test("show method ignores empty content", function() {
        createNotification();

        notification.show("");
        notification.show();
        notification.show(null);

        equal($(document.body).find("div.k-widget.k-notification").length, 0);
    });

    test("show method supports empty object as content", function() {
        createNotification();

        notification.show({});

        equal($(document.body).find("div.k-widget.k-notification").length, 1);
    });

    test("show method renders passed string content", function() {
        createNotification();

        notification.show("<span id='foo'></span>");

        equal($(document.body).find("div.k-widget.k-notification").find("#foo").length, 1);
    });

    test("show method renders passed object content", function() {
        createNotification({
            templates: [{
                type: "info",
                template: "<div id='#= foo #'></div>"
            }]
        });

        notification.show({foo: "bar"});

        equal($(document.body).find("div.k-widget.k-notification").find("#bar").length, 1);
    });

    test("show method renders passed function content", function() {
        createNotification();

        var html = '<div id="foo"></div>';

        notification.show(function(){
            return html;
        });

        ok($(document.body).find("div.k-widget.k-notification").html().indexOf(html) > -1);
    });

    test("show method renders passed function object content", function() {
        createNotification({
            templates: [{
                type: "info",
                template: "<div id='#= foo #'></div>"
            }]
        });

        notification.show(function(){
            return {foo: "bar"};
        });

        equal($(document.body).find("div.k-widget.k-notification").find("#bar").length, 1);
    });

    test("show method adds notification type CSS class to popup and text to note icon", 2, function() {
        createNotification();

        notification.show("foo", "bar");

        var notificationPopup = $(".k-notification.k-notification-bar");

        equal(notificationPopup.length, 1);
        equal(notificationPopup.find(".k-i-note").text(), "bar");
    });

    test("show method adds notification type CSS class to static element and text to note icon", 2, function() {
        createNotification({
            appendTo: QUnit.fixture
        });

        notification.show("foo", "bar");

        var notificationElement = $(".k-notification.k-notification-bar");

        equal(notificationElement.length, 1);
        equal(notificationElement.find(".k-i-note").text(), "bar");
    });

    test("show method adds data-role='alert' to popup notification", function() {
        createNotification();

        notification.show("foo");

        equal($(".k-notification").attr("data-role"), "alert");
    });

    test("show method adds data-role='alert' to static notification", function() {
        createNotification({
            appendTo: QUnit.fixture
        });

        notification.show("foo");

        equal($(".k-notification").attr("data-role"), "alert");
    });

    test("show and hide methods work for static notifications when animations are disabled", function () {
        createNotification({
            appendTo: QUnit.fixture,
            animation: false
        });

        notification.show("foo");

        ok($(".k-notification").is(":visible"));

        notification.hide();

        equal($(".k-notification").length, 0);
    });

    test("shortcut show methods call show method with appropriate arguments", 8, function () {
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

            equal(args[0], "foo");
            equal(args[1], methods[j]);
        }
    });

    test("hide method hides all popup notifications", function() {
        createNotification({
            autoHideAfter: 0
        });
        
        notification.show("foo");
        notification.show("bar");
        notification.show("baz");

        notification.hide();

        equal($(".k-notification").length, 0);
    });

    test("hide method hides all static notifications", function() {
        createNotification({
            autoHideAfter: 0,
            appendTo: QUnit.fixture
        });
        
        notification.show("foo");
        notification.show("bar");
        notification.show("baz");

        notification.hide();

        equal($(".k-notification").length, 0);
    });

    test("setOptions updates popup stacking settings", 3, function() {
        createNotification({
            stacking: "left"
        });

        notification.setOptions({
            stacking: "right"
        });

        equal(notification._popupOrigin, "top right");
        equal(notification._popupPosition, "top left");
        equal(typeof notification._popupPaddings.paddingRight, "undefined");
    });

    test("setOptions recompiles templates", function() {
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

        equal(notification._compiled.info({}), "bar");
    });

    test("getNotifications returns open popup notifications", function() {
        createNotification({
            autoHideAfter: 0
        });

        notification.show("foo");
        notification.show("bar");

        equal(notification.getNotifications().length, 2);
    });

    test("getNotifications returns open static notifications", function() {
        createNotification({
            autoHideAfter: 0,
            appendTo: QUnit.fixture
        });

        notification.show("foo");
        notification.show("bar");

        equal(notification.getNotifications().length, 2);
    });

    test("destroy removes content click handler from popup", function() {
        createNotification({
            autoHideAfter: 0
        });

        notification.show("foo");

        notification.destroy();

        $(".k-notification").click();

        equal($(".k-notification").length, 1);
    });

    test("destroy removes button click handler from popup", function() {
        createNotification({
            autoHideAfter: 0,
            hideOnClick: false,
            button: true
        });

        notification.show("foo");

        notification.destroy();

        $(".k-notification .k-i-close").click();

        equal($(".k-notification").length, 1);
    });

    test("destroy removes content click handler from static", function() {
        createNotification({
            appendTo: QUnit.fixture,
            autoHideAfter: 0
        });

        notification.show("foo");

        notification.destroy();

        $(".k-notification").click();

        equal($(".k-notification").length, 1);
    });

    test("destroy removes button click handler from static", function() {
        createNotification({
            appendTo: QUnit.fixture,
            autoHideAfter: 0,
            hideOnClick: false,
            button: true
        });

        notification.show("foo");

        notification.destroy();

        $(".k-notification .k-i-close").click();

        equal($(".k-notification").length, 1);
    });
})();