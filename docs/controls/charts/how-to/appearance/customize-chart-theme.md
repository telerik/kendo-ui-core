---
title: Customize Chart Themes
page_title: Customize Chart Themes | Kendo UI Charts
description: "Learn how to create a custom theme for a Kendo UI Chart."
previous_url: /controls/charts/how-to/customize-chart-theme
slug: howto_customizechartthemes_charts
---

# Customize Chart Themes

Your project might require a theme that is different from the default ones the Kendo UI Chart supports.

The following example demonstrates how to create a custom theme for a Kendo UI Chart.

```dojo
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

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
