(function () {
    module("ComboBox AngularJS integration", {
        teardown: function() {
             kendo.destroy(QUnit.fixture);
        }
    });

    ngTest("combobox recognizes selected primitive items with k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ "red", "green", "blue" ];
            $scope.selectedColor = "red";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-combo-box k-ng-model=selectedColor k-data-source=colors></select></div>');
    },

    function() {
        equal(QUnit.fixture.find("select").getKendoComboBox().value(), "red");
    });

    ngTest("combobox recognizes custom primitive with k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ "red", "green", "blue" ];
            $scope.selectedColor = "black";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-combo-box k-ng-model=selectedColor k-data-source=colors></select></div>');
    },

    function() {
        equal(QUnit.fixture.find("select").getKendoComboBox().value(), "black");
    });

    ngTest("combobox recognizes selected object items with k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = $scope.colors[0];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-combo-box k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        equal(JSON.stringify(QUnit.fixture.find("select").getKendoComboBox().dataItem()), JSON.stringify({ color: "red" }));
    });

    ngTest("combobox works with data-value-primitive in k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "red";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-combo-box k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        equal(QUnit.fixture.find("select").getKendoComboBox().value(), "red");
    });

    ngTest("combobox works with data-value-primitive and custom value in k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "black";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-combo-box k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        equal(QUnit.fixture.find("select").getKendoComboBox().value(), "black");
    });

    ngTest("combobox returns objects to model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = $scope.colors[0];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-combo-box k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var combobox = QUnit.fixture.find("select").getKendoComboBox();
        var scope = combobox.element.scope();
        combobox.value('blue');
        combobox.trigger('change');
        equal(JSON.stringify(scope.selectedColor), JSON.stringify({ color: 'blue' }));
    });

    ngTest("combobox returns null when custom value", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = $scope.colors[0];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-combo-box k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var combobox = QUnit.fixture.find("select").getKendoComboBox();
        var scope = combobox.element.scope();
        combobox.value('black');
        combobox.trigger('change');
        equal(scope.selectedColor, null);
    });

    ngTest("combobox returns primitives to model with primitive", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "red";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-combo-box k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var combobox = QUnit.fixture.find("select").getKendoComboBox();
        var scope = combobox.element.scope();
        combobox.value('blue');
        combobox.trigger("change");
        equal(JSON.stringify(scope.selectedColor), JSON.stringify('blue'));
    });

    ngTest("combobox with autoBind:false skips binding when value is set", 3, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = colors[1];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-combo-box k-auto-bind="false" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = QUnit.fixture.find("select").getKendoComboBox();

        equal(widget.listView.bound(), false);
        equal(widget.value(), 2);
        equal(widget.text(), "green");
    });

    ngTest("combobox with autoBind:false and primitiveValue:true binds source if selected text is missing", 3, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = 2;
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-combo-box k-auto-bind="false" k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = QUnit.fixture.find("select").getKendoComboBox();

        equal(widget.dataSource.view().length, 3);
        equal(widget.value(), 2);
        equal(widget.text(), "green");
    });

    ngTest("combobox with autoBind:false sets text to options.text", 3, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = 2;
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-combo-box k-auto-bind="false" k-value-primitive="true" k-text="\'custom text\'" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = QUnit.fixture.find("select").getKendoComboBox();

        equal(widget.listView.bound(), false);
        equal(widget.value(), 2);
        equal(widget.text(), "custom text");
    });

    //ng-model

    ngTest("combobox with autoBind:false skips binding when value is null", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = null;
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-combo-box k-auto-bind="false" ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = QUnit.fixture.find("select").getKendoComboBox();

        equal(widget.listView.bound(), false);
        equal(widget.value(), "");
    });


    ngTest("combobox's input should inherit maxlength attribute", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = 2;
        });

        QUnit.fixture.html('<div ng-controller=mine><select maxlength="3" kendo-combo-box k-auto-bind="false" k-value-primitive="true" k-text="\'custom text\'" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = QUnit.fixture.find("select").getKendoComboBox();

        equal(widget.input.attr("maxlength"), 3);
    });
})();
