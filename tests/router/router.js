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
