---
title: Shorten chart labels
page_title: Shorten chart labels
description: Shorten chart labels
---

# Shorten chart labels

The example below demonstrates how shorten long chart labels in a more readable format.

#### Example:

```html
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        title: {
          text: "Gross domestic product growth /GDP annual %/"
        },
        legend: {
          position: "top"
        },
        seriesDefaults: {
          type: "column"
        },
        series: [{
          name: "Series 1",
          data: [10, 20, 30]
        }],
        categoryAxis: {
          categories: ["Long category", "Very long category", "Very Very long category"],
          labels: {
            template: "#= shortLabels(value)#"
          }
        },
        tooltip: {
          visible: true,
          format: "{0}%",
          template: "#= series.name #: #= value #"
        }
      });
      function shortLabels(value) {
        if (value.length > 5) {
          value = value.substring(0, 10);
          return value + "...";
        }
      }
    </script>
```
