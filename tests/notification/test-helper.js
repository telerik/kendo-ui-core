var notification;

/* exported createNotification */
function createNotification(options) {
    notification = $("<span id='notification'></span>").appendTo(QUnit.fixture).kendoNotification(options).data("kendoNotification");
}

/* exported roughlyEqual */
function roughlyEqual(actual, expected, precision) {
    var assertResult = (Math.abs(parseFloat(actual) - parseFloat(expected)) <= precision);
    var failMessage = (assertResult ? "" : "Expectedl: " + expected + ", Actual: " + actual);

    equal(assertResult, true, failMessage);
}