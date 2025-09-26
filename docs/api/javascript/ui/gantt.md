---
title: Gantt
page_title: Configuration, methods and events of Kendo UI Gantt
description: Code examples for Gantt UI widget configuration, learn how to use methods and which events to set once the gantt UI widget detail is initialized.
res_type: api
component: gantt
---

# kendo.ui.Gantt

Represents the Kendo UI Gantt widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### assignments `Object`

The configuration of the assignments of the gantt resources. An assignment is a one-to-one mapping between a gantt task and a gantt resource containing the number of units for which a resource is assigned to a task.


<div class="meta-api-description">
Control and configure resource allocation to tasks within project timelines, enabling mapping and managing individual or multiple resource assignments with specified unit distributions per task. Customize task-to-resource mappings, set assignment quantities, balance workloads, track which resources are engaged on specific tasks, and manage allocations dynamically during project setup. Optimize resource-task linkages, plan capacity, assign teams or individuals to work items, and define how much effort or quantity each resource contributes to each task throughout the project schedule visualization.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") },
            { id: 2, title: "Task 2", start: new Date("2023/1/6"), end: new Date("2023/1/10") }
        ],
        resources: {
            dataSource: [
                { id: 1, name: "Resource 1", color: "red" },
                { id: 2, name: "Resource 2", color: "blue" }
            ]
        },
        assignments: {
            dataSource: [
                { taskId: 1, resourceId: 1, units: 1 },
                { taskId: 2, resourceId: 2, units: 0.5 }
            ]
        }
    });
    </script>

### assignments.dataSource `Object|Array|kendo.data.DataSource`

The data source which contains assignment data items.  Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
Bind or link resource assignments in a project timeline or task scheduler to a variety of data sources including JavaScript objects, arrays, or pre-configured data source instances, enabling seamless integration of assignment details such as task-to-resource mapping, allocation data, or workload distribution. Configure, set, or connect assignment collections to dynamic or static data inputs, support real-time updates, and control how assignment data populates and syncs within Gantt charts or project planning tools by utilizing arrays, custom data configurations, or existing data management instances without redundant reinitialization.
</div>

#### Example - set the assignments data source

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 0,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/7/01 11:00")
        },
         {
           id: 1,
           orderId: 1,
           parentId: null,
           title: "Task2",
           start: new Date("2014/6/20 12:00"),
           end: new Date("2014/7/02 14:00")
         }],
        resources: {
          dataSource: [
            { id: 0, name: "Resource 1", color: "green", format: "p0" },
            { id: 1, name: "Resource 2", color: "#32cd32", format: "p0" }
          ]
        },
      assignments: {
        dataSource: [
          { taskId: 0, resourceId: 0, value: 1 },
          { taskId: 0, resourceId: 1, value: 1 },
          { taskId: 1, resourceId: 1, value: 1 }
        ]
      },
      views: ["week"],
      columns: [
        { field: "title", title: "Title" },
        { field: "resources", title: "Task Resources" }
      ]
    });
    </script>

### assignments.dataResourceIdField `String` *(default: "resourceId")*

The field of the assignment data item which represents the resource id.


<div class="meta-api-description">
Specify or configure the field name that links assignment records to resource identifiers, enabling the mapping or binding of tasks to resources within project scheduling or Gantt chart setups. Control how assignment data points connect to resource entries by setting the key or property that holds resource IDs, ensuring accurate allocation and assignment matching in timeline views, resource management, or workload distribution. Enable linking, referencing, or associating individual assignments with specific resources through customizable field names in data structures for resource tracking, task assignment, or project planning contexts.
</div>

#### Example - set the assignments data resourceId field

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 0,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/7/01 11:00")
        },
         {
           id: 1,
           orderId: 1,
           parentId: null,
           title: "Task2",
           start: new Date("2014/6/20 12:00"),
           end: new Date("2014/7/02 14:00")
         }],
        resources: {
          dataSource: [
            { id: 0, name: "Resource 1", color: "green", format: "p0" },
            { id: 1, name: "Resource 2", color: "#32cd32", format: "p0" }
          ]
        },
      assignments: {
        dataResourceIdField: "resource",
        dataSource: [
          { taskId: 0, resource: 0, value: 1 },
          { taskId: 0, resource: 1, value: 1 },
          { taskId: 1, resource: 1, value: 1 }
        ]
      },
      views: ["week"],
      columns: [
        { field: "title", title: "Title" },
        { field: "resources", title: "Task Resources" }
      ]
    });
    </script>

### assignments.dataTaskIdField `String` *(default: "taskId")*

The field of the assignment data item which represents the task id.


<div class="meta-api-description">
Configure the field name that links assignment records to their corresponding tasks by specifying the identifier used in assignment data to reference tasks, enabling accurate mapping, binding, or association between task assignments and the relevant task entries. Control how assignments reference tasks by setting or customizing the property key that holds task IDs within assignment objects, facilitating task-assignment relationship management, synchronization, or data linking in Gantt or scheduling workflows.
</div>

#### Example - set the assignments data taskId field

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 0,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/7/01 11:00")
        },
         {
           id: 1,
           orderId: 1,
           parentId: null,
           title: "Task2",
           start: new Date("2014/6/20 12:00"),
           end: new Date("2014/7/02 14:00")
         }],
        resources: {
          dataSource: [
            { id: 0, name: "Resource 1", color: "green", format: "p0" },
            { id: 1, name: "Resource 2", color: "#32cd32", format: "p0" }
          ]
        },
      assignments: {
        dataTaskIdField: "id",
        dataSource: [
          { id: 0, resourceId: 0, value: 1 },
          { id: 0, resourceId: 1, value: 1 },
          { id: 1, resourceId: 1, value: 1 }
        ]
      },
      views: ["week"],
      columns: [
        { field: "title", title: "Title" },
        { field: "resources", title: "Task Resources" }
      ]
    });
    </script>

### assignments.dataValueField `String` *(default: "value")*

The field of the assignment data item which represents the amount of the assigned resource.


<div class="meta-api-description">
Control or configure the specific field name used to represent the numeric quantity or workload assigned to each resource in task schedules or project timelines, enabling allocation mapping, resource assignment values, workload calculations, capacity tracking, and accurate visualization of how much work or effort is distributed per assignment in Gantt charts, timeline planners, or resource management tools by binding the data property that holds assignment amounts or allocation metrics.
</div>

#### Example - set the assignments data value field

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 0,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/7/01 11:00")
        },
         {
           id: 1,
           orderId: 1,
           parentId: null,
           title: "Task2",
           start: new Date("2014/6/20 12:00"),
           end: new Date("2014/7/02 14:00")
         }],
        resources: {
          dataSource: [
            { id: 0, name: "Resource 1", color: "green", format: "p0" },
            { id: 1, name: "Resource 2", color: "#32cd32", format: "p0" }
          ]
        },
      assignments: {
        dataValueField: "assignedValue",
        dataSource: [
          { taskId: 0, resourceId: 0, assignedValue: 1 },
          { taskId: 0, resourceId: 1, assignedValue: 1 },
          { taskId: 1, resourceId: 1, assignedValue: 1 }
        ]
      },
      views: ["week"],
      columns: [
        { field: "title", title: "Title" },
        { field: "resources", title: "Task Resources" }
      ]
    });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource/events/change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.


<div class="meta-api-description">
Configure automatic or manual data binding behavior for the Gantt chart, controlling whether it initializes and loads data from the assigned data source immediately or waits for explicit data change events before binding. Enable or disable automatic data synchronization at startup to manage when the component fetches and displays data, allowing coordinated updates when multiple components share the same data source and preventing redundant or duplicate network requests during initialization. Adjust settings for deferred data loading, event-driven binding, and synchronization timing between the data source and the Gantt to optimize performance and resource usage in applications with complex or shared data dependencies.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      autoBind: false
    });
    </script>

### columnResizeHandleWidth `Number` *(default: 3)*

Defines the width of the column resize handle in pixels. Apply a larger value for easier grasping.


<div class="meta-api-description">
Adjusting the width of the column resize handle in a Gantt chart enhances user interaction by making the drag area larger and easier to grab for both mouse and touch inputs, allowing better control when resizing columns; users often seek ways to configure, customize, or set the resize handle size or drag target area for smoother column resizing, improving usability especially on touchscreens or precise pointer movements by increasing or decreasing the pixel width of the handle for optimal flexibility in UI responsiveness and user experience.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      columns: ["title", "start", "end"],
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      resizable: true,
      columnResizeHandleWidth: 6
    });
    </script>

### columnMenu `Boolean|Object` *(default: false)*

If set to `true`, the Gantt displays the column menu when the user clicks the **Chevron** icon in the column headers. The column menu allows the user to show and hide columns, and, if filtering and sorting are enabled, filter and sort the data. By default, the column menu is disabled. Can be set to a JavaScript object which represents the column menu configuration.


<div class="meta-api-description">
Enable or configure the interactive column menu in the Gantt chart header that lets users toggle column visibility, apply sorting, and filter tasks directly by clicking the header icon; this feature supports displaying or hiding columns dynamically, controlling task views, setting filters, sorting entries, customizing menu behavior, and enhancing user control over the Gantt columns, with options to turn it on or customize behavior through configuration objects.
</div>

#### Example - enabling the column menu

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      columnMenu: true,
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        },
        {
          id: 3,
          orderId: 2,
          parentId: null,
          title: "Task3",
          start: new Date("2014/6/17 13:00"),
          end: new Date("2014/6/17 15:00")
        }

      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [
        {
          field: "title",
          menu: false
        },
        {
          field: "start",
          title: "Start Time"
        },
        {
          field: "end",
          title: "End Time"
        }
      ]
    });
    </script>

### columns `Array`

The configuration of the Gantt columns. An array of JavaScript objects or strings. A JavaScript objects are interpreted as column configurations. Strings are interpreted as the
[field](/api/javascript/ui/gantt#configuration-columns.field) to which the column is bound. The Gantt will create a column for every item of the array.

> If this setting is **not** specified the Gantt will create a single column for the task title.


<div class="meta-api-description">
Set up and customize the layout and data binding of columns in a Gantt chart by defining columns as an array of objects or field names, enabling control over how each column displays data, mapping columns to specific data fields, adjusting column structure and order, configuring custom column settings or simple field bindings, and managing column definitions for tasks and timeline views, including creating, modifying, or controlling which columns appear and how they link to underlying data properties within the Gantt visualization.
</div>

#### Example - two columns bound to the "title" and "start" fields

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: ["title" , "start"]
    });
    </script>

### columns.attributes `Object`

The HTML attributes of the table cell (`<td>`) that is rendered for the column.

> Quote all HTML attributes which are JavaScript keywords (for example, `class`).


<div class="meta-api-description">
Customize and configure HTML attributes such as id, data attributes, role, aria labels, class names, and other cell-level properties on table cells within Gantt chart columns to enhance styling, accessibility, identification, dataset integration, and dynamic behavior. Enable precise control over cell markup by setting attributes that define CSS classes, ARIA roles for screen readers, unique identifiers, and data-bindings for scripting or testing. Adjust attributes for accessibility compliance, user interface customization, dataset attributes, and cell-level event targeting or automation, supporting common attribute keywords and ensuring proper quotation for reserved JavaScript terms.
</div>

#### Example - specifyinging the column HTML attributes

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      columns: [{
        field: "title",
        attributes: {
          "class": "highlight",
          style: "text-align: right"
        }
      }, {
        field: "start"
      }]
    });
    </script>
    <style>
      .highlight {
        color: red;
      }
    </style>
    // The table cells look like `<td class="name-cell" style="text-align: right">...</td>`.

### columns.columns `Array`

The columns which will be rendered as child columns under this group column header.

> Group columns cannot be data-bound and support a limited number of bound column settings such as title.


<div class="meta-api-description">
Define and configure nested child columns within grouped headers for Gantt charts by setting collections of columns during initialization, specifying arrays of column definitions to organize sub-columns under group headings. Control and customize column layouts, enable hierarchical column structures, arrange grouped columns with specific titles or labels, and set up non-data-bound grouped columns with limited binding features. Configure column groupings to present multi-level headers, manage nested column arrays, and organize columns for complex Gantt chart views supporting structured header groupings without extensive data binding.
</div>

#### Example - setting the column group column for displaying multicolumn headers

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      columns: [{
        title: "Grouped column",
        columns: [{
          field: "title"
        }, {
          field: "start"
        }]
      }]
    });
    </script>

### columns.draggable `Boolean` *(default: false)*

If set to `true` a draghandle will be rendered and the user could reorder the rows by dragging the row via the drag handle.

> Note that the reordering operation is only a client-side operation and it does not reflect the order of any data that is bound to the server.


<div class="meta-api-description">
Control enabling drag-and-drop row reordering in the Gantt chart by configuring interactive drag handles for rows, allowing users to move tasks or entries visually within the client interface without altering the underlying data sequence or server-side order; supports intuitive reordering, customizable drag activation, and temporary rearrangement during user interaction or UI adjustments.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      columns: [
        { draggable: true },
        "title",
        "start",
        "end"
      ],
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        },
        {
          id: 3,
          orderId: 2,
          parentId: null,
          title: "Task3",
          start: new Date("2014/6/17 15:00"),
          end: new Date("2014/6/17 17:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: {
        clickMoveClick: true
      }
    });
    </script>

### columns.editable `Boolean` *(default: false)*

Specifies whether this column can be edited by the user.


<div class="meta-api-description">
Control whether individual columns in a Gantt chart can be edited or locked from user modifications, enabling developers to configure editable fields, toggle cell editability, allow or prevent changes in specific columns, set columns as read-only or writable, manage user interactions for modifying data within columns, and customize which parts of the Gantt timeline are user-adjustable or protected from edits.
</div>

#### Example - set "title" column as editable

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [
        { field: "title", title: "Title", editable: true }
      ]
    });
    </script>

### columns.editor `Function`

Provides a way to specify a custom editing UI for the column. To create the editing UI, use the `container` parameter.

> * The editing UI has to contain an element with a set `name` HTML attribute. The attribute value has to match the [`field`](/api/javascript/ui/gantt#configuration-columns.field) name.
> * The validation settings that are defined in the `model.fields` configuration will not be applied automatically. In order for the validation to work, you (the developer) are responsible for attaching the corresponding validation attributes to the editor input. If the custom editor is a widget, to avoid visual issues, you can [customize the tooltip position of the validation warning](/framework/validator/overview#customizing-the-tooltip-position).


<div class="meta-api-description">
Configure or customize an interactive editing interface for a Gantt chart column, enabling developers to create a tailored input UI rendered inside a specific container element with inputs linked by matching field names. Support embedding various types of input elements or widgets for in-place editing of timeline tasks or data columns, while manually applying validation rules and attributes consistent with the data model to enforce data integrity. Control or modify validation error display, including tooltip positioning, for better user experience and visual alignment when integrating custom editors or widgets within project scheduling and task management scenarios. Enable precise editing control, interactive updates, and seamless integration of custom form elements directly into the Gantt column layout, accommodating diverse editing workflows, validation customization, and UI adaptability.
</div>

#### Parameters

##### container `jQuery`

The jQuery object that represents the container element.

##### options `Object`

##### options.field `String`

The name of the field to which the column is bound.

##### options.format `String`

The format string of the column that is specified through the [`format`](/api/javascript/ui/gantt#configuration-columns.format) option.

##### options.model `kendo.data.GanttTask`

The model instance to which the current table row is bound.

#### Example - creating a custom column editor using the Kendo UI AutoComplete

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      columns: [{
        field: "title",
        editor: function(container, options) {
          // create an input element
          var input = $("<input/>");
          // set its name to the field to which the column is bound ('title' in this case)
          input.attr("name", options.field);
          // append it to the container
          input.appendTo(container);
          // initialize a Kendo UI AutoComplete
          input.kendoAutoComplete({
            dataTextField: "title",
            dataSource: [
              { title: "Jackson" },
              { title: "Strong" },
              { title: "Simon"}
            ]
          });
        }
      }, "start", "end"]
    });
    </script>

### columns.expandable `Boolean` *(default: false)*

If set to `true`, the column will show the icons that are used for expanding and collapsing child rows. By default, the "title" column of the Gantt is expandable.


<div class="meta-api-description">
Control whether a column in a Gantt chart can show expand and collapse buttons or icons to toggle visibility of nested or child rows, enabling users to configure which columns display interactive tree controls for expanding or collapsing hierarchical data, managing the visibility of sub-items, and enhancing navigation through project tasks; this option affects how expandable columns render toggles for child row expansion, whether during initial setup or dynamic configuration, supporting scenarios to customize which Gantt columns support hierarchical expand/collapse behavior beyond default title columns.
</div>

#### Example - making the second column expandable

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [{
        field: "id",
        expandable: true
      }, "title" , "start", "end"]
    });
    </script>

### columns.field `String`

The field to which the column is bound. The value of this field is displayed by the column during data binding.
**The field name should be a valid Javascript identifier and should contain only alphanumeric characters (or "$" or "_"), and may not start with a digit.**


<div class="meta-api-description">
Map or bind a Gantt chart column to a specific data model attribute, letting you display the value of a chosen object property within that column; configure which data field or key the column corresponds to by specifying the property name aligned with your data source, ensuring it matches valid JavaScript identifier rules such as consisting of alphanumeric characters, underscores, or dollar signs and not beginning with a number, so developers can dynamically link the column content to any relevant data property in tasks, timelines, or project items for flexible data representation and visualization.
</div>

#### Example - three columns bound to the "title", "start" and "end" fields

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: ["title" , "start", "end"]
    });
    </script>

### columns.filterable `Boolean|Object` *(default: true)*

If set to `true` and if filtering is enabled for the entire Gantt, a filter menu will be displayed for this column. If set to `false`, the filter menu will not be displayed. By default, a filter menu is displayed for all columns when filtering is enabled through the [`filterable`](/api/javascript/ui/gantt#configuration-filterable) option. Can be set to a JavaScript object which represents the filter menu configuration.


<div class="meta-api-description">
Enable or disable filtering options in Gantt chart columns by controlling the visibility and configuration of filter menus, including toggling filter dropdowns on or off for individual columns, customizing filter behavior with objects or boolean values, setting whether columns display filter controls for searching or narrowing tasks, adjusting filter UI accessibility in columns, and managing how users can apply, show, or hide filters in the Gantt grid interface for precise data sorting and task management.
</div>

#### Example - disable filtering

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      filterable: true,
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [{
        field: "title",
        filterable: false
      }, "start", "end"]
    });
    </script>

### columns.filterable.ui `String|Function`

The `role` [data attribute](/framework/data-attribute-initialization) of the widget that is used in the filter menu, or a JavaScript function which initializes that widget.


<div class="meta-api-description">
Configure and customize the filter menu interface for columns in a Gantt chart by setting the role attribute or providing a function to initialize filter UI components, enabling tailored filtering controls, dynamic filter menus, advanced filter customization, and integration of custom filter widgets within the column headers for efficient data filtering, user interface control, and enhanced user interactions in project timelines or task views.
</div>

#### Example - specifyinging the filter UI as a string

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      filterable: true,
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [{
        field: "title"
      }, {
        field: "start",
        filterable: {
          ui: "datepicker" // use Kendo UI DatePicker
        }
      }, {
        field: "end"
      }]
    });
    </script>

#### Example - initializing the filter UI

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      filterable: true,
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [{
        field: "title"
      }, {
        field: "start",
        filterable: {
          ui: function(element) {
            element.kendoDatePicker(); // initialize a Kendo UI DatePicker
          }
        }
      }, {
        field: "end"
      }]
    });
    </script>

### columns.format `String`

The format that is applied to the value before it is displayed. Takes the form "{0:format}" where "format" is a [standard number format](/api/javascript/kendo#standard-number-formats),
[custom number format](/api/javascript/kendo#custom-number-formats), [standard date format](/api/javascript/kendo#standard-date-formats) or a [custom date format](/api/javascript/kendo#custom-date-formats).

> The [kendo.format](/api/javascript/kendo/methods/format) function is used to format the value.


<div class="meta-api-description">
Customize and control the display formatting of column values in Gantt charts by specifying patterns for numbers and dates, including standard and custom numeric and date formats, using format strings like "{0:format}" and enabling precise control over how data appears in each column; adjust, define, or set formatting for numeric, date, and custom formats to ensure consistent, readable presentation tailored to specific requirements, supporting various formatting needs such as currency, percentages, short or long date styles, custom patterns, and more.
</div>

#### Example - set format for the start and end column

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        },
        {
          id: 3,
          orderId: 2,
          parentId: null,
          title: "Task3",
          start: new Date("2014/6/17 13:00"),
          end: new Date("2014/6/17 15:00")
        }

      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [
        { field: "start", title: "Start Time", format: "{0:MM/dd hh:mm}" },
        { field: "end", title: "End Time", format: "{0:MM/dd hh:mm}" }
      ]
    });
    </script>

### columns.headerAttributes `Object`

The HTML attributes of the table header cell (`<th>`) that is rendered for the column.

> Quote the HTML attributes which are JavaScript keywords (for example, `class`).


<div class="meta-api-description">
Set or modify HTML attributes for Gantt chart column headers to control styling, accessibility, and behavior by applying custom classes, IDs, data attributes, aria labels, inline CSS styles, or other HTML properties. Configure header cell attributes to add or override tag properties in the table header, enabling developers to enhance presentation, support screen readers, assign CSS hooks, or define data attributes for scripting purposes. Adjust or customize the header element’s attributes with flexible key-value pairs for precise visual control and semantic markup in Gantt columns.
</div>

#### Example - specifyinging column header HTML attributes

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        },
        {
          id: 3,
          orderId: 2,
          parentId: null,
          title: "Task3",
          start: new Date("2014/6/17 13:00"),
          end: new Date("2014/6/17 15:00")
        }

      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [
        {
          field: "start",
          title: "Start Time",
          headerAttributes: {
            "class": "name-header",
            style: "text-align: right"
          }
        },
        { field: "end", title: "End Time" }
      ]
    });
    </script>

### columns.headerTemplate `String|Function`

The [`template`](/api/javascript/kendo/methods/template) which renders the column header content. By default, the value of the [`title`](/api/javascript/ui/gantt/configuration/columns.title) column option is displayed in the column header cell.

> If sorting is enabled, the column header content will be wrapped in an `<a>` element. As a result, the template must contain only inline elements.


<div class="meta-api-description">
Customize or control the appearance and content of column headers in Gantt charts by setting custom header templates, enabling developers to configure header rendering beyond default titles, inject inline elements, replace or modify header labels, control sorting links or interactive header elements, design personalized header layouts, adjust header display dynamically, implement header content formatting, and create tailored header presentations for project timelines or tasks.
</div>

#### Example - defining the column header template as a string

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        },
        {
          id: 3,
          orderId: 2,
          parentId: null,
          title: "Task3",
          start: new Date("2014/6/17 13:00"),
          end: new Date("2014/6/17 15:00")
        }

      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [
        {
          field: "title",
          headerTemplate: '<input type="checkbox" id="check-all" /><label for="check-all">check all</label>'
        },
        {
          field: "start",
          title: "Start Time"
        },
        {
          field: "end",
          title: "End Time"
        }
      ]
    });
    </script>

### columns.hidden `Boolean` *(default: false)*

If set to `true`, the Gantt will not display the column. By default, all columns are displayed.


<div class="meta-api-description">
Control and customize which columns are visible in the Gantt chart by configuring column visibility settings to hide or show specific fields, enabling you to manage layout and reduce clutter by selectively disabling column display, toggling visibility on or off, setting columns to be concealed or revealed within the project timeline view, adjusting the table to focus on relevant data by hiding unnecessary columns, and dynamically controlling which columns appear for better interface organization and streamlined task tracking.
</div>

#### Example - hiding columns

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        },
        {
          id: 3,
          orderId: 2,
          parentId: null,
          title: "Task3",
          start: new Date("2014/6/17 13:00"),
          end: new Date("2014/6/17 15:00")
        }

      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [
        {
          field: "title",
          hidden: true
        },
        {
          field: "start",
          title: "Start Time"
        },
        {
          field: "end",
          title: "End Time"
        }
      ]
    });
    </script>

### columns.menu `Boolean`

If set to `true`, the Gantt will display the column in the column menu. By default, the column menu includes all data-bound columns, that is, the ones with a set [`field`](/api/javascript/ui/gantt#configuration-columns.field) option.


<div class="meta-api-description">
Manage the visibility of individual columns in the Gantt chart’s column menu by enabling or disabling their presence, allowing users to toggle columns on or off for customized views; configure settings to include specific columns in the menu, control per-column display options, set which data-bound columns appear, and adjust user access to column visibility controls for tailored Gantt chart layouts.
</div>

#### Example - hiding a column from the column menu

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      columnMenu: true,
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        },
        {
          id: 3,
          orderId: 2,
          parentId: null,
          title: "Task3",
          start: new Date("2014/6/17 13:00"),
          end: new Date("2014/6/17 15:00")
        }

      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [
        {
          field: "title",
          menu: false
        },
        {
          field: "start",
          title: "Start Time"
        },
        {
          field: "end",
          title: "End Time"
        }
      ]
    });
    </script>

### columns.minScreenWidth `Number`

The pixel screen width below which the column will be hidden. The setting takes precedence over the [`hidden`](/api/javascript/ui/gantt/configuration/columns.hidden) setting and the two cannot not be used at the same time.


<div class="meta-api-description">
Control the visibility of table or Gantt chart columns based on screen size or viewport width by setting a minimum pixel breakpoint that hides specific columns when the display width falls below the specified threshold. Configure responsive layouts, enable automatic column hiding for smaller devices, adjust or set breakpoints to customize column display for mobile or narrow screens, manage dynamic column visibility during window resizing, override static hidden states with screen width conditions, and optimize UI layout adaptability by controlling which columns appear or disappear depending on device width or responsive design needs.
</div>

#### Example - hiding columns when the screen is smaller than a given width

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        },
        {
          id: 3,
          orderId: 2,
          parentId: null,
          title: "Task3",
          start: new Date("2014/6/17 13:00"),
          end: new Date("2014/6/17 15:00")
        }

      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [
        {
          field: "title"
        },
        {
          field: "start",
          title: "Start Time",
          minScreenWidth: 750
        },
        {
          field: "end",
          title: "End Time",
          minScreenWidth: 750
        }
      ]
    });
    </script>


### columns.sortable `Boolean|Object` *(default: false)*

If set to `true` the user could sort this column by clicking its header cells. By default sorting is disabled.


<div class="meta-api-description">
Enable or configure column header sorting to allow users to sort tasks or entries in the Gantt chart by clicking on column headers, controlling whether each column can be ordered ascending or descending, setting sortable behavior per column during setup to support interactive sorting features, toggling column-level sorting on or off, managing user-driven reorder of rows based on column values, and customizing which columns support clickable sorting functionality for improved data organization and navigation in the Gantt interface.
</div>

#### Example - set "start" column as sortable

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        },
        {
          id: 3,
          orderId: 2,
          parentId: null,
          title: "Task3",
          start: new Date("2014/6/17 13:00"),
          end: new Date("2014/6/17 15:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [
        { field: "title", title: "Title", sortable: true }
      ]
    });
    </script>

### columns.sortable.compare `Function`

A JavaScript function for comparing the values.

* If the first argument is less than the second one, returns `-1`.
* If both arguments are the same, returns `0`.
* If the first argument is greater than the second one, returns `+1`.


<div class="meta-api-description">
Customize the sorting order of columns by defining a comparison function or comparator that controls how two values are evaluated, compared, or sorted during column sorting, enabling developers to set, adjust, or override default sorting logic with custom criteria or ordering rules for strings, numbers, dates, or complex objects; support for providing a JavaScript function to compare cell values, returning indicators for less than, equal, or greater than relationships ensures fine-tuned, controlled, or tailored ascending or descending order behavior in Gantt chart columns, applicable to initialization, sorting events, or dynamic reordering scenarios.
</div>

#### Example - defining the custom compare function

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "TaskOne",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        },
        {
          id: 3,
          orderId: 2,
          parentId: null,
          title: "TaskLongTitle",
          start: new Date("2014/6/17 13:00"),
          end: new Date("2014/6/17 15:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [
        {
          field: "title",
          title: "Title",
          sortable: {
            compare: function(a, b) {
              return a.title.length - b.title.length;
            }
          }
        }
      ]
    });
    </script>

### columns.template `String|Function`

The [`template`](/api/javascript/kendo/methods/template) which renders the column content. The Gantt renders table rows (`<tr>`) which represent the data source items.
Each table row consists of table cells (`<td>`) which represent the GanttList columns. By default, the HTML-encoded value of the [`field`](/api/javascript/ui/gantt#configuration-columns.field) is displayed in the column.

> To customize the way the column displays its value, use `template`.


<div class="meta-api-description">
Control and customize the rendering of Gantt chart column cells by defining a custom template to format, display, or inject HTML content within each cell, enabling developers to configure how data fields appear, bind dynamic content, apply custom layouts, or replace default encoded text with rich, customized visual elements inside the table cells of the Gantt chart rows; options include setting templates to manipulate cell content presentation, enabling advanced formatting, data binding transformations, and incorporating HTML or UI components for tailored column display in project timelines and task lists.
</div>

#### Example - setting the template as a string (wrapping the column value in HTML)

    <div id="gantt"></div>
    <script>
      $("#gantt").kendoGantt({
        dataSource: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 2,
            orderId: 1,
            parentId: null,
            title: "Task2",
            start: new Date("2014/6/17 12:00"),
            end: new Date("2014/6/17 14:00")
          },
          {
            id: 3,
            orderId: 2,
            parentId: null,
            title: "Task3",
            start: new Date("2014/6/17 13:00"),
            end: new Date("2014/6/17 15:00")
          }
        ],
        columns: [
          { field: "id" },
          { field: "title", template: "<strong>#: title #</strong>" }
        ]
      });
    </script>

#### Example - setting an external template with conditional formatting and a button handler

    <script type="text/x-kendo-template" id="template">
        # if (data.summary) { #
            <button class='k-button btn-summary'>Click summary</button>
        # } #
    </script>

    <div id="gantt"></div>

    <script>
      $("#gantt").kendoGantt({
        dataSource: [
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
            orderId: 1,
            parentId: null,
            title: "Task2",
            summary: false,
            start: new Date("2014/6/17 12:00"),
            end: new Date("2014/6/17 14:00")
          },
          {
            id: 3,
            orderId: 2,
            parentId: 1,
            title: "Task3",
            summary: false,
            start: new Date("2014/6/17 13:00"),
            end: new Date("2014/6/17 15:00")
          }
        ],
        columns: [
          { field: "id" },
          { field: "title" },
          { field: "summary", template: $("#template").html() }
        ]
      })
      .on("click", ".btn-summary", function(e) {
        var gantt = $(e.delegateTarget).data("kendoGantt");
        var dataItem = gantt.dataItem($(e.currentTarget).closest("tr"));
        alert("Summary clicked: " + dataItem.title)
      });
    </script>

### columns.title `String`

The text that is displayed in the column header cell. If not set the [field](/api/javascript/ui/gantt#configuration-columns.field) is used.


<div class="meta-api-description">
Set or customize the header text or label displayed at the top of a column in a Gantt chart, control what column titles or captions appear, configure or change the column header names during setup or dynamically, define custom text or override default headers derived from data fields, adjust column headings or labels for clarity and presentation in task timelines, enable tailored column headings for better identification in Gantt views, specify or update the visible titles of columns to match project plan terminology, rename or set header text for task list columns in scheduling interfaces.
</div>

#### Example - set the title of a column

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [ { field: "title", title: "Task Title" } ]
    });
    </script>

### columns.width `String|Number`

The width of the column. Numeric values are treated as pixels.


<div class="meta-api-description">
Adjust column width, set fixed pixel sizes, control and customize the exact size of columns in a Gantt chart, define precise numeric widths for column layout, manage column sizing and spacing, configure Gantt grid column dimensions, enable fixed or resizable column widths, specify pixel-based sizes to control visual layout and alignment of Gantt columns, modify horizontal sizing for timeline or task columns, optimize column display width in scheduling or project planning grids.
</div>

#### Example - set the column width as a string

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [
        { field: "title", title: "Title", width: "200px" },
        { field: "start", title: "Task Start Time", width: "200px" },
        { field: "end", title: "Task End Time", width: "200px" }
      ]
    });
    </script>

#### Example - set the column width as a number

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [
        { field: "title", title: "Title", width: 200 },
        { field: "start", title: "Task Start Time", width: 200 },
        { field: "end", title: "Task End Time", width: 200 }
      ]
    });
    </script>

### currentTimeMarker `Boolean|Object` *(default: true)*

If set to `false` the "current time" marker of the Gantt would not be displayed.


<div class="meta-api-description">
Control the visibility of the real-time progress indicator or current timestamp marker on a Gantt chart, enabling or disabling the display of the present time line for project tracking, timeline visualization, and scheduling updates. Configure whether to show a dynamic time pointer or a current date marker on the timeline, useful for highlighting the ongoing time position during task planning, deadline monitoring, or progress assessments, and customize or suppress this feature to suit dashboard views, live updates, or static presentations.
</div>

#### Example - disable "current time" marker
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date(),
        end: kendo.date.addDays(new Date(), 1)
      }],
      currentTimeMarker: false,
      views: [ "day", "week", "month" ]
    });
    </script>

### currentTimeMarker.updateInterval `Number` *(default: 10000)*

The update interval of the "current time" marker, in milliseconds.


<div class="meta-api-description">
Control the frequency or interval at which the real-time current time indicator or "now" line in a scheduling or timeline view refreshes, update, or redraw, specifying the duration in milliseconds to set how often the live time marker updates or ticks, enabling adjustment of automatic refresh rates for accurate current time display in Gantt charts, timeline widgets, or project planners to balance performance and real-time precision, including configuring update speed for current moment highlighting and live time tracking.
</div>

#### Example - set the update interval of the "current time" marker
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date(),
        end: kendo.date.addDays(new Date(), 1)
      }],
      currentTimeMarker: {
        updateInterval: 100
      },
      views: [ "day", "week", "month" ]
    });
    </script>

### dataSource `Object|Array|kendo.data.GanttDataSource`

The data source of the widget which contains the tasks. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.GanttDataSource](/api/javascript/data/ganttdatasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.GanttDataSource](/api/javascript/data/ganttdatasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.GanttDataSource](/api/javascript/data/ganttdatasource) instance the widget will use that instance and will **not** initialize a new one.

> The Kendo UI Gantt widget can be bound *only* to a `kendo.data.GanttDataSource`. An exception will be thrown if the `dataSource` option is set to a `kendo.data.DataSource` instance.


<div class="meta-api-description">
Configure and bind the task collection for the Gantt chart by setting or updating the data source to manage task lists, schedules, and dependencies. Enable loading, syncing, and modifying tasks through local arrays, JavaScript objects, or existing data source instances specifically designed for Gantt data, allowing integration with various data configurations or external data management solutions. Control and connect to a structured task dataset, whether initializing a new data source from simple arrays or configuration objects or reusing an existing specialized Gantt data source instance to maintain live updates, data binding, and task management workflows. This allows developers to set up, update, or synchronize project tasks dynamically within Gantt visualizations using compatible, task-oriented data sources.
</div>

#### Example - set dataSource as a JavaScript object

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: {
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/gantttasks"
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
      },
      editable: false
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        },
        {
          id: 3,
          orderId: 2,
          parentId: null,
          title: "Task3",
          start: new Date("2014/6/17 13:00"),
          end: new Date("2014/6/17 15:00")
        }
      ],
      editable: false
    });
    </script>

#### Example - set dataSource as an existing `kendo.data.GanttDataSource` instance

    <div id="gantt"></div>
    <script>
    var dataSource = new kendo.data.GanttDataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/gantttasks"
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
    $("#gantt").kendoGantt({
      dataSource:dataSource,
      editable: false
    });
    </script>

### date `Date`

If set to some date and it is between the range start and range end of the selected view, the timeline of the currently selected view is scrolled to start from this date.


<div class="meta-api-description">
Set or control the timeline start date to focus the Gantt chart display on a specific day, enabling precise scrolling or jumping to a targeted point in time within the current view, such as navigating directly to a particular date range, customizing the visible timeline window, or aligning the timeline start with project milestones or deadlines; supports configuring initial timeline positioning for better overview, context-specific date navigation, and tailored date-based timeline shifts in Gantt chart visualizations.
</div>

#### Example
    <div id="gantt1"></div>
    <script>
        $("#gantt1").kendoGantt({
            dataSource: [{
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2016/09/20 09:00"),
                end: new Date("2016/09/20 10:00")
            }],
            date: new Date("2016/09/20"),
            views: [
              {
                  type: "day", selected: true,
                  range: {
                      start: new Date("2016/09/1"),
                      end: new Date("2016/10/15")
                  },
              }
            ]
        });
    </script>

### dependencies `Object|Array|kendo.data.GanttDependencyDataSource`

The data source of the widget which contains the dependencies. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.GanttDependencyDataSource](/api/javascript/data/ganttdependencydatasource)
instance.

If the `dependencies` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.GanttDependencyDataSource](/api/javascript/data/ganttdependencydatasource) instance using that value as data source configuration.

If the `dependencies` option is an existing [kendo.data.GanttDependencyDataSource](/api/javascript/data/ganttdependencydatasource) instance the widget will use that instance and will **not** initialize a new one.

> The Kendo UI Gantt dependencies can be bound *only* to a `kendo.data.GanttDependencyDataSource`. An exception will be thrown if the `dataSource` option is set to a `kendo.data.DataSource` instance.


<div class="meta-api-description">
Set, bind, or configure task dependencies for a Gantt chart using source data such as JavaScript arrays, objects, or specialized data source instances to manage how linked tasks load, update, or synchronize dependency relationships; control dependency binding by providing data configurations or existing dependency data sources, enabling flexible integration with project plans and workflows while ensuring compatibility with dedicated dependency data structures for accurate linkage and error prevention when using incompatible data sources.
</div>

#### Example - set `dependencies` as a JavaScript object

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: {
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/gantttasks"
          }
        },
        schema: {
          model: {
            id: "id",
            fields: {
              id: { from: "ID", type: "number" },
              orderId: { from: "OrderID", type: "number", validation: { required: true } },
              parentId: { from: "ParentID", type: "number", defaultValue: null, nullable: true },
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
            url: "https://demos.telerik.com/service/v2/core/ganttdependencies"
          }
        },
        schema: {
          model: {
            id: "id",
            fields: {
              predecessorId: { from: "PredecessorID", type: "number" },
              successorId: { from: "SuccessorID", type: "number" },
              type: { from: "Type", type: "number" }
            }
          }
        }
      },
      views: [{ type: "week", selected: true }],
      editable: false
    });
    </script>

#### Example - set `dependencies` as a JavaScript array

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: false
    });
    </script>

#### Example - set `dependencies` as an existing `kendo.data.GanttDependencyDataSource` instance

    <div id="gantt"></div>
    <script>
    var dataSource = new kendo.data.GanttDataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/gantttasks"
        }
      },
      schema: {
        model: {
          id: "id",
          fields: {
            id: { from: "ID", type: "number" },
            orderId: { from: "OrderID", type: "number", validation: { required: true } },
            parentId: { from: "ParentID", type: "number", defaultValue: null, nullable: true },
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
    var dependencyDataSource = new kendo.data.GanttDependencyDataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/ganttdependencies"
        }
      },
      schema: {
        model: {
          id: "id",
          fields: {
            predecessorId: { from: "PredecessorID", type: "number" },
            successorId: { from: "SuccessorID", type: "number" },
            type: { from: "Type", type: "number" }
          }
        }
      }
    });
    $("#gantt").kendoGantt({
      dataSource:dataSource,
      dependencies: dependencyDataSource,
      views: [{ type: "week", selected: true }],
      editable: false
    });
    </script>

### editable `Boolean|Object` *(default: true)*

If set to `false` the user won't be able to create, modify or delete tasks and dependencies.


<div class="meta-api-description">
Enable or disable the ability for users to create, modify, update, or delete tasks and dependencies within a Gantt chart, controlling whether the timeline and task relationships can be edited directly. Toggle interactive editing features to set the Gantt as fully editable for changing schedules, dependencies, and task details, or switch to a read-only mode where task manipulation and dependency adjustments are blocked, ensuring the project timeline remains static. Manage permissions and editing controls to allow or restrict user modifications, updates, or removals of task elements and connections within the Gantt visualization.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: false
    });
    </script>

### editable.clickMoveClick `Boolean` *(default: true)*

If set to `true` (default), when there is a drag column for the items in the TreeList part of the Gantt, the user will be allowed to reorder rows via click move click interaction as an alternative of the drag and drop one.


<div class="meta-api-description">
Control whether the Gantt chart supports rearranging rows by clicking once to select, moving the mouse, and clicking again to drop, offering an alternative to traditional drag-and-drop row reordering in the tree list area. Enable, disable, set, or configure click-move-click interactions to reorder tasks or rows, facilitating intuitive manual sequencing without dragging, suitable for users who prefer stepwise click-based repositioning of items within hierarchical views or project timelines. Adjust settings to allow interactive row movement via click sequences during layout setup or component initialization, optimizing user experience for customizable task order management through versatile input methods.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      columns: [
        { draggable: true, width: "40px" },
        "title",
        "start",
        "end"
      ],
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: {
      	clickMoveClick: false
      }
    });
    </script>

### editable.confirmation `Boolean` *(default: true)*

If set to `true` the Gantt will display a confirmation dialog when the user deletes a task or a dependency.


<div class="meta-api-description">
Control whether users see a confirmation prompt or dialog before deleting tasks, dependencies, or items in the Gantt chart to prevent accidental removals; enable, disable, set, or configure deletion confirmations to require explicit user approval, manage undo or safety checks during editing, and customize workflow behavior around task or dependency deletion in project timelines and scheduling interfaces.
</div>

#### Example - disable delete confirmation
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: {
      	confirmation: false
      }
    });
    </script>

### editable.create `Boolean` *(default: true)*

If set to `false` the user won't be able to create tasks.


<div class="meta-api-description">
Control whether users can add or insert new tasks directly within the Gantt chart interface, enabling or disabling task creation functionality through the UI to prevent or allow creating tasks interactively. Configure task adding permissions, toggle the ability to create new entries, restrict or permit new task generation, manage whether users can initiate new activities or work items in the Gantt view, set user access to task creation features during setup, and customize the Gantt component to block or allow adding new tasks on the fly. This setting governs the interactive creation of tasks, controlling the insertion or addition of tasks by end users in scheduling or project planning scenarios.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: {
      	create: false
      }
    });
    </script>

### editable.dependencyCreate `Boolean` *(default: true)*

If set to `false` the user won't be able to create dependencies.


<div class="meta-api-description">
Enable or disable the ability for users to add or create task dependencies, link tasks sequentially, set predecessor-successor relationships, control dependency creation permissions within the Gantt chart, configure whether dependencies can be established interactively, manage task linkage options, allow or restrict establishing order or dependency connections between tasks, toggle dependency creation features during setup, and control user interactions related to making tasks dependent on others.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: {
      	dependencyCreate: false
      }
    });
    </script>

### editable.dependencyDestroy `Boolean` *(default: true)*

If set to `false` the user won't be able to delete dependencies.


<div class="meta-api-description">
Control enabling or disabling the ability to remove or delete task dependencies in a Gantt chart, managing whether users can modify, break, or destroy links between tasks, setting permissions to prevent or allow dependency removal or editing, configuring if dependencies can be erased, disconnected, or altered during project scheduling, and specifying whether users have control over deleting task relationships within the timeline or dependency graph.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: {
      	dependencyDestroy: false
      }
    });
    </script>

### editable.dragPercentComplete `Boolean` *(default: true)*

If set to `false` the user won't be able to edit the percentComplete of the tasks.


<div class="meta-api-description">
Control whether users can update a task’s completion status by dragging its progress bar, enabling or disabling interactive adjustment of task percent complete via drag-and-drop gestures, allowing configuration to set, change, or lock the progress update through user drag interactions on tasks, managing the ability to modify percentComplete visually by dragging, restricting or permitting manual editing of task progress during scheduling, toggling interactive progress updates for tasks in a timeline view, and customizing user control over task completion adjustments through direct manipulation in Gantt charts.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: {
      	dragPercentComplete: false
      }
    });
    </script>

### editable.destroy `Boolean` *(default: true)*

If set to `false` the user won't be able to delete tasks.


<div class="meta-api-description">
Control and configure user permissions to enable or disable the removal or deletion of tasks from the timeline interface, managing whether tasks can be erased or destroyed through the graphical UI or programmatically, including settings to prevent accidental or unauthorized task deletions during project scheduling or editing.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: {
      	destroy: false
      }
    });
    </script>

### editable.move `Boolean` *(default: true)*

If set to `false` the user won't be able to move tasks.


<div class="meta-api-description">
Control whether tasks can be repositioned on the Gantt timeline by enabling or disabling drag-and-drop task movement, allowing you to lock task placement or permit users to drag tasks to different dates or positions. Configure task mobility, set if tasks are movable or fixed, restrict timeline editing by disabling task dragging, and manage task rescheduling capabilities to prevent or allow repositioning tasks within the schedule. Adjust settings to permit interactive task shifting, enable or disable user-driven task movement, and control timeline editing behavior related to task placement changes and task rearrangement.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: {
      	move: false
      }
    });
    </script>

### editable.plannedTasks `Boolean` *(default: false)*

If set to `true` the default pop-up editor of the Gantt will render the `plannedStart` and `plannedEnd` editors for the edited task.


<div class="meta-api-description">
Control the ability to show and modify planned start and end dates within task editing interfaces by enabling or disabling input fields for scheduled timelines, manage and configure editable planned timelines during task updates, allow users to set or adjust projected start and finish times directly in the task editor popup, support editing of planned scheduling parameters for detailed project planning, customize task pop-ups to include planned date controls for easier timeline management, enable planned schedule editing features for adjusting forecasted task durations or milestones within interactive project views.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          plannedStart: new Date("2014/6/17 9:00"),
          plannedEnd: new Date("2014/6/17 10:00"),
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          plannedStart: new Date("2014/6/17 12:00"),
          plannedEnd: new Date("2014/6/17 16:00"),
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [{
        predecessorId: 1,
        successorId: 2,
        type: 1
      }],
      editable: {
      	plannedTasks: true
      }
    });
    </script>

### editable.reorder `Boolean` *(default: true)*

If set to `false` the user won't be able to reorder tasks in the task list.


<div class="meta-api-description">
Control task list rearrangement by enabling or disabling drag-and-drop functionality for reordering tasks within the Gantt chart, allowing users to set whether tasks can be moved interactively to adjust their sequence, configure reorder permissions to prevent or allow manual task positioning, manage task order updates via dragging, toggle the ability to reorder tasks in the project timeline, and specify if the task list supports user-driven task order changes through dragging actions during setup or runtime.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: {
      	reorder: false
      }
    });
    </script>

### editable.resize `Boolean` *(default: true)*

If set to `false` the user won't be able to resize tasks.


<div class="meta-api-description">
Enable or disable the ability for users to adjust task duration by dragging the edges of timeline bars, controlling whether tasks can be interactively stretched or shortened in scheduling interfaces. Manage task resizing features such as click-and-drag to modify start or end dates within project timelines, timeline bars, or Gantt charts, including toggling user permissions for resizing tasks, preventing or allowing users to dynamically change task lengths, and configuring interactive timeline editing controls for duration adjustment on task bars.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: {
      	resize: false
      }
    });
    </script>

### editable.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the editor.

The template should contain elements whose `name` HTML attributes are set as the editable fields. This is how the Gantt will know
which field to update. The other option is to use [MVVM](/framework/mvvm/overview) bindings in order to bind HTML elements to data item fields.

> Use the `role` data attribute to initialize Kendo UI widgets in the template. Check [data attribute initialization](https://www.telerik.com/kendo-jquery-ui/documentation/intro/widget-basics/mvvm-initialization) for more info.


<div class="meta-api-description">
Configure or customize the interactive task editor layout in project scheduling interfaces by defining HTML templates that control the appearance and behavior of editable fields, enabling fine-tuned control over which data fields are shown, updated, or bound within the editing UI. Enable template-based customization for dynamic rendering of input elements linked to data model properties through attribute mapping such as name attributes for field matching or data-role attributes for integrating UI components, supporting both direct HTML template injection and MVVM-style data bindings to create tailored, editable project timeline interfaces. Adjust and set custom editing templates that influence the display and functionality of task editors, form controls, and input bindings within Gantt or project management visualizations, facilitating flexible UI modifications for inline editing, field synchronization, and component initialization inside editable areas.
</div>

#### Example - customize the popup editor

    <script id="editor" type="text/x-kendo-template">
       <h3>Edit meeting</h3>
       <p>
           <label>Title: <input name="title" /></label>
       </p>
       <p>
           <label>Start: <input data-role="datetimepicker" name="start" /></label>
       </p>
       <p>
           <label>End: <input data-role="datetimepicker" name="end" /></label>
       </p>
    </script>
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      editable: {
      	template: $("#editor").html()
      }
    });
    </script>

#### Example - using MVVM in the popup editor template

    <script id="editor" type="text/x-kendo-template">
       <h3>Edit meeting</h3>
       <p>
           <label>Title: <input data-bind="value: title" /></label>
       </p>
       <p>
           <label>Start: <input data-role="datetimepicker" data-bind="value: start" /></label>
       </p>
       <p>
           <label>End: <input data-role="datetimepicker" data-bind="value: end" /></label>
       </p>
    </script>
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      editable: {
      	template: $("#editor").html()
      }
    });
    </script>

### editable.update `Boolean` *(default: true)*

If set to `false` the user won't be able to update tasks.


<div class="meta-api-description">
Enable or disable the ability for users to modify, edit, or update existing tasks in the Gantt chart interface, controlling whether task details can be changed interactively through the UI; configure the setting to allow task adjustments, edits, or to lock tasks from being altered, supporting use cases that require task update permissions to be set or restricted during initialization or runtime.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      editable: {
      	update: false
      }
    });
    </script>

### filterable `Boolean|Object` *(default: false)*

If set to `true`, the user can filter the data source by using the Gantt filter menu. By default, filtering is disabled. Can be set to a JavaScript object which represents the filter menu configuration.


<div class="meta-api-description">
Control whether users can enable, configure, or customize filtering on the Gantt chart data, including turning on or off the filter interface, setting up filter menus, managing filter behaviors, specifying filter criteria, enabling interactive data filtering, applying search or filter conditions to tasks or events, adjusting filter options, and tailoring the filter UI to allow dynamic filtering of the timeline or project data within the Gantt visualization.
</div>

#### Example - enabling and configuring filtering

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      filterable: true,
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [{
        field: "title",
        filterable: false
      }, "start", "end"]
    });
    </script>

### reorderable `Boolean` *(default:false)*

If set to `true`, the user can reorder the columns in the GanttList section of the widget by dragging their header cells. By default, reordering is disabled.


<div class="meta-api-description">
Control the ability to enable or disable drag-and-drop column reordering within a Gantt chart's list or grid area, allowing users to rearrange, move, drag, or reorder header columns interactively for customized layouts and improved data organization; this feature can be configured to allow flexible column positioning, header dragging, dynamic rearrangement, and user-controlled column order adjustment in schedule or project timelines.
</div>

#### Example - enabling column reordering

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      reorderable: true,
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      columns: [{
        field: "title",
        filterable: false
      }, "start", "end"]
    });
    </script>

### navigatable `Boolean` *(default: true)*

If set to `true` the user could navigate the widget using the keyboard. By default keyboard navigation is enabled.

> Even when the keyboard navigation is disabled the user could delete selected tasks or dependencies with the `Del` key.


<div class="meta-api-description">
Control keyboard navigation and focus movement within the Gantt interface by enabling or disabling keyboard interaction, allowing users to traverse tasks, dependencies, and timeline elements using keys, configure keyboard shortcuts for task selection, activation, and deletion, set focus behavior for accessibility and efficiency, manage keyboard-driven operations such as moving between cells or bars, supporting keyboard commands like Delete for removing tasks or dependencies regardless of overall navigation settings.
</div>

#### Example - enable keyboard navigation

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ],
      navigatable: true
    });
    </script>

### workDayStart `Date`

Sets the start of the work day.


<div class="meta-api-description">
Configure the start hour of the working day to define business hours for project scheduling, task timing, resource planning, and dependency calculations, enabling control over when work begins in Gantt charts, timelines, and time-based resource allocation, useful for setting daily work start times, adjusting project calendars, customizing work shifts, managing task durations relative to office hours, and aligning schedules with organizational operating hours.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      workDayStart: new Date("2014/6/17 10:00")
    });
    </script>

### workDayEnd `Date`

Sets the end of the work day.


<div class="meta-api-description">
Set or configure the daily workday end time to define when working hours finish for scheduling, timeline calculations, resource availability, business hour displays, and task rendering in time management or project planning interfaces. Control or adjust the hour marking the conclusion of work periods to influence timeline scales, task visibility, resource allocation windows, and daily operational hours in Gantt charts or similar scheduling components. Manage and determine the end of the work period each day to affect how schedules, tasks, timelines, and business hours are calculated, displayed, and processed within project tracking or calendar applications.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      workDayEnd: new Date("2014/6/17 15:00")
    });
    </script>

### workWeekStart `Number` *(default: 1)*

The start of working week (index based).

> The `workWeekEnd` option is supported when [showWorkDays](/api/javascript/ui/gantt#configuration-showWorkDays) is `true`.


<div class="meta-api-description">
Configure or set the first day of the workweek to define how schedules, timelines, and working-day calculations are handled, enabling control over project planning and resource allocation by specifying which weekday starts the workweek, often paired with defining the workweek’s end day; useful for adjusting calendar calculations, customizing Gantt chart views for different regional or organizational standards, and ensuring accurate display and filtering of working days versus weekends in project timelines.
</div>

#### Example

    <div id="gantt"></div>
    <script>
      $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/24 11:00")
        }
      ],
      workWeekStart: 2
    });
    </script>

### workWeekEnd `Number` *(default: 5)*

The end of working week (index based).

> The `workWeekEnd` option is supported when [showWorkDays](/api/javascript/ui/gantt#configuration-showWorkDays) is `true`.


<div class="meta-api-description">
Set or configure the final working day of the week in scheduling or timeline views by specifying the day index that marks the end of active workdays; control and customize the workweek boundaries, define non-working periods, adjust the business week span for Gantt charts or project plans, toggle and manage visible workdays, and ensure the schedule aligns with organizational calendars by identifying the cutoff day in workweek settings during initialization or setup.
</div>

#### Example

    <div id="gantt"></div>
    <script>
      $("#gantt").kendoGantt({
        dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/24 11:00")
        }
      ],
      workWeekEnd: 4
    });
    </script>

### hourSpan `Number` *(default: 1)*

The span of an hour slot.


<div class="meta-api-description">
Control and customize the width or size of each hour segment on a project timeline, adjusting the timeline’s zoom level and granularity by setting how much horizontal space an hour occupies. Configure timeline scale, time axis resolution, or slot width to zoom in or out on schedule details, manage visual density of hourly intervals, and tailor the time grid appearance to improve clarity or fit more information horizontally on the Gantt chart’s time axis. Adjust hour slot sizing to create finer or broader hourly increments, enabling precise timeline manipulation for project planning, resource scheduling, or task tracking.
</div>

#### Example

    <div id="gantt"></div>
    <script>
      $("#gantt").kendoGantt({
        dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 15:00")
        }
      ],
      hourSpan: 2
    });
    </script>

### snap `Boolean` *(default: true)*

If set to true the Gantt will snap tasks to the nearest slot during dragging (resizing or moving). Set it to false to allow free moving and resizing of tasks.


<div class="meta-api-description">
Enable or disable snapping behavior for tasks when dragging or resizing timeline items, controlling whether tasks automatically align to the closest time interval or can be moved and resized freely without restriction; configure precise snapping to time slots to maintain schedule accuracy or allow pixel-level adjustments for flexible task positioning during interactive editing and timeline planning.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
         orderId: 0,
         parentId: null,
        title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      snap: false
    });
    </script>

### height `Number|String` *(default: 600)*

The height of the widget. Numeric values are treated as pixels.


<div class="meta-api-description">
Adjust the vertical dimension or height of the timeline or project schedule visualization to control the overall chart size, container height, scrolling behavior, and layout arrangement. Enable configuration of the chart's vertical space during setup or dynamically resize the display area using numerical pixel values or fixed height settings. Manage the graphical area to fit different screen sizes, optimize readability, control overflow scrolling, and tailor the timeline's vertical scale and container dimensions for better presentation and user interaction.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      height: 400
    });
    </script>

### listWidth `String|Number` *(default: "30%")*

The width of the task list. Numeric values are treated as pixels.


<div class="meta-api-description">
Customize or control the width of the task list sidebar or panel in Gantt charts to adjust layout, set exact pixel sizes, resize the task list area, manage sidebar or panel width, configure list panel dimensions, define the width of the task list column, and set fixed or dynamic sizing for the sidebar containing tasks within Gantt views during initialization or runtime.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      listWidth: 400
    });
    </script>

### messages `Object`

The configuration of the Gantt messages. Use this option to customize or localize the Gantt messages.


<div class="meta-api-description">
Control and customize the text labels, notifications, and user interface messages within the Gantt chart component by setting custom messages, overriding default language strings, localizing content for different regions or languages, configuring alert texts, tooltips, status descriptions, and other user-facing strings to match specific terminology, translations, or branding requirements across various projects and internationalization needs.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            actions: {
                addChild: "Add Child Task",
                append: "Add Task",
                insertAfter: "Add Below",
                insertBefore: "Add Above",
                pdf: "Export to PDF"
            },
            editor: {
                addNew: "Add new task",
                name: "Title",
                percentCompleteHint: "% complete"
            }
        }
    });
    </script>

### messages.actions `Object`

The configuration of the Gantt action messages. Use this option to customize or localize the Gantt action messages.


<div class="meta-api-description">
Customize, localize, or configure action labels, button texts, tooltips, and interactive messages within the Gantt chart interface to tailor user prompts and interface elements for different languages, user preferences, or specific workflows. Enable editing, replace default phrases, control text displayed on action buttons, adjust tooltip descriptions, and modify UI messages related to task handling, scheduling actions, or timeline interactions to improve usability and localization in project planning tools. Adjust, override, or set all action-related messages displayed in Gantt chart controls for enhanced user experience, translation, or branding purposes.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            actions: {
                addChild: "Add Child Task",
                append: "Add Task",
                insertAfter: "Add Below",
                insertBefore: "Add Above",
                pdf: "Export to PDF"
            }
        }
    });
    </script>

### messages.actions.addChild `String` *(default: "Add Child")*

The text similar to "Add child" displayed as Gantt "add child" buttons.


<div class="meta-api-description">
Set or customize the label, caption, or text displayed on buttons that add sub-tasks or child items in Gantt charts, including localizing or translating the "add child" action button text, configuring button titles or prompts for adding nested tasks, controlling the wording for creating child elements, and adjusting interface messages related to adding child nodes or subtasks in project timelines or scheduling views.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        actions: {
          addChild: "Add new Child"
        }
      }
    });
    </script>

### messages.actions.append `String` *(default: "Add Task")*

The text similar to "Append" displayed as Gantt "append" buttons.


<div class="meta-api-description">
Customize or localize the text displayed on append buttons within Gantt chart interfaces, enabling developers to configure, set, or modify the label for the append action, such as adding tasks or entries, controlling button captions, adjusting UI language for different regions, and tailoring action prompts to fit specific workflows or user preferences in project scheduling and timeline management environments.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        actions: {
          append: "Add new Task"
        }
      }
    });
    </script>

### messages.actions.insertAfter `String` *(default: "Add Below")*

The text similar to "Add below" displayed as Gantt "add below" buttons.


<div class="meta-api-description">
Modify or configure the label, text, or wording used for the button or action that inserts a new item directly after, below, or following an existing entry in timeline charts, project schedules, or task lists, allowing customization of add-below, insert-after, or append actions in Gantt-style interfaces, enabling personalized captions for buttons or commands that add subsequent tasks or rows after a selected element.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        actions: {
          insertAfter: "Add Task Below"
        }
      }
    });
    </script>

### messages.actions.insertBefore `String` *(default: "Add Above")*

The text similar to "Add above" displayed as Gantt "add above" buttons.


<div class="meta-api-description">
Customize or translate the label for the action that inserts or adds a new item above the current one in the Gantt chart, enabling localization or modification of the "Add above" button text to fit different languages, user interfaces, or custom workflows where controlling the wording of insert or add-before actions is needed for clarity or user experience.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        actions: {
          insertBefore: "Add Task Above"
        }
      }
    });
    </script>

### messages.actions.pdf `String` *(default: "Export to PDF")*

The text of "Export to PDF" button of the Gantt toolbar.


<div class="meta-api-description">
Customize the text label or caption displayed on the export to PDF button within the Gantt chart toolbar, enabling localization, translation, or adjustment of the toolbar action name related to exporting, saving, or generating PDF files from the Gantt interface. Control the wording, rename, or configure the PDF export button message to match different languages, UI terminology, or user preferences for clearer toolbar instructions and export functionality prompts.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
	  toolbar: [ "pdf" ],
      messages: {
        actions: {
          pdf: "PDF Export"
        }
      }
    });
    </script>

### messages.cancel `String` *(default: "Cancel")*

The text similar to "Cancel" displayed in Gantt.


<div class="meta-api-description">
Customize or configure the label text for cancel buttons, control localization or internationalization of cancel prompts, set button captions for cancel actions, define user-facing cancel text, change default cancel button wording, adjust cancel message strings for different languages, modify cancel button labels in UI components, specify cancel button titles for user interfaces, enable localization of cancel controls, and tailor cancel button text to match application language or user preferences.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        cancel: "Undo"
      }
    });
    </script>

### messages.deleteDependencyConfirmation `String` *(default: "Are you sure you want to delete this dependency?")*

The text similar to "Are you sure you want to delete this dependency?" displayed in Gantt dependency delete dialog.


<div class="meta-api-description">
Configure the confirmation prompt or dialog text that appears when deleting dependencies between tasks in a Gantt chart, allowing customization of the warning message, alert, or verification text users see before removing task relationships, dependencies, or links; control the phrasing of the delete confirmation notice, prompt users with a customizable question or message to confirm dependency removal actions, and adjust or set the dialogue content that verifies or asks for user approval prior to dependency deletion in project timelines or scheduling tools.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 10:00")
      }, {
         id: 2,
         orderId: 0,
         parentId: null,
         title: "Task2",
         start: new Date("2014/6/17 11:00"),
         end: new Date("2014/6/17 12:00")
      }],
      dependencies: [{
         id: 1,
         type: 1,
         predecessorId: 1,
         successorId: 2
      }],
      messages: {
        deleteDependencyConfirmation: "Proceed with dependency deletion?"
      }
    });
    </script>

### messages.deleteDependencyWindowTitle `String` *(default: "Delete dependency")*

The text similar to "Delete dependency" displayed in Gantt dependency delete dialog title.


<div class="meta-api-description">
Configure or customize the title text displayed in the confirmation dialog when removing or deleting dependencies in the Gantt chart, such as setting or changing the heading that appears in the dependency removal popup, modifying the prompt message shown to users during dependency deletion, controlling the dialog title for dependency removal confirmation, and adjusting or localizing the text shown when confirming deletion of task dependencies.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 10:00")
      }, {
         id: 2,
         orderId: 0,
         parentId: null,
         title: "Task2",
         start: new Date("2014/6/17 11:00"),
         end: new Date("2014/6/17 12:00")
      }],
      dependencies: [{
         id: 1,
         type: 1,
         predecessorId: 1,
         successorId: 2
      }],
      messages: {
        deleteDependencyWindowTitle: "Delete dependency?"
      }
    });
    </script>

### messages.deleteTaskConfirmation `String` *(default: "Are you sure you want to delete this task?")*

The text similar to "Are you sure you want to delete this task?" displayed in Gantt task delete dialog.


<div class="meta-api-description">
Customize or localize the confirmation prompt, alert, or dialog shown when deleting a task in Gantt charts, enabling developers to set, configure, or override the default message that asks users to confirm task removal, delete task warnings, task deletion prompts, or confirmation texts tailored for different languages or user interfaces.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        deleteTaskConfirmation: "Proceed with task deletion?"
      }
    });
    </script>

### messages.deleteTaskWindowTitle `String` *(default: "Delete task")*

The text similar to "Delete task" displayed in Gantt task delete dialog title.


<div class="meta-api-description">
Configure the title text displayed in the task deletion confirmation dialog within the Gantt chart interface, enabling customization of prompts like "Delete task" to better match your application's language, improve clarity for users confirming task removal, or control the messaging shown when users attempt to delete tasks, ensuring the confirmation window title aligns with specific terminology, localization needs, or user experience preferences related to task deletion alerts and confirmation dialogs.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        deleteTaskWindowTitle: "Delete task?"
      }
    });
    </script>

### messages.destroy `String` *(default: "Delete")*

The text similar to "Delete" displayed in Gantt.


<div class="meta-api-description">
Customize or configure the label text for the delete action in Gantt charts, set the wording shown when removing tasks or events, control the confirmation or button message for deleting entries, enable changing the default delete caption, and adjust the user interface text associated with deleting items or actions within project timelines or scheduling components.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        destroy: "Destroy"
      }
    });
    </script>

### messages.editor `Object`

The configuration of the Gantt editor messages. Use this option to customize or localize the Gantt editor messages.


<div class="meta-api-description">
Configure, customize, or localize text, labels, prompts, tooltips, and messages within the Gantt chart editor interface to tailor the user experience, change language or terminology, adjust phrasing for clarity, modify default editor notifications, warnings, error messages, and interface strings, or set specific wording for editing tasks and interactions in the Gantt timeline editor environment.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            editor: {
                editorTitle: "Task Editor",
                start: "Start Date",
                end: "End Date",
                title: "Task Title",
                percentComplete: "Progress"
            }
        }
    });
    </script>

### messages.editor.assignButton `String` *(default: "Assign")*

The text similar to "Assign" displayed in Gantt task editor.


<div class="meta-api-description">
Configure or customize the label, caption, or text displayed on the task assignment button within the project timeline editor, enabling the adjustment or localization of the button’s wording such as changing “Assign” to another language, synonym, or phrase to suit user interface preferences or internationalization needs in Gantt chart task editing contexts.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
	  resources: {
        dataColorField: "key",
        dataSource: [
          { id: 0, name: "Resource 1", key: "green" },
          { id: 1, name: "Resource 2", key: "#32cd32" }
        ]
      },
      assignments: {
        dataSource: [
          { taskId: 0, resourceId: 1, value: 1 }
        ]
      },
      messages: {
        editor: {
          assignButton:"Assign Resources"
        }
      }
    });
    </script>

### messages.editor.editorTitle `String` *(default: "Task")*

The text similar to "Task" displayed in Gantt task editor.


<div class="meta-api-description">
Configure, customize, or set the title text shown in the task editor within a Gantt chart interface, enabling control over the header or label displayed when editing tasks. This feature supports changing the editor's heading, adjusting the task editing title, or modifying the text that appears as the dialog or modal title in the Gantt task editor. It is useful for personalizing, localizing, or clarifying the task editor's title to fit different application contexts or user preferences.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        editor: {
          editorTitle:"Edit Task"
        }
      }
    });
    </script>

### messages.editor.end `String` *(default: "End")*

The text similar to "End" displayed in Gantt task editor.


<div class="meta-api-description">
Customize, configure, or change the label text for the task end date or completion field in the Gantt chart editor, including renaming or localizing the "End" label shown in task editing interfaces, adjusting how the end time, finish date, or completion point is presented to users within task properties or scheduling dialogs. This covers altering captions, overriding default strings, and setting personalized or translated labels for the task’s end time field in project timelines and task editing environments.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        editor: {
          end:"Task End"
        }
      }
    });
    </script>

### messages.editor.percentComplete `String` *(default: "Complete")*

The text similar to "Complete" displayed in Gantt task editor.


<div class="meta-api-description">
Customize and translate the label indicating task progress or completion percentage displayed in a Gantt chart’s task editor, enabling configuration of the text shown for percent complete, progress status, completion indicator, or task advancement labels to suit different languages, localization requirements, UI customization, or user interface adjustments related to task completion display within project management tools.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        editor: {
          percentComplete:"Task Progress"
        }
      }
    });
    </script>

### messages.editor.plannedEnd `String` *(default: "Planned End")*

The text similar to "Planned End" displayed in Gantt task editor.


<div class="meta-api-description">
Control, configure, or customize the label text for the planned end date displayed in the task editor of a Gantt chart, enabling changes to the "Planned End" wording for better clarity, localization, or UI customization in project scheduling interfaces. Adjust, set, or rename the planned completion marker, deadline label, or estimated finish descriptor shown when editing tasks, to match different languages, terminologies, or user preferences related to project timelines and task duration endpoints.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      editable: {
        plannedTasks: true
      },
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         plannedStart: new Date("2014/6/17 8:00"),
         plannedEnd: new Date("2014/6/17 12:00"),
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        editor: {
          plannedEnd:"Task Planned to End"
        }
      }
    });
    </script>

### messages.editor.plannedStart `String` *(default: "Planned Start")*

The text similar to "Planned Start" displayed in Gantt task editor.


<div class="meta-api-description">
Customize, translate, or configure the label text for the planned start date displayed in task editing interfaces within Gantt charts, enabling localization, renaming, or adjusting how the planned start field is presented to users during scheduling or project timeline modifications.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      editable: {
        plannedTasks: true
      },
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         plannedStart: new Date("2014/6/17 8:00"),
         plannedEnd: new Date("2014/6/17 12:00"),
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        editor: {
          plannedStart:"Task Planned to Start"
        }
      }
    });
    </script>

### messages.editor.resources `String` *(default: "Resources")*

The text similar to "Resources" displayed in Gantt task editor.


<div class="meta-api-description">
Customize the text label for task resources in a Gantt chart editor, enabling control over how resource-related fields are named, displayed, or localized within the task editing interface, such as renaming, translating, or adjusting the resources label to match specific terminology, language preferences, UI consistency, or project management vocabulary.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      resources: {
        dataColorField: "key",
        dataSource: [
          { id: 0, name: "Resource 1", key: "green" },
          { id: 1, name: "Resource 2", key: "#32cd32" }
        ]
      },
      assignments: {
        dataSource: [
          { taskId: 0, resourceId: 1, value: 1 }
        ]
      },
      messages: {
        editor: {
          resources:"Task Resources"
        }
      }
    });
    </script>

### messages.editor.resourcesEditorTitle `String` *(default: "Resources")*

The text similar to "Resources" displayed in Gantt task editor.


<div class="meta-api-description">
Customize, configure, or localize the label and title for resource assignment sections within the Gantt task editor, enabling you to set, change, or translate the displayed text for resource-related controls or headings, adjust the editor interface terminology for resource management, and control how resource names or titles appear during task edits in the Gantt chart environment to match different languages, styles, or user preferences.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
	  resources: {
        dataColorField: "key",
        dataSource: [
          { id: 0, name: "Resource 1", key: "green" },
          { id: 1, name: "Resource 2", key: "#32cd32" }
        ]
      },
      assignments: {
        dataSource: [
          { taskId: 0, resourceId: 1, value: 1 }
        ]
      },
      messages: {
        editor: {
          resourcesEditorTitle:"Assign Task Resources"
        }
      }
    });
    </script>

### messages.editor.resourcesHeader `String` *(default: "Resources")*

The text similar to "Resources" displayed in Gantt task editor.


<div class="meta-api-description">
Customize and localize the heading label for the resources section in the task editor within a Gantt chart, enabling control over the displayed text for resource names or assignments, supporting translation, internationalization, and adjustment of the resource header title in project scheduling interfaces.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
	  resources: {
        dataColorField: "key",
        dataSource: [
          { id: 0, name: "Resource 1", key: "green" },
          { id: 1, name: "Resource 2", key: "#32cd32" }
        ]
      },
      assignments: {
        dataSource: [
          { taskId: 0, resourceId: 1, value: 1 }
        ]
      },
      messages: {
        editor: {
          resourcesHeader:"Available Resources"
        }
      }
    });
    </script>

### messages.editor.start `String` *(default: "Start")*

The text similar to "Start" displayed in Gantt task editor.


<div class="meta-api-description">
Customize or localize the label for the start date or start time field in a task editor within a Gantt chart, enabling control over the text displayed for beginning task scheduling in different languages or terminologies, modify, translate, set, or configure the start label shown in task editing interfaces, adjust the wording for clarity or localization of task start indicators, adapt the label to match user preferences, internationalization requirements, or UI customization needs in project management and scheduling tools.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        editor: {
          start:"Task Start"
        }
      }
    });
    </script>

### messages.editor.title `String` *(default: "Title")*

The text similar to "Title" displayed in Gantt task editor.


<div class="meta-api-description">
Customize, set, or change the label text for the task editor title in a Gantt chart interface, modify the wording displayed as the editor's heading or caption, control the title field name shown when editing tasks within Gantt charts, localize or translate the title label for task editor dialogs, adjust the header text for better clarity in task editing views, tailor the task editor’s title wording to fit user interface language preferences or branding.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        editor: {
          title:"Task Title"
        }
      }
    });
    </script>

### messages.editor.unitsHeader `String` *(default: "Units")*

The text similar to "Units" displayed in Gantt task editor.


<div class="meta-api-description">
Configure and customize the label or heading that appears for task units, duration, or effort fields within a Gantt chart editor interface to support localization, translation, or different terminology preferences. Enable changing, renaming, or localizing the units header text in the task editor to match user language settings, custom wording, or specific domain jargon. Adjust how the units column or header is presented in the editing UI of tasks or activities, allowing developers to set a custom label for time units, measurement units, or workload descriptors in project planning tools and Gantt charts.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
	  resources: {
        dataColorField: "key",
        dataSource: [
          { id: 0, name: "Resource 1", key: "green" },
          { id: 1, name: "Resource 2", key: "#32cd32" }
        ]
      },
      assignments: {
        dataSource: [
          { taskId: 0, resourceId: 1, value: 1 }
        ]
      },
      messages: {
        editor: {
          unitsHeader:"Resource Units"
        }
      }
    });
    </script>

### messages.editor.addNew `String` *(default: "Add")*

The text that will be rendered in the Create button of the Dependencies and Assignments edit tables.


<div class="meta-api-description">
Control and customize the text, label, or caption displayed on the button or UI element used for adding or creating new entries, tasks, dependencies, or assignments within project scheduling or Gantt chart editing interfaces, enabling developers to set, change, localize, or tailor the prompt for creating new records in dependency or assignment tables, modify the “Add New” button wording, update action button labels in resource or task assignment editors, and adjust user-facing prompts for initiating new item creation in timeline or dependency management tables.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            editor: {
                addNew: "Create New"
            }
        }
    });
    </script>

### messages.editor.name `String` *(default: "Name")*

The text that will be rendered as a title of the Predecessor and Successor columns in the Dependencies edit tables, and the Dependency column in the Assignments edit table.


<div class="meta-api-description">
Configure or customize the column header text for editing dependency relationships such as predecessors, successors, and assignments within Gantt chart tables. Control or set the display names, labels, or titles shown in the dependency editor columns to match specific terminology or user preferences for task dependencies. Adjust the naming of dependency and assignment columns in Gantt views for clearer identification, customization, or localization of dependency-related data during project scheduling and task management. Enable editing of column titles related to task dependencies and assignments to ensure intuitive dependency tracking and representation in Gantt component tables.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            editor: {
                name: "Task Name"
            }
        }
    });
    </script>

### messages.editor.percentCompleteHint `String` *(default: "value from 0 to 1")*

The hint text that will be rendered for the percentCompleted NumericTextBox on the popup edit Form.


<div class="meta-api-description">
Configure or customize the placeholder, tooltip, or hint text displayed in the progress input field for task completion percentage within the Gantt chart’s popup editor form, enabling users to set, modify, or provide guidance labels for the numeric entry that represents task progress or percent complete, supporting clearer user input prompts and enhancing form usability during project schedule editing and progress tracking.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            editor: {
                percentCompleteHint: "Enter value between 0 and 100"
            }
        }
    });
    </script>

### messages.editor.remove `String` *(default: "Remove")*

The text that will be rendered in the Remove button of the Dependencies and Assignments edit tables.


<div class="meta-api-description">
Customize or change the text label for the remove, delete, or discard button in Gantt chart dependency and assignment editing tables to match your UI language, branding, or localization needs. Enable configuring the button caption that appears when users want to remove links, tasks, assignments, or dependencies from Gantt chart editors and interactive grids, allowing flexible override of default remove or delete button wording in task and resource assignment interfaces. Control and set the displayed text for the button that removes entries in dependency and assignment editors within project planning or scheduling applications.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            editor: {
                remove: "Delete"
            }
        }
    });
    </script>

### messages.editor.actualStart `String` *(default: "Actual Start")*

The label text of the start DateTimePicker editor when the planned editors are also present on the form.


<div class="meta-api-description">
Customize or configure the text label displayed for the actual start date picker or date selector in Gantt chart interfaces when managing project schedules, especially in scenarios where planned or baseline start dates are also shown or edited; adjust, set, or define the displayed wording or captions for the start date input field to clarify or differentiate between actual versus planned start dates within task editors, project timeline controls, or scheduling UI components.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            editor: {
                actualStart: "Real Start Date"
            }
        }
    });
    </script>

### messages.editor.actualEnd `String` *(default: "Actual End")*

The label text of the end DateTimePicker editor when the planned editors are also present on the form.


<div class="meta-api-description">
Customize or configure the label text for the end date picker that appears in scheduling or timeline views when editing the actual completion or finish date of tasks, controlling how the date selector displays for real or completed end times in project plans, task trackers, or Gantt chart editors featuring planned versus actual timelines.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            editor: {
                actualEnd: "Real End Date"
            }
        }
    });
    </script>

### messages.editor.parentOptionLabel `String` *(default: "-None-")*

The optionLabel of the parent DropDownList editor.


<div class="meta-api-description">
Set or customize the label text displayed as the default or placeholder option in a parent selection dropdown within a Gantt chart editor, enabling control over the prompt or initial text shown when choosing parent tasks or items. Configure the text for the parent dropdown’s option label used to guide users when no parent is selected or to display a custom prompt in hierarchical task management interfaces. Enable or change the parentOptionLabel text to adjust how parent task choices are presented in Gantt chart editing dropdowns, supporting localization, user guidance, and clearer parent-child task relationships in project scheduling tools.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            editor: {
                parentOptionLabel: "No Parent"
            }
        }
    });
    </script>

### messages.editor.general `String` *(default: "General")*

The text used for the main (general) tab on the edit popup TabStrip.


<div class="meta-api-description">
Customize, translate, or set the primary edit popup tab labels, headings, or text within the Gantt chart’s general editor interface, enabling localization, language adaptation, internationalization, or customization of user-facing messages and tab names in project scheduling or task management popups. Adjust or control the main editing tab captions, titles, toggles, or menu text to match different languages, regional settings, or user preferences when editing Gantt chart details through the core editor message settings.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            editor: {
                general: "Basic Info"
            }
        }
    });
    </script>

### messages.editor.predecessors `String` *(default: "Predecessors")*

The text used for the predecessors tab on the edit popup TabStrip.


<div class="meta-api-description">
Customize or localize the text label, title, or caption displayed for the predecessors tab within the Gantt chart's editing popup or dialog interface, enabling developers to configure, set, or modify the tab text for different languages, user preferences, or branding purposes in task scheduling or project timeline tools.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            editor: {
                predecessors: "Dependencies"
            }
        }
    });
    </script>

### messages.editor.successors `String` *(default: "Successors")*

The text used for the successors tab on the edit popup TabStrip.


<div class="meta-api-description">
Customize or configure the text, label, or title displayed on the Successors tab within a Gantt chart's edit dialog or popup, enabling control over how successor tasks or dependencies are named, shown, or described in the editing interface. This setting affects the caption, heading, or message used in the tab strip of the Gantt editor popup that deals with task successors, allowing developers to localize, rename, or tailor the user interface text related to task dependencies and following steps in project timelines. Adjust or set the wording for the section where successor relationships are managed or viewed during task editing within a Gantt chart component.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            editor: {
                successors: "Following Tasks"
            }
        }
    });
    </script>

### messages.editor.other `String` *(default: "Other")*

The text used for the other tab on the edit popup TabStrip.


<div class="meta-api-description">
Customize, translate, or configure the label text for the additional or miscellaneous tab in a Gantt chart's edit popup interface, enabling control over the wording shown in the "Other" section or miscellaneous settings area, useful for localization, internationalization, UI text customization, and adapting label names in project management task editors or timeline editing dialogs.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            editor: {
                other: "Additional"
            }
        }
    });
    </script>

### messages.editor.dependencyType `String` *(default: "Type")*

The text that will be rendered as a title of the Type column in the Dependencies edit tables.


<div class="meta-api-description">
Customize, configure, or set the label, title, or header text displayed for the dependency type column in a Gantt chart's dependency editor, including localization, translation, or UI text changes that control how dependency relationships like finish-to-start, start-to-start, or other dependency types are named or shown in the dependencies list. Adjust the displayed string for the dependency type header to match preferred terminology, language settings, or customized user interfaces when managing task dependencies and relationships in project scheduling tools.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            editor: {
                dependencyType: "Dependency Type"
            }
        }
    });
    </script>

### messages.plannedTasks `Object`

The configuration of the Gantt messages for Planned tasks.


<div class="meta-api-description">
Customize and control localized user interface text, labels, notifications, prompts, and messages related to scheduling, displaying, or managing planned tasks, future task timelines, or projected activities within a Gantt chart or timeline view, enabling configuration of how planned or upcoming tasks are presented, described, or indicated in multiple languages, supporting internationalization, customization, and clarity for project management dashboards and visual task tracking tools.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            plannedTasks: {
                switchText: "Show Planned Tasks",
                offsetTooltipAdvanced: "Completed earlier",
                offsetTooltipDelay: "Completed later"
            }
        }
    });
    </script>

### messages.plannedTasks.switchText `String` *(default: "Planned Tasks")*

The text that would be displayed on the switch allowing the user to turn on and off the PlannedTasks view in the Gantt Timeline.


<div class="meta-api-description">
Customize, localize, or set the label text displayed on the toggle switch for planned or scheduled tasks within the Gantt timeline view, enabling control over how the planned tasks option is presented in different languages or terminology. Adjust the switch label for clarity, user interface customization, or to match specific naming conventions for planned, upcoming, or forecasted task indicators on the Gantt chart toggle control.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            plannedTasks: {
                switchText: "Show Planned Tasks"
            }
        }
    });
    </script>

### messages.plannedTasks.offsetTooltipAdvanced `String` *(default: "Met deadline earlier")*

The text rendered in the Tooltip that would be displayed for tasks which have finished in advance compared to their plannedEnd.


<div class="meta-api-description">
Configure and customize tooltip text or labels that appear when tasks complete earlier than their planned end date, enabling control over advance completion notifications, early finish alerts, or schedule offset messages in timeline or project management views, supporting adjustments of displayed information for tasks that finish ahead of schedule and enhancing user feedback about task timing and progress deviations.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            plannedTasks: {
                offsetTooltipAdvanced: "Completed ahead of schedule"
            }
        }
    });
    </script>

### messages.plannedTasks.offsetTooltipDelay `String` *(default: "Delay")*

The text rendered in the Tooltip that would be displayed for tasks which have finished with delay compared to their plannedEnd.


<div class="meta-api-description">
Customize or set the localized tooltip text, label, or message that appears for tasks completed later than their scheduled or planned end date in a Gantt chart, enabling control over displayed delay notifications, overdue task alerts, or late finish warnings. Adjust, define, or configure the user-facing text that explains or highlights tasks finishing behind schedule, planned task offset notifications, and timing discrepancies directly on gantt task tooltips, supporting multiple languages and contextual clarifications for late completions.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            plannedTasks: {
                offsetTooltipDelay: "Behind schedule"
            }
        }
    });
    </script>

### messages.plannedTasks.seconds `String` *(default: "seconds")*

The text for "seconds" displayed in the Advanced/Delayed Tooltip (see above).


<div class="meta-api-description">
Customize or localize the label for "seconds" displayed in advanced or delayed task tooltips within Gantt charts, enabling control over time unit text shown for planned tasks, adjusting tooltip language, configuring duration descriptors, and modifying time-based messages for task scheduling or progress indicators.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            plannedTasks: {
                seconds: "sec"
            }
        }
    });
    </script>

### messages.plannedTasks.minutes `String` *(default: "minutes")*

The text for "minutes" displayed in the Advanced/Delayed Tooltip (see above).


<div class="meta-api-description">
Customize or translate the label for minutes displayed in tooltips related to planned tasks in Gantt charts, enabling control over how time durations like minutes are shown in advanced or delayed task pop-ups, allowing localization, formatting, and adjustment of minute indicators in scheduling and timeline tooltips for clearer communication across different languages and user interfaces.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            plannedTasks: {
                minutes: "min"
            }
        }
    });
    </script>

### messages.plannedTasks.hours `String` *(default: "hours")*

The text for "hours" displayed in the Advanced/Delayed Tooltip (see above).


<div class="meta-api-description">
Customize or translate the label for "hours" displayed in tooltips related to planned, advanced, or delayed tasks within Gantt charts by configuring the text for time duration units, enabling localization for time labels in task scheduling, progress indicators, or timeline visualizations, and adjusting the wording for hours in planning or delay notifications across different languages or user interfaces.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            plannedTasks: {
                hours: "hrs"
            }
        }
    });
    </script>

### messages.plannedTasks.days `String` *(default: "days")*

The text for "days" displayed in the Advanced/Delayed Tooltip (see above).


<div class="meta-api-description">
Customize or configure the label text representing "days," duration, or time intervals in advanced or delayed tooltips for planned tasks within a Gantt chart. Enable changing, setting, localizing, renaming, or controlling how day counts and time spans appear in tooltip displays related to scheduled activities, timelines, or task planning. Adjust the wording for day indicators, duration labels, or time units shown in task projections or progress annotations, ensuring clear and context-appropriate descriptions in visual schedule tooltips.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            plannedTasks: {
                days: "d"
            }
        }
    });
    </script>

### messages.save `String` *(default: "Save")*

The text similar to "Save" displayed in Gantt.


<div class="meta-api-description">
Customize, configure, or set the text label, caption, or localized string for the Save button, command, or action within Gantt charts, including options to modify the displayed prompt, message, or tooltip associated with saving tasks or project data to match different languages, translations, or user interface preferences.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        save: "Update"
      }
    });
    </script>

### messages.selectView `String`

The aria-label of the View select element.


<div class="meta-api-description">
Configure or customize the accessible label for the view selection dropdown in Gantt charts to enhance screen reader support, enabling localization, setting descriptive ARIA labels, controlling how assistive technologies announce the current view selector, and improving usability for visually impaired users by adjusting or overriding the default accessible text on the view selector element.
</div>

#### Example - set the "previous" message

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        selectView: "Custom"
      }
    });
    </script>

### messages.views `Object`

The configuration of the Gantt view messages. Use this option to customize or localize the Gantt view messages.


<div class="meta-api-description">
Customize or localize Gantt chart view labels, tooltips, and display text by configuring message strings for different views, enabling tailored UI language, modifying default view names, adjusting tooltip descriptions, setting custom labels for timeline segments, supporting multilingual interfaces, controlling the text shown for daily, weekly, or monthly views, and personalizing the user experience with localized or customized view-related messages in Gantt charts.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        messages: {
            views: {
                day: "Daily View",
                week: "Weekly View",
                month: "Monthly View",
                year: "Yearly View"
            }
        }
    });
    </script>

### messages.views.day `String` *(default: "Day")*

The text similar to "Day" displayed as Gantt "day" view title.


<div class="meta-api-description">
Customize or translate the label, title, or heading for the daily timeline or day-view mode in a Gantt chart interface, enabling adjustment of the text that appears for the "Day" view to match different languages, regions, or user preferences. This feature supports localization, internationalization, renaming, or setting custom day view captions, helping developers control and configure the displayed name or heading of the daily segment in project scheduling visuals or timeline representations.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        views: {
          day: "Day view"
        }
      }
    });
    </script>

### messages.views.end `String` *(default: "End")*

The text similar to "End" displayed in Gantt resize hint.


<div class="meta-api-description">
Configure or customize the label shown at the end of the Gantt chart resize indicator, enabling localization, translation, or changing the default "End" text to any preferred wording for better UI clarity, internationalization, or user interface customization.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        views: {
          end: "Task End"
        }
      }
    });
    </script>

### messages.views.month `String` *(default: "Month")*

The text similar to "Month" displayed as Gantt "month" view title.


<div class="meta-api-description">
Customize or translate the month view header text in a Gantt chart by setting or adjusting the display label for the monthly timeline, enabling localization, internationalization, or personalized wording for the calendar month title in the project schedule view. Control the text shown in monthly gantt chart views, define custom labels, modify the month heading, and support multiple languages or regional formats for clearer timeline representation.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        views: {
          month: "Month view"
        }
      }
    });
    </script>

### messages.views.start `String` *(default: "Start")*

The text similar to "Start" displayed in Gantt resize hint.


<div class="meta-api-description">
Customize or translate the text label for the beginning point of tasks or activities in the Gantt chart resize tooltip, including setting, localizing, or overriding default start indicators, adjusting textual hints for task start edges, configuring the display of start labels in different languages or formats, and controlling how the "Start" prompt appears during timeline or task resizing interactions.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        views: {
          start: "Task Start"
        }
      }
    });
    </script>

### messages.views.week `String` *(default: "Week")*

The text similar to "Week" displayed as Gantt "week" view title.


<div class="meta-api-description">
Customize, translate, or configure the label and title text shown for the weekly timeline or schedule view in a Gantt chart interface, including setting localized display strings, customizing week view headings, changing week labels, controlling the text for calendar weekly sections, and managing multi-language support for the weekly timeframe indicator.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        views: {
          week: "Week view"
        }
      }
    });
    </script>

### messages.views.year `String` *(default: "Year")*

The text similar to "Year" displayed as Gantt "year" view title.


<div class="meta-api-description">
Customize, configure, or localize the display text for the yearly timeline or annual overview label in a Gantt chart interface, enabling the adjustment, translation, or setting of the title that represents the "Year" view or yearly perspective in scheduling, project planning, and timeline visualization components to ensure clear, context-appropriate naming across different languages, regions, or user preferences in calendar-based or time-based project displays.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      messages: {
        views: {
          Year: "Year view"
        }
      }
    });
    </script>

### pdf `Object`

Configures the Kendo UI Gantt PDF export settings.


<div class="meta-api-description">
Configure export settings for converting Gantt charts to PDF format, including options for customizing page size, margins, orientation, file output, and layout adjustments; control and enable PDF export during initialization, manage server-side or client-side processing with proxy and data handling configurations, and tailor export behavior to suit various printing, sharing, or archival needs in scheduling, project timelines, and resource planning tools.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        toolbar: ["pdf"],
        pdf: {
            author: "John Doe",
            title: "Project Schedule",
            subject: "Gantt Chart Export",
            keywords: "project, schedule, gantt"
        }
    });
    </script>

### pdf.author `String` *(default: null)*

The author of the PDF document.


<div class="meta-api-description">
Configure or specify the author metadata embedded within the exported PDF file from the Gantt chart or scheduling component, enabling control over the Author field in the PDF document properties, useful for setting or customizing document information, embedding creator identification, or defining metadata strings that appear in the exported file’s author attribute when generating or exporting project timelines, schedules, or Gantt charts as PDF documents.
</div>

#### Example - set the author
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        pdf: {
            author: "John Doe"
        },
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });
    </script>

### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.


<div class="meta-api-description">
Control automatic printing behavior after exporting a Gantt chart to PDF by enabling or disabling the immediate opening of the Print dialog or Print Preview when the PDF loads. Configure whether the PDF should prompt for printing right away or wait for manual user action, supporting streamlined printing workflows and automated print triggers. This setting influences if the document auto-opens the print interface upon loading in compatible PDF viewers or requires users to start printing manually, and may involve adjustments to PDF reader settings or plugins to allow auto-print features. Enable, activate, set, or suppress auto-print, print preview, or print dialog triggers on PDF export for seamless integration with printing processes and user print workflows.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        toolbar: ["pdf"],
        pdf: {
            autoPrint: true
        }
    });
    </script>

### pdf.avoidLinks `Boolean|String` *(default: false)*
A flag indicating whether to produce actual hyperlinks in the exported PDF file.

It's also possible to pass a CSS selector as argument. All matching links will be ignored.

> Available in versions 2015.3.1020 and later


<div class="meta-api-description">
Control whether the Gantt chart exports PDF files with clickable hyperlinks by disabling all link generation or selectively excluding links using CSS selectors; configure the export to avoid embedding URLs, turn off clickable anchors, prevent navigation links in PDF output, suppress interactive links within exported documents, or specify which links to omit from the final PDF export, ensuring the Gantt timeline prints without active link elements or clickable references based on boolean toggles or selector rules.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        toolbar: ["pdf"],
        pdf: {
            avoidLinks: true
        }
    });
    </script>

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.


<div class="meta-api-description">
Configure the author information embedded in the PDF metadata when exporting or printing timeline charts, enabling control over the document’s creator identity for reporting, attribution, or compliance purposes; adjust, set, or customize the author string associated with generated PDF files from project schedules, task timelines, or Gantt visuals to ensure proper metadata tagging and document provenance during export or save operations.
</div>

#### Example - set the creator
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        pdf: {
            creator: "John Doe"
        },
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.


<div class="meta-api-description">
Control and customize the creation timestamp embedded within exported PDF files by configuring the export date and time metadata using a JavaScript Date object. Enable setting, overriding, or specifying the exact generation date of Gantt chart PDFs to influence file properties, modify export timestamps, adjust document creation dates, or synchronize PDF metadata with external systems for tracking, versioning, and auditing purposes. Manage and define the PDF output's date information to ensure accurate, consistent, or backdated time stamps in saved project visuals.
</div>

#### Example - set the date
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        pdf: {
            date: new Date("2014/11/03")
        },
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.


<div class="meta-api-description">
Control and customize the name of the exported PDF file generated from the Gantt chart, set or configure the output filename for saving or downloading the Gantt export as a PDF document, specify or change the default PDF file name to match project identifiers, deadlines, or user preferences when exporting timeline charts, manage and define the exact name assigned to the downloaded file from the Gantt view, facilitate automated or manual file naming of exported schedule visuals in PDF format for better organization and clarity.
</div>

#### Example - set the default PDF file name
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        pdf: {
            fileName: "Tasks.pdf"
        },
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](/api/javascript/ui/gantt#configuration-pdf.proxyURL) even if the browser supports saving files locally.


<div class="meta-api-description">
Control exporting Gantt chart PDFs by enabling server-side routing to ensure PDF generation passes through a proxy server, overriding local browser save capabilities; configure export handling to force processing through a specified proxy URL for scenarios needing centralized PDF creation, file streaming, or secured export workflows regardless of client-side download options.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        toolbar: ["pdf"],
        pdf: {
            forceProxy: true,
            proxyURL: "/save"
        }
    });
    </script>

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.


<div class="meta-api-description">
Control image compression level and quality when exporting Gantt charts to PDF by adjusting the JPEG image encoding strength to balance between higher resolution and larger file sizes or reduced quality and smaller PDF output files. Set or configure image export quality factors ranging from minimum to maximum to optimize file size versus visual fidelity for embedded images in PDF exports. Enable fine-tuning of JPEG compression ratios during PDF generation from Gantt visualizations to manage export output quality, compression level, image clarity, and storage requirements according to user preferences or application needs.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        toolbar: ["pdf"],
        pdf: {
            jpegQuality: 0.8
        }
    });
    </script>

### pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.


<div class="meta-api-description">
Control preserving original PNG images in exported PDF files from Gantt charts by enabling or disabling keeping embedded raster graphics as PNG format, preventing automatic conversion to other image types during export. Configure whether to maintain image fidelity for PNG elements inside PDF exports, set options to retain or convert embedded images, and manage how graphical assets like charts, icons, or snapshots are handled in generated PDF reports with versus without PNG preservation. Ensure image quality and format consistency by toggling the option to keep or reformat embedded bitmaps, optimizing output for scenarios requiring exact PNG replication or flexible image conversion in PDF exports.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        toolbar: ["pdf"],
        pdf: {
            keepPNG: true
        }
    });
    </script>

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.


<div class="meta-api-description">
Configure and embed searchable metadata keywords in exported PDF files from Gantt charts to improve indexing, enhance document searchability, customize PDF tags, control export metadata, set descriptive terms and phrases for easy retrieval, include searchable text attributes for PDFs, and optimize exported files for keyword-based discovery within document management systems or search engines.
</div>

#### Example - set the keywords
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        pdf: {
            keywords: "project tasks"
        },
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });
    </script>

### pdf.landscape `Boolean` *(default: false)*

Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.


<div class="meta-api-description">
Control or configure the page orientation for exporting Gantt charts to PDF by enabling or disabling landscape mode, which switches the layout so the page width becomes the longer side instead of the height, allowing users to set landscape or portrait output for improved readability, optimized printing, better fit of wide timeline data, or customized PDF export orientation based on project visualization needs.
</div>

#### Example - enable landscape mode
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        pdf: {
            landscape: true
        },
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });
    </script>

### pdf.margin `Object`

Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).


<div class="meta-api-description">
Set or adjust the page margins when exporting Gantt charts to PDF, controlling the spacing on top, right, bottom, and left edges using numeric values or units like millimeters, centimeters, inches, or points; customize printable area, layout boundaries, or whitespace around the content to fit specific page formats, ensure professional document appearance, or comply with print standards by specifying margin sizes in various units.
</div>

#### Example - set the margins
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        pdf: {
            margin: {
                left: 10,
                right: "10pt",
                top: "10mm",
                bottom: "1in"
            }
        },
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Adjust or set the bottom page margin for Gantt chart PDF exports to control the whitespace or padding at the page’s lower edge when generating or printing Gantt diagrams in PDF format, enabling customization of page layout, spacing, and visual alignment for better formatting, including configuring numeric margin size measured in points for precise control over the bottom spacing of the exported Gantt PDF file.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        toolbar: ["pdf"],
        pdf: {
            margin: {
                bottom: 20
            }
        }
    });
    </script>

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Adjust the left page margin or left padding for PDF output generated from project timelines or gantt charts, controlling the horizontal spacing from the left edge of the PDF document for better layout, formatting, and whitespace management when exporting schedules or task timelines. Configure, customize, or set numeric values to fine-tune the left boundary in points for improved readability in exported PDF reports, presentations, or printed gantt diagrams. Optimize page setup for consistent margins during export, enabling precise control over left page indentation and positioning.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        toolbar: ["pdf"],
        pdf: {
            margin: {
                left: 15
            }
        }
    });
    </script>

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Adjust or configure the right side margin in PDF exports to control the whitespace or padding between the Gantt chart content and the page’s right edge, allowing customization of page layout, spacing, and alignment in exported PDF documents. This setting lets developers set, define, or fine-tune the numeric right margin value to increase or decrease the gap at the right border of the page, affecting print layout, formatting, and visual appearance during PDF generation or export processes. Enable control over the right page margin thickness in points for precise document formatting, page setup, and export styling in Gantt chart PDFs.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        toolbar: ["pdf"],
        pdf: {
            margin: {
                right: 15
            }
        }
    });
    </script>

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Control and configure the vertical top margin or whitespace in PDF exports of Gantt charts, adjusting the distance from the page top edge to the content for precise layout and printing alignment, enabling users to set or modify padding, spacing, or offsets measured in points for improved export appearance and formatting.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        toolbar: ["pdf"],
        pdf: {
            margin: {
                top: 25
            }
        }
    });
    </script>

### pdf.paperSize `String|Array` *(default: "auto")*

Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size: "A4", "A3" etc
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".


<div class="meta-api-description">
Set or configure the printable page dimensions, paper size, or export layout for Gantt chart PDF output, controlling the output page width and height in standard sizes like A4 or A3, custom numeric dimensions in points, or measurements using units such as millimeters, centimeters, inches, or points. Adjust, specify, or enable fixed or automatic sizing of the exported PDF page based on content size or explicit paper size settings, optimizing the PDF print format to fit project timelines, schedule visuals, or chart elements precisely when exporting or printing Gantt diagrams.
</div>

#### Example - set custom paper size
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        pdf: {
            paperSize: ["20mm", "20mm"]
        },
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });
    </script>

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser isn't capable of saving files locally.
Such browsers are IE version 9 and lower and Safari.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with set "Content-Disposition" header.


<div class="meta-api-description">
Set or configure the server-side proxy URL to enable streaming or downloading PDF files generated by the Gantt component, especially useful for browsers like Internet Explorer 9 and older versions or Safari that cannot directly save files locally; the proxy endpoint should handle POST requests with MIME types, base64-encoded PDF content, and file names, responding with correctly decoded files and appropriate headers to ensure seamless PDF delivery and download functionality through a remote service.
</div>

#### Example - set the server proxy URL
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        pdf: {
            proxyURL: "/save"
        },
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.


<div class="meta-api-description">
Configure where the generated PDF from the proxy is displayed in the Gantt interface by setting the target destination, such as opening in a new browser tab, the same window, or a specific iframe. Control PDF rendering behavior by directing output to a named window, standard keywords like _blank or _self, or embedding within frames, ensuring the proxy sets appropriate headers for inline display. Enable flexible PDF viewing options including launching in new windows, embedding in iframes, or replacing current content, accommodating use cases involving window targeting, popup management, and embedded PDF presentations within Gantt charts or related views.
</div>

#### Example - open the generated document in a new window
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        pdf: {
            forceProxy: true,
            proxyURL: "/save",
            proxyTarget: "_blank"
        },
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.


<div class="meta-api-description">
Configure or set the PDF document subject metadata string for the exported Gantt chart to describe or label the file, enabling PDF viewers and document management systems to identify, categorize, or manage the PDF based on its subject information; control or customize the metadata subject text for improved document organization, searchability, indexing, and filtering within PDF properties or file management tools.
</div>

#### Example - set the subject
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        pdf: {
            subject: "Tasks"
        },
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });
    </script>

### pdf.title `String` *(default: null)*

Sets the title field of the PDF file in the Document Properties. Not to be mistaken with the name of the exported file.


<div class="meta-api-description">
Set or configure the internal PDF metadata title for Gantt chart exports to control the document properties displayed in PDF readers, affecting how the title appears in viewer dialogs rather than the file name. Customize, define, or modify the embedded PDF document title to influence searchability, identification, indexing, or display within PDF viewer information panels, enabling precise control over internal document metadata for exported Gantt charts.
</div>

#### Example - set the title
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        pdf: {
            title: "Tasks"
        },
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });
    </script>

### range `Object`

Configures the Kendo UI Gantt range settings.


<div class="meta-api-description">
Set, configure, or control the visible timeline window, initial viewport dates, start and end boundaries, minimum and maximum limits, timeline scale, zoom levels, and navigation restrictions for a Gantt chart’s time span. Manage how much of the timeline is shown, lock or limit scrolling range, define custom date ranges, adjust zoom granularity to days, weeks, or months, set visible time boundaries, and prevent users from moving beyond certain time frames when viewing or interacting with scheduling data. Enable precise timeline range settings to control visible segments, restrict navigation outside set date bounds, and adjust the Gantt chart’s temporal display scale from initialization.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        range: {
            start: new Date("2023/1/1"),
            end: new Date("2023/12/31")
        }
    });
    </script>

### range.start `Date`

 If set to some date the timeline of all views will start from this date.


<div class="meta-api-description">
Configure the timeline’s visible start date to fix or set the initial point from which all Gantt chart views begin displaying tasks or events; control and customize the starting boundary of the timeline by specifying a precise date to enable consistent, user-defined starting positions, ensuring the chart always opens or scrolls to a specific date range, useful for setting fixed or dynamic calendar ranges, controlling the timeline viewport, or initializing the view to a desired date.
</div>

#### Example

     <div id="gantt"></div>
     <script>
     $("#gantt").kendoGantt({
       dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2016/6/17 9:00"),
         end: new Date("2016/6/20 11:00")
       }],
       range: {
          start: new Date("2016/06/2")
       },
       views: [
         { type: "day" },
         { type: "week", selected: true },
         { type: "month" }
       ]
     });
     </script>

### range.end `Date`

If set to some date the timeline of all views will end to this date.


<div class="meta-api-description">
Control or define the final date boundary for the project timeline, adjusting the Gantt chart’s visible time span by setting or restricting the maximum end date of all timeline views. Configure the timeline cutoff to fix or limit how far the schedule extends, ensuring consistent endpoint alignment across tasks and phases, enabling precise timeline capping, uniform project duration visualization, and enforcing strict end-date constraints during setup or adjustments.
</div>

#### Example

     <div id="gantt"></div>
     <script>
     $("#gantt").kendoGantt({
       dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2016/6/17 9:00"),
         end: new Date("2016/6/20 11:00")
       }],
       range: {
          end: new Date("2016/06/29")
       },
       views: [
         { type: "day" },
         { type: "week", selected: true },
         { type: "month" }
       ]
     });
     </script>


### resizable `Boolean` *(default: false)*

If set to `true` allows users to resize columns by dragging their header borders. By default resizing is disabled.


<div class="meta-api-description">
Control and configure interactive column resizing in Gantt charts by enabling or disabling the ability for users to adjust column widths through dragging column header borders or handles. This setting allows developers to set up adjustable, user-driven column width management, letting end-users resize columns dynamically during use or keep fixed column sizing by disabling resizing. Enable, toggle, or set resizable states to control column width flexibility, column drag interactions, user interface customization, and layout adaptability within Gantt chart implementations.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      columns: ["title", "start", "end"],
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      resizable: true
    });
    </script>

### selectable `Boolean` *(default: true)*

If set to `false` the user won't be able to select tasks in the Gantt. By default selection is enabled and triggers the [change event](/api/javascript/ui/gantt/events/change).


<div class="meta-api-description">
Control whether users can select tasks or items within the Gantt chart by enabling or disabling interactive selection functionality, configure task highlighting or click-based selection toggling, set selection permission to allow or block user clicks on tasks, customize responsiveness to user actions such as clicks or taps on task bars, manage task focus and selection states to trigger change events or prevent unintended selections in project timelines, toggle user selection behavior for task bars to suit various interface needs, handle task interaction filtering by enabling or disabling selectable states in scheduling views.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      selectable: false
    });
    </script>

### showPlannedTasks `Boolean` *(default: false)*

If set to `true`, the Gantt Timeline will render both the planned and the actual execution of tasks. In order to display properly, the Planned vs. Actual view would need the `plannedStart` and `plannedEnd` date fields for tasks to be set.


<div class="meta-api-description">
Configure the timeline to display and compare scheduled task timelines against actual execution periods by enabling side-by-side or overlaid planned and real-time task bars, helping visualize deviations between expected start and end dates and actual progress. Set up views that highlight discrepancies between planned schedules and actual task durations, allowing monitoring, tracking, and analysis of project adherence, task forecasting, updated timelines, or schedule changes. Control or toggle features to show both forecasted and executed task intervals on the timeline for project management, performance evaluation, and timeline audits. Use settings that support rendering planned start and end dates alongside actual execution intervals to facilitate comprehensive timeline comparisons, progress tracking, and schedule validation within project planning tools.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        plannedStart: new Date("2014/6/17 9:00"),
        plannedEnd: new Date("2014/6/17 16:00"),
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 18:00")
      }],
      showPlannedTasks: false
    });
    </script>

### showWorkDays `Boolean` *(default: true)*

If set to `false`, Gantt views will show all days of the week. By default the views display only business days.


<div class="meta-api-description">
Enable or disable displaying only business days or all calendar days including weekends on timeline views, configure whether weekends are included in the Gantt chart display, set to show workdays only or to reveal weekends and non-working days in scheduling, control timeline day visibility by toggling workday-only mode, switch between showing just weekdays or every day of the week within project timelines, customize calendar views to include or exclude weekends in task planning and resource allocation, manage timeline granularity by controlling workday filtering for accurate project tracking and visualization, adjust settings to display full weekly schedules versus condensed workweek timelines in project charts.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/23 11:00")
      }],
      showWorkDays: false
    });
    </script>

### showWorkHours `Boolean` *(default: true)*

If set to `false`, the day view will show all hours of the day. By default the view displays only business hours.


<div class="meta-api-description">
Control the display of hours in a day view to show only business or work hours versus the entire 24-hour day, enabling configuration to focus on typical office or operational schedules, toggle visibility between full day and specific work shifts, set the timeline to highlight active work periods or full daily hours, customize time ranges shown to match business hours or continuous day cycles, and adjust views for planners needing either limited working times or complete day coverage in project timelines.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
         orderId: 0,
         parentId: null,
        title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 18:00")
      }],
      showWorkHours: false
    });
    </script>

### taskTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the gantt tasks.

The fields which can be used in the template are the [task fields](/api/javascript/data/gantttask)


<div class="meta-api-description">
Customize task rendering and layout in Gantt charts by setting a template that defines how each task is displayed during initialization, enabling control over task content, appearance, and structure through HTML, data binding, conditional formatting, icons, progress bars, and dynamic elements that utilize linked task data fields for tailored visualization and interactive task presentation.
</div>

#### Example - set the task template

    <script id="task-template" type="text/x-kendo-template">
      <div> #= title # </div>
      <div>
        Start at #: start.toLocaleTimeString() #
        <br />
        End at #: end.toLocaleTimeString() #
      </div>
    </script>
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 12:00")
      }, {
        id: 2,
        orderId: 0,
        parentId: null,
        title: "Task2",
        start: new Date("2014/6/17 11:00"),
        end: new Date("2014/6/17 14:00")
      }],
      showWorkHours: false,
      rowHeight: 70,
      taskTemplate: $("#task-template").html()
    });
    </script>

### toolbar `String|Function|Array`

If a `String` value is assigned to the `toolbar` configuration option, it will be treated as a single string template for the whole Gantt Toolbar,
and the string value will be passed as an argument to a [`kendo.template()`](/api/javascript/kendo/methods/template) function.

If a `Function` value is assigned (it may be a kendo.template() function call or a generic function reference), then the return value of the function will be used to render the Gantt Toolbar contents.

If an `Array` value is assigned, it will be treated as the list of commands displayed in the Gantt Toolbar. Commands can be custom or built-in ("append", "pdf", "plannedTasks").

The "append" command adds a new task to the gantt.

The "pdf" command exports the gantt in PDF format.

The "plannedTasks" command will render the plannedTasks Switch on the Toolbar. That Switch allows the user to turn on and off the Planned vs. Actual view in the Timeline of the Gantt. When turned on, that view will render both the planned and the actual duration of all tasks. When enabled, `plannedStart` and `plannedEnd` date fields of tasks are required to properly render planned duration.


<div class="meta-api-description">
Control and configure the Gantt chart's toolbar by setting a custom layout using template strings, rendering functions, or command arrays to define toolbar buttons and features like adding new tasks, exporting to PDF, or toggling the planned versus actual timeline view; customize commands with built-in options such as "append" for inserting tasks, "pdf" for exporting charts, and "plannedTasks" for switching task timelines, while supplying necessary fields like planned start and end dates to enable accurate planned duration display.
</div>

#### Example - configure the Gantt Toolbar as a string template
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      toolbar: "<p>My string template in a paragraph.</p>",
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    </script>

#### Example - configure the Gantt Toolbar template with a function
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      toolbar: kendo.template("<p>My function template.</p>"),
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    </script>

#### Example - configure the Gantt Toolbar as an array of commands
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      toolbar: [
        { name: "append" },
        { name: "pdf" }
      ],
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    </script>

### toolbar.name `String`

The name of the toolbar command. Either a built-in ("append" and "pdf") or custom. The `name` is reflected in one of the CSS classes, which is applied to the button - `k-gantt-name`.
This class can be used to obtain reference to the button after Gantt initialization and attach click handlers.


<div class="meta-api-description">
Set or customize the identifier for toolbar commands in a Gantt chart by specifying command names such as built-in options like append and pdf, or any custom strings to define and control toolbar buttons, enabling selection via CSS classes for styling or attaching event handlers, configuring command behavior, customizing UI interactions, and managing command identification in Gantt toolbars efficiently.
</div>

#### Example - specify the name of the command
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      toolbar: [
        { name: "append" },
        { name: "pdf" },
        { name: "plannedTasks" },
        { name: "custom" }
      ],
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });

    $(".k-gantt-custom").click(function(e){
        // handler body
    });
    </script>

Apart from the built-in tools, the Gantt fully exposes the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the widget using the components available in the ToolBar itself:

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      toolbar: [ {
          type: "button",
          text: "Button"
      }, {
          type: "button",
          text: "Toggle",
          togglable: true,
          icon: "cancel"
      }, {
          type: "splitButton",
          text: "SplitButton",
          menuButtons: [{text: "Option 1"}, {text: "Option 2"}]
      } ],
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    </script>

### toolbar.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the command. By default renders a button.


<div class="meta-api-description">
Customize and control the appearance and behavior of toolbar commands in a Gantt chart interface by defining templates that render custom HTML, bind dynamic command data, or replace default buttons. Configure and set toolbar layouts during initialization to tailor command presentation, modify button styles, change command icons, and enable or disable specific toolbar functionalities. Enable developers to apply custom rendering logic, inject content dynamically into toolbar commands, and control how actions are displayed and triggered within the Gantt chart control.
</div>

#### Example - set the template as a function
    <div id="gantt"></div>
    <script id="template" type="text/x-kendo-template">
    <a class="k-button" href="" onclick="return toolbar_click()">Command</a>
    </script>
    <script>
    function toolbar_click() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Toolbar command is clicked!");
      return false;
    }
    $("#gantt").kendoGantt({
      toolbar: [
        { template: kendo.template($("#template").html()) }
      ],
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    </script>

#### Example - set the template as a string
    <div id="gantt"></div>
    <script>
    function toolbar_click() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Toolbar command is clicked!");
      return false;
    }
    $("#gantt").kendoGantt({
      toolbar: [
        {
          template: '<a class="k-button" href="" onclick="return toolbar_click()">Command</a>'
        }
      ],
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    </script>

### toolbar.text `String`

The text displayed by the command button. If not set the [name](/api/javascript/ui/gantt#configuration-toolbar.name)` option would be used as the button text instead.


<div class="meta-api-description">
Customize or override the label shown on a toolbar button within a scheduling or project timeline interface, enabling control over button captions, titles, and display text for commands in a Gantt chart toolbar. Configure or set button text for clearer user interface communication, replace default command names with specific phrases, and adjust toolbar button labels during setup or initialization to match terminology, branding, or user preferences for project management interfaces.
</div>

#### Example - set the text of the toolbar button
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      toolbar: [
        { name: "append", text: "Add new" }
      ],
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    </script>

### tooltip `Object`

The task tooltip configuration options.


<div class="meta-api-description">
Configure and customize task detail popups that appear when hovering over Gantt chart bars, enabling control over tooltip content templates, visibility toggling, positioning on the screen, display formatting of task metadata, and interactive hover effects to show progress, start and end dates, resource assignments, status updates, or custom fields within project timelines.
</div>

#### Example - configure the task tooltip
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      tooltip: {
        visible: true
      },
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    </script>

### tooltip.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the tooltip.

The fields which can be used in the template are:

* task - the gantt task, for which the template is shown


<div class="meta-api-description">
Customize and control the Gantt chart tooltip content by configuring or setting a flexible template that dynamically formats, binds, and renders HTML or data for each individual task. Enable tailored tooltip displays to show specific task information, fields, or custom layouts that adapt to different project management needs. This feature supports detailed customization of hover tooltips through user-defined templates that modify how task details appear, allowing developers to design, enhance, and personalize the task preview or info popups for better clarity and user experience in Gantt charts.
</div>

#### Example - set the task tooltip template
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      tooltip: {
        visible: true,
        template: "Title: #= task.title #"
      },
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    </script>

### tooltip.visible `Boolean` *(default: true)*

If set to `false` the gantt will not display the task tooltip. By default the task tooltip is displayed.


<div class="meta-api-description">
Enable or disable the display of hover tooltips for tasks in the Gantt chart to control whether detailed task information appears when hovering over items. Configure task popup visibility, toggle on or off the interactive tooltip that shows task details on mouseover, and set up user interface behavior for task hover hints or info bubbles. Manage whether informational overlays, task descriptions, or quick info cards appear during pointer hover interactions in the project timeline view. Adjust the presentation of hover-based tooltips to improve readability, reduce clutter, or provide contextual data on demand, with options to show or hide these dynamic task info popups across different initialization or runtime scenarios.
</div>

#### Example - disable the task tooltip
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      tooltip: {
        visible: false
      },
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    </script>

### views `Array`

The views displayed by the Gantt and their configuration. The array items can be either objects specifying the view configuration or strings representing the view types (assuming default configuration).
By default the Kendo UI Gantt widget displays "day", "week", and "month" views.


<div class="meta-api-description">
Set or adjust the visible calendar layouts for scheduling interfaces by selecting or customizing multiple timeline views such as daily, weekly, monthly, or other time-based perspectives; enable, configure, or switch between predefined or custom calendar display modes to control how tasks and events are visualized across different periods, allowing tailored time range representations and flexible date-based planning options that can be initialized as string types or detailed objects specifying layout preferences and view-specific settings.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        views: [
            "day",
            "week", 
            { type: "month", selected: true },
            "year"
        ]
    });
    </script>

### views.date `Date`

If set to some date and it is between the range start and range end of the selected view, the timeline of the currently selected view is scrolled to start from this date.

Overrides the [date](/api/javascript/ui/gantt#configuration-date) option of the gantt.


<div class="meta-api-description">
Configure the initial date displayed on the timeline for a specific Gantt chart view, enabling control over which date the timeline begins with when the view loads or is selected. This setting lets you set, adjust, or focus the timeline start point to a precise day within the view’s date range, ensuring the timeline scrolls automatically to that date, overriding global date settings. Useful for setting visible timeframes, customizing view date anchors, shifting timeline focus, or programmatically scrolling to a desired start date on individual Gantt views.
</div>

#### Example
    <div id="gantt1"></div>
    <script>
        $("#gantt1").kendoGantt({
            dataSource: [{
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2016/09/20 09:00"),
                end: new Date("2016/09/20 10:00")
            }],
            views: [
              {
                  type: "day", selected: true,
                  date: new Date("2016/09/20"),
                  range: {
                      start: new Date("2016/09/1"),
                      end: new Date("2016/10/15")
                  },
              }
            ]
        });
    </script>

### views.range `Object`

Configures the view range settings.


<div class="meta-api-description">
Set and customize the visible timeline window for a Gantt chart by defining the initial start and end dates, restricting navigation within minimum and maximum bounds, controlling zoom levels, and determining the timespan displayed on load, enabling precise control over the timeline range, duration, visible periods, time boundaries, scrolling limits, and zoom constraints for scheduling, project planning, and timeline visualization.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        views: [
            {
                type: "month",
                range: {
                    start: new Date("2023/1/1"),
                    end: new Date("2023/12/31")
                }
            }
        ]
    });
    </script>

### views.range.start `Date`

If set to some date the timeline of the view will start from this date.

Overrides the [range.start](/api/javascript/ui/gantt#configuration-range.start) option of the gantt.


<div class="meta-api-description">
Configure or customize the initial start date of the Gantt chart timeline to focus the displayed schedule on a specific date rather than the default global range, enabling control over the visible time window, timeline starting point, or calendar beginning for a particular view, and overriding any general timeline or date range settings to concentrate on precise project phases, milestones, or resource planning periods according to user-defined start criteria.
</div>

#### Example

     <div id="gantt"></div>
     <script>
     $("#gantt").kendoGantt({
       dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2016/6/17 9:00"),
         end: new Date("2016/6/20 11:00")
       }],
       views: [
         { type: "day" },
         { type: "week", selected: true,
           range: {
               start: new Date("2016/06/2")
             }},
         { type: "month" }
       ]
     });
     </script>

### views.range.end `Date`

If set to some date the timeline of the view will end to this date.

Overrides the [range.end](/api/javascript/ui/gantt#configuration-range.end) option of the gantt.


<div class="meta-api-description">
Control and customize the timeline endpoint for a specific Gantt view by setting a fixed end date that determines where the timeline rendering and horizontal scrolling stop, enabling precise management of the visible time range within that view, overriding global timeline end settings. Adjust or configure the timeline limit for individual Gantt views to ensure the display ends exactly on a desired date, supporting use cases like fixed project deadlines, custom viewport ranges, or static timeline boundaries in different timeline perspectives. Enable or set a specific end boundary for Gantt chart timelines to limit horizontal navigation and focus the view on particular periods without affecting other views or global settings.
</div>

#### Example

     <div id="gantt"></div>
     <script>
     $("#gantt").kendoGantt({
       dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2016/6/17 9:00"),
         end: new Date("2016/6/20 11:00")
       }],
       views: [
         { type: "day" },
         { type: "week", selected: true,
           range: {
               end: new Date("2016/06/29")
             }},
         { type: "month" }
       ]
     });
     </script>

### views.type `String`

The type of the view. The built-in views are: "day", "week", "month" and "year".


<div class="meta-api-description">
Control and configure the timeline scale or granularity to display tasks and schedules over different time periods such as daily, weekly, monthly, or yearly views. Adjust, set, or enable the time frame of the Gantt chart to focus on short-term detailed day-by-day planning, medium-term weekly or monthly project tracking, or long-term yearly milestones and schedules. Customize how the timeline and tasks are rendered by selecting the desired temporal resolution or zoom level, switching between various time units to suit project visualization needs and improve planning clarity.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        views: [
            { type: "day" },
            { type: "week" },
            { type: "month" },
            { type: "year" }
        ]
    });
    </script>

### views.selected `Boolean` *(default: false)*

If set to `true` the view will be initially selected by the Gantt widget. The default selected view is "day".

> If more than one view is selected then last of them will prevail.


<div class="meta-api-description">
Control and configure the initial active timeline or calendar perspective when the schedule or project chart loads by predefining which view—such as day, week, or month—is enabled or highlighted at startup; set or specify the default display mode for user focus, prioritize one view over others when multiple are indicated as active, and manage which time interval or zoom level is presented first to optimize visibility and workflow efficiency in scheduling or project tracking interfaces.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/20 11:00")
      }],
      views: [
        { type: "day" },
        { type: "week", selected: true },
        { type: "month" }
      ]
    });
    </script>

### views.slotSize `Number|String` *(default: 100)*

The size of the time slot headers. Values are treated as pixels.


<div class="meta-api-description">
Adjust the vertical dimension, height, or size of time slots and timescale headers in a Gantt chart timeline by specifying a numeric pixel value to control header row height, slot height, or timescale row size; configure, set, or customize the timeline scale, row spacing, and header dimensions to optimize the visual layout and time scale appearance in planning or scheduling views.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/20 11:00")
      }],
      views: [
        { type: "day" },
        { type: "week", selected: true, slotSize: 130 },
        { type: "month" }
      ]
    });
    </script>

### views.timeHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the time slots in "day" view


<div class="meta-api-description">
Customize the display of time slots or headers in a timeline or calendar day view by setting custom templates that control label formats, inject HTML content, style time cells, or dynamically generate time headers for each interval. Enable developers to modify how time intervals, hours, or days appear in scheduling interfaces, configure rendering of time labels, format time ticks or cells, and apply personalized layouts or templates for visualizing time segments in a Gantt chart or similar timeline components.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
      }],
      views: [
        { type: "day", timeHeaderTemplate: kendo.template("#=kendo.toString(start, 'T')#") },
        { type: "week" },
        { type: "month" }
      ]
    });
    </script>

### views.dayHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the day slots in "day" and "week" views.


<div class="meta-api-description">
Customize and control the appearance of day slot headers in daily and weekly Gantt charts by setting templates or rendering functions to format dates, inject custom HTML, apply dynamic bindings, or tailor header content per day, enabling flexible date header display, customized day labels, template-driven header rendering, and advanced header formatting to suit scheduling views and timeline presentations.
</div>

#### Example - dayHeaderTemplate set for "day" view.

    <div id="gantt"></div>
    <script>
      $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
      }],
      views: [
        {
          type: "day",
          dayHeaderTemplate: kendo.template("#=kendo.toString(start, 'D')#")
        },
        { type: "week" },
        { type: "month" }
      ]
    });
    </script>

#### Example - dayHeaderTemplate set for "day" view.

    <div id="gantt"></div>
    <script>
      $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/22 11:00")
      }],
      views: [
        { type: "day"},
        { type: "week",
          dayHeaderTemplate: kendo.template("#=kendo.toString(start, 'd')#"),
          selected: true
        },
        { type: "month" }
      ]
    });
    </script>

### views.weekHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the week slots in "week" and "month" views.


<div class="meta-api-description">
Customize the display and formatting of weekly time slots in calendar or project timelines by controlling how week headers appear in week and month views, enabling the injection of custom HTML, dynamic expressions, data bindings, and template scripts to tailor week labels, dates, and contextual information for enhanced visualization, presentation, or localization of weekly segments in scheduling, planning, and Gantt chart interfaces.
</div>

#### Example - weekHeaderTemplate set for "week" view

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/22 11:00")
      }],
      views: [
        { type: "day"},
        { type: "week",
          weekHeaderTemplate: "#=kendo.toString(start, 'D')# - #=kendo.toString(kendo.date.addDays(end, -1), 'D')#",
          selected: true
        },
        { type: "month" }
      ]
    });
    </script>

#### Example - weekHeaderTemplate set for "month" view

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/7/01 11:00")
      }],
      views: [
        { type: "day"},
        { type: "week"},
        {
          type: "month",
          weekHeaderTemplate: "#=kendo.toString(start, 'M/dd')# - #=kendo.toString(kendo.date.addDays(end, -1), 'M/dd')#",
          selected: true
        }
      ]
    });
    </script>

### views.monthHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the month slots in "month" and "year" views.


<div class="meta-api-description">
Configure and customize the display of month headers in project timeline views by setting templates or functions that control how month labels, dates, and slots appear in monthly and yearly timeframes. Enable modification of month names, formatting of date ranges, insertion of custom HTML or markup, localization of month titles, and dynamic binding of month data to tailor the header visuals and text. Adjust rendering options for calendar months in gantt charts to match specific date formats, display preferences, or multilingual requirements across month and year timeline views.
</div>

#### Example - monthHeaderTemplate set for "month" view

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/7/01 11:00")
      }],
      views: [
        { type: "day"},
        { type: "week"},
        {
          type: "month",
          monthHeaderTemplate: "#=kendo.toString(start, 'MMMM, yyyy')#",
          selected: true
        }
      ]
    });
    </script>

#### Example - monthHeaderTemplate set for "year" view

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/7/01 11:00")
      }],
      views: [
        { type: "day"},
        { type: "week"},
        { type: "month"},
        {
          type: "year",
          monthHeaderTemplate: "#=kendo.toString(start, 'MMMM, yyyy')#",
          selected: true
        }
      ]
    });
    </script>

### views.yearHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the year slots in "year" view.


<div class="meta-api-description">
Control and customize the rendering of yearly segments in timeline or project scheduling views by defining templates that dictate how each year is displayed, enabling tailored labels, HTML markup, styling, and formatting for annual intervals in Gantt charts, timelines, or calendar components. Adjust visual presentation or content of year headers, apply custom formatting, inject dynamic HTML content, modify year labels, or configure year view layouts within time-based visualizations to match specific UI or UX needs.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/7/01 11:00")
      }],
      views: [
        { type: "day"},
        { type: "week"},
        { type: "month"},
        {
          type: "year",
          yearHeaderTemplate: "#=kendo.toString(start, 'yyyy')#",
          selected: true
        }
      ]
    });
    </script>

### views.resizeTooltipFormat `String`

The format used to display the start and end dates in the resize tooltip.


<div class="meta-api-description">
Customize the date and time display format shown in tooltips when resizing tasks, enabling control over how start and end dates appear during drag operations, including adjusting for regional date formats, precise timestamps, custom date patterns, locale-specific representations, or simplified date outputs, to ensure clear, consistent, and contextually relevant tooltip information while modifying task durations on Gantt charts.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17"),
        end: new Date("2014/6/18")
      }],
      snap: false,
      views: [
        {
          type: "week",
          resizeTooltipFormat: "yyyy/M/dd h:mm"
        },
      ]
    });
    </script>

### resources `Object`

The configuration of the gantt resource(s). A gantt resource is optional metadata that can be associated
with a gantt task.


<div class="meta-api-description">
Set up and manage task assignments, resource metadata, and associations within project timelines by configuring people, equipment, tags, or other resource details linked to tasks. Enable resource allocation, lookup, tracking, and integration with task schedules to provide comprehensive project resource planning, workload distribution, and assignment management in Gantt charts. Customize or control resource data to enhance task context, optimize task-resource relationships, or support complex project management scenarios involving human or material resources.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, title: "Task 1", start: new Date("2023/1/1"), end: new Date("2023/1/5") }
        ],
        resources: {
            dataSource: [
                { id: 1, name: "Resource 1", color: "#ff6666" },
                { id: 2, name: "Resource 2", color: "#66ff66" }
            ],
            dataTextField: "name",
            dataColorField: "color"
        },
        assignments: {
            dataSource: [
                { taskId: 1, resourceId: 1, units: 1 }
            ]
        }
    });
    </script>

### resources.dataFormatField `String` *(default: "format")*

The field of the resource data item containing the format of the resource value, which could be assigned to a gantt task.
The data item format value could be any valid [kendo format](/api/javascript/kendo/methods/format).


<div class="meta-api-description">
Specify or configure how resource values appear by setting which data field contains the format string for resources in a Gantt chart, enabling control over resource display formatting with customizable patterns, templates, or Kendo UI format strings; use this to apply, adjust, or define formatting rules for resource assignments, ensuring resource information is shown according to specific numeric, date, or text formats within task allocations and resource displays.
</div>

#### Example - set the resource data format field

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 0,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/7/01 11:00")
      }],
      resources: {
        dataFormatField: "unit",
        dataSource: [
          { id: 0, name: "Resource 1", color: "green", unit: "p0" },
          { id: 1, name: "Resource 2", color: "#32cd32", unit: "p0" }
        ]
      },
      assignments: {
        dataSource: [
          { taskId: 0, resourceId: 1, value: 1 }
        ]
      },
      views: ["week"],
      columns: [
        { field: "title", title: "Title" },
        { field: "resources", title: "Task Resources" }
      ]
    });
    </script>

### resources.dataColorField `String` *(default: "color")*

The field of the resource data item which contains the resource color.


<div class="meta-api-description">
Specify or configure which field in your resource data contains color values to visually distinguish resources in a Gantt chart, enabling control over resource coloring by mapping color codes, color names, or color properties from your dataset to the displayed resource bars, colored segments, or visual indicators within the schedule, useful for customizing, highlighting, or categorizing resources based on predefined color information in your project or task management views.
</div>

#### Example - set the resource data color field

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 0,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/7/01 11:00")
      }],
      resources: {
        dataColorField: "key",
        dataSource: [
          { id: 0, name: "Resource 1", key: "green" },
          { id: 1, name: "Resource 2", key: "#32cd32" }
        ]
      },
      assignments: {
        dataSource: [
          { taskId: 0, resourceId: 1, value: 1 }
        ]
      },
      views: ["week"]
    });
    </script>

### resources.dataSource `Object|Array|kendo.data.DataSource`

The data source which contains resource data items.  Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
Configure, set, or bind resource data collections for scheduling or project management by specifying the source of resource information from local arrays, JavaScript objects, or remote endpoints, enabling dynamic loading, updating, or reuse of resource lists within a Gantt timeline or task management context. Support for various data formats and pre-existing data source instances allows seamless integration, synchronization, or customization of assigned personnel or assets, facilitating flexible resource allocation, tracking, and management across different projects and environments. This covers scenarios for linking external databases, refreshing resource data dynamically, controlling resource inputs, and maintaining consistent resource sets throughout project execution workflows.
</div>

#### Example - set the resource data source

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 0,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/7/01 11:00")
      }],
      resources: {
        dataSource: [
          { id: 0, name: "Resource 1", color: "green" },
          { id: 1, name: "Resource 2", color: "#32cd32" }
        ]
      },
      assignments: {
        dataSource: [
          { taskId: 0, resourceId: 1, value: 1 }
        ]
      },
      views: ["week"]
    });
    </script>

### resources.dataTextField `String` *(default: "text")*

The field of the resource data item which represents the resource text.


<div class="meta-api-description">
Configure the text field used to display resource names, labels, titles, or identifiers in resource management and assignment views by specifying the data attribute that holds the descriptive text for each resource item, enabling flexible mapping of resource display values when binding or loading resource data in timeline and project visualization tools.
</div>

#### Example - set the resource data text field

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 0,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/7/01 11:00")
      }],
      resources: {
        dataTextField: "resource",
        dataSource: [
          { id: 0, resource: "Resource 1", color: "green" },
          { id: 1, resource: "Resource 2", color: "#32cd32" }
        ]
      },
      assignments: {
        dataSource: [
          { taskId: 0, resourceId: 1, value: 1 }
        ]
      },
      views: ["week"]
    });
    </script>

### resources.field `String` *(default: "resources")*

The field of the gantt task which contains the assigned resource objects.


<div class="meta-api-description">
Assign, link, associate, or connect resources to tasks by specifying the data field or property in the task model that holds resource details, enabling retrieval and binding of resource objects per task in Gantt charts, facilitating resource allocation, task assignment, workload tracking, and managing which resources or team members are assigned to individual project tasks within scheduling, planning, timeline visualization, or project management applications.
</div>

#### Example - specify the resource field

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 0,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/7/01 11:00")
      }],
      resources: {
        field: "taskResources",
        dataSource: [
          { id: 0, name: "Resource 1", color: "green", format: "p0" },
          { id: 1, name: "Resource 2", color: "#32cd32", format: "p0" }
        ]
      },
      assignments: {
        dataSource: [
          { taskId: 0, resourceId: 1, value: 1 }
        ]
      },
      views: ["week"],
      columns: [
        { field: "title", title: "Title" },
        { field: "taskResources", title: "Task Resources" }
      ]
    });
    </script>

### rowHeight `Number|String`

The height of the table rows. Numeric values are treated as pixels.


<div class="meta-api-description">
Adjust or configure the vertical height of rows within a Gantt chart to control spacing and alignment of task or event rows, set specific pixel or numeric values to increase or decrease row size, manage consistent row dimensions for clear timeline visualization, customize row spacing to improve readability or fit more items on screen, enable precise control over table row layout and rendering to optimize chart appearance and user interface flow.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 10:00")
      }, {
         id: 2,
         orderId: 0,
         parentId: null,
         title: "Task2",
         start: new Date("2014/6/17 11:00"),
         end: new Date("2014/6/17 12:00")
      }],
      dependencies: [{
         id: 1,
         type: 1,
         predecessorId: 1,
         successorId: 2
      }],
      rowHeight: 100
    });
    </script>

## Fields

### dataSource `kendo.data.GanttDataSource`

The [data source](/api/javascript/data/ganttdatasource) of the widget. Configured via the [datasource](/api/javascript/ui/gantt/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/gantt/methods/setdatasource) method instead.


<div class="meta-api-description">
Control task and dependency data integration, synchronization, and updates in the Gantt chart by configuring the underlying data provider or binding source that drives project timelines and relationships. Enable live data binding, dynamic updates, and task list management to keep the visual timeline aligned with changes, edits, or external data modifications. Set, configure, or update the task and dependency collections feeding the schedule, ensuring seamless refreshes without reassigning raw data objects, supporting methods for responsive data handling, real-time synchronization, and accurate display of project progress and dependencies.
</div>

#### Example - add a Gantt task to the data source

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [{
        id: 1,
        orderId: 0,
        parentId: null,
        title: "Task1",
        start: new Date("2014/6/17 9:00"),
        end: new Date("2014/6/17 11:00")
      }]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.dataSource.add({
      parentId: null,
      start: new Date("2014/6/17 12:00"),
      end: new Date("2014/6/17 14:00"),
      title: "New Task"
    });
    </script>

#### Example - update a Gantt task in the data source

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    var task = gantt.dataSource.at(0);
    task.set("title", "Project start");
    </script>

#### Example - update multiple Gantt task fields with the update method

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    var task = gantt.dataSource.at(0);
    gantt.dataSource.update(task, {
      title: "Project start",
      start: new Date("2014/6/17 12:00"),
      end: new Date("2014/6/17 14:00")
    });
    </script>

#### Example - remove a Gantt task from the data source

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    var task = gantt.dataSource.at(0);
    gantt.dataSource.remove(task);
    </script>

### dependencies `kendo.data.GanttDependencyDataSource`

The [dependencies data source](/api/javascript/data/ganttdependencydatasource) of the widget. Configured via the [dependencies](/api/javascript/ui/gantt/configuration/dependencies) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDependenciesDataSource](/api/javascript/ui/gantt/methods/setdependenciesdatasource) method instead.


<div class="meta-api-description">
Control and interact with the task dependency relationships within the Gantt chart, including reading, monitoring, or handling predecessor and successor links between tasks, managing the collection that tracks how tasks depend on each other, syncing and processing updates to these dependency records, configuring and accessing the underlying data source for task dependencies to enable dynamic updates and integration, and understanding how to observe or manipulate dependency connections for scheduling, sequencing, or workflow purposes.
</div>

#### Example - add a dependency to the dependencies data source

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.dependencies.add({
      predecessorId: 1,
      successorId: 2,
      type: 1
    });
    </script>

#### Example - remove a dependency from the dependencies data source

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    var dependency = gantt.dependencies.at(0);
    gantt.dependencies.remove(dependency);
    </script>

## Methods

### clearSelection

Clears the currently selected task or dependency.


<div class="meta-api-description">
Remove or reset the current highlighted or chosen task, dependency, or item within a Gantt chart interface by clearing any active selections or focus states without deleting data. Enable unselecting or programmatically deselecting tasks, dependencies, or other elements to clear user-highlighted items, reset selection states, disable current focus, or remove chosen entries from the Gantt visualization and interaction context after initial setup or during runtime adjustments.
</div>

#### Example - subscribe to the "dataBinding" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    // select the first task
    gantt.select("tr:eq(0)");
    gantt.clearSelection();
    </script>

### dataItem

Returns the data item to which the specified table row from the GanttList is bound


<div class="meta-api-description">
Access or retrieve the data object linked to a particular table row within a Gantt chart, enabling developers to fetch the task data, model, or underlying record associated with a specific list or row. This function helps in obtaining, reading, or updating the data tied to a Gantt row, converting UI selections or DOM elements back to the original data structure, synchronizing user interface state with the data model, and mapping between table rows and their corresponding data entries for modifications, event handling, or data binding purposes. Whether you need to extract the task details, identify which data item a row represents, or align the UI interactions with the data source, this method provides reliable access to the bound data item behind any row in the Gantt component.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`kendo.data.GanttTask` the task data item to which the specified table row is bound.

#### Example - get the task data item to which the first table row is bound

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    var task = gantt.dataItem("tr:eq(1)");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(task.title); // displays "Task1"
    </script>

### date

Sets date to the widget that will scroll the timeline of the current view to this date.


<div class="meta-api-description">
Navigate or jump to a specific date on the Gantt chart timeline, set or update the visible calendar point, control timeline scrolling to bring a target date into view, programmatically move or shift the chart's viewport to a certain day or time, enable date-centric navigation or focus within the timeline, configure the timeline display to show a particular date after initialization, adjust the timeline window to highlight a selected date, scroll or pan the timeline horizontally to reveal a specific date, center or position the timeline view around a chosen date, and dynamically update or refresh the timeline’s visible date range for scheduling or task tracking.
</div>

#### Parameters

##### date `Date` *(optional)*

A Date that will be set to the currently selected view.

#### Returns

`Date` that is set to the currently seleted view.

#### Example - set date to the widget

     <div id="gantt1"></div>
    <script>
    $("#gantt1").kendoGantt({
            dataSource: [{
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2016/09/20 09:00"),
                end: new Date("2016/09/20 10:00")
            }],
            views: [
              {
                  type: "day", selected: true,
                  range: {
                      start: new Date("2016/09/1"),
                      end: new Date("2016/10/15")
                  }
              }
            ]
    });
    var gantt = $("#gantt1").data("kendoGantt");
    gantt.date(new Date("2016/09/20"));
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.


<div class="meta-api-description">
Clean up and remove all event listeners, data bindings, and child component instances to safely disable or dismantle a Gantt chart without deleting its DOM element, enabling controlled teardown, memory leak prevention, unbinding events, clearing internal data, and preparing the component for removal or reinitialization while preserving the container node.
</div>

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.destroy();
    </script>

### editTask

Opens the popup window to edit the GanttTask object which is received from the call.


<div class="meta-api-description">
Open, launch, or trigger the task editing interface for a specific Gantt chart task to modify its details or properties interactively; invoke or call a method or function on the Gantt component supplying the target task object to display the editable task popup or dialog box, enabling users to update, change, or revise task information such as dates, durations, dependencies, or descriptions within the Gantt scheduling or project management context.
</div>

#### Parameters

##### task `kendo.data.GanttTask`

A kendo.data.GanttTask object which represents the currently selected task.

#### Example - Edit the items from the Task GanttList.

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: {
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/gantttasks"
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
      }
    });
    $(".k-gantt").delegate(".k-gantt-treelist .k-grid-content tr", "click", function(e) {
      var gantt = $("#gantt").data("kendoGantt");
      var task = gantt.dataItem(this);
      gantt.editTask(task);
    });
    </script>

### range

Sets range to the widget.


<div class="meta-api-description">
Control and configure the visible timeline span by programmatically setting or updating the start and end dates displayed in the Gantt chart, enabling navigation, zoom, or adjustment of the calendar view to a specific date range dynamically. Adjust the displayed scheduling period from code to shift the timeline window, refresh the task visualization, or focus on particular time intervals within the project plan. Manage and modify the timeline viewport using methods to precisely set which dates are shown, supporting dynamic zooming, scrolling, or date-range filtering driven by user actions or automated workflows.
</div>

#### Parameters

##### range `Object` *(optional)*

An Object that have start and end parameters of type Date.

#### Returns

`Object` the object with start and end values of the selected view.

#### Example - set range to the widget

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
         {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    var range = {
        start: new Date("2014/06/2"),
        end: new Date("2014/06/23")
    };
    gantt.range(range);
    </script>

### refresh

Renders all tasks and dependencies using the current data items.


<div class="meta-api-description">
Redraw or update the Gantt chart programmatically by triggering a full refresh to re-render all tasks, dependencies, and links based on the latest data changes or external modifications; this process recalculates task relationships, adjusts visual layouts, updates the DOM dynamically, and ensures that any added, removed, or edited tasks and connections reflect the current state and data set, enabling synchronization, instant UI refresh, and accurate chart rendering after data updates, modifications, or dependency recalculations.
</div>

#### Example - refresh the widget

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.refresh();
    </script>

### refreshDependencies

Renders all dependencies using the current data items.


<div class="meta-api-description">
Trigger updating or redrawing of all dependency connectors or relationship lines in a Gantt chart after modifying dependency data, refreshing visual links to synchronize with recent changes such as edits, additions, or removals of dependencies without a full reload. Use this method to control the rendering of dependency connections dynamically, ensuring dependency lines accurately reflect current underlying data relationships, aiding in scenarios like programmatically updating dependencies, synchronizing visual connectors after data mutations, or maintaining accurate task link visuals after dependency updates. This operation supports developer needs for refreshing, re-rendering, or recalculating task dependencies visualization on demand to keep dependency lines consistent and up-to-date with complex dependency collection changes.
</div>

#### Example - refresh the dependencies

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.refreshDependencies();
    </script>

### removeDependency

Removes the specified Gantt dependency.


<div class="meta-api-description">
remove or delete task dependencies from a Gantt chart, unlink predecessor and successor relationships between tasks, detach or clear task links after chart initialization, programmatically manage dependency connections between tasks, update or modify the project schedule by removing dependencies, control or edit task relationships dynamically, remove links that define task order or sequencing, adjust or delete task constraints and dependency mappings within the timeline, break or undo dependencies to change project flow, enable task dependency removal to revise project plans.
</div>

#### Parameters

##### dependency `String|kendo.data.GanttDependency`

The dependency which should be removed. Also accepts a string which is the `uid` of the dependency which should be removed.

#### Example - remove a dependency

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    var dependency = gantt.dependencies.at(0);
    gantt.removeDependency(dependency);
    </script>

### removeTask

Removes the specified Gantt task.


<div class="meta-api-description">
Delete or remove a specific task from the project timeline and underlying data, enabling programmatic task elimination to update the schedule view, data state, or user interface when users want to discard tasks, automate task cleanup, or implement custom logic for task deletion and workflow management. Control task removal dynamically, trigger task deletion through scripts or events, and ensure the changes reflect immediately in the visual Gantt chart and data source to support task management, editing, and project adjustments.
</div>

#### Parameters

##### task `String|kendo.data.GanttTask`

The task which should be removed. Also accepts a string which is the `uid` of the task which should be removed.

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    var task = gantt.dataSource.at(0);
    gantt.removeTask(task);
    </script>

### saveAsPDF

Initiates the PDF export and returns a promise. Also triggers the [pdfExport](/api/javascript/ui/gantt/events/pdfexport) event.

> Calling this method may trip the built-in browser pop-up blocker. To avoid that, call this method as a response to an end-user action, e.g. a button click.


<div class="meta-api-description">
Export or save the current Gantt chart or timeline view as a PDF document, start asynchronous PDF generation, trigger export events for monitoring or customizing PDF output, initiate file creation and download process for PDF reports, handle PDF export progress and errors with promises, configure export settings or customize PDF content dynamically, control or automate PDF generation from the Gantt visualization, enable saving or exporting Gantt data as a portable document format file, initiate client-side PDF creation in response to user actions, manage download prompts and avoid pop-up blockers during PDF export operations.
</div>

#### Returns
`Promise` A promise that will be resolved when the export completes. The same promise is available in the [pdfExport](/api/javascript/ui/gantt/events/pdfexport) event arguments.

#### Example - manually initiate PDF export
    <button id="export">Export to PDF</button>
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });

    $("#export").click(function(e) {
        var gantt = $("#gantt").data("kendoGantt");
        gantt.saveAsPDF();
    });
    </script>

### select

Gets or sets the table row which is selected.


<div class="meta-api-description">
Retrieve, set, or update the active or highlighted table row within a Gantt chart by specifying a row ID or reference, or query the current selection without parameters to manage and synchronize row highlighting programmatically between the Gantt interface and application state; enables controlling which task or data row is selected, reading the selection for logic and UI updates, and coordinating user interaction or automated workflows involving row focus or selection state in project visualization contexts.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`jQuery` the selected table row.

#### Example - select the first table row.

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.select("tr:first");
    </script>

### setDataSource

Sets the tasks data source of the widget.


<div class="meta-api-description">
Configure or update the task list dynamically by assigning a new data source or array of tasks to refresh, reload, or rebind the project timeline, allowing runtime replacement, programmatic updates, and seamless task data management within the Gantt chart. Enable runtime task data swapping, modify task collections on the fly, switch data sources for scheduling, control task refresh cycles, and manage task input programmatically during execution to keep the Gantt chart synchronized with changing project information or external data feeds.
</div>

#### Parameters

##### dataSource `kendo.data.GanttDataSource`

The tasks data source to which the widget should be bound.

#### Example - set the tasks data source

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt();
    var gantt = $("#gantt").data("kendoGantt");
    var dataSource = new kendo.data.GanttDataSource({
      data: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    gantt.setDataSource(dataSource);
    </script>

### setDependenciesDataSource

Sets the dependencies data source of the widget.


<div class="meta-api-description">
Configure, update, or replace the task dependencies data dynamically by setting the source that defines relations and links between tasks in the project timeline. Control or modify the collection of dependency connections at runtime, supporting inputs such as array datasets, external data source instances, or configuration objects, enabling live updates or re-binding of task links after initialization. Manage, switch, or sync dependency data for task scheduling, dependency tracking, or project flow adjustments by setting or resetting the underlying data structure that governs task relationships and sequencing.
</div>

#### Parameters

##### dataSource `kendo.data.GanttDependencyDataSource`

The dependencies data source to which the widget should be bound.

#### Example - set the dependencies data source

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    var dependenciesDataSource = new kendo.data.GanttDependencyDataSource({
      data: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1
        }
      ]
    });
    gantt.setDependenciesDataSource(dependenciesDataSource);
    </script>

### view

Gets or sets the current Gantt view.


<div class="meta-api-description">
Control or retrieve the current timeline layout in the Gantt chart by accessing or setting the active view, enabling dynamic switching of timeline presentations, updating the UI to reflect different scheduling perspectives, saving or loading the current timeline configuration, toggling between views programmatically, querying which timeline layout is currently displayed, adjusting the Gantt display mode on demand, managing visible time ranges, and customizing how the project timeline is rendered for various visualization needs.
</div>

#### Parameters

##### type `String` *(optional)*

The view type to select.

#### Returns

`kendo.ui.GanttView` the current Gantt view.

#### Example - set the current view

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.view("month");
    </script>

## Events

### dataBinding

Fired before the widget binds to its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Configure event handling to intercept and customize the data loading process before a Gantt chart binds to its data source, enabling control over data requests, filtering, query parameters, and modification of incoming data before it is applied. Trigger logic right before data binding to inspect or adjust the datasets, manipulate API calls, or alter query options dynamically, supporting scenarios like validating data, enhancing payloads, or implementing conditional loading workflows within the component instance context. Manage pre-binding stages to influence how the Gantt chart retrieves and processes data, facilitating advanced data handling, request customization, and real-time data adjustments during the component’s data integration phase.
</div>

#### Event Data

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the data bind action and `dataBound` event will not fire.

#### Example - subscribe to the "dataBinding" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      dataBinding: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("dataBinding");
      }
    });
    </script>

#### Example - subscribe to the "dataBinding" after initialization

    <div id="gantt"></div>
    <script>
    function gantt_dataBinding(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("dataBinding");
    }
    $("#gantt").kendoGantt({
     dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("dataBinding", gantt_dataBinding);
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the this keyword) will be set to the widget instance.


<div class="meta-api-description">
Trigger actions or execute custom code right after data loading and binding complete within a Gantt or task scheduling component, enabling developers to refresh user interfaces, synchronize application or external state, initialize or update task-specific logic, rebind dependent controls or elements, handle asynchronous data updates, respond to changes in dataSource binding, run callbacks once project tasks or timelines are loaded, and access component instance methods and properties to manipulate or extend behavior post-data-binding.
</div>

#### Event Data

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      dataBound: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("dataBound");
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <div id="gantt"></div>
    <script>
    function gantt_dataBound(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("dataBound");
    }
    $("#gantt").kendoGantt({
     dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("dataBound", gantt_dataBound);
    </script>

### add

Fired when a new task or a new dependency is about to be added.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Intercept task or dependency additions before they are created, enabling inspection, validation, modification, or cancellation of new Gantt items right before insertion; customize or control the behavior when adding new tasks or relationships by handling pre-add events, accessing and adjusting the item data or preventing creation based on custom logic within the event triggered on new element addition.
</div>

#### Event Data

##### e.task `kendo.data.GanttTask`

The GanttTask instance which will be added to the DataSource.

##### e.dependency `kendo.data.GanttDependency`

The GanttDependency instance which will be added to the DataSource.

##### e.preventDefault `Function`

If invoked prevents the add action.

##### e.sender `kendo.ui.Gantt`

#### Example - subscribe to the "add" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      add: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Add", e.task.title);
      }
    });
    </script>

#### Example - subscribe to the "add" event after initialization

    <div id="gantt"></div>
    <script>
    function gantt_add(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Add", e.task.title);
    }
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("add", gantt_add);
    </script>

### edit

Fired when the user starts task edit upon double click on a cell.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Capture user interactions triggering task edits through double-click actions on cells, enabling detection of when task modifications start in a Gantt chart environment. Respond to initiation of task editing by configuring event listeners that activate on double-click, allowing customization of behaviors, running custom code, opening dialogs or forms, and managing editing workflows within the component context. Detect and handle the precise moment task editing begins, supporting scenarios like inline editing, validation triggers, or UI updates initiated by user gestures on the scheduling or timeline interface. Enable event-driven control over task editing initiation through user double-clicks, facilitating integration with complex editing logic, dynamic UI changes, or conditional event handling tied to the user’s direct interaction with the Gantt chart’s task cells.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object representing the wrapping cell element. That element contains the editing UI.

##### e.task `kendo.data.GanttTask`

The GanttTask which is being edited.

##### e.preventDefault `Function`

If invoked prevents the edit action.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "edit" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      columns: [ { field: "title", title: "Title", editable: true } ],
      edit: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Editing task: ", e.task.title);
      }
    });
    </script>

#### Example - subscribe to the "edit" event after initialization

    <div id="gantt"></div>
    <script>
    function gantt_edit(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Editing task: ", e.task.title)
    }
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      columns: [ { field: "title", title: "Title", editable: true } ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("edit", gantt_edit);
    </script>

### remove

Fired when a task or a dependency is about to be removed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Intercept task or dependency deletions in Gantt charts by reacting to removal events triggered before an item is deleted, enabling you to handle cleanup, validation, confirmation prompts, logging, or cancellation. Capture and control the removal process of tasks or dependencies by hooking into events fired prior to final deletion, allowing customization of deletion workflows, enforcement of business rules, and pre-removal checks. This event-driven approach supports managing or aborting removals dynamically, monitoring changes in project timelines, and integrating safeguards when tasks or dependencies are set to be removed from the scheduling chart.
</div>

#### Event Data

##### e.task `kendo.data.GanttTask`

The GanttTask instance which is being removed the DataSource.

##### e.dependencies `Array`

An array of GanttDependency instances which are associated with the task being removed, or an array with a single dependency which is being removed.

##### e.preventDefault `Function`

If invoked prevents the remove action.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "remove" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 11:00"),
          end: new Date("2014/6/17 14:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 15:00"),
          end: new Date("2014/6/17 16:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1,
          id: 0
        }
      ],
      remove: function(e) {
        if (e.task) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("Removing task:", e.task.title);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(kendo.format("Removing {0} related dependencies", e.dependencies.length));
        } else {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("Removing dependency with id:", e.dependencies[0].id);
        }
      }
    });
    </script>

#### Example - subscribe to the "remove" event after initialization

    <div id="gantt"></div>
    <script>
    function gantt_remove(e) {
      if (e.task) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Removing task:", e.task.title);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.format("Removing {0} related dependencies", e.dependencies.length));
      } else {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Removing dependency with id:", e.dependencies[0].id);
      }
    }
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 11:00"),
          end: new Date("2014/6/17 14:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 15:00"),
          end: new Date("2014/6/17 16:00")
        }
      ],
      dependencies: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1,
          id: 0
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("remove", gantt_remove);
    </script>

### cancel

Fired when the user cancels tasks's cell editing by pressing the 'Esc' key.

The event handler function context (available via the this keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when task editing is aborted or canceled in a Gantt chart by capturing user actions like pressing the Escape key or exiting edit mode prematurely, enabling you to handle event cancellations, rollback changes, perform cleanup, or trigger custom logic when editing a task cell stops without saving. This event tracks user interactions that interrupt or cancel editing workflows within the Gantt timeline, allowing detection of edit cancellations, aborted input, or escape key presses linked to task updates, edits, or modifications. Use this to monitor and respond to user-initiated task editing interruptions or cancellations in a Gantt component environment.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object representing the wrapping cell element. That element contains the editing UI.

##### e.task `kendo.data.GanttTask`

The GanttTask which has been edited.

##### e.preventDefault `Function`

If invoked prevents the cancel action and keeps the cell in edit mode.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "cancel" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 11:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      columns: [ { field: "title", title: "Title", editable: true } ],
      cancel: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Cancel editing task: ", e.task.title);
      }
    });
    </script>

#### Example - subscribe to the "cancel" event after initialization

    <div id="gantt"></div>
    <script>
    function gantt_cancel(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Cancel editing task: ", e.task.title)
    }
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      columns: [ { field: "title", title: "Title", editable: true } ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("cancel", gantt_cancel);
    </script>

### save

Fired when a task field is updated upon user interaction.

The event handler function context (available via the this keyword) will be set to the widget instance.


<div class="meta-api-description">
trigger custom actions or logic when task fields are edited or changed within a Gantt chart or timeline component, detect and handle user updates to tasks, validate modifications made to task properties, execute functions upon task data changes, listen for save or update events on tasks, control workflow after editing tasks, capture user interactions that modify schedule or project details, intercept task field updates for data persistence or validation, respond to dynamic task edits in project planning interfaces, customize save behavior for task updates in a timeline or project management view.
</div>

#### Event Data

##### e.task `kendo.data.GanttTask`

The GanttTask which has been edited.

##### e.values `Object`

The GantTask fields being updated with new values.

##### e.preventDefault `Function`

If invoked prevents the save action and prevents the task from being edited.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "save" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      save: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Save task:", e.task.title);
      }
    });
    </script>

#### Example - subscribe to the "save" event after initialization

    <div id="gantt"></div>
    <script>
    function gantt_save(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Save task:", e.task.title);
    }
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("save", gantt_save);
    </script>

### change

Fired when the user selects a task in the Gantt.

The event handler function context (available via the this keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and respond to user task selection changes within a Gantt chart by capturing selection updates, toggling active tasks, managing selection state, triggering UI refreshes, loading detailed task data, executing custom logic on item focus or click, and handling events that indicate when users pick or switch tasks in scheduling or project timeline views, enabling synchronization of the interface and dynamic content updates during interaction with Gantt task elements.
</div>

#### Event Data

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      change: function(e) {
        var selection = this.select();
        var task;

        if (selection) {
          task = this.dataItem(selection);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(kendo.format("{0} is selected", task.title));
        }
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="gantt"></div>
    <script>
    function gantt_change(e) {
      var selection = this.select();
        var task;

        if (selection) {
          task = this.dataItem(selection);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(kendo.format("{0} is selected", task.title));
        }
    }
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("change", gantt_change);
    </script>

### columnHide

Fires when the user hides a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and respond to user actions that hide or toggle the visibility of columns in a Gantt chart by capturing events triggered when columns are concealed, enabling customization such as updating application state, saving user preferences for column display, dynamically modifying related interface elements, or executing specific logic tied to column visibility changes within the project timeline or task view.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/gantt#configuration-columns) configuration.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example

    <div id="gantt"></div>
    <script>
      $("#gantt").kendoGantt({
        columns: ["title", "start", "end"],
        dataSource: [{
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }],
        columnMenu: true,
        columnHide: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.column.field); // displays the field of the hidden column
        }
      });
    </script>

### columnReorder

Fires when the user changes the order of a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and handle column reorder actions within a Gantt chart by capturing events triggered when users drag or move columns to new positions, enabling you to track which columns changed order, update application state, persist or save the rearranged column sequence, refresh UI elements, rebind data accordingly, and implement custom sorting or layout adjustments in response to column movement, with event details providing source and target positions and direct access to the component instance for flexible, context-aware event handling.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/gantt#configuration-columns) configuration.

##### e.newIndex `Number`

The new column index.

##### e.oldIndex `Number`

The previous column index.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example

    <div id="gantt"></div>
    <script>
      $("#gantt").kendoGantt({
        columns: ["title", "start", "end"],
        dataSource: [{
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }],
        reorderable: true,
        columnReorder: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.column.field, e.newIndex, e.oldIndex);
        }
      });
    </script>

### columnResize

Fired when the user resizes a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect, capture, and respond to user-driven adjustments of column widths in a Gantt chart or grid, enabling runtime handling of column resize actions, dynamically updating layouts, syncing column dimensions with data models, saving user preferences for column sizing, refreshing or recalculating related interface elements, and customizing UI behavior triggered by manual or programmatic resizing events on columns.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/gantt#configuration-columns) configuration.

##### e.newWidth `Number`

The new column width.

##### e.oldWidth `Number`

The previous column width.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "columnResize" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      columns: ["title", "start", "end"],
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      resizable: true,
      columnResize: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field, e.newWidth, e.oldWidth);
      }
    });
    </script>

#### Example - subscribe to the "columnResize" event after initialization

    <div id="gantt"></div>
    <script>
    function gantt_columnResize(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.column.field, e.newWidth, e.oldWidth);
    }
    $("#gantt").kendoGantt({
      columns: ["title", "start", "end"],
      dataSource: [{
         id: 1,
         orderId: 0,
         parentId: null,
         title: "Task1",
         start: new Date("2014/6/17 9:00"),
         end: new Date("2014/6/17 11:00")
      }],
      resizable: true
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("columnResize", gantt_columnResize);
    </script>

### columnShow

Fires when the user shows a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect, capture, or handle when a column is displayed, revealed, or made visible in a Gantt chart interface by listening to visibility change events for columns. Track user actions showing columns to update user interface elements, save or persist which columns are currently visible, synchronize or manage column state across sessions or components, trigger custom logic on column appearance, or respond to dynamic layout changes by configuring event listeners that react to columns becoming visible within Gantt views. Enable callbacks, hooks, or handlers that run when columns appear, allowing developers to control and respond to column display changes programmatically.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/gantt/configuration/columns) configuration.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example

    <div id="gantt"></div>
    <script>

      $("#gantt").kendoGantt({
        columns: ["title", "start", "end"],
        dataSource: [{
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }],
        columnMenu: true,
        columnShow: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.column.field); // displays the field of the shown column
        }
      });
    </script>

### navigate

Fired when the user changes the selected view of the Gantt.

The event handler function context (available via the this keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and handle user interactions when switching between different timeline views such as day, week, or month in Gantt charts, enabling developers to track navigation events, update interface components dynamically, reload or adjust displayed data, log user activity related to view changes, respond to calendar toggling actions, capture view mode switches, customize UI based on selected time span, monitor user-driven timeline changes, configure event listeners for Gantt view navigation, and manage state transitions triggered by switching timeline intervals or granularities.
</div>

#### Event Data

##### e.view `String`

The name of the view which is about to be selected. The possible values are:

* day
* week
* month
* year

##### e.preventDefault `Function`

If invoked prevents the action.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "navigate" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ],
      navigate: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.format("Navigate to {0} view", e.view.charAt(0).toUpperCase() + e.view.slice(1)));
      }
    });
    </script>

#### Example -  subscribe to the "navigate" event after initialization

    <div id="gantt"></div>
    <script>
      function gantt_navigate(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.format("Navigate to {0} view", e.view.charAt(0).toUpperCase() + e.view.slice(1)));
      }
      $("#gantt").kendoGantt({
        dataSource: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 2,
            orderId: 1,
            parentId: null,
            title: "Task2",
            start: new Date("2014/6/17 12:00"),
            end: new Date("2014/6/17 14:00")
          }
        ]
      });
      var gantt = $("#gantt").data("kendoGantt");
      gantt.bind("navigate", gantt_navigate);
    </script>

### moveStart

Fired when the user starts to drag a task.

The event handler function context (available via the this keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a task dragging begins on a Gantt chart to trigger custom behavior such as capturing original start and end dates, initializing drag-and-drop interfaces, starting move operations, or setting flags for task repositioning, by listening for the event fired at the start of task dragging. Capture the initial drag action to manage UI updates, track task timelines, or implement logic that runs as soon as the user initiates moving a task on the timeline. This event supports monitoring drag start points, controlling drag-and-drop workflows, and handling task adjustments dynamically in project scheduling interfaces.
</div>

#### Event Data

##### e.task `kendo.data.GanttTask`

The task which is being moved.

##### e.preventDefault `Function`

If invoked prevents the action.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "moveStart" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      moveStart: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Move start ", e.task.title);
      }
    });
    </script>

#### Example - subscribe to the "moveStart" event after initialization

    <div id="gantt"></div>
    <script>
    function gantt_moveStart(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Move start ", e.task.title);
    }
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("moveStart", gantt_moveStart);
    </script>

### move

Fired when the user is moving a task.

The event handler function context (available via the this keyword) will be set to the widget instance.


<div class="meta-api-description">
Handle live dragging or moving of tasks in a Gantt chart to monitor and respond to ongoing position changes, update visual timelines dynamically, validate or adjust start and end dates during drag operations, synchronize intermediate states in real time, track user interactions while repositioning tasks, capture movement details for custom logic or constraints, control task resizing or shifting on the timeline, receive event callbacks during drag actions, manage task order changes as tasks are moved, and enable responsive UI updates tied to task movement events within project scheduling interfaces.
</div>

#### Event Data

##### e.task `kendo.data.GanttTask`

The task which is being moved.

##### e.start `Date`

The current task start date.

##### e.end `Date`

The current task end date.

##### e.preventDefault `Function`

If invoked prevents the action.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "move" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      move: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.format("task's curren Start {0:g}", e.start));
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.format("task's curren End {0:g}", e.end));
      }
    });
    </script>

#### Example - subscribe to the "move" event after initialization

    <div id="gantt"></div>
    <script>
    function gantt_move(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(kendo.format("task's curren Start {0:g}", e.start));
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(kendo.format("task's curren End {0:g}", e.end));
    }
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("move", gantt_move);
    </script>

### moveEnd

Fired when the user stops moving a task.

The event handler function context (available via the this keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a task drag-and-drop or repositioning action in the timeline or schedule finishes, capturing the end of a move interaction to trigger custom logic like validating updates, saving changes to a database or backend, syncing or persisting edits, or refreshing the displayed data; useful for handling task relocation, adjusting dependencies after dragging, and executing post-drag event handlers with access to the component instance’s methods and state to control or respond to user modifications in Gantt chart interfaces.
</div>

#### Event Data

##### e.task `kendo.data.GanttTask`

The task which is being moved.

##### e.start `Date`

The new task start date.

##### e.end `Date`

The new task end date.

##### e.preventDefault `Function`

If invoked prevents the action.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "moveEnd" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      moveEnd: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.format("task's new Start {0:g}", e.start));
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.format("task's new End {0:g}", e.end));
      }
    });
    </script>

#### Example - subscribe to the "moveEnd" event after initialization

    <div id="gantt"></div>
    <script>
    function moveEnd(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(kendo.format("task's new Start {0:g}", e.start));
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(kendo.format("task's new End {0:g}", e.end));
    }
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("moveEnd", moveEnd);
    </script>

### pdfExport

Fired when the user clicks the "Export to PDF" toolbar button.


<div class="meta-api-description">
Detect and respond to user actions triggering PDF exports from Gantt chart toolbars, such as clicks on export buttons or commands to save Gantt charts as PDF. Capture export initiation events to customize export processing, implement special handling during PDF generation, update the interface dynamically, log export activities for auditing or analytics, and integrate automated workflows that start upon exporting Gantt data to PDF format. Enable event-driven triggers for export buttons labeled "Export to PDF," PDF generation commands, or save-as-PDF actions originating from Gantt chart user interactions.
</div>

#### Event Data

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked the gantt will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

#### Example - subscribe to the "pdfExport" event during initialization
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ],
        pdfExport: function(e) {
        }
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.saveAsPDF();
    </script>

#### Example - subscribe to the "pdfExport" event after initialization
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        toolbar: ["pdf"],
        dataSource: [
            {
                id: 1,
                orderId: 0,
                parentId: null,
                title: "Task1",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/6/17 11:00")
            }
        ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("pdfExport", function(e) {
    });
    gantt.saveAsPDF();
    </script>

### resizeStart

Fired when the user starts to resize a task.

The event handler function context (available via the this keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect the moment a user initiates resizing a task bar in a Gantt chart, capture the starting size and position of the task, trigger custom code or callbacks at the onset of a resize action, enable handling of resize start events for updating interface elements, setting initial state, applying validations, or preparing logic before the resizing progresses, intercept task bar adjustments as they begin, listen for resize initiation to run scripts, configure listeners for the start of task duration changes, and implement responsive actions when a user grabs and moves the boundary of a task item.
</div>

#### Event Data

##### e.task `kendo.data.GanttTask`

The task which is being resized.

##### e.preventDefault `Function`

If invoked prevents the action.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "resizeStart" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      resizeStart: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Resize start ", e.task.title);
      }
    });
    </script>

#### Example - subscribe to the "resizeStart" event after initialization

    <div id="gantt"></div>
    <script>
    function resizeStart(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Resize start ", e.task.title);
    }
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("resizeStart", resizeStart);
    </script>

### resize

Fired when the user is resizing a task.

The event handler function context (available via the this keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a task is being resized in a Gantt chart to track changes in start and end dates, adjust or validate updated task durations, respond to user interactions during resizing, trigger updates or save modifications to task scheduling data, dynamically refresh the interface as task timelines are adjusted, handle events fired during drag-to-resize operations, implement custom logic for real-time task edits, capture resize actions for validation or business rules, and manage callbacks tied to modifying task timeframes within a project timeline.
</div>

##### e.task `kendo.data.GanttTask`

The task which is being moved.

##### e.start `Date`

The current task start date.

##### e.end `Date`

The current task end date.

##### e.preventDefault `Function`

If invoked prevents the action.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "resize" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      resize: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.format("task's curren Start {0:g}", e.start));
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.format("task's curren End {0:g}", e.end));
      }
    });
    </script>

#### Example - subscribe to the "resize" event after initialization

    <div id="gantt"></div>
    <script>
    function gantt_resize(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(kendo.format("task's curren Start {0:g}", e.start));
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(kendo.format("task's current End {0:g}", e.end));
    }
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("resize", gantt_resize);
    </script>

### resizeEnd

Fired when the user releases the mouse after resizing a task.

The event handler function context (available via the this keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a task resize finishes, capture the moment after adjusting task duration or timeline where users release the mouse, trigger custom logic to validate changes, update project schedules, save or persist modified task dates, refresh or re-render the Gantt chart data, enable event-driven handling after resizing operations, hook into resize completion events for task adjustments, monitor and respond to user interactions ending the resize action, set up listeners to handle post-resize updates or side effects, and gain access to the component context to manage state or UI changes following task resizing.
</div>

#### Event Data

##### e.task `kendo.data.GanttTask`

The task which is being resized.

##### e.start `Date`

The new task start date.

##### e.end `Date`

The new task end date.

##### e.preventDefault `Function`

If invoked prevents the action.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example - subscribe to the "resizeEnd" event during initialization

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ],
      resizeEnd: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.format("task's new Start {0:g}", e.start));
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.format("task's new End {0:g}", e.end));
      }
    });
    </script>

#### Example - subscribe to the "resizeEnd" event after initialization

    <div id="gantt"></div>
    <script>
    function gantt_resizeEnd(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(kendo.format("task's new Start {0:g}", e.start));
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(kendo.format("task's new End {0:g}", e.end));
    }
    $("#gantt").kendoGantt({
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/6/17 11:00")
        }
      ]
    });
    var gantt = $("#gantt").data("kendoGantt");
    gantt.bind("resizeEnd", gantt_resizeEnd);
    </script>

### togglePlannedTasks

The event will be raised upon Toolbar PlannedTasks Switch click. As a result, the planned tasks will be either hidden or shown in the Gantt Timeline view. The event is preventable.

The event handler function context (available via the this keyword) will be set to the widget instance.


<div class="meta-api-description">
Control and customize the behavior when users click to show or hide planned tasks in the Gantt chart timeline by intercepting toggle actions on planned task visibility controls, enabling developers to handle or override default switching functionality, prevent automatic toggling of planned task display, manage event handling for toolbar toggles related to planned tasks, implement custom logic on planned task visibility changes, respond programmatically to visibility toggle clicks, and configure or enable conditional showing or hiding of scheduled tasks in the Gantt view.
</div>

#### Event Data

##### e.showPlannedTasks `Boolean`

Indicates whether the planned tasks are about to be shown (true) or hidden (false).

##### e.preventDefault `Function`

If invoked prevents the action.

##### e.sender `kendo.ui.Gantt`

The widget instance which fired the event.

#### Example

    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
      toolbar: ["plannedTasks"],
      dataSource: [
        {
          id: 1,
          orderId: 0,
          parentId: null,
          title: "Task1",
          plannedStart: new Date("2014/6/17 9:00"),
          plannedEnd: new Date("2014/6/17 11:00"),
          start: new Date("2014/6/17 10:00"),
          end: new Date("2014/6/17 12:00")
        }
      ],
      togglePlannedTasks: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.showPlannedTasks);
      }
    });
    </script>
