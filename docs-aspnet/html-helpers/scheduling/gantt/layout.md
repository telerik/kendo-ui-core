---
title: Layout
page_title: Layout
description: "Learn more about the layout of the Telerik UI Gantt HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_gantt_layout_aspnetcore
position: 2
---

# Layout

The layout of the Gantt consists of a GanttList and a Timeline sections. They are divided by a splitbar, which allows increasing the width of one of the sections at the expense of the other. 

## GanttList

The GanttList of the Gantt extends the TreeList widget and offers its functionality. For more details on the configuration and features of the TreeList, refer to its documentation and demos.

* [TreeList Documentation](https://docs.telerik.com/kendo-ui/controls/data-management/treelist/overview)
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

    // Place this after the Gantt for {{ site.framework }} declaration.
    <script>
        $(document).ready(function() {
            // The Name() of the Gantt is used to get its client-side instance.
            var gantt = $("#gantt").data("kendoGantt");
            // Get a reference to the GanttList.
            var ganttList = gantt.list;
        });
    </script>
    
## Timeline

The Timeline section visualizes the tasks and diplays start and end dates, progress, resources, and dependency relationships between tasks. The Timeline allows different ways of interaction with the tasks. You can resize, move, remove, edit, or change the dependencies of the tasks. 

## See Also

* [Basic Usage of the Gantt HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt)
* [Using the API of the Gantt HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/api)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
