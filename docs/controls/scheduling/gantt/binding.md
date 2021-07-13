---
title: Data Binding
page_title: jQuery Gantt Documentation | Data Binding
description: "Get started with the jQuery Gantt by Kendo UI and bind the widget to local data arrays or remote data services."
slug: databinding_kendoui_gantt
position: 3
---

# Data Binding

The Gantt provides options for binding it to local data arrays and remote data services.

Even though the Gantt can work when only its tasks are loaded, it requires the following special types of DataSource:

* [`kendo.data.GanttDataSource`](/api/framework/ganttdatasource)&mdash;Loads the tasks of the Gantt. Contains instances of the custom [`kendo.data.GanttTask`](/api/framework/gantttask) Kendo UI model which represents the data items of the tasks.
* [`kendo.data.GanttDependencyDataSource`](/api/framework/ganttdependencydatasource)&mdash;Loads the dependencies of the Gantt. Contains instances of the custom [`kendo.data.GanttDependency`](/api/framework/ganttdependency) model which represents the data items of the dependencies.

## Binding to Local Data

You can provide the tasks and dependencies as an array of JavaScript objects.

The following example demonstrates how to initialize a Gantt with two tasks and one dependency between them. You can switch the views, edit the tasks, and create and delete new tasks and dependencies. Any changes, however, are kept in-memory and are lost once the user refreshes the page. That is why it is better to bind the Gantt to a remote service which persists the Gantt tasks and dependencies.

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

## Binding to Remote Data

You can bind the Gantt to a remote service which will return, create, update, or delete Gantt tasks and dependencies. The [online Kendo UI Gantt demos](https://demos.telerik.com/kendo-ui/web/gantt/) use a demo remote service which returns sample Gantt tasks and dependencies. To support cross-domain requests, the remote service uses [JSONP](https://en.wikipedia.org/wiki/JSONP).

> If the service you use resides in the same domain as your website, use JSON instead. For more information on cross-domain requests, refer to [this article]({% slug corsdatafetching_anotherdomain_datasourcecomponent %}).

The following example demonstrates how to bind the widget to a remote service. Note how the fields of the event in the `schema.model` section are configured and mapped to the fields that are returned by the remote service by using the `from` option.

    <div id="gantt"></div>
    <script>      
      $("#gantt").kendoGantt({
        dataSource: {
          batch: true, // Enable the batch updates.
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/gantttasks",
              dataType: "jsonp"
            },
            update: {
              url: "https://demos.telerik.com/kendo-ui/service/gantttasks/update",
              dataType: "jsonp"
            },
            create: {
              url: "https://demos.telerik.com/kendo-ui/service/gantttasks/create",
              dataType: "jsonp"
            },
            destroy: {
              url: "https://demos.telerik.com/kendo-ui/service/gantttasks/destroy",
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
              id: "id", // The "id" of the task is the "ID" field.
              fields: {
                // Describe the Gantt task fields and map them to the fields that are returned by the remote service.
                id: {
                  from: "ID", // The 'ID' server-side field is mapped to the 'id' client-side field.
                  type: "number"
                },
                orderId: { from: "OrderID", type: "number", validation: { required: true } },
                parentId: { from: "ParentID", type: "number", nullable: true, validation: { required: true } },
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
              url: "https://demos.telerik.com/kendo-ui/service/ganttdependencies",
              dataType: "jsonp"
            },
            update: {
              url: "https://demos.telerik.com/kendo-ui/service/ganttdependencies/Update",
              dataType: "jsonp"
            },
            destroy: {
              url: "https://demos.telerik.com/kendo-ui/service/ganttdependencies/Destroy",
              dataType: "jsonp"
            },
            create: {
              url: "https://demos.telerik.com/kendo-ui/service/ganttdependencies/Create",
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

When defining the `GanttDataSource` schema fields, `parentId` should be explicitly set as `nullable`: 

    parentId: { from: "ParentID", type: "number", nullable: true }

## See Also

* [Basic Usage of the Gantt (Demo)](https://demos.telerik.com/kendo-ui/gantt/index)
* [Using the API of the Gantt (Demo)](https://demos.telerik.com/kendo-ui/gantt/api)
* [JavaScript API Reference of the Gantt](/api/javascript/ui/gantt)
