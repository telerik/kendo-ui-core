---
title: GanttDataSource
page_title: API Reference for Kendo UI GanttDataSource
description: Learn more about the configuration of Kendo UI GanttDataSource, methods and events.
res_type: api
---

# kendo.data.GanttDataSource

The data source used by the [`kendo.ui.Gantt`](/api/javascript/ui/gantt) widget. Inherits from [`kendo.data.DataSource`](/api/framework/datasource). The GanttDataSource contains instances of the [`kendo.data.GanttTask`](/api/framework/gantttask) class.


## Configuration

See the [DataSource configuration](/api/framework/datasource#configuration) for all inherited configuration options.

### schema `Object`

The schema configuration of the GanttDataSource.


<div class="meta-api-description">
How do I configure the data schema for my Kendo UI Gantt chart to correctly map incoming task and dependency data? Configure how incoming raw task and dependency data is parsed, mapped, and transformed into the Gantt chart structure by specifying data readers for lists and totals, setting up models that link server response fields to task attributes such as IDs, start and end dates, parent-child relationships, durations, and dependencies, enabling custom parsing logic to handle various data formats or preprocess responses, and controlling error handling during data interpretation to ensure accurate rendering and synchronization of tasks and links within the timeline visualization.
</div>

#### Example

    <script>
    var dataSource = new kendo.data.GanttDataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/GanttTasks",
          type: "POST",
          contentType: "application/json"
        }
      },
      schema: {
        model: {
          id: "id",
          fields: {
            id: { type: "number" },
            title: { type: "string" },
            start: { type: "date" },
            end: { type: "date" },
            parentId: { type: "number", nullable: true }
          }
        },
        data: "data",
        total: "total"
      }
    });
    dataSource.fetch(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Data loaded:", this.data().length + " tasks");
    });
    </script>

### schema.model `Object`

The model configuration of the GanttDataSource. See [`GanttTask`](/api/framework/gantttask#configuration) for more information.

Note that if the `parentId` type is `number`, its `defaultValue` should be set to `null`.


<div class="meta-api-description">
How to configure data structure for tasks in Kendo UI Gantt chart? Configure the data structure and schema for tasks in a Gantt chart, specifying how to map task properties, assign data types, set unique identifiers, and define default values for each task field. Control the modeling of project tasks to ensure proper interpretation, synchronization, and hierarchy management within the timeline, including handling parent-child relationships and nullable parent ID values. Customize the underlying task data format, field mappings, and defaults to fit various data sources and enable accurate scheduling, dependencies, and progress tracking in project visualizations. Adjust and define the task model shape to support different data types, key fields, and structural conventions essential for timeline displays and project plan representation.
</div>

#### Example - configure the data source model schema

    <script>
    var dataSource = new kendo.data.GanttDataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/GanttTasks",
          type: "POST",
          contentType: "application/json"
        },
        update: {
          url: "https://demos.telerik.com/service/v2/core/GanttTasks/Update",
          type: "POST",
          contentType: "application/json"
        },
        destroy: {
          url: "https://demos.telerik.com/service/v2/core/GanttTasks/Destroy",
          type: "POST",
          contentType: "application/json"
        },
        create: {
          url: "https://demos.telerik.com/service/v2/core/GanttTasks/Create",
          type: "POST",
          contentType: "application/json"
        }
      },
      schema: {
        model: {
          id: "id",
          fields: {
            id: { from: "ID", type: "number" },
            orderId: { from: "OrderID", type: "number", validation: { required: true } },
            parentId: { from: "ParentID", type: "number", nullable: true },
            start: { from: "Start", type: "date" },
            end: { from: "End", type: "date" },
            title: { from: "Title", defaultValue: "", type: "string" },
            percentComplete: { from: "PercentComplete", type: "number" },
            summary: { from: "Summary" },
            expanded: { from: "Expanded" }
          }
        }
      }
    });
    dataSource.fetch(function() {
      var task = this.at(0);
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(task.title);
    });
    </script>

## Methods

See the [DataSource methods](/api/framework/datasource#methods) for all inherited methods.

### taskAllChildren

Returns a list of all child tasks. The search is recursive.


<div class="meta-api-description">
How can I retrieve all child tasks recursively from a specific parent task in my Kendo Gantt widget? Retrieve all descendant sub-tasks or child tasks recursively from a specified parent task within a hierarchical Gantt structure, enabling traversal through every nested level to obtain a complete list or array of subtasks for iterating, updating, filtering, aggregating, or analyzing the full subordinate task hierarchy in project scheduling or task management scenarios.
</div>

#### Parameters

##### task `kendo.data.GanttTask` *(optional)*

The parent task. If this parameter is not specified, all Gantt tasks will be returned.

#### Returns

`Array`&mdash;The list of all child tasks.

#### Example - get all children of a task

    <script>
      var dataSource = new kendo.data.GanttDataSource({
        data: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            summary: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 2,
            orderId: 0,
            parentId: 1,
            title: "Task2",
            summary: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 3,
            orderId: 0,
            parentId: 2,
            title: "Task3",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          }
        ]
      });

      dataSource.fetch();

      // returns a list of the two child tasks.
      var childTasks = dataSource.taskAllChildren(dataSource.at(0));
    </script>

#### Example - get all Gantt tasks

    <script>
      var dataSource = new kendo.data.GanttDataSource({
        data: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            summary: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 2,
            orderId: 0,
            parentId: 1,
            title: "Task2",
            summary: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 3,
            orderId: 0,
            parentId: 2,
            title: "Task3",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          }
        ]
      });

      dataSource.fetch();

      // returns a list of all three tasks.
      var childTasks = dataSource.taskAllChildren();
    </script>

### taskChildren

Returns a list of all direct child tasks.


<div class="meta-api-description">
How to get immediate subtasks of a parent task in Kendo UI Gantt chart? Retrieve or access the direct child tasks, immediate subtasks, or first-level descendants of a given parent task within a Gantt chart or task hierarchy. Enable fetching, iterating, updating, or managing only the immediate children nodes for purposes such as task dependency tracking, hierarchy traversal, nested task aggregation, subtree operations, or parent-child relationship handling within project schedules. Useful for extracting direct subtasks, controlling task trees, or processing immediate elements in a multi-level Gantt data structure.
</div>

#### Parameters

##### task `kendo.data.GanttTask` *(optional)*

The parent task. If this parameter is not specified, all root-level tasks will be returned.

##### fromView `bool` *(optional)*

Whether the data should be taken from the `dataSource.view()` (only the filtered items) or from the `.data()` call (all items in the DataSource). If this parameter is not specified, the `data()` call will be used and filter would not be taken into account.

#### Returns

`Array`&mdash;The list of all direct child tasks.

#### Example - get the direct children of a task

    <script>
      var dataSource = new kendo.data.GanttDataSource({
        data: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            summary: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 2,
            orderId: 0,
            parentId: 1,
            title: "Task2",
            summary: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 3,
            orderId: 0,
            parentId: 2,
            title: "Task3",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          }
        ]
      });

      dataSource.fetch();

      // returns a list with all child tasks of Task1.
      var childTasks = dataSource.taskChildren(dataSource.at(0));
    </script>

#### Example - get the root-level tasks

    <script>
      var dataSource = new kendo.data.GanttDataSource({
        data: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            summary: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 2,
            orderId: 0,
            parentId: 1,
            title: "Task2",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          }
        ]
      });

      dataSource.fetch();

      // returns a list with all root-level tasks.
      var childTasks = dataSource.taskChildren();
    </script>

### taskLevel

Returns the level of the task in the hierarchy. `0` for root-level tasks.


<div class="meta-api-description">
How do I get the indentation level of a task in a Kendo UI Gantt chart? Determine the hierarchical depth or nesting level of a task within a project timeline by retrieving its numeric indentation or layer position, where zero represents a top-level task and larger numbers signify increasingly nested subtasks. This method helps to identify parent-child relationships, manage task grouping, enable conditional display based on hierarchy, calculate depth for styling or structural organization, and dynamically assess task positioning within a multi-level task tree or timeline view. Use it to control visual indentation, create hierarchical indexes, parse task dependencies, or facilitate filtering and rendering logic based on task tiers in any Gantt chart or project management data source.
</div>

#### Parameters

##### task `kendo.data.GanttTask`

The reference task.

#### Returns

`Number`&mdash;The level of the task in the hierarchy.

#### Example - get the level of a task

    <script>
      var dataSource = new kendo.data.GanttDataSource({
        data: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            summary: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 2,
            orderId: 0,
            parentId: 1,
            title: "Task2",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          }
        ]
      });

      dataSource.fetch();

	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.taskLevel(dataSource.at(1))) // outputs "1"
    </script>

### taskParent

Returns the parent task of a certain task.


<div class="meta-api-description">
How to get parent task in Kendo UI Gantt chart? Retrieve or access the immediate parent or superior task within a hierarchical Gantt chart structure to navigate, inspect, or manipulate task relationships, dependencies, and hierarchies. Enable traversing up the task tree, finding a parent task for any given child task, controlling task lineage, managing parent-child associations, or querying ancestor tasks for updating, linking, or hierarchical organization. This method supports looking up, identifying, or working with parent tasks in project schedules, task dependency chains, or structured task lists.
</div>

#### Parameters

##### task `kendo.data.GanttTask`

The reference task.

#### Returns

`kendo.data.GanttTask`&mdash;The parent task.

#### Example - get the parent of a task

    <script>
      var dataSource = new kendo.data.GanttDataSource({
        data: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            summary: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 2,
            orderId: 0,
            parentId: 1,
            title: "Task2",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          }
        ]
      });

      dataSource.fetch();

	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.taskParent(dataSource.at(1)).title) // outputs "Task1"
    </script>

#### Example - get the parent of a root-level task

    <script>
      var dataSource = new kendo.data.GanttDataSource({
        data: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            summary: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 2,
            orderId: 0,
            parentId: 1,
            title: "Task2",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          }
        ]
      });

      dataSource.fetch();

	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.taskParent(dataSource.at(0))) // outputs "null"`
    </script>

### taskSiblings

Returns a list of all tasks that have the same parent.


<div class="meta-api-description">
How do I get sibling tasks in my Kendo Gantt chart? Retrieve tasks that share the same parent task, fetch sibling tasks within a hierarchical Gantt structure, get arrays of tasks grouped by common parent for iteration, filtering, batch processing, or analysis, identify tasks on the same level under a parent in project timelines, gather related tasks for updates or inspection, obtain sibling task collections to manage dependencies or statuses together, query task groups sharing a parent node in task trees, extract sibling elements for synchronized changes or bulk operations in Gantt charts, and access peer tasks connected by their hierarchical parent relationship.
</div>

#### Parameters

##### task `kendo.data.GanttTask`

The reference task.

#### Returns

`Array`&mdash;The list of all tasks with the same parent as the parameter task. If the parameter task is a root-level task, all root-level tasks are returned.

#### Example - get the siblings of a task

    <script>
      var dataSource = new kendo.data.GanttDataSource({
        data: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            summary: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 2,
            orderId: 0,
            parentId: 1,
            title: "Task2",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 3,
            orderId: 1,
            parentId: 1,
            title: "Task3",
            start: new Date("2014/6/17 12:00"),
            end: new Date("2014/6/17 13:00")
          }
        ]
      });

      dataSource.fetch();

      // returns a list with the two sibling tasks.
      var childTasks = dataSource.taskSiblings(dataSource.at(1));
    </script>

### taskTree

Returns a list of all child Gantt tasks, ordered by their hierarchical index (Depth-First). a parent is collapsed, it's children are not returned.


<div class="meta-api-description">
How do I get a hierarchical list of all visible child tasks in my Gantt chart? Retrieve a hierarchical list or array of all visible child tasks organized in depth-first order from the project’s task data, excluding any subtasks hidden under collapsed parent tasks, enabling traversal, mapping, updating, rendering, or processing tasks according to their nested structure while respecting task expansion states and hierarchical order for Gantt chart or project timeline views.
</div>

#### Parameters

##### task `kendo.data.GanttTask` *(optional)*

The reference task. If this parameter is specified, the result will be all child tasks of this task, ordered by their hierarchical index.

#### Returns

`Array`&mdash;The list of all child Gantt tasks, ordered by their hierarchical index (Depth-First).

#### Example - get all Gantt tasks

    <script>
      var dataSource = new kendo.data.GanttDataSource({
        data: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            summary: true,
            expanded: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 2,
            orderId: 1,
            parentId: null,
            title: "Task2",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 3,
            orderId: 0,
            parentId: 1,
            title: "Task3",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          }
        ]
      });

      dataSource.fetch();

      // returns a list with all tasks in the following order: [Task1, Task3, Task2]
      var childTasks = dataSource.taskTree();
    </script>

#### Example - get all Gantt tasks when the parent is collapsed

    <script>
      var dataSource = new kendo.data.GanttDataSource({
        data: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            summary: true,
            expanded: false,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 2,
            orderId: 1,
            parentId: null,
            title: "Task2",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 3,
            orderId: 0,
            parentId: 1,
            title: "Task3",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          }
        ]
      });

      dataSource.fetch();

      // returns a list with two tasks in the following order: [Task1, Task2]
      var childTasks = dataSource.taskTree();
    </script>

#### Example - get all child tasks of the first task ordered by their hierarchical index

    <script>
      var dataSource = new kendo.data.GanttDataSource({
        data: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            summary: true,
            expanded: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 2,
            orderId: 0,
            parentId: 1,
            title: "Task2",
            summary: true,
            expanded: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 3,
            orderId: 1,
            parentId: 1,
            title: "Task3",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 4,
            orderId: 0,
            parentId: 2,
            title: "Task4",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          }
        ]
      });

      dataSource.fetch();

      // returns a list with all tasks in the following order: [Task2, Task4, Task3]
      var childTasks = dataSource.taskTree(dataSource.at(0));
    </script>

### update

Updates a Gantt task.


<div class="meta-api-description">
How to update existing tasks in Kendo UI Gantt chart? Modify, change, or update existing task records within a project timeline or Gantt chart data set by applying new details such as adjusted start and end dates, duration changes, task dependencies, or other task attributes; control and synchronize task state updates to ensure the project schedule reflects the latest modifications by sending revised field values to the task collection or data source, enabling editing, rescheduling, and dependency management for tasks within project management and visualization tools.
</div>

#### Parameters

##### task `kendo.data.GanttTask`

The task to be updated.

##### taskInfo `Object`

The new values which will be used to update the task.

#### Example - update the title of a task

    <script>
      var dataSource = new kendo.data.GanttDataSource({
        data: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            summary: true,
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          }
        ]
      });

      dataSource.fetch();

      var task = dataSource.at(0);
      dataSource.update(task, { title: "New Title" });

      document.write(task.title); // outputs "New Title"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(task.title); // outputs "New Title"
    </script>
