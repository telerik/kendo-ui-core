import '@progress/kendo-ui/src/kendo.pager.js';

let Pager = kendo.ui.Pager,
    DataSource = kendo.data.DataSource,
    div;

describe("kendo.ui.Pager events", function() {
    beforeEach(function() {
        div = $("<div></div>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("keydown logic can be prevented through kendoKeydown event", function() {
        let fired = false;
        let dataSource = new DataSource({
            data: [{ id: 1 }, { id: 2 }],
            pageSize: 1
        });
        dataSource.read();

        let pager = new Pager(div, {
            dataSource: dataSource,
            navigatable: true,
            kendoKeydown: function(e) {
                fired = true;
                e.preventKendoKeydown = true;
            }
        });

        pager.element.trigger({ type: "keydown", keyCode: kendo.keys.RIGHT });

        assert.isTrue(fired);
    });
});
