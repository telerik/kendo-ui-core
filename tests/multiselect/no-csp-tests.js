(function() {
    var Model = kendo.data.Model, dom;

    describe('multiselect MVVM - No CSP', function() {
        beforeEach(function() {
            window.multiSelectDataBound = function() {
                assert.isOk(true);
            };

            Mocha.fixture.html('<script id="template" type="text/x-kendo-template"> \
               <strong>#:text#</strong> \
            </script> \
            <script id="template-with-attributes" type="text/x-kendo-template"> \
                <strong data-bind="text:text"></strong> \
            </script>');
        });

        afterEach(function() {
            kendo.destroy(dom);
        });


        it("popup option can be successfully set through data attribute", function() {
            dom = $('<select data-popup="{ origin: \'top left\', position: \'bottom left\' }" data-role="multiselect" />');

            var observable = kendo.observable({});

            kendo.bind(dom, observable);
            var multiselect = dom.data("kendoMultiSelect");

            assert.equal(multiselect.options.popup.origin, "top left");
            assert.equal(multiselect.options.popup.position, "bottom left");
        });


        it("destroying binding targets when the datasource changes", function() {
            dom = $('<select data-role="multiselect" data-item-template="template-with-attributes" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }] });

            kendo.bind(dom, observable);
            dom.data("kendoMultiSelect").refresh();

            assert.equal(observable.items[0]._events["change"].length, 2); //1 for the text binding and 1 for the ObservableArray
        });

        it("updating an item from the data source updates the corresponding multiselect item", function() {
            dom = $('<select data-role="multiselect" data-item-template="template-with-attributes" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            observable.items[0].set("text", "baz");

            assert.equal(dom.data("kendoMultiSelect").ul.children().eq(0).text().trim(), "baz");
        });

        it("binding template containing binding attributes", function() {
            dom = $('<select data-role="multiselect" data-item-template="template-with-attributes" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoMultiSelect").ul.children().eq(0).find(".k-list-item-text").html().trim(), '<strong data-bind="text:text">foo</strong>');
        });

        it("binding template", function() {
            dom = $('<select data-item-template="template" data-role="multiselect" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoMultiSelect").ul.children().eq(0).find(".k-list-item-text").html().trim(), "<strong>foo</strong>");
        });
    });
}());
