---
title: Prevent Header Remove When Removing by Checked Select Column
description: An example on how to prevent the header row from being removed when removing by select column checked checkboxes
type: how-to
page_title: Prevent Header Remove When Removing by Checked Select Column
slug: grid-remove-by-checked-select-column
tags: grid, select, column, check, checkbox, checkboxes, header, row, remove
ticketid: 1147495
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

I'm using the `columns.Select()` functionality of the Kendo UI Grid and looping through its rows in order to delete the ones that are checked with the following code:

```dojo
$("#grid").find("input:checked").each(function () {
  grid.removeRow($(this).closest('tr'));
});
```

This causes the Header Row to be removed if checked as well; how can I prevent the Header row from being removed?

## Solution

In order to detect if the checkbox being used to remove a row belongs to the header of the grid, we can check if the element has a parent of type `th`:

```dojo
<div id="example">
  <button onclick=removeCheckedRows()>Remove checked rows</button>
  <div id="grid"></div>

  <script>
    function removeCheckedRows(){
      $("#grid").find("input:checked").each(function () {                  
        var grid = $("#grid").data("kendoGrid"); 
        
        if (!$(this).parents('th').length) {
          grid.removeRow($(this).closest('tr'));
        }
      })    
    }

    $(document).ready(function () {
      $("#grid").kendoGrid({
        dataSource: {
            pageSize: 10,
            transport: {
                read:  {
                  url: "https://demos.telerik.com/kendo-ui/service/Products",
                  dataType: "jsonp"
                }
            },
            schema: {
              model: {
                id: "ProductID"
              }
            }
        },
        pageable: true,
        scrollable: false,
        persistSelection: true,
        sortable: true,
        columns: [
          { selectable: true, width: "50px" },
          { field:"ProductName", title: "Product Name" },
          { field: "UnitPrice", title:"Unit Price", format: "{0:c}"},
          { field: "UnitsInStock", title:"Units In Stock"},
          { field: "Discontinued"}]
      });                  
    });
  </script>
</div>
```

## See Also

* [Kendo UI Grid Checkbox Selection Demo.](https://demos.telerik.com/kendo-ui/grid/checkbox-selection)
* [Columns.selectable API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.selectable)
