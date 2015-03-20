---
title: Filtering using Kendo UI Slider
page_title: Filtering using Kendo UI Slider
description: Filtering using Kendo UI Slider
---

The following runnable sample demonstrates how to filter ListView datasource based on Kendo UI Slider selection. Shows inclusive/exclusive fitlering

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