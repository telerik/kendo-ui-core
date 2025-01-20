import { createNotification } from '../../helpers/notification-utils.js';

let notification;

describe("initialization no CSP", function() {
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

    it("initialization compiles custom template function when template ID is defined", function() {

        $("<script id='tid' type='text/x-kendo-template'>bar</script>").appendTo(Mocha.fixture);

        notification = createNotification({
            templates: [{
                type: "foo",
                templateId: "tid"
            }]
        });

        let fooFunc = notification._getCompiled("foo");

        assert.equal(typeof fooFunc, "function");
        assert.equal(fooFunc({}), "bar");
    });
});
