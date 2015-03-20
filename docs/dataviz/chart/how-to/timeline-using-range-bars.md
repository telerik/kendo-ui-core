---
title: Create a Timeline Using Range Bars
description: This article demonstrates how to add a title for shapes loaded from GeoJSON.
---

# Create a Timeline Using Range Bars

This example demonstrates how to display a daily timeline for two users.

* Time of day is represented as time span relative to a fixed date, e.g. 01.Jan
* Each slot has unique ID
    * The data source is grouped by ID to create one series per data item. This is important as normally a series can have only one data point per category.
* Categories are bound to model fields
* Series spacing is set to -1 (-100%) so the series can line up with each other.
    * Normally they'll be rendered one below the other.
* Value axis labels are formatted to display time of day and are spaced 1 hour apart.

#### Example: Create a timeline for two users
```html
    <div id="chart"></div>
    <script>
    var data = [{
        id: 1,
        user: "Jon",
        from: new Date("2014/01/01 11:30").getTime(),
        to: new Date("2014/01/01 14:45").getTime()
      }, {
        id: 2,
        user: "Joe",
        from: new Date("2014/01/01 09:30").getTime(),
        to: new Date("2014/01/01 09:45").getTime()
      }, {
        id: 3,
        user: "Joe",
        from: new Date("2014/01/01 10:00").getTime(),
        to: new Date("2014/01/01 10:15").getTime()
      }, {
        id: 4,
        user: "Joe",
        from: new Date("2014/01/01 12:00").getTime(),
        to: new Date("2014/01/01 14:00").getTime()
      }, {
        id: 5,
        user: "Joe",
        from: new Date("2014/01/01 15:15").getTime(),
        to: new Date("2014/01/01 15:30").getTime()
      }, {
        id: 6,
        user: "Joe",
        from: new Date("2014/01/01 15:45").getTime(),
        to: new Date("2014/01/01 16:00").getTime()
      }];

      $("#chart").kendoChart({
        dataSource: {
          data: data,
          group: {
            field: "id",
            dir: "desc"
          }
        },
        series: [{
          type: "rangeBar",
          fromField: "from",
          toField: "to",
          categoryField: "user",
          spacing: -1
        }],
        valueAxis: {
          min: new Date("2014/01/01 08:00").getTime(),
          max: new Date("2014/01/01 17:00").getTime(),
          majorUnit: 60 * 60 * 1000, // 60 minutes in milliseconds
          labels: {
            template: "#= kendo.toString(new Date(value), 'HH:mm') #"
          }
        },
        legend: {
          visible: false
        }
      });
  </script>
```
