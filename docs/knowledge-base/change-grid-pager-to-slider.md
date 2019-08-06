---
title: Change Grid Pager to Slider
page_title: Change Pager to Slider | Kendo UI Grid for jQuery
description: "An example on how to change the default paging to a slider in a Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Layout/change-grid-pager-to-slider, /controls/data-management/grid/how-to/Paging/change-grid-pager-to-slider
slug: howto_change_grid_pager_to_slider
tags: grid, pager, slider
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I change the default pager of the Kendo UI Grid to a slider?

## Solution

1. Remove the default pager buttons on the first [`dataBound`](/api/javascript/ui/grid/events/databound) event.
1. Create a Kendo UI Slider in their place.
1. Change the page of the Grid DataSource on the [`change`](/api/javascript/ui/slider/events/change) event of the Slider.

> When you apply this approach, the [`page`](/api/javascript/data/datasource/methods/page) method of the Grid does not fire.

```dojo
<div id="grid"></div>

<script>
  var sliderCreated = false;  

  $("#grid").kendoGrid({
    columns: [
      { field: "productName" },
      { field: "category" }
    ],
    dataSource: [
      { productName: "Tea", category: "Beverages" },
      { productName: "Coffee", category: "Beverages" },
      { productName: "Ham", category: "Food" },
      { productName: "Bread", category: "Food" },
      { productName: "Cheese", category: "Food" },
      { productName: "Milk", category: "Beverages" }
    ],
    pageable: {
      pageSize: 2
    },
    dataBound: onDataBound
  });

  function onChange(e){
    var grid = $("#grid").data("kendoGrid");

    grid.dataSource.page(e.value)
  };

  function onDataBound(e){
    if(!sliderCreated){
      sliderCreated = true;
      var max = e.sender.dataSource.totalPages();


      $(".k-grid-pager").find("a, ul").each(function(i) {
        $(this).remove()
      });
      $(".k-grid-pager").prepend($("<input id='slider' />"));
      $("#slider").kendoSlider({
        min: 1,
        max: max,
        tickPlacement: "none",
        change: onChange
      });
    }
  };
</script>

<style>
  #grid .k-slider-horizontal{
    margin: 0.4em 0.4em 0 0.4em;
  }  
</style>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
