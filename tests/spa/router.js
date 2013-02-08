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
