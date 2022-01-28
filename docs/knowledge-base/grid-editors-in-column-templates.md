---
title: Render Grid Editor in Column Template
page_title: Editor in Column Template | Kendo UI Grid for jQuery
description: "An example on how to edit the Kendo UI Grid for jQuery by using a column template."
previous_url: /controls/data-management/grid/how-to/Editing/grid-editors-in-column-templates
slug: howto_render_editor_column_template_grid
tags: grid, editor, render, column, template
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I render an input editor in a column template and provide the editing functionality?

## Solution

The following example demonstrates how to render an input editor in a column template and provide the editing functionality.

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
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
            dataSource = new kendo.data.DataSource({
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/Products",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/Products/Update",
                  dataType: "jsonp"
                },
                destroy: {
                  url: crudServiceBaseUrl + "/Products/Destroy",
                  dataType: "jsonp"
                },
                create: {
                  url: crudServiceBaseUrl + "/Products/Create",
                  dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
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
            { template: "<input data-bind='value:ProductName' class='k-textbox' />", title: "Product Name", width: 110 },
            { template: "<input data-bind='value:UnitsInStock' class='k-textbox'/>", title: "Units In Stock", width: 110 },
            { field: "Discontinued", width: 110 },
            { command: "destroy", title: "&nbsp;", width: 90 }],
          editable: true,
          dataBound: onDataBound
        });
      });
    </script>
```
