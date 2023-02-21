(function() {
    var dom;
    var instance;

    function createListView(options) {
        dom.kendoListView($.extend({
            template: () => "<div class='k-listview-item'></div>",
            navigatable: true,
            dataSource: { data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] }
        }, options));

        instance = dom.data("kendoListView");
    }

    describe("kendo.ui.ListView Pager", function() {
        beforeEach(function() {
            kendo.effects.disable();
            dom = $("<div />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);

            dom = instance = null;
        });

        it("instace is created when pageable is true", function() {
            createListView({ pageable: true });

            assert.isOk(instance.pager);
        });

        it("has the same DataSource as the ListView", function() {
            createListView({ pageable: true });

            assert.isOk(instance.pager.dataSource === instance.dataSource);
        });

        it("instance receives pageable settings from the ListView", function() {
            createListView({ pageable: { buttonCount: 42 } });

            assert.equal(instance.pager.options.buttonCount, 42);
        });

        it("uses the passed kendo.ui.Pager", function() {
            var pager = new kendo.ui.Pager(
                $("<div/>").appendTo(Mocha.fixture),
                { dataSource: new kendo.data.DataSource({ data: [] })
            });

            createListView({ pageable: pager });

            assert.equal(instance.pager, pager);
        });

        it("creates pager wrapper", function() {
            createListView({ pageable: true });

            assert.equal(instance.wrapper.find(".k-listview-pager").length, 1);
        });

        it("creates top pager wrapper with specific class", function() {
            createListView({
                pageable: {
                    position: "top"
                }
            });

            assert.equal(instance.wrapper.find(".k-listview-pager-top").length, 1);
        });

        it("does not creates pager wrapper if pageable is false", function() {
            createListView({ pageable: false });

            assert.equal(instance.wrapper.find(".k-listview-pager").length, 0);
        });

        it("pageSize of the DataSource is set from the pageable settings", function() {
            createListView({ pageable: { pageSize: 42 } });

            assert.equal(instance.dataSource.pageSize(), 42);
        });

        it("aria-setsize and aria-posinset are set on ListView items", function() {
            createListView({ pageable: { pageSize: 2 } });

            assert.equal(instance.items().first().attr("aria-setsize"), 5);
            assert.equal(instance.items().first().attr("aria-posinset"), 1);
            assert.equal(instance.items().last().attr("aria-posinset"), 2);

            instance.wrapper.find(".k-pager-numbers-wrap button:last").click();

            assert.equal(instance.items().first().attr("aria-posinset"), 5);
        });
    });
}());
