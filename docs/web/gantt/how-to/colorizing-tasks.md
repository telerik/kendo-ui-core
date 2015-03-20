---
title: Colorizing tasks
page_title: Colorizing tasks
description: Colorizing tasks
---

# Colorizing tasks

The example below demonstrates how to colorize each task based on a condition.

#### Example:

```html
    <div id="gantt"></div>

    <script>
      function onDataBound() {
        var gantt = this;

        gantt.element.find(".k-task").each(function(e) {
          var dataItem = gantt.dataSource.getByUid($(this).attr("data-uid"));

          // colorize task per business requirements
          if (dataItem.percentComplete < .5) {
            this.style.backgroundColor = "#f99";
          } else {
            this.style.backgroundColor = "#9f9";
          }
        });
      }

      $(document).ready(function() {
        var serviceRoot = "http://demos.telerik.com/kendo-ui/service";
        var tasksDataSource = new kendo.data.GanttDataSource({
          batch: false,
          transport: {
            read: {
              url: serviceRoot + "/GanttTasks",
              dataType: "jsonp"
            },
            update: {
              url: serviceRoot + "/GanttTasks/Update",
              dataType: "jsonp"
            },
            destroy: {
              url: serviceRoot + "/GanttTasks/Destroy",
              dataType: "jsonp"
            },
            create: {
              url: serviceRoot + "/GanttTasks/Create",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read") {
                return { models: kendo.stringify(options.models || [options]) };
              }
            }
          },
          schema: {
            model: {
              id: "id",
              fields: {
                id: { from: "ID", type: "number" },
                orderId: { from: "OrderID", type: "number", validation: { required: true } },
                parentId: { from: "ParentID", type: "number", defaultValue: null, validation: { required: true } },
                start: { from: "Start", type: "date" },
                end: { from: "End", type: "date" },
                title: { from: "Title", defaultValue: "", type: "string" },
                percentComplete: { from: "PercentComplete", type: "number" },
                summary: { from: "Summary", type: "boolean" },
                expanded: { from: "Expanded", type: "boolean", defaultValue: true }
              }
            }
          }
        });

        var dependenciesDataSource = new kendo.data.GanttDependencyDataSource({
          transport: {
            read: {
              url: serviceRoot + "/GanttDependencies",
              dataType: "jsonp"
            },
            update: {
              url: serviceRoot + "/GanttDependencies/Update",
              dataType: "jsonp"
            },
            destroy: {
              url: serviceRoot + "/GanttDependencies/Destroy",
              dataType: "jsonp"
            },
            create: {
              url: serviceRoot + "/GanttDependencies/Create",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return { models: kendo.stringify(options.models) };
              }
            }
          },
          schema: {
            model: {
              id: "id",
              fields: {
                id: { from: "ID", type: "number" },
                predecessorId: { from: "PredecessorID", type: "number" },
                successorId: { from: "SuccessorID", type: "number" },
                type: { from: "Type", type: "number" }
              }
            }
          }
        });

        $("#gantt").kendoGantt({
          dataSource: tasksDataSource,
          dependencies: dependenciesDataSource,
          views: [
            "day",
            { type: "week", selected: true },
            "month"
          ],
          columns: [
            { field: "id", title: "ID", width: 50 },
            { field: "title", title: "Title", editable: true, sortable: true },
            { field: "start", title: "Start Time", format: "{0:MM/dd/yyyy}", width: 100, editable: true, sortable: true },
            { field: "end", title: "End Time", format: "{0:MM/dd/yyyy}", width: 100, editable: true, sortable: true }
          ],
          height: 700,

          showWorkHours: false,
          showWorkDays: false,

          snap: false,

          dataBound: onDataBound
        });
      });

    </script>
```
