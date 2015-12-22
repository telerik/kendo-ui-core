---
title: Sort the categories in a grouped chart
page_title: Sort the categories in a grouped chart
description: Sort the categories in a grouped chart
---

# Sort categories in a grouped chart

The order of the categories in a grouped chart can't be influenced by setting the sort option of the data source.

This is due the fact that the grouping operation overrides the sort order as part of its implementation.

Still, we can override the order the categories during the dataBound event.

#### Example - Overriding the categories sort order

```html
    <div id="chart"></div>
    <script>
      var data = [{
        daysOut: 1,
        type: "A",
        requestor: "Adam"
      },{
        daysOut: 2,
        type: "A",
        requestor: "Bonnie"
      },{
        daysOut: 1,
        type: "A",
        requestor: "Connor"
      },{
        daysOut: 1,
        type: "B",
        requestor: "Zach"
      },{
        daysOut: 1,
        type: "B",
        requestor: "Amber"
      }];

      $("#chart").kendoChart({
        "dataSource": {
          data: data,
          group: {
            field: "type"
          }
        },
        series: [{
          field: "daysOut",
          type: "bar",
          categoryField: "requestor",

          // Grouping will generate two series - "A" and "B" in each category
          // Since we only have data for one of them we use stacking to remove the empty space
          stack: true
        }],
        dataBound: function(e) {
          var axis = e.sender.options.categoryAxis;
          axis.categories = axis.categories.sort();
        }
      });
    </script>
```
