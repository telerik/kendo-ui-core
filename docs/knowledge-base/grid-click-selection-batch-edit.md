---
title: Implement Single Row Selection on Click in Batch Edit Grid
description: An example on how to allow click selection on a grid with batch edit mode enabled
type: how-to
page_title: Implement Single Row Selection on Click in Batch Edit Grid
slug: grid-click-selection-batch-edit
tags: single, row, selection, grid, batch, edit, mode
ticketid: 1125960
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
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

The default behavior of a Grid in Batch Edit mode is to become editable when a row is clicked; how can I implement single row selection on click and enter edit mode on double click instead?

## Solution

In order to implement the functionality described above, take advantage of the `closeCell` and `editCell` methods of the Kendo UI Grid API on single click and double click respectively:

```html
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
          { field: "Discontinued", width: 120, editor: customBoolEditor },
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

    function customBoolEditor(container, options) {
      $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
      $('<label class="k-checkbox-label">​</label>').appendTo(container);
    }
  </script>
</div>
```

## See Also

* [closeCell method reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-closeCell)
* [editCell method reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-editCell)
