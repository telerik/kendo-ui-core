(function () {

    var element;
    var ui = kendo.ui;
    var Gantt = ui.Gantt;
    var columns;
    var gantt;

    module("Gantt column sorting", {
        setup: function() {
            element = $("<div/>").appendTo(QUnit.fixture);

            columns = [
                { field: "title", title: "Title", sortable: false },
                { field: "start", title: "Start Time", sortable: true, width: 150 },
                { field: "end", title: "End Time", sortable: true, width: 150 },
                { field: "percentComplete", title: "Task Percentage", sortable: false }
            ];

            gantt = new Gantt(element, { columns: columns });
        },
        teardown: function() {
            gantt = null;
            kendo.destroy(element);
            element.remove();
        }
    });

    test("attach sorter widget to the sortable columns", function() {
        var list = gantt.list;
        var test = function(idx, element) {
            var th = $(element);
            if (list.columns[idx].sortable) {
                ok(th.data("kendoColumnSorter"));
            } else {
                ok(!th.data("kendoColumnSorter"));
            }
        };

        list.header.find("th").each(test);
    });

    test("destroy sorter widgets on destroy", function() {
        var test = function() {
            var th = $(arguments[1]);

            ok(!th.data("kendoColumnSorter"));
        };

        gantt.destroy()

        element.find(".k-grid-header-wrap").find("th").each(test);
    });

})();
