---
title: Grid
page_title: jQuery Grid Documentation | Configuration, Methods, Events
description: Get started with code examples for the jQuery Grid by Kendo UI and learn how to use methods and which events to set once the widget detail is initialized.
res_type: api
component: grid
---

# kendo.ui.Grid

Represents the Kendo UI Grid widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### allowCopy `Boolean|Object` *(default: false)*

If set to `true` and selection of the Grid is enabled, the user could copy the selection into the clipboard and paste it into Excel or other similar programs that understand TSV/CSV formats. By default allowCopy is disabled and the default format is TSV.
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

The [template](/api/javascript/kendo/methods/template) which renders the alternating table rows. Be default the grid renders a table row (`<tr>`) for every data source item.

> The outermost HTML element in the template must be a table row (`<tr>`). That table row must have the `uid` data attribute set to `${uid}`. The grid uses the `uid` data attribute to determine the data to which a table row is bound to.
> Set the `class` of the table row to `k-alt` to get the default "alternating" look and feel.

#### Example - specify alternating row template

    <script>
      let encode = kendo.htmlEncode;

      $("#grid").kendoGrid({
        dataSource: [ { name: "Jane Doe", age: 30 }, { name: "John Doe", age: 33 } ],
        altRowTemplate: ({ uid, name, age }) => `<tr data-uid="${uid}"><td colspan="2"><strong>${encode(name)} - </strong><strong>${encode(age)}</strong></td></tr>`
      });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false`, the Grid will not bind to the data source during initialization, i.e. it will not call the [`fetch`](/api/javascript/data/datasource/methods/fetch) method of the [dataSource](/api/javascript/ui/grid/fields/datasource) instance. In such scenarios data binding will occur when the [change](/api/javascript/data/datasource/events/change) event of the
dataSource instance is fired. By default, `autoBind` is set to `true` and the widget will bind to the data source specified in the configuration.

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
    var dataSource = new kendo.data.DataSource({
      data: [ { name: "Jane Doe", age: 11 }, { name: "John Doe", age: 12 }]
    });
    $("#grid").kendoGrid({
      columnResizeHandleWidth:20,
      dataSource: dataSource,
      resizable:true
    });

    </script>

### columns `Array`

The configuration of the grid columns. An array of JavaScript objects or strings. JavaScript objects are interpreted as column configurations. Strings are interpreted as the
[field](columns.field) to which the column is bound. The grid will create a column for every item of the array.

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

The aggregate(s) which are calculated when the grid is grouped by the columns [field](columns.field).
The supported aggregates are "average", "count", "max", "min" and "sum".

#### Example - set column aggregates

    <div id="grid"></div>
    <script>
      let encode = kendo.htmlEncode;

      $("#grid").kendoGrid({
        columns: [
          { field: "firstName", groupable: false },
          { field: "lastName" }, /* group by this column to see the footer template */
          { field: "age",
           groupable: false,
           aggregates: [ "count", "min", "max" ],
           groupFooterTemplate: ({ age }) => `age total: ${encode(age.count)}, min: ${encode(age.min)}, max: ${encode(age.max)}`
          }
        ],
        groupable: true,
        scrollable: false,
        dataSource: {
          data: [
            { firstName: "Jane", lastName: "Doe", age: 30 },
            { firstName: "John", lastName: "Doe", age: 33 }
          ]
        },
        groupable: true,
        scrollable: false,
        dataSource: {
          data: [
            { firstName: "Jane", lastName: "Doe", age: 30 },
            { firstName: "John", lastName: "Doe", age: 33 }
          ],
          group: {
            field: "age", aggregates: [
              { field: "age", aggregate: "count" },
              { field: "age", aggregate: "min"},
              { field: "age", aggregate: "max" }
            ]
          }
        }
      });
    </script>

> Check [Aggregates](https://demos.telerik.com/kendo-ui/grid/aggregates) for a live demo.

### columns.attributes `Object|Function`

[`HTML attributes`](https://www.w3schools.com/tags/ref_attributes.asp) of the table cell (`<td>`) rendered for the column.

> HTML attributes which are JavaScript keywords (e.g. *class*) must be quoted.

#### Example - specify column HTML attributes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        title: "Name",
        attributes: {
          "class": "table-cell !k-text-right",
          style: "font-size: 14px"
        }
      } ],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    </script>

The table cells would look like this: `<td class="table-cell" style="text-align: right; font-size: 14px">...</td>`.

> Since R2 2023 attributes logic has changed due to Kendo templates evaluation rendering updates. Now we deliver a new attributes overload that accepts a single string parameter and the name of the JS handler that returns the attributes.

#### Example - set cells background color using a dynamic property value

    <div id="grid"></div>
    <script>
      let ageAttributes = (data) => {
        return { style: `background-color: ${data.color} ` }
      }

      $("#grid").kendoGrid({
        columns: [
          {
            field: "name",
            title: "Name",
            attributes: { "class": "table-cell !k-text-right" }
          },
          {
            field: "age",
            title: "Age",
            attributes: ageAttributes
          }
        ],
        dataSource: [
          { name: "Anne Smith", age: 30, color: "#FFD68A" },
          { name: "John Doe", age: 22, color: "#B2AC88" }
        ]
      });
    </script>

### columns.columnMenu `Boolean` *(default: true)*

If set to `false` the column menu will not be rendered for the specific column.

#### Example - hide the column menu

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", columnMenu: false },
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

Custom commands are supported by specifying the [click](columns.command.click) option.

> The built-in "edit" and "destroy" commands work *only* if editing is enabled via the [editable](editable) option. The "edit" command supports "inline" and "popup" editing modes.

#### Example - set command as a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: "destroy" } // displays the built-in "destroy" command
      ],
      editable: true,
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
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
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
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
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
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
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>
    <style>
    .btn-destroy {
        color: red;
    }
    </style>

### columns.command.click `Function`

The JavaScript function executed when the user clicks the command button. The function receives a [jQuery Event](https://api.jquery.com/category/events/event-object/) as an argument.

The function context (available via the `this` keyword) will be set to the grid instance.

> Grid custom commands are rendered as anchors (`<a>`) with no `href` value. Prevent the click event in the click function in order to avoid shifting of the page scroll position.

#### Example - handle the click event of the custom command button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{
            name: "details",
            click: function(e) {
                // prevent page scroll position change
                e.preventDefault();
                // e.target is the DOM element representing the button
                var tr = $(e.target).closest("tr"); // get the current table row (tr)
                // get the data bound to the current table row
                var data = this.dataItem(tr);
	              /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("Details for: " + data.name);
            }
          }]
       }
      ],
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

### columns.command.iconClass `String|Object`

The class for the [web font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) of the button.
When it is defined as an object it allows to customize the web font icon for the "edit", "update" and "cancel" command buttons.

> Grid commands are rendered as anchors (`<a>`) with a `span` inside. The icon for the button depends on the **iconClass** which is rendered as a class for the inner span.
> Default commands have a predefined **iconClass** value.

#### Example - provide an iconClass for the grid command column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{
            name: "copy",
            iconClass: "k-icon k-i-copy"
            }]
       }
      ],
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

#### Example - provide an custom iconClass for the update and cancel command buttons

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{
            name: "edit",
            iconClass: {
                edit: "k-icon k-i-edit",
                update: "k-icon k-i-copy",
                cancel: "k-icon k-i-arrow-60-up"
              }
            }]
       }
      ],
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      },
      editable: "inline"
    });
    </script>

### columns.command.iconClass.cancel `String`

The class for the [web font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) of the cancel command button.

#### Example - provide an custom iconClass for the cancel command button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{
            name: "edit",
            iconClass: {
                cancel: "k-icon k-i-copy"
              }
            }]
       }
      ],
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      },
      editable: "inline"
    });
    </script>

### columns.command.iconClass.edit `String`

The class for the [web font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) of the edit command button.

#### Example - provide an custom iconClass for the edit command button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{
            name: "edit",
            iconClass: {
                edit: "k-icon k-i-edit"
              }
            }]
       }
      ],
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      },
      editable: "inline"
    });
    </script>

### columns.command.iconClass.update `String`

The class for the [web font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) of the update command button.

#### Example - provide an custom iconClass for the update command button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{
            name: "edit",
            iconClass: {
                update: "k-icon k-i-copy"
              }
            }]
       }
      ],
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      },
      editable: "inline"
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
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

### columns.command.template `String`

The template of the command column.

> Add the `k-grid-[command.name]` to any element in the template which requires the [`click`](#columns.command.click) handler to be called.

#### Example - customize the template of the command column

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { command: [
            {
              // for click to work when there is template, add class "k-grid-[command.name]" to some element, otherwise the click handler will not be triggered
              name: "settings",
              template: "Some text in the command column <a class='k-button k-grid-settings'><span class='k-icon k-i-settings'></span>Settings</a>",
              click(e){
                kendo.alert("Settings clicked!")
              }
            }
          ]
          }
        ],
        dataSource: [{ name: "Jane Doe" }]
      });
    </script>

### columns.command.text `String|Object`

The text displayed by the command button and the "cancel", "edit" and "update" texts of the edit command. If not set the [name](columns.command.name) option is used as the button text.

#### Example - customize the text of the command

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "destroy", text: "Remove" }] }
      ],
      editable: true,
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
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
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
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
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
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
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

### columns.command.visible `Function`

The JavaScript function executed on initialization of the row which will determine whether the command button will be visible. The function receives a the data item object for the row as an argument.

#### Example - set the command name

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "edit", visible: function(dataItem) { return dataItem.name==="Jane" } }] }
      ],
      editable: "popup",
      dataSource: {
        data: [ { name: "Jane" }, { name: "Bill" } ],
        schema: {
          model: {
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

### columns.dataSource `Object|kendo.data.DataSource`

The data source of the values for the foreign key columns. Can be a JavaScript object which represents a valid data source configuration or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

> **Note:** When the dataSource property is set one should also set the [dataTextField](columns.dataTextField) and [dataValueField](columns.dataValueField).

### columns.dataTextField `String`

The data text field of the foreign key item.

### columns.dataValueField `String`

The data value field of the foreign key item.

### columns.draggable `Boolean` *(default: false)*

If set to `true` a draghandle will be rendered and the user could reorder the rows by dragging the row via the drag handle. If the [selectable](/api/javascript/ui/grid/configuration/selectable) option is enabled for rows only selected rows will can be dragged and reordered.

> Note that the reordering operation is only a client-side operation and it does not reflect the order of any data that is bound to the server.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { draggable: true },
        { field: "name" }
      ],
      dataSource: [
        { id:1, name: "Jane Doe" },
        { id:2, name: "John Doe" }
      ]
    });
    </script>

### columns.editable `Function`

The JavaScript function executed when the cell/row is about to be opened for edit. The result returned will determine whether an editor for the column will be created.

#### Example - conditionally edit a cell

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name",
           editable: function (dataItem) {
             return dataItem.name === "Jane"; // Name editor is created only if dataItem name is Jane
           }
          },
          {
            field: "salary",
            editable: function (dataItem) {
              return dataItem.name === "Jane"; // Salary editor is created only if dataItem name is Jane
            }
          }
        ],
        editable: true,
        dataSource: [ { name: "Jane", salary: 2000 }, { name: "Bill", salary: 2000 } ]
      });
    </script>

### columns.editor `String|Function`

Provides a way to specify a custom editing UI for the column. Use the `container` parameter to create the editing UI.

> The editing UI should contain an element whose `name` HTML attribute is set as the column [field](columns.field).

> Validation settings defined in the `model.fields` configuration will **not** be applied automatically. In order the validation to work, **the developer is responsible for attaching the corresponding validation attributes to the editor input** the `data-bind` attribute is whitespace sensitive. In case the custom editor is a widget, the developer should [customize the validation warning tooltip position](/framework/validator/overview#customizing-the-tooltip-position) in order to avoid visual issues.

When used as `String`, defines the editor widget type. For further info check the Form API: [`field`](/api/javascript/ui/form/configuration/items#itemseditor)

#### Parameters

##### container `jQuery`

The jQuery object representing the container element.

##### options `Object`

##### options.field `String`

The name of the field to which the column is bound.

##### options.format `String`

The format string of the column specified via the [format](columns.format) option.

##### options.model `kendo.data.Model`

The model instance to which the current table row is bound.

##### options.values `Array`

Array of values specified via the [values](columns.values) option.

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

> Check [Editing custom editor](https://demos.telerik.com/kendo-ui/grid/editing-custom) for a live demo.

#### Example - create a custom column editor using String literal

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "num",
        editor: "NumericTextBox"
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

### columns.editorOptions `Object`

Defines the widget configuration when one is initialized as editor for the column (or the widget defined in `items.editor`). For further info check the Form API: [`field`](/api/javascript/ui/form/configuration/items#itemseditoroptions).

#### Example - create a custom column editor using String literal

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "num",
        editor: "NumericTextBox",
        editorOptions: { step: 2 }
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

### columns.exportable `Boolean|Object` *(default: true)*

> If the column isn't visible, the `exportable` property must be set to `true` explicitly.

If set to `false` the column will be excluded from the exported Excel/PDF files.

Can be set to a JavaScript object which specifies whether the column should be exported per format.

### columns.exportable.excel `Boolean` *(default: true)*

If set to `false` the column will be excluded from the exported Excel file.

#### Example - Exclude UnitsInStock column from the exported Excel file.

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["excel"],
      dataSource: {
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        },
        schema:{
          model: {
            fields: {
              UnitsInStock: { type: "number" },
              ProductName: { type: "string" },
              UnitPrice: { type: "number" },
              UnitsOnOrder: { type: "number" },
              UnitsInStock: { type: "number" }
            }
          }
        },
        pageSize: 20,
      },
      pageable: true,
      height: 550,
      columns: [
        { field: "ProductName", title: "Product Name" },
        { field: "UnitPrice", title: "Unit Price" },
        { field: "UnitsOnOrder", title: "Units On Order" },
        { field: "UnitsInStock", title: "Units In Stock", exportable: { excel: false} } //excluded from the export
      ]
    });
    </script>

### columns.exportable.pdf `Boolean` *(default: true)*

If set to `false` the column will be excluded from the exported PDF file.

### columns.field `String`

The field to which the column is bound. The value of this field is displayed in the column's cells during data binding.
Only columns that are bound to a field can be sortable or filterable.
**The field name should be a valid Javascript identifier and should contain only alphanumeric characters (or "$" or "_"), and may not start with a digit.**

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
for all columns when filtering is enabled via the [filterable](filterable) option.

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
      dataSource: {
      	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
        schema:{
        	model:{
            	fields: {
                	age: { type: "number" }
                }
            }
        }
      }
    });
    </script>

### columns.filterable.cell.dataSource `Object|kendo.data.DataSource`

Specifies a custom dataSource for the AutoComplete when the type of the column is `string`. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array, or an existing [`kendo.data.DataSource`](/api/javascript/data/datasource) instance.

It is not recommended that you use the same `dataSource` instance for the Grid and the AutoComplete because it causes negative side effects.

If the `dataSource` options is missing, a new cloned instance of the Grid's dataSource will be used.

If the `dataSource` option is an existing [`kendo.data.DataSource`](/api/javascript/data/datasource) instance, the widget will use that instance and will _not_ initialize a new one.

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
      dataSource: {
      	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
        schema:{
        	model:{
            	fields: {
                	age: { type: "number" }
                }
            }
        }
      }
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
              { field: "age" }
            ],
            filterable: { mode: "row" },
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
         });
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
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
          });
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
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
          });
    </script>

### columns.filterable.cell.suggestionOperator `String` *(default: "startswith")*

Specifies the AutoComplete `filter` option. The possible values are the same as the ones for the AutoComplete `filter` option - `"startswith"`, `"endswith"`, `"contains"`. The `"contains"` operator performs a case-insensitive search. To perform a case-sensitive filtering, set a custom filtering function through the [`dataSource.filter.operator`](/api/javascript/data/datasource/configuration/filter.operator) option.

> This operator is completely independent from the operator used for the filtering on this column. For more inforamtion, check [`operator`](columns.filterable.cell.operator).

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
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
          });
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
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
            });
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
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
          });
    </script>

### columns.filterable.cell.operator `String` *(default: "eq")*

Specifies the default operator that will be used for the cell filtering.

> If you want to change how the AutoComplete suggestions are filtered use [suggestionOperator](columns.filterable.cell.suggestionoperator).

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
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" },
                        name: {type: "string"}
                      }
                  }
              }
            }
         });
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
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
          });
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
                { field: "size" } ],
            filterable: { mode: "row" },
            dataSource: [ { color: "#ff0000", size: 30 }, { color: "#000000", size: 33 }] });
    </script>

#### Example - use a Kendo UI DropDownList for a boolean column filter

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [ "name", {
          field: "employed",
          filterable:{
            cell:{
              template:function(args){
                args.element.kendoDropDownList({
                  dataSource: [{ value: true, text: "True" }, { value: false, text: "False" }],
                  optionLabel: "--Select--",
                  dataTextField: "text",
                  dataValueField: "value"
                });
              }
            }
          }
        }],
        filterable: { mode: "row"},
        dataSource: {
          data:[{ name: "John Doe" , employed: true }, { name: "Jane Doe", employed: true }, { name: "Tim Doe", employed: false} ],
          schema:{
            model:{
              fields:{
                employed: { type: "boolean" }
              }
            }
          }
        }
      });
    </script>

### columns.filterable.extra `Boolean` *(default: true)*

If set to `true` the filter menu of the column allows the user to input a second criterion.

#### Example - disable the second filter criterion for the name field.

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" , filterable : { extra: false }},
          { field: "age" }
        ],
        filterable: true,
        dataSource: {
         data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
          schema:{
          	model:{
              	fields: {
                  	age: { type: "number" }
                  }
              }
          }
        }
      });
    </script>

### columns.filterable.multi `Boolean` *(default: false)*

Use this option to enable the MultiCheck filtering support for that column.

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

The dataSource configuration for the items that will be used when [columns.filterable.multi](columns.filterable.multi) is enabled.

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
      }],
    filterable: true,
      dataSource: [ { country: "BG" }, { country: "USA" } ]
    });
    </script>

### columns.filterable.itemTemplate `Function`

Allows customization on the logic that renders the checkboxes when using checkbox filtering.

#### Example - provide custom DataSource for the FilterMultiCheck filtering.

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            columns: [ {
                field: "country",
                filterable: {
                    multi:true,
                    itemTemplate: function(e) {
                        return ({country, all}) => `<span><label><span>${country || all}</span><input type='checkbox' name='" + e.field + "' value='${country}'/></label></span>`
                    }
                }
            }],
            filterable: true,
            dataSource: [ { country: "BG" }, { country: "USA" } ]
        });
    </script>

### columns.filterable.operators `Object`

The property is identical to [`filterable.operators`](filterable.operators), but is used for a specific column.

#### Example - Set custom filterable operators

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          {
            field: "name",
            filterable:{
              operators:{
                string:{
                  eq: "custom equal",
                  neq: "custom not equal"
                }
              }
            }
          },
          { field: "age" }
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
                name: { type: "string" },
                age: { type: "number" }
              }
            }
          }
        },
        filterable: {
          extra: false
        }
      });
    </script>

### columns.filterable.search `Boolean` *(default: false)*
Controls whether to show a search box when [checkbox filtering](columns.filterable.multi) is enabled.

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
Toggles between case-insensitive (default) and case-sensitive [searching](columns.filterable.search).

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

> This feature is not supported for columns which have their [values](columns.values) option set.

> If [filterable.mode](filterable.mode) is set to 'row', [columns.filterable.cell.template](columns.filterable.cell.template) should be used to customize the input.

#### Parameters

##### element `HTML Element`

An html input element that will be rendered in the filter menu.

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

#### Example - Replace the default input with a textarea element

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        filterable: {
          extra: false,
          ui: function(element) {
            $(element).replaceWith("<textarea data-bind='value:filters[0].value'></textarea>"); // Replace the input element with an HTML textarea
          }
        }
      } ],
        filterable: true,
        dataSource: [ { name: "John" }, { name: "Mark" }, { name: "Tom" } ]
    });
    </script>

#### Example - use a Kendo UI DropDownList for a boolean column

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [ "name", {
          field: "employed",
          filterable:{
            ui: function(element){
              element.kendoDropDownList({
                dataSource: [{ value: true, text: "True" }, { value: false, text: "False" }],
                optionLabel: "--Select--",
                dataTextField: "text",
                dataValueField: "value"
              });
            }
          }
        } ],
        filterable: true,
        dataSource: {
          data:[{ name: "John Doe" , employed: true }, { name: "Jane Doe", employed: true }, { name: "Tim Doe", employed: false} ],
          schema:{
            model:{
              fields:{
                employed: { type: "boolean" } // defining the field provides filterable.extra false out of the box for the column
              }
            }
          }
        }
      });
    </script>

> Check [Filter menu customization](https://demos.telerik.com/kendo-ui/grid/filter-menu-customization) for a live demo.

### columns.footerAttributes `Object`

HTML attributes of the column footer. The `footerAttributes` option can be used to set the HTML attributes of that cell.

> HTML attributes which are JavaScript keywords (e.g. *class*) must be quoted.

#### Example - set the column footer HTML attributes

    <div id="grid"></div>
    <script>
        let encode = kendo.htmlEncode;
        $("#grid").kendoGrid({
          columns: [
            { field: "name" },
            { field: "age",
              footerTemplate: ({ age }) => `Min: ${encode(age.min)} Max: ${encode(age.max)}`,
              footerAttributes: {
                  "class": "table-footer-cell k-text-right",
                  style: "font-size: 14px"
              }
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

The table footer cell will look like this: `<td class="table-footer-cell" style="text-align: right; font-size: 14px">Min: 30 Max: 33</td>`.

### columns.footerTemplate `String|Function`
The [template](/api/javascript/kendo/methods/template) which renders the footer table cell for the column.

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
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          footerTemplate: ({ age }) => `Min: ${encode(age.min)} Max: ${encode(age.max)}`,
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
         data-columns='["category", "name", {"field": "price", "footerTemplate": ({price}) => `Total: ${kendo.htmlEncode(price ? price.sum : 0)}`}]'></div>
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
         data-columns='["category", "name", {"field": "price", "footerTemplate": ({price}) => `Total: ${kendo.htmlEncode(price ? price.sum : 0)}`}]'></div>
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

The format that is applied to the value before it is displayed.

Takes the form "{0:format}" where "format" can be a:

* [default number format](/globalization/intl/numberformatting#default-number-formats)
* [custom number format](/globalization/intl/numberformatting#custom-number-formats)
* [default date format](/globalization/intl/dateformatting#default-date-formats)
* [custom date format](/globalization/intl/dateformatting#custom-date-formats)

> The [kendo.format](/api/javascript/kendo/methods/format) function is used to format the value.

#### Example - specify default column format for a number field

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [ {
          field: "product",
        }, {
          field: "number",
          format: "{0:c}"
        } ],
        dataSource: [ { product: "Chai", number: 3.1415 } ]
      });
    </script>

#### Example - specify custom column format for a number field

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [ {
          field: "product",
        }, {
          field: "number",
          format: "{0:0.0000}"
        } ],
        dataSource: [ { product: "Chai", number: 94 } ]
      });
    </script>


#### Example - specify default format for a date field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "date",
        format: "{0:g}"
      }, {
        field: "product"
      } ],
      dataSource: [ { date: new Date(), product: "Chai" } ]
    });
    </script>

#### Example - specify custom format for a date field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "date",
        format: "{0: yyyy-MM-dd HH:mm:ss}"
      }, {
        field: "product"
      } ],
      dataSource: [ { date: new Date(), product: "Chai" } ]
    });
    </script>


### columns.groupable `Boolean|Object` *(default: true)

If set to `false` the user will not be able to group the grid by this column (requires Grid [`groupable`](/api/javascript/ui/grid/configuration/groupable) property to be enabled). By default all columns are groupable.

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

### columns.groupable.sort `Object`

Sets the sort configuration when grouping.

#### Example - use a custom function to compare the groups

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                data: [
                    { id: 1, name: "Salmon", category: "Seafood" },
                    { id: 3, name: "Ice cream", category: "Desserts" },
                    { id: 2, name: "Mackerel", category: "Seafood" },
                    { id: 4, name: "Cake", category: "Desserts" },
                    { id: 5, name: "Lemonade", category: "Beverages" },
                    { id: 6, name: "Tea", category: "Beverages" },
                    { id: 7, name: "Coffee", category: "Beverages" },
                ],
                pageSize: 10
            },
            pageable: true,
            height: 550,
            groupable: true,
            columns: [
                { field: "id", title: "Id", width: "120px" },
                { field: "name", title: "Name", width: "120px" },
                {
                    field: "category",
                    title: "Category",
                    width: "120px",
                    groupable: {
                        sort: {
                            compare: function(a, b) {
                                if (a.items.length === b.items.length) {
                                    return 0;
                                } else if (a.items.length > b.items.length) {
                                    return 1;
                                } else {
                                    return -1;
                                }
                            }
                        }
                    }
                }
            ]
        });
    </script>

### columns.groupable.sort.compare `Function`

A JavaScript function which is used to compare the groups (refer to [`sortable.compare`](/api/javascript/ui/grid/configuration/columns.sortable#columns.sortable.compare) for comparing the items of the groups). It has the same signature as the [compare function accepted by Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).


#### Example - use a custom function to compare the groups

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                data: [
                    { id: 1, name: "Salmon", category: "Seafood" },
                    { id: 3, name: "Ice cream", category: "Desserts" },
                    { id: 2, name: "Mackerel", category: "Seafood" },
                    { id: 4, name: "Cake", category: "Desserts" },
                    { id: 5, name: "Lemonade", category: "Beverages" },
                    { id: 6, name: "Tea", category: "Beverages" },
                    { id: 7, name: "Coffee", category: "Beverages" },
                ],
                pageSize: 10
            },
            pageable: true,
            height: 550,
            groupable: true,
            columns: [
                { field: "id", title: "Id", width: "120px" },
                { field: "name", title: "Name", width: "120px" },
                {
                    field: "category",
                    title: "Category",
                    width: "120px",
                    groupable: {
                        sort: {
                            compare: function(a, b) {
                                if (a.items.length === b.items.length) {
                                    return 0;
                                } else if (a.items.length > b.items.length) {
                                    return 1;
                                } else {
                                    return -1;
                                }
                            }
                        }
                    }
                }
            ]
        });
    </script>

### columns.groupable.sort.dir `String` *(default: asc)*

The sort order of the groups according to the group field.

The supported values are:

*  `"asc"` (ascending order)
* `"desc"` (descending order)

#### Example - sort the groups in descending order

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                data: [
                    { id: 1, name: "Salmon", category: "Seafood" },
                    { id: 3, name: "Ice cream", category: "Desserts" },
                    { id: 2, name: "Mackerel", category: "Seafood" },
                    { id: 4, name: "Cake", category: "Desserts" },
                    { id: 5, name: "Lemonade", category: "Beverages" },
                    { id: 6, name: "Tea", category: "Beverages" },
                    { id: 7, name: "Coffee", category: "Beverages" },
                ],
                pageSize: 10
            },
            pageable: true,
            height: 550,
            groupable: true,
            columns: [
                { field: "id", title: "Id", width: "120px" },
                { field: "name", title: "Name", width: "120px" },
                {
                    field: "category",
                    title: "Category",
                    width: "120px",
                    groupable: {
                        sort: {
                            dir: "desc"
                        }
                    }
                }
            ]
        });
    </script>

### columns.groupHeaderColumnTemplate `String|Function`

Introduced in the Kendo UI 2018 R3 release.

The [template](/api/javascript/kendo/methods/template) which renders the content for specific column in the group header when the grid is grouped by the column [field](columns.field).

> **Note:** The columns.groupHeaderTemplate has a higher priority than columns.groupHeaderColumnTemplate. If columns.groupHeaderTemplate is defined for the current group column it will take precedence over the columns.groupHeaderColumnTemplate setting of the currently first visible column. See [Group Templates](/web/grid/Templates/group-templates) for more details on how this can be useful.

The fields which can be used in the template are:

* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)
* data - provides access to all available aggregates, e.g. `data.fieldName1.sum` or `data.fieldName2.average`
* group - provides information for the current group. An object with three fields - `field`, `value` and `items`. `items` field contains the data items for current group. Returns groups if the data items are grouped (in case there are child groups)

> **Important**
>
> If the template is declared as a function the group field is accessible only through the data field,
> e.g. `data.fieldName1.group.value`.

#### Example - set the group header column template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupHeaderColumnTemplate: ({ age }) => `Total: ${age.count}`
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

#### Example - set the group header column template as function

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupHeaderColumnTemplate: function(e) {
              return "Total: " + e.age.count;
          }
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

### columns.groupHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the group header when the grid is grouped by the column [field](columns.field). By default the name of the field
and the current group value is displayed.

The fields which can be used in the template are:

* value - the current group value
* field - the current group field
* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)
* aggregates - provides access to all available aggregates, e.g. `aggregates.fieldName1.sum` or `aggregates.fieldName2.average`
* items - the data items for current group. Returns groups if the data items are grouped (in case there are child groups)

> **Important**
>
> To use aggregates from other fields in the `column.groupHeaderTemplate` add them to the **other** [`columns.aggregates`](#columns.aggregates).

#### Example - set the group header template

    <div id="grid"></div>
    <script>
     var grid = $("#grid").kendoGrid({
        groupable: true,
        columns: [
            { field: "name" },
            {
                field: "age",
                groupHeaderTemplate: ({ age, aggregates }) => `Age:${age.group.value} total: ${age.count} Max Year: ${aggregates.year.max}`,
                aggregates: ["count"]
            },
            { field: "year", aggregates: ["max"] }
        ],
        dataSource: {
            data: [
                { name: "Jane Doe", age: 30, year: 1978 },
                { name: "John Doe", age: 30, year: 1980 }
            ],
            group: {
                field: "age", aggregates: [{ field: "age", aggregate: "count" },
                { field: "age", aggregate: "max" }, { field: "year", aggregate: "max" }]
            }
        }
    }).data("kendoGrid");
    </script>

#### Example - use items field inside the group header template

    <div id="grid"></div>
    <script>
    var filterAdmins = function(item) {
      return item.role === "admin";
    };
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupHeaderTemplate: ({ items }) => `Admin count: ${items.filter(filterAdmins).length}`
        },
        {field: "role" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30, role: "admin" },
          { name: "John Doe", age: 30, role: "guest" },
          { name: "Peter", age: 30, role: "admin" }
        ],
        group: { field: "age", aggregates: [ { field: "age", aggregate: "count" }] }
      }
    });
    </script>

#### Example - set the group header template as a function

    <div id="grid"></div>
    <script>
      var grid = $("#grid").kendoGrid({
        groupable: true,
        columns: [
          { field: "name" },
          {
            field: "age",
            groupHeaderTemplate: groupHeaderTemp,
            aggregates: ["count"]
          },
          { field: "year", aggregates: ["max"] }
        ],
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30, year: 1978 },
            { name: "John Doe", age: 30, year: 1980 }
          ],
          group: {
            field: "age", aggregates: [
              { field: "age", aggregate: "count" },
              { field: "age", aggregate: "max" },
              { field: "year", aggregate: "max" }
            ]
          }
        }
      }).data("kendoGrid");

      function groupHeaderTemp(data) {
        return `Age: ${data.value} total: ${data.count} Max Year: ${data.aggregates.year.max}`;
      }
    </script>

### columns.groupFooterTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the group footer for the corresponding column. By default the group footer is not displayed. The group footer will always appear as long as at least one column has a defined groupFooterTemplate.

The fields which can be used in the template are:

* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)
* data - provides access to all available aggregates, e.g. `data.fieldName1.sum` or `data.fieldName2.average`
* group - provides information for the current group. An object with three fields - `field`, `value` and `items`. `items` field contains the data items for current group. Returns groups if the data items are grouped (in case there are child groups)

> **Important**
>
> If the template is declared as a function the group field is accessible only through the data field,
> e.g. `data.fieldName1.group.value`.

#### Example - set the group footer template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupFooterTemplate: ({ age }) => `Total: ${age.count}`
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

#### Example - set the group footer template as function

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupFooterTemplate: function(e) {
              return "Total: " + e.age.count;
          }
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
          "class": "table-header-cell !k-text-right",
          style: "font-size: 14px"
        }
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

The table header cell will look like this: `<th class="table-header-cell" style="text-align: right; font-size: 14px">name</th>`.

### columns.headerTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the column header content. By default the value of the [title](columns.title) column option
is displayed in the column header cell.

> If sorting is enabled, the column header content will be wrapped in a `<span>` element.

#### Example - column header template as a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        headerTemplate: '<input type="checkbox" id="check-all" /><label for="check-all">Check All</label>'
      }],
      selectable: "multiple",
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });

    $("#check-all").change(function(e){
      var grid = $("#grid").data("kendoGrid");
      var selected = grid.select();

      if(selected.length > 0) {
        grid.clearSelection();
      } else {
        grid.select("tr:eq(0), tr:eq(1)");
      }
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
      selectable: "multiple",
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });

    $("#check-all").change(function(e){
      var grid = $("#grid").data("kendoGrid");
      var selected = grid.select();

      if(selected.length > 0) {
        grid.clearSelection();
      } else {
        grid.select("tr:eq(0), tr:eq(1)");
      }
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

### columns.hideOnGroup `Boolean` *(default: false)*

If set to `true` the column will be hidden when the grid is groupd via user iteraction. The column will be displayed again if iteraction to ungroup by it is performed.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", hideOnGroup: true },
        { field: "name" }
      ],
      groupable: true,
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.locked `Boolean` *(default: false)*

If set to `true` the column will be displayed as locked (frozen) in the grid. Also see [Locked Columns](/controls/grid/columns/locked-columns) help section for additional information.

> **Important**: Row template and detail features are not supported in combination with column locking. If [multi-column headers](https://demos.telerik.com/kendo-ui/grid/multicolumnheaders) are used, it is possible to lock (freeze) a column at the topmost level only.

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

> This option is meaningful when the grid has columns which are configured with a [locked](columns.locked) value. Setting it explicitly to `false` will
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

### columns.media `String`

Sets the condition that needs to be satisfied for a column to remain visible. The property accepts valid strings for the [`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) browser API (assuming it is supported by the browser) and toggles the visibility of the columns based on the media queries.

The [`hidden`](/api/javascript/ui/grid/configuration/columns.hidden) option takes precedence over `media`. This option cannot be used with [`minScreenWidth`](/api/javascript/ui/grid/configuration/columns.minscreenwidth) at the same time.

Also accepts the device identifiers that are [available in Bootstrap 4](https://v4-alpha.getbootstrap.com/layout/grid/#grid-options):

* `xs` is equivalent to `"(max-width: 576px)"`
* `sm` is equivalent to `"(min-width: 576px)"`
* `md` is equivalent to `"(min-width: 768px)"`
* `lg` is equivalent to `"(min-width: 992px)"`
* `xl` is equivalent to `"(min-width: 1200px)"`

#### Example - set media

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
          { field: "id", width: 250, media: "(min-width: 576px)" }, // column will become hidden if the media query is evaluated to false
          { field: "age", width: 250, media: "sm" }, // use a Bootstrap media (equivalent to `"(min-width: 576px)"`)
          { field: "city", width: 250, media: "(max-width: 576px) and (min-width: 300px)" }, // column will be visible when the width of the screen is less than 576px and more than 300px
          { field: "name", width: 250 } // column will always be visible
      ],
      dataSource: [
          { id: 1, name: "Jane Doe", age: 31, city: "Boston" },
          { id: 2, name: "John Doe", age: 55, city: "New York" }
      ]
    });
    </script>

### columns.minResizableWidth `Number`

The pixel screen width below which the user will not be able to resize the column via the UI.

> This option is meaningful when the grid is set as [resizable](resizable).

#### Example - set the column width as a number

     <div id="grid"></div>
     <script>
     $("#grid").kendoGrid({
       resizable: true,
       columns: [
         { field: "name", minResizableWidth: 80 },
         { field: "age" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ]
     });
     </script>

### columns.minScreenWidth `Number`

The pixel screen width below which the column will be hidden. The setting takes precedence over the [`hidden`](/api/javascript/ui/grid/configuration/columns.hidden) setting,
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

### columns.selectable `Boolean` *(default: false)*

If set to `true` the grid will render a select column with checkboxes in each cell, thus enabling multi-row selection. The header checkbox allows users to select/deselect all the rows on the current page. The [`change`](/api/javascript/ui/grid/events/change) event is fired when a row is selected.

> Setting the [`columns.selectable`](/api/javascript/ui/grid/configuration/columns.selectable) to `true` overrides the [`selectable.mode`](/api/javascript/ui/grid/configuration/selectable.mode) configuration property if it is set to `"single"`.

More about the Grid Selection feature you can find in [this documentation article](/controls/grid/selection).

#### Example - enable multi-row selection by adding a select column with checkboxes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { selectable: true },
        { field: "name" }
      ],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

### columns.sortable `Boolean|Object` *(default: true)*

If set to `true` the user can click the column header and sort the grid by the column [field](columns.field) when sorting is enabled. If set to `false` sorting will
be disabled for this column. By default all columns are sortable if sorting is enabled via the [sortable](sortable) option.

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

### columns.sortable.allowUnsort `Boolean` *(default: true)*

If set to `true` the user can get the grid in unsorted state by clicking the sorted column header. If set to `false` the user will not be able to unsort the column once sorted.

#### Example - disable unsorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { sortable: { allowUnsort: false }, field: "id" },
        { field: "name" }
      ],
      sortable: true,
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.sortable.compare `Function`

A JavaScript function which is used to compare the values. It has the same signature as the [compare function accepted by Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

> The compare function works only when [`serverSorting`](/api/javascript/data/datasource/configuration/serversorting) is set to **false**.

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

### columns.sortable.initialDirection `String` *(default: asc)*

Determines the inital (from un-sorted to sorted state) sort direction. The supported values are `asc` and `desc`.

#### Example - disable sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        {
          field: "id",
          sortable: {
            initialDirection: "desc"
          }
        },
        { field: "name" }
      ],
      sortable: true,
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.sticky `Boolean` *(default: false)*

If set to `true` the column will be displayed as sticky in the grid. Also see [Sticky Columns](/controls/grid/columns/sticky-columns) help section for additional information.

> **Important**: Row template and detail features are not supported in combination with sticky columns. If [multi-column headers](https://demos.telerik.com/kendo-ui/grid/multicolumnheaders) are used, it is possible to stick a column at the topmost level only.

#### Example - sticky columns

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400, sticky: true },
        { field: "age", width: 800 }
      ],
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    </script>

### columns.stickable `Boolean` *(default: false)*

If set to `true` the user will be able to stick or unstick the column from the column menu.

#### Example - stickable columns

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800 }
      ],
      columnMenu: true,
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    </script>

### columns.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the column content. The grid renders table rows (`<tr>`) which represent the data source items.
Each table row consists of table cells (`<td>`) which represent the grid columns. By default the HTML-encoded value of the [field](columns.field) is displayed in the column.

> Use the `template` to customize the way the column displays its value.

For additional and more complex examples that utilize column templates, visit the [`Knowledge Base`](https://docs.telerik.com/kendo-ui/knowledge-base) documentation, and use the following search terms:

- column template
- grid column template
- Column Template | Kendo UI Grid

#### Example - set the template as a string literal

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        template: ({ name }) => `<strong>${kendo.htmlEncode(name)}</strong>` //name is the field name
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

The text that is displayed in the column header cell. If not set the [field](columns.field) is used.

> **Note:** Column titles should not contain HTML entities or tags. If such exist, they should be encoded.

#### Example - set the title of the column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ { field: "name", title: "Name" } ],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

### columns.width `String|Number`

The width of the column. Numeric values are treated as pixels. The width option supports the fundamental measuring units. For instance:

* `px` sets the width in pixels
* `cm` sets the width in centimeters
* `mm` sets the width in millimeters
* `%` sets the width relative to the grid's element width
* `em` sets the width relative to the font-size of the grid's element width
* `rem` sets the width relative to font-size of the root element

**For more important information, please refer to [Column Widths](/controls/grid/columns/widths)**.

Grid options, including column widths, can be set programmatically after Grid initialization with the [`setOptions`](/api/javascript/ui/grid/methods/setoptions) method.

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

#### Example - specify column values using the MVVM design pattern

    <div id="example">
      <div data-role="grid"
           data-columns="[
                         { 'field': 'productName' },

                         { 'field': 'category', 'values': [

                         { 'text': 'Beverages', 'value': 1 },

                         { 'text': 'Food', 'value': 2 }

                         ]}

                         ]"
           data-bind="source: products" ></div>

      <script>
        var viewModel = kendo.observable({
          products: [
            { productName: "Tea", category: 1 },
            { productName: "Ham", category: 2 }
          ]
        });
        kendo.bind($("#example"), viewModel);
      </script>
    </div>

> Check [ForeignKey column](https://demos.telerik.com/kendo-ui/grid/foreignkeycolumn) for a live demo.

### columns.menu `Boolean`

If set to `true` the column will be visible in the grid column menu. By default the column menu includes all data-bound columns (ones that have their [field](columns.field) set).

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

> Check [Column menu](https://demos.telerik.com/kendo-ui/grid/column-menu) for a live demo.

### columnMenu.autoSize `Boolean` *(default: false)*

If set to `true` the column menu would allow the user to fit one or all columns to the width of their content. This setting is available only when the `tabbed` [componentType](/api/javascript/ui/grid/configuration/columnmenu.componenttype) is used.

#### Example - disable column selection

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        autoSize: true,
        componentType: "tabbed"
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.columns `Boolean|Object` *(default: true)*

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

### columnMenu.columns.sort `String` *(default: null)*

The sort order which will be applied over the columns list. By default, the columns menu items are in the same order as the columns in the grid.

The supported values are:

* `"asc"` (ascending order)
* `"desc"` (descending order)

#### Example - sort column menu columns list in descending order

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { field: "city" }
      ],
      columnMenu: {
        columns: {
          sort: "desc"
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30, city: "London" },
        { name: "John Doe", age: 33, city: "Madrid" }
      ]
    });
    </script>

### columnMenu.columns.groups `Array` *(default: null)*

The user defined groups of the columns visibility list.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", title: 'Name' },
        { field: "age", title: 'Age' }
      ],
      columnMenu: {
        columns: {
          groups: [
            { title: 'first group', columns: ['Age'] },
            { title: 'second group', columns: ['Name'] }
          ]
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.columns.groups.columns `Array` *(default: null)*

The titles of the columns that are part of the group. In case some column does not have a specified title, you can use the field instead. Columns that don't have specified either a title or a field, are not displayed in the column menu.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", title: 'Name' },
        { field: "age" }
      ],
      columnMenu: {
        columns: {
          groups: [
            { title: 'first group', columns: ['age'] }, // field is used instead of title, as the age column does not have a specified title
            { title: 'second group', columns: ['Name'] }
          ]
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.columns.groups.title `String` *(default: null)*

The text displayed in the header of the group.

### columnMenu.filterable `Boolean` *(default: true)*

If set to `true` the column menu would allow the user to filter the grid. By default the column menu allows the user to filter if filtering is enabled via the [filterable](filterable).

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

### columnMenu.componentType `String`*(default: "classic")*

 Specifies the component type of the column menu.

* `"classic"` - Uses the standard rendering of the column menu.
* `"modern"` - Uses new rendering with a fresh and modern look and feel.
* `"tabbed"` - Uses the rendering of the `"modern"` menu, but splits its content into different tabs.

### columnMenu.sortable `Boolean` *(default: true)*

If set to `true` the column menu would allow the user to sort the grid by the column field. By default the column menu allows the user to sort if sorting is enabled via the [sortable](sortable) option.

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

### columnMenu.messages.apply `String` *(default: "Apply")*

The text of the button which applies the columns filter.

> The button is visible when the column menu [componentType](/api/javascript/ui/grid/configuration/columnmenu.componenttype) is set to `modern` or `tabbed`.

#### Example - column menu apply button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width:200 },
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        componentType: "modern",
        messages: {
          apply: "Apply Columns"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.autoSizeColumn `String` *(default: "Autosize This Column")*

The text of the autosize single column option.

> The autosize option is visible when the column menu [componentType](/api/javascript/ui/grid/configuration/columnmenu.componenttype) is set to `tabbed`.

#### Example - column menu apply button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width:200 },
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        componentType: "tabbed",
        autoSize: true,
        messages: {
          autoSizeColumn: "Custom Autosize this column"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.autoSizeAllColumns `String` *(default: "Autosize All Columns")*

The text of the autosize single column option.

> The autosize option is visible when the column menu [componentType](/api/javascript/ui/grid/configuration/columnmenu.componenttype) is set to `tabbed`.

#### Example - column menu apply button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width:200 },
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        componentType: "tabbed",
        autoSize: true,
        messages: {
          autoSizeAllColumns: "Custom Autosize all columns"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.buttonTitle `String` *(default: "{0} edit column settings")*

The title of the button that displays the ColumnMenu.

> The {0} argument represents the field name

#### Example - set the ColumnMenu "buttonTitle" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        messages: {
          buttonTitle: "{0} Column Menu"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
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

### columnMenu.messages.lock `String` *(default: "Lock Column")*

The text message displayed in the column menu for locking a column.

#### Example - column menu lock button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { locked: true, field: "id", width:200 },
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        messages: {
          lock: "Pin this column"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.moveNext `String` *(default: "Move next")*

The text message that is displayed for the Move to next position column menu item.

### columnMenu.messages.movePrev `String` *(default: "Move previous")*

The text message that is displayed for the Move to previous position column menu item.

### columnMenu.messages.groupColumn `String` *(default: "Group column")*

The text message that is displayed for the Group column menu item.

### columnMenu.messages.ungroupColumn `String` *(default: "Ungroup column")*

The text message that is displayed for the Ungroup column menu item.

### columnMenu.messages.reset `String` *(default: "Reset")*

The text of the button which resets the columns filter.

> The button is visible when the column menu [componentType](/api/javascript/ui/grid/configuration/columnmenu.componenttype) is set to `modern` or `tabbed`.

#### Example - column menu reset button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width:200 },
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        componentType: "modern",
        messages: {
          reset: "Reset Columns"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
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

### columnMenu.messages.setColumnPosition `String` *(default: "Set Column Position")*

The text message displayed in the column menu for the column position item.

#### Example - column menu set column position text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800 }
      ],
      columnMenu: {
        messages: {
          setColumnPosition: "Change Position"
        }
      },
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
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
      height: 550,
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.stick `String` *(default: "Stick Column")*

The text message displayed in the column menu for sticking a column.

#### Example - column menu stick button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800 }
      ],
      columnMenu: {
        messages: {
          stick: "Stick this column"
        }
      },
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.unstick `String` *(default: "Unstick Column")*

The text message displayed in the column menu for unsticking a column.

#### Example - column menu unstick button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800 }
      ],
      columnMenu: {
        messages: {
          unstick: "Unstick this column"
        }
      },
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.unlock `String` *(default: "Unlock Column")*

The text message displayed in the column menu for unlocking a column.

#### Example - column menu unlock button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { locked: true, field: "id", width:200 },
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        messages: {
          unlock: "Unpin this column"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### contextMenu `Object|Boolean` *(default: false)*

Configures the ContextMenus of the Grid.

#### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            contextMenu: true,
            editable: true,
            sortable: true,
            draggable: true,
            reorderable: true,
            dataSource: new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            name: "name",
                            foo: "foo",
                        },
                    },
                },
                data: [
                    { foo: "bar", name: "tom" },
                    { foo: "baz", name: "jerry" },
                ],
            }),
        });
    </script>

### contextMenu.body `Array`

Configures the items of the ContextMenu for the table body element. Those are some valid predifined tools: "separator", "create", "edit", "destroy", "select", "copySelection",."copySelectionNoHeaders", "reorderRow", "exportPDF", "exportExcel", "sortAsc", "sortDesc". 

You can also specify a custom item and accosiate it with a command.

#### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            contextMenu: {
                body: [
                    "exportPDF",
                    "exportExcel",
                    { name: "MyCustomCommand", text: "My Custom Command", icon: "gear", command: "CustomCommand" }
                ]
                // You can also concat to the default tools
                // body: kendo.ui.grid.defaultBodyContextMenu.concat([
                //     { name: "MyCustomCommand", text: "My Custom Command", icon: "gear", command: "CustomCommand" }
                // ])
            },
            editable: true,
            sortable: true,
            draggable: true,
            reorderable: true,
            dataSource: new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            name: "name",
                            foo: "foo",
                        },
                    },
                },
                data: [
                    { foo: "bar", name: "tom" },
                    { foo: "baz", name: "jerry" },
                ],
            }),
        });

        kendo.ui.grid.commands["CustomCommand"] = kendo.ui.grid.GridCommand.extend({
            exec: function() {
                var that = this,
                    grid = that.grid;

                grid.saveAsPDF();
            }
        });
    </script>


### contextMenu.body.name `String`
Specifies the name of the item.

### contextMenu.body.text `String`
Specifies the text of the item.

### contextMenu.body.icon `String`
Specifies the icon of the item.

### contextMenu.body.command `String`
Specifies the command of the item.

### contextMenu.groups `Array`

Configures the items of the ContextMenu for the group elements in the Grid header. Those are some valid predifined tools: "separator", "moveGroupPrevious", "moveGroupNext". 

You can also specify a custom item and accosiate it with a command.

#### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            contextMenu: {
                groups: [
                    "moveGroupPrevious",
                    "moveGroupNext",
                    { name: "MyCustomCommand", text: "My Custom Command", icon: "gear", command: "CustomCommand" }
                ]
                // You can also concat to the default tools
                // body: kendo.ui.grid.defaultGroupsContextMenu.concat([
                //     { name: "MyCustomCommand", text: "My Custom Command", icon: "gear", command: "CustomCommand" }
                // ])
            },
            groupable: true,
            dataSource: new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            name: "name",
                            foo: "foo",
                        },
                    },
                },
                data: [
                    { foo: "bar", name: "tom" },
                    { foo: "baz", name: "jerry" },
                ],
            }),
        });

        kendo.ui.grid.commands["CustomCommand"] = kendo.ui.grid.GridCommand.extend({
            exec: function() {
                var that = this,
                    grid = that.grid;

                // e.g., clear groups
                grid.dataSource.group([]);
            }
        });
    </script>


### contextMenu.groups.name `String`
Specifies the name of the item.

### contextMenu.groups.text `String`
Specifies the text of the item.

### contextMenu.groups.icon `String`
Specifies the icon of the item.

### contextMenu.groups.command `String`
Specifies the command of the item.

### contextMenu.head `Array`

Configures the items of the ContextMenu for the table head element. Those are some valid predifined tools: "separator", "create", "edit", "destroy", "select", "copySelection",."copySelectionNoHeaders", "reorderRow", "exportPDF", "exportExcel", "sortAsc", "sortDesc". 

You can also specify a custom item and accosiate it with a command.

#### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            contextMenu: {
                head: [
                    "sortAsc",
                    "sortDesc",
                    "exportExcel",
                    { name: "MyCustomCommand", text: "My Custom Command", icon: "gear", command: "CustomCommand" }
                ]
                // You can also concat to the default tools
                // head: kendo.ui.grid.defaultHeadContextMenu.concat([
                //     { name: "MyCustomCommand", text: "My Custom Command", icon: "gear", command: "CustomCommand" }
                // ])
            },
            editable: true,
            sortable: true,
            draggable: true,
            reorderable: true,
            dataSource: new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            name: "name",
                            foo: "foo",
                        },
                    },
                },
                data: [
                    { foo: "bar", name: "tom" },
                    { foo: "baz", name: "jerry" },
                ],
            }),
        });

        kendo.ui.grid.commands["CustomCommand"] = kendo.ui.grid.GridCommand.extend({
            exec: function() {
                var that = this,
                    grid = that.grid;

                grid.saveAsPDF();
            }
        });
    </script>


### contextMenu.head.name `String`
Specifies the name of the item.

### contextMenu.head.text `String`
Specifies the text of the item.

### contextMenu.head.icon `String`
Specifies the icon of the item.

### contextMenu.head.command `String`
Specifies the command of the item.

### contextMenu.close `Function`

Fires before a sub menu or the ContextMenu gets closed. You can cancel this event to prevent closure.  [ContextMenu Events](/api/javascript/ui/contextmenu#events).

### contextMenu.open `Function`

Fires before a sub menu or the ContextMenu gets opened. You can cancel this event to prevent opening the sub menu. [ContextMenu Events](/api/javascript/ui/contextmenu#events).

### contextMenu.activate `Function`

Fires when a sub menu or the ContextMenu gets opened and its animation finished. [ContextMenu Events](/api/javascript/ui/contextmenu#events).

### contextMenu.deactivate `Function`

Fires when a sub menu or the ContextMenu gets closed and its animation finished. [ContextMenu Events](/api/javascript/ui/contextmenu#events).

### contextMenu.select `Function`

Fires when a menu item gets selected. [ContextMenu Events](/api/javascript/ui/contextmenu#events).

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the Grid holds the items that will be rendered inside the widget. An item can be a JavaScript object which represents a valid data source configuration, a JavaScript array, or an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance.

If the `dataSource` option is set to a JavaScript object or array, the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance by using that value as a data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

> For live demos and more complex configurations, refer to the article on [binding the Grid to local data](https://demos.telerik.com/kendo-ui/grid/local-data-binding) and [binding the Grid to remote data](https://demos.telerik.com/kendo-ui/grid/remote-data-binding).

#### Example - set dataSource as a JavaScript object with data, page and pageSize properties

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        pageable: true,
        // The dataSource configuration is an object which contains some data and a couple of configurations.
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 },
            { name: "Mike Doe", age: 31 },
            { name: "Tom Doe", age: 35 },
            { name: "Danny Doe", age: 37 }
          ],
          pageSize: 2, // The number of items displayed per page
          page: 2 // Page 2 will be opened by default when the Grid loads.
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
      // The dataSource configuration is a simple array with no additional configurations.
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <div id="grid"></div>
    <script>
    // The dataSource is initialized as a stand-alone widget that can be bound to the Grid.
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          // The remote endpoint from which the data is retrieved.
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      },
      pageSize: 10
    });

    $("#grid").kendoGrid({
      // The dataSource configuration is set to an existing DataSource instance.
      dataSource: dataSource,
      pageable: true
    });
    </script>

### detailTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the detail rows.
Check [Detail Template](https://demos.telerik.com/kendo-ui/grid/detailtemplate) for a live demo.

> The detail template content cannot be wider than the total width of all master columns, unless the detail template is scrollable.

#### Example - specify detail template as a string literal

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
      detailTemplate: ({ name, age }) => `<div>Name: ${kendo.htmlEncode(name)}</div><div>Age: ${kendo.htmlEncode(age)}</div>`
    });
    </script>

### editable `Boolean|Object|String` *(default: false)*

If set to `true` the user would be able to edit the data to which the grid is bound. By default editing is disabled.

Can be set to a string ("inline", "incell" or "popup") to specify the editing mode. The default editing mode is "incell".

Can be set to a JavaScript object which represents the editing configuration.

> The "inline" and "popup" editing modes are triggered by the "edit" column command. Thus it is required to have a column with an "edit" command.
>
> The "incell" editing mode combined with DataSource `autoSync: true` setting is not supported when using server-side grouping in the Grid. To be able to save edited values on each change, you can disable server-side grouping or trigger a DataSource `sync()` manually inside the [`cellClose` event](/api/javascript/ui/grid/events/cellclose).

#### Example - enable editing

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        toolbar: ["save"],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
         data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
         ],
         schema:{
          model: {
           id: "id",
           fields: {
             age: { type: "number"}
           }
          }
         }
        },
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
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: "popup"
    });
    </script>

> Check [Batch editing](https://demos.telerik.com/kendo-ui/grid/editing), [Inline editing](https://demos.telerik.com/kendo-ui/grid/editing-inline) and [Popup editing](https://demos.telerik.com/kendo-ui/grid/editing-popup) for live demos.

### editable.confirmation `Boolean|String|Function` *(default: true)*

If set to `true` the grid will display a confirmation dialog when the user clicks the "destroy" command button.

Can be set to a string which will be used as the confirmation text.

Can be set to a function which will be called, passing the model instance, to return the confirmation text.

This and all Grid [`configuration properties`](/api/javascript/ui/grid#configuration) can be set (enabled/disabled) after the grid has been initialized with the [`setOptions`](/api/javascript/ui/grid/methods/setoptions) method.

#### Example - disable delete confirmation

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: {
        data: [
         { id: 1, name: "Jane Doe", age: 30 },
         { id: 2, name: "John Doe", age: 33 }
        ],
        schema:{
         model: {
          id: "id",
          fields: {
            age: { type: "number"}
          }
         }
        }
       },
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
       dataSource: {
        data: [
         { id: 1, name: "Jane Doe", age: 30 },
         { id: 2, name: "John Doe", age: 33 }
        ],
        schema:{
         model: {
          id: "id",
          fields: {
            age: { type: "number"}
          }
         }
        }
       },
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
       dataSource: {
        data: [
         { id: 1, name: "Jane Doe", age: 30 },
         { id: 2, name: "John Doe", age: 33 }
        ],
        schema:{
         model: {
          id: "id",
          fields: {
            age: { type: "number"}
          }
         }
        }
       },
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
       dataSource: {
        data: [
         { id: 1, name: "Jane Doe", age: 30 },
         { id: 2, name: "John Doe", age: 33 }
        ],
        schema:{
         model: {
          id: "id",
          fields: {
            age: { type: "number"}
          }
         }
        }
       },
       height: 550,
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
       dataSource: {
        data: [
         { id: 1, name: "Jane Doe", age: 30 },
         { id: 2, name: "John Doe", age: 33 }
        ],
        schema:{
         model: {
          id: "id",
          fields: {
            age: { type: "number"}
          }
         }
        }
       },
       mobile: "phone",
       height: 550,
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
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
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
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        destroy: false
      },
      toolbar: ["create"]
    });
    </script>

### editable.mode `String` *(default: "incell")*

The editing mode to use. The supported editing modes are "incell", "inline" and "popup".

> The "inline" and "popup" editing modes are triggered by the "edit" column command. Thus it is required to have a column with an "edit" command.

> As of Kendo UI version R3 2023, the `incell` editing of cells on mobile devices is activated on `double tap` of a Grid cell.


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
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        mode: "inline"
      }
    });
    </script>

#### Example - specify popup editing mode

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
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        mode: "popup"
      }
    });
    </script>

#### Example - specify incell editing mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["save"],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        mode: "incell"
      }
    });
    </script>

### editable.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders popup editor.

The template should contain elements whose `name` HTML attributes are set as the editable fields. This is how the grid will know
which field to update. The other option is to use [MVVM](/framework/mvvm/overview) bindings in order to bind HTML elements to data item fields.

> Use the `role` data attribute to initialize Kendo UI widgets in the template. Check [data attribute initialization](/framework/data-attribute-initialization) for more info.
> The validation that is set in `schema.model`(/api/javascript/data/datasource/configuration/schema.model) is not mapped automatically. As a result, when you use the `editable.template` option, you have to add the validation for every element manually.

To change the size of the popup editor you can follow the approach outlined in [this article](/knowledge-base/grid-adjust-popup-size).

#### Example - customize the popup editor

    <script id="popup-editor" type="text/x-kendo-template">
      <h3>Edit Person</h3>
      <p>
        <label>Name:<input id="nameInput" name="name" /></label>
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
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        mode: "popup",
        template: kendo.template($("#popup-editor").html())
      },
      edit: function (e) {
          //initialize Kendo UI TextBox for the name input
          $("#nameInput").kendoTextBox();
        }
    });
    </script>

#### Example - using MVVM in the popup editor template

    <script id="popup-editor" type="text/x-kendo-template">
      <h3>Edit Person</h3>
      <p>
        <label>Name:<input data-bind="value:name" /></label>
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
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
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
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
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
        var confirm =   window.confirm('Do you want to edit this record?');
        if(!confirm){
          e.preventDefault()
        }
      }

      var dataSource = new kendo.data.DataSource({
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      });

      $("#grid").kendoGrid({
        columns:['name','age', {command:'edit'}],
        dataSource:dataSource,
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

### encodeTitles `Boolean` *(default: false)*

If set to `true` the column title will be HTML-encoded before it is displayed. If set to `false` the column title will be displayed as is.

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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### excel.fileName `String` *(default: "Export.xlsx")*

Specifies the file name of the exported Excel file. Must end with ".xlsx".

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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### excel.filterable `Boolean` *(default: false)*

Enables or disables column filtering in the Excel file. When set to true the exported Excel file comes with turned on filtering for the column headers. Not to be mistaken with the grid filtering feature.

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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### excel.collapsible `Boolean` *(default: false)*

Enables or disables collapsible (grouped) rows, for grids with aggregates.

#### Example - enable collapsible rows in the output Excel file

    <div id="grid"></div>
    <script>
     $("#grid").kendoGrid({
       toolbar: ["excel"],
       excel: {
         fileName: "excel-collapsible.xlsx",
         proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
         filterable: true,
         collapsible: true
       },
       dataSource: {
         type: "odata",
         transport: {
           read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
         },
         schema:{
           model: {
             fields: {
               UnitsInStock: { type: "number" },
               ProductName: { type: "string" },
               UnitPrice: { type: "number" },
               UnitsOnOrder: { type: "number" },
               UnitsInStock: { type: "number" }
             }
           }
         },
         pageSize: 50,
         group: {
           field: "UnitsInStock", aggregates: [
             { field: "ProductName", aggregate: "count" },
             { field: "UnitPrice", aggregate: "sum"},
             { field: "UnitsOnOrder", aggregate: "average" },
             { field: "UnitsInStock", aggregate: "count" }
           ]
         },
         aggregate: [
           { field: "ProductName", aggregate: "count" },
           { field: "UnitPrice", aggregate: "sum" },
           { field: "UnitsOnOrder", aggregate: "average" },
           { field: "UnitsInStock", aggregate: "min" },
           { field: "UnitsInStock", aggregate: "max" }
         ]
       },
       sortable: true,
       pageable: true,
       groupable: true,
       filterable: true,
       columnMenu: true,
       reorderable: true,
       resizable: true,
       columns: [
         { field: "ProductName", title: "Product Name", aggregates: ["count"], footerTemplate: ({ ProductName }) => `Total Count: ${ProductName.count}`, groupFooterTemplate: ({ ProductName }) => `Count: ${ProductName.count}` },
         { field: "UnitPrice", title: "Unit Price", aggregates: ["sum"] },
         { field: "UnitsOnOrder", title: "Units On Order", aggregates: ["average"], footerTemplate: ({ UnitsOnOrder }) => `Average: ${UnitsOnOrder.average}`,
           groupFooterTemplate: ({ UnitsOnOrder }) => `Average: ${UnitsOnOrder.average}` },
         { field: "UnitsInStock", title: "Units In Stock", aggregates: ["min", "max", "count"], footerTemplate: ({ UnitsInStock }) => `Min: ${UnitsInStock.min} Max: ${UnitsInStock.max}`,
           groupHeaderTemplate: "Units In Stock: ${UnitsInStock.group.value} (Count: ${UnitsInStock.count})" }
       ]
     });
    </script>

### excel.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](excel.proxyurl) even if the browser supports saving files locally.

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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
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
              dataSource: {
               data: [
                { id: 1, name: "Jane Doe", age: 30 },
                { id: 2, name: "John Doe", age: 33 }
               ],
               schema:{
                model: {
                 id: "id",
                 fields: {
                   age: { type: "number"}
                 }
                }
               }
              }
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
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      }
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
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
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
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      filterable: {
        messages: {
          and: "and"
        }
      }
    });
    </script>

### filterable.messages.buttonTitle `String` *(default: "{0} filter column settings")*

The title of the button that displays the FilterMenu.

> The {0} argument represents the field name

#### Example - set the "buttonTitle" message

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
          buttonTitle: "{0} Filter Menu"
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
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
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
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
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
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
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
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      filterable: {
        messages: {
          or: "or"
        }
      }
    });
    </script>

### filterable.messages.search `String` *(default: "Search")*

The placeholder of the search input for columns with the [search](columns.filterable.search) option set to true.

#### Example - set the "search" message

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          {
            field: "category",
            filterable: {
              multi: true,
              search: true
            }
          }
        ],
        dataSource: [
          { category: "Foo" },
          { category: "Boo" }
        ],
        filterable: {
          messages: {
            search: "Search category"
          }
        }
      });
    </script>

### filterable.messages.selectValue `String` *(default: "-Select value-")*

The text of the DropDownList displayed in the filter menu for columns whose [values](columns.values) option is set.

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

### filterable.messages.selectedItemsFormat `String` *(default: "{0} items selected")*

The format string for selected items count in filter menu when [search](columns.filterable.multi) option set to true.

#### Example - set the "selectedItemsFormat" text

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          {
            field: "category",
            filterable: {
              multi: true,
              search: true
            }
          }
        ],
        dataSource: [
          { category: "Foo" },
          { category: "Boo" }
        ],
        filterable: {
          messages: {
            selectedItemsFormat: "There are {0} selected items"
          }
        }
      });
    </script>

### filterable.messages.operator `String` *(default: "Operator")*

The text displayed in the tooltip of the operator item in filter menu.

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
      height: 550,
      filterable: {
        messages: {
          operator: "Choose operator"
        }
      }
    });
    </script>

### filterable.messages.additionalOperator `String` *(default: "Additional operator")*

The text displayed in the tooltip of the additional operator item in filter menu.

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
      height: 550,
      filterable: {
        messages: {
          additionalOperator: "Choose operator"
        }
      }
    });
    </script>

### filterable.messages.value `String` *(default: "Value")*

The text displayed in the tooltip of the value item in filter menu.

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
      height: 550,
      filterable: {
        messages: {
          value: "Choose value"
        }
      }
    });
    </script>

### filterable.messages.additionalValue `String` *(default: "Additional value")*

The text displayed in the tooltip of the additional value item in filter menu.

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
      height: 550,
      filterable: {
        messages: {
          additionalValue: "Choose value"
        }
      }
    });
    </script>

### filterable.messages.logic `String` *(default: "Logic")*

The text displayed in the tooltip of the logic item in filter menu.

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
      filterable: {
        messages: {
          logic: "Choose logic"
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
                    return ({ country, all }) => `<span><label><span>${country || all}</span><input type='checkbox' name='" + e.field + "' value='${country}'/></label></span>`
                }
            }
        }],
        filterable: true,
        dataSource: [ { country: "BG" }, { country: "USA" } ]
      });
    </script>

### filterable.mode `String` *(default: "menu")*

If set to `row` the user would be able to filter via extra row added below the headers. By default filtering is using the `menu` mode.

Can also be set to the following string values:

- "row" - the user can filter via extra row within the header.
- "menu" - the user can filter via the menu after clicking the filter icon.
- "menu, row" - the user can filter with both modes above enabled.

> When the `filterable.mode` property is set to `"row"` or `"menu, row"`, the Grid dataSource instance is copied and applied to the Kendo UI AutoComplete widgets used for string filtering.
This will cause one additional read request per string column. The AutoComplete dataSources do not perform paging and will use a collection of the unique column values only.

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
              dataSource: {
               data: [
                { id: 1, name: "Jane Doe", age: 30 },
                { id: 2, name: "John Doe", age: 33 }
               ],
               schema:{
                model: {
                 id: "id",
                 fields: {
                   age: { type: "number"}
                 }
                }
               }
              }
          });
        </script>

### filterable.operators `Object`

The text of the filter operators displayed in the filter menu.

> * If `operators` are defined manually, the default messages will be overridden too. To control the `operators` and still use the default messages, retrieve them from the `FilterCell` prototype - `kendo.ui.FilterCell.fn.options.operators.{type}`, where the type can be `"string"`, `"date"`, `"number"`, and `"enums"`.
> * If the same options are specific to a column, it is possible to use the [column filterable configuration of the Grid](/api/javascript/ui/grid/configuration/columns.filterable.operators).
> * In multiple Grids, it is possible to override the filterable options of the Kendo UI FilterMenu before the Grids are initialized. Then the new filter options will be available for all Grids without further configurations.

#### Example - override the filterable options in multiple Grids

     <h4>Grid One</h4>
     <div id="gridOne"></div>
     <h4>Grid Two</h4>
     <div id="gridTwo"></div>

     <script>
         kendo.ui.FilterMenu.fn.options.operators.string = {
           eq: "Equal to",
           neq: "Not equal to"
         };

         $("#gridOne").kendoGrid({
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
               model: {
                 id: "id",
                 fields: {
                   name: { type: "string" },
                   age: { type: "number" }
                 }
               }
             }
           },
           filterable: {
             extra: false
           }
         });

         $("#gridTwo").kendoGrid({
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
               model: {
                 id: "id",
                 fields: {
                   name: { type: "string" },
                   age: { type: "number" }
                 }
               }
             }
           },
           filterable: {
             extra: false
           }
         });
       </script>

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

### filterable.operators.string.doesnotstartwith `String` *(default: "Does not start with")*

The text of the "does not start with" filter operator.

#### Example - set the string "does not start with" operator

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
            doesnotstartwith: "Does not start"
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

### filterable.operators.string.doesnotendwith `String` *(default: "Does not end with")*

The text of the "does not end with" filter operator.

#### Example - set the string "does not end with" operator

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
            doesnotendwith: "Does not end"
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

The texts of the filter operators displayed for columns which have their [values](columns.values) option set.

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

> Check [Basic usage](https://demos.telerik.com/kendo-ui/grid/index) for a live demo.

### groupable.enabled `Boolean` *(default: true)*

When set to false grouping is considered disabled.

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
      groupable: {
        enabled: false
      }
    });
    </script>

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

### groupable.sort `Object`

Sets the sort configuration when grouping.

#### Example - use a custom function to compare the groups

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                data: [
                    { id: 1, name: "Salmon", category: "Seafood" },
                    { id: 3, name: "Ice cream", category: "Desserts" },
                    { id: 2, name: "Mackerel", category: "Seafood" },
                    { id: 4, name: "Cake", category: "Desserts" },
                    { id: 5, name: "Lemonade", category: "Beverages" },
                    { id: 6, name: "Tea", category: "Beverages" },
                    { id: 7, name: "Coffee", category: "Beverages" },
                ],
                pageSize: 10
            },
            pageable: true,
            groupable: {
                sort: {
                    dir: "desc",
                    compare: function(a, b) {
                        if (a.items.length === b.items.length) {
                            return 0;
                        } else if (a.items.length > b.items.length) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                }
            },
            height: 550,
            columns: [
                { field: "id", title: "Id", width: "120px" },
                { field: "name", title: "Name", width: "120px" },
                { field: "category", title: "Category", width: "120px" }
            ]
        });
    </script>

### groupable.sort.compare `Function`

A JavaScript function which is used to compare the groups (refer to [`sortable`](/api/javascript/ui/grid/configuration/sortable) for sorting the items of the groups). It has the same signature as the [compare function accepted by Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

#### Example - use a custom function to compare the groups

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                data: [
                    { id: 1, name: "Salmon", category: "Seafood" },
                    { id: 3, name: "Ice cream", category: "Desserts" },
                    { id: 2, name: "Mackerel", category: "Seafood" },
                    { id: 4, name: "Cake", category: "Desserts" },
                    { id: 5, name: "Lemonade", category: "Beverages" },
                    { id: 6, name: "Tea", category: "Beverages" },
                    { id: 7, name: "Coffee", category: "Beverages" },
                ],
                pageSize: 10
            },
            pageable: true,
            groupable: {
                sort: {
                    compare: function(a, b) {
                        if (a.items.length === b.items.length) {
                            return 0;
                        } else if (a.items.length > b.items.length) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                }
            },
            height: 550,
            columns: [
                { field: "id", title: "Id", width: "120px" },
                { field: "name", title: "Name", width: "120px" },
                { field: "category", title: "Category", width: "120px" }
            ]
        });
    </script>

### groupable.sort.dir `String` *(default: asc)*

The sort order of the groups according to the group field.

The supported values are:

*  `"asc"` (ascending order)
* `"desc"` (descending order)

#### Example - sort the groups in descending order

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                data: [
                    { id: 6, name: "Tea", category: "Beverages" },
                    { id: 7, name: "Coffee", category: "Beverages" },
                    { id: 1, name: "Salmon", category: "Seafood" },
                    { id: 3, name: "Ice cream", category: "Desserts" },
                    { id: 2, name: "Mackerel", category: "Seafood" },
                    { id: 4, name: "Cake", category: "Desserts" },
                    { id: 5, name: "Lemonade", category: "Beverages" }
                ],
                pageSize: 10
            },
            pageable: true,
            groupable: {
                sort: {
                    dir: "desc"
                }
            },
            height: 550,
            columns: [
                { field: "id", title: "Id", width: "120px" },
                { field: "name", title: "Name", width: "120px" },
                { field: "category", title: "Category", width: "120px" }
            ]
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

When string is used the format can be "number" + "px" or "number" alone. For example: "100px" or "100".

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

### loaderType `String` *(default: "loadingPanel")*

Defines what loader will be used while loading the data. Possible values are:

- "loadingPanel" - a panel with a circular loading indicator.
- "skeleton" - a skeleton enabled loader.

> A **pageSize** must be defined for the **skeleton** loader type to work properly.

#### Example - set the loaderType

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "ShipName" },
          { field: "ShipCity" }
        ],
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
          },
          schema: {
            model: {
              fields: {
                ShipName: { type: "string" },
                ShipCity: { type: "string" }
              }
            }
          },
          pageSize: 20,
          serverPaging: true
        },
        loaderType: "skeleton"
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

### messages.commands.search `String` *(default: "Search...")*

Allows the customization of the placeholder text in the grid search panel.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      messages: {
        commands: {
          search: "Look for..."
        }
      },
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
      toolbar:["search"]
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

### messages.expandCollapseColumnHeader `String` *(default: "")*

Allows the customization of the text in the column header for the expand or collapse columns. Sets the value to make the widget compliant with the web accessibility standards.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30, city: "London" },
          { name: "John Doe", age: 33, city: "Berlin" }
        ]
      },
      detailInit: function (e) {
        e.detailCell.text("City: " + e.data.city);
      },
      height: 200,
      messages: {
        expandCollapseColumnHeader: "E/C"
      }
    });
    </script>

### messages.filterCellTitle `String` *(default: "filter cell")*

The text that will be used for the `title` attribute of all filter cells belonging to a filter row in the Grid.

### messages.groupingHeaderLabel `String` *(default: "grid grouping header")*

The text that will be used for the `aria-lable` attribute of the grouping header of the Grid.

### messages.toolbarLabel `String` *(default: "grid toolbar")*

The text that will be used for the `aria-lable` attribute of the ToolBar of the Grid.

### mobile `Boolean|String` *(default: false)*

If set to `true` and the grid is viewed on mobile browser it will use adaptive rendering.

Can be set to a string `phone` which will force the widget to use adaptive rendering regardless of browser type.

> Important: With the mobile rendering, we recommend to set up the `height` option as well. Without setting an explicit height, every view of the grid might have a different height.

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
       mobile: true,
       height: 550
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
       mobile: "phone",
       height: 550
    });
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true` the user could navigate the component using the keyboard navigation. By default keyboard navigation is disabled.

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

> Check [Keyboard navigation](https://demos.telerik.com/kendo-ui/grid/keyboard-navigation) for a live demo.

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

The [template](/api/javascript/kendo/methods/template) which is rendered when current view contains no records.

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
        template: () => `No data available on current page. Current page is: ${$("#grid").data("kendoGrid").dataSource.page()}`
      },
      dataSource: {
        data: [{name: "John", age: 29}],
        page: 2,
        pageSize: 10
      }
    });
    </script>

#### Example - specify noRecords message as a function

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        pageable: true,
        noRecords: {
          template: function(e){
            var page = $("#grid").getKendoGrid().dataSource.page();
            return "No data available on current page. Current page is: " + page;
          }
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

> Don't forget to set a [`pageSize`](/api/javascript/data/datasource/configuration/pagesize), no matter if paging is performed client-side or server-side. A `pageSize` can be defined in the `pageable` settings, or in the [`dataSource`](/api/javascript/ui/grid/configuration/datasource) settings. If an already existing datasource instance is passed to the grid, then the [`pagesize`](/api/javascript/data/datasource/configuration/pagesize) option should be set in the dataSource's settings and not in the `pageable` settings.

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

### pageable.alwaysVisible `Boolean` *(default: true)*

By default the grid will show the pager even when total amount of items in the DataSource is less than the pageSize.

If set to `false` the grid will toggle the pager visibility as follows:

* when the total amount of items initially set in the DataSource is less than the pageSize number the pager will be hidden.
* when the total amount of items initially set in the DataSource is greater than or equal to the pageSize number the pager will be shown.
* when the total amount of items in the DataSource becomes less than the pageSize number (after delete, filter operation or pageSize change) the pager will be hidden.
* when the total amount of items in the DataSource becomes greater than or equal to the pageSize number (after an insert, filter operation or pageSize change) the pager will be shown.

Introduced in the Kendo UI 2017 R3 release.

#### Example - hide the pager if total items are less than pageSize

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
        pageSize: 5,
        alwaysVisible: false
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

### pageable.input `Boolean` *(default: false)*

If set to `true` the pager will display an input element which allows the user to type a specific page number. By default the page input is not displayed.

Using `pageable.input` and [`pageable.numeric`](pageable.numeric) at the same time is not recommended.

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

### pageable.messages `Object`

The text messages displayed in pager. Use this option to customize or localize the pager messages.

### pageable.messages.display `String` *(default: "{0} - {1} of {2} items")*,

The pager info text. Uses [kendo.format](/api/javascript/kendo/methods/format).

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

The label displayed before the pager input. Uses [kendo.format](/api/javascript/kendo/methods/format). Contains one optional placeholder {0} which represents the total number of pages.

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

### pageable.numeric `Boolean` *(default: true)*

If set to `true` the pager will display buttons for navigating to specific pages. By default those buttons are displayed.

Using `pageable.numeric` and [`pageable.input`](pageable.input) at the same time is not recommended.

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

### pageable.pageSize `Number`

The number of data items which will be displayed in the grid. **This setting will not work if the Grid is assigned an already existing Kendo UI DataSource instance.**

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
        dataSource: {
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Water", category: "Beverages" },
            { productName: "Juice", category: "Beverages" },
            { productName: "Decaffeinated Coffee", category: "Beverages" },
            { productName: "Iced Tea", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" },
            { productName: "Eggs", category: "Food" },
            { productName: "Bacon", category: "Food" },
            { productName: "Chips", category: "Food" },
            { productName: "Fish", category: "Food" }
          ],
          pageSize: 4
        },
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

### pageable.position `String` *(default: "bottom")*

Specifies the position in which the grid pager will be rendered. Valid values are "top" and "bottom" (default).

#### Example - place grid pager on top of the grid

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
        position: "top"
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

### pageable.refresh `Boolean` *(default: false)*

If set to `true` the pager will display the refresh button. Clicking the refresh button will [refresh](/api/javascript/ui/grid/methods/refresh) the grid. By default the refresh button is not displayed.

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

### pageable.responsive `Boolean` *(default: true)*

If set to `false` the pager will not be responsive. By default the pager is responsive.

#### Example - show the responsive button

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
        responsive: false
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
> `<script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>`
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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>


### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.

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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        columns: [
          { field: "ProductName",
            template: ({ ProductID, ProductName }) => `<a href='products/${ProductID}/'>${ProductName}</a>` }
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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](pdf.proxyurl) even if the browser supports saving files locally.

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.

### pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.

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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

> As of Q2 2016, when `paperSize` is specified the Grid will use `drawDOM`'s [automatic page breaking](/framework/drawing/pdf-output/multi-page-content#automatic-page-breaking) algorithm.  This makes available a few new options: `template`, `repeatHeaders` and `scale`.

### pdf.template `String` *(default: null)*

A piece of HTML to be included in each page.  Can be used to display headers and footers.  See the documentation in [drawDOM](/framework/drawing/pdf-output/page-templates).

Available template variables include:
* pageNum
* totalPages

> **Important**
>
> Using a template requires setting [paper size](pdf.papersize)

### pdf.repeatHeaders `Boolean` *(default: false)*

Set this to `true` to repeat the grid headers on each page.

> **Important**
>
> Using a repeatHeaders requires setting [paper size](pdf.papersize)

### pdf.scale `Number` *(default: 1)*

A scale factor.  In many cases, text size on screen will be too big for print, so you can use this option to scale down the output in PDF.  See the documentation in [drawDOM](/framework/drawing/drawing-dom#Scaling).

> **Important**
>
> Using scale requires setting [paper size](pdf.papersize)

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser is not capable of saving files locally, for example, Internet Explorer 9 and Safari.

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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### persistSelection `Boolean` *(default:false)*

Sets a value indicating whether the selection will be persisted when sorting, paging, filtering and etc are performed.

> **Note:** Selection persistence works only for row selection.
>
> In order for selection persistence to work correctly, you need to define an ID field in [`schema.model`](/api/javascript/data/datasource/configuration/schema.model).
>
> Selection persistence does not work for new items when the Grid DataSource is in offline mode. In offline mode, newly added items do not have IDs, which are required for selection persistence to work.

#### Example - enables selection persistence

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
          { id: 2, name: "John Doe", age: 33},
          { id: 3, name: "Jim Doe", age: 30 },
          { id: 4, name: "Jack Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      pageable: {
        pageSize: 2
      },
      selectable: "multiple, row",
      persistSelection: true
    });
    </script>

### reorderable `Object|Boolean` *(default:false)*

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

> Check [Column reordering](https://demos.telerik.com/kendo-ui/grid/column-reordering) for a live demo.

### reorderable.columns `Boolean` *(default:false)*

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

> Check [Column reordering](https://demos.telerik.com/kendo-ui/grid/column-reordering) for a live demo.

### reorderable.rows `Boolean|Object` *(default:false)*

If set to `true` the user could reorder the rows by dragging them. By default reordering for rows is disabled. If the [selectable](/api/javascript/ui/grid/configuration/selectable) option is enabled for rows only selected rows will can be dragged and reordered.

> Note that the reordering operation is only a client-side operation and it does not reflect the order of any data that is bound to the server.

#### Example - enable column reordering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { id:1, name: "Jane Doe", age: 30 },
        { id:2, name: "John Doe", age: 33 }
      ],
      reorderable: {
        rows: true
      }
    });
    </script>

### reorderable.rows.clickMoveClick `Boolean` *(default:true)*

If set to `true` (default), when there is a drag column for the items in the Grid, the user will be allowed to reorder rows via click move click interaction as an alternative of the drag and drop one.

#### Example - enable column reordering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { draggable: true, width: "40px" },
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { id:1, name: "Jane Doe", age: 30 },
        { id:2, name: "John Doe", age: 33 }
      ],
      reorderable: {
        rows: {
          clickMoveClick: false
        }
      }
    });
    </script>

### resizable `Object|Boolean` *(default:false)*

If object is used, it allows configuration of `resizable.columns` and `resizable.rows`. If set to `true`, only column resizing will be enabled.

By default, column and row resizing is disabled.

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

> Check [Column resizing](https://demos.telerik.com/kendo-ui/grid/column-resizing) for a live demo and
the [Column widths](/web/grid/appearance#column-widths) help section for additional relevant information.

### resizable.columns `Boolean` *(default:false)*

If set to `true`, users can resize columns by dragging the edges (resize handles) of their header cells. As of Kendo UI Q1 2015, users can also auto-fit a column by double-clicking its resize handle. In this case the column will assume the smallest possible width, which allows the column content to fit without wrapping.

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
      resizable: {
        columns: true
      }
    });
    </script>

> Check [Column resizing](https://demos.telerik.com/kendo-ui/grid/column-resizing) for a live demo and
the [Column widths](/web/grid/appearance#column-widths) help section for additional relevant information.

### resizable.rows `Boolean` *(default:false)*

If set to `true`, users can resize Grid rows by dragging their bottom edge. Users can also auto-fit a row by double-clicking its bottom edge. In this case the row will assume the smallest possible height, which allows the cells content to be fully displayed.

In scenario where row selection is enabled, users are allowed to resize all selected rows at once by performing the resize interaction on one of them.

By default, row resizing is disabled.

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
      resizable: {
        rows: true
      }
    });
    </script>

### rowTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders rows. Be default renders a table row (`<tr>`) for every data source item.

> There are a few important things to keep in mind when using `rowTemplate`.
>
>* The outermost HTML element in the template must be a table row (`<tr>`). That table row must have the `uid` data attribute set to `${uid}`. The grid uses the `uid` data attribute to determine the data to which a table row is bound to.
>* If `rowTemplate` is used alongside with `detailTemplate`, the row (`<tr>`) element needs to have class `k-master-row`. The first `<td>` element of the row needs to have class `k-hierarchy-cell`. Check the [`Row Templates documentation`](/controls/grid/Templates/row-templates) for more information.

#### Example - specify row template as a function

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        dataSource: [ { name: "Jane Doe", age: 30 }, { name: "John Doe", age: 33 } ],
        rowTemplate: function(dataItem){
          return "<tr data-uid=" + dataItem.uid + "><td colspan='1'><strong>" + dataItem.name + "</strong></td><td colspan='1'><strong>" + dataItem.age + "</strong></td></tr>";
        }
      });
    </script>

#### Example - specify row template as a string literal

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      dataSource: [ { name: "Jane Doe", age: 30 }, { name: "John Doe", age: 33 } ],
      rowTemplate: ({ uid, name, age }) => `<tr data-uid="${uid}"><td colspan="1"><strong>${encode(name)}</strong></td><td colspan="1"><strong>${encode(age)}</strong></td></tr>`
    });
    </script>

> Check [Row template](https://demos.telerik.com/kendo-ui/grid/rowtemplate) for a live demo.

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

### scrollable.virtual `Boolean|String` *(default: false)*

Configures the grid virtualization settings. If set to `true` the grid will enable row virtualization and display a single page of data. Scrolling would just change the data which is currently displayed.

Can also be set to the following string values:

- "rows" - enables virtualization of rows.
- "columns" - enables virtualization of columns.
- "rows, columns" - enables virtualization of both rows and columns.

> For columns virtualization to work, define [widths for the columns](/api/javascript/ui/grid/configuration/columns.width). For additional information about the configuration of this functionality, visit the [Virtual Scrolling]({% slug virtual_scrolling_kendoui_grid_widget %}) documentation article.

Check [Virtualization of local data](https://demos.telerik.com/kendo-ui/grid/virtualization-local-data), [Virtualization of remote data](https://demos.telerik.com/kendo-ui/grid/virtualization-remote-data) and [Colums Virtualization](https://demos.telerik.com/kendo-ui/grid/column-virtualization) for live demos.

### scrollable.endless `Boolean` *(default: false)*

If set to `true` the grid will always display a single page of data. Scrolling to the end will load more items untill all items are displayed.

> Check [Endless scrolling of local data](https://demos.telerik.com/kendo-ui/grid/endless-scrolling-local) and [Endless scrolling of remote data](https://demos.telerik.com/kendo-ui/grid/endless-scrolling-remote) for live demos.

### search `Object`

Configures the Kendo UI Grid search bar settings.

### search.fields `Array`

Defines a list of fields which will be included in the search. If values for the property are not defined the grid will search in all column fields.

#### Example - specify which fields will be included in the search

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
      toolbar:["search"],
      search: {
        fields: ["name"] // Or, specify multiple fields by adding them to the array, e.g ["name", "age"]
      }
    });
    </script>

### search.fields.name `String`

Defines the name of the field to be included in the search

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
      toolbar:["search"],
      search: {
        fields: [ { name: "name" } ]
      }
    });
    </script>

### search.fields.operator `String`

Defines the operator for the field to be used in the filter expression: [filter](/api/javascript/data/datasource/configuration/filter).
#### Example - specify which fields will be included in the search

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
      toolbar:["search"],
      search: {
        fields: ["name", { name: "age", operator: "eq" }]
      }
    });
    </script>



### selectable `Boolean|String|Object` *(default: false)*

If set to `true` the user would be able to select grid rows. By default selection is disabled.

Can also be set to the following string values:

- "row" - the user can select a single row.
- "cell" - the user can select a single cell.
- "multiple, row" - the user can select multiple rows.
- "multiple, cell" - the user can select multiple cells.

> When the selectable property is set to "multiple, row" or "multiple, cell" the Grid cannot be scrollable on mobile devices as both are listening on the same event.

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

> Check [Selection](https://demos.telerik.com/kendo-ui/grid/selection) for a live demo.

### selectable.dragToSelect `Boolean` *(default: true)*

When set to `true`, the user can drag to select multiple Grid rows or cells.

> Applies only for [multiple row or multiple cell selection](/api/javascript/ui/grid/configuration/selectable.mode).

#### Example - disable dragging to select multiple Grid rows

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
      selectable: {
        mode: "multiple, row",
        dragToSelect: false
      }
    });
    </script>

### selectable.mode `String`

Can be set to the following string values:

- "row" - the user can select a single row.
- "cell" - the user can select a single cell.
- "multiple, row" - the user can select multiple rows.
- "multiple, cell" - the user can select multiple cells.

> When the selectable property is set to "multiple, row" or "multiple, cell" the Grid cannot be scrollable on mobile devices as both are listening on the same event.

#### Example

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
      selectable: {
        mode: "multiple, row"
      }
    });
    </script>

### selectable.ignoreOverlapped `Boolean`

When set to true, visually hidden elements that match by the filter option criteria but are overlapped by other elements that also can be selected, are ignored.

> Applies only for multiple cell selection.

#### Example

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
      selectable: {
        mode: "multiple, cell",
        ignoreOverlapped: true
      }
    });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      size: "small",
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

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

> Check [Sorting](https://demos.telerik.com/kendo-ui/grid/sorting) for a live demo.

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

### sortable.showIndexes `Boolean` *(default: true)*

If set to `true` the user will see sort sequence indicators for sorted columns.

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
        showIndexes: true,
        mode: "multiple"
      }
    });
    </script>

### sortable.initialDirection `String` *(default: asc)*

Determines the inital (from un-sorted to sorted state) sort direction. The supported values are `asc` and `desc`.

#### Example - disable sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id" },
        { field: "name" }
      ],
      sortable: {
        initialDirection: "desc"
      },
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### sortable.mode `String` *(default: "single")*

The sorting mode. If set to "single" the user can sort by one column. If set to "multiple" the user can sort by multiple columns. And the "mixed" mode enables you to sort in single mode when clicking and switch to multiple when holding **ctrl** key.

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

  #### Example - enable mixed mode sorting

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
        mode: "mixed",
        allowUnsort: true,
        showIndexes: true
      }
    });
    </script>

### toolbar `String|Function|Array`

If a `String` value is assigned to the `toolbar` configuration option, it will be treated as a single string template for the whole grid Toolbar,
and the string value will be passed as an argument to a [`kendo.template()`](/api/javascript/kendo/methods/template) function.

If a `Function` value is assigned (it may be a kendo.template() function call or a generic function reference), then the return value of the function will be used to render the Grid Toolbar contents.

> If the grid is instantiated with MVVM, The template passed will not be bound to the grid view model context. You may bind the toolbar element manually afterwards, using `kendo.bind(gridWidgetInstance.element.find("k-grid-toolbar"))`

If an `Array` value is assigned, it will be treated as the list of commands displayed in the grid's Toolbar. Commands can be custom or built-in ("cancel", "create", "save", "excel", "pdf").

The "cancel" built-in command reverts any data changes done by the end user.

The "create" command adds an empty data item to the grid.

The "save" command persists any data changes done by the end user. When executed fires [`saveChanges`](/api/javascript/ui/grid/events/savechanges) grid event.

The "excel" command exports the grid data in MS Excel format. Fires [`excelExport`](/api/javascript/ui/grid/events/excelexport) grid event.

The "pdf" command exports the grid data in PDF format. Fires [`pdfExport`](/api/javascript/ui/grid/events/pdfexport) grid event.

The "search" built-in search panel for the grid.

#### Example - configure the Grid Toolbar as a string template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: "<button class='k-button' onclick='myClick()'>My Button</button>",
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

    function myClick() {
      kendo.alert("Clicked!")
    }
    </script>

#### Example - configure the Grid Toolbar template with a function

    <script type="x-kendo/template" id="template">
    	<button class='k-button' onclick='myClick()'>My Button</button>
    </script>

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: kendo.template($("#template").html()),
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

    function myClick() {
      kendo.alert("Clicked!")
    }
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

Apart from the built-in tools, the Grid fully exposes the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the widget using the components available in the ToolBar itself:

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
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

### toolbar.iconClass `String`

The class for the [web font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) of the button that will be rendered in the toolbar.

> Grid commands are rendered as anchors (`<a>`) with a `span` inside. The icon for the button depends on the **iconClass** which is rendered as a class for the inner span.
> Built-in commands have a predefined **iconClass** value.

#### Example - provide an iconClass for a toolbar command

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: [
        { name: "copy", iconClass: "k-icon k-i-copy" },
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

The [template](/api/javascript/kendo/methods/template) which renders the command. By default renders a button.

#### Example - set the template as a function

    <div id="grid"></div>
    <script id="template" type="text/x-kendo-template">
    <a class="k-button" href="\#" onclick="return toolbar_click()">Command</a>
    </script>
    <script>
    function toolbar_click() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

> Check [Toolbar template](https://demos.telerik.com/kendo-ui/grid/toolbar-template) for a live demo.

#### Example - set the template as a string

    <div id="grid"></div>
    <script>
    function toolbar_click() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

The text displayed by the command button. If not set the [name](toolbar.name)` option would be used as the button text instead.

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

### width `Number|String`

The width of the grid. Numeric values are treated as pixels.

#### Example - set the width as a number

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
      width: 1000
    });
    </script>

## Fields

### columns `Array`

The columns of the grid initialized from the [columns](/api/javascript/ui/grid/configuration/columns) option. every item from the `columns` array has the same fields as the corresponding [columns](/api/javascript/ui/grid/configuration/columns) option.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(grid.columns[i].field); // displays "name" and then "age"
    }
    </script>

### dataSource `kendo.data.DataSource`

The [data source](/api/javascript/data/datasource) of the widget. Configured via the [dataSource](/api/javascript/ui/grid/configuration/datasource) option.

> Changes to the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/grid/methods/setdatasource) method instead.

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

#### Example - hightligh the cells within the footer of the grid

    <div id="grid"></div>
    <br />
    <button id="btn" class='k-button'>Highlight footer row's cells</button>

    <script>
      let encode = kendo.htmlEncode;
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age",
            footerTemplate: ({ age }) => `Min: ${encode(age.min)} Max: ${encode(age.max)}`
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

      $("#btn").click(function(e){
        var gridFooter = $("#grid").getKendoGrid().footer;
        var cells = gridFooter.find("td");
        cells.css("background-color", "#90EE90");
      });
    </script>


### pager `kendo.ui.Pager`

The [Pager widget](/api/javascript/ui/pager) attached to the Grid.

### table `jQuery`

The jQuery object which represents the grid table element.

#### Example - get the Grid alternating rows

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
      var altRows = grid.table.find("tr.k-alt");
      altRows.css("background", "#afeeee");
    </script>

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
    var data = grid.dataItem(row);f
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(data.name); // displays "Jane Doe"
    </script>

### thead `jQuery`

The jQuery object which represents the grid table header element.

#### Example - hightligh the cells within the header row of the grid

    <div id="grid"></div>
    <br />
    <button id="btn" class='k-button'>Highlight header row's cells</button>

    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age"}
        ],
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
          ]
        }
      });

      $("#btn").click(function(e){
        var gridHead = $("#grid").getKendoGrid().thead;
        var cells = gridHead.find("th");
        cells.css("background-color", "#90EE90");
      });
    </script>

### content `jQuery`

The jQuery object which represents the grid content element, which holds the scrollable content. Available only when `scrollable` is set to `true`.

#### Example - hightligh the cells within the content of the grid

    <div id="grid"></div>
    <br />
    <button id="btn" class='k-button'>Highlight content's cells</button>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "id", width:200 },
          { field: "name", width:800 }
        ],
        scrollable: true,
        dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
      });

      $("#btn").click(function(e){
        var gridContent = $("#grid").getKendoGrid().content;
        var cells = gridContent.find("td");
      	cells.css("color", "green");
      });
    </script>


### lockedHeader `jQuery`

The jQuery object which represents the grid locked header element. Available only in a grid with locked columns.

#### Example - get the header cells of the locked content

    <div id="grid"></div>
    <script>
      var grid = $("#grid").kendoGrid({
        columns: [
          { field: "name", locked: true, width: 640 },
          { field: "age", width: 450 }
        ],
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
          ]
        }
      }).data("kendoGrid");

      var lockedHeaderElement = grid.lockedHeader;
      var lockedHeaderField = lockedHeaderElement.find("th").css("background-color", "#90EE90");
    </script>

### lockedTable `jQuery`

The jQuery object which represents the grid locked table element. Available only in a grid with locked columns.

### lockedContent `jQuery`

The jQuery object which represents the grid locked content element. Available only in a grid with locked columns.

#### Example - get the locked column field name

    <div id="grid"></div>
    <script>
      var grid = $("#grid").kendoGrid({
        columns: [
          { field: "name", locked: true, width: 640 },
          { field: "age", width: 450 }
        ],
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
          ]
        }
      }).data("kendoGrid");

      var lockedHeaderElement = grid.lockedHeader;
      var lockedHeaderField = lockedHeaderElement.find("th").attr('data-field');
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(lockedHeaderField); // logs "name"
    </script>

## Methods

### addRow

Adds an empty data item to the grid. In "incell" and "inline" editing mode a table row will be appended. Popup window will be displayed in "popup" editing mode.

Fires the [edit](/api/javascript/ui/grid/events/edit) event.

#### Example - add a new data item

    <button id="add">Add a new row</button>
    <div id="grid"></div>
    <script>
      $("#add").kendoButton({
        themeColor: "success",
        click: function() {
          var grid = $("#grid").data("kendoGrid");
          grid.addRow();
        }
      });

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
    </script>

### autoFitColumn

Applies the minimum possible width for the specified column, so that all text fits without wrapping.

#### Parameters

##### column `Number|String|Object`

The index of the column, or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound, or the column object obtained from the [columns](/api/javascript/ui/grid/fields/columns) collection.

When using multicolumn headers, using an index is not allowed. In such scenarios, please use a field name or a column object as a method argument.

> The method ignores and does not resize [hidden](/api/javascript/ui/grid/configuration/columns.hidden) columns.
>
> Auto-fitting all columns at once is a resource-intensive operation and is not recommended. A better option is to auto-fit only a few columns that have the most variable content in terms of length. Alternatively, disable scrolling and allow the [browser to adjust all column widths automatically](/controls/grid/appearance#widths), according to their content.
>
> Use `autoFitColumn` only after the Grid has been databound. Executing the method immediately after Grid initialization makes no sense and can lead to undesired behavior.

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

### autoFitColumns

Applies the minimum possible width for all columns, so that all text fits without wrapping.

> The method ignores and does not resize [hidden](/api/javascript/ui/grid/configuration/columns.hidden) columns.
>
> Auto-fitting all columns at once is a resource-intensive operation and is not recommended. A better option is to auto-fit only a few columns ([autoFitColumn](/api/javascript/ui/grid/methods/autoFitColumn)) that have the most variable content in terms of length. Alternatively, disable scrolling and allow the [browser to adjust all column widths automatically](/controls/grid/appearance#widths), according to their content.
>
> Use `autoFitColumns` only after the Grid has been databound. Executing the method immediately after Grid initialization makes no sense and can lead to undesired behavior.

#### Parameters

##### columns `Array` *optional*

A set of column objects obtained from the [columns](/api/javascript/ui/grid/fields/columns) collection. If parameter is not provided all Grid columns will be auto-fitted.

#### Example - autofit all collumns

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
        ],
        dataBound: function (e) {
            e.sender.autoFitColumns();
        },
    });
    </script>

#### Example - autofit set of columns

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
        ],
        dataBound: function (e) {
            var grid = e.sender;
            grid.autoFitColumns(grid.columns[0].columns);
        },
    });
    </script>

### cancelChanges

Cancels any pending changes in the data source. Deleted data items are restored, new data items are removed and updated data items are restored to their initial state.

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

      setTimeout(function(){
        grid.cancelChanges();
      }, 1000);
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

      setTimeout(function(){
        grid.cancelRow();
      }, 1000);
    </script>

### cellIndex

Returns the index of the specified table cell. Skips group and detail table cells.

#### Parameters

##### cell `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table cell. A string is treated as a jQuery selector. If there are locked columns in the Grid, the jQuery object, representing the cell, must be passed as an argument.

#### Returns

`Number` the index of the specified table cell.

#### Example - find the cell index when the cell is a jQuery object

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 },
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`
    });
    var grid = $("#grid").data("kendoGrid");
    var cell = $("#grid td:eq(1)");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(grid.cellIndex(cell));
    </script>

#### Example - find the cell index when the cell is a string

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 },
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`
    });
    var grid = $("#grid").data("kendoGrid");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(grid.cellIndex("td:eq(1)"));
    </script>

### clearSelection

Clears the currently selected table rows or cells (depending on the current selection [mode](/api/javascript/ui/grid/configuration/selectable)).

> By default clearSelection will clear the selected rows on the current page only when [persistSelection](/api/javascript/ui/grid/configuration/persistselection) is enabled. In order to clear all selected rows follow the approach in [this Knowledge Base article](https://docs.telerik.com/kendo-ui/knowledge-base/clear-selection-all-pages-grid).

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

Stops editing the table cell which is in edit mode. Requires "incell" [edit mode](/api/javascript/ui/grid/configuration/editable.mode).

> When keyboard navigation is used, the Grid [`table`](/api/javascript/ui/grid/fields/table) must be focused programmatically after calling `closeCell`.

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

##### omitAnimations `Boolean`

If set to false, the detail template is hidden without animations.

#### Example - collapse the first master table row

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`
    });
    var grid = $("#grid").data("kendoGrid");
    // first expand the first master table row
    grid.expandRow(".k-master-row:first");
    grid.collapseRow(".k-master-row:first");
    </script>

### copySelectionToClipboard

Copies the selected items to the clipboard.

#### Parameters

##### includeHeaders `Boolean`

If set to true, the copied items will include the column headers.

#### Example

     <div id="grid"></div>
     <a class="k-button" onclick="selectAndCopy()">Select and copy</a>
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
                    ]
                },
                selectable: "multiple, cell"
            });

        function selectAndCopy() {
            var grid = $("#grid").data("kendoGrid");
            grid.select('td');
            grid.copySelectionToClipboard(true);
        }

     </script>

### current

Gets or sets the current cell for keyboard navigation.

> The method will also automatically scroll to the newly set current cell, but this feature works with limited capabilities when virtual scrolling is used. In the latter case, `current` will scroll correctly only if the new current cell is adjacent or close to the currently visible portion of the Grid's data table.

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
    var dataItem = grid.dataItem("tbody tr:eq(0)");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataItem.name); // displays "Jane Doe"
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

Switches the specified table cell in edit mode. Requires "incell" [edit mode](/api/javascript/ui/grid/configuration/editable.mode).

Fires the [edit](/api/javascript/ui/grid/events/edit) event.

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

Switches the specified table row in edit mode. Requires "inline" or "popup" [edit mode](/api/javascript/ui/grid/configuration/editable.mode).

Fires the [edit](/api/javascript/ui/grid/events/edit) event.

#### Parameters

##### row `jQuery`

The jQuery object which represents the table row.

#### Example - switch the first row in edit mode

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

##### omitAnimations `Boolean`

If set to false, the detail template is displayed without animations.

#### Example - expand the first master table row

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`
    });
    var grid = $("#grid").data("kendoGrid");
    grid.expandRow(".k-master-row:first");
    </script>

### exportSelectedToExcel

Exports the selected items to an Excel file.

#### Parameters

##### includeHeaders `Boolean`

If set to true, the exported items will include the column headers.

#### Example

     <div id="grid"></div>
     <a class="k-button" onclick="selectAndExport()">Select and export</a>
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
                    ]
                },
                selectable: "multiple, cell"
            });

        function selectAndExport() {
            var grid = $("#grid").data("kendoGrid");
            grid.select($('#grid tbody td').slice(0,2).add($('#grid tbody td').slice(4,6)));

            grid.exportSelectedToExcel(true);
        }

     </script>

### getOptions

Retrieves the options that are currently enabled or disabled on the Grid, also gives the current state of the dataSource.
Use this method if you want to save the state of the Grid into a variable. It is also possible to extract and store only some of the Grid options.

> Please refer to the [`setOptions()`](setoptions) method documentation for more important information.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(options.sortable); //outputs true

    // get only the Grid column settings
    var columnOptionsForSaving = kendo.stringify(options.columns);
    </script>

### getSelectedData

Returns the selected elements mapped to objects.
#### Returns

`Array` The selected items.

#### Example

     <div id="grid"></div>
     <a class="k-button" onclick="printSelected()">Select and print</a>
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
                    ]
                },
                groupable: true,
                selectable: "multiple, cell"
            });

        function printSelected() {
            var grid = $("#grid").data("kendoGrid");
            grid.select($('#grid tbody td').slice(0,2).add($('#grid tbody td').slice(4,6)));

            console.log(grid.getSelectedData());
        }

     </script>

### hideColumn

Hides the specified grid column.

> Check the [Column widths](/web/grid/appearance#column-widths) help section for additional relevant information.

#### Parameters

##### column `Number|String|Object`

The index of the column, or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound, or the column object obtained from the [columns](/api/javascript/ui/grid/fields/columns) collection.

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

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource/methods/view) (e.g. the ones on the current page).

#### Returns

`Array` The currently rendered data table rows (`<tr>` elements).

#### Example - use items method to access all Grid rows

    <button id="selectAll">Select All Rows</button>
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

      $("#selectAll").on("click", function(){
        var grid = $("#grid").data("kendoGrid");
        var allRows = grid.items();

        grid.select(allRows);
      });
    </script>

### lockColumn

Locks (freezes) a column, allowing users to see it at all times when scrolling.

#### Parameters

##### column `Number|String`

The index of the column or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound.

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

#### Example - change the value of a dataItem and refresh the widget

    <button id="refresh" class="k-button">Refresh</button>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["save"],
      columns: [
        { field: "name" },
        { field: "age" },
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
      	],
        schema:{
        	model: {
        	 id: "id",
        	 fields: {
        	   age: { type: "number"}
        	 }
         }
       }
      },
      editable: true
    });

    $("#refresh").click(function(){
    var grid = $("#grid").data("kendoGrid");
    // Change the name of the first dataItem.
    grid.dataSource.data()[0].name = "Different John";
    // Call refresh in order to see the change.
    grid.refresh();
    });
    </script>

### removeRow

Removes the specified table row from the grid. Also removes the corresponding data item from the data source.

Executing of `removeRow` triggers the default execution of the Grid delete mechanism. If the Grid data source is configured with destroy remote data operation a delete request will be performed. If the `editable` configuration is set to `true`, a confirmation dialog will appear before removing the row. You can disable it from the [`editable.confirmation`](/api/javascript/ui/grid/configuration/editable.confirmation) setting.

Fires the [remove](/api/javascript/ui/grid/events/remove) event.

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

#### Example - remove the selected table row

    <button class="k-button" onclick="remove()">Remove selected row</button>
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        selectable: true,
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 },
            { id: 3, name: "Angela Smith", age: 33 }
          ]
        }
      });

      function remove() {
        var grid = $("#grid").data("kendoGrid");
        grid.removeRow(grid.select());
      }
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

### resizeColumn

Changes the width of the specified column.

Introduced in the Kendo UI 2018 R3 release.

#### Parameters

##### column `Object`

The column whose width should be changed.

##### value `Number`

The new column width.

#### Example - resize a column

    <div id="grid" style="width:500px;"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", width: 300 },
        { field: "age", width: 300 }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.resizeColumn(grid.columns[0], 200);
    </script>

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](/api/javascript/ui/grid/events/excelexport) event.

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

Initiates the PDF export and returns a promise. Also triggers the [pdfExport](/api/javascript/ui/grid/events/pdfexport) event.

> Calling this method may trip the built-in browser pop-up blocker. To avoid that, call this method as a response to an end-user action, e.g. a button click.

> The [pdfExport](/api/javascript/ui/grid/events/pdfexport) event handler could be used to dynamically modify the to-be-exported PDF file.

#### Returns

`Promise` A promise that will be resolved when the export completes. The same promise is available in the [pdfExport](/api/javascript/ui/grid/events/pdfexport) event arguments.

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

Saves any pending changes by calling the [sync](/api/javascript/data/datasource/methods/sync) method.

Fires the [saveChanges](/api/javascript/ui/grid/events/savechanges) event.

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

If the Grid is using frozen (locked) columns and multiple cell selection with string selector, the `select` method will select and return **two** table cell elements. This is because the frozen columns feature works with the separate tables for the frozen and non-frozen columns. Each cell element corresponds to the jQuery selector applied for each table. One of the table cells will be a descendant of `div.k-grid-content-locked` and the other one will be a descendant of `div.k-grid-content`. The two `div`s are siblings in the Grid DOM structure. To select just one table cell please use jQuery selector to find the exact one cell from the specific table element and set `k-selected` class instead of using the `select` method.

#### Parameters

##### rows `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row(s) or cell(s). A string is treated as a jQuery selector.

#### Returns

`jQuery` the selected table rows or cells.

> The `select` method will not trigger the [`change event`](/api/javascript/ui/grid/events/change). In older versions of Kendo UI, the select method would trigger the [`change event`](/api/javascript/ui/grid/events/change), however this behavior was not intended. Refer to the second example for a workaround.

> In case of using frozen (locked) columns and row selection, the `select` method will return **two** table row elements for each selected item. Each pair of table row elements that correspond to the same data item, will have the same `data-uid` attribute value. One of the table rows will be a descendant of `div.k-grid-content-locked` and the other one will be a descendant of `div.k-grid-content`.

> In order to clear the currently selected row, use the [clearSelection() method](/api/javascript/ui/grid/methods/clearselection).

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
      grid.select("tr:eq(0), tr:eq(1)");
    </script>

#### Example - trigger the change event when a row is selected programmatically.

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
        change: function(e) {kendo.alert("Change triggered")}
      });
      var grid = $("#grid").data("kendoGrid");
      grid.select("tr:eq(0), tr:eq(1)");
      grid.trigger("change");
    </script>

#### Example - get the selected table rows

    <div id="grid"></div>
    <button class='k-button' id="btn">Get selected rows</button>
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
      grid.select("tr:eq(0), tr:eq(1)");

      $("#btn").on("click", function(e){
        var rows = grid.select();
        var selectedIds = [];

        $(rows).each(function(){
          selectedIds.push($(this).attr("data-uid"))
        });

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Selected row Ids: " + selectedIds.join(", "));
      })
    </script>

### selectedKeyNames

Gets an array that holds the id field values of the selected rows.

> There are a few important things to keep in mind when using `selectedKeyNames`.
>
> * **In order for the method to return the selected IDs you need to define an ID field in [`schema.model`](/api/javascript/data/datasource/configuration/schema.model).**
> * **The selected IDs are sorted in ascending order inside the `selectedKeyNames` array.**


#### Returns

`Array` of the id field values of the selected rows.

#### Example - select the second table row and displays it's dataItem id value

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
          { id: 2, name: "John Doe", age: 33},
          { id: 3, name: "Jim Doe", age: 30 },
          { id: 4, name: "Jack Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      selectable: "multiple, row",
      persistSelection: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.select("tr:eq(2)");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(grid.selectedKeyNames()); // displays the id field value for the selected row
    </script>

#### Example - select a row by Model UID

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
    var uid = grid.dataSource.at(1).uid;
    grid.select("tr[data-uid='" + uid + "']");
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(data.name); // displays "Jane Doe"
    </script>

### setDataSource

Sets the data source of the widget. The new dataSource will override the configurations and data of the old one.

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

Sets the [`options`](/api/javascript/ui/grid#configuration) of the Grid. Use this method if you want to enable/disable a particular feature/option or to load
the complete state obtained previously with the [`getOptions`](getoptions) method.

When `setOptions` is called, the Grid widget will be destroyed and recreated. If the widget is bound to remote data, a new read request will be made.

> There are a few important things to keep in mind when using `getOptions` and `setOptions`.
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
> equivalent syntax (e.g. [`headerTemplate`](/api/javascript/ui/grid/configuration/columns.headertemplate) and [`toolbar`](/api/javascript/ui/grid/configuration/toolbar)).

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


When used for AngularJS, the `$scope` should be passed to the Grid options. By default, the Grid when initialized expects such logic.

```
$scope.grid.setOptions($.extend({}, options, {
                        $angular: [$scope]
                    }));
```

### showColumn

Shows the specified column.

> Check the [Column widths](/web/grid/appearance#column-widths) help section for additional relevant information.

#### Parameters

##### column `Number|String|Object`

The index of the column, or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound, or the column object obtained from the [columns](/api/javascript/ui/grid/fields/columns) collection.

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

### stickColumn

Sticks a column.

#### Parameters

##### column `Number|String`

The index of the column or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound.

#### Example - stick a column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400 },
        { field: "age", width: 800 }
      ],
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.stickColumn("name");
    </script>

### unlockColumn

Unlocks (unfreezes) a column.

#### Parameters

##### column `Number|String`

The index of the column or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound.

> In order to use this method, the grid must be initialized with at least one locked column, and there should be locked columns left after the target column is unlocked.

#### Example - unlock a column

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

To unlock a column when it is the only one locked use the [`setOptions`](/api/javascript/ui/grid/methods/setoptions) method of the Grid.

#### Example - unlock the last locked column

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
      var columns = grid.getOptions().columns;
      columns[0].locked = false;

      grid.setOptions({
        columns: columns
      })
    </script>

### unstickColumn

Unsticks a column.

#### Parameters

##### column `Number|String`

The index of the column or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound.

#### Example - unstick a column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400, sticky: true },
        { field: "age", width: 800 }
      ],
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.unstickColumn("name");
    </script>

## Events

### beforeEdit

Fired when the user tries to edit or create a data item, before the editor is created. Can be used to preventing editing according to any custom logic.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.model `kendo.data.Model`

The data item which is going to be edited. Use its [isNew](/api/javascript/data/model/methods/isnew) method to check if the data item is new (created) or not (edited).

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "beforeEdit" event during initialization

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
      beforeEdit: function(e) {
        if (!e.model.isNew()) {
          e.preventDefault();
        }
      }
    });
    </script>

#### Example - subscribe to the "beforeEdit" after initialization

    <div id="grid"></div>
    <script>
      function grid_beforeEdit(e) {
          if (!e.model.isNew()) {
            e.preventDefault();
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
        toolbar:["create"],
        beforeEdit: function(e) {
          if (!e.model.isNew()) {
            e.preventDefault();
          }
        }
      });

      var grid = $("#grid").data("kendoGrid");
      grid.bind("beforeEdit", grid_beforeEdit);
    </script>

### cancel

Fired when the user clicks the "cancel" button (in inline or popup [editing mode](/api/javascript/ui/grid/configuration/editable.mode)) or closes the popup window.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit container element. More information is available in the [edit event arguments' description](edit).

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

### cellClose

Fired when "incell" edit mode is used and the cell is going to be closed. The event is triggerd after saving or canceling the changes, but before the cell is closed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit container element. More information is available in the [edit event arguments' description](edit).

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.type `String`

The type of the cell close action - can be either "save" or "cancel". The "cancel" type is triggered when the grid keyboard navigation is enabled by "navigatable: true" and Esc key is used for cell close action.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "cellClose" event during initialization

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
      editable: "incell",
      cellClose:  function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.type);
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editCell($("#grid td:eq(1)"));
    </script>

#### Example - subscribe to the "cellClose" event during initialization

    <div id="grid"></div>
    <script>
    function grid_cellClose(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.type);
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
      editable: "incell",
    });

    var grid = $("#grid").data("kendoGrid");
    grid.bind("cellClose", grid_cellClose);

    grid.editCell($("#grid td:eq(1)"));
    </script>

### change

Fired when the user selects or deselects a table row or cell in the grid. To retrieve the selected elements, use the [`select`](/api/javascript/ui/grid/methods/select) method.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

The event will be fired only when the Grid is [`selectable`](/api/javascript/ui/grid/configuration/selectable).

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("Selected data items' name: " + selectedDataItems.map(e => e.name).join(", "));
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

#### Example - disable the selected rows

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          {selectable: true},
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "James Doe", age: 34 },
          { name: "John Doe", age: 37 },
          { name: "Mark Doe", age: 23 },
          { name: "Mike Doe", age: 63 }
        ],
        change: function(e) {
          var grid = e.sender;
          var selectedRows = this.select();
          $("td").removeClass("k-disabled");

          selectedRows.each(function(i, x) {
            $(x).find("td:not(:first)").addClass("k-disabled");
          });
        }
      });
    </script>

### changing

Fired when the user is about to select a table row or cell.

The event will be fired only when the Grid is [`selectable`](/api/javascript/ui/grid/configuration/selectable).

#### Event Data

##### e.sender `kendo.ui.Grid`

The component instance which fired the event.

##### e.target `jQuery`

The target row that is about to be selected. If the Grid has checkbox selection enabled and the Select All checkbox in the header is clicked, the target is set to the checkbox element instead.

##### e.originalEvent `event`

The original JavaScript event that was fired.

#### Example - prevent the selection of a row

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
        changing: function(e) {
          let dataItem = e.sender.dataItem(e.target);
          // Prevent the selection if the row with age = 33 is about to be selected.
          if (dataItem && dataItem.age === 33) {
              e.preventDefault();
          }
        }
      });
    </script>

### columnHide

Fired when the user hides a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the hidden column
      }
    });
    </script>

#### Example - subscribe to the "columnHide" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnHide(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

### columnLock

Fired when the user lock a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the just locked column
      }
    });
    </script>

#### Example - subscribe to the "columnLock" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnLock(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

### columnMenuOpen

Fired when the grid column menu is opened, after the animations are completed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing column menu element.

##### e.field `String`

The field of the column for which the column menu is opened.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnMenuOpen" event and open "columns" submenu

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id" },
        { field: "name" },
        { field: "phone" }
      ],
      dataSource: [
        { name: "Jane Doe", id: 1, phone: "88443558741" },
        { name: "John Doe", id: 2, phone: "88443558751" }
      ],
      filterable: true,
      columnMenu: true,
      columnMenuOpen: function(e) {
        var menu = e.container.children().data("kendoMenu");
        menu.open(menu.element.find("li:first"));
      },
    });
    </script>

#### Example - subscribe to the "columnMenuOpen" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnMenuOpen(e) {
        var menu = e.container.children().data("kendoMenu");
        menu.open(menu.element.find("li:first"));
    }

    $("#grid").kendoGrid({
      columns: [
        { field: "id" },
        { field: "name" },
        { field: "phone" }
      ],
      dataSource: [
        { name: "Jane Doe", id: 1, phone: "88443558741" },
        { name: "John Doe", id: 2, phone: "88443558751" }
      ],
      filterable: true,
      columnMenu: true
    });

    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnMenuOpen", grid_columnMenuOpen);
    </script>

### columnReorder

Fired when the user changes the order of a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field, e.newIndex, e.oldIndex);
      }
    });
    </script>

#### Example - subscribe to the "columnReorder" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnReorder(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field, e.newWidth, e.oldWidth);
      }
    });
    </script>

#### Example - subscribe to the "columnResize" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnResize(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the hidden column
      }
    });
    </script>

#### Example - subscribe to the "columnShow" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnShow(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

### columnStick

Fired when the user sticks a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnStick" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800, stickable: true },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800, stickable: true }
      ],
      columnMenu: true,
      columnStick: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the just sticked column
      },
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    </script>

#### Example - subscribe to the "columnStick" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnStick(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.column.field); // displays the field of the just sticked column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800, stickable: true },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800, stickable: true }
      ],
      columnMenu: true,
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnStick", grid_columnStick);
    </script>

### columnUnlock

Fired when the user unlock a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the just unlocked column
      }
    });
    </script>

#### Example - subscribe to the "columnUnlock" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnUnlock(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

### columnUnstick

Fired when the user unsticks a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnUnstick" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800, stickable: true },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800, stickable: true }
      ],
      columnMenu: true,
      columnUnstick: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the just unsticked column
      },
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    </script>

#### Example - subscribe to the "columnUnstick" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnUnstick(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.column.field); // displays the field of the just unsticked column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800, stickable: true },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800, stickable: true }
      ],
      columnMenu: true,
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnUnstick", grid_columnUnstick);
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

The action that caused the dataBinding event. Possible values: `rebind`, `sync`, `add`, `remove`.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("dataBinding");
      }
    });
    </script>

#### Example - subscribe to the "dataBinding" event after initialization

    <div id="grid"></div>
    <script>
    function grid_dataBinding(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("dataBound");
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <div id="grid"></div>
    <script>
    function grid_dataBound(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

#### Example - apply custom cell styling in the dataBound event handler

    <style>
      .k-grid {
        width: 500px;
      }

      .critical {
        background-color: #fdd;
      }

      .warning {
        background-color: #fda;
      }

      .ok {
        background-color: #ced;
      }

    </style>

    <div id="grid-databound-dataitems"></div>
    <script>
      // sample datasource
      var products = [
        { ID: 1, ProductName: "Foo", UnitsInStock: 9, Discontinued: false },
        { ID: 2, ProductName: "Bar", UnitsInStock: 16, Discontinued: false },
        { ID: 3, ProductName: "Baz", UnitsInStock: 3, Discontinued: true }
      ];

      function getUnitsInStockClass(units) {
        if (units < 5) {
          return "critical";
        } else if (units < 10) {
          return "warning";
        } else {
          return "ok";
        }
      }

      $(document).ready(function () {
        $("#grid-databound-dataitems").kendoGrid({
          dataSource: {
            data: products,
            schema: {
              model: {
                id: "ID",
                fields: {
                  ID: { type: "number" },
                  ProductName: { },
                  UnitsInStock: { type: "number" },
                  Discontinued: { type: "boolean" }
                }
              }
            }
          },
          sortable: true,
          columns: [
            { field: "ProductName", title: "Product Name" },
            { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
            { field: "Discontinued", width: "120px" }
          ],
          dataBound: function(e) {
            // get the index of the UnitsInStock cell
            var columns = e.sender.columns;
            var columnIndex = this.wrapper.find(".k-grid-header [data-field=" + "UnitsInStock" + "]").index();

            // iterate the table rows and apply custom cell styling
            var rows = e.sender.tbody.children();
            for (var j = 0; j < rows.length; j++) {
              var row = $(rows[j]);
              var dataItem = e.sender.dataItem(row);
              var units = dataItem.get("UnitsInStock");

              var cell = row.children().eq(columnIndex);
              cell.addClass(getUnitsInStockClass(units));
            }
          }
        });
      });
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
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`,
      detailCollapse: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.masterRow, e.detailRow);
      }
    });
    </script>

#### Example - subscribe to the "detailCollapse" event after initialization

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    function grid_detailCollapse(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`
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
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`,
      detailExpand: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.masterRow, e.detailRow);
      }
    });
    </script>

#### Example - get the data items of the expanded master and detail rows

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        dataSource: {
          data: [
            { EmployeeID: 1, FirstName: "Nancy", LastName: "Davolio", Country: "USA"},
            { EmployeeID: 2, FirstName: "Andrew", LastName: "Fuller", Country: "USA"},
            { EmployeeID: 3, FirstName: "Janet", LastName: "Leverling", Country: "Germany"}
          ]
        },
        pageable: true,
        detailInit: detailInit,
        dataBound: function() {
          this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [
          {
            field: "FirstName",
            title: "First Name",
            width: "110px"
          },
          {
            field: "LastName",
            title: "Last Name",
            width: "110px"
          },
          {
            field: "Country",
            width: "110px"
          }
        ],
        detailExpand: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          var masterDataItem = e.sender.dataItem(e.masterRow);
          // get detail Grid data
          //var detailDataItems = e.detailRow.find(".k-grid").data("kendoGrid").dataSource.data();

          //get detail grid data items using dataItem()
          var detailGridRows = e.detailRow.find(".k-master-row");
          var detailGrid = e.detailRow.find(".k-grid").data("kendoGrid");
          var detailDataItems = [];
          detailGridRows.each(function(idx, row){
            detailDataItems.push(detailGrid.dataItem(row))
          });

          console.log("master row dataItem", masterDataItem);
          console.log("detail row dataItem", detailDataItems);
        }
      });

      function detailInit(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
          dataSource: {
            data: [
              {EmployeeID: 1, OrderID: 10258, ShipCountry: "Austria" },
              {EmployeeID: 2, OrderID: 10558, ShipCountry: "Spain" },
              {EmployeeID: 1, OrderID: 10256, ShipCountry: "France" },
              {EmployeeID: 3, OrderID: 11005, ShipCountry: "Spain" }
            ],
            filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
          },
          pageable: true,
          columns: [
            { field: "OrderID", width: "110px" },
            { field: "ShipCountry", title:"Ship Country", width: "110px" }
          ]
        });
      }
    </script>

#### Example - subscribe to the "detailExpand" event after initialization

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    function grid_detailExpand(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`
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

The jQuery object of the edit container element, which wraps the editing UI. Depending on the [Grid edit mode](/api/javascript/ui/grid/configuration/editable.mode), the container is different:

* "incell" edit mode - the container element is a table cell
* "inline" edit mode - the container is a table row
* "popup" edit mode - the container is a Kendo UI Window [element](/framework/widgets/wrapper-element), which provides an easy way to obtain a reference to the Window widget object,
e.g. to [attach additional events](/intro/installation/events-and-methods#bind-to-events-after-widget-initialization).

##### e.model `kendo.data.Model`

The data item which is going to be edited. Use its [isNew](/api/javascript/data/model/methods/isnew) method to check if the data item is new (created) or not (edited).

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

#### Example - container element when the edit mode is set to "incell"

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
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
        editable: "incell",
        toolbar:["create"],
        edit: function(e) {
          var container = e.container;
          container.css("background-color", "#90EE90");
        }
      });
    </script>

#### Example - container element when the edit mode is set to "inline"

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
        editable: "inline",
        toolbar:["create"],
        edit: function(e) {
          var container = e.container;
          container.css("background-color", "#90EE90");
        }
      });
    </script>

#### Example - container element when the edit mode is set to "popup"

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
          var container = e.container;
          container.css("background-color", "#90EE90");
        }
      });
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

> When the Kendo UI Grid is configured for excel export, the workbook is extended internally with a `fileName` property which is used when the file is saved. The default name is "Export.xlsx". See the example below which shows how to change the name of the exported document.

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

### filter

Fired when the user is about to filter the DataSource via the filter UI.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Introduced in the Kendo UI 2016 R3 (2016.3.914) release.

#### Event Data

##### e.filter `Object`

The selected filter descriptor. If `null` the filter has been cleared for example by click on the `clear` button.

##### e.field `String`

The field for which the filter is constructed.

##### e.preventDefault `Function`

If invoked prevents adding the filter descriptor to the DataSource.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "filter" event during initialization

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
        filterable: true,
        filter: function(e) {
          if (e.filter == null) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("filter has been cleared");
          } else {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.filter.logic);
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.filter.filters[0].field);
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.filter.filters[0].operator);
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.filter.filters[0].value);
          }
        }
      });
    </script>

#### Example - subscribe to the "filter" event after initialization

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
        filterable: true
      });
      var grid = $("#grid").data("kendoGrid");
      grid.bind("filter", function(e) {
        if (e.filter == null) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("filter has been cleared");
        } else {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.filter.logic);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.filter.filters[0].field);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.filter.filters[0].operator);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.filter.filters[0].value);
        }
      });
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

### filterMenuOpen

Fired when the grid filter menu is opened, after the animations are completed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing filter menu form element.

##### e.field `String`

The field of the column for which the filter menu is opened.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "filterMenuOpen" event and focus second input

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
      filterMenuOpen: function(e) {
        if (e.field == "name") {
          e.container.find(".k-textbox:last").focus();
        }
      },
    });
    </script>

#### Example - subscribe to the "filterMenuOpen" after initialization and focus second input

    <div id="grid"></div>
    <script>
    function grid_filterMenuOpen(e) {
      if (e.field == "name") {
        e.container.find(".k-textbox:last").focus();
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
      filterable: true,
    });

    var grid = $("#grid").data("kendoGrid");
    grid.bind("filterMenuOpen", grid_filterMenuOpen);
    </script>

### group

Fired when the user is about to group the DataSource or modify the group descriptors state via the Grid group panel.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Introduced in the Kendo UI 2016 R3 (2016.3.914) release.

#### Event Data

##### e.groups `Array`

The selected group descriptors.

##### e.preventDefault `Function`

If invoked prevents applying the group descriptors changes to the DataSource and to the group panel UI.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "group" event during initialization

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
        groupable: true,
        group: function(e) {
          if (e.groups.length) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.groups[0].field);
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.groups[0].dir);
          }
        }
      });
    </script>

#### Example - subscribe to the "group" event after initialization

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
        groupable: true
      });
      var grid = $("#grid").data("kendoGrid");
      grid.bind("group", function(e) {
        if (e.groups.length) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.groups[0].field);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.groups[0].dir);
        }
      });
    </script>

### groupCollapse

Fired when the user collapses a group row.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Introduced in the Kendo UI 2017 R3 (2017.3.913) release.

#### Event Data

##### e.element `jQuery`

The jQuery object which represents the group row.

##### e.group `Object`

The group object associated with group row.

##### e.preventDefault `Function`

If invoked prevents collapsing of the group.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "groupCollapse" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
	  groupable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      groupCollapse: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.element, e.group);
      }
    });
    </script>

#### Example - subscribe to the "groupCollapse" event after initialization

    <div id="grid"></div>
    <script>
    function grid_groupCollapse(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.element, e.group);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      groupable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("groupCollapse", grid_groupCollapse);
    </script>

### groupExpand

Fired when the user expands a group row.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Introduced in the Kendo UI 2017 R3 (2017.3.913) release.

#### Event Data

##### e.element `jQuery`

The jQuery object which represents the group row.

##### e.group `Object`

The group object associated with group row.

##### e.preventDefault `Function`

If invoked prevents expanding of the group.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "groupExpand" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
	  groupable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      groupExpand: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.element, e.group);
      }
    });
    </script>

#### Example - subscribe to the "groupExpand" event after initialization

    <div id="grid"></div>
    <script>
    function grid_groupExpand(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.element, e.group);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      groupable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("groupExpand", grid_groupExpand);
    </script>

### navigate

> Important: This event is available with the Q3 2015 SP1 release.

Fired when [navigatable](/api/javascript/ui/grid/configuration/navigatable) is enabled and the user change current item with either
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.element); // displays the newly highlighted cell
      }
    });
    </script>

#### Example - subscribe to the "navigate" event after initialization

    <div id="grid"></div>
    <script>
    function grid_navigate(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

### page

Fired when the user is about change the current page index of DataSource via the pager UI.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Introduced in the Kendo UI 2016 R3 (2016.3.914) release.

#### Event Data

##### e.page `Number`

The selected page index.

##### e.preventDefault `Function`

If invoked prevents applying the changes to the DataSource.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "page" event during initialization

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
          pageSize: 1,
          schema: {
            model: { id: "id" }
          }
        },
        pageable: true,
        page: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.page);
        }
      });
    </script>

#### Example - subscribe to the "page" event after initialization

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
          pageSize: 1,
          schema: {
            model: { id: "id" }
          }
        },
        pageable: true
      });
      var grid = $("#grid").data("kendoGrid");
      grid.bind("page", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.page);
      });
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

The promise [progress handler](https://api.jquery.com/deferred.progress/) will be called periodically with the following arguments:
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
      pageable: true,
      pdf: {
          allPages: true
      },
      pdfExport: function(e) {
        e.promise
        .progress(function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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

### remove

Fired when the user clicks the "destroy" command button and delete operation is confirmed in the confirmation window, if the cancel button in the window is clicked the event will not be fired.

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Removing", e.model.name);
      }
    });
    </script>

#### Example - subscribe to the "remove" event after initialization

    <div id="grid"></div>
    <script>
    function grid_remove(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


### rowReorder

Fired when the user changes the order of a row.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.row `jQuery`

The jQuery object representing the table row being reordered.

##### e.rows `jQuery`

Available when multiple rows are dragged - the jQuery object representing the selected and dragged rows.

> When you Drap and Drop multiple items from one instance of the Grid to another the selected and dragged rows are available by the selected rows of the external Grid via the [`select`](/api/javascript/ui/grid/methods/select) method.

`selectedRows = externalGrid.select();`

##### e.newIndex `Number`

The new row index.

##### e.oldIndex `Number`

The previous row index.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the rowReorder action - prevents the client-side reordering.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { id:1, name: "Jane Doe", age: 30 },
        { id:2, name: "John Doe", age: 33 }
      ],
      reorderable: {
        rows: true
      },
      rowReorder: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.row, e.newIndex, e.oldIndex);
      }
    });
    </script>

#### Example - reordering with multiple selection

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { id:1, name: "Jane Doe", age: 30 },
        { id:2, name: "John Doe", age: 33 }
      ],
      reorderable: {
        rows: true
      },
      selectable: "multiple, row",
      rowReorder: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.row, e.rows, e.newIndex, e.oldIndex);
      }
    });
    </script>

### rowResize

Fired when the user resizes a row (rows).

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.row `jQuery`

A jQuery object holding a reference to the resized row element.

##### e.rows `jQuery`

A jQuery object holding a reference to all row elements that would be affected by the resizing. In scenario where row selection is enabled, users are allowed to resize all selected rows at once by performing the resize on one of them.

##### e.newHeight `Number`

The new row height.

##### e.oldHeight `Number`

The previous row height.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example

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
      resizable: { rows: true },
      rowResize: function(e) {
	      /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.row, e.newHeight, e.oldHeight);
      }
    });
    </script>

### save

Fired when a data item is saved.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.model `kendo.data.Model`

The data item to which the table row is bound. If `e.model.id` is null, then a newly created row is being saved.

##### e.container `jQuery`

The jQuery object representing the current edit container element. More information is available in the [edit event arguments' description](edit).

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

##### e.values `Object`

The values entered by the user. **Available only when the [editable.mode](/api/javascript/ui/grid/configuration/editable.mode) option is set to "incell".**

##### e.preventDefault `Function`

If invoked, prevents the save action. In "incell" [editable.mode](/api/javascript/ui/grid/configuration/editable.mode) the edited table cell will exit edit mode. In "inline" and "popup" edit modes, the edit form will remain open.

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
        if (e.values.name !== "") {
          // the user changed the name field
          if (e.values.name !== e.model.name) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("name is modified");
          }
        } else {
            e.preventDefault();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("name cannot be empty");
        }
      }
    });
    </script>

#### Example - subscribe to the "save" event after initialization

    <div id="grid"></div>
    <script>
    function grid_save(e) {
        if (e.values.name !== "") {
          // the user changed the name field
          if (e.values.name !== e.model.name) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("name is modified");
          }
        } else {
            e.preventDefault();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("name cannot be empty");
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

If invoked the grid will not call the [sync](/api/javascript/data/datasource/methods/sync) method of the data source.

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
        editable: true,
        toolbar: ["save"]
      });
      var grid = $("#grid").data("kendoGrid");
      grid.bind("saveChanges", grid_saveChanges);
    </script>

### sort

Fired when the user is about to modify the current state of sort descriptors of DataSource via the sort UI.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Introduced in the Kendo UI 2016 R3 (2016.3.914) release.

#### Event Data

##### e.sort `Object`

The selected sort descriptors.

##### e.preventDefault `Function`

If invoked prevents applying the changes to the DataSource.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "sort" event during initialization

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
        sortable: true,
        sort: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.sort.field);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.sort.dir);
        }
      });
    </script>

#### Example - subscribe to the "sort" event after initialization

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
        sortable: true
      });
      var grid = $("#grid").data("kendoGrid");
      grid.bind("sort", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.sort.field);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.sort.dir);
      });
    </script>
