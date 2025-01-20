import '@progress/kendo-ui/src/kendo.core.js';

let template = kendo.Template;

describe("Template", function() {
    it("function template returns the same function", function() {
        let t = $.noop;

        assert.isOk(template.compile(t) === t);
    });
});
