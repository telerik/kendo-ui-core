---
title: Grid
page_title: Configuration, methods and events of Kendo UI Grid
description: Code examples for Grid UI widget configuration. Learn how to use methods and which events to set once the grid UI widget detail is initialized and expanded.
---

# kendo.ui.Grid

Represents the Kendo UI Grid widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### allowCopy `Boolean|Object` *(default: false)*

If set to `true` and selection of the Grid is enabled the user could copy the selection into the clipboard and paste it into Excel or other similar programs that understand TSV/CSV formats. By default allowCopy is disabled and the default format is TSV.
Can be set to a JavaScript object which represents the allowCopy configuration.

#### Example - enable allowCopy

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        selectable: "multiple cell",
        allowCopy: true,
        columns: [
            { field: "productName" },
            { field: "category" }
        ],
        dataSource: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
        ]
    });
    </script>

### allowCopy.delimeter `String|Object` *(default: "\t")*

Changes the delimeter between the items on the same row. Use this option if you want to change the default TSV format to CSV - set the delimeter to comma ','.

#### Example - change the clipboard format from default TSV to CSV

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        selectable: "multiple cell",
        allowCopy: {
            delimeter: ",",
        },
        columns: [
            { field: "productName" },
            { field: "category" }
        ],
        dataSource: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
        ]
    });
    </script>

### altRowTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the alternating table rows. Be default the grid renders a table row (`<tr>`) for every data source item.

> The outermost HTML element in the template must be a table row (`<tr>`). That table row must have the `uid` data attribute set to `#= uid #`. The grid uses the `uid` data attribute to determine the data to which a table row is bound to.
> Set the `class` of the table row to `k-alt` to get the default "alternating" look and feel.

#### Example - specify alternating row template as a function

    <div id="grid"></div>
    <script id="alt-template" type="text/x-kendo-template">
        <tr data-uid="#= uid #">
            <td colspan="2">
                <strong>#: name #</strong>
                <strong>#: age #</strong>
            </td>
        </tr>
    </script>
    <script>
    $("#grid").kendoGrid({
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      altRowTemplate: kendo.template($("#alt-template").html())
    });
    </script>

#### Example - specify alternating row template as a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      dataSource: [ { name: "Jane Doe", age: 30 }, { name: "John Doe", age: 33 } ],
      altRowTemplate: '<tr data-uid="#= uid #"><td colspan="2"><strong>#: name #</strong><strong>#: age #</strong></td></tr>'
    });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.

#### Example - disable automatic binding

    <div id="grid"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    $("#grid").kendoGrid({
      autoBind: false,
      dataSource: dataSource
    });
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### columnResizeHandleWidth `Number` *(default: 3)*

Defines the width of the column resize handle in pixels. Apply a larger value for easier grasping.

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columnResizeHandleWidth: 6
    });
    </script>

### columns `Array`

The configuration of the grid columns. An array of JavaScript objects or strings. A JavaScript objects are interpreted as column configurations. Strings are interpreted as the
[field](#configuration-columns.field) to which the column is bound. The grid will create a column for every item of the array.

> If this setting is **not** specified the grid will create a column for every field of the data item.

#### Example - specify grid columns as array of strings

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: ["name", "age"], // two columns bound to the "name" and "age" fields
      dataSource: [ { name: "Jane", age: 31 }, { name: "John", age: 33 }]
    });
    </script>

#### Example - specify grid columns as array of objects

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [{
        field: "name",// create a column bound to the "name" field
        title: "Name" // set its title to "Name"
      }, {
        field: "age",// create a column bound to the "age" field
        title: "Age" // set its title to "Age"
      }],
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }]
    });
    </script>

### columns.aggregates `Array`

The aggregate(s) which are calculated when the grid is grouped by the columns [field](#configuration-columns.field).
The supported aggregates are "average", "count", "max", "min" and "sum".

#### Example - set column aggregates
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "firstName", groupable: false },
        { field: "lastName" }, /* group by this column to see the footer template */
        { field: "age",
          groupable: false,
          aggregates: [ "count", "min", "max" ],
          groupFooterTemplate: "age total: #: count #, min: #: min #, max: #: max #"
        }
      ],
      groupable: true,
      dataSource: {
        data: [
          { firstName: "Jane", lastName: "Doe", age: 30 },
          { firstName: "John", lastName: "Doe", age: 33 }
        ]
      }
    });
    </script>

> Check [Aggregates](http://demos.telerik.com/kendo-ui/grid/aggregates) for a live demo.

### columns.attributes `Object`

HTML attributes of the table cell (`<td>`) rendered for the column.

> HTML attributes which are JavaScript keywords (e.g. *class*) must be quoted.

#### Example - specify column HTML attributes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        title: "Name",
        attributes: {
          "class": "table-cell",
          style: "text-align: right; font-size: 14px"
        }
      } ],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    </script>

The table cells would look like this: `<td class="table-cell" style="text-align: right; font-size: 14px">...</td>`.

### columns.columns `Array`

The columns which should be rendered as child columns under this group column header.

**Note that group column cannot be data bound and supports limited number of bound column settings - such as title, headerTemplate, locked

#### Example - set column group column for displaying multicolumn headers
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columns: [
        {
            title: "Personal Info",
            columns: [
                { field: "name" },
                { field: "birthdate" }
            ]
        },
        {
            title: "Location",
            columns: [
                { field: "city" },
                { field: "country" }
            ]
        },
        {
            field: "phone"
        }
      ],
      editable: true,
      dataSource: [ { name: "Jane Doe", birthdate: new Date("1995/05/04"), city: "London", country: "UK", phone: "555-444-333" } ]
    });
    </script>

### columns.command `String|Array`

The configuration of the column command(s). If set the column would display a button for every command. Commands can be custom or built-in ("edit" or "destroy").

The "edit" built-in command switches the current table row in edit mode.

The "destroy" built-in command removes the data item to which the current table row is bound.

Custom commands are supported by specifying the [click](#configuration-columns.command.click) option.

> The built-in "edit" and "destroy" commands work *only* if editing is enabled via the [editable](#configuration-editable) option. The "edit" command supports "inline" and "popup" editing modes.

#### Example - set command as a string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: "destroy" } // displays the built-in "destroy" command
      ],
      editable: true,
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

#### Example - set command as array of strings
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: ["edit", "destroy"] } // displays the built-in "edit" and "destroy" commands
      ],
      editable: "inline",
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

#### Example - set command as array of objects
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [
            {
             name: "details",
             click: function(e) {
                // command button click handler
             }
            },
            { name: "destroy" } // built-in "destroy" command
          ]
        }
      ],
      editable: true,
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

### columns.command.name `String`

The name of the command. The built-in commands are "edit" and "destroy". Can be set to a custom value.

#### Example - set the command name
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "edit" }] }
      ],
      editable: "popup",
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

### columns.command.text `String|Object`

The text displayed by the command button and the "cancel", "edit" and "update" texts of the edit command. If not set the [name](#configuration-columns.command.name) option is used as the button text.

#### Example - customize the text of the command
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "destroy", text: "Remove" }] }
      ],
      editable: true,
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

#### Example - customize the "edit", "cancel" and "update" text of the edit command
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: [{ name: "edit",
                      text: { edit: "Custom edit", cancel: "Custom cancel", update: "Custom update" } }] }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: {
        mode: "inline"
      }
    });
    </script>

### columns.command.text.edit `String`

The "edit" text of the edit command.

#### Example - customize the edit text of the edit command
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "edit", text: { edit: "Custom edit"} }] }
      ],
      editable: "inline",
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

### columns.command.text.cancel `String`

The "cancel" text of the edit command.

#### Example - customize the cancel text of the edit command
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "edit", text: { cancel: "Custom cancel"} }] }
      ],
      editable: "inline",
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

### columns.command.text.update `String`

The "update" text of the edit command.

#### Example - customize the update text of the edit command
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "edit", text: { update: "Custom Update"} }] }
      ],
      editable: "inline",
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

### columns.command.className `String`

The CSS class applied to the command button.

#### Example - set the CSS class of the command
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ className: "btn-destroy", name: "destroy", text: "Remove" }] }
      ],
      editable: true,
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>
    <style>
    .btn-destroy {
        color: red;
    }
    </style>

### columns.command.click `Function`

The JavaScript function executed when the user clicks the command button. The function receives a [jQuery Event](http://api.jquery.com/category/events/event-object/) as an argument.

The function context (available via the `this` keyword) will be set to the grid instance.

#### Example - handle the click event of the custom command button
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [ {
            name: "details",
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
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

### columns.editor `Function`

Provides a way to specify a custom editing UI for the column. Use the `container` parameter to create the editing UI.

> The editing UI should contain an element whose `name` HTML attribute is set as the column [field](#configuration-columns.field).

> Validation settings defined in the `model.fields` configuration will **not** be applied automatically. In order the validation to work, **the developer is responsible for attaching the corresponding validation attributes to the editor input** the `data-bind` attribute is whitespace sensitive. In case the custom editor is a widget, the developer should [customize the validation warning tooltip position](/framework/validator/overview#customizing-the-tooltip-position) in order to avoid visual issues.

#### Parameters

##### container `jQuery`

The jQuery object representing the container element.

##### options `Object`

##### options.field `String`

The name of the field to which the column is bound.

##### options.format `String`

The format string of the column specified via the [format](#configuration-columns.format) option.

##### options.model `kendo.data.Model`

The model instance to which the current table row is bound.

##### options.values `Array`

Array of values specified via the [values](#configuration-columns.values) option.

#### Example - create a custom column editor using the Kendo UI AutoComplete

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
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
             { name: "John Doe" }
           ]
         });
        }
      } ],
      editable: true,
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

#### Example - create a custom column editor with validation

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "num",
        editor: function(container, options) {
         //create input element and add the validation attribute
         var input = $('<input name="' + options.field + '" required="required" />');
         //append the editor
         input.appendTo(container);
         //enhance the input into NumericTextBox
         input.kendoNumericTextBox();

         //create tooltipElement element, NOTE: data-for attribute should match editor's name attribute
         var tooltipElement = $('<span class="k-invalid-msg" data-for="' + options.field + '"></span>');
         //append the tooltip element
         tooltipElement.appendTo(container);
       }
      } ],
      editable: true,
      scrollable: false,
      dataSource: {
        data: [ { num: 1 }, { num: 2 } ],
        schema: {
          model: {
            fields: {
              num: { type: "number", validation: { required: true } }
            }
          }
        }
      }
    });
    </script>

> Check [Editing custom editor](http://demos.telerik.com/kendo-ui/grid/editing-custom) for a live demo.

### columns.encoded `Boolean` *(default: true)*

If set to `true` the column value will be HTML-encoded before it is displayed. If set to `false` the column value will be displayed as is. By default the column value is HTML-encoded.

#### Example - prevent HTML encoding

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", encoded: false }
      ],
      dataSource: [ { name: "<strong>Jane Doe</strong>" } ]
    });
    </script>


### columns.field `String`

The field to which the column is bound. The value of this field is displayed in the column's cells during data binding.
Only columns that are bound to a field can be sortable or filterable.
**The field name should be a valid Javascript identifier and should contain no spaces, no special characters, and the first character should be a letter.**

#### Example - specify the column field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        // create a column bound to the "name" field
        { field: "name" },
        // create a column bound to the "age" field
        { field: "age" }
      ],
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }]
    });
    </script>

### columns.filterable `Boolean|Object` *(default: true)*

If set to `true` a filter menu will be displayed for this column when filtering is enabled. If set to `false` the filter menu will not be displayed. By default a filter menu is displayed
for all columns when filtering is enabled via the [filterable](#configuration-filterable) option.

Can be set to a JavaScript object which represents the filter menu configuration.

#### Example - disable filtering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", filterable: false },
        { field: "age" }
      ],
      filterable: true,
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }]
    });
    </script>

### columns.filterable.cell `Object`

Specifies options for the filter header cell when filter mode is set to 'row'.

Can be set to a JavaScript object which represents the filter cell configuration.

#### Example - cell filtering options

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        {
            field: "name",
            filterable: {
                cell: {
                    enabled: true,
                    delay: 1500
                }
            },
        },
        { field: "age" }
      ],
      filterable: {
          mode: "row"
      },
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }]
    });
    </script>

### columns.filterable.cell.dataSource `Object|kendo.data.DataSource`

Specifies custom dataSource for the AutoComplete when type of the column is string.  Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.
If the `dataSource` options is missing the options of the Grid's dataSource will be used.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - custom cell filter autocomplete dataSource

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        {
            field: "name",
            filterable: {
                cell: {
                    dataSource: new kendo.data.DataSource({
                        data: [
                            { someField: "Jane" },
                            { someField: "Jake" },
                            { someField: "John" }
                        ]
                    }),
                    dataTextField: "someField"
                }
            }
        },
        { field: "age" }
      ],
      filterable: {
          mode: "row"
      },
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }]
    });
    </script>

### columns.filterable.cell.dataTextField `String`

Specifies the name of the field which will provide the text representation for the AutoComplete suggestion (when using String type column) when CustomDataSource is provided. By default the name of the field bound to the column will be used.

#### Example - Using custom dataSource and providing dataTextField option

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            dataSource: new kendo.data.DataSource({ data: [
                                { someField: "Jane" },
                                { someField: "Jake" },
                                { someField: "John" }
                            ] }),
                            dataTextField: "someField"
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }] });
    </script>

### columns.filterable.cell.delay `Number` *(default: 200)*

Specifies the delay of the AutoComplete widget which will provide the suggest functionality (when using String type column).

#### Example - Specifying delay option for the AutoComplete widget used to make suggestions while filtering.

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            delay: 1500
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }] });
    </script>

### columns.filterable.cell.inputWidth `Number`

Specifies the width of the input before it is initialized or turned into a widget. Provides convenient way to set the width according to the column width.

#### Example - Specifying inputWidth option for the filter cell of a column

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            inputWidth: 333
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }] });
    </script>

### columns.filterable.cell.suggestionOperator `String` *(default: "startswith")*

Specifies the AutoComplete filter option. Possible values are same as the one for the AutoComplete filter option- "startswith", "endswith", "contains".

> Notice this operator is completely separate from the operator used for filtering on this column - check [operator](#configuration-columns.filterable.cell.operator).

#### Example - Specifying suggestionOperator option for the filter cell of a column

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            suggestionOperator: "contains"
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }] });
    </script>

### columns.filterable.cell.minLength `Number` *(default: 1)*

Specifies the minLength option of the AutoComplete widget when column is of type string.

#### Example - Specifying minLength of the AutoComplete widget when using filter cell.

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            minLength: 3
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }] });
    </script>


### columns.filterable.cell.enabled `Boolean` *(default: true)*

When set to false the Grid will not render the cell filtering widget for that specific column.

#### Example - Disable the cell filtering for a specific column.

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            enabled: false
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }] });
    </script>

### columns.filterable.cell.operator `String` *(default: "eq")*

Specifies the default operator that will be used for the cell filtering.

> If you want to change how the AutoComplete suggestions are filtered use [suggestionOperator](#configuration-columns.filterable.suggestionOperator).

#### Example - Specifying default operator for cell filtering.

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            operator: "neq"
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }] });
    </script>

### columns.filterable.cell.showOperators `Boolean` *(default: true)*

Specifies whether to show or hide the DropDownList with the operators.

#### Example - Hide the operators dropdownlist for cell filtering.

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            showOperators: false,
                            operator: "contains"
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }] });
    </script>

### columns.filterable.cell.template `Function`

JavaScript function which will customize how the input for the filter value is rendered.
The function receives an object argument with two fields:

* **`element`** - the default input inside the filter cell;
* **`dataSource`** - a Kendo UI DataSource instance, which has the same settings as the Grid dataSource, but will only contain data items with unique values for the current column.
This instance is also used by the default AutoComplete widget, which is used inside the filter cell if no template is set. Keep in mind that the passed dataSource instance may still not be
populated at the time the template function is called, if the Grid uses remote binding.

#### Example - Using template for the filter cell

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "color",
                    filterable: {
                        cell: {
                            template: function (args) {
                                // create a DropDownList of unique values (colors)
                                args.element.kendoDropDownList({
                                    dataSource: args.dataSource,
                                    dataTextField: "color",
                                    dataValueField: "color",
                                    valuePrimitive: true
                                });

                                // or

                                // create a ColorPicker
                                // args.element.kendoColorPicker();
                            },
                            showOperators: false
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: [ { color: "#ff0000", size: 30 }, { color: "#000000", size: 33 }] });
    </script>

### columns.filterable.multi `Boolean` *(default: false)*

Use this options to enable the MultiCheck filtering support for that column.

> If you have enabled the columns.multi option and your Grid uses serverPaging (or ServerOperations(true) when using the MVC wrappers) you will need to provide columns.filterable.dataSource. Otherwise, a negative impact on the performance could be observed.

#### Example - enable checkbox filtering support.
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "country",
        filterable: {
            multi:true
        }
      } ],
    filterable: true,
      dataSource: [ { country: "BG" }, { country: "USA" } ]
    });
    </script>

### columns.filterable.dataSource `Object|Array|kendo.data.DataSource`

The dataSource configuration for the items that will be used when [columns.filterable.multi](#configuration-columns.filterable.multi) is enabled.

#### Example - provide custom DataSource for the checkbox filtering.
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "country",
        filterable: {
            multi:true,
            dataSource: [{country: "BG"},{country: "GRM"}, {country: "USA"}]
        }
      } ],
    filterable: true,
      dataSource: [ { country: "BG" }, { country: "USA" } ]
    });
    </script>

### columns.filterable.checkAll `Boolean` *(default: true)*

Controls whether to show or not the checkAll checkbox before the other checkboxes when using checkbox filtering.

#### Example - provide custom DataSource for the FilterMultiCheck filtering.
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "country",
        filterable: {
        multi:true,
        checkAll: false
        }
      } ],
    filterable: true,
      dataSource: [ { country: "BG" }, { country: "USA" } ]
    });
    </script>

### columns.filterable.itemTemplate `Function`

Allows customization on the logic that renderes the checkboxes when using checkbox filtering.

#### Example - provide custom DataSource for the FilterMultiCheck filtering.
     <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            columns: [ {
                field: "country",
                filterable: {
                    multi:true,
                    itemTemplate: function(e) {
                        return "<span><label><span>#= data.country|| data.all #</span><input type='checkbox' name='" + e.field + "' value='#= data.country#'/></label></span>"
                    }
                }
            }],
            filterable: true,
            dataSource: [ { country: "BG" }, { country: "USA" } ]
        });
    </script>

### columns.filterable.search `Boolean` *(default: false)*
Controls whether to show a search box when [checkbox filtering](#configuration-columns.filterable.multi) is enabled.

#### Example - Enable checkbox filter search
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            columns: [{
                field: "country",
                filterable: {
                    multi: true,
                    search: true
                }
            }],
            filterable: true,
            dataSource: [{ country: "BG" }, { country: "USA" }]
        });
    </script>

### columns.filterable.ignoreCase `Boolean` *(default: true)*
Toggles between case-insensitive (default) and case-sensitive [searching](#configuration-columns.filterable.search).

#### Example - Enable checkbox filter search
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            columns: [{
                field: "country",
                filterable: {
                    multi: true,
                    search: true,
                    ignoreCase: true
                }
            }],
            filterable: true,
            dataSource: [{ country: "BG" }, { country: "USA" }]
        });
    </script>

### columns.filterable.ui `String|Function`

The role data attribute of the widget used in the filter menu or a JavaScript function which initializes that widget.

> This feature is not supported for columns which have their [values](#configuration-columns.values) option set and Boolean columns.

> If [filterable.mode](#configuration-filterable.mode) is set to 'row', [columns.filterable.cell.template](#configuration-columns.filterable.cell.template) should be used to customize the input.

#### Example - specify the filter UI as a string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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

> Check [Filter menu customization](http://demos.telerik.com/kendo-ui/grid/filter-menu-customization) for a live demo.

### columns.footerTemplate `String|Function`
The [template](/api/javascript/kendo#methods-template) which renders the footer table cell for the column.

The fields which can be used in the template are:

* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)
* data - provides access to all available aggregates, e.g. `data.fieldName1.sum` or `data.fieldName2.average`

> If the grid is bound using [source binding](/framework/mvvm/bindings/source), it will initially be assigned with an empty [dataSource](/api/javascript/data/datasource) without any aggregates. In order to avoid a JavaScript error for an undefined aggregate when the footer is rendered with the empty dataSource, you should check if the field is defined in the template data before accessing the value. If no groups are specified for the actual dataSource, then you will also need to use the field name to access the aggregate value.

#### Example - specify column footer template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          footerTemplate: "Min: #: min # Max: #: max #"
        }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        aggregate: [
            { field: "age", aggregate: "min" },
            { field: "age", aggregate: "max" }
        ]
      }
    });
    </script>

#### Example - specify footer template when using source binding

    <div data-role="grid" data-bind="source:dataSource"
         data-columns='["category", "name", {"field": "price", "footerTemplate": "Total: #: data.price ? sum: 0 #"}]'></div>
    <script>
      $(function() {
        var viewModel = kendo.observable({
          dataSource: new kendo.data.DataSource({
            data: [
              { category: "Beverages", name: "Chai", price: 18 },
              { category: "Beverages", name: "Chang", price: 19 },
              { category: "Seafood", name: "Konbu", price: 6 }
            ],
            group: [{field: "category"}],
            aggregate: [
              { field: "price", aggregate: "sum" }
            ]
          })
        });
        kendo.bind($("body"), viewModel);
      });
    </script>

#### Example - specify footer template when using source binding and there are no groups

    <div data-role="grid" data-bind="source:dataSource"
         data-columns='["category", "name", {"field": "price", "footerTemplate": "Total: #: data.price ? data.price.sum: 0 #"}]'></div>
    <script>
      $(function() {
        var viewModel = kendo.observable({
          dataSource: new kendo.data.DataSource({
            data: [
              { category: "Beverages", name: "Chai", price: 18 },
              { category: "Beverages", name: "Chang", price: 19 },
              { category: "Seafood", name: "Konbu", price: 6 }
            ],
            aggregate: [
              { field: "price", aggregate: "sum" }
            ]
          })
        });
        kendo.bind($("body"), viewModel);
      });
    </script>

### columns.format `String`

The format that is applied to the value before it is displayed. Takes the form "{0:format}" where "format" is a [standard number format](/api/javascript/kendo#standard-number-formats),
[custom number format](/api/javascript/kendo#standard-number-formats), [standard date format](/api/javascript/kendo#standard-date-formats) or a [custom date format](/api/javascript/kendo#custom-date-formats).

> The [kendo.format](/api/javascript/kendo#methods-format) function is used to format the value.

#### Example - specify the column format string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "date",
        format: "{0: yyyy-MM-dd HH:mm:ss}"
      }, {
        field: "number",
        format: "{0:c}"
      } ],
      filterable: true,
      dataSource: [ { date: new Date(), number: 3.1415 } ]
    });
    </script>

### columns.groupable `Boolean` *(default: true)*

If set to false the column will not be groupable (requires Grid groupable property to be enabled). By default all columns are groupable.

#### Example - disable grouping for individual column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      groupable: true,
      columns: [
        { field: "name", groupable: false },
        { field: "age"}
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 30 }
        ]
      }
    });
    </script>

### columns.groupHeaderTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the group header when the grid is grouped by the column [field](#configuration-columns.field). By default the name of the field
and the current group value is displayed.

The fields which can be used in the template are:

* value - the current group value
* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)
* aggregates - all of the aggregate (if specified) values for the current group

#### Example - set the group header template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupHeaderTemplate: "Age: #= value # total: #= count #"
        }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 30 }
        ],
        group: { field: "age", aggregates: [ { field: "age", aggregate: "count" }] }
      }
    });
    </script>

### columns.groupFooterTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the group footer when the grid is grouped by the column field. By default the group footer is not displayed.

The fields which can be used in the template are:

* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)

#### Example - set the group header template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupFooterTemplate: "Total: #= count #"
        }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 30 }
        ],
        group: { field: "age", aggregates: [ { field: "age", aggregate: "count" }] }
      }
    });
    </script>

### columns.headerAttributes `Object`

HTML attributes of the column header. The grid renders a table header cell (`<th>`) for every column. The `headerAttributes` option can be used to set the HTML attributes of that `th`.

> HTML attributes which are JavaScript keywords (e.g. *class*) must be quoted.

#### Example - set the column header HTML attributes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [{
        field: "name",
        headerAttributes: {
          "class": "table-header-cell",
          style: "text-align: right; font-size: 14px"
        }
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

The table header cell will look like this: `<th class="table-header-cell" style="text-align: right; font-size: 14px">name</th>`.

### columns.headerTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the column header content. By default the value of the [title](#configuration-columns.title) column option
is displayed in the column header cell.

> If sorting is enabled, the column header content will be wrapped in a `<a>` element. As a result the template **must** contain only inline elements.

#### Example - column header template as a string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        headerTemplate: '<input type="checkbox" id="check-all" /><label for="check-all">Check All</label>'
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

#### Example - column header template as a Kendo UI template function with conditional logic
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        headerTemplate: kendo.template('# if (true) { # <input type="checkbox" id="check-all" /><label for="check-all">Check All</label> # } else { # this will never be displayed # } #')
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

### columns.hidden `Boolean` *(default: false)*

If set to `true` the column will not be displayed in the grid. By default all columns are displayed.

#### Example - hide columns
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { hidden: true, field: "id" },
        { field: "name" }
      ],
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.locked `Boolean` *(default: false)*

If set to `true` the column will be displayed as locked in the grid. Also see [Frozen Columns](/web/grid/walkthrough#frozen-columns-locked-columns).

> Row template and detail features are not supported in combination with column locking.

#### Example - locked columns
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { locked: true, field: "id", width:200 },
        { field: "name", width:800 }
      ],
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.lockable `Boolean` *(default: true)*

If set to `false` the column will remain in the side of the grid into which its own locked configuration placed it.

> This option is meaningful when the grid has columns which are configured with a [locked](#configuration-columns.locked) value. Setting it explicitly to `false` will
prevent the user from locking or unlocking this column using the user interface.

#### Example - lockable columns
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { locked: true, field: "id", lockable: false, width:250 },
        { locked: true, field: "age", width:250 },
        { field: "name", width:250 },
        { field: "city", lockable: false, width:250 }
      ],
      dataSource: [
          { id: 1, name: "Jane Doe", age: 31, city: "Boston" },
          { id: 2, name: "John Doe", age: 55, city: "New York" }
      ]
    });
    </script>

### columns.minScreenWidth `Number`

The pixel screen width below which the column will be hidden. The setting takes precedence over the [`hidden`](/api/javascript/ui/grid#configuration-columns.hidden) setting,
so the two should not be used at the same time.

#### Example - lockable columns
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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

If set to `true` the user can click the column header and sort the grid by the column [field](#configuration-columns.field) when sorting is enabled. If set to `false` sorting will
be disabled for this column. By default all columns are sortable if sorting is enabled via the [sortable](#configuration-sortable) option.

#### Example - disable sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { sortable: false, field: "id" },
        { field: "name" }
      ],
      sortable: true,
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.sortable.compare `Function`

A JavaScript function which is used to compare the values. It has the same signature as the [compare function accepted by Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

The basic function implementation is as follows (pseudo-code):
```pseudo
    function compare(a, b, descending) {
      if (a is less than b by some ordering criterion) {
        return -1;
      }

      if (a is greater than b by the ordering criterion) {
        return 1;
      }

      // a must be equal to b
      return 0;
    }
```

One notable exception is that we also supply a third parameter that indicates the sort direction (true for descending).
See [How-to: Stable Sort in Chrome](/web/grid/how-to/stable-sort-chrome) for more details on how this can be useful.

#### Example - define custom compare function

    <div id="grid"></div>
    <script>
        var numbers = {
            "one"  : 1,
            "two"  : 2,
            "three": 3
        };

        var dataSource = new kendo.data.DataSource({
            data: [
                { id: 1, item: "two" },
                { id: 2, item: "one" },
                { id: 3, item: "three" }
            ]
        });

        $("#grid").kendoGrid({
            dataSource: dataSource,
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

The [template](/api/javascript/kendo#methods-template) which renders the column content. The grid renders table rows (`<tr>`) which represent the data source items.
Each table row consists of table cells (`<td>`) which represent the grid columns. By default the HTML-encoded value of the [field](#configuration-columns.field) is displayed in the column.

> Use the `template` to customize the way the column displays its value.

#### Example - set the template as a string (wrap the column value in HTML)

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        template: "<strong>#: name # </strong>"
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

#### Example - set the template as a function returned by kendo.template

    <div id="grid"></div>
    <script id="name-template" type="text/x-kendo-template">
      <strong>#: name #</strong>
    </script>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        template: kendo.template($("#name-template").html())
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

#### Example - set the template as a function which returns a string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        template: function(dataItem) {
          return "<strong>" + kendo.htmlEncode(dataItem.name) + "</strong>";
        }
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

### columns.title `String`

The text that is displayed in the column header cell. If not set the [field](#configuration-columns.field) is used.

#### Example - set the title of the column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ { field: "name", title: "Name" } ],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

### columns.width `String|Number`

The width of the column. Numeric values are treated as pixels. **For more important information, please refer to [Column Widths](/web/grid/walkthrough#column-widths)**.

#### Example - set the column width as a string
     <div id="grid"></div>
     <script>
     $("#grid").kendoGrid({
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
     <div id="grid"></div>
     <script>
     $("#grid").kendoGrid({
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

### columns.values `Array`

An array of values that will be displayed instead of the bound value. Each item in the array must have a `text` and `value` fields.

> Use the `values` option to display user-friendly text instead of database values.

#### Example - specify column values

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
          { text: "Beverages", value: 1 },
          { text: "Food", value: 2 }
        ] }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ]
    });
    </script>

This example displays "Beverages" and "Food" in the "category" column instead of "1" and "2".

> Check [ForeignKey column](http://demos.telerik.com/kendo-ui/grid/foreignkeycolumn) for a live demo.

### columns.menu `Boolean`

If set to `true` the column will be visible in the grid column menu. By default the column menu includes all data-bound columns (ones that have their [field](#configuration-columns.field) set).

#### Example - hide a column from the column menu
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", menu: false },
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu `Boolean|Object` *(default: false)*

If set to `true` the grid will display the column menu when the user clicks the chevron icon in the column headers. The column menu allows the user to show and hide columns, filter and sort (if filtering and sorting are enabled).
By default the column menu is not enabled.

Can be set to a JavaScript object which represents the column menu configuration.

#### Example - enable the column menu

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

> Check [Column menu](http://demos.telerik.com/kendo-ui/grid/column-menu) for a live demo.

### columnMenu.columns `Boolean` *(default: true)*

If set to `true` the column menu would allow the user to select (show and hide) grid columns. By default the column menu allows column selection.

#### Example - disable column selection

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        columns: false
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.filterable `Boolean` *(default: true)*

If set to `true` the column menu would allow the user to filter the grid. By default the column menu allows the user to filter if filtering is enabled via the [filterable](#configuration-filterable).

#### Example - disable column menu filtering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        filterable: false
      },
      filterable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.sortable `Boolean` *(default: true)*

If set to `true` the column menu would allow the user to sort the grid by the column field. By default the column menu allows the user to sort if sorting is enabled via the [sortable](#configuration-sortable) option.

> If this option is set to `false` the user could still sort by clicking the column header cell.

#### Example - disable column menu sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        sortable: false
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages `Object`

The text messages displayed in the column menu. Use it to customize or localize the column menu messages.

#### Example - customize column menu messages

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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
      sortable: true,
      filterable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.columns `String` *(default: "Columns")*

The text message displayed for the column selection menu item.

#### Example - set the column selection message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          columns: "Choose columns"
        }
      },
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.filter `String` *(default: "Filter")*

The text message displayed for the filter menu item.

#### Example - set the filter message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          filter: "Apply filter",
        }
      },
      filterable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.sortAscending `String` *(default: "Sort Ascending")*

The text message displayed for the menu item which performs ascending sort.

#### Example - set the sort ascending message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          sortAscending: "Sort (asc)",
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.sortDescending `String` *(default: "Sort Descending")*

The text message displayed for the menu item which performs descending sort.

#### Example - set the sort descending message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          sortDescending: "Sort (desc)",
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.settings `String` *(default: "Column Settings")*

The text message displayed in the menu header (available in mobile mode only).

#### Example - mobile column menu header

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          settings: "Column Options",
        }
      },
      mobile: "phone",
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.done `String` *(default: "Done")*

The text message displayed in the menu header button (available in mobile mode only).

#### Example - mobile column menu header button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          done: "Ok",
        }
      },
      mobile: "phone",
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.lock `String` *(default: "Lock")*

The text message displayed in the column menu for locking a column.

#### Example - column menu lock button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", lockable: true },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          lock: "Pin this column"
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.unlock `String` *(default: "Unlock")*

The text message displayed in the column menu for unlocking a column.

#### Example - column menu unlock button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", lockable: true },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          unlock: "Unpin this column"
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used render table rows. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <div id="grid"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      },
      pageSize: 10
    });
    $("#grid").kendoGrid({
      dataSource: dataSource,
      pageable: true
    });
    </script>

> Check [Binding to local data](http://demos.telerik.com/kendo-ui/grid/local-data-binding) and [Binding to remote data](http://demos.telerik.com/kendo-ui/grid/remote-data-binding) for live demos.

### detailTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the detail rows.
Check [Detail Template](http://demos.telerik.com/kendo-ui/grid/detailtemplate) for a live demo.

> The detail template content cannot be wider than the total width of all master columns, unless the detail template is scrollable.

#### Example - specify detail template as a function
    <script id="detail-template">
      <div>
        Name: #: name #
      </div>
      <div>
        Age: #: age #
      </div>
    </script>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: kendo.template($("#detail-template").html())
    });
    </script>

#### Example - specify detail template as a string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    </script>

### editable `Boolean|Object` *(default: false)*

If set to `true` the user would be able to edit the data to which the grid is bound. By default editing is disabled.

Can be set to a string ("inline", "incell" or "popup") to specify the editing mode. The default editing mode is "incell".

Can be set to a JavaScript object which represents the editing configuration.

> The "inline" and "popup" editing modes are triggered by the "edit" column command. Thus it is required to have a column with an "edit" command.

#### Example - enable editing
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      editable: true
    });
    </script>

#### Example - enable popup editing
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      editable: "popup"
    });
    </script>

> Check [Batch editing](http://demos.telerik.com/kendo-ui/grid/editing), [Inline editing](http://demos.telerik.com/kendo-ui/grid/editing-inline) and [Popup editing](http://demos.telerik.com/kendo-ui/grid/editing-popup) for live demos.

### editable.confirmation `Boolean|String|Function` *(default: true)*

If set to `true` the grid will display a confirmation dialog when the user clicks the "destroy" command button.

Can be set to a string which will be used as the confirmation text.

Can be set to a function which will be called, passing the model instance, to return the confirmation text.

#### Example - disable delete confirmation
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       editable: {
         confirmation: false
       }
    });
    </script>

#### Example - set delete confirmation text
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       editable: {
         confirmation: "Are you sure that you want to delete this record?"
       }
    });
    </script>

#### Example - set delete confirmation as function

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       editable: {
         confirmation: function(e) {
             return  "Are you sure that you want to delete record for " + e.name + "?";
         }
       }
    });
    </script>

### editable.cancelDelete `String` *(default: "Cancel")*

If confirmation is enabled the grid will display a confirmation dialog when the user clicks the "destroy" command button.
If the grid is in mobile mode this text will be used for the cancel button.

#### Example - change the cancel delete button text
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       mobile: "phone",
       editable: {
         confirmation: true,
         cancelDelete: "No"
       }
    });
    </script>

### editable.confirmDelete `String` *(default: "Delete")*

If confirmation is enabled the grid will display a confirmation dialog when the user clicks the "destroy" command button.
If the grid is in mobile mode this text will be used for the confirm button.

#### Example - change the confirm delete button text
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       mobile: "phone",
       editable: {
         confirmation: true,
         confirmDelete: "Yes"
       }
    });
    </script>

### editable.createAt `String` *(default: "top")*

The position at which new data items are inserted in the grid. Must be set to either "top" or "bottom". By default new data items are inserted at the top.

#### Example - insert new data items at the bottom

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      editable: {
        createAt: "bottom"
      },
      toolbar: ["create"]
    });
    </script>

### editable.destroy `Boolean` *(default: true)*

If set to `true` the user can delete data items from the grid by clicking the "destroy" command button. Deleting is enabled by default.

#### Example - disable deleting
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      editable: {
        destroy: false
      },
      toolbar: ["create"]
    });
    </script>

### editable.mode `String` *(default: "incell")*

The editing mode to use. The supported editing modes are "incell", "inline" and "popup".

> The "inline" and "popup" editing modes are triggered by the "edit" column command. Thus it is required to have a column with an "edit" command.

#### Example - specify inline editing mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: {
        mode: "inline"
      }
    });
    </script>

### editable.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders popup editor.

The template should contain elements whose `name` HTML attributes are set as the editable fields. This is how the grid will know
which field to update. The other option is to use [MVVM](/framework/mvvm/overview) bindings in order to bind HTML elements to data item fields.

> Use the `role` data attribute to initialize Kendo UI widgets in the template. Check [data attribute initialization](/framework/data-attribute-initialization) for more info.

#### Example - customize the popup editor

    <script id="popup-editor" type="text/x-kendo-template">
      <h3>Edit Person</h3>
      <p>
        <label>Name:<input name="name" /></label>
      </p>
      <p>
        <label>Age: <input data-role="numerictextbox" name="age" /></label>
      </p>
    </script>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: {
        mode: "popup",
        template: kendo.template($("#popup-editor").html())
      }
    });
    </script>

#### Example - using MVVM in the popup editor template

    <script id="popup-editor" type="text/x-kendo-template">
      <h3>Edit Person</h3>
      <p>
        <label>Name:<input data-bind="valueu:name" /></label>
      </p>
      <p>
        <label>Age:<input data-role="numerictextbox" data-bind="value:age" /></label>
      </p>
    </script>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: {
        mode: "popup",
        template: kendo.template($("#popup-editor").html())
      }
    });
    </script>

### editable.update `Boolean` *(default: true)*

If set to `true` the user can edit data items when editing is enabled.

#### Example - enable only deleting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
      ],
      editable: {
        mode: "incell",
        update: false
      }
    });
    </script>

### editable.window `Object`

Configures the Kendo UI Window instance, which is used when the Grid edit mode is `"popup"`. The configuration is optional.

For more information, please refer to the [Window configuration API](/api/javascript/ui/window).

#### Example - Grid popup Window configuration

    <div id="grid"></div>
    <script>

    function myOpenEventHandler(e) {
        // ...
    }

    $("#grid").kendoGrid({
      editable: {
        mode: "popup",
        window: {
            title: "My Custom Title",
            animation: false,
            open: myOpenEventHandler
        }
      }
    });
    </script>

### excel `Object`

Configures the Kendo UI Grid Excel export settings.

### excel.allPages `Boolean` *(default: false)*

If set to `true` the grid will export all pages of data. By default the grid exports only the current page.

> If the grid is bound to remote data and `allPages` is set to `true` it will request **all** data items from the remote service. Be careful if you have a lot of data.

#### Example - export all pages of data

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            allPages: true
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### excel.fileName `String` *(default: "Export.xslx")*

Specifies the file name of the exported Excel file.

#### Example - set the default Excel file name

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            fileName: "Products.xlsx"
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### excel.filterable `Boolean` *(default: false)*

Enables or disables column filtering in the Excel file. Not to be mistaken with the grid filtering feature.

#### Example - enable filtering in the output Excel file

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            filterable: false
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### excel.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](#configuration-excel.proxyURL) even if the browser supports saving files locally.

### excel.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

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
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            proxyURL: "/save"
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### filterable `Boolean|Object` *(default: false)*

If set to `true` the user can filter the data source using the grid filter menu. Filtering is disabled by default.

Can be set to a JavaScript object which represents the filter menu configuration.

#### Example - enable filtering

        <div id="grid"></div>
        <script>
            $("#grid").kendoGrid({
                columns: [
                    { field: "name" },
                    { field: "age" }
                ],
                filterable: true,
                dataSource: [
                    { name: "Jane Doe", age: 30 },
                    { name: "John Doe", age: 33 }
                ]
          });
        </script>

### filterable.extra `Boolean` *(default: true)*

If set to `true` the filter menu allows the user to input a second criterion.

#### Example - disable the extra filtering criteria

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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
    $("#grid").kendoGrid({
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
    $("#grid").kendoGrid({
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
    $("#grid").kendoGrid({
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
    $("#grid").kendoGrid({
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
    $("#grid").kendoGrid({
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
    $("#grid").kendoGrid({
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
    $("#grid").kendoGrid({
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
    $("#grid").kendoGrid({
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
    $("#grid").kendoGrid({
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
    $("#grid").kendoGrid({
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
    $("#grid").kendoGrid({
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
          operator: "Choose operator"
        }
      }
    });
    </script>

### filterable.messages.value `String` *(default: "Value")*

The text of the value item in filter menu (available in mobile mode only).

#### Example - set the text of value item

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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
          value: "Choose value"
        }
      }
    });
    </script>

### filterable.messages.checkAll `String` *(default :"Select All")*

The label used for the check-all checkbox.

#### Example - change the checkAll default message.
     <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [{
            field: "country",
            filterable: {
                multi:true,
                messages: {
                    checkAll: "Do select all"
                },
                itemTemplate: function(e) {
                    return "<span><label><span>#= data.country|| data.all #</span><input type='checkbox' name='" + e.field + "' value='#= data.country#'/></label></span>"
                }
            }
        }],
        filterable: true,
        dataSource: [ { country: "BG" }, { country: "USA" } ]
      });
    </script>


### filterable.operators `Object`

The text of the filter operators displayed in the filter menu.

> If `operators` are defined manually, then the default messages will be overridden too. If you would like to control the `operators` and still use the default messages,
then you will need to retrieve them from the `FilterCell` prototype - `kendo.ui.FilterCell.fn.options.operators.{type}`, where type can be "string", "date", "number" and "enums".

### filterable.operators.string `Object`

The texts of the filter operators displayed for columns bound to string fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

#### Example - set string operators
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            eq: "Equal to",
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

In this example only two operators would be displayed in the DropDownList - "Equal to" and "Not equal to".

### filterable.operators.string.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

#### Example - set the string "equal" operator
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            eq: "Equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.string.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

#### Example - set the string "not equal" operator
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.string.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.

#### Example - set the string "isnull" operator
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            isnull: "Null"
          }
        }
      }
    });
    </script>

### filterable.operators.string.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.

#### Example - set the string "isnotnull" operator
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            isnotnull: "Not null"
          }
        }
      }
    });
    </script>

### filterable.operators.string.isempty `String` *(default: "Is empty")*

The text of the "isempty" filter operator.

#### Example - set the string "isempty" operator
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            isempty: "Empty"
          }
        }
      }
    });
    </script>

### filterable.operators.string.isnotempty `String` *(default: "Is not empty")*

The text of the "isnotempty" filter operator.

#### Example - set the string "isnotempty" operator
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            isnotempty: "Not empty"
          }
        }
      }
    });
    </script>

### filterable.operators.string.startswith `String` *(default: "Starts with")*

The text of the "starts with" filter operator.

#### Example - set the string "starts with" operator
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            startswith: "Starts"
          }
        }
      }
    });
    </script>


### filterable.operators.string.contains `String` *(default: "Contains")*

The text of the "contains" filter operator.

#### Example - set the string "contains" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            contains: "Contains"
          }
        }
      }
    });
    </script>

### filterable.operators.string.doesnotcontain `String` *(default: "Does not contain")*

The text of the "does not contain" filter operator.

#### Example - set the string "does not contain" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            doesnotcontain: "Doesn't contain"
          }
        }
      }
    });
    </script>


### filterable.operators.string.endswith `String` *(default: "Ends with")*

The text of the "ends with" filter operator.

#### Example - set the string "ends with" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            endswith: "Ends"
          }
        }
      }
    });
    </script>

### filterable.operators.number `Object`

The texts of the filter operators displayed for columns bound to number fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

#### Example - set number operators

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            eq: "Equal to",
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

In this example only two operators would be displayed in the DropDownList - "Equal to" and "Not equal to".

### filterable.operators.number.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

#### Example - set the number "equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            eq: "Equal to"
          }
        }
      }
    });
    </script>


### filterable.operators.number.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

#### Example - set the number "not equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.number.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.

#### Example - set the number "isnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            isnull: "Null"
          }
        }
      }
    });
    </script>

### filterable.operators.number.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.

#### Example - set the number "isnotnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            isnotnull: "Not null"
          }
        }
      }
    });
    </script>

### filterable.operators.number.gte `String` *(default: "Is greater than or equal to")*

The text of the "greater than or equal" filter operator.

#### Example - set the number "greater than or equal to" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            gte: "Greater than or equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.number.gt `String` *(default: "Is greater than")*

The text of the "greater than" filter operator.

#### Example - set the number "greater than" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            gt: "Greater than"
          }
        }
      }
    });
    </script>

### filterable.operators.number.lte `String` *(default: "Is less than or equal to")*

The text of the "less than or equal" filter operator.

#### Example - set the number "less than or equal to" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            lte: "Less than or equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.number.lt `String` *(default: "Is less than")*

The text of the "less than" filter operator.

#### Example - set the number "less than" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            lt: "Less than"
          }
        }
      }
    });
    </script>

### filterable.operators.date `Object`

The texts of the filter operators displayed for columns bound to date fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

#### Example - set date operators
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            gt: "After",
            lt: "Before"
          }
        }
      }
    });
    </script>

In this example only two operators would be displayed in the DropDownList - "Equal to" and "Not equal to".

### filterable.operators.date.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

#### Example - set the date "equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            eq: "Equal"
          }
        }
      }
    });
    </script>

### filterable.operators.date.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

#### Example - set the date "not equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            neq: "Not equal"
          }
        }
      }
    });
    </script>

### filterable.operators.date.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.

#### Example - set the date "isnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            isnull: "Null"
          }
        }
      }
    });
    </script>

### filterable.operators.date.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.

#### Example - set the date "isnotnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            isnotnull: "Null"
          }
        }
      }
    });
    </script>

### filterable.operators.date.gte `String` *(default: "Is after or equal to")*

The text of the "greater than or equal" filter operator.

#### Example - set the date "greater than or equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            gte: "After or equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.date.gt `String` *(default: "Is after")*

The text of the "greater than" filter operator.

#### Example - set the date "greater than" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            gt: "After"
          }
        }
      }
    });
    </script>

### filterable.operators.date.lte `String` *(default: "Is before or equal to")*

The text of the "less than or equal" filter operator.

#### Example - set the date "less than or equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            lte: "Before or equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.date.lt `String` *(default: "Is before")*

The text of the "less than" filter operator.

#### Example - set the date "less than" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            lt: "Before"
          }
        }
      }
    });
    </script>


### filterable.operators.enums `Object`

The texts of the filter operators displayed for columns which have their [values](#configuration-columns.values) option set.

> Omitting an operator will exclude it from the DropDownList with the available operators.

#### Example - set enum operators

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            {text: "Beverages", value: 1 },
            {text: "Food", value: 2 }
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        operators: {
          enums: {
            eq: "Equal to",
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.enums.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

#### Example - set the enum "equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            {text: "Beverages", value: 1 },
            {text: "Food", value: 2 }
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        operators: {
          enums: {
            eq: "Equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.enums.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

#### Example - set the enum "not equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            {text: "Beverages", value: 1 },
            {text: "Food", value: 2 }
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        operators: {
          enums: {
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.enums.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.

#### Example - set the enum "isnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            {text: "Beverages", value: 1 },
            {text: "Food", value: 2 }
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        operators: {
          enums: {
            isnull: "Null"
          }
        }
      }
    });
    </script>

### filterable.operators.enums.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.

#### Example - set the enum "isnotnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            {text: "Beverages", value: 1 },
            {text: "Food", value: 2 }
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        operators: {
          enums: {
            isnotnull: "Not null"
          }
        }
      }
    });
    </script>

### filterable.mode `String` *(default: "menu")*

If set to `row` the user would be able to filter via extra row added below the headers. By default filtering is using the `menu` mode.

Can also be set to the following string values:

- "row" - the user can filter via extra row within the header.
- "menu" - the user can filter via the menu after clicking the filter icon.
- "menu, row" - the user can filter with both modes above enabled.

#### Example - set mode option to use both "menu" and "row" modes simultaneously

        <div id="grid"></div>
        <script>
            $("#grid").kendoGrid({
                columns: [
                    { field: "name" },
                    { field: "age" }
                ],
                filterable: {
                    mode: "menu, row"
                },
                dataSource: [
                    { name: "Jane Doe", age: 30 },
                    { name: "John Doe", age: 33 }
                ]
          });
        </script>

### groupable `Boolean|Object` *(default: false)*

If set to `true` the user could group the grid by dragging the column header cells. By default grouping is disabled.

Can be set to a JavaScript object which represents the grouping configuration.

#### Example - enable grouping

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      groupable: true
    });
    </script>

> Check [Basic usage](http://demos.telerik.com/kendo-ui/grid/index) for a live demo.

### groupable.enabled `Boolean` *(default: true)*

When set  to false grouping is considered disabled.

### groupable.showFooter `Boolean` *(default: false)*

When enabled the group footer rows will remain visible when the corresponding group is collapsed.

#### Example - show footer when groups are collapsed

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName", groupFooterTemplate: "this is a footer" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Beer", category: "Beverages" },
        { productName: "Cheese", category: "Food" },
      ],
      groupable: {
        showFooter: true
      }
    });
    </script>

### groupable.messages `Object`

The text messages displayed during grouping.

### groupable.messages.empty `String` *(default: "Drag a column header and drop it here to group by that column")*

The text displayed in the grouping drop area.

#### Example - set the "empty" grouping message
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      groupable: {
        messages: {
          empty: "Drop columns here"
        }
      }
    });
    </script>

### height `Number|String`

The height of the grid. Numeric values are treated as pixels.

#### Example - set the height as a number

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      height: 100
    });
    </script>

#### Example - set the height as a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      height: "10em"
    });
    </script>

### messages `Object`

Defines the text of the command buttons that are shown within the Grid. Used primarily for localization.

#### Example - change the messages

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          cancel: "Cancel changes",
          canceledit: "Cancel",
          create: "Add new record",
          destroy: "Delete",
          edit: "Edit",
          save: "Save changes",
          select: "Select",
          update: "Update"
        }
      }
    });
    </script>

### messages.commands `Object`

Defines the text of the command buttons that are shown within the Grid. Used primarily for localization.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          cancel: "Cancel changes",
          canceledit: "Cancel",
          create: "Add new record",
          destroy: "Delete",
          edit: "Edit",
          save: "Save changes",
          select: "Select",
          update: "Update"
        }
      }
    });
    </script>

### messages.commands.cancel `String`

Defines the text of the "Cancel Changes" button located in the toolbar of the widget.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          cancel: "Cancel changes"
        }
      }
    });
    </script>

### messages.commands.canceledit `String`

Defines the text of the "Cancel" button that is rendered in `inline` or `popup` editing mode.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          canceledit: "Cancel"
        }
      }
    });
    </script>

### messages.commands.create `String`

Defines the text of the "Add new record" button located in the toolbar of the widget.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          create: "Add new record"
        }
      }
    });
    </script>

### messages.commands.destroy `String`

Defines the text of the "Delete" button rendered in `inline` or `popup` editing mode.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          destroy: "Delete"
        }
      }
    });
    </script>

### messages.commands.edit `String`

Defines the text of the "Edit" button that is rendered in `inline` or `popup` editing mode.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          edit: "Edit"
        }
      }
    });
    </script>

### messages.commands.excel `String`

Defines the text of the "Export to Excel" button of the grid toolbar.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: [ "excel" ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      messages: {
        commands: {
          excel: "Excel export"
        }
      }
    });
    </script>

### messages.commands.save `String`

Defines the text of the "Save Changes" button located in the toolbar of the widget.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          save: "Save changes"
        }
      }
    });
    </script>

### messages.commands.update `String`

Defines the text of the "Update" button that is rendered in `inline` or `popup` editing mode.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          update: "Update"
        }
      }
    });
    </script>

### messages.noRecords `String`

Defines the text of the "noRecords" option that is rendered when no records are available in current view. The "noRecords" options should be set to `true`.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        page: 2,
        pageSize: 10
      },
      noRecords: true,
      height: 200,
      messages: {
        noRecords: "There is no data on current page"
      }
    });
    </script>

### mobile `Boolean|String` *(default: false)*

If set to `true` and the grid is viewed on mobile browser it will use adaptive rendering.

Can be set to a string `phone` or `tablet` which will force the widget to use adaptive rendering regardless of browser type.
The grid uses same layout for both `phone` and `tablet`.

#### Example - enable adaptive rendering auto detect
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       filterable: true,
       columnMenu: true,
       mobile: true
    });
    </script>

#### Example - force adaptive rendering
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       filterable: true,
       columnMenu: true,
       mobile: "phone"
    });
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true` the use could navigate the widget using the keyboard navigation. By default keyboard navigation is disabled.

#### Example - enable keyboard navigation

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      navigatable: true,
      selectable: true
    });
    </script>

> Check [Keyboard navigation](http://demos.telerik.com/kendo-ui/grid/keyboard-navigation) for a live demo.

### noRecords `Boolean|Object` *(default: false)*

If set to `true` and current view contains no records, message similar to "No records available" will be displayed. By default this option is disabled.

#### Example - enable noRecords message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      noRecords: true,
      dataSource: []
    });
    </script>

### noRecords.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which is rendered when current view contains no records.

#### Example - customize the noRecords message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      pageable: true,
      noRecords: {
        template: "No data available on current page. Current page is: #=this.dataSource.page()#"
      },
      dataSource: {
        data: [{name: "John", age: 29}],
        page: 2,
        pageSize: 10
      }
    });
    </script>

### pageable `Boolean|Object` *(default: false)*

If set to `true` the grid will display a pager. By default paging is disabled.

Can be set to a JavaScript object which represents the pager configuration.

#### Example - enable paging

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2
      }
    });
    </script>

### pageable.pageSize `Number`

The number of data items which will be displayed in the grid.

#### Example - set page size

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2
      }
    });
    </script>

### pageable.previousNext `Boolean` *(default: true)*

If set to `true` the pager will display buttons for going to the first, previous, next and last pages. By default those buttons are displayed.

#### Example - hide the first, previous, next, and last buttons
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        previousNext: false
      }
    });
    </script>

### pageable.numeric `Boolean` *(default: true)*

If set to `true` the pager will display buttons for navigating to specific pages. By default those buttons are displayed.

Using `pageable.numeric` and [`pageable.input`](#configuration-pageable.input) at the same time is not recommended.

#### Example - hide the numeric pager buttons

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        numeric: false
      }
    });
    </script>

### pageable.buttonCount `Number` *(default: 10)*

The maximum number of buttons displayed in the numeric pager. The pager will display ellipsis (...) if there are more pages than the specified number.

#### Example - set pager button count

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        buttonCount: 1
      }
    });
    </script>

### pageable.input `Boolean` *(default: false)*

If set to `true` the pager will display an input element which allows the user to type a specific page number. By default the page input is not displayed.

Using `pageable.input` and [`pageable.numeric`](#configuration-pageable.numeric) at the same time is not recommended.

#### Example - show the pager input

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSizes: true
      }
    });
    </script>

#### Example - specify the page sizes as array

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: {
        data: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
        ],
        pageSize: 1
      },
      pageable: {
        pageSizes: [2, 3, 4, "all"],
        numeric: false
      }
    });
    </script>

### pageable.refresh `Boolean` *(default: false)*

If set to `true` the pager will display the refresh button. Clicking the refresh button will refresh the grid. By default the refresh button is not displayed.

#### Example - show the refresh button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        refresh: true
      }
    });
    </script>

### pageable.info `Boolean` *(default: true)*

If set to `true` the pager will display information about the current page and total number of data items. By default the paging information is displayed.

##### Example - hide the paging information

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        info: false
      }
    });
    </script>

### pageable.messages `Object`

The text messages displayed in pager. Use this option to customize or localize the pager messages.

### pageable.messages.display `String` *(default: "{0} - {1} of {2} items")*,

The pager info text. Uses [kendo.format](/api/javascript/kendo#methods-format).

Contains three placeholders:
- {0} - the first data item index
- {1} - the last data item index
- {2} - the total number of data items

#### Example - set the "display" pager message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        messages: {
          display: "Showing {0}-{1} from {2} data items"
        }
      }
    });
    </script>

### pageable.messages.empty `String` *(default: "No items to display")*,

The text displayed when the grid is empty.

#### Example - set the "empty" pager message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
      ],
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
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

The label displayed before the pager input. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one optional placeholder {0} which represents the total number of pages.

#### Example - set the label after the pager input

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        pageSizes: true,
        messages: {
          itemsPerPage: "data items per page"
        }
      }
    });
    </script>

### pageable.messages.first `String` *(default: "Go to the first page")*,

The tooltip of the button which goes to the first page.

#### Example - set the Tooltip of the first page button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        refresh: true,
        messages: {
          refresh: "Refresh the grid"
        }
      }
    });
    </script>

### pageable.messages.morePages `String` *(default: "More pages")*,

The Tooltip of the ellipsis ("...") button, which appears when the number of pages is greater than the `buttonCount`.

#### Example - set the Tooltip of the ellipsis button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
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

Configures the Kendo UI Grid PDF export settings.

### pdf.allPages `Boolean` *(default: false)*

Exports all grid pages, starting from the first one.

> **Note:** Chrome is known to crash when generating very large PDF-s.  A solution to this is to include the
> [Pako](http://nodeca.github.io/pako/) library, which is bundled with Kendo as `pako_deflate.min.js`.  Simply loading
> this library with a `<script>` tag will enable compression in PDF, e.g.:
>
> `<script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>`
>
> The allPages export is not supported when virtual scrolling is enabled.

#### Example - export all pages

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["pdf"],
      columns: [
        { field: "name" }
      ],
      dataSource: {
        data: [{ name: "Jane Doe"},
               { name: "John Doe"},
               { name: "Tim Doe"},
               { name: "Alice Doe"}],
        pageSize: 2
      },
      pdf: {
        allPages: true
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsPDF();
    </script>

### pdf.author `String` *(default: null)*

The author of the PDF document.

#### Example - set the author

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            author: "John Doe"
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.avoidLinks `Boolean|String` *(default: false)*
A flag indicating whether to produce actual hyperlinks in the exported PDF file.

It's also possible to pass a CSS selector as argument. All matching links will be ignored.

> Available in versions 2015.3.1020 and later

#### Example - skip hyperlinks

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            creator: "John Doe",
            avoidLinks: true
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        columns: [
          { field: "ProductName",
            template: "<a href='producs/#= ProductID #/'>#= ProductName #</a>" }
        ],
        pageable: true
    });
    </script>

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.

#### Example - set the creator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            creator: "John Doe"
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.

#### Example - set the date

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            date: new Date("2014/10/10")
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.

#### Example - set the default PDF file name

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            fileName: "Products.pdf"
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](#configuration-pdf.proxyURL) even if the browser supports saving files locally.

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.

#### Example - set the keywords

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            keywords: "northwind products"
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.landscape `Boolean` *(default: false)*

Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.

#### Example - enable landscape mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            landscape: true
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.margin `Object`

Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).

#### Example - set the margins

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
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
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            paperSize: ["20mm", "20mm"]
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

> As of Q2 2016, when `paperSize` is specified the Grid will use `drawDOM`'s [automatic page breaking](/framework/drawing/drawing-dom#configuration-Automatic) algorithm.  This makes available a few new options: `template`, `repeatHeaders` and `scale`.

### pdf.template `String` *(default: null)*

A piece of HTML to be included in each page.  Can be used to display headers and footers.  See the documentation in [drawDOM](/framework/drawing/drawing-dom#Template).

### pdf.repeatHeaders `Boolean` *(default: false)*

Set this to `true` to repeat the grid headers on each page.

### pdf.scale `Number|Array|Object` *(default: null)*

A scale factor.  In many cases, text size on screen will be too big for print, so you can use this option to scale down the output in PDF.  See the documentation in [drawDOM](/framework/drawing/drawing-dom#Scaling).

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser isn't capable of saving files locally e.g. Internet Explorer 9 and Safari. PDF export is not supported in Internet Explorer 8 and below.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with the "Content-Disposition" header set to
`attachment; filename="<fileName.pdf>"`.

#### Example - set the server proxy URL
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            proxyURL: "/save"
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.

#### Example - open the generated document in a new window

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            forceProxy: true,
            proxyURL: "/save",
            proxyTarget: "_blank"
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.

#### Example - set the subject
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            subject: "Products"
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.

#### Example - set the title
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            title: "Products"
        },
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### reorderable `Boolean` *(default:false)*

If set to `true` the user could reorder the columns by dragging their header cells. By default reordering is disabled.
Multi-level headers allow reordering only in same level.

#### Example - enable column reordering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      reorderable: true
    });
    </script>

> Check [Column reordering](http://demos.telerik.com/kendo-ui/grid/column-reordering) for a live demo.

### resizable `Boolean` *(default:false)*

If set to `true`, users can resize columns by dragging the edges (resize handles) of their header cells. As of Kendo UI Q1 2015, users can also auto-fit a column by double-clicking
its resize handle. In this case the column will assume the smallest possible width, which allows the column content to fit without wrapping.

By default, column resizing is disabled.

#### Example - enable column resizing

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      resizable: true
    });
    </script>

> Check [Column resizing](http://demos.telerik.com/kendo-ui/grid/column-resizing) for a live demo and
the [Column widths](/web/grid/appearance#column-widths) help section for additional relevant information.

### rowTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders rows. Be default renders a table row (`<tr>`) for every data source item.

> The outermost HTML element in the template must be a table row (`<tr>`). That table row must have the `uid` data attribute set to `#= uid #`. The grid uses the `uid` data attribute to determine the data to which a table row is bound to.

#### Example - specify row template as a function

    <div id="grid"></div>
    <script id="template" type="text/x-kendo-template">
        <tr data-uid="#= uid #">
            <td colspan="2">
                <strong>#: name #</strong>
                <strong>#: age #</strong>
            </td>
        </tr>
    </script>
    <script>
    $("#grid").kendoGrid({
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      rowTemplate: kendo.template($("#template").html())
    });
    </script>

#### Example - specify row template as a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      dataSource: [ { name: "Jane Doe", age: 30 }, { name: "John Doe", age: 33 } ],
      rowTemplate: '<tr data-uid="#= uid #"><td colspan="2"><strong>#: name #</strong><strong>#: age #</strong></td></tr>'
    });
    </script>

> Check [Row template](http://demos.telerik.com/kendo-ui/grid/rowtemplate) for a live demo.

### scrollable `Boolean|Object` *(default: true)*

If set to `true` the grid will display a scrollbar when the total row height (or width) exceeds the grid height (or width). By default scrolling is enabled.

Can be set to a JavaScript object which represents the scrolling configuration.

#### Example - disable scrolling

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      scrollable: false
    });
    </script>

### scrollable.virtual `Boolean` *(default: false)*

If set to `true` the grid will always display a single page of data. Scrolling would just change the data which is currently displayed.

> Check [Virtualization of local data](http://demos.telerik.com/kendo-ui/grid/virtualization-local-data) and [Virtualization of remote data](http://demos.telerik.com/kendo-ui/grid/virtualization-remote-data) for live demos.

### selectable `Boolean|String` *(default: false)*

If set to `true` the user would be able to select grid rows. By default selection is disabled.

Can also be set to the following string values:

- "row" - the user can select a single row.
- "cell" - the user can select a single cell.
- "multiple, row" - the user can select multiple rows.
- "multiple, cell" - the user can select multiple cells.

#### Example - set selectable as a boolean
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      selectable: true
    });
    </script>

#### Example - set selectable as a string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      selectable: "multiple, row"
    });
    </script>

> Check [Selection](http://demos.telerik.com/kendo-ui/grid/selection) for a live demo.

### sortable `Boolean|Object` *(default: false)*

If set to `true` the user could sort the grid by clicking the column header cells. By default sorting is disabled.

Can be set to a JavaScript object which represents the sorting configuration.

#### Example - enable sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true
    });
    </script>

> Check [Sorting](http://demos.telerik.com/kendo-ui/grid/sorting) for a live demo.

### sortable.allowUnsort `Boolean` *(default: true)*

If set to `true` the user can get the grid in unsorted state by clicking the sorted column header.

#### Example - do not allow unsorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: {
        allowUnsort: false
      }
    });
    </script>

### sortable.mode `String` *(default: "single")*

The sorting mode. If set to "single" the user can sort by one column. If set to "multiple" the user can sort by multiple columns.

#### Example - allow multiple column sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: {
        mode: "multiple"
      }
    });
    </script>

### toolbar `String|Function|Array`

If a `String` value is assigned to the `toolbar` configuration option, it will be treated as a single string template for the whole grid Toolbar,
and the string value will be passed as an argument to a [`kendo.template()`](/api/javascript/kendo#methods-template) function.

If a `Function` value is assigned (it may be a kendo.template() function call or a generic function reference), then the return value of the function will be used to render the Grid Toolbar contents.

> If the grid is instantiated with MVVM, The template passed will not be bound to the grid view model context. You may bind the toolbar element manually afterwards, using `kendo.bind(gridWidgetInstance.element.find("k-grid-toolbar"))`

If an `Array` value is assigned, it will be treated as the list of commands displayed in the grid's Toolbar. Commands can be custom or built-in ("cancel", "create", "save", "excel", "pdf").

The "cancel" built-in command reverts any data changes done by the end user.

The "create" command adds an empty data item to the grid.

The "save" command persists any data changes done by the end user.

The "excel" command exports the grid data in MS Excel format.

The "pdf" command exports the grid data in PDF format.

#### Example - configure the Grid Toolbar as a string template
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: "<p>My string template in a paragraph.</p>",
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33},
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    </script>

#### Example - configure the Grid Toolbar template with a function
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: kendo.template("<p>My function template.</p>"),
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33},
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    </script>

#### Example - configure the Grid Toolbar as an array of commands
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: [
        { name: "create" },
        { name: "save" },
        { name: "cancel" }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33},
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    </script>

### toolbar.name `String`

The name of the toolbar command. Either a built-in ("cancel", "create", "save", "excel", "pdf") or custom. The `name` is reflected in one of the CSS classes, which is applied to the button - `k-grid-name`.
This class can be used to obtain reference to the button after Grid initialization and attach click handlers.

#### Example - specify the name of the command
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: [
        { name: "create" },
        { name: "save" },
        { name: "custom" }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });

    $(".k-grid-custom").click(function(e){
        // handler body
    });
    </script>

### toolbar.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the command. By default renders a button.

#### Example - set the template as a function

    <div id="grid"></div>
    <script id="template" type="text/x-kendo-template">
    <a class="k-button" href="\#" onclick="return toolbar_click()">Command</a>
    </script>
    <script>
    function toolbar_click() {
      console.log("Toolbar command is clicked!");
      return false;
    }
    $("#grid").kendoGrid({
      toolbar: [
        { template: kendo.template($("#template").html()) }
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

> Check [Toolbar template](http://demos.telerik.com/kendo-ui/grid/toolbar-template) for a live demo.

#### Example - set the template as a string

    <div id="grid"></div>
    <script>
    function toolbar_click() {
      console.log("Toolbar command is clicked!");
      return false;
    }
    $("#grid").kendoGrid({
      toolbar: [
        {
          template: '<a class="k-button" href="\\#" onclick="return toolbar_click()">Command</a>'
        }
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

#### Example - set the text of the toolbar button
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: [
        { name: "create", text: "Add new" }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ],
      editable: true
    });
    </script>


## Fields

### columns `Array`

The columns of the grid initialized from the [columns](#configuration-columns) option. Every item from the `columns` array has the same fields as the corresponding [columns](#configuration-columns) option.

#### Example - iterate the grid columns
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    for (var i = 0; i < grid.columns.length; i++) {
      console.log(grid.columns[i].field); // displays "name" and then "age"
    }
    </script>
### dataSource `kendo.data.DataSource`

The [data source](/api/javascript/data/datasource) of the widget. Configured via the [dataSource](#configuration-dataSource) option.

> Changes to the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](#methods-setDataSource) method instead.

#### Example - add a data item to the data source

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30}
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.dataSource.add({ name: "John Doe", age: 33 });
    </script>

#### Example - update a data item in the data source

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var data = grid.dataSource.at(0);
    data.set("name", "John Doe");
    </script>

#### Example - remove a data item from the data source

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30},
        { name: "John Doe", age: 33},
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var data = grid.dataSource.at(1);
    grid.dataSource.remove(data);
    </script>

### footer `jQuery`

The jQuery object which represents the grid footer element.

### pager `kendo.ui.Pager`

The [Pager widget](/api/javascript/ui/pager) attached to the Grid.

### table `jQuery`

The jQuery object which represents the grid table element.

### tbody `jQuery`

The jQuery object which represents the table body. Contains all grid table rows.

#### Example - get the first table row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30},
        { name: "John Doe", age: 33},
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var row = grid.tbody.find("tr:eq(0)");
    var data = grid.dataItem(row);
    console.log(data.name); // displays "Jane Doe"
    </script>

### thead `jQuery`

The jQuery object which represents the grid table header element.

### content `jQuery`

The jQuery object which represents the grid content element, which holds the scrollable content. Available only in a grid with locked columns.

### lockedHeader `jQuery`

The jQuery object which represents the grid locked header element. Available only in a grid with locked columns.

### lockedTable `jQuery`

The jQuery object which represents the grid locked table element. Available only in a grid with locked columns.

### lockedContent `jQuery`

The jQuery object which represents the grid locked content element. Available only in a grid with locked columns.

## Methods

### addRow

Adds an empty data item to the grid. In "incell" and "inline" editing mode a table row will be appended. Popup window will be displayed in "popup" editing mode.

Fires the [edit](#events-edit) event.

#### Example - add a new data item

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true,
      toolbar: ["save"]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();

### autoFitColumn

Applies the minimum possible width for the specified column, so that all text fits without wrapping.

#### Parameters

##### column `Number|String|Object`

The index of the column, or the [field](#configuration-columns.field) to which the columns is bound, or the column object obtained from the [columns](#fields-columns) collection.

When using multicolumn headers, using an index is not allowed. In such scenarios, please use a field name or a column object as a method argument.

#### Example - autofit a column by index

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.autoFitColumn(1);
    </script>

#### Example - autofit a column by field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.autoFitColumn("age");
    </script>

#### Example - autofit a column by column object reference

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columns: [{
            title: "Person",
            columns: [
                { field: "fname", title: "First name"},
                { field: "lname", title: "Last name"}
            ]}, {
                field: "age"
            }
        ],
        dataSource: [
            { fname: "Jane", lname: "Smith", age: 30 },
            { fname: "John", lname: "Stevens", age: 33 }
        ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.autoFitColumn(grid.columns[0].columns[1]);
    </script>

### cancelChanges

Cancels any pending changes in the data source. Deleted data items are restored, new data items are removed and updated data items are restored to their initial state.

#### Example - cancel any changes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
    grid.cancelChanges();
    </script>

### cancelRow

Cancels editing for the table row which is in edit mode. Reverts any changes made.

#### Example - cancel editing

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
    grid.cancelRow();
    </script>

### cellIndex

Returns the index of the specified table cell. Skips group and detail table cells.

#### Parameters

##### cell `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table cell. A string is treated as a jQuery selector.

#### Returns

`Number` the index of the specified table cell.

#### Example - find the cell index when the cell is a jQuery object

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 },
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    var grid = $("#grid").data("kendoGrid");
    var cell = $("#grid td:eq(1)");
    console.log(grid.cellIndex(cell));
    </script>

#### Example - find the cell index when the cell is a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 },
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    var grid = $("#grid").data("kendoGrid");
    console.log(grid.cellIndex("td:eq(1)"));
    </script>

### clearSelection

Clears the currently selected table rows or cells (depending on the current selection [mode](#configuration-selectable)).

#### Example - clear selection

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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
    var grid = $("#grid").data("kendoGrid");
    // select the first table row
    grid.select("tr:eq(1)");
    grid.clearSelection();
    </script>

### closeCell

Stops editing the table cell which is in edit mode. Requires "incell" [edit mode](#configuration-editable.mode).

> When keyboard navigation is used, the Grid [`table`](#fields-table) must be focused programmatically after calling `closeCell`.

#### Parameters

##### isCancel `Boolean` *optional*

A flag specifying whether to fire the `cancel` event. By default the event is not fired.

#### Example - cancel cell editing

    <div id="grid"></div>

    <script>
    $("#grid").kendoGrid({
        columns: [
            { field: "name" },
            { field: "age" }
        ],
        dataSource: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 },
        ],
        editable: "incell",
        navigatable: true
    });

    var grid = $("#grid").data("kendoGrid");

    grid.editCell(grid.tbody.find("td").first());
    setTimeout(function(){
        grid.closeCell();
        grid.table.focus();
    }, 1500);
    </script>

### collapseGroup

Collapses the specified group. This hides the group items.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the group table row. A string is treated as a jQuery selector.

#### Example - collapse the first group

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: {
        data: [
          { productName: "Tea", category: "Beverages" },
          { productName: "Coffee", category: "Beverages" },
          { productName: "Ham", category: "Food" },
          { productName: "Bread", category: "Food" }
        ],
        group: { field: "category" }
      },
      groupable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.collapseGroup(".k-grouping-row:contains(Beverages)");
    </script>

### collapseRow

Collapses the specified master table row. This hides its detail table row.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the master table row. A string is treated as a jQuery selector.

#### Example - collapse the first master table row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    var grid = $("#grid").data("kendoGrid");
    // first expand the first master table row
    grid.expandRow(".k-master-row:first");
    grid.collapseRow(".k-master-row:first");
    </script>

### current

Gets or sets the current cell for keyboard navigation.

#### Parameters

##### cell `jQuery`

DOM element or jQuery object which represents the navigatable cell.

#### Returns

`jQuery` the current cell.

#### Example - select last cell for keyboard navigation

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columns: [
        { field: "name" },
        { field: "age" }
        ],
        dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
        ],
        navigatable: true
    });
    var grid = $("#grid").data("kendoGrid");

    //get the last cell of the Grid
    var lastCell = grid.tbody.find("tr:last td:last");
    //select the cell for navigation
    grid.current(lastCell);
    //optional: focus the grid table
    grid.table.focus();
    </script>

### dataItem

Returns the data item to which the specified table row is bound. The data item is a [Kendo UI Model](/api/javascript/data/model) instance.

> When using the **Grid's MVC wrapper**, the Grid must be **Ajax-bound** for the dataItem() method to work.
When using server binding, the dataSource instance does not contain the serialized data items.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`kendo.data.ObservableObject` the data item to which the specified table row is bound. [More information about the ObservableObject type...](/api/javascript/data/observableobject)

#### Example - get the data item to which the first table row is bound

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var data = grid.dataItem("tr:eq(1)");
    console.log(data.name); // displays "Jane Doe"
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.destroy();
    </script>

### editCell

Switches the specified table cell in edit mode. Requires "incell" [edit mode](#configuration-editable.mode).

Fires the [edit](#events-edit) event.

#### Parameters

##### cell `jQuery`

The jQuery object which represents the table cell.

#### Example - switch the first cell to edit mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "incell"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editCell($("#grid td:eq(0)"));
    </script>

### editRow

Switches the specified table row in edit mode. Requires "inline" or "popup" [edit mode](#configuration-editable.mode).

Fires the [edit](#events-edit) event.

#### Parameters

##### row `jQuery`

The jQuery object which represents the table row.

#### Example - switch the first row in edit mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "inline"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editRow($("#grid tr:eq(1)"));
    </script>

### expandGroup

Expands the specified group. This shows the group items.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the group table row. A string is treated as a jQuery selector.
Expands specified group.

#### Example - expand the first group

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: {
        data: [
          { productName: "Tea", category: "Beverages" },
          { productName: "Coffee", category: "Beverages" },
          { productName: "Ham", category: "Food" },
          { productName: "Bread", category: "Food" }
        ],
        group: { field: "category" }
      },
      groupable: true
    });
    var grid = $("#grid").data("kendoGrid");
    // first collapse the group
    grid.collapseGroup(".k-grouping-row:contains(Beverages)");
    grid.expandGroup(".k-grouping-row:contains(Beverages)");
    </script>

### expandRow

Expands the specified master table row. This shows its detail table row.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the master table row. A string is treated as a jQuery selector.
Expands specified master row.

#### Example - expand the first master table row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.expandRow(".k-master-row:first");
    </script>

### getOptions

Retrieves the options that are currently enabled or disabled on the Grid, also gives the current state of the dataSource.
Use this method if you want to save the state of the Grid into a variable. It is also possible to extract and store only some of the Grid options.

> Please refer to the [`setOptions()`](#methods-setOptions) method documentation for more important information.

#### Parameters

#### Returns

`Object` The configuration options of the widget.

#### Example - expand the first master table row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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
    var grid = $("#grid").data("kendoGrid");
    var options = grid.getOptions();
    console.log(options.sortable); //outputs true

    // get only the Grid column settings
    var columnOptionsForSaving = kendo.stringify(options.columns);
    </script>

### hideColumn

Hides the specified grid column.

> Check the [Column widths](/web/grid/appearance#column-widths) help section for additional relevant information.

#### Parameters

##### column `Number|String|Object`

The index of the column, or the [field](#configuration-columns.field) to which the columns is bound, or the column object obtained from the [columns](#fields-columns) collection.

When using multicolumn headers, using an index will hide a top-level column together will all its "child columns". In such scenarios, using field names or column objects may be more appropriate.

#### Example - hide a column by index

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn(1);
    </script>

#### Example - hide a column by field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn("age");
    </script>

#### Example - hide a column by column object reference

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columns: [{
            title: "Person",
            columns: [
                { field: "fname", title: "First name"},
                { field: "lname", title: "Last name"}
            ]}, {
                field: "age"
            }
        ],
        dataSource: [
            { fname: "Jane", lname: "Smith", age: 30 },
            { fname: "John", lname: "Stevens", age: 33 }
        ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn(grid.columns[0].columns[1]);
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource#methods-view) (e.g. the ones on the current page).

#### Returns

`Array` The currently rendered data table rows (`<tr>` elements).

### lockColumn

Locks (freezes) a column, allowing users to see it at all times when scrolling.

#### Parameters

##### column `Number|String`

The index of the column or the [field](#configuration-columns.field) to which the columns is bound.

> In order to use this method, the grid must be initialized with at least one locked column, and should have unlocked columns left after the target column is locked.

#### Example - lock a column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", width: 400, locked: true },
        { field: "age", width: 200 },
        { field: "hometown", width: 400 },
        { field: "siblings", width: 200 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, hometown: "Sofia, Bulgaria", siblings: 3 },
        { name: "John Doe", age: 33, hometown: "Boston, MA, USA", siblings: 1 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.lockColumn("age");
    </script>

### refresh

Renders all table rows using the current data items.

#### Example - refresh the widget

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.refresh();
    </script>

### removeRow

Removes the specified table row from the grid. Also removes the corresponding data item from the data source.

Fires the [remove](#events-remove) event.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Example - remove the first table row
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.removeRow("tr:eq(1)");
    </script>

### reorderColumn

Changes the position of the specified column.

#### Parameters

##### destIndex `Number`

The new position of the column. The destination index should be calculated with regard to all columns, including the hidden ones.

##### column `Object`

The column whose position should be changed.

#### Example - move a column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.reorderColumn(1, grid.columns[0]);
    </script>

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](#events-excelExport) event.

> Calling this method could trigger the browser built-in popup blocker in some cases. To avoid that, always call it as a response to an end-user action e.g. button click.

#### Example - manually initiate Excel export

    <button id="export">Export to Excel</button>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
    });
    $("#export").click(function(e) {
        var grid = $("#grid").data("kendoGrid");
        grid.saveAsExcel();
    });
    </script>

### saveAsPDF

Initiates the PDF export and returns a promise. Also triggers the [pdfExport](#events-pdfExport) event.

> Calling this method may trip the built-in browser pop-up blocker. To avoid that, call this method as a response to an end-user action, e.g. a button click.

#### Returns
`Promise` A promise that will be resolved when the export completes. The same promise is available in the [pdfExport](#events-pdfExport) event arguments.

#### Example - manually initiate PDF export

    <button id="export">Export to PDF</button>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
    });
    $("#export").click(function(e) {
        var grid = $("#grid").data("kendoGrid");
        grid.saveAsPDF();
    });
    </script>


### saveChanges

Saves any pending changes by calling the [sync](/api/javascript/data/datasource#methods-sync) method.

Fires the [saveChanges](#events-saveChanges) event.

#### Example - save changes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
    grid.saveChanges();
    </script>

### saveRow

Switches the table row which is in edit mode and saves any changes made by the user.

#### Example - save row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "inline"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editRow($("#grid tr:eq(1)"));
    grid.saveRow();
    </script>

### select

Gets or sets the table rows (or cells) which are selected.

#### Parameters

##### rows `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row(s) or cell(s). A string is treated as a jQuery selector.

#### Returns

`jQuery` the selected table rows or cells.

#### Example - select the first and second table rows

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      selectable: "multiple, row"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.select("tr:eq(1), tr:eq(2)");
    </script>

#### Example - select the first table cell

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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
    var grid = $("#grid").data("kendoGrid");
    grid.select("td:eq(0)");
    </script>

#### Example - get the selected table row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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
    var grid = $("#grid").data("kendoGrid");
    grid.select("tr:eq(1)");
    var row = grid.select();
    var data = grid.dataItem(row);
    console.log(data.name); // displays "Jane Doe"
    </script>

### setDataSource

Sets the data source of the widget.

#### Parameters

##### dataSource `kendo.data.DataSource`

The data source to which the widget should be bound.

#### Example - set the data source

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 }
      ]
    });
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.setDataSource(dataSource);
    </script>

### setOptions

Sets the options of the Grid. Use this method if you want to enable/disable a particular feature/option or to load
the complete state obtained previously with the [`getOptions`](#methods-getOptions) method.

When `setOptions` is called, the Grid widget will be destroyed and recreated.

> There are three important things to keep in mind when using `getOptions` and `setOptions`.
>
> * **calling `setOptions()` in a Grid event handler is not possible.**
> * **calling `setOptions()` in a function, which is related to the Grid's databinding mechanism may cause an endless loop.**
> * `JSON.stringify()` cannot serialize function references (e.g. event handlers), so if stringification is used for the retrieved Grid state,
> all configuration fields, which represent function references, will be lost. You have two options to avoid this limitation:
> use a [custom implementation](https://github.com/tarruda/super-json) to serialize JavaScript functions, or
> add the function references back to the deserialized configuration object before passing it to the `setOptions` method.
> * When using the Grid MVC wrapper, any server templates will not be retrieved by the `getOptions` method (e.g. toolbar or header templates with `@<text></text>` razor syntax).
> This is because the server templates are rendered server-side and do not have corresponding configuration options included in the JavaScript initialization statement that creates the
> Grid object client-side. As a result, the templates will be lost once the `setOptions()` method is invoked.
> There are two options to avoid the issue - use JavaScript initialization instead of an MVC wrapper, or add template configuration to the retrieved Grid state with the JavaScript
> equivalent syntax (e.g. [`headerTemplate`](/api/javascript/ui/grid#configuration-columns.headerTemplate) and [`toolbar`](/api/javascript/ui/grid#configuration-toolbar)).

#### Parameters

##### options `Object`

The configuration options to be set.

#### Example - set sortable feature of the Grid to true

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            columns: [
              { field: "name" },
              { field: "age" }
            ],
            dataSource: [
                { name: "Jane Doe", age: 30 },
                { name: "John Doe", age: 33 }
            ]
        });
        var grid = $("#grid").data("kendoGrid");
        grid.setOptions({
              sortable: true
        });
    </script>

### showColumn

Shows the specified column.

> Check the [Column widths](/web/grid/appearance#column-widths) help section for additional relevant information.

#### Parameters

##### column `Number|String|Object`

The index of the column, or the [field](#configuration-columns.field) to which the columns is bound, or the column object obtained from the [columns](#fields-columns) collection.

When using multicolumn headers, using an index will hide a top-level column together will all its "child columns". In such scenarios, using field names or column objects may be more appropriate.

#### Example - show a hidden column by index

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age", hidden: true }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.showColumn(1);
    </script>

#### Example - show a hidden column by field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age", hidden: true }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.showColumn("age");
    </script>

#### Example - show a column by column object reference

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columns: [{
            title: "Person",
            columns: [
                { field: "fname", title: "First name"},
                { field: "lname", title: "Last name", hidden: true}
            ]}, {
                field: "age"
            }
        ],
        dataSource: [
            { fname: "Jane", lname: "Smith", age: 30 },
            { fname: "John", lname: "Stevens", age: 33 }
        ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn(grid.columns[0].columns[1]);
    </script>

### unlockColumn

Unlocks (unfreezes) a column.

#### Parameters

##### column `Number|String`

The index of the column or the [field](#configuration-columns.field) to which the columns is bound.

> In order to use this method, the grid must be initialized with at least one locked column, and there should be locked columns left after the target column is unlocked.

#### Example - lock a column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", width: 400, locked: true },
        { field: "age", width: 200, locked: true },
        { field: "hometown", width: 400 },
        { field: "siblings", width: 200 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, hometown: "Sofia, Bulgaria", siblings: 3 },
        { name: "John Doe", age: 33, hometown: "Boston, MA, USA", siblings: 1 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.unlockColumn("name");
    </script>

## Events

### cancel

Fired when the user clicks the "cancel" button (in inline or popup [editing mode](#configuration-editable.mode)) or closes the popup window.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit container element. More information is available in the [edit event arguments' description](#events-edit).

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked prevents the cancel action. The table row remains in edit mode.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "cancel" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "popup",
      cancel: function(e) {
        e.preventDefault()
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editRow($("#grid tr:eq(1)"));
    </script>

#### Example - subscribe to the "cancel" event after initialization

    <div id="grid"></div>
    <script>
    function grid_cancel(e) {
      e.preventDefault()
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "popup"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("cancel", grid_cancel);
    grid.editRow($("#grid tr:eq(1)"));
    </script>

### change

Fired when the user selects a table row or cell in the grid.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - get the selected data item(s) when using row selection

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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
    <div id="grid"></div>
    <script>
    function grid_change(e) {
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
    $("#grid").kendoGrid({
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
    var grid = $("#grid").data("kendoGrid");
    grid.bind("change", grid_change);
    </script>

### columnHide

Fired when the user hides a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](#configuration-columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnHide" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      columnMenu: true,
      columnHide: function(e) {
        console.log(e.column.field); // displays the field of the hidden column
      }
    });
    </script>

#### Example - subscribe to the "columnHide" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnHide(e) {
      console.log(e.column.field); // displays the field of the hidden column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      columnMenu: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnHide", grid_columnHide);
    </script>

### columnMenuInit

Fired when the column menu is initialized.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing column menu form element.

##### e.field `String`

The field of the column for which the column menu is initialized.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnMenuInit" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
      ],
      dataSource: [
        { name: "Jane Doe", age: 30},
        { name: "John Doe", age: 33}
      ],
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
    <div id="grid"></div>
    <script>
    function grid_columnMenuInit(e) {
      var menu = e.container.find(".k-menu").data("kendoMenu");
      var field = e.field;
      menu.append({ text: "Custom" });
      menu.bind("select", function(e) {
        if ($(e.item).text() == "Custom") {
          console.log("Custom button for", field);
        }
      });
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
      ],
      dataSource: [
        { name: "Jane Doe", age: 30},
        { name: "John Doe", age: 33}
      ],
      columnMenu: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnMenuInit", grid_columnMenuInit);
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

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnReorder" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      reorderable: true,
      columnReorder: function(e) {
        console.log(e.column.field, e.newIndex, e.oldIndex);
      }
    });
    </script>

#### Example - subscribe to the "columnReorder" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnReorder(e) {
      console.log(e.column.field, e.newIndex, e.oldIndex);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      reorderable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnReorder", grid_columnReorder);
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

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnResize" event during initialization
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      resizable: true,
      columnResize: function(e) {
        console.log(e.column.field, e.newWidth, e.oldWidth);
      }
    });
    </script>

#### Example - subscribe to the "columnResize" event after initialization
    <div id="grid"></div>
    <script>
    function grid_columnResize(e) {
      console.log(e.column.field, e.newWidth, e.oldWidth);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      resizable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnResize", grid_columnResize);
    </script>

### columnShow

Fired when the user shows a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](#configuration-columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnShow" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      columnMenu: true,
      columnShow: function(e) {
        console.log(e.column.field); // displays the field of the hidden column
      }
    });
    </script>

#### Example - subscribe to the "columnShow" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnShow(e) {
      console.log(e.column.field); // displays the field of the hidden column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      columnMenu: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnShow", grid_columnShow);
    </script>

### dataBinding

Fired before the widget binds to its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the data bind action. The table rows will remain unchanged and `dataBound` event will not fire.

##### e.action `String`

The action that caused the dataBinding event

##### e.index `Number`

Available if the action is add or remove. Shows the index of the added/removed element.

##### e.items `Array`

The array of items that shows the elements that are going to be added/removed from the widget dataSource.


#### Example - subscribe to the "dataBinding" event before initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      dataBinding: function(e) {
        console.log("dataBinding");
      }
    });
    </script>

#### Example - subscribe to the "dataBinding" event after initialization

    <div id="grid"></div>
    <script>
    function grid_dataBinding(e) {
      console.log("dataBinding");
    }
    $("#grid").kendoGrid({
      autoBind: false,
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("dataBinding", grid_dataBinding);
    grid.dataSource.fetch();
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      dataBound: function(e) {
        console.log("dataBound");
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <div id="grid"></div>
    <script>
    function grid_dataBound(e) {
      console.log("dataBound");
    }
    $("#grid").kendoGrid({
      autoBind: false,
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("dataBound", grid_dataBound);
    grid.dataSource.fetch();
    </script>

### detailCollapse

Fired when the user collapses a detail table row.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.detailRow `jQuery`

The jQuery object which represents the detail table row.

##### e.masterRow `jQuery`

The jQuery object which represents the master table row.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "detailCollapse" event during initialization
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>",
      detailCollapse: function(e) {
        console.log(e.masterRow, e.detailRow);
      }
    });
    </script>

#### Example - subscribe to the "detailCollapse" event after initialization
    <div id="grid"></div>
    <script>
    function grid_detailCollapse(e) {
      console.log(e.masterRow, e.detailRow);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("detailCollapse", grid_detailCollapse);
    </script>

### detailExpand

Fired when the user expands a detail table row.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.detailRow `jQuery`

The jQuery object which represents the detail table row.

##### e.masterRow `jQuery`

The jQuery object which represents the master table row.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "detailExpand" event during initialization
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>",
      detailExpand: function(e) {
        console.log(e.masterRow, e.detailRow);
      }
    });
    </script>

#### Example - subscribe to the "detailExpand" event after initialization
    <div id="grid"></div>
    <script>
    function grid_detailExpand(e) {
      console.log(e.masterRow, e.detailRow);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("detailExpand", grid_detailExpand);
    </script>

### detailInit

Fired when a detail table row is initialized.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.data `kendo.data.ObservableObject`

The data item to which the master table row is bound.

##### e.detailCell `jQuery`

The jQuery object which represents the detail table cell.

##### e.detailRow `jQuery`

The jQuery object which represents the detail table row.

##### e.masterRow `jQuery`

The jQuery object which represents the master table row.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "detailInit" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        {
          name: "Beverages",
          products: [
            { name: "Tea" },
            { name: "Coffee" }
          ]
        },
        {
          name: "Food",
          products: [
            { name: "Ham" },
            { name: "Bread" }
          ]
        }
      ],
      detailTemplate: 'Products: <div class="grid"></div>',
      detailInit: function(e) {
        e.detailRow.find(".grid").kendoGrid({
          dataSource: e.data.products
        });
      }
    });
    </script>

#### Example - subscribe to the "detailInit" event after initialization

    <div id="grid"></div>
    <script>
    function grid_detailInit(e) {
      e.detailRow.find(".grid").kendoGrid({
        dataSource: e.data.products
      });
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        {
          name: "Beverages",
          products: [
            { name: "Tea" },
            { name: "Coffee" }
          ]
        },
        {
          name: "Food",
          products: [
            { name: "Ham" },
            { name: "Bread" }
          ]
        }
      ],
      detailTemplate: 'Products: <div class="grid"></div>'
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("detailInit", grid_detailInit);
    </script>

### edit

Fired when the user edits or creates a data item.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object of the edit container element, which wraps the editing UI. Depending on the [Grid edit mode](#configuration-editable.mode), the container is different:

* "incell" edit mode - the container element is a table cell
* "inline" edit mode - the container is a table row
* "popup" edit mode - the container is a Kendo UI Window [element](/framework/widgets/wrapper-element), which provides an easy way to obtain a reference to the Window widget object,
e.g. to [attach additional events](/intro/installation/events-and-methods#bind-to-events-after-widget-initialization).

##### e.model `kendo.data.Model`

The data item which is going to be edited. Use its [isNew](/api/javascript/data/model#methods-isNew) method to check if the data item is new (created) or not (edited).

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "edit" event during initialization
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id" },
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            id: "id",
            fields: {
              "id": { type: "number" }
            }
          }
        }
      },
      editable: "popup",
      toolbar:["create"],
      edit: function(e) {
        if (!e.model.isNew()) {
          // Disable the editor of the "id" column when editing data items
          var numeric = e.container.find("input[name=id]").data("kendoNumericTextBox");
          numeric.enable(false);
        }
      }
    });
    </script>

#### Example - subscribe to the "edit" event after initialization

    <div id="grid"></div>
    <script>
    function grid_edit(e) {
      if (!e.model.isNew()) {
        // Disable the editor of the "id" column when editing data items
        var numeric = e.container.find("input[name=id]").data("kendoNumericTextBox");
        numeric.enable(false);
      }
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "id" },
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            id: "id",
            fields: {
              "id": { type: "number" }
            }
          }
        }
      },
      editable: "popup",
      toolbar:["create"]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("edit", grid_edit);
    </script>

### excelExport

Fired when the user clicks the "Export to Excel" toolbar button.

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

##### e.data `Array`

The array of data items used to create the Excel workbook. Available since version 2014.3.1205.

##### e.workbook `kendo.ooxml.Workbook`

The Excel [workbook configuration object](/api/javascript/ooxml/workbook#configuration). Used to initialize a `kendo.ooxml.Workbook` class. Modifications of the workbook will reflect in the output Excel document.

##### e.preventDefault `Function`

If invoked the grid will not save the generated file.

#### Example - subscribe to the "excelExport" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["excel"],
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ],
      excelExport: function(e) {
        e.workbook.fileName = "Grid.xlsx";
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsExcel();
    </script>

#### Example - subscribe to the "excelExport" event after initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["excel"],
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("excelExport", function(e) {
        e.workbook.fileName = "Grid.xlsx";
    });
    grid.saveAsExcel();
    </script>

### pdfExport

Fired when the user clicks the "Export to PDF" toolbar button.

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked the grid will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

The promise [progress handler](http://api.jquery.com/deferred.progress/) will be called periodically with the following arguments:
* page - The current page content. An instance of [drawing.Group](/api/javascript/drawing/group)
* pageNumber - The current page number
* progress - Number if the range 0 to 1, indicating the progress of the current export operation
* totalPages - The total number of pages

Any changes to the page content group will be applied, including PDF page options.
This allows you to change paper size, orientation and apply transformations on each individual page.

#### Example - Monitor export progress

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["pdf"],
      columns: [
        { field: "name" }
      ],
      dataSource: {
        data: [{ name: "Jane Doe"},
               { name: "John Doe"},
               { name: "Tim Doe"},
               { name: "Alice Doe"}],
        pageSize: 2
      },
      pdf: {
          allPages: true
      },
      pdfExport: function(e) {
        e.promise
        .progress(function(e) {
            console.log(kendo.format("{0:P} complete", e.progress));
        })
        .done(function() {
            alert("Export completed!");
        });
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsPDF();
    </script>

#### Example - Change page orientation on the fly

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["pdf"],
      columns: [
        { field: "name" }
      ],
      dataSource: {
        data: [{ name: "Jane Doe"},
               { name: "John Doe"},
               { name: "Tim Doe"},
               { name: "Alice Doe"}],
        pageSize: 2
      },
      pdf: {
        allPages: true,
        paperSize: "A3",
        landscape: false
      },
      pdfExport: function(e) {
        e.promise
        .progress(function(e) {
            if (e.pageNumber > 1) {
                e.page.options.pdf = {
                    landscape: true
                };
            }
        });
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsPDF();
    </script>

### filterMenuInit

Fired when the grid filter menu is initialized, when it is opened for the first time.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing filter menu form element.

##### e.field `String`

The field of the column for which the filter menu is initialized.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "filterMenuInit" event during initialization and change the default operators

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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

#### Example - subscribe to the "filterMenuInit" event after initialization

    <div id="grid"></div>
    <script>
    function grid_filterMenuInit(e) {
      if (e.field == "name") {
        var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
        firstValueDropDown.value("contains");
        var logicDropDown = e.container.find("select:eq(1)").data("kendoDropDownList");
        logicDropDown.value("or");
        var secondValueDropDown = e.container.find("select:eq(2)").data("kendoDropDownList");
        secondValueDropDown.value("contains");
      }
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ],
      filterable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("filterMenuInit", grid_filterMenuInit);
    </script>

### remove

Fired when the user clicks the "destroy" command button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.row `jQuery`

The jQuery object representing the current table row.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "remove" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true,
      remove: function(e) {
        console.log("Removing", e.model.name);
      }
    });
    </script>

#### Example - subscribe to the "remove" event after initialization

    <div id="grid"></div>
    <script>
    function grid_remove(e) {
      console.log("Removing", e.model.name);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("remove", grid_remove);
    </script>

### save

Fired when a data item is saved.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.model `kendo.data.Model`

The data item to which the table row is bound. If `e.model.id` is null, then a newly created row is being saved.

##### e.container `jQuery`

The jQuery object representing the current edit container element. More information is available in the [edit event arguments' description](#events-edit).

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

##### e.values `Object`

The values entered by the user. **Available only when the [editable.mode](#configuration-editable.mode) option is set to "incell".**

#### Example - subscribe to the "save" event during initialization
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true,
      save: function(e) {
        if (e.values.name) {
          // the user changed the name field
          if (e.values.name != e.model.name) {
            console.log("name is modified");
          }
        }
      }
    });
    </script>

#### Example - subscribe to the "save" event after initialization
    <div id="grid"></div>
    <script>
    function grid_save(e) {
      if (e.values.name) {
        // the user changed the name field
        if (e.values.name != e.model.name) {
          console.log("name is modified");
        }
      }
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("save", grid_save);
    </script>

### saveChanges

Fired when the user clicks the "save" command button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.preventDefault `Function`

If invoked the grid will not call the [sync](/api/javascript/data/datasource#methods-sync) method of the data source.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "saveChanges" event during initialization
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true,
      saveChanges: function(e) {
        if (!confirm("Are you sure you want to save all changes?")) {
           e.preventDefault();
        }
      },
      toolbar: ["save"]
    });
    </script>

#### Example - subscribe to the "saveChanges" event after initialization

    <div id="grid"></div>
    <script>
    function grid_saveChanges(e) {
      if (!confirm("Are you sure you want to save all changes?")) {
         e.preventDefault();
      }
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
      toolbar: ["save"]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("saveChanges", grid_saveChanges);
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 100, locked: true },
        { field: "name", width: 100 },
        { field: "age", width: 50 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, id: 1 },
        { name: "John Doe", age: 33, id: 2 }
      ],
      columnMenu: true,
      columnLock: function(e) {
        console.log(e.column.field); // displays the field of the just locked column
      }
    });
    </script>

#### Example - subscribe to the "columnLock" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnLock(e) {
      console.log(e.column.field); // displays the field of the just locked column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 100, locked: true },
        { field: "name", width: 100 },
        { field: "age", width: 50 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, id: 1 },
        { name: "John Doe", age: 33, id: 2 }
      ],
      columnMenu: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnLock", grid_columnLock);
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 100, locked: true },
        { field: "name", width: 100 },
        { field: "age", width: 50 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, id: 1 },
        { name: "John Doe", age: 33, id: 2 }
      ],
      columnMenu: true,
      columnUnlock: function(e) {
        console.log(e.column.field); // displays the field of the just unlocked column
      }
    });
    </script>

#### Example - subscribe to the "columnUnlock" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnUnlock(e) {
      console.log(e.column.field); // displays the field of the just unlocked column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 100, locked: true },
        { field: "name", width: 100 },
        { field: "age", width: 50 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, id: 1 },
        { name: "John Doe", age: 33, id: 2 }
      ],
      columnMenu: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnUnlock", grid_columnUnlock);
    </script>

### navigate

> Important: This event is available with the Q3 2015 SP1 release.

Fired when [navigatable](#configuration-navigatable) is enabled and the user change current item with either
mouse or keyboard interaction.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.element `jQuery`

A jQuery object of the new hightlighted cell.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "navigate" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 100, locked: true },
        { field: "name", width: 100 },
        { field: "age", width: 50 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, id: 1 },
        { name: "John Doe", age: 33, id: 2 }
      ],
      navigatable: true,
      navigate: function(e) {
        console.log(e.element); // displays the newly highlighted cell
      }
    });
    </script>

#### Example - subscribe to the "navigate" event after initialization

    <div id="grid"></div>
    <script>
    function grid_navigate(e) {
        console.log(e.element); // displays the newly highlighted cell
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 100, locked: true },
        { field: "name", width: 100 },
        { field: "age", width: 50 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, id: 1 },
        { name: "John Doe", age: 33, id: 2 }
      ],
      navigatable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("navigate", grid_navigate);
    </script>
