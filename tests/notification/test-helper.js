var notification;

/* exported createNotification */
function createNotification(options) {
    notification = $("<span id='notification'></span>").appendTo(QUnit.fixture).kendoNotification(options).data("kendoNotification");
}

/* exported roughlyEqual */
function roughlyEqual(actual, expected, precision) {
    var valueAndUnitRegex = /(\d+\.?\d*)(.*)/i;
    var actualParsed = valueAndUnitRegex.exec(actual);
    var expectedParsed = valueAndUnitRegex.exec(expected);
    var actualValue = actualParsed[1];
    var expectedValue = expectedParsed[1];
    var unitForActual = actualParsed[2];
    var unitForExpected = expectedParsed[2];

    var assertResult = (unitForActual === unitForExpected) && (Math.abs(actualValue - expectedValue) <= precision);
    var failMessage = (assertResult ? "" : "Expectedl: " + expected + ", Actual: " + actual);

    equal(assertResult, true, failMessage);
}