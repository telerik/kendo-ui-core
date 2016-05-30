---
title: Create Reorderable Grid with Restricted Rows
page_title: Create Reorderable Grid with Restricted Rows | Kendo UI Sortable
description: "Learn how to restrict rows reordering in a Kendo UI Grid with a Kendo UI Sortable widget."
slug: howto_restrict_reordergridrows_sortable
---

# Create Reorderable Grid with Restricted Rows

The example below demonstrates how to reorder Grid rows using the Kendo UI Sortable widget and disable the top rows from reordering.

###### Example

```html
    <div id="grid" style="width: 800px; margin: 0 auto;"></div>
    <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <script>
      var RESTRICTED_ROWS_NUMBER = 3;

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
        ],
        dataBound: function() {
          //add class to the rows that should not be reordered
          this.tbody.find("tr:lt(" + RESTRICTED_ROWS_NUMBER + ")").addClass("restricted");
        }
      }).data("kendoGrid");

      grid.table.kendoSortable({
        filter: ">tbody >tr:not(.restricted)",
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
          //the oldIndex and newIndex parameters are calculated among the table rows that **match the filter**
          //since the **.restricted rows does not match the filter** they will not be taken into accound when the index is calculated
          var skip = grid.dataSource.skip(),
              oldIndex = e.oldIndex + skip + RESTRICTED_ROWS_NUMBER, //add manually the restricted rows number to normalize the index
              newIndex = e.newIndex + skip + RESTRICTED_ROWS_NUMBER, //add manually the restricted rows number to normalize the index
              data = grid.dataSource.data(),
              dataItem = grid.dataSource.getByUid(e.item.data("uid"));

          grid.dataSource.remove(dataItem);
          grid.dataSource.insert(newIndex, dataItem);
        }
      });
    </script>
    <style>
      .k-grid tbody tr:not(.restricted) {
        cursor: move;
      }

      tr.restricted, tr.restricted:hover {
        background-color: #4ddbff;
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
* [How to Use Sortable with Grid in Incell Editing Mode]({% slug howto_usesortablewithgrid_inincellediting_sortable %})

For more runnable examples on the Kendo UI Sortable, browse the [how-to articles]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %}).
