var notification;

/* exported createNotification */
function createNotification(options) {
    notification = $("<span id='notification'></span>").appendTo(QUnit.fixture).kendoNotification(options).data("kendoNotification");
}

/* exported roughlyEqual */
function roughlyEqual(actual, expected, precision) {
    var assertResult = false;

    if (isNaN(parseFloat(actual)) || isNaN(parseFloat(expected))) {
        assertResult = actual === expected;
    }
    else {
        assertResult = (Math.abs(parseFloat(actual) - parseFloat(expected)) <= precision);
    }

    equal(assertResult, true, "Expected: " + expected + ", Actual: " + actual);
}