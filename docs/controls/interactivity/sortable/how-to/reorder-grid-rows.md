---
title: Reorder Grid Rows
page_title: Reorder Grid Rows | Kendo UI Sortable
description: "Learn how to reorder Grid rows using a Kendo UI Sortable widget."
slug: howto_reordergridrows_sortable
---

# Reorder Grid Rows

The example below demonstrates how to reorder Grid rows using the Kendo UI Sortable widget.

###### Example

```html
    <div id="grid" style="width: 800px; margin: 0 auto;"></div>
    <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <script>
      var grid = $("#grid").kendoGrid({
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
          pageSize: 16
        },
        scrollable: false,
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
          { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
          { field: "Discontinued", width: "130px" }
        ]
      }).data("kendoGrid");

      grid.table.kendoSortable({
        filter: ">tbody >tr",
        hint: function(element) { //customize the hint
          var table = $('<table style="width: 600px;" class="k-grid k-widget"></table>'),
              hint;

          table.append(element.clone()); //append the dragged element
          table.css("opacity", 0.7);

          return table; //return the hint element
        },
        cursor: "move",
        placeholder: function(element) {
          return $('<tr colspan="4" class="placeholder"></tr>');
        },
        change: function(e) {
          var skip = grid.dataSource.skip(),
              oldIndex = e.oldIndex + skip,
              newIndex = e.newIndex + skip,
              data = grid.dataSource.data(),
              dataItem = grid.dataSource.getByUid(e.item.data("uid"));

          grid.dataSource.remove(dataItem);
          grid.dataSource.insert(newIndex, dataItem);
        }
      });
    </script>
    <style>
      .k-grid tbody tr {
        cursor: move;
      }

      .placeholder {
        outline-style: dashed;
        outline-width: 1px;
        outline-color: red;
      }
    </style>
```

## See Also

Other articles and how-to examples on the Kendo UI Sortable:

* [Sortable JavaScript API Reference](/api/javascript/ui/sortable)
* [How to Nest Sortables]({% slug howto_nestsortables_sortable %})
* [How to Persist Order in localStorage]({% slug howto_persistoderinlocalstorage_sortable %})
* [How to Reorder AngularJS Grid Rows]({% slug howto_reorderangularjsgridrows_angular_sortable %})
* [How to Reorder Multiple Items]({% slug howto_reordermultipleitems_sortable %})
* [How to Reorder Rows in Nested Grid]({% slug howto_reorderrowsinnestedgrid_sortable %})
* [How to Transfer Grid Rows]({% slug howto_transfergridrows_sortable %})
* [How to Use Sortable in AngularJS with Grid in Batch Editing Mode]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %})

For more runnable examples on the Kendo UI Sortable, browse the [how-to articles]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %}).
