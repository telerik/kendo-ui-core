---
title: Render and Edit Inputs in Grid Column Templates
page_title: Render and Edit Inputs in Grid Column Templates - Kendo UI for jQuery Data Grid
description: "Learn how to render and edit one or multiple input controls in a Kendo UI for jQuery Grid cell by using a column template and MVVM data binding."
previous_url: /controls/data-management/grid/how-to/Editing/grid-editors-in-column-templates
slug: howto_render_editor_column_template_grid
tags: grid, editor, render, column, template
type: how-to
res_type: kb
components: ["grid"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Version</td>
  <td>2026.3.811</td>
 </tr>
</table>

## Description

How can I render and edit an input in a Kendo UI for jQuery Grid column template?

This KB also answers the following questions:

* How do I edit an input in a Kendo UI Grid column template?
* How can I bind a custom input editor to a Grid data item?
* How can I display two input fields in one editable Grid cell?

## Solution

To render and edit an input in a Grid column template, add an input with a `data-bind` attribute that matches a field in the data source model. Handle the `dataBound` event and call `kendo.bind` for each rendered row. Set `editable` to `true` and add the `save` and `cancel` toolbar commands when you want to save or cancel changes to the bound data items.

The following example renders inputs in column templates and binds them to the corresponding fields in each Grid data item. The inputs remain visible in the cells, and changes update the row model through MVVM binding.

```dojo
    <div id="grid"></div>
    <script>
      function onDataBound(e) {
        editAll();
      }

      function editAll() {
        var theGrid = $("#grid").data("kendoGrid");
        $("#grid tbody").find('tr').each(function () {
          var model =  theGrid.dataItem(this);
          kendo.bind(this,model);
        });
        $("#grid").focus();
      }

      $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
          dataSource = new kendo.data.DataSource({
              transport: {
                  read:  {
                      url: crudServiceBaseUrl + "/Products"
                  },
                  update: {
                      url: crudServiceBaseUrl + "/Products/Update",
                      type: "POST",
                  contentType: "application/json"
                  },
                  destroy: {
                      url: crudServiceBaseUrl + "/Products/Destroy",
                      type: "POST",
                  contentType: "application/json"
                  },
                  create: {
                      url: crudServiceBaseUrl + "/Products/Create",
                      type: "POST",
                  contentType: "application/json"
                  },
                  parameterMap: function(options, operation) {
                      if (operation !== "read" && options.models) {
                          return kendo.stringify(options.models);
                      }
                  }
              },
              batch: true,
              pageSize: 10,
              schema: {
                model: {
                  id: "ProductID",
                  fields: {
                    ProductID: { editable: false, nullable: true },
                    ProductName: { validation: { required: true } },
                    UnitPrice: { type: "number", validation: { required: true, min: 1} },
                    Discontinued: { type: "boolean" },
                    UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                  }
                }
              }
            });

        $("#grid").kendoGrid({
          dataSource: dataSource,

          pageable: true,
          height: 430,
          toolbar: ["create", "save", "cancel"],
          columns: [
            { template: "<span class='k-input k-textbox'><input data-bind='value:ProductName' class='k-input-inner' /></span>", title: "Product Name", width: 110 },
            { template: "<span class='k-input k-textbox'><input data-bind='value:UnitsInStock' class='k-input-inner' /></span>", title: "Units In Stock", width: 110 },
            { field: "Discontinued", width: 110 },
            { command: "destroy", title: "&nbsp;", width: 90 }],
          editable: true,
          dataBound: onDataBound
        });
      });
    </script>
```

To render multiple inputs in the same cell, use the same column-template pattern and add a `data-bind` attribute for each field. The fields must be defined in the Grid data source schema. Binding each row to its data item ensures that changes to either input update the corresponding field in the row model.

The following example displays the `firstName` and `lastName` inputs in one cell and updates both fields on the row model. If you use the `columns.editor` configuration instead of a column template, the editing UI must also contain an element whose `name` attribute matches the column `field`.

```dojo
    <div id="grid"></div>

    <script>
      function bindRows(e) {
        e.sender.tbody.find("tr").each(function () {
          kendo.bind(this, e.sender.dataItem(this));
        });
      }

      $(document).ready(function () {
        $("#grid").kendoGrid({
          dataSource: {
            data: [
              { id: 1, firstName: "Jane", lastName: "Doe" },
              { id: 2, firstName: "John", lastName: "Smith" }
            ],
            schema: {
              model: {
                id: "id",
                fields: {
                  firstName: { type: "string" },
                  lastName: { type: "string" }
                }
              }
            }
          },
          toolbar: ["save", "cancel"],
          editable: true,
          dataBound: bindRows,
          columns: [
            {
              title: "Name",
              template: "<input name='firstName' data-bind='value:firstName' /> <input name='lastName' data-bind='value:lastName' />"
            }
          ]
        });
      });
    </script>
```

## See Also

* [Custom Editing by the Grid]({% slug customediting_grid %})
* [Column Templates]({% slug column_templates_kendoui_grid_widget %})
* [Data Binding Overview]({% slug data_binding_grid %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)