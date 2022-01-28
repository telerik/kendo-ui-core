(function() {
    describe("AutoComplete AngularJS integration", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        ngTest("autocomplete recognizes selected primitive items with k-ng-model", function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.colors = ["red", "green", "blue"];
                $scope.selectedColors = ["red", "green"];
            });

            Mocha.fixture.html('<div ng-controller=mine><input kendo-auto-complete k-ng-model=selectedColors k-data-source=colors></div>');
        },

            function() {
                assert.equal(Mocha.fixture.find("input").getKendoAutoComplete().value(), "red,green");
            });

        ngTest("autocomplete recognizes selected object items with k-ng-model", function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.colors = [{ color: "red" }, { color: "green" }, { color: "blue" }];
                $scope.selectedColors = ["red", "green"];
            });

            Mocha.fixture.html('<div ng-controller=mine><input kendo-autocomplete k-value-primitive=true k-ng-model=selectedColors k-data-source=colors k-data-text-field="\'color\'"></div>');
        },

            function() {
                assert.equal(Mocha.fixture.find("input").getKendoAutoComplete().value(), "red,green");
            });

        ngTest("autocomplete accepts single selected object with k-ng-model if separator is not defined", function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.colors = [{ color: "red" }, { color: "green" }, { color: "blue" }];
                $scope.selectedColors = "green";
            });

            Mocha.fixture.html('<div ng-controller=mine><input kendo-autocomplete k-ng-model=selectedColors k-data-source=colors k-data-text-field="\'color\'"></div>');
        },

            function() {
                assert.equal(Mocha.fixture.find("input").getKendoAutoComplete().value(), "green");
            });

        ngTest("autocomplete works with data-value-primitive in k-ng-model", function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.colors = [{ color: "red" }, { color: "green" }, { color: "blue" }];
                $scope.selectedColors = ["red", "green"];
            });

            Mocha.fixture.html('<div ng-controller=mine><input kendo-autocomplete k-value-primitive="true" k-ng-model=selectedColors k-data-source=colors k-data-text-field="\'color\'"></div>');
        },

            function() {
                assert.equal(Mocha.fixture.find("input").getKendoAutoComplete().value(), "red,green");
            });

        ngTest("autocomplete returns primitives to model", function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.colors = [{ color: "red" }, { color: "green" }, { color: "blue" }];
                // $scope.selectedColors = [ $scope.colors[0], $scope.colors[1] ];
            });

            Mocha.fixture.html('<div ng-controller=mine><input kendo-autocomplete k-ng-model=selectedColors k-data-source=colors k-data-text-field="\'color\'"></div>');
        },

            function() {
                var autocomplete = Mocha.fixture.find("input").getKendoAutoComplete();
                var scope = autocomplete.element.scope();
                autocomplete.dataSource.fetch();
                autocomplete.value('blue');
                autocomplete.trigger('change');
                assert.equal(JSON.stringify(scope.selectedColors), JSON.stringify("blue"));
            });

        ngTest("autocomplete returns primitives to model with primitive", function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.colors = [{ color: "red" }, { color: "green" }, { color: "blue" }];
                $scope.selectedColors = ["red", "green"];
            });

            Mocha.fixture.html('<div ng-controller=mine><input kendo-autocomplete k-value-primitive="true" k-ng-model=selectedColors k-data-source=colors k-data-text-field="\'color\'"></div>');
        },

            function() {
                var autocomplete = Mocha.fixture.find("input").getKendoAutoComplete();
                var scope = autocomplete.element.scope();
                autocomplete.dataSource.fetch();
                autocomplete.value('blue');
                autocomplete.trigger("change");
                assert.equal(JSON.stringify(scope.selectedColors), JSON.stringify('blue'));
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

    describe("Virtualized AutoComplete AngularJS integration", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        var CONTAINER_HEIGHT = 200;

        function scroll(element, height) {
            element.scrollTop(height);
            element.trigger("scroll");
        }

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
                        options.success({ data: generateData(options.data), total: 300 });
                    }
                },
                serverFiltering: true,
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            });
        }

        ngTest("autocomplete sets selected data item to the model", function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.options = {
                    close: function(e) { e.preventDefault(); },
                    animation: false,
                    height: CONTAINER_HEIGHT,
                    dataTextField: "text",
                    virtual: {
                        valueMapper: function(o) { o.success(o.value); },
                        itemHeight: 20
                    }
                };
                $scope.data = createAsyncDataSource();
                $scope.selectedColors = [];
            });

            Mocha.fixture.html('<div ng-controller=mine><input kendo-autocomplete k-ng-model=selectedColors k-data-source=data k-options="options"></div>');
        },

            function(start) {
                var autocomplete = Mocha.fixture.find("input").getKendoAutoComplete();
                var scope = autocomplete.element.scope();

                autocomplete.one("dataBound", function() {
                    autocomplete.one("dataBound", function() {
                        var item40 = autocomplete.listView.content.find("li")
                            .filter(function(_, li) { return $(li).data("offsetIndex") == 40 });

                        item40.click();

                        setTimeout(function() {
                            start();
                            assert.equal(scope.selectedColors, "Item 40");
                        }, 100);
                    });

                    scroll(autocomplete.listView.content, 4 * CONTAINER_HEIGHT);
                });

                autocomplete.search("Item");
            },
            true);
    });
}());
