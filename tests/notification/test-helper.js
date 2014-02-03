var notification;

function createNotification(options) {
    notification = $("<span id='notification'></span>").appendTo(QUnit.fixture).kendoNotification(options).data("kendoNotification");
}
