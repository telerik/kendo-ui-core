(function() {
    describe("Notification WAI-ARIA", function() {
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

        it("Notification has appropriate role", function() {
            createNotification();
            notification.show("foo");

            var element = $(".k-notification");

            assert.equal(element.attr("role"), "alert");
        });

        it("Notification has appropriate aria-live", function() {
            createNotification();
            notification.show("foo");

            var element = $(".k-notification");

            assert.equal(element.attr("aria-live"), "polite");
        });

        it("Notification has appropriate aria-label", function() {
            createNotification();
            notification.show("foo", "error");

            var element = $(".k-notification");

            assert.equal(element.attr("aria-label"), "error");
        });

        it("Notification has appropriate aria-describedby", function() {
            createNotification();
            notification.show("foo", "error");

            var element = $(".k-notification");

            assert.equal(element.attr("aria-describedby"), element.find(".k-notification-content").attr("id"));
        });

        it("Notification close button has aria-hidden set", function() {
            createNotification({
                button: true
            });
            notification.show("foo");

            var element = $(".k-notification .k-close-icon");

            assert.equal(element.attr("aria-hidden"), "true");
        });

        it("Notification does not violate AXE", function(done) {
            createNotification({
                button: true
            });
            notification.show("foo");

            axeRun($(".k-notification").parent(), done);
        });
    });
}());