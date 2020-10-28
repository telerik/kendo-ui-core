---
title: Overview
page_title: jQuery Gantt Documentation | Gantt Overview
description: "Get started with the jQuery Gantt by Kendo UI and learn how to initialize the widget and use its events."
slug: overview_kendoui_gantt_widget
position: 1
---

# Gantt Overview

The Gantt displays a set of tasks and dependencies which are used to visualize project-planning data.

It provides a tree-list section where the user can edit, sort and reorder the tasks in a grid-like fashion, and a time-line section where the tasks and dependencies are visualized under an adjustable time ruler. The user can resize, move, edit, and remove them. The Gantt also supports the display of the time-line section in the day, week, and month views.

* [Demo page for the Gantt](https://demos.telerik.com/kendo-ui/gantt/index)

## Basic Configuration

The `kendo.data.GanttTask` object provides the following fields:

* `end Date`&mdash;The date at which the task ends.
* Expanded `Boolean`&mdash;Indicates if the task will be expanded.
* `id Number`&mdash;The unique identifier of the Gantt task. Tasks, whose `id` is not set, are considered as `"new"`.
* `orderId Number`&mdash;The index of the task.
* `parentId Number`The unique identifier of the parent task. Tasks, whose `parentId` is not set or null, are considered as `"root-level"`.
* `percentComplete Number`&mdash;The percentage of the task completion.
* `start Date`&mdash;The date at which the task starts.
* `summary Boolean`&mdash;Indicates if the task has children.
* `title String`&mdash;The title of the task.

> When you use the `schema.model.fields`, list all `kendo.data.GanttTask` fields. Set the fields which represent the `id` of the event through the `schema.model.id`.

If your remote service stores and returns the Gantt tasks in a different format use the `schema.model.fields` and `schema.model.id` options of the data source to describe them. For more information on mapping remote service fields to client-side Gantt task fields, refer to the [article on data binding]({% slug databinding_kendoui_gantt %}#binding-to-remote-data).

        schema: {
            model: {
                id: "id", // (Mandatory) The "id" of the task is the "id" field.
                fields: {
                    // Describe the Gantt task fields and map them to the fields that are returned by the remote service.
                    id: {
                        from: "ID", // The 'ID' server-side field is mapped to the 'id' client-side field.
                        type: "number"
                    },
                    title: {
                        from: "Title", // The 'Title' server-side field is mapped to the 'title' client-side field.
                        type: "string"
                    },
                    start: {
                        from: "Start", // The 'Start' server-side field is mapped to the 'start' client-side field.                       
                        type: "date",
                    },
                    end: {
                        from: "End", // The 'End' server-side field is mapped to the 'end' client-side field.
                        type: "date"
                    },
                    orderId: {
                        from: "OrderID", // The 'OrderID' server-side field is mapped to the 'orderId' client-side field.
                        type: "number"
                    },
                    parentId: {
                        from: "ParentID", // The 'ParentID' server-side field is mapped to the 'parentId' client-side field.
                        type: "number"
                    },
                    percentComplete: {
                        from: "PercentComplete", // The 'PercentComplete' server-side field is mapped to the 'percentComplete' client-side field.
                        type: "number"
                    },
                    summary: {
                        from: "Summary", // The 'Summary' server-side field is mapped to the 'summary' client-side field.
                        type: "boolean"
                    },
                    expanded: {
                        from: "Expanded", // The 'Expanded' server-side field is mapped to the 'expanded' client-side field.
                        type: "boolean"
                    }
                }
            }
        }

The `kendo.data.GanttDependency` object provides the following fields:

* `id Number`&mdash;The unique identifier of the Gantt dependency. Tasks, whose `id` is not set, are considered as `"new"`.
* `predecessorId Number`&mdash;The unique identifier of the predecessor task.
* `successorId Number`&mdash;The unique identifier of the successor task.
* `type Number`&mdash;The type of the dependency.

> When you use the `schema.model.fields`, list all `kendo.data.GanttDependency` fields. Set the fields which represent the `id` of the event through the `schema.model.id`.

If your remote service stores and returns the Gantt dependencies in a different format, use the `schema.model.fields` and `schema.model.id` options of the data source to describe them. For more information on mapping remote service fields to client-side Gantt dependency fields, refer to the [article on data binding]({% slug databinding_kendoui_gantt %}#binding-to-remote-data).

        schema: {
            model: {
                id: "id", // (Mandatory) The "id" of the dependency is the "id" field.
                fields: {
                    // Describe the Gantt task fields and map them to the fields that are returned by the remote service.
                    id: {
                        from: "ID", // The 'ID' server-side field is mapped to the 'id' client-side field.
                        type: "number"
                    },
                    predecessorId: {
                        from: "PredecessorId", // The 'PredecessorId' server-side field is mapped to the 'predecessorId' client-side field.
                        type: "string"
                    },
                    successorId: {
                        from: "SuccessorId", // The 'SuccessorId' server-side field is mapped to the 'successorId' client-side field.                        
                        type: "date",
                    },
                    type: {
                        from: "Type", // The 'Type' server-side field is mapped to the 'type' client-side field.
                        type: "date"
                    }
                }
            }
        }

## Functionality and Features

* [Layout]({% slug layout_kendoui_gantt %})
* [Data binding]({% slug databinding_kendoui_gantt %})
* [Columns]({% slug columns_kendoui_gantt %})
* [Planned vs Actual]({% slug planned_vs_actual_kendoui_gantt %})
* [Views]({% slug views_kendoui_gantt %})

## Referencing Existing Instances

To get a reference to a Kendo UI Gantt instance, use the jQuery `data` and pass the `"kendoGantt"` as an argument.

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
    // Get a reference to the kendo.ui.Gantt instance.
    var gantt = $("#gantt").data("kendoGantt");
    </script>

## Methods, Fields, and Events

The Gantt exposes a set of [methods](/api/web/gantt#methods) and [fields](/api/web/gantt#fields) that you can use to configure it.

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
    // Get a reference to the kendo.ui.Gantt instance.
    var gantt = $("#gantt").data("kendoGantt");
    gantt.view("week"); // Go to the week view.
    </script>

The Gantt also supports a set of [events](/api/web/gantt#events) to which you can subscribe. To handle the events, eiter specify the JavaScript function which will handle the event during the widget initialization, or use the `bind` method of the widget.

The event handler is the JavaScript function that is invoked when the event is fired. The argument of the event handler is a JavaScript object which contains event specific data. To get the widget reference which fired the event, use the `sender` field of the event argument. The function context of the event handler that is available through the `this` keyword is set to the instance of the widget which fired the event.

The following example demonstrates how to subscribe to a Gantt event during initialization.

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
      ],
      navigate: function(e) {
        console.log("navigate");
      }
    });
    </script>

The following example demonstrates how to subscribe to a Gantt event by using the `bind` method.   

    <div id="gantt"></div>
    <script>
    function gantt_navigate(e) {
    	console.log("navigate");
    }
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
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("navigate", gantt_navigate);
    </script>

## See Also

* [Basic Usage of the Gantt (Demo)](https://demos.telerik.com/kendo-ui/gantt/index)
* [Using the API of the Gantt (Demo)](https://demos.telerik.com/kendo-ui/gantt/api)
* [JavaScript API Reference of the Gantt](/api/javascript/ui/gantt)
