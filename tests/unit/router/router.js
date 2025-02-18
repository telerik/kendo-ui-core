import '@progress/kendo-ui/src/kendo.router.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let router;

function navigate(to) {
    kendo.history.navigate(to);
}

describe("Router", function() {
    beforeEach(function() {
        location.hash = '';
    });

    afterEach(function() {
        router.destroy();
        kendo.history.stop();
    });

    it("raises init when started", function() {
        router = new kendo.Router({
            init: function(e) {
                assert.equal(e.url, "/");
            }
        });

        router.start();
    });

    it("navigates to / by default", function() {
        router = new kendo.Router();

        router.route("/", function() {
            assert.isOk(true);
        });

        router.start();
    });

    it("supports multiple instances", function() {
        router = new kendo.Router();

        router.route("/", function() { assert.isOk(true); });

        router.start();

        let router2 = new kendo.Router();
        router2.route("/", function() { assert.isOk(true); });
        router2.start();
    });

    asyncTest("by default ignores URL case", function(done) {
        router = new kendo.Router();

        router.route("/bar", function() {
            done(() => assert.isOk(true));
        });

        router.start();
        router.navigate("#/BAR");
    });

    asyncTest("does not encode symbols in segments", function(done) {
        router = new kendo.Router();

        router.start();

        router.route("/*suffix", function(suffix) {
            done(() => {
                assert.equal(suffix, 'A/B%2FC/D');
                router.destroy();
            });
        });

        router.navigate("/A/B%2FC/D");
    });


    asyncTest("ignoreCase false makes routes case sensitive", function(done) {
        let count = 0;
        router = new kendo.Router({ ignoreCase: false });

        router.route("/bar", function() {
            count++;
        });


        router.start();

        router.bind("routeMissing", function() {
            done(() => assert.equal(count, 0));
        });
        router.navigate("#/BAR");
    });

    asyncTest("hashBang accepts normal urls and normalizes them", function(done) {
        router = new kendo.Router({ hashBang: true });

        router.route("/bar", function() {
            assert.isOk(true);
            setTimeout(function() {
                done(() => assert.equal(location.hash, "#!/bar"));
            });
        });

        router.start();
        router.navigate("#/bar");
    });
});

describe("Router params", function() {
    beforeEach(function() {
        location.hash = '';
        router = new kendo.Router();
        router.start();
    });

    afterEach(function() {
        kendo.history.stop();
        location.hash = '';
        router.destroy();
    });

    it("recognizes an url", function() {
        let router = new kendo.Router();

        router.route("/foo", function() {
            assert.isOk(true);
        });

        router.start();
        navigate("/foo");
    });

    it("parses params", function() {
        let router = new kendo.Router();

        router.route("/:foo", function(foo) {
            assert.equal(foo, "foo");
        });

        router.start();
        navigate("/foo");
    });

    it("parses query string params", function() {
        let router = new kendo.Router();

        router.route("/:foo", function(foo, params) {
            assert.equal(foo, "foo");
            assert.equal(params.baz, "Q");
        });

        router.start();
        navigate("/foo?baz=Q");
    });

    it("handles complex query string parameters", function() {
        let router = new kendo.Router();

        router.route("/:foo", function(foo, params) {
            assert.equal(foo, "foo");
            assert.equal(params.key1, "");
            assert.equal(params.key2, "value");
            assert.equal(params.key3, "Rock & Roll");
            assert.equal(params["rock&roll"], "here to stay");
            assert.equal(params.key4, "baz");
        });

        router.start();
        navigate("/foo?key1=&key2=value&key3=Rock%20%26%20Roll&rock%26roll=here%20to%20stay&key4=foo&key4=bar&key4=baz");
    });

    it("no exception is rised when invalid query string parameters are passed", function() {
        let router = new kendo.Router();

        router.route("/:foo", function(foo) {
            assert.equal(foo, "foo");
            assert.isOk(true);
        });

        router.start();
        try {
            navigate("/foo?key1&value");
        } catch (e) {
            assert.isOk(false, "Error should not be thrown");
        }
    });

    it("parses optional params", function() {
        let router = new kendo.Router();

        router.route("/:foo(/:bar)", function(foo, bar) {
            assert.equal(foo, "foo");

            if (bar) {
                assert.equal(bar, "bar");
            } else {
                assert.isOk(true);
            }
        });

        router.start();
        navigate("/foo/bar");
        navigate("/foo");
    });

    it("parses optional params when query string is present", function() {
        let router = new kendo.Router();

        router.route("/items(/:foo)", function(foo) {
            if (foo) {
                assert.equal(foo, "foo");
            } else {
                assert.isOk(true);
            }
        });

        router.start();
        navigate("/items/foo?a=2");
        navigate("/items?a=2");
    });

    it("parses optional params and query string params", function() {
        let router = new kendo.Router();

        router.route("/:foo(/:bar)", function(foo, bar, params) {
            assert.equal(foo, "foo");

            if (bar) {
                assert.equal(bar, "bar");
                assert.equal(params.baz, "Q");
            } else {
                assert.equal(params.baz, "Q");
                assert.equal(params.qux, "qux");
                assert.isOk(true);
            }
        });

        router.start();
        navigate("/foo/bar?baz=Q");
        navigate("/foo?baz=Q&qux=qux");
    });

    it("parses splat params", function() {
        let router = new kendo.Router();

        router.route("/:foo/*bar", function(foo, bar) {
            assert.equal(foo, "foo");

            assert.equal(bar, "bar/baz");
        });

        router.start();
        navigate("/foo/bar/baz");
    });

    it("triggers change on url change", function() {
        let router = new kendo.Router();


        router.one("change", function(e) { assert.equal(e.url, "/"); });
        router.start();
        router.one("change", function(e) { assert.equal(e.url, "/foo"); });
        navigate("/foo");
    });

    it("triggers change on query string params change", function() {
        let router = new kendo.Router();

        router.start();
        router.one("change", function(e) { assert.equal(e.url, "/foo?bar=A"); });
        navigate("/foo?bar=A");
        router.one("change", function(e) { assert.equal(e.url, "/foo?bar=B"); });
        navigate("/foo?bar=B");
    });

    it("query string parameters are available in change event", function() {
        let router = new kendo.Router();

        router.start();
        router.bind("change", function(e) {
            assert.equal(e.params.bar, "A");
            assert.equal(e.params.baz, "B");
        });
        navigate("/foo?bar=A&baz=B");
    });

    it("preventing default does not hit the route", function() {
        let router = new kendo.Router();

        router.start();

        router.route("/foo", function() {
            assert.isOk(false);
        });

        router.one("change", function(e) {
            e.preventDefault();
        });

        navigate("/foo");
    });

    it("triggers route missing if no route found", function() {
        let router = new kendo.Router();

        router.route("/", function() {
            assert.isOk(true);
        });

        router.bind("routeMissing", function(e) {
            assert.equal(e.url, "/foo");
        });

        router.start();
        navigate("/foo");
    });

    it("query string parameters are available in the route missing event", function() {
        let router = new kendo.Router();

        router.route("/", function() {
            assert.isOk(true);
        });

        router.bind("routeMissing", function(e) {
            assert.equal(e.params.bar, "A");
            assert.equal(e.params.baz, "B");
        });

        router.start();
        navigate("/foo?bar=A&baz=B");
    });

    it("navigate method navigates to a given url", function() {
        let router = new kendo.Router();

        router.route("/foo", function() {
            assert.isOk(true);
        });

        router.start();
        router.navigate("/foo");
    });

    asyncTest("navigate method navigates to a given url", function(done) {
        let router = new kendo.Router();

        let i = 0;
        router.route("/foo", function(params) {
            if (++i == 2) {
                done(() => assert.isOk(params._back));
            }
        });

        router.start();
        router.navigate("/foo");
        router.navigate("/bar");
        history.back();
    });
});
