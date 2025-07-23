---
title: Enabling Row Selection by Right-Click in Kendo UI for jQuery Grid
description: Learn how to enable row selection by right-clicking in Kendo UI for jQuery Grid.
type: how-to
page_title: How to Select Rows with Right-Click in Kendo UI for jQuery Grid
meta_title: Selecting Grid Rows with Right-Click in Kendo UI for jQuery 
slug: selecting-grid-rows-right-click-kendo-ui-jquery
tags: kendo ui for jquery, grid, selectable, row selection, right-click
res_type: kb
ticketid: 1673320
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Grid</td>
</tr>
<tr>
<td>Version</td>
<td>2025.2.702</td>
</tr>
</tbody>
</table>

## Description

I want to select rows in the [Kendo UI for jQuery Grid](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview) by right-clicking. Adding the `k-selected` class visually highlights the row but does not register the selection within the Grid's built-in selection functionality. I need a way to make the Grid recognize the selection.

This knowledge base article also answers the following questions:
- How can I enable row selection using right-click in Kendo UI for jQuery Grid?
- Why does adding the `k-selected` class not register row selection in Kendo UI for jQuery Grid?
- How can I implement right-click row selection in the latest Kendo UI for jQuery Grid?

## Solution

To enable row selection by right-click in the Kendo UI for jQuery Grid, use the `mousedown` event and apply the `k-selected` class dynamically. Ensure the Grid is configured with the [`selectable`](/api/javascript/ui/grid/configuration/selectable) option set to `"single"` or `"multiple"`. This allows the Grid to recognize the selected row.

### Steps

1. Attach a `mousedown` event listener to the Grid rows.
2. Check if the right mouse button (`e.which === 3`) is pressed.
3. Add the `k-selected` class to the targeted row and remove the class from other rows if necessary.
4. Ensure the Grid's `selectable` configuration is set to `"single"` or `"multiple"`.

Here is the implementation:

```javascript
$(".k-grid").on("mousedown", "tr[role='row']", function (e) {
    if (e.which === 3) {
        const gridElement = $(this).closest('.k-grid');
        
        // Clear previous selections for 'multiple' selection mode
        if (gridElement.attr('id') === 'cellSelection') {
            gridElement.find('.k-selected').removeClass('k-selected');
        }
        
        // Add 'k-selected' class to the clicked row
        $(this).addClass("k-selected");
    }
});
```

Ensure that the Grid's `selectable` configuration is correctly set, as shown below:

```javascript
$("#grid").kendoGrid({
    selectable: "single", // or "multiple"
    dataSource: { /* your data source */ },
    columns: [ /* your columns */ ]
});
```

### Example Dojo

You can view and test this implementation in the following example: 

```dojo
<script src="../content/shared/js/orders.js"></script>

    <div id="example">

      <button id="btn">Get Selected</button>

      <h4>Grid with multiple row selection enabled</h4>
      <div id="rowSelection"></div>

      <h4>Grid with multiple cell selection enabled</h4>
      <div id="cellSelection"></div>

      <script>
        $(document).ready(function () {
          $('#btn').on('click', function(){
            console.log('Selected in grid 1')
            console.log($("#rowSelection").data('kendoGrid').select())
            console.log('Selected in grid 2')
            console.log($("#cellSelection").data('kendoGrid').select())
          })
          $("#rowSelection").kendoGrid({
            dataSource: {
              data: orders,
              pageSize: 6,
              schema: {
                model: {
                  id: "OrderID"
                }
              }
            },
            selectable: "multiple",
            pageable: {
              buttonCount: 5
            },
            scrollable: false,
            persistSelection: true,
            navigatable: true,
            columns: [
              {
                field: "ShipCountry",
                title: "Ship Country",
                width: 300
              },
              {
                field: "Freight",
                width: 300
              },
              {
                field: "OrderDate",
                title: "Order Date",
                format: "{0:dd/MM/yyyy}"
              }
            ]
          });

          $("#cellSelection").kendoGrid({
            dataSource: {
              data: orders,
              pageSize: 6
            },
            selectable: "single",
            pageable: {
              buttonCount: 5
            },
            scrollable: false,
            navigatable: true,
            columns: [
              {
                field: "ShipCountry",
                title: "Ship Country",
                width: 300
              },
              {
                field: "Freight",
                width: 300
              },
              {
                field: "OrderDate",
                title: "Order Date",
                format: "{0:dd/MM/yyyy}"
              }
            ]
          });

          $(".k-grid").on("mousedown", "tr[role='row']", function (e) {
            if (e.which === 3) {
              // add k-selected when the Grid has selectable: multiple enabled
              if($(this).closest('.k-grid').attr('id') == 'cellSelection'){
                $(this).closest('.k-grid').find('.k-selected').removeClass('k-selected')
                $(this).addClass("k-selected");             
              }else{
                // add k-selected when the Grid has selectable: single  enabled
                $(this).addClass("k-selected");
              }
            }
          });

        });
      </script>
    </div>
```

## See Also

- [Kendo UI for jQuery Grid Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview)
- [Selectable Configuration](/api/javascript/ui/grid/configuration/selectable)
