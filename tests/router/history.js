var win,
    kendoHistory,
    _history,
    initial,
    win,
    loc,
    pushStateSupported = window.history.pushState,
    root = location.pathname.replace(/\/(router\.html)?$/, "/sandbox/");

module("History", {
    setup: function() {
        QUnit.stop();
        $("#iframe-container").html('<iframe src="sandbox/"></iframe>');
        win = window.frames[0].window;

        $(win).one('load', function() {
            loc = win.location,
            initial = loc.href.replace(/#.*$/, ''),
            kendoHistory = win.kendo.history,
            _history = win.history;
            QUnit.start();
        });
    }
});

function url(expected) {
    equal(expected, loc.href.replace(/#$/, ''));
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

asyncTest("transforms pushState to non-push state when needed", function() {
    expect(1);

    if (!pushStateSupported) {
        start();
        ok(true);
        return;
    }

    startWithPushState();

    kendoHistory.navigate("/new-location");

    var currentLocation = loc.href;

    var check = function() {
        var newLocation = frames[0].window.location.href;
        if (newLocation != currentLocation) {
            start();
            equal(newLocation, initial + "#/new-location");
        } else {
            setTimeout(check, 100);
        }
    }

    kendoHistory._pushStateSupported = function() { return false; }
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

test("alllows prevention of hash change if preventDefault called", function() {
    expect(1);
    startWithHash();

    kendoHistory.change(function(e) {
        e.preventDefault();
    });

    kendoHistory.navigate("/new-location");
    url(initial);
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
    kendoHistory.start({root: root, ready: function(e) { equal(e.url, "/initial-location"); }});
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

