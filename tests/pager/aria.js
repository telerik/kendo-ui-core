(function() {
    var DataSource = kendo.data.DataSource,
        pager,
        dataSource;

    function setup(dataOptions, options){
        dataOptions = $.extend({
            data: [1, 2, 3, 4, 5],
            page: 1,
            pageSize: 1
        }, dataOptions);

        dataSource = new DataSource(dataOptions);
        options = $.extend({
            dataSource: dataSource
        }, options);
        var element = $("<div />").appendTo(QUnit.fixture).kendoPager(options);
        pager = element.data("kendoPager");
        return element;
    }

    module('pager aria', {
        setup: function() {
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("page size select should have aria label", function() {
        var element = setup(null, { pageSizes: [1, 2] });
        equal(element.find("select").attr("aria-label"), "1");
    });

    test("refresh button should have aria label", function() {
        var element = setup(null, { refresh: true });
        equal(element.find(".k-pager-refresh").attr("aria-label"), "Refresh");
    });

    test("input should have aria label", function() {
        var element = setup(null, { input: true });
        pager.page(1);

        equal(element.find("input").attr("aria-label"), "1");
    });
})();
