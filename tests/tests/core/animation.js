import '@progress/kendo-ui/src/kendo.fx.js';
import { asyncTest } from "../../helpers/async-utils.js";

let animate = kendo.animate;
let span;

describe("animate", function() {
    beforeEach(function() {
        span = $("<span>foo</span>").appendTo(Mocha.fixture);
    });

    it("animate with effect which does not exist calls the callback imeadiately", function() {
        let callbackWasCalled = false;

        animate(span, "foo", function() {
            callbackWasCalled = true;
        });

        assert.isOk(callbackWasCalled);
    });

    asyncTest("animate calls the callback when the effect finishes", function(done) {
        kendo.fx.foo = {
            setup: function(element, options) {
                options.complete();
            }
        };

        animate(span, "foo", function() {
            done(() => assert.isOk(true));
        });
    });

    it("element is shown every time", function() {
        span.hide();

        kendo.fx.foo = {
            bsetup: function(element, options) {
                options.complete();
            }
        };

        animate(span, {
            effects: "foo"
        });

        assert.isOk(span.is(":visible"));
    });

    it("element is hidden when hide is true", function() {
        kendo.fx.foo = {
            setup: function(element, options) {
                options.complete();
            }
        };

        animate(span, {
            effects: "foo",
            hide: true
        });
        assert.isOk(!span.is(":visible"));
    });

});
