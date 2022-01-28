(function () {
    describe("MultiSelect AngularJS integration", function () {
        afterEach(function() {
             kendo.destroy(Mocha.fixture);
        });

    ngTest("multiselect recognizes selected primitive items with k-ng-model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ "red", "green", "blue" ];
            $scope.selectedColors = [ "red", "green" ];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multiselect k-ng-model=selectedColors k-data-source=colors></select></div>');
    },

    function() {
        assert.equal(JSON.stringify(Mocha.fixture.find("select").getKendoMultiSelect().value()), JSON.stringify([ "red", "green" ]));
    });

    ngTest("multiselect recognizes selected object items with k-ng-model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = [ $scope.colors[0], $scope.colors[1] ];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multiselect k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        assert.equal(JSON.stringify(Mocha.fixture.find("select").getKendoMultiSelect().dataItems()), JSON.stringify([ { color: "red" }, { color: "green" } ]));
    });

    ngTest("multiselect works with data-value-primitive in k-ng-model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = [ "red", "green" ];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multiselect k-value-primitive="true" k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        assert.equal(JSON.stringify(Mocha.fixture.find("select").getKendoMultiSelect().value()), JSON.stringify(["red", "green"]));
    });

    ngTest("multiselect returns primitives to model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = [ $scope.colors[0], $scope.colors[1] ];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multiselect k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var multiSelect = Mocha.fixture.find("select").getKendoMultiSelect();
        var scope = multiSelect.element.scope();
        multiSelect.value([ 'blue' ]);
        multiSelect.trigger("change");
        assert.equal(JSON.stringify(scope.selectedColors), JSON.stringify([ { color: 'blue' }]));
    });

    ngTest("multiselect returns primitives to model with primitive", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = [ "red", "green" ];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multiselect k-value-primitive="true" k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var multiSelect = Mocha.fixture.find("select").getKendoMultiSelect();
        var scope = multiSelect.element.scope();
        multiSelect.value([ 'blue' ]);
        multiSelect.trigger("change");
        assert.equal(JSON.stringify(scope.selectedColors), JSON.stringify([ 'blue' ]));
    });

    ngTest("multiselect returns empty array when no value is set", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = [ $scope.colors[0], $scope.colors[1] ];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multiselect k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var multiSelect = Mocha.fixture.find("select").getKendoMultiSelect();
        var scope = multiSelect.element.scope();
        multiSelect.value([]);
        multiSelect.trigger("change");
        assert.equal(JSON.stringify(scope.selectedColors), JSON.stringify([]));
    });

    ngTest("multiselect with autoBind:false fetches when value is primitive", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColors = ["green"];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multiselect k-value-primitive="true" k-auto-bind="false" k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var multiSelect = Mocha.fixture.find("select").getKendoMultiSelect();

        assert.equal(multiSelect.value()[0], "green");
        assert.equal(multiSelect.listView.bound(), true);
    });

    ngTest("multiselect honors autoBind:false option when valuePrimitive is false", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red" }, { color: "green" }, { color: "blue" } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors });
            $scope.selectedColors = [ colors[0], colors[1] ];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multiselect k-auto-bind="false" k-ng-model=selectedColors k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var multiSelect = Mocha.fixture.find("select").getKendoMultiSelect();
        var values = multiSelect.value();

        assert.equal(values.length, 2);
        assert.equal(values[0], "red");
        assert.equal(values[1], "green");

        assert.equal(multiSelect.dataSource.view().length, 2);
    });

    ngTest("multiselect compiles tag templates", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectedColors = [ "red", "green" ];

            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
                tagTemplate: "#:data# - {{text}}",
                valuePrimitive: true
            };

            $scope.text = "My text";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multiselect k-ng-model=selectedColors k-options=selectOptions></select></div>');
    },

    function() {
        var tags = Mocha.fixture.find("select").getKendoMultiSelect().tagList.children();
        assert.equal(tags.eq(0).children("span:first").text(), "red - My text");
        assert.equal(tags.eq(1).children("span:first").text(), "green - My text");
    });

    ngTest("multiselect compiles item templates", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectedColors = [ "red", "green" ];

            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
                itemTemplate: "{{dataItem}} - {{text}}",
                valuePrimitive: true
            };

            $scope.text = "My text";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multiselect k-ng-model=selectedColors k-options=selectOptions></select></div>');
    },

    function() {
        var items = Mocha.fixture.find("select").getKendoMultiSelect().items();
        assert.equal($(items[0]).text(), "red - My text");
        assert.equal($(items[1]).text(), "green - My text");
        assert.equal($(items[2]).text(), "blue - My text");
    });

    ngTest("multiselect initializes with a undefined model value", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {

            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
                itemTemplate: "{{dataItem}} - {{text}}",
                valuePrimitive: true
            };
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multiselect k-ng-model="object.selectedColors" k-options=selectOptions></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoMultiSelect();

        assert.isOk(widget);
    });

    //ng-model

    ngTest("multiselect with autoBind:false skips binding when value is null", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = null;
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multi-select k-auto-bind="false" ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoMultiSelect();

        assert.equal(widget.listView.bound(), false);
        assert.equal(widget.value(), "");
    });

    //header&footer

    ngTest("multiselect compiles header template", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectedColors = [ "red", "green" ];

            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
                headerTemplate: "<div>{{text}}<div>",
                valuePrimitive: true
            };

            $scope.text = "My text";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multi-select k-ng-model=selectedColors k-options=selectOptions></select></div>');
    },

    function() {
        var header = Mocha.fixture.find("select").getKendoMultiSelect().header;
        assert.equal(header.text(), "My text");
    });

    ngTest("multiselect compiles footer template", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectedColors = [ "red", "green" ];

            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
                footerTemplate: "<div>{{text}}<div>",
                valuePrimitive: true
            };

            $scope.text = "My text";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multi-select k-ng-model=selectedColors k-options=selectOptions></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoMultiSelect();
        assert.equal(widget.footer.text(), "My text");
    });

    ngTest("virtualized multiselect updates model on change", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectData = [
                {ModelNo: "100 HP"},
                {ModelNo: "105 HP"},
                {ModelNo: "110 HP"},
                {ModelNo: "115 HP"},
                {ModelNo: "120 HP"},
                {ModelNo: "125 HP"}
            ];

            $scope.dataSource = new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        setTimeout(function() {
                            options.success($scope.selectData.slice());
                        });
                    }
                },
                pageSize: 5
            });

            $scope.selectOptions = {
                virtual: {
                    itemHeight: 26,
                    valueMapper: function(options) { options.success(null); }
                },
                height: 150,
                dataTextField: "ModelNo",
                dataValueField: "Id",
                dataSource: $scope.dataSource
            };

            $scope.selectedModels = [];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-multi-select k-ng-model=selectedModels k-options=selectOptions></select></div>');
    },

    function(done) {
        var widget = Mocha.fixture.find("select").getKendoMultiSelect();
        var scope = widget.element.scope();

        widget.open();
        widget.ul.children(":first").click();

        setTimeout(function() {
            assert.equal(scope.selectedModels.length, 1);
            done();
        }, 100);
    }, true);
    });
}());
