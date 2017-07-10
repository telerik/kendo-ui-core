---
title: Filter by Using Slider Selection
page_title: Filter by Using Slider Selection | Kendo UI ListView
description: "Learn how to filter the ListView datasource based on Kendo UI Slider selection."
slug: howto_filter_using_slider_selection_listview
---

# Filter by Using Slider Selection

Your project might require you to filter the ListView dataSource based on a Slider selection.

The following example demonstrates how to achieve this behavior and display the inclusive or exclusive filtering functionality.

###### Example

```html
    <div id="rangeslider1" class="slider">
      <input />
      <input />
    </div>
    <span>&nbsp;&nbsp;&nbsp;</span>
    <div id="rangeslider2" class="slider">
      <input />
      <input />
    </div>

    <div id="listView"></div>
    <div id="pager" class="k-pager-wrap"></div>

    <script type="text/x-kendo-tmpl" id="template">
    <div class="product">
      <img src="http://demos.kendoui.com/content/web/foods/${ProductID}.jpg" alt="${ProductName} image" />
        <h3>${ProductName}, $${UnitPrice}</h3>
          <p>${kendo.toString(UnitPrice, "c")}</p>
      </div>
    </script>
    <script>
      var slider1 = $("#rangeslider1").kendoRangeSlider({
        min: 1,
        max: 77,
        smallStep: 5,
        largeStep: 10,
        tickPlacement: "both",
        change: function (e) {
          var filters = [],
              filter;

          filters.push({field: "ProductID", operator: "gte", value: slider1.values()[0]});
          filters.push({field: "ProductID", operator: "lte", value: slider1.values()[1]});
          filters.push({field: "UnitPrice", operator: "gte", value: slider2.values()[0]});
          filters.push({field: "UnitPrice", operator: "lte", value: slider2.values()[1]});

          filter = {
            logic: "and",
            filters: filters
          };

          dataSource.filter(filter);
        }
      }).data("kendoRangeSlider");

      var slider2 = $("#rangeslider2").kendoRangeSlider({
        min: 1,
        max: 77,
        smallStep: 5,
        largeStep: 10,
        tickPlacement: "both",
        change: function (e) {
          var filters = [],
              filter;

          filters.push({field: "ProductID", operator: "gte", value: slider1.values()[0]});
          filters.push({field: "ProductID", operator: "lte", value: slider1.values()[1]});
          filters.push({field: "UnitPrice", operator: "gte", value: slider2.values()[0]});
          filters.push({field: "UnitPrice", operator: "lte", value: slider2.values()[1]});

          filter = {
            logic: "and",
            filters: filters
          };

          dataSource.filter(filter);
        }
      }).data("kendoRangeSlider");

      var dataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: "http://demos.kendoui.com/service/Products",
            dataType: "jsonp"
          }
        }
      });

      $("#pager").kendoPager({
        dataSource: dataSource
      });

      $("#listView").kendoListView({
        dataSource: dataSource,
        template: kendo.template($("#template").html())
      });
    </script>

  </body>
```

## See Also

* [ListView JavaScript API Reference](/api/javascript/ui/listview)
* [How to Persist Row Selection during Data Operations]({% slug howto_persists_row_selection_listview %})
* [How to Reorder Using Drag-and-Drop and Kendo UI Touch]({% slug howto_reorder_using_draganddrop_kendouitouch_listview %})

For more runnable examples on Kendo UI ListView, browse its [**How To** documentation folder]({% slug add_custom_delete_confirmation_dialog %}).
