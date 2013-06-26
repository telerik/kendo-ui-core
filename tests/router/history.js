var win,
    kendoHistory,
    _history,
    initial,
    win,
    loc,
    pushStateSupported = kendo.support.pushState,
    root = location.pathname.replace(/\/(router\.html)?$/, "/sandbox/");

module("History", {
    setup: function() {
        QUnit.stop();
        $("#iframe-container").empty().html('<iframe src="sandbox/"></iframe>');
        win = window.frames[0].window;

        $(win).one('load', function() {
            loc = win.location,
            initial = loc.href.replace(/#.*$/, ''),
            kendoHistory = win.kendo.history,
            _history = win.history;
            QUnit.start();
        });
    },

    teardown: function() {
        if (win.kendo) {
            win.kendo.support.pushState = pushStateSupported;
            kendoHistory.stop();
        }
    }
});

function url(expected) {
    equal(loc.href.replace(/#$/, ''), expected);
}

function startWithHash() {
    kendoHistory.start({root: root});
}

function startWithPushState() {
    kendoHistory.start({pushState: true, root: root});
}

test("uses hashbang by default", function() {
    startWithHash();
    kendoHistory.navigate("/new-location");
    url(initial + "#/new-location");
});

test("keeps track of locations", 2, function() {
    startWithHash();
    equal(kendoHistory.locations.length, 1);
    equal(kendoHistory.locations[0], "");
});

test("uses pushState if possible and asked to", function() {
    startWithPushState();
    kendoHistory.navigate("/new-location");
    if (!!pushStateSupported) {
        url(initial + "new-location");
    }
    else {
        url(initial + "#/new-location");
    }
});

test("does not pushState if identical", function() {
    startWithPushState();
    kendoHistory.navigate("/new-location");
    var length = history.length;
    kendoHistory.navigate("/new-location");
    equal(history.length, length);
});

asyncTest("transforms pushState to non-push state when needed", 1, function() {
    if (!pushStateSupported) {
        start();
        ok(true);
        return;
    }

    startWithPushState();

    kendoHistory.navigate("new-location");

    var currentLocation = loc.href;

    var check = function() {
        var newLocation = frames[0].window.location.href;
        if (newLocation != currentLocation) {
            start();
            equal(newLocation, initial + "#new-location");
        } else {
            setTimeout(check, 100);
        }
    }

    kendoHistory.stop();
    win.kendo.support.pushState = false;
    startWithPushState();
    check();
});

asyncTest("transforms hash to push state on start", function() {
    expect(1);

    if (!pushStateSupported) {
        start();
        ok(true);
        return;
    }

    startWithHash();
    kendoHistory.navigate("/new-location");

    var currentLocation = loc.href;

    var check = function() {
        var newLocation = frames[0].window.location.href;
        if (newLocation != currentLocation) {
            start();
            equal(newLocation, initial + "new-location");
        } else {
            setTimeout(check, 100);
        }
    }

    kendoHistory.stop();
    startWithPushState();
    check();
});

test("allows setting of root", function() {
    if (!pushStateSupported) {
        return;
    }
    kendoHistory.start({root: root + "/subdir/", pushState: true});
    kendoHistory.navigate('/new-location');
    url(initial + "subdir/new-location");
});

test("triggers events when history changed", function() {
    expect(1);
    startWithHash();

    kendoHistory.change(function(e) {
        equal(e.url, "/new-location");
    });

    kendoHistory.navigate("/new-location");
});

test("Allows prevention of hash change if preventDefault called", 1, function() {
    startWithHash();

    kendoHistory.change(function(e) {
        e.preventDefault();
    });

    kendoHistory.navigate("/new-location");
    url(initial);
});

asyncTest("Allows prevention of back if preventDefault called", 1, function() {
    startWithHash();

    kendoHistory.navigate("/new-location");

    kendoHistory.change(function(e) {
        e.preventDefault();
    });

    _history.back();

    setTimeout(function() {
        start();
        url(initial + "#/new-location");
    });
});

asyncTest("Allows prevention of hash change by clicked link if preventDefault called", 1, function() {
    startWithHash();

    kendoHistory.change(function(e) {
        e.preventDefault();
    });

    loc.href = loc.href + "#foo";

    setTimeout(function() {
        start();
        url(initial);
    }, 300);
});

test("strips hash from passed urls", function() {
    startWithHash();
    kendoHistory.navigate('#/new-location');
    equal(kendoHistory.current, '/new-location');
});

test("accepts event handlers passed as options", function() {
    expect(1);

    kendoHistory.start({root: root, change: function(e) { equal(e.url, "/new-location"); }});

    kendoHistory.navigate("/new-location");
});

test("triggers ready with the initial location", function() {
    expect(1);

    win.location.hash = "/initial-location";
    kendoHistory.start({root: root });
    equal(kendoHistory.current, "/initial-location");
});

asyncTest("listens for outside url changes (hashChange)", function() {
    expect(1);
    startWithHash();

    kendoHistory.change(function(e) {
        start();
        equal(e.url, "/outside-location");
    });

    win.location.hash = "/outside-location";
});

test("passes parameters if any present", function() {
    expect(1);
    startWithHash();

    kendoHistory.change(function(e) {
        equal(e.url, "/new-location?foo=bar");
    });

    kendoHistory.navigate("/new-location?foo=bar");
});

asyncTest("supports #:back pseudo url for going back", 1, function() {
    startWithHash();
    kendoHistory.navigate("/new-location");
    kendoHistory.navigate("#:back");
    setTimeout(function() {
        start();
        equal(loc.hash, '');
    }, 300);
});

asyncTest("stays in sync after back is called", 2, function() {
    startWithHash();
    kendoHistory.navigate("/new-location");
    kendoHistory.navigate("#:back");
    setTimeout(function() {
        start();
        equal(kendoHistory.locations.length, 1);
        equal(kendoHistory.locations[0], "");
    }, 300);
});
