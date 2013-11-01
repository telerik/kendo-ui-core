var router;

function navigate(to) {
    kendo.history.navigate(to);
}

module("Router", {
    setup: function() {
        location.hash = '';
    },

    teardown: function() {
        router.destroy();
    }
});

test("raises init when started", 1, function(){
    router = new kendo.Router({
        init: function(e) {
            equal(e.url, "/");
        }
    })

    router.start();
});

test("navigates to / by default", 1, function(){
    router = new kendo.Router();

    router.route("/", function() {
        ok(true);
    });

    router.start();
});

test("supports multiple instances", 2, function(){
    router = new kendo.Router();

    router.route("/", function() { ok(true); });

    router.start();

    router2 = new kendo.Router();
    router2.route("/", function() { ok(true); });
    router2.start();
});

module("Router params", {
    setup: function() {
        location.hash = '';
        router = new kendo.Router();
        router.start();
    },

    teardown: function() {
        kendo.history.stop();
        location.hash = '';
        router.destroy();
    }
})

test("recognizes an url", 1, function(){
    var router = new kendo.Router();

    router.route("/foo", function() {
        ok(true);
    });

    router.start();
    navigate("/foo");
});

test("parses params", 1, function(){
    var router = new kendo.Router();

    router.route("/:foo", function(foo) {
        equal(foo, "foo");
    });

    router.start();
    navigate("/foo");
});

test("parses query string params", 2, function(){
    var router = new kendo.Router();

    router.route("/:foo", function(foo, params) {
        equal(foo, "foo");
        equal(params.baz, "Q");
    });

    router.start();
    navigate("/foo?baz=Q");
});

test("handles complex query string parameters", 6, function(){
    var router = new kendo.Router();

    router.route("/:foo", function(foo, params) {
        equal(foo, "foo");
        equal(params.key1, "");
        equal(params.key2, "value");
        equal(params.key3, "Rock & Roll");
        equal(params["rock&roll"], "here to stay");
        equal(params.key4, "baz");
    });

    router.start();
    navigate("/foo?key1=&key2=value&key3=Rock%20%26%20Roll&rock%26roll=here%20to%20stay&key4=foo&key4=bar&key4=baz");
});

test("no exception is rised when invalid query string parameters are passed", 2, function(){
    var router = new kendo.Router();

    router.route("/:foo", function(foo, params) {
        equal(foo, "foo");
        ok(true);
    });

    router.start();
    try {
        navigate("/foo?key1&value");
    } catch(e) {
        ok(false, "Error should not be thrown");
    }
});

test("parses optional params", 4, function() {
    var router = new kendo.Router();

    router.route("/:foo(/:bar)", function(foo, bar) {
        equal(foo, "foo");

        if (bar) {
            equal(bar, "bar");
        } else {
            ok(true);
        }
    });

    router.start();
    navigate("/foo/bar");
    navigate("/foo");
});

test("parses optional params and query string params", 7, function() {
    var router = new kendo.Router();

    router.route("/:foo(/:bar)", function(foo, bar, params) {
        equal(foo, "foo");

        if (bar) {
            equal(bar, "bar");
            equal(params.baz, "Q");
        } else {
            equal(params.baz, "Q");
            equal(params.qux, "qux");
            ok(true);
        }
    });

    router.start();
    navigate("/foo/bar?baz=Q");
    navigate("/foo?baz=Q&qux=qux");
});

test("parses splat params", 2, function() {
    var router = new kendo.Router();

    router.route("/:foo/*bar", function(foo, bar) {
        equal(foo, "foo");

        equal(bar, "bar/baz");
    });

    router.start();
    navigate("/foo/bar/baz");
});

test("triggers change on url change", 2, function(){
    var router = new kendo.Router();


    router.one("change", function(e) { equal(e.url, "/") });
    router.start();
    router.one("change", function(e) { equal(e.url, "/foo") });
    navigate("/foo");
});

test("triggers change on query string params change", 2, function(){
    var router = new kendo.Router();

    router.start();
    router.one("change", function(e) { equal(e.url, "/foo?bar=A") });
    navigate("/foo?bar=A");
    router.one("change", function(e) { equal(e.url, "/foo?bar=B") });
    navigate("/foo?bar=B");
});

test("preventing default does not hit the route", 0, function(){
    var router = new kendo.Router();

    router.start();

    router.route("/foo", function(url) {
        ok(false);
    });

    router.one("change", function(e) {
        e.preventDefault();
    });

    navigate("/foo");
});

test("triggers route missing if no route found", 2, function(){
    var router = new kendo.Router();

    router.route("/", function() {
        ok(true);
    });

    router.bind("routeMissing", function(e) {
        equal(e.url, "/foo")
    });

    router.start();
    navigate("/foo");
});

test("navigate method navigates to a given url", 1, function(){
    var router = new kendo.Router();

    router.route("/foo", function() {
        ok(true);
    });

    router.start();
    router.navigate("/foo");
});
