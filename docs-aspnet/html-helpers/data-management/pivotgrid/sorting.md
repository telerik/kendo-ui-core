---
title: Sorting
page_title: Sorting
description: "Get started with the Telerik UI PivotGrid component for {{ site.framework }} and learn how to sort a Telerik UI PivotGrid component for {{ site.framework }}."
slug: htmlhelpers_pivotgrid_aspnetcore_sorting
position: 4
---

# Sorting

The PivotGrid supports sorting both in the OLAP and flat data-binding scenarios. To enable the sortable functionality, use the [`Sortable()`](/api/kendo.mvc.ui.fluent/pivotgridbuilder#sortable) method.

The PivotGrid supports sorting by the caption name of the members. The structure of the `sort` descriptor is similar to [the `sort` option of the `kendo.data.DataSource`](/api/datasource) and contains the following options:
- `field`&mdash;The name of the dimension, for example, `[Date].[Calendar]`.
- `dir`&mdash;The direction of the sorting.

All inner members of the sorted dimension will be sorted with the same sort dimension.

To sort the PivotGrid rows and columns, click on the fields in the headers, the field menu or use the PivotGrid Configurator.

## See Also

* [Basic Usage of the PivotGrid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgrid/index)
{% if site.core %}
* [Basic Usage of the PivotGrid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pivotgrid/tag-helper)
{% endif %}
* [Server-Side API](/api/pivotgrid)
