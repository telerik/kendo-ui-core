import '@progress/kendo-ui/src/kendo.fx.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

describe("animation queue", function() {
    asyncTest("executes provided command", function(done) {
        kendo.queueAnimation(function() {
            done(() => assert.isOk(true));
        });
    });

    asyncTest("keeps commands in order", function(done) {
        let i = 0;

        kendo.queueAnimation(function() {
            i++;
            assert.isOk(true);
        });

        kendo.queueAnimation(function() {
            done(() => assert.equal(i, 1));
        });
    });

});
