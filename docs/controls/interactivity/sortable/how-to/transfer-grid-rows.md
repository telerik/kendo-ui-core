---
title: Transfer Grid Rows
page_title: Transfer Grid Rows | Kendo UI Sortable
description: "Learn how to move a row from one Grid to another using the Kendo UI Sortable widget."
slug: howto_transfergridrows_sortable
---

# Transfer Grid Rows

The example below demonstrates how to move a row from one Kendo UI Grid to another by dragging it from the first Grid to the second one and vice versa. Reordering the rows within the same Grid in the same way is also supported.

###### Example

```html
<div id="grid1" style="width: 400px; float:left"></div>
<div id="grid2" style="width: 400px; float:left"></div>
<script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
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
    dataBound: insertNoRecordsRow, //required to handle transfer row to empty grid scenario
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
    dataBound: insertNoRecordsRow, //required to handle transfer row to empty grid scenario
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
    disabled: ".no-drag", //do not allow transferring the no records row
    hint: $.noop,
    cursor: "move",
    placeholder: function(element) {
      return element.clone().addClass("k-state-hover").css("opacity", 0.65);
    },
    change: function(e) { //change event handler implementation may differ according to the scenario
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

Other articles and how-to examples on the Kendo UI Sortable:

* [Sortable JavaScript API Reference](/api/javascript/ui/sortable)
* [How to Nest Sortables]({% slug howto_nestsortables_sortable %})
* [How to Persist Order in localStorage]({% slug howto_persistoderinlocalstorage_sortable %})
* [How to Reorder AngularJS Grid Rows]({% slug howto_reorderangularjsgridrows_angular_sortable %})
* [How to Reorder Grid Rows]({% slug howto_reordergridrows_sortable %})
* [How to Reorder Multiple Items]({% slug howto_reordermultipleitems_sortable %})
* [How to Reorder Rows in Nested Grid]({% slug howto_reorderrowsinnestedgrid_sortable %})
* [How to Use Sortable in AngularJS with Grid in Batch Editing Mode]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %})

For more runnable examples on the Kendo UI Sortable, browse the [how-to articles]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %}).
