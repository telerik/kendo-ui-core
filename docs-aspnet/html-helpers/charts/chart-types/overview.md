---
title: Overview
page_title: Types Overview
description: "Learn the basics when working with the chart types in the {{ site.product }} suite."
slug: overview_charttypes_charts
position: 1
---

{% if site.has_cta_panels == true %}
{% include cta-panel-small.html %}
{% endif %}

# Chart Types Overview

The Charts support a wide range of series types.

## Categorical Charts

[Categorical charts]({% slug htmlhelpers_categoricalcharts_aspnetcore %}) provide built-in support for displaying dates. The categories represent unique values which are not mathematically related to each other.

Examples of categorical charts are [Area]({% slug areacharts_aspnetcore_htmlhelper %}), [Bar]({% slug barcharts_aspnetcore_htmlhelper %}), [Box Plot]({% slug boxplotcharts_aspnetcore_htmlhelper %}), [Bullet]({% slug bulletcharts_aspnetcore_htmlhelper %}), and [Line Charts]({% slug linecharts_aspnetcore_htmlhelper %}).

## Circular Charts

Circular charts are divided in slices representing statistical data, which proportionally corresponds to the quantity input of each slice. Circular charts are widely used in the business world and the mass media.

Examples of circular charts are [Pie Charts]({% slug piecharts_aspnetcore_htmlhelper %}).

## Freeform Charts

Freeform charts adopt different forms and use variously structured portions to display data.

Examples of freeform charts are [Funnel Charts]({% slug funnelchart_aspnetcore_htmlhelper %}).

## Scatter Charts

[Scatter charts]({% slug htmlhelpers_scattercharts_aspnetcore %}) are suitable for displaying and comparing different sets of numerical values, for showing the relationships between the values of the data sets, and for plotting two-dimensional data as a series of XY coordinates.

Example of scatter charts are [Bubble Charts]({% slug bubblecharts_aspnetcore_htmlhelper %}).

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Server-Side API](/api/chart)
