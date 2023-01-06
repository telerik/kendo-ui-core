(function() {
    var dom;

    describe("ComboBox AngularJS integration - No CSP", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        ngTest("combobox compiles header template", function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.selectedColors = ["red", "green"];

                $scope.selectOptions = {
                    dataSource: ["red", "green", "blue"],
                    headerTemplate: "<div>{{text}}<div>",
                    valuePrimitive: true
                };

                $scope.text = "My text";
            });

            Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-ng-model=selectedColors k-options=selectOptions></select></div>');
        },

            function() {
                var header = Mocha.fixture.find("select").getKendoComboBox().header;
                assert.equal(header.text(), "My text");
            });

        ngTest("combobox compiles footer template", function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.selectedColors = ["red", "green"];

                $scope.selectOptions = {
                    dataSource: ["red", "green", "blue"],
                    footerTemplate: "<div>{{text}}<div>",
                    valuePrimitive: true
                };

                $scope.text = "My text";
            });

            Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-ng-model=selectedColors k-options=selectOptions></select></div>');
        },

            function() {
                var widget = Mocha.fixture.find("select").getKendoComboBox();
                var scope = widget.element.scope();

                var footer = Mocha.fixture.find("select").getKendoComboBox().footer;
                assert.equal(footer.text(), "My text");
            });
    });

    describe("combobox mvvm", function() {
        //virtuazation helpers

        function generateData(parameters) {
            var items = [];
            for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
                items.push({
                    id: i,
                    value: i,
                    text: "Item " + i
                });
            }

            return items;
        }

        function createAsyncDataSource() {
            return new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 300 });
                        }, 0);
                    }
                },
                serverPaging: true,
                serverFiltering: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            });
        }

        beforeEach(function() {
            Mocha.fixture.append(
                '<script id="template" type="text/x-kendo-template">' +
                '    <strong>#:text#</strong>' +
                '</script>' +
                '<script id="template-with-attributes" type="text/x-kendo-template">' +
                '    <strong data-bind="text:text"></strong>' +
                '</script>' +
                '<script id="headerTemplate" type="text/x-kendo-template">' +
                '    <strong>Title</strong>' +
                '</script>'
            );

            window.dataBound = function() {
                assert.isOk(true);
            };
        });
        afterEach(function() {
            delete window.dataBound;

            kendo.destroy(dom);
            kendo.destroy(Mocha.fixture);
        });

        it("binding template", function() {
            dom = $('<select data-template="template" data-role="combobox" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoComboBox").ul.children().eq(0).find(".k-list-item-text").html().trim(), "<strong>foo</strong>");
        });

        it("binding template containing binding attributes", function() {
            dom = $('<select data-role="combobox" data-template="template-with-attributes" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoComboBox").ul.children().eq(0).find(".k-list-item-text").html().trim(), '<strong data-bind="text:text">foo</strong>');
        });

        it("binding header template", function() {
            dom = $('<select data-header-template="headerTemplate" data-role="combobox" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoComboBox").list.prev()[0].outerHTML, "<strong>Title</strong>");
        });

        it("updating an item from the data source updates the corresponding combobox item", function() {
            dom = $('<select data-role="combobox" data-template="template-with-attributes" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            observable.items[0].set("text", "baz");

            assert.equal(dom.data("kendoComboBox").ul.children().eq(0).text().trim(), "baz");
        });

        it("destroying binding targets when the datasource changes", function() {
            dom = $('<select data-role="combobox" data-template="template-with-attributes" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }] });

            kendo.bind(dom, observable);
            dom.data("kendoComboBox").refresh();

            assert.equal(observable.items[0]._events["change"].length, 2); //1 for the text binding and 1 for the ObservableArray
        });

        it("triggers change after same value is being set multiple times trough the ViewModel", function(done) {
            dom = $('<input ' +
                'data-role="combobox" ' +
                'data-auto-bind="false" ' +
                'data-animation="false" ' +
                'data-text-field="text" ' +
                'data-value-field="value" ' +
                'data-virtual="{itemHeight: 20, valueMapper: function(o) { o.success(o.value); }}" ' +
                'data-value-primitive="true" ' +
                'data-bind="value:Invoice.orderId, source: ds"/>');

            var vm = kendo.observable({
                ds: createAsyncDataSource(),
                Invoice: { value: null },
                setFoo: function() {
                    this.set('Invoice', { value: 2 });
                },
                setBar: function() {
                    this.set('Invoice', { value: 2 });
                }
            });

            kendo.bind(dom, vm);

            var combo = dom.data("kendoComboBox");

            combo.dataSource.read().done(function() {
                vm.setFoo();
                vm.setBar();
                combo.bind("change", function() {
                    assert.isOk(true, "Widget change is fired");
                    assert.equal(this.value(), 3);
                    done();
                });

                combo.open();
                $("[data-offset-index=3]").trigger("click");
            });
        });

        it("popup option can be successfully set through data attribute", function() {
            dom = $('<select data-popup="{ origin: \'top left\', position: \'bottom left\' }" data-role="combobox" />');

            var observable = kendo.observable({});

            kendo.bind(dom, observable);
            var combobox = dom.data("kendoComboBox");

            assert.equal(combobox.options.popup.origin, "top left");
            assert.equal(combobox.options.popup.position, "bottom left");
        });
    });
}());
