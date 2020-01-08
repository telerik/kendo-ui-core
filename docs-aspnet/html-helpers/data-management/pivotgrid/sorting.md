---
title: Sorting
page_title: Sorting
description: "Get started with the Telerik UI PivotGrid HtmlHelper for {{ site.framework }} and learn how to sort a Telerik UI PivotGrid HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_pivotgrid_aspnetcore_sorting
position: 4
---

# Sorting

The PivotGrid supports sorting only in the OLAP data-binding scenario.

The PivotGrid supports sorting by the caption name of the members. The structure of the `sort` descriptor is similar to [the `sort` option of the `kendo.data.DataSource`](/api/datasource) and contains the following options:
- `field`&mdash;The name of the dimension, for example, `[Date].[Calendar]`.
- `dir`&mdash;The direction of the sorting.

All inner members of the sorted dimension will be sorted with the same sort dimension.

## See Also

* [Basic Usage of the PivotGrid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgrid/index)
* [Server-Side API](/api/pivotgrid)
