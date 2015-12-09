---
title: GanttDataSource
page_title: API Reference for Kendo UI GanttDataSource
description: Learn more about the configuration of Kendo UI GanttDataSource, methods and events.
---

# kendo.data.GanttDataSource

The data source used by the [kendo.ui.Gantt](/api/javascript/ui/gantt) widget.
Inherits from [kendo.data.DataSource](/api/framework/datasource). The GanttDataSource contains instances of the
[kendo.data.GanttTask](/api/framework/gantttask) class.


## Configuration

See the [DataSource configuration](/api/framework/datasource#configuration) for all inherited configuration options.

### schema `Object`

The schema configuration of the GanttDataSource.

### schema.model `Object`

The model configuration of the GanttDataSource. See [GanttTask](/api/framework/gantttask#configuration) for more info.

#### Example - configure the data source model schema

    <script>
    var dataSource = new kendo.data.GanttDataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/GanttTasks",
          dataType: "jsonp"
        },
        update: {
          url: "http://demos.telerik.com/kendo-ui/service/GanttTasks/Update",
          dataType: "jsonp"
        },
        destroy: {
          url: "http://demos.telerik.com/kendo-ui/service/GanttTasks/Destroy",
          dataType: "jsonp"
        },
        create: {
          url: "http://demos.telerik.com/kendo-ui/service/GanttTasks/Create",
          dataType: "jsonp"
        }
      },
      schema: {
        model: {
          id: "id",
          fields: {
            id: { from: "ID", type: "number" },
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
    });
    dataSource.fetch(function() {
      var task = this.at(0);
      console.log(task.title);
    });
    </script>

## Methods

See the [DataSource methods](/api/framework/datasource#methods) for all inherited methods.

### taskAllChildren

Returns a list of all child tasks. The search is recursive.

#### Parameters

##### task `kendo.data.GanttTask` *(optional)*

The parent task. If this parameter is not specified, all gantt tasks will be returned.

#### Returns

`Array` the list of all child tasks.

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

#### Example - get all gantt tasks

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

#### Parameters

##### task `kendo.data.GanttTask` *(optional)*

The parent task. If this parameter is not specified, all root level tasks will be returned.

#### Returns

`Array` the list of all direct child tasks.

#### Example - get direct children of a task

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

#### Example - get root level tasks

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
      
      // returns a list with all root level tasks.
      var childTasks = dataSource.taskChildren();
    </script>

### taskLevel

Returns the level of the task in the hierrarchy. 0 for root level taks.

#### Parameters

##### task `kendo.data.GanttTask`

The reference task.

#### Returns

`Number` the level of the task in the hierarchy.

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
      
      console.log(dataSource.taskLevel(dataSource.at(1))) // outputs "1"
    </script>

### taskParent

Returns the parent task of a certain task.

#### Parameters

##### task `kendo.data.GanttTask`

The reference task.

#### Returns

`kendo.data.GanttTask` the parent task.

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
      
      console.log(dataSource.taskParent(dataSource.at(1)).title) // outputs "Task1"
    </script>

#### Example - get the parent of a root level task

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
      
      console.log(dataSource.taskParent(dataSource.at(0))) // outputs "null"`
    </script>

### taskSiblings

Returns a list of all tasks that have the same parent.

#### Parameters

##### task `kendo.data.GanttTask`

The reference task.

#### Returns

`Array` the list of all tasks with the same parent as the parameter task. If the parameter task is a root level task, all root level tasks are returned.

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

Returns a list of all child gantt tasks, ordered by their hierarchical index (Depth-First). a parent is collapsed, it's children are not returned.

#### Parameters

##### task `kendo.data.GanttTask` *(optional)*

The reference task. If this parameter is specified, the result will be all child tasks of this task, ordered by their hierarchical index. 

#### Returns

`Array` the list of all child gantt tasks, ordered by their hierarchical index (Depth-First).

#### Example - get all gantt tasks

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

#### Example - get all gantt tasks, when parent is collapsed

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

#### Example - get all child tasks of the first task, ordered by their hierarchical index

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

Updates a gantt task.

#### Parameters

##### task `kendo.data.GanttTask`

The task to be updated.

##### taskInfo `Object`

The new values, which will be used to update the task.

#### Example - update a task's title

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
      console.log(task.title); // outputs "New Title"
    </script>
