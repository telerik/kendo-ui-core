(function() {
    var dom;

    describe("AutoComplete AngularJS integration - No CSP", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        ngTest("autocomplete compiles header template", function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.selectedColors = ["red", "green"];

                $scope.selectOptions = {
                    dataSource: ["red", "green", "blue"],
                    headerTemplate: "<div>{{text}}<div>",
                    valuePrimitive: true
                };

                $scope.text = "My text";
            });

            Mocha.fixture.html('<div ng-controller=mine><input kendo-autocomplete  k-ng-model=selectedColors k-options=selectOptions /></div>');
        },

            function() {
                var header = Mocha.fixture.find("input").getKendoAutoComplete().header;
                assert.equal(header.text(), "My text");
            });

        ngTest("autocomplete compiles footer template", function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.selectOptions = {
                    dataSource: ["red", "green", "blue"],
                    footerTemplate: "<div>{{text}}<div>",
                    valuePrimitive: true
                };

                $scope.text = "My text";
            });

            Mocha.fixture.html('<div ng-controller=mine><input kendo-autocomplete  k-ng-model=selectedColors k-options=selectOptions /></div>');
        },

            function() {
                var widget = Mocha.fixture.find("input").getKendoAutoComplete();
                widget.search("red");

                assert.equal(widget.footer.text(), "My text");
            });
    });

    describe("autocomplete mvvm - No CSP", function() {
        beforeEach(function() {
            Mocha.fixture.append(
                '<script id="template" type="text/x-kendo-template">' +
                '    <strong>#:text#</strong>' +
                '</script>' +
                '<script id="template-with-attributes" type="text/x-kendo-template">' +
                '    <strong data-bind="text:text"></strong>' +
                '</script>'
            );

            window.dataBound = function() {
                assert.isOk(true);
            };
        });
        afterEach(function() {
            delete window.dataBound;
            kendo.destroy(dom);
        });

        it("binding template", function() {
            dom = $('<input data-role="autocomplete" data-template="template" data-bind=" source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoAutoComplete").ul.children().eq(0).find(".k-list-item-text").html().trim(), "<strong>foo</strong>");
        });

        it("updating an item from the data source updates the corresponding autocomplete item", function() {
            dom = $('<input data-role="autocomplete" data-template="template-with-attributes" data-bind=" source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            observable.items[0].set("text", "baz");

            assert.equal(dom.data("kendoAutoComplete").ul.children().eq(0).text().trim(), "baz");
        });

        it("removing items from the model updates the UI", function() {
            dom = $('<input data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }, { text: "baz" }] });

            kendo.bind(dom, observable);

            dom.kendoAutoComplete();

            observable.items.splice(0, 1);

            assert.equal(dom.data("kendoAutoComplete").ul.children().length, 2);
        });

        it("popup option can be successfully set through data attribute", function() {
            dom = $('<input data-popup="{ origin: \'top left\', position: \'bottom left\' }" data-role="autocomplete" />');

            var observable = kendo.observable({});

            kendo.bind(dom, observable);
            var autocomplete = dom.data("kendoAutoComplete");

            assert.equal(autocomplete.options.popup.origin, "top left");
            assert.equal(autocomplete.options.popup.position, "bottom left");
        });

        it("binding template containing binding attributes", function() {
            dom = $('<input data-role="autocomplete" data-template="template-with-attributes" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoAutoComplete").ul.children().eq(0).find(".k-list-item-text").html().trim(), '<strong data-bind="text:text">foo</strong>');
        });

        it("destroying binding targets when the datasource changes", function() {
            dom = $('<input data-role="autocomplete" data-template="template-with-attributes" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }] });

            kendo.bind(dom, observable);
            dom.data("kendoAutoComplete").refresh();

            assert.equal(observable.items[0]._events["change"].length, 2); //1 for the text binding and 1 for the ObservableArray
        });
    });
}());
