---
title: Grid with a Dynamic Column Header
description: An example on how to change multi header title of the Kendo UI Grid dynamically based on Date Picker value change
type: how-to
page_title: Dynamically Change the Grid Column Header | Kendo UI Grid for jQuery
slug: grid-dynamic-column-headers
tags: grid, dynamically, column, header, dynamic, title, change, update, multi
res_type: kb
ticketid: 1147997
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Created with version</td>
  <td>2020.3.1118</td>
 </tr>
</table>

## Description

I have a grid with multi-column headers. My grid has two columns - Name and Price. I would like to update their column header dynamically with a date range in UK format selected from external date pickers above the grid.

Since I will need to do that on the client, I need some help with getting the datepicker value and updating the grid.

## Solution

The Kendo UI Grid with multi-header columns creates them with a `data-title` attribute equal to the current title of the column. To identify the column that needs to be updated we can use the tilde selector which does a [`contains` search](https://api.jquery.com/attribute-contains-selector/) through the thead of the grid.

1. Create a custom function `updateColumnTitle`.
1. Get the Grid instance, the DatePicker instances and their values and generate the new title. 
1. Use the grid [`thead`](/api/javascript/ui/grid/fields/thead) field to locate the target title and replace it with the new one.
    `grid.thead.find("[data-title~='Price']").html(newTitle);`
1. Call the `updateColumnTitle` function in the `dataBound` event of the grid and also in the `change` event of the DatePickers

```
    function updateColumnTitle(e){
        var grid = $("#grid").data("kendoGrid");
        var pickerFromValue = dateFromPicker.value();
        var pickerToValue = dateToPicker.value();
        var newTitle = "Price Range For Dates: From: ";
        if(pickerFromValue){
          newTitle += kendo.toString(pickerFromValue, "d");
        } else {
          newTitle += "Not Selected"
        }

        newTitle += " To: "
        if(pickerToValue){
          newTitle += kendo.toString(pickerToValue, "d");
        } else {
          newTitle += "Not Selected"
        }
        grid.thead.find("[data-title~='Price']").html(newTitle);
    }
```

```dojo
    <label for="dateFrom">Date From:</label>
    <input type="text" id="dateFrom" />
    <label for="dateTo">Date To:</label>
    <input type="text" id="dateTo" />
    <br /><br /><br />
    <div id="grid"></div>
    <script>
      kendo.culture("en-GB");

      var dateFromPicker = $("#dateFrom").kendoDatePicker({
        culture: "en-GB",
        value:new Date(),
        change: updateColumnTitle
      }).data("kendoDatePicker");

      var dateToPicker = $("#dateTo").kendoDatePicker({
        culture: "en-GB",
        value:new Date(),
        change: updateColumnTitle
      }).data("kendoDatePicker");

      function updateColumnTitle(e){
        var grid = $("#grid").data("kendoGrid");
        var pickerFromValue = dateFromPicker.value();
        var pickerToValue = dateToPicker.value();
        var newTitle = "Price Range For Dates: From: ";
        if(pickerFromValue){
          newTitle += kendo.toString(pickerFromValue, "d");
        } else {
          newTitle += "Not Selected"
        }

        newTitle += " To: "
        if(pickerToValue){
          newTitle += kendo.toString(pickerToValue, "d");
        } else {
          newTitle += "Not Selected"
        }
        grid.thead.find("[data-title~='Price']").html(newTitle);
      }

      $("#grid").kendoGrid({
        columns: [
          {
            title: "Price Range For Dates:",
            columns: [
              { field: "name", width: 300 },
              { field: "price", format: "{0:c}" }
            ]
          },{ title: "Brand", columns:[{field: "brand"}, {field: "year"}]}
        ],
        dataSource: [ { name: "Vauxhall Astra", price:100 , brand: "Vauxhall" , year: 2005} , { name: "Hyundai Sonata", price:1500 , brand: "Hyundai", year: 2003} ],
        dataBound: updateColumnTitle
      });
    </script>
```