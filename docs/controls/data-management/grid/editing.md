---
title: Editing
page_title: Editing | Kendo UI Grid
description: "Learn how to enable the editing support for the Kendo UI Grid widget."
slug: editing_kendoui_grid_widget
position: 4
---

# Editing

Editing is one of the basic functionalities Kendo UI Grid supports and it allows you to manipulate the way the data is presented.

## Set Up

To enable the editing support for the Kendo UI Grid widget, perform the steps described below.

### Configure DataSource

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

### Define Fields: schema

The example below demonstrates how to declare fields definitions through the DataSource `schema`.

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

### Set Options: editable

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

If you want to enable the insertion of new records, configure the Toolbar, as shown below.

###### Example

    $("#grid").kendoGrid({
         dataSource: dataSource,
         toolbar: ["create", "save", "cancel"],
         editable: true
    });

If you want to delete records, define a delete command column, as demonstrated below.

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

## Editing a Foreign Key Column

Normally, a foreign key column should be bound to a numeric data field, which points to the unique keys of a separate collection. An issue related to editing may occur if some of the values in the foreign key column are `null`. While this will not create problems in display mode, it will mislead the column editor to think it should work with object values, instead of primitive values. As a result, when a value is picked from the DropDownList, the widget will set an object value to the Grid data item (e.g. {text: "Foo", value: 3} ), instead of a numeric value (e.g. 3). This will cause the Grid cell to remain blank upon exiting edit mode.

To avoid the above behavior, one of the following options paths be followed:

* use zeros instead of nulls to match the data values to the declared data field type
* use a [custom column Editor](http://demos.telerik.com/kendo-ui/grid/editing-custom) with manually configured DropDownList that has a [`valuePrimitive`](/api/javascript/ui/dropdownlist#configuration-valuePrimitive) setting set to `true`

## See Also

Other articles on the Kendo UI Grid:

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Remote Data Binding]({% slug remote_data_binding_grid %})
* [Localization of Messages]({% slug localization_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Adaptive Rendering]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Print the Grid]({% slug exporting_pdf_kendoui_grid_widget %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
