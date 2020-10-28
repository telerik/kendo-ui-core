---
title: Layout
page_title: jQuery Gantt Documentation | Layout
description: "Get started with the jQuery Gantt by Kendo UI and learn more about its layout."
slug: layout_kendoui_gantt
position: 2
---

# Layout

The layout of the Gantt consists of a GanttList and a Timeline sections. They are divided by a splitbar, which allows increasing the width of one of the sections at the expense of the other. 

## GanttList

The GanttList of the Gantt extends the TreeList widget and offers its functionality. For more details on the configuration and features of the TreeList, refer to its documentation and demos.

* [TreeList Documentation]({% slug overview_kendoui_treelist_widget %})
* [TreeList Demos](https://demos.telerik.com/kendo-ui/treelist/index)
* [TreeList API](/api/javascript/ui/treelist)

The following features of the TreeList are currently not supported by the GanttList.

* Locked columns
* Column commands
* Encoded column value
* Column footer template
* Binding the parent column, in scenarios that involve grouped columns
* More than one level of grouping

### Getting a Reference to the GanttList

The example below demonstrates how to get a reference to a GanttList.

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    // Get a reference to the Gantt instance.
    var gantt = $("#gantt").data("kendoGantt");
    // Get a reference to the GanttList.
    var ganttList = gantt.list;
    </script>

## Timeline

The Timeline section visualizes the tasks and diplays start and end dates, progress, resources, and dependency relationships between tasks. The Timeline allows different ways of interaction with the tasks. You can resize, move, remove, edit, or change the dependencies of the tasks. 

## See Also

* [Gantt Columns]({% slug columns_kendoui_gantt %})
* [Basic Usage of the Gantt (Demo)](https://demos.telerik.com/kendo-ui/gantt/index)
* [Using the API of the Gantt (Demo)](https://demos.telerik.com/kendo-ui/gantt/api)
