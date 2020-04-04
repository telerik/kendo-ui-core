(function() {
    var DataSource = kendo.data.DataSource,
        pager,
        dataSource;

    function setup(dataOptions, options) {
        dataOptions = $.extend({
            data: [1, 2, 3, 4, 5],
            page: 1,
            pageSize: 1
        }, dataOptions);

        dataSource = new DataSource(dataOptions);
        options = $.extend({
            dataSource: dataSource
        }, options);
        var element = $("<div />").appendTo(Mocha.fixture).kendoPager(options);
        pager = element.data("kendoPager");
        return element;
    }

    describe('pager aria', function() {
        beforeEach(function() {
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("page size select should have aria label", function() {
            var element = setup(null, { pageSizes: [1, 2] });
            assert.equal(element.find("select").attr("aria-label"), "1");
        });

        it("refresh button should have aria label", function() {
            var element = setup(null, { refresh: true });
            assert.equal(element.find(".k-pager-refresh").attr("aria-label"), "Refresh");
        });

        it("input should have aria label", function() {
            var element = setup(null, { input: true });
            pager.page(1);

            assert.equal(element.find("input").attr("aria-label"), "1");
        });
    });
}());
