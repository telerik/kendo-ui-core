---
title: Filtering
page_title: jQuery PivotGridV2 Documentation - Filtering
description: "Get started with the jQuery PivotGridV2 by Kendo UI and learn how to apply filters."
slug: filtering_kendoui_pivotgridv2
position: 4
---

# Filtering

The PivotGridV2 supports filtering both in the OLAP and flat data-binding scenarios.

The PivotGridV2 uses [`kendo.data.PivotDataSourceV2`](/api/javascript/data/pivotdatasourcev2) to perform `label` filtration. However, it filters only by the caption value of the members.

The following image from the [Local Binding](https://demos.telerik.com/kendo-ui/pivotgridv2/local-flat-data-binding) demo demonstrates how end-users can apply a filter.

[Applying Filter](pvg2localbindingfilter.png)

The next image demonstrates the result when the end-user applies a filter to the **Country** row.

[Filter Result](pvg2appliedfilter.png)

## Enabling Filtering

To enable the filtering functionality, set the [`filterable`](/api/javascript/ui/pivotconfiguratorv2/configuration/filterable) configuration of the PivotConfiguratorV2 to `true`.

```javascript
$("#configurator").kendoPivotConfiguratorV2({
    filterable: true,
    // ... other configurations
});
```

## Filter Object Structure

The filter descriptor is similar to [the filter option of the `kendo.data.DataSource`](/api/javascript/data/datasource/configuration/filter) and contains the following options:
- `field`&mdash;The full path to the tuple member. For example, `[Date].[Calendar].[Calendar Year].&[2005]`.
- `operator`&mdash;All operators that work with strings. Note that the widget treats field values as strings.
- `value`&mdash;The filter value.

## See Also

* [Basic Usage of the PivotGridV2 (Demo)](https://demos.telerik.com/kendo-ui/pivotgridv2/index)
* [PivotGridV2 JavaScript API Reference](/api/javascript/ui/pivotgridv2)
