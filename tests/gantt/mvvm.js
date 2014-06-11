(function() {
    var GanttDataSource = kendo.data.GanttDataSource;
    var GanttDependencyDataSource = kendo.data.GanttDependencyDataSource;
    var setupDataSource = function(data) {
        return new GanttDataSource({
            data: data,
            schema: {
                model: {
                    id: "id"
                }
            }
        });
    };
    var setupDependencyDataSource = function(data) {
        return new GanttDependencyDataSource({
            data: data,
            schema: {
                model: {
                    id: "id"
                }
            }
        });
    };

    module("Gantt", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("dependencies datasource can be bound through MVVM", function() {
        QUnit.fixture.append("<div data-role='gantt' data-bind='dependencies: dependencies' />");

        kendo.bind(QUnit.fixture, {
            dependencies: setupDependencyDataSource([
                { id: 42 }
            ])
        });

        var gantt = QUnit.fixture.find("[data-role=gantt]").data("kendoGantt");

        equal(gantt.dependencies.data().length, 1);
        equal(gantt.dependencies.data()[0].id, 42);
    });

})();
