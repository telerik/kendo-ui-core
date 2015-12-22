---
title: Use hyperlinks in axes labels
page_title: Use hyperlinks in axes labels
description: Use hyperlinks in axes labels
---

# Use hyperlinks in axes labels

The example below demonstrates how to use hyperlinks in axes labels.

#### Example - Use hyperlinks in axes labels

```html
    <div id="chart"></div>
    <script>
      var data = [ {
        "blog": "My blog",
        "day": "1",
        "value": 3,
        "userColor": "#ffd600",
        "url": "http://www.example.com"
      }, {
        "blog": "My blog",
        "day": "2",
        "value": 7,
        "userColor": "#ffd600",
        "url": "http://www.example.com"
      }, {
        "blog": "My blog",
        "day": "3",
        "value": 12,
        "userColor": "#ffd600",
        "url": "http://www.example.com"
      }];

      $("#chart").kendoChart({
        dataSource: {
          data: data
        },
        title: {
          align: "left",
          text: "Comments per day"
        },
        legend: {
          visible: false
        },
        seriesDefaults: {
          type: "column"
        },
        series: [{
          field: "value",
          colorField: "userColor"
        }],
        valueAxis: {
          majorGridLines: {
            visible: false
          },
          visible: false
        },
        categoryAxis: {
          field: "day",
          majorGridLines: {
            visible: false
          },
          line: {
            visible: false
          }
        },
        axisLabelClick: function(e) {
          window.location = e.dataItem.url;
        }
      });
    </script>
```
