---
title: TreeList
page_title: Configuration, methods and events of Kendo UI TreeList
description: Code examples for TreeList UI widget configuration. Learn how to use methods and which events to set once the treelist UI widget is initialized and expanded.
res_type: api
component: treelist
---

# kendo.ui.TreeList

Represents the Kendo UI TreeList widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the specified DataSource during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource/events/change) event of the
DataSource is fired. By default the widget will bind to the DataSource specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same DataSource. Disabling automatic binding ensures that the shared DataSource doesn't make more than one request to the remote service.

#### Example - disable automatic binding

    <div id="treelist"></div>
    <button id="btn">Bind TreeList</button>
    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
            dataType: "jsonp"
          }
        },
        schema: {
          model: {
            id: "EmployeeID",
            parentId: "ReportsTo",
            fields: {
              ReportsTo: { field: "ReportsTo",  nullable: true },
              EmployeeID: { field: "EmployeeId", type: "number" },
              Extension: { field: "Extension", type: "number" }
            },
            expanded: true
          }
        }
      });
      var treelist = $("#treelist").kendoTreeList({
        dataSource: dataSource,
        columns: [
          { field: "FirstName" }, { field: "LastName" }, { field: "Position" }
        ],
        autoBind: false
      }).data("kendoTreeList");

      $("#btn").click(function(){
        treelist.dataSource.read();
      });
    </script>

### columns `Array`

The configuration of the treelist columns. An array of JavaScript objects or strings. JavaScript objects are interpreted as column configurations. Strings are interpreted as the
[field](/api/javascript/ui/treelist#configuration-columns.field) to which the column is bound. The TreeList will create a column for each item of the array.

#### Example - specify treelist columns as array of strings

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          "lastName",
          "position"
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>

#### Example - specify treelist columns as array of objects

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>

### columns.attributes `Object`

HTML attributes of the table cell (`<td>`) rendered for the column.

> HTML attributes which are JavaScript keywords (e.g. *class*) must be quoted.

#### Example - specify column HTML attributes

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          {
            field: "position",
            attributes: {
              "class": "highlight",
              style: "text-align: right"
            }
          }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>
    <style>
      .highlight {
        color: red;
      }
    </style>

The table cells would look like this: `<td class="name-cell" style="text-align: right">...</td>`.

### columns.columns `Array`

The columns which should be rendered as child columns under this group column header.

**Note that group column cannot be data bound and supports limited number of bound column settings - such as title, locked

#### Example - set column group column for displaying multicolumn headers

    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
        columns: [
        {
            title: "Personal Info",
            columns: [
                { field: "lastName" },
                { field: "age" }
            ]
        },
        {
            title: "Work info",
            columns: [
                { field: "position" }
            ]
        }
      ],
      dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", age: 25, position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", age: 33, position: "	VP, Engineering" }
        ]
    });
    </script>

### columns.command `Array`

The configuration of the column command(s). If set the column would display a button for every command. Commands can be custom or built-in ("edit", "createChild" or "destroy"):

* The "edit" built-in command switches the current table row to edit mode.

* The "createChild" built-in command adds a new child item to the current table row and switches to edit mode.

* The "destroy" built-in command removes the data item to which the current table row is bound.

Custom commands are supported by specifying the [click](/api/javascript/ui/treelist#configuration-columns.command.click) option.

> Each custom command requires you to explicitly specify its [name](/api/javascript/ui/treelist/configuration/columns.command.name).
>
> A command column cannot be [expandable](/api/javascript/ui/treelist#configuration-columns.expandable).
>
> The built-in "edit", "createChild" and "destroy" commands work *only* if editing is enabled via the [editable](/api/javascript/ui/treelist#configuration-editable) option, and the TreeList DataSource is configured for [CRUD operations](http://docs.telerik.com/kendo-ui/framework/datasource/crud). The "edit" command supports "inline" and "popup" editing modes.

#### Example - set command as array of strings

      <div id="treelist"></div>

      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          $("#treelist").kendoTreeList({
            editable: true,
            height: 540,
            columns: [
              { field: "FirstName", expandable: true, title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { title: "Edit", command: [ "createChild", "edit" ], width: 180 }
            ],
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  dataType: "jsonp"
                },
                create: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                  dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                  }
                }
              },
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            }
          });
      </script>

#### Example - set command as array of objects

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              click: function(e) {
                // command button click handler
              },
              imageClass: "k-i-info"
            },
            { name: "destroy" } // built-in "destroy" command
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>

### columns.command.className `String`

The CSS class applied to the command button.

#### Example - set the CSS class of the command

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              className: "btn-details"
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>
    <style>
      .btn-details {
        color: green;
        font-weight: bold;
      }
    </style>

### columns.command.imageClass `String`

The CSS class applied to the icon span of the command button.

#### Example - set the CSS class of the command icon

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              imageClass: "k-i-info"
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.command.click `Function`

The JavaScript function executed when the user clicks the command button. The function receives a [jQuery Event](http://api.jquery.com/category/events/event-object/) as an argument.

The function context (available via the `this` keyword) will be set to the treelist instance.

#### Example - handle the click event of the custom command button

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              click: function(e) {
                // e.target is the DOM element representing the button
                var tr = $(e.target).closest("tr"); // get the current table row (tr)
                // get the data bound to the current table row
                var data = this.dataItem(tr);
                console.log("Details for: " + data.lastName);
              }
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.command.name `String`

The name of the command. The built-in command names are "edit", "createChild" and "destroy". Check the [`columns.command`](/api/javascript/ui/treelist#configuration-columns.command) section for additional important information. When set to a custom value, the `name` is rendered as a `data-command` attribute.

#### Example - set the command name

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              imageClass: "k-i-info"
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.command.text `String`

The text displayed by the command button. If not set the [name](/api/javascript/ui/treelist#configuration-columns.command.name) option is used as the button text.

#### Example - customize the text of the command

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "custom",
              text: "Details"
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.editable `Function`

The JavaScript function executed when the cell/row is about to be opened for edit. The result returned will determine whether an editor for the column will be created.

#### Example - conditionally edit a cell

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
            columns: [
              {
                  field: "lastName",
                  title: "Last Name",
                  editable: function(dataItem) {
                      return dataItem.lastName !== "Jackson";
                  }
              },
              { field: "position", title: "Position", },
              { title: "Edit", command: ["edit"], width: 250 }
            ],
            editable: true,
            dataSource: [
              { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
              { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
            ]
        });
    </script>

### columns.editor `Function`

Provides a way to specify a custom editing UI for the column. Use the `container` parameter to create the editing UI.

> The editing UI should contain an element that has a `name` HTML attribute set and that attribute value should match the [field](/api/javascript/ui/treelist#configuration-columns.field) name.

> Validation settings defined in the `model.fields` configuration will **not** be applied automatically. In order for the validation to work, **the developer is responsible for attaching the corresponding validation attributes to the editor input**. In case the custom editor is a widget, the developer can [customize the validation warning tooltip position](/framework/validator/overview#customizing-the-tooltip-position) to avoid visual issues.

#### Parameters

##### container `jQuery`

The jQuery object representing the container element.

##### options `Object`

##### options.field `String`

The name of the field to which the column is bound.

##### options.format `String`

The format string of the column specified via the [format](/api/javascript/ui/treelist#configuration-columns.format) option.

##### options.model `kendo.data.TreeListModel`

The model instance to which the current table row is bound.

#### Example - create a custom column editor using the Kendo UI AutoComplete

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          {
            field: "lastName",
            editor: function(container, options) {
              // create an input element
              var input = $("<input/>");
              // set its name to the field to which the column is bound ('lastName' in this case)
              input.attr("name", options.field);
              // append it to the container
              input.appendTo(container);
              // initialize a Kendo UI AutoComplete
              input.kendoAutoComplete({
                dataTextField: "lastName",
                dataSource: [
                  { lastName: "Jackson" },
                  { lastName: "Strong" },
                  { lastName: "Simon"}
                ]
              });
            }
          },
          { field: "position"},
          { command: [ "edit" ] }
        ],
        editable: true,
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

#### Example - create a custom column editor with validation

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          {
            field: "lastName",
            editor: function(container, options) {
              // create input element and add the validation attribute
              var input = $('<input name="' + options.field + '" required="required" />');
              // set its name to the field to which the column is bound ('lastName' in this case)
              input.attr("name", options.field);
              // append it to the container
              input.appendTo(container);
              // initialize a Kendo UI AutoComplete
              input.kendoAutoComplete({
                dataTextField: "lastName",
                dataSource: [
                  { lastName: "Jackson" },
                  { lastName: "Strong" },
                  { lastName: "Simon"}
                ]
              });
            }
          },
          { field: "position"},
          { command: [ "edit" ] }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.encoded `Boolean` *(default: true)*

If set to `true` the column value will be HTML-encoded before it is displayed. If set to `false` the column value will be displayed as is. By default the column value is HTML-encoded.

#### Example - prevent HTML encoding

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName"},
          { field: "position", encoded: false},
          { command: [ "edit" ] }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "<strong>CEO</strong>" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.expandable `Boolean` *(default: false)*

If set to `true` the column will show the icons that are used for expanding and collapsing child rows. By default, the first column of the TreeList is expandable.

> An expandable column cannot hold [commands](/api/javascript/ui/treelist#configuration-columns.command).

#### Example - make the second column expandable

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age", expandable: true }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columns.field `String`

The field to which the column is bound. The value of this field is displayed by the column during data binding.
**The field name should be a valid Javascript identifier and should contain only alphanumeric characters (or "$" or "_"), and may not start with a digit.**

#### Example - specify the column field

    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { command: [ "edit" ] }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable `Boolean|Object` *(default: true)*

If set to `true` a filter menu will be displayed for this column when filtering is enabled. If set to `false` the filter menu will not be displayed. By default a filter menu is displayed
for all columns when filtering is enabled via the [filterable](/api/javascript/ui/treelist#configuration-filterable) option.

Can be set to a JavaScript object which represents the filter menu configuration.

#### Example - disable filtering

    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position", filterable: false }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.ui `String|Function`

The `role` [data attribute](/framework/data-attribute-initialization) of the widget used in the filter menu or a JavaScript function which initializes that widget.

#### Example - specify the filter UI as a string

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          {
            field: "hireDate",
            filterable: {
              ui: "datetimepicker" // use Kendo UI DateTimePicker
            }
          }
        ],
        filterable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", hireDate: new Date(2012, 2, 3) },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering", hireDate: new Date(2012, 7, 13) }
          ],
          schema: {
            model: {
              fields: {
                hireDate: { type: "date" }
              }
            }
          }
        }
      });
    </script>

#### Example - initialize the filter UI

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          {
            field: "hireDate",
            filterable: {
              ui: function(element) {
                element.kendoDateTimePicker(); // initialize a Kendo UI DateTimePicker
              }
            }
          }
        ],
        filterable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", hireDate: new Date(2012, 2, 3) },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering", hireDate: new Date(2012, 7, 13) }
          ],
          schema: {
            model: {
              fields: {
                hireDate: { type: "date" }
              }
            }
          }
        }
      });
    </script>

### columns.footerTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the footer table cell for the column.

The fields which can be used in the template are:

* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)

#### Example - specify column footer template

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age",
              footerTemplate: "Min: #: min # Max: #: max #"
            }
          ],
          dataSource: {
            data: [
              { id: 1, parentId: null, name: "Jane Doe", age: 30 },
              { id: 2, parentId: 1, name: "John Doe", age: 33 },
              { id: 3, parentId: 1, name: "Joseph Doe", age: 42 }
            ],
            aggregate: [
                { field: "age", aggregate: "min" },
                { field: "age", aggregate: "max" }
            ]
          }
        });
    </script>

### columns.format `String`

The format that is applied to the value before it is displayed. Takes the form "{0:format}" where "format" is a [standard number format](/api/javascript/kendo#standard-number-formats),
[custom number format](/api/javascript/kendo#custom-number-formats), [standard date format](/api/javascript/kendo#standard-date-formats) or a [custom date format](/api/javascript/kendo#custom-date-formats).

> The [kendo.format](/api/javascript/kendo/methods/format) function is used to format the value.

#### Example - specify the column format string

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "successRate", format: "{0:p}" },
          { field: "hireDate", format: "{0:dd/MMM/yyyy}" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", successRate: 0.7, hireDate: new Date(2012, 2, 3) },
            { id: 2, parentId: 1, lastName: "Weber", successRate: 0.8, hireDate: new Date(2012, 7, 13) }
          ]
        }
      });
    </script>

### columns.headerAttributes `Object`

HTML attributes of the table header cell (`<th>`) rendered for the column.

> HTML attributes which are JavaScript keywords (e.g. *class*) must be quoted.

#### Example - specify column header HTML attributes

    <div id="treeList"></div>
    <script>
      var dataSource = new kendo.data.TreeListDataSource({
          data: [
            { id: 1, parentId: null, lastName: "Jackson" },
            { id: 2, parentId: 1, lastName: "Weber" }
          ]
      });
      $("#treeList").kendoTreeList({
        columns: [ {
          field: "lastName",
          headerAttributes: {
            "class": "name-header",
            style: "text-align: right"
          }
        } ],
        dataSource: dataSource
      });
    </script>

The table headers would look like this: `<th class="name-header" style="text-align: right">...</th>`.

### columns.headerTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the column header content. By default the value of the [title](/api/javascript/ui/treelist/configuration/columns.title) column option
is displayed in the column header cell.

> If sorting is enabled, the column header content will be wrapped in an `<a>` element. As a result the template **must** contain only inline elements.

#### Example - column header template as a string

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
            columns: [ {
                field: "lastName",
                headerTemplate: '<input type="checkbox" id="check-all" /><label for="check-all">check all</label>'
            }],
            dataSource: {
                data: [
                    { id: 1, parentId: null, lastName: "Jackson" },
                    { id: 2, parentId: 1, lastName: "Weber" }
                ]
            }
        });
    </script>

### columns.minScreenWidth `Number`

The pixel screen width below which the column will be hidden. The setting takes precedence over the [`hidden`](/api/javascript/ui/treelist/configuration/columns.hidden) setting,
so the two should not be used at the same time.

#### Example - Hide columns when screen is smaller than a given width

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
          columns: [
            { field: "id", width: 250, minScreenWidth: 500 }, //column will become hidden if screen size is less than 500px
            { field: "name", width: 250 }, //column will always be visible
            { field: "age", width: 250, minScreenWidth: 750 } //column will become hidden if screen size is less than 750px
          ],
          dataSource: [
              { id: 1, parentId: null, name: "Jane Doe", age: 31, city: "Boston" },
              { id: 2, parentId: 1, name: "John Doe", age: 55, city: "New York" }
          ]
        });
    </script>

### columns.sortable `Boolean|Object` *(default: true)*

If set to `true` the user can click the column header and sort the treelist by the column [field](/api/javascript/ui/treelist#configuration-columns.field) when sorting is enabled. If set to `false` sorting will
be disabled for this column. By default all columns are sortable if sorting is enabled via the [sortable](/api/javascript/ui/treelist#configuration-sortable) option.

#### Example - disable sorting

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position", sortable: false }
        ],
        sortable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" },
            { id: 3, parentId: 1, lastName: "Carr", position: "VP, Finance" }
          ]
        }
      });
    </script>

### columns.sortable.compare `Function`

A JavaScript function which is used to compare the values - should return -1 if first argument is less than second one, 0 if both are the same or +1 if the first one is greater than second one.

#### Example - define custom compare function

    <div id="treeList"></div>
    <script>
      var numbers = {
        "one"  : 1,
        "two"  : 2,
        "three": 3
      };


      $("#treeList").kendoTreeList({
        dataSource: {
          data: [
                { id: 1, parentId: null, item: "two" },
                { id: 2, parentId: 1, item: "one" },
                { id: 3, parentId: 1, item: "three" }
            ]
        },
        sortable: true,
        columns: [{
          field: "item",
          sortable: {
            compare: function(a, b) {
              return numbers[a.item] - numbers[b.item];
            }
          }
        }]
      });
    </script>

### columns.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the column content. The treelist renders table rows (`<tr>`) which represent the data source items.
Each table row consists of table cells (`<td>`) which represent the treelist columns. By default the HTML-encoded value of the [field](/api/javascript/ui/treelist#configuration-columns.field) is displayed in the column.

> Use the `template` to customize the way the column displays its value.

#### Example - set the template as a string (wrap the column value in HTML)

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position", template: "<strong>#: position #</strong>" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
          ]
        }
      });
    </script>

#### Example - external template with conditional formatting and button handler

    <div id="treelist"></div>

    <script type="text/x-kendo-template" id="template">
        # if (data.allowVote) { #
            <button class='k-button btn-vote'>Vote</button>
        # } #
    </script>

    <script>
    $("#treelist")
      .kendoTreeList({
        columns: [
          { field: "name" },
          { template: $("#template").html() }
        ],
        dataSource: [
          { allowVote: true, name: "Jane Doe" },
          { allowVote: true, name: "Joseph Doe" },
          { name: "John Doe" }
        ]
      })
      .on("click", ".btn-vote", function(e) {
        var treelist = $(e.delegateTarget).data("kendoTreeList");
        var dataItem = treelist.dataItem(e.currentTarget);
        alert("Voted for " + dataItem.name)
      });
    </script>

### columns.title `String`

The text that is displayed in the column header cell. If not set the [field](/api/javascript/ui/treelist#configuration-columns.field) is used.

#### Example - set the title of the column

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
          ]
        }
      });
    </script>

### columns.width `String|Number`

The width of the column. Numeric values are treated as pixels.

#### Example - set the column width as a string

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", width: "200px" },
          { field: "position" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
          ]
        }
      });
    </script>

#### Example - set the column width as a number

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", width: 200 },
          { field: "position" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
          ]
        }
      });
    </script>

### columns.hidden `Boolean` *(default: false)*

If set to `true` the column will not be displayed in the treelist. By default all columns are displayed.

#### Example - hide columns

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age", hidden: true }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columns.menu `Boolean`

If set to `true` the column will be visible in the treelist column menu. By default the column menu includes all data-bound columns (ones that have their [field](/api/javascript/ui/treelist#configuration-columns.field) set).

#### Example - hide a column from the column menu

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id", menu: false },
                { field: "name" },
                { field: "age" }
            ],
            columnMenu: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columns.locked `Boolean` *(default: false)*

If set to `true` the column will be displayed as locked (frozen) in the treelist. Also see the information about [Frozen Columns](/controls/data-management/treelist/appearance#locked-columns) in the TreeList Appearance article.

#### Example - locked columns

    <div id="treeList" style="width: 500px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 100},
          { field: "name", width: 200 },
          { field: "age", width: 250 }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        }
      });
    </script>

### columns.lockable `Boolean` *(default: true)*

If set to `false` the column will remain in the side of the TreeList into which its own locked configuration placed it.

> This option is meaningful when the treelist has columns which are configured with a [locked](/api/javascript/ui/treelist#configuration-columns.locked) value. Setting it explicitly to `false` will
prevent the user from locking or unlocking this column using the user interface.

#### Example - lockable columns

    <div id="treeList" style="width: 500px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 100},
          { field: "name", width: 200 },
          { field: "age", width: 250, lockable: false }
        ],
        reorderable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        }
      });
    </script>

### resizable `Boolean` *(default: false)*

If set to `true` allows users to resize columns by dragging their header borders. By default resizing is disabled.

#### Example - enable column resizing

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id" },
                { field: "name" },
                { field: "age" }
            ],
            resizable: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### reorderable `Boolean` *(default:false)*

If set to `true` the user could reorder the columns by dragging their header cells. By default reordering is disabled.

#### Example - enable column reordering

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id" },
                { field: "name" },
                { field: "age" }
            ],
            reorderable: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columnMenu `Boolean|Object` *(default: false)*

If set to `true` the treelist will display the column menu when the user clicks the chevron icon in the column headers. The column menu allows the user to show and hide columns, filter and sort (if filtering and sorting are enabled).
By default the column menu is not enabled.

Can be set to a JavaScript object which represents the column menu configuration.

#### Example - enable the column menu

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            columnMenu: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columnMenu.columns `Boolean` *(default: true)*

If set to `true` the column menu would allow the user to select (show and hide) treelist columns. By default the column menu allows column selection.

#### Example - disable column show/hide using the column menu

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        columnMenu: {
          columns: false
        },
        sortable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.filterable `Boolean` *(default: true)*

If set to `true` the column menu will allow the user to filter the TreeList. By default the column menu allows the user to filter if filtering is enabled via the [filterable](/api/javascript/ui/treelist#configuration-filterable).

#### Example - disable column menu filtering

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        filterable: true,
        columnMenu: {
          filterable: false
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        }
      });
    </script>

### columnMenu.sortable `Boolean` *(default: true)*

If set to `true` the column menu would allow the user to sort the treelist by the column field. By default the column menu allows the user to sort if sorting is enabled via the [sortable](/api/javascript/ui/treelist#configuration-sortable) option.

> If this option is set to `false` the user could still sort by clicking the column header cell.

#### Example - disable column menu sorting

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            sortable: true,
            columnMenu: {
                sortable: false
            },
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 },
                    { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
                ]
            }
        });
    </script>

### columnMenu.messages `Object`

The text messages displayed in the column menu. Use it to customize or localize the column menu messages.

#### Example - customize column menu messages

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        filterable: true,
        columnMenu: {
          messages: {
            columns: "Choose columns",
            filter: "Apply filter",
            sortAscending: "Sort (asc)",
            sortDescending: "Sort (desc)"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.columns `String` *(default: "Columns")*

The text message displayed for the column selection menu item.

#### Example - set the column selection message

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            columnMenu: {
                messages: {
                  columns: "Choose columns"
                }
            },
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columnMenu.messages.filter `String` *(default: "Filter")*

The text message displayed for the filter menu item.

#### Example - set the filter message

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        filterable: true,
        columnMenu: {
          messages: {
            filter: "Apply filter"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.sortAscending `String` *(default: "Sort Ascending")*

The text message displayed for the menu item which performs ascending sort.

#### Example - set the sort ascending message

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            sortAscending: "Sort (asc)"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.sortDescending `String` *(default: "Sort Descending")*

The text message displayed for the menu item which performs descending sort.

#### Example - set the sort descending message

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            sortDescending: "Sort (desc)"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.settings `String` *(default: "Column Settings")*

The text message displayed in the menu header.

#### Example - set the sort ascending message

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            settings: "Column Options"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.lock `String` *(default: "Lock")*

The text message displayed in the column menu for locking a column.

#### Example - set the sort ascending message

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            lock: "Pin Column"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.unlock `String` *(default: "Unlock")*

The text message displayed in the column menu for unlocking a column.

#### Example - set the sort ascending message

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            lock: "Unpin Column"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### dataSource `Object|Array|kendo.data.TreeListDataSource`

The data source of the widget which is used to render table rows. Can be a JavaScript object which represents a valid [kendo.data.TreeListDataSource](/api/javascript/data/treelistdatasource) configuration, a JavaScript array or an existing [kendo.data.TreeListDataSource](/api/javascript/data/treelistdatasource) instance.

If the `dataSource` option is set to a JavaScript object or an array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/treelistdatasource) instance using that value as DataSource configuration.

If the `dataSource` option is an existing `kendo.data.TreeListDataSource` instance, the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

#### Example - set dataSource as a JavaScript array

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            sortDescending: "Sort (desc)"
          }
        },
        dataSource: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
        ]
      });
    </script>

#### Example - set dataSource as an existing kendo.data.TreeListDataSource instance

      <div id="treelist"></div>

      <script>
        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: new kendo.data.TreeListDataSource({
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          }),
          height: 400,
          columns: [
            { field: "FirstName", title: "First Name", width: 220},
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" }
          ]
        });
      </script>

### editable `Boolean|Object` *(default: false)*

If set to `true` the user would be able to edit the data to which the TreeList is bound. By default, editing is disabled.

Can be set to a string ("inline", "popup" or "incell") to specify the editing mode. The default editing mode is "inline".

Can be set to a JavaScript object which represents the editing configuration.

> The "inline" and "popup" editing modes are triggered by the "edit" column command. Thus it is required to have a column with an "edit" command.
>
> To have edit operations work correctly in the TreeList, the `dataSource` has to be [configured for CRUD operations](/framework/datasource/crud).

#### Example - enable editing

      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          $("#treelist").kendoTreeList({
            editable: true,
            height: 540,
            columns: [
              { field: "FirstName", title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { title: "Edit", command: [ "edit" ], width: 180 }
            ],
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                  }
                }
              },
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            }
          });
      </script>

#### Example - enable popup editing

      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          $("#treelist").kendoTreeList({
            editable: "popup",
            height: 540,
            columns: [
              { field: "FirstName", title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { title: "Edit", command: [ "edit" ], width: 180 }
            ],
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                  }
                }
              },
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            }
          });
      </script>

### editable.mode `String` *(default: "inline")*

The editing mode to use. The supported editing modes are "inline", "popup" and "incell".

> The "inline" and "popup" editing modes are triggered by the "edit" column command. Thus it is required to have a column with an "edit" command.

#### Example - specify inline editing mode

      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          $("#treelist").kendoTreeList({
            editable: {
                mode: "inline"
            },
            height: 540,
            columns: [
              { field: "FirstName", title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { title: "Edit", command: [ "edit" ], width: 180 }
            ],
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                  }
                }
              },
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            }
          });
      </script>

### editable.move `Boolean` *(default: false)*

Enables drag&drop UI of rows between parents.

#### Example - use drag&drop for editing row parent node

        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            move: true
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" }
          ]
        });
      </script>

### editable.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the popup editor.

The template should contain elements which `name` HTML attribute is set to the name of the editable field. This is how the TreeList will know
which field to bind each editor to. The other option is to use [MVVM](/framework/mvvm/overview) bindings in order to bind HTML elements to data item fields.

> Use the `role` data attribute to initialize Kendo UI widgets in the template. Check [data attribute initialization](/framework/data-attribute-initialization) for more info.

#### Example - customize the popup editor

      <div id="treelist"></div>
      <script id="popup-editor" type="text/x-kendo-template">
  			<h3>Edit Person</h3>
  			<p>
  			  <label>First Name:<input name="FirstName" /></label>
  			</p>
  			<p>
  			  <label>Last Name:<input name="LastName" /></label>
  			</p>
  			<p>
  			  <label>Position:
              <select name="Position">
          	    <option>Software Developer</option>
                <option>Team Lead</option>
                <option>Technical Lead</option>
        	  </select>
        	</label>
        </p>
      </script>
      <script>
        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            template: kendo.template($("#popup-editor").html()),
            mode: "popup"
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" },
            { command: ["edit"] }
          ]
        });
      </script>

#### Example - using MVVM in the popup editor template

      <div id="treelist"></div>
      <script id="popup-editor" type="text/x-kendo-template">
  			<h3>Edit Person</h3>
  			<p>
  			  <label>First Name:<input data-bind="value: FirstName" /></label>
  			</p>
  			<p>
  			  <label>Last Name:<input data-bind="value: LastName" /></label>
  			</p>
  			<p>
  			  <label>Position:
          <select data-bind="value: Position">
          	<option>CEO</option>
            <option>Team Lead</option>
            <option>Technical Lead</option>
        	</select>
        	</label>
        </p>
      </script>
      <script>
        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            template: kendo.template($("#popup-editor").html()),
            mode: "popup"
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" },
            { command: ["edit"] }
          ]
        });
      </script>

### editable.window `Object`

Configures the Kendo UI Window instance, which is used when the TreeList edit mode is "popup".

For more information, please refer to the [Window configuration API](/api/javascript/ui/window).

#### Example - TreeList popup Window configuration

      <div id="treelist"></div>
      <script>
        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            mode: "popup",
            window: {
              title: "My Custom Title",
              animation: false,
              open: myOpenEventHandler
            }
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" },
            { command: ["edit"] }
          ]
        });

        function myOpenEventHandler(e) {
          // ...
        }
      </script>

### excel `Object`

Configures the Kendo UI TreeList Excel export settings.

### excel.fileName `String` *(default: "Export.xslx")*

Specifies the file name of the exported Excel file.

#### Example - set the default Excel file name

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        excel: {
          fileName: "Employees.xlsx"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              }
            }
          }
        }
      });
    </script>

### excel.filterable `Boolean` *(default: false)*

Enables or disables column filtering in the Excel file. Not to be mistaken with the treelist filtering feature.

#### Example - enable filtering in the output Excel file

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        excel: {
          filterable: true
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              }
            }
          }
        }
      });
    </script>

### excel.forceProxy `Boolean` *(default: false)*

If set to true, the content will be forwarded to [proxyURL](/api/javascript/ui/treelist#configuration-excel.proxyURL) even if the browser supports saving files locally.

### excel.proxyURL `String` *(default: null)*

The URL of the server-side proxy which will stream the file to the end user.

A proxy will be used when the browser isn't capable of saving files locally.
Such browsers are IE version 9 and lower and Safari.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with the "Content-Disposition" header set to
`attachment; filename="<fileName.xslx>"`.

#### Example - set the server proxy URL

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        excel: {
          proxyURL: "/save"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              }
            }
          }
        }
      });
    </script>

### filterable `Boolean|Object` *(default: false)*

If set to `true` the user can filter the data source using the treelist filter menu. Filtering is disabled by default.

Can be set to a JavaScript object which represents the filter menu configuration.

#### Example - enable and configure filtering

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          height: "100em",
          columns: [
            { field: "lastName" },
            { field: "position" },
            { field: "extension" }
          ],
          dataSource: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
          ],
          filterable: {
            extra: false,
            messages: {
              and: "and",
              or: "or",
              filter: "Apply filter",
              clear: "Clear filter",
              info: "Filter by: ",
              isFalse: "False",
              isTrue: "True",
              selectValue: "Select category",
              cancel: "Reject",
              operator: "Choose operator",
              value: "Choose value"
            },
            operators: {
              string: {
                eq: "Equal to",
                neq: "Not equal to",
                startswith: "Starts",
                endswith: "Ends",
                contains: "Contains",
                doesnotcontain: "Doesn't contain"
              },
              number: {
                eq: "Equal to",
                neq: "Not equal to",
                gt: "Greater than",
                gte: "Greater than or equal to",
                lt: "Less than",
                lte: "Less than or equal to"
              },
              date: {
                gt: "After",
                gte: "On or after",
                lt: "Before",
                lte: "On or before",
                eq: "On",
                neq: "Not equal"
              },
              enums: {
                eq: "Equal to",
                neq: "Not equal to"
              }
            }
          }
        });
    </script>

### filterable.extra `Boolean` *(default: true)*

If set to `true` the filter menu allows the user to input a second criteria.

#### Example - disable the extra filtering criteria

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          extra: false
        }
      });
    </script>

### filterable.messages `Object`

The text messages displayed in the filter menu. Use it to customize or localize the filter menu messages.

#### Example - customize filter menu messages

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            and: "and",
            or: "or",
            filter: "Apply filter",
            clear: "Clear filter"
          }
        }
      });
    </script>

### filterable.messages.and `String` *(default: "And")*

The text of the option which represents the "and" logical operation.

#### Example - set the "and" message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            and: "and"
          }
        }
      });
    </script>

### filterable.messages.clear `String` *(default: "Clear")*

The text of the button which clears the filter.

#### Example - set the "clear" message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            clear: "Clear filter"
          }
        }
      });
    </script>

### filterable.messages.filter `String` *(default: "Filter")*

The text of the button which applies the filter.

#### Example - set the "filter" message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            filter: "Apply filter"
          }
        }
      });
    </script>

### filterable.messages.info `String` *(default: "Show items with value that: ")*

The text of the information message on the top of the filter menu.

#### Example - set the "info" message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            info: "Filter by: "
          }
        }
      });
    </script>

### filterable.messages.title `String` *(default: "Show items with value that: ")*

The text rendered for the title attribute of the filter menu form.

### filterable.messages.isFalse `String` *(default: "is false")*

The text of the radio button for `false` values. Displayed when filtering `Boolean` fields.

#### Example - set the "isFalse" message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "available" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", available: true },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", available: false }
          ],
          schema: {
            model: {
              fields: {
                available: {type: "boolean"}
              }
            }
          }
        },
        filterable: {
          messages: {
            isFalse: "False"
          }
        }
      });
    </script>

### filterable.messages.isTrue `String` *(default: "is true")*

The text of the radio button for `true` values. Displayed when filtering `Boolean` fields.

#### Example - set the "isTrue" message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "available" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", available: true },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", available: false }
          ],
          schema: {
            model: {
              fields: {
                available: {type: "boolean"}
              }
            }
          }
        },
        filterable: {
          messages: {
            isTrue: "True"
          }
        }
      });
    </script>

### filterable.messages.or `String` *(default: "Or")*

The text of the option which represents the "or" logical operation.

#### Example - set the "or" message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: true,
        filterable: {
          messages: {
            or: "or"
          }
        }
      });
    </script>

### filterable.operators `Object`

The text of the filter operators displayed in the filter menu.

> In multiple TreeLists, it is possible to override the filterable options of the Kendo UI FilterMenu before the TreeLists are initialized. Then the new filter options will be available for all TreeLists without further configuration.

#### Example - override the filterable options in multiple TreeLists

    <h4>TreeList One</h4>
    <div id="treeList1"></div>
    <h4>TreeList Two</h4>
    <div id="treeList2"></div>

    <script>
      kendo.ui.FilterMenu.fn.options.operators.string = {
        eq: "Equal to...",
        neq: "Not equal to..."
      };

      $("#treeList1").kendoTreeList({
        columns: [
          "lastName",
          "position"
        ],
        filterable: {
          extra: false
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
          ]
        }
      });

      $("#treeList2").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" }
        ],
        filterable: {
          extra: false
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
          ]
        }
      });
    </script>

### filterable.operators.string `Object`

The texts of the filter operators displayed for columns bound to string fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

#### Example - set string operators

    <div id="treeList"></div>

    <script>
      $("#treeList").kendoTreeList({
        columns: [
          "lastName",
          "position"
        ],
        filterable: {
          extra: false,
          operators: {
          	string: {
            	contains: "Contains...",
              startswith: "Starts with..."
            }
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
          ]
        }
      });
    </script>

In this example only two operators will be displayed in the DropDownList - "Contains..." and "Starts with...".

### filterable.operators.string.eq `String` *(default: "Is equal to")*

The text of the `eq` (equal to) filter operator.

### filterable.operators.string.neq `String` *(default: "Is not equal to")*

The text of the `ne` (not equal to) filter operator.

### filterable.operators.string.isnull `String` *(default: "Is null")*

The text of the `isnull` filter operator.

### filterable.operators.string.isnotnull `String` *(default: "Is not null")*

The text of the `isnotnull` filter operator.

### filterable.operators.string.isempty `String` *(default: "Is empty")*

The text of the `isempty` filter operator.

### filterable.operators.string.isnotempty `String` *(default: "Is not empty")*

The text of the `isnotempty` filter operator.

### filterable.operators.string.startswith `String` *(default: "Starts with")*

The text of the `startswith` filter operator.

### filterable.operators.string.contains `String` *(default: "Contains")*

The text of the `contains` filter operator.

### filterable.operators.string.doesnotcontain `String` *(default: "Does not contain")*

The text of the `doesnotcontain` filter operator.

### filterable.operators.string.endswith `String` *(default: "Ends with")*

The text of the `endswith` filter operator.

### filterable.operators.number `Object`

The texts of the filter operators displayed for columns bound to number fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

#### Example - set number operators

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
          ],
          schema: {
            model: {
              fields: {
                extension: { type: "number" }
              }
            }
          }
        },
        filterable: {
          extra: false,
          operators: {
            number: {
              eq: "Equal to...",
              neq: "Not equal to..."
            }
          }
        }
      });
    </script>

In this example only two operators will be displayed in the operators DropDownList - "Equal to..." and "Not equal to...".

### filterable.operators.number.eq `String` *(default: "Is equal to")*

The text of the `eq` (equal to) filter operator.

### filterable.operators.number.neq `String` *(default: "Is not equal to")*

The text of the `ne` (not equal to) filter operator.

### filterable.operators.number.isnull `String` *(default: "Is null")*

The text of the `isnull` filter operator.

### filterable.operators.number.isnotnull `String` *(default: "Is not null")*

The text of the `isnotnull` filter operator.

### filterable.operators.number.gte `String` *(default: "Is greater than or equal to")*

The text of the `gte` (greater than or equal to) filter operator.

### filterable.operators.number.gt `String` *(default: "Is greater than")*

The text of the `gt` (greater than) filter operator.

### filterable.operators.number.lte `String` *(default: "Is less than or equal to")*

The text of the `lte` (less than or equal to) filter operator.

### filterable.operators.number.lt `String` *(default: "Is less than")*

The text of the `lt` (less than) filter operator.

### filterable.operators.date `Object`

The texts of the filter operators displayed for columns bound to date fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

#### Example - set date operators

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "hireDate", format: "{0:MM/dd/yyyy}" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", hireDate: new Date() },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", hireDate: new Date() }
          ],
          schema: {
            model: {
              fields: {
                hireDate: { type: "date" }
              }
            }
          }
        },
        filterable: {
          extra: false,
          operators: {
            date: {
              lt: "Is before...",
              gt: "Is after..."
            }
          }
        }
      });
    </script>

In this example only two operators will be displayed in the operators DropDownList - "Is before..." and "Is after...".

### filterable.operators.date.eq `String` *(default: "Is equal to")*

The text of the `eq` (equal to) filter operator.

### filterable.operators.date.neq `String` *(default: "Is not equal to")*

The text of the `ne` (not equal to) filter operator.

### filterable.operators.date.isnull `String` *(default: "Is null")*

The text of the `isnull` filter operator.

### filterable.operators.date.isnotnull `String` *(default: "Is not null")*

The text of the `isnotnull` filter operator.

### filterable.operators.date.gte `String` *(default: "Is after or equal to")*

The text of the `gte` (greater than or equal to) filter operator.

### filterable.operators.date.gt `String` *(default: "Is after")*

The text of the `gt` (greater than) filter operator.

### filterable.operators.date.lte `String` *(default: "Is before or equal to")*

The text of the "lte" (less than or equal to) filter operator.

### filterable.operators.date.lt `String` *(default: "Is before")*

The text of the `lt` (less than) filter operator.

### height `Number|String`

The height of the treelist. Numeric values are treated as pixels.

#### Example - set the height as a number

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          height: 100,
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

#### Example - set the height as a string

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          height: "100em",
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

### messages `Object`

Defines the text of the command buttons that are shown within the TreeList. Used primarily for localization.

#### Example - change the messages

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 }
        ],
        toolbar: [ "create", "pdf", "excel" ],
        columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
        editable: true,
        messages: {
          noRows: "No records",
          loading: "Fetching records...",
          requestFailed: "Fetching failed.",
          retry: "Reload",
          commands: {
            edit: "Modify",
            update: "Save",
            canceledit: "Discard",
            create: "Add New",
            createchild: "Add Child",
            destroy: "Remove",
            excel: "Export XSLX",
            pdf: "Export to PDF"
          }
        }
      });
    </script>

### messages.commands `Object`

Defines the text for the command buttons used across the widget.

#### Example

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 }
        ],
        toolbar: [ "create", "pdf", "excel" ],
        columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
        editable: true,
        messages: {
          commands: {
            edit: "Modify",
            update: "Save",
            canceledit: "Discard",
            create: "Add New",
            createchild: "Add Child",
            destroy: "Remove",
            excel: "Export XSLX",
            pdf: "Export to PDF"
          }
        }
      });
    </script>

### messages.commands.canceledit `String` *(default: "Cancel")*

Defines the text of the "Cancel" button that discards the changes during editing.

#### Example

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      columns: [ "name", "age", { command: [ "edit" ] } ],
      editable: true,
      messages: {
        commands: {
          canceledit: "Discard"
        }
      }
    });
    </script>

### messages.commands.create `String` *(default: "Add new record")*

Defines the text of the "Add new record" button that adds new data rows.

#### Example

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age" ],
      editable: true,
      messages: {
        commands: {
          create: "Add new"
        }
      }
    });
    </script>

### messages.commands.createchild `String` *(default: "Add child record")*

Defines the text of the "Add child record" button that adds new child data rows.

#### Example

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age", { command: [ "createchild" ] } ],
      editable: true,
      messages: {
        commands: {
          createchild: "Add child item"
        }
      }
    });
    </script>

### messages.commands.destroy `String` *(default: "Delete")*

Defines the text of the "Delete" button that deletes a data row.

#### Example

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      columns: [ "name", "age", { command: [ "destroy" ] } ],
      editable: true,
      messages: {
        commands: {
          destroy: "Remove"
        }
      }
    });
    </script>

### messages.commands.edit `String` *(default: "Edit")*

Defines the text of the "Edit" button that shows the editable fields for the row.

#### Example

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      columns: [ "name", "age", { command: [ "edit" ] } ],
      editable: true,
      messages: {
        commands: {
          edit: "Modify"
        }
      }
    });
    </script>

### messages.commands.save `String` *(default: "Save Changes")*

Defines the text of the "Save Changes" button that saves modifed data rows.

#### Example

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age" ],
      editable: true,
      messages: {
        commands: {
          save: "Save data"
        }
      }
    });
    </script>

### messages.commands.cancel `String` *(default: "Cancel Changes")*

Defines the text of the "Cancel Changes" button that cancels all data modifications.

#### Example

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age" ],
      editable: true,
      messages: {
        commands: {
          save: "Reject changes"
        }
      }
    });
    </script>

### messages.commands.excel `String` *(default: "Export to Excel")*

Defines the text of the "Export to Excel" button that exports the widget data in spreadsheet format.

#### Example

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "excel" ],
      columns: [ "name", "age" ],
      messages: {
        commands: {
          excel: "Export to XLSX"
        }
      }
    });
    </script>

### messages.commands.pdf `String` *(default: "Export to PDF")*

Defines the text of the "Export to PDF" button that exports the widget data in PDF format.

#### Example

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "pdf" ],
      columns: [ "name", "age" ],
      messages: {
        commands: {
          pdf: "Export data to PDF"
        }
      }
    });
    </script>

### messages.commands.update `String` *(default: "Update")*

Defines the text of the "Update" button that applies the changes during editing.

#### Example

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age", { command: [ "edit" ] } ],
      editable: true,
      messages: {
        commands: {
          update: "Save"
        }
      }
    });
    </script>

### messages.loading `String` *(default: "Loading...")*

Defines the text of the "Loading..." message when the widget loads its root-level items.

#### Example

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", nullable: false },
                ReportsTo: { field: "ReportsTo", nullable: true }
              }
            }
          }
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" }],
        editable: true,
        messages: {
          loading: "Fetching records..."
        }
      });
    </script>

### messages.noRows `String` *(default: "No records to display")*

Defines the text of "No records to display" message when the widget does not show any items.

#### Example

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: [],
        columns: [ "name", "age" ],
        messages: {
          noRows: "No data"
        }
      });
    </script>

### messages.requestFailed `String` *(default: "Request failed.")*

Defines the text of "Request failed." message when the widget fails to load its root-level items.

#### Example

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://example.com"
            }
          }
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" }],
        editable: true,
        messages: {
          requestFailed: "Fetching failed."
        }
      });
    </script>

### messages.retry `String` *(default: "Retry")*

Defines the text of "Retry" message assigned to the button that tries to load root-level items again.

#### Example

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://example.com"
            }
          }
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" }],
        editable: true,
        messages: {
          retry: "Try again"
        }
      });
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true` the user can navigate the widget using the keyboard. By default, keyboard navigation is disabled.

#### Example - enable keyboard navigation

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 2, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        navigatable: true
      });
    </script>

> Check [Keyboard navigation](http://demos.telerik.com/kendo-ui/treelist/keyboard-navigation) for a live demo.

### pageable `Boolean|Object` *(default: false)*

If set to `true` the treelist will display a pager. By default paging is disabled.

Only client-side paging is supported, which means that all data items are expected to be available when the treelist is initialized.

Can be set to a JavaScript object which represents the pager configuration.

> Don't forget to set a [`pageSize`](/api/javascript/data/datasource/configuration/pagesize), no matter if paging is performed client-side or server-side. A `pageSize` can be defined in the `pageable` settings, or in the [`dataSource`](/api/javascript/ui/treelist/configuration/datasource) settings.

#### Example - enable paging

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2
            }
        });
    </script>

### pageable.alwaysVisible `Boolean` *(default: true)*

By default the treelist will show the pager even when total amount of items in the DataSource is less than the pageSize.

If set to `false` the treelist will toggle the pager visibility as follows:

* when the total amount of items initially set in the DataSource is less than the pageSize number the pager will be hidden.
* when the total amount of items initially set in the DataSource is greater than or equal to the pageSize number the pager will be shown.
* when the total amount of items in the DataSource becomes less than the pageSize number (after delete, filter operation or pageSize change) the pager will be hidden.
* when the total amount of items in the DataSource becomes greater than or equal to the pageSize number (after an insert, filter operation or pageSize change) the pager will be shown.

Introduced in the Kendo UI 2017 R3 release.

#### Example - hide the pager if total items are less than pageSize

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 10,
                alwaysVisible: false
            }
        });
    </script>

### pageable.pageSize `Number`

The number of data items which will be displayed in the treelist. **This setting will not work if the TreeList is assigned an already existing Kendo UI DataSource instance.**

#### Example - set page size

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2
            }
        });
    </script>

### pageable.previousNext `Boolean` *(default: true)*

If set to `true` the pager will display buttons for going to the first, previous, next and last pages. By default those buttons are displayed.

#### Example - hide the first, previous, next, and last buttons

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                previousNext: false
            }
        });
    </script>

### pageable.numeric `Boolean` *(default: true)*

If set to `true` the pager will display buttons for navigating to specific pages. By default those buttons are displayed.

Using `pageable.numeric` and [`pageable.input`](pageable.input) at the same time is not recommended.

#### Example - hide the numeric pager buttons

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                numeric: false
            }
        });
    </script>

### pageable.buttonCount `Number` *(default: 10)*

The maximum number of buttons displayed in the numeric pager. The pager will display ellipsis (...) if there are more pages than the specified number.

#### Example - set pager button count

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                buttonCount: 1
            }
        });
    </script>

### pageable.input `Boolean` *(default: false)*

If set to `true` the pager will display an input element which allows the user to type a specific page number. By default the page input is not displayed.

Using `pageable.input` and [`pageable.numeric`](pageable.numeric) at the same time is not recommended.

#### Example - show the pager input

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                input: true
            }
        });
    </script>

### pageable.pageSizes `Boolean|Array` *(default: false)*

If set to `true` the pager will display a drop-down which allows the user to pick a page size.
By default the page size drop-down is not displayed.

Can be set to an array of predefined page sizes to override the default list.
A special `all` value is supported. It sets the page size to the total number of records.

If a `pageSize` setting is provided for the data source then this value will be selected initially.

#### Example - show the page size DropDownList

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                pageSizes: true
            }
        });
    </script>

#### Example - specify the page sizes as array

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                pageSizes: [2, 3, 4, "all"],
                numeric: false
            }
        });
    </script>

### pageable.refresh `Boolean` *(default: false)*

If set to `true` the pager will display the refresh button. Clicking the refresh button will refresh the treelist. By default the refresh button is not displayed.

#### Example - show the refresh button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                refresh: true
            }
        });
    </script>

### pageable.info `Boolean` *(default: true)*

If set to `true` the pager will display information about the current page and total number of data items. By default the paging information is displayed.

##### Example - hide the paging information

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                info: false
            }
        });
    </script>

### pageable.messages `Object`

The text messages displayed in pager. Use this option to customize or localize the pager messages.

### pageable.messages.display `String` *(default: "{0} - {1} of {2} items")*,

The pager info text. Uses [kendo.format](/api/javascript/kendo/methods/format).

Contains three placeholders:
- {0} - the first data item index
- {1} - the last data item index
- {2} - the total number of data items

#### Example - set the "display" pager message

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    display: "Showing {0}-{1} from {2} data items"
                }
            }
        });
    </script>

### pageable.messages.empty `String` *(default: "No items to display")*,

The text displayed when the treelist is empty.

#### Example - set the "empty" pager message

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    empty: "No data"
                }
            }
        });
    </script>

### pageable.messages.page `String` *(default: "Page")*,

The label displayed before the pager input.

#### Example - set the label before the pager input

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                input: true,
                messages: {
                    page: "Enter page"
                }
            }
        });
    </script>

### pageable.messages.of `String` *(default: "of {0}")*,

The label displayed before the pager input. Uses [kendo.format](/api/javascript/kendo/methods/format). Contains one optional placeholder {0} which represents the total number of pages.

#### Example - set the label after the pager input

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                input: true,
                messages: {
                    of: "from {0}"
                }
            }
        });
    </script>

### pageable.messages.itemsPerPage `String` *(default: "items per page")*,

The label displayed after the page size DropDownList.

#### Example - set the label after the page size DropDownList

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                input: true,
                messages: {
                    itemsPerPage: "data items per page"
                }
            }
        });
    </script>

### pageable.messages.first `String` *(default: "Go to the first page")*,

The tooltip of the button which goes to the first page.

#### Example - set the Tooltip of the first page button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    first: "First page"
                }
            }
        });
    </script>

### pageable.messages.last `String` *(default: "Go to the last page")*,

The tooltip of the button which goes to the last page.

#### Example - set the Tooltip of the last page button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    last: "Last page"
                }
            }
        });
    </script>

### pageable.messages.next `String` *(default: "Go to the next page")*,

The Tooltip of the button which goes to the next page.

#### Example - set the Tooltip of the next page button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    next: "Next page"
                }
            }
        });
    </script>

### pageable.messages.previous `String` *(default: "Go to the previous page")*,

The Tooltip of the button which goes to the previous page.

#### Example - set the Tooltip of the previous page button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    previous: "Previous page"
                }
            }
        });
    </script>

### pageable.messages.refresh `String` *(default: "Refresh")*,

The Tooltip of the refresh button.

#### Example - set the Tooltip of the refresh button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                refresh: true,
                messages: {
                    refresh: "Refresh the treelist"
                }
            }
        });
    </script>

### pageable.messages.morePages `String` *(default: "More pages")*,

The Tooltip of the ellipsis ("...") button, which appears when the number of pages is greater than the `buttonCount`.

#### Example - set the Tooltip of the ellipsis button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
              pageSize: 1,
              buttonCount: 2,
              refresh: true,
              messages: {
                  morePages: "More pages"
              }
            }
        });
    </script>

### pdf `Object`

Configures the Kendo UI TreeList PDF export settings.

### pdf.author `String` *(default: null)*

The author of the PDF document.

#### Example - set the author

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
            author: "John Doe"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.avoidLinks `Boolean|String` *(default: false)*
A flag indicating whether to produce actual hyperlinks in the exported PDF file.

It's also possible to pass a CSS selector as argument. All matching links will be ignored.

> Available in versions 2015.3.1020 and later

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.

#### Example - set the creator

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          creator: "John Doe"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.

#### Example - set the date

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          date: new Date("2014/10/10")
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.

#### Example - set the default PDF file name

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          fileName: "Employees.pdf"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*

If set to true, the content will be forwarded to [proxyURL](/api/javascript/ui/treelist#configuration-pdf.proxyURL) even if the browser supports saving files locally.

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.

#### Example - set the keywords

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          keywords: "northwind products"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.landscape `Boolean` *(default: false)*

Set to `true` to reverse the paper dimensions such that width is the larger edge.

#### Example - enable landscape mode

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          landscape: true
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.margin `Object`

Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).

#### Example - set the margins

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          margin: {
            left: 10,
            right: "10pt",
            top: "10mm",
            bottom: "1in"
          }
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
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
The default "auto" means the paper size is determined by the content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size: "A4", "A3" etc.
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".

#### Example - set custom paper size

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          paperSize: ["20mm", "20mm"]
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser isn't capable of saving files locally.
Such browsers are IE version 9 and lower, and Safari.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with the "Content-Disposition" header set to
`attachment; filename="<fileName.pdf>"`.

#### Example - set the server proxy URL

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          proxyURL: "/save"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.

#### Example - open the generated document in a new window

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
            forceProxy: true,
            proxyURL: "/save",
            proxyTarget: "_blank"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.

#### Example - set the subject

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          subject: "Employees"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.

#### Example - set the title

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          title: "Employees"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### scrollable `Boolean|Object` *(default: true)*

If set to `true` the TreeList will display a scrollbar when the total row height (or width) exceeds the TreeList height (or width). By default scrolling is enabled.

Scrolling renders separate tables for the header and data area. For accessibility-conscious applications, disable scrolling.

#### Example - disable scrolling

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        scrollable: false,
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### selectable `Boolean|String` *(default: false)*

If set to `true` the user would be able to select treelist rows. By default selection is disabled.

Can also be set to the following string values:

- "row" - the user can select a single row.
- "cell" - the user can select a single cell.
- "multiple, row" - the user can select multiple rows.
- "multiple, cell" - the user can select multiple cells.

#### Example - set selectable as a boolean

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        selectable: true,
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
    </script>

#### Example - set selectable as a string

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        selectable: "multiple, row",
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
    </script>

### sortable `Boolean|Object` *(default: false)*

If set to `true` the user could sort the treelist by clicking the column header cells. By default sorting is disabled.

Can be set to a JavaScript object which represents the sorting configuration.

#### Example - enable sorting

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
    </script>

### sortable.allowUnsort `Boolean` *(default: true)*

If set to `true` the user can get the TreeList in its unsorted state by clicking the sorted column header.

#### Example - do not allow unsorting

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          allowUnsort: false
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ],
          sort: { field: "name", dir: "asc" }
        }
      });
    </script>

### sortable.mode `String` *(default: "single")*

The sorting mode. If set to "single" the user can sort by one column at a time. If set to "multiple" the user can sort by multiple columns.

#### Example - allow multiple column sorting

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 },
            { id: 4, parentId: 1, name: "John Doe", age: 22 }
          ],
          sort: { field: "name", dir: "asc" }
        }
      });
    </script>

### toolbar `String|Function|Array`

If a `String` value is assigned to the `toolbar` configuration option, it will be treated as a single string template for the whole treelist Toolbar,
and the string value will be passed as an argument to a [`kendo.template()`](/api/javascript/kendo/methods/template) function.

If a `Function` value is assigned (it may be a `kendo.template()` function call or a generic function reference), then the return value of the function will be used to render the treelist Toolbar contents.

If an `Array` value is assigned, it will be treated as the list of commands displayed in the treelist Toolbar. Commands can be custom or built-in ("create", "excel", "pdf").

* The "create" command adds an empty data item to the treelist.

* The "excel" command exports the treelist data in MS Excel format.

* The "pdf" command exports the treelist data in PDF format.

#### Example - configure the TreeList Toolbar as a string template

      <div id="treeList"></div>
      <script>
        $("#treeList").kendoTreeList({
            toolbar: "<p>My string template in a paragraph.</p>",
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          sortable: {
            mode: "multiple"
          },
          dataSource: {
            data: [
              { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
              { id: 2, parentId: 1, name: "John Doe", age: 24 },
              { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
            ]
          }
        });
      </script>

#### Example - configure the TreeList Toolbar template with a function

    <div id="treeList"></div>
    <script type="text/x-kendo-template" id="template">
			<label for="enableChk"><input type="checkbox" id="enableChk"/>Enable</label>
    </script>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: kendo.template($("#template").html()),
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

#### Example - configure the TreeList Toolbar as an array of commands

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["excel", "pdf"],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

### toolbar.click `Function`

The click handler of the toolbar command. Used for custom toolbar commands.

#### Example - specify the name of the command

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [
          { name: "custom", click: function() { alert("custom"); } }
        ],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

### toolbar.imageClass `String`

A class name to render inside the toolbar button. When you set this option, the TreeList renders an additional `span` element inside the toolbar button, with a class name set to the option value. This allows you to display an icon inside your custom toolbar commands.

#### Example - specify the name of the command

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [{name: "custom", text: "About", imageClass: "k-i-info" }],
        columns: [
          "lastName",
          "position"
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
        ]
      });
    </script>

### toolbar.name `String`

The name of the toolbar command. Either a built-in ("create", "excel", "pdf") or a custom string. The `name` is output in the HTML as a value of the `data-command` attribute of the button.

#### Example - specify the name of the command

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [
          { name: "custom", click: function() { alert("custom"); } }
        ],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

### toolbar.text `String`

The text displayed by the command button. If not set the [name](/api/javascript/ui/treelist#configuration-toolbar.name)` option would be used as the button text instead.

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [
          { name: "custom", text: "My Command" }
        ],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

## Fields

### columns `Array`

The columns of the TreeList initialized from the [columns](/api/javascript/ui/treelist#configuration-columns) option. Every item from the `columns` array has the same fields as the corresponding [columns](/api/javascript/ui/treelist#configuration-columns) option.

#### Example - iterate the TreeList columns

    <button id="countBtn">Log Column Names</button>
    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
      $("#countBtn").click(function(e){
        var treelist = $("#treelist").data("kendoTreeList");
        for (var i = 0; i < treelist.columns.length; i++) {
          console.log(treelist.columns[i].field); // displays "lastName" and then "position"
        }
      });
    </script>

### table `jQuery`

The jQuery object which represents the treelist table element.

### tbody `jQuery`

The jQuery object which represents the table body. Contains all treelist table rows.

### thead `jQuery`

The jQuery object which represents the treelist table header element.

### content `jQuery`

The jQuery object which represents the treelist content element, which holds the scrollable content. Available only in a treelist with locked columns.

### lockedHeader `jQuery`

The jQuery object which represents the treelist locked header element. Available only in a treelist with locked columns.

### lockedTable `jQuery`

The jQuery object which represents the treelist locked table element. Available only in a treelist with locked columns.

### lockedContent `jQuery`

The jQuery object which represents the treelist locked content element. Available only in a treelist with locked columns.

## Methods

### addRow

Adds an empty data item to the TreeList. In "inline" editing mode a table row will be appended. A popup window will be displayed in "popup" editing mode.

Fires the [edit](/api/javascript/ui/treelist/events/edit) event.

#### Parameters

##### parentRow `String|Element|jQuery`

A string, DOM element or jQuery object which represents the parent table row. A string is treated as a jQuery selector.

#### Example - add a new root data item

      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          $("#treelist").kendoTreeList({
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  dataType: "jsonp"
                },
                create: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                  dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                  }
                }
              },
              batch: true,
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            },
            height: 300,
            editable: true,
            columns: [
              { field: "FirstName", expandable: true, title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { command: ["edit"]}
            ]
          });
        $("#add").click(function(){
        	$("#treelist").data("kendoTreeList").addRow();
        });
      </script>

#### Example - add a new child data item

      <button id="add">Add New Row</button>
      <div id="treelist"></div>

      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          $("#treelist").kendoTreeList({
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  dataType: "jsonp"
                },
                create: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                  dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                  }
                }
              },
              batch: true,
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            },
            height: 300,
            editable: true,
            columns: [
              { field: "FirstName", expandable: true, title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { command: ["edit"]}
            ]
          });
        $("#add").click(function(){
        	$("#treelist").data("kendoTreeList").addRow("#treelist tbody>tr:first");
        });
      </script>

### autoFitColumn

Applies the minimum possible width for the specified column, so that all text fits without wrapping.

#### Parameters

##### column `Number|String|Object`

The index of the column, or the [field](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound, or the column object obtained from the [columns](/api/javascript/ui/treelist#fields-columns) collection.

#### Example - autofit a column by index

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        resizable: true,
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.autoFitColumn(1);
    </script>

#### Example - autofit a column by field

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        resizable: true,
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.autoFitColumn("Position");
    </script>

#### Example - autofit a column by column object reference

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        resizable: true,
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.autoFitColumn(treeList.columns[1]);
    </script>

### cancelChanges

Cancels any pending changes in the data source. Deleted data items are restored, new data items are removed and updated data items are restored to their initial state.

#### Example - cancel any changes

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell"
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.addRow();
      treeList.cancelChanges();
    </script>

### cancelRow

Cancels editing for the table row which is in edit mode. Reverts any changes made.

#### Example - cancel editing

      <button id="cancel">Cancel Editing</button>
      <div id="treelist"></div>

      <script>
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                dataType: "jsonp"
              },
              update: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                dataType: "jsonp"
              },
              create: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                dataType: "jsonp"
              },
              parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                  return {models: kendo.stringify(options.models)};
                }
              }
            },
            batch: true,
            schema: {
              model: {
                id: "EmployeeId",
                parentId: "ReportsTo",
                fields: {
                  EmployeeId: { type: "number", editable: false, nullable: false },
                  ReportsTo: { nullable: true, type: "number" },
                  FirstName: { validation: { required: true } },
                  LastName: { validation: { required: true } },
                  Position: { type: "string" }
                },
                expanded: true
              }
            }
          },
          height: 300,
          editable: true,
          columns: [
            { field: "FirstName", expandable: true, title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 100 },
            { field: "Position" },
            { command: ["edit"]}
          ]
        });
        $("#cancel").click(function(){
          $("#treelist").data("kendoTreeList").cancelRow();
        });
      </script>

### clearSelection

Clears the currently selected table rows or cells (depending on the current selection [mode](/api/javascript/ui/treelist#configuration-selectable)).

#### Example - clear selection

    <button id="clear">Clear Selection</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#clear").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.clearSelection();
      });
    </script>

### closeCell

Stops editing the table cell which is in edit mode. Requires "incell" [edit mode](/api/javascript/ui/treelist/configuration/editable.mode).

> When keyboard navigation is used, the TreeList [`table`](/api/javascript/ui/treelist/fields/table) must be focused programmatically after calling `closeCell`.

#### Parameters

##### isCancel `Boolean` *optional*

A flag specifying whether to fire the `cancel` event. By default the event is not fired.

#### Example - cancel cell editing

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        navigatable: true
    });

    var treeList = $("#treeList").data("kendoTreeList");

    treeList.editCell(treeList.tbody.find("td").first());

    setTimeout(function(){
        treeList.closeCell();
        treeList.table.focus();
    }, 1500);
    </script>

### collapse

This method collapses the row passed as a parameter.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`Promise`

#### Example

    <button id="collapse">Collapse TreeList</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#collapse").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.collapse($("#treeList tbody>tr:eq(0)"));
      });
    </script>

### dataItem

Returns the data item to which the specified table row is bound.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`kendo.data.TreeListModel` the data item to which the specified table row is bound.

#### Example - get the data item to which the first table row is bound

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        });
        var treeList = $("#treeList").data("kendoTreeList");
        var data = treeList.dataItem("tbody>tr:eq(1)");
        console.log(data.age); // displays "22"
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

#### Example

    <button id="destroy">Destroy and remove TreeList</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#destroy").click(function(){
        $("#treeList").data("kendoTreeList").destroy(); // destroy the TreeList

        $("#treeList").remove(); // remove all TreeList HTML
      });
    </script>

### editCell

Switches the specified table cell in edit mode. Requires "incell" [edit mode](/api/javascript/ui/treelist/configuration/editable.mode).

Fires the [edit](/api/javascript/ui/treelist/events/edit) event.

#### Parameters

##### cell `jQuery`

The jQuery object which represents the table cell.

#### Example - switch the first cell to edit mode

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell"
    });
    var treeList = $("#treeList").data("kendoTreeList");
    treeList.editCell($("#treeList td:eq(0)"));
    </script>

### editRow

Switches the specified table row to edit mode.

Fires the [edit](/api/javascript/ui/treelist/events/edit) event.

#### Parameters

##### row `jQuery`

The jQuery object which represents the table row.

#### Example - switch the first row to edit mode

      <button id="edit">Edit First Row</button>
      <div id="treelist"></div>

      <script>
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                dataType: "jsonp"
              },
              update: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                dataType: "jsonp"
              },
              create: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                dataType: "jsonp"
              },
              parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                  return {models: kendo.stringify(options.models)};
                }
              }
            },
            batch: true,
            schema: {
              model: {
                id: "EmployeeId",
                parentId: "ReportsTo",
                fields: {
                  EmployeeId: { type: "number", editable: false, nullable: false },
                  ReportsTo: { nullable: true, type: "number" },
                  FirstName: { validation: { required: true } },
                  LastName: { validation: { required: true } },
                  Position: { type: "string" }
                },
                expanded: true
              }
            }
          },
          height: 300,
          editable: true,
          columns: [
            { field: "FirstName", expandable: true, title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 100 },
            { field: "Position" },
            { command: ["edit"]}
          ]
        });
        $("#edit").click(function(){
          $("#treelist").data("kendoTreeList").editRow($("#treelist tbody>tr:eq(0)"));
        });
      </script>

### expand

This method expands the row.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`Promise`

#### Example

    <button id="expand">Expand TreeList</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#expand").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.expand($("#treeList tbody>tr:eq(0)"));
      });
    </script>

#### Example - expand row of a data item with a given id

    <button id="expand">Expand item with ID = 1</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#expand").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");

        // find item with id = 1 in datasource
        var dataItem = treeList.dataSource.get(1);

        // find row for data item
        var row = treeList.content.find("tr[data-uid=" + dataItem.uid + "]")

        treeList.expand(row);
      });
    </script>

### itemFor

Returns the rendered HTML element for a given model.

> This method is available with versions released after the official Q3 release - 2015.3.930.

#### Parameters

##### model `kendo.data.TreeListModel|Object`

A model from the DataSource, or the id of a model in the DataSource.

#### Returns

`jQuery` the row that corresponds to the model

#### Example - get row from model

    <button id="itemFor">Highlight the row with Jane</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#itemFor").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        var jane = treeList.dataSource.get(1);
        var row = treeList.itemFor(jane);

        treeList.select(row);
      });
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource/methods/view).

#### Returns

`Array` The currently rendered data table rows (`<tr>` elements).

### refresh

Renders all table rows using the current data items.

#### Example - refresh the widget

    <button id="btn">Refresh</button>
    <div id="treelist"></div>
    <script>
      var treelist = $("#treelist").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      }).data("kendoTreeList");
      $("#btn").click(function(){
        var treelist = $("#treelist").data("kendoTreeList");
        treelist.dataSource.at(0).name="Marta Stewart";
        treelist.refresh();
      });
    </script>

### removeRow

Removes the specified table row from the treelist. Also removes the corresponding data item from the data source.

Fires the [remove](/api/javascript/ui/treelist/events/remove) event.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Example - remove the first table row

    <button id="btn">Remove second row</button>
    <div id="treelist"></div>
    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
            dataType: "jsonp"
          },
          destroy: {
            url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/Destroy",
            dataType: "jsonp"
          },
          parameterMap: function(options, operation) {
            if (operation !== "read" && options.models) {
              return {models: kendo.stringify(options.models)};
            }
          }
        },
        batch: true,
        schema: {
          model: {
            id: "EmployeeId",
            parentId: "ReportsTo",
            fields: {
              EmployeeId: { type: "number", editable: false, nullable: false },
              ReportsTo: { nullable: true, type: "number" },
              HireDate: {type: "date"},
              BirthDate: {type: "date"}
            },
            expanded: true
          }
        }
      });

      $("#treelist").kendoTreeList({
        dataSource: dataSource,
        toolbar: [ "create" ],
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" }
        ]
      });
      $("#btn").click(function(){
        var treelist = $("#treelist").data("kendoTreeList");
        treelist.removeRow($("#treelist tbody>tr:nth(1)"));
      });
    </script>

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](/api/javascript/ui/treelist/events/excelexport) event.

> Calling this method could trigger the browser built-in popup blocker in some cases. To avoid that, always call it as a response to an end-user action e.g. button click.

#### Example - manually initiate Excel export

    <button id="export">Export to Excel</button>
    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [ "id", "name" ],
            dataSource: [
                { id: 1, parentId: null, name: "Jane Doe", age: 30 },
                { id: 2, parentId: 1, name: "John Doe", age: 33 }
            ]
        });
        $("#export").click(function(e) {
            var treeList = $("#treeList").data("kendoTreeList");
            treeList.saveAsExcel();
        });
    </script>

### saveAsPDF

Initiates the PDF export and returns a promise. Also triggers the [pdfExport](/api/javascript/ui/treelist/events/pdfexport) event.

> Calling this method may trip the built-in browser pop-up blocker. To avoid that, call this method as a response to an end-user action, e.g. a button click.

#### Returns
`Promise` A promise that will be resolved when the export completes. The same promise is available in the [pdfExport](/api/javascript/ui/treelist/events/pdfexport) event arguments.

#### Example - manually initiate PDF export

    <button id="export">Export to PDF</button>
    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [ "id", "name" ],
            dataSource: [
                { id: 1, parentId: null, name: "Jane Doe", age: 30 },
                { id: 2, parentId: 1, name: "John Doe", age: 33 }
            ]
        });
        $("#export").click(function(e) {
            var treeList = $("#treeList").data("kendoTreeList");
            treeList.saveAsPDF();
        });
    </script>

### saveChanges

Saves any pending changes by calling the [sync](/api/javascript/data/datasource/methods/sync) method.

Fires the [saveChanges](/api/javascript/ui/treelist/events/savechanges) event.

#### Example - save changes

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell"
    });
    var treeList = $("#treeList").data("kendoTreeList");
    treeList.addRow();
    treeList.saveChanges();
    </script>

### saveRow

Switches the table row which is in edit mode and saves any changes made by the user.

Fires the [edit](/api/javascript/ui/treelist/events/save) event.

#### Example - save row

    <button id="save">Save Row</button>
    <div id="treelist"></div>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read:  {
              url: crudServiceBaseUrl + "/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            update: {
              url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
              dataType: "jsonp"
            },
            create: {
              url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                FirstName: { validation: { required: true } },
                LastName: { validation: { required: true } },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        height: 300,
        editable: true,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 100 },
          { field: "Position" },
          { command: ["edit"]}
        ]
      });
      $("#save").click(function(){
        $("#treelist").data("kendoTreeList").saveRow($("treelist .k-treelist-edit-row"));
      });
    </script>

### select

Gets or sets the table rows (or cells) which are selected.

#### Parameters

##### rows `Element|jQuery`

A DOM element or jQuery object which represents the table row(s) or cell(s).

#### Returns

`jQuery` the selected table rows or cells.

#### Example - select the first table cell

    <button id="btn">Highlight third row</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");

        treeList.select($("#treeList tbody>tr:nth(2)"));
      });
    </script>

#### Example - get the selected table row

    <button id="btn">Get selected row info</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        var row = treeList.select();
        if(row.length > 0){
          var data = treeList.dataItem(row);
          console.log(data.name);
        }
      });
    </script>

### setDataSource

Sets the data source of the widget.

#### Parameters

##### dataSource `kendo.data.TreeListDataSource`

The data source to which the widget should be bound.

#### Example - set the data source

    <button id="btn">Change DataSource</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        var dsNew = new kendo.data.TreeListDataSource({
          data: [
            { id: 1, parentId: null, name: "Mark Jameson", age: 26, expanded: true },
            { id: 2, parentId: 1, name: "Joe Reeves", age: 22 },
          ]
        });
        treeList.setDataSource(dsNew);
      });
    </script>

### showColumn

Shows the specified column.

#### Parameters

##### column `Number|String`

The index of the column, or the [field](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound.

#### Example - show a hidden column by index

    <button id="btn">Show Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age", hidden: true }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.showColumn(2);
      });
    </script>

#### Example - show a hidden column by field

    <button id="btn">Show Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age", hidden: true }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.showColumn("age");
      });
    </script>

### hideColumn

Hides the specified column.

#### Parameters

##### column `Number|String`

The index of the column, or the [field](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound.

#### Example - hide a column by index

    <button id="btn">Hide Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.hideColumn(2);
      });
    </script>

#### Example - hide a column by field

    <button id="btn">Hide Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.hideColumn("age");
      });
    </script>

### lockColumn

Locks (freezes) a column, allowing users to see it at all times when scrolling.

#### Parameters

##### column `Number|String`

The index of the column or the [field](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound.

> In order to use this method, the treelist must be initialized with at least one locked column, and should have unlocked columns left after the target column is locked.

#### Example - lock a column

    <button id="btn">Lock Age Column</button>
    <div id="treeList" style="width: 400px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.lockColumn("age");
      });
    </script>

### unlockColumn

Unlocks (unfreezes) a column.

#### Parameters

##### column `Number|String`

The index of the column or the [field](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound.

> In order to use this method, the treelist must be initialized with at least one locked column, and there should be locked columns left after the target column is unlocked.

#### Example - unlock a column

    <button id="btn">Unlock Name Column</button>
    <div id="treeList" style="width: 400px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", locked: true, width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.unlockColumn("name");
      });
    </script>

### reorderColumn

Changes the position of the specified column.

#### Parameters

##### destIndex `Number`

The new position of the column. The destination index should be calculated with regard to all columns, including the hidden ones.

##### column `Object`

The column whose position should be changed.

#### Example - move a column

    <button id="btn">Switch Name and Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.reorderColumn(2, treeList.columns[1]);
      });
    </script>

## Events

### beforeEdit

Fired when the user try to edit or create a data item, before the editor is created. Can be used for preventing the editing depending on custom logic.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

The event will be fired only when the TreeList is `editable`.

#### Event Data

##### e.model `kendo.data.Model`

The data item which is going to be edited. Use its [isNew](/api/javascript/data/model/methods/isnew) method to check if the data item is new (created) or not (edited).

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "beforeEdit" event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        toolbar:["create"],
        beforeEdit: function(e) {
          console.log("beforeEdit");

          if (!e.model.isNew()) {
            e.preventDefault();
          }
        }
      });
    </script>

### cancel

Fired when the user clicks the "cancel" button (in inline or popup [editing mode](/api/javascript/ui/treelist#configuration-editable.mode)) or closes the popup window.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit form container element.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked prevents the cancel action. The table row remains in edit mode.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "cancel" event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" },
            { command: [ "edit" ] }
          ],
          editable: true,
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          cancel: function(e) {
            console.log("cancel");
          }
        });
    </script>

#### Example - subscribe to the "cancel" event after initialization

    <div id="treeList"></div>
     <script>
        function cancel(e) {
            console.log("cancel");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" },
            { command: [ "edit" ] }
          ],
          editable: true,
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ]
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("cancel", cancel);
        treeList.dataSource.fetch();
    </script>

### cellClose

Fired when "incell" edit mode is used and the cell is going to be closed. The event is triggerd after saving or canceling the changes, but before the cell is closed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit container element. More information is available in the [edit event arguments' description](edit).

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.type `String`

The type of the cell close action - can be either "save" or "cancel". The "cancel" type is triggered when the treelist keyboard navigation is enabled by "navigateble: true" and Esc key is used for cell close action.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "cancel" event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        toolbar:["create"],
        cellClose:  function(e) {
          console.log(e.type);
        }
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.editCell($("#treeList td:eq(1)"));
    </script>

### change

Fired when the user selects a table row or cell in the treelist.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - get the selected data item(s) when using row selection

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: "multiple, row",
        change: function(e) {
          var selectedRows = this.select();
          var selectedDataItems = [];
          for (var i = 0; i < selectedRows.length; i++) {
            var dataItem = this.dataItem(selectedRows[i]);
            selectedDataItems.push(dataItem);
          }
          // selectedDataItems contains all selected data items
          console.log(selectedDataItems.length);
        }
      });
    </script>

#### Example - get the selected data item(s) when using cell selection

    <div id="treeList"></div>
    <script>
      function change(e) {
        var selectedCells = this.select();
        var selectedDataItems = [];
        for (var i = 0; i < selectedCells.length; i++) {
          var dataItem = this.dataItem(selectedCells[i].parentNode);
          if ($.inArray(dataItem, selectedDataItems) < 0) {
            selectedDataItems.push(dataItem);
          }
        }
        // selectedDataItems contains all selected data items
        console.log(selectedDataItems.length + " data items selected.");
      }
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: "multiple, cell"
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("change", change);
    </script>

### collapse

Fired when an item is about to be collapsed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked prevents the collapse action. The child table rows will not be hidden.

#### Example - subscribe to the "collapse" event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          collapse: function(e) {
            console.log("collapse");
          }
        });
    </script>

#### Example - subscribe to the "collapse" event after initialization

    <div id="treeList"></div>
     <script>
        function collapse(e) {
            console.log("collapse");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ]
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("collapse", collapse);
        treeList.dataSource.fetch();
    </script>

### dataBinding

Fired before the widget binds to its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the data bind action. The table rows will remain unchanged and `dataBound` event will not fire.

#### Example - subscribe to the "dataBinding" event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          dataBinding: function(e) {
            console.log("dataBinding");
          }
        });
    </script>

#### Example - subscribe to the "dataBinding" event after initialization

    <div id="treeList"></div>
     <script>
        function dataBinding(e) {
            console.log("dataBinding");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ]
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("dataBinding", dataBinding);
        treeList.dataSource.fetch();
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          dataBound: function(e) {
            console.log("dataBound");
          }
        });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <div id="treeList"></div>
     <script>
        function dataBound(e) {
            console.log("dataBound");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ]
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("dataBound", dataBound);
        treeList.dataSource.fetch();
    </script>

### dragstart

Fired when the user attempts to drag an item. If prevented, the item is not allowed to move.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Available in builds 2015.3.1014 and later.

##### e.source `kendo.data.TreeListModel`

The model of the source row.

#### Example - subscribe to the "dragstart" event before initialization

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        dragstart: function(e) {
          console.log("dragstart", e.source);
        }
      });
    </script>

#### Example - subscribe to the "dragstart" event after initialization

    <div id="treeList"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      function dragstart(e) {
        console.log("dragstart");
      }

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("dragstart", dragstart);
    </script>

### drag

Fired while the user drags and item. This event is triggered on every mouse move.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Available in builds 2015.3.1014 and later.

#### Event Data

##### e.source `kendo.data.TreeListModel`

The model of the source row.

##### e.target `jQuery`

The element under the cursor.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "drag" event before initialization

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        drag: function(e) {
          console.log("dragging", e.source, e.target);
        }
      });
    </script>

#### Example - subscribe to the "drag" event after initialization

    <div id="treeList"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      function drag(e) {
        console.log("dragging");
      }

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("drag", drag);
    </script>

### dragend

Fired when the user has finished dragging an item and the model has been updated.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Available in builds 2015.3.1014 and later.

#### Event Data

##### e.source `kendo.data.TreeListModel`

The model of the source row.

##### e.destination `kendo.data.TreeListModel`

The model of the new parent row.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "dragend" event before initialization

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        dragend: function(e) {
          console.log("drag ended", e.source, e.destination);
        }
      });
    </script>

#### Example - subscribe to the "dragend" event after initialization

    <div id="treeList"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      function dragend(e) {
        console.log("drag ended");
      }

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("dragend", dragend);
    </script>

### drop

Fired when the user drops an item. If prevented, the source row will not be moved.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Available in builds 2015.3.1014 and later.

#### Event Data

##### e.source `kendo.data.TreeListModel`

The model of the source row.

##### e.destination `kendo.data.TreeListModel`

The model of the new parent row.

##### e.dropTarget `Element`

The element that the node is placed over.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.valid `Boolean`

Indicates whether the drag operation is successful.

##### e.setValid `Boolean`

Sets the valid state. If set to false, the row will be animated back to its origin, indicating to the user that the operation was invalid.

#### The difference between e.setValid(false) and e.preventDefault()

Both operations cancel the default drag operation, but the indication to the user is different.
`e.setValid(false)` indicates that the operation was unsuccessful by animating the drag clue to its original position.
`e.preventDefault()` simply removes the clue, as if it has been dropped.
As a general rule, use `preventDefault` to manually handle the drag&drop operation, and `setValid(false)` to indicate unsuccessful drag&drops.

#### Example - subscribe to the "drop" event before initialization

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        drop: function(e) {
          console.log("drop", e.source, e.destination, e.valid);
        }
      });
    </script>

#### Example - subscribe to the "drop" event after initialization

    <div id="treeList"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      function drop(e) {
        debugger
        console.log("row dropped");
      }

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("drop", drop);
    </script>

### edit

Fired when the user edits or creates a data item.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing the container element. That element contains the editing UI.

##### e.model `kendo.data.TreeListModel`

The data item which is going to be edited. Use its [isNew](/api/javascript/data/model/methods/isnew) method to check if the data item is new (created) or not (edited).

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "edit" event before initialization

    <div id="treelist"></div>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read:  {
              url: crudServiceBaseUrl + "/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            update: {
              url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                FirstName: { validation: { required: true } },
                LastName: { validation: { required: true } },
                Position: { type: "string" }
              },
              expanded: true
            }
          }
        },
        height: 300,
        editable: true,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 100 },
          { field: "Position" },
          { command: ["edit"] }
        ],
        edit: function(e) {
          console.log("edit");
        }
      });
    </script>

#### Example - subscribe to the "edit" event after initialization

    <div id="treelist"></div>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

      function edit(e) {
        console.log("edit");
      }

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read:  {
              url: crudServiceBaseUrl + "/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            update: {
              url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                FirstName: { validation: { required: true } },
                LastName: { validation: { required: true } },
                Position: { type: "string" }
              },
              expanded: true
            }
          }
        },
        height: 300,
        editable: true,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 100 },
          { field: "Position" },
          { command: ["edit"] }
        ]
      });

      var treeList = $("#treelist").data("kendoTreeList");
      treeList.bind("edit", edit);
    </script>

### excelExport

Fired when the user clicks the "Export to Excel" toolbar button.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.data `Array`

The array of data items used to create the Excel workbook. Available since version 2014.3.1205.

##### e.workbook `Object`

The Excel [workbook configuration object](/api/javascript/ooxml/workbook#configuration). Used to initialize a `kendo.ooxml.Workbook` class. Modifications of the workbook will reflect in the output Excel document.

##### e.preventDefault `Function`

If invoked the treelist will not save the generated file.

#### Example - subscribe to the "excelExport" event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        excelExport: function(e) {
          e.workbook.fileName = "Employees.xlsx";
        }
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.saveAsExcel();
    </script>

#### Example - subscribe to the "excelExport" event after initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        excelExport: function(e) {
          e.workbook.fileName = "Employees.xlsx";
        }
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("excelExport", function(e) {
        e.workbook.fileName = "Employees.xlsx";
      });
      treeList.saveAsExcel();
    </script>

### expand

Fired when an item is about to be expanded.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked prevents the expand action. The child table rows will not be shown.

#### Example - subscribe to the "expand" event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          expand: function(e) {
            console.log("expand");
          }
        });
    </script>

#### Example - subscribe to the "expand" event after initialization

    <div id="treeList"></div>
    <script>
      function expand(e) {
        console.log("expand");
      }
      $("#treeList").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("expand", expand);
    </script>

### filterMenuInit

Fired when the treelist filter menu is initialized.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing filter menu form element.

##### e.field `String`

The field of the column for which the filter menu is initialized.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "filterMenuInit" event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        filterable: true,
        filterMenuInit: function(e) {
          if (e.field == "name") {
            var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
            firstValueDropDown.value("contains");
            firstValueDropDown.trigger("change");

            var logicDropDown = e.container.find("select:eq(1)").data("kendoDropDownList");
            logicDropDown.value("or");
            logicDropDown.trigger("change");

            var secondValueDropDown = e.container.find("select:eq(2)").data("kendoDropDownList");
            secondValueDropDown.value("contains");
            secondValueDropDown.trigger("change");
          }
        }
      });
    </script>

#### Example - subscribe to the "filterMenuInit" event during initialization and change the default operators

    <div id="treelist"></div>
    <script>
      function treelist_filterMenuInit(e) {
        if (e.field == "name") {
          var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
          firstValueDropDown.value("contains");
          var logicDropDown = e.container.find("select:eq(1)").data("kendoDropDownList");
          logicDropDown.value("or");
          var secondValueDropDown = e.container.find("select:eq(2)").data("kendoDropDownList");
          secondValueDropDown.value("contains");
        }
      }
      $("#treelist").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        filterable: true
      });
      var treelist = $("#treelist").data("kendoTreeList");
      treelist.bind("filterMenuInit", treelist_filterMenuInit);
    </script>

### filterMenuOpen

Fired when the treelist filter menu is opened.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing filter menu form element.

##### e.field `String`

The field of the column for which the filter menu is opened.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "filterMenuOpen" event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        filterable: true,
        filterMenuOpen: function(e) {
          e.container.find(".k-textbox:last").focus();
        }
      });
    </script>

#### Example - subscribe to the "filterMenuOpen" event during initialization and change the default operators

    <div id="treelist"></div>
    <script>
      function treelist_filterMenuOpen(e) {
        e.container.find(".k-textbox:last").focus();
      }
      $("#treelist").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        filterable: true
      });
      var treelist = $("#treelist").data("kendoTreeList");
      treelist.bind("filterMenuOpen", treelist_filterMenuOpen);
    </script>

### pdfExport

Fired when the user clicks the "Export to PDF" toolbar button.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked the treelist will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

#### Example - subscribe to the "pdfExport" event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pdfExport: function(e) {
          console.log("exporting PDF");
        }
      });
      var treelist = $("#treeList").data("kendoTreeList");
      treelist.saveAsPDF();
    </script>

#### Example - subscribe to the "pdfExport" event after initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
      });
      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("pdfExport", function(e) {
        console.log("exporting pdf");
      });
      treelist.saveAsPDF();
    </script>

### remove

Fired when the user clicks the "destroy" command button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.row `jQuery`

The jQuery object representing the current table row.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the removal of the data item. The table rows will remain unchanged.

#### Example - subscribe to the "remove" event before initialization

    <div id="treelist"></div>
    <script>

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            destroy: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/Destroy",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        toolbar: [ "create" ],
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" },
          { command: ["destroy"] }
        ],
        remove: function(e) {
          console.log("remove");
        }
      });
    </script>

#### Example - subscribe to the "remove" event after initialization

    <div id="treeList"></div>
    <script>

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            destroy: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/Destroy",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        toolbar: [ "create" ],
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" },
          { command: ["destroy"] }
        ]
      });

      function remove(e) {
        console.log("remove");
      }

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("remove", remove);
    </script>

### save

Fired when a data item is saved.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.container `jQuery`

The jQuery object representing the current editor container element. If the [editable.mode](/api/javascript/ui/treelist#configuration-editable.mode) is "inline", the container will be the edited row. If it is "popup" then the container element will be the window element.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "save" event before initialization

    <div id="treeList"></div>
    <script>

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            update: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/Update",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" },
          { command: ["edit"] }
        ],
        save: function(e){
          console.log("save row");
        }
      });
    </script>

#### Example - subscribe to the "save" event after initialization

    <div id="treeList"></div>
    <script>

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            update: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/Update",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" },
          { command: ["edit"] }
        ]
      });

      function save(e) {
        console.log("save row");
      }

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("save", save);
    </script>

### saveChanges

Fired when the user clicks the "save" command button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.preventDefault `Function`

If invoked the treelist will not call the [sync](/api/javascript/data/datasource/methods/sync) method of the data source.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "saveChanges" event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        toolbar: ["save"],
        saveChanges: function(e) {
          if (!confirm("Are you sure you want to save all changes?")) {
            e.preventDefault();
          }
        }
      });
    </script>

#### Example - subscribe to the "saveChanges" event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_saveChanges(e) {
        if (!confirm("Are you sure you want to save all changes?")) {
          e.preventDefault();
        }
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        toolbar: ["save"]
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("saveChanges", treelist_saveChanges);
    </script>

### columnShow

Fired when the user shows a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "columnShow" event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true,
        columnShow: function(e) {
          console.log(e.column.field); // displays the field of the shown column
        }
      });
    </script>

#### Example - subscribe to the "columnShow" event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_columnShow(e) {
        console.log(e.column.field); // displays the field of the shown column
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true
      });

      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("columnShow", treelist_columnShow);
    </script>

### columnHide

Fired when the user hides a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "columnHide" event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true,
        columnHide: function(e){
          console.log(e.column.field); // displays the field of the hidden column
        }
      });
    </script>

#### Example - subscribe to the "columnHide" event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_columnHide(e) {
        console.log(e.column.field); // displays the field of the hidden column
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true
      });

      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("columnHide", treelist_columnHide);
    </script>

### columnReorder

Fired when the user changes the order of a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.newIndex `Number`

The new column index.

##### e.oldIndex `Number`

The previous column index.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "columnReorder" event during initialization

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            reorderable: true,
            columnReorder: function(e) {
                console.log(e.column.field, e.newIndex, e.oldIndex);
            }
        });
    </script>

#### Example - subscribe to the "columnReorder" event after initialization

    <div id="treeList"></div>
    <script>
        function treelist_columnReorder(e) {
          console.log(e.column.field, e.newIndex, e.oldIndex);
        }

        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            reorderable: true
        });

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.bind("columnReorder", treelist_columnReorder);
    </script>

### columnResize

Fired when the user resizes a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.newWidth `Number`

The new column width.

##### e.oldWidth `Number`

The previous column width.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "columnResize" event during initialization

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            resizable: true,
            columnResize: function(e) {
                console.log(e.column[0].field, e.newWidth, e.oldWidth);
            }
        });
    </script>

#### Example - subscribe to the "columnResize" event after initialization

    <div id="treeList"></div>
    <script>
        function treelist_columnResize(e) {
          console.log(e.column[0].field, e.newWidth, e.oldWidth);
        }

        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            resizable: true
        });

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.bind("columnResize", treelist_columnResize);
    </script>

### columnMenuInit

Fired when the column menu is initialized.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing column menu form element.

##### e.field `String`

The field of the column for which the column menu is initialized.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "columnMenuInit" event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true,
        columnMenuInit: function(e) {
          var menu = e.container.find(".k-menu").data("kendoMenu");
          var field = e.field;
          menu.append({ text: "Custom" });
          menu.bind("select", function(e) {
            if ($(e.item).text() == "Custom") {
              console.log("Custom button for", field);
            }
          });
        }
      });
    </script>

#### Example - subscribe to the "columnMenuInit" event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_columnMenuInit(e) {
        var menu = e.container.find(".k-menu").data("kendoMenu");
        var field = e.field;
        menu.append({ text: "Custom" });
        menu.bind("select", function(e) {
          if ($(e.item).text() == "Custom") {
            console.log("Custom button for", field);
          }
        });
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true
      });

      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("columnMenuInit", treelist_columnMenuInit);
    </script>

### columnMenuOpen

Fired when the column menu is opened.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing column menu form element.

##### e.field `String`

The field of the column for which the column menu is initialized.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "columnMenuOpen" event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true,
        columnMenuOpen: function(e) {
          var menu = e.container.children().data("kendoMenu");
          menu.open(menu.element.find("li:first"));
        }
      });
    </script>

#### Example - subscribe to the "columnMenuOpen" event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_columnMenuOpen(e) {
        var menu = e.container.children().data("kendoMenu");
        menu.open(menu.element.find("li:first"));
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true
      });

      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("columnMenuOpen", treelist_columnMenuOpen);
    </script>

### columnLock

Fired when the user lock a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "columnLock" event during initialization

    <div id="treeList" style="width: 400px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true,
        columnMenu: true,
        columnLock: function(e) {
          console.log(e.column.field); // displays the field of the just locked column
        }
      });
    </script>

#### Example - subscribe to the "columnLock" event after initialization

    <div id="treeList" style="width: 400px"></div>
    <script>
      function treeList_columnLock(e) {
        console.log(e.column.field); // displays the field of the just locked column
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true,
        columnMenu: true
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("columnLock", treeList_columnLock);
    </script>

### columnUnlock

Fired when the user unlock a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "columnUnlock" event during initialization

    <div id="treeList" style="width: 400px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true,
        columnMenu: true,
        columnUnlock: function (e) {
          console.log(e.column.field); // displays the field of the just locked column
        }
      });
    </script>

#### Example - subscribe to the "columnUnlock" event after initialization

    <div id="treeList" style="width: 400px"></div>
    <script>
      function treeList_columnUnlock(e) {
        console.log(e.column.field); // displays the field of the just locked column
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true,
        columnMenu: true
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("columnUnlock", treeList_columnUnlock);
    </script>
