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

### assignments.dataSource `Object|Array|kendo.data.DataSource`

The data source which contains assignment data items.  Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

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

##### Example

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

### messages.actions `Object`

The configuration of the Gantt action messages. Use this option to customize or localize the Gantt action messages.

### messages.actions.addChild `String` *(default: "Add Child")*

The text similar to "Add child" displayed as Gantt "add child" buttons.

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

### messages.editor.assignButton `String` *(default: "Assign")*

The text similar to "Assign" displayed in Gantt task editor.

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

### messages.editor.name `String` *(default: "Name")*

The text that will be rendered as a title of the Predecessor and Successor columns in the Dependencies edit tables, and the Dependency column in the Assignments edit table.

### messages.editor.percentCompleteHint `String` *(default: "value from 0 to 1")*

The hint text that will be rendered for the percentCompleted NumericTextBox on the popup edit Form.

### messages.editor.remove `String` *(default: "Remove")*

The text that will be rendered in the Remove button of the Dependencies and Assignments edit tables.

### messages.editor.actualStart `String` *(default: "Actual Start")*

The label text of the start DateTimePicker editor when the planned editors are also present on the form.

### messages.editor.actualEnd `String` *(default: "Actual End")*

The label text of the end DateTimePicker editor when the planned editors are also present on the form.

### messages.editor.parentOptionLabel `String` *(default: "-None-")*

The optionLabel of the parent DropDownList editor.

### messages.editor.general `String` *(default: "General")*

The text used for the main (general) tab on the edit popup TabStrip.

### messages.editor.predecessors `String` *(default: "Predecessors")*

The text used for the predecessors tab on the edit popup TabStrip.

### messages.editor.successors `String` *(default: "Successors")*

The text used for the successors tab on the edit popup TabStrip.

### messages.editor.other `String` *(default: "Other")*

The text used for the other tab on the edit popup TabStrip.

### messages.editor.dependencyType `String` *(default: "Type")*

The text that will be rendered as a title of the Type column in the Dependencies edit tables.

### messages.plannedTasks `Object`

The configuration of the Gantt messages for Planned tasks.

### messages.plannedTasks.switchText `String` *(default: "Planned Tasks")*

The text that would be displayed on the switch allowing the user to turn on and off the PlannedTasks view in the Gantt Timeline.

### messages.plannedTasks.offsetTooltipAdvanced `String` *(default: "Met deadline earlier")*

The text rendered in the Tooltip that would be displayed for tasks which have finished in advance compared to their plannedEnd.

### messages.plannedTasks.offsetTooltipDelay `String` *(default: "Delay")*

The text rendered in the Tooltip that would be displayed for tasks which have finished with delay compared to their plannedEnd.

### messages.plannedTasks.seconds `String` *(default: "seconds")*

The text for "seconds" displayed in the Advanced/Delayed Tooltip (see above).

### messages.plannedTasks.minutes `String` *(default: "minutes")*

The text for "minutes" displayed in the Advanced/Delayed Tooltip (see above).

### messages.plannedTasks.hours `String` *(default: "hours")*

The text for "hours" displayed in the Advanced/Delayed Tooltip (see above).

### messages.plannedTasks.days `String` *(default: "days")*

The text for "days" displayed in the Advanced/Delayed Tooltip (see above).

### messages.save `String` *(default: "Save")*

The text similar to "Save" displayed in Gantt.

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

### messages.views.day `String` *(default: "Day")*

The text similar to "Day" displayed as Gantt "day" view title.

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

### pdf.author `String` *(default: null)*

The author of the PDF document.

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

### pdf.avoidLinks `Boolean|String` *(default: false)*
A flag indicating whether to produce actual hyperlinks in the exported PDF file.

It's also possible to pass a CSS selector as argument. All matching links will be ignored.

> Available in versions 2015.3.1020 and later

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.

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

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.

### pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.

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

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as "pt" units.

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as "pt" units.

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as "pt" units.

### pdf.paperSize `String|Array` *(default: "auto")*

Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size: "A4", "A3" etc
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".

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

### range.start `Date`

 If set to some date the timeline of all views will start from this date.

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

### views.date `Date`

If set to some date and it is between the range start and range end of the selected view, the timeline of the currently selected view is scrolled to start from this date.

Overrides the [date](/api/javascript/ui/gantt#configuration-date) option of the gantt.

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

### views.range.start `Date`

If set to some date the timeline of the view will start from this date.

Overrides the [range.start](/api/javascript/ui/gantt#configuration-range.start) option of the gantt.

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

### views.selected `Boolean` *(default: false)*

If set to `true` the view will be initially selected by the Gantt widget. The default selected view is "day".

> If more than one view is selected then last of them will prevail.

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

### resources.dataFormatField `String` *(default: "format")*

The field of the resource data item containing the format of the resource value, which could be assigned to a gantt task.
The data item format value could be any valid [kendo format](/api/javascript/kendo/methods/format).

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
