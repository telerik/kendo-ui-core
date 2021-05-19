(function () {
    describe("ComboBox AngularJS integration", function () {
        afterEach(function() {
             kendo.destroy(Mocha.fixture);
        });

    ngTest("combobox recognizes selected primitive items with k-ng-model", 
        function() {
            angular.module("kendo.tests").controller("mine", function($scope) {
                $scope.colors = [ "red", "green", "blue" ];
                $scope.selectedColor = "red";
            });

            Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-ng-model=selectedColor k-data-source=colors></select></div>');
        },
        function() {
            assert.equal(Mocha.fixture.find("select").getKendoComboBox().value(), "red");
        }
    );

    ngTest("combobox recognizes custom primitive with k-ng-model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ "red", "green", "blue" ];
            $scope.selectedColor = "black";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-ng-model=selectedColor k-data-source=colors></select></div>');
    },

    function() {
        assert.equal(Mocha.fixture.find("select").getKendoComboBox().value(), "black");
    });

    ngTest("combobox recognizes selected object items with k-ng-model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = $scope.colors[0];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        assert.equal(JSON.stringify(Mocha.fixture.find("select").getKendoComboBox().dataItem()), JSON.stringify({ color: "red" }));
    });

    ngTest("combobox works with data-value-primitive in k-ng-model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "red";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        assert.equal(Mocha.fixture.find("select").getKendoComboBox().value(), "red");
    });

    ngTest("combobox works with data-value-primitive and custom value in k-ng-model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "black";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        assert.equal(Mocha.fixture.find("select").getKendoComboBox().value(), "black");
    });

    ngTest("combobox returns objects to model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = $scope.colors[0];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var combobox = Mocha.fixture.find("select").getKendoComboBox();
        var scope = combobox.element.scope();
        combobox.value('blue');
        combobox.trigger('change');
        assert.equal(JSON.stringify(scope.selectedColor), JSON.stringify({ color: 'blue' }));
    });

    ngTest("combobox returns null when custom value", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = $scope.colors[0];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var combobox = Mocha.fixture.find("select").getKendoComboBox();
        var scope = combobox.element.scope();
        combobox.value('black');
        combobox.trigger('change');
        assert.equal(scope.selectedColor, null);
    });

    ngTest("combobox returns primitives to model with primitive", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "red";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var combobox = Mocha.fixture.find("select").getKendoComboBox();
        var scope = combobox.element.scope();
        combobox.value('blue');
        combobox.trigger("change");
        assert.equal(JSON.stringify(scope.selectedColor), JSON.stringify('blue'));
    });

    ngTest("combobox with autoBind:false skips binding when value is set", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = colors[1];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-auto-bind="false" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoComboBox();

        assert.equal(widget.listView.bound(), false);
        assert.equal(widget.value(), 2);
        assert.equal(widget.text(), "green");
    });

    ngTest("combobox with autoBind:false and primitiveValue:true binds source if selected text is missing", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = 2;
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-auto-bind="false" k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoComboBox();

        assert.equal(widget.dataSource.view().length, 3);
        assert.equal(widget.value(), 2);
        assert.equal(widget.text(), "green");
    });

    ngTest("combobox with autoBind:false sets text to options.text", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = 2;
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-auto-bind="false" k-value-primitive="true" k-text="\'custom text\'" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoComboBox();

        assert.equal(widget.listView.bound(), false);
        assert.equal(widget.value(), 2);
        assert.equal(widget.text(), "custom text");
    });

    //ng-model

    ngTest("combobox with autoBind:false skips binding when value is null", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "", value: null }, { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = null;
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-combo-box k-auto-bind="false" ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoComboBox();

        assert.equal(widget.listView.bound(), false);
        assert.equal(widget.dataItem(), null);
    });


    ngTest("combobox's input should inherit maxlength attribute", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = 2;
        });

        Mocha.fixture.html('<div ng-controller=mine><select maxlength="3" kendo-combo-box k-auto-bind="false" k-value-primitive="true" k-text="\'custom text\'" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoComboBox();

        assert.equal(widget.input.attr("maxlength"), 3);
    });

    ngTest("combobox compiles header template", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectedColors = [ "red", "green" ];

            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
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
            $scope.selectedColors = [ "red", "green" ];

            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
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
}());
