---
title: Customize Chart Themes
page_title: Customize Chart Themes | Kendo UI Charts
description: "Learn how to create a custom theme for a Kendo UI Chart."
previous_url: /controls/charts/how-to/customize-chart-theme
slug: howto_customizechartthemes_charts
---

# Customize Chart Themes

Your project might require a theme that is different from the default ones the Kendo UI Chart supports.

The example below demonstrates how to create a custom theme for a Kendo UI Chart.

###### Example

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

## See Also

Other articles and how-to examples on the Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
