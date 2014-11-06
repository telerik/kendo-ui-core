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
        kendo.history.stop();
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

asyncTest("by default ignores URL case", 1, function(){
    router = new kendo.Router();

    router.route("/bar", function() {
        start();
        ok(true);
    });

    router.start();
    router.navigate("#/BAR");
});

asyncTest("ignoreCase false makes routes case sensitive", 1, function(){
    router = new kendo.Router({ ignoreCase: false });

    router.route("/bar", function() {
        ok(false);
    });


    router.start();

    router.bind("routeMissing", function() {
        start();
        ok(true);
    });
    router.navigate("#/BAR");
});

asyncTest("hashBang accepts normal urls and normalizes them", 2, function(){
    router = new kendo.Router({ hashBang: true });

    router.route("/bar", function() {
        ok(true);
        setTimeout(function() {
            start();
            equal(location.hash, "#!/bar");
        });
    });

    router.start();
    router.navigate("#/bar");
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

test("parses optional params when query string is present", 2, function() {
    var router = new kendo.Router();

    router.route("/items(/:foo)", function(foo) {
        if (foo) {
            equal(foo, "foo");
        } else {
            ok(true);
        }
    });

    router.start();
    navigate("/items/foo?a=2");
    navigate("/items?a=2");
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

test("query string parameters are available in change event", 2, function(){
    var router = new kendo.Router();

    router.start();
    router.bind("change", function(e) {
        equal(e.params.bar, "A");
        equal(e.params.baz, "B");
    });
    navigate("/foo?bar=A&baz=B");
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

test("query string parameters are available in the route missing event", 3, function() {
    var router = new kendo.Router();

    router.route("/", function() {
        ok(true);
    });

    router.bind("routeMissing", function(e) {
        equal(e.params.bar, "A");
        equal(e.params.baz, "B");
    });

    router.start();
    navigate("/foo?bar=A&baz=B");
})

test("navigate method navigates to a given url", 1, function(){
    var router = new kendo.Router();

    router.route("/foo", function() {
        ok(true);
    });

    router.start();
    router.navigate("/foo");
});
