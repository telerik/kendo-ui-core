export function tzTest(tzAlias, testName, expected, callback) {
    let TZ_NAMES = {
        "Brazil": ["BRST", "BRT", "South America Daylight Time", "South America Standard Time"],
        "Sofia": ["EET", "EEST", "Eastern European Time", "Eastern European Summer Time", "Eastern European Standard Time", "FLE"],
        "Moscow": ["MSK", "RTZ2", "Russia TZ 2 Standard Time"],
        "Pacific": ["PDT", "PST"]
    };

    function tzMatch(alias) {
        let names = TZ_NAMES[alias];

        let d = new Date().toString();
        for (let i = 0; i < names.length; i++) {
            if (d.indexOf(names[i]) !== -1) {
                return true;
            }
        }

        return false;
    }

    if (arguments.length === 3) {
        callback = expected;
        expected = null;
    }

    if (!TZ_NAMES[tzAlias]) {
        it(testName, function() {
            assert.isOk(false, testName + "\n" + "Unknown timezone alias: " + tzAlias + "\n" +
                "Valid values are: " + Object.keys(TZ_NAMES).join(", "));
        });
    } else if (tzMatch(tzAlias)) {
        testName = testName + " (Timezone: " + tzAlias + ")";
        it(testName, callback);
    }
}