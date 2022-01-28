(function () {
    describe("DropDownList AngularJS integration", function () {
        afterEach(function() {
             kendo.destroy(Mocha.fixture);
        });

    ngTest("dropdown recognizes selected primitive items with k-ng-model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ "red", "green", "blue" ];
            $scope.selectedColor = "green";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model=selectedColor k-data-source=colors></select></div>');
    },

    function() {
        assert.equal(Mocha.fixture.find("select").getKendoDropDownList().value(), "green");
    });

    ngTest("dropdown recognizes selected object items with k-ng-model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = $scope.colors[1];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        assert.equal(JSON.stringify(Mocha.fixture.find("select").getKendoDropDownList().dataItem()), JSON.stringify({ color: "green" }));
    });

    ngTest("dropdown works with data-value-primitive in k-ng-model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "green";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        assert.equal(Mocha.fixture.find("select").getKendoDropDownList().value(), "green");
    });

    ngTest("dropdown returns primitives to model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = $scope.colors[1];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var dropdown = Mocha.fixture.find("select").getKendoDropDownList();
        var scope = dropdown.element.scope();
        dropdown.value('blue');
        dropdown.trigger('change');
        assert.equal(JSON.stringify(scope.selectedColor), JSON.stringify({ color: 'blue' }));
    });

    ngTest("dropdown returns primitives to model with primitive", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "green";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var dropdown = Mocha.fixture.find("select").getKendoDropDownList();
        var scope = dropdown.element.scope();
        dropdown.value('blue');
        dropdown.trigger("change");
        assert.equal(JSON.stringify(scope.selectedColor), JSON.stringify('blue'));
    });

    ngTest("dropdown selects value with '0'", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: 1 }, { color: 0 }, { color: 2 } ];
            $scope.selectedColor = 0;
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var dropdown = Mocha.fixture.find("select").getKendoDropDownList();
        assert.equal(dropdown.select(), 1);
    });

    ngTest("dropdown sets optionLabel object to the model", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "green";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-value-primitive="false" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'" k-data-text-field="\'color\'" k-option-label="\'select...\'"></select></div>');
    },

    function() {
        var dropdown = Mocha.fixture.find("select").getKendoDropDownList();
        var scope = dropdown.element.scope();
        dropdown.value('blue');
        dropdown.trigger("change");

        dropdown.value('');
        dropdown.trigger("change");

        assert.equal(JSON.stringify(scope.selectedColor), '{"color":""}');
    });

    ngTest("dropdown with autoBind:false skips binding when value is set", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = colors[1];
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-auto-bind="false" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoDropDownList();

        assert.equal(widget.listView.bound(), false);
        assert.equal(widget.value(), 2);
        assert.equal(widget.text(), "green");
    });

    ngTest("dropdown with autoBind:false and primitiveValue:true binds source if selected text is missing", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = 2;
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-auto-bind="false" k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoDropDownList();

        assert.equal(widget.dataSource.view().length, 3);
        assert.equal(widget.value(), 2);
        assert.equal(widget.text(), "green");
    });

    ngTest("dropdown with autoBind:false sets text to options.text", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = 2;
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-auto-bind="false" k-value-primitive="true" k-text="\'custom text\'" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoDropDownList();

        assert.equal(widget.listView.bound(), false);
        assert.equal(widget.value(), 2);
        assert.equal(widget.text(), "custom text");
    });

    ngTest("dropdown updates the model on select during data-binding", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = [ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ];

            $scope.selectedColor = null;
            $scope.options = {
                autoBind: false,
                dataTextField: "color",
                dataValueField: "value",
                dataSource: {
                    data: colors
                },
                dataBound: function(e) {
                    $scope.$apply(function() {
                        e.sender.select(2);
                        e.sender.trigger("change");
                    });
                }
            }
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-options="options" k-ng-model=selectedColor></select></div>');
    },

    function() {
        var dropdown = Mocha.fixture.find("select").getKendoDropDownList();
        var scope = dropdown.element.scope();

        dropdown.open();

        assert.equal(scope.selectedColor.value, 3);
        assert.equal(scope.selectedColor.color, "blue");
    });

    //ng-model
    //
    ngTest("dropdownlist respects model value", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = 2;
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'" k-value-primitive="true"></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoDropDownList();

        assert.equal(widget.value(), 2);
    });

    ngTest("dropdownlist with autoBind:false skips binding when value is null", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = null;
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-auto-bind="false" ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoDropDownList();

        assert.equal(widget.listView.bound(), false);
        //assert.equal(widget.value(), "");
    });

    ngTest("dropdownlist respects model value on reset", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.data = {
                color: null
            }

            $scope.clear = function() {
                $scope.$apply(function() {
                    $scope.data.color = null;
                });
            };
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model="data.color" k-value-primitive="true" k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var dropdown = Mocha.fixture.find("select").getKendoDropDownList();
        var scope = dropdown.element.scope();

        dropdown.select(1);
        dropdown.trigger("change");

        scope.clear();

        assert.equal(dropdown.value(), "");
    });

    ngTest("dropdownlist compiles item template", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectedColors = [ "red", "green" ];

            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
                template: "{{dataItem}} - {{text}}",
                valuePrimitive: true
            };

            $scope.text = "My text";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model=selectedColors k-options=selectOptions></select></div>');
    },

    function() {
        var items = Mocha.fixture.find("select").getKendoDropDownList().items();
        assert.equal($(items[0]).text(), "red - My text");
        assert.equal($(items[1]).text(), "green - My text");
        assert.equal($(items[2]).text(), "blue - My text");
    });

    ngTest("dropdownlist compiles optionLabel template", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectedColors = [ "red", "green" ];

            $scope.selectOptions = {
                optionLabel: "Select...",
                optionLabelTemplate: "{{dataItem}} - {{text}}",
                dataSource: [ "red", "green", "blue" ],
                valuePrimitive: true
            };

            $scope.text = "My text";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model=selectedColors k-options=selectOptions></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoDropDownList();
        var optionLabel = widget.optionLabel;

        assert.equal(optionLabel.text(), "Select... - My text");
    });

    ngTest("dropdownlist compiles header template", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectedColors = [ "red", "green" ];

            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
                headerTemplate: "<div>{{text}}<div>",
                valuePrimitive: true
            };

            $scope.text = "My text";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model=selectedColors k-options=selectOptions></select></div>');
    },

    function() {
        var header = Mocha.fixture.find("select").getKendoDropDownList().header;
        assert.equal(header.text(), "My text");
    });

    ngTest("dropdownlist compiles footer template", function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.selectedColors = [ "red", "green" ];

            $scope.selectOptions = {
                dataSource: [ "red", "green", "blue" ],
                footerTemplate: "<div>{{text}}<div>",
                valuePrimitive: true
            };

            $scope.text = "My text";
        });

        Mocha.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model=selectedColors k-options=selectOptions></select></div>');
    },

    function() {
        var widget = Mocha.fixture.find("select").getKendoDropDownList();
        var scope = widget.element.scope();

        var footer = Mocha.fixture.find("select").getKendoDropDownList().footer;
        assert.equal(footer.text(), "My text");
    });
    });
}());
