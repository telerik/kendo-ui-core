---
title: Overview
page_title: Overview | Kendo UI Gantt
description: "Learn how to initialize and configure the Kendo UI Gantt widget."
slug: overview_kendoui_gantt_widget
position: 1
---

# Gantt Overview

The [Kendo UI Gantt widget](http://demos.telerik.com/kendo-ui/gantt/index) displays a set of tasks and dependencies, which are used to visualize project planning data. The widget provides a Treelist section where the tasks can be edited, sorted and reordered in a grid-like fashion, as well as a Timeline section, where the tasks and dependencies are visualized under an adjustable time ruler, and can be resized, moved, edited and removed. It can also display the Timeline in three different views – day, week and month.

## Getting Started

### Initialize the Gantt

The Kendo UI Gantt widget needs two special types of Kendo UI DataSource components – the [`kendo.data.GanttDataSource`](/api/framework/ganttdatasource) for loading tasks, and [`kendo.data.GanttDependencyDataSource`](/api/framework/ganttdependencydatasource) for loading dependencies, although the widget can work when only tasks are loaded as well. The `GanttDataSource` contains instances of a custom Kendo UI model – [`kendo.data.GanttTask`](/api/framework/gantttask), which represents the Gantt task data items - and the `GanttDependencyDataSource` contains instances of the custom [`kendo.data.GanttDependency`](/api/framework/ganttdependency) model, which represents the Gantt dependency data items.

### Bind to Local Data

The easiest way to bind the Gantt is to provide the tasks and dependencies as an array of JavaScript objects.

The example below demonstrates how to bind the widget to an array of JavaScript objects.

###### Example

    <!-- HTML element in which the Kendo UI Gantt will initialize -->
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
          },
          {
            id: 2,
            orderId: 1,
            title: "Task2",
            start: new Date("2014/6/17 12:00"),
            end: new Date("2014/6/17 13:00")
          }
        ],
        dependencies: [
          {
            id: 1,
            predecessorId: 1,
            successorId: 2,
            type: 1
          }
        ]
      });
    </script>

This example initializes a Gantt widget with two tasks and one dependency between them. You can switch the views, edit the tasks, create and delete new tasks and dependencies. Any changes, however, are kept in-memory and are lost once the user refreshes the page. That is why it is better to bind the Gantt to a remote service, which persists the Gantt tasks and dependencies.

### Bind to Remote Service

In most cases the Kendo UI Gantt widget would be bound to a remote service which will return, create, update or delete Gantt tasks and dependencies. The Kendo UI [online demos](http://demos.telerik.com/kendo-ui/web/gantt/) use a demo remote service, which returns sample Gantt tasks and dependencies. That service uses [JSONP](http://en.wikipedia.org/wiki/JSONP) in order to support cross-domain requests.

> **Important**
>
> The demo service uses JSONP so it can be accessible across domains. If your own service lives in the same domain as the website, you do not need to use JSONP. Use JSON instead. More information about cross-domain requests can be found [here](/howto/use-cors-with-all-modern-browsers).

The example below demonstrates how to bind the widget to a remote service.

###### Example

    <div id="gantt"></div>
    <script>      
      $("#gantt").kendoGantt({
        dataSource: {
          batch: true, // Enable batch updates
          transport: {
            read: {
              url: "http://demos.telerik.com/kendo-ui/service/gantttasks",
              dataType: "jsonp"
            },
            update: {
              url: "http://demos.telerik.com/kendo-ui/service/gantttasks/update",
              dataType: "jsonp"
            },
            create: {
              url: "http://demos.telerik.com/kendo-ui/service/gantttasks/create",
              dataType: "jsonp"
            },
            destroy: {
              url: "http://demos.telerik.com/kendo-ui/service/gantttasks/destroy",
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
              id: "id", // The "id" of the task is the "ID" field
              fields: {
                // Describe the gantt task fields and map them to the fields returned by the remote service
                id: {
                  from: "ID", // The 'ID' server-side field is mapped to the 'id' client-side field
                  type: "number"
                },
                orderId: { from: "OrderID", type: "number", validation: { required: true } },
                parentId: { from: "ParentID", type: "number", validation: { required: true } },
                start: { from: "Start", type: "date" },
                end: { from: "End", type: "date" },
                title: { from: "Title", defaultValue: "", type: "string" },
                percentComplete: { from: "PercentComplete", type: "number" },
                summary: { from: "Summary" },
                expanded: { from: "Expanded" }
              }
            }
          }
        },
        dependencies: {
          transport: {
            read: {
              url: "http://demos.telerik.com/kendo-ui/service/ganttdependencies",
              dataType: "jsonp"
            },
            update: {
              url: "http://demos.telerik.com/kendo-ui/service/ganttdependencies/Update",
              dataType: "jsonp"
            },
            destroy: {
              url: "http://demos.telerik.com/kendo-ui/service/ganttdependencies/Destroy",
              dataType: "jsonp"
            },
            create: {
              url: "http://demos.telerik.com/kendo-ui/service/ganttdependencies/Create",
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
                predecessorId: { from: "PredecessorID", type: "number" },
                successorId: { from: "SuccessorID", type: "number" },
                type: { from: "Type", type: "number" }
              }
            }
          }
        }
      });
    </script>

It is important to note how the fields of the scheduler event in the `schema.model` section are configured and mapped to the fields returned by the remote service using the `from` option.

## Configuration

### Fields: kendo.data.GanttTask

The `kendo.data.GanttTask` object has the following fields:

* `end Date` - the date at which the task ends.
* Expanded `Boolean` - if the task is expanded, or not.
* `id Number` - the unique identifier of the Gantt task. Tasks, whose `id` is not set, are considered as `"new"`.
* `orderId Number` - the index of the task.
* `parentId Number` - the unique identifier of the task's parent task. Tasks, whose `parentId` is not set or null, are considered as `"root-level"`.
* `percentComplete Number` - the percentage of the task completion.
* `start Date` - the date at which the task starts.
* `summary Boolean` - if the task has children, or not.
* `title String` - the title of the task.

If your remote service stores and returns the gantt tasks in a different format use the `schema.model.fields` and `schema.model.id` options of the data source to describe them. The "Example - bind to a remote service" above shows how to map remote service fields to client-side Gantt task fields:

        schema: {
            model: {
                id: "id", // The "id" of the task is the "id" field. Mandatory.
                fields: {
                    // Describe the gantt task fields and map them to the fields returned by the remote service
                    id: {
                        from: "ID", // The 'ID' server-side field is mapped to the 'id' client-side field
                        type: "number"
                    },
                    title: {
                        from: "Title", // The 'Title' server-side field is mapped to the 'title' client-side field
                        type: "string"
                    },
                    start: {
                        from: "Start", // The 'Start' server-side field is mapped to the 'start' client-side field                        
                        type: "date",
                    },
                    end: {
                        from: "End", // The 'End' server-side field is mapped to the 'end' client-side field
                        type: "date"
                    },
                    orderId: {
                        from: "OrderID", // The 'OrderID' server-side field is mapped to the 'orderId' client-side field
                        type: "number"
                    },
                    parentId: {
                        from: "ParentID", // The 'ParentID' server-side field is mapped to the 'parentId' client-side field
                        type: "number"
                    },
                    percentComplete: {
                        from: "PercentComplete", // The 'PercentComplete' server-side field is mapped to the 'percentComplete' client-side field
                        type: "number"
                    },
                    summary: {
                        from: "Summary", // The 'Summary' server-side field is mapped to the 'summary' client-side field
                        type: "boolean"
                    },
                    expanded: {
                        from: "Expanded", // The 'Expanded' server-side field is mapped to the 'expanded' client-side field
                        type: "boolean"
                    }
                }
            }
        }

> **Important**
>
> List all `kendo.data.GanttTask` fields when using the `schema.model.fields`. Set the fields which represent the `id` of the event via the `schema.model.id`.

### Fields: kendo.data.GanttDependency

The `kendo.data.GanttDependency` object has the following fields:

* `id Number` - the unique identifier of the Gantt dependency. Tasks, whose `id` is not set, are considered as `"new"`.
* `predecessorId Number` - the unique identifier of the predecessor task.
* `successorId Number` - the unique identifier of the successor task.
* `type Number` - the type of the dependency.

If your remote service stores and returns the Gantt dependencies in a different format, use the `schema.model.fields` and `schema.model.id` options of the data source to describe them. The "Example - bind to a remote service" shown above demonstrates how to map remote service fields to client-side Gantt dependency fields:

        schema: {
            model: {
                id: "id", // The "id" of the dependency is the "id" field. Mandatory.
                fields: {
                    // Describe the gantt task fields and map them to the fields returned by the remote service
                    id: {
                        from: "ID", // The 'ID' server-side field is mapped to the 'id' client-side field
                        type: "number"
                    },
                    predecessorId: {
                        from: "PredecessorId", // The 'PredecessorId' server-side field is mapped to the 'predecessorId' client-side field
                        type: "string"
                    },
                    successorId: {
                        from: "SuccessorId", // The 'SuccessorId' server-side field is mapped to the 'successorId' client-side field                        
                        type: "date",
                    },
                    type: {
                        from: "Type", // The 'Type' server-side field is mapped to the 'type' client-side field
                        type: "date"
                    }
                }
            }
        }

> **Important**  
>
> List all `kendo.data.GanttDependency` fields when using the `schema.model.fields`. Set the fields which represent the `id` of the event via the `schema.model.id`.

### Columns

The columns in the Treelist section of the Kendo UI Gantt can be idividually configured. The following configuration options are supported:

- `field` - the field from the task model which will be used to populate the column.
- `title` - the header text of the column.
- `sortable` - whether the column can be sorted, or not.
- `editable` - whether the column can be edited, or not.
- `width` - the width of the column.
- `format` - the format in which the data in the column is represented.

To configure individual columns use the [views](/api/web/gantt#configuration-columns) option.

The example below demonstrates how to configure Gantt columns.

###### Example

    <div id="gantt"></div>
    <script>      
    $("#gantt").kendoGantt({
      columns: [
        { field: "id", title: "ID", sortable: true, editable: false, width: 30 },
        { field: "title", title: "Title", sortable: true, editable: true, width: 150 },
        { field: "start", title: "Start Time", sortable: true, editable: true, format: "{0:MM/dd/yyyy HH:mm}", width: 100 },
        { field: "end", title: "End Time", sortable: true, editable: true, format: "{0:MM/dd/yyyy HH:mm}", width: 100 }
      ],
      dataSource: [
        {
          id: 1,
          orderId: 0,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 13:00")
        }
      ]
    });
    </script>

### Views

Kendo UI Gantt Timeline can display its tasks in different views. The supported ones are listed below:

- `day` - the timeline is divided into separate days and hours.
- `week` - the timeline is divided into weeks and days.
- `month` - the timeline is divided into months and weeks.

To enable or disable individual views or configure them, use the [views](/api/web/gantt#configuration-views) option.

The example below demonstrates how to enable all scheduler views.

###### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      views: [
        "day", // a view configuration can be a string (the view type) or an object (the view configuration)
        { type: "week", selected: true }, // the "week" view will appear as initially selected
        "month"
      ],
      dataSource: [
        {
          id: 1,
          orderId: 0,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 13:00")
        }
      ],
      dependencies: [
        {
          id: 1,
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ]
    });
    </script>

### Get a Gantt Reference

To get a reference to a Kendo UI Gantt instance, use the jQuery `data` and pass the `"kendoGantt"` as an argument.

The example below demonstrates how to get a Kendo UI Gantt reference.

###### Example

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
    // Get reference to the kendo.ui.Gantt instance
    var gantt = $("#gantt").data("kendoGantt");
    </script>

## Gantt API

### Methods and Fields

The Gantt widget exposes a set of [methods](/api/web/gantt#methods) and [fields](/api/web/gantt#fields) for you to use.

The example below demonstrates how to use the Kendo UI Gantt API.

###### Example

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
    // Get reference to the kendo.ui.Gantt instance
    var gantt = $("#gantt").data("kendoGantt");
    gantt.view("week"); // Go to week view
    </script>

### Events

The Gantt widget supports a set of [events](/api/web/gantt#events) for you to subscribe to. There are two ways to handle events:

* Specify the JavaScript function which will handle the event during the widget initialization.
* Use the `bind` method of the widget.

The event handler is the JavaScript function invoked when the event is fired. The argument of the event handler is a JavaScript object which contains event specific data. Get a widget reference, which fired the event, via the `sender` field of the event argument. The function context of the event handler, available via the `this` keyword, is set to the instance of the widget, which fired the event.

The example below demonstrates how to subscribe to a Gantt event during initialization.

###### Example

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

The example below demonstrates how to subscribe to a Gantt event using the `bind` method.   

###### Example

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

Other articles on Kendo UI Gantt:

* [Gantt JavaScript API Reference](/api/javascript/ui/gantt)
* [How to Create Custom Views]({% slug howto_create_custom_views_gantt %})
* [How to Colorize Tasks]({% slug howto_colorize_tasks_gantt %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Gantt Widget](/aspnet-mvc/helpers/gantt/overview)
* [Overview of the Gantt JSP Tag]({% slug overview_gantt_uiforjsp %})
* [Overview of the Gantt PHP Class](/php/widgets/gantt/overview)
