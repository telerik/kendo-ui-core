(function() {
    var dom;
    var instance;

    module("TreeList AngularJS support", {
        setup: function() {
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);

            dom = instance = null;
        }
    });

    function createTreeList(options) {
        dom = $("<div />").appendTo(QUnit.fixture);

        dom.kendoTreeList($.extend({
            dataSource: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 }
            ]
        }, options));

        instance = dom.data("kendoTreeList");
    }

    test("clears and compiles angular bindings upon rendering rows, before dataBound", function() {
        createTreeList();

        spy(instance, "angular");

        instance.bind("dataBound", function() {
            equal(instance.calls("angular"), 2);
            equal(instance.args("angular", 0)[0], "cleanup");
            equal(instance.args("angular", 1)[0], "compile");
        });

        instance.dataSource.data([ { id: 1, parentId: null } ]);
    });

    test("preventing dataBinding does not clean up angular directives", function() {
        createTreeList();

        spy(instance, "angular");

        instance.bind("dataBinding", function(e) {
            e.preventDefault();
        });

        instance.dataSource.data([ { id: 1, parentId: null } ]);

        equal(instance.calls("angular"), 0);
    });

    ngTest("repaint templates when changing data source", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: {
                    data: [
                        { id: 1, parentId: null, text: "foo" }
                    ]
                },
                columns: [
                    { field: "id" },
                    { template: "{{dataItem.text}}" }
                ]
            };
        });

        $("<div ng-controller=mine><div kendo-treelist='tree' k-options='options'></div></div>").appendTo(QUnit.fixture);
    },

    function() {
        var treeList = QUnit.fixture.find('[data-role=treelist]').getKendoTreeList();
        var dataSource = new kendo.data.TreeListDataSource({
                data: [
                    { id: 2, parentId: null, text: "bar" }
                ]
            });

        treeList.setDataSource(dataSource);

        var tds = treeList.content.find("td");
        equal(tds.eq(0).text(), "2");
        equal(tds.eq(1).text(), "bar");
    });
})();
