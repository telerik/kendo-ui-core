function callbackHash(object) {
    if (typeof object === "string") {
        var obj = {};
        obj[object] = $.noop;
        object = obj;
    }

    return object;
}

function stub(that, methods) {
    var stubs = {};

    methods = callbackHash(methods);

    $.each(methods, function(method, impl) {
        stubs[method] = { calls: 0, args: [] };

        that[method] = function() {
            stubs[method].calls ++;
            stubs[method].args.push(arguments);
            return impl.apply(that, arguments);
        }
    });

    that.calls = function(method) {
        return stubs[method].calls;
    }

    that.args = function(method, index) {
        method = stubs[method];

        index = index !== undefined ? index: method.args.length - 1;
        return method.args[index];
    }

    return that;
}

function spy(that, methods) {
    if (!arguments.length) {
        var callback = function() {
            if (!callback.calls) {
                callback.calls = 0;
                callback.args = [];
            }

            callback.calls++;
            callback.args.push(Array.prototype.splice.call(arguments));
        };

        return callback;
    }

    methods = callbackHash(methods);

    $.each(methods, function(method) {
        methods[method] = that[method];
    });

    return stub(that, methods);
}

function arrayClose(a, b, tolerance) {
    if (a.length != b.length) {
        ok(false, "Arrays differ in size " + "(expected " + b.length + ", got " + a.length + " elements)");
    } else if (a.length) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].length) {
                arrayClose(a[i], b[i], tolerance, "Values at index " + i);
            } else {
                QUnit.close(a[i], b[i], tolerance, "Values at index " + i);
            }
        }
    } else {
        ok(true);
    }
}

function isBrazilTimezone() {
    var d = new Date().toString();
    return d.indexOf("BRST") !== -1 ||
           d.indexOf("BRT") != -1 ||
           d.indexOf("South America Daylight Time") != -1 ||
           d.indexOf("South America Standard Time") != -1;
}

function brazilTimezoneTest(testName, expected, callback ) {
    if ( arguments.length === 2 ) {
        callback = expected;
        expected = null;
    }

    if (isBrazilTimezone()) {
        QUnit.test(testName, expected, callback);
    }
}

function triggerTouchEvent(element, type, info) {
    info.target = element;
    element.trigger($.Event(type, { originalEvent: { changedTouches: [ info ] }}));
}

function press(element, x, y, id) {
    triggerTouchEvent(element, "touchstart", {
        pageX: x,
        pageY: y,
        clientX: x,
        clientY: y,
        identifier: id || 1
    })
}

function move(element, x, y, id) {
    triggerTouchEvent(element, "touchmove", {
        pageX: x,
        pageY: y,
        clientX: x,
        clientY: y,
        identifier: id || 1
    })
}

function release(element, x, y, id) {
    triggerTouchEvent(element, "touchend", {
        pageX: x,
        pageY: y,
        clientX: x,
        clientY: y,
        identifier: id || 1
    })
}

function tap(element, x, y, id) {
    x = x || 0;
    y = y || 0;
    press(element, x, y, id);
    release(element, x, y, id);
}

function mousewheel(element, delta) {
    $(element).trigger($.Event("mousewheel", { originalEvent: { detail: delta * 3 } }));
}

(function() {
    var domContentsLength;

    function getDomContentsLength() {
        return $(document.body).children(":not(script,#editor-fixture)").length;
    }

    $(function() {
        QUnit.fixture = $("<div id='qunit-fixture' style='height: 100px'></div>").appendTo(document.body);
        QUnit.config.fixture = "";
        domContentsLength = getDomContentsLength();
    });

    QUnit.testDone(function() {
        QUnit.fixture.empty().attr("class", "").attr("style", "").css("height", "100px");
    });

    var browser = kendo.support.browser;
    if (browser.msie && browser.version < 9) {
        return;
    }

    var Widget = kendo.ui.Widget;
    var init = Widget.fn.init;
    var destroy = Widget.fn.destroy;
    var widgets = [];

    Widget.fn.init = function() {
        widgets.push(this);
        init.apply(this, arguments);
    }

    Widget.fn.destroy = function() {
        widgets.splice(widgets.indexOf(this), 1);
        destroy.apply(this, arguments);
    }

    QUnit.testDone(function( details ) {
        if (!QUnit.suppressCleanupCheck) {
            var length = getDomContentsLength();

            if (length > domContentsLength) {
                console.warn(details.module, details.name, 'test did not clean DOM contents properly');
            }

            if (widgets.length) {
                console.error.apply(console, [ details.module, details.name, 'active widgets left'].concat(widgets.map(function(widget) {
                    var name = widget.options.name;

                    if (widget.element[0].className) {
                        name = name + "(" + widget.element[0].className + ")";
                    }

                    return name;
                })));

                widgets = [];
            }

            domContentsLength = length;
        }
    });
})();


QUnit.extend( QUnit, {
    close: function(actual, expected, maxDifference, message) {
        var passes = (actual === expected) || Math.abs(actual - expected) <= maxDifference;
        QUnit.push(passes, actual, expected, message);
    },

    notClose: function(actual, expected, minDifference, message) {
        QUnit.push(Math.abs(actual - expected) > minDifference, actual, expected, message);
    }
});

QUnit.brazilTimezoneTest = brazilTimezoneTest;
QUnit.config.testTimeout = 2500;
QUnit.config.reorder = false;

var close = QUnit.close,
    notClose = QUnit.notClose;

