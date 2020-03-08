---
title: Access Editor Controls in edit Events
page_title: Access Editor Controls in edit Events | Kendo UI Grid for jQuery
description: "An example on how to access an editor control in the edit event handler of the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/access-editor-control
slug: howto_access_editor_controlsin_edit_events_grid
tags: grid, editor, edit, events
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I access an editor in the `edit` event handler of the Grid?

## Solution

The functionality relies on the following concepts:
* The [`edit`](/api/javascript/ui/grid/events/edit) event handler of the Grid provides a reference to the DOM element of the edit container.
* The Kendo UI widgets have a `data-role` HTML attribute rendered for the DOM element. This attribute holds the widget object.

For brevity, the following demo does not include the configuration for the Data Source transport. However, for the [CRUD operations]({% slug cruddataoperations_kendoui_datasourcecomponent %}) to work properly, they require a transport configuration.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
<div id="example">
    <div id="grid"></div>

    <script>

        $(document).ready(function () {
            var dataSource = new kendo.data.DataSource({
               pageSize: 20,
               data: products,
               schema: {
                   model: {
                     id: "ProductID",
                     fields: {
                        ProductID: { editable: false, nullable: true },
                        ProductName: { validation: { required: true } },
                        Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages"} },
                        UnitPrice: { type: "number", validation: { required: true, min: 1} }
                     }
                   }
               }
            });

            $("#grid").kendoGrid({
                dataSource: dataSource,
                pageable: true,
                height: 550,
                toolbar: ["create"],
                columns: [
                    { field:"ProductName",title:"Product Name" },
                    { field: "Category", title: "Category", width: "180px", editor: categoryDropDownEditor, template: "#=Category.CategoryName#" },
                    { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "130px" },
                    { command: "edit", title: " ", width: "150px" }],
                editable: "inline",
                edit: function(e) {
                  var model = e.model; //reference to the model that is about the be edited

                  var container = e.container; //reference to the editor container

                  var categoryDropDownList = container.find("[data-role=dropdownlist]").data("kendoDropDownList"); //find widget element and then get the widget instance
                  // if DropDownListwidget is found
                  if (categoryDropDownList) {
                    //use DropDownList API based on the model values to accomplish your bussiness requirement.
                    //link: https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist
                    console.log("DropDownList", categoryDropDownList);
                  }

                  var priceNumericTextBox = container.find("[data-role=numerictextbox]").data("kendoNumericTextBox"); //find widget element and then the widget instance
                  if (priceNumericTextBox) {
                    //use NumericTextBox API
                    //link: https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox
                    console.log("NumericTextBox", priceNumericTextBox);
                  }
                }
            });
        });

        function categoryDropDownEditor(container, options) {
            $('<input required data-text-field="CategoryName" data-value-field="CategoryID" data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    dataSource: {
                        type: "odata",
                        transport: {
                            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                        }
                    }
                });
        }

    </script>
</div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
