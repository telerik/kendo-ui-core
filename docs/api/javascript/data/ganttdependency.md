---
title: GanttDependency
page_title: API Reference for Kendo Data GanttDependency
description: Documentation how to get started with the GanttDependency.
---

# kendo.data.GanttDependency

The `kendo.data.GanttDependency` class represents a data item from the [kendo.data.GanttDependencyDataSource](/api/framework/ganttdependencydatasource). Inherits from [kendo.data.Model](/api/framework/model).

## Configuration

### id `String|Number|Object`

The mandatory unique identifier of the dependency.

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

The  mandatory 'id' of the predecessor task.

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

The  mandatory 'id' of the successor task.

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

The type of the dependency. The type is a value between 0 and 3, representing the four different dependency types: 0 - Finish-Finish, 1 - Finish-Start, 2 - Start-Finish, 3 - Start-Start.

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

#### Example - set the dependency id

    <script>
    var dependency = new kendo.data.GanttDependency({
        id: 1,
        predecessorId: 1,
        successorId: 2,
        type: 0
    });
    console.log(dependency.id); // outputs "1"
    </script>

### predecessorId `String|Number|Object`

The 'id' of the predecessor task.

#### Example - get the dependency predecessorId field

    <script>
    var dependency = new kendo.data.GanttDependency({
        id: 1,
        predecessorId: 1,
        successorId: 2,
        type: 0
    });
    console.log(dependency.predecessorId); // outputs "1"
    </script>

### successorId `String|Number|Object`

The 'id' of the successor task.

#### Example - get the dependency successorId field

    <script>
    var dependency = new kendo.data.GanttDependency({
        id: 1,
        predecessorId: 1,
        successorId: 2,
        type: 0
    });
    console.log(dependency.successorId); // outputs "2"
    </script>

### type `String|Number|Object`

The type of the dependency. The type is a value between 0 and 3, representing the four different dependency types: 0 - Finish-Finish, 1 - Finish-Start, 2 - Start-Finish, 3 - Start-Start.

#### Example - get the dependency type

    <script>
    var dependency = new kendo.data.GanttDependency({
        id: 1,
        predecessorId: 1,
        successorId: 2,
        type: 0
    });
    console.log(dependency.type); // outputs "0"
    </script>

## Methods

See the [Model methods](/api/framework/model#methods) for all inherited methods.

### GanttDependency.define

Defines a new `GanttDependency` type using the provided options.

#### Parameters

##### options `Object`

Describes the configuration options of the new gantt dependency class.

##### options.id `String`

The name of the field which acts as an identifier of the gantt dependency.
The identifier is used to determine if a model instance is new or existing one.
If the value of the field specified is equal to the default value (specified through the `fields` configuration) the model is considered as new.

##### options.fields `Object`

A set of key/value pairs the configure the model fields. The key specifies the name of the field.
Quote the key if it contains spaces or other symbols which are not valid for a JavaScript identifier.

##### options.fields.fieldName.defaultValue

Specifies the which will be used for the field when a new model instance is created. Default settings depend on the type of the field. Default for "string" is `""`,
for "number" is `0` and for "date" is `new Date()` (today).

##### options.fields.fieldName.editable `Boolean`

Specifies if the field is editable or not. The default value is `true`.

##### options.fields.fieldName.nullable `Boolean`

Specifies if the `defaultValue` setting should be used. The default is `false`.

##### options.fields.fieldName.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.

##### options.fields.fieldName.type `String`

Specifies the the type of the field. The available options are `"string"`, `"number"`, `"boolean"`, `"date`". The default is `"string"`.

##### options.fields.fieldName.validation `Object`

Specifies the validation options which will be used by [Kendo Validator](/api/framework/validator).

#### Example - define custom gantt dependency

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
