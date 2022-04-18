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
            assert.equal(element.find(".k-pager-sizes select").attr("aria-label"), "1");
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

        it("page link buttons should have aria-label", function() {
            var element = setup(null, { navigatable: true, numeric: true });
            pager.page(1);
            assert.equal(element.find(".k-pager-numbers .k-link:eq(0)").attr("aria-label"), "Page 1");
        });

        it("selected page button should have role button", function() {
            var element = setup(null, { navigatable: true, numeric: true });
            pager.page(1);
            assert.equal(element.find(".k-pager-numbers .k-link:eq(0)").attr("role"), "button");
        });

        it("pager element should have aria-label", function() {
            var element = setup(null, { navigatable: true, numeric: true });
            pager.page(1);
            assert.equal(element.attr("aria-label"), "Page navigation, page 1 of 5");
        });

        it("pager dropdown should have aria-label", function() {
            var element = setup(null, { navigatable: true, pageSizes: [1, 2] });
            pager.page(1);
            assert.equal(element.find(".k-dropdownlist").attr("aria-label"), "Page sizes drop down");
        });

        it("when navigatable is not enabled prev/next buttons don't have aria-describedby", function() {
            var element = setup(null, { pageSizes: [1, 2], buttonCount: 2 });
            pager.page(1);
            var ariaFound = false;
            var buttons = element.find("> a");

            buttons.each(function () {
                var button = $(this);
                if (button.attr("aria-describedby")) {
                    ariaFound=true;
                }
            })

            assert.isNotOk(ariaFound);
        });
    });

    describe("kendo.ui.Pager Axe", function() {
        beforeEach(function() {
        });

        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("pager is accessible", function(done) {
            var element = setup(null, { navigatable: true, input: true,
                numeric: true,  refresh: true,  pageSizes: [1, 2] });

            element.getKendoPager().dataSource.fetch();

            axeRunFixture(done);
        });
    });
}());
