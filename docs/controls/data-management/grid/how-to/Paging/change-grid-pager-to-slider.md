---
title: Change Grid Pager to Slider
page_title: jQuery Grid Documentation | Change Pager to Slider | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to change the default paging to a slider."
previous_url: /controls/data-management/grid/how-to/Layout/change-grid-pager-to-slider
slug: howto_change_grid_pager_to_slider
---

# Change Grid Pager to Slider

The following example demonstrates how to change the default pager of the Grid to a slider.

To achieve this behavior:

1. Remove the default pager buttons on the first [`dataBound`](/api/javascript/ui/grid/events/databound) event.
1. Create a Kendo UI Slider in their place.
1. Change the page of the Grid DataSource on the [`change`](/api/javascript/ui/slider/events/change) event of the Slider.

> **Important**
>
> When you apply this approach, the [`page`](/api/javascript/data/datasource/methods/page) method of the Grid does not fire.

###### Example

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
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Resize Grid When Window Is Resized]({% slug howto_resize_whenthe_windowis_resized_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
