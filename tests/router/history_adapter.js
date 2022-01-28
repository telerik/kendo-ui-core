(function () {
    var Adapter = kendo.History.HistoryAdapter;

    describe("History adapter", function () {

    function onHash(callback) {
        $(window).one("hashchange", callback);
    }

    it("back goes to previous location", function(done) {
        var adapter = new Adapter(),
            initial = location.hash;
        onHash(function() {
            adapter.back();
            onHash(function() {
                assert.equal(location.hash, initial);
                done();
            });
        });
        location.hash = "a";
    });

    it("forward goes to next location", function(done) {
        var adapter = new Adapter();

        onHash(function() {
            history.back();
            onHash(function() {
                adapter.forward();
                onHash(function() {
                    assert.equal(location.hash, "#b");
                    done();
                });
            });
        });

        location.hash = "b";
    });

    it("length tracks the history length", function(done) {
        var length = history.length;

        if (length === 50) {
            window.console.log("skipping history length tests, max length reached");
            assert.isOk(true);
            done();
            return;
        }

        var adapter = new Adapter(),
            initial = adapter.length();

        onHash(function() {
            assert.equal(adapter.length(), initial + 1);
            done();
        });

        location.hash = "c";
    });
    });
}());
