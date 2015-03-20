---
title: GanttTask
page_title: API Reference for Kendo Data GanttTask
description: Documentation how to get started with the GanttTask.
---

# kendo.data.GanttTask

The `kendo.data.GanttTask` class represents a data item from the [kendo.data.GanttDataSource](/api/framework/ganttdatasource). Inherits from [kendo.data.Model](/api/framework/model).

## Configuration

### end `Date`

The date at which the gantt task ends. The `end` date is mandatory.

#### Example - set the end date of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    </script>
    
### expanded `Boolean` *(default: true)*

If set to `true` the task is expanded and it's child tasks are visible.

#### Example - create collapsed task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        expanded: false,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    </script>
    
### id `String|Number|Object`

The mandatory unique identifier of the task.

#### Example - set the identifier of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    </script>

### orderId `String|Number|Object` *(default: 0)*

The position of the task relative to its sibling tasks.

#### Example - set the orderId of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        orderId: 0,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    </script>

### parentId `String|Number|Object` *(default: null)*

The 'id' of the parent task. Required for child tasks.

#### Example - create a child task

    <script>
    var parent = new kendo.data.GanttTask({
        id: 1,
        title: "Parent",
        summary: true,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    var child = new kendo.data.GanttTask({
        id: 2,
        title: "Child",
        parentId: 1,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });    
    </script>

### percentComplete `String|Number|Object` *(default: 0)*

The percentage of completion of the task. A value between 0 and 1, representing how much of a task is completed.

#### Example - set the percentComplete of a task

    <script>
    var parent = new kendo.data.GanttTask({
        id: 1,
        title: "Parent",
        percentComplete: 0.55,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    </script>

### start `Date`

The date at which the gantt task starts. The `start` date is mandatory.

#### Example - set the start date of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    </script>
    
### summary `Boolean` *(default: true)*

If set to `true` the task has child tasks.

#### Example - create summary task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        summary: true,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    </script>
    
### title `String` *(default: "")*

The title of the task which is displayed by the gantt widget.

#### Example - set the title of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    </script>

## Fields

### end `Date`

The date at which the gantt task ends.

#### Example - get the end date of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    console.log(task.end); // outputs the end date
    </script>
    
### expanded `Boolean` 

If set to `true` the task is expanded and it's child tasks are visible.

#### Example - get the task expanded field

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        expanded: false,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    console.log(task.expanded); // outputs "false"
    </script>
  
### id `String|Number|Object`

The unique identifier of the task.

#### Example - get the task id

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    console.log(task.id); // outputs "1"
    </script>

### orderId `String|Number|Object`

The position of the task relative to its sibling tasks.

#### Example - get the task orderId field

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        orderId: 0,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    console.log(task.orderId); // outputs "0"
    </script>

### parentId `String|Number|Object`

The 'id' of the parent task.

#### Example - get the task parentId field

    <script>
    var parent = new kendo.data.GanttTask({
        id: 1,
        title: "Parent",
        summary: true,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    var child = new kendo.data.GanttTask({
        id: 2,
        title: "Child",
        parentId: 1,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    console.log(task.parentId); // outputs "1"
    </script>

### percentComplete `String|Number|Object`

The percentage of completion of the task.

#### Example - get the task percentComplete field

    <script>
    var parent = new kendo.data.GanttTask({
        id: 1,
        title: "Parent",
        percentComplete: 0.55,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    console.log(task.percentComplete); // outputs "0.55"
    </script>

### start `Date`

The date at which the gantt task starts.

#### Example - get the start date of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    console.log(task.start); // outputs the start date
    </script>
    
### summary `Boolean`

If set to `true` the task has child tasks.

#### Example - get the task summary field

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        summary: true,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    console.log(task.summary); // outputs "true"
    </script>
    
### title `String`

The title of the task which is displayed by the gantt widget.

#### Example - get the title of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    console.log(task.title); // outputs "Task1"
    </script>

## Methods

See the [Model methods](/api/framework/model#methods) for all inherited methods.

### GanttTask.define

Defines a new `GanttTask` type using the provided options.

#### Parameters

##### options `Object`

Describes the configuration options of the new gantt task class.

##### options.id `String`

The name of the field which acts as an identifier of the gantt task.
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

#### Example - define custom gantt task

    var Task = kendo.data.GanttTask.define({
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
    });

### duration

Returns the gantt task length in milliseconds.

#### Returns

`Number` the length of the task.

#### Example - get length of the task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });

    console.log(task.duration());
    </script>

### isMilestone

Checks whether the event has zero duration.

#### Returns

`Boolean` return `true` if the task start is equal to the task end.

#### Example - check whether the task is a milestone

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 9:00")
    });

    console.log(task.isMilestone()); //logs 'true'
    </script>

## Events

See the [Model events](/api/framework/model#events) for all inherited events.
