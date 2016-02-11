---
title: TreeList
page_title: Configuration, methods and events of Kendo UI TreeList
description: Code examples for TreeList UI widget configuration. Learn how to use methods and which events to set once the treelist UI widget is initialized and expanded.
---

# kendo.ui.TreeList

Represents the Kendo UI TreeList widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.

#### Example - disable automatic binding

    <div id="treeList"></div>
    <script>
        var dataSource = new kendo.data.TreeListDataSource({
          data: [ { name: "Jane Doe" }, { name: "John Doe" }]
        });
        $("#treeList").kendoTreeList({
          columns: [ "name" ],
          autoBind: false,
          dataSource: dataSource
        });
        dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### columns `Array`

The configuration of the treelist columns. An array of JavaScript objects or strings. JavaScript objects are interpreted as column configurations. Strings are interpreted as the
[field](#configuration-columns.field) to which the column is bound. The treelist will create a column for every item of the array.

#### Example - specify treelist columns as array of strings

    <div id="treeList"></div>
    <script>
        var dataSource = new kendo.data.TreeListDataSource({
          data: [ { name: "Jane Doe" }, { name: "John Doe" }]
        });
        $("#treeList").kendoTreeList({
          columns: [ "name" ],
          dataSource: dataSource
        });
    </script>

#### Example - specify treelist columns as array of objects

    <div id="treeList"></div>
    <script>
        var dataSource = new kendo.data.TreeListDataSource({
          data: [ { name: "Jane Doe" }, { name: "John Doe" }]
        });
        $("#treeList").kendoTreeList({
          columns: [
              { field: "name", title: "Name" }
          ],
          dataSource: dataSource
        });
    </script>

### columns.attributes `Object`

HTML attributes of the table cell (`<td>`) rendered for the column.

> HTML attributes which are JavaScript keywords (e.g. *class*) must be quoted.

#### Example - specify column HTML attributes

    <div id="treeList"></div>
    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        data: [ { name: "Jane Doe" }, { name: "John Doe" }]
      });
      $("#treeList").kendoTreeList({
        columns: [ {
          field: "name",
          attributes: {
            "class": "name-cell",
            style: "text-align: right"
          }
        } ],
        dataSource: dataSource
      });
    </script>

The table cells would look like this: `<td class="name-cell" style="text-align: right">...</td>`.

### columns.command `Array`

The configuration of the column command(s). If set the column would display a button for every command. Commands can be custom or built-in ("edit", "createChild" or "destroy"):

* The "edit" built-in command switches the current table row to edit mode.

* The "createChild" built-in command adds a new child item to the current table row and switches to edit mode.

* The "destroy" built-in command removes the data item to which the current table row is bound.

Custom commands are supported by specifying the [click](#configuration-columns.command.click) option.

> The built-in "edit", "createChild" and "destroy" commands work *only* if editing is enabled via the [editable](#configuration-editable) option. The "edit" command supports "inline" and "popup" editing modes.

#### Example - set command as array of strings

    <div id="treeList"></div>
    <script>
        var dataSource = new kendo.data.TreeListDataSource({
          data: [ { name: "Jane Doe" }, { name: "John Doe" }]
        });
        $("#treeList").kendoTreeList({
          columns: [
              { field: "name" },
              { command: ["edit", "destroy"] }
          ],
          editable: true,
          dataSource: dataSource
        });
    </script>

#### Example - set command as array of objects

    <div id="treeList"></div>
    <script>
        var dataSource = new kendo.data.TreeListDataSource({
          data: [ { name: "Jane Doe" }, { name: "John Doe" }]
        });
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            {
                command: [
                    {
                        name: "details",
                        text: "details",
                        click: function(e) {
                            // command button click handler
                        }
                    },
                    { name: "destroy" } // built-in "destroy" command
                ]
            }
          ],
          editable: true,
          dataSource: dataSource
        });
    </script>

### columns.command.className `String`

The CSS class applied to the command button.

#### Example - set the CSS class of the command

    <div id="treeList"></div>
    <script>
        var dataSource = new kendo.data.TreeListDataSource({
          data: [ { name: "Jane Doe" }, { name: "John Doe" }]
        });
        $("#treeList").kendoTreeList({
          columns: [
              { field: "name" },
              { command: [{ name: "edit", className: "btn-edit" }] }
          ],
          editable: true,
          dataSource: dataSource
        });
    </script>

### columns.command.click `Function`

The JavaScript function executed when the user clicks the command button. The function receives a [jQuery Event](http://api.jquery.com/category/events/event-object/) as an argument.

The function context (available via the `this` keyword) will be set to the treelist instance.

#### Example - handle the click event of the custom command button

    <div id="treeList"></div>
    <script>
        var dataSource = new kendo.data.TreeListDataSource({
          data: [ { name: "Jane Doe" }, { name: "John Doe" }]
        });
        $("#treeList").kendoTreeList({
          columns: [
              { field: "name" },
              { command: [ {
                    name: "details",
                    text: "details",
                    click: function(e) {
                        // e.target is the DOM element representing the button
                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                        // get the data bound to the current table row
                        var data = this.dataItem(tr);
                        console.log("Details for: " + data.name);
                    }
                  } ]
              }
          ],
          editable: true,
          dataSource: dataSource
        });
    </script>

### columns.command.name `String`

The name of the command. The built-in commands are "edit", "createChild" and "destroy". When set to a custom value, it is rendered as a `data-command` attribute.

#### Example - set the command name

    <div id="treeList"></div>
    <script>
        var dataSource = new kendo.data.TreeListDataSource({
          data: [ { name: "Jane Doe" }, { name: "John Doe" }]
        });
        $("#treeList").kendoTreeList({
          columns: [
              { field: "name" },
              { command: [{ name: "edit" }] }
          ],
          editable: true,
          dataSource: dataSource
        });
    </script>

### columns.command.text `String`

The text displayed by the command button. If not set the [name](#configuration-columns.command.name) option is used as the button text.

#### Example - customize the text of the command

    <div id="treeList"></div>
    <script>
        var dataSource = new kendo.data.TreeListDataSource({
          data: [ { name: "Jane Doe" }, { name: "John Doe" }]
        });
        $("#treeList").kendoTreeList({
          columns: [
              { field: "name" },
              { command: [{ name: "edit", text: "Edit current item" }] }
          ],
          editable: true,
          dataSource: dataSource
        });
    </script>

### columns.editor `Function`

Provides a way to specify a custom editing UI for the column. Use the `container` parameter to create the editing UI.

> The editing UI should contain an element whose `name` HTML attribute is set as the column [field](#configuration-columns.field).

> Validation settings defined in the `model.fields` configuration will **not** be applied automatically. In order the validation to work, **the developer is responsible for attaching the corresponding validation attributes to the editor input**. In case the custom editor is a widget, the developer should [customize the validation warning tooltip position](/framework/validator/overview#customizing-the-tooltip-position) in order to avoid visual issues.

#### Parameters

##### container `jQuery`

The jQuery object representing the container element.

##### options `Object`

##### options.field `String`

The name of the field to which the column is bound.

##### options.format `String`

The format string of the column specified via the [format](#configuration-columns.format) option.

##### options.model `kendo.data.TreeListModel`

The model instance to which the current table row is bound.

#### Example - create a custom column editor using the Kendo UI AutoComplete

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                {
                    field: "name",
                    editor: function(container, options) {
                        // create an input element
                        var input = $("<input/>");
                        // set its name to the field to which the column is bound ('name' in this case)
                        input.attr("name", options.field);
                        // append it to the container
                        input.appendTo(container);
                        // initialize a Kendo UI AutoComplete
                        input.kendoAutoComplete({
                            dataTextField: "name",
                            dataSource: [
                                { name: "Jane Doe" },
                                { name: "Maria Anders" }
                            ]
                        });
                    }
                },
                { command: [ "edit" ] }
            ],
            editable: true,
            dataSource: {
                data: [ { name: "Jane Doe" } ]
            }
        });
    </script>

#### Example - create a custom column editor with validation

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                {
                    field: "name",
                    editor: function(container, options) {
                        // create input element and add the validation attribute
                        var input = $('<input name="' + options.field + '" required="required" />');
                        // set its name to the field to which the column is bound ('name' in this case)
                        input.attr("name", options.field);
                        // append it to the container
                        input.appendTo(container);
                        // initialize a Kendo UI AutoComplete
                        input.kendoAutoComplete({
                            dataTextField: "name",
                            dataSource: [
                                { name: "Jane Doe" },
                                { name: "Maria Anders" }
                            ]
                        });

                        // create tooltipElement element, NOTE: data-for attribute should match editor's name attribute
                        var tooltipElement = $('<span class="k-invalid-msg" data-for="' + options.field + '"></span>');
                        // append the tooltip element
                        tooltipElement.appendTo(container);
                    }
                },
                { command: [ "edit" ] }
            ],
            editable: true,
            scrollable: false,
            dataSource: {
                data: [ { name: "Jane Doe" } ]
            }
        });
    </script>

### columns.encoded `Boolean` *(default: true)*

If set to `true` the column value will be HTML-encoded before it is displayed. If set to `false` the column value will be displayed as is. By default the column value is HTML-encoded.

#### Example - prevent HTML encoding

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name", encoded: false },
            ],
            dataSource: {
                data: [ { name: "<strong>Jane Doe</strong>" } ]
            }
        });
    </script>

### columns.expandable `Boolean` *(default: false)*

If set to `true` the column will show the icons that are used for expanding and collapsing child rows. By default, the first column of the TreeList is expandable.

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
**The field name should be a valid Javascript identifier and should contain no spaces, no special characters, and the first character should be a letter.**

#### Example - specify the column field

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
            ],
            dataSource: {
                data: [ { name: "Jane Doe" } ]
            }
        });
    </script>

### columns.filterable `Boolean|Object` *(default: true)*

If set to `true` a filter menu will be displayed for this column when filtering is enabled. If set to `false` the filter menu will not be displayed. By default a filter menu is displayed
for all columns when filtering is enabled via the [filterable](#configuration-filterable) option.

Can be set to a JavaScript object which represents the filter menu configuration.

#### Example - disable filtering

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      columns: [
        { field: "name", filterable: false },
        { field: "age" }
      ],
      filterable: true,
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }]
    });
    </script>

### columns.filterable.ui `String|Function`

The `role` [data attribute](/framework/data-attribute-initialization) of the widget used in the filter menu or a JavaScript function which initializes that widget.

#### Example - specify the filter UI as a string

    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
      columns: [ {
        field: "date",
        filterable: {
          ui: "datetimepicker" // use Kendo UI DateTimePicker
        }
      } ],
      filterable: true,
      dataSource: [ { date: new Date() }, { date: new Date() } ]
    });
    </script>

#### Example - initialize the filter UI

    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
      columns: [ {
        field: "date",
        filterable: {
          ui: function(element) {
            element.kendoDateTimePicker(); // initialize a Kendo UI DateTimePicker
          }
        }
      } ],
        filterable: true,
        dataSource: [ { date: new Date() }, { date: new Date() } ]
    });
    </script>

### columns.footerTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the footer table cell for the column.

The fields which can be used in the template are:

* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)
* data - provides access to all available aggregates, e.g. `data.fieldName1.sum` or `data.fieldName2.average`

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

> The [kendo.format](/api/javascript/kendo#methods-format) function is used to format the value.

#### Example - specify the column format string

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [ {
                field: "date",
                format: "{0: yyyy-MM-dd HH:mm:ss}"
            }, {
                field: "number",
                format: "{0:c}"
            } ],
            dataSource: [ { date: new Date(), number: 3.1415 } ]
        });
    </script>

### columns.headerAttributes `Object`

HTML attributes of the table header cell (`<th>`) rendered for the column.

> HTML attributes which are JavaScript keywords (e.g. *class*) must be quoted.

#### Example - specify column header HTML attributes

    <div id="treeList"></div>
    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        data: [ { name: "Jane Doe" }, { name: "John Doe" }]
      });
      $("#treeList").kendoTreeList({
        columns: [ {
          field: "name",
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

The [template](/api/javascript/kendo#methods-template) which renders the column header content. By default the value of the [title](#configuration-columns.title) column option
is displayed in the column header cell.

> If sorting is enabled, the column header content will be wrapped in an `<a>` element. As a result the template **must** contain only inline elements.

#### Example - column header template as a string

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
            columns: [ {
                field: "name",
                headerTemplate: '<input type="checkbox" id="check-all" /><label for="check-all">check all</label>'
            }],
            dataSource: {
                data: [ { name: "Jane Doe" } ]
            }
        });
    </script>

### columns.minScreenWidth `Number`

The pixel screen width below which the column will be hidden. The setting takes precedence over the [`hidden`](/api/javascript/ui/grid#configuration-columns.hidden) setting,
so the two should not be used at the same time.

#### Example - lockable columns

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
          columns: [
            { field: "id", width: 250, minScreenWidth: 500 }, //column will become hidden if screen size is less than 500px
            { field: "name", width: 250 }, //column will always be visible
            { field: "age", width: 250, minScreenWidth: 750 } //column will become hidden if screen size is less than 750px
          ],
          dataSource: [
              { id: 1, name: "Jane Doe", age: 31, city: "Boston" },
              { id: 2, name: "John Doe", age: 55, city: "New York" }
          ]
        });
    </script>

### columns.sortable `Boolean|Object` *(default: true)*

If set to `true` the user can click the column header and sort the treelist by the column [field](#configuration-columns.field) when sorting is enabled. If set to `false` sorting will
be disabled for this column. By default all columns are sortable if sorting is enabled via the [sortable](#configuration-sortable) option.

#### Example - disable sorting

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
            columns: [
                { sortable: false, field: "id" },
                { field: "name" }
            ],
            sortable: true,
            dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
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
                { id: 1, item: "two" },
                { id: 2, item: "one" },
                { id: 3, item: "three" }
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

The [template](/api/javascript/kendo#methods-template) which renders the column content. The treelist renders table rows (`<tr>`) which represent the data source items.
Each table row consists of table cells (`<td>`) which represent the treelist columns. By default the HTML-encoded value of the [field](#configuration-columns.field) is displayed in the column.

> Use the `template` to customize the way the column displays its value.

#### Example - set the template as a string (wrap the column value in HTML)

    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
      columns: [ {
        field: "name",
        template: "<strong>#: name #</strong>"
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
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

The text that is displayed in the column header cell. If not set the [field](#configuration-columns.field) is used.

#### Example - set the title of the column

    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
      columns: [ { field: "name", title: "Name" } ],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

### columns.width `String|Number`

The width of the column. Numeric values are treated as pixels. **For more important information, please refer to [Column Widths](/web/grid/walkthrough#column-widths)**.

#### Example - set the column width as a string
     <div id="treelist"></div>
     <script>
     $("#treelist").kendoTreeList({
       columns: [
         { field: "name", width: "200px" },
         { field: "age" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ]
     });
     </script>

#### Example - set the column width as a number
     <div id="treelist"></div>
     <script>
     $("#treelist").kendoTreeList({
       columns: [
         { field: "name", width: 200 },
         { field: "age" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ]
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

If set to `true` the column will be visible in the grid column menu. By default the column menu includes all data-bound columns (ones that have their [field](#configuration-columns.field) set).

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

If set to `true` the column will be displayed as locked in the treelist. Also see [Frozen Columns](/web/grid/walkthrough#frozen-columns-locked-columns).

#### Example - locked columns

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id", locked: true, width: 100},
                { field: "name", width: 200 },
                { field: "age", width: 150 }
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

If set to `false` the column will remain in the side of the treelist into which its own locked configuration placed it.

> This option is meaningful when the treelist has columns which are configured with a [locked](#configuration-columns.locked) value. Setting it explicitly to `false` will
prevent the user from locking or unlocking this column using the user interface.

#### Example - lockable columns

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id", locked: true, lockable: false, width: 100},
                { field: "name", width: 200 },
                { field: "age", width: 150, lockable: false }
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

#### Example - disable column selection

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
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columnMenu.filterable `Boolean` *(default: true)*

If set to `true` the column menu would allow the user to filter the treelist. By default the column menu allows the user to filter if filtering is enabled via the [filterable](#configuration-filterable).

#### Example - disable column menu filtering

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
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

If set to `true` the column menu would allow the user to sort the treelist by the column field. By default the column menu allows the user to sort if sorting is enabled via the [sortable](#configuration-sortable) option.

> If this option is set to `false` the user could still sort by clicking the column header cell.

#### Example - disable column menu sorting

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            columnMenu: {
                sortable: false
            },
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
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
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
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
            columnMenu: {
                messages: {
                  filter: "Apply filter",
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
            columnMenu: {
                messages: {
                  sortAscending: "Sort (asc)",
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
            columnMenu: {
                messages: {
                  sortDescending: "Sort (desc)",
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

### dataSource `Object|Array|kendo.data.TreeListDataSource`

The data source of the widget which is used to render table rows. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing `kendo.data.DataSource` instance, the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ]
      }
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
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

#### Example - set dataSource as an existing kendo.data.TreeListDataSource instance

    <div id="treelist"></div>
    <script>
    var dataSource = new kendo.data.TreeListDataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      },
      pageSize: 10
    });
    $("#treelist").kendoTreeList({
      dataSource: dataSource,
      pageable: true
    });
    </script>

### editable `Boolean|Object` *(default: false)*

If set to `true` the user would be able to edit the data to which the treelist is bound. By default editing is disabled.

Can be set to a string ("inline" or "popup") to specify the editing mode. The default editing mode is "inline".

Can be set to a JavaScript object which represents the editing configuration.

> The "inline" and "popup" editing modes are triggered by the "edit" column command. Thus it is required to have a column with an "edit" command.

#### Example - enable editing

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" },
            { command: [ "edit" ] }
          ],
          editable: true,
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

#### Example - enable popup editing

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" },
            { command: [ "edit" ] }
          ],
          editable: "popup",
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

### editable.mode `String` *(default: "inline")*

The editing mode to use. The supported editing modes are "inline" and "popup".

> The "inline" and "popup" editing modes are triggered by the "edit" column command. Thus it is required to have a column with an "edit" command.

#### Example - specify inline editing mode

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" },
            { command: [ "edit" ] }
          ],
          editable: {
            mode: "inline"
          },
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

### editable.move `Boolean` *(default: false)*

Enables drag&drop UI of rows between parents.

#### Example - use drag&drop for editing row parent node

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" },
            { command: [ "edit" ] }
          ],
          editable: {
            move: true
          },
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

### editable.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the popup editor.

The template should contain elements whose `name` HTML attributes are set as the editable fields. This is how the treelist will know
which field to update. The other option is to use [MVVM](/framework/mvvm/overview) bindings in order to bind HTML elements to data item fields.

> Use the `role` data attribute to initialize Kendo UI widgets in the template. Check [data attribute initialization](/framework/data-attribute-initialization) for more info.

#### Example - customize the popup editor

    <div id="treeList"></div>
    <script id="popup-editor" type="text/x-kendo-template">
      <h3>Edit Person</h3>
      <p>
        <label>Name:<input name="name" /></label>
      </p>
      <p>
        <label>Age: <input data-role="numerictextbox" name="age" /></label>
      </p>
    </script>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" },
            { command: [ "edit" ] }
          ],
          editable: {
            mode: "popup",
            template: kendo.template($("#popup-editor").html())
          },
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

#### Example - using MVVM in the popup editor template

    <div id="treeList"></div>
    <script id="popup-editor" type="text/x-kendo-template">
      <h3>Edit Person</h3>
      <p>
        <label>Name:<input data-bind="value: name" /></label>
      </p>
      <p>
        <label>Age:<input data-role="numerictextbox" data-bind="value:age" /></label>
      </p>
    </script>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" },
            { command: [ "edit" ] }
          ],
          editable: {
            mode: "popup",
            template: kendo.template($("#popup-editor").html())
          },
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

### editable.window `Object`

Configures the Kendo UI Window instance, which is used when the TreeList edit mode is "popup". The configuration is optional.

For more information, please refer to the [Window configuration API](/api/javascript/ui/window).

#### Example - TreeList popup Window configuration

    <div id="treeList"></div>
    <script>
        function myOpenEventHandler(e) {
            // ...
        }

        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" },
            { command: [ "edit" ] }
          ],
          editable: {
            mode: "popup",
            window: {
                title: "My Custom Title",
                animation: false,
                open: myOpenEventHandler
            }
          },
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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
          filterable: false
        },
        dataSource: {
          transport: {
            read: {
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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

If set to true, the content will be forwarded to [proxyURL](#configuration-excel.proxyURL) even if the browser supports saving files locally.

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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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

> All other [`filterable` options from Grid](/api/javascript/ui/grid#configuration-filterable) can be used, except for `filterable.mode`, which is always `menu`.

#### Example - enable and configure filtering

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          height: "100em",
          columns: [
            { field: "name" },
            { field: "age" }
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
                gte: "On or after"
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
          },
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

### filterable.extra `Boolean` *(default: true)*

If set to `true` the filter menu allows the user to input a second criteria.

#### Example - disable the extra filtering criteria

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          height: "100em",
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          filterable: {
            extra: false
          },
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

### filterable.messages `Object`

The text messages displayed in the filter menu. Use it to customize or localize the filter menu messages.

#### Example - customize filter menu messages
    <div id="grid"></div>
    <script>
    $("#grid").kendoTreeList({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoTreeList({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoTreeList({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoTreeList({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoTreeList({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      filterable: {
        messages: {
          info: "Filter by: "
        }
      }
    });
    </script>

### filterable.messages.isFalse `String` *(default: "is false")*

The text of the radio button for `false` values. Displayed when filtering `Boolean` fields.

#### Example - set the "isFalse" message
    <div id="grid"></div>
    <script>
    $("#grid").kendoTreeList({
      columns: [
        { field: "active" }
      ],
      dataSource: {
        data: [
          { active: true },
          { active: false }
        ],
        schema: {
          model: {
            fields: {
              active: { type: "boolean" }
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
    <div id="grid"></div>
    <script>
    $("#grid").kendoTreeList({
      columns: [
        { field: "active" }
      ],
      dataSource: {
        data: [
          { active: true },
          { active: false }
        ],
        schema: {
          model: {
            fields: {
              active: { type: "boolean" }
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoTreeList({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      filterable: {
        messages: {
          or: "or"
        }
      }
    });
    </script>

### filterable.messages.selectValue `String` *(default: "-Select value-")*

The text of the DropDownList displayed in the filter menu for columns whose [values](#configuration-columns.values) option is set.

#### Example - set the "selectValue" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoTreeList({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            { text: "Beverages", value: 1 },
            { text: "Food", value: 2 },
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        messages: {
          selectValue: "Select category"
        }
      }
    });
    </script>

### filterable.messages.cancel `String` *(default: "Cancel")*

The text of the cancel button in the filter menu header (available in mobile mode only).

#### Example - set the cancel button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoTreeList({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            { text: "Beverages", value: 1 },
            { text: "Food", value: 2 },
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      mobile: "phone",
      filterable: {
        messages: {
          cancel: "Reject"
        }
      }
    });
    </script>

### filterable.messages.operator `String` *(default: "Operator")*

The text of the operator item in filter menu (available in mobile mode only).

#### Example - set the text of operator item

    <div id="grid"></div>
    <script>
    $("#grid").kendoTreeList({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            { text: "Beverages", value: 1 },
            { text: "Food", value: 2 },
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      mobile: "phone",
      filterable: {
        messages: {


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
          edit: "Edit",
          update: "Update",
          canceledit: "Cancel",
          create: "Add new record",
          createchild: "Add child record",
          destroy: "Delete",
          excel: "Export to Excel",
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
          edit: "Edit",
          update: "Update",
          canceledit: "Cancel",
          create: "Add new record",
          createchild: "Add child record",
          destroy: "Delete",
          excel: "Export to Excel",
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
      toolbar: [ "create", "pdf", "excel" ],
      columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
      editable: true,
      messages: {
        commands: {
          canceledit: "Cancel"
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
      toolbar: [ "create", "pdf", "excel" ],
      columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
      editable: true,
      messages: {
        commands: {
          create: "Add new record"
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
      toolbar: [ "create", "pdf", "excel" ],
      columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
      editable: true,
      messages: {
        commands: {
          createchild: "Add child record"
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
      toolbar: [ "create", "pdf", "excel" ],
      columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
      editable: true,
      messages: {
        commands: {
          destroy: "Delete"
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
      toolbar: [ "create", "pdf", "excel" ],
      columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
      editable: true,
      messages: {
        commands: {
          edit: "Edit"
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
      toolbar: [ "create", "pdf", "excel" ],
      columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
      editable: true,
      messages: {
        commands: {
          excel: "Export to Excel"
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
      toolbar: [ "create", "pdf", "excel" ],
      columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
      editable: true,
      messages: {
        commands: {
          pdf: "Export to PDF"
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
      toolbar: [ "create", "pdf", "excel" ],
      columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
      editable: true,
      messages: {
        commands: {
          update: "Update"
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
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create", "pdf", "excel" ],
      columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
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
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create", "pdf", "excel" ],
      columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
      editable: true,
      messages: {
        noRows: "No records"
      }
    });
    </script>

### messages.requestFailed `String` *(default: "Request failed.")*

Defines the text of "Request failed." message when the widget fails to load its root-level items.

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
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create", "pdf", "excel" ],
      columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
      editable: true,
      messages: {
        retry: "Reload"
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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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

If set to true, the content will be forwarded to [proxyURL](#configuration-pdf.proxyURL) even if the browser supports saving files locally.

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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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
              url: "http://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
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

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          scrollable: false,
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
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
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
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
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
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
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

### sortable.allowUnsort `Boolean` *(default: true)*

If set to `true` the user can get the treelist in its unsorted state by clicking the sorted column header.

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
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

### sortable.mode `String` *(default: "single")*

The sorting mode. If set to "single" the user can sort by one column. If set to "multiple" the user can sort by multiple columns.

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
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

### toolbar `String|Function|Array`

If a `String` value is assigned to the `toolbar` configuration option, it will be treated as a single string template for the whole treelist Toolbar,
and the string value will be passed as an argument to a [`kendo.template()`](/api/javascript/kendo#methods-template) function.

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
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

#### Example - configure the TreeList Toolbar template with a function

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          toolbar: kendo.template("<p>My function template.</p>"),
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

#### Example - configure the TreeList Toolbar as an array of commands

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          toolbar: [
            { name: "create" }
          ],
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

### toolbar.name `String`

The name of the toolbar command. Either a built-in ("create", "excel", "pdf") or custom. The `name` is reflected in one of the CSS classes, which is applied to the button - `k-grid-name`.
This class can be used to get a reference to the button (after TreeList initialization) and attach click handlers.

#### Example - specify the name of the command

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          toolbar: [
            { name: "create" },
            { name: "custom" }
          ],
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

### toolbar.text `String`

The text displayed by the command button. If not set the [name](#configuration-toolbar.name)` option would be used as the button text instead.

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          toolbar: [
            { name: "create", text: "Add new" }
          ],
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

## Methods

### addRow

Adds an empty data item to the treelist. In "inline" editing mode a table row will be appended. A popup window will be displayed in "popup" editing mode.

Fires the [edit](#events-edit) event.

#### Parameters

##### parentRow `String|Element|jQuery`

A string, DOM element or jQuery object which represents the parent table row. A string is treated as a jQuery selector.

#### Example - add a new root data item

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: {
            data: [
              { id: 1, name: "Jane Doe", age: 30, parentId: null }
            ],
            schema: {
              model: { id: "id" }
            }
          },
          editable: "inline"
        });
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.addRow();
    </script>

#### Example - add a new child data item

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
              { id: 1, name: "Jane Doe", age: 30, parentId: null },
              { id: 2, name: "Jane Doe", age: 30, parentId: 1 }
            ]
          },
          editable: "inline"
        });
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.addRow($("#treeList tbody>tr:first"));
    </script>

### cancelRow

Cancels editing for the table row which is in edit mode. Reverts any changes made.

#### Example - cancel editing

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: {
            data: [
              { id: 1, name: "Jane Doe", age: 30, parentId: null }
            ],
            schema: {
              model: { id: "id" }
            }
          },
          editable: "inline"
        });
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.editRow($("#treeList tbody>tr:eq(0)"));
        treeList.cancelRow();
    </script>

### clearSelection

Clears the currently selected table rows or cells (depending on the current selection [mode](#configuration-selectable)).

#### Example - clear selection

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 },
          ],
          selectable: true
        });
        var treeList = $("#treeList").data("kendoTreeList");
        // select the first table row
        treeList.select($("#treeList tr:eq(1)"));
        treeList.clearSelection();
    </script>

### collapse

This method collapse the row.

#### Example

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [ "id", "name" ],
            dataSource: [
                { id: 1, parentId: null, name: "Jane Doe", age: 30 },
                { id: 2, parentId: 1, name: "John Doe", age: 33 }
            ]
        });
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.collapse($("#treeList tbody>tr:eq(0)"));
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
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
        var treeList = $("#treeList").data("kendoTreeList");
        var data = treeList.dataItem("tbody>tr:eq(1)");
        console.log(data.age); // displays "33"
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

#### Example

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [ "name", "age" ],
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.destroy();
    </script>

### editRow

Switches the specified table row to edit mode.

Fires the [edit](#events-edit) event.

#### Parameters

##### row `jQuery`

The jQuery object which represents the table row.

#### Example - switch the first row to edit mode

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: {
            data: [
              { id: 1, name: "Jane Doe", age: 30, parentId: null }
            ],
            schema: {
              model: { id: "id" }
            }
          },
          editable: "inline"
        });
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.editRow($("#treeList tbody>tr:eq(0)"));
    </script>

### expand

This method expands the row.

#### Example

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [ "id", "name" ],
            dataSource: [
                { id: 1, parentId: null, name: "Jane Doe", age: 30 },
                { id: 2, parentId: 1, name: "John Doe", age: 33 }
            ]
        });
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.expand($("#treeList tbody>tr:eq(0)"));
    </script>

#### Example - expand row of a data item with a given id

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [ "id", "name" ],
            dataSource: [
                { id: 1, parentId: null, name: "Jane Doe", age: 30 },
                { id: 2, parentId: 1, name: "John Doe", age: 33 }
            ]
        });
        var treeList = $("#treeList").data("kendoTreeList");

        // find item with id = 1 in datasource
        var dataItem = treeList.dataSource.get(1);

        // find row for data item
        var row = treeList.content.find("tr[data-uid=" + dataItem.uid + "]")

        treeList.expand(row);
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

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
              { id: 1, name: "Jane Doe", age: 30 },
              { id: 2, name: "John Doe", age: 33 }
          ]
        });
        var treeList = $("#treeList").data("kendoTreeList");
        var jane = treeList.dataSource.get(1);
        var row = treeList.itemFor(jane);
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource#methods-view).

#### Returns

`Array` The currently rendered data table rows (`<tr>` elements).

### refresh

Renders all table rows using the current data items.

#### Example - refresh the widget

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.refresh();
    </script>

### removeRow

Removes the specified table row from the treelist. Also removes the corresponding data item from the data source.

Fires the [remove](#events-remove) event.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Example - remove the first table row

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: {
            data: [
              { id: 1, name: "Jane Doe", age: 30, parentId: null }
            ],
            schema: {
              model: { id: "id" }
            }
          },
          editable: "inline"
        });
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.removeRow($("#treeList tbody>tr:first"));
    </script>

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](#events-excelExport) event.

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

Initiates the PDF export and returns a promise. Also triggers the [pdfExport](#events-pdfExport) event.

> Calling this method may trip the built-in browser pop-up blocker. To avoid that, call this method as a response to an end-user action, e.g. a button click.

#### Returns
`Promise` A promise that will be resolved when the export completes. The same promise is available in the [pdfExport](#events-pdfExport) event arguments.

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

### saveRow

Switches the table row which is in edit mode and saves any changes made by the user.

Fires the [edit](#events-save) event.

#### Example - save row

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: {
            data: [
              { id: 1, name: "Jane Doe", age: 30, parentId: null }
            ],
            schema: {
              model: { id: "id" }
            }
          },
          editable: "inline"
        });
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.editRow($("#treeList tbody>tr:eq(0)"));
        treeList.saveRow();
    </script>

### select

Gets or sets the table rows (or cells) which are selected.

#### Parameters

##### rows `Element|jQuery`

A string, DOM element or jQuery object which represents the table row(s) or cell(s). A string is treated as a jQuery selector.

#### Returns

`jQuery` the selected table rows or cells.

#### Example - select the first table cell

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ],
          selectable: "cell"
        });
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.select($("#treeList td:eq(0)"));
    </script>

#### Example - get the selected table row

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ],
          selectable: "row"
        });
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.select($("#treeList tr:eq(1)"));
        var row = treeList.select();
        var data = treeList.dataItem(row);
        console.log(data.name); // displays "Jane Doe"
    </script>

### setDataSource

Sets the data source of the widget.

#### Parameters

##### dataSource `kendo.data.TreeListDataSource`

The data source to which the widget should be bound.

#### Example - set the data source

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
              { name: "Jane Doe", age: 30 }
          ]
        });
        var dataSource = new kendo.data.TreeListDataSource({
          data: [
            { name: "John Doe", age: 33 }
          ]
        });
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.setDataSource(dataSource);
    </script>

### showColumn

Shows the specified column.

#### Parameters

##### column `Number|String`

The index of the column, or the [field](#configuration-columns.field) to which the columns is bound.

#### Example - show a hidden column by index

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

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.showColumn(1);
    </script>

#### Example - show a hidden column by field

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

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.showColumn("age");
    </script>

### hideColumn

Hides the specified column.

#### Parameters

##### column `Number|String`

The index of the column, or the [field](#configuration-columns.field) to which the columns is bound.

#### Example - hide column by index

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
            }
        });

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.hideColumn(1);
    </script>

#### Example - show a hidden column by field

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
            }
        });

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.hideColumn("age");
    </script>

### lockColumn

Locks (freezes) a column, allowing users to see it at all times when scrolling.

#### Parameters

##### column `Number|String`

The index of the column or the [field](#configuration-columns.field) to which the columns is bound.

> In order to use this method, the treelist must be initialized with at least one locked column, and should have unlocked columns left after the target column is locked.

#### Example - lock a column

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id", locked: true, width: 100},
                { field: "name", width: 200 },
                { field: "age", width: 150 }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.lockColumn("age");
    </script>

### unlockColumn

Unlocks (unfreezes) a column.

#### Parameters

##### column `Number|String`

The index of the column or the [field](#configuration-columns.field) to which the columns is bound.

> In order to use this method, the treelist must be initialized with at least one locked column, and there should be locked columns left after the target column is unlocked.

#### Example - unlock a column

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id", locked: true, width: 100},
                { field: "name", width: 200 },
                { field: "age", locked: true, width: 150 }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.unlockColumn("age");
    </script>

### reorderColumn

Changes the position of the specified column.

#### Parameters

##### destIndex `Number`

The new position of the column. The destination index should be calculated with regard to all columns, including the hidden ones.

##### column `Object`

The column whose position should be changed.

#### Example - move a column

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
            }
        });

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.reorderColumn(1, treelist.columns[0]);
    </script>

## Events

### cancel

Fired when the user clicks the "cancel" button (in inline or popup [editing mode](#configuration-editable.mode)) or closes the popup window.

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
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
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
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
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
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
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
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
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

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          editable: {
            move: true
          },
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          dragstart: function(e) {
            console.log("dragstart", e.source);
          }
        });
    </script>

#### Example - subscribe to the "dragstart" event after initialization

    <div id="treeList"></div>
    <script>
        function dragstart(e) {
            console.log("dragstart");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          editable: {
            move: true
          },
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
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

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          editable: {
            move: true
          },
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          drag: function(e) {
            console.log("drag", e.source, e.target);
          }
        });
    </script>

#### Example - subscribe to the "drag" event after initialization

    <div id="treeList"></div>
    <script>
        function drag(e) {
            console.log("drag");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          editable: {
            move: true
          },
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
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

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          editable: {
            move: true
          },
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          dragend: function(e) {
            console.log("dragend", e.source, e.destination);
          }
        });
    </script>

#### Example - subscribe to the "dragend" event after initialization

    <div id="treeList"></div>
    <script>
        function dragend(e) {
            console.log("dragend");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          editable: {
            move: true
          },
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
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

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          editable: {
            move: true
          },
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          drop: function(e) {
            console.log("drop", e.source, e.destination, e.valid);
          }
        });
    </script>

#### Example - subscribe to the "drop" event after initialization

    <div id="treeList"></div>
    <script>
        function drop(e) {
            console.log("drop");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          editable: {
            move: true
          },
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
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

The data item which is going to be edited. Use its [isNew](/api/javascript/data/model#methods-isNew) method to check if the data item is new (created) or not (edited).

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "edit" event before initialization

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
          edit: function(e) {
            console.log("edit");
          }
        });
    </script>

#### Example - subscribe to the "edit" event after initialization

    <div id="treeList"></div>
     <script>
        function edit(e) {
            console.log("edit");
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
        treeList.bind("edit", edit);
        treeList.dataSource.fetch();
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
        e.workbook.fileName = "Employees.xslx";
      }
    });
    var treelist = $("#treelist").data("kendoTreeList");
    treelist.saveAsExcel();
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
    });
    var treelist = $("#treelist").data("kendoTreeList");
    treelist.bind("excelExport", function(e) {
        e.workbook.fileName = "Employees.xslx";
    });
    treelist.saveAsExcel();
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
        treeList.dataSource.fetch();
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

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
          columns: [
            { field: "name" }
          ],
          dataSource: [
            { name: "Jane Doe"},
            { name: "John Doe"}
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
            { field: "name" }
          ],
          dataSource: [
            { name: "Jane Doe"},
            { name: "John Doe"}
          ],
          filterable: true
        });
        var treelist = $("#treelist").data("kendoTreeList");
        treelist.bind("filterMenuInit", treelist_filterMenuInit);
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
      }
    });
    var treelist = $("#treelist").data("kendoTreeList");
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
    var treelist = $("#treelist").data("kendoTreeList");
    treelist.bind("pdfExport", function(e) {
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

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" },
            { command: [ "destroy" ] }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          remove: function(e) {
            console.log("remove");
          }
        });
    </script>

#### Example - subscribe to the "remove" event after initialization

    <div id="treeList"></div>
     <script>
        function remove(e) {
            console.log("remove");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" },
            { command: [ "destroy" ] }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ]
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("remove", remove);
        treeList.dataSource.fetch();
    </script>

### save

Fired when a data item is saved.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.container `jQuery`

The jQuery object representing the current editor container element. If the [editable.mode](#configuration-editable.mode) is "inline", the container will be the edited row. If it is "popup" then the container element will be the window element.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "save" event before initialization

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
          save: function(e) {
            console.log("save");
          }
        });
    </script>

#### Example - subscribe to the "save" event after initialization

    <div id="treeList"></div>
     <script>
        function save(e) {
            console.log("save");
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
        treeList.bind("save", save);
        treeList.dataSource.fetch();
    </script>

### columnShow

Fired when the user shows a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "columnShow" event during initialization

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
            columnShow: function(e) {
                console.log(e.column.field); // displays the field of the hidden column
            }
        });
    </script>

#### Example - subscribe to the "columnShow" event after initialization

    <div id="treeList"></div>
    <script>
        function treelist_columnShow(e) {
            console.log(e.column.field); // displays the field of the hidden column
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
            }
        });

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.bind("columnShow", treelist_columnShow);
    </script>

### columnHide

Fired when the user hides a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribe to the "columnHide" event during initialization

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
            columnHide: function(e) {
                console.log(e.column.field); // displays the field of the visible column
            }
        });
    </script>

#### Example - subscribe to the "columnHide" event after initialization

    <div id="treeList"></div>
    <script>
        function treelist_columnHide(e) {
            console.log(e.column.field); // displays the field of the visible column
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
            }
        });

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.bind("columnHide", treelist_columnHide);
    </script>

### columnReorder

Fired when the user changes the order of a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](#configuration-columns) configuration.

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

A JavaScript object which represents the [column](#configuration-columns) configuration.

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
                console.log(e.column.field, e.newWidth, e.oldWidth);
            }
        });
    </script>

#### Example - subscribe to the "columnResize" event after initialization

    <div id="treeList"></div>
    <script>
        function treelist_columnResize(e) {
          console.log(e.column.field, e.newWidth, e.oldWidth);
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

### columnLock

Fired when the user lock a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](#configuration-columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnLock" event during initialization

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id", locked: true, width: 100},
                { field: "name", width: 200 },
                { field: "age", width: 150 }
            ],
            columnMenu: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            columnLock: function(e) {
                console.log(e.column.field); // displays the field of the just locked column
            }
        });
    </script>

#### Example - subscribe to the "columnLock" event after initialization

    <div id="treeList"></div>
    <script>
        function treeList_columnLock(e) {
            console.log(e.column.field); // displays the field of the just locked column
        }

        $("#treeList").kendoTreeList({
            columns: [
                { field: "id", locked: true, width: 100},
                { field: "name", width: 200 },
                { field: "age", width: 150 }
            ],
            columnMenu: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("columnLock", treeList_columnLock);
    </script>

### columnUnlock

Fired when the user unlock a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](#configuration-columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnUnlock" event during initialization

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id", locked: true, width: 100},
                { field: "name", width: 200, locked: true },
                { field: "age", width: 150 }
            ],
            columnMenu: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            columnUnlock: function(e) {
                console.log(e.column.field); // displays the field of the just unlocked column
            }
        });
    </script>

#### Example - subscribe to the "columnUnlock" event after initialization

    <div id="treeList"></div>
    <script>
        function treeList_columnUnlock(e) {
            console.log(e.column.field); // displays the field of the just unlocked column
        }

        $("#treeList").kendoTreeList({
            columns: [
                { field: "id", locked: true, width: 100},
                { field: "name", width: 200, locked: true },
                { field: "age", width: 150 }
            ],
            columnMenu: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("columnUnlock", treeList_columnUnlock);
    </script>
