---
title: Kendo UI 2016 Breaking Changes
page_title: Kendo UI 2016 Breaking Changes | Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2016."
previous_url: /changes-and-backward-compatibility, /install/changes-and-backward-compatibility
slug: breakingchanges2016_kendoui
---

# Kendo UI 2016 Breaking Changes

## Kendo UI 2016 Q1

### Changes from 2015 Q3 SP1 (2015.3.1111)

#### Breaking Changes

* **DropDownList/ComboBox/MultiSelect**: The widget will clear the applied filter if the user decides to set new value using the [`value`](/api/javascript/ui/dropdownlist#methods-value) method.

* **DropDownList/ComboBox**: Cascading widget will trigger `change` event when its value is changed due to parent update. The benefit of this change is proper behavior in MVVM-like frameworks  (related [issue](https://github.com/telerik/kendo-ui-core/issues/661)).

* **DropDownList**: The widget will not select the first item automatically, when data source is changed with `setDataSource` method. If you would like to mimic the old behavior, then you will need to manually select the first item:

    var dropdownlist = $({widget id}).data("kendoDropDownList");
    dropdownlist.setDataSource(["Item1", "Item2"]);
    dropdownlist.select(0); //force selection of the first item

### Changes from 2015 Q3 (2015.2.930)

#### Breaking Changes

The  **Grid**, **Gantt**, **TreeList**, **Scheduler**, **Toolbar**, and **Spreadsheet** widgets will use the native `click` event for taps on desktop environments. Previously, the `mouseup` event was utilized. For details and means to revert that behavior, check [this issue](https://github.com/telerik/kendo-ui-core/issues/1176).

## See Also

Other articles on Kendo UI breaking changes and backwards compatibility:

* [Kendo UI 2015 Breaking Changes]({% slug breakingchanges2015_kendoui %})
* [Kendo UI 2014 Breaking Changes]({% slug breakingchanges2014_kendoui %})
* [Kendo UI 2013 Breaking Changes]({% slug breakingchanges2013_kendoui %})
* [Kendo UI 2012 Breaking Changes]({% slug breakingchanges2012_kendoui %})
