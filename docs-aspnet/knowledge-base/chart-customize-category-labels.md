---
title: Customizing Bar Chart Category Axis Labels
description: An example on how to align the Category Axis labels for the Telerik UI for {{ site.framework }} Bar Chart.
type: how-to
page_title: Customizing Bar Chart Category Axis Labels
slug: chart-customize-category-labels
tags: chart, align, bar, label, y, axis, category, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Chart</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.3.1109 version</td>
 </tr>
</table>

## Description

How can I customize the Category Axis labels of the Telerik UI for {{ site.framework }} Bar Chart?


## Solution

Use the [Kendo UI Drawing API](https://docs.telerik.com/kendo-ui/framework/drawing/overview) to customize the appearance of the labels in the {{ site.framework }} Bar Chart. You can adjust the suggested approach to your preferences through the following steps:

1. Create a new function and pass its reference through the [Visual()](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/ChartCategoryAxisLabelsSettingsBuilder#visualsystemstring) configuration method for the labels of the category axis.
1. Initialize a new [`kendo.drawing.Group` object](https://docs.telerik.com/kendo-ui/api/javascript/drawing/group).
1. Set the appearance of the label with the [`kendo.drawing.Text`](https://docs.telerik.com/kendo-ui/api/javascript/drawing/text) element.
1. [Configure the rectangle](https://docs.telerik.com/kendo-ui/api/javascript/geometry/rect) which will hold the text.
1. Use the [`kendo.drawing.align`](https://docs.telerik.com/kendo-ui/api/javascript/drawing/methods/align) method to set the alignment within the rectangle.
1. [Append the elements together within the group](https://docs.telerik.com/kendo-ui/api/javascript/drawing/group/methods/append), and return the results.

```Index.cshtml
    @(Html.Kendo().Chart()
        .Name("chart")
        .Title("Site Visitors Stats")
        .Legend(legend => legend
            .Visible(false)
        )
        .ChartArea(chartArea => chartArea
            .Background("transparent")
        )
        .Series(series =>
        {
            series.Bar(new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
            series.Bar(new double[] { 52000, 34000, 23000, 48000, 67000, 83000 }).Name("Unique visitors");
        })
        .CategoryAxis(axis => axis
            .Labels(labels => labels.Visual("customLabels").Font("10px"))
            .Categories("Jan", "Feb", "Mar", "Apr", "May", "Jun")
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Max(140000)
            .Line(line => line.Visible(false))
            .MajorGridLines(lines => lines.Visible(true))
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Template("#= series.name #: #= value #")
        )
    )
```

```Script.js
    <script>
        function customLabels(e) {
            var group = new kendo.drawing.Group(); // Initialize a new kendo.drawing.Group object.
            var text = new kendo.drawing.Text(e.value, e.rect.origin, { font: "Verdana; font-weight: bold;" }); // Set the appearance of the label with the kendo.drawing.Text element.
            var rect = new kendo.geometry.Rect(e.rect.origin, [90, 80]); // Configure the rectangle which will hold the text.

            kendo.drawing.align([text], rect, "start"); // Use the kendo.drawing.align method to set the alignment within the rectangle.
            group.append(new kendo.drawing.Rect(rect, { fill: null, stroke: null }), text); // Append the elements together within the group.

            return group; // Return the results.
        }
    </script>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on customizing the category labels of the {{ site.framework }} Bar Chart](https://netcorerepl.telerik.com/cRYFEKlh02kX4pEE00).

## More {{ site.framework }} Chart Resources

* [{{ site.framework }} Chart Documentation]({%slug htmlhelpers_charts_aspnetcore%})

* [{{ site.framework }} Chart Demos](https://demos.telerik.com/{{ site.platform }}/charts/index)

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

* [Client-Side API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/chart)
* [Server-Side API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/chart)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
* [Telerik REPL: Customize the Category Labels of the Bar Chart](https://netcorerepl.telerik.com/cRYFEKlh02kX4pEE00)
