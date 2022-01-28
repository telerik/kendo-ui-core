(function() {
    /* global stub */
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
            this._length++;
        }
    });

    var history,
        adapter;

    describe("History", function() {
        beforeEach(function() {
            history = new kendo.History();
            adapter = new MockAdapter();
            stub(history, {
                createAdapter: function() {
                    return adapter;
                }
            });
        });

        it("creates adapter with / root by default", function() {
            stub(history, {
                createAdapter: function(options) {
                    assert.equal(options.root, "/");
                    return adapter;
                }
            });

            history.start();
        });

        it("passes the root to the adapter", function() {
            stub(history, {
                createAdapter: function(options) {
                    assert.equal(options.root, "foo");
                    return adapter;
                }
            });

            history.start({ root: "foo" });
        });

        it("requests pushstate adapter if given pushState", function() {
            stub(history, {
                createAdapter: function(options) {
                    assert.equal(options.pushState, true);
                    return adapter;
                }
            });

            history.start({ pushState: true });
        });

        it("requests hashbang adapter if given hashbang", function() {
            stub(history, {
                createAdapter: function(options) {
                    assert.equal(options.hashBang, true);
                    return adapter;
                }
            });

            history.start({ hashBang: true });
        });

        it("requests normalization of the state on start", function() {
            stub(adapter, {
                normalizeCurrent: function(options) {
                    assert.equal(options.pushState, true);
                }
            });

            history.start({ pushState: true });
        });


        it("keeps track of locations", function() {
            history.start();
            assert.equal(history.locations.length, 1);
            assert.equal(history.locations[0], "");
        });

        it("navigate calls the adapter navigate method", function() {
            stub(adapter, {
                navigate: function(url) {
                    assert.equal(url, "foo");
                }
            });

            history.start();
            history.navigate("foo");
        });

        it("navigate works with hash bang", function() {
            stub(adapter, {
                normalize: function(url) {
                    return url.split("#!")[1];
                }
            });

            history.bind("change", function(e) {
                assert.equal(e.url, "foo");
            });

            history.start({ hashBang: true });
            history.navigate("#!foo");
        });

        it("does not pushState if identical", function() {
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
            assert.equal(adapter.calls("navigate"), 1);
        });

        it("triggers events when history changed", function() {
            history.start();

            history.change(function(e) {
                assert.equal(e.url, "/new-location");
            });

            history.navigate("/new-location");
        });

        it("Allows prevention of url if preventDefault called", function() {
            history.start();

            history.navigate("foo");

            history.change(function(e) {
                e.preventDefault();
            });

            history.navigate("bar");

            assert.equal(history.current, "foo");
        });

        it("Triggers back", function() {
            history.start();

            history.navigate("/initial-location");
            history.navigate("/new-location");

            history.bind("back", function(e) {
                assert.equal(e.url, "/new-location");
                assert.equal(e.to, "/initial-location");
            });

            adapter.url = "/initial-location";
            adapter.callback();
        });

        it("Allows prevention of back if preventDefault called", function() {
            history.start();

            history.navigate("/initial-location");
            history.navigate("/new-location");

            history.change(function(e) {
                e.preventDefault();
            });

            adapter.url = "/initial-location";
            adapter.callback();

            assert.equal(history.current, "/new-location");
        });

        it("allows prevention of back if preventDefault in back event called", function() {
            history.start();

            history.navigate("/initial-location");
            history.navigate("/new-location");

            history.bind("back", function(e) {
                e.preventDefault();
            });

            adapter.url = "/initial-location";
            adapter.callback();

            assert.equal(history.current, "/new-location");
        });

        it("accepts event handlers passed as options", function() {
            history.start({
                change: function(e) {
                    assert.equal(e.url, "/new-location");
                }
            });

            history.navigate("/new-location");
        });

        it("triggers ready with the initial location", function() {
            adapter.current = function() {
                return "/initial-location";
            };
            history.start();
            assert.equal(history.current, "/initial-location");
        });

        it("listens for adapter changes", function() {
            history.start();

            history.change(function(e) {
                assert.equal(e.url, "/outside-location");
            });

            adapter.url = "/outside-location";
            adapter.callback();
        });

        it("passes parameters if any present", function() {
            history.start();

            history.change(function(e) {
                assert.equal(e.url, "/new-location?foo=bar");
            });

            history.navigate("/new-location?foo=bar");
        });

        it("supports #:back pseudo url for going back", function() {
            stub(adapter, {
                back: function() {
                    assert.isOk(true);
                }
            });

            history.start();
            history.navigate("/new-location");
            history.navigate("#:back");
        });

        it("stays in sync after back is called", function() {
            history.start();
            history.navigate("/initial-location");
            history.navigate("/new-location");

            adapter.url = "/initial-location";
            adapter.callback();

            assert.equal(history.locations.length, 2);
            assert.equal(history.locations[0], "");
        });

        it("replace calls the adapter replace method", function() {
            stub(adapter, {
                replace: function(url) {
                    assert.equal(url, "foo");
                }
            });
            history.start();
            history.replace("foo");
        });

        it("replace does NOT create items with NaN index in the locations array", function() {
            stub(adapter, { replace: $.noop });
            history.start();

            history.replace("foo");
            assert.isOk(!history.locations[NaN]);
        });

        it("ignores null results", function() {
            history.start();
            var called = false;

            history.change(function() {
                called = true;
            });

            adapter.url = null;
            adapter.callback();
            assert.isOk(!called);
        });

    });
}());

