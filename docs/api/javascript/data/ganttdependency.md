---
title: GanttDependency
page_title: API Reference for Kendo Data GanttDependency
description: Documentation how to get started with the GanttDependency.
res_type: api
---

# kendo.data.GanttDependency

The `kendo.data.GanttDependency` class represents a data item from the [`kendo.data.GanttDependencyDataSource`](/api/framework/ganttdependencydatasource). Inherits from [`kendo.data.Model`](/api/framework/model).

## Configuration

### id `String|Number|Object`

The mandatory unique identifier of the dependency.


<div class="meta-api-description">
How to assign a unique identifier to dependencies in Kendo UI Gantt chart? Set or specify a unique identifier for task dependencies within a Gantt chart to enable precise referencing, linking, tracking, and updating of dependency relationships. This identifier helps in managing connections between tasks, synchronizing dependency data, performing lookups, configuring dependencies, and ensuring consistency within project timelines or scheduling tools. Use a mandatory unique key to control and identify each dependency record, support data synchronization, maintain integrity during task updates, and facilitate automatic changes or queries involving task links and dependency management.
</div>

#### Example - set the identifier of a dependency

    <script>
    var dependency = new kendo.data.GanttDependency({
        id: 1,
        predecessorId: 1,
        successorId: 2,
        type: 0
    });
    </script>

### predecessorId `String|Number|Object`

The  mandatory `id` of the predecessor task.


<div class="meta-api-description">
How to set dependency in Kendo UI Gantt for a task that must be completed before another? Specify or set the identifier of the task that must be completed before the current task starts, establish task dependency links, control predecessor relationships, configure required parent task IDs, link dependent tasks by referencing the unique task identifier, enforce task scheduling order by defining which task precedes another, enable cascading task connections based on prior task completion, assign or configure the mandatory predecessor task ID to create dependency chains, manage project timelines by linking tasks through predecessor references, and ensure task sequences respect project workflow by setting valid preceding task identifiers.
</div>

#### Example - set the predecessorId of a dependency

    <script>
    var dependency = new kendo.data.GanttDependency({
        id: 1,
        predecessorId: 1,
        successorId: 2,
        type: 0
    });
    </script>

### successorId `String|Number|Object`

The  mandatory `id` of the successor task.


<div class="meta-api-description">
How to link dependent tasks in Kendo UI Gantt by their unique IDs? Set or specify the identifier for a task that follows another in a sequence, enabling the configuration of task dependencies, linking predecessor and successor tasks, establishing order and relationships between tasks, connecting dependent tasks by their unique IDs, and illustrating workflow progression in project scheduling and timeline management.
</div>

#### Example - set the successorId of a dependency

    <script>
    var dependency = new kendo.data.GanttDependency({
        id: 1,
        predecessorId: 1,
        successorId: 2,
        type: 0
    });
    </script>

### type `String|Number|Object`

The type of the dependency. The type is a value between 0 and 3, representing the four different dependency types:

* `0` - Finish-Finish
* `1` - Finish-Start
* `2` - Start-Finish
* `3` - Start-Start


<div class="meta-api-description">
What is GanttDependency.type used for in Kendo UI for jQuery? Specify or modify the relationship type between tasks in a project timeline to control how one task depends on another, defining task sequencing or dependencies such as finish-to-finish, finish-to-start, start-to-finish, or start-to-start using numeric or coded values. This setting influences order, scheduling constraints, and task coordination by enabling developers to set, configure, or adjust predecessor and successor links, manage task dependencies, enforce project flow rules, and customize the timing interactions between tasks in Gantt charts for project management or workflow visualization.
</div>

#### Example - set the type of a dependency

    <script>
    var dependency = new kendo.data.GanttDependency({
        id: 1,
        predecessorId: 1,
        successorId: 2,
        type: 0
    });
    </script>

## Fields

### id `String|Number|Object`

The unique identifier of the dependency.


<div class="meta-api-description">
How do I manage task dependencies in Kendo UI Gantt chart using its unique id? Identify, reference, or manipulate a unique dependency link between tasks in a Gantt chart by using its distinct identifier, enabling you to search for, update, compare, delete, or manage specific task dependencies efficiently within project scheduling data. This unique dependency ID supports precise lookup of relationships connecting tasks, facilitating control over task dependencies, relation tracking, and dependency management within project timelines and scheduling tools.
</div>

#### Example - set the dependency id

    <script>
    var dependency = new kendo.data.GanttDependency({
        id: 1,
        predecessorId: 1,
        successorId: 2,
        type: 0
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dependency.id); // outputs "1"
    </script>

### predecessorId `String|Number|Object`

The `id` of the predecessor task.


<div class="meta-api-description">
How to get the predecessor task ID in Kendo UI Gantt? Identify, retrieve, or assign the unique identifier of a preceding task in task dependency links within Gantt charts, enabling control over task relationships, sequence management, dependency tracking, and task ordering by referencing the specific ID of the task that must be completed first or that triggers dependent tasks, useful for configuring task workflows, establishing predecessor connections, managing project timelines, and controlling task dependencies through their IDs after initialization.
</div>

#### Example - get the dependency predecessorId field

    <script>
    var dependency = new kendo.data.GanttDependency({
        id: 1,
        predecessorId: 1,
        successorId: 2,
        type: 0
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dependency.predecessorId); // outputs "1"
    </script>

### successorId `String|Number|Object`

The `id` of the successor task.


<div class="meta-api-description">
How do I set the successor task ID in a Kendo UI Gantt chart? Set, get, or manage the identifier linking a task to its subsequent dependent task in project scheduling, enabling control over task sequences, successor relationships, dependency chains, task order updates, and the mapping of follow-up tasks by their unique ids. This field connects predecessor and successor tasks, supports task dependency creation, modification, and evaluation workflows, and is essential for defining which task comes next within Gantt chart timelines or dependency records. Access and manipulate task linkage references to configure task sequences, schedule dependencies, or update follow-on task identifiers in project management applications.
</div>

#### Example - get the dependency successorId field

    <script>
    var dependency = new kendo.data.GanttDependency({
        id: 1,
        predecessorId: 1,
        successorId: 2,
        type: 0
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dependency.successorId); // outputs "2"
    </script>

### type `String|Number|Object`

The type of the dependency. The type is a value between 0 and 3, representing the four different dependency types:

* `0` - Finish-Finish
* `1` - Finish-Start
* `2` - Start-Finish
* `3` - Start-Start


<div class="meta-api-description">
What is the GanttDependency.type property used for in Kendo UI? Configure or retrieve the kind of link or dependency connecting two tasks in a project timeline, specifying the relational type between predecessor and successor tasks such as finish-to-start, start-to-start, finish-to-finish, or start-to-finish dependencies. Enable setting or reading these relationship types using numeric codes or identifiers that represent how tasks are sequenced, coordinated, or constrained with each other in a Gantt chart or project schedule. Control task dependencies by defining which task must finish or start before another begins or ends, supporting dependency types for scheduling order, task linkage, task constraints, and workflow management between related project activities.
</div>

#### Example - get the dependency type

    <script>
    var dependency = new kendo.data.GanttDependency({
        id: 1,
        predecessorId: 1,
        successorId: 2,
        type: 0
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dependency.type); // outputs "0"
    </script>

## Methods

See the [Model methods](/api/framework/model#methods) for all inherited methods.

### define

Defines a new `GanttDependency` type using the provided options.


<div class="meta-api-description">
How to define custom dependency types in a Kendo UI Gantt chart? Add or register custom dependency types or relationships in a Gantt chart by defining new dependency kinds, extending the default dependency model with custom labels, metadata, validation rules, and behaviors that control how dependencies between tasks are recognized, handled, and validated during data binding and scheduling operations, enabling customization of task link types, dependency classifications, and workflow relationships beyond standard options.
</div>

#### Parameters

##### options `Object`

Describes the configuration options of the new Gantt dependency class.

##### options.id `String`

The name of the field which acts as an identifier of the Gantt dependency. The identifier is used to determine if a model instance is new or existing one. If the value of the field specified is equal to the default value (specified through the `fields` configuration), the model is considered as new.

##### options.fields `Object`

A set of key/value pairs the configure the model fields. The key specifies the name of the field. Quote the key if it contains spaces or other symbols which are not valid for a JavaScript identifier.

##### options.fields.fieldName.defaultValue

Specifies the value which will be used for the field when a new model instance is created. The default settings depend on the type of the field.

The default for:

* `"string"` is `""`.
* `"number"` is `0`.
* `"date"` is `new Date()` (today).

##### options.fields.fieldName.editable `Boolean`

Specifies if the field is editable or not. Defaults to `true`.

##### options.fields.fieldName.nullable `Boolean`

Specifies if the `defaultValue` setting should be used. Defaults to `false`.

##### options.fields.fieldName.parse `Function`

Specifies the function which will parse the field value. If not set, the default parsers will be used.

##### options.fields.fieldName.type `String`

Specifies the type of the field.

The available options are:

* (Default) `"string"`
* `"number"`
* `"boolean"`
* `"date`"

##### options.fields.fieldName.validation `Object`

Specifies the validation options which will be used by the [Kendo UI Validator](/api/framework/validator).

#### Example - define custom Gantt dependency

    var Dependency = kendo.data.GanttDependency.define({
        id: "id",
        fields: {
            id: { from: "ID", type: "number" },
            predecessorId: { from: "PredecessorID", type: "number" },
            successorId: { from: "SuccessorID", type: "number" },
            type: { from: "Type", type: "number" }
        }
    });

## Events

See the [Model events](/api/framework/model#events) for all inherited events.
