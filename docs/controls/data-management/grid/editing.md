---
title: Editing
page_title: Editing | Kendo UI Grid
description: "Learn how to enable the editing support for the Kendo UI Grid widget."
slug: editing_kendoui_grid_widget
position: 4
---

# Editing

Editing is one of the basic functionalities the Kendo UI Grid supports. It allows you to manipulate the way the data is presented.

## Setup

To enable the editing support for the Grid, perform the steps described below.

### Configure the Data Source

The example below demonstrates how to configure the dataSource for CRUD (Create, Read, Update, Destroy) data operations.

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

The example below demonstrates how to declare fields definitions through the DataSource [`schema.model `](/api/javascript/data/datasource#configuration-schema.model).

> **Important**  
>
> Define the `id` field of the data items in `schema.model.id`. This ensures the correct adding, editing, and deleting of items.

###### Example

    var dataSource = new kendo.data.DataSource({
        //..
        schema: {
          model: {
             id: "ProductID",
             fields: {
                 ProductID: {
                    //this field will not be editable (default value is true)
                    editable: false,
                    // a defaultValue will not be assigned (default value is false)
                    nullable: true
                 },
                 ProductName: {
                    validation: { //set validation rules
                        required: true
                    }
                 },
                 UnitPrice: {
                     //data type of the field {Number|String|Boolean} default is String
                     type: "number",
                     // used when new model is created
                     defaultValue: 42,
                     validation: {
                        required: true,
                        min: 1
                     }
                }
            }
        }
      }
    });

### Set the editable Option

The example below demonstrates the two alternatives to set the `editable` configuration option in the Grid.

###### Example

    // Choice 1
    $("#grid").kendoGrid({
          dataSource: dataSource,
          editable: true
    });

    // Choice 2
    $("#grid").kendoGrid({
          dataSource: dataSource,
          editable: { //disables the deletion functionality
             update: true,
             destroy: false
          }
    });

To enable the insertion of new records, configure the Toolbar, as demonstrated in the following example.

###### Example

    $("#grid").kendoGrid({
         dataSource: dataSource,
         toolbar: ["create", "save", "cancel"],
         editable: true
    });

To delete records, define a delete command column, as demonstrated in the following example.

###### Example

     $("#grid").kendoGrid({
         dataSource: dataSource,
         columns: [
            "ProductName",
            "UnitPrice",
            "UnitsInStock",
            {
                command: "destroy"
            }],
         editable: true
     });

## Foreign Key Columns

Normally, a foreign key column is bound to a numeric data field, which points to the unique keys of a separate collection.

If some of the values in the foreign key column are `null`, an issue related to editing might occur. While this does not create problems in display mode, it misleads the column editor by causing it to perceive it has to work with object values instead of primitive values. As a result, when a value is picked from the DropDownList, the widget sets an object value to the data item of the Grid (for example, `{text: "Foo", value: 3}`), instead of a numeric value (for example, `3`). This causes the Grid cell to remain blank upon exiting edit mode.

To avoid this behavior, consider any of the following options:

* Use zeros instead of nulls to match the data values with the declared data field type.
* Use a [custom column editor](http://demos.telerik.com/kendo-ui/grid/editing-custom) with manually configured DropDownList that has a [`valuePrimitive`](/api/javascript/ui/dropdownlist#configuration-valuePrimitive) setting set to `true`.

## Custom Editors

When a Kendo UI MultiSelect is used as a custom editor in the Grid and the value of the MultiSelect is changed, the `save` event of the Grid is not triggered.

The reason for this is that the value of the MultiSelect is a reference type (`array`), which prevents the normal usage of the `model.set()` function for setting the value of the corresponding model property.

To work around this behavior, define a custom data-binding mechanism. After applying this fix, the `save` event of the Grid is properly triggered each time a new selection is added to the value of the MultiSelect.

To see the runnable example on this issue, refer to the article on [using the MultiSelect as a custom editor in the Grid]({% slug howto_usemultiselectascustomeditor_grid %}).

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Localization of Messages in the Grid]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export of the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export of the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Printing of the Grid]({% slug exporting_pdf_kendoui_grid_widget %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
