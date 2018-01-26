---
title: Default Grid Checkbox Selection as Checked
description: An example on how to set the default value of checkboxes in checbox selection column to checked
type: how-to
page_title: Default Grid Checkbox Selection as Checked
slug: grid-checked-select-column-by-default
tags: grid, select, column, checked, checkbox, checkboxes, default
ticketid: 1147197
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

With the addition of the [selectable column](https://demos.telerik.com/kendo-ui/grid/checkbox-selection), is there a way to default the column so that everything is selected when the grid loads?

## Solution

There's currently no option in the Kendo UI Grid API that allows for setting the checkbox default state to selected.

If you just want to set their `checked` property to `true`, you could do this on the `dataBound` event:

```JavaScript
$("#grid tbody input:checkbox").prop("checked", true);
```

If instead you want to select them and the rows they belong to, you can trigger their `click` in the `dataBound` event:

```JavaScript
$("#grid tbody input:checkbox").trigger( "click" );
```

Here is a sample where both of the options suggested above can be tried out:

```html
<div id="example">
  <div id="grid"></div>

  <script>
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
        dataBound: onDataBound,
        columns: [
          { selectable: true, width: "50px" },
          { field:"ProductName", title: "Product Name" },
          { field: "UnitPrice", title:"Unit Price", format: "{0:c}"},
          { field: "UnitsInStock", title:"Units In Stock"},
          { field: "Discontinued"}]
      });                  
    });
    
    function onDataBound(){                
      if (!$("#grid tbody input:checkbox").prop("checked")) {
       $("#grid tbody input:checkbox").trigger("click");
      }
    }
  </script>
</div>
```

## See Also

* [Kendo UI Grid Checkbox Selection Demo.](https://demos.telerik.com/kendo-ui/grid/checkbox-selection)
* [Columns.selectable API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.selectable)
* [Select All Rows on All Grid Pages Demo.](https://docs.telerik.com/kendo-ui/knowledge-base/checkbox-selection-select-all-rows-all-pages)
