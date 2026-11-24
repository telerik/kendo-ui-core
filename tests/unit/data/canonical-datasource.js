import { DataSource } from '@progress/kendo-ui/src/data/data-source.js';

describe("canonical DataSource", function() {
    it("reads local JSON data without loading the legacy compatibility entry", async function() {
        let dataSource;

        try {
            dataSource = new DataSource({ data: [{ id: 1 }] });
            await dataSource.fetch();

            assert.deepEqual(dataSource.view().map(item => item.id), [1]);
        } finally {
            if (dataSource) {
                dataSource.unbind();
            }
        }
    });
});
