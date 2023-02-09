---
title: Filter the ListView by Using Slider Selection
page_title: Filter the ListView by Using Slider Selection
description: "Learn how to filter the ListView datasource based on Kendo UI Slider selection."
slug: howto_filter_using_slider_selection_listview
previous_url: /controls/data-management/listview/how-to/filtering-using-slider, /controls/editors/slider/how-to/filter-listview-using-slider
tags: listview, filter, using, slider, selection
component: listview
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ListView for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I filter the data source of the ListView based on a [`Slider`](/kendo-ui/controls/editors/rangeslider/overview) selection?

## Solution

The following example demonstrates how to achieve this behavior and display the relevant items in the ListView.

```dojo
    <h4>Slide to Filter by Unit Price</h4>
    <div id="rangeslider" class="slider">
      <input />
      <input />
    </div>

    <br>
    <br>
    <br>

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
    <div class="product">
      <img src="https://demos.telerik.com/kendo-ui/content/web/foods/${ProductID}.jpg" alt="${ProductName} image" />
        <h3>${ProductName}, $${UnitPrice}</h3>
          <p>${kendo.toString(UnitPrice, "c")}</p>
      </div>
    </script>
    <script>
      $("#rangeslider").kendoRangeSlider({
        min: 1,
        max: 77,
        smallStep: 5,
        largeStep: 10,
        tickPlacement: "both",
        change: function (e) {
          var filters = [],
              filter;

          filters.push({field: "UnitPrice", operator: "gte", value: e.sender.values()[0]});
          filters.push({field: "UnitPrice", operator: "lte", value: e.sender.values()[1]});

          filter = {
            logic: "and",
            filters: filters
          };
          dataSource.filter(filter);
        }
      });

      var dataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/kendo-ui/service/Products",
            dataType: "jsonp"
          }
        },
        pageSize: 4
      });

      $("#listView").kendoListView({
        dataSource: dataSource,
        pageable: true,
        template: kendo.template($("#template").html())
      });
    </script>
```

## See Also

* [JavaScript API Reference of the ListView](/api/javascript/ui/listview)
* [How to Persist Row Selection during Data Operations]({% slug howto_persists_row_selection_listview %})
* [How to Reorder Using Drag-and-Drop and Kendo UI Touch]({% slug howto_reorder_using_draganddrop_kendouitouch_listview %})
