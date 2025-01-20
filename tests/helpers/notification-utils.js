import '@progress/kendo-ui/src/kendo.notification.js';

export function createNotification(options) {
    return $("<span id='notification'></span>").appendTo(Mocha.fixture).kendoNotification(options).data("kendoNotification");
}