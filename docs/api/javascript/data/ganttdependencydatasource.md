---
title: GanttDependencyDataSource
page_title: API Reference for Kendo UI GanttDependencyDataSource
description: Learn more about the configuration of Kendo UI GanttDependencyDataSource, methods and events.
res_type: api
---

# kendo.data.GanttDependencyDataSource

The data source of the dependencies used by the [`kendo.ui.Gantt`](/api/javascript/ui/gantt) widget. Inherits from [`kendo.data.DataSource`](/api/framework/datasource). The `GanttDependencyDataSource` contains instances of the [`kendo.data.GanttDependency`](/api/framework/ganttdependency) class.

## Configuration

See the [DataSource configuration](/api/framework/datasource#configuration) for all inherited configuration options.

### schema `Object`

The schema configuration of the `GanttDependencyDataSource`.


<div class="meta-api-description">
How to configure data model definitions for Kendo UI Gantt chart dependencies using schema? Configure data model definitions, field mappings, parsing rules, and type conversions to control how dependency records are interpreted, validated, and mapped within a Gantt chart's dependency dataset during initialization. Enable customization of how server responses or external data sources are transformed into dependency relationships by setting schema definitions, specifying which fields represent dependencies, and adjusting parsing behaviors for accurate data binding, validation, and integration of task dependencies in project timelines. Support for mapping complex payload structures, converting data types, and defining validation ensures reliable handling of linked tasks, predecessor-successor relationships, and dependency chains within Gantt visualizations.
</div>

#### Example

    <script>
    var dataSource = new kendo.data.GanttDependencyDataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/GanttDependencies",
          type: "POST",
          contentType: "application/json"
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
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Schema configured successfully");
    });
    </script>

### schema.model `Object`

The model configuration of the `GanttDependencyDataSource`. See [`GanttDependency`](/api/framework/ganttdependency#configuration) for more information.


<div class="meta-api-description">
How do I customize the schema for dependency records in a Kendo UI Gantt chart? Configure and customize the structure, mapping, and data fields of dependency records in project scheduling or timeline visualizations, enabling precise control over how dependency relationships are identified, linked, parsed, and represented within Gantt chart data sources. Adjust and define data schemas for dependency items, set field mappings, control record shapes, and tailor the interpretation of dependency information to match various data formats, integration scenarios, or custom dependency models used in task scheduling, project management, or resource planning applications.
</div>

#### Example - configure the dependency data source model schema

    <script>
    var dataSource = new kendo.data.GanttDependencyDataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/GanttDependencies",
          type: "POST",
          contentType: "application/json"
        },
        destroy: {
          url: "https://demos.telerik.com/service/v2/core/GanttDependencies/Destroy",
          type: "POST",
          contentType: "application/json"
        },
        create: {
          url: "https://demos.telerik.com/service/v2/core/GanttDependencies/Create",
          type: "POST",
          contentType: "application/json"
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dependency.type);
    });
    </script>

## Methods

See the [DataSource methods](/api/framework/datasource#methods) for all inherited methods.

### dependencies

Returns a list of all dependencies for a certain task.


<div class="meta-api-description">
How do I retrieve task dependency links in Kendo UI Gantt? Retrieve task dependency links, get all predecessor and successor relationships, access or list task connections, extract arrays of related dependency objects, fetch linked tasks in Gantt charts, inspect and manage task dependencies programmatically, obtain dependency collections for visualization or validation, configure and update relationship data between tasks, control dependencies in project timelines, and work with interconnected task data through methods that return full dependency sets.
</div>

#### Parameters

##### id `String|Number|Object`

The id of the Gantt task based on which the dependencies are filtered.

#### Returns

`Array`&mdash;The list of all task dependencies.

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


<div class="meta-api-description">
How can I get all the tasks that a specific task in my Gantt chart depends on using Kendo UI for jQuery? Retrieve, access, or obtain a list of all preceding task dependencies, incoming links, or prior relationships for a specific task within a project timeline or Gantt chart to analyze task order, validate scheduling accuracy, inspect upstream dependencies, examine predecessor chains, assess dependency impact, or compute effects on task sequencing and workflow before modifying or updating task connections.
</div>

#### Parameters

##### id `String|Number|Object`

The id of the Gantt task based on which the dependencies are filtered.

#### Returns

`Array`&mdash;The list of all task predecessors.

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


<div class="meta-api-description">
How to retrieve all dependent tasks that follow a specific task in a Kendo UI Gantt? Retrieve or query all dependent tasks that follow a specific task in a project schedule, including downstream dependencies, successor relationships, or follow-up connections within a task timeline. Enable fetching lists or collections of tasks that rely on a given task’s completion, useful for analyzing dependency chains, managing task order, updating linked task sequences, controlling downstream workflows, or visualizing task progressions and follow-on activities. Access, enumerate, and handle successor dependency records to understand and manipulate task dependencies, dependency graphs, and project flow.
</div>

#### Parameters

##### id `String|Number|Object`

The id of the Gantt task, based on which the dependencies are filtered.

#### Returns

`Array`&mdash;The list of all task successors.

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
