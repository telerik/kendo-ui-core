---
title: Editing
page_title: jQuery Grid Documentation | Editing | Kendo UI
description: "Get started with the editing functionality of the jQuery Grid by Kendo UI allowing you to manipulate the way the data is presented."
slug: editing_kendoui_grid_widget
position: 4
---

# Editing

Editing is one of the basic functionalities the Kendo UI Grid supports. It allows you to manipulate the way the data is presented.

## Setup

To enable the editing support for the Grid, perform the steps described below.

### Configure the Data Source

The following example demonstrates how to configure the dataSource for CRUD (Create, Read, Update, Destroy) data operations.

###### Example

    var dataSource = new kendo.data.DataSource({
       transport: {
         read:   "/Products",
         update: {
            url: "/Products/Update",
            type: "POST"
         },
         destroy: {
             url: "/Products/Destroy",
             type: "POST"
          },
          create: {
              url: "/Products/Create",
              type: "POST"
           }
         },
         // determines if changes will be send to the server individually or as batch
         batch: true
         //...
    });

### Define Fields through schema

The following example demonstrates how to declare fields definitions through the DataSource [`schema.model `](/api/javascript/data/datasource/configuration/schema.model).

> **Important**
>
> Define the `id` field of the data items in `schema.model.id`. This ensures the correct adding, editing, and deleting of items.
>
> Define the datatype of the fields to take advantage of the built-in editors, filterable UI and correct sorting, filtering and grouping.

### DataTypes

 DataType | Column Template / Format | Editor | Parser
 :-------: | :----: | :--------: | :------------------:
 `string`| Displayed as text.  | `<input type="text" class="k-input k-textbox" name="fieldName" data-bind="value:fieldName">` | Internal method. String conversion.
 `number`| [`columns.format`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.format) can be used to format the number as currency `"{0:c2}"`, percentage `"{0:p0}"`, exponential `"{0:e4}"` or a custom format `"{0:0.00}"`. See all [`Number Formatting`](/framework/globalization/numberformatting) | [`kendo.ui.NumericTextBox`](/controls/editors/numerictextbox/overview) | [`kendo.parseFloat()`](/api/javascript/kendo/methods/parsefloat)
 `date` | [`columns.format`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.format) can be used to format the date as a short `"{0:d}"`, long `"{0:D}"`, full date/time `"{0:F}"` and many more standard and custom date patterns. See all [`Date Formatting`](/framework/globalization/dateformatting) | [`kendo.ui.DatePicker`](/controls/editors/datepicker/overview) | [`kendo.parseDate()`](/api/javascript/kendo/methods/parsedate)
 `boolean` | Displayed as lowercase text `true` or `false` | `<input type="checkbox" name="fieldName" data-type="boolean" data-bind="checked:fieldName">`| Internal method. Boolean conversion.
 `object` |  Arrays and Objects without templates are  rendered as `[object Object]`.| `<input type="text" class="k-input k-textbox" name="fieldName" data-bind="value:fieldName">` | Not processed. The value is passed as is.

###### Example

    var dataSource = new kendo.data.DataSource({
        schema: {
            model: {
                 id: "id",
                 fields: {
                    id: {
                        editable: false,
                        // a defaultValue will not be assigned (default value is false)
                        nullable: true
                    },
                    name: {
                        type: "string",
                        validation: { required: true }
                    },
                    price: {
                         // A NumericTextBox editor will be initialized in edit mode
                         type: "number",
                         // when a new model is created, this default will be used
                         defaultValue: 42
                    },
                    discontinued:{
                        // a checkbox editor will be initialized in edit mode
                        type: "boolean"
                    },
                    created: {
                        // a date picker editor will be initialized in edit mode
                        type: "date"
                    },
                    supplier: {
                        type: "object" ,
                        defaultValue: { companyName: "Progress", companyId: 1 }
                    }
                }
            }
        }
    });

### Set the editable Option

The grid is not [`editable`](/api/javascript/ui/grid/configuration/editable) by default. To enable the editing functionality, add the desired type of editing. The Kendo UI jQuery Grid supports three [`editable modes`](/api/javascript/ui/grid/configuration/editable.mode) - `incell`, `inline` and `popup` mode. To be fully functional, a [`toolbar`](/api/javascript/ui/grid/configuration/toolbar) should be added with a `create` button as well as a [`command column`](/api/javascript/ui/grid/configuration/columns.command) for the update and destroy operations.

The following example demonstrates how to configure a basic Kendo UI Grid with `incell` edit mode for CRUD operations.

###### Example

    // Incell editing
    $("#grid").kendoGrid({
        // to enable the insertion of new records, save or cancel changes
        toolbar: [ "create", "save", "cancel" ],
        columns: [ "name",
          // to trigger the incell destroy operation
          { command: [ "destroy" ] }
        ],
        dataSource: dataSource,
        editable: true
    });

The following example demonstrates how to configure a basic Kendo UI Grid with `inline` or `popup` edit mode for CRUD operations.

###### Example

    // Inline OR Popup editing
    $("#grid").kendoGrid({
        // to enable the insertion of new records
        toolbar: [ "create" ],
        columns: [ "name",
          // to trigger the inline or popup edit and destroy operations
          { command: [ "edit", "destroy" ] }
        ],
        dataSource: dataSource,
        editable: "inline" // OR editable: { mode : "popup" }
    });

## Foreign Key Columns

Normally, a foreign key column is bound to a numeric data field, which points to the unique keys of a separate collection. The Kendo UI Grid supports foreign key columns when an array of [`columns.values`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.values) is provided with `text` and `value` key-value pairs. Once the values array is provided, the following features become available out of the box:

* The column will show the text representation without the need for a template.
* A DropDownList is generated out of the box as an editor for the foreign key column.
* A DropDownList is generated out of the box as a filterable UI.
* The text representation of the dataItems is used as a `groupHeaderTemplate` without the need for a template.

A runnable example demonstrating this functionality can be found in our [demo](https://demos.telerik.com/kendo-ui/grid/foreignkeycolumn).

If some of the values in the foreign key column are `null`, an issue related to editing might occur. While this does not create problems in display mode, it misleads the column editor by causing it to perceive it has to work with object values instead of primitive values. As a result, when a value is picked from the DropDownList, the widget sets an object value to the data item of the Grid (for example, `{text: "Foo", value: 3}`), instead of a numeric value (for example, `3`). This causes the Grid cell to remain blank upon exiting edit mode.

To avoid this behavior, consider any of the following options:

* Use zeros instead of nulls to match the data values with the declared data field type.
* Use a [custom column editor](http://demos.telerik.com/kendo-ui/grid/editing-custom) with manually configured DropDownList that has a [`valuePrimitive`](/api/javascript/ui/dropdownlist/configuration/valueprimitive) setting set to `true`.

## Custom Editors

### MultiSelect

When a Kendo UI MultiSelect is used as a custom editor in the Grid and the value of the MultiSelect is changed, the `save` event of the Grid is not triggered.

The reason for this is that the value of the MultiSelect is a reference type (`array`), which prevents the normal usage of the `model.set()` function for setting the value of the corresponding model property.

To work around this behavior, define a custom data-binding mechanism. After applying this fix, the `save` event of the Grid is properly triggered each time a new selection is added to the value of the MultiSelect.

To see the runnable example on this issue, refer to the article on [using the MultiSelect as a custom editor in the Grid]({% slug howto_usemultiselectascustomeditor_grid %}).

### CheckBox

When using editing for a Boolean column the Grid will render a standard input type CheckBox element by default.

The custom CheckBox editor will allow unifying the look of the Grid editors by applying additional styles to the CheckBox based on the used CSS theme.

The following example demonstrates how to use Kendo UI styled CheckBox editor for Boolean columns.

###### Example

    function customBoolEditor(container, options) {
        $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
        $('<label class="k-checkbox-label">&#8203;</label>').appendTo(container);
    }

Also, a runnable example demonstrating this implementation can be found in our [demo](http://demos.telerik.com/kendo-ui/grid/editing)

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Localization of Messages in the Grid]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export of the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export of the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Printing of the Grid]({% slug exporting_pdf_kendoui_grid_widget %})
* [How-To Examples]({% slug howto_bindto_telerik_backend_services_grid %})
* [Knowledge Base Section](/knowledge-base)
