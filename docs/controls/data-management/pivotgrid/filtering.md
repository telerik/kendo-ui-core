---
title: Filtering
page_title: jQuery PivotGrid Documentation | Filtering
description: "Get started with the jQuery PivotGrid by Kendo UI and learn how to create and configure the widget."
slug: filtering_kendoui_pivotgrid
position: 3
---

# Filtering

The PivotGrid supports filtering both in the OLAP and flat data-binding scenarios.

The PivotGrid uses [`kendo.data.PivotDataSource`](/api/framework/pivotdatasource) to perform `label` filtration. However, it filters only by the caption value of the members.

The filter descriptor is similar to [the filter option of the `kendo.data.DataSource`](/api/javascript/data/datasource/configuration/filter) and contains the following options:
- `field`&mdash;The full path to the tuple member. For example, `[Date].[Calendar].[Calendar Year].&[2005]`.
- `operator`&mdash;All operators that work with strings. Note that the widget treats field values as strings.
- `value`&mdash;The filter value.

## See Also

* [Filtering a Dimension in the PivotGrid]({% slug howto_filter_dimensions_pivotgrid %})
* [Basic Usage of the PivotGrid (Demo)](https://demos.telerik.com/kendo-ui/pivotgrid/index)
* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
