import { createNotification } from '../../helpers/notification-utils.js';

let notification;

describe("events", function() {
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

    it("show method triggers show event with popup element as argument", function() {
        let triggered = false;
        let args = {};

        notification = createNotification({
            show: function(e) {
                triggered = true;
                args = e;
            }
        });

        notification.show("foo");

        assert.isOk(triggered);
        assert.isOk(args.element && args.element.length && args.element.length == 1);
    });

    it("show method triggers show event with static element as argument", function() {
        let triggered = false;
        let args = {};

        notification = createNotification({
            appendTo: Mocha.fixture,
            show: function(e) {
                triggered = true;
                args = e;
            }
        });

        notification.show("foo");

        assert.isOk(triggered);
        assert.isOk(args.element && args.element.length && args.element.length == 1);
    });

    it("notification hide triggers hide event with popup element as argument", function() {
        let triggered = false;
        let args = {};

        notification = createNotification({
            hide: function(e) {
                triggered = true;
                args = e;
            }
        });

        notification.show("foo");

        notification.hide();

        assert.isOk(triggered);
        assert.isOk(args.element && args.element.length && args.element.length == 1);
    });

    it("notification hide triggers hide event with static element as argument", function() {
        let triggered = false;
        let args = {};

        notification = createNotification({
            appendTo: Mocha.fixture,
            hide: function(e) {
                triggered = true;
                args = e;
            }
        });

        notification.show("foo");

        notification.hide();

        assert.isOk(triggered);
        assert.isOk(args.element && args.element.length && args.element.length == 1);
    });

});
