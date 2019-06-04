---
title: Implement Default Checkbox Selection in Grid as Initially Checked
description: An example on how to set the default value of checkboxes in the checkbox selection column to checked when working with the Kendo UI Grid.
type: how-to
page_title: Render Checkbox Selection as Checked by Default | Kendo UI Grid for jQuery
slug: grid-checked-select-column-by-default
tags: grid, select, column, checked, checkbox, checkboxes, default
ticketid: 1147197
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

How can I render everything as selected in the [selectable column](https://demos.telerik.com/kendo-ui/grid/checkbox-selection) when the Grid loads?

## Solution

Currently, the Grid does not support the setting of the checkbox default state to selected. However, you can still implement related scenarios.

* To set the `checked` property to `true`, set it on the `dataBound` event.

    ```JavaScript
    $("#grid tbody input:checkbox").prop("checked", true);
    ```

* To select the checkboxes and the rows they belong to, trigger their `click` in the `dataBound` event.

    ```JavaScript
    $("#grid tbody input:checkbox").trigger( "click" );
    ```

The following example demonstrates how to implement the suggested scenarios.

```dojo
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

* [Kendo UI Demo on Grid Checkbox Selection](https://demos.telerik.com/kendo-ui/grid/checkbox-selection)
* [API Reference of columns.selectable](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.selectable)
* [Kendo UI Demo on Selecting All Rows on All Grid Pages](https://docs.telerik.com/kendo-ui/knowledge-base/checkbox-selection-select-all-rows-all-pages)
