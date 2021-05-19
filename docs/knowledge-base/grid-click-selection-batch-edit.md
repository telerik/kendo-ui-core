---
title: Implement Single-Row Selection on Click in Batch Edit Grid
description: An example on how to allow click selection in a Kendo UI Grid in batch edit mode.
type: how-to
page_title: Implement Single-Row Selection on Click in Batch Edit Mode | Kendo UI Grid for jQuery
slug: grid-click-selection-batch-edit
tags: single, row, selection, grid, batch, edit, mode
ticketid: 1125960
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

The default behavior of a Grid in batch edit mode is to become editable when a row is clicked.

How can I implement a single-row selection on click and make the Grid enter the edit mode on a double click instead?

## Solution

Use the `closeCell` and `editCell` methods of the Grid on single or double click respectively.

```dojo
<div id="example">
  <div id="grid"></div>

  <script>
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
            pageSize: 20,
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
        navigatable: true,
        pageable: true,
        height: 550,
        toolbar: ["create", "save", "cancel"],
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
          { field: "UnitsInStock", title: "Units In Stock", width: 120 },
          { field: "Discontinued", width: 120 },
          { command: "destroy", title: "&nbsp;", width: 150 }],
        editable: true,
        selectable: true
      });

      var grid  = $('#grid').data("kendoGrid");
      grid.element.on('click', 'tbody>tr>td:not(.k-edit-cell)', function (e) {
        grid.closeCell();
      });
      grid.element.on("dblclick", "tbody>tr>td:not(.k-edit-cell)", "dblclick", function (e) {
        grid.editCell($(this));
      });
    });
  </script>
</div>
```

## See Also

* [API Reference of the `closeCell` Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/closecell)
* [API Reference of the `editCell` Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/editcell)
