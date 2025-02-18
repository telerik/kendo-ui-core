import { createNotification } from '../../helpers/unit/notification-utils.js';

let notification;

describe("Notification WAI-ARIA", function() {
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

    it("Notification has appropriate role", function() {
        notification = createNotification();
        notification.show("foo");

        let element = $(".k-notification");

        assert.equal(element.attr("role"), "alert");
    });

    it("Notification has appropriate aria-live", function() {
        notification = createNotification();
        notification.show("foo");

        let element = $(".k-notification");

        assert.equal(element.attr("aria-live"), "polite");
    });

    it("Notification has appropriate aria-label", function() {
        notification = createNotification();
        notification.show("foo", "error");

        let element = $(".k-notification");

        assert.equal(element.attr("aria-label"), "error");
    });

    it("Notification has appropriate aria-describedby", function() {
        notification = createNotification();
        notification.show("foo", "error");

        let element = $(".k-notification");

        assert.equal(element.attr("aria-describedby"), element.find(".k-notification-content").attr("id"));
    });

    it("Notification close button has aria-hidden set", function() {
        notification = createNotification({
            button: true
        });
        notification.show("foo");

        let element = $(".k-notification-actions .k-icon");

        assert.equal(element.attr("aria-hidden"), "true");
    });

    it("Notification does not violate AXE", async function() {
        notification = createNotification({
            button: true
        });
        notification.show("foo");

        await axeRun($(".k-notification").parent());
    });
});