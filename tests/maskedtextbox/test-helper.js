function assertGroupEqual(actualGroup, expectedGroup) {
    if (actualGroup || expectedGroup) {
        equal(actualGroup.maskIndex, expectedGroup.maskIndex);
        equal(actualGroup.text, expectedGroup.text);
        equal(actualGroup.rule, expectedGroup.rule);
    }
}

/* exported assertTokenEqual */
function assertTokenEqual(actualToken, expectedToken) {
    equal(actualToken.maskIndex, expectedToken.maskIndex);
    equal(actualToken.text, expectedToken.text);
    equal(actualToken.rule, expectedToken.rule);

    assertGroupEqual(actualToken.group, expectedToken.group);
}

/* exported assertTokensEqual */
function assertTokensEqual(actualTokens, expectedTokens) {
    equal(actualTokens.length, expectedTokens.length);

    for (var i = 0; i < actualTokens.length; i++) {
        assertTokenEqual(actualTokens[i], expectedTokens[i]);
    }
}

function pressKey(key, eventName, options) {
    if (typeof key === "string") {
        key = key.charCodeAt(0);
    }

    if ($.isPlainObject(eventName)) {
        options = eventName;
        eventName = "keypress";
    }

    if (!eventName) {
        eventName = "keypress";
    }

    this.focus();
    return this.trigger($.extend({ type: eventName, keyCode: key, which: key }, options) );
}

/* exported setupPressKey */
function setupPressKey() {
    $.extend($.fn, {
        pressKey: pressKey
    });
}

/* exported createInput */
function createInput() {
    return $("<input />").appendTo(QUnit.fixture);
}
