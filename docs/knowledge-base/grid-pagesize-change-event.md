---
title: Grid PageSize DropDown Change Event
description: An example on how to capture the page size change event in the Kendo UI Grid.
type: how-to
page_title: Page Size DropDown Change Event | Kendo UI Grid for jQuery
slug: grid-pagesize-change-event
tags: grid, page, size, pagesize, dropdown, event, change, capture
ticketid: 1167416
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Created with Version</td>
  <td>2018.1.221</td>
 </tr>
</table>

## Description

If I change the grid pager pageSizes dropdown 'items per page', I need to get that value. Is there a way to capture the dropdown change event? 

## Solution

Currently the public API does not have such event for a direct event handler attachment, however, you can:

1. Find the page size dropdown list on `dataBound` of the grid
1. Bind the change to your custom function

```
    grid.one("dataBound", function(e){
        var grid = e.sender;
        var pageSizesDdl = $(grid.pager.element).find("[data-role='dropdownlist']").data("kendoDropDownList");
        pageSizesDdl.bind("change", function(ev){
            kendo.alert("PageSizes DropDown Change: " + ev.sender.value() )
        });
    });
```

```dojo
    <div id="grid"></div>
    <script>
      var grid = $("#grid").kendoGrid({
        columns: [
          { field: "productName" },
          { field: "category" }
        ],
        dataSource: {
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Water", category: "Beverages" },
            { productName: "Juice", category: "Beverages" },
            { productName: "Decaffeinated Coffee", category: "Beverages" },
            { productName: "Iced Tea", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" },
            { productName: "Eggs", category: "Food" },
            { productName: "Bacon", category: "Food" },
            { productName: "Chips", category: "Food" },
            { productName: "Fish", category: "Food" }
          ],
          pageSize: 4
        },
        pageable: {
          pageSizes: true
        }
      }).data("kendoGrid");

      grid.one("dataBound", function(e){
        var grid = e.sender;
        var pageSizesDdl = $(grid.pager.element).find("[data-role='dropdownlist']").data("kendoDropDownList");
        pageSizesDdl.bind("change", function(ev){
          kendo.alert("PageSizes DropDown Change: " + ev.sender.value() )
        });
      });
    </script>
```