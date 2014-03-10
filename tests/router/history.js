(function() {
    var MockAdapter = kendo.Class.extend({
        init: function() {
            this.url = "";
            this._length = 1;
        },
        normalizeCurrent: $.noop,

        current: function() {
            return this.url;
        },

        length: function() {
            return this._length;
        },

        change: function(callback) {
            this.callback = callback;
        },

        normalize: function(url) {
            return url;
        },

        forward: function() {
        },

        back: function() {
        },

        navigate: function(url) {
            this.url = url;
            this._length ++;
        }
    });

    var history,
        adapter;

    module("History with mocks", {
        setup: function() {
            history = new kendo.History();
            adapter = new MockAdapter();
            stub(history, {
                createAdapter: function() {
                    return adapter;
                }
            });
        }
    });

    test("creates adapter with / root by default", 1, function() {
        stub(history, {
            createAdapter: function(options) {
                equal(options.root, "/");
                return adapter;
            }
        });

        history.start();
    });

    test("passes the root to the adapter", 1, function() {
        stub(history, {
            createAdapter: function(options) {
                equal(options.root, "foo");
                return adapter;
            }
        });

        history.start({ root: "foo"});
    });

    test("requests pushstate adapter if given pushState", 1, function() {
        stub(history, {
            createAdapter: function(options) {
                equal(options.pushState, true);
                return adapter;
            }
        });

        history.start({ pushState: true });
    });

    test("requests normalization of the state on start", 1, function() {
        stub(adapter, { normalizeCurrent: function(options) {
            equal(options.pushState, true);
        }});

        history.start({ pushState: true });
    });


    test("keeps track of locations", 2, function() {
        history.start();
        equal(history.locations.length, 1);
        equal(history.locations[0], "");
    });

    test("navigate calls the adapter navigate method", 1, function() {
        stub(adapter, { navigate: function(url) {
            equal(url, "foo");
        }});
        history.start();
        history.navigate("foo");
    });

    test("does not pushState if identical", 1, function() {
        var loc;

        stub(adapter, {
            navigate: function(url) {
                loc = url;
            },

            current: function() {
                return loc;
            }
        });

        history.start();
        history.navigate("/new-location");
        history.navigate("/new-location");
        equal(adapter.calls("navigate"), 1);
    });

    test("triggers events when history changed", 1, function() {
        history.start();

        history.change(function(e) {
            equal(e.url, "/new-location");
        });

        history.navigate("/new-location");
    });

    test("Allows prevention of url if preventDefault called", 1, function() {
        history.start();

        history.navigate("foo");

        history.change(function(e) {
            e.preventDefault();
        });

        history.navigate("bar");

        equal(history.current, "foo")
    });

    test("Triggers back", 2, function() {
        history.start();

        history.navigate("/initial-location");
        history.navigate("/new-location");

        history.bind("back", function(e) {
            equal(e.url, "/new-location");
            equal(e.to, "/initial-location");
        });

        adapter.url = "/initial-location";
        adapter.callback();
    });

    test("Allows prevention of back if preventDefault called", 1, function() {
        history.start();

        history.navigate("/initial-location");
        history.navigate("/new-location");

        history.change(function(e) {
            e.preventDefault();
        });

        adapter.url = "/initial-location";
        adapter.callback();

        equal(history.current, "/new-location");
    });

    test("Allows prevention of back if preventDefault in back event called", 1, function() {
        history.start();

        history.navigate("/initial-location");
        history.navigate("/new-location");

        history.bind("back", function(e) {
            e.preventDefault();
        });

        adapter.url = "/initial-location";
        adapter.callback();

        equal(history.current, "/new-location");
    });
})();


(function() {
    var win,
        kendoHistory,
        _history,
        initial,
        win,
        loc,
        root,
        pushStateSupported = kendo.support.pushState;

    module("History", {
        setup: function() {
            location.hash = "";
            QUnit.stop();
            QUnit.fixture.html('<iframe src="/base/tests/router/sandbox.html"></iframe>');
            win = window.frames[0].window;

            $(win).one('load', function() {
                loc = win.location;
                root = loc.pathname;
                initial = loc.href.replace(/#.*$/, '');
                kendoHistory = win.kendo.history;
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

/*
 * Test is very erratic, but has certain value - can be run for troubleshooting
    asyncTest("Allows prevention of navigating to previous URL (not back) if preventDefault called", 1, function() {
        startWithHash();

        kendoHistory.navigate("/initial-location");
        kendoHistory.navigate("/new-location");

        kendoHistory.change(function(e) {
            e.preventDefault();
        });

        setTimeout(function() {
            loc.href = initial + "#/initial-location";
        }, 300);

        setTimeout(function() {
            start();
            url(initial + "#/new-location");
        }, 600);
    });
*/

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
        kendoHistory.navigate("/initial-location");
        kendoHistory.navigate("/new-location");
        kendoHistory.navigate("#:back");

        setTimeout(function() {
            start();
            equal(kendoHistory.locations.length, 2);
            equal(kendoHistory.locations[0], "");
        }, 300);
    });

    asyncTest("handles back in push state", 1, function() {
        startWithPushState();
        kendoHistory.navigate("/foo");
        kendoHistory.navigate("/bar");
        kendoHistory.navigate("/baz");
        _history.back();

        setTimeout(function() {
            _history.back();
            setTimeout(function() {
                start();
                equal(kendoHistory.locations.length, 2);
            }, 200);
        }, 200);
    });
})();
