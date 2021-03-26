---
title: Overview
page_title: jQuery Grid Documentation | Editing Overview
description: "Get started with the editing functionality of the jQuery Grid by Kendo UI allowing you to manipulate the way the data is presented."
slug: editing_kendoui_grid_widget
position: 1
---

# Editing Overview

Editing is a basic functionality of the Kendo UI Grid which allows you to manipulate the way its data is presented.

The Grid provides the following edit modes:
* [Batch editing]({% slug batchediting_grid %})
* [Inline editing]({% slug inlineediting_grid %})
* [Popup editing]({% slug popupediting_grid %})
* [Custom editing]({% slug customediting_grid %})

## Getting Started

To enable editing:

1. [Get familiar with the common editing concepts in Kendo UI]({% slug kendoui_editing_gettingstarted %})
1. [Configure the data source of the Grid](#configuring-the-data-source)
1. [Define the fields through the `schema` configuration](#defining-fields-through-schema)
1. [Set the `editable` option](#setting-the-editable-option)

### Configuring the Data Source

The following example demonstrates how to configure the DataSource for CRUD (Create, Read, Update, Destroy) data operations.

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
         // Determines if changes will be send to the server individually or as batch.
         batch: true
         //...
    });

### Defining Fields through schema

The following example demonstrates how to declare the fields definitions through the DataSource [`schema.model `](/api/javascript/data/datasource/configuration/schema.model).

> * Define the `id` field of the data items in `schema.model.id`. This ensures the correct adding, editing, and deleting of items.
> * Define the datatype of the fields to take advantage of the built-in editors, filterable UI and correct sorting, filtering and grouping.

The following table lists the available data types.

Data Type | Column Template or Format | Editor | Parser
:-------: | :----: | :--------: | :------------------:
`string`| Displayed as text.  | `<input type="text" class="k-textbox" name="fieldName" data-bind="value:fieldName">` | Internal method. String conversion.
`number`| [`columns.format`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.format) can be used to format the number as currency `"{0:c2}"`, percentage `"{0:p0}"`, exponential `"{0:e4}"` or a custom format `"{0:0.00}"`. See all [`Number Formatting`](/framework/globalization/numberformatting) | [`kendo.ui.NumericTextBox`](/controls/editors/numerictextbox/overview) | [`kendo.parseFloat()`](/api/javascript/kendo/methods/parsefloat)
`date` | [`columns.format`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.format) can be used to format the date as a short `"{0:d}"`, long `"{0:D}"`, full date/time `"{0:F}"` and many more standard and custom date patterns. See all [`Date Formatting`](/framework/globalization/dateformatting) | [`kendo.ui.DatePicker`](/controls/editors/datepicker/overview) | [`kendo.parseDate()`](/api/javascript/kendo/methods/parsedate)
`boolean` | Displayed as lowercase text `true` or `false` | `<input type="checkbox" name="fieldName" data-type="boolean" data-bind="checked:fieldName">`| Internal method. Boolean conversion.
`object` |  Arrays and Objects without templates are rendered as `[object Object]`.| `<input type="text" class="k-textbox" name="fieldName" data-bind="value:fieldName">` | Not processed. The value is passed as is.

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
                         // A NumericTextBox editor will be initialized in edit mode.
                         type: "number",
                         // When a new model is created, this default will be used.
                         defaultValue: 42
                    },
                    discontinued:{
                        // A checkbox editor will be initialized in edit mode.
                        type: "boolean"
                    },
                    created: {
                        // A date picker editor will be initialized in edit mode.
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

### Setting the editable Option

By default, the Grid is not [`editable`](/api/javascript/ui/grid/configuration/editable). To enable the editing functionality, add the desired type of editing. The Kendo UI jQuery Grid supports the in-cell, inline, and popup [edit modes](/api/javascript/ui/grid/configuration/editable.mode). In orde for the edit functionality to be fully functional, add a [`toolbar`](/api/javascript/ui/grid/configuration/toolbar) with a **Create** button and a [command column](/api/javascript/ui/grid/configuration/columns.command) for the update and destroy operations.

The following example demonstrates how to configure a basic Grid in the incell edit mode for CRUD operations.

    // Incell editing.
    $("#grid").kendoGrid({
        // To enable the insertion of new records, save or cancel changes.
        toolbar: [ "create", "save", "cancel" ],
        columns: [ "name",
          // To trigger the in-cell destroy operation.
          { command: [ "destroy" ] }
        ],
        dataSource: dataSource,
        editable: true
    });

The following example demonstrates how to configure a basic Grid in the inline or popup edit mode for CRUD operations.

    // Inline OR Popup editing.
    $("#grid").kendoGrid({
        // To enable the insertion of new records.
        toolbar: [ "create" ],
        columns: [ "name",
          // To trigger the inline or popup edit and destroy operations.
          { command: [ "edit", "destroy" ] }
        ],
        dataSource: dataSource,
        editable: "inline" // OR editable: { mode : "popup" }
    });

## KB Articles on Editing

* [Customizing the Confirmation Window]({% slug howto_customize_delete_confirmation_dialog_grid %})
* [Adding Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [Accessing the Editor Controls in edit Events]({% slug howto_access_editor_controlsin_edit_events_grid %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
