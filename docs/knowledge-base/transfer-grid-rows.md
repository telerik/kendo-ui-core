---
title: Transfer Grid Rows by Using the Sortable
page_title: Transfer Grid Rows by Using the Sortable
description: "Learn how to move a row from one Grid to another using the Kendo UI Sortable widget."
slug: howto_transfergridrows_sortable
previous_url: /controls/interactivity/sortable/how-to/transfer-grid-rows
tags: telerik, kendo, jquery, sortable, transfer, grid, rows
component: sortable
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Sortable for jQuery</td>
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

How can I move a row from one Kendo UI Grid to another by dragging it from the first Grid to the second one and vice versa?

## Solution

The following example demonstrates how to achieve the desired scenario. Reordering the rows within the same Grid in the same way is also supported.

```dojo
<div id="grid1" style="width: 400px; float:left"></div>
<div id="grid2" style="width: 400px; float:left"></div>
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
<script>
  $("#grid1").kendoGrid({
    dataSource: {
      data: products,
      schema: {
        model: {
          fields: {
            ProductName: { type: "string" },
            UnitPrice: { type: "number" },
            UnitsInStock: { type: "number" },
            Discontinued: { type: "boolean" }
          }
        }
      },
      pageSize: 5
    },
    columns: [
      "ProductName",
      { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" }
    ],
    dataBound: insertNoRecordsRow, // Required to handle the transfer row to an empty Grid scenario.
    pageable: true
  });

  $("#grid2").kendoGrid({
    dataSource: {
      data: [],
      schema: {
        model: {
          fields: {
            ProductName: { type: "string" },
            UnitPrice: { type: "number" },
            UnitsInStock: { type: "number" },
            Discontinued: { type: "boolean" }
          }
        }
      },
      pageSize: 5
    },
    dataBound: insertNoRecordsRow, // Required to handle the transfer row to an empty Grid scenario.
    pageable: true,
    columns: [
      "ProductName",
      { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" }
    ]
  });

  var dataItem = null;

  $(".k-grid table").kendoSortable({
    connectWith: '.k-grid table',
    filter: ">tbody >tr",
    disabled: ".no-drag", // Do not allow the transferring of the no-records row.
    hint: $.noop,
    cursor: "move",
    placeholder: function(element) {
      return element.clone().addClass("k-hover").css("opacity", 0.65);
    },
    change: function(e) { // The change event handler implementation may differ according to the scenario.
      var grid = this.element.closest(".k-grid").data("kendoGrid");
      var skip = grid.dataSource.skip();
      var oldIndex = e.oldIndex + skip;
      var newIndex = e.newIndex + skip;

      if (e.action == "remove") {
        dataItem = grid.dataSource.getByUid(e.item.data("uid"));
        grid.dataSource.remove(dataItem);
      } else if (e.action == "receive" && dataItem != null) {
        grid.dataSource.insert(newIndex, dataItem);
        dataItem = null;
      } else if (e.action == "sort") {
        dataItem = grid.dataSource.getByUid(e.item.data("uid"));

        grid.dataSource.remove(dataItem);
        grid.dataSource.insert(newIndex, dataItem);
      }

      grid.saveChanges();
    }
  });

  function insertNoRecordsRow() {
    if (!this.dataSource.data().length) {
      this.tbody.append($("<tr class='no-drag' colspan='2'><td>No records</td></tr>"));
    }
  }
</script>
```

## See Also

* [Basic Usage of the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/index)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
