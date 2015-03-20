---
title: Customize chart theme
page_title: Customize chart theme
description: Customize chart theme
---

# Customize chart theme

The example below demonstrates how create a custom theme for the Kendo UI Chart.

#### Example:

```html
    <div id="chart" />
    <script>
      var themes = kendo.dataviz.ui.themes;
      var MyTheme = kendo.deepExtend(
        // Deep copy
        {},

        // Base theme      
        themes.silver,

        {
          chart: {
            // Can contain any chart settings
            seriesColors: ["#000022", "#000044", "#000066", "#000088", "#0000aa", "#0000cc", "#0000ee"]
          }
        }
      );

      themes.MyTheme = MyTheme;

      $("#chart").kendoChart({
        theme: "MyTheme",
        series: [{
          data: [1]
        }, {
          data: [1]
        }, {
          data: [1]
        }, {
          data: [1]
        }, {
          data: [1]
        }, {
          data: [1]
        }, {
          data: [1]
        }]
      });
    </script>
```
