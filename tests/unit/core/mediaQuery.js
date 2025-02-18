import '@progress/kendo-ui/src/kendo.core.js';
import { asyncTest } from "../../helpers/unit/async-utils.js";
import { spy } from "../../helpers/unit/stub.js";

let mediaQuery = kendo.mediaQuery;
let mq;

describe("mediaQuery", function() {
    afterEach(function() {
        if (mq) {
            mq.destroy();
            mq = null;
        }
    });

    function dispatchMediaQueryEvent(mql, matches) {
        let event = new MediaQueryListEvent("change", {
            media: mql.media,
            matches: matches,
        });

        mql.dispatchEvent(event);
    }

    it("creates mediaQueryList", function() {
        mq = mediaQuery("(min-width: 100px)");
        assert.isOk(mq.mediaQueryList);
        assert.equal(mq.mediaQueryList.media, "(min-width: 100px)");
    });

    it("creates mediaQuery methods", function() {
        mq = mediaQuery("(max-width: 500px)");
        assert.isOk(mq.onChange);
        assert.isOk(mq.onEnter);
        assert.isOk(mq.onLeave);
        assert.isOk(mq.destroy);
    });

    asyncTest("mediaQuery calls onEnter when matches media", function(done) {
        mq = mediaQuery("(max-width: 50000px)").onEnter(() => {
            done(() => assert.isOk(true));
        });
    });

    it("mediaQuery.onChange is called on matchMedia event", function() {
        let handler = spy();

        mq = mediaQuery("(max-width: 100px)").onChange(handler);

        dispatchMediaQueryEvent(mq.mediaQueryList, true);
        dispatchMediaQueryEvent(mq.mediaQueryList, false);

        assert.equal(handler.calls, 2);
    });

    asyncTest("mediaQuery.onEnter is called on matchMedia event when matched", function(done) {
        mq = mediaQuery("(max-width: 100px)").onEnter(() => {
            done(() => assert.isOk(true));
        });

        dispatchMediaQueryEvent(mq.mediaQueryList, true);
    });

    asyncTest("mediaQuery.onLeave is called on matchMedia event when not matched", function(done) {
        mq = mediaQuery("(max-width: 100px)").onLeave(() => {
            done(() => assert.isOk(true));
        });

        dispatchMediaQueryEvent(mq.mediaQueryList, false);
    });
});
