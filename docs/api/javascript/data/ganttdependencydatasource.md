---
title: GanttDependencyDataSource
page_title: API Reference for Kendo UI GanttDependencyDataSource
description: Learn more about the configuration of Kendo UI GanttDependencyDataSource, methods and events.
---

# kendo.data.GanttDependencyDataSource

The dependencies data source used by the [kendo.ui.Gantt](/api/javascript/ui/gantt) widget.
Inherits from [kendo.data.DataSource](/api/framework/datasource). The GanttDependencyDataSource contains instances of the
[kendo.data.GanttDependency](/api/framework/ganttdependency) class.


## Configuration

See the [DataSource configuration](/api/framework/datasource#configuration) for all inherited configuration options.

### schema `Object`

The schema configuration of the GanttDependencyDataSource.

### schema.model `Object`

The model configuration of the GanttDependencyDataSource. See [GanttDependency](/api/framework/ganttdependency#configuration) for more info.

#### Example - configure the dependency data source model schema

    <script>
    var dataSource = new kendo.data.GanttDependencyDataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/GanttDependencies",
          dataType: "jsonp"
        },
        destroy: {
          url: "http://demos.telerik.com/kendo-ui/service/GanttDependencies/Destroy",
          dataType: "jsonp"
        },
        create: {
          url: "http://demos.telerik.com/kendo-ui/service/GanttDependencies/Create",
          dataType: "jsonp"
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
    dataSource.fetch(function() {
      var dependency = this.at(0);
      console.log(dependency.type);
    });
    </script>

## Methods

See the [DataSource methods](/api/framework/datasource#methods) for all inherited methods.



### dependencies

Returns a list of all dependencies for a certain task.

#### Parameters

##### id `String|Number|Object`

The id of the gantt task, based on which the dependencies are filtered.

#### Returns

`Array` the list of all task dependencies.

#### Example - get all dependencies of a task

    <script>
      var dataSource = new kendo.data.GanttDependencyDataSource({
        data: [
          {
            id: 1,
            predecessorId: 1,
            successorId: 2,
            type: 0
          },
          {
            id: 2,
            predecessorId: 2,
            successorId: 3,
            type: 0
          },
          {
            id: 3,
            predecessorId: 3,
            successorId: 1,
            type: 1
          }
        ]
      });
      
      dataSource.fetch();
      
      // returns dependencies 1 and 3
      var dependencies = dataSource.dependencies(1);
    </script>

### predecessors

Returns a list of all predecessor dependencies for a certain task.

#### Parameters

##### id `String|Number|Object`

The id of the gantt task, based on which the dependencies are filtered.

#### Returns

`Array` the list of all task predecessors.

#### Example - get all task predecessors

    <script>
      var dataSource = new kendo.data.GanttDependencyDataSource({
        data: [
          {
            id: 1,
            predecessorId: 1,
            successorId: 2,
            type: 0
          },
          {
            id: 2,
            predecessorId: 2,
            successorId: 3,
            type: 0
          },
          {
            id: 3,
            predecessorId: 3,
            successorId: 1,
            type: 1
          }
        ]
      });
      
      dataSource.fetch();
      
      // returns dependency 3
      var dependencies = dataSource.predecessors(1);
    </script>

### successors

Returns a list of all successor dependencies for a certain task.

#### Parameters

##### id `String|Number|Object`

The id of the gantt task, based on which the dependencies are filtered.

#### Returns

`Array` the list of all task successors.

#### Example - get all task successors

    <script>
      var dataSource = new kendo.data.GanttDependencyDataSource({
        data: [
          {
            id: 1,
            predecessorId: 1,
            successorId: 2,
            type: 0
          },
          {
            id: 2,
            predecessorId: 2,
            successorId: 3,
            type: 0
          },
          {
            id: 3,
            predecessorId: 3,
            successorId: 1,
            type: 1
          }
        ]
      });
      
      dataSource.fetch();
      
      // returns dependency 1
      var dependencies = dataSource.successors(1);
    </script>
    
