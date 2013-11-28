function stub(that, methods) {
    var stubs = {};

    if (typeof methods === "string") {
        var obj = {};
        obj[methods] = $.noop;
        methods = obj;
    }

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

$('head').append('<link rel="stylesheet/less" href="/base/styles/mobile/kendo.mobile.all.less" type="text/css" />');

$(function() {
    QUnit.fixture = $("<div id='qunit-fixture' style='height: 100px'></div>").appendTo(document.body);
})

QUnit.brazilTimezoneTest = brazilTimezoneTest;
QUnit.config.testTimeout = 800;
QUnit.config.reorder = false;

var close = QUnit.close,
    notClose = QUnit.notClose;
