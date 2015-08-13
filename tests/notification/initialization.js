(function() {
    module("initialization", {
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

    test("initialization creates an internal GUID", 3, function() {
        createNotification();

        var guid = notification._guid;

        equal(typeof guid, "string");
        equal(guid.length, 37);
        equal(guid.substr(0, 1), "_");
    });

    test("initialization compiles popup stacking settings", 4, function() {
        createNotification();

        var origin = notification._popupOrigin,
            position = notification._popupPosition,
            regex = /^[a-z]+ [a-z]+$/;

        equal(typeof origin, "string");
        equal(typeof position, "string");
        equal(regex.exec(origin), origin);
        equal(regex.exec(position), position);
    });

    test("initialization compiles popup padding settings", 4, function() {
        createNotification();

        var paddings = notification._popupPaddings,
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

        equal(typeof paddings, "object");
        equal(size, 3);
        ok(allZero);
        ok(!paddings.hasOwnProperty("paddingTop"));
    });

    test("up stacking removes top popup padding", function() {
        createNotification({
            stacking: "up"
        });

        var paddings = notification._popupPaddings;

        ok(!paddings.hasOwnProperty("paddingTop"));
    });

    test("down stacking removes bottom popup padding", function() {
        createNotification({
            stacking: "down"
        });

        var paddings = notification._popupPaddings;

        ok(!paddings.hasOwnProperty("paddingBottom"));
    });

    test("right stacking removes right popup padding", function() {
        createNotification({
            stacking: "right"
        });

        var paddings = notification._popupPaddings;

        ok(!paddings.hasOwnProperty("paddingRight"));
    });

    test("left stacking removes right popup padding", function() {
        createNotification({
            stacking: "left"
        });

        var paddings = notification._popupPaddings;

        ok(!paddings.hasOwnProperty("paddingLeft"));
    });

    test("initialization compiles default template function", 2, function() {
        createNotification();

        var defaultFunc = notification._getCompiled();
        var params = {typeIcon: "info", content: "foo"};
        var defaultOutput = '<div class="k-notification-wrap"><span class="k-icon k-i-note">info</span>foo<span class="k-icon k-i-close">Hide</span></div>';

        equal(typeof defaultFunc, "function");
        equal(defaultFunc(params), defaultOutput);
    });

    test("initialization compiles custom template function when string template is defined", 2, function() {
        createNotification({
            templates: [{
                type: "foo",
                template: "bar"
            }]
        });

        var fooFunc = notification._getCompiled("foo");

        equal(typeof fooFunc, "function");
        equal(fooFunc({}), "bar");
    });

    test("initialization compiles custom template function when template ID is defined", 2, function() {

    $("<script id='tid' type='text/x-kendo-template'>bar</script>").appendTo(QUnit.fixture);

        createNotification({
            templates: [{
                type: "foo",
                templateId: "tid"
            }]
        });

        var fooFunc = notification._getCompiled("foo");

        equal(typeof fooFunc, "function");
        equal(fooFunc({}), "bar");
    });

    asyncTest("opened popup notifications are hidden after set autoHideAfter", function() {
        var autoHideAfter = 10;

        createNotification({
            autoHideAfter: autoHideAfter
        });

        notification.show("foo");

        setTimeout(function(){
            start();
            equal($(".k-notification").length, 0);
        }, autoHideAfter + 10);

    });

    asyncTest("opened static notifications are hidden after set autoHideAfter", function() {
        var autoHideAfter = 10;

        createNotification({
            appendTo: QUnit.fixture,
            autoHideAfter: autoHideAfter
        });

        notification.show("foo");

        setTimeout(function(){
            start();
            equal($(".k-notification").length, 0);
        }, autoHideAfter + 10);

    });

    test("clicking on popup notification hides it when hideOnClick is true (default)", function() {
        createNotification({
            autoHideAfter: 0
        });

        notification.show("foo");

        $(".k-notification").click();

        equal($(".k-notification").length, 0);
    });

    test("clicking on static notification hides it when hideOnClick is true (default)", function() {
        createNotification({
            appendTo: QUnit.fixture,
            autoHideAfter: 0
        });

        notification.show("foo");

        $(".k-notification").click();

        equal($(".k-notification").length, 0);
    });

    test("clicking on notification popup does not hide it when hideOnClick is false", function() {
        createNotification({
            autoHideAfter: 0,
            hideOnClick: false
        });

        notification.show("foo");

        $(".k-notification").click();

        equal($(".k-notification").length, 1);
    });

    test("clicking on static notification does not hide it when hideOnClick is false", function() {
        createNotification({
            appendTo: QUnit.fixture,
            autoHideAfter: 0,
            hideOnClick: false
        });

        notification.show("foo");

        $(".k-notification").click();

        equal($(".k-notification").length, 1);
    });

    test("notification width and height are null by default", 2, function() {
        createNotification({
            autoHideAfter: 0
        });

        notification.show("foo");

        var notificationElement = $(".k-notification")[0];

        equal(notificationElement.style.width, "");
        equal(notificationElement.style.height, "");
    });

    test("int width and height settings are applied as inline styles", 2, function() {
        var size = 2;

        createNotification({
            width: size,
            height: size,
            autoHideAfter: 0
        });

        notification.show("foo");

        var notificationElement = $(".k-notification")[0];

        equal(notificationElement.style.width, size + "px");
        equal(notificationElement.style.height, size + "px");
    });

    test("string pixel width and height settings are applied as inline styles", 2, function() {
        var size = "2px";

        createNotification({
            width: size,
            height: size,
            autoHideAfter: 0
        });

        notification.show("foo");

        var notificationElement = $(".k-notification")[0];

        equal(notificationElement.style.width, size);
        equal(notificationElement.style.height, size);
    });

    test("string em width and height settings are applied as inline styles", 2, function() {
        var size = "2em";

        createNotification({
            width: size,
            height: size,
            autoHideAfter: 0
        });

        notification.show("foo");

        var notificationElement = $(".k-notification")[0];

        equal(notificationElement.style.width, size);
        equal(notificationElement.style.height, size);
    });

    test("hide button is by default hidden", function() {
        createNotification();

        notification.show("foo");

        stop();

        setTimeout(function(){
            start();
            var notificationPopup = $(".k-notification");
            var closeIcon = notificationPopup.find(".k-i-close");
            ok(!closeIcon.is(":visible"));
        }, 400);
    });

    test("hide button is displayed if button property is set to true", function() {
        createNotification({
            button: true
        });

        notification.show("foo");

        ok($(".k-notification").find(".k-i-close").is(":visible"));
    });

    test("clicking on static notification hides it when button is pressed", function() {
        createNotification({
            appendTo: QUnit.fixture,
            autoHideAfter: 0,
            hideOnClick: false,
            button: true
        });

        notification.show("foo");

        $(".k-notification").find(".k-i-close").click();

        equal($(".k-notification").length, 0);
    });

    test("clicking on popup notification hides it when button is pressed", function() {
        createNotification({
            autoHideAfter: 0,
            hideOnClick: false,
            button: true
        });

        notification.show("foo");

        $(".k-notification").find(".k-i-close").click();

        equal($(".k-notification").length, 0);
    });

    test("popup notifications have fixed position style by default", function() {
        createNotification();

        notification.show("foo");

        equal($(".k-notification").closest(".k-animation-container").css("position"), "fixed");
    });

    test("unpinned popup notifications have an absolute position style", function() {
        createNotification({
            position: {
                pinned: false
            }
        });

        notification.show("foo");

        equal($(".k-notification").closest(".k-animation-container").css("position"), "absolute");
    });

    test("pinned popup notification is shown at specified int position", 2, function() {
        createNotification({
            position: {
                top: 1,
                left: 2
            }
        });

        notification.show("foo");

        var popupContainer = $(".k-notification").parent();

        equal(popupContainer.css("top"), "1px");
        equal(popupContainer.css("left"), "2px");
    });

//    test("pinned popup notification is shown at specified string position", 2, function() {
//        createNotification({
//            position: {
//                top: "1px",
//                left: "2px"
//            }
//        });

//        notification.show("foo");

//        var popupContainer = $(".k-notification").parent();

//        equal(popupContainer.css("top"), "1px");
//        equal(popupContainer.css("left"), "2px");
//    });

    test("pinned popup notification is shown at zero position", 2, function() {
        createNotification({
            position: {
                top: 0,
                left: 0
            }
        });

        notification.show("foo");

        var popupContainer = $(".k-notification").parent();

        equal(popupContainer.css("top"), "0px");
        equal(popupContainer.css("left"), "0px");
    });

    test("unpinned popup notification is shown at specified int position", 2, function() {
        createNotification({
            position: {
                top: 1,
                left: 2,
                pinned: false
            }
        });

        notification.show("foo");

        var popupContainer = $(".k-notification").parent();

        equal(popupContainer.css("top"), "1px");
        equal(popupContainer.css("left"), "2px");
    });

//    test("unpinned popup notification is shown at specified string position", 2, function() {
//        createNotification({
//            position: {
//                top: "1px",
//                left: "2px",
//                pinned: false
//            }
//        });

//        notification.show("foo");

//        var popupContainer = $(".k-notification").parent();

//        equal(popupContainer.css("top"), "1px");
//        equal(popupContainer.css("left"), "2px");
//    });

    test("unpinned popup notification is shown at zero position", 2, function() {
        createNotification({
            position: {
                top: 0,
                left: 0,
                pinned: false
            }
        });

        notification.show("foo");

        var popupContainer = $(".k-notification").parent();

        equal(popupContainer.css("top"), "0px");
        equal(popupContainer.css("left"), "0px");
    });

    test("pinned popup notification ignores page scroll offset", 2, function() {
        QUnit.fixture.css({width: 4000, height: 4000});
        var scrollPosition = 1000;

        $(QUnit.fixture[0].ownerDocument).scrollTop(scrollPosition).scrollLeft(scrollPosition);

        createNotification({
            position: {
                top: 1,
                left: 2
            }
        });

        notification.show("foo");

        var popupContainer = $(".k-notification").parent();

        equal(popupContainer.css("top"), "1px");
        equal(popupContainer.css("left"), "2px");
    });

    test("unpinned popup notification obeys page scroll offset", 2, function() {
        QUnit.fixture.css({width: 4000, height: 4000});
        var scrollPosition = 1000;

        $(QUnit.fixture[0].ownerDocument).scrollTop(scrollPosition).scrollLeft(scrollPosition);

        createNotification({
            position: {
                top: 1,
                left: 2,
                pinned: false
            }
        });

        notification.show("foo");

        var popupContainer = $(".k-notification").parent();

        equal(popupContainer.css("top"), "1001px");
        equal(popupContainer.css("left"), "1002px");
    });

    test("down static stacking is applied by default", 2, function() {
        createNotification({
            appendTo: QUnit.fixture,
            autoHideAfter: 0
        });

        notification.show('<span id="foo">foo</span>');
        notification.show('<span id="bar">bar</span>');

        equal(QUnit.fixture.children(".k-notification").first().find("#foo").length, 1);
        equal(QUnit.fixture.children(".k-notification").last().find("#bar").length, 1);
    });

    test("right static stacking behaves as down stacking", 2, function() {
        createNotification({
            appendTo: QUnit.fixture,
            autoHideAfter: 0,
            stacking: "right"
        });

        notification.show('<span id="foo">foo</span>');
        notification.show('<span id="bar">bar</span>');

        equal(QUnit.fixture.children(".k-notification").first().find("#foo").length, 1);
        equal(QUnit.fixture.children(".k-notification").last().find("#bar").length, 1);
    });

    test("up static stacking is applied", 2, function() {
        createNotification({
            appendTo: QUnit.fixture,
            autoHideAfter: 0,
            stacking: "up"
        });

        notification.show('<span id="foo">foo</span>');
        notification.show('<span id="bar">bar</span>');

        equal(QUnit.fixture.children(".k-notification").last().find("#foo").length, 1);
        equal(QUnit.fixture.children(".k-notification").first().find("#bar").length, 1);
    });

    test("left static stacking behaves as up stacking", 2, function() {
        createNotification({
            appendTo: QUnit.fixture,
            autoHideAfter: 0,
            stacking: "left"
        });

        notification.show('<span id="foo">foo</span>');
        notification.show('<span id="bar">bar</span>');

        equal(QUnit.fixture.children(".k-notification").last().find("#foo").length, 1);
        equal(QUnit.fixture.children(".k-notification").first().find("#bar").length, 1);
    });

    test("up popup stacking is applied by default", 2, function() {
        createNotification({
            autoHideAfter: 0
        });

        notification.show('<span id="foo">foo</span>');
        var fooNotificationWrapper = $("#foo").closest(".k-notification").parent();

        notification.show('<span id="bar">bar bar</span>');
        var barNotificationWrapper = $("#bar").closest(".k-notification").parent();

        ok(parseInt(fooNotificationWrapper.css("top"), 10) > parseInt(barNotificationWrapper.css("top"), 10));
        equal(fooNotificationWrapper.css("right"), barNotificationWrapper.css("right"));
    });

    test("down popup stacking is applied", 2, function() {
        createNotification({
            autoHideAfter: 0,
            stacking: "down"
        });

        notification.show('<span id="foo">foo</span>');
        var fooNotificationWrapper = $("#foo").closest(".k-notification").parent();

        notification.show('<span id="bar">bar bar</span>');
        var barNotificationWrapper = $("#bar").closest(".k-notification").parent();

        ok(parseInt(fooNotificationWrapper.css("top"), 10) < parseInt(barNotificationWrapper.css("top"), 10));
        equal(fooNotificationWrapper.css("right"), barNotificationWrapper.css("right"));
    });

    test("down popup stacking is applied by default if position.top is set", 2, function() {
        createNotification({
            autoHideAfter: 0,
            position: {
                top: 1
            }
        });

        notification.show('<span id="foo">foo</span>');
        var fooNotificationWrapper = $("#foo").closest(".k-notification").parent();

        notification.show('<span id="bar">bar bar</span>');
        var barNotificationWrapper = $("#bar").closest(".k-notification").parent();

        ok(parseInt(fooNotificationWrapper.css("top"), 10) < parseInt(barNotificationWrapper.css("top"), 10));
        equal(fooNotificationWrapper.css("right"), barNotificationWrapper.css("right"));
    });

    test("right popup stacking is applied", 2, function() {
        createNotification({
            autoHideAfter: 0,
            stacking: "right"
        });

        notification.show('<span id="foo">foo</span>');
        var fooNotificationWrapper = $("#foo").closest(".k-notification").parent();

        notification.show('<span id="bar">bar</span>');
        var barNotificationWrapper = $("#bar").closest(".k-notification").parent();

        ok(fooNotificationWrapper.offset().left < barNotificationWrapper.offset().left);
        equal(fooNotificationWrapper.offset().top, barNotificationWrapper.offset().top);
    });

    test("left popup stacking is applied", 2, function() {
        createNotification({
            autoHideAfter: 0,
            stacking: "left"
        });

        notification.show('<span id="foo">foo</span>');
        var fooNotificationWrapper = $("#foo").closest(".k-notification").parent();

        notification.show('<span id="bar">bar</span>');
        var barNotificationWrapper = $("#bar").closest(".k-notification").parent();

        ok(parseInt(fooNotificationWrapper.css("left"), 10) > parseInt(barNotificationWrapper.css("left"), 10));
        equal(fooNotificationWrapper.css("top"), barNotificationWrapper.css("top"));
    });

    test("left popup alignment is applied if left position is set", 1, function () {
        createNotification({
            autoHideAfter: 0,
            position: {
                left: 1
            }
        });

        notification.show('<span id="foo">foo</span>');
        var fooNotificationWrapper = $("#foo").closest(".k-notification").parent();

        notification.show('<span id="bar">bar bar</span>');
        var barNotificationWrapper = $("#bar").closest(".k-notification").parent();

        equal(fooNotificationWrapper.css("left"), barNotificationWrapper.css("left"));
    });

    test("clicking on popup notification before allowHideAfter does not hide it", 2, function () {
        var allowHideAfter = 300;

        createNotification({
            autoHideAfter: 0,
            allowHideAfter: allowHideAfter
        });

        notification.show("foo");

        $(".k-notification").click();

        equal($(".k-notification").length, 1);

        stop();

        setTimeout(function(){
            start();

            $(".k-notification").click();
            equal($(".k-notification").length, 0);

        }, allowHideAfter + 100);
    });

    test("clicking on popup notification button before allowHideAfter does not hide it", 2, function() {
        var allowHideAfter = 300;

        createNotification({
            autoHideAfter: 0,
            hideOnClick: false,
            button: true,
            allowHideAfter: allowHideAfter
        });

        notification.show("foo");

        $(".k-notification").find(".k-i-close").click();

        equal($(".k-notification").length, 1);

        stop();

        setTimeout(function(){
            start();

            $(".k-notification").find(".k-i-close").click();
            equal($(".k-notification").length, 0);

        }, allowHideAfter + 100);
    });

    test("originating element is hidden if appendTo is not set", function() {
        createNotification();

        equal(notification.element[0].style.display, "none");
    });

    test("originating element is hidden if appendTo is set to another element", function() {
        createNotification({
            appendTo: QUnit.fixture
        });

        equal(notification.element[0].style.display, "none");
    });

    test("originating element is not hidden if appendTo is set to Notification widget element", function() {
        createNotification({
            appendTo: "#notification"
        });

        notEqual(notification.element[0].style.display, "none");
    });

    test("popup notifications have a k-rtl class in RTL mode", function() {
        QUnit.fixture.addClass("k-rtl");
        createNotification();

        notification.show("foo");

        QUnit.fixture.removeClass("k-rtl");

        ok($(".k-notification").hasClass("k-rtl"));
    });

})();
