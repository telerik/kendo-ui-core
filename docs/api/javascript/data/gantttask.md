---
title: GanttTask
page_title: API Reference for Kendo Data GanttTask
description: Documentation how to get started with the GanttTask.
res_type: api
---

# kendo.data.GanttTask

The `kendo.data.GanttTask` class represents a data item from the [`kendo.data.GanttDataSource`](/api/framework/ganttdatasource). Inherits from [`kendo.data.Model`](/api/framework/model).

## Configuration

### end `Date`

The date at which the Gantt task ends. The `end` date is mandatory.


<div class="meta-api-description">
Set or configure the finish time, completion date, or end point of a task in scheduling and project timelines, defining when a task concludes to determine its duration, deadline, or timeframe. Control task completion boundaries, specify exact end dates, or establish scheduling cutoffs for tasks in Gantt charts, timelines, or project plans. Enable precise task end-time management, deadline setting, and schedule finalization to calculate durations, dependencies, and timing within project management workflows.
</div>

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

If set to `true`, the task is expanded and the tasks of its child are visible.


<div class="meta-api-description">
Adjust visibility of subtasks within a parent task by toggling expansion or collapse to show or hide child tasks, enabling configuration of hierarchical task display in project timelines, managing nested task visibility for detailed planning views, setting whether parent tasks reveal their subtasks, controlling task tree expansion state, enabling dynamic display of task hierarchies, and managing visibility of child items under a main task for clearer or simplified Gantt chart presentations.
</div>

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


<div class="meta-api-description">
Set or specify a unique identifier for individual tasks to enable precise task referencing, management, and CRUD operations within a Gantt chart or project timeline. This unique key is essential for linking parent and child tasks, mapping dependencies, tracking, updating, and distinguishing tasks in data sets, often requiring a non-null, distinct string or numeric value that ensures each task can be individually controlled, referenced, or queried in scheduling, project management, or visualization contexts.
</div>

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


<div class="meta-api-description">
Configure the relative position of tasks among siblings to control their sorting, rendering sequence, and order within a Gantt chart, enabling you to customize task arrangement, manage task reordering, maintain consistent display order, and persist specific sequences that affect processing and visual layout.
</div>

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

The `id` of the parent task. Required for child tasks.


<div class="meta-api-description">
Define and manage hierarchical task structures by linking tasks to their parent tasks using unique identifiers, enabling nested subtasks, task dependencies, and organized project timelines. Control task grouping, set parent-child relationships, assign subtasks under main tasks, and establish clear task nesting to visualize and manipulate the project workflow. Support scenarios involving task hierarchy creation, child task assignment, and structured task breakdowns within Gantt charts. Ensure child tasks reference a parent task’s unique ID to maintain correct nesting and dependency chains for project scheduling and resource planning.
</div>

#### Example - create a child task

    <script>
    var parentTask = new kendo.data.GanttTask({
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

The completion percentage of the task. A value between 0 and 1 representing how much of a task is completed.


<div class="meta-api-description">
Specify the progress or completion level of a project task using a decimal value between zero and one to represent the fraction or percentage of work finished, enabling tracking, updating, or binding task advancement dynamically in Gantt charts or timeline views to reflect partial, halfway, or fully completed states, configure progress indicators, control task status visually, and integrate completion metrics into scheduling, reporting, or project management workflows with precise progress control and data synchronization.
</div>

#### Example - set the percentComplete of a task

    <script>
    var parentTask = new kendo.data.GanttTask({
        id: 1,
        title: "Parent",
        percentComplete: 0.55,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    </script>

### plannedEnd `Date`

The date at which the Gantt task ends as per the planned schedule. The `plannedEnd` date is mandatory when rendering the [Planned vs Actual](/api/javascript/ui/gantt/configuration/showplannedtasks) view in the Gantt.


<div class="meta-api-description">
Define or adjust the scheduled finish date for project tasks to manage deadlines, timeline visualization, and track planned versus actual progress, enabling timeline displays and comparison of expected completion dates with real outcomes for effective project planning, task scheduling, deadline setting, milestone tracking, timeline control, and progress monitoring using date values essential for timeline views and performance analysis.
</div>

#### Example - set the plannedEnd date of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        plannedStart: new Date("2014/6/17 9:00"),
        plannedEnd: new Date("2014/6/17 10:00"),
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    </script>

### plannedStart `Date`

The date at which the Gantt task starts as per the planned schedule. The `plannedStart` date is mandatory when rendering the [Planned vs Actual](/api/javascript/ui/gantt/configuration/showplannedtasks) view in the Gantt.


<div class="meta-api-description">
Configure or specify the scheduled start date, planned or expected task kickoff time, or initial timeline positioning for project tasks using date values or parseable date strings. Control, set, or adjust task initiation points to compare planned timelines with actual progress for timeline visualization, project management, scheduling, and planning tools. Enable start date settings to support timeline comparisons, project tracking, milestone scheduling, and rendering views that showcase planned versus real execution dates for tasks and activities.
</div>

#### Example - set the plannedStart date of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        plannedStart: new Date("2014/6/17 9:00"),
        plannedEnd: new Date("2014/6/17 10:00"),
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
    </script>

### start `Date`

The date at which the Gantt task starts. The `start` date is mandatory.


<div class="meta-api-description">
Specify or configure the beginning date or time of a project task to determine when work is scheduled to start on the timeline, enabling the ability to sort, filter, display, or organize tasks based on their initial start point or commencement. This starting timestamp or date controls task scheduling, timeline positioning, and chronological ordering, supporting use cases like setting deadlines, planning task sequences, adjusting timeframes, and managing project workflows through configurable start times.
</div>

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

If set to `true`, the task has child tasks.


<div class="meta-api-description">
Control whether a task functions as a parent or summary task that groups multiple subtasks beneath it, enabling hierarchical structure, grouping, and visual nesting in Gantt charts; set or toggle a boolean flag to define a task as a summary node, which activates collapse and expand behavior, summary-specific formatting, and organizational grouping to manage complex project timelines with nested tasks or aggregated progress views.
</div>

#### Example - create a summary task

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

The title of the task which is displayed by the Gantt widget.


<div class="meta-api-description">
Control or configure the text label, name, or title displayed for tasks in a Gantt chart or timeline view, enabling you to set, update, or bind the visible task identifier or description shown in the UI, customize the task naming dynamically, label tasks for easy identification, or programmatically change the displayed task heading in project scheduling and task management interfaces.
</div>

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

The date at which the Gantt task ends.


<div class="meta-api-description">
Specify, retrieve, or control the finish date, completion time, deadline, or end timestamp of a task in Gantt chart scheduling and timeline visualization, enabling management of task duration, dependency sequencing, start-to-end calculations, or project milestone tracking by setting or accessing the final date or time when a job or activity concludes within the project timeline data structure.
</div>

#### Example - get the end date of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(task.end); // outputs the end date
    </script>

### expanded `Boolean`

If set to `true`, the task is expanded and the tasks of its child are visible.


<div class="meta-api-description">
Control the visibility of nested or child tasks within a project timeline or Gantt chart by enabling, disabling, toggling, or setting the expanded state of a task, allowing users to collapse or expand task hierarchies, show or hide sub-tasks dynamically, manage task tree views, adjust task grouping displays, programmatically open or close task branches, and customize the display of dependent or subordinate activities inside project schedules or timelines.
</div>

#### Example - get the expanded field of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        expanded: false,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(task.expanded); // outputs "false"
    </script>

### id `String|Number|Object`

The unique identifier of the task.


<div class="meta-api-description">
Identify, access, or reference a unique task identifier within a project timeline or scheduling tool to link task dependencies, update, delete, or synchronize specific tasks with the underlying data source during data manipulation or binding processes. Enable precise task targeting for CRUD operations, task correlation, and integration in Gantt charts or project management contexts, ensuring reliable task instance selection and control across various use cases involving task identification, relationship mapping, and data synchronization.
</div>

#### Example - get the id of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(task.id); // outputs "1"
    </script>

### orderId `String|Number|Object`

The position of the task relative to its sibling tasks.


<div class="meta-api-description">
Control, set, or read the position and sequence of tasks within a Gantt chart by configuring the order or rank among sibling tasks to enable custom sorting, drag-and-drop rearrangement, stable ordering, visual stacking, task prioritization, or manual reordering in project timelines, workflow management, and task sequencing scenarios for precise task placement and dynamic adjustment of task order values.
</div>

#### Example - get the orderId field of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        orderId: 0,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(task.orderId); // outputs "0"
    </script>

### parentId `String|Number|Object`

The `id` of the parent task.


<div class="meta-api-description">
Set or get the identifier linking a task to its parent in a task hierarchy to establish dependencies, create subtasks, organize nested tasks, build project structure, manage parent-child relationships, and control task grouping within Gantt charts by referencing the parent task’s unique ID for hierarchical connections and task tree construction.
</div>

#### Example - get the parentId field of a task

    <script>
    var parentTask = new kendo.data.GanttTask({
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(child.parentId); // outputs "1"
    </script>

### percentComplete `String|Number|Object`

The completion percentage of the task.


<div class="meta-api-description">
track or set task progress percentage, update or read completion status, monitor percentage done on tasks, control progress indicators in Gantt charts, bind or filter tasks by percent complete, sort tasks based on completion level, calculate task status from completion values, display progress bars reflecting task advancement, manage and evaluate task completion ratios dynamically during runtime, measure how much work is finished on individual Gantt tasks
</div>

#### Example - get the percentComplete field of a task

    <script>
    var parentTask = new kendo.data.GanttTask({
        id: 1,
        title: "Parent",
        percentComplete: 0.55,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(parentTask.percentComplete); // outputs "0.55"
    </script>

### start `Date`

The date at which the Gantt task starts.


<div class="meta-api-description">
Set or retrieve the beginning date or time when a scheduled task, activity, or project phase starts within a timeline, calendar, or Gantt chart view; configure, update, or access task start times for timeline planning, sorting tasks by start date, filtering tasks that begin within specific time frames, managing project schedules, or calculating durations and dependencies based on initial dates; control and modify the exact start points of tasks in project management tools, timeline visualizations, or scheduling software to ensure accurate timeline rendering and resource allocation.
</div>

#### Example - get the start date of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(task.start); // outputs the start date
    </script>

### summary `Boolean`

If set to `true`, the task has child tasks.


<div class="meta-api-description">
Identify and control parent tasks by marking tasks that group or contain subtasks, enabling the system to recognize hierarchical relationships, manage task trees, enable expand or collapse functionality, treat tasks as summaries, configure task grouping, and organize nested or child task structures for streamlined project management.
</div>

#### Example - get the task summary field

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        summary: true,
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(task.summary); // outputs "true"
    </script>

### title `String`

The title of the task which is displayed by the Gantt widget.


<div class="meta-api-description">
Configure, set, update, or retrieve the task label, caption, or display text shown on the Gantt chart for tasks, controlling how task names, titles, or labels appear when binding data, editing entries, or rendering tasks dynamically. This property enables programmatic access to task identifiers, names, or titles within a project timeline, allowing customization and live updates of task titles, task captions, or descriptive text used in Gantt visualizations and schedule management.
</div>

#### Example - get the title of a task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(task.title); // outputs "Task1"
    </script>

## Methods

See the [Model methods](/api/framework/model#methods) for all inherited methods.

### define

Defines a new `GanttTask` type using the provided options.


<div class="meta-api-description">
Define custom task types for Gantt charts by configuring task templates, default settings, fields, properties, and behaviors to create, render, and manage specialized tasks consistently across the project timeline. Enable centralized task type registration, customization, and reuse for unique workflow needs, allowing control over task creation, appearance, data structure, and interaction patterns in Gantt visualizations. Configure or extend task definitions to tailor project management solutions with custom attributes, templates, and logic that integrate seamlessly into scheduling, timeline rendering, and task management features.
</div>

#### Parameters

##### options `Object`

Describes the configuration options of the new Gantt task class.

##### options.id `String`

The name of the field which acts as an identifier of the Gantt task. The identifier is used to determine if a model instance is new or existing. If the value of the field specified is equal to the default value (specified through the `fields` configuration), the model is considered as new.

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

Specifies the validation options which will be used by the [Kendo Validator](/api/framework/validator).

#### Example - define a custom Gantt task

    var Task = kendo.data.GanttTask.define({
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
    });

### duration

Returns the Gantt task length in milliseconds.


<div class="meta-api-description">
Retrieve or calculate task length, interval, or timespan in milliseconds from a project management element to measure duration, timeframe, or schedule length. Extract numeric task duration as a raw time value for timeline computations, comparisons, and conversions to seconds, minutes, hours, or days when managing project timelines, scheduling tasks, or displaying progress bars. Access, read, or get execution time, elapsed period, or length of work items for Gantt charts or project planning tools that require precise time measurements in milliseconds to control or analyze task intervals accurately.
</div>

#### Returns

`Number`&mdash;The length of the task.

#### Example - get the length of the task

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
    });

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(task.duration());
    </script>

### isMilestone

Checks whether the event has zero duration.


<div class="meta-api-description">
Check if a task or event in a project timeline qualifies as a milestone by verifying if its duration is zero, meaning the start and end dates are the same, enabling developers to identify, filter, flag, or differentiate key events with no length in schedules, timelines, or project plans, and to apply conditional logic, custom styling, validation rules, or branching based on whether an item marks a critical point or deadline within Gantt charts or task management workflows.
</div>

#### Returns

`Boolean`&mdash;Returns `true` if the task start is equal to the task end.

#### Example - check whether the task is a milestone

    <script>
    var task = new kendo.data.GanttTask({
        id: 1,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 9:00")
    });

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(task.isMilestone()); //logs 'true'
    </script>

## Events

See the [Model events](/api/framework/model#events) for all inherited events.
