(function() {

    var element;
    var Gantt = kendo.ui.Gantt;

    module("Moving", {
        setup: function() {
            element = $("<div />");
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });

    function dragStart(gantt, target) {
        var draggable = gantt.timeline._moveDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("dragstart", {
            currentTarget: target
        });
    }

    function drag(gantt, target, offset) {
        var draggable = gantt.timeline._moveDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("drag", {
            currentTarget: target,
            x: { initialDelta: offset }
        });
    }

    test("moving task triggers movestart event", 1, function() {
        var gantt = new Gantt(element, {
            dataSource: [
                { start: new Date("2014/04/30 10:30"), end: new Date("2014/04/30 12:30") }
            ],
            moveStart: function(e) {
                equal(e.task, gantt.dataSource.at(0));
            }
        });

        var handle = element.find(".k-event").eq(0);

        dragStart(gantt, handle);
    });

}());
