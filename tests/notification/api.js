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
            templates: {
                info: "<div id='#= foo #'></div>"
            }
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
            templates: {
                info: "<div id='#= foo #'></div>"
            }
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

    test("shortcut show methods call show method with appropriate arguments", 8, function() {
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


})();