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
            stubs[method].calls++;
            stubs[method].args.push(arguments);
            return impl.apply(that, arguments);
        };
    });
    that.calls = function(method) {
        return stubs[method].calls;
    };
    that.args = function(method, index) {
        method = stubs[method];
        index = index !== undefined ? index : method.args.length - 1;
        return method.args[index];
    };
    return that;
}

function spy(that, methods) {
    if (!arguments.length) {
        var callback = function() {
            if (!callback.calls) {
                callback.args = [];
            }

            callback.calls++;
            var args = Array.prototype.slice.call(arguments);
            callback.args.push(args);
            callback.lastArgs = args;
        };

        callback.calls = 0;

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
        assert.isOk(false, "Arrays differ in size " + "(expected " + b.length + ", got " + a.length + " elements)");
    } else if (a.length) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].length) {
                arrayClose(a[i], b[i], tolerance, "Values at index " + i);
            } else {
                assert.closeTo(a[i], b[i], tolerance, "Values at index " + i);
            }
        }
    } else {
        assert.isOk(true);
    }
}

function tzTest(tzAlias, testName, expected, callback) {
    var TZ_NAMES = {
        "Brazil": ["BRST", "BRT", "South America Daylight Time", "South America Standard Time"],
        "Sofia": ["EET", "EEST", "Eastern European Time", "Eastern European Summer Time", "FLE"],
        "Moscow": ["MSK", "RTZ2", "Russia TZ 2 Standard Time"],
        "Pacific": ["PDT", "PST"]
    };

    function tzMatch(alias) {
        var names = TZ_NAMES[alias];

        var d = new Date().toString();
        for (var i = 0; i < names.length; i++) {
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

function triggerTouchEvent(element, type, info) {
    info.target = element;
    element.trigger($.Event(type, { originalEvent: { changedTouches: [info] }, preventDefault: $.noop, stopPropagation: $.noop }));
}

function press(element, x, y, id) {
    triggerTouchEvent(element, "touchstart", {
        pageX: x,
        pageY: y,
        clientX: x,
        clientY: y,
        identifier: id || 1
    });
}

function clickAt(element, x, y) {
    element.trigger($.Event("click", { pageX: x, pageY: y }));
}

function move(element, x, y, id) {
    triggerTouchEvent(element, "touchmove", {
        pageX: x,
        pageY: y,
        clientX: x,
        clientY: y,
        identifier: id || 1
    });
}

function release(element, x, y, id) {
    triggerTouchEvent(element, "touchend", {
        pageX: x,
        pageY: y,
        clientX: x,
        clientY: y,
        identifier: id || 1
    });
}

function tap(element, x, y, id) {
    x = x || 0;
    y = y || 0;
    press(element, x, y, id);
    release(element, x, y, id);
}

function mousewheel(element, delta) {
    $(element).trigger($.Event("mousewheel", { originalEvent: { detail: delta * 3 }, preventDefault: $.noop, stopPropagation: $.noop }));
}

$.mockjaxSettings.logging = false;

QUnit = {};

function getDomContentsLength() {
    return $(document.body).children(":not(script,#editor-fixture)").length;
}

(function() {


    domContentsLength = getDomContentsLength();

})();

(function() {
    var Widget = kendo.ui.Widget;
    var init = Widget.fn.init;
    var destroy = Widget.fn.destroy;
    var widgets = [];
    var originRequestAnimationFrame;

    Widget.fn.init = function() {
        widgets.push(this);
        init.apply(this, arguments);
    };

    Widget.fn.destroy = function() {
        widgets.splice(widgets.indexOf(this), 1);
        destroy.apply(this, arguments);
    };

    beforeEach(function() {
        Mocha.fixture = $("<div id='qunit-fixture'></div>").appendTo(document.body);
        $(document.body).css("margin", "8px"); // To be compatible with QUnit fixture, since Mocha adds margin 0 to the page
        kendo.effects.disable();

        domContentsLength = getDomContentsLength();
        originRequestAnimationFrame = window.requestAnimationFrame;
        window.requestAnimationFrame = callback => {
            setTimeout(callback, 0);
        };
    })

    afterEach(function() {
        Mocha.fixture.empty().remove();
        kendo.support.mobileOS = false;
        kendo.support.touch = false;

        var length = getDomContentsLength();

        if (!this.currentTest) console.dir(this.currentTest);
        if (!this.currentTest.parent) console.dir(this.currentTest.parent);
        if (length > domContentsLength) {
            console.warn(this.currentTest.parent.title, this.currentTest.title, 'test did not clean DOM contents properly');
        }

        if (widgets.length) {
            console.error.apply(console, [this.currentTest.parent.title, this.currentTest.title, 'active widgets left'].concat(widgets.map(function(widget) {
                var name = widget.options.name;

                //if (widget.element[0].className) {
                //    name = name + "(" + widget.element[0].className + ")";
                //}

                return name;
            })));

            widgets = [];
        }

        domContentsLength = length;

        window.requestAnimationFrame = originRequestAnimationFrame;
    });
})();

var ngTestModule = $.noop, ngTest = $.noop, ngScope;

(function() {
    if (!('angular' in window)) {
        return;
    }

    var $injector, $scope, $compile;

    ngScope = function() {
        return angular.element(Mocha.fixture.children()[0]).scope();
    }

    var app = angular.module('kendo.tests', ['kendo.directives']);

    ngTest = function(name, setup, check, async) {
        it(name, function(done) {
            setup();
            angular.bootstrap(Mocha.fixture.children()[0], ['kendo.tests']);
            setTimeout(function() {
                check(done);
                
                if (!async) {
                    done();
                }
            }, 100);
        });
    }

    ngTest2 = function(name, theTest) {
        it(name, function() {
            var root = $('<div ng-controller=main></div>').appendTo(Mocha.fixture);

            var scopeSetup = $.noop;

            angular.module('kendo.tests').controller('main', function($scope) {
                scopeSetup($scope);
            });

            theTest(root, function(setup) { scopeSetup = setup }, function() { angular.bootstrap(root, ['kendo.tests']); });
            kendo.destroy(root);
            root.remove();
        });
    }
})();