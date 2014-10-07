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

    module("History", {
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

    test("requests hashbang adapter if given hashbang", 1, function() {
        stub(history, {
            createAdapter: function(options) {
                equal(options.hashBang, true);
                return adapter;
            }
        });

        history.start({ hashBang: true });
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

    test("navigate works with hash bang", 1, function() {
        stub(adapter, { normalize: function(url) {
            return url.split("#!")[1];
        }});

        history.bind("change", function(e) {
            equal(e.url, "foo");
        });

        history.start({ hashBang: true });
        history.navigate("#!foo");
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

    test("allows prevention of back if preventDefault in back event called", 1, function() {
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

    test("accepts event handlers passed as options", 1, function() {
        history.start({
            change: function(e) {
                equal(e.url, "/new-location");
            }
        });

        history.navigate("/new-location");
    });

    test("triggers ready with the initial location", 1, function() {
        adapter.current = function() {
            return "/initial-location";
        }
        history.start();
        equal(history.current, "/initial-location");
    });

    test("listens for adapter changes", 1, function() {
        history.start();

        history.change(function(e) {
            equal(e.url, "/outside-location");
        });

        adapter.url = "/outside-location";
        adapter.callback();
    });

    test("passes parameters if any present", 1, function() {
        history.start();

        history.change(function(e) {
            equal(e.url, "/new-location?foo=bar");
        });

        history.navigate("/new-location?foo=bar");
    });

    test("supports #:back pseudo url for going back", 1, function() {
        stub(adapter, { back: function() {
            ok(true);
        }})

        history.start();
        history.navigate("/new-location");
        history.navigate("#:back");
    });

    test("stays in sync after back is called", 2, function() {
        history.start();
        history.navigate("/initial-location");
        history.navigate("/new-location");

        adapter.url = "/initial-location";
        adapter.callback();

        equal(history.locations.length, 2);
        equal(history.locations[0], "");
    });

    test("replace calls the adapter replace method", 1, function() {
        stub(adapter, { replace: function(url) {
            equal(url, "foo");
        }});
        history.start();
        history.replace("foo");
    });

    test("replace does NOT create items with NaN index in the locations array", 1, function() {
        stub(adapter, { replace: $.noop });
        history.start();

        history.replace("foo");
        ok(!history.locations[NaN]);
    });

    test("ignores null results", 1, function() {
        history.start();
        var called = false;

        history.change(function(e) {
            called = true;
        });

        adapter.url = null;
        adapter.callback();
        ok(!called);
    });

})();

