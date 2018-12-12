---
title: Update Adjacent Cells in Grid Rows while in Inline Edit Mode
description: An example on how to update the value of adjacent cells while the Kendo UI Grid is in inline edit mode.
type: how-to
page_title: Update Adjacent Cells in Rows in Inline Edit Mode | Kendo UI Grid
slug: grid-update-cells-in-inline-edit-mode
tags: grid, inline, edit, mode, update, cells, next, contiguous
ticketid: 1147034
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

My Grid has a `ProductName` field and is in the inline edit mode. When I change the value of the `ProductName` field, the Model is not updated and the change is not reflected in the affected row cells.

How can I update the Model and, respectively, the row cells which correspond to the value I provide to the `ProductName` field when the Grid is in its inline editing mode?

## Solution

To update the value of the Grid cells in an inline edit row mode when another field in the same row changes and while having the new value reflected still in edit mode:

1. Subscribe to the `change` event of the Grid.
1. When the event is triggered, check if its `action` corresponds to `itemchange` and its `field` to the one you choose.
1. If both conditions are met, get the `DataItem` of the row that is edited and update it by using the `set` method, which will propagate the changes in the GUI.

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
        change: onChange,
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
        height: 550,
        toolbar: ["create"],
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
          { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
          { field: "Discontinued", width: "120px", editor: customBoolEditor },
          { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
        editable: "inline"
      });
    });

    function customBoolEditor(container, options) {
      var guid = kendo.guid();
      $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
      $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
    }

    function onChange(e) {
      if (e.action == "itemchange" && e.field == "ProductName")
      {
        alert("Product Name Changed");
        var editItemModelId = e.items[0].ProductID;
        var grid = $("#grid").data("kendoGrid");
        var dataItem = grid.dataSource.get(editItemModelId);
        dataItem.set("Discontinued", true);
      }
    }
  </script>
</div>
```

## See Also

* [The set Method of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/data/model/methods/set)
* [The change Event of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/change)
