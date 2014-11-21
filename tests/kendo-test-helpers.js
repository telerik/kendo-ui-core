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
                callback.args = [];
            }

            callback.calls++;
            callback.args.push(Array.prototype.splice.call(arguments));
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

function tzTest(tzAlias, testName, expected, callback ) {
    var TZ_NAMES = {
        "Brazil": ["BRST", "BRT", "South America Daylight Time", "South America Standard Time"],
        "Sofia": ["EET", "EEST", "Eastern European Time", "Eastern European Summer Time"]
    };

    function tzMatch(alias) {
        var names = TZ_NAMES[alias];

        var d = new Date().toString();
        for (var i = 0; i < names.length; i++) {
            if (d.indexOf(names[i]) !== -1) {
                return true;
            }
        };

        return false;
    }

    if (arguments.length === 3) {
        callback = expected;
        expected = null;
    }

    if (!TZ_NAMES[tzAlias]) {
        QUnit.test(testName, null, function() {
            ok(false, testName + "\n" + "Unknown timezone alias: " + tzAlias + "\n" +
               "Valid values are: " + Object.keys(TZ_NAMES).join(", "));
        });
    } else if (tzMatch(tzAlias)) {
        testName = testName + " (Timezone: " + tzAlias + ")";
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

// Silence logging for the tests
kendo.suppressLog = true;

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

QUnit.config.testTimeout = 2500;
QUnit.config.reorder = false;

var close = QUnit.close,
    notClose = QUnit.notClose,
    contains = QUnit.contains;

function withAngularTests(moduleName, func) {
    if (!('angular' in window)) {
        return;
    }

    var $injector, $controller, $scope, $compile;

    module(moduleName, {
        setup: function() {
            $injector = angular.injector([ "ng", "MyApp" ]);
            $scope = $injector.get("$rootScope").$new();
            $controller = $injector.get("$controller")("MyCtrl", { $scope: $scope });
            $compile = $injector.get("$compile");
        },
        teardown: function() {
            $scope.$destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    angular.module("my.directives", []).directive("isolatedScope", function(){
        return {
            scope: {
                "foo": "@"
            },
            restrict: "A",
            transclude: true,
            template: "<div><h1>Isolated Scope</h1><span ng-transclude></span></div>"
        };
    });

    var app = angular.module("MyApp", [ "kendo.directives", "my.directives", "ngRoute" ]);
    app.controller("MyCtrl", function($scope){
        $scope.windowOptions = {
            title: "Das titlen"
        };
        $scope.data = new kendo.data.ObservableArray([
            { text: "Foo", id: 1 },
            { text: "Bar", id: 2 }
        ]);
        $scope.hello = "Hello World!";
        $scope.whenRendered = function(f) {
            var off = $scope.$on("kendoRendered", function(){
                off();
                f.apply(null, arguments);
            });
        };
    });

    $.mockjaxSettings.responseTime = 0;

    $.mockjax({
        url: "ajax-template.html",
        response: function() {
            this.responseText = '<div>{{ hello }}</div>';
        }
    });

    $.mockjax({
        url: "data.json",
        response: function() {
            this.responseText = JSON.stringify({
                user: {
                    firstName: "John",
                    lastName: "Doe"
                }
            });
        }
    });

    function runTest(name, test){
        asyncTest(name, function(){
            var dom = $("<div></div>").appendTo(QUnit.fixture);
            test(dom, $scope);
            $compile(dom)($scope);
        });
    };

    func(runTest);

}

var ngTestModule = $.noop, ngTest = $.noop, ngScope;

(function() {
    if (!('angular' in window)) {
        return;
    }

    var $injector, $scope, $compile;

    ngScope = function() {
        return angular.element(QUnit.fixture.children()[0]).scope();
    }

    var app = angular.module('kendo.tests', [ 'kendo.directives' ]);

    ngTestModule = function(name, config) {
        if (!config) {
            config = {};
        }

        var setup = config.setup || $.noop;
        var teardown = config.teardown || $.noop;

        config.setup = function() {
            setup();
        }

        config.teardown = function() {
            teardown();
            kendo.destroy(QUnit.fixture);
        }

        module(name, config);
    }

    ngTest = function(name, assertions, setup, check) {
        asyncTest(name, assertions, function() {
            setup();
            angular.bootstrap(QUnit.fixture.children()[0], [ 'kendo.tests' ]);
            setTimeout(function() {
                start();
                check();
            }, 100);
        });
    }
})();
