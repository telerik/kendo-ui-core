import '@progress/kendo-ui/src/kendo.core.js';
import { kendoJQueryService } from '@progress/kendo-ui/src/core/services/kendo-jquery.service.js';

describe("kendo jQuery service", function() {
    it("does not copy prototype-polluting keys", function() {
        const pollutionKey = "kendoPrototypePolluted";
        const target = {};
        const source = JSON.parse('{"__proto__":{"kendoPrototypePolluted":true}}');

        try {
            kendoJQueryService.noDeprecateExtend(true, target, source);

            assert.isFalse(pollutionKey in target);
        } finally {
            delete Object.prototype[pollutionKey];
        }
    });
});
