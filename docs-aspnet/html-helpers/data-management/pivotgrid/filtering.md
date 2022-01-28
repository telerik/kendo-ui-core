---
title: Filtering
page_title: Filtering
description: "Get started with the Telerik UI PivotGrid HtmlHelper for {{ site.framework }} and learn how to filter a Telerik UI PivotGrid HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_pivotgrid_aspnetcore_filtering
position: 3
---

# Filtering

The PivotGrid supports filtering both in the OLAP and flat data-binding scenarios.

The PivotGrid uses [`kendo.data.PivotDataSource`](/api/pivotdatasource) to perform `label` filtration. However, it filters only by the caption value of the members.

The filter descriptor is similar to [the filter option of the `kendo.data.DataSource`](/api/datasource) and contains the following options:
- `field`&mdash;The full path to the tuple member. For example, `[Date].[Calendar].[Calendar Year].&[2005]`.
- `operator`&mdash;All operators that work with strings. Note that the widget treats field values as strings.
- `value`&mdash;The filter value.

## See Also

* [Basic Usage of the PivotGrid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgrid/index)
* [Server-Side API](/api/pivotgrid)
