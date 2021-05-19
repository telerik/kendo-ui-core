(function() {
    describe("initialization", function() {
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

        it("initialization creates an internal GUID", function() {
            createNotification();

            var guid = notification._guid;

            assert.equal(typeof guid, "string");
            assert.equal(guid.length, 37);
            assert.equal(guid.substr(0, 1), "_");
        });

        it("initialization compiles popup stacking settings", function() {
            createNotification();

            var origin = notification._popupOrigin,
                position = notification._popupPosition,
                regex = /^[a-z]+ [a-z]+$/;

            assert.equal(typeof origin, "string");
            assert.equal(typeof position, "string");
            assert.equal(regex.exec(origin), origin);
            assert.equal(regex.exec(position), position);
        });

        it("initialization compiles popup padding settings", function() {
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

            assert.equal(typeof paddings, "object");
            assert.equal(size, 3);
            assert.isOk(allZero);
            assert.isOk(!paddings.hasOwnProperty("paddingTop"));
        });

        it("up stacking removes top popup padding", function() {
            createNotification({
                stacking: "up"
            });

            var paddings = notification._popupPaddings;

            assert.isOk(!paddings.hasOwnProperty("paddingTop"));
        });

        it("down stacking removes bottom popup padding", function() {
            createNotification({
                stacking: "down"
            });

            var paddings = notification._popupPaddings;

            assert.isOk(!paddings.hasOwnProperty("paddingBottom"));
        });

        it("right stacking removes right popup padding", function() {
            createNotification({
                stacking: "right"
            });

            var paddings = notification._popupPaddings;

            assert.isOk(!paddings.hasOwnProperty("paddingRight"));
        });

        it("left stacking removes right popup padding", function() {
            createNotification({
                stacking: "left"
            });

            var paddings = notification._popupPaddings;

            assert.isOk(!paddings.hasOwnProperty("paddingLeft"));
        });

        it("initialization compiles default template function", function() {
            createNotification();

            var defaultFunc = notification._getCompiled();
            var params = { typeIcon: "info", content: "foo", closeButton: false };
            var defaultOutput = '<div class="k-notification-wrap"><span class="k-icon k-i-info" title="info"></span><div class="k-notification-content">foo</div><span class="k-hidden k-icon k-i-close" title="Hide"></span></div>';

            assert.equal(typeof defaultFunc, "function");
            assert.equal(defaultFunc(params), defaultOutput);
        });

        it("initialization compiles custom template function when string template is defined", function() {
            createNotification({
                templates: [{
                    type: "foo",
                    template: "bar"
                }]
            });

            var fooFunc = notification._getCompiled("foo");

            assert.equal(typeof fooFunc, "function");
            assert.equal(fooFunc({}), "bar");
        });

        it("initialization compiles custom template function when template ID is defined", function() {

            $("<script id='tid' type='text/x-kendo-template'>bar</script>").appendTo(Mocha.fixture);

            createNotification({
                templates: [{
                    type: "foo",
                    templateId: "tid"
                }]
            });

            var fooFunc = notification._getCompiled("foo");

            assert.equal(typeof fooFunc, "function");
            assert.equal(fooFunc({}), "bar");
        });

        it("opened popup notifications are hidden after set autoHideAfter", function(done) {
            var autoHideAfter = 10;

            createNotification({
                autoHideAfter: autoHideAfter
            });

            notification.show("foo");

            setTimeout(function() {
                assert.equal($(".k-notification").length, 0);
                done();
            }, autoHideAfter + 10);

        });

        it("opened static notifications are hidden after set autoHideAfter", function(done) {
            var autoHideAfter = 10;

            createNotification({
                appendTo: Mocha.fixture,
                autoHideAfter: autoHideAfter
            });

            notification.show("foo");

            setTimeout(function() {
                assert.equal($(".k-notification").length, 0);
                done();
            }, autoHideAfter + 10);

        });

        it("clicking on popup notification hides it when hideOnClick is true (default)", function() {
            createNotification({
                autoHideAfter: 0
            });

            notification.show("foo");

            $(".k-notification").click();

            assert.equal($(".k-notification").length, 0);
        });

        it("clicking on static notification hides it when hideOnClick is true (default)", function() {
            createNotification({
                appendTo: Mocha.fixture,
                autoHideAfter: 0
            });

            notification.show("foo");

            $(".k-notification").click();

            assert.equal($(".k-notification").length, 0);
        });

        it("clicking on notification popup does not hide it when hideOnClick is false", function() {
            createNotification({
                autoHideAfter: 0,
                hideOnClick: false
            });

            notification.show("foo");

            $(".k-notification").click();

            assert.equal($(".k-notification").length, 1);
        });

        it("clicking on static notification does not hide it when hideOnClick is false", function() {
            createNotification({
                appendTo: Mocha.fixture,
                autoHideAfter: 0,
                hideOnClick: false
            });

            notification.show("foo");

            $(".k-notification").click();

            assert.equal($(".k-notification").length, 1);
        });

        it("notification width and height are null by default", function() {
            createNotification({
                autoHideAfter: 0
            });

            notification.show("foo");

            var notificationElement = $(".k-notification")[0];

            assert.equal(notificationElement.style.width, "");
            assert.equal(notificationElement.style.height, "");
        });

        it("int width and height settings are applied as inline styles", function() {
            var size = 2;

            createNotification({
                width: size,
                height: size,
                autoHideAfter: 0
            });

            notification.show("foo");

            var notificationElement = $(".k-notification")[0];

            assert.equal(notificationElement.style.width, size + "px");
            assert.equal(notificationElement.style.height, size + "px");
        });

        it("string pixel width and height settings are applied as inline styles", function() {
            var size = "2px";

            createNotification({
                width: size,
                height: size,
                autoHideAfter: 0
            });

            notification.show("foo");

            var notificationElement = $(".k-notification")[0];

            assert.equal(notificationElement.style.width, size);
            assert.equal(notificationElement.style.height, size);
        });

        it("string em width and height settings are applied as inline styles", function() {
            var size = "2em";

            createNotification({
                width: size,
                height: size,
                autoHideAfter: 0
            });

            notification.show("foo");

            var notificationElement = $(".k-notification")[0];

            assert.equal(notificationElement.style.width, size);
            assert.equal(notificationElement.style.height, size);
        });

        it("hide button is by default hidden", function(done) {
            createNotification();

            notification.show("foo");


            setTimeout(function() {
                var notificationPopup = $(".k-notification");
                var closeIcon = notificationPopup.find(".k-i-close");
                assert.isOk(!closeIcon.is(":visible"));
                assert.isOk(closeIcon.hasClass("k-hidden"));
                done();
            }, 400);
        });

        it("hide button is displayed if button property is set to true", function() {
            createNotification({
                button: true
            });

            notification.show("foo");

            assert.isOk($(".k-notification").find(".k-i-close").is(":visible"));
        });

        it("clicking on static notification hides it when button is pressed", function() {
            createNotification({
                appendTo: Mocha.fixture,
                autoHideAfter: 0,
                hideOnClick: false,
                button: true
            });

            notification.show("foo");

            $(".k-notification").find(".k-i-close").click();

            assert.equal($(".k-notification").length, 0);
        });

        it("clicking on popup notification hides it when button is pressed", function() {
            createNotification({
                autoHideAfter: 0,
                hideOnClick: false,
                button: true
            });

            notification.show("foo");

            $(".k-notification").find(".k-i-close").click();

            assert.equal($(".k-notification").length, 0);
        });

        it("popup notifications have fixed position style by default", function() {
            createNotification();

            notification.show("foo");

            assert.equal($(".k-notification").closest(".k-animation-container").css("position"), "fixed");
        });

        it("unpinned popup notifications have an absolute position style", function() {
            createNotification({
                position: {
                    pinned: false
                }
            });

            notification.show("foo");

            assert.equal($(".k-notification").closest(".k-animation-container").css("position"), "absolute");
        });

        it("pinned popup notification is shown at specified int position", function() {
            createNotification({
                position: {
                    top: 1,
                    left: 2
                }
            });

            notification.show("foo");

            var popupContainer = $(".k-notification").parent();

            assert.equal(popupContainer.css("top"), "1px");
            assert.equal(popupContainer.css("left"), "2px");
        });

        //    it("pinned popup notification is shown at specified string position", function() {
        //        createNotification({
        //            position: {
        //                top: "1px",
        //                left: "2px"
        //            }
        //        });

        //        notification.show("foo");

        //        var popupContainer = $(".k-notification").parent();

        //        assert.equal(popupContainer.css("top"), "1px");
        //        assert.equal(popupContainer.css("left"), "2px");
        //    });

        it("pinned popup notification is shown at zero position", function() {
            createNotification({
                position: {
                    top: 0,
                    left: 0
                }
            });

            notification.show("foo");

            var popupContainer = $(".k-notification").parent();

            assert.equal(popupContainer.css("top"), "0px");
            assert.equal(popupContainer.css("left"), "0px");
        });

        it("unpinned popup notification is shown at specified int position", function() {
            createNotification({
                position: {
                    top: 1,
                    left: 2,
                    pinned: false
                }
            });

            notification.show("foo");

            var popupContainer = $(".k-notification").parent();

            assert.equal(popupContainer.css("top"), "1px");
            assert.equal(popupContainer.css("left"), "2px");
        });

        //    it("unpinned popup notification is shown at specified string position", function() {
        //        createNotification({
        //            position: {
        //                top: "1px",
        //                left: "2px",
        //                pinned: false
        //            }
        //        });

        //        notification.show("foo");

        //        var popupContainer = $(".k-notification").parent();

        //        assert.equal(popupContainer.css("top"), "1px");
        //        assert.equal(popupContainer.css("left"), "2px");
        //    });

        it("unpinned popup notification is shown at zero position", function() {
            createNotification({
                position: {
                    top: 0,
                    left: 0,
                    pinned: false
                }
            });

            notification.show("foo");

            var popupContainer = $(".k-notification").parent();

            assert.equal(popupContainer.css("top"), "0px");
            assert.equal(popupContainer.css("left"), "0px");
        });

        it("pinned popup notification ignores page scroll offset", function() {
            Mocha.fixture.css({ width: 4000, height: 4000 });
            var scrollPosition = 1000;

            $(Mocha.fixture[0].ownerDocument).scrollTop(scrollPosition).scrollLeft(scrollPosition);

            createNotification({
                position: {
                    top: 1,
                    left: 2
                }
            });

            notification.show("foo");

            var popupContainer = $(".k-notification").parent();

            assert.equal(popupContainer.css("top"), "1px");
            assert.equal(popupContainer.css("left"), "2px");
        });

        it("unpinned popup notification obeys page scroll offset", function() {
            Mocha.fixture.css({ width: 4000, height: 4000 });
            var scrollPosition = 1000;

            $(Mocha.fixture[0].ownerDocument).scrollTop(scrollPosition).scrollLeft(scrollPosition);

            createNotification({
                position: {
                    top: 1,
                    left: 2,
                    pinned: false
                }
            });

            notification.show("foo");

            var popupContainer = $(".k-notification").parent();

            assert.equal(popupContainer.css("top"), "1001px");
            assert.equal(popupContainer.css("left"), "1002px");
        });

        it("down static stacking is applied by default", function() {
            createNotification({
                appendTo: Mocha.fixture,
                autoHideAfter: 0
            });

            notification.show('<span id="foo">foo</span>');
            notification.show('<span id="bar">bar</span>');

            assert.equal(Mocha.fixture.children(".k-notification").first().find("#foo").length, 1);
            assert.equal(Mocha.fixture.children(".k-notification").last().find("#bar").length, 1);
        });

        it("right static stacking behaves as down stacking", function() {
            createNotification({
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
            createNotification({
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
            createNotification({
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
            createNotification({
                autoHideAfter: 0
            });

            notification.show('<span id="foo">foo</span>');
            var fooNotificationWrapper = $("#foo").closest(".k-notification").parent();

            notification.show('<span id="bar">bar bar</span>');
            var barNotificationWrapper = $("#bar").closest(".k-notification").parent();

            assert.isOk(parseInt(fooNotificationWrapper.css("top"), 10) > parseInt(barNotificationWrapper.css("top"), 10));
            roughlyEqual(fooNotificationWrapper.css("right"), barNotificationWrapper.css("right"), 0.15);
        });

        it("down popup stacking is applied", function() {
            createNotification({
                autoHideAfter: 0,
                stacking: "down"
            });

            notification.show('<span id="foo">foo</span>');
            var fooNotificationWrapper = $("#foo").closest(".k-notification").parent();

            notification.show('<span id="bar">bar bar</span>');
            var barNotificationWrapper = $("#bar").closest(".k-notification").parent();

            assert.isOk(parseInt(fooNotificationWrapper.css("top"), 10) < parseInt(barNotificationWrapper.css("top"), 10));
            roughlyEqual(fooNotificationWrapper.css("right"), barNotificationWrapper.css("right"), 0.15);
        });

        it("down popup stacking is applied by default if position.top is set", function() {
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

            assert.isOk(parseInt(fooNotificationWrapper.css("top"), 10) < parseInt(barNotificationWrapper.css("top"), 10));
            roughlyEqual(fooNotificationWrapper.css("right"), barNotificationWrapper.css("right"), 0.82);
        });

        it("right popup stacking is applied", function() {
            createNotification({
                autoHideAfter: 0,
                stacking: "right"
            });

            notification.show('<span id="foo">foo</span>');
            var fooNotificationWrapper = $("#foo").closest(".k-notification").parent();

            notification.show('<span id="bar">bar</span>');
            var barNotificationWrapper = $("#bar").closest(".k-notification").parent();

            assert.isOk(fooNotificationWrapper.offset().left < barNotificationWrapper.offset().left);
            roughlyEqual(fooNotificationWrapper.offset().top, barNotificationWrapper.offset().top, 0.82);
        });

        it("left popup stacking is applied", function() {
            createNotification({
                autoHideAfter: 0,
                stacking: "left"
            });

            notification.show('<span id="foo">foo</span>');
            var fooNotificationWrapper = $("#foo").closest(".k-notification").parent();

            notification.show('<span id="bar">bar</span>');
            var barNotificationWrapper = $("#bar").closest(".k-notification").parent();

            assert.isOk(parseInt(fooNotificationWrapper.css("left"), 10) > parseInt(barNotificationWrapper.css("left"), 10));
            roughlyEqual(fooNotificationWrapper.css("top"), barNotificationWrapper.css("top"), 0.82);
        });

        it("left popup alignment is applied if left position is set", function() {
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

            roughlyEqual(fooNotificationWrapper.css("left"), barNotificationWrapper.css("left"), 0.15);
        });

        it("clicking on popup notification before allowHideAfter does not hide it", function(done) {
            var allowHideAfter = 300;

            createNotification({
                autoHideAfter: 0,
                allowHideAfter: allowHideAfter
            });

            notification.show("foo");

            $(".k-notification").click();

            assert.equal($(".k-notification").length, 1);

            setTimeout(function() {

                $(".k-notification").click();
                assert.equal($(".k-notification").length, 0);

                done();
            }, allowHideAfter + 100);
        });

        it("clicking on popup notification button before allowHideAfter does not hide it", function(done) {
            var allowHideAfter = 300;

            createNotification({
                autoHideAfter: 0,
                hideOnClick: false,
                button: true,
                allowHideAfter: allowHideAfter
            });

            notification.show("foo");

            $(".k-notification").find(".k-i-close").click();

            assert.equal($(".k-notification").length, 1);

            setTimeout(function() {

                $(".k-notification").find(".k-i-close").click();
                assert.equal($(".k-notification").length, 0);

                done();
            }, allowHideAfter + 100);
        });

        it("originating element is hidden if appendTo is not set", function() {
            createNotification();

            assert.equal(notification.element[0].style.display, "none");
        });

        it("originating element is hidden if appendTo is set to another element", function() {
            createNotification({
                appendTo: Mocha.fixture
            });

            assert.equal(notification.element[0].style.display, "none");
        });

        it("originating element is not hidden if appendTo is set to Notification widget element", function() {
            createNotification({
                appendTo: "#notification"
            });

            assert.notEqual(notification.element[0].style.display, "none");
        });

        it("popup notifications have a k-rtl class in RTL mode", function() {
            Mocha.fixture.addClass("k-rtl");
            createNotification();

            notification.show("foo");

            Mocha.fixture.removeClass("k-rtl");

            assert.isOk($(".k-notification").hasClass("k-rtl"));
        });

    });
}());
