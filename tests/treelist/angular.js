(function() {
    var dom;
    var instance;

    module("TreeList AngularJS support", {
        setup: function() {
           dom = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);

            dom = instance = null;
        }
    });

    function createTreeList(options) {
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
})();
