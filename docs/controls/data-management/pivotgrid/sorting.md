---
title: Sorting
page_title: jQuery PivotGrid Documentation | Sorting
description: "Get started with the jQuery PivotGrid by Kendo UI and learn how to sort the widget."
slug: sorting_kendoui_pivotgrid
position: 4
---

# Sorting

The PivotGrid supports sorting both in the OLAP and flat data-binding scenarios. To enable the sortable functionality, set the [`sortable`](/api/javascript/ui/pivotgrid/configuration/sortable) property to `true`.

The PivotGrid supports sorting by the caption name of the members. The structure of the `sort` descriptor is similar to [the `sort` option of the `kendo.data.DataSource`](/api/javascript/data/datasource/configuration/sort) and contains the following options:
- `field`&mdash;The name of the dimension, for example, `[Date].[Calendar]`.
- `dir`&mdash;The direction of the sorting.

All inner members of the sorted dimension will be sorted with the same sort dimension.

To sort the PivotGrid rows and columns, click on the fields in the headers, the field menu or use the PivotGrid Configurator.

## See Also

* [Sorting a Dimension in the PivotGrid (Demo)]({% slug howto_sort_dimensions_pivotgrid %})
* [Basic Usage of the PivotGrid (Demo)](https://demos.telerik.com/kendo-ui/pivotgrid/index)
* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
