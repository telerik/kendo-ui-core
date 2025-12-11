---
title: Plotting a Threshold Line in a DrillDown Series Chart
description: Learn how to plot a threshold line only in the first series of the Telerik UI for {{ site.framework }} DrillDown Chart component.
type: how-to
page_title: Plotting a Threshold Line in a DrillDown Series Chart
slug: drilldown-chart-plot-threshold-line
tags: chart, drilldown, plotband, threshold-line, series
res_type: kb
components: ["general"]
---
## Environment
<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Upload</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.3.1010 version</td>
 </tr>
</table>

## Description
By design, the defined plot band in the DrillDown Chart will be visible on each view. How can I plot a threshold line only in the first series?

## Solution
1. Handle the `DrillDown` event of the Chart and remove the `plotBands` settings from the initial Chart options.
2. Handle the `DrilldownSeriesFactory` event that triggers when the current drill-down level has changed and set back the plot bands when the level is `0`.

Here is a sample implementation:

```HtmlHelper
@(Html.Kendo().ChartBreadcrumb()
    .Name("cb")
    .Chart("chart")
)

@(Html.Kendo().Chart<ChartViewModel>()
    .Name("chart")
    ...
    .Events(ev => ev.DrilldownLevelChange("onDrilldownLevelChange").Drilldown("onDrillDown"))
)
```
{% if site.core %}
```TagHelper
       @addTagHelper *, Kendo.Mvc

        <kendo-chartbreadcrumb name="cb" chart="chart"></kendo-chartbreadcrumb>

        <kendo-chart name="chart" on-drilldown="onDrillDown" on-drilldown-level-change="onDrilldownLevelChange">
          <!-- Other configuration -->
        </kendo-chart>
```
{% endif %}
```JS script
var initialPlotBands = [];

function onDrillDown(e) {
    initialPlotBands = e.sender.options.valueAxis.plotBands; // Store the initial plot bands options.
    e.sender.options.valueAxis.plotBands = null; // Remove the plotBands options.
    e.sender.redraw(); // Redraw the chart using the currently loaded data.
}

function onDrilldownLevelChange(e) {
    if (e.level === 0) { // Check if the current level is the first one.
        e.sender.options.valueAxis.plotBands = initialPlotBands; // Retrieve back the initial plot bands for the first series.
        e.sender.redraw();
    }
}
```

## More {{ site.framework }} DrillDown Chart Resources

* [{{ site.framework }} DrillDown Chart Documentation]({%slug htmlhelpers_drilldowncharts_aspnetcore%})

* [{{ site.framework }} DrillDown Chart Demos](https://demos.telerik.com/{{ site.platform }}/drilldown-charts)

{% if site.core %}
* [{{ site.framework }} Chart Product Page](https://www.telerik.com/aspnet-core-ui/charts)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Chart Product Page](https://www.telerik.com/aspnet-mvc/charts)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Chart for {{ site.framework }}](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart)
* [Server-Side API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/chart)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/chart)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
