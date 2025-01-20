import '@progress/kendo-ui/src/kendo.list.js';
import '@progress/kendo-ui/src/kendo.binder.js';

describe("kendo.ui.StaticList MVVM binding", function() {
    beforeEach(function() {
        Mocha.fixture
            .append("<script type='text/x-kendo-template' id='item-template'>#:data#</script>");
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("declarative initialization", function() {
        let dom = $("<ul data-role='staticlist' />").appendTo(Mocha.fixture);

        kendo.bind(Mocha.fixture);

        assert.isOk(dom.data("kendoStaticList"));
    });
});
