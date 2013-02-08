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
        init: function() {
            ok(true);
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


module("Router routing", {
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
