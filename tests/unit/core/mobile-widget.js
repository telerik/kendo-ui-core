import '@progress/kendo-ui/src/kendo.data.js';
import { MobileDataBoundWidget } from '@progress/kendo-ui/src/core/base/mobile-widget.js';

describe("MobileDataBoundWidget.dataItems", function() {
    let widget;

    afterEach(function() {
        if (widget) {
            widget.dataSource.unbind();
            widget.destroy();
            widget = null;
        }
        kendo.destroy(Mocha.fixture);
    });

    it("returns items from the active DataSource when options contain an array", async function() {
        const data = [{ id: 1 }];
        const element = $("<div>").appendTo(Mocha.fixture);

        widget = new MobileDataBoundWidget(element, { dataSource: data });
        widget.dataSource = new kendo.data.DataSource({ data });
        await widget.dataSource.fetch();

        assert.deepEqual(widget.dataItems().map(item => item.id), [1]);
    });
});
